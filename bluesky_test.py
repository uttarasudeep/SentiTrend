
import asyncio
import json
import websockets

JETSTREAM_URL = "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post"


async def main():
    print("Connecting to Bluesky Jetstream...")

    try:
        async with websockets.connect(JETSTREAM_URL) as websocket:
            print("Connected! Waiting for live posts...\n")

            count = 0

            async for message in websocket:
                event = json.loads(message)

                if event.get("kind") != "commit":
                    continue

                record = event.get("commit", {}).get("record", {})
                text = record.get("text")

                if not text:
                    continue

                print(f"Post: {text}\n")
                count += 1

                if count >= 5:
                    print("Received 5 posts. Test complete!")
                    break

    except Exception as error:
        print(f"Connection failed: {error}")


if __name__ == "__main__":
    asyncio.run(main())
