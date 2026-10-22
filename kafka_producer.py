
import json
from datetime import datetime
from kafka import KafkaProducer
from kafka.errors import KafkaError

REQUIRED_FIELDS = {
    "id",
    "topic",
    "subreddit",
    "text",
    "created_utc",
}


def validate_comments(comments):
    if not isinstance(comments, list):
        raise ValueError("Sample data must be a JSON list.")

    seen_ids = set()

    for index, comment in enumerate(comments, start=1):
        if not isinstance(comment, dict):
            raise ValueError(f"Record {index} must be a JSON object.")

        missing = REQUIRED_FIELDS - comment.keys()
        if missing:
            raise ValueError(
                f"Record {index} is missing: {', '.join(sorted(missing))}"
            )

        comment_id = comment["id"]

        if not isinstance(comment_id, str) or not comment_id.strip():
            raise ValueError(f"Record {index} has an invalid ID.")

        if comment_id in seen_ids:
            raise ValueError(f"Duplicate ID found: {comment_id}")

        seen_ids.add(comment_id)

        for field in ("topic", "subreddit", "text"):
            if not isinstance(comment[field], str) or not comment[field].strip():
                raise ValueError(
                    f"Record {index} has an empty or invalid '{field}'."
                )

        timestamp = comment["created_utc"]

        if not isinstance(timestamp, str):
            raise ValueError(f"Record {index} has an invalid timestamp.")

        try:
            datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
        except ValueError:
            raise ValueError(
                f"Record {index} has an invalid timestamp: {timestamp!r}"
            )

    print(f"Validation successful: {len(comments)} records checked.")


def main():
    producer = None

    try:
        with open("sample_data.json", "r", encoding="utf-8") as file:
            comments = json.load(file)

        # Validate everything before connecting or sending
        validate_comments(comments)

        producer = KafkaProducer(
            bootstrap_servers="localhost:9092",
            value_serializer=lambda value: json.dumps(value).encode("utf-8"),
            request_timeout_ms=10000,
        )

        successful = 0

        for comment in comments:
            metadata = producer.send("reddit-raw", comment).get(timeout=10)
            successful += 1

            print(
                f"Delivered: {comment['id']} | "
                f"Topic: {metadata.topic} | "
                f"Partition: {metadata.partition} | "
                f"Offset: {metadata.offset}"
            )

        print(f"\nSuccessfully delivered: {successful}/{len(comments)}")
        print("All comments sent to Kafka successfully!")

    except (OSError, json.JSONDecodeError, ValueError) as error:
        print(f"Data error: {error}")

    except (KafkaError, TimeoutError) as error:
        print(f"Kafka delivery error: {error}")

    finally:
        if producer is not None:
            producer.close()


if __name__ == "__main__":
    main()
