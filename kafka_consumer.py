
import json
from kafka import KafkaConsumer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

consumer = KafkaConsumer(
    "reddit-raw",
    bootstrap_servers="localhost:9092",
    auto_offset_reset="earliest",
    enable_auto_commit=True,
    group_id="sentiment-group",
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)

print("Reading comments and analyzing sentiment...\n")

count = 0

try:
    for message in consumer:
        comment = message.value
        text = comment["text"]

        scores = analyzer.polarity_scores(text)
        compound = scores["compound"]

        if compound >= 0.05:
            sentiment = "Positive"
        elif compound <= -0.05:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        count += 1

        print(f"ID: {comment['id']}")
        print(f"Text: {text}")
        print(f"Sentiment: {sentiment}")
        print(f"Compound Score: {compound}")
        print("-" * 40)

        if count == 5:
            break

finally:
    consumer.close()
    print(f"\nFinished analyzing {count} comments.")
