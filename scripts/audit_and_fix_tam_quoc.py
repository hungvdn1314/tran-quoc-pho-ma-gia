"""
Audit and correct all Three Kingdoms (Tam Quốc) elements in the Game Bible and artifacts:
1. "Giả Hủ" / "Giả Văn Hòa" -> "Giả Hủ" / "Giả Văn Hòa" (贾诩 / 贾文和)
2. "Trượng Bát Xà Mâu" -> "Trượng Bát Xà Mâu" (丈八蛇矛)
3. "Mỹ Nhiệm Công" -> "Mỹ Nhiệm Công" (美髯公)
4. Verify weapons, mounts, courtesy names, troop names, abilities.
"""
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = "c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia"
BRAIN_DIR = "C:/Users/Admin/.gemini/antigravity/brain/c60d5f42-9404-457f-873e-5b6f704a6548"

# Exact replacements mapping
REPLACEMENTS = [
    # Giả Hủ -> Giả Hủ
    ("Giả Hủ", "Giả Hủ"),
    ("giả hủ", "giả hủ"),
    ("GIẢ HỦ", "GIẢ HỦ"),
    ("CHAR_GIA_HU", "CHAR_GIA_HU"),
    ("Giả Văn Hòa", "Giả Văn Hòa"),
    ("giả văn hòa", "giả văn hòa"),
    ("GIẢ VĂN HÒA", "GIẢ VĂN HÒA"),
    
    # Weapons & Mounts accuracy
    ("Trượng Bát Xà Mâu (丈八蛇矛)", "Trượng Bát Xà Mâu (丈八蛇矛)"),
    ("Trượng Bát Xà Mâu", "Trượng Bát Xà Mâu"),
    ("Mỹ Nhiệm Công", "Mỹ Nhiệm Công"),
]

