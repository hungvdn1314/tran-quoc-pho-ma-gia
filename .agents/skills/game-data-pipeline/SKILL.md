---
name: game-data-pipeline
description: >-
  Skill quản lý pipeline dữ liệu cấu hình game (Game Config Data Pipeline).
  Sử dụng khi cần tạo/validate/transform bảng dữ liệu game: hero stat tables,
  card definitions, battle encounters, economy configs, feature unlock matrices.
  Hỗ trợ Pydantic schema validation, JSON/Excel config generation, và tự động
  sinh TypeScript type definitions cho Web client. Tham khảo Luban config engine.
---

# Game Data Pipeline Skill

Quy trình quản lý, chuẩn hóa, và sinh dữ liệu cấu hình (Configuration Data)
cho game hybrid VN + Strategy + Card Battler.

---

## Tổng Quan Pipeline

```
[Game Bible V2]  ──→  [Pydantic Schemas]  ──→  [Validated JSON Configs]
(raw extraction)       (type safety)            (production-ready)
       │                     │                         │
       │                     ▼                         ▼
       │              [Balance Checker]          [TypeScript Types]
       │              (economy_balancer)         (for Web client)
       ▼                     │
[Excel Sheets]               ▼
(designer-friendly)    [CI/CD Linter]
                       (automated QA)
```

---

## Pydantic Data Schemas

### Hero / Commander Schema
```python
from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional

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
    VUONG_CANH = "Vương Cảnh"       # < 90
    HOANG_CANH = "Hoàng Cảnh"       # 90-99
    DE_CANH = "Đế Cảnh"             # 100+
    BAN_THANH = "Bán Thánh"         # 120+
    THANH_GIA = "Thánh Giả"         # 130+
    BAN_TIEN = "Bán Tiên"           # 140+
    NHAN_TIEN = "Nhân Tiên"         # 150+

class HeroStats(BaseModel):
    force: int = Field(ge=1, le=150, description="Võ Lực")
    command: int = Field(ge=1, le=150, description="Thống Soái")
    intelligence: int = Field(ge=1, le=150, description="Trí Lực")
    politics: int = Field(ge=1, le=150, description="Chính Trị")
    charisma: int = Field(ge=1, le=150, description="Uy Vọng")

class Equipment(BaseModel):
    id: str
    name: str
    type: str  # "weapon" | "mount" | "armor"
    stat_bonus: dict[str, int]
    description: str

class Skill(BaseModel):
    id: str
    name: str
    type: str  # "active" | "passive" | "command" | "chase"
    mana_cost: int = 0
    damage: int = 0
    effects: list[str]
    description: str
    trigger_rate: Optional[float] = None  # For active skills

class Bond(BaseModel):
    id: str
    name: str
    required_heroes: list[str]
    bonus: dict[str, float]
    is_active: bool = False

class Hero(BaseModel):
    id: str
    name: str
    aliases: list[str] = []
    rarity: Rarity
    faction: Faction
    realm: MartialRealm
    base_stats: HeroStats
    hp: int
    atk: int
    troop_type: str
    cost: float = Field(ge=3.0, le=7.5, description="Formation cost")
    troop_affinity: dict[str, str]  # troop_type → S/A/B/C
    equipment: list[Equipment] = []
    skills: list[Skill] = []
    bonds: list[Bond] = []
    summon_chapter: Optional[int] = None
    summon_cost_gold: Optional[int] = None
    novel_first_appearance: Optional[int] = None
```

### Card Schema
```python
class CardType(str, Enum):
    UNIT = "unit"           # Deploy troop
    TACTIC = "tactic"       # One-shot effect
    STRATAGEM = "stratagem" # Multi-turn setup
    EQUIPMENT = "equipment" # Attach to unit
    TERRAIN = "terrain"     # Modify lane

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
    type: CardType
    rarity: Rarity
    mana_cost: int = Field(ge=0, le=10)
    damage: int = 0
    shield: int = 0
    heal: int = 0
    target: CardTarget = CardTarget.SINGLE
    effects: list[str] = []
    description: str
    unlock_chapter: Optional[int] = None
    hero_required: Optional[str] = None

    # Power budget validation
    @property
    def power_budget(self) -> float:
        return 0.5 * self.damage + 0.4 * self.shield + 0.3 * self.heal

    @property
    def budget_limit(self) -> float:
        return 50 * self.mana_cost

    @property
    def is_balanced(self) -> bool:
        return self.power_budget <= self.budget_limit * 1.2
```

