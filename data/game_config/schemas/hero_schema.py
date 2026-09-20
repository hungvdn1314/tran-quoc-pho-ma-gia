from pydantic import BaseModel, Field
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