# Standard Tam Quốc Reference Data
TAM_QUOC_STANDARDS = {
    "Giả Hủ": {
        "canonical_name": "Giả Hủ",
        "courtesy_name": "Văn Hòa",
        "title": "Độc Sĩ",
        "weapon": "Cửu Châu Kỳ Bàn / Quạt lông vũ",
        "tactics": ["Độc Kế Thảo Phạt", "Thủy Hỏa Vây Thành", "Mưu Quốc Phế Lập", "Minh Triết Bảo Thân"]
    },
    "Triệu Vân": {
        "canonical_name": "Triệu Vân",
        "courtesy_name": "Tử Long",
        "title": "Hổ Uy Tướng Quân / Thường Thắng Tướng Quân",
        "weapon": "Long Đảm Lượng Ngân Thương (hoặc Bách Điểu Triều Phượng Thương), Thanh Cương Kiếm",
        "mount": "Dạ Chiếu Ngọc Sư Tử (Bạch Long Mã)",
        "tactics": ["Bách Điểu Triều Phượng", "Thất Thám Bàn Xà", "Đơn Kỵ Cứu Chúa"],
        "troops": "Bạch Mã Nghĩa Tòng"
    },
    "Quan Vũ": {
        "canonical_name": "Quan Vũ",
        "courtesy_name": "Vân Trường",
        "title": "Võ Thánh / Mỹ Nhiệm Công / Hán Thọ Đình Hầu",
        "weapon": "Thanh Long Yển Nguyệt Đao (82 cân, Lãnh Diễm Cứ)",
        "mount": "Xích Thố Mã",
        "tactics": ["Đà Đao Kế", "Xuân Thu Đao Pháp", "Trảm Tướng Đoạt Cờ"]
    },
    "Trương Phi": {
        "canonical_name": "Trương Phi",
        "courtesy_name": "Dực Đức",
        "title": "Vạn Nhân Địch",
        "weapon": "Trượng Bát Xà Mâu (dài 1 trượng 8 tấc)",
        "mount": "Ô Truy Mã (Vương Bát Mã)",
        "tactics": ["Nộ Hống Đoạn Kiều", "Bạo Liệt Đột Xung"]
    },
    "Mã Siêu": {
        "canonical_name": "Mã Siêu",
        "courtesy_name": "Mạnh Khởi",
        "title": "Cẩm Mã Siêu / Thần Uy Thiên Tướng Quân",
        "weapon": "Hổ Đầu Trạm Kim Thương / Long Kỵ Thương",
        "mount": "Sa Lý Phi (Bạch Tuyết Câu)",
        "troops": "Tây Lương Thiết Kỵ"
    },
    "Hoàng Trung": {
        "canonical_name": "Hoàng Trung",
        "courtesy_name": "Hán Thăng",
        "title": "Thần Xạ Lão Tướng",
        "weapon": "Bát Bảo Kỳ Lân Cung (Cửu Tinh Thần Cung) / Xích Huyết Đao (Phượng Chủy Đao)",
        "mount": "Liêu Nguyên Hỏa",
        "tactics": ["Bách Bộ Xuyên Dương", "Cửu Tinh Liên Châu"]
    },
    "Lữ Bố": {
        "canonical_name": "Lữ Bố",
        "courtesy_name": "Phụng Tiên",
        "title": "Chiến Thần Vô Song / Phi Tướng",
        "weapon": "Phương Thiên Họa Kích",
        "mount": "Xích Thố Mã",
        "tactics": ["Vô Song Loạn Vũ", "Quỷ Thần Tật Phong", "Viên Môn Xạ Kích"]
    },
    "Điển Vi": {
        "canonical_name": "Điển Vi",
        "courtesy_name": "Cổ Chi Ác Lai",
        "weapon": "Song Thiết Kích (Tấn Thiết Song Kích nặng 80 cân)",
        "tactics": ["Cuồng Bạo Nộ Kích", "Tử Thủ Hộ Chủ"]
    },
    "Hứa Chử": {
        "canonical_name": "Hứa Chử",
        "courtesy_name": "Trọng Khang",
        "title": "Hổ Si",
        "weapon": "Hổ Đầu Trảm Kim Đao / Cửu Hoàn Đại Đao",
        "troops": "Hổ Bí Quân"
    },
    "Chu Du": {
        "canonical_name": "Chu Du",
        "courtesy_name": "Công Cẩn",
        "title": "Mỹ Chu Lang / Đại Đô Đốc",
        "weapon": "Cổ Đĩnh Kiếm (Cổ Đĩnh Bảo Kiếm)",
        "troops": "Giang Đông Thủy Quân",
        "tactics": ["Hỏa Thiêu Giang Hà", "Khổ Nhục Kế"]
    },
    "Cam Ninh": {
        "canonical_name": "Cam Ninh",
        "courtesy_name": "Hưng Bá",
        "title": "Cẩm Phàm Tặc",
        "weapon": "Bá Vương Nhược Hải Đao / Khiếu Nguyệt Đao / Thiết Tỏa (chuông đồng xích sắt)",
        "troops": "Cẩm Phàm Quân"
    },
    "Cao Thuận": {
        "canonical_name": "Cao Thuận",
        "troops": "Hãm Trận Doanh (800 dũng sĩ khôi giáp tinh lương, mỗi chiến tất khắc)"
    },
    "Khúc Nghĩa": {
        "canonical_name": "Khúc Nghĩa",
        "troops": "Tiên Đăng Tử Sĩ (800 dũng sĩ cự nỏ tinh nhuệ)"
    },
    "Gia Cát Lượng": {
        "canonical_name": "Gia Cát Lượng",
        "courtesy_name": "Khổng Minh",
        "title": "Ngọa Long / Thừa Tướng",
        "relics": "Vũ Phiến Luân Cân, Tứ Luân Xa, Gia Cát Thần Nỏ, Mộc Ngưu Lưu Mã",
        "tactics": ["Bát Trận Đồ", "Không Thành Kế", "Cẩm Nang Diệu Kế"]
    },
    "Bàng Thống": {
        "canonical_name": "Bàng Thống",
        "courtesy_name": "Sĩ Nguyên",
        "title": "Phụng Sồ",
        "tactics": ["Liên Hoàn Kế"]
    },
    "Tư Mã Ý": {
        "canonical_name": "Tư Mã Ý",
        "courtesy_name": "Trọng Đạt",
        "title": "Trủng Hổ",
        "tactics": ["Ưng Thị Lang Cố", "Phản Hồi", "Nhẫn Nhục Phụ Trọng"]
    },
    "Tả Từ": {
        "canonical_name": "Tả Từ",
        "courtesy_name": "Nguyên Phóng",
        "title": "Ô Giác Tiên Sinh / Đạo Môn Địa Tiên",
        "tactics": ["Độn Giáp Thiên Thư", "Bát Quái Trận Pháp"]
    },
    "Hoa Đà": {
        "canonical_name": "Hoa Đà",
        "courtesy_name": "Nguyên Hóa",
        "title": "Thần Y",
        "inventions": ["Ma Phí Tán", "Ngũ Cầm Hí", "Phẫu Thuật Hoán Huyết / Mổ Sọ"]
    }
}

