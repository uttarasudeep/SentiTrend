1. Project Overview

SentiTrend is a real-time sentiment analytics project that collects social media posts, classifies their sentiment, stores processed data, and generates analytics.

The project uses Bluesky Jetstream for data collection, Apache Kafka for message ingestion, Apache Spark for stream processing and analytics, VADER for sentiment analysis, and Apache HBase for storage.

2. Technology Stack

Python

Bluesky Jetstream

Apache Kafka

Apache Spark

VADER Sentiment Analysis

Apache HBase

JSONL data storage

Python HTTP Server for the REST API

Frontend dashboard (developed separately)

3. Project Architecture

Bluesky Jetstream
        |
        v
Python Data Collector
        |
        v
Apache Kafka
        |
        v
Spark Structured Streaming
        |
        v
VADER Sentiment Analysis
        |
        v
HBase + JSONL Storage
        |
        v
Backend REST API
        |
        v
Frontend Dashboard

Batch analytics are performed using Spark RDD, Spark SQL, and Spark MLlib.

4. Backend API Setup

The backend API reads processed posts from:

data/processed_posts.jsonl

Requirements

Python 3

The project's processed JSONL data file

Kafka, Spark, and HBase are not required just to start the API when the processed data file is already available.

Start the API

From the project root, run:

python api_server.py

The API runs at:

http://localhost:8000

If you use a virtual environment, activate it before running the command.

5. API Endpoints

Method

Endpoint

Description

GET

/

API information

GET

/health

Health check

GET

/api/posts

Retrieve processed posts

GET

/api/posts?limit=10

Retrieve up to 10 posts

GET

/api/posts?sentiment=Positive

Filter by sentiment

GET

/api/posts?topic=general

Filter by topic

GET

/api/posts?limit=10&offset=0

Paginated retrieval

GET

/api/sentiment/summary

Sentiment statistics

GET

/api/sentiment/trends

Daily sentiment trends

GET

/api/topics/summary

Topic-wise statistics

The filtering, pagination, trends, and topic analytics endpoints are available in the updated API implementation. Test them against your current data before relying on their output.

6. Frontend Development

The frontend can initially be developed using mock JSON data.

Recommended dashboard components:

Total posts summary

Positive, negative, and neutral sentiment counts

Sentiment distribution chart

Sentiment trends chart

Recent posts table

Sentiment and topic filters

Pagination

Once the frontend and backend are ready, connect the frontend to the API.

The API must be running on a machine accessible to the frontend. A local API on one developer's computer is not automatically accessible to another developer.

7. Data Format

Processed posts are stored in JSON Lines format, with one JSON object per line.

An illustrative record is:

{
  "id": "post_001",
  "uri": "at://example/post_001",
  "text": "Today was wonderful!",
  "platform": "bluesky",
  "topic": "general",
  "sentiment": "Positive",
  "compound_score": 0.75,
  "created_utc": "2026-10-28T13:30:00Z",
  "collected_utc": "2026-10-28T13:31:00Z"
}

This example illustrates the expected structure. Actual field names and values should match the records produced by the data pipeline.