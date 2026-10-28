
import json
from collections import Counter, defaultdict
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs


# --------------------------------------------------
# Configuration
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "processed_posts.jsonl"

HOST = "0.0.0.0"
PORT = 8000
MAX_LIMIT = 500


# --------------------------------------------------
# Data Loading
# --------------------------------------------------

def load_posts():
    """Load processed posts from the JSONL file."""

    if not DATA_FILE.exists():
        return []

    posts = []

    try:
        with DATA_FILE.open("r", encoding="utf-8") as file:
            for line in file:
                try:
                    post = json.loads(line)

                    if isinstance(post, dict):
                        posts.append(post)

                except json.JSONDecodeError:
                    continue

    except OSError as error:
        print(f"Error reading data file: {error}")

    return posts


# --------------------------------------------------
# Utility Functions
# --------------------------------------------------

def parse_timestamp(value):
    """Parse an ISO-formatted timestamp."""

    if not isinstance(value, str) or not value.strip():
        return None

    try:
        return datetime.fromisoformat(
            value.strip().replace("Z", "+00:00")
        )

    except ValueError:
        return None


def get_sentiment(post):
    """Return a normalized sentiment label."""

    sentiment = post.get("sentiment", "Unknown")

    if not isinstance(sentiment, str):
        return "Unknown"

    sentiment = sentiment.strip().capitalize()

    if sentiment in {"Positive", "Negative", "Neutral"}:
        return sentiment

    return "Unknown"


def get_topic(post):
    """Return the post topic."""

    topic = post.get("topic", "unknown")

    if topic is None or not str(topic).strip():
        return "unknown"

    return str(topic).strip()


# --------------------------------------------------
# HTTP Handler
# --------------------------------------------------