### Battle Encounter Schema
```python
class EnemyUnit(BaseModel):
    id: str
    name: str
    hp: int
    atk: int
    lane: str  # "left" | "center" | "right"
    intent_pattern: list[str]  # Sequence of intents
    phase_transitions: Optional[dict[str, str]] = None  # HP% → new behavior

class BattleEncounter(BaseModel):
    id: str
    name: str
    chapter: int
    type: str  # "defense" | "siege" | "field" | "naval"
    difficulty: int = Field(ge=1, le=10)
    player_wall_hp: Optional[int] = None
    enemy_units: list[EnemyUnit]
    turn_limit: Optional[int] = None
    victory_conditions: list[str]
    rewards: dict[str, int]  # resource_id → amount
    unlocks: list[str] = []  # feature_ids unlocked on victory
```

### Chapter Unlock Schema
```python
class ChapterMilestone(BaseModel):
    chapter: int
    title: str
    scene_name: str
    unlocks: list[str]  # feature_ids
    rewards: dict[str, int]
    narrative_summary: str
    prerequisites: list[str] = []  # previous milestone IDs
```

---

## Validation Pipeline

### Automated Checks
```python
def validate_game_data(heroes, cards, battles, milestones):
    errors = []

    # 1. Check hero IDs referenced in cards exist
    hero_ids = {h.id for h in heroes}
    for card in cards:
        if card.hero_required and card.hero_required not in hero_ids:
            errors.append(f"Card {card.id} references missing hero {card.hero_required}")

    # 2. Check card power budgets
    for card in cards:
        if not card.is_balanced:
            errors.append(f"Card {card.id} exceeds power budget: {card.power_budget:.1f} > {card.budget_limit:.1f}")

    # 3. Check battle unlocks reference valid features
    valid_features = {"bai_tuong_dai", "thau_hoa_cao", "de_nghiep_sa_ban", ...}
    for battle in battles:
        for unlock in battle.unlocks:
            if unlock not in valid_features:
                errors.append(f"Battle {battle.id} unlocks unknown feature {unlock}")

    # 4. Check milestone prerequisite chain (no cycles)
    # Use topological sort to detect cycles
    ...

    # 5. Check chapter ordering consistency
    for m in milestones:
        for prereq in m.prerequisites:
            prereq_chapter = next((x.chapter for x in milestones if x.id == prereq), None)
            if prereq_chapter and prereq_chapter >= m.chapter:
                errors.append(f"Milestone ch{m.chapter} has prerequisite ch{prereq_chapter} (must be earlier)")

    return errors
```

### TypeScript Type Generation
```python
def generate_typescript_types(schema_classes):
    """
    Auto-generate TypeScript interfaces from Pydantic models
    for the Web client (Phaser 3 / PixiJS).
    """
    for cls in schema_classes:
        ts_interface = f"export interface {cls.__name__} {{\n"
        for field_name, field_info in cls.model_fields.items():
            ts_type = python_type_to_ts(field_info.annotation)
            ts_interface += f"  {field_name}: {ts_type};\n"
        ts_interface += "}\n"
        yield ts_interface
```

---

## Output Directory Structure
```
data/
├── game_bible_v2/           # Raw extracted data (existing)
├── game_config/             # Production-ready configs (NEW)
│   ├── heroes.json          # Validated hero stat tables
│   ├── cards.json           # Card definitions with power budgets
│   ├── battles.json         # Battle encounter configs
│   ├── economy.json         # Currency faucet/sink parameters
│   ├── gacha_banners.json   # Gacha rate configs
│   ├── milestones.json      # Chapter unlock matrix
│   └── schemas/             # Pydantic schema source files
│       ├── hero_schema.py
│       ├── card_schema.py
│       ├── battle_schema.py
│       └── economy_schema.py
└── chapter_feature_unlock_matrix.json  # (existing, to be replaced by milestones.json)
```

---

## Quy Trình Sử Dụng

### 1. Tạo Config Mới
```bash
# Sinh hero config từ game bible
python scripts/generate_hero_configs.py \
  --input data/game_bible_v2/characters.json \
  --output data/game_config/heroes.json \
  --validate

# Sinh card config
python scripts/generate_card_configs.py \
  --input data/game_bible_v2/battles.json \
  --output data/game_config/cards.json \
  --check-balance
```

### 2. Validate Toàn Bộ
```bash
python scripts/validate_game_data.py \
  --heroes data/game_config/heroes.json \
  --cards data/game_config/cards.json \
  --battles data/game_config/battles.json \
  --milestones data/game_config/milestones.json
```

### 3. Sinh TypeScript Types
```bash
python scripts/generate_ts_types.py \
  --schemas data/game_config/schemas/ \
  --output prototype/src/types/game-data.d.ts
```
