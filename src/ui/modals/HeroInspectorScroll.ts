/**
 * HeroInspectorScroll.ts — Tranh Cuộn Thủy Mặc Tra Cứu & Nâng Cấp Danh Tướng
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * TRIỆT TIÊU 100% BỆNH "WEB DASHBOARD / E-COMMERCE / SAAS":
 * - Mọi thông tin nằm trên Trục Thư Lụa Gấm & Xuyến Chỉ Cổ Điển
 * - Không có thẻ thống kê KPI số to, không có giỏ hàng Shopify, không có nút phẳng văn phòng
 * - Duyệt 29 Danh Tướng bằng "Trúc Phù Giá" (Giá Thẻ Tre Khắc Tên Cổ Phong)
 * - 5 Trọng Trận Khắc Minh:
 *   1. Thần Binh Khắc Minh Đài (Khắc triện chu sa thần binh)
 *   2. Bổn Mệnh Thư Giản (Thẻ tre ghi chép chân kinh công pháp)
 *   3. Thiên Phú Tinh Đồ (Bát Quái sao trời phá trần võ đạo)
 *   4. Mã Phù Tiết (Hổ Phù / Mã Phù đồng thau khớp nối)
 *   5. Cửu Đỉnh Luyện Khí (Đỉnh đồng hun đúc chân khí bồi dưỡng võ lực)
 * - Cảnh giới võ đạo tự động phân cấp theo điểm võ lực:
 *   < 90: Vương Giả | 90-99: Hoàng Giả | 100-149: Đế Cấp | 150+: Bán Thánh
 * - Cơ chế Phản Chủ võ lực cho Quý Bình An thời gian thực
 */

import { DataLoader } from '../../core/DataLoader';
import { HeroProgressionData } from '../../core/types';
import { GameStateStore } from '../../core/GameStateStore';
import { AudioSynthesizer } from '../../audio/AudioSynthesizer';
import { 
  CANON_HEROES, 
  CANON_HEROES_BY_ID, 
  resolveCanonHero, 
  CanonHeroConfig 
} from '../../core/canonHeroesData';

const HERO_SEAL_GLYPHS: Record<string, string> = {
  trieu_van: '趙',
  ma_tac: '馬',
  co_hu: '賈',
  dien_vi: '典',
  ly_nho: '李',
  dieu_thuyen: '貂',
  hoa_hung: '華',
  khuc_nghia: '麴',
  truong_lieu: '張',
  cao_thuan: '高',
  tuan_uc: '荀',
  chu_du: '周',
  hoang_trung: '黃',
  hi_chi_tai: '戲',
  ma_sieu: '馬',
  hoa_da: '華',
  quach_gia: '郭',
  hac_chieu: '郝',
  truong_phi: '張',
  hua_chu: '許',
  cam_ninh: '甘',
  quan_vu: '關',
  gia_cat_luong: '諸',
  bang_duc: '龐',
  thai_su_tu: '太',
  lu_bo: '呂',
  bang_thong: '龐',
  tu_ma_y: '司',
  van_uong: '文'
};

export class HeroInspectorScroll {
  private container: HTMLElement;
  private store?: GameStateStore;
  private audio?: AudioSynthesizer;
  private currentHeroId: string = 'trieu_van';
  private activeCategory: string = 'all';

  constructor(
    containerId: string = 'hero-inspector-modal',
    store?: GameStateStore,
    audio?: AudioSynthesizer
  ) {
    let el = document.getElementById(containerId);
    if (!el) {
      el = document.createElement('div');
      el.id = containerId;
      el.className = 'hero-scroll-overlay hidden';
      document.body.appendChild(el);
    }
    this.container = el;
    this.store = store;
    this.audio = audio;

    this.renderBase();
    this.bindEvents();
  }

  private renderBase(): void {
    this.container.innerHTML = `
      <div class="ancient-scroll-frame" id="ancient-scroll-frame">
        <!-- Trục gỗ cuộn tranh hai bên -->
        <div class="scroll-roller left-roller"></div>

        <!-- Thân tranh lụa xuyến chỉ -->
        <div class="scroll-parchment">
          <!-- 1. TIÊU ĐỀ THƯ TRỤC HOÀNG GIA & ẤN TRIỆN CHU SA (KHÔNG PHẢI STAT BOXES) -->
          <div class="scroll-imperial-header">
            <div class="imperial-charter-title">
              <span class="imperial-seal-dragonglyph">❖</span>
              <span class="imperial-title-text">PHÒ MÃ PHỦ · TAM QUỐC ANH LINH PHONG THẦN BẢNG</span>
              <span class="imperial-seal-dragonglyph">❖</span>
            </div>

            <div class="imperial-calligraphy-stats">
              <!-- Triện Chu Sa: Quý Bình An -->
              <div class="imperial-stamp-unit host-unit" title="Võ lực bản thân Quý Bình An (Hấp thu chân khí từ Anh Linh)">
                <span class="seal-box-cinnabar">駙</span>
                <div class="stamp-meta">
                  <span class="stamp-label">Phò Mã Quý Bình An · Chân Khí Bổn Thể</span>
                  <span class="stamp-value"><strong id="scroll-host-force">5</strong> <em class="stat-unit">Điểm</em></span>
                </div>
              </div>

              <!-- Triện Hoàng Kim: Ngân Khố Quốc Gia -->
              <div class="imperial-stamp-unit treasury-unit" title="Ngân khố vàng dùng bồi dưỡng và mở phong ấn anh linh">
                <span class="seal-box-gold">金</span>
                <div class="stamp-meta">
                  <span class="stamp-label">Ngân Khố Triều Đình</span>
                  <span class="stamp-value"><strong id="scroll-gold-display">0</strong> <em class="stat-unit">Lượng Vàng</em></span>
                </div>
              </div>
            </div>

            <!-- Nút Thu Hồi Tranh Cuộn (Dấu Ấn Triện Đóng Lại) -->
            <button class="scroll-close-seal" id="btn-close-scroll" title="Thu Hồi Tranh Cuộn">
              <span class="close-seal-icon">收</span>
              <span class="close-seal-text">Thu Hồi</span>
            </button>
          </div>

          <!-- 2. GIÁ TRÚC PHÙ DUYỆT TƯỚNG (BAMBOO TALLY RACK) — KHÔNG DÙNG NÚT DẸT TAB LỌC -->
          <div class="bamboo-rack-section">
            <div class="tally-category-tags">
              <button class="tally-tag active" data-cat="all">
                <span class="tag-glyph">皆</span> Toàn Bộ (29)
              </button>
              <button class="tally-tag" data-cat="vo">
                <span class="tag-glyph">武</span> Võ Tướng (18)
              </button>
              <button class="tally-tag" data-cat="muu">
                <span class="tag-glyph">謀</span> Mưu Thần (8)
              </button>
              <button class="tally-tag" data-cat="nu_khac">
                <span class="tag-glyph">巾</span> Nữ Thần & Dị Sĩ (3)
              </button>
            </div>

            <!-- Thanh thẻ tre trượt êm không lộ scrollbar thô -->
            <div class="bamboo-tallies-viewport" id="bamboo-tallies-viewport">
              <div class="bamboo-tallies-row" id="bamboo-tallies-row"></div>
            </div>
          </div>

          <!-- Thông báo chấn động (Diegetic Notice) -->
          <div class="scroll-notice-banner hidden" id="scroll-notice-banner"></div>

          <!-- 3. NỘI DUNG DANH TƯỚNG & NGŨ TRỌNG KHẮC MINH -->
          <div class="scroll-hero-body" id="scroll-hero-content"></div>
        </div>

        <div class="scroll-roller right-roller"></div>
      </div>
    `;
  }

