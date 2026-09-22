/**
 * ProgressionEngine.ts — Progression Matrix, Faction Identity & Censer Smoke
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * BẢO TỒN 100% TIẾN TRÌNH ĐẾ NGHIỆP:
 * - Cửu Đỉnh Long Lô: Canvas khói trắng nghi kỵ (safe, caution, danger) thời gian thực
 * - Ma trận chương hồi (Chapter Progression Matrix) & Khóa mở tính năng chặt chẽ
 * - 5 tầng nấc thế lực Quý Bình An: Phò Mã Hàn Vi -> Bắc Chinh Tiền Phong -> Trấn Bắc Quân -> Ba Châu Bắc Cảnh -> Định Quốc Hoàng Triều
 * - Thông báo thiên cơ khai mở (Unlock Notification Toast)
 */

import { GameStateStore } from './GameStateStore';
import { EventBus } from './EventBus';

export interface FactionStage {
  id: number;
  minChapter: number;
  maxChapter: number;
  sealIcon: string;
  factionName: string;
  identityTitle: string;
  fullTitle: string;
  description: string;
  buffSummary: string;
  colorTag: string;
}

export interface ChapterMilestone {
  id: number;
  badge: string;
  title: string;
  knot: string;
  featureUnlocked: string;
  lore: string;
  unlocked: boolean;
  active: boolean;
}

export const FACTION_STAGES: FactionStage[] = [
  {
    id: 1,
    minChapter: 1,
    maxChapter: 14,
    sealIcon: "駙",
    factionName: "PHÒ MÃ PHỦ",
    identityTitle: "PHÒ MÃ GIA",
    fullTitle: "Hàn Vi Phò Mã · Đích Tử Phủ Trấn Quốc Công",
    description: "Đích tử thứ ba của phủ Trấn Quốc Công Quý gia, ở rể hoàng tộc Đại Vũ chịu đủ ghẻ lạnh và nghi kỵ. Ẩn nhẫn giấu tài, phá giải vế đối cứu nguy thể diện quốc gia tại điện Kim Loan, thức tỉnh Bái Tướng Thần Đàn triệu hoán Triệu Tử Long (Chương 5) và phát minh xà phòng Thấu Hoa Cao gây dựng ngân quỹ (Chương 8).",
    buffSummary: "Ngân Khố Bí Mật · Bái Tướng Thần Đàn · Triệu Hoán Triệu Vân SSR",
    colorTag: "tag-amber"
  },
  {
    id: 2,
    minChapter: 15,
    maxChapter: 52,
    sealIcon: "征",
    factionName: "BẮC CHINH TIỀN PHONG",
    identityTitle: "TIỀN PHONG TƯỚNG QUÂN",
    fullTitle: "Chinh Bắc Tiền Phong Tướng Quân",
    description: "Bắc Cương khói lửa, Vũ Hoàng hạ chỉ phong làm Tiền Phong Tướng Quân xuất chinh bắc phạt. Tiếp nhận Hổ Phù Lệnh Sa Bàn (AP), triệu hoán Vạn Kim Mưu Sĩ Mã Tắc (Chương 17) thi triển kế 'Cao Nâng Mã Tắc' gài sang phe Tô Vân, chiêu mộ Độc Sĩ Giả Hủ (Chương 27), sáng lập dũng sĩ Huyết Y Doanh, thi hành đại kế thủy công Thanh Thủy (Chương 35), đại phá phản tướng Địch Hỏa giải vây Thanh Châu (Chương 52).",
    buffSummary: "Tầng 2 Sa Bàn Quân Sự · Mưu Sĩ Mã Tắc · Độc Kế Giả Hủ · Đại Thắng Thanh Châu",
    colorTag: "tag-cyan"
  },
  {
    id: 3,
    minChapter: 53,
    maxChapter: 190,
    sealIcon: "鎮",
    factionName: "BA CHÂU BẮC CẢNH",
    identityTitle: "CHINH BẮC ĐẠI TƯỚNG QUÂN",
    fullTitle: "Chinh Bắc Đại Tướng Quân · Điển Nông Trung Lang Tướng",
    description: "Đại thắng Thanh Châu trở về kinh kỳ, Vũ Hoàng ban phong Chinh Bắc Đại Tướng Quân kiêm Điển Nông Trung Lang Tướng, nắm trọn 3 châu hiểm yếu phương Bắc (Thanh Châu, Liễu Châu, Khai Nguyên). Triệu hoán Điển Vi (Chương 63), bình định binh biến Tô Kiến Phong (Chương 109). Vũ Hoàng băng hà, Tân Hoàng Tử Ngọc Trạch kế vị (Chương 114), triệu hoán Điêu Thuyền (Chương 140), Trương Liêu (Chương 150).",
    buffSummary: "Nắm Trọn Ba Châu · Triệu Hoán Điển Vi & Trương Liêu · Tân Hoàng Kế Vị",
    colorTag: "tag-crimson"
  },
  {
    id: 4,
    minChapter: 191,
    maxChapter: 384,
    sealIcon: "侯",
    factionName: "TRẤN QUỐC VƯƠNG PHỦ",
    identityTitle: "TRẤN QUỐC TỊNH KIÊN VƯƠNG",
    fullTitle: "Trấn Quốc Công · Tịnh Kiên Vương Triều Vũ",
    description: "Triệu hoán dũng tướng Cao Thuận và sáng lập Hãm Trận Doanh (Chương 200), triệu hoán Vương Tá Chi Tài Tuân Úc (Chương 201), thống lĩnh quân đội bình định phản loạn bốn cõi, tấn phong Trấn Quốc Công (Chương 255), rồi thăng Tịnh Kiên Vương (Chương 303) 'Nhất ngôn nhi vi thiên hạ pháp'. Quyền nghiêng triều dã, muôn dân quy phục, thế lực áp đảo hoàng quyền suy vi.",
    buffSummary: "Hãm Trận Cao Thuận · Mưu Sĩ Tuân Úc · Trấn Quốc Phong Công · Tịnh Kiên Vương Vị",
    colorTag: "tag-emerald"
  },
  {
    id: 5,
    minChapter: 385,
    maxChapter: 1509,
    sealIcon: "帝",
    factionName: "ĐẠI HÁN HOÀNG TRIỀU",
    identityTitle: "ĐẠI HÁN HOÀNG ĐẾ",
    fullTitle: "Khai Quốc Hoàng Đế · Cửu Ngũ Chí Tôn",
    description: "Vũ triều suy tàn, vạn dân cầu xin, sau Tam Nhượng Đế Vị Quý Bình An đăng cơ Hoàng Đế tại điện Kim Loan (Chương 386), cải quốc hiệu ĐẠI HÁN, niên hiệu Định Quốc năm đầu (Chương 411). Triệu hoán Thừa Tướng Gia Cát Lượng (Chương 725), Vô Song Chiến Thần Lữ Bố (Chương 817), nhất thống giang sơn, khai sáng thịnh thế.",
    buffSummary: "Đăng Cơ Hoàng Đế · Niên Hiệu Định Quốc · Gia Cát Lượng & Lữ Bố",
    colorTag: "tag-gold"
  }
];

