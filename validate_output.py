import sys, json

sys.stdout.reconfigure(encoding='utf-8')
with open('data/extraction_arc2_ch301_600.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('=== VALIDATION SUMMARY ===')
for key, val in data.items():
    if isinstance(val, list):
        print(f'{key}: {len(val)} items')
    elif isinstance(val, dict):
        print(f'{key}: {list(val.keys())}')

print('\nCheck high-priority focus characters:')
char_names = [c['canonical_name'] for c in data['characters']]
for target in ['Trương Liêu', 'Mã Siêu', 'Quách Gia', 'Trương Phi', 'Vương Việt', 'Mạc Thiên Tinh', 'Quan Vũ', 'Hoa Đà', 'Mã Quân', 'Đào Nhã']:
    status = "FOUND" if target in char_names else "MISSING"
    print(f'  {target}: {status}')

print('\nCheck system mechanics upgrade:')
print('  Upgrade chapter:', data['system_mechanics_upgrade']['upgrade_milestone_chapter'])
print('  Stage:', data['system_mechanics_upgrade']['system_phase'])

print('\nCheck organizations:')
for org in data['organizations']:
    print(f"  - {org['name']} (Leader: {org['leader']})")

print('\nCheck battles:')
for b in data['battles']:
    print(f"  - Ch.{b['chapter_range'][0]}-{b['chapter_range'][1]}: {b['name']} ({b['location']})")

print('\nCheck key plot events:')
for e in data['key_plot_events']:
    print(f"  - Ch.{e['chapter']}: {e['title']}")

print('\nCheck technologies:')
for t in data['technology_and_inventions']:
    print(f"  - Ch.{t['chapter_introduced']}: {t['name']} (By {t['inventor']})")

print('\nCheck political events:')
for p in data['political_events']:
    print(f"  - Ch.{p['chapter']}: {p['title']}")
