from pydantic import BaseModel, Field
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
