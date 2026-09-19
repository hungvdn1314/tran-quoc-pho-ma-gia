import json

with open('data/chapter_titles_301_600.json', 'r', encoding='utf-8') as f:
    titles = json.load(f)

with open('titles_301_600.txt', 'w', encoding='utf-8') as out:
    for t in titles:
        out.write(f"Ch.{t['num']}: {t['title']}\n")
print('Wrote titles_301_600.txt successfully')
