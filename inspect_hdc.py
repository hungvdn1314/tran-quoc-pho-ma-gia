import sys, json

sys.stdout.reconfigure(encoding='utf-8')
with open('data/deep_scan_results.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

hdc = data.get('high_density_chapters', [])
hdc_300_600 = [x for x in hdc if 301 <= x.get('chapter', 0) <= 600]
print(f'Total high density in 301-600: {len(hdc_300_600)}')
for x in hdc_300_600:
    print(f"Ch.{x['chapter']}: {x.get('title')} | {list(x.get('categories', {}).keys())}")
