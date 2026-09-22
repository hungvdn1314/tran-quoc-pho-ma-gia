import urllib.request, json, os

with open('scripts/character_urls.json', 'r', encoding='utf-8') as f:
    urls = json.load(f)

out_dir = 'prototype/assets/images/candidates'
os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for title, url in urls.items():
    filename = title.replace('File:', '').replace(' ', '_')
    dest = os.path.join(out_dir, filename)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f_out:
                f_out.write(resp.read())
            print(f"Downloaded: {filename}")
        except Exception as e:
            print(f"Error downloading {filename}: {e}")
    else:
        print(f"Already exists: {filename}")
