import json
import re
import sys
from pathlib import Path
import networkx as nx

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
BIBLE_DIR = DATA_DIR / "game_bible"
GRAPH_DIR = DATA_DIR / "character_graph"

BIBLE_DIR.mkdir(parents=True, exist_ok=True)
GRAPH_DIR.mkdir(parents=True, exist_ok=True)

# 1. COMPLETE HEROES ROSTER
HEROES_ROSTER = {
    # --- Tam Quốc Anh Linh (Summoned Spirits) ---
    "Triệu Vân": {
        "id": "CHAR_TRIEU_VAN",
        "canonical_name": "Triệu Vân",
        "aliases": ["Triệu Tử Long", "Thường Sơn Triệu Tử Long", "Tử Long"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Hổ Tướng Tiên Phong",
        "martial_realm": "Đế Cảnh (Đỉnh Phong) -> Bán Thánh",
        "martial_power": 115,
        "is_summoned_spirit": True,
        "gold_summon_cost": 1000,
        "summon_chapter": 5,
        "signature_weapons": ["Long Đảm Lượng Ngân Thương", "Bạch Long Mã", "Thanh Cương Kiếm"],
        "skills": [
            {"name": "Long Đảm", "card_type": "Tấn công & Phản kích", "cost_ap": 1, "gold_cost": 0, "effect_description": "Đổi bài giáp thành thương kích uy lực cao, hoàn lại 1 AP nếu trảm sát địch."},
            {"name": "Thất Tiến Thất Xuất", "card_type": "Đột Kích Quần Thể", "cost_ap": 2, "gold_cost": 500, "effect_description": "Xông phá trùng vây, gây 250% sát thương lan và miễn nhiễm mọi khống chế trong 1 hiệp."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_DIEN_VI": "Chiến Hữu"},
        "lore_bio": "Võ tướng đầu tiên Quý Bình An triệu hoán bằng 1.000 lượng vàng từ vế đối hoàng cung. Trung thành tuyệt đối, bách chiến bách thắng."
    },
    "Giả Hủ": {
        "id": "CHAR_GIA_HU",
        "canonical_name": "Giả Hủ",
        "aliases": ["Giả Hủ", "Độc Sĩ", "Văn Hòa"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Tuyệt Thế Mưu Thần",
        "martial_realm": "Phàm Nhân (Trí Lực 120)",
        "martial_power": 45,
        "is_summoned_spirit": True,
        "gold_summon_cost": 5000,
        "summon_chapter": 27,
        "signature_weapons": ["Cửu Châu Bàn Cờ", "Bút Lông Đoạt Mệnh"],
        "skills": [
            {"name": "Loạn Vũ", "card_type": "Hỗn Loạn", "cost_ap": 2, "gold_cost": 200, "effect_description": "Toàn bộ quân địch mất kiểm soát, tự tàn sát lẫn nhau trong 1 hiệp."},
            {"name": "Hoàn Sát", "card_type": "Tuyệt Mệnh", "cost_ap": 1, "gold_cost": 1000, "effect_description": "Khóa chết khả năng hồi máu, dùng đan dược hoặc phù hộ mệnh của tướng địch hấp hối."},
            {"name": "Mượn Dao Giết Người", "card_type": "Quyền Mưu", "cost_ap": 1, "gold_cost": 0, "effect_description": "Ép tướng địch phải tấn công đồng minh của chúng."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_LY_NHO": "Đồng Mưu"},
        "lore_bio": "Mưu sĩ độc địa khét tiếng Tam Quốc, quân sư số một giai đoạn đầu của Quý Bình An, chuyên hiến kế đoạt mệnh hố hoàng đế và phản tặc."
    },
    "Điển Vi": {
        "id": "CHAR_DIEN_VI",
        "canonical_name": "Điển Vi",
        "aliases": ["Cổ Chi Ác Lai", "Ác Lai"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Hộ Vệ Thống Soái",
        "martial_realm": "Đế Cảnh -> Bán Thánh",
        "martial_power": 112,
        "is_summoned_spirit": True,
        "gold_summon_cost": 10000,
        "summon_chapter": 63,
        "signature_weapons": ["Song Thiết Kích", "Hắc Kim Giáp"],
        "skills": [
            {"name": "Cương Liệt", "card_type": "Phản Đòn", "cost_ap": 1, "gold_cost": 0, "effect_description": "Gánh chịu toàn bộ sát thương thay Quý Bình An, phản trả 100% sát thương chuẩn."},
            {"name": "Thiết Kích Nộ Trảm", "card_type": "Trọng Kích", "cost_ap": 2, "gold_cost": 0, "effect_description": "Ném song kích xé toạc mọi loại khiên hộ thể của cao thủ Hoàng Cảnh/Đế Cảnh."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_TRIEU_VAN": "Chiến Hữu"},
        "lore_bio": "Thần hộ vệ vô song che chở Quý Bình An thoát khỏi hàng chục vụ ám sát hiểm độc chốn thâm cung và chiến trường."
    },
    "Hoàng Trung": {
        "id": "CHAR_HOANG_TRUNG",
        "canonical_name": "Hoàng Trung",
        "aliases": ["Hoàng Hán Thăng", "Thần Xạ Thủ"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Thần Xạ Thống Soái",
        "martial_realm": "Đế Cảnh",
        "martial_power": 108,
        "is_summoned_spirit": True,
        "gold_summon_cost": 20000,
        "summon_chapter": 110,
        "signature_weapons": ["Bát Bảo Kỳ Lân Cung", "Phá Giáp Tiễn"],
        "skills": [
            {"name": "Bách Bộ Xuyên Dương", "card_type": "Tầm Xa Xuyên Thấu", "cost_ap": 2, "gold_cost": 0, "effect_description": "Bắn thẳng vào tướng chỉ huy địch từ cự ly không thể với tới, bỏ qua tiền quân phòng ngự."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công"},
        "lore_bio": "Lão tướng bách phát bách trúng, thống lĩnh đội quân thần nỏ bọc hậu và tiêu diệt thủ lĩnh địch từ khoảng cách xa."
    },
    "Điêu Thuyền": {
        "id": "CHAR_DIEU_THUYEN",
        "canonical_name": "Điêu Thuyền",
        "aliases": ["Đệ Nhất Mỹ Nhân", "Phu Nhân Điêu Thuyền"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Khuynh Quốc Mỹ Nhân / Trưởng Mạng Lưới Tình Báo",
        "martial_realm": "Hoàng Cảnh",
        "martial_power": 88,
        "is_summoned_spirit": True,
        "gold_summon_cost": 50000,
        "summon_chapter": 191,
        "signature_weapons": ["Hồng Nhan Lụa Đỏ", "Ám Khí Trâm"],
        "skills": [
            {"name": "Ly Gián Tuyệt Kỹ", "card_type": "Hãm Hại", "cost_ap": 2, "gold_cost": 300, "effect_description": "Làm 2 tướng lĩnh địch sinh nghi ngờ và lập tức quay sang quyết đấu lẫn nhau."},
            {"name": "Bế Nguyệt Mật Báo", "card_type": "Rút Bài Tình Báo", "cost_ap": 1, "gold_cost": 0, "effect_description": "Cuối hiệp rút thêm 2 lá bài kế sách vào tay."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Thê Tử / Ái Thiếp", "CHAR_NINH_AN": "Tỷ Muội"},
        "lore_bio": "Mỹ nhân tuyệt sắc kết hôn cùng Quý Bình An tại chương 191, quản lý mạng lưới tình báo Hồng Nhan giám sát toàn bộ động tĩnh thiên hạ."
    },
    "Cao Thuận": {
        "id": "CHAR_CAO_THUAN",
        "canonical_name": "Cao Thuận",
        "aliases": ["Hãm Trận Doanh Thống Soái"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Bộ Binh Thống Soái",
        "martial_realm": "Hoàng Cảnh (Đỉnh phong)",
        "martial_power": 98,
        "is_summoned_spirit": True,
        "gold_summon_cost": 30000,
        "summon_chapter": 200,
        "signature_weapons": ["Hắc Thiết Trọng Thuẫn", "Phá Trận Đao"],
        "skills": [
            {"name": "Hãm Trận Chi Chí", "card_type": "Phòng Ngự Bất Hoại", "cost_ap": 2, "gold_cost": 0, "effect_description": "Dựng lũy thép Hãm Trận Doanh, giảm 70% toàn bộ sát thương mà đội hình gánh chịu."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công"},
        "lore_bio": "Tướng lĩnh trầm mặc quả cảm, huấn luyện đạo quân bộ binh giáp nặng số một: Hãm Trận Doanh."
    },
    "Mã Siêu": {
        "id": "CHAR_MA_SIEU",
        "canonical_name": "Mã Siêu",
        "aliases": ["Tây Lương Cẩm Mã Siêu", "Thần Uy Thiên Tướng Quân"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Thiết Kỵ Thống Soái",
        "martial_realm": "Đế Cảnh -> Bán Thánh",
        "martial_power": 114,
        "is_summoned_spirit": True,
        "gold_summon_cost": 120000,
        "summon_chapter": 350,
        "signature_weapons": ["Hổ Đầu Trạm Kim Thương", "Tây Lương Tuấn Mã"],
        "skills": [
            {"name": "Thiết Kỵ Xung Phong", "card_type": "Kỵ Binh Đột Kích", "cost_ap": 2, "gold_cost": 0, "effect_description": "Càn quét phá nát đội hình bộ binh đối phương, khóa khả năng rút bài phòng thủ của địch."},
            {"name": "Thần Uy", "card_type": "Uy Áp Sĩ Khí", "cost_ap": 1, "gold_cost": 500, "effect_description": "Giảm 30% lực công kích của toàn quân địch vì khiếp sợ danh tướng Tây Lương."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_TRIEU_VAN": "Chiến Hữu"},
        "lore_bio": "Được triệu hoán ở chương 350 với giá 1.200.000 vàng, chỉ huy thiết kỵ càn quét công phá Đông Sơn thành và bình định biên ải."
    },
    "Lý Nho": {
        "id": "CHAR_LY_NHO",
        "canonical_name": "Lý Nho",
        "aliases": ["Văn Ưu", "Độc Mưu Sĩ"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Huyết Độc Mưu Thần",
        "martial_realm": "Phàm Nhân (Trí Lực 118)",
        "martial_power": 42,
        "is_summoned_spirit": True,
        "gold_summon_cost": 80000,
        "summon_chapter": 260,
        "signature_weapons": ["Tuyệt Mệnh Thư", "Độc Cổ Đan"],
        "skills": [
            {"name": "Phần Thành Hỏa Kế", "card_type": "Tuyệt Diệt", "cost_ap": 3, "gold_cost": 1000, "effect_description": "Đốt cháy căn cứ địch, phá hủy hoàn toàn kho lương thảo và dự trữ chiến lược của thành trì."},
            {"name": "Kế Chôn Sống", "card_type": "Tâm Lý Chiến", "cost_ap": 2, "gold_cost": 0, "effect_description": "Gieo rắc nỗi kinh hoàng tột độ, làm suy sụp 50% sĩ khí của toàn bộ các thành trì lân cận."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_GIA_HU": "Đồng Môn Mưu Sĩ"},
        "lore_bio": "Mưu sĩ tàn nhẫn cùng Giả Hủ tạo thành bộ đôi độc kế vô tiền khoáng hậu, phụ trách các đòn tiêu diệt triệt để không để lại hậu hoạn."
    },
    "Tuân Úc": {
        "id": "CHAR_TUAN_UC",
        "canonical_name": "Tuân Úc",
        "aliases": ["Tuân Văn Nhược", "Vương Tá Chi Tài"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Tuyệt Thế Năng Thần / Tể Tướng Nội Chính",
        "martial_realm": "Phàm Nhân (Trí Lực 122)",
        "martial_power": 40,
        "is_summoned_spirit": True,
        "gold_summon_cost": 100000,
        "summon_chapter": 300,
        "signature_weapons": ["Vương Tá Ngọc Trượng", "Kinh Quốc Đại Điển"],
        "skills": [
            {"name": "Vương Tá Hưng Bang", "card_type": "Kinh Tế Vĩnh Cửu", "cost_ap": 0, "gold_cost": 0, "effect_description": "Tăng 50% sản lượng vàng và lương thảo thu về từ toàn bộ các châu quận mỗi lượt."},
            {"name": "Khu Hổ Thôn Lang", "card_type": "Ly Gián Ngoại Giao", "cost_ap": 2, "gold_cost": 1000, "effect_description": "Kích động hai thế lực ngoại bang (như Tây Lăng và Nam Ly) nổ ra chiến tranh với nhau."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công / Hoàng Đế"},
        "lore_bio": "Tể tướng tài ba xây dựng nền móng hành chính, kinh tế và tài chính vững chắc giúp Quý Bình An nuôi dưỡng hàng chục vạn quân."
    },
    "Chu Du": {
        "id": "CHAR_CHU_DU",
        "canonical_name": "Chu Du",
        "aliases": ["Chu Công Cẩn", "Mỹ Chu Lang", "Đại Đô Đốc"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Thủy Quân Đại Đô Đốc",
        "martial_realm": "Đế Cảnh -> Bán Thánh",
        "martial_power": 110,
        "is_summoned_spirit": True,
        "gold_summon_cost": 100000,
        "summon_chapter": 450,
        "signature_weapons": ["Đô Đốc Bảo Kiếm", "Cầm Âm Hỏa Trận"],
        "skills": [
            {"name": "Xích Bích Hỏa Kế", "card_type": "Thủy Chiến Hỏa Diệt", "cost_ap": 3, "gold_cost": 2000, "effect_description": "Khi có gió thuận chiều, thiêu rụi toàn bộ hạm đội địch trên sông bằng Lưu Hỏa."},
            {"name": "Phản Gián Mưu Đoạt", "card_type": "Tráo Bài", "cost_ap": 1, "gold_cost": 500, "effect_description": "Biến đòn tấn công kế tiếp của chỉ huy địch thành tự hại quân nhà."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_CAM_NINH": "Tiên Phong Thủy Quân"},
        "lore_bio": "Mở khóa toàn bộ cơ chế Thủy Chiến trong game. Thống soái đại tài làm chủ sông ngòi, đánh tan liên quân đường thủy."
    },
    "Cam Ninh": {
        "id": "CHAR_CAM_NINH",
        "canonical_name": "Cam Ninh",
        "aliases": ["Cam Hưng Bá", "Cẩm Phàm Tặc"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Thủy Quân Dũng Tướng",
        "martial_realm": "Đế Cảnh",
        "martial_power": 109,
        "is_summoned_spirit": True,
        "gold_summon_cost": 80000,
        "summon_chapter": 460,
        "signature_weapons": ["Song Kích", "Cẩm Phàm Thiết Câu"],
        "skills": [
            {"name": "Bách Kỵ Dạ Tập", "card_type": "Đột Kích Đêm", "cost_ap": 2, "gold_cost": 0, "effect_description": "Đột nhập soái hạm địch trong đêm, tiêu hủy 50% nhuệ khí và đoạt soái kỳ địch."}
        ],
        "relationships": {"CHAR_CHU_DU": "Chủ Tướng", "CHAR_QUY_BINH_AN": "Chủ Công"},
        "lore_bio": "Mãnh tướng thủy chiến cảm tử khét tiếng, cánh tay đắc lực của Chu Du trong mọi trận thủy chiến mạo hiểm."
    },
    "Quách Gia": {
        "id": "CHAR_QUACH_GIA",
        "canonical_name": "Quách Gia",
        "aliases": ["Quách Phụng Hiếu", "Quỷ Tài"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Tuyệt Thế Quân Sư",
        "martial_realm": "Phàm Nhân (Trí Lực 128)",
        "martial_power": 40,
        "is_summoned_spirit": True,
        "gold_summon_cost": 100000,
        "summon_chapter": 380,
        "signature_weapons": ["Quỷ Mưu Trúc Thư", "Tửu Hồ"],
        "skills": [
            {"name": "Di Kế Tương Trợ", "card_type": "Nội Tại Bổ Sung", "cost_ap": 0, "gold_cost": 0, "effect_description": "Mỗi khi Quý Bình An hoặc quân ta nhận sát thương, rút ngay 2 lá cẩm nang mưu kế."},
            {"name": "Thập Thắng Thập Bại", "card_type": "Phá Trận Đoán Cơ", "cost_ap": 2, "gold_cost": 500, "effect_description": "Vạch trần tử huyệt của chiến dịch, tăng 50% sát thương phe ta trong 3 lượt."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_GIA_HU": "Đồng Liêu"},
        "lore_bio": "Quân sư quỷ tài xuất hiện ở chương 380-383, đại não chiến lược phân tích bố cục thiên hạ đưa Quý Bình An lên ngai hoàng đế."
    },
    "Vương Việt": {
        "id": "CHAR_VUONG_VIET",
        "canonical_name": "Vương Việt",
        "aliases": ["Đế Sư Vương Việt", "Thiên Hạ Đệ Nhất Kiếm Sư"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Kiếm Thánh Sát Thủ / Đại Cận Vệ",
        "martial_realm": "Bán Tiên (Đỉnh Phong Kiếm Đạo)",
        "martial_power": 138,
        "is_summoned_spirit": True,
        "gold_summon_cost": 200000,
        "summon_chapter": 520,
        "signature_weapons": ["Thiên Hạ Đệ Nhất Kiếm"],
        "skills": [
            {"name": "Nhất Kiếm Tây Lai", "card_type": "Chí Mạng Bán Tiên", "cost_ap": 3, "gold_cost": 1000, "effect_description": "Một kiếm kinh thiên xuyên thủng hộ thể chân khí của các đại tôn giả Bán Tiên."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công / Đệ Tử (Đế sư)"},
        "lore_bio": "Kiếm sư truyền kỳ, người giúp Quý Bình An cân bằng thực lực với các lão quái Bán Tiên của triều đình và ngoại bang."
    },
    "Gia Cát Lượng": {
        "id": "CHAR_GIA_CAT_LUONG",
        "canonical_name": "Gia Cát Lượng",
        "aliases": ["Gia Cát Khổng Minh", "Ngọa Long Tiên Sinh", "Võ Hầu"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Thiên Mệnh Thần Mưu / Thừa Tướng",
        "martial_realm": "Bán Tiên (Trí Lực Chí Tôn 140)",
        "martial_power": 65,
        "is_summoned_spirit": True,
        "gold_summon_cost": 500000,
        "summon_chapter": 1000,
        "signature_weapons": ["Vũ Phiến Luân Cân", "Bát Trận Đồ"],
        "skills": [
            {"name": "Bát Trận Đồ", "card_type": "Kỳ Môn Độn Giáp", "cost_ap": 3, "gold_cost": 3000, "effect_description": "Vây khốn toàn bộ quân địch trong mê hồn trận, địch không thể di chuyển hoặc tung kỹ năng trong 2 lượt."},
            {"name": "Đông Phong Hỏa Lệnh", "card_type": "Thiên Tượng", "cost_ap": 2, "gold_cost": 1000, "effect_description": "Cưỡng chế đổi thời tiết và hướng gió thành bão lửa, tăng 200% sát thương hỏa công."},
            {"name": "Quan Tinh Đoán Mệnh", "card_type": "Tiên Tri", "cost_ap": 1, "gold_cost": 500, "effect_description": "Nhìn thấu toàn bộ bài trên tay và ý định hành động của boss trong 3 lượt kế tiếp."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công / Hoàng Đế", "CHAR_BANG_THONG": "Đồng Môn"},
        "lore_bio": "Thiên mệnh mưu thần cấp cao nhất (500.000 vàng) của hệ thống, chỉ huy công phá Thiên Hồn thành (ch.1022) và thống nhất thế giới."
    },
    "Bàng Thống": {
        "id": "CHAR_BANG_THONG",
        "canonical_name": "Bàng Thống",
        "aliases": ["Bàng Sĩ Nguyên", "Phụng Sồ Tiên Sinh"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Kỳ Mưu Thống Soái",
        "martial_realm": "Phàm Nhân (Trí Lực 126)",
        "martial_power": 45,
        "is_summoned_spirit": True,
        "gold_summon_cost": 250000,
        "summon_chapter": 1015,
        "signature_weapons": ["Phụng Sồ Bút", "Liên Hoàn Kế Đồ"],
        "skills": [
            {"name": "Liên Hoàn Kế", "card_type": "Xiềng Xích", "cost_ap": 2, "gold_cost": 1000, "effect_description": "Khóa xích toàn bộ đơn vị địch với nhau; 1 mục tiêu nhận sát thương thì các mục tiêu khác chịu 80% lây lan."}
        ],
        "relationships": {"CHAR_GIA_CAT_LUONG": "Chiến Hữu", "CHAR_QUY_BINH_AN": "Chủ Công"},
        "lore_bio": "Phụng Sồ cùng Ngọa Long hội tụ, bày liên hoàn đại kế hạ gục Thánh Nữ thành và phá tan quân phòng thủ dị giới."
    },
    "Lữ Bố": {
        "id": "CHAR_LU_BO",
        "canonical_name": "Lữ Bố",
        "aliases": ["Lữ Phụng Tiên", "Chiến Thần", "Phi Tướng"],
        "faction": "Quý Gia / Đại Hán",
        "role": "Chiến Thần Đỉnh Phong / Hộ Vệ Thân Cận",
        "martial_realm": "Bán Tiên (Đột phá) -> Nhân Tiên",
        "martial_power": 148,
        "is_summoned_spirit": True,
        "gold_summon_cost": 1000000,
        "summon_chapter": 1365,
        "signature_weapons": ["Phương Thiên Họa Kích", "Xích Thố Mã", "Thú Diện Thôn Đầu Khải"],
        "skills": [
            {"name": "Vô Song Loạn Vũ", "card_type": "Hủy Diệt Tuyệt Luân", "cost_ap": 3, "gold_cost": 2000, "effect_description": "Chém 7 nhát kích liên tiếp, mỗi kích gây sát thương chí mạng 300% và bỏ qua hoàn toàn giáp Bán Tiên."},
            {"name": "Nhân Trung Lữ Bố", "card_type": "Bá Thể Tuyệt Đối", "cost_ap": 2, "gold_cost": 1000, "effect_description": "Miễn nhiễm mọi hiệu ứng bất lợi, khống chế hoặc ám toán độc kế trong 3 hiệp liên tiếp."}
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công / Hoàng Đế"},
        "lore_bio": "Chiến thần mạnh nhất lịch sử triệu hoán ở chương 1367-1369, thiếp thân bảo tiêu bên cạnh Quý Bình An, quét sạch các đại cao thủ Bắc U."
    },

    # --- Nhân Vật Cốt Lõi Bản Địa (Native Novel Characters) ---
    "Quý Bình An": {
        "id": "CHAR_QUY_BINH_AN",
        "canonical_name": "Quý Bình An",
        "aliases": ["Phò Mã Gia", "Tứ Công Tử Quý Gia", "Tịnh Kiên Vương", "Đại Vũ Hoàng Đế", "Đại Hán Khai Quốc Hoàng Đế"],
        "faction": "Quý Gia / Đại Hán (Hoàng Đế)",
        "role": "Nhân Vật Chính / Túc Chủ Hệ Thống",
        "martial_realm": "Phàm Nhân -> Hoàng Cảnh -> Đế Cảnh -> Bán Tiên -> Nhân Tiên",
        "martial_power": 150,
        "is_summoned_spirit": False,
        "signature_weapons": ["Thiên Công Thần Kiếm", "Cơ Quan Thần Tượng", "Hoàng Kim Đế Tỉ"],
        "skills": [
            {"name": "Triệu Hoán Anh Linh", "card_type": "Hệ Thống Triệu Hồi", "cost_ap": 0, "gold_cost": 1000, "effect_description": "Tiêu hao vàng để triệu gọi tướng lĩnh Tam Quốc vào tay."},
            {"name": "Kim Tiền Cường Hóa", "card_type": "Bồi Dưỡng", "cost_ap": 1, "gold_cost": 5000, "effect_description": "Đột phá cảnh giới tức thì cho tướng phe ta trên bàn đấu."}
        ],
        "relationships": {
            "CHAR_QUY_VO_SONG": "Phụ Thân",
            "CHAR_NINH_AN": "Hoàng Hậu / Thê Tử",
            "CHAR_DIEU_THUYEN": "Quý Phi",
            "CHAR_VU_HOANG": "Kình Địch Triều Đình",
            "CHAR_QUY_BINH_SINH": "Nhị Ca",
            "CHAR_QUY_BINH_XUYEN": "Đại Ca"
        },
        "lore_bio": "Xuyên việt giả mang hệ thống Tam Quốc Sát, từ phò mã chân mềm bị nghi kị vươn lên thành hoàng đế khai sáng triều đại Đại Hán thịnh thế."
    },
    "Quý Vô Song": {
        "id": "CHAR_QUY_VO_SONG",
        "canonical_name": "Quý Vô Song",
        "aliases": ["Hộ Quốc Công", "Chiến Thần Quý Vô Song", "Bán Tiên Quý Vô Song"],
        "faction": "Quý Gia",
        "role": "Hộ Quốc Đại Tướng Quân / Bán Tiên Chí Tôn",
        "martial_realm": "Bán Tiên (Đỉnh Cao)",
        "martial_power": 145,
        "is_summoned_spirit": False,
        "signature_weapons": ["Phá Thiên Đao", "Chiến Hổ Hổ Phù"],
        "relationships": {"CHAR_QUY_BINH_AN": "Phụ Thân", "CHAR_VU_HOANG": "Quân Thần (Bằng mặt không bằng lòng)"},
        "lore_bio": "Cột trụ gia tộc, Bán Tiên đệ nhất danh tướng trấn giữ biên ải, bức tường bảo vệ Quý Bình An trước dã tâm thanh trừng của hoàng đế."
    },
    "Ninh An Công Chúa": {
        "id": "CHAR_NINH_AN",
        "canonical_name": "Triệu Ninh An",
        "aliases": ["Ninh An Công Chúa", "Ninh An", "Hoàng Hậu Ninh An"],
        "faction": "Hoàng Thất Đại Vũ / Quý Gia",
        "role": "Hoàng Tộc Công Chúa / Hoàng Hậu",
        "martial_realm": "Hoàng Cảnh",
        "martial_power": 92,
        "is_summoned_spirit": False,
        "relationships": {"CHAR_QUY_BINH_AN": "Phu Quân", "CHAR_VU_HOANG": "Phụ Hoàng"},
        "lore_bio": "Công chúa Đại Vũ, thê tử của Quý Bình An. Thông minh, cơ mưu, từ chỗ xa cách đã hoàn toàn quy phục và hỗ trợ chàng đoạt thiên hạ."
    },
    "Vũ Hoàng": {
        "id": "CHAR_VU_HOANG",
        "canonical_name": "Triệu Vũ Hoàng",
        "aliases": ["Bệ Hạ", "Đại Vũ Tiên Hoàng"],
        "faction": "Hoàng Thất Đại Vũ",
        "role": "Tiên Đế / Địch Thủ Quyền Mưu Ban Đầu",
        "martial_realm": "Đế Cảnh",
        "martial_power": 110,
        "is_summoned_spirit": False,
        "relationships": {"CHAR_QUY_VO_SONG": "Tướng Lĩnh E Ngại", "CHAR_QUY_BINH_AN": "Phò Mã / Con Rể"},
        "lore_bio": "Hoàng đế đa nghi, tàn nhẫn, luôn tìm cơ hội diệt Quý gia nhưng liên tục bị Quý Bình An và Giả Hủ dùng độc kế hố ngược lại."
    },
    "Quý Bình Sinh": {
        "id": "CHAR_QUY_BINH_SINH",
        "canonical_name": "Quý Bình Sinh",
        "aliases": ["Hổ Soái", "Nhị Ca Quý Bình Sinh"],
        "faction": "Quý Gia / Chiến Hổ Quân",
        "role": "Thống Soái Chiến Hổ Quân",
        "martial_realm": "Đế Cảnh",
        "martial_power": 105,
        "is_summoned_spirit": False,
        "relationships": {"CHAR_QUY_BINH_AN": "Đệ Đệ", "CHAR_QUY_VO_SONG": "Phụ Thân"},
        "lore_bio": "Nhị ca Quý Bình An, hổ soái chỉ huy mười vạn Chiến Hổ Quân dũng mãnh bảo vệ bờ cõi phía Nam."
    },
    "Quý Bình Xuyên": {
        "id": "CHAR_QUY_BINH_XUYEN",
        "canonical_name": "Quý Bình Xuyên",
        "aliases": ["Đại Ca Quý Bình Xuyên", "Trấn Quốc Đại Tướng Quân"],
        "faction": "Quý Gia",
        "role": "Trấn Quốc Đại Tướng Quân",
        "martial_realm": "Đế Cảnh",
        "martial_power": 104,
        "is_summoned_spirit": False,
        "relationships": {"CHAR_QUY_BINH_AN": "Đệ Đệ", "CHAR_QUY_VO_SONG": "Phụ Thân"},
        "lore_bio": "Đại ca Quý Bình An, thống soái trấn thủ quốc giới phương Bắc, kiên định cương trực."
    }
}

# 2. COMPLETE TECH TREE & INVENTIONS
TECH_TREE_DATABASE = [
    {
        "id": "TECH_XAPHONG",
        "name": "Thấu Hoa Cao (Xà Phòng Tinh Chế)",
        "category": "Thương Nghiệp & Tích Lũy Vàng",
        "research_cost_gold": 100,
        "research_time_days": 1,
        "invented_chapter": 8,
        "unlocked_cards": ["Kinh Thương: Độc Quyền Xà Phòng"],
        "economic_yield": "+500 Vàng mỗi lượt nội chính",
        "description": "Phát minh thương nghiệp đầu tiên đem lại lợi nhuận khổng lồ, là bàn đạp để Quý Bình An tích lũy vàng triệu hoán danh tướng."
    },
    {
        "id": "TECH_BACHTUY",
        "name": "Bạch Tửu (Chưng Cất Rượu Nồng Độ Cao)",
        "category": "Thương Nghiệp & Ngoại Giao",
        "research_cost_gold": 500,
        "research_time_days": 2,
        "invented_chapter": 24,
        "unlocked_cards": ["Kinh Thương: Mở Tửu Lâu Vạn Kim", "Tiệc Rượu Kích Lệ Sĩ Khí"],
        "economic_yield": "+1.200 Vàng mỗi lượt nội chính",
        "description": "Kỹ thuật chưng cất rượu mạnh thượng hạng làm say mê vương tôn quý tộc và tướng sĩ."
    },
    {
        "id": "TECH_LUU_HOA",
        "name": "Lưu Hỏa (Dầu Lửa & Hỏa Dược Cháy Trên Nước)",
        "category": "Vũ Khí Chiến Thuật Cốt Lõi",
        "research_cost_gold": 5000,
        "research_time_days": 3,
        "invented_chapter": 120,
        "unlocked_cards": ["Lưu Hỏa Tiễn", "Hỏa Thiêu Liên Doanh", "Lưu Hỏa Đạn"],
        "economic_yield": None,
        "description": "Thần khí thay đổi hoàn toàn cục diện chiến tranh phong kiến: dầu cháy không thể dập bằng nước, thiêu rụi thành trì và kỵ binh."
    },
    {
        "id": "TECH_GIACAT_THANNOR",
        "name": "Gia Cát Thần Nỏ (Nỏ Máy Liên Châu)",
        "category": "Binh Khí Viễn Trình",
        "research_cost_gold": 15000,
        "research_time_days": 4,
        "invented_chapter": 190,
        "unlocked_cards": ["Nỏ Liên Châu Tề Xạ", "Mưa Tên Xuyên Giáp"],
        "economic_yield": None,
        "description": "Nỏ máy bắn liên tiếp 10 mũi tên thép, khắc tinh số một của kỵ binh thiết giáp và lính cảm tử."
    },
    {
        "id": "TECH_THIEN_CONG_CO_QUAN",
        "name": "Thiên Công Thần Tượng & Cơ Quan Khí Giới",
        "category": "Công Thành & Hộ Thành Khí Giới",
        "research_cost_gold": 30000,
        "research_time_days": 5,
        "invented_chapter": 190,
        "unlocked_cards": ["Phá Cổng Thần Xung", "Ném Đá Cự Nỏ"],
        "economic_yield": None,
        "description": "Máy móc cơ quan xảo đoạt thiên công, dễ dàng san phẳng cổng thành kiên cố và tường thành đá tảng."
    },
    {
        "id": "TECH_CHIEN_THUYEN_MONG_DONG",
        "name": "Chiến Hạm Mông Đồng & Lâu Thuyền",
        "category": "Thủy Chiến Trường Giang",
        "research_cost_gold": 50000,
        "research_time_days": 7,
        "invented_chapter": 380,
        "unlocked_cards": ["Lâu Thuyền Pháo Kích", "Mông Đồng Thiết Xung"],
        "economic_yield": "Thu thuế đường thủy và kiểm soát thương cảng",
        "description": "Chiến hạm bọc sắt kết hợp kỹ thuật đóng tàu Giang Đông, điều kiện tiên quyết để Chu Du làm chủ sông ngòi."
    },
    {
        "id": "TECH_HAC_THIET_TRONG_GIAP",
        "name": "Luyện Kim Hắc Thiết (Trọng Giáp Toàn Thân)",
        "category": "Phòng Ngự Binh Chủng",
        "research_cost_gold": 40000,
        "research_time_days": 5,
        "invented_chapter": 220,
        "unlocked_cards": ["Bá Thể Thiết Giáp", "Lũy Thép Bất Hoại"],
        "economic_yield": None,
        "description": "Áo giáp thép rèn nguội tinh xảo trang bị cho Hãm Trận Doanh và Chiến Hổ Quân, miễn nhiễm đao kiếm thường."
    }
]

# 3. 10 KEY CAMPAIGNS & BATTLES
CAMPAIGNS_DATABASE = [
    {
        "id": "BTL_01_PHO_MA_PHU",
        "name": "Bảo Vệ Phò Mã Phủ: Ác Lai Trảm Địch",
        "arc_id": "ARC_01",
        "chapters": [63, 64, 65],
        "location": "Phủ Phò Mã - Đại Vũ Kinh Đô",
        "terrain_type": "Dã chiến phòng thủ nội viện",
        "player_commanders": ["Điển Vi", "Triệu Vân"],
        "enemy_commanders": ["Sát thủ Hắc Y Nhân", "Tô Kiến Phong phái tới"],
        "player_troops": "Hộ vệ phủ phò mã (50 người)",
        "enemy_troops": "Cao thủ thích khách (300 người)",
        "marching_distance_days": 0,
        "key_stratagem": "Cương Liệt phản đòn của Điển Vi kết hợp Long Đảm của Triệu Vân bọc hậu.",
        "outcome": "Toàn diệt thích khách, danh tiếng Phò mã gia làm chấn động kinh thành.",
        "rewards": "Tịch thu 20.000 Vàng từ tang vật sát thủ, uy chấn hoàng cung."
    },
    {
        "id": "BTL_02_PHAP_PHI_BAO_QUAN",
        "name": "Kinh Thành Đột Phá: Đánh Tan Phi Báo Quân",
        "arc_id": "ARC_02",
        "chapters": [246, 247, 248],
        "location": "Hoàng Cung & Cửa Bắc Kinh Đô",
        "terrain_type": "Dã chiến công phá cửa thành",
        "player_commanders": ["Triệu Vân", "Điển Vi", "Mã Siêu"],
        "enemy_commanders": ["Tô Kiến Phong", "Phi Báo Quân Thống Lĩnh"],
        "player_troops": "Bạch Mã Nghĩa Tòng (3.000 kỵ)",
        "enemy_troops": "Phi Báo Quân Hoàng Gia (20.000 quân)",
        "marching_distance_days": 1,
        "key_stratagem": "Thiết Kỵ Xung Phong của Mã Siêu xé nát cánh trái, Triệu Vân chém tướng đoạt cờ.",
        "outcome": "Đánh tan Phi Báo quân, Quý Bình An kiểm soát cửa Bắc và bước đầu nắm giữ hoàng cung.",
        "rewards": "Thu phục Tô Kiến Phong, thu nạp 10 vạn ngân lượng."
    },
    {
        "id": "BTL_03_CONG_PHA_DONG_SON",
        "name": "Đông Thương Chiến Dịch: Tấn Công Đông Sơn Thành",
        "arc_id": "ARC_02",
        "chapters": [350, 351, 352],
        "location": "Đông Sơn Thành - Đông Bắc",
        "terrain_type": "Công thành chiến",
        "player_commanders": ["Mã Siêu", "Quý Bình Sinh", "Lý Nho"],
        "enemy_commanders": ["An gia Thống Soái", "Đông Thương Hộ Thành Quân"],
        "player_troops": "Chiến Hổ Quân & Thiết Kỵ (40.000 quân)",
        "enemy_troops": "An gia đại quân (100.000 quân)",
        "marching_distance_days": 3,
        "key_stratagem": "Lý Nho dùng mưu cắt đứt tiếp tế Bùi An Hà, Mã Siêu phá cổng thành trong 1 canh giờ.",
        "outcome": "Đại thắng bắt sống vạn quân An gia, làm chủ Đông Bắc Ngũ Châu.",
        "rewards": "Chiếm Đông Sơn thành, thu gom 1.200.000 vàng ròng bổ sung hệ thống."
    },
    {
        "id": "BTL_04_THUY_CHIEN_TRUONG_GIANG",
        "name": "Giang Nam Đại Chiến: Hỏa Thiêu Hạm Đội Nam Ly",
        "arc_id": "ARC_03",
        "chapters": [798, 799, 800],
        "location": "Đại Giang Lưu Vực - Biên Giới Nam Ly",
        "terrain_type": "Thủy chiến liên hoàn",
        "player_commanders": ["Chu Du", "Cam Ninh"],
        "enemy_commanders": ["Nam Ly Thủy Quân Đô Đốc"],
        "player_troops": "Lâu Thuyền & Mông Đồng (200 chiến hạm)",
        "enemy_troops": "Thủy quân Nam Ly (800 thuyền)",
        "marching_distance_days": 4,
        "key_stratagem": "Chu Du mượn gió Đông, dùng thẻ bài Lưu Hỏa thiêu rụi toàn bộ liên hoàn thuyền Nam Ly.",
        "outcome": "Toàn diệt thủy quân Nam Ly, mở toang cửa ngõ tiến vào đô thành Nam Ly.",
        "rewards": "Làm chủ hoàn toàn tuyến sông ngòi, mở rộng lãnh thổ Đại Hán."
    },
    {
        "id": "BTL_05_THIEN_HON_THANH",
        "name": "Bắc Cương Quyết Chiến: Gia Cát Lượng Phá Thiên Hồn Thành",
        "arc_id": "ARC_04",
        "chapters": [1020, 1021, 1022],
        "location": "Thiên Hồn Thành - Cực Bắc",
        "terrain_type": "Công thành trận pháp dị giới",
        "player_commanders": ["Gia Cát Lượng", "Bàng Thống", "Triệu Vân"],
        "enemy_commanders": ["Quỷ Vương", "Bắc Minh Tông Chủ"],
        "player_troops": "Đại Hán U Châu Quân (10 vạn)",
        "enemy_troops": "Quỷ Binh & Ma Giáo (15 vạn)",
        "marching_distance_days": 5,
        "key_stratagem": "Gia Cát Lượng lập Bát Trận Đồ phá tan ma chướng, Bàng Thống dùng Liên Hoàn Kế khóa chết tẩu lộ.",
        "outcome": "Thiên Hồn thành sụp đổ, đánh tan thế lực tà đạo lớn nhất phương Bắc.",
        "rewards": "Thu phục toàn bộ phương Bắc, tích lũy 5.000.000 Anh Linh Điểm."
    },
    {
        "id": "BTL_06_BAC_U_HON_CHIEN",
        "name": "Bắc U Huyết Chiến: Lữ Bố Trảm Bán Tiên",
        "arc_id": "ARC_04",
        "chapters": [1368, 1369, 1370],
        "location": "Bắc U Chi Địa",
        "terrain_type": "Dã chiến đỉnh cao cao thủ",
        "player_commanders": ["Lữ Bố", "Vương Việt", "Quý Bình An"],
        "enemy_commanders": ["A Bố", "Bắc Minh Bán Tiên Lão Tổ"],
        "player_troops": "Cấm Vệ Tinh Nhuệ (1 vạn)",
        "enemy_troops": "Dị Giới Bán Tiên & Quân Cảm Tử (5 vạn)",
        "marching_distance_days": 6,
        "key_stratagem": "Lữ Bố kích hoạt Vô Song Loạn Vũ, phá vỡ cảnh giới Bán Tiên chém giết đối thủ trong chớp mắt.",
        "outcome": "Đè bẹp ý chí phản kháng của các thế lực cổ xưa, mở đường thống nhất vĩ đại.",
        "rewards": "Đột phá cảnh giới Nhân Tiên cho các tướng chủ lực."
    }
]

# 4. COURT INTRIGUE & VISUAL NOVEL DECISIONS
COURT_EVENTS_DATABASE = [
    {
        "id": "EVT_01_CAU_DOI_HOANG_CUNG",
        "name": "Thiên Đương Kỳ Bàn: Giải Đố Hoàng Cung",
        "arc_id": "ARC_01",
        "trigger_chapter": 1,
        "context_dialogue": "Vũ Hoàng ban vế đối: 'Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ' (Trời làm bàn cờ sao làm quân cờ, ai dám xuống cờ?). Văn võ bá quan đều cúi đầu không ai dám đối.",
        "opposing_figures": ["Vũ Hoàng", "Vu Văn Châu Viện Sĩ"],
        "choices": [
            {
                "choice_id": "C1_HOI_DAP_XUAT_THAN",
                "choice_text": "Đối lại: 'Địa tác tỳ bà lộ tác huyền, thùy nhân cảm đạn!' (Đất làm đàn tỳ bà đường làm dây, ai dám gảy!).",
                "suspicion_change": 5,
                "favor_change": 20,
                "gold_change": 100,
                "narrative_consequence": "Nhận ngay 100 lượng vàng ròng! Đủ điều kiện kích hoạt lần đầu Hệ Thống Tam Quốc Sát để triệu hoán Triệu Vân."
            },
            {
                "choice_id": "C2_GIA_NGU_GIAU_TAI",
                "choice_text": "Tiếp tục giả vờ chân mềm vô dụng, chờ thời cơ khác.",
                "suspicion_change": -5,
                "favor_change": -10,
                "gold_change": 0,
                "narrative_consequence": "Mất cơ hội nhận vàng nhanh, hệ thống kích hoạt chậm lại 3 chương."
            }
        ]
    },
    {
        "id": "EVT_02_HO_VU_HOANG",
        "name": "Độc Kế Giả Hủ: Bẫy Ngược Hoàng Đế",
        "arc_id": "ARC_01",
        "trigger_chapter": 28,
        "context_dialogue": "Vũ Hoàng muốn dò xét Quý gia, ép giao nộp tài sản và sai ngự lâm quân vây phủ phò mã. Giả Hủ đề xuất khổ nhục kế tương kế tựu kế.",
        "opposing_figures": ["Vũ Hoàng", "Tử Ngọc Hằng (Tứ hoàng tử)"],
        "choices": [
            {
                "choice_id": "C1_DUNG_DOC_KE",
                "choice_text": "Làm theo Giả Hủ: ngụy tạo chứng cứ thích khách vu cáo Tứ hoàng tử, ép Vũ Hoàng bồi thường.",
                "suspicion_change": 10,
                "favor_change": 5,
                "gold_change": 10000,
                "narrative_consequence": "Vũ Hoàng cắn răng ban thưởng 1 vạn lượng vàng để xoa dịu Quý gia. Có đủ tiền triệu hoán Điển Vi!"
            },
            {
                "choice_id": "C2_NHUONG_BO",
                "choice_text": "Nhượng bộ giao nộp tiệm xà phòng để giữ yên cửa nhà.",
                "suspicion_change": -10,
                "favor_change": 0,
                "gold_change": -1000,
                "narrative_consequence": "Tứ hoàng tử lấn tới, Quý phủ bị cô lập."
            }
        ]
    },
    {
        "id": "EVT_03_DANG_CO_XUNG_DE",
        "name": "Kinh Đô Quyết Đoán: Đăng Cơ Hay Làm Vương?",
        "arc_id": "ARC_02",
        "trigger_chapter": 386,
        "context_dialogue": "Vũ Hoàng băng hà, kinh đô đại loạn. Quý Bình An đã nắm giữ quân quyền. Hệ thống thông báo: Chỉ khi đăng cơ làm Hoàng Đế mới gom trọn Anh Linh Điểm toàn thiên hạ.",
        "opposing_figures": ["Hoàng tộc Triệu thị", "Cựu thần Đại Vũ"],
        "choices": [
            {
                "choice_id": "C1_DANG_CO_HOANG_DE",
                "choice_text": "Đăng cơ tức vị Hoàng Đế, cải quốc hiệu thành Đại Hán, định niên hiệu Định Quốc!",
                "suspicion_change": 50,
                "favor_change": 30,
                "gold_change": 500000,
                "narrative_consequence": "Hệ thống mở khóa giai đoạn Tranh Bá Thiên Hạ! Toàn bộ thành trì và binh mã cả nước quy về túc chủ."
            },
            {
                "choice_id": "C2_BUONG_REM_NHIEP_CHINH",
                "choice_text": "Đưa ấu chúa lên ngôi, bản thân làm Tịnh Kiên Vương nhiếp chính.",
                "suspicion_change": -20,
                "favor_change": 10,
                "gold_change": 100000,
                "narrative_consequence": "Tiến trình thu thập Anh Linh Điểm bị giới hạn, các thế lực ngoại bang coi thường."
            }
        ]
    }
]

# 5. TROOP TYPES
TROOP_TYPES_DATABASE = [
    {
        "id": "TRP_BACH_MA_NGHIA_TONG",
        "name": "Bạch Mã Nghĩa Tòng",
        "commander": "Triệu Vân",
        "category": "Kỵ Binh Viễn Chinh Cơ Động",
        "defense_rating": 65,
        "attack_rating": 90,
        "mobility": 98,
        "special_trait": "Rút ngắn 50% thời gian hành quân trên bản đồ; đòn đánh đầu tiên luôn là bạo kích xuyên giáp.",
        "unlocked_card_name": "Bạch Mã Đột Kích"
    },
    {
        "id": "TRP_HAM_TRAN_DOANH",
        "name": "Hãm Trận Doanh",
        "commander": "Cao Thuận",
        "category": "Bộ Binh Giáp Nặng Hắc Thiết",
        "defense_rating": 99,
        "attack_rating": 78,
        "mobility": 45,
        "special_trait": "Lũy thép bất khả xâm phạm; giảm 70% sát thương từ mọi đòn công thành và cung nỏ.",
        "unlocked_card_name": "Khiên Khóa Trận"
    },
    {
        "id": "TRP_CHIEN_HO_QUAN",
        "name": "Chiến Hổ Quân",
        "commander": "Quý Bình Sinh",
        "category": "Bộ Binh Tinh Nhuệ Biên Ải",
        "defense_rating": 85,
        "attack_rating": 88,
        "mobility": 75,
        "special_trait": "Càng đánh càng hăng; khi HP dưới 50% tăng 40% sát thương đao pháp.",
        "unlocked_card_name": "Mãnh Hổ Xuất Sơn"
    },
    {
        "id": "TRP_TAY_LUONG_THIET_KY",
        "name": "Tây Lương Thiết Kỵ",
        "commander": "Mã Siêu",
        "category": "Trọng Kỵ Phá Trận",
        "defense_rating": 82,
        "attack_rating": 96,
        "mobility": 85,
        "special_trait": "Càn quét phá tan hàng phòng ngự đối phương; gây hoảng loạn cho bộ binh địch.",
        "unlocked_card_name": "Thiết Kỵ Càn Quét"
    },
    {
        "id": "TRP_GIANG_DONG_THUY_QUAN",
        "name": "Giang Đông Thủy Quân",
        "commander": "Chu Du / Cam Ninh",
        "category": "Thủy Quân Tác Chiến",
        "defense_rating": 75,
        "attack_rating": 92,
        "mobility": 90,
        "special_trait": "Vô địch trên sông ngòi; tăng gấp đôi hiệu lực hỏa công khi gió xuôi chiều.",
        "unlocked_card_name": "Lướt Sóng Hỏa Công"
    },
    {
        "id": "TRP_THAN_XA_CUNG_NO",
        "name": "Thần Xạ Cung Nỏ Vệ",
        "commander": "Hoàng Trung",
        "category": "Cung Nỏ Tầm Xa (Gia Cát Nỏ)",
        "defense_rating": 50,
        "attack_rating": 95,
        "mobility": 60,
        "special_trait": "Bắn liên tiếp 10 tiễn xuyên giáp; tầm bắn xa hơn 2 ô so với cung thủ thường.",
        "unlocked_card_name": "Vạn Tiễn Tề Phát"
    }
]

def export_game_bible():
    print("Exporting Game Bible...")

    # 1. Characters
    with open(BIBLE_DIR / "characters.json", "w", encoding="utf-8") as f:
        json.dump(HEROES_ROSTER, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(HEROES_ROSTER)} heroes & characters to {BIBLE_DIR / 'characters.json'}")

    # 2. Tech Tree
    with open(BIBLE_DIR / "tech_tree.json", "w", encoding="utf-8") as f:
        json.dump(TECH_TREE_DATABASE, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(TECH_TREE_DATABASE)} tech inventions to {BIBLE_DIR / 'tech_tree.json'}")

    # 3. Battles & Campaigns
    with open(BIBLE_DIR / "battles.json", "w", encoding="utf-8") as f:
        json.dump(CAMPAIGNS_DATABASE, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(CAMPAIGNS_DATABASE)} battles & campaigns to {BIBLE_DIR / 'battles.json'}")

    # 4. Court Events
    with open(BIBLE_DIR / "court_events.json", "w", encoding="utf-8") as f:
        json.dump(COURT_EVENTS_DATABASE, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(COURT_EVENTS_DATABASE)} visual novel court events to {BIBLE_DIR / 'court_events.json'}")

    # 5. Troop Types
    with open(BIBLE_DIR / "troop_types.json", "w", encoding="utf-8") as f:
        json.dump(TROOP_TYPES_DATABASE, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(TROOP_TYPES_DATABASE)} troop types to {BIBLE_DIR / 'troop_types.json'}")

    # 6. Build NetworkX Knowledge Graph
    G = nx.DiGraph()
    for name, char_data in HEROES_ROSTER.items():
        cid = char_data["id"]
        G.add_node(
            cid,
            label=char_data["canonical_name"],
            faction=char_data["faction"],
            role=char_data["role"],
            realm=char_data.get("martial_realm", "Phàm Nhân"),
            power=char_data.get("martial_power", 50),
            is_spirit=char_data.get("is_summoned_spirit", False)
        )

    for name, char_data in HEROES_ROSTER.items():
        cid = char_data["id"]
        for target_id, relation in char_data.get("relationships", {}).items():
            G.add_edge(cid, target_id, relation=relation)

    graph_dict = nx.node_link_data(G)
    with open(GRAPH_DIR / "character_graph.json", "w", encoding="utf-8") as f:
        json.dump(graph_dict, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported NetworkX Character Knowledge Graph ({G.number_of_nodes()} nodes, {G.number_of_edges()} relations) to {GRAPH_DIR / 'character_graph.json'}")

    print("\nGame Bible generation completed successfully!")

if __name__ == "__main__":
    export_game_bible()
