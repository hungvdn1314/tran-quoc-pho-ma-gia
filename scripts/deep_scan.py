"""
Deep scan all 1509 chapters for game elements using keyword matching.
Outputs a comprehensive inventory of characters, orgs, battles, events, locations.
"""
import json
import re
import sys
from pathlib import Path
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
RAW_DIR = DATA_DIR / "raw_chapters"
OUTPUT = DATA_DIR / "deep_scan_results.json"

# Comprehensive keyword categories
SCAN_CATEGORIES = {
    "summoned_heroes": [
        "triệu hoán", "anh linh", "hệ thống", "triệu vân", "giả hủ", "giả hủ", "điển vi",
        "hoàng trung", "chu du", "cam ninh", "quách gia", "cao thuận", "mã siêu",
        "điêu thuyền", "lý nho", "tuân úc", "trương liêu", "bàng thống", "gia cát lượng",
        "lữ bố", "vương việt", "quan vũ", "trương phi", "hoa đà", "tả từ",
        "hứa chử", "trương giác", "khúc nghĩa", "chu thái", "hoa hùng", "liêu hóa",
        "chu thương", "triệu hoán thành công", "vạn kim", "anh linh điểm"
    ],
    "world_characters": [
        "quý bình an", "quý vô song", "ninh an", "vũ hoàng", "tử ngọc",
        "quý bình sinh", "quý bình xuyên", "hề nhan", "vệ ti vũ", "hồng hồ",
        "tô kiến phong", "bùi an hà", "an hàn khôi", "mạc thiên tinh",
        "văn nhân hạo", "thác hạp", "a bố", "bắc minh", "trầm hạo",
        "phượng hoàng", "đức bất nhân", "quỷ vương", "thánh nữ",
        "kim khuê", "tử ngọc trạch", "tử ngọc hằng", "tử ngọc sùng",
        "triệu minh nguyệt", "long vân", "thiên a thị"
    ],
    "factions_orgs": [
        "tây lăng", "nam ly", "bắc cương", "đại vũ", "đông thương",
        "hồng nhan", "cẩm y", "mật thám", "thiên cơ lâu", "an tức vệ",
        "quý gia", "quốc giáo", "thiên a", "ma giáo", "hắc y nhân",
        "cấm vệ", "phi báo quân", "chiến hổ quân", "hãm trận doanh",
        "bạch mã nghĩa tòng", "giang đông thủy quân", "tây lương thiết kỵ",
        "hắc phong đội", "sát thủ", "thích khách", "liên minh",
        "hoàng thất", "triều đình", "văn học viện"
    ],
    "battles_wars": [
        "đại chiến", "công thành", "thủ thành", "thủy chiến", "phục kích",
        "vây thành", "trận", "chiến dịch", "xuất chinh", "hành quân",
        "tiến công", "phá thành", "chiếm", "đánh tan", "tiêu diệt",
        "viện quân", "cứu viện", "giải cứu", "rút quân", "bại trận",
        "thắng lợi", "đầu hàng", "tử trận", "tử chiến", "liều mạng",
        "hỏa công", "dạ tập", "mai phục", "vây điểm đánh viện"
    ],
    "power_realms": [
        "đột phá", "bán tiên", "thánh giả", "bán thánh", "đế cảnh",
        "hoàng cảnh", "vương cảnh", "nhân tiên", "thăng cấp",
        "cảnh giới", "tu luyện", "chân khí", "nội lực"
    ],
    "tech_economy": [
        "lưu hỏa", "thần nỏ", "hỏa dược", "xà phòng", "bạch tửu",
        "mông đồng", "lâu thuyền", "muối", "rượu", "kinh doanh",
        "thương nghiệp", "vạn kim", "ngân lượng", "kho bạc",
        "lương thảo", "quân nhu", "thiết giáp", "cơ quan"
    ],
    "key_events": [
        "hội nghị", "đàm phán", "liên minh", "phản bội", "ám sát",
        "đăng cơ", "xưng đế", "truyền ngôi", "bái sư", "kết hôn",
        "đại hôn", "tang lễ", "xuyên việt", "chân tướng",
        "tứ phương", "bốn nước", "thiên hạ đại thế",
        "chiêu binh", "mộ tướng", "chiêu mộ"
    ],
    "locations": [
        "kinh đô", "hoàng cung", "phò mã phủ", "việt thành", "liễu châu",
        "thanh châu", "tần châu", "đông sơn", "hổ lao quan", "bắc u",
        "thiên hồn thành", "thánh nữ thành", "kinh bắc thành",
        "hoàng hôn", "đại giang", "trường giang", "bùi an hà",
        "an hà", "an lộ", "tây hoàng thành", "bắc duyên thành",
        "u châu", "đế đô"
    ]
}

def deep_scan():
    results = defaultdict(lambda: defaultdict(list))
    chapter_events = []
    
    for i in range(1, 1510):
        fpath = RAW_DIR / f"chuong_{i:04d}.json"
        if not fpath.exists():
            continue
        with open(fpath, "r", encoding="utf-8") as f:
            ch = json.load(f)
        
        title = ch.get("title", "")
        content = ch.get("content", "")
        full_text = (title + " " + content).lower()
        
        chapter_hits = {}
        for category, keywords in SCAN_CATEGORIES.items():
            hits = []
            for kw in keywords:
                if kw in full_text:
                    # Count occurrences
                    count = full_text.count(kw)
                    hits.append({"keyword": kw, "count": count})
            if hits:
                chapter_hits[category] = hits
                for h in hits:
                    results[category][h["keyword"]].append({
                        "chapter": i,
                        "title": title,
                        "count": h["count"]
                    })
        
        if chapter_hits:
            chapter_events.append({
                "chapter": i,
                "title": title,
                "categories_hit": list(chapter_hits.keys()),
                "total_hits": sum(len(v) for v in chapter_hits.values())
            })
    
    # Build summary statistics
    summary = {}
    for cat, keyword_data in results.items():
        cat_summary = {}
        for kw, chapters in keyword_data.items():
            total_mentions = sum(c["count"] for c in chapters)
            cat_summary[kw] = {
                "total_mentions": total_mentions,
                "chapters_appeared": len(chapters),
                "first_chapter": chapters[0]["chapter"],
                "last_chapter": chapters[-1]["chapter"],
                "peak_chapters": sorted(chapters, key=lambda x: x["count"], reverse=True)[:5]
            }
        summary[cat] = dict(sorted(cat_summary.items(), key=lambda x: x[1]["total_mentions"], reverse=True))
    
    output_data = {
        "scan_summary": summary,
        "high_density_chapters": sorted(chapter_events, key=lambda x: x["total_hits"], reverse=True)[:100]
    }
    
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Deep scan complete!")
    print(f"  Categories scanned: {len(SCAN_CATEGORIES)}")
    print(f"  Chapters with hits: {len(chapter_events)}")
    
    # Print top findings per category
    for cat, kw_data in summary.items():
        top_kws = list(kw_data.items())[:8]
        print(f"\n{'='*60}")
        print(f"[{cat.upper()}] Top keywords:")
        for kw, stats in top_kws:
            print(f"  '{kw}': {stats['total_mentions']} mentions across {stats['chapters_appeared']} chapters (ch.{stats['first_chapter']}-{stats['last_chapter']})")

if __name__ == "__main__":
    deep_scan()
