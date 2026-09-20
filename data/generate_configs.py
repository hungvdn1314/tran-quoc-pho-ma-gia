import os
import json

base_dir = r"c:\Users\Admin\Documents\antigravity\tran-quoc-pho-ma-gia\data\game_config"
schemas_dir = os.path.join(base_dir, "schemas")

os.makedirs(schemas_dir, exist_ok=True)

hero_schema = '''from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional, List, Dict

class Rarity(str, Enum):
    R = "R"
    SR = "SR"
    SSR = "SSR"
    UR = "UR"

class Faction(str, Enum):
    QUY_GIA = "Quý Gia"
    HOANG_THAT = "Hoàng Thất Đại Vũ"
    TAY_LANG = "Tây Lăng"
    NAM_LY = "Nam Ly"
    BAC_CUONG = "Bắc Cương"
    GIANG_DONG = "Giang Đông"
    TRUNG_LAP = "Trung Lập"

class MartialRealm(str, Enum):
    VUONG_CANH = "Vương Cảnh"
    HOANG_CANH_SO_KY = "Hoàng Cảnh Sơ Kỳ"
    HOANG_CANH_TRUNG_KY = "Hoàng Cảnh Trung Kỳ"
    HOANG_CANH_HA_KY = "Hoàng Cảnh Hạ Kỳ"
    DE_CANH = "Đế Cảnh"
    BAN_THANH = "Bán Thánh"
    THANH_GIA = "Thánh Giả"
    BAN_TIEN = "Bán Tiên"
    NHAN_TIEN = "Nhân Tiên"

class HeroStats(BaseModel):
    force: int = Field(ge=1, le=150, description="Võ Lực")
    command: int = Field(ge=1, le=150, description="Thống Soái")
    intelligence: int = Field(ge=1, le=150, description="Trí Lực")
    politics: int = Field(ge=1, le=150, description="Chính Trị")
    charisma: int = Field(ge=1, le=150, description="Uy Vọng")

class Equipment(BaseModel):
    id: str
    name: str
    type: str
    stat_bonus: Dict[str, int]
    description: str

class Skill(BaseModel):
    id: str
    name: str
    type: str
    mana_cost: int = 0
    damage: int = 0
    effects: List[str]
    description: str
    trigger_rate: Optional[float] = None

class Bond(BaseModel):
    id: str
    name: str
    required_heroes: List[str]
    bonus: Dict[str, float]
    is_active: bool = False

class Hero(BaseModel):
    id: str
    name: str
    aliases: List[str] = []
    rarity: str
    faction: str
    realm: str
    base_stats: HeroStats
    hp: int
    atk: int
    troop_type: str
    cost: float = Field(ge=3.0, le=7.5, description="Formation cost")
    troop_affinity: Dict[str, str]
    equipment: List[Equipment] = []
    skills: List[Skill] = []
    bonds: List[Bond] = []
    summon_chapter: Optional[int] = None
    summon_cost_gold: Optional[int] = None
    novel_first_appearance: Optional[int] = None
'''

card_schema = '''from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional, List

class CardType(str, Enum):
    UNIT = "unit"
    TACTIC = "tactic"
    STRATAGEM = "stratagem"
    EQUIPMENT = "equipment"
    TERRAIN = "terrain"

class CardTarget(str, Enum):
    SINGLE = "single"
    ALL_ENEMIES = "all_enemies"
    LANE = "lane"
    SELF = "self"
    ALLY = "ally"
    WALL = "wall"

class Card(BaseModel):
    id: str
    name: str
    type: str
    rarity: str
    mana_cost: int = Field(ge=0, le=10)
    damage: int = 0
    shield: int = 0
    heal: int = 0
    target: str = CardTarget.SINGLE
    effects: List[str] = []
    description: str
    unlock_chapter: Optional[int] = None
    hero_required: Optional[str] = None

    @property
    def power_budget(self) -> float:
        return 0.5 * self.damage + 0.4 * self.shield + 0.3 * self.heal

    @property
    def budget_limit(self) -> float:
        return 50 * self.mana_cost

    @property
    def is_balanced(self) -> bool:
        return self.power_budget <= self.budget_limit * 1.2
'''

