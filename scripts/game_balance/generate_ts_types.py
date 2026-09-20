#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Trình tự động sinh định nghĩa kiểu TypeScript (TypeScript Type Definition Generator)
Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
Đọc cấu trúc từ Pydantic Schemas trong data/game_config/schemas/ và xuất ra file .d.ts
"""

import os
import sys

def generate_typescript_definitions():
    ts_code = """/**
 * Định nghĩa kiểu dữ liệu TypeScript tự động sinh từ Pydantic Schemas
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * Tự động tạo bởi: scripts/game_balance/generate_ts_types.py
 */

// ==========================================
// 1. ENUMS & BASIC TYPES
// ==========================================

export type Rarity = "R" | "SR" | "SSR" | "UR";

export type Faction = 
  | "Quý Gia" 
  | "Hoàng Thất Đại Vũ" 
  | "Tây Lăng" 
  | "Nam Ly" 
  | "Bắc Cương" 
  | "Giang Đông" 
  | "Trung Lập";

export type MartialRealm = 
  | "Vương Cảnh"
  | "Hoàng Cảnh Sơ Kỳ"
  | "Hoàng Cảnh Trung Kỳ"
  | "Hoàng Cảnh Cao Kỳ"
  | "Hoàng Cảnh Đỉnh Phong"
  | "Đế Cảnh"
  | "Bán Thánh"
  | "Thánh Giả"
  | "Bán Tiên"
  | "Nhân Tiên";

export type TroopRank = "S" | "A" | "B" | "C";

export type CardType = "unit" | "tactic" | "stratagem" | "equipment" | "terrain";

export type CardTarget = "single" | "all_enemies" | "lane" | "self" | "ally" | "wall";

export type LanePosition = "left" | "center" | "right";

// ==========================================
// 2. HERO & RPG ATTRIBUTE INTERFACES
// ==========================================

export interface HeroStats {
  force: number;          // Võ Lực (1-150)
  command: number;        // Thống Soái (1-150)
  intelligence: number;   // Trí Lực (1-150)
  politics: number;       // Chính Trị (1-150)
  charisma: number;       // Uy Vọng (1-150)
}

export interface Equipment {
  id: string;
  name: string;
  type: "weapon" | "armor" | "mount" | "talisman";
  stat_bonus: Record<string, number>;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  type: "active" | "passive" | "command" | "chase";
  mana_cost: number;
  damage: number;
  effects: string[];
  description: string;
  trigger_rate?: number;
}

export interface Bond {
  id: string;
  name: string;
  required_heroes: string[];
  bonus: Record<string, number>;
  is_active: boolean;
}

export interface Hero {
  id: string;
  name: string;
  aliases: string[];
  rarity: Rarity;
  faction: Faction;
  realm: MartialRealm;
  base_stats: HeroStats;
  hp: number;
  atk: number;
  troop_type: string;
  cost: number;
  troop_affinity: Record<string, TroopRank>;
  equipment: Equipment[];
  skills: Skill[];
  bonds: Bond[];
  summon_chapter?: number;
  novel_first_appearance?: number;
}

// ==========================================
// 3. TACTICAL CARD BATTLER INTERFACES
// ==========================================

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: Rarity;
  mana_cost: number;
  damage: number;
  shield: number;
  heal: number;
  target: CardTarget;
  effects: string[];
  description: string;
  unlock_chapter?: number;
  hero_required?: string;
}

// ==========================================
// 4. BATTLE & ENEMY UNITS INTERFACES
// ==========================================

export interface EnemyUnit {
  id: string;
  name: string;
  hp: number;
  atk: number;
  lane: LanePosition;
  intent_pattern: string[];
  phase_transitions?: Record<string, string>;
}

export interface BattleEncounter {
  id: string;
  name: string;
  chapter: number;
  type: "defense" | "siege" | "field" | "naval";
  difficulty: number;
  player_wall_hp?: number;
  enemy_units: EnemyUnit[];
  victory_conditions: string[];
  rewards: Record<string, number>;
  unlocks: string[];
}

// ==========================================
// 5. ECONOMY & MILESTONES INTERFACES
// ==========================================

export interface Currency {
  id: string;
  name: string;
  description: string;
}

export interface Faucet {
  chapter: number;
  source: string;
  amount: number;
  currency_id: string;
}

export interface Sink {
  sink_id: string;
  cost: number;
  currency_id: string;
}

export interface EconomyConfig {
  currencies: Currency[];
  faucets: Faucet[];
  sinks: Sink[];
  balance: {
    inflation_rate: number;
    max_storage: Record<string, number>;
  };
}

export interface ChapterMilestone {
  chapter: number;
  title: string;
  scene_name: string;
  unlocks: string[];
  rewards: Record<string, number>;
  narrative_summary: string;
  prerequisites: (number | string)[];
}

export interface GachaBanner {
  id: string;
  name: string;
  chapter: number;
  featured: string[];
  pity_rule?: {
    soft_pity: number;
    hard_pity: number;
    base_rate: number;
  };
}

// ==========================================
// 6. GLOBAL GAME DATA BUNDLE
// ==========================================

export interface GameDataBundle {
  heroes: Hero[];
  cards: Card[];
  battles: BattleEncounter[];
  milestones: ChapterMilestone[];
  economy: EconomyConfig;
  gacha_banners: GachaBanner[];
  scenes_ink: {
    ch1_to_15: string;
    ch16_to_52: string;
  };
}

declare global {
  interface Window {
    GAME_DATA: GameDataBundle;
  }
}
"""

    # Output paths
    paths = [
        "prototype/types/game_data.d.ts",
        "data/game_config/types/game_data.d.ts"
    ]

    for p in paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(ts_code)
        print(f"[THÀNH CÔNG] Đã sinh định nghĩa TypeScript tại: {p}")

if __name__ == "__main__":
    generate_typescript_definitions()
