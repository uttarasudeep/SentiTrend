
import json
from datetime import datetime

REQUIRED_FIELDS = {
    "id",
    "topic",
    "subreddit",
    "text",
    "created_utc",
}


def validate_comments(comments):
    if not isinstance(comments, list):
        print("ERROR: The JSON data must be a list.")
        return False

    seen_ids = set()
    errors = []

    for index, comment in enumerate(comments):
        record_number = index + 1

        if not isinstance(comment, dict):
            errors.append(
                f"Record {record_number} must be a JSON object."
            )
            continue

        missing = REQUIRED_FIELDS - comment.keys()

        if missing:
            errors.append(
                f"Record {record_number} is missing: "
                f"{', '.join(sorted(missing))}"
            )
            continue

        # Validate unique IDs
        comment_id = comment["id"]

        if not isinstance(comment_id, str) or not comment_id.strip():
            errors.append(f"Record {record_number} has an invalid ID.")
        elif comment_id in seen_ids:
            errors.append(f"Duplicate ID found: {comment_id}")
        else:
            seen_ids.add(comment_id)

        # Validate text fields
        for field in ("topic", "subreddit", "text"):
            value = comment[field]

            if not isinstance(value, str) or not value.strip():
                errors.append(
                    f"Record {record_number} has an empty or invalid "
                    f"'{field}'."
                )

        # Validate ISO 8601 timestamp, e.g. 2026-10-19T10:00:00Z
        timestamp = comment["created_utc"]

        try:
            if not isinstance(timestamp, str):
                raise ValueError("Timestamp must be a string")

            datetime.fromisoformat(
                timestamp.replace("Z", "+00:00")
            )

        except ValueError:
            errors.append(
                f"Record {record_number} has an invalid "
                f"created_utc timestamp: {timestamp!r}"
            )

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return False

    print(f"Validation successful: {len(comments)} records checked.")
    return True


def main():
    try:
        with open("sample_data.json", "r", encoding="utf-8") as file:
            comments = json.load(file)

    except (OSError, json.JSONDecodeError) as error:
        print(f"Could not read sample_data.json: {error}")
        return

    validate_comments(comments)


if __name__ == "__main__":
    main()
