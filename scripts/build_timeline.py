"""
Build chronological timeline from Game Bible V2 data.
Organize all events, battles, political events by chapter number.
Suggest natural Act boundaries for game structure.
"""
import json
import sys
from pathlib import Path
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = Path("c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/game_bible_v2")
OUTPUT = DATA_DIR.parent / "story_timeline.json"

def extract_chapter_nums(text):
    """Extract chapter numbers from various text formats."""
    import re
    nums = []
    # Match patterns like "Ch.123", "Chương 123", "ch.123", "chương 123"
    for m in re.finditer(r'[Cc]h(?:ương|\.)\s*(\d+)', str(text)):
        nums.append(int(m.group(1)))
    # Match standalone numbers in chapter fields
    for m in re.finditer(r'\b(\d{1,4})\b', str(text)):
        n = int(m.group(1))
        if 1 <= n <= 1509:
            nums.append(n)
    return sorted(set(nums)) if nums else []

def get_chapter_range(item):
    """Extract chapter range from an item."""
    chapters = []
    
    # Check common field names for chapter info
    for key in ['chapter_range', 'chapters', 'chapter', 'first_appearance',
                'first_appearance_in_range', 'chapter_introduced', 'when',
                'timing', 'arc_chapters', 'chapter_num', 'chương']:
        if key in item:
            val = item[key]
            nums = extract_chapter_nums(str(val))
            chapters.extend(nums)
    
    # Also check the entire item for chapter references
    item_str = json.dumps(item, ensure_ascii=False)
    all_nums = extract_chapter_nums(item_str)
    
    # Prefer specific chapter fields, fall back to all references
    if chapters:
        return min(chapters), max(chapters)
    elif all_nums:
        return min(all_nums), max(all_nums)
    return None, None

