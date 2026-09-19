# -*- coding: utf-8 -*-
import json, sys, os

sys.stdout.reconfigure(encoding='utf-8')

# Load existing extraction
with open('data/extraction_arc2_ch301_600.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Load extra characters
with open('extra_chars.py', 'r', encoding='utf-8') as f:
    content = f.read()

locs = {}
exec(content, locs)
extra_chars = locs.get('extra_characters', [])

# Check existing IDs
existing_ids = {c['id'] for c in data['characters']}
added = 0
for ec in extra_chars:
    if ec['id'] not in existing_ids:
        data['characters'].append(ec)
        existing_ids.add(ec['id'])
        added += 1

print(f"Added {added} extra characters. Total characters now: {len(data['characters'])}")

# Save back to file
output_path = 'data/extraction_arc2_ch301_600.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Saved {output_path} successfully. File size: {os.path.getsize(output_path)} bytes")
