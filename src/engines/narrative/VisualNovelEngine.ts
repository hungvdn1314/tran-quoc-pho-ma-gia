/**
 * VisualNovelEngine.ts — 100% Authentic Cinematic Visual Novel Theater
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * BẢO TỒN 100% NGUYÊN TÁC VÀ GIAO DIỆN CHỐT:
 * - Kế thừa 52 chương kịch bản Ink thật từ GAME_DATA (ch01_15, ch16_52)
 * - Zero Asset Sharing: Standee độc bản riêng biệt cho từng nhân vật
 * - Hộp thoại gỗ sơn mài nẹp Kintsugi rạn nứt
 * - Typewriter xúc cảm 14ms (click / Space để hiện trọn vẹn tức thì)
 * - Ấn triện chu sa động đại diện cho từng nhân vật
 * - Lựa chọn phân nhánh kịch bản 4 phân loại màu (Sát phạt, Thiên cơ, Quân cơ, Ẩn nhẫn)
 * - Sử Ký (Backlog), Tự Động, Ẩn UI
 */

import vnTemplate from './vn-stage.html?raw';
import { InkEngine } from './InkEngine';
import { PixiMistAtmosphere } from './PixiMistAtmosphere';
import { GameStateStore } from '../../core/GameStateStore';
import { EventBus } from '../../core/EventBus';
import { AudioSynthesizer } from '../../audio/AudioSynthesizer';

declare const window: any;

const SCENE_BACKGROUNDS: Record<string, string> = {
  'bg_palace_chamber': 'assets/images/bg_palace_chamber.jpg',
  'bg_pho_ma_phu_bedroom': 'assets/images/bg_palace_chamber.jpg',
  'bg_imperial_road': 'assets/images/bg_imperial_road.jpg',
  'bg_imperial_hall': 'assets/images/bg_imperial_hall.jpg',
  'bg_pho_ma_phu_secret_room': 'assets/images/bg_pho_ma_phu_secret_room.jpg',
  'bg_summoning_altar': 'assets/images/bg_summoning_altar.jpg',
  'bg_thien_kim_lau': 'assets/images/bg_thien_kim_lau.jpg',
  'bg_pho_ma_phu_courtyard_night': 'assets/images/bg_pho_ma_phu_secret_room.jpg',
  'bg_northern_border_camp': 'assets/images/bg_northern_border_camp.jpg',
  'bg_advisor_tent_night': 'assets/images/bg_northern_border_camp.jpg',
  'bg_thanh_thuy_river_dam': 'assets/images/bg_thanh_thuy_river_dam.jpg',
  'bg_granary_depot': 'assets/images/bg_northern_border_camp.jpg',
  'bg_thanh_chau_fortress_siege': 'assets/images/bg_fortress_battle.jpg',
  'bg_fortress_battle': 'assets/images/bg_fortress_battle.jpg',
  'bg_darkness': 'assets/images/bg_palace_chamber.jpg',
  'bg_void_golden': 'assets/images/bg_pho_ma_phu_secret_room.jpg'
};

const ACTOR_STANDY_TAG_MAP: Record<string, string> = {
  'qui_binh_an': 'assets/images/actor_quy_binh_an.png',
  'quy_binh_an': 'assets/images/actor_quy_binh_an.png',
  'trieu_van': 'assets/images/actor_trieu_van.png',
  'gao_shun': 'assets/images/actor_cao_thuan.png',
  'cao_thuan': 'assets/images/actor_cao_thuan.png',
  'ma_tac': 'assets/images/actor_ma_tac.png',
  'matac': 'assets/images/actor_ma_tac.png',
  'jia_xu': 'assets/images/actor_gia_hu.png',
  'gia_hu': 'assets/images/actor_gia_hu.png',
  'co_hu': 'assets/images/actor_gia_hu.png',
  'dien_vi': 'assets/images/actor_dien_vi.png',
  'vu_hoang': 'assets/images/actor_vu_hoang.png',
  'to_kien_phong': 'assets/images/actor_to_kien_phong.png',
  'nam_ly_envoy': 'assets/images/actor_nam_ly_envoy.png',
  'servant': 'assets/images/actor_servant.png',
  'tieu_thuy': 'assets/images/actor_servant.png',
  'assassin': 'assets/images/actor_assassin.png',
  've_ti_vu': 'assets/images/actor_ve_ti_vu.png',
  'ly_nho': 'assets/images/actor_ly_nho.png',
  'dieu_thuyen': 'assets/images/actor_dieu_thuyen.png',
  'hoa_hung': 'assets/images/actor_hoa_hung.png',
  'khuc_nghia': 'assets/images/actor_khuc_nghia.png',
  'truong_lieu': 'assets/images/actor_truong_lieu.png',
  'tuan_uc': 'assets/images/actor_tuan_uc.png',
  'chu_du': 'assets/images/actor_chu_du.png',
  'hoang_trung': 'assets/images/actor_hoang_trung.png',
  'hi_chi_tai': 'assets/images/actor_hi_chi_tai.png',
  'ma_sieu': 'assets/images/actor_ma_sieu.png',
  'hoa_da': 'assets/images/actor_hoa_da.png',
  'quach_gia': 'assets/images/actor_quach_gia.png',
  'an_hoang_hau': 'assets/images/actor_an_hoang_hau.png',
  'ninh_an_cong_chua': 'assets/images/actor_ninh_an_cong_chua.png',
  'hua_hoa_lam': 'assets/images/actor_hua_hoa_lam.png',
  'tan_tu_nghiep': 'assets/images/actor_tan_tu_nghiep.png',
  'tu_trieu_phong': 'assets/images/actor_tu_trieu_phong.png',
  'tu_ngoc_trach': 'assets/images/actor_tu_ngoc_trach.png',
  'dich_hoa': 'assets/images/actor_dich_hoa.png',
  'quy_binh_sinh': 'assets/images/actor_quy_binh_sinh.png',
  'tu_ngoc_hang': 'assets/images/actor_tu_ngoc_hang.png',
  'cung_sinh': 'assets/images/actor_cung_sinh.png',
  'chu_bat_ninh': 'assets/images/actor_chu_bat_ninh.png',
  'co_vo_phap': 'assets/images/actor_co_vo_phap.png',
  'co_vo_thien': 'assets/images/actor_co_vo_thien.png',
  'he_nhan_cong_chua': 'assets/images/actor_he_nhan_cong_chua.png',
  'trieu_van_du': 'assets/images/actor_trieu_van_du.png',
  'vu_van_chau': 'assets/images/actor_vu_van_chau.png',
  'tram_hao': 'assets/images/actor_tram_hao.png',
  'quy_binh_xuyen': 'assets/images/actor_quy_binh_xuyen.png'
};

