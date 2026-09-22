/**
 * types.ts — Master TypeScript Definitions
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 */

export type GameView = 'vn' | 'map' | 'battle';

export type Rarity = 'R' | 'SR' | 'SSR' | 'UR';

export type PrimaryHeroClass = 
  | 'Võ Tướng' 
  | 'Mưu Thần' 
  | 'Văn Thần' 
  | 'Năng Thần' 
  | 'Tuyệt Thế Nữ Thần' 
  | 'Kỳ Nhân Dị Sĩ' 
  | 'Hồng Nhan';

export type HeroRole = 
  | 'Tiên Phong' 
  | 'Thống Soái' 
  | 'Thiết Vệ' 
  | 'Hãm Trận' 
  | 'Thần Xạ' 
  | 'Độc Sĩ' 
  | 'Độc Kế' 
  | 'Quân Sư' 
  | 'Vương Tá' 
  | 'Nội Chính' 
  | 'Thần Y' 
  | 'Mật Thám' 
  | 'Hộ Vệ' 
  | 'Thủy Quân' 
  | 'Tuyệt Thế Mưu Sĩ' 
  | 'Thiên Mệnh' 
  | 'Thiên Mệnh Quỷ Tài' 
  | 'Thiên Mệnh Võ Thánh' 
  | 'Thiên Mệnh Thần Cơ' 
  | 'Thiên Mệnh Chiến Thần' 
  | 'Thiên Mệnh Trủng Hổ';

export type MartialRealm =
  | 'Phàm Nhân'        // < 80 (Ch.106: 70 điểm đạt tiêu chuẩn võ tướng)
  | 'Vương Giả Cảnh'    // 80 - 89 (Ch.64, Ch.106)
  | 'Hoàng Giả Cảnh'    // 90 - 99 (Ch.64, Ch.106)
  | 'Đế Cảnh'          // 100 - 119 (Đế Đạo / Phong Đế - Ch.64, Ch.106, Ch.244)
  | 'Bán Thánh Cảnh'   // 120 - 129 (Ch.244)
  | 'Thánh Cảnh'       // 130 - 139 (Thánh Giả / Thánh Nhân - Ch.350, Ch.428, Ch.502)
  | 'Bán Tiên Cảnh'    // 140 - 159 (Ch.1209, Ch.1367, Ch.1505)
  | 'Nhân Tiên Cảnh';  // >= 160 (Cực Hạn Võ Đạo Tối Thượng - Ch.1332, Ch.1338, Ch.1367-1369)

export interface HeroProgressionData {
  baseForce: number;
  currentForce: number;
  martialRealm: MartialRealm | string;
  loyalty: number;
  hasWeapon: boolean;
  weaponName?: string;
  weaponForceBonus: number;
  unlockedSkillNames: string[];
  skillForceBonus: number;
  hasSpecialTalent: boolean;
  specialTalentName?: string;
  talentForceBonus: number;
  hasMount: boolean;
  mountName?: string;
  mountForceBonus: number;
  directForceUpgrades: number;
  hostForceGiven: number;
}

export interface HeroStats {
  force: number;
  command: number;
  intelligence: number;
  politics: number;
}

export interface Hero {
  id: string;
  name: string;
  courtesyName?: string;
  title: string;
  primaryClass: PrimaryHeroClass | string;
  role: HeroRole | string;
  classRoleBadge: string; // VD: "Võ Tướng • Tuyệt Thế Tiên Phong"
  rarity: Rarity | string;
  realm: string;
  troopType: string;
  quote: string;
  faction?: string;
  lore?: string;
  stats: HeroStats;
  weaponName?: string;
  weaponEquipped?: boolean;
  avatarUrl: string;
  splashUrl: string;
  skills: Array<{ id?: string; name: string; desc?: string; costGold?: number; forceBonus?: number }> | any[];
  bonds: Array<{ id?: string; name: string; desc?: string }> | any[];
  mountName?: string;
  specialTalentName?: string;
  summonTier?: string;
  chapterSummon?: number;
}

export interface Card {
  id: string;
  name: string;
  cost: number;
  hp?: number;
  atk?: number;
  type: 'unit' | 'tactic' | 'skill';
  desc: string;
  reqStage?: number;
}

export interface LaneUnit {
  id: string;
  name: string;
  hp: number;
  atk: number;
  alive: boolean;
  isSiege?: boolean;
}

export interface LaneState {
  enemy: LaneUnit | null;
  player: LaneUnit | null;
}

export interface MasterGameState {
  currentView: GameView;
  currentChapterId: number;
  currentTextIndex?: number;
  dialogueHistory?: Array<{ speaker: string; title?: string; text: string }>;
  isTyping?: boolean;
  selectedNode?: string;

  // Quý Bình An — Võ lực bản thân (phản hồi từ võ tướng anh linh)
  hostForce: number;

  unlocked: {
    gacha: boolean;
    zhaoyun: boolean;
    soap: boolean;
    strategyMap: boolean;
    matac?: boolean;
    huyet_y_doanh?: boolean;
    gaoshun: boolean;
    giaHu: boolean;
    flood: boolean;
    khaiNguyen: boolean;
    battleFront: boolean;
  };
  unlockedFeatures: string[];

  // Resources
  ticketCount: number;
  jade: number;
  suspicion: number;
  gold: number;
  food: number;
  ap: number;
  maxAp: number;

  // Gacha State & Progression
  pityCount: number;
  hasWon5050: boolean;
  ownedHeroIds: string[];
  heroProgression: Record<string, HeroProgressionData>;
  lastSummonedHero: Hero | null;
  summonHistory?: Array<{ hero: any; pity?: number; timestamp: string }>;

  // Combat State
  turn: number;
  mana: number;
  maxMana: number;
  playerMorale: number;
  enemyMorale: number;
  wallHp: number;
  maxWallHp: number;
  reservoirStage: number;

  bossHp: number;
  maxBossHp: number;
  bossIntent: {
    name: string;
    damage: number;
    interrupted: boolean;
    desc: string;
  };

  lanes: {
    left: LaneState;
    center: LaneState;
    right: LaneState;
  };

  hand: Card[];
}