class APIHandler(BaseHTTPRequestHandler):

    def send_json(self, data, status=200):
        """Send a JSON response."""

        body = json.dumps(
            data,
            ensure_ascii=False
        ).encode("utf-8")

        self.send_response(status)
        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS"
        )
        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()

        self.wfile.write(body)

    def do_OPTIONS(self):
        """Handle CORS preflight requests."""

        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS"
        )
        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):

        request = urlparse(self.path)
        params = parse_qs(request.query)
        path = request.path

        # --------------------------------------------------
        # Root endpoint
        # --------------------------------------------------

        if path == "/":
            self.send_json({
                "service": "SentiTrend API",
                "status": "running",
                "endpoints": {
                    "health": "/health",
                    "posts": "/api/posts",
                    "sentiment_summary": "/api/sentiment/summary",
                    "sentiment_trends": "/api/sentiment/trends",
                    "topic_summary": "/api/topics/summary"
                }
            })
            return

        # --------------------------------------------------
        # Health endpoint
        # --------------------------------------------------

        if path == "/health":
            self.send_json({
                "status": "ok",
                "service": "SentiTrend API"
            })
            return

        # Load posts for data endpoints.
        posts = load_posts()

        # --------------------------------------------------
        # Get posts, filter, and paginate
        # --------------------------------------------------

        if path == "/api/posts":

            sentiment_filter = params.get("sentiment", [None])[0]
            topic_filter = params.get("topic", [None])[0]

            if sentiment_filter is not None:
                sentiment_filter = sentiment_filter.strip().capitalize()

                if sentiment_filter not in {
                    "Positive", "Negative", "Neutral"
                }:
                    self.send_json({
                        "error": (
                            "sentiment must be Positive, "
                            "Negative, or Neutral"
                        )
                    }, 400)
                    return

            if topic_filter is not None:
                topic_filter = topic_filter.strip().casefold()

                if not topic_filter:
                    self.send_json({
                        "error": "topic cannot be empty"
                    }, 400)
                    return

            # Filter posts before pagination.
            filtered_posts = posts

            if sentiment_filter:
                filtered_posts = [
                    post for post in filtered_posts
                    if get_sentiment(post) == sentiment_filter
                ]

            if topic_filter:
                filtered_posts = [
                    post for post in filtered_posts
                    if get_topic(post).casefold() == topic_filter
                ]

            # Parse pagination parameters.
            try:
                limit = int(params.get("limit", ["100"])[0])
                offset = int(params.get("offset", ["0"])[0])

            except ValueError:
                self.send_json({
                    "error": "limit and offset must be integers"
                }, 400)
                return

            if limit < 1:
                self.send_json({
                    "error": "limit must be positive"
                }, 400)
                return

            if offset < 0:
                self.send_json({
                    "error": "offset cannot be negative"
                }, 400)
                return

            limit = min(limit, MAX_LIMIT)

            # Return newest records first based on file order.
            newest_first = list(reversed(filtered_posts))

            page = newest_first[offset:offset + limit]

            self.send_json({
                "count": len(page),
                "total_filtered": len(filtered_posts),
                "limit": limit,
                "offset": offset,
                "posts": page
            })
            return

        # --------------------------------------------------
        # Sentiment summary
        # --------------------------------------------------

        if path == "/api/sentiment/summary":

            counts = Counter(
                get_sentiment(post)
                for post in posts
            )

            scores = [
                post["compound_score"]
                for post in posts
                if (
                    isinstance(post.get("compound_score"), (int, float))
                    and not isinstance(post.get("compound_score"), bool)
                )
            ]

            self.send_json({
                "total_posts": len(posts),
                "positive": counts.get("Positive", 0),
                "negative": counts.get("Negative", 0),
                "neutral": counts.get("Neutral", 0),
                "unknown": counts.get("Unknown", 0),
                "average_compound_score": (
                    round(sum(scores) / len(scores), 4)
                    if scores else 0.0
                )
            })
            return

        # --------------------------------------------------
        # Sentiment trends
        # --------------------------------------------------

        if path == "/api/sentiment/trends":

            # Group posts by date.
            trends = defaultdict(Counter)

            for post in posts:

                timestamp = (
                    post.get("created_utc")
                    or post.get("collected_utc")
                )

                parsed = parse_timestamp(timestamp)

                if parsed is None:
                    continue

                date_key = parsed.date().isoformat()
                sentiment = get_sentiment(post)

                trends[date_key][sentiment] += 1

            result = []

            for date_key in sorted(trends.keys()):

                result.append({
                    "date": date_key,
                    "positive": trends[date_key].get("Positive", 0),
                    "negative": trends[date_key].get("Negative", 0),
                    "neutral": trends[date_key].get("Neutral", 0)
                })

            self.send_json({
                "count": len(result),
                "trends": result
            })
            return

        # --------------------------------------------------
        # Topic summary
        # --------------------------------------------------

        if path == "/api/topics/summary":

            topic_counts = defaultdict(Counter)

            for post in posts:
                topic = get_topic(post)
                sentiment = get_sentiment(post)

                topic_counts[topic][sentiment] += 1

            result = []

            for topic, counts in sorted(topic_counts.items()):

                result.append({
                    "topic": topic,
                    "total_posts": sum(counts.values()),
                    "positive": counts.get("Positive", 0),
                    "negative": counts.get("Negative", 0),
                    "neutral": counts.get("Neutral", 0),
                    "unknown": counts.get("Unknown", 0)
                })

            self.send_json({
                "count": len(result),
                "topics": result
            })
            return

        # --------------------------------------------------
        # Unknown endpoint
        # --------------------------------------------------

        self.send_json({
            "error": "Endpoint not found",
            "available_endpoints": [
                "/",
                "/health",
                "/api/posts",
                "/api/sentiment/summary",
                "/api/sentiment/trends",
                "/api/topics/summary"
            ]
        }, 404)

    def log_message(self, format, *args):
        print(f"API: {format % args}")


# --------------------------------------------------
# Start Server
# --------------------------------------------------

if __name__ == "__main__":

    server = ThreadingHTTPServer((HOST, PORT), APIHandler)

    print(f"SentiTrend API running at http://localhost:{PORT}")
    print(f"Reading posts from: {DATA_FILE}")

    try:
        server.serve_forever()

    except KeyboardInterrupt:
        print("\nStopping SentiTrend API...")

    finally:
        server.server_close()