battle_schema = '''from pydantic import BaseModel, Field
from typing import Optional, List, Dict

class EnemyUnit(BaseModel):
    id: str
    name: str
    hp: int
    atk: int
    lane: str
    intent_pattern: List[str]
    phase_transitions: Optional[Dict[str, str]] = None

class BattleEncounter(BaseModel):
    id: str
    name: str
    chapter: int
    type: str
    difficulty: int = Field(ge=1, le=10)
    player_wall_hp: Optional[int] = None
    enemy_units: List[EnemyUnit]
    turn_limit: Optional[int] = None
    victory_conditions: List[str]
    rewards: Dict[str, int]
    unlocks: List[str] = []
'''

economy_schema = '''from pydantic import BaseModel
from typing import Dict, List

class Currency(BaseModel):
    id: str
    name: str
    description: str

class Faucet(BaseModel):
    chapter: int
    source: str
    amount: int
    currency_id: str

class Sink(BaseModel):
    sink_id: str
    cost: int
    currency_id: str

class BalanceParams(BaseModel):
    inflation_rate: float
    max_storage: Dict[str, int]

class EconomyConfig(BaseModel):
    currencies: List[Currency]
    faucets: List[Faucet]
    sinks: List[Sink]
    balance: BalanceParams
'''

with open(os.path.join(schemas_dir, "hero_schema.py"), "w", encoding="utf-8") as f:
    f.write(hero_schema)

with open(os.path.join(schemas_dir, "card_schema.py"), "w", encoding="utf-8") as f:
    f.write(card_schema)

with open(os.path.join(schemas_dir, "battle_schema.py"), "w", encoding="utf-8") as f:
    f.write(battle_schema)

with open(os.path.join(schemas_dir, "economy_schema.py"), "w", encoding="utf-8") as f:
    f.write(economy_schema)

# Write JSONs
heroes = [
    {
        "id": "hero_zhaoyun", "name": "Triệu Vân", "aliases": ["Zhao Yun"], "rarity": "SSR",
        "faction": "Hoàng Thất Đại Vũ", "realm": "Hoàng Cảnh Sơ Kỳ",
        "base_stats": {"force": 96, "command": 91, "intelligence": 76, "politics": 65, "charisma": 90},
        "hp": 1200, "atk": 150, "troop_type": "Bạch Mã Nghĩa Tòng", "cost": 6.5,
        "troop_affinity": {"Bạch Mã Nghĩa Tòng": "S"},
        "equipment": [{"id": "eq_longdam", "name": "Long Đảm Lượng Ngân Thương", "type": "weapon", "stat_bonus": {"force": 10}, "description": "Thương truyền thuyết."}],
        "skills": [
            {"id": "sk_thattham", "name": "Thất Thám Bàn Xà", "type": "active", "mana_cost": 3, "damage": 400, "effects": [], "description": "Gây sát thương lớn."},
            {"id": "sk_longdam", "name": "Long Đảm", "type": "passive", "effects": ["Immune to fear"], "description": "Không bị hoảng sợ."},
            {"id": "sk_dotkich", "name": "Đột Kích", "type": "passive", "effects": ["+10% speed"], "description": "Tăng tốc độ."}
        ],
        "bonds": [{"id": "bnd_nguho", "name": "Ngũ Hổ Tướng", "required_heroes": ["hero_machao"], "bonus": {"atk_pct": 10.0}, "is_active": False}],
        "summon_chapter": 5, "novel_first_appearance": 5
    },
    {
        "id": "hero_dianwei", "name": "Điển Vi", "aliases": ["Dian Wei"], "rarity": "SSR",
        "faction": "Trung Lập", "realm": "Hoàng Cảnh Trung Kỳ",
        "base_stats": {"force": 99, "command": 72, "intelligence": 35, "politics": 25, "charisma": 60},
        "hp": 1500, "atk": 160, "troop_type": "Hổ Bộ Doanh", "cost": 6.0,
        "troop_affinity": {"Hổ Bộ Doanh": "S"},
        "equipment": [], "skills": [{"id": "sk_aclai", "name": "Ác Lai", "type": "passive", "effects": [], "description": "Tăng sát thương theo HP mất.", "damage": 0}],
        "bonds": [{"id": "bnd_hovethan", "name": "Hộ Vệ Thần", "required_heroes": [], "bonus": {"hp_pct": 15.0}, "is_active": False}], "summon_chapter": 15, "novel_first_appearance": 15
    },
    {
        "id": "hero_jiaxu", "name": "Giả Hủ", "aliases": ["Jia Xu"], "rarity": "SSR",
        "faction": "Trung Lập", "realm": "Hoàng Cảnh Sơ Kỳ",
        "base_stats": {"force": 45, "command": 65, "intelligence": 97, "politics": 88, "charisma": 50},
        "hp": 800, "atk": 50, "troop_type": "Mưu Thần", "cost": 5.5,
        "troop_affinity": {"Mưu Thần": "S"},
        "equipment": [], "skills": [{"id": "sk_docsi", "name": "Độc Sĩ", "type": "active", "mana_cost": 4, "damage": 100, "effects": ["Poison"], "description": "Gây độc mạnh."}],
        "bonds": [{"id": "bnd_muuthan", "name": "Mưu Thần", "required_heroes": ["hero_xunyu", "hero_guojia"], "bonus": {"int_pct": 10.0}, "is_active": False}], "summon_chapter": 27, "novel_first_appearance": 27
    },
    {
        "id": "hero_gaoshun", "name": "Cao Thuận", "aliases": ["Gao Shun"], "rarity": "SR",
        "faction": "Tây Lăng", "realm": "Vương Cảnh",
        "base_stats": {"force": 82, "command": 78, "intelligence": 52, "politics": 40, "charisma": 70},
        "hp": 1100, "atk": 120, "troop_type": "Hãm Trận Doanh", "cost": 5.0,
        "troop_affinity": {"Hãm Trận Doanh": "S"},
        "equipment": [], "skills": [{"id": "sk_hamtran", "name": "Hãm Trận", "type": "passive", "effects": ["Break shield"], "description": "Phá giáp.", "damage": 0}],
        "bonds": [{"id": "bnd_trungthanh", "name": "Trung Thành", "required_heroes": ["hero_zhangliao"], "bonus": {"def_pct": 10.0}, "is_active": False}], "summon_chapter": 20, "novel_first_appearance": 20
    },
    {
        "id": "hero_liru", "name": "Lý Nho", "aliases": ["Li Ru"], "rarity": "SR",
        "faction": "Tây Lăng", "realm": "Vương Cảnh",
        "base_stats": {"force": 55, "command": 60, "intelligence": 85, "politics": 72, "charisma": 40},
        "hp": 750, "atk": 45, "troop_type": "Mưu Thần", "cost": 4.5,
        "troop_affinity": {"Mưu Thần": "A"},
        "equipment": [], "skills": [{"id": "sk_lietduc", "name": "Diệt Dục", "type": "active", "mana_cost": 3, "damage": 50, "effects": ["Silence"], "description": "Khóa mõm."}],
        "bonds": [{"id": "bnd_docac", "name": "Độc Ác", "required_heroes": ["hero_jiaxu"], "bonus": {"damage_pct": 5.0}, "is_active": False}], "summon_chapter": 18, "novel_first_appearance": 18
    },
    {
        "id": "hero_diaochan", "name": "Điêu Thuyền", "aliases": ["Diao Chan"], "rarity": "SSR",
        "faction": "Quý Gia", "realm": "Hoàng Cảnh Sơ Kỳ",
        "base_stats": {"force": 28, "command": 30, "intelligence": 82, "politics": 90, "charisma": 100},
        "hp": 700, "atk": 30, "troop_type": "Hồng Nhan", "cost": 4.0,
        "troop_affinity": {"Hồng Nhan": "S"},
        "equipment": [], "skills": [{"id": "sk_lygian", "name": "Ly Gián", "type": "active", "mana_cost": 3, "damage": 0, "effects": ["Charm"], "description": "Quyến rũ."}],
        "bonds": [{"id": "bnd_hongnhan", "name": "Hồng Nhan", "required_heroes": [], "bonus": {"dodge_pct": 15.0}, "is_active": False}], "summon_chapter": 25, "novel_first_appearance": 25
    },
    {
        "id": "hero_machao", "name": "Mã Siêu", "aliases": ["Ma Chao"], "rarity": "SSR",
        "faction": "Tây Lăng", "realm": "Hoàng Cảnh Trung Kỳ",
        "base_stats": {"force": 97, "command": 85, "intelligence": 42, "politics": 30, "charisma": 80},
        "hp": 1150, "atk": 155, "troop_type": "Tây Lăng Thiết Kỵ", "cost": 6.5,
        "troop_affinity": {"Tây Lăng Thiết Kỵ": "S"},
        "equipment": [], "skills": [{"id": "sk_dotkich2", "name": "Thiết Kỵ", "type": "passive", "effects": ["Charge"], "description": "Lao tới.", "damage": 0}],
        "bonds": [{"id": "bnd_nguho2", "name": "Ngũ Hổ Tướng", "required_heroes": ["hero_zhaoyun"], "bonus": {"atk_pct": 10.0}, "is_active": False}], "summon_chapter": 100, "novel_first_appearance": 100
    },
    {
        "id": "hero_zhangliao", "name": "Trương Liêu", "aliases": ["Zhang Liao"], "rarity": "SSR",
        "faction": "Bắc Cương", "realm": "Hoàng Cảnh Sơ Kỳ",
        "base_stats": {"force": 90, "command": 88, "intelligence": 68, "politics": 52, "charisma": 85},
        "hp": 1100, "atk": 130, "troop_type": "Thiết Kỵ Tiên Phong", "cost": 6.0,
        "troop_affinity": {"Thiết Kỵ Tiên Phong": "S"},
        "equipment": [], "skills": [{"id": "sk_uytran", "name": "Uy Trấn", "type": "active", "mana_cost": 4, "damage": 200, "effects": ["Fear"], "description": "Gây sợ hãi."}],
        "bonds": [{"id": "bnd_tienphong", "name": "Tiên Phong", "required_heroes": ["hero_gaoshun"], "bonus": {"speed_pct": 10.0}, "is_active": False}], "summon_chapter": 45, "novel_first_appearance": 45
    },
    {
        "id": "hero_guojia", "name": "Quách Gia", "aliases": ["Guo Jia"], "rarity": "SSR",
        "faction": "Trung Lập", "realm": "Hoàng Cảnh Trung Kỳ",
        "base_stats": {"force": 35, "command": 55, "intelligence": 98, "politics": 82, "charisma": 75},
        "hp": 700, "atk": 40, "troop_type": "Mưu Thần Đệ Nhất", "cost": 6.5,
        "troop_affinity": {"Mưu Thần Đệ Nhất": "S"},
        "equipment": [], "skills": [{"id": "sk_thienky", "name": "Thiên Cơ", "type": "passive", "effects": ["Insight"], "description": "Nhìn thấu.", "damage": 0}],
        "bonds": [{"id": "bnd_muuthan2", "name": "Mưu Thần", "required_heroes": ["hero_xunyu", "hero_jiaxu"], "bonus": {"int_pct": 10.0}, "is_active": False}], "summon_chapter": 60, "novel_first_appearance": 60
    },
    {
        "id": "hero_xunyu", "name": "Tuân Úc", "aliases": ["Xun Yu"], "rarity": "SSR",
        "faction": "Hoàng Thất Đại Vũ", "realm": "Hoàng Cảnh Sơ Kỳ",
        "base_stats": {"force": 30, "command": 58, "intelligence": 95, "politics": 96, "charisma": 90},
        "hp": 750, "atk": 35, "troop_type": "Nội Chính Đại Thần", "cost": 6.0,
        "troop_affinity": {"Nội Chính Đại Thần": "S"},
        "equipment": [], "skills": [{"id": "sk_vuongta", "name": "Vương Tá", "type": "passive", "effects": ["Resource Boost"], "description": "Tăng tài nguyên.", "damage": 0}],
        "bonds": [{"id": "bnd_muuthan3", "name": "Mưu Thần", "required_heroes": ["hero_guojia", "hero_jiaxu"], "bonus": {"int_pct": 10.0}, "is_active": False}], "summon_chapter": 30, "novel_first_appearance": 30
    }
]

# Ensure 3 skills each for heroes as per requirements
for hero in heroes:
    while len(hero['skills']) < 3:
        hero['skills'].append({"id": f"sk_generic_{hero['id']}_{len(hero['skills'])}", "name": "Kỹ năng thường", "type": "passive", "effects": [], "description": "Kỹ năng bổ trợ."})
    while len(hero['bonds']) < 2:
        hero['bonds'].append({"id": f"bnd_generic_{hero['id']}_{len(hero['bonds'])}", "name": "Duyên phận", "required_heroes": [], "bonus": {}, "is_active": False})

with open(os.path.join(base_dir, "heroes.json"), "w", encoding="utf-8") as f:
    json.dump(heroes, f, indent=4, ensure_ascii=False)

cards = [
    {"id": "c_bach_ma", "name": "Bạch Mã Xung Phong", "type": "unit", "rarity": "SR", "mana_cost": 3, "damage": 50, "shield": 0, "heal": 0, "target": "lane", "effects": [], "description": "Bạch Mã Nghĩa Tòng xung phong.", "unlock_chapter": 5, "hero_required": "hero_zhaoyun"},
    {"id": "c_ham_tran", "name": "Hãm Trận Doanh", "type": "unit", "rarity": "SR", "mana_cost": 4, "damage": 60, "shield": 20, "heal": 0, "target": "lane", "effects": ["Break shield"], "description": "Lực lượng tử sĩ.", "unlock_chapter": 20, "hero_required": "hero_gaoshun"},
    {"id": "c_cung_thu", "name": "Cung Thủ Thủ Thành", "type": "unit", "rarity": "R", "mana_cost": 2, "damage": 30, "shield": 0, "heal": 0, "target": "single", "effects": [], "description": "Cung thủ bảo vệ thành.", "unlock_chapter": 1},
    {"id": "c_thiet_ky", "name": "Thiết Kỵ Đột Kích", "type": "unit", "rarity": "SR", "mana_cost": 4, "damage": 70, "shield": 0, "heal": 0, "target": "lane", "effects": ["Charge"], "description": "Kỵ binh xung phong.", "unlock_chapter": 15},
    {"id": "c_bo_binh", "name": "Bộ Binh Trường Thương", "type": "unit", "rarity": "R", "mana_cost": 2, "damage": 25, "shield": 10, "heal": 0, "target": "lane", "effects": ["Anti-Cavalry"], "description": "Lính cầm giáo.", "unlock_chapter": 1},
    
    {"id": "c_that_tham", "name": "Thất Thám Bàn Xà", "type": "tactic", "rarity": "SSR", "mana_cost": 5, "damage": 120, "shield": 0, "heal": 0, "target": "single", "effects": ["Combo"], "description": "Kỹ năng đặc trưng của Triệu Vân.", "unlock_chapter": 5, "hero_required": "hero_zhaoyun"},
    {"id": "c_bao_liet", "name": "Bạo Liệt Đao Pháp", "type": "tactic", "rarity": "SR", "mana_cost": 3, "damage": 80, "shield": 0, "heal": 0, "target": "single", "effects": ["Bleed"], "description": "Chém mạnh.", "unlock_chapter": 10},
    {"id": "c_hoa_cong", "name": "Hỏa Công Liên Hoàn", "type": "tactic", "rarity": "SSR", "mana_cost": 6, "damage": 100, "shield": 0, "heal": 0, "target": "all_enemies", "effects": ["Burn"], "description": "Đốt cháy địch.", "unlock_chapter": 27},
    {"id": "c_phuc_binh", "name": "Phục Binh", "type": "tactic", "rarity": "R", "mana_cost": 2, "damage": 0, "shield": 0, "heal": 0, "target": "lane", "effects": ["Ambush"], "description": "Tạo phục binh.", "unlock_chapter": 8},
    
    {"id": "c_xa_lu", "name": "Xả Lũ Thanh Thủy", "type": "stratagem", "rarity": "SSR", "mana_cost": 5, "damage": 150, "shield": 0, "heal": 0, "target": "all_enemies", "effects": ["Wet", "Slow"], "description": "Kế thủy công.", "unlock_chapter": 35},
    {"id": "c_noi_ung", "name": "Nội Ứng Khai Môn", "type": "stratagem", "rarity": "SR", "mana_cost": 4, "damage": 0, "shield": 0, "heal": 0, "target": "wall", "effects": ["Reduce defense"], "description": "Nội gián mở cửa thành.", "unlock_chapter": 20},
    {"id": "c_ly_gian", "name": "Ly Gián Kế", "type": "stratagem", "rarity": "SSR", "mana_cost": 4, "damage": 0, "shield": 0, "heal": 0, "target": "single", "effects": ["Betray"], "description": "Làm địch tự đánh nhau.", "unlock_chapter": 25, "hero_required": "hero_diaochan"},
    
    {"id": "c_long_dam", "name": "Long Đảm Lượng Ngân Thương", "type": "equipment", "rarity": "SSR", "mana_cost": 3, "damage": 0, "shield": 0, "heal": 0, "target": "ally", "effects": ["+ATK", "+Pierce"], "description": "Vũ khí của Triệu Vân.", "unlock_chapter": 5},
    {"id": "c_bach_ngan", "name": "Bạch Ngân Giáp", "type": "equipment", "rarity": "SR", "mana_cost": 2, "damage": 0, "shield": 50, "heal": 0, "target": "ally", "effects": ["+DEF"], "description": "Áo giáp sáng loáng.", "unlock_chapter": 5},
    
    {"id": "c_tuong_thanh", "name": "Tường Thành Cao Lâm", "type": "terrain", "rarity": "R", "mana_cost": 3, "damage": 0, "shield": 100, "heal": 0, "target": "lane", "effects": ["Fortify"], "description": "Dựng tường bảo vệ.", "unlock_chapter": 1}
]

