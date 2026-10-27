import json
import os
from pathlib import Path

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json, udf
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


def save_batch(batch_df, batch_id):
    rows = batch_df.toJSON().collect()

    if not rows:
        return

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

    print(
        f"Batch {batch_id}: processed {len(rows)} posts; "
        f"stored {len(combined)} records."
    )


query = (
    results.writeStream
    .foreachBatch(save_batch)
    .option(
        "checkpointLocation",
        "/tmp/sentitrend_storage_checkpoint",
    )
    .start()
)

print("SentiTrend streaming and sentiment analysis started.")
query.awaitTermination()