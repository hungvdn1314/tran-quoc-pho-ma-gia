import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(ch):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

def inspect_range(name, ch_start, ch_end, sample_chs=None):
    print("=" * 80)
    print(f"BẮT ĐẦU QUÉT RANGE: {name} (Chương {ch_start} - {ch_end})")
    print("=" * 80)
    if sample_chs is None:
        sample_chs = [ch_start, (ch_start + ch_end) // 2, ch_end]
    for ch in sample_chs:
        d = read_ch(ch)
        print(f"\n--- Chương {ch}: {d['title']} ---")
        lines = [l.strip() for l in d['content'].split('\n') if l.strip()]
        for l in lines[:3]:
            print(f"  [ĐẦU] {l}")
        # print lines with interesting keywords
        kws = ['triệu hoán', 'hoàng giả', 'đế cảnh', 'bán thánh', 'võ tướng', 'mưu thần', 
               'chiến thuật', 'binh', 'đại quân', 'chém', 'giết', 'thừa tướng', 'hoàng đế', 'ý chỉ',
               'lưu hỏa', 'thiên công', 'hồng nhan', 'an tức vệ', 'thiên cơ lâu']
        printed = 0
        for l in lines:
            if any(k in l.lower() for k in kws) and printed < 5:
                print(f"  [KEY] {l[:140]}")
                printed += 1
        for l in lines[-2:]:
            print(f"  [CUỐI] {l}")

if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'all'
    if mode == '1':
        inspect_range("Range 1: Ch 1-10", 1, 10, [1, 2, 3, 5, 7, 8, 10])
    elif mode == '2':
        inspect_range("Range 2: Ch 13-20", 13, 20, [13, 14, 15, 17, 18, 20])
    elif mode == '3':
        inspect_range("Range 3: Ch 24-29", 24, 29, [24, 25, 27, 28, 29])
    elif mode == '4':
        inspect_range("Range 4: Ch 34-50", 34, 50, [34, 38, 41, 44, 48, 50, 52])
    elif mode == '5':
        inspect_range("Range 5: Ch 60-70", 60, 70, [60, 61, 63, 66, 67, 69, 70])
    elif mode == '6':
        inspect_range("Range 6: Ch 77-90", 77, 90, [77, 78, 80, 83, 85, 88, 90])
    elif mode == '7':
        inspect_range("Range 7: Ch 95-110", 95, 110, [95, 97, 100, 104, 105, 108, 109, 110, 114])
    elif mode == '8':
        inspect_range("Range 8: Ch 120-160", 120, 160, [121, 123, 125, 134, 137, 140, 145, 150, 156, 160])
    elif mode == '9':
        inspect_range("Range 9: Ch 190-200", 190, 200, [190, 191, 196, 197, 200, 201, 204, 205])
    elif mode == '10':
        inspect_range("Range 10: Ch 245-300", 245, 300, [245, 247, 251, 255, 260, 264, 272, 276, 288, 296, 300])
