import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(ch):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

def summarize_chapter(ch):
    d = read_ch(ch)
    content = d['content']
    lines = [l.strip() for l in content.split('\n') if l.strip()]
    print(f"=== CHƯƠNG {ch}: {d['title']} ===")
    print(f"Số từ: {d.get('word_count', len(content))}, Số đoạn: {len(lines)}")
    # print first 2 and last 2 lines
    for l in lines[:2]:
        print("  [ĐẦU]", l[:140])
    for l in lines[-2:]:
        print("  [CUỐI]", l[:140])
    print()

if __name__ == '__main__':
    ranges = [
        (1, 10),
        (13, 20),
        (24, 29),
        (34, 50),
        (60, 70),
        (77, 90),
        (95, 110),
        (120, 160),
        (190, 200),
        (245, 300)
    ]
    if len(sys.argv) > 1:
        ch_list = [int(x) for x in sys.argv[1:]]
        for c in ch_list:
            summarize_chapter(c)
    else:
        print("Provide chapter numbers as arguments.")
