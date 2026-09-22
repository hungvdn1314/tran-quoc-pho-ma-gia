import os
import glob
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Comprehensive extraction of all Tam Quoc Anh Linh from the 1509 chapters
pattern_summon = re.compile(
    r'(?:thành công triệu hoán|triệu hoán thành công|kích hoạt anh linh|triệu hoán tuyệt thế|triệu hoán vạn kim|triệu hoán 10 vạn kim|triệu hoán 50 ngàn kim|triệu hoán thiên kim|triệu hoán thiên mệnh).*?[:：\s]+([^\n,，!！]+)',
    re.IGNORECASE
)

# Known canonical hero database with extracted lore and stats across the novel
# We will build/enrich this programmatically and verify with chapter text.

print("Scanning 1509 chapters for complete Tam Quốc Anh Linh summonings & attribute panels...")

files = sorted(glob.glob('data/raw_chapters/chuong_*.json'))
summon_events = []

for fpath in files:
    ch_num = int(os.path.basename(fpath).replace('chuong_', '').replace('.json', ''))
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        content = data.get('content', '')
        
        # Look for summons
        for m in pattern_summon.finditer(content):
            val = m.group(0).strip()
            summon_events.append({'ch': ch_num, 'text': val})

print(f"Total summon mentions found: {len(summon_events)}")
for s in summon_events[:40]:
    print(f"Ch.{s['ch']}: {s['text']}")