export class VisualNovelEngine {
  private container: HTMLElement;
  private store: GameStateStore;
  private bus: EventBus;
  private audio: AudioSynthesizer;
  public ink: InkEngine;
  private pixiMist: PixiMistAtmosphere;

  private activeBgLayer: 'a' | 'b' = 'a';
  private typewriterTimer: any = null;
  private autoTimer: any = null;
  private isAutoReading: boolean = false;
  private currentLeftActor: { id: string; name: string; path: string } | null = null;

  // DOM Caches
  private layerA!: HTMLElement;
  private layerB!: HTMLElement;
  private vnStage!: HTMLElement;
  private dialoguePanel!: HTMLElement;
  private speakerNameEl!: HTMLElement;
  private speakerSubEl!: HTMLElement;
  private speakerSealEl!: HTMLElement;
  private dialogueTextEl!: HTMLElement;
  private branchIndicatorEl!: HTMLElement;
  private btnAdvance!: HTMLElement;
  private choiceModal!: HTMLElement;
  private choiceGrid!: HTMLElement;
  private choiceQuestion!: HTMLElement;
  private actorLeftSlot!: HTMLElement;
  private actorLeftImg!: HTMLImageElement;
  private actorLeftNametag!: HTMLElement;
  private actorRightSlot!: HTMLElement;
  private actorRightImg!: HTMLImageElement;
  private actorRightNametag!: HTMLElement;
  private backlogDrawer!: HTMLElement;
  private backlogBody!: HTMLElement;

  constructor(containerId: string, store: GameStateStore, bus: EventBus, audio: AudioSynthesizer) {
    this.container = document.getElementById(containerId) || document.body;
    this.store = store;
    this.bus = bus;
    this.audio = audio;
    this.ink = new InkEngine();
    this.mountHTML();
    this.pixiMist = new PixiMistAtmosphere('vn-pixi-canvas');

    this.bindDOM();
    this.bindEvents();
    this.loadInkScripts();
    this.hookInkEffects();
  }

  private mountHTML(): void {
    this.container.innerHTML = vnTemplate;
  }

  private bindDOM(): void {
    this.layerA = document.getElementById('vn-bg-layer-a')!;
    this.layerB = document.getElementById('vn-bg-layer-b')!;
    this.vnStage = document.getElementById('vn-stage')!;
    this.dialoguePanel = document.getElementById('vn-dialogue-panel')!;
    this.speakerNameEl = document.getElementById('vn-speaker')!;
    this.speakerSubEl = document.getElementById('vn-speaker-sub')!;
    this.speakerSealEl = document.getElementById('vn-speaker-seal')!;
    this.dialogueTextEl = document.getElementById('vn-dialogue-text')!;
    this.branchIndicatorEl = document.getElementById('vn-branch-indicator')!;
    this.btnAdvance = document.getElementById('btn-vn-advance')!;
    this.choiceModal = document.getElementById('branch-choice-modal')!;
    this.choiceGrid = document.getElementById('choice-grid')!;
    this.choiceQuestion = document.getElementById('choice-question')!;
    this.actorLeftSlot = document.getElementById('actor-left-slot')!;
    this.actorLeftImg = document.getElementById('actor-left-img') as HTMLImageElement;
    this.actorLeftNametag = document.getElementById('actor-left-nametag')!;
    this.actorRightSlot = document.getElementById('actor-right-slot')!;
    this.actorRightImg = document.getElementById('actor-right-img') as HTMLImageElement;
    this.actorRightNametag = document.getElementById('actor-right-nametag')!;
    this.backlogDrawer = document.getElementById('backlog-drawer')!;
    this.backlogBody = document.getElementById('backlog-body')!;
  }