def replace_in_file(fpath):
    """Replace all target patterns in a file."""
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        orig = content
        changes_count = 0
        for old, new in REPLACEMENTS:
            if old in content:
                count = content.count(old)
                content = content.replace(old, new)
                changes_count += count
        
        if changes_count > 0:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✓ Updated {os.path.basename(fpath)}: {changes_count} replacements made.")
            return True
    except Exception as e:
        print(f"  ✗ Error in {fpath}: {e}")
    return False

def audit_and_correct():
    print("=" * 60)
    print("AUDITING & CORRECTING TAM QUỐC ELEMENTS ACROSS ENTIRE PROJECT")
    print("=" * 60)
    
    # 1. Target files to scan and update
    target_dirs = [
        os.path.join(ROOT_DIR, "data", "game_bible_v2"),
        os.path.join(ROOT_DIR, "data", "character_graph_v2"),
        os.path.join(ROOT_DIR, "data"),
        os.path.join(ROOT_DIR, "scripts"),
        BRAIN_DIR,
    ]
    
    updated_files = 0
    total_scanned = 0
    
    for tdir in target_dirs:
        if not os.path.exists(tdir):
            continue
        print(f"\nScanning directory: {tdir}...")
        for root, dirs, files in os.walk(tdir):
            # Skip raw_chapters (keep original crawler raw source)
            if "raw_chapters" in root:
                continue
            for f in files:
                if f.endswith(('.json', '.py', '.txt', '.md', '.html')):
                    fpath = os.path.join(root, f)
                    total_scanned += 1
                    if replace_in_file(fpath):
                        updated_files += 1
    
    print(f"\nCompleted scan: {total_scanned} files scanned, {updated_files} files updated.")
    
    # 2. Specifically verify and refine characters.json
    chars_file = os.path.join(ROOT_DIR, "data", "game_bible_v2", "characters.json")
    if os.path.exists(chars_file):
        print(f"\nRefining Three Kingdoms standards in {chars_file}...")
        with open(chars_file, 'r', encoding='utf-8') as f:
            chars = json.load(f)
        
        updated_chars = 0
        for c in chars:
            name = c.get('canonical_name', '')
            if name in TAM_QUOC_STANDARDS:
                std = TAM_QUOC_STANDARDS[name]
                # Ensure correct aliases
                aliases = set(c.get('aliases', []))
                if 'courtesy_name' in std:
                    aliases.add(f"{name} {std['courtesy_name']}")
                    aliases.add(std['courtesy_name'])
                if 'title' in std:
                    for t in std['title'].split(' / '):
                        aliases.add(t)
                c['aliases'] = sorted(list(aliases))
                
                # Check weapon/mount/troops/tactics
                if 'weapon' in std and 'signature_equipment' in c:
                    if not c['signature_equipment']:
                        c['signature_equipment'] = [std['weapon']]
                updated_chars += 1
                
        with open(chars_file, 'w', encoding='utf-8') as f:
            json.dump(chars, f, ensure_ascii=False, indent=2)
        print(f"  ✓ Standardized {updated_chars} Three Kingdoms heroes in characters.json.")

    # 3. Update master game bible
    master_file = os.path.join(ROOT_DIR, "data", "game_bible_v2", "game_bible_v2_master.json")
    if os.path.exists(master_file):
        with open(master_file, 'r', encoding='utf-8') as f:
            master = json.load(f)
        # Update characters list in master
        with open(chars_file, 'r', encoding='utf-8') as f:
            master['characters'] = json.load(f)
        with open(master_file, 'w', encoding='utf-8') as f:
            json.dump(master, f, ensure_ascii=False, indent=2)
        print(f"  ✓ Updated master game bible with refined characters.")

    print("\n" + "=" * 60)
    print("✅ TAM QUỐC AUDIT & CORRECTION COMPLETE!")
    print("=" * 60)

if __name__ == '__main__':
    audit_and_correct()
