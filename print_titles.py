import json

with open('data/chapter_titles_301_600.json', 'r', encoding='utf-8') as f:
    titles = json.load(f)

for t in titles:
    print(f"Ch.{t['num']}: {t['title']}")
