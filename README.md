
# SentiTrend

SentiTrend is a big data project that aims to track sentiment shifts in conversations about trending topics using Reddit-style data and real-time stream processing.

## Current Features

- Sample conversational data stored in JSON format
- Data reading and validation scripts
- Python Kafka producer
- Kafka topic named `reddit-raw`
- Sample messages published to Kafka and verified with a consumer

## Project Files

- `sample_data.json` — sample conversation records
- `read_data.py` — reads sample data
- `validate_data.py` — validates sample data
- `kafka_producer.py` — sends records to Kafka
- `requirements.txt` — Python dependency list
- `.gitignore` — excludes generated files and the virtual environment

## Prerequisites

- Python installed
- Java installed
- Apache Kafka installed and configured

## Setup

Activate your Python virtual environment and install the dependencies:

```powershell
python -m pip install -r requirements.txt
```

Start your Kafka server in a separate terminal.

## Run the Producer

From the SentiTrend project folder, run:

```powershell
python kafka_producer.py
```

The producer reads `sample_data.json` and sends each record to the Kafka topic `reddit-raw`.

## Important Note

The current records are fictional sample data for development and testing. They are not live Reddit comments. Live Reddit data integration and sentiment analysis are future steps.
