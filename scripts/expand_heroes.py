import json
import sys
import os

# Ensure import path
sys.path.insert(0, os.path.abspath('data/game_config/schemas'))
from hero_schema import Hero, HeroStats, Equipment, Skill, Bond

def build_expanded_heroes():
    # Load existing 10 heroes
    with open('data/game_config/heroes.json', 'r', encoding='utf-8') as f:
        heroes = json.load(f)

    existing_ids = {h['id'] for h in heroes}

    new_heroes = [
        # 1. QUAN VŨ (GUAN YU)
        {
            "id": "hero_guanyu",
            "name": "Quan Vũ",
            "aliases": ["Guan Yu", "Quan Vân Trường", "Mỹ Nhiễm Công"],
            "rarity": "SSR",
            "faction": "Hoàng Thất Đại Vũ",
            "realm": "Hoàng Cảnh Đỉnh Phong",
            "base_stats": {
                "force": 98,
                "command": 95,
                "intelligence": 75,
                "politics": 62,
                "charisma": 93
            },
            "hp": 1350,
            "atk": 165,
            "troop_type": "Kinh Châu Thủy Bộ Kỵ",
            "cost": 7.0,
            "troop_affinity": {
                "Kỵ Binh": "S",
                "Thủy Quân": "S",
                "Bộ Binh": "A",
                "Cung Thủ": "B"
            },
            "equipment": [
                {
                    "id": "eq_thanhlong",
                    "name": "Thanh Long Yển Nguyệt Đao",
                    "type": "weapon",
                    "stat_bonus": {"force": 12},
                    "description": "Thần đao nặng 82 cân, trảm tướng đoạt kỳ."
                },
                {
                    "id": "eq_xichtho_guanyu",
                    "name": "Xích Thố Mã",
                    "type": "mount",
                    "stat_bonus": {"command": 5, "force": 3},
                    "description": "Chiến mã đệ nhất thiên hạ, phi qua vạn dặm."
                }
            ],
            "skills": [
                {
                    "id": "sk_thanhlong_tram",
                    "name": "Thanh Long Trảm Tướng",
                    "type": "active",
                    "mana_cost": 3,
                    "damage": 450,
                    "effects": ["Pierce Armor", "Bleed"],
                    "description": "Vung đại đao chém đứt phòng tuyến địch."
                },
                {
                    "id": "sk_uy_chan_hoa_ha",
                    "name": "Uy Chấn Hoa Hạ",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["All Enemy ATK -15%"],
                    "description": "Hào khí trấn áp toàn bộ tướng lĩnh địch."
                },
                {
                    "id": "sk_nghia_tuyet",
                    "name": "Nghĩa Khí Hạo Nhiên",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Morale Lock at 100%"],
                    "description": "Sĩ khí quân sĩ không bao giờ suy giảm."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_taovien",
                    "name": "Đào Viên Kết Nghĩa",
                    "required_heroes": ["hero_zhangfei"],
                    "bonus": {"force_pct": 15.0, "hp_pct": 10.0},
                    "is_active": False
                },
                {
                    "id": "bnd_nguho_guanyu",
                    "name": "Ngũ Hổ Tướng",
                    "required_heroes": ["hero_zhaoyun", "hero_machao", "hero_zhangfei", "hero_huangzhong"],
                    "bonus": {"atk_pct": 20.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 60,
            "novel_first_appearance": 55
        },
        # 2. TRƯƠNG PHI (ZHANG FEI)
        {
            "id": "hero_zhangfei",
            "name": "Trương Phi",
            "aliases": ["Zhang Fei", "Trương Dực Đức"],
            "rarity": "SSR",
            "faction": "Hoàng Thất Đại Vũ",
            "realm": "Hoàng Cảnh Cao Kỳ",
            "base_stats": {
                "force": 98,
                "command": 86,
                "intelligence": 33,
                "politics": 22,
                "charisma": 50
            },
            "hp": 1300,
            "atk": 160,
            "troop_type": "U Châu Mãnh Kỵ",
            "cost": 6.5,
            "troop_affinity": {
                "Kỵ Binh": "S",
                "Bộ Binh": "A",
                "Thương Binh": "S",
                "Cung Thủ": "C"
            },
            "equipment": [
                {
                    "id": "eq_truongbat",
                    "name": "Trượng Bát Xà Mâu",
                    "type": "weapon",
                    "stat_bonus": {"force": 10},
                    "description": "Mâu thép dài uốn lượn như rắn, đâm thủng giáp trụ."
                }
            ],
            "skills": [
                {
                    "id": "sk_tieng_het_truong_ban",
                    "name": "Tiếng Hét Trường Bản",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 250,
                    "effects": ["Stun All Frontline", "Break Formation"],
                    "description": "Thét vang làm vỡ mật tướng địch, làm choáng toàn làn đối diện."
                },
                {
                    "id": "sk_ma_manh",
                    "name": "Mãnh Khí Đột Trận",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Crit Rate +25%"],
                    "description": "Tăng mạnh tỷ lệ bạo kích khi xông pha trận mạc."
                },
                {
                    "id": "sk_cuong_chien",
                    "name": "Cuồng Chiến Bất Khuất",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["ATK +30% when HP < 50%"],
                    "description": "Máu càng thấp, đòn đánh càng hung bạo."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_taovien_zf",
                    "name": "Đào Viên Kết Nghĩa",
                    "required_heroes": ["hero_guanyu"],
                    "bonus": {"force_pct": 15.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 60,
            "novel_first_appearance": 55
        },
        # 3. GIA CÁT LƯỢNG (ZHUGE LIANG)
        {
            "id": "hero_zhugeliang",
            "name": "Gia Cát Lượng",
            "aliases": ["Zhuge Liang", "Khổng Minh", "Ngọa Long"],
            "rarity": "UR",
            "faction": "Hoàng Thất Đại Vũ",
            "realm": "Bán Thánh",
            "base_stats": {
                "force": 38,
                "command": 94,
                "intelligence": 100,
                "politics": 99,
                "charisma": 98
            },
            "hp": 950,
            "atk": 85,
            "troop_type": "Bát Quái Thần Cơ Doanh",
            "cost": 7.5,
            "troop_affinity": {
                "Cung Thủ": "S",
                "Bộ Binh": "S",
                "Trận Pháp": "S",
                "Kỵ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_hac_vu_phien",
                    "name": "Bạch Hạc Vũ Phiến",
                    "type": "weapon",
                    "stat_bonus": {"intelligence": 15, "command": 5},
                    "description": "Quạt lông phất nhẹ điều khiển gió mây và thế trận."
                }
            ],
            "skills": [
                {
                    "id": "sk_bat_tran_do",
                    "name": "Bát Trận Đồ Quái Trận",
                    "type": "active",
                    "mana_cost": 4,
                    "damage": 300,
                    "effects": ["Disrupt All Lanes", "Confusion 2 Turns", "Terrain Transform"],
                    "description": "Biến đổi toàn bộ sa trường thành Bát Quái Đồ, khiến địch tự tàn sát."
                },
                {
                    "id": "sk_dong_phong",
                    "name": "Hô Phong Hoán Vũ",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Fire Stratagem Damage +50%"],
                    "description": "Tăng uy lực tối đa cho mọi chiến thuật Hỏa Công."
                },
                {
                    "id": "sk_than_co_dieu_toan",
                    "name": "Thần Cơ Diệu Toán",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Reveal All Enemy Intents", "Draw +2 Cards/Turn"],
                    "description": "Nhìn thấu mọi mưu đồ và dự định của đối phương."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_ngoa_long_phuong_so",
                    "name": "Ngọa Long Xuất Sơn",
                    "required_heroes": ["hero_zhaoyun"],
                    "bonus": {"command_pct": 12.0, "intelligence_pct": 10.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 80,
            "novel_first_appearance": 75
        },
        # 4. HOÀNG TRUNG (HUANG ZHONG)
        {
            "id": "hero_huangzhong",
            "name": "Hoàng Trung",
            "aliases": ["Huang Zhong", "Hoàng Hán Thăng"],
            "rarity": "SSR",
            "faction": "Hoàng Thất Đại Vũ",
            "realm": "Hoàng Cảnh Sơ Kỳ",
            "base_stats": {
                "force": 93,
                "command": 86,
                "intelligence": 60,
                "politics": 52,
                "charisma": 75
            },
            "hp": 1100,
            "atk": 155,
            "troop_type": "Thần Xạ Cung Doanh",
            "cost": 6.0,
            "troop_affinity": {
                "Cung Thủ": "S",
                "Bộ Binh": "A",
                "Kỵ Binh": "B"
            },
            "equipment": [
                {
                    "id": "eq_bao_dieu_cung",
                    "name": "Bảo Điêu Cung",
                    "type": "weapon",
                    "stat_bonus": {"force": 8},
                    "description": "Cung sắt hai thạch, bách bộ xuyên dương."
                }
            ],
            "skills": [
                {
                    "id": "sk_bach_bo_xuyen_duong",
                    "name": "Bách Bộ Xuyên Dương",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 380,
                    "effects": ["Snipe Commander", "Ignore Wall"],
                    "description": "Bắn thẳng vào tướng chỉ huy đối phương bỏ qua tường thành."
                },
                {
                    "id": "sk_lao_duong_ich_trang",
                    "name": "Lão Đương Ích Tráng",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Range +2", "Armor Piercing +20%"],
                    "description": "Càng già càng dẻo dai, tầm bắn và sát thương tăng theo số hiệp."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_nguho_hz",
                    "name": "Ngũ Hổ Tướng",
                    "required_heroes": ["hero_guanyu", "hero_zhaoyun"],
                    "bonus": {"atk_pct": 10.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 70,
            "novel_first_appearance": 65
        },
        # 5. NGỤY DIÊN (WEI YAN)
        {
            "id": "hero_weiyan",
            "name": "Ngụy Diên",
            "aliases": ["Wei Yan", "Ngụy Văn Trường"],
            "rarity": "SR",
            "faction": "Trung Lập",
            "realm": "Vương Cảnh",
            "base_stats": {
                "force": 89,
                "command": 82,
                "intelligence": 69,
                "politics": 45,
                "charisma": 40
            },
            "hp": 1150,
            "atk": 135,
            "troop_type": "Tý Ngọ Đột Kích Kỵ",
            "cost": 5.0,
            "troop_affinity": {
                "Kỵ Binh": "A",
                "Bộ Binh": "S",
                "Cung Thủ": "B"
            },
            "equipment": [
                {
                    "id": "eq_cuong_cot_dao",
                    "name": "Cuồng Cốt Đại Đao",
                    "type": "weapon",
                    "stat_bonus": {"force": 6},
                    "description": "Đao chém hung hiểm, chuyên đánh tập kích bất ngờ."
                }
            ],
            "skills": [
                {
                    "id": "sk_ty_ngo_ky_muu",
                    "name": "Tý Ngọ Cốc Kỳ Mưu",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 280,
                    "effects": ["Flank Attack", "Direct Rearguard"],
                    "description": "Tập kích tập hậu quân địch gây rối loạn hàng ngũ."
                },
                {
                    "id": "sk_cuong_cot",
                    "name": "Cuồng Cốt Huyết Chiến",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Life Steal 20%"],
                    "description": "Hút sinh lực đối phương qua từng đòn chém."
                }
            ],
            "bonds": [],
            "summon_chapter": 65,
            "novel_first_appearance": 60
        },
        # 6. CHU DU (ZHOU YU)
        {
            "id": "hero_zhouyu",
            "name": "Chu Du",
            "aliases": ["Zhou Yu", "Chu Công Cẩn", "Mỹ Chu Lang"],
            "rarity": "SSR",
            "faction": "Giang Đông",
            "realm": "Hoàng Cảnh Đỉnh Phong",
            "base_stats": {
                "force": 71,
                "command": 96,
                "intelligence": 96,
                "politics": 86,
                "charisma": 94
            },
            "hp": 1050,
            "atk": 120,
            "troop_type": "Giang Đông Thủy Doanh",
            "cost": 7.0,
            "troop_affinity": {
                "Thủy Quân": "S",
                "Cung Thủ": "S",
                "Bộ Binh": "A",
                "Kỵ Binh": "C"
            },
            "equipment": [
                {
                    "id": "eq_co_dinh_kiem",
                    "name": "Cổ Đĩnh Kiếm",
                    "type": "weapon",
                    "stat_bonus": {"command": 8, "intelligence": 5},
                    "description": "Bảo kiếm truyền đời trấn giữ Trường Giang."
                }
            ],
            "skills": [
                {
                    "id": "sk_hoa_thieu_xich_bich",
                    "name": "Hỏa Thiêu Xích Bích",
                    "type": "active",
                    "mana_cost": 3,
                    "damage": 350,
                    "effects": ["AoE Burn All Lanes", "Armor Melt"],
                    "description": "Phóng hỏa toàn bộ chiến trường thiêu rụi chiến thuyền và thiết giáp."
                },
                {
                    "id": "sk_anh_tu",
                    "name": "Anh Tư Táo Phát",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Speed Priority +1", "Morale Boost"],
                    "description": "Luôn được ra đòn trước tiên trong mỗi hiệp."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_giangdong_songbich",
                    "name": "Giang Đông Song Bích",
                    "required_heroes": ["hero_sunce"],
                    "bonus": {"command_pct": 15.0, "atk_pct": 10.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 90,
            "novel_first_appearance": 85
        },
        # 7. TÔN SÁCH (SUN CE)
        {
            "id": "hero_sunce",
            "name": "Tôn Sách",
            "aliases": ["Sun Ce", "Tôn Bá Phù", "Tiểu Bá Vương"],
            "rarity": "SSR",
            "faction": "Giang Đông",
            "realm": "Hoàng Cảnh Cao Kỳ",
            "base_stats": {
                "force": 92,
                "command": 92,
                "intelligence": 69,
                "politics": 70,
                "charisma": 92
            },
            "hp": 1250,
            "atk": 150,
            "troop_type": "Giang Đông Hổ Báo Kỵ",
            "cost": 6.5,
            "troop_affinity": {
                "Kỵ Binh": "S",
                "Thủy Quân": "S",
                "Bộ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_ba_vuong_thuong",
                    "name": "Bá Vương Kích",
                    "type": "weapon",
                    "stat_bonus": {"force": 8},
                    "description": "Vũ khí mô phỏng Hạng Vũ xé toạc chiến tuyến."
                }
            ],
            "skills": [
                {
                    "id": "sk_ba_vuong_tra_tran",
                    "name": "Bá Vương Tảo Lục Hợp",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 320,
                    "effects": ["Knockback", "Cleave Left-Right"],
                    "description": "Quét kích đập văng tiền tuyến địch sang hai bên làn."
                },
                {
                    "id": "sk_hung_ba_giang_dong",
                    "name": "Hùng Bá Giang Đông",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["ATK +15% per defeated enemy"],
                    "description": "Mỗi khi tiêu diệt một đạo quân, sức mạnh lại tăng vọt."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_songbich_sc",
                    "name": "Giang Đông Song Bích",
                    "required_heroes": ["hero_zhouyu"],
                    "bonus": {"force_pct": 10.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 90,
            "novel_first_appearance": 85
        },
        # 8. LỤC TỐN (LU XUN)
        {
            "id": "hero_luxun",
            "name": "Lục Tốn",
            "aliases": ["Lu Xun", "Lục Bá Ngôn"],
            "rarity": "SSR",
            "faction": "Giang Đông",
            "realm": "Hoàng Cảnh Trung Kỳ",
            "base_stats": {
                "force": 69,
                "command": 94,
                "intelligence": 95,
                "politics": 87,
                "charisma": 90
            },
            "hp": 1000,
            "atk": 115,
            "troop_type": "Giang Đông Phong Hỏa Vệ",
            "cost": 6.5,
            "troop_affinity": {
                "Thủy Quân": "S",
                "Bộ Binh": "S",
                "Cung Thủ": "A"
            },
            "equipment": [
                {
                    "id": "eq_phong_hoa_kiem",
                    "name": "Phong Hỏa Kiếm",
                    "type": "weapon",
                    "stat_bonus": {"intelligence": 8},
                    "description": "Kiếm dẫn hỏa thiêu đốt doanh trại địch liên hoàn."
                }
            ],
            "skills": [
                {
                    "id": "sk_hoa_thieu_lien_doanh",
                    "name": "Hỏa Thiêu Liên Doanh",
                    "type": "active",
                    "mana_cost": 3,
                    "damage": 330,
                    "effects": ["Chain Burn", "Destroy Camp"],
                    "description": "Ngọn lửa lây lan từ đơn vị này sang đơn vị khác mỗi hiệp."
                }
            ],
            "bonds": [],
            "summon_chapter": 110,
            "novel_first_appearance": 105
        },
        # 9. CAM NINH (GAN NING)
        {
            "id": "hero_ganning",
            "name": "Cam Ninh",
            "aliases": ["Gan Ning", "Cam Hưng Bá", "Cẩm Phàm Tặc"],
            "rarity": "SR",
            "faction": "Giang Đông",
            "realm": "Vương Cảnh",
            "base_stats": {
                "force": 94,
                "command": 86,
                "intelligence": 76,
                "politics": 18,
                "charisma": 58
            },
            "hp": 1200,
            "atk": 145,
            "troop_type": "Cẩm Phàm Thủy Đạo",
            "cost": 5.5,
            "troop_affinity": {
                "Thủy Quân": "S",
                "Bộ Binh": "A",
                "Kỵ Binh": "B"
            },
            "equipment": [
                {
                    "id": "eq_cam_pham_linh",
                    "name": "Cẩm Phàm Linh Đao",
                    "type": "weapon",
                    "stat_bonus": {"force": 7},
                    "description": "Đao đeo chuông đồng lục lạc vang danh sông hồ."
                }
            ],
            "skills": [
                {
                    "id": "sk_bach_ky_cuop_trai",
                    "name": "Bách Kỵ Kiếp Tào Doanh",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 300,
                    "effects": ["Stealth Strike", "Morale Drop -30"],
                    "description": "Trăm kỵ đột kích ban đêm làm náo loạn đại bản doanh địch."
                }
            ],
            "bonds": [],
            "summon_chapter": 95,
            "novel_first_appearance": 90
        },
        # 10. THÁI SỬ TỪ (TAISHI CI)
        {
            "id": "hero_taishici",
            "name": "Thái Sử Từ",
            "aliases": ["Taishi Ci", "Thái Sử Tử Nghĩa"],
            "rarity": "SR",
            "faction": "Giang Đông",
            "realm": "Vương Cảnh",
            "base_stats": {
                "force": 93,
                "command": 82,
                "intelligence": 66,
                "politics": 58,
                "charisma": 78
            },
            "hp": 1180,
            "atk": 140,
            "troop_type": "Giang Đông Cung Kỵ",
            "cost": 5.5,
            "troop_affinity": {
                "Cung Thủ": "S",
                "Kỵ Binh": "A",
                "Bộ Binh": "B"
            },
            "equipment": [
                {
                    "id": "eq_song_kich",
                    "name": "Đoản Kích Song Hành",
                    "type": "weapon",
                    "stat_bonus": {"force": 6},
                    "description": "Cặp kích ngắn thiện xạ cận chiến."
                }
            ],
            "skills": [
                {
                    "id": "sk_tien_vo_hu_phat",
                    "name": "Tiễn Vô Hư Phát",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 260,
                    "effects": ["Double Shot", "Target 2 Units"],
                    "description": "Bắn hai mũi tên cùng lúc vào hai đơn vị địch khác nhau."
                }
            ],
            "bonds": [],
            "summon_chapter": 95,
            "novel_first_appearance": 90
        },
        # 11. HỨA CHỬ (XU CHU)
        {
            "id": "hero_xuchu",
            "name": "Hứa Chử",
            "aliases": ["Xu Chu", "Hứa Trọng Khang", "Hổ Si"],
            "rarity": "SSR",
            "faction": "Trung Lập",
            "realm": "Hoàng Cảnh Trung Kỳ",
            "base_stats": {
                "force": 98,
                "command": 65,
                "intelligence": 36,
                "politics": 20,
                "charisma": 56
            },
            "hp": 1450,
            "atk": 160,
            "troop_type": "Hổ Vệ Doanh",
            "cost": 6.5,
            "troop_affinity": {
                "Bộ Binh": "S",
                "Kỵ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_thiet_chuy",
                    "name": "Bát Giác Đại Thiết Chùy",
                    "type": "weapon",
                    "stat_bonus": {"force": 10},
                    "description": "Chùy sắt khổng lồ quật ngã chiến mã."
                }
            ],
            "skills": [
                {
                    "id": "sk_khoa_ma_huyet_chien",
                    "name": "Khỏa Mã Quyết Đấu",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 400,
                    "effects": ["Duel Lock", "Self Armor -10%", "Damage +30%"],
                    "description": "Cởi giáp xông vào một mất một còn với chủ tướng địch."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_ho_ve_song_sat",
                    "name": "Hổ Vệ Song Dũng",
                    "required_heroes": ["hero_dianwei"],
                    "bonus": {"hp_pct": 20.0, "force_pct": 10.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 35,
            "novel_first_appearance": 30
        },
        # 12. HẠ HẦU ĐÔN (XIAHOU DUN)
        {
            "id": "hero_xiahoudun",
            "name": "Hạ Hầu Đôn",
            "aliases": ["Xiahou Dun", "Hạ Hầu Nguyên Nhượng", "Manh Hạ Hầu"],
            "rarity": "SSR",
            "faction": "Trung Lập",
            "realm": "Hoàng Cảnh Sơ Kỳ",
            "base_stats": {
                "force": 90,
                "command": 89,
                "intelligence": 58,
                "politics": 70,
                "charisma": 80
            },
            "hp": 1350,
            "atk": 138,
            "troop_type": "Hổ Báo Kỵ Tiên Phong",
            "cost": 6.0,
            "troop_affinity": {
                "Kỵ Binh": "S",
                "Bộ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_pha_quan_dao",
                    "name": "Phá Quân Đại Đao",
                    "type": "weapon",
                    "stat_bonus": {"force": 8},
                    "description": "Đao chém kiên định không lùi bước."
                }
            ],
            "skills": [
                {
                    "id": "sk_nuot_con_nguoi",
                    "name": "Bạt Tiễn Thực Nhãn",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 280,
                    "effects": ["Taunt All", "Reflect 30% Damage"],
                    "description": "Rút tên nuốt con ngươi, gầm thét hút toàn bộ hỏa lực địch."
                }
            ],
            "bonds": [],
            "summon_chapter": 45,
            "novel_first_appearance": 40
        },
        # 13. TRƯƠNG CÁP (ZHANG HE)
        {
            "id": "hero_zhanghe",
            "name": "Trương Cáp",
            "aliases": ["Zhang He", "Trương Tuấn Nghệ"],
            "rarity": "SR",
            "faction": "Trung Lập",
            "realm": "Vương Cảnh",
            "base_stats": {
                "force": 89,
                "command": 90,
                "intelligence": 74,
                "politics": 57,
                "charisma": 71
            },
            "hp": 1200,
            "atk": 132,
            "troop_type": "Đại Vũ Cấm Vệ Doanh",
            "cost": 5.5,
            "troop_affinity": {
                "Bộ Binh": "S",
                "Kỵ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_xao_bien_thuong",
                    "name": "Xảo Biến Thiết Thương",
                    "type": "weapon",
                    "stat_bonus": {"command": 6},
                    "description": "Thương pháp linh hoạt ứng biến theo địa hình."
                }
            ],
            "skills": [
                {
                    "id": "sk_xao_bien_tran_the",
                    "name": "Xảo Biến Lâm Trận",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 220,
                    "effects": ["Dodge Next Attack", "Terrain Mastery"],
                    "description": "Nhìn thấu cạm bẫy địa hình để né tránh đòn công hiểm."
                }
            ],
            "bonds": [],
            "summon_chapter": 50,
            "novel_first_appearance": 45
        },
        # 14. TƯ MÃ Ý (SIMA YI)
        {
            "id": "hero_simayi",
            "name": "Tư Mã Ý",
            "aliases": ["Sima Yi", "Tư Mã Trọng Đạt", "Trủng Hổ"],
            "rarity": "SSR",
            "faction": "Trung Lập",
            "realm": "Hoàng Cảnh Đỉnh Phong",
            "base_stats": {
                "force": 63,
                "command": 98,
                "intelligence": 98,
                "politics": 93,
                "charisma": 88
            },
            "hp": 1150,
            "atk": 105,
            "troop_type": "U Minh Trủng Hổ Vệ",
            "cost": 7.0,
            "troop_affinity": {
                "Bộ Binh": "S",
                "Cung Thủ": "S",
                "Kỵ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_trung_ho_kiem",
                    "name": "Trủng Hổ Hàn Kiếm",
                    "type": "weapon",
                    "stat_bonus": {"intelligence": 10, "command": 8},
                    "description": "Kiếm sắc giấu trong vỏ, chờ thời cơ đoạt thiên hạ."
                }
            ],
            "skills": [
                {
                    "id": "sk_ung_thi_lang_co",
                    "name": "Ưng Thị Lang Cố",
                    "type": "active",
                    "mana_cost": 3,
                    "damage": 300,
                    "effects": ["Drain Mana 2", "Silence 1 Turn"],
                    "description": "Ánh mắt lang sói phong tỏa chiêu thức của toàn bộ đối phương."
                },
                {
                    "id": "sk_nhan_nhuc_phu_trong",
                    "name": "Ẩn Nhẫn Đợi Thời",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Armor +40% when Defending"],
                    "description": "Phòng thủ kiên cố như bàn thạch không thể công phá."
                }
            ],
            "bonds": [],
            "summon_chapter": 100,
            "novel_first_appearance": 95
        },
        # 15. LỮ BỐ (LU BU)
        {
            "id": "hero_lubu",
            "name": "Lữ Bố",
            "aliases": ["Lu Bu", "Lữ Phụng Tiên", "Vô Song Chiến Thần", "Phi Tướng"],
            "rarity": "UR",
            "faction": "Trung Lập",
            "realm": "Đế Cảnh",
            "base_stats": {
                "force": 100,
                "command": 87,
                "intelligence": 26,
                "politics": 13,
                "charisma": 40
            },
            "hp": 1600,
            "atk": 200,
            "troop_type": "Tinh Châu Thiết Kỵ",
            "cost": 7.5,
            "troop_affinity": {
                "Kỵ Binh": "S",
                "Cung Thủ": "S",
                "Bộ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_phuong_thien",
                    "name": "Phương Thiên Họa Kích",
                    "type": "weapon",
                    "stat_bonus": {"force": 15},
                    "description": "Chiến kích thần thánh vô song trảm vạn quân."
                },
                {
                    "id": "eq_xichtho_lubu",
                    "name": "Xích Thố Thần Mã",
                    "type": "mount",
                    "stat_bonus": {"force": 5, "command": 5},
                    "description": "Nhân trung Lữ Bố, mã trung Xích Thố."
                }
            ],
            "skills": [
                {
                    "id": "sk_vo_song_loan_vu",
                    "name": "Vô Song Loạn Vũ",
                    "type": "active",
                    "mana_cost": 4,
                    "damage": 600,
                    "effects": ["Attack All Units Across 3 Lanes", "Armor Ignore 50%"],
                    "description": "Múa kích cuồng bạo hủy diệt toàn bộ quân địch trên cả 3 làn."
                },
                {
                    "id": "sk_chien_than",
                    "name": "Thiên Hạ Vô Song",
                    "type": "passive",
                    "mana_cost": 0,
                    "damage": 0,
                    "effects": ["Immune to All Control"],
                    "description": "Miễn nhiễm mọi hiệu ứng khống chế, câm lặng và choáng."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_anh_hung_my_nhan",
                    "name": "Anh Hùng Mỹ Nhân",
                    "required_heroes": ["hero_diaochan"],
                    "bonus": {"atk_pct": 25.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 80,
            "novel_first_appearance": 70
        },
        # 16. HOA HÙNG (HUA XIONG)
        {
            "id": "hero_huaxiong",
            "name": "Hoa Hùng",
            "aliases": ["Hua Xiong"],
            "rarity": "SR",
            "faction": "Tây Lăng",
            "realm": "Vương Cảnh",
            "base_stats": {
                "force": 90,
                "command": 80,
                "intelligence": 40,
                "politics": 25,
                "charisma": 50
            },
            "hp": 1250,
            "atk": 138,
            "troop_type": "Tây Lăng Cuồng Đao",
            "cost": 5.0,
            "troop_affinity": {
                "Kỵ Binh": "A",
                "Bộ Binh": "S"
            },
            "equipment": [
                {
                    "id": "eq_tram_ma_dao",
                    "name": "Trảm Mã Đại Đao",
                    "type": "weapon",
                    "stat_bonus": {"force": 6},
                    "description": "Đao bản rộng chuyên phạt bộ binh và ngựa chiến."
                }
            ],
            "skills": [
                {
                    "id": "sk_tram_tuong_truoc_tran",
                    "name": "Trảm Tướng Trừ Trấn",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 290,
                    "effects": ["Execute Low HP Unit"],
                    "description": "Chém đứt đầu tướng địch có lượng máu dưới 20%."
                }
            ],
            "bonds": [],
            "summon_chapter": 25,
            "novel_first_appearance": 20
        },
        # 17. NHAN LƯƠNG (YAN LIANG)
        {
            "id": "hero_yanliang",
            "name": "Nhan Lương",
            "aliases": ["Yan Liang"],
            "rarity": "SR",
            "faction": "Bắc Cương",
            "realm": "Vương Cảnh",
            "base_stats": {
                "force": 93,
                "command": 83,
                "intelligence": 42,
                "politics": 30,
                "charisma": 52
            },
            "hp": 1280,
            "atk": 142,
            "troop_type": "Bắc Cương Thiết Kỵ",
            "cost": 5.5,
            "troop_affinity": {
                "Kỵ Binh": "S",
                "Bộ Binh": "A"
            },
            "equipment": [
                {
                    "id": "eq_khai_son_dao",
                    "name": "Khai Sơn Đại Phủ",
                    "type": "weapon",
                    "stat_bonus": {"force": 7},
                    "description": "Rìu lớn chém nát khiên đồng."
                }
            ],
            "skills": [
                {
                    "id": "sk_dung_quan_tam_quan",
                    "name": "Dũng Quán Tam Quân",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 310,
                    "effects": ["Shield Break"],
                    "description": "Đánh sập toàn bộ lá chắn phòng ngự của kẻ địch."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_ha_bac_song_dung",
                    "name": "Hà Bắc Song Dũng",
                    "required_heroes": ["hero_wenchou"],
                    "bonus": {"force_pct": 12.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 40,
            "novel_first_appearance": 35
        },
        # 18. VĂN XÚ (WEN CHOU)
        {
            "id": "hero_wenchou",
            "name": "Văn Xú",
            "aliases": ["Wen Chou"],
            "rarity": "SR",
            "faction": "Bắc Cương",
            "realm": "Vương Cảnh",
            "base_stats": {
                "force": 92,
                "command": 81,
                "intelligence": 35,
                "politics": 24,
                "charisma": 48
            },
            "hp": 1260,
            "atk": 140,
            "troop_type": "Bắc Cương Kỵ Xạ",
            "cost": 5.5,
            "troop_affinity": {
                "Kỵ Binh": "S",
                "Cung Thủ": "A"
            },
            "equipment": [
                {
                    "id": "eq_xa_thiet_thuong",
                    "name": "Xà Mâu Thiết Thương",
                    "type": "weapon",
                    "stat_bonus": {"force": 6},
                    "description": "Ngọn giáo dài nhọn hoắt xông trận."
                }
            ],
            "skills": [
                {
                    "id": "sk_hung_ma_xung_kich",
                    "name": "Hung Mã Xung Trận",
                    "type": "active",
                    "mana_cost": 2,
                    "damage": 290,
                    "effects": ["Stun Front Target"],
                    "description": "Thúc ngựa húc bay kẻ chắn đường gây choáng."
                }
            ],
            "bonds": [
                {
                    "id": "bnd_ha_bac_song_dung_wc",
                    "name": "Hà Bắc Song Dũng",
                    "required_heroes": ["hero_yanliang"],
                    "bonus": {"force_pct": 12.0},
                    "is_active": False
                }
            ],
            "summon_chapter": 40,
            "novel_first_appearance": 35
        }
    ]

    for h in new_heroes:
        if h['id'] not in existing_ids:
            # Validate with Pydantic
            validated = Hero(**h)
            heroes.append(validated.dict())

    # Write back
    with open('data/game_config/heroes.json', 'w', encoding='utf-8') as f:
        json.dump(heroes, f, ensure_ascii=False, indent=4)

    print(f"Thành công mở rộng Roster: Hiện có tổng cộng {len(heroes)} danh tướng!")

if __name__ == '__main__':
    build_expanded_heroes()
