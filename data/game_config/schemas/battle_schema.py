from pydantic import BaseModel, Field
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
