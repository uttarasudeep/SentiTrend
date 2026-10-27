import json
from collections import Counter
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "processed_posts.jsonl"


def load_posts():
    if not DATA_FILE.exists():
        return []

    posts = []

    with DATA_FILE.open("r", encoding="utf-8") as file:
        for line in file:
            try:
                posts.append(json.loads(line))
            except json.JSONDecodeError:
                continue

    return posts


class APIHandler(BaseHTTPRequestHandler):

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")

        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        request = urlparse(self.path)
        params = parse_qs(request.query)

        if request.path == "/health":
            self.send_json({
                "status": "ok",
                "service": "SentiTrend API"
            })
            return

        posts = load_posts()

        if request.path == "/api/posts":
            try:
                limit = int(params.get("limit", ["100"])[0])
            except ValueError:
                self.send_json({"error": "limit must be an integer"}, 400)
                return

            if limit < 1:
                self.send_json({"error": "limit must be positive"}, 400)
                return

            limit = min(limit, 500)
            latest = list(reversed(posts[-limit:]))

            self.send_json({
                "count": len(latest),
                "posts": latest
            })
            return

        if request.path == "/api/sentiment/summary":
            counts = Counter(
                post.get("sentiment", "Unknown")
                for post in posts
            )

            scores = [
                post["compound_score"]
                for post in posts
                if isinstance(post.get("compound_score"), (int, float))
            ]

            self.send_json({
                "total_posts": len(posts),
                "positive": counts.get("Positive", 0),
                "negative": counts.get("Negative", 0),
                "neutral": counts.get("Neutral", 0),
                "average_compound_score": (
                    round(sum(scores) / len(scores), 4)
                    if scores else 0.0
                )
            })
            return

        self.send_json({"error": "Endpoint not found"}, 404)

    def log_message(self, format, *args):
        print(f"API: {format % args}")


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 8000), APIHandler)
    print("SentiTrend API running at http://localhost:8000")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping SentiTrend API...")
    finally:
        server.server_close()