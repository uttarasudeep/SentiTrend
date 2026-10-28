import json
import os
from pathlib import Path
import base64
import urllib.parse
import urllib.request


from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json, udf, to_timestamp, window
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    DoubleType,
)
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_FILE = DATA_DIR / "processed_posts.jsonl"
MAX_STORED_POSTS = 2000

spark = (
    SparkSession.builder
    .config("spark.sql.shuffle.partitions", "8")
    .appName("SentiTrend")
    .master("local[*]")
    .config(
        "spark.jars.packages",
        "org.apache.spark:spark-sql-kafka-0-10_2.13:4.2.0",
    )
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

schema = StructType([
    StructField("id", StringType(), True),
    StructField("uri", StringType(), True),
    StructField("platform", StringType(), True),
    StructField("topic", StringType(), True),
    StructField("text", StringType(), True),
    StructField("created_utc", StringType(), True),
    StructField("collected_utc", StringType(), True),
])

_analyzer = None


def analyze_sentiment(text):
    global _analyzer

    if not text or not text.strip():
        return ("Neutral", 0.0)

    if _analyzer is None:
        _analyzer = SentimentIntensityAnalyzer()

    score = float(_analyzer.polarity_scores(text)["compound"])

    if score >= 0.05:
        label = "Positive"
    elif score <= -0.05:
        label = "Negative"
    else:
        label = "Neutral"

    return label, score


sentiment_schema = StructType([
    StructField("sentiment", StringType(), False),
    StructField("compound_score", DoubleType(), False),
])

sentiment_udf = udf(analyze_sentiment, sentiment_schema)

kafka_stream = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "localhost:9092")
    .option("subscribe", "bluesky-posts")
    .option("startingOffsets", "latest")
    .option("maxOffsetsPerTrigger", 200)
    .load()
)

posts = (
    kafka_stream
    .selectExpr("CAST(value AS STRING) AS json_value")
    .select(from_json(col("json_value"), schema).alias("post"))
    .select("post.*")
    .filter(col("text").isNotNull())
    .filter(col("text") != "")
)

results = (
    posts
    .withColumn("sentiment_result", sentiment_udf(col("text")))
    .select(
        "id",
        "uri",
        "platform",
        "topic",
        "text",
        "created_utc",
        "collected_utc",
        col("sentiment_result.sentiment").alias("sentiment"),
        col("sentiment_result.compound_score").alias("compound_score"),
    )
)


def encode_b64(value):
    return base64.b64encode(
        str(value).encode("utf-8")
    ).decode("ascii")


def write_record_to_hbase(record):
    post_id = record.get("id") or record.get("uri")

    if not post_id:
        raise ValueError("Post has no ID or URI")

    # Deterministic key prevents duplicate rows on retries.
    row_key = f"{record.get('platform', 'unknown')}#{post_id}"

    fields = {
        "post:id": record.get("id"),
        "post:uri": record.get("uri"),
        "post:text": record.get("text"),
        "post:platform": record.get("platform"),
        "post:topic": record.get("topic"),
        "sentiment:label": record.get("sentiment"),
        "sentiment:compound_score": record.get("compound_score"),
        "metadata:created_utc": record.get("created_utc"),
        "metadata:collected_utc": record.get("collected_utc"),
    }

    cells = [
        {
            "column": encode_b64(column),
            "$": encode_b64(value),
        }
        for column, value in fields.items()
        if value is not None
    ]

    payload = {
        "Row": [{
            "key": encode_b64(row_key),
            "Cell": cells,
        }]
    }

    url = (
        "http://127.0.0.1:8080/sentitrend_posts/"
        + urllib.parse.quote(row_key, safe="")
    )

    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="PUT",
    )

    with urllib.request.urlopen(request, timeout=10) as response:
        if response.status != 200:
            raise RuntimeError(
                f"HBase returned HTTP {response.status}"
            )


def save_batch(batch_df, batch_id):
    rows = batch_df.toJSON().collect()

    if not rows:
        return

    records = [json.loads(row) for row in rows]

    # Preserve the existing bounded local JSONL cache.
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    previous = []
    if DATA_FILE.exists():
        with DATA_FILE.open("r", encoding="utf-8") as file:
            previous = file.readlines()

    combined = previous + [row + "\n" for row in rows]
    combined = combined[-MAX_STORED_POSTS:]

    temp_file = DATA_FILE.with_suffix(".tmp")

    with temp_file.open("w", encoding="utf-8") as file:
        file.writelines(combined)

    os.replace(temp_file, DATA_FILE)

    # Write each processed post to HBase.
    successful = 0
    errors = []

    for record in records:
        try:
            write_record_to_hbase(record)
            successful += 1
        except Exception as exc:
            errors.append(str(exc))

    print(
        f"Batch {batch_id}: processed {len(records)} posts; "
        f"JSONL records={len(combined)}; "
        f"HBase writes={successful}/{len(records)}"
    )

    if errors:
        print("HBase write error:", errors[0])


query = (
    results.writeStream
    .foreachBatch(save_batch)
    .option(
        "checkpointLocation",
        "/tmp/sentitrend_storage_checkpoint",
    )
    .start()
)
# Time-window analytics: 5-minute windows sliding every minute.
windowed_counts = (
    results
    .withColumn("event_time", to_timestamp(col("collected_utc")))
    .filter(col("event_time").isNotNull())
    .withWatermark("event_time", "2 minutes")
    .groupBy(
        window(col("event_time"), "5 minutes", "1 minute"),
        col("sentiment")
    )
    .count()
)

window_query = (
    windowed_counts.writeStream
    .format("console")
    .outputMode("update")
    .option("truncate", False)
    .option("numRows", 20)
    .option(
        "checkpointLocation",
        "/tmp/sentitrend_window_checkpoint"
    )
    .start()
)

print("HBase storage and time-window analytics are running.")

print("SentiTrend streaming and sentiment analysis started.")
spark.streams.awaitAnyTermination()