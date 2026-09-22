#!/usr/bin/env python3
"""
Combat Headless Simulator — Trấn Quốc Phò Mã Gia
Giả lập hàng nghìn trận đấu thẻ bài sa trường không cần giao diện đồ họa (Headless Simulation).

Mục tiêu:
1. Đo lường tỷ lệ thắng (Win-rate) của các bộ bài người chơi so với các ải quái.
2. Kiểm tra tính ổn định của công thức Giáp & Diminishing Returns:
   Damage = RawAtk * (100 / (100 + Armor))
3. Đo lường số lượt trung bình kết thúc trận đấu (Average Turns to Finish).
4. Phát hiện nguy cơ Sụp Tường Thành (Wall HP = 0) quá sớm.
"""

import sys
import random
from dataclasses import dataclass
from typing import List, Optional

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


@dataclass
class Unit:
    id: str
    name: str
    hp: int
    max_hp: int
    atk: int
    armor: int = 0
    is_alive: bool = True

    def take_damage(self, raw_damage: int) -> int:
        mitigation = 100 / (100 + max(0, self.armor))
        real_dmg = max(1, int(raw_damage * mitigation))
        self.hp = max(0, self.hp - real_dmg)
        if self.hp == 0:
            self.is_alive = False
        return real_dmg


@dataclass
class Card:
    id: str
    name: str
    cost: int
    hp: int
    atk: int
    armor: int = 0
    card_type: str = "unit"  # "unit" | "tactic" | "skill"


class CombatMatch:
    def __init__(self, deck: List[Card], boss_name: str, boss_hp: int, boss_atk: int):
        self.deck = deck
        self.wall_hp = 500
        self.mana = 3
        self.max_mana = 10
        self.turn = 1
        self.player_units: List[Unit] = []
        self.boss = Unit(id="boss", name=boss_name, hp=boss_hp, max_hp=boss_hp, atk=boss_atk, armor=20)
        self.is_victory = False
        self.is_defeat = False

    def play_turn(self):
        # 1. Start of Turn: Hồi phục và tăng Mana
        self.mana = min(self.max_mana, 2 + self.turn)

        # 2. Player Action Phase (AI giả lập người chơi: ra bài tối ưu mana)
        available_cards = [c for c in self.deck if c.cost <= self.mana]
        while available_cards and self.mana > 0:
            card = random.choice(available_cards)
            self.mana -= card.cost
            self.player_units.append(Unit(
                id=f"p_{card.id}_{len(self.player_units)}",
                name=card.name,
                hp=card.hp,
                max_hp=card.hp,
                atk=card.atk,
                armor=card.armor
            ))
            available_cards = [c for c in self.deck if c.cost <= self.mana]

        # 3. Combat Phase: Quân người chơi tấn công Boss
        for u in self.player_units:
            if u.is_alive:
                self.boss.take_damage(u.atk)
                if not self.boss.is_alive:
                    self.is_victory = True
                    return

        # 4. Enemy Boss Phase: Boss phản công
        # 60% đánh vào quân sĩ người chơi, 40% đánh trực diện vào Tường Thành
        if random.random() < 0.6 and any(u.is_alive for u in self.player_units):
            alive_units = [u for u in self.player_units if u.is_alive]
            target = random.choice(alive_units)
            target.take_damage(self.boss.atk)
        else:
            # Tấn công Tường Thành
            self.wall_hp = max(0, self.wall_hp - self.boss.atk)
            if self.wall_hp == 0:
                self.is_defeat = True
                return

        self.turn += 1
        if self.turn > 30:  # Timeout limit
            self.is_defeat = True

    def run(self) -> dict:
        while not self.is_victory and not self.is_defeat:
            self.play_turn()
        return {
            "victory": self.is_victory,
            "turns": self.turn,
            "remaining_wall_hp": self.wall_hp,
            "remaining_boss_hp": self.boss.hp
        }


def run_monte_carlo_combat(iterations: int = 1000):
    sample_deck = [
        Card(id="hamtran", name="Hãm Trận Doanh", cost=3, hp=140, atk=65, armor=30),
        Card(id="bachma", name="Bạch Mã Nghĩa Tòng", cost=4, hp=110, atk=80, armor=15),
        Card(id="kiem_binh", name="Cấm Quân Kiếm Sĩ", cost=2, hp=80, atk=45, armor=10),
        Card(id="cung_thu", name="Thần Cơ Cung Thủ", cost=3, hp=60, atk=90, armor=5),
        Card(id="trieu_van", name="Triệu Tử Long", cost=5, hp=180, atk=110, armor=40)
    ]

    print("=" * 70)
    print(f"⚔️ BẮT ĐẦU GIẢ LẬP CHIẾN ĐẤU MONTE CARLO ({iterations} TRẬN ĐẤU)")
    print("=" * 70)

    wins = 0
    total_turns = 0
    wall_breaks = 0
    min_wall_hp = 500

    for _ in range(iterations):
        match = CombatMatch(
            deck=sample_deck,
            boss_name="Địch Hỏa Nam Ly Tướng",
            boss_hp=250,
            boss_atk=85
        )
        result = match.run()
        if result["victory"]:
            wins += 1
        total_turns += result["turns"]
        if result["remaining_wall_hp"] == 0:
            wall_breaks += 1
        min_wall_hp = min(min_wall_hp, result["remaining_wall_hp"])

    win_rate = (wins / iterations) * 100
    avg_turns = total_turns / iterations

    print(f"• Tỷ lệ thắng (Win Rate): {win_rate:.2f}% (Chuẩn mục tiêu: 65% - 85%)")
    print(f"• Số hiệp trung bình (Avg Turns): {avg_turns:.1f} lượt")
    print(f"• Số trận sập Tường Thành: {wall_breaks}/{iterations} ({(wall_breaks/iterations)*100:.1f}%)")
    print(f"• Máu tường thành thấp nhất ghi nhận: {min_wall_hp}/500 HP")
    print("-" * 70)

    if 60.0 <= win_rate <= 90.0:
        print("✅ KẾT QUẢ CÂN BẰNG ĐẠT CHUẨN ACCEPTANCE CRITERIA!")
    else:
        print("⚠️ CẢNH BÁO: Tỷ lệ thắng lệch khỏi ngưỡng tiêu chuẩn! Cần điều chỉnh Atk/HP hoặc Mana cost.")
    print("=" * 70)


if __name__ == "__main__":
    run_monte_carlo_combat(2000)
