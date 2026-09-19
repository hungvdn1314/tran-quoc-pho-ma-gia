import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for ch_num in range(381, 389):
    data = read_ch(ch_num)
    print(f"================== CH.{ch_num}: {data['title']} ==================")
    print(data['content'][:2500])
    if len(data['content']) > 2500:
        print("\n--- PART 2 ---")
        print(data['content'][2500:5000])
