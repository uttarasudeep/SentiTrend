
import json

with open("sample_data.json", "r", encoding="utf-8") as file:
    comments = json.load(file)

print("Total comments:", len(comments))
print()

for comment in comments:
    print("ID:", comment["id"])
    print("Topic:", comment["topic"])
    print("Text:", comment["text"])
    print("-" * 40)