def load_category(filename):
    fpath = DATA_DIR / filename
    if fpath.exists():
        with open(fpath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def get_item_name(item):
    """Get display name from item."""
    for key in ['canonical_name', 'name', 'battle_name', 'event_name', 
                'location_name', 'tech_name', 'title']:
        if key in item and item[key]:
            return item[key]
    # First string value
    for v in item.values():
        if isinstance(v, str) and 3 < len(v) < 100:
            return v
    return "Unknown"

def get_item_desc(item):
    """Get description from item."""
    for key in ['description', 'summary', 'lore_bio', 'biography', 'details',
                'outcome', 'significance', 'consequences']:
        if key in item and item[key]:
            val = item[key]
            if isinstance(val, str):
                return val[:200]
    return ""

def build_timeline():
    print("Building chronological timeline from Game Bible V2...")
    
    # Load all categories
    categories = {
        'battles': load_category('battles.json'),
        'key_plot_events': load_category('key_plot_events.json'),
        'political_events': load_category('political_events.json'),
        'technologies': load_category('technologies.json'),
    }
    
    # Build timeline entries
    timeline = []
    for cat_name, items in categories.items():
        for item in items:
            start_ch, end_ch = get_chapter_range(item)
            if start_ch:
                timeline.append({
                    'category': cat_name,
                    'name': get_item_name(item),
                    'description': get_item_desc(item),
                    'start_chapter': start_ch,
                    'end_chapter': end_ch or start_ch,
                    'chapter_span': (end_ch or start_ch) - start_ch + 1,
                })
    
    # Sort by start chapter
    timeline.sort(key=lambda x: (x['start_chapter'], x['end_chapter']))
    
    print(f"\nTotal timeline entries: {len(timeline)}")
    
    # Identify natural Act boundaries based on major events
    # Key milestone chapters from deep analysis
    act_boundaries = [
        (1, 50, "Xuyên Việt & Sinh Tồn", "Quý Bình An xuyên việt, triệu hoán Triệu Vân, chiến đấu sinh tồn trong hoàng cung"),
        (51, 110, "Đế Đô Quyền Mưu", "Điển Vi xuất thế, đối đầu Tô Kiến Phong, Vũ Hoàng trúng độc băng hà, Tân Hoàng đăng cơ"),
        (111, 190, "Bắc Cảnh Dựng Cờ", "Xây dựng lực lượng tại Bắc Cảnh, Hỏa công Bắc Cô Sơn, phát minh Lưu Hỏa, Cơ Quan Nỏ"),
        (191, 260, "Trấn Quốc Công", "Đại hôn Điêu Thuyền, bức cung phong Trấn Quốc Công, Tuân Úc làm Thừa Tướng"),
        (261, 325, "Chinh Phạt Biên Giới", "Huyết chiến Hồn Huyết Sơn, chiến dịch Lâm Quan Thành, bẻ gãy Tây Lăng Thiết Kỵ"),
        (326, 386, "Đăng Cơ Hoàng Đế", "Hệ thống Tranh Bá, Mã Siêu triệu hoán, Đăng cơ Hoàng Đế Đại Hán, Bốn Chính Lệnh"),
        (387, 460, "Định Quốc Năm Đầu", "Quách Gia đột phá Dự Phán, Đại chiến Ngưu Khánh Châu, Chu Du hỏa thiêu"),
        (461, 530, "Kiếm Thánh & Diệt Tần", "Vương Việt thu phục Huyết Y Các, Mã Quân chế Thiết Giáp Môn, diệt môn Tần gia Tây Lăng"),
        (531, 600, "Tứ Quốc Phong Vân", "Đào Nhã quy hoạch giao thông, chiêu hiền Phó Dĩnh Thăng, Quan Vũ triệu hoán, Tây Lăng đại hội"),
        (601, 700, "Chinh Phục Tây Lăng", "Cẩm Quan Thành, Phi Mã Thành, sự kiện Lấy Nước Đổi Nước thâu tóm Nam Ly 55 vạn quân"),
        (701, 777, "Nhất Thống Tứ Quốc", "Gia Cát Lượng Không Thành Kế, Tây Lăng đầu hàng, Đông Thương sụp đổ, dời đô Thần Châu Trường An"),
        (778, 830, "Đại Hải Chiến", "Chu Du đánh Cam Ninh, hỏa thiêu hạm đội Đại La, Lữ Bố Nhân Tiên triệu hoán, miểu sát Bán Tiên"),
        (831, 900, "Viễn Chinh Đại La", "Đánh chiếm Hoa Ước Thành, Lữ Bố vs Đức Bất Nhân, triệu hoán Tư Mã Ý, chân tướng Quý Vô Song"),
        (901, 975, "Quỷ Vương & Thiên Hồn", "Công phá Thiên Hồn Thành, Thác Hạp điên cuồng, Nhân Tiên hỗn chiến Ca Bỉ Hoàng Thành"),
        (976, 1050, "Bốn Mưu Sĩ Hiến Kế", "Tả Từ triệu hoán, Lý Nho hỏa thiêu Bách Khổng Thành, Trầm Hạo đọa ma đột phá"),
        (1051, 1120, "Cực Bắc Thiên Thạch", "Triệu Vân cắt thịt bài độc, Bắc Minh xuất hiện, Quỷ Vương bị trảm"),
        (1121, 1200, "Đại Phản Công", "Thu hồi Linh Ích Thành, vây hãm Kinh Bắc Thành, Tả Từ đắp đập thủy công"),
        (1201, 1300, "Toàn Diện Công Quốc", "Quan Vũ lên Nhân Tiên, chiến dịch bộc phá Doanh Kinh, nhân thể tạc đạn"),
        (1301, 1400, "A Bố Song Sinh Ngũ Thân", "A Bố lộ diện, Lữ Bố đột phá 160, Triệu Vân tử chiến & phục sinh"),
        (1401, 1485, "Thiên Hạ Quyết Chiến", "Quý Thiên Tứ hy sinh, Quách Gia tuẫn quốc, Vương Việt đồng quy vu tận"),
        (1486, 1509, "Đại Hán Thịnh Thế", "Thiên Băng Địa Liệt, chôn vùi 60 vạn quân, thu phục Phượng Hoàng, thống nhất thiên hạ"),
    ]
    
    # Map timeline events to Acts
    acts_with_events = []
    for act_num, (start, end, title, desc) in enumerate(act_boundaries, 1):
        act_events = [e for e in timeline if start <= e['start_chapter'] <= end]
        acts_with_events.append({
            'act_number': act_num,
            'title': title,
            'description': desc,
            'chapter_range': f"Ch.{start}-{end}",
            'start_chapter': start,
            'end_chapter': end,
            'num_events': len(act_events),
            'events': act_events,
        })
    
    # Save
    output_data = {
        'total_acts': len(acts_with_events),
        'total_timeline_events': len(timeline),
        'acts': acts_with_events,
        'full_timeline': timeline,
    }
    
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"\nSaved to: {OUTPUT}")
    print(f"\n{'='*70}")
    print(f"STORY ARC STRUCTURE: {len(acts_with_events)} ACTS")
    print(f"{'='*70}")
    for act in acts_with_events:
        icon = "⚔️" if act['num_events'] > 5 else "📖"
        print(f"\n{icon} Act {act['act_number']:02d}: {act['title']}")
        print(f"   {act['chapter_range']} | {act['num_events']} events")
        print(f"   {act['description']}")

if __name__ == '__main__':
    build_timeline()
