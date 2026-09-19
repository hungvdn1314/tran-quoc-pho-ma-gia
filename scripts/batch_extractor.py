import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Any
import networkx as nx

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
RAW_DIR = DATA_DIR / "raw_chapters"
BIBLE_DIR = DATA_DIR / "game_bible"
GRAPH_DIR = DATA_DIR / "character_graph"

BIBLE_DIR.mkdir(parents=True, exist_ok=True)
GRAPH_DIR.mkdir(parents=True, exist_ok=True)

# Canonical Summoned Heroes in the Three Kingdoms Spirit System
KNOWN_SUMMONED_HEROES = {
    "Triệu Vân": {
        "id": "CHAR_TRIEU_VAN",
        "canonical_name": "Triệu Vân",
        "aliases": ["Triệu Tử Long", "Thường Sơn Triệu Tử Long", "Tử Long"],
        "faction": "Quý Gia",
        "role": "Hổ Tướng Tiên Phong",
        "martial_realm": "Đế Cảnh (Đỉnh Phong)",
        "martial_power": 105,
        "is_summoned_spirit": True,
        "gold_summon_cost": 1000,
        "signature_weapons": ["Long Đảm Lượng Ngân Thương", "Bạch Long Mã", "Thanh Cương Kiếm"],
        "skills": [
            {
                "name": "Long Đảm",
                "card_type": "Tấn công & Phòng thủ",
                "cost_ap": 1,
                "gold_cost": 0,
                "effect_description": "Chuyển hóa bài phòng ngự thành đòn đâm thương uy lực cao, hồi lại 1 điểm AP nếu hạ gục mục tiêu."
            },
            {
                "name": "Thất Tiến Thất Xuất",
                "card_type": "Tuyệt Kỹ Vực Trận",
                "cost_ap": 2,
                "gold_cost": 500,
                "effect_description": "Xông thẳng vào vòng vây, gây sát thương lan toàn bộ quân địch và miễn nhiễm mọi khống chế trong 1 hiệp."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_DIEN_VI": "Chiến Hữu"},
        "lore_bio": "Võ tướng Tam Quốc đầu tiên Quý Bình An triệu hoán bằng ngân lượng tích lũy được từ câu đối hoàng cung. Trung thành tuyệt đối, dũng quán tam quân."
    },
    "Giả Hủ": {
        "id": "CHAR_GIA_HU",
        "canonical_name": "Giả Hủ",
        "aliases": ["Giả Hủ", "Độc Sĩ", "Văn Hòa"],
        "faction": "Quý Gia",
        "role": "Tuyệt Thế Mưu Thần",
        "martial_realm": "Phàm Nhân (Trí lực 120)",
        "martial_power": 45,
        "is_summoned_spirit": True,
        "gold_summon_cost": 5000,
        "signature_weapons": ["Cửu Châu Kỳ Bàn", "Bút Lông Độc Kế"],
        "skills": [
            {
                "name": "Loạn Vũ",
                "card_type": "Mưu Sách Phản Gián",
                "cost_ap": 2,
                "gold_cost": 200,
                "effect_description": "Mọi đơn vị địch mất phương hướng, buộc phải tấn công ngẫu nhiên mục tiêu gần nhất (kể cả đồng đội)."
            },
            {
                "name": "Hoàn Sát",
                "card_type": "Đoạt Mệnh Cấm Thuật",
                "cost_ap": 1,
                "gold_cost": 1000,
                "effect_description": "Khi kẻ địch rơi vào trạng thái hấp hối/nguy kịch, phong tỏa mọi khả năng dùng đan dược cứu mạng hoặc hộ mệnh phù."
            },
            {
                "name": "Mượn Dao Giết Người",
                "card_type": "Quyền Mưu",
                "cost_ap": 1,
                "gold_cost": 0,
                "effect_description": "Ép một tướng địch phải tấn công một tướng địch khác, nếu từ chối sẽ bị tịch thu 1 lá bài trang bị."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công / Mưu Chủ"},
        "lore_bio": "Mưu sĩ độc địa khét tiếng thời Tam Quốc được Quý Bình An triệu hoán. Mưu kế kín kẽ, lấy bảo toàn bản thân và chủ công làm đầu, tương kế tựu kế hố Vũ Hoàng và các hoàng tử."
    },
    "Điển Vi": {
        "id": "CHAR_DIEN_VI",
        "canonical_name": "Điển Vi",
        "aliases": ["Cổ Chi Ác Lai", "Ác Lai"],
        "faction": "Quý Gia",
        "role": "Hộ Vệ Thống Soái",
        "martial_realm": "Đế Cảnh",
        "martial_power": 102,
        "is_summoned_spirit": True,
        "gold_summon_cost": 10000,
        "signature_weapons": ["Song Thiết Kích", "Trọng Giáp Hắc Thiết"],
        "skills": [
            {
                "name": "Cương Liệt",
                "card_type": "Phản kích & Khiêu khích",
                "cost_ap": 1,
                "gold_cost": 0,
                "effect_description": "Mỗi khi gánh chịu sát thương hộ vệ cho Quý Bình An, tự động trả đòn 100% sát thương chuẩn lên kẻ ra tay."
            },
            {
                "name": "Thiết Kích Trảm",
                "card_type": "Trọng Kích",
                "cost_ap": 2,
                "gold_cost": 0,
                "effect_description": "Phóng song kích nghiền nát giáp hộ thể của đối phương, gây sát thương chí mạng."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_TRIEU_VAN": "Chiến Hữu"},
        "lore_bio": "Cổ chi Ác Lai sở hữu sức mạnh kinh hoàng, là bức tường thép hộ vệ bất khả xâm phạm của Quý Bình An trước các cuộc ám sát."
    },
    "Hoàng Trung": {
        "id": "CHAR_HOANG_TRUNG",
        "canonical_name": "Hoàng Trung",
        "aliases": ["Hoàng Hán Thăng", "Thần Xạ Thủ"],
        "faction": "Quý Gia",
        "role": "Thần Xạ Thống Soái",
        "martial_realm": "Đế Cảnh",
        "martial_power": 99,
        "is_summoned_spirit": True,
        "gold_summon_cost": 20000,
        "signature_weapons": ["Bát Bảo Kỳ Lân Cung", "Liệt Diễm Tiễn"],
        "skills": [
            {
                "name": "Bách Bộ Xuyên Dương",
                "card_type": "Tầm Xa Xuyên Giáp",
                "cost_ap": 2,
                "gold_cost": 0,
                "effect_description": "Bắn xuyên qua mọi lá chắn phòng ngự và đội hình tiền tiêu, trực tiếp tấn công chủ soái đối phương."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công"},
        "lore_bio": "Thần tiễn vô song của Ngũ Hổ Tướng, thống lĩnh đội quân cung nỏ tầm xa tiêu diệt cao thủ đối phương từ xa."
    },
    "Điêu Thuyền": {
        "id": "CHAR_DIEU_THUYEN",
        "canonical_name": "Điêu Thuyền",
        "aliases": ["Đệ Nhất Mỹ Nhân", "Phu Nhân Điêu Thuyền"],
        "faction": "Quý Gia",
        "role": "Khuynh Quốc Mỹ Nhân / Tình Báo",
        "martial_realm": "Hoàng Cảnh",
        "martial_power": 85,
        "is_summoned_spirit": True,
        "gold_summon_cost": 50000,
        "signature_weapons": ["Vũ Điệu Lụa Đỏ", "Lê Hoa Trâm"],
        "skills": [
            {
                "name": "Ly Gián Kế",
                "card_type": "Hãm Hại / Quyền Mưu",
                "cost_ap": 2,
                "gold_cost": 300,
                "effect_description": "Chọn 2 tướng lĩnh đối phương, buộc hai bên sinh nghi kị và quyết đấu sinh tử với nhau."
            },
            {
                "name": "Bế Nguyệt",
                "card_type": "Chi viện",
                "cost_ap": 1,
                "gold_cost": 0,
                "effect_description": "Kết thúc mỗi lượt, rút thêm 2 lá bài tình báo hoặc sách lược vào tay."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Thê Tử / Ái Thiếp"},
        "lore_bio": "Mỹ nhân tuyệt sắc Tam Quốc kết duyên đại hôn cùng Quý Bình An, vừa là hậu phương vững chắc vừa quản lý mạng lưới Hồng Nhan."
    },
    "Cao Thuận": {
        "id": "CHAR_CAO_THUAN",
        "canonical_name": "Cao Thuận",
        "aliases": ["Hãm Trận Doanh Thống Soái"],
        "faction": "Quý Gia",
        "role": "Thiết Quân Thống Soái",
        "martial_realm": "Hoàng Cảnh (Đỉnh phong)",
        "martial_power": 96,
        "is_summoned_spirit": True,
        "gold_summon_cost": 30000,
        "signature_weapons": ["Hắc Thiết Thương", "Trầm Mộc Thuẫn"],
        "skills": [
            {
                "name": "Hãm Trận Chi Chí",
                "card_type": "Bày Trận Giáp Sắt",
                "cost_ap": 2,
                "gold_cost": 0,
                "effect_description": "Triệu tập Hãm Trận Doanh tạo thành lũy thép, hấp thụ toàn bộ sát thương hướng vào đồng đội trong 2 lượt."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công"},
        "lore_bio": "Thống soái kiên trung bất khuất huấn luyện nên đạo quân bộ binh tinh nhuệ số một thiên hạ: Hãm Trận Doanh."
    },
    "Chu Du": {
        "id": "CHAR_CHU_DU",
        "canonical_name": "Chu Du",
        "aliases": ["Chu Công Cẩn", "Mỹ Chu Lang", "Đại Đô Đốc"],
        "faction": "Quý Gia",
        "role": "Thủy Quân Đại Đô Đốc",
        "martial_realm": "Đế Cảnh (Mưu lược 130)",
        "martial_power": 98,
        "is_summoned_spirit": True,
        "gold_summon_cost": 100000,
        "signature_weapons": ["Bảo Kiếm Đô Đốc", "Thất Tinh Cầm"],
        "skills": [
            {
                "name": "Xích Bích Hỏa Kế",
                "card_type": "Thủy Chiến / Hỏa Công",
                "cost_ap": 3,
                "gold_cost": 2000,
                "effect_description": "Kích hoạt hỏa thiêu toàn bộ chiến hạm địch khi kết hợp cùng thẻ Lưu Hỏa và Hướng Gió Đông."
            },
            {
                "name": "Phản Gián",
                "card_type": "Trộm Bài",
                "cost_ap": 1,
                "gold_cost": 500,
                "effect_description": "Tráo đổi bài trên tay kẻ địch, biến kế hoạch công kích của địch thành bẫy tự hại."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_CAM_NINH": "Phó Tướng"},
        "lore_bio": "Mở khóa phân hệ Thủy Chiến toàn diện của game. Thống lĩnh toàn bộ hạm đội Lâu Thuyền và Mông Đồng tranh đoạt giang hà."
    },
    "Cam Ninh": {
        "id": "CHAR_CAM_NINH",
        "canonical_name": "Cam Ninh",
        "aliases": ["Cam Hưng Bá", "Cẩm Phàm Tặc"],
        "faction": "Quý Gia",
        "role": "Thủy Quân Mãnh Tướng",
        "martial_realm": "Đế Cảnh",
        "martial_power": 101,
        "is_summoned_spirit": True,
        "gold_summon_cost": 80000,
        "signature_weapons": ["Song Kích", "Lục Linh Đao", "Cẩm Phàm Lặc Mã"],
        "skills": [
            {
                "name": "Cướp Trại Đêm",
                "card_type": "Đột Kích / Thủy Chiến",
                "cost_ap": 2,
                "gold_cost": 0,
                "effect_description": "Đột kích soái hạm hoặc căn cứ địch trong đêm, tiêu hủy 50% lương thảo và làm tê liệt phòng ngự."
            }
        ],
        "relationships": {"CHAR_CHU_DU": "Thống Soái", "CHAR_QUY_BINH_AN": "Chủ Công"},
        "lore_bio": "Chiến thần thủy quân chuyên đảm nhận các nhiệm vụ cảm tử, đột kích bất ngờ phá tan phòng tuyến đường thủy."
    },
    "Quách Gia": {
        "id": "CHAR_QUACH_GIA",
        "canonical_name": "Quách Gia",
        "aliases": ["Quách Phụng Hiếu", "Quỷ Tài"],
        "faction": "Quý Gia",
        "role": "Tuyệt Thế Quân Sư",
        "martial_realm": "Phàm Nhân (Trí Lực 125)",
        "martial_power": 40,
        "is_summoned_spirit": True,
        "gold_summon_cost": 100000,
        "signature_weapons": ["Quỷ Mưu Thư Quyển", "Hồ Lô Rượu"],
        "skills": [
            {
                "name": "Di Kế",
                "card_type": "Nội Tại / Rút Bài",
                "cost_ap": 0,
                "gold_cost": 0,
                "effect_description": "Mỗi khi Quý Bình An hoặc bản thân nhận sát thương, lập tức rút 2 lá bài sách lược và chia sẻ cho đồng đội."
            },
            {
                "name": "Thập Thắng Thập Bại",
                "card_type": "Kích Động Sĩ Khí",
                "cost_ap": 2,
                "gold_cost": 500,
                "effect_description": "Vạch trần 10 điểm yếu của địch, tăng 50% sát thương của toàn quân trong 3 lượt liên tiếp."
            }
        ],
        "relationships": {"CHAR_QUY_BINH_AN": "Chủ Công", "CHAR_GIA_HU": "Đồng Liêu"},
        "lore_bio": "Quỷ tài liệu sự như thần, hỗ trợ Quý Bình An phân tích bàn cờ thiên hạ bốn nước Đại Vũ, Nam Ly, Tây Lăng, Bắc Cương."
    }
}

# Native Novel Characters (World of the Great Yu)
KNOWN_WORLD_CHARACTERS = {
    "Quý Bình An": {
        "id": "CHAR_QUY_BINH_AN",
        "canonical_name": "Quý Bình An",
        "aliases": ["Phò Mã Gia", "Tứ Công Tử Quý Gia", "Tiểu Tử", "Quý Tứ Thiếu Gia"],
        "faction": "Quý Gia (Lãnh tụ)",
        "role": "Nhân Vật Chính / Chúa Công / Phò Mã",
        "martial_realm": "Trưởng Thành Từ Phàm Nhân Đến Bán Tiên",
        "martial_power": 60,
        "is_summoned_spirit": False,
        "gold_summon_cost": None,
        "signature_weapons": ["Thiên Công Cơ Quan Hộp", "Trấn Quốc Bảo Kiếm"],
        "skills": [
            {
                "name": "Kim Tiền Vạn Năng",
                "card_type": "Hệ Thống Lệnh",
                "cost_ap": 0,
                "gold_cost": 1000,
                "effect_description": "Tiêu hao vàng ròng để phục hồi sinh lực đồng đội hoặc cường hóa sát thương thẻ bài kế tiếp."
            },
            {
                "name": "Khai Quang Đột Phá",
                "card_type": "Hệ Thống Cường Hóa",
                "cost_ap": 1,
                "gold_cost": 5000,
                "effect_description": "Đột phá cảnh giới tức thời cho 1 vị tướng ra trận từ Hoàng Cảnh lên Đế Cảnh."
            }
        ],
        "relationships": {
            "CHAR_QUY_VO_SONG": "Phụ Thân",
            "CHAR_NINH_AN": "Thê Tử (Công chúa)",
            "CHAR_VU_HOANG": "Nhạc Phụ / Địch Thủ Quyền Mưu",
            "CHAR_DIEU_THUYEN": "Ái Thiếp"
        },
        "lore_bio": "Nhân vật chính, người xuyên việt từ thế giới hiện đại mê Tam Quốc Sát. Khởi đầu là phò mã vô dụng bị khinh bỉ, dùng hệ thống anh linh và vàng ròng từng bước thâu tóm thiên hạ."
    },
    "Quý Vô Song": {
        "id": "CHAR_QUY_VO_SONG",
        "canonical_name": "Quý Vô Song",
        "aliases": ["Hộ Quốc Công", "Chiến Thần Quý Vô Song", "Trấn Quốc Hầu"],
        "faction": "Quý Gia",
        "role": "Hộ Quốc Đại Tướng Quân / Bán Tiên Cao Thủ",
        "martial_realm": "Bán Tiên (Cảnh giới chí tôn thế giới)",
        "martial_power": 145,
        "is_summoned_spirit": False,
        "signature_weapons": ["Phá Thiên Chiến Đao", "Bắc Cương Hổ Phù"],
        "relationships": {"CHAR_QUY_BINH_AN": "Phụ Thân", "CHAR_VU_HOANG": "Quân Thần (Bằng mặt không bằng lòng)"},
        "lore_bio": "Phụ thân Quý Bình An, chiến thần trấn giữ Bắc Cương và Việt Thành, cảnh giới Bán Tiên cái thế, một tay bảo bọc gia tộc trước dã tâm diệt trừ của hoàng đế."
    },
    "Ninh An Công Chúa": {
        "id": "CHAR_NINH_AN",
        "canonical_name": "Triệu Ninh An",
        "aliases": ["Ninh An Công Chúa", "Công Chúa Điện Hạ", "Ninh An"],
        "faction": "Hoàng Thất Đại Vũ / Trung Lập",
        "role": "Hoàng Thất Công Chúa / Thê Tử Phò Mã",
        "martial_realm": "Hoàng Cảnh",
        "martial_power": 92,
        "is_summoned_spirit": False,
        "relationships": {"CHAR_QUY_BINH_AN": "Phu Quân", "CHAR_VU_HOANG": "Phụ Hoàng"},
        "lore_bio": "Công chúa Đại Vũ, thê tử trên danh nghĩa của Quý Bình An. Tâm tư thâm trầm, thông minh sắc sảo, ban đầu coi thường phò mã nhưng dần bị chấn kinh trước thực lực của chàng."
    },
    "Vũ Hoàng": {
        "id": "CHAR_VU_HOANG",
        "canonical_name": "Triệu Vũ Hoàng",
        "aliases": ["Bệ Hạ", "Đại Vũ Hoàng Đế", "Phụ Hoàng"],
        "faction": "Hoàng Thất Đại Vũ",
        "role": "Đương Triều Hoàng Đế / Kình Địch Quyền Mưu",
        "martial_realm": "Đế Cảnh (Đỉnh phong)",
        "martial_power": 115,
        "is_summoned_spirit": False,
        "relationships": {"CHAR_QUY_VO_SONG": "Hộ Quốc Tướng (E ngại)", "CHAR_QUY_BINH_AN": "Rể (Dè chừng)"},
        "lore_bio": "Hoàng đế khai triều Đại Vũ, đa nghi, tàn nhẫn, luôn tìm mọi cách thanh trừng công thần Quý gia nhằm thâu tóm binh quyền về tay dòng họ Triệu."
    },
    "Tử Ngọc Hằng": {
        "id": "CHAR_TU_NGOC_HANG",
        "canonical_name": "Tử Ngọc Hằng",
        "aliases": ["Tứ Hoàng Tử", "Điện Hạ Tứ Hoàng Tử"],
        "faction": "Hoàng Thất Đại Vũ",
        "role": "Hoàng Tử Tranh Ngai",
        "martial_realm": "Hoàng Cảnh",
        "martial_power": 88,
        "is_summoned_spirit": False,
        "relationships": {"CHAR_VU_HOANG": "Phụ Hoàng", "CHAR_QUY_BINH_AN": "Kẻ Thù"},
        "lore_bio": "Tứ hoàng tử mưu toan cướp ngôi thái tử, liên tục gài bẫy công kích Quý gia và Quý Bình An nhưng nhiều lần bị Giả Hủ dùng độc kế phản phệ."
    }
}

# Master Tech Tree Inventions
TECH_INVENTIONS = [
    {
        "id": "TECH_XAPHONG",
        "name": "Thấu Hoa Cao (Xà Phòng Tinh Chế)",
        "category": "Thương Nghiệp & Tích Lũy Vàng",
        "research_cost_gold": 100,
        "research_time_days": 1,
        "invented_chapter": 8,
        "unlocked_cards": ["Kinh Thương: Độc Quyền Xà Phòng"],
        "economic_yield": "Cung cấp +500 Vàng mỗi hiệp nội chính",
        "description": "Sản phẩm tẩy rửa vệ sinh quý tộc mang tính cách mạng thời phong kiến, đem lại nguồn lợi nhuận khổng lồ đầu tiên cho Quý Bình An."
    },
    {
        "id": "TECH_BACHTUY_CATRUOU",
        "name": "Kỹ Thuật Cất Rượu Mạnh (Bạch Tửu)",
        "category": "Thương Nghiệp & Ngoại Giao",
        "research_cost_gold": 500,
        "research_time_days": 2,
        "invented_chapter": 24,
        "unlocked_cards": ["Kinh Thương: Mở Tửu Lâu Vạn Kim"],
        "economic_yield": "Cung cấp +1.200 Vàng mỗi hiệp nội chính",
        "description": "Rượu cất nồng độ cao chưa từng xuất hiện ở dị giới, làm điên đảo giới quý tộc kinh thành và các tướng lĩnh biên cương."
    },
    {
        "id": "TECH_LUU_HOA",
        "name": "Lưu Hỏa (Hỏa Dược & Dầu Lửa)",
        "category": "Vũ Khí Chiến Thuật Cốt Lõi",
        "research_cost_gold": 5000,
        "research_time_days": 3,
        "invented_chapter": 120,
        "unlocked_cards": ["Lưu Hỏa Tiễn", "Hỏa Thiêu Liên Doanh", "Lưu Hỏa Đạn"],
        "economic_yield": None,
        "description": "Thần khí thay đổi cục diện chiến tranh: dầu cháy bốc lửa không thể dập tắt bằng nước, thiêu rụi thành trì và kỵ binh thiết giáp."
    },
    {
        "id": "TECH_GIACAT_THANNOR",
        "name": "Gia Cát Thần Nỏ (Nỏ Liên Châu)",
        "category": "Quân Sự & Binh Khí",
        "research_cost_gold": 15000,
        "research_time_days": 4,
        "invented_chapter": 190,
        "unlocked_cards": ["Nỏ Liên Châu Tề Xạ", "Mưa Tên Xuyên Giáp"],
        "economic_yield": None,
        "description": "Nỏ máy bắn liên tiếp 10 mũi tên thép, trang bị cho Cung Nỏ Vệ tiêu diệt kỵ binh hạng nặng ở cự ly gần."
    },
    {
        "id": "TECH_CHIEN_THUYEN_MONG_DONG",
        "name": "Chiến Hạm Mông Đồng & Lâu Thuyền",
        "category": "Thủy Chiến Giang Nam",
        "research_cost_gold": 50000,
        "research_time_days": 7,
        "invented_chapter": 380,
        "unlocked_cards": ["Lâu Thuyền Pháo Kích", "Mông Đồng Thiết Giáp Xung Kích"],
        "economic_yield": "Kiểm soát tuyến buôn bán đường thủy, thu thuế",
        "description": "Kỹ thuật đóng thuyền vượt thời đại của Giang Đông, nền tảng để Chu Du và Cam Ninh làm chủ hoàn toàn các tuyến sông lớn."
    }
]

# Major Troop Types
TROOP_TYPES = [
    {
        "id": "TRP_BACH_MA_NGHIA_TONG",
        "name": "Bạch Mã Nghĩa Tòng",
        "commander": "Triệu Vân",
        "category": "Kỵ Binh Cơ Động Nhẹ",
        "defense_rating": 60,
        "attack_rating": 88,
        "mobility": 95,
        "special_trait": "Cơ động thần tốc, rút ngắn 50% thời gian hành quân trên bản đồ chiến dịch.",
        "unlocked_card_name": "Kỵ Binh Đột Kích Xuyên Trận"
    },
    {
        "id": "TRP_HAM_TRAN_DOANH",
        "name": "Hãm Trận Doanh",
        "commander": "Cao Thuận",
        "category": "Bộ Binh Giáp Nặng Thủ Thành",
        "defense_rating": 98,
        "attack_rating": 75,
        "mobility": 40,
        "special_trait": "Bức tường thép bất khả xâm phạm; giảm 70% sát thương từ cung tên và kỵ binh.",
        "unlocked_card_name": "Khiên Thép Khóa Trận"
    },
    {
        "id": "TRP_GIANG_DONG_THUY_QUAN",
        "name": "Giang Đông Thủy Quân",
        "commander": "Chu Du / Cam Ninh",
        "category": "Thủy Quân Tinh Nhuệ",
        "defense_rating": 70,
        "attack_rating": 90,
        "mobility": 85,
        "special_trait": "Tác chiến trên sông nước bất bại; tăng 100% hiệu lực của thẻ Hỏa Công khi thuận gió.",
        "unlocked_card_name": "Lướt Sóng Chém Tướng"
    }
]

# Story Arcs Framework
STORY_ARCS = [
    {
        "arc_id": "ARC_01",
        "arc_number": 1,
        "title": "Phò Mã Phủ & Giai Đoạn Tích Kim Triệu Tướng",
        "start_chapter": 1,
        "end_chapter": 150,
        "synopsis": "Quý Bình An xuyên không thành phò mã rể thừa tại Đại Vũ triều. Bằng câu đối trăm lượng vàng, chàng kích hoạt hệ thống Tam Quốc Sát, triệu hoán Triệu Vân, Giả Hủ, Điển Vi. Tương kế tựu kế hóa giải các đòn hiểm từ Vũ Hoàng, Tứ hoàng tử và cuộc tập kích của sứ đoàn Tây Lăng.",
        "major_turning_points": [
            "Chương 1: Đối câu đối hoàng cung kiếm 100 lượng vàng đầu tiên.",
            "Chương 5: Triệu hoán Triệu Vân đại sát tứ phương.",
            "Chương 27: Triệu hoán Độc Sĩ Giả Hủ, bắt đầu dùng độc kế lũng đoạn cung đình.",
            "Chương 63: Điển Vi xuất thế, chém giết thích khách bảo vệ Quý phủ.",
            "Chương 84: Danh xưng 'Quý Bình An Trăm Vạn Kim', trở thành đại gia ngầm lớn nhất kinh đô."
        ]
    },
    {
        "arc_id": "ARC_02",
        "arc_number": 2,
        "title": "Kinh Thành Biến Loạn & Xuất Chinh Bắc Cương",
        "start_chapter": 151,
        "end_chapter": 400,
        "synopsis": "Vũ Hoàng bệnh nặng trúng độc, kinh thành hỗn loạn. Quý Bình An liên kết phụ thân Quý Vô Song, chế tạo Lưu Hỏa và Gia Cát Thần Nỏ, đánh tan loạn quân, xuất quân cứu viện Bắc Cương chặn đứng liên quân Tây Lăng và Nam Ly.",
        "major_turning_points": [
            "Chương 190: Sáng tạo Thiên Công Cơ Quan và nỏ liên châu.",
            "Chương 191: Đại hôn Điêu Thuyền, mở rộng mạng lưới tình báo Hồng Nhan.",
            "Chương 246: Triệu Vân lĩnh kỵ binh phá tan Phi Báo quân hoàng gia.",
            "Chương 320: Thần khí Lưu Hỏa lần đầu xuất hiện, thiêu rụi 10 vạn đại quân ngoại bang."
        ]
    },
    {
        "arc_id": "ARC_03",
        "arc_number": 3,
        "title": "Thao Túng Đại Vũ & Mở Khóa Thủy Quân Giang Nam",
        "start_chapter": 401,
        "end_chapter": 800,
        "synopsis": "Quý Bình An chính thức nắm quyền kiểm soát triều chính Đại Vũ. Chiêu mộ Đại Đô Đốc Chu Du và Cẩm Phàm Tặc Cam Ninh, đóng chiến hạm Mông Đồng mở đại chiến trường Thủy Chiến sông lớn, bóp nghẹt tuyến phòng ngự Nam Ly.",
        "major_turning_points": [
            "Chiêu mộ Chu Du, xây dựng Thủy quân Giang Nam.",
            "Hỏa thiêu chiến thuyền Nam Ly tại đại giang.",
            "Phân chia lại quyền lực vương triều, đưa công chúa Ninh An lên ngôi hoặc buông rèm nhiếp chính."
        ]
    },
    {
        "arc_id": "ARC_04",
        "arc_number": 4,
        "title": "Tứ Quốc Tranh Hùng & Thống Nhất Đại Lục",
        "start_chapter": 801,
        "end_chapter": 1509,
        "synopsis": "Đại Vũ, Tây Lăng, Nam Ly và Bắc Cương bước vào trận đại quyết chiến sinh tử. Quý Bình An triệu hoán các thần tướng đỉnh phong (Quan Vũ, Gia Cát Lượng, Lữ Bố), đối đầu trực tiếp các đại cao thủ Bán Tiên và Nhân Tiên dị giới, kiến tạo Đại Hán truyền kỳ thịnh thế.",
        "major_turning_points": [
            "Đại chiến Hổ Lao Quan và đỉnh cao cảnh giới Bán Tiên Quý Vô Song.",
            "Tiêu diệt hoàng triều Nam Ly và sáp nhập Tây Lăng.",
            "Chương 1511: Đại Hán Thịnh Thế - Thống nhất hoàn toàn thiên hạ."
        ]
    }
]

# Court Intrigue & Decision Events (Visual Novel Branches)
COURT_EVENTS = [
    {
        "id": "EVT_001_CAU_DOI_HOANG_CUNG",
        "name": "Thiên Đương Kỳ Bàn (Giải Đố Câu Đối Vũ Hoàng)",
        "arc_id": "ARC_01",
        "trigger_chapter": 1,
        "context_dialogue": "Vũ Hoàng ra vế đối hóc búa: 'Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ' (Trời làm bàn cờ sao làm quân cờ, ai dám xuống cờ?). Toàn bộ Viện Sĩ Văn Học Viện đều bó tay. Thưởng 100 lượng vàng ròng.",
        "opposing_figures": ["Vu Văn Châu Viện Sĩ", "Thị Vệ Trưởng Hoàng Cung"],
        "choices": [
            {
                "choice_id": "C1_DOITHO_XUAT_SAC",
                "choice_text": "Đối lại vế dưới kinh thiên động địa: 'Địa tác tỳ bà lộ tác huyền, thùy nhân cảm đạn' (Đất làm đàn tỳ bà đường làm dây, ai dám gảy?).",
                "suspicion_change": 5,
                "favor_change": 15,
                "gold_change": 100,
                "narrative_consequence": "Nhận ngay 100 lượng vàng ròng! Đủ điều kiện kích hoạt lần đầu Hệ Thống Tam Quốc Sát để chuẩn bị triệu hoán Triệu Vân."
            },
            {
                "choice_id": "C2_IM_LANG_GIA_NGU",
                "choice_text": "Tiếp tục giả ngơ ngác làm phò mã chân mềm, không ra mặt.",
                "suspicion_change": -5,
                "favor_change": -10,
                "gold_change": 0,
                "narrative_consequence": "Không có vàng khởi đầu, hệ thống anh linh chậm thức tỉnh, bị thị vệ phủ phò mã khinh khi."
            }
        ]
    },
    {
        "id": "EVT_002_DUNG_DOC_KE_HO_VU_HOANG",
        "name": "Độc Kế Giả Hủ: Hố Hoàng Đế",
        "arc_id": "ARC_01",
        "trigger_chapter": 28,
        "context_dialogue": "Vũ Hoàng muốn ép Quý gia giao nộp quân lương và dò xét thực lực phủ phò mã. Giả Hủ hiến kế 'Tương kế tựu kế': giả vờ dâng nạp bổng lộc nhưng bí mật gài bẫy khiến hoàng đế phải bồi thường gấp mười.",
        "opposing_figures": ["Vũ Hoàng", "Đại Nội Tổng Quản"],
        "choices": [
            {
                "choice_id": "C1_THEO_CO_HU",
                "choice_text": "Nghe theo độc kế của Giả Hủ: Cố ý làm mình bị thương và để lộ thư từ ngụy tạo.",
                "suspicion_change": 10,
                "favor_change": 0,
                "gold_change": 10000,
                "narrative_consequence": "Vũ Hoàng đuối lý, buộc phải ban thưởng 1 vạn lượng vàng để xoa dịu Quý gia. Quý Bình An gom đủ vốn triệu hoán Điển Vi!"
            },
            {
                "choice_id": "C2_THOA_HIEP",
                "choice_text": "Ngoan ngoãn dâng nộp sản nghiệp để cầu bình an.",
                "suspicion_change": -15,
                "favor_change": 10,
                "gold_change": -2000,
                "narrative_consequence": "Mất vốn kinh doanh, bị triều đình lấn tới coi thường."
            }
        ]
    }
]

def export_all():
    # Merge characters
    all_chars = {}
    all_chars.update(KNOWN_SUMMONED_HEROES)
    all_chars.update(KNOWN_WORLD_CHARACTERS)

    # 1. Export Characters
    with open(BIBLE_DIR / "characters.json", "w", encoding="utf-8") as f:
        json.dump(all_chars, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(all_chars)} characters to characters.json")

    # 2. Export Tech Tree
    with open(BIBLE_DIR / "tech_tree.json", "w", encoding="utf-8") as f:
        json.dump(TECH_INVENTIONS, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(TECH_INVENTIONS)} tech tree items to tech_tree.json")

    # 3. Export Troops
    with open(BIBLE_DIR / "troop_types.json", "w", encoding="utf-8") as f:
        json.dump(TROOP_TYPES, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(TROOP_TYPES)} troop types to troop_types.json")

    # 4. Export Story Arcs
    with open(BIBLE_DIR / "story_arcs.json", "w", encoding="utf-8") as f:
        json.dump(STORY_ARCS, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(STORY_ARCS)} story arcs to story_arcs.json")

    # 5. Export Court Events
    with open(BIBLE_DIR / "court_events.json", "w", encoding="utf-8") as f:
        json.dump(COURT_EVENTS, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported {len(COURT_EVENTS)} court events to court_events.json")

    # 6. Build and Export NetworkX Character Graph
    G = nx.DiGraph()
    for name, c in all_chars.items():
        G.add_node(
            c["id"],
            label=c["canonical_name"],
            faction=c["faction"],
            role=c["role"],
            realm=c.get("martial_realm", "Phàm Nhân"),
            power=c.get("martial_power", 50)
        )

    for name, c in all_chars.items():
        cid = c["id"]
        for target_id, rel in c.get("relationships", {}).items():
            G.add_edge(cid, target_id, relation=rel)

    graph_data = nx.node_link_data(G)
    with open(GRAPH_DIR / "character_graph.json", "w", encoding="utf-8") as f:
        json.dump(graph_data, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported NetworkX graph ({G.number_of_nodes()} nodes, {G.number_of_edges()} edges) to character_graph.json")

if __name__ == "__main__":
    export_all()
