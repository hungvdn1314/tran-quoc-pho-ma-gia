from pydantic import BaseModel
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
