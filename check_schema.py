import sys, json

sys.stdout.reconfigure(encoding='utf-8')

for fname in ['characters.json', 'battles.json', 'court_events.json', 'tech_tree.json', 'troop_types.json']:
    print(f"=== {fname} ===")
    with open(f'data/game_bible/{fname}', 'r', encoding='utf-8') as f:
        data = json.load(f)
    if isinstance(data, dict):
        keys = list(data.keys())
        print(f"Keys ({len(keys)}): {keys[:5]}")
        if keys:
            print("Sample entry:", json.dumps(data[keys[0]], ensure_ascii=False, indent=2)[:500])
    elif isinstance(data, list):
        print(f"List length: {len(data)}")
        if data:
            print("Sample item:", json.dumps(data[0], ensure_ascii=False, indent=2)[:500])
