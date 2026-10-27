
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text):
    scores = analyzer.polarity_scores(text)
    compound = scores["compound"]

    if compound >= 0.05:
        sentiment = "Positive"
    elif compound <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return sentiment, compound


with open("sample_data.json", "r", encoding="utf-8") as file:
    comments = json.load(file)

for comment in comments:
    sentiment, score = analyze_sentiment(comment["text"])

    print(f"ID: {comment['id']}")
    print(f"Text: {comment['text']}")
    print(f"Sentiment: {sentiment}")
    print(f"Compound Score: {score}")
    print("-" * 40)
