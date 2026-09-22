/**
 * GameStateStore.ts — Reactive Master State Container
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * 100% NGUYÊN TÁC TIỂU THUYẾT:
 * - Tam Quốc Anh Linh Hệ Thống (Thần Đàn Triệu Hoán)
 * - Nâng cấp danh tướng bằng Vàng (Kim):
 *   1. Mua vũ khí chuyên chúc (10.000 Vàng / 1 vạn kim)
 *   2. Mở khóa công pháp / vũ kỹ (1.000 Vàng / 1 thiên kim)
 *   3. Mở khóa đặc thù thiên phú (100.000 Vàng / 10 vạn kim)
 *   4. Thu phục bản mệnh lương câu / ngựa thần (50.000 Vàng / 5 vạn kim)
 *   5. Tu luyện võ lực trực tiếp tại Vũ Khố (5.000 Vàng / +1 điểm võ lực)
 * - Cảnh giới võ đạo tự động suy dẫn theo điểm võ lực:
 *   < 90: Vương Giả Cảnh | 90-99: Hoàng Giả Cảnh | 100-149: Đế Cấp Cường Giả | 150+: Bán Thánh
 * - Cơ chế Phản Chủ võ lực cho Quý Bình An khi anh linh đột phá cực hạn.
 */

import { MasterGameState, HeroProgressionData } from './types';
import { 
  CANON_HEROES, 
  CANON_HEROES_BY_ID, 
  resolveCanonHero, 
  getMartialRealm 
} from './canonHeroesData';

export const INITIAL_STATE: MasterGameState = {
  currentView: 'vn',
  currentChapterId: 1,

  // Quý Bình An khởi đầu thư sinh trói gà không chặt, võ lực = 5
  hostForce: 5,

  unlocked: {
    gacha: true,
    zhaoyun: true,
    soap: true,
    strategyMap: true,
    matac: true,
    huyet_y_doanh: true,
    gaoshun: true,
    giaHu: true,
    flood: true,
    khaiNguyen: true,
    battleFront: true
  },
  unlockedFeatures: ['gacha', 'zhaoyun', 'soap', 'strategyMap', 'matac', 'huyet_y_doanh', 'gaoshun', 'giaHu', 'flood', 'khaiNguyen', 'battleFront'],
  currentTextIndex: 0,
  dialogueHistory: [],
  isTyping: false,
  summonHistory: [],

  ticketCount: 10,
  jade: 5000,
  suspicion: 10,
  gold: 300000, // 30 vạn lượng vàng ngân khố ban đầu để trải nghiệm nâng cấp thần binh, thiên phú, ngựa
  food: 50000,
  ap: 3,
  maxAp: 3,

  pityCount: 18,
  hasWon5050: false,
  // Khởi đầu Quý Bình An chưa sở hữu danh tướng nào, đến Chương 5 mới thỉnh triệu Triệu Vân
  ownedHeroIds: [],
  heroProgression: {},
  lastSummonedHero: null,

  turn: 1,
  mana: 6,
  maxMana: 10,
  playerMorale: 100,
  enemyMorale: 100,
  wallHp: 500,
  maxWallHp: 500,
  reservoirStage: 1,

  bossHp: 250,
  maxBossHp: 250,
  bossIntent: {
    name: "Bạo Liệt Đao Pháp",
    damage: 90,
    interrupted: false,
    desc: "Ý Đồ: Chuẩn bị phát động Bạo Liệt Đao Pháp (Gây 90 HP Tường Thành)"
  },

  lanes: {
    left: {
      enemy: { id: 'left-archer', name: 'Hỏa Tiễn Doanh', hp: 100, atk: 35, alive: true },
      player: null
    },
    center: {
      enemy: { id: 'center-siege', name: 'Xe Đục Thành Nam Ly', hp: 150, atk: 80, alive: true, isSiege: true },
      player: { id: 'zhaoyun', name: 'Triệu Tử Long', hp: 180, atk: 102, alive: true }
    },
    right: {
      enemy: { id: 'right-cavalry', name: 'Kỵ Binh Khởi Đột', hp: 120, atk: 45, alive: true },
      player: null
    }
  },

  hand: [
    { id: 'hamtran', name: 'Hãm Trận Doanh', cost: 3, hp: 140, atk: 65, type: 'unit', desc: 'Trọng giáp tinh luyện. Giảm 50% sát thương từ cung tiễn.' },
    { id: 'bachma', name: 'Bạch Mã Nghĩa Tòng', cost: 4, hp: 110, atk: 80, type: 'unit', desc: 'Xung kích thần tốc. Tấn công trực tiếp bỏ qua phòng tuyến tiền tiêu.' },
    { id: 'flood', name: 'XẢ LŨ THANH THỦY', cost: 5, type: 'tactic', desc: 'Phá đê trút lũ! Quét sạch Xe Đục Thành và gây 130 Sát thương AoE toàn quân!', reqStage: 2 },
    { id: 'seventh-spear', name: 'Thất Thám Bàn Xà', cost: 2, type: 'skill', desc: 'Triệu Vân đâm liên tiếp 7 thương chí mạng, ngắt ý đồ kẻ địch.' }
  ]
};

