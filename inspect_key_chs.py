import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for ch_num in [326, 350, 354, 360]:
    data = read_ch(ch_num)
    print(f"================== CH.{ch_num}: {data['title']} ==================")
    print(data['content'][:2500])
    print("\n------------------ END PART 1 ------------------\n")
    if len(data['content']) > 2500:
        print(data['content'][2500:5000])