  private bindEvents(): void {
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target === this.container || target.id === 'btn-close-scroll' || target.closest('#btn-close-scroll')) {
        this.close();
      }
    });

    // Lọc thẻ tre theo phân loại
    const tallyTags = this.container.querySelectorAll('.tally-tag');
    tallyTags.forEach((tag) => {
      tag.addEventListener('click', (e) => {
        const btn = e.currentTarget as HTMLElement;
        const cat = btn.getAttribute('data-cat') || 'all';
        this.activeCategory = cat;
        tallyTags.forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');
        this.audio?.playWoodClick();
        this.renderBambooTallies();
      });
    });
  }

  public open(heroId: string = 'trieu_van'): void {
    const canon = resolveCanonHero(heroId);
    this.currentHeroId = canon ? canon.id : 'trieu_van';

    this.updateHeaderStats();
    this.renderBambooTallies();
    this.renderHeroContent();
    this.container.classList.remove('hidden');
  }

  public close(): void {
    this.container.classList.add('hidden');
  }

  private updateHeaderStats(): void {
    const state = this.store?.getState();
    const hostForceEl = this.container.querySelector('#scroll-host-force');
    const goldEl = this.container.querySelector('#scroll-gold-display');

    if (hostForceEl) hostForceEl.textContent = `${state?.hostForce ?? 5}`;
    if (goldEl) goldEl.textContent = (state?.gold ?? 0).toLocaleString();
  }

  private getHeroPortraitUrl(heroId: string): string {
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
    return actorMap[heroId] || 'assets/images/seal_placeholder.webp';
  }

  private renderBambooTallies(): void {
    const talliesRow = this.container.querySelector('#bamboo-tallies-row');
    if (!talliesRow) return;

    let filtered = CANON_HEROES;
    if (this.activeCategory === 'vo') {
      filtered = CANON_HEROES.filter((h) => h.primaryClass === 'Võ Tướng');
    } else if (this.activeCategory === 'muu') {
      filtered = CANON_HEROES.filter((h) => h.primaryClass === 'Mưu Thần');
    } else if (this.activeCategory === 'nu_khac') {
      filtered = CANON_HEROES.filter((h) => h.primaryClass !== 'Võ Tướng' && h.primaryClass !== 'Mưu Thần');
    }

    talliesRow.innerHTML = filtered.map((h) => {
      const isActive = h.id === this.currentHeroId ? 'active' : '';
      const sealChar = h.primaryClass === 'Mưu Thần' ? '謀' :
                       h.primaryClass === 'Tuyệt Thế Nữ Thần' ? '巾' :
                       h.primaryClass === 'Kỳ Nhân Dị Sĩ' ? '異' : '武';

      return `
        <div class="bamboo-tally ${isActive}" data-hero-id="${h.id}" title="${h.name}: ${h.classRoleBadge}">
          <div class="tally-cord-hole"></div>
          <span class="tally-seal-glyph">${sealChar}</span>
          <span class="tally-hero-name">${h.name}</span>
          <span class="tally-role-badge">${h.role}</span>
        </div>
      `;
    }).join('');

    // Gắn sự kiện chuyển thẻ tre
    talliesRow.querySelectorAll('.bamboo-tally').forEach((tally) => {
      tally.addEventListener('click', (e) => {
        const el = e.currentTarget as HTMLElement;
        const targetId = el.getAttribute('data-hero-id');
        if (targetId) {
          this.audio?.playWoodClick();
          this.currentHeroId = targetId;
          this.renderBambooTallies();
          this.renderHeroContent();
        }
      });
    });
  }

  private renderHeroContent(): void {
    const contentEl = this.container.querySelector('#scroll-hero-content');
    if (!contentEl) return;

    const heroConfig = CANON_HEROES_BY_ID[this.currentHeroId] || CANON_HEROES[0];
    const prog = this.store?.getHeroProgression(heroConfig.id) || {
      baseForce: heroConfig.baseStats.force,
      currentForce: heroConfig.baseStats.force,
      martialRealm: heroConfig.baseStats.force < 90 ? 'Vương Giả Cảnh' : 'Hoàng Giả Cảnh',
      loyalty: 100,
      hasWeapon: false,
      weaponName: heroConfig.weapon.name,
      weaponForceBonus: 0,
      unlockedSkillNames: [],
      skillForceBonus: 0,
      hasSpecialTalent: false,
      specialTalentName: heroConfig.specialTalent.name,
      talentForceBonus: 0,
      hasMount: false,
      mountName: heroConfig.mount.name,
      mountForceBonus: 0,
      directForceUpgrades: 0,
      hostForceGiven: 0
    };

    const state = this.store?.getState();
    const gold = state?.gold ?? 0;

    // Tứ Duy & Radar
    const totalForce = prog.currentForce;
    const totalCmd = heroConfig.baseStats.command;
    const totalInt = heroConfig.baseStats.intelligence;
    const totalPol = heroConfig.baseStats.politics;

    const maxVal = Math.max(140, totalForce, totalCmd, totalInt, totalPol) + 10;
    const topY = 80 - (totalForce / maxVal) * 60;
    const rightX = 80 + (totalCmd / maxVal) * 60;
    const bottomY = 80 + (totalPol / maxVal) * 60;
    const leftX = 80 - (totalInt / maxVal) * 60;

    // Phẩm cấp
    const isUR = heroConfig.role.includes('Thiên Mệnh') || heroConfig.baseStats.force >= 92;
    const rarityLabel = isUR ? 'CHÍ TÔN [UR]' : 'TUYỆT THẾ [SSR]';
    const rarityClass = isUR ? 'ur' : 'ssr';

    const archetypeClass = heroConfig.primaryClass === 'Mưu Thần' ? 'archetype-muu-than' :
                           heroConfig.primaryClass === 'Tuyệt Thế Nữ Thần' ? 'archetype-hong-nhan' : 'archetype-vo-tuong';

    const portraitUrl = this.getHeroPortraitUrl(heroConfig.id);

    // Điều kiện mở khóa
    const canBuyWeapon = !prog.hasWeapon && gold >= (heroConfig.weapon.costGold || 10000);
    const canUnlockTalent = !prog.hasSpecialTalent && gold >= (heroConfig.specialTalent.costGold || 100000);
    const canBuyMount = !prog.hasMount && gold >= (heroConfig.mount.costGold || 50000);
    const canTrainMartial = gold >= 5000;

    contentEl.innerHTML = `
      <div class="scroll-hero-grid">
        <!-- CỘT 1: HỌA ẢNH THỦY MẶC LIỀN KHỐI, TRIỆN CHU SA & CẢNH GIỚI VÕ ĐẠO -->
        <div class="scroll-portrait-col">
          <div class="scroll-silk-portrait">
            <img src="${portraitUrl}" alt="${heroConfig.name}" class="scroll-silk-img" id="hero-portrait-img">
            <!-- Dấu Triện Chu Sa Đóng Góc Lụa -->
            <div class="scroll-cinnabar-seal-stamp">
              <span class="seal-char">${HERO_SEAL_GLYPHS[heroConfig.id] || '武'}</span>
            </div>
            <!-- Dải Lụa Phẩm Cấp Cổ Phong -->
            <div class="scroll-rarity-silk-badge ${rarityClass}">
              <span>${rarityLabel}</span>
            </div>
          </div>

          <!-- THÁNH CHỈ CẢNH GIỚI VÕ ĐẠO (8 TẦNG NGUYÊN TÁC TIỂU THUYẾT) -->
          <div class="scroll-realm-decree">
            <div class="decree-header">
              <span class="decree-seal">敕</span>
              <span class="decree-lbl">VÕ ĐẠO CẢNH GIỚI:</span>
              <span class="decree-realm">${prog.martialRealm}</span>
            </div>
            <span class="decree-force-summary">Tổng Uy Áp Sa Trường: <strong>${totalForce}</strong> Điểm Võ Lực</span>
          </div>

          <!-- CÂU TUYÊN THỆ XUẤT THẾ THƯ PHÁP -->
          <div class="scroll-silk-calligraphy">
            <span>『${heroConfig.quote}』</span>
          </div>
        </div>

        <!-- CỘT 2: LÝ LỊCH, THẠCH BIA TỨ DUY & NGŨ TRỌNG KHẮC MINH -->
        <div class="scroll-info-col">
          <div class="scroll-header-area">
            <div class="scroll-tags-row">
              <span class="scroll-dynasty-tag">ĐẠI HÁN · QUÝ GIA</span>
              <div class="hero-archetype-badge ${archetypeClass}">
                ${heroConfig.classRoleBadge}
              </div>
              <span class="scroll-summon-tier-badge">Triệu hoán: ${heroConfig.summonTier}</span>
            </div>

            <div class="scroll-name-row">
              <h2 class="scroll-hero-name">${heroConfig.name}</h2>
              <span class="scroll-hero-courtesy">(${heroConfig.courtesyName || '—'})</span>
            </div>
          </div>

          <p class="scroll-hero-lore">${heroConfig.lore}</p>

          <!-- THẠCH BIA BÁT QUÁI TỨ DUY (CALLIGRAPHIC STELE — THAY THẾ TOÀN BỘ RADAR CHART) -->
          <div class="scroll-calligraphic-stele">
            <div class="stele-header">
              <span class="stele-seal">卦</span>
              <span class="stele-title">TỨ ĐẠI CHỈ SỐ TAM QUỐC · CHÂN KHÍ THỜI GIAN THỰC</span>
            </div>
            <div class="stele-grid">
              <div class="stele-stat vo">
                <span class="stat-seal">武</span>
                <div class="stat-info">
                  <span class="stat-name">VÕ LỰC BỘC PHÁT</span>
                  <span class="stat-value">${totalForce}</span>
                  <span class="stat-note">Gốc ${heroConfig.baseStats.force}${prog.weaponForceBonus > 0 ? ` +${prog.weaponForceBonus} Binh` : ''}${prog.skillForceBonus > 0 ? ` +${prog.skillForceBonus} Kỹ` : ''}${prog.talentForceBonus > 0 ? ` +${prog.talentForceBonus} Phú` : ''}${prog.mountForceBonus > 0 ? ` +${prog.mountForceBonus} Mã` : ''}${prog.directForceUpgrades > 0 ? ` +${prog.directForceUpgrades} Đỉnh` : ''}</span>
                </div>
              </div>
              <div class="stele-stat thong">
                <span class="stat-seal">統</span>
                <div class="stat-info">
                  <span class="stat-name">THỐNG SOÁI CHỈ HUY</span>
                  <span class="stat-value">${totalCmd}</span>
                  <span class="stat-note">${heroConfig.troopType}</span>
                </div>
              </div>
              <div class="stele-stat muu">
                <span class="stat-seal">謀</span>
                <div class="stat-info">
                  <span class="stat-name">MƯU LƯỢC QUÂN CƠ</span>
                  <span class="stat-value">${totalInt}</span>
                  <span class="stat-note">${heroConfig.primaryClass}</span>
                </div>
              </div>
              <div class="stele-stat tri">
                <span class="stat-seal">政</span>
                <div class="stat-info">
                  <span class="stat-name">TRỊ QUỐC AN DÂN</span>
                  <span class="stat-value">${totalPol}</span>
                  <span class="stat-note">${heroConfig.role}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- NGŨ TRỌNG TRẬN ĐỒ KHẮC MINH (FIVE SACRED MARTIAL INSCRIPTIONS — DIEGETIC) -->
          <div class="ngu-trong-khac-minh-panel">
            <div class="khac-minh-title">
              <span class="title-glyph">璽</span>
              NGŨ TRỌNG TRẬN ĐỒ KHẮC MINH · ANH LINH THẦN ĐÀI BỒI DƯỠNG
            </div>

            <!-- 1. TRỌNG 1: THẦN BINH KHẮC MINH ĐÀI -->
            <div class="inscribed-seal-card ${prog.hasWeapon ? 'inscribed' : ''}">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 1: THẦN BINH TRUYỀN THẾ</span>
                <strong class="inscribe-name">${heroConfig.weapon.name}</strong>
                <span class="inscribe-lore">Tăng +${heroConfig.weapon.forceBonus} Võ Lực. ${heroConfig.weapon.specialEffect || ''}</span>
                <span class="inscribe-feedback">Phản chủ Quý Bình An +2 Võ Lực vĩnh viễn.</span>
              </div>
              <div class="inscribe-stamp-action">
                ${prog.hasWeapon ? 
                  `<div class="completed-cinnabar-seal">
                    <span class="seal-glyph">銘</span>
                    <span class="seal-text">ĐÃ KHẮC MINH</span>
                  </div>` :
                  `<button class="diegetic-seal-stamp-btn" id="btn-unlock-weapon" ${!canBuyWeapon ? 'disabled' : ''}>
                    <span class="stamp-char">銘</span>
                    <span class="stamp-action">Khắc Triện</span>
                    <span class="stamp-cost">10.000 Vàng</span>
                  </button>`
                }
              </div>
            </div>

            <!-- 2. TRỌNG 2: BỔN MỆNH THƯ GIẢN (CÔNG PHÁP) -->
            <div class="inscribed-seal-card">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 2: BỔN MỆNH THƯ GIẢN</span>
                <strong class="inscribe-name">Vũ Kỹ & Tuyệt Học Bản Mệnh</strong>
                <span class="inscribe-lore">Lĩnh ngộ chiêu thức tăng +2 Võ Lực mỗi kỹ năng:</span>
                <div style="display: flex; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
                  ${heroConfig.skills.map((s) => {
                    const isLearned = prog.unlockedSkillNames.includes(s.name);
                    const canLearn = !isLearned && gold >= (s.costGold || 1000);
                    return isLearned ?
                      `<span class="completed-cinnabar-seal" style="padding: 2px 8px; font-size: 11px;">
                        <span class="seal-glyph" style="font-size: 14px;">悟</span> ${s.name} (+${s.forceBonus})
                      </span>` :
                      `<button class="diegetic-seal-stamp-btn btn-learn-skill" data-skill-name="${s.name}" ${!canLearn ? 'disabled' : ''} style="padding: 3px 8px;">
                        <span class="stamp-char" style="font-size: 14px;">悟</span> ${s.name} (${s.costGold}V)
                      </button>`;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- 3. TRỌNG 3: THIÊN PHÚ TINH ĐỒ (BÁT QUÁI PHÁ GIỚI) -->
            <div class="inscribed-seal-card ${prog.hasSpecialTalent ? 'inscribed' : ''}">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 3: THIÊN PHÚ TINH ĐỒ</span>
                <strong class="inscribe-name">${heroConfig.specialTalent.name}</strong>
                <span class="inscribe-lore">${heroConfig.specialTalent.description} (+${heroConfig.specialTalent.forceBonus} Võ Lực).</span>
                <span class="inscribe-feedback">Phá vỡ phong ấn thần cấp! Phản chủ Quý Bình An +5 Võ Lực!</span>
              </div>
              <div class="inscribe-stamp-action">
                ${prog.hasSpecialTalent ? 
                  `<div class="completed-cinnabar-seal gold-glow">
                    <span class="seal-glyph">破</span>
                    <span class="seal-text">ĐÃ PHÁ GIỚI</span>
                  </div>` :
                  `<button class="diegetic-seal-stamp-btn" id="btn-unlock-talent" ${!canUnlockTalent ? 'disabled' : ''}>
                    <span class="stamp-char">破</span>
                    <span class="stamp-action">Phá Ấn</span>
                    <span class="stamp-cost">100.000 Vàng</span>
                  </button>`
                }
              </div>
            </div>

            <!-- 4. TRỌNG 4: MÃ PHÙ TIẾT (LƯƠNG CÂU HỘ CHỦ) -->
            <div class="inscribed-seal-card ${prog.hasMount ? 'inscribed' : ''}">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 4: MÃ PHÙ TIẾT</span>
                <strong class="inscribe-name">${heroConfig.mount.name}</strong>
                <span class="inscribe-lore">${heroConfig.mount.description || 'Bản mệnh lương câu thần dũng vô song'} (+${heroConfig.mount.forceBonus} Võ Lực).</span>
                <span class="inscribe-feedback">Phản chủ Quý Bình An +3 Võ Lực.</span>
              </div>
              <div class="inscribe-stamp-action">
                ${prog.hasMount ? 
                  `<div class="completed-cinnabar-seal blue-glow">
                    <span class="seal-glyph">驥</span>
                    <span class="seal-text">ĐÃ KHỚP NỐI</span>
                  </div>` :
                  `<button class="diegetic-seal-stamp-btn" id="btn-unlock-mount" ${!canBuyMount ? 'disabled' : ''}>
                    <span class="stamp-char">勒</span>
                    <span class="stamp-action">Khớp Nối</span>
                    <span class="stamp-cost">50.000 Vàng</span>
                  </button>`
                }
              </div>
            </div>

            <!-- 5. TRỌNG 5: CỬU ĐỈNH LUYỆN KHÍ (VŨ KHỐ THƯƠNG THÀNH) -->
            <div class="inscribed-seal-card">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 5: CỬU ĐỈNH LUYỆN KHÍ</span>
                <strong class="inscribe-name">Tôi Thể Chân Khí (${prog.directForceUpgrades} Chu Thiên)</strong>
                <span class="inscribe-lore">Đã hun đúc: +${prog.directForceUpgrades} Võ Lực. Cứ mỗi 3 chu thiên $\\rightarrow$ Quý Bình An hấp thu +1 Võ Lực!</span>
              </div>
              <div class="inscribe-stamp-action">
                <button class="diegetic-seal-stamp-btn" id="btn-train-martial" ${!canTrainMartial ? 'disabled' : ''}>
                  <span class="stamp-char">煉</span>
                  <span class="stamp-action">Đốt Đỉnh</span>
                  <span class="stamp-cost">5.000 Vàng (+1 Võ Lực)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bắt lỗi hình ảnh nếu đường dẫn ảnh bị thiếu
    const imgEl = contentEl.querySelector('#hero-portrait-img') as HTMLImageElement;
    if (imgEl) {
      imgEl.onerror = () => {
        imgEl.style.display = 'none';
        const box = contentEl.querySelector('.scroll-standee-box');
        if (box && !box.querySelector('.standee-glyph-fallback')) {
          const fallback = document.createElement('div');
          fallback.className = 'standee-glyph-fallback';
          fallback.innerHTML = `
            <div class="fallback-calligraphy-ring">
              <span class="fallback-seal-char">${HERO_SEAL_GLYPHS[heroConfig.id] || '武'}</span>
              <span class="fallback-seal-name">${heroConfig.name}</span>
            </div>
          `;
          box.appendChild(fallback);
        }
      };
    }

    this.bindActionButtons(heroConfig);
  }

  private bindActionButtons(heroConfig: CanonHeroConfig): void {
    // 1. Thần Binh
    const btnWeapon = this.container.querySelector('#btn-unlock-weapon');
    btnWeapon?.addEventListener('click', () => {
      if (!this.store) return;
      const res = this.store.unlockHeroWeapon(heroConfig.id);
      if (res.success) {
        this.audio?.playSealStamp();
        this.showNotice(res.message, true);
        this.updateHeaderStats();
        this.renderHeroContent();
      } else {
        this.showNotice(res.message, false);
      }
    });

    // 2. Công Pháp
    this.container.querySelectorAll('.btn-learn-skill').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (!this.store) return;
        const skillName = (e.currentTarget as HTMLElement).getAttribute('data-skill-name');
        if (!skillName) return;
        const res = this.store.unlockHeroSkill(heroConfig.id, skillName);
        if (res.success) {
          this.audio?.playWoodClick();
          this.showNotice(res.message, true);
          this.updateHeaderStats();
          this.renderHeroContent();
        } else {
          this.showNotice(res.message, false);
        }
      });
    });

    // 3. Thiên Phú
    const btnTalent = this.container.querySelector('#btn-unlock-talent');
    btnTalent?.addEventListener('click', () => {
      if (!this.store) return;
      const res = this.store.unlockHeroTalent(heroConfig.id);
      if (res.success) {
        this.audio?.playThunder();
        this.container.querySelector('.ancient-scroll-frame')?.classList.add('screen-shake');
        setTimeout(() => {
          this.container.querySelector('.ancient-scroll-frame')?.classList.remove('screen-shake');
        }, 400);
        this.showNotice(res.message, true);
        this.updateHeaderStats();
        this.renderHeroContent();
      } else {
        this.showNotice(res.message, false);
      }
    });

    // 4. Ngựa Thần
    const btnMount = this.container.querySelector('#btn-unlock-mount');
    btnMount?.addEventListener('click', () => {
      if (!this.store) return;
      const res = this.store.unlockHeroMount(heroConfig.id);
      if (res.success) {
        this.audio?.playWoodClick();
        this.showNotice(res.message, true);
        this.updateHeaderStats();
        this.renderHeroContent();
      } else {
        this.showNotice(res.message, false);
      }
    });

    // 5. Tôi Luyện Vũ Khố
    const btnTrain = this.container.querySelector('#btn-train-martial');
    btnTrain?.addEventListener('click', () => {
      if (!this.store) return;
      const res = this.store.trainHeroMartialForce(heroConfig.id);
      if (res.success) {
        this.audio?.playWoodClick();
        this.showNotice(res.message, true);
        this.updateHeaderStats();
        this.renderHeroContent();
      } else {
        this.showNotice(res.message, false);
      }
    });
  }

  private showNotice(message: string, isSuccess: boolean): void {
    const noticeEl = this.container.querySelector('#scroll-notice-banner');
    if (!noticeEl) return;

    noticeEl.textContent = message;
    noticeEl.className = `scroll-notice-banner ${isSuccess ? 'notice-success' : 'notice-warning'}`;
    noticeEl.classList.remove('hidden');

    setTimeout(() => {
      noticeEl.classList.add('hidden');
    }, 3500);
  }
}
