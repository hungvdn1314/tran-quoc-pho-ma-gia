/**
 * DataLoader.ts — Game Data Loader with Canon Hero Archetype Mapping
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * Single source of truth: nạp đầy đủ 29 danh tướng của toàn bộ 1.509 chương từ canonHeroesData
 */

import { Hero, Card } from './types';
import { 
  CANON_HEROES, 
  CANON_HEROES_BY_ID, 
  resolveCanonHero, 
  getMartialRealm 
} from './canonHeroesData';

export class DataLoader {
  public static getGameData(): any {
    return (window as any).GAME_DATA || {};
  }

  public static getHeroes(): Hero[] {
    return CANON_HEROES.map((h) => {
      // Phẩm cấp: UR cho các bậc Thiên Mệnh Chí Tôn, SSR cho phần còn lại
      const isUR = h.role.includes('Thiên Mệnh') || h.baseStats.force >= 92;
      const rarity = isUR ? 'UR' : 'SSR';

      const actorMap: Record<string, string> = {
        trieu_van: 'assets/images/actor_trieu_van.webp',
        cao_thuan: 'assets/images/actor_cao_thuan.webp',
        dien_vi: 'assets/images/actor_dien_vi.webp',
        co_hu: 'assets/images/actor_gia_hu.webp',
        ma_tac: 'assets/images/actor_ma_tac.webp',
        ly_nho: 'assets/images/actor_ly_nho.webp',
        dieu_thuyen: 'assets/images/actor_dieu_thuyen.webp',
        hoa_hung: 'assets/images/actor_hoa_hung.webp',
        khuc_nghia: 'assets/images/actor_khuc_nghia.webp',
        truong_lieu: 'assets/images/actor_truong_lieu.webp',
        tuan_uc: 'assets/images/actor_tuan_uc.webp',
        chu_du: 'assets/images/actor_chu_du.webp',
        hoang_trung: 'assets/images/actor_hoang_trung.webp',
        hi_chi_tai: 'assets/images/actor_hi_chi_tai.webp',
        ma_sieu: 'assets/images/actor_ma_sieu.webp',
        hoa_da: 'assets/images/actor_hoa_da.webp',
        quach_gia: 'assets/images/actor_quach_gia.webp'
      };
      const splashUrl = actorMap[h.id] || (h.splashUrl ? h.splashUrl : 'assets/images/seal_placeholder.webp');

      return {
        id: h.id,
        name: h.name,
        courtesyName: h.courtesyName,
        title: h.classRoleBadge,
        primaryClass: h.primaryClass,
        role: h.role,
        classRoleBadge: h.classRoleBadge,
        rarity,
        realm: getMartialRealm(h.baseStats.force),
        troopType: h.troopType,
        quote: h.quote,
        faction: 'Quý Gia / Đại Hán',
        lore: h.lore,
        weaponName: h.weapon.name,
        mountName: h.mount.name,
        specialTalentName: h.specialTalent.name,
        summonTier: h.summonTier,
        chapterSummon: h.chapterSummon,
        stats: {
          force: h.baseStats.force,
          command: h.baseStats.command,
          intelligence: h.baseStats.intelligence,
          politics: h.baseStats.politics
        },
        avatarUrl: `assets/images/actor_${h.id}.webp`,
        splashUrl,
        skills: h.skills.map((s) => ({
          id: s.name,
          name: s.name,
          desc: `Tăng +${s.forceBonus} điểm Võ Lực khi thi triển`,
          costGold: s.costGold,
          forceBonus: s.forceBonus
        })),
        bonds: []
      };
    });
  }

  public static getHeroById(id: string): Hero | undefined {
    const canon = resolveCanonHero(id);
    if (canon) {
      return this.getHeroes().find((h) => h.id === canon.id);
    }
    return this.getHeroes().find((h) => h.id === id);
  }

  public static getCards(): Card[] {
    const raw = this.getGameData().cards || [];
    return raw.map((c: any) => ({
      id: c.id,
      name: c.name,
      cost: c.cost || 3,
      hp: c.hp,
      atk: c.atk,
      type: c.type || 'unit',
      desc: c.description || '',
      reqStage: c.req_stage
    }));
  }

  public static getBattles(): any[] {
    return this.getGameData().battles || [];
  }

  public static getMilestones(): any[] {
    return this.getGameData().milestones || [];
  }
}