with open(os.path.join(base_dir, "cards.json"), "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=4, ensure_ascii=False)

battles = [
    {
        "id": "battle_ch10_assassin",
        "name": "Thích khách Phò Mã Phủ",
        "chapter": 10,
        "type": "defense",
        "difficulty": 3,
        "player_wall_hp": 200,
        "enemy_units": [
            {"id": "eu_assassin_1", "name": "Sát thủ 1", "hp": 100, "atk": 20, "lane": "left", "intent_pattern": ["attack", "attack"]},
            {"id": "eu_assassin_2", "name": "Sát thủ 2", "hp": 100, "atk": 20, "lane": "center", "intent_pattern": ["attack", "attack"]},
            {"id": "eu_assassin_3", "name": "Sát thủ 3", "hp": 120, "atk": 25, "lane": "right", "intent_pattern": ["buff", "attack"]}
        ],
        "victory_conditions": ["Tiêu diệt tất cả địch"],
        "rewards": {"gold": 100},
        "unlocks": []
    },
    {
        "id": "battle_ch48_thanh_chau",
        "name": "Đại chiến Thanh Châu",
        "chapter": 48,
        "type": "defense",
        "difficulty": 8,
        "player_wall_hp": 500,
        "enemy_units": [
            {"id": "eu_dich_hoa", "name": "Boss Địch Hỏa", "hp": 1000, "atk": 80, "lane": "center", "intent_pattern": ["aoe", "attack", "buff"]},
            {"id": "eu_soldier_1", "name": "Lính 1", "hp": 200, "atk": 30, "lane": "left", "intent_pattern": ["attack"]},
            {"id": "eu_soldier_2", "name": "Lính 2", "hp": 200, "atk": 30, "lane": "right", "intent_pattern": ["attack"]},
            {"id": "eu_soldier_3", "name": "Lính 3", "hp": 200, "atk": 30, "lane": "left", "intent_pattern": ["attack"]},
            {"id": "eu_soldier_4", "name": "Lính 4", "hp": 200, "atk": 30, "lane": "right", "intent_pattern": ["attack"]}
        ],
        "victory_conditions": ["Phòng thủ 10 hiệp hoặc Tiêu diệt Boss Địch Hỏa"],
        "rewards": {"gold": 1000, "honor": 500},
        "unlocks": ["feature_thanh_chau"]
    },
    {
        "id": "battle_ch27_gia_hu",
        "name": "Phục kích Giả Hủ",
        "chapter": 27,
        "type": "field",
        "difficulty": 5,
        "enemy_units": [
            {"id": "eu_ambush_1", "name": "Phục binh 1", "hp": 300, "atk": 40, "lane": "left", "intent_pattern": ["attack", "defend"]},
            {"id": "eu_ambush_2", "name": "Phục binh 2", "hp": 300, "atk": 40, "lane": "right", "intent_pattern": ["attack", "defend"]},
            {"id": "eu_ambush_3", "name": "Phục binh 3", "hp": 300, "atk": 40, "lane": "center", "intent_pattern": ["attack", "defend"]},
            {"id": "eu_ambush_4", "name": "Phục binh tinh nhuệ", "hp": 500, "atk": 50, "lane": "center", "intent_pattern": ["attack", "skill"]}
        ],
        "victory_conditions": ["Sống sót sau 5 hiệp"],
        "rewards": {"gold": 500},
        "unlocks": ["feature_bai_tuong_dai_gia_hu"]
    }
]

with open(os.path.join(base_dir, "battles.json"), "w", encoding="utf-8") as f:
    json.dump(battles, f, indent=4, ensure_ascii=False)

economy = {
    "currencies": [
        {"id": "gold", "name": "Vàng", "description": "Tiền tệ cơ bản."},
        {"id": "honor", "name": "Danh vọng", "description": "Dùng để chiêu mộ danh tướng."}
    ],
    "faucets": [
        {"chapter": 1, "source": "Lương tháng", "amount": 100, "currency_id": "gold"},
        {"chapter": 5, "source": "Thắng trận", "amount": 50, "currency_id": "honor"}
    ],
    "sinks": [
        {"sink_id": "summon_1", "cost": 100, "currency_id": "honor"}
    ],
    "balance": {
        "inflation_rate": 0.05,
        "max_storage": {"gold": 99999, "honor": 9999}
    }
}

with open(os.path.join(base_dir, "economy.json"), "w", encoding="utf-8") as f:
    json.dump(economy, f, indent=4, ensure_ascii=False)

gacha_banners = [
    {"id": "banner_1", "name": "Bái Tướng Đài Sơ Khai", "chapter": 5, "featured": ["hero_zhaoyun"]},
    {"id": "banner_2", "name": "Độc Sĩ Giáng Lâm", "chapter": 27, "featured": ["hero_jiaxu"]},
    {"id": "banner_3", "name": "Ngũ Hổ Tướng", "chapter": 100, "featured": ["hero_machao"]}
]

with open(os.path.join(base_dir, "gacha_banners.json"), "w", encoding="utf-8") as f:
    json.dump(gacha_banners, f, indent=4, ensure_ascii=False)

milestones = [
    {"chapter": 1, "title": "Xuyên Không", "scene_name": "Phò Mã Phủ", "unlocks": ["feature_basic_battle"], "rewards": {}, "narrative_summary": "Bắt đầu cuộc hành trình.", "prerequisites": []},
    {"chapter": 5, "title": "Bái Tướng Đài", "scene_name": "Bái Tướng Đài", "unlocks": ["feature_gacha"], "rewards": {}, "narrative_summary": "Chiêu mộ Triệu Vân.", "prerequisites": [1]},
    {"chapter": 10, "title": "Ám Sát", "scene_name": "Phò Mã Phủ", "unlocks": ["feature_defense"], "rewards": {}, "narrative_summary": "Chống lại sát thủ.", "prerequisites": [5]},
    {"chapter": 15, "title": "Điển Vi", "scene_name": "Doanh Trại", "unlocks": ["feature_barracks"], "rewards": {}, "narrative_summary": "Thu phục Điển Vi.", "prerequisites": [10]},
    {"chapter": 20, "title": "Cao Thuận", "scene_name": "Biên Cương", "unlocks": ["feature_border"], "rewards": {}, "narrative_summary": "Gặp gỡ Cao Thuận.", "prerequisites": [15]},
    {"chapter": 27, "title": "Độc Sĩ", "scene_name": "Mưu Khách Phủ", "unlocks": ["feature_strategy"], "rewards": {}, "narrative_summary": "Giả Hủ hiến kế.", "prerequisites": [20]},
    {"chapter": 35, "title": "Thủy Công", "scene_name": "Bờ Sông", "unlocks": ["feature_naval"], "rewards": {}, "narrative_summary": "Trận chiến trên sông.", "prerequisites": [27]},
    {"chapter": 48, "title": "Đại Chiến", "scene_name": "Thanh Châu", "unlocks": ["feature_thanh_chau"], "rewards": {}, "narrative_summary": "Chiến đấu sinh tử ở Thanh Châu.", "prerequisites": [35]},
    {"chapter": 53, "title": "Kỷ Nguyên Mới", "scene_name": "Kinh Đô", "unlocks": [], "rewards": {}, "narrative_summary": "Chương mới bắt đầu. (Tới 386)", "prerequisites": [48]}
]

with open(os.path.join(base_dir, "milestones.json"), "w", encoding="utf-8") as f:
    json.dump(milestones, f, indent=4, ensure_ascii=False)
