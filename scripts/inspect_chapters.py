import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def read_chapter(ch_num):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch_num:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

def inspect_range(start, end, specific_chapters=None):
    if specific_chapters is None:
        specific_chapters = list(range(start, end + 1))
    for ch in specific_chapters:
        d = read_chapter(ch)
        print(f"=== Chương {ch}: {d['title']} (Words: {d.get('word_count', len(d['content']))}) ===")
        paragraphs = [p.strip() for p in d['content'].split('\n') if p.strip()]
        # Print first few and key paragraphs
        print("Trích đoạn đầu:", " // ".join(paragraphs[:3])[:300])
        print("Trích đoạn cuối:", " // ".join(paragraphs[-2:])[:300])
        print("-" * 60)

if __name__ == '__main__':
    ch_list = [int(x) for x in sys.argv[1:]]
    for ch in ch_list:
        d = read_chapter(ch)
        print(f"=== Chương {ch}: {d['title']} ===")
        paragraphs = [p.strip() for p in d['content'].split('\n') if p.strip()]
        print("Nội dung:")
        for p in paragraphs[:5]:
            print("  ", p)
        print("  ...")
        for p in paragraphs[-4:]:
            print("  ", p)
        print()