export const CHAPTER_MATRIX: ChapterMilestone[] = [
  { id: 1, badge: "CHƯƠNG 1", title: "Phá Giải Câu Đối Hoàng Cung", knot: "chapter_1_start", featureUnlocked: "Kích Hoạt Hệ Thống & 1 Anh Hồn Lệnh", lore: "Quý Bình An xuyên không nhập thể phò mã, đối lại vế đối cái thế chấn động Vũ Hoàng.", unlocked: true, active: true },
  { id: 5, badge: "CHƯƠNG 5", title: "Bái Tướng Đài & Triệu Tử Long", knot: "chapter_5_transition", featureUnlocked: "Gacha Bái Tướng Đài & Bảng Tra Cứu Tướng", lore: "Dùng Anh Hồn Lệnh Sơ Cấp triệu hoán Triệu Vân SSR, mở khóa Bảng Tra Cứu Thuộc Tính Tứ Duy.", unlocked: false, active: false },
  { id: 8, badge: "CHƯƠNG 8", title: "Phát Minh Thấu Hoa Cao", knot: "chapter_8_transition", featureUnlocked: "Kinh Doanh Xà Phòng (+3.000 Vàng/Lượt)", lore: "Quý Bình An chế tạo xà phòng thơm từ mỡ cừu, hợp tác cùng Thiên Kim Lâu của Vệ Ti Vũ.", unlocked: false, active: false },
  { id: 10, badge: "CHƯƠNG 10", title: "Trận Thích Sát Phò Mã Phủ", knot: "chapter_10_transition", featureUnlocked: "Điều Tra & Phân Nhánh Thích Khách", lore: "Sát thủ đột kích phủ đệ trong đêm mưa, Triệu Vân một thương quét sạch.", unlocked: false, active: false },
  { id: 15, badge: "CHƯƠNG 15", title: "Vũ Hoàng Hạ Chỉ Bắc Chinh", knot: "chapter_15_transition", featureUnlocked: "TẦNG 2: Đế Nghiệp Sa Bàn & Lệnh Sa Bàn (AP)", lore: "Vũ Hoàng phong Quý Bình An làm Chinh Bắc Tiền Phong Tướng Quân, mở khóa bản đồ quân sự 4 phương.", unlocked: false, active: false },
  { id: 20, badge: "CHƯƠNG 17-21", title: "Triệu Hoán Mã Tắc & Cao Nâng Mã Tắc", knot: "chapter_20_start", featureUnlocked: "Vạn Kim Mưu Sĩ Mã Tắc & Binh Thư Thao Lược", lore: "Dùng vạn lượng hoàng kim triệu hoán Mã Tắc, thi triển diệu kế 'Cao Nâng Mã Tắc' gài sang phe Tô Vân, thâu tóm binh quyền Bắc Cương.", unlocked: false, active: false },
  { id: 27, badge: "CHƯƠNG 27-30", title: "Hố Vũ Hoàng & Triệu Hoán Giả Hủ", knot: "chapter_27_transition", featureUnlocked: "Triệu Hoán Độc Sĩ Giả Hủ & Huyết Y Doanh", lore: "Hố 20 vạn vàng từ triều đình, tế 10 vạn vàng triệu hoán Độc Sĩ Giả Hủ từ Bái Tướng Thần Đàn, sáng lập quân đoàn Huyết Y Doanh.", unlocked: false, active: false },
  { id: 35, badge: "CHƯƠNG 35", title: "Đại Kế Thủy Công Thanh Thủy", knot: "chapter_35_transition", featureUnlocked: "Siêu Thẻ Bài: Xả Lũ Sông Thanh Thủy", lore: "Đắp đập ngăn sông Thanh Thủy thượng nguồn, chuẩn bị xả lũ nhấn chìm chiến thành địch.", unlocked: false, active: false },
  { id: 43, badge: "CHƯƠNG 43", title: "Vạn Thạch Quân Lương Tiền Tuyến", knot: "chapter_43_transition", featureUnlocked: "Kho Lương Hậu Cần (+50.000 Thạch Lương)", lore: "Bí mật thu mua quân lương từ thương đoàn Giang Đông, sĩ khí ba quân đạt mức tối đa.", unlocked: false, active: false },
  { id: 52, badge: "CHƯƠNG 48-52", title: "Đại Chiến Thành Thanh Châu", knot: "chapter_48_transition", featureUnlocked: "TẦNG 3: Sa Trường Thẻ Bài 3 Làn & Quyết Chiến Địch Hỏa", lore: "5 vạn quân Địch Hỏa vây hãm, dùng thủy kế Giả Hủ, Triệu Vân và Huyết Y Doanh đại phá quân Nam Ly khải hoàn.", unlocked: false, active: false }
];

export class ProgressionEngine {
  private store: GameStateStore;
  private bus: EventBus;

  // Censer Smoke Canvas
  private smokeCanvas: HTMLCanvasElement | null = null;
  private smokeCtx: CanvasRenderingContext2D | null = null;
  private smokeParticles: any[] = [];
  private smokeTier: 'safe' | 'caution' | 'danger' = 'safe';
  private smokeAnimId: any = null;