export type StateListener = (newState: MasterGameState, oldState: MasterGameState) => void;

export class GameStateStore {
  private state: MasterGameState;
  private listeners: Set<StateListener> = new Set();
  private history: MasterGameState[] = [];

  constructor(initialState: MasterGameState = INITIAL_STATE) {
    this.state = structuredClone(initialState);
    // Khởi tạo tiến trình mặc định cho tất cả 29 tướng
    for (const h of CANON_HEROES) {
      if (!this.state.heroProgression[h.id]) {
        this.initHeroProgression(h.id);
      }
    }
  }

  public getState(): Readonly<MasterGameState> {
    return this.state;
  }

  public setState(updater: Partial<MasterGameState> | ((prev: MasterGameState) => Partial<MasterGameState>)): void {
    const oldState = structuredClone(this.state);
    const changes = typeof updater === 'function' ? updater(this.state) : updater;

    this.history.push(oldState);
    if (this.history.length > 50) this.history.shift();

    this.state = {
      ...this.state,
      ...changes,
      unlocked: {
        ...this.state.unlocked,
        ...(changes.unlocked || {})
      }
    };

    this.notify(this.state, oldState);
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // --- QUẢN LÝ TIẾN TRÌNH VÕ HỌC THEO NGUYÊN TÁC ---
  private initHeroProgression(heroId: string): HeroProgressionData {
    const canon = resolveCanonHero(heroId) || CANON_HEROES_BY_ID[heroId];
    const baseForce = canon ? canon.baseStats.force : 80;
    const initialProg: HeroProgressionData = {
      baseForce,
      currentForce: baseForce,
      martialRealm: getMartialRealm(baseForce),
      loyalty: canon ? canon.loyalty : 100,
      hasWeapon: false,
      weaponName: canon?.weapon.name,
      weaponForceBonus: 0,
      unlockedSkillNames: [],
      skillForceBonus: 0,
      hasSpecialTalent: false,
      specialTalentName: canon?.specialTalent.name,
      talentForceBonus: 0,
      hasMount: false,
      mountName: canon?.mount.name,
      mountForceBonus: 0,
      directForceUpgrades: 0,
      hostForceGiven: 0
    };
    this.state.heroProgression[heroId] = initialProg;
    return initialProg;
  }

  public getHeroProgression(heroId: string): HeroProgressionData {
    const canon = resolveCanonHero(heroId);
    const resolvedId = canon ? canon.id : heroId;

    if (!this.state.heroProgression[resolvedId]) {
      this.initHeroProgression(resolvedId);
    }
    return this.state.heroProgression[resolvedId];
  }

  private recalculateProgression(prog: HeroProgressionData): void {
    prog.currentForce = 
      prog.baseForce + 
      prog.weaponForceBonus + 
      prog.skillForceBonus + 
      prog.talentForceBonus + 
      prog.mountForceBonus + 
      prog.directForceUpgrades;

    prog.martialRealm = getMartialRealm(prog.currentForce);
  }

  /**
   * 1. MUA & KHẮC TRIỆN THẦN BINH CHUYÊN CHÚC (10.000 Vàng / 1 vạn kim)
   */
  public unlockHeroWeapon(heroId: string): { success: boolean; message: string } {
    const canon = resolveCanonHero(heroId);
    if (!canon) return { success: false, message: "Không tìm thấy hồ sơ danh tướng!" };

    const prog = this.getHeroProgression(canon.id);
    if (prog.hasWeapon) {
      return { success: false, message: `Thần binh [${prog.weaponName || canon.weapon.name}] đã được khai mở!` };
    }

    const costGold = canon.weapon.costGold || 10000;
    if (this.state.gold < costGold) {
      return { 
        success: false, 
        message: `Ngân khố không đủ! Cần ${costGold.toLocaleString()} Lượng Vàng để mua Thần Binh chuyên chúc [${canon.weapon.name}].` 
      };
    }

    const forceGain = canon.weapon.forceBonus || 7;
    const hostFeedback = 2; // Phản chủ võ lực cho Quý Bình An

    this.setState((prev) => {
      const nextProg = { ...this.getHeroProgression(canon.id) };
      nextProg.hasWeapon = true;
      nextProg.weaponName = canon.weapon.name;
      nextProg.weaponForceBonus = forceGain;
      nextProg.hostForceGiven += hostFeedback;
      this.recalculateProgression(nextProg);

      return {
        gold: prev.gold - costGold,
        hostForce: prev.hostForce + hostFeedback,
        heroProgression: {
          ...prev.heroProgression,
          [canon.id]: nextProg
        }
      };
    });

    return { 
      success: true, 
      message: `KHẮC TRIỆN THẦN BINH THÀNH CÔNG! [${canon.weapon.name}] xuất thế! Võ lực +${forceGain}! Phản chủ Quý Bình An +${hostFeedback} Võ Lực!` 
    };
  }

  /**
   * 2. GIẢI KHÓA CÔNG PHÁP / VŨ KỸ HỆ THỐNG (1.000 Vàng / 1 thiên kim mỗi chiêu)
   */
  public unlockHeroSkill(heroId: string, skillName: string): { success: boolean; message: string } {
    const canon = resolveCanonHero(heroId);
    if (!canon) return { success: false, message: "Không tìm thấy hồ sơ danh tướng!" };

    const skill = canon.skills.find((s) => s.name === skillName);
    if (!skill) return { success: false, message: `Chiêu thức [${skillName}] không nằm trong công pháp bản mệnh của ${canon.name}!` };

    const prog = this.getHeroProgression(canon.id);
    if (prog.unlockedSkillNames.includes(skillName)) {
      return { success: false, message: `Công pháp [${skillName}] đã được lãnh ngộ hoàn tất!` };
    }

    const costGold = skill.costGold || 1000;
    if (this.state.gold < costGold) {
      return { 
        success: false, 
        message: `Ngân khố không đủ! Cần ${costGold.toLocaleString()} Lượng Vàng để giải khóa công pháp [${skillName}].` 
      };
    }

    const forceGain = skill.forceBonus || 2;

    this.setState((prev) => {
      const nextProg = { ...this.getHeroProgression(canon.id) };
      nextProg.unlockedSkillNames = [...nextProg.unlockedSkillNames, skillName];
      nextProg.skillForceBonus += forceGain;
      this.recalculateProgression(nextProg);

      return {
        gold: prev.gold - costGold,
        heroProgression: {
          ...prev.heroProgression,
          [canon.id]: nextProg
        }
      };
    });

    return { 
      success: true, 
      message: `LÃNH NGỘ CÔNG PHÁP! ${canon.name} ngộ nhập [${skillName}], Võ lực tăng +${forceGain} điểm!` 
    };
  }

  /**
   * 3. MỞ KHÓA ĐẶC THÙ THIÊN PHÚ (100.000 Vàng / 10 vạn kim)
   */
  public unlockHeroTalent(heroId: string): { success: boolean; message: string } {
    const canon = resolveCanonHero(heroId);
    if (!canon) return { success: false, message: "Không tìm thấy hồ sơ danh tướng!" };

    const prog = this.getHeroProgression(canon.id);
    if (prog.hasSpecialTalent) {
      return { success: false, message: `Đặc thù thiên phú [${prog.specialTalentName || canon.specialTalent.name}] đã thức tỉnh!` };
    }

    const costGold = canon.specialTalent.costGold || 100000;
    if (this.state.gold < costGold) {
      return { 
        success: false, 
        message: `Ngân khố không đủ! Cần ${costGold.toLocaleString()} Lượng Vàng (10 vạn kim) để thức tỉnh Đặc Thù Thiên Phú [${canon.specialTalent.name}].` 
      };
    }

    const forceGain = canon.specialTalent.forceBonus || 12;
    const hostFeedback = 5; // Phản chủ cực mạnh khi thức tỉnh thiên phú

    this.setState((prev) => {
      const nextProg = { ...this.getHeroProgression(canon.id) };
      nextProg.hasSpecialTalent = true;
      nextProg.specialTalentName = canon.specialTalent.name;
      nextProg.talentForceBonus = forceGain;
      nextProg.hostForceGiven += hostFeedback;
      this.recalculateProgression(nextProg);

      return {
        gold: prev.gold - costGold,
        hostForce: prev.hostForce + hostFeedback,
        heroProgression: {
          ...prev.heroProgression,
          [canon.id]: nextProg
        }
      };
    });

    return { 
      success: true, 
      message: `THIÊN CƠ CHẤN ĐỘNG! Thức tỉnh Thiên Phú [${canon.specialTalent.name}]! Võ lực tăng vọt +${forceGain} điểm! Quý Bình An nhận phản chủ +${hostFeedback} Võ Lực!` 
    };
  }

  /**
   * 4. MUA BẢN MỆNH LƯƠNG CÂU / NGỰA THẦN (50.000 Vàng / 5 vạn kim)
   */
  public unlockHeroMount(heroId: string): { success: boolean; message: string } {
    const canon = resolveCanonHero(heroId);
    if (!canon) return { success: false, message: "Không tìm thấy hồ sơ danh tướng!" };

    const prog = this.getHeroProgression(canon.id);
    if (prog.hasMount) {
      return { success: false, message: `Bản mệnh lương câu [${prog.mountName || canon.mount.name}] đã được thu phục!` };
    }

    const costGold = canon.mount.costGold || 50000;
    if (this.state.gold < costGold) {
      return { 
        success: false, 
        message: `Ngân khố không đủ! Cần ${costGold.toLocaleString()} Lượng Vàng (5 vạn kim) để thu phục Thần Mã [${canon.mount.name}].` 
      };
    }

    const forceGain = canon.mount.forceBonus || 8;
    const hostFeedback = 3;

    this.setState((prev) => {
      const nextProg = { ...this.getHeroProgression(canon.id) };
      nextProg.hasMount = true;
      nextProg.mountName = canon.mount.name;
      nextProg.mountForceBonus = forceGain;
      nextProg.hostForceGiven += hostFeedback;
      this.recalculateProgression(nextProg);

      return {
        gold: prev.gold - costGold,
        hostForce: prev.hostForce + hostFeedback,
        heroProgression: {
          ...prev.heroProgression,
          [canon.id]: nextProg
        }
      };
    });

    return { 
      success: true, 
      message: `THU PHỤC BẢO MÃ! ${canon.name} cưỡi trên [${canon.mount.name}], Võ lực phi thăng +${forceGain} điểm! Quý Bình An phản chủ +${hostFeedback} Võ Lực!` 
    };
  }

  /**
   * 5. VŨ KHỐ THƯƠNG THÀNH: BỒI DƯỠNG TRỰC TIẾP TĂNG VÕ LỰC (5.000 Vàng / +1 điểm)
   */
  public trainHeroMartialForce(heroId: string): { success: boolean; message: string } {
    const canon = resolveCanonHero(heroId);
    if (!canon) return { success: false, message: "Không tìm thấy hồ sơ danh tướng!" };

    const costGold = 5000;
    if (this.state.gold < costGold) {
      return { 
        success: false, 
        message: `Ngân khố không đủ! Cần ${costGold.toLocaleString()} Lượng Vàng tại Vũ Khố để tôi luyện võ đạo.` 
      };
    }

    let hostGain = 0;

    this.setState((prev) => {
      const nextProg = { ...this.getHeroProgression(canon.id) };
      nextProg.directForceUpgrades += 1;
      
      // Cứ mỗi 3 lần tôi luyện võ tướng -> Quý Bình An hấp thu chân khí +1 võ lực
      if (nextProg.directForceUpgrades % 3 === 0) {
        hostGain = 1;
        nextProg.hostForceGiven += 1;
      }
      this.recalculateProgression(nextProg);

      return {
        gold: prev.gold - costGold,
        hostForce: prev.hostForce + hostGain,
        heroProgression: {
          ...prev.heroProgression,
          [canon.id]: nextProg
        }
      };
    });

    const currentForce = this.getHeroProgression(canon.id).currentForce;
    const currentRealm = this.getHeroProgression(canon.id).martialRealm;

    return { 
      success: true, 
      message: `TÔI LUYỆN VŨ KHỐ THÀNH CÔNG! ${canon.name} Võ lực đạt ${currentForce} [${currentRealm}]!${hostGain > 0 ? ` Quý Bình An hấp thu chân khí +1 Võ Lực!` : ''}` 
    };
  }

  private notify(newState: MasterGameState, oldState: MasterGameState): void {
    for (const listener of this.listeners) {
      try {
        listener(newState, oldState);
      } catch (err) {
        console.error('[GameStateStore] Error in listener callback:', err);
      }
    }
  }
}
