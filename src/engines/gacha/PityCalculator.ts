/**
 * PityCalculator.ts — Gacha Probability & Pity Algorithm
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * TRIẾT LÝ GACHA TÔN TRỌNG GAME THỦ:
 * - Base SSR Rate: 1.6% (Bao gồm danh tướng Tam Quốc SSR: Triệu Vân, Giả Hủ, Cao Thuận, Điển Vi...)
 * - Soft Pity: Bắt đầu từ lượt 74 (Tỷ lệ tăng dần tuyến tính lên 20% -> 50% -> 100% tại lượt 90)
 * - Hard Pity: 90 lượt chắc chắn 100% ra SSR
 * - Bảo Hiểm 50/50: Nếu lần đầu lệch banner, lần SSR tiếp theo 100% là tướng Rate-up
 * - SR Pity: Mỗi 10 lượt chắc chắn có ít nhất 1 SR (8.2% base)
 */

export interface GachaPullResult {
  rarity: 'R' | 'SR' | 'SSR';
  heroId: string;
  isRateUp: boolean;
  isNew: boolean;
  pullNumber: number;
}

export interface PityState {
  totalPulls: number;
  pityToSSR: number;       // Số lượt từ lần cuối trúng SSR
  pityToSR: number;        // Số lượt từ lần cuối trúng SR
  isGuaranteedNextSSR: boolean; // Trạng thái bảo hiểm 50/50
}

export class PityCalculator {
  private static readonly BASE_SSR_RATE = 0.016; // 1.6%
  private static readonly BASE_SR_RATE = 0.082;  // 8.2%
  private static readonly SOFT_PITY_START = 74;
  private static readonly HARD_PITY = 90;
  private static readonly SR_PITY = 10;

  /**
   * Tính toán xác suất trúng SSR dựa trên bước Pity hiện tại
   */
  public static calculateSSRRate(pityCount: number): number {
    if (pityCount >= this.HARD_PITY) {
      return 1.0; // 100% chắc chắn ra
    }
    if (pityCount < this.SOFT_PITY_START) {
      return this.BASE_SSR_RATE;
    }
    // Tăng tốc lũy tiến từ lượt 74 đến 90
    const extraSteps = pityCount - this.SOFT_PITY_START + 1;
    return Math.min(1.0, this.BASE_SSR_RATE + extraSteps * 0.06);
  }

  /**
   * Thực hiện 1 lượt quay đơn
   */
  public static rollSingle(
    pity: PityState,
    rateUpHeroId: string = 'trieu_van',
    ssrHeroPool: string[] = ['trieu_van', 'zhangliao', 'gaoshun', 'dianwei', 'jiaxu', 'diaochan'],
    srHeroPool: string[] = ['to_kien_phong', 've_ti_vu', 'ma_tac'],
    rHeroPool: string[] = ['ky_binh_thiet_giap', 'cung_thu_thanh_chau', 'bo_binh_truong_thuong']
  ): { result: GachaPullResult; nextPity: PityState } {
    const currentPitySSR = pity.pityToSSR + 1;
    const currentPitySR = pity.pityToSR + 1;

    const ssrRate = this.calculateSSRRate(currentPitySSR);
    const rng = Math.random();

    let rarity: 'R' | 'SR' | 'SSR' = 'R';
    let heroId = '';
    let isRateUp = false;
    let nextGuaranteedSSR = pity.isGuaranteedNextSSR;

    // 1. Kiểm tra SSR
    if (rng < ssrRate) {
      rarity = 'SSR';
      if (pity.isGuaranteedNextSSR || Math.random() < 0.5) {
        // Trúng tướng Rate-up
        heroId = rateUpHeroId;
        isRateUp = true;
        nextGuaranteedSSR = false;
      } else {
        // Lệch rate -> Kích hoạt bảo hiểm lần sau
        const offBanner = ssrHeroPool.filter((id) => id !== rateUpHeroId);
        heroId = offBanner[Math.floor(Math.random() * offBanner.length)] || rateUpHeroId;
        isRateUp = false;
        nextGuaranteedSSR = true;
      }
    } 
    // 2. Kiểm tra SR
    else if (currentPitySR >= this.SR_PITY || rng < (ssrRate + this.BASE_SR_RATE)) {
      rarity = 'SR';
      heroId = srHeroPool[Math.floor(Math.random() * srHeroPool.length)];
    } 
    // 3. Ra R thông thường
    else {
      rarity = 'R';
      heroId = rHeroPool[Math.floor(Math.random() * rHeroPool.length)];
    }

    const nextPity: PityState = {
      totalPulls: pity.totalPulls + 1,
      pityToSSR: rarity === 'SSR' ? 0 : currentPitySSR,
      pityToSR: rarity === 'SR' || rarity === 'SSR' ? 0 : currentPitySR,
      isGuaranteedNextSSR: nextGuaranteedSSR
    };

    const result: GachaPullResult = {
      rarity,
      heroId,
      isRateUp,
      isNew: false, // sẽ đối chiếu với store để cập nhật
      pullNumber: nextPity.totalPulls
    };

    return { result, nextPity };
  }
}