  constructor(store: GameStateStore, bus: EventBus) {
    this.store = store;
    this.bus = bus;

    this.bus.on('ADVANCE_CHAPTER', (chId: number) => this.advanceChapter(chId));
    this.bus.on('UNLOCK_FEATURE', (feat: string) => this.triggerUnlockNotification(feat));
  }

  public initCenserSmoke(canvasId: string = 'suspicion-smoke-canvas'): void {
    this.smokeCanvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.smokeCanvas) return;
    this.smokeCtx = this.smokeCanvas.getContext('2d');
    if (this.smokeAnimId) cancelAnimationFrame(this.smokeAnimId);
    this.animateSmoke();
  }

  public setSmokeTier(pct: number): void {
    const el = document.querySelector('.suspicion-diegetic');
    if (!el) return;
    el.classList.remove('tier-safe', 'tier-caution', 'tier-danger');

    if (pct <= 30) {
      this.smokeTier = 'safe';
      el.classList.add('tier-safe');
    } else if (pct <= 60) {
      this.smokeTier = 'caution';
      el.classList.add('tier-caution');
    } else {
      this.smokeTier = 'danger';
      el.classList.add('tier-danger');
    }
  }

  private spawnSmokeParticle(): void {
    const configs = {
      safe: { count: 1, color: [148, 163, 184], maxAlpha: 0.25, speed: 0.3, size: 2 },
      caution: { count: 2, color: [251, 191, 36], maxAlpha: 0.4, speed: 0.5, size: 3 },
      danger: { count: 3, color: [239, 68, 68], maxAlpha: 0.55, speed: 0.7, size: 4 }
    };
    const cfg = configs[this.smokeTier] || configs.safe;
    for (let i = 0; i < cfg.count; i++) {
      this.smokeParticles.push({
        x: 30 + (Math.random() - 0.5) * 10,
        y: 38,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -cfg.speed - Math.random() * 0.3,
        size: cfg.size + Math.random() * 2,
        alpha: cfg.maxAlpha,
        decay: 0.006 + Math.random() * 0.004,
        color: cfg.color
      });
    }
  }

  private animateSmoke(): void {
    if (!this.smokeCtx) return;
    const ctx = this.smokeCtx;
    ctx.clearRect(0, 0, 60, 40);

    if (Math.random() < 0.3) this.spawnSmokeParticle();

    this.smokeParticles = this.smokeParticles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      p.size *= 1.01;
      p.vx += (Math.random() - 0.5) * 0.1;

      if (p.alpha <= 0) return false;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha})`;
      ctx.fill();
      return true;
    });

    this.smokeAnimId = requestAnimationFrame(() => this.animateSmoke());
  }

  public getCurrentFactionStage(): FactionStage {
    const ch = this.store.getState().currentChapterId || 1;
    return FACTION_STAGES.find(s => ch >= s.minChapter && ch <= s.maxChapter) || FACTION_STAGES[0];
  }

  public advanceChapter(chapterId: number): void {
    const s = this.store.getState();
    const nextUnlocked = [...s.unlockedFeatures];

    if (chapterId >= 5 && !nextUnlocked.includes('gacha')) nextUnlocked.push('gacha');
    if (chapterId >= 8 && !nextUnlocked.includes('soap')) nextUnlocked.push('soap');
    if (chapterId >= 15 && !nextUnlocked.includes('strategyMap')) nextUnlocked.push('strategyMap');
    if (chapterId >= 17 && !nextUnlocked.includes('matac')) nextUnlocked.push('matac');
    if (chapterId >= 27 && !nextUnlocked.includes('giaHu')) nextUnlocked.push('giaHu');
    if (chapterId >= 27 && !nextUnlocked.includes('huyet_y_doanh')) nextUnlocked.push('huyet_y_doanh');
    if (chapterId >= 35 && !nextUnlocked.includes('flood')) nextUnlocked.push('flood');
    if (chapterId >= 43 && !nextUnlocked.includes('khaiNguyen')) nextUnlocked.push('khaiNguyen');
    if (chapterId >= 48 && !nextUnlocked.includes('battleFront')) nextUnlocked.push('battleFront');
    if (chapterId >= 200 && !nextUnlocked.includes('gaoshun')) nextUnlocked.push('gaoshun');

    const nextAp = (chapterId >= 15 && s.ap === 0) ? 3 : s.ap;

    CHAPTER_MATRIX.forEach(c => {
      if (c.id <= chapterId) c.unlocked = true;
      c.active = (c.id === chapterId);
    });

    this.store.setState({
      currentChapterId: chapterId,
      unlockedFeatures: nextUnlocked,
      ap: nextAp
    });

    this.bus.emit('CHAPTER_ADVANCED', chapterId);
  }

  public triggerUnlockNotification(featureKey: string): void {
    if (featureKey === 'bai_tuong_dai') {
      this.advanceChapter(5);
    } else if (featureKey === 'strategyMap' || featureKey === 'de_nghiep_sa_ban') {
      this.advanceChapter(15);
    } else if (featureKey === 'soap') {
      this.advanceChapter(8);
    } else if (featureKey === 'battleFront') {
      this.advanceChapter(48);
    }

    const unlockDetails: Record<string, any> = {
      anh_hon_lenh: {
        seal: "令",
        origin: "THIÊN CƠ HỆ THỐNG · THƯỢNG CỔ CHIẾU PHÙ",
        title: "TIẾP NHẬN THƯỢNG CỔ ANH HỒN LỆNH",
        name: "THƯỢNG CỔ ANH HỒN LỆNH × 1",
        lore: "Hoàng kim xé toạc hư không, Thượng Cổ Anh Hồn Lệnh ngưng tụ chân long chi khí. Tín vật tối thượng câu thông thiên cơ, thức tỉnh danh tướng Tam Quốc tại Bái Tướng Thần Đàn!",
        effect: "[ 效 · HIỆU QUẢ ] Tiêu hao tại Bái Tướng Thần Đàn (Chương 5) để thỉnh triệu anh linh Thường Sơn Triệu Tử Long SSR!"
      },
      soap: {
        seal: "商",
        origin: "HOÀNG KINH THƯƠNG VỤ · KINH TẾ KHỞI NGUYÊN",
        title: "MỞ KHÓA KINH DOANH ĐỘC QUYỀN",
        name: "XÀ PHÒNG THẤU HOA CAO (CHƯƠNG 8)",
        lore: "Quý Bình An bắt tay cùng Lâu chủ Vệ Ti Vũ (Thiên Kim Lâu) phân phối xà phòng thơm độc quyền.",
        effect: "[ 效 · HIỆU QUẢ ] Cho phép thực hiện lệnh 'Mở Rộng Xưởng' thu hoạch +3.000 Vàng mỗi đợt!"
      },
      thau_hoa_cao: {
        seal: "商",
        origin: "HOÀNG KINH THƯƠNG VỤ · KINH TẾ KHỞI NGUYÊN",
        title: "MỞ KHÓA KINH DOANH ĐỘC QUYỀN",
        name: "XÀ PHÒNG THẤU HOA CAO (CHƯƠNG 8)",
        lore: "Quý Bình An bắt tay cùng Lâu chủ Vệ Ti Vũ (Thiên Kim Lâu) phân phối xà phòng thơm độc quyền.",
        effect: "[ 效 · HIỆU QUẢ ] Cho phép thực hiện lệnh 'Mở Rộng Xưởng' thu hoạch +3.000 Vàng mỗi đợt!"
      },
      bai_tuong_dai: {
        seal: "壇",
        origin: "THẦN ĐÀN KHAI QUANG · PHÁP TRẬN BÁI TƯỚNG",
        title: "KHAI MỞ BÁI TƯỚNG THẦN ĐÀN",
        name: "ĐÀI CHIÊU MỘ ANH LINH TAM QUỐC (CHƯƠNG 5)",
        lore: "Kích hoạt pháp trận Bát Quái thời thượng cổ, dùng Anh Hồn Lệnh triệu hoán anh linh Tam Quốc.",
        effect: "[ 效 · HIỆU QUẢ ] Cho phép Chiêu Mộ Danh Tướng và kiểm tra Bảng Tra Cứu Tứ Duy!"
      },
      strategyMap: {
        seal: "輿",
        origin: "ĐẠI VŨ THÁNH CHỈ · BẮC CHINH THỐNG SOÁI",
        title: "MỞ KHÓA TẦNG 2 ĐẾ NGHIỆP",
        name: "SƠN HÀ SA BÀN & ĐIỂM HÀNH ĐỘNG (CHƯƠNG 15)",
        lore: "Vũ Hoàng sắc phong Chinh Bắc Tiền Phong Tướng Quân, ban cờ lệnh điều động binh mã 4 phương.",
        effect: "[ 效 · HIỆU QUẢ ] Khai thông giao diện Sa Bàn Quân Sự và tiêu hao Điểm Hành Động (AP)!"
      },
      de_nghiep_sa_ban: {
        seal: "輿",
        origin: "ĐẠI VŨ THÁNH CHỈ · BẮC CHINH THỐNG SOÁI",
        title: "MỞ KHÓA TẦNG 2 ĐẾ NGHIỆP",
        name: "SƠN HÀ SA BÀN & ĐIỂM HÀNH ĐỘNG (CHƯƠNG 15)",
        lore: "Vũ Hoàng sắc phong Chinh Bắc Tiền Phong Tướng Quân, ban cờ lệnh điều động binh mã 4 phương.",
        effect: "[ 效 · HIỆU QUẢ ] Khai thông giao diện Sa Bàn Quân Sự và tiêu hao Điểm Hành Động (AP)!"
      },
      feature_ma_tac: {
        seal: "策",
        origin: "THƯỢNG CỔ BÁI TƯỚNG · VẠN KIM MƯU SĨ",
        title: "TRIỆU HOÁN VẠN KIM MƯU SĨ",
        name: "MÃ TẮC & BINH THƯ THAO LƯỢC (CHƯƠNG 17-21)",
        lore: "Vạn kim mưu sĩ tinh thông binh thư trận đồ. Quý Bình An thi triển diệu kế 'Cao Nâng Mã Tắc' gài sang phe Tô Vân, nắm quyền kiểm soát Bắc Cảnh.",
        effect: "[ 效 · HIỆU QUẢ ] Bổ sung thẻ bài Binh Thư Thao Lược & mở khóa kế sách phân hóa đối thủ!"
      },
      matac: {
        seal: "策",
        origin: "THƯỢNG CỔ BÁI TƯỚNG · VẠN KIM MƯU SĨ",
        title: "TRIỆU HOÁN VẠN KIM MƯU SĨ",
        name: "MÃ TẮC & BINH THƯ THAO LƯỢC (CHƯƠNG 17-21)",
        lore: "Vạn kim mưu sĩ tinh thông binh thư trận đồ. Quý Bình An thi triển diệu kế 'Cao Nâng Mã Tắc' gài sang phe Tô Vân, nắm quyền kiểm soát Bắc Cảnh.",
        effect: "[ 效 · HIỆU QUẢ ] Bổ sung thẻ bài Binh Thư Thao Lược & mở khóa kế sách phân hóa đối thủ!"
      },
      feature_huyet_y_doanh: {
        seal: "血",
        origin: "TỬ SĨ BẮC CƯƠNG · ÁO MÁU XÔNG TRẬN",
        title: "SÁNG LẬP QUÂN ĐOÀN HUYẾT Y",
        name: "QUÂN ĐOÀN HUYẾT Y DOANH (CHƯƠNG 30)",
        lore: "Giả Hủ hiến kế tuyển mộ tử tù và tân binh nghèo khó, tự tay tôi luyện thành quân đoàn áo máu trung thành tuyệt đối.",
        effect: "[ 效 · HIỆU QUẢ ] Bổ sung thẻ bài phòng ngự - phản kích Huyết Y Doanh vào bộ bài chiến thuật!"
      },
      feature_ham_tran_doanh: {
        seal: "陣",
        origin: "THỐNG QUÂN THIỆT HÃM · BÁCH CHIẾN BẤT ĐÃI",
        title: "THU PHỤC VẠN KIM VÕ TƯỚNG",
        name: "CAO THUẬN & HÃM TRẬN DOANH (CHƯƠNG 200)",
        lore: "800 dũng sĩ cảm tử Hãm Trận Doanh mình mặc giáp thép tôi, xung phong hãm trận vô địch.",
        effect: "[ 效 · HIỆU QUẢ ] Bổ sung thẻ bài phòng ngự siêu việt Hãm Trận Doanh vào bộ bài!"
      },
      giaHu: {
        seal: "謀",
        origin: "ĐỘC KẾ ĐỊNH THIÊN HẠ · TUYỆT THẾ MƯU SĨ",
        title: "MỞ KHÓA MƯU THẦN TAM QUỐC",
        name: "ĐỘC SĨ GIẢ HỦ & THỦY CÔNG (CHƯƠNG 27)",
        lore: "Hố 20 vạn lượng vàng từ triều đình, thu phục mưu sĩ Giả Hủ phụ trách mưu kế diệt quân Nam Ly.",
        effect: "[ 效 · HIỆU QUẢ ] Mở khóa các thẻ bài mưu lược phản gián và độc kế!"
      },
      feature_water_stratagem: {
        seal: "水",
        origin: "THANH THỦY NỘ ĐÀO · ĐỊA HÌNH KẾ SÁCH",
        title: "MỞ KHÓA KẾ SÁCH THỦY CÔNG",
        name: "XẢ LŨ DÒNG THANH THỦY (CHƯƠNG 35)",
        lore: "Đắp đê thượng nguồn sông Thanh Thủy tích nước 3 tầng, chuẩn bị nhấn chìm quân địch.",
        effect: "[ 效 · HIỆU QUẢ ] Mở khóa siêu kỹ năng Xả Lũ Sông Thanh Thủy trong trận chiến!"
      },
      khaiNguyen: {
        seal: "糧",
        origin: "BINH MÃ VỊ ĐỘNG · LƯƠNG THẢO TIÊN HÀNH",
        title: "MỞ KHÓA HẬU CẦN QUÂN LƯƠNG",
        name: "CĂN CỨ KHO LƯƠNG KHAI NGUYÊN (CHƯƠNG 43)",
        lore: "Tích trữ 50.000 thạch lương thảo, đảm bảo hậu cần vững chắc cho đại quân.",
        effect: "[ 效 · HIỆU QUẢ ] Kho lương tăng thêm +50.000 Thạch phục vụ nuôi quân và hành quân!"
      },
      battleFront: {
        seal: "戈",
        origin: "THỦ THÀNH HUYẾT CHIẾN · SA TRƯỜNG TRANH HÙNG",
        title: "MỞ KHÓA TẦNG 3 CHIẾN TRƯỜNG",
        name: "SA TRƯỜNG THẺ BÀI CHIẾN THUẬT (CHƯƠNG 48-52)",
        lore: "2 vạn thiết kỵ Nam Ly của Địch Hỏa vây hãm thành trì, bước vào trận đại chiến thủ thành 3 làn.",
        effect: "[ 效 · HIỆU QUẢ ] Trực tiếp điều binh thủ thành, đối phó Ý Đồ Kẻ Địch và quyết toán đại thắng!"
      }
    };

    const info = unlockDetails[featureKey] || {
      seal: "令",
      origin: "THIÊN CƠ HỆ THỐNG · MỞ KHÓA ĐẠI NGHIỆP",
      title: "TIẾP NHẬN THIÊN MỆNH CHIẾU THƯ",
      name: featureKey.toUpperCase(),
      lore: "Ký chủ đã đạt mốc sự kiện quan trọng trong cốt truyện.",
      effect: "[ 效 · HIỆU QUẢ ] Đã cập nhật trạng thái mới cho toàn bộ hệ thống!"
    };

    this.bus.emit('SHOW_UNLOCK_MODAL', info);
  }
}
