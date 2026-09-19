import sys, os, json

sys.stdout.reconfigure(encoding='utf-8')

raw_dir = 'data/raw_chapters'
chapters_info = []

for ch_num in range(301, 601):
    fname = f"chuong_{ch_num:04d}.json"
    fpath = os.path.join(raw_dir, fname)
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            chapters_info.append({
                'num': ch_num,
                'title': data.get('title', ''),
                'words': data.get('word_count', 0)
            })
    else:
        chapters_info.append({'num': ch_num, 'missing': True})

print(f"Total checked: {len(chapters_info)}")
missing = [c for c in chapters_info if 'missing' in c]
print(f"Missing chapters: {len(missing)}")

# Print all titles in batches or save to a file for easy reading
with open('data/chapter_titles_301_600.json', 'w', encoding='utf-8') as f:
    json.dump(chapters_info, f, ensure_ascii=False, indent=2)

print("Saved titles to data/chapter_titles_301_600.json")