  private bindEvents(): void {
    // Nhấp bất kỳ đâu trên màn hình VN hoặc hộp thoại để chuyển câu thoại (chuẩn Visual Novel)
    if (this.container) {
      this.container.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          target.closest('.vn-quick-ribbon') ||
          target.closest('.vn-portal-seal') ||
          target.closest('.backlog-drawer') ||
          target.closest('.branch-choice-modal') ||
          target.closest('button')
        ) {
          return;
        }
        this.advanceDialogue();
      });
    }

    // Phím [Space]
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Space' && this.store.getState().currentView === 'vn') {
        e.preventDefault();
        this.advanceDialogue();
      }
    });

    // Nút mở Sa Bàn từ Visual Novel
    const btnVnToSaban = document.getElementById('btn-vn-to-saban');
    if (btnVnToSaban) {
      btnVnToSaban.addEventListener('click', () => {
        this.audio.playWoodClick();
        this.bus.emit('CHANGE_VIEW', 'map');
      });
    }

    // Nút Sử Ký (Backlog)
    const btnLog = document.getElementById('btn-vn-log');
    if (btnLog) {
      btnLog.addEventListener('click', (e) => {
        e.stopPropagation();
        this.audio.playWoodClick();
        this.openBacklog();
      });
    }

    const btnCloseLog = document.getElementById('btn-close-log');
    if (btnCloseLog) {
      btnCloseLog.addEventListener('click', () => {
        this.backlogDrawer?.classList.add('hidden');
      });
    }

    // Nút Tự Động (Auto)
    const btnAuto = document.getElementById('btn-vn-auto');
    if (btnAuto) {
      btnAuto.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isAutoReading = !this.isAutoReading;
        btnAuto.classList.toggle('active', this.isAutoReading);
        if (this.isAutoReading) {
          this.scheduleAutoRead();
        } else {
          clearTimeout(this.autoTimer);
        }
      });
    }

    // Nút Ẩn UI
    const btnHide = document.getElementById('btn-vn-hide');
    if (btnHide) {
      btnHide.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dialoguePanel?.classList.toggle('hidden');
      });
    }

    // Nhảy tới Knot khi chọn trong Ma Trận Kỷ Niệm
    this.bus.on('JUMP_TO_KNOT', (data: { knot: string; chapterId?: number }) => {
      if (data.knot && this.ink.knots.has(data.knot)) {
        if (data.chapterId) {
          this.bus.emit('ADVANCE_CHAPTER', data.chapterId);
        }
        this.startStory(data.knot);
        this.bus.emit('CHANGE_VIEW', 'vn');
      }
    });
  }

  private loadInkScripts(): void {
    const GD = (window as any).GAME_DATA || {};
    if (GD.ink_stories) {
      for (const key of Object.keys(GD.ink_stories)) {
        const script = GD.ink_stories[key];
        if (typeof script === 'string') {
          this.ink.loadStoryScript(script);
        }
      }
    }
  }

  private hookInkEffects(): void {
    this.ink.setEffectHandler((tag: string) => {
      if (!tag) return;

      // 1. Chuyển đổi bối cảnh nền
      if (tag.startsWith("BACKGROUND:")) {
        const bgKey = tag.replace(/^BACKGROUND:\s*/, '').trim();
        this.changeSceneBackground(bgKey);
        return;
      }

      // 2. Môi trường thời tiết
      if (tag.startsWith("AMBIENT:")) {
        const ambientType = tag.replace(/^AMBIENT:\s*/, '').trim().toLowerCase();
        if (this.vnStage) {
          if (ambientType.includes("rain")) {
            this.vnStage.classList.add('ambient-rain');
          } else if (ambientType === "clear" || ambientType === "none") {
            this.vnStage.classList.remove('ambient-rain');
          }
        }
        return;
      }

      // 3. Tiêu đề chương
      if (tag.startsWith("CHAPTER_TITLE:")) {
        const titleStr = tag.replace(/^CHAPTER_TITLE:\s*/, '').trim();
        const parts = titleStr.split(":");
        const badge = parts.length >= 2 ? parts[0].trim() : "CHƯƠNG 1";
        const title = parts.length >= 2 ? parts.slice(1).join(":").trim() : titleStr;
        this.bus.emit('CHAPTER_TITLE_UPDATED', { badge, title });
        return;
      }

      // 4. Standee nhân vật
      if (tag.startsWith("ACTORS:")) {
        const actorsStr = tag.replace(/^ACTORS:\s*/, '').trim();
        const actorTokens = actorsStr.split(",").map(t => t.trim());
        actorTokens.forEach(token => {
          const parts = token.split("|").map(t => t.trim());
          const charId = parts[0];
          const pos = parts[1] || 'left';
          const path = ACTOR_STANDY_TAG_MAP[charId];
          if (path) {
            if (pos === 'left' || pos === 'center') {
              this.currentLeftActor = {
                id: charId,
                name: this.resolveActorName(charId),
                path: path
              };
              if (this.actorLeftImg) this.actorLeftImg.src = path;
              if (this.actorLeftNametag) this.actorLeftNametag.textContent = this.currentLeftActor.name;
            } else if (pos === 'right') {
              if (this.actorRightImg) this.actorRightImg.src = path;
            }
          }
        });
        return;
      }

      // 5. FX & Gameplay triggers
      const cleanTag = tag.replace(/^EFFECT:\s*/, '').replace(/^#\s*/, '').trim();
      const parts = cleanTag.split("|").map(s => s.trim());
      const action = parts[0];

      if (action === "camera_shake" || action === "shake_screen") {
        const intensity = parseFloat(parts[1]) || 0.5;
        this.triggerShake(intensity >= 0.7 ? 'impact' : 'subtle');
      } else if (action === "screen_flash") {
        const color = parts[1] || '#FFD700';
        this.triggerLightning(color);
      } else if (action === "show_toast") {
        const msg = parts[1] || "Thông báo";
        this.bus.emit('SHOW_TOAST', msg);
      } else if (action === "grant_ticket") {
        const count = Number(parts[1] || 1);
        const s = this.store.getState();
        this.store.setState({ ticketCount: s.ticketCount + count });
        this.bus.emit('SHOW_TOAST', `[ 賜 · BAN THƯỞNG ] Tiếp nhận Anh Hồn Lệnh × ${count}!`);
        this.bus.emit('UNLOCK_FEATURE', 'anh_hon_lenh');
      } else if (action === "unlock_feature") {
        const feat = parts[1] || action;
        if (feat) this.bus.emit('UNLOCK_FEATURE', feat.trim());
      } else if (action === "trigger_gacha") {
        this.bus.emit('TRIGGER_GACHA_STORY', { mode: 'story', returnKnot: 'trieu_van_arrival' });
      } else if (action === "summon_grand_reveal") {
        const heroId = parts[1] || 'hero_zhaoyun';
        this.bus.emit('TRIGGER_HERO_GRAND_REVEAL', { heroId, onComplete: () => this.advanceDialogue() });
      } else if (action === "trigger_battle") {
        this.bus.emit('CHANGE_VIEW', 'battle');
      } else if (action === "chapter_complete") {
        const chNum = Number(parts[1] || action);
        if (!isNaN(chNum)) this.bus.emit('ADVANCE_CHAPTER', chNum);
      }
    });
  }

  public changeSceneBackground(bgKey: string): void {
    const bgUrl = SCENE_BACKGROUNDS[bgKey] || `assets/images/${bgKey}.jpg`;
    if (!this.layerA || !this.layerB) return;
    this.currentLeftActor = null;

    if (this.activeBgLayer === 'a') {
      this.layerB.style.backgroundImage = `url('${bgUrl}')`;
      this.layerB.classList.add('active');
      this.layerA.classList.remove('active');
      this.activeBgLayer = 'b';
    } else {
      this.layerA.style.backgroundImage = `url('${bgUrl}')`;
      this.layerA.classList.add('active');
      this.layerB.classList.remove('active');
      this.activeBgLayer = 'a';
    }
  }

  public triggerShake(type: 'subtle' | 'impact' = 'subtle'): void {
    if (!this.vnStage) return;
    this.vnStage.classList.remove('screen-shake', 'impact-shake');
    void this.vnStage.offsetWidth;
    this.vnStage.classList.add(type === 'impact' ? 'impact-shake' : 'screen-shake');
    setTimeout(() => {
      this.vnStage.classList.remove('screen-shake', 'impact-shake');
    }, 450);
  }

  public triggerLightning(color: string = '#FFD700'): void {
    const flash = document.getElementById('lightning-flash');
    if (!flash) return;
    flash.style.backgroundColor = color;
    flash.classList.add('flash');
    this.audio.playThunder();
    setTimeout(() => flash.classList.remove('flash'), 300);
  }

  public onViewActivated(): void {
    this.renderCurrentDialogue();
  }

  public startStory(startKnot: string = 'chapter_1_start'): void {
    this.currentLeftActor = null;
    this.actorLeftSlot?.classList.add('hidden');
    this.actorRightSlot?.classList.add('hidden');
    this.ink.start(startKnot);
    this.store.setState({ currentTextIndex: 0 });
    this.pixiMist.init();
    this.renderCurrentDialogue();
  }

  private resolveActorName(charId: string): string {
    const map: Record<string, string> = {
      'servant': 'Tiểu Thúy',
      'tieu_thuy': 'Tiểu Thúy',
      'vu_hoang': 'Vũ Hoàng',
      'nam_ly_envoy': 'Sứ Thần Nam Ly',
      'trieu_van': 'Triệu Tử Long',
      've_ti_vu': 'Vệ Ti Vũ',
      'cao_thuan': 'Cao Thuận',
      'gao_shun': 'Cao Thuận',
      'ma_tac': 'Mã Tắc (Ấu Thường)',
      'matac': 'Mã Tắc (Ấu Thường)',
      'gia_hu': 'Giả Hủ (Văn Hòa)',
      'jia_xu': 'Giả Hủ (Văn Hòa)',
      'co_hu': 'Giả Hủ (Văn Hòa)',
      'dien_vi': 'Điển Vi',
      'to_kien_phong': 'Tô Kiến Phong',
      'assassin': 'Hắc Y Thích Khách',
      'ly_nho': 'Lý Nho (Văn Ưu)',
      'dieu_thuyen': 'Điêu Thuyền',
      'hoa_hung': 'Hoa Hùng',
      'khuc_nghia': 'Khúc Nghĩa',
      'truong_lieu': 'Trương Liêu (Văn Viễn)',
      'tuan_uc': 'Tuân Úc (Văn Nhược)',
      'chu_du': 'Chu Du (Công Cẩn)',
      'hoang_trung': 'Hoàng Trung (Hán Thăng)',
      'hi_chi_tai': 'Hí Chí Tài',
      'ma_sieu': 'Mã Siêu (Mạnh Khởi)',
      'hoa_da': 'Hoa Đà (Nguyên Hóa)',
      'quach_gia': 'Quách Gia (Phụng Hiếu)',
      'an_hoang_hau': 'An Thái Hậu',
      'ninh_an_cong_chua': 'Ninh An Công Chúa',
      'hua_hoa_lam': 'Hứa Hòa Lâm',
      'tan_tu_nghiep': 'Tần Tứ Nghiệp',
      'tu_trieu_phong': 'Khai Sơn Vương (Tử Triệu Phong)',
      'tu_ngoc_trach': 'Tân Hoàng (Tử Ngọc Trạch)',
      'dich_hoa': 'Địch Hỏa',
      'quy_binh_sinh': 'Quý Bình Sinh',
      'tu_ngoc_hang': 'Tứ Hoàng Tử (Tử Ngọc Hằng)',
      'cung_sinh': 'Quân Thần Cung Sinh',
      'chu_bat_ninh': 'Chu Bất Ninh',
      'co_vo_phap': 'Quỷ Y Cơ Vô Pháp',
      'co_vo_thien': 'Cơ Vô Thiên',
      'he_nhan_cong_chua': 'Hề Nhan Công Chúa',
      'trieu_van_du': 'Triệu Văn Dụ',
      'vu_van_chau': 'Vu Văn Châu',
      'tram_hao': 'Trầm Hạo',
      'quy_binh_xuyen': 'Quý Bình Xuyên'
    };
    return map[charId] || 'Nhân Vật';
  }

  public renderCurrentDialogue(): void {
    if (this.choiceModal && (!this.ink.hasChoices() || this.store.getState().currentTextIndex < this.ink.currentText.length - 1)) {
      this.choiceModal.classList.add('hidden');
    }

    if (!this.ink.currentText || this.ink.currentText.length === 0) return;

    let s = this.store.getState();
    if (s.currentTextIndex >= this.ink.currentText.length) {
      this.store.setState({ currentTextIndex: 0 });
      s = this.store.getState();
    }
    const line = this.ink.currentText[s.currentTextIndex] || "";
    const trimmedLine = line.trim();
    const prevLine = s.currentTextIndex > 0 ? (this.ink.currentText[s.currentTextIndex - 1] || "") : "";

    // Phân tích Người Nói & Chức Danh
    let speakerName = "Người Dẫn Truyện";
    let speakerSub = `Hồi ${this.ink.variables.chapter || 1} · Sử Ký Đại Vũ`;
    let sealGlyph = "史";
    let isNarrator = false;
    let actorType: 'narrator' | 'player' | 'npc' | 'system' = 'narrator';
    let npcPath = '';

    const isSystem = trimmedLine.startsWith("[HỆ THỐNG]") || trimmedLine.includes("[HỆ THỐNG]") ||
                    trimmedLine.startsWith("[THIÊN CƠ") || trimmedLine.includes("[THIÊN CƠ") ||
                    trimmedLine.startsWith("【") || trimmedLine.startsWith("⟨");

    const isQuoted = trimmedLine.startsWith('"') || trimmedLine.startsWith('“') || trimmedLine.startsWith("'") || trimmedLine.startsWith('「');
    const hasColonDialogue = trimmedLine.includes(': "') || trimmedLine.includes(': “') || trimmedLine.includes('：') || trimmedLine.includes(':"');

    if (isSystem) {
      speakerName = "Thiên Cơ Hệ Thống";
      speakerSub = "Trí Huệ Tam Quốc Xuyên Không";
      sealGlyph = "天";
      actorType = 'system';
    } else if (!isQuoted && !hasColonDialogue) {
      // PURE NARRATION: Lời dẫn truyện thuần túy -> Ẩn toàn bộ standee
      speakerName = "Người Dẫn Truyện";
      speakerSub = `Hồi ${this.ink.variables.chapter || 1} · Sử Ký Đại Vũ`;
      sealGlyph = "史";
      isNarrator = true;
      actorType = 'narrator';
    } else {
      // DIALOGUE LINE: Phân định danh tính người nói
      const colonMatch = trimmedLine.match(/^([^"“「]+)[:：]\s*["“「]/);
      const prefix = colonMatch ? colonMatch[1].trim().toLowerCase() : "";
      const lineLower = trimmedLine.toLowerCase();
      const prevLower = prevLine.toLowerCase();

      if (prefix.includes("quý bình an") || prefix.includes("phò mã") || lineLower.includes("bình tĩnh lại") ||
          lineLower.includes("địa tác tỳ bà") || lineLower.includes("tử long mau bình thân") ||
          lineLower.includes("xem ra vũ hoàng") || lineLower.includes("vệ lâu chủ, thương phẩm này")) {
        speakerName = "Quý Bình An";
        speakerSub = "Phò Mã Gia · Trấn Quốc Công Tử";
        sealGlyph = "駙";
        actorType = 'player';
      } else if (prefix.includes("tiểu thúy") || prefix.includes("tỳ nữ") || lineLower.includes("phò mã gia! ngài rốt cuộc") ||
                 lineLower.includes("dạ bẩm... nam ly phái") || prevLower.includes("tiểu thúy") || prevLower.includes("tỳ nữ")) {
        speakerName = "Tiểu Thúy";
        speakerSub = "Tỳ Nữ Cung Đình · Phò Mã Phủ";
        sealGlyph = "侍";
        actorType = 'npc';
        npcPath = 'assets/images/actor_servant.png';
      } else if (prefix.includes("vũ hoàng") || lineLower.includes("hảo! hảo một câu") || lineLower.includes("ban thưởng phò mã") ||
                 lineLower.includes("ngươi đối cho trẫm") || lineLower.includes("bắc cương phản nghịch") ||
                 prevLower.includes("vũ hoàng") || (lineLower.includes("trẫm") && !lineLower.includes("quý bình an"))) {
        speakerName = "Vũ Hoàng";
        speakerSub = "Đại Vũ Hoàng Đế · Cửu Ngũ Chí Tôn";
        sealGlyph = "武";
        actorType = 'npc';
        npcPath = 'assets/images/actor_vu_hoang.png';
      } else if (prefix.includes("sứ thần") || prefix.includes("nam ly") || lineLower.includes("bệ hạ đại vũ") ||
                 lineLower.includes("thiên đương kỳ bàn") || lineLower.includes("nam ly ta") || prevLower.includes("sứ thần")) {
        speakerName = "Sứ Thần Nam Ly";
        speakerSub = "Sứ Đoàn Phương Nam · Đệ Nhất Học Sĩ";
        sealGlyph = "使";
        actorType = 'npc';
        npcPath = 'assets/images/actor_nam_ly_envoy.png';
      } else if (prefix.includes("triệu vân") || prefix.includes("tử long") || lineLower.includes("triệu vân, triệu tử long") ||
                 lineLower.includes("tử long nguyện đem long đảm") || lineLower.includes("chúa công, bọn chúng là tử sĩ") ||
                 lineLower.includes("mạt tướng phụng mệnh")) {
        speakerName = "Triệu Tử Long";
        speakerSub = "Thường Sơn Hổ Tướng · Hoàng Cảnh Sơ Kỳ";
        sealGlyph = "趙";
        actorType = 'npc';
        npcPath = 'assets/images/actor_trieu_van.png';
      } else if (prefix.includes("vệ ti vũ") || prefix.includes("vệ lâu chủ") || lineLower.includes("hương thơm thoát tục") ||
                 lineLower.includes("tiện thiếp nhận") || prevLower.includes("vệ ti vũ")) {
        speakerName = "Vệ Ti Vũ";
        speakerSub = "Lâu Chủ Thiên Kim Lâu · Phong Hoa Tuyệt Đại";
        sealGlyph = "衛";
        actorType = 'npc';
        npcPath = 'assets/images/actor_ve_ti_vu.png';
      } else if (prefix.includes("cao thuận") || lineLower.includes("hãm trận doanh") || lineLower.includes("hãm trận")) {
        speakerName = "Cao Thuận";
        speakerSub = "Thống Soái Hãm Trận Doanh · Vạn Kim Võ Tướng";
        sealGlyph = "高";
        actorType = 'npc';
        npcPath = 'assets/images/actor_cao_thuan.png';
      } else if (prefix.includes("giả hủ") || prefix.includes("cổ hủ") || prefix.includes("văn hòa") || lineLower.includes("độc kế")) {
        speakerName = "Giả Hủ (Văn Hòa)";
        speakerSub = "Tuyệt Thế Độc Sĩ · Mưu Định Tam Quốc";
        sealGlyph = "賈";
        actorType = 'npc';
        npcPath = 'assets/images/actor_gia_hu.png';
      } else if (prefix.includes("điển vi") || lineLower.includes("ác lai")) {
        speakerName = "Điển Vi";
        speakerSub = "Cổ Chi Ác Lai · Hộ Pháp Hùng Tướng";
        sealGlyph = "典";
        actorType = 'npc';
        npcPath = 'assets/images/actor_dien_vi.png';
      } else if (prefix.includes("tô kiến phong") || lineLower.includes("tô tướng quân")) {
        speakerName = "Tô Kiến Phong";
        speakerSub = "Chấn Uy Tướng Quân Đại Vũ";
        sealGlyph = "蘇";
        actorType = 'npc';
        npcPath = 'assets/images/actor_to_kien_phong.png';
      } else if (prefix.includes("thích khách") || lineLower.includes("nạp mạng đi") || lineLower.includes("chết đi")) {
        speakerName = "Hắc Y Thích Khách";
        speakerSub = "Dạ Hành Sát Thủ · Phi Báo Quân";
        sealGlyph = "刺";
        actorType = 'npc';
        npcPath = 'assets/images/actor_assassin.png';
      } else {
        speakerName = "Quý Bình An";
        speakerSub = "Phò Mã Gia · Trấn Quốc Công Tử";
        sealGlyph = "駙";
        actorType = 'player';
      }
    }

    if (this.speakerNameEl) this.speakerNameEl.textContent = speakerName;
    if (this.speakerSubEl) this.speakerSubEl.textContent = speakerSub;
    if (this.speakerSealEl) this.speakerSealEl.textContent = sealGlyph;

    // QUY TẮC HIỂN THỊ STANDEE:
    if (isNarrator) {
      // 1. Nếu là người dẫn truyện: TUYỆT ĐỐI KHÔNG HIỆN BẤT KỲ STANDEE NÀO HẾT
      this.actorLeftSlot?.classList.add('hidden');
      this.actorLeftSlot?.classList.remove('speaking', 'listening');
      this.actorRightSlot?.classList.add('hidden');
      this.actorRightSlot?.classList.remove('speaking', 'listening');
    } else if (actorType === 'system') {
      // 2. Nếu là Thiên Cơ Hệ Thống: Ethereal voice, Quý Bình An lắng nghe, ẩn NPC
      this.actorLeftSlot?.classList.add('hidden');
      this.actorLeftSlot?.classList.remove('speaking', 'listening');
      if (this.actorRightSlot) {
        this.actorRightSlot.classList.remove('hidden');
        this.actorRightSlot.classList.remove('speaking');
        this.actorRightSlot.classList.add('listening');
      }
    } else if (actorType === 'player') {
      // 3. Quý Bình An Nói: Right Slot speaking, Left Slot listening (nếu có NPC hiện diện)
      if (this.actorRightSlot) {
        this.actorRightSlot.classList.remove('hidden');
        this.actorRightSlot.classList.add('speaking');
        this.actorRightSlot.classList.remove('listening');
      }
      if (this.currentLeftActor && this.actorLeftSlot) {
        this.actorLeftSlot.classList.remove('hidden');
        this.actorLeftSlot.classList.add('listening');
        this.actorLeftSlot.classList.remove('speaking');
      } else {
        this.actorLeftSlot?.classList.add('hidden');
        this.actorLeftSlot?.classList.remove('speaking', 'listening');
      }
    } else if (actorType === 'npc') {
      // 4. NPC Nói: Left Slot speaking với Standee chuẩn xác, Right Slot (Quý Bình An) listening
      if (this.actorLeftSlot) {
        this.actorLeftSlot.classList.remove('hidden');
        this.actorLeftSlot.classList.add('speaking');
        this.actorLeftSlot.classList.remove('listening');
        if (this.actorLeftNametag) this.actorLeftNametag.textContent = speakerName;
        if (this.actorLeftImg && npcPath) {
          if (!this.actorLeftImg.src.endsWith(npcPath)) {
            this.actorLeftImg.src = npcPath;
            this.actorLeftImg.alt = speakerName;
          }
        }
      }
      this.currentLeftActor = { id: speakerName, name: speakerName, path: npcPath };

      if (this.actorRightSlot) {
        this.actorRightSlot.classList.remove('hidden');
        this.actorRightSlot.classList.add('listening');
        this.actorRightSlot.classList.remove('speaking');
      }
    }

    // Lưu vào lịch sử thoại (Backlog)
    if (!s.dialogueHistory.some(h => h.text === line)) {
      this.store.setState({
        dialogueHistory: [...s.dialogueHistory, { speaker: speakerName, title: speakerSub, text: line }]
      });
      this.renderBacklog();
    }

    // Typewriter
    clearInterval(this.typewriterTimer);
    if (this.dialogueTextEl) this.dialogueTextEl.textContent = '';
    this.store.setState({ isTyping: true });
    let charIdx = 0;

    this.typewriterTimer = setInterval(() => {
      if (charIdx < line.length) {
        if (this.dialogueTextEl) this.dialogueTextEl.textContent += line[charIdx];
        charIdx++;
      } else {
        clearInterval(this.typewriterTimer);
        this.store.setState({ isTyping: false });
        if (s.currentTextIndex >= this.ink.currentText.length - 1) {
          this.checkInkChoices();
        }
        if (this.isAutoReading) {
          this.scheduleAutoRead();
        }
      }
    }, 14);

    // Đồng bộ biến Ink sang GameStateStore
    this.store.setState({
      gold: this.ink.variables.gold !== undefined ? this.ink.variables.gold : s.gold,
      suspicion: this.ink.variables.suspicion !== undefined ? this.ink.variables.suspicion : s.suspicion,
      food: this.ink.variables.rations !== undefined ? this.ink.variables.rations : s.food
    });
  }

  public advanceDialogue(): void {
    const s = this.store.getState();

    // Nếu đang gõ, lập tức hiển thị toàn bộ câu thoại
    if (s.isTyping) {
      clearInterval(this.typewriterTimer);
      const line = this.ink.currentText[s.currentTextIndex] || "";
      if (this.dialogueTextEl) this.dialogueTextEl.textContent = line;
      this.store.setState({ isTyping: false });
      if (s.currentTextIndex >= this.ink.currentText.length - 1) {
        this.checkInkChoices();
      }
      return;
    }

    // Nếu đang hiện bảng lựa chọn, chặn tiến tiếp
    if (this.choiceModal && !this.choiceModal.classList.contains('hidden')) return;

    this.audio.playWoodClick();

    if (s.currentTextIndex < this.ink.currentText.length - 1) {
      this.store.setState({ currentTextIndex: s.currentTextIndex + 1 });
      this.renderCurrentDialogue();
    } else {
      // Đã tới cuối knot
      if (this.ink.hasChoices()) {
        this.checkInkChoices();
      } else if (this.ink.canAutoContinue()) {
        this.ink.continueStory();
        this.store.setState({ currentTextIndex: 0 });
        this.renderCurrentDialogue();
      } else {
        this.bus.emit('SHOW_TOAST', "[ 密 · MẬT CHỈ ] Tiết tấu tạm lắng. Hãy thẩm định Sa Bàn Quân Cơ hoặc Niên Biểu để tiếp nối đại nghiệp.");
      }
    }
  }

  private checkInkChoices(): void {
    const s = this.store.getState();
    if (s.currentTextIndex < this.ink.currentText.length - 1) return;

    if (this.ink.hasChoices() && this.choiceModal) {
      if (this.choiceQuestion) this.choiceQuestion.textContent = "THIÊN ĐỊNH CHI THỜI · ĐỐI SÁCH QUYỀN MƯU";
      if (this.choiceGrid) this.choiceGrid.innerHTML = '';

      const numGlyphs = ["壹", "贰", "叁", "肆", "伍"];

      this.ink.currentChoices.forEach((c, idx) => {
        let tagText = "QUYẾT SÁCH";
        let tagClass = "";
        let displayText = c.text;

        const bracketMatch = c.text.match(/^\[(.*?)\]\s*(.*)$/);
        const dotMatch = c.text.match(/^([^·\n]{2,14})\s*·\s*(.*)$/);
        if (bracketMatch) {
          tagText = bracketMatch[1].trim().toUpperCase();
          displayText = bracketMatch[2].trim();
        } else if (dotMatch) {
          tagText = dotMatch[1].trim().toUpperCase();
          displayText = dotMatch[2].trim();
        }

        const upperTag = tagText.toUpperCase();
        if (upperTag.includes("ẨN NHẪN") || upperTag.includes("THĂM DÒ") || upperTag.includes("KHIÊM CUNG") || upperTag.includes("DÒ XÉT")) {
          tagClass = "tag-amber";
        } else if (upperTag.includes("SÁT PHẠT") || upperTag.includes("HOÀNH ĐAO") || upperTag.includes("QUYẾT CHIẾN") || upperTag.includes("XUẤT THẾ") || upperTag.includes("ĐỐI NGHỊCH") || upperTag.includes("BÁ ĐẠO")) {
          tagClass = "tag-crimson";
        } else if (upperTag.includes("THIÊN CƠ") || upperTag.includes("TRIỆU HOÁN") || upperTag.includes("THẦN ĐÀN") || upperTag.includes("TRÙNG SINH") || upperTag.includes("KHẢO NGHIỆM")) {
          tagClass = "tag-cyan";
        } else if (upperTag.includes("QUÂN CƠ") || upperTag.includes("THỦY CÔNG") || upperTag.includes("KINH TÀI") || upperTag.includes("HỢP TÁC") || upperTag.includes("NHÂN NGHĨA") || upperTag.includes("VƯƠNG ĐẠO") || upperTag.includes("KHẢI HOÀN") || upperTag.includes("ĐẾ NGHIỆP")) {
          tagClass = "tag-emerald";
        }

        const choiceCard = document.createElement('div');
        choiceCard.className = 'choice-card-btn';
        choiceCard.innerHTML = `
          <div class="choice-left-meta">
            <span class="choice-num-badge">${numGlyphs[idx] || (idx + 1)}</span>
            <span class="choice-card-title">${displayText}</span>
          </div>
          <span class="choice-right-tag ${tagClass}">${tagText}</span>
        `;
        choiceCard.addEventListener('click', () => {
          this.audio.playSealStamp();
          this.choiceModal.classList.add('hidden');
          this.ink.makeChoice(idx);
          this.store.setState({ currentTextIndex: 0 });
          const cleanExcerpt = displayText.length > 32 ? displayText.substring(0, 32) + '...' : displayText;
          if (this.branchIndicatorEl) this.branchIndicatorEl.textContent = `Quyết Sách: ${cleanExcerpt}`;
          this.bus.emit('SHOW_TOAST', `Đã định: ${cleanExcerpt}`);
          this.renderCurrentDialogue();
        });
        this.choiceGrid.appendChild(choiceCard);
      });

      this.choiceModal.classList.remove('hidden');
    }
  }

  private scheduleAutoRead(): void {
    clearTimeout(this.autoTimer);
    if (!this.isAutoReading) return;
    this.autoTimer = setTimeout(() => {
      if (this.isAutoReading && (!this.choiceModal || this.choiceModal.classList.contains('hidden'))) {
        this.advanceDialogue();
      }
    }, 2200);
  }

  private openBacklog(): void {
    this.renderBacklog();
    this.backlogDrawer?.classList.remove('hidden');
  }

  private renderBacklog(): void {
    if (!this.backlogBody) return;
    const history = this.store.getState().dialogueHistory;
    this.backlogBody.innerHTML = history.map(item => `
      <div class="log-entry">
        <div class="log-speaker-row">
          <span class="log-speaker-seal">${item.speaker[0] || '史'}</span>
          <span class="log-speaker-name">${item.speaker}</span>
          <span class="log-speaker-sub">${item.title}</span>
        </div>
        <div class="log-text">${item.text}</div>
      </div>
    `).join('');
    this.backlogBody.scrollTop = this.backlogBody.scrollHeight;
  }
}
