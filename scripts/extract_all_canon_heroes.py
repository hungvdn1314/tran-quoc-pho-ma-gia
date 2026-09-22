import sys, json, os, re

sys.stdout.reconfigure(encoding='utf-8')

pattern_summon = re.compile(r'(?:thành công triệu hoán|triệu hoán thành công|kích hoạt anh linh|triệu hoán tuyệt thế|triệu hoán vạn kim|triệu hoán 10 vạn kim|triệu hoán thiên kim|triệu hoán thiên mệnh).*?[:：\s]+([^\n,，!！]+)', re.IGNORECASE)

records = []

with open('data/chapters_raw.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        ch = json.loads(line)
        num = ch.get('chapter_number', 0)
        content = ch.get('content', '')
        lines = content.split('\n')
        
        # Check attribute blocks
        for i, l in enumerate(lines):
            l_strip = l.strip()
            if any(k in l_strip.lower() for k in ['"võ tướng:', '"mưu thần:', '"văn thần:', '"anh linh:', 'võ tướng: ', 'mưu thần: ']):
                block = lines[max(0, i-1):min(len(lines), i+12)]
                records.append({
                    'chapter': num,
                    'type': 'panel',
                    'text': '\n'.join(block)
                })

print(f"Total panels found: {len(records)}")
for r in records[:30]:
    print(f"--- Chapter {r['chapter']} ---")
    print(r['text'])
    print()
