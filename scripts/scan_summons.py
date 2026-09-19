import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(ch):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

def scan_all_range(ranges):
    # Scan characters summoned
    summoned = []
    for ch in range(1, 301):
        d = read_ch(ch)
        title = d['title']
        content = d['content']
        if any(w in content for w in ['kích hoạt', 'triệu hoán', 'triệu hồi', 'võ tướng', 'mưu thần', 'mưu sĩ']) and 'hệ thống' in content.lower():
            for line in content.split('\n'):
                if 'triệu hoán' in line.lower() or 'triệu hồi' in line.lower() or 'kích hoạt' in line.lower():
                    if any(t in line for t in ['võ tướng', 'mưu sĩ', 'mưu thần', 'anh linh', 'tuyệt thế', 'vạn kim', '10 vạn kim']):
                        summoned.append((ch, line.strip()))
    print(f"Total summoned matches: {len(summoned)}")
    for ch, line in summoned[:25]:
        print(f"Ch {ch}: {line[:120]}")

if __name__ == '__main__':
    scan_all_range(None)
