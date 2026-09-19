import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(ch):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

def search_keywords(ch_start, ch_end, keywords):
    for ch in range(ch_start, ch_end + 1):
        d = read_ch(ch)
        matches = []
        for p in d['content'].split('\n'):
            p_strip = p.strip()
            if any(k.lower() in p_strip.lower() for k in keywords):
                matches.append(p_strip)
        if matches:
            print(f"=== Ch {ch}: {d['title']} ({len(matches)} matches) ===")
            for m in matches[:5]:
                print(f"  - {m[:160]}")
            if len(matches) > 5:
                print(f"  ... và {len(matches) - 5} đoạn khác.")

if __name__ == '__main__':
    start = int(sys.argv[1])
    end = int(sys.argv[2])
    kws = sys.argv[3:]
    search_keywords(start, end, kws)
