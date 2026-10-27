
import asyncio
import json
import logging
from datetime import datetime, timezone

import websockets
from kafka import KafkaProducer
from kafka.errors import KafkaError


# ---------------- CONFIGURATION ----------------

JETSTREAM_URL = (
    "wss://jetstream2.us-east.bsky.network/subscribe"
    "?wantedCollections=app.bsky.feed.post"
)

KAFKA_SERVER = "localhost:9092"
KAFKA_TOPIC = "bluesky-posts"

RECONNECT_DELAY = 5


# ---------------- LOGGING ----------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger(__name__)


# ---------------- KAFKA PRODUCER ----------------

def create_kafka_producer():
    """Create a Kafka producer and verify broker connectivity."""

    logger.info("Connecting to Kafka at %s...", KAFKA_SERVER)

    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_SERVER],
        value_serializer=lambda value: json.dumps(
            value,
            ensure_ascii=False,
        ).encode("utf-8"),
        acks="all",
        retries=5,
        request_timeout_ms=30000,
        max_block_ms=30000,
    )

    # Force a metadata request to check broker connectivity.
    producer.partitions_for(KAFKA_TOPIC)

    logger.info("Connected to Kafka producer.")
    logger.info("Kafka topic: %s", KAFKA_TOPIC)

    return producer


# ---------------- PROCESS BLUESKY EVENTS ----------------

def process_event(event, producer):
    """Validate a Bluesky event and publish new posts to Kafka."""

    if event.get("kind") != "commit":
        return False

    commit = event.get("commit", {})

    # Process only newly created posts.
    if commit.get("operation") != "create":
        return False

    if commit.get("collection") != "app.bsky.feed.post":
        return False

    record = commit.get("record", {})
    post_text = record.get("text", "").strip()

    if not post_text:
        return False

    did = event.get("did", "")
    rkey = commit.get("rkey", "")

    created_at = record.get("createdAt")

    if not created_at:
        created_at = datetime.now(timezone.utc).isoformat()

    # Store a consistent, semi-structured JSON record.
    post = {
        "id": f"{did}:{rkey}",
        "uri": (
            f"at://{did}/app.bsky.feed.post/{rkey}"
        ),
        "platform": "bluesky",
        "topic": "general",
        "text": post_text,
        "created_utc": created_at,
        "collected_utc": datetime.now(
            timezone.utc
        ).isoformat(),
    }

    try:
        # Publish the post and wait for Kafka acknowledgement.
        future = producer.send(KAFKA_TOPIC, value=post)
        metadata = future.get(timeout=30)

        logger.info(
            "POST PUBLISHED | topic=%s | partition=%s | offset=%s",
            metadata.topic,
            metadata.partition,
            metadata.offset,
        )

        logger.info("Post text: %s", post_text[:200])

        return True

    except (KafkaError, TimeoutError, OSError) as error:
        logger.error("Failed to publish post to Kafka: %s", error)
        return False


# ---------------- BLUESKY STREAM ----------------

async def collect_posts(producer):
    """Connect to Jetstream and reconnect after interruptions."""

    published_count = 0

    while True:
        try:
            logger.info("Connecting to Bluesky Jetstream...")

            async with websockets.connect(
                JETSTREAM_URL,
                ping_interval=20,
                ping_timeout=60,
                open_timeout=30,
                close_timeout=10,
                max_size=2**20,
            ) as websocket:

                logger.info(
                    "Connected to Bluesky Jetstream. "
                    "Waiting for posts..."
                )

                async for message in websocket:
                    try:
                        event = json.loads(message)

                        if process_event(event, producer):
                            published_count += 1

                            logger.info(
                                "Total posts published: %s",
                                published_count,
                            )

                    except json.JSONDecodeError:
                        logger.warning(
                            "Received an invalid JSON event; skipping."
                        )

                    except Exception:
                        logger.exception(
                            "Error processing a Bluesky event."
                        )

                # If the server closes the stream normally,
                # reconnect rather than stopping the collector.
                logger.warning(
                    "Bluesky stream closed. Reconnecting..."
                )

        except asyncio.CancelledError:
            raise

        except Exception as error:
            logger.warning(
                "Bluesky connection interrupted: %s",
                error,
            )

        logger.info("Retrying Bluesky connection in %s seconds...",
                    RECONNECT_DELAY)

        await asyncio.sleep(RECONNECT_DELAY)


# ---------------- MAIN ----------------

async def main():
    producer = None

    try:
        producer = create_kafka_producer()

        await collect_posts(producer)

    except KeyboardInterrupt:
        logger.info("Stopping Bluesky collector...")

    except Exception:
        logger.exception("Collector encountered a fatal error.")

    finally:
        if producer is not None:
            try:
                producer.flush(timeout=10)
                producer.close(timeout=10)
            except Exception:
                logger.exception("Error closing Kafka producer.")

        logger.info("Bluesky collector stopped.")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nCollector stopped by user.")
