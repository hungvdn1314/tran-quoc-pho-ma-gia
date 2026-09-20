/**
 * TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — PROTOTYPE V3
 * 
 * KIẾN TRÚC DATA-DRIVEN & INK ENGINE TÍCH HỢP:
 * 1. Nạp 100% dữ liệu chuẩn hóa từ window.GAME_DATA (28 Danh Tướng, 15 Thẻ bài, 3 Chiến dịch, 4 Tiền tệ)
 * 2. Tích hợp InkEngine thực thi kịch bản phân nhánh Ch.1 -> Ch.52 (chapter_01_to_15.ink & chapter_16_to_52.ink)
 * 3. Gacha Altar Bái Tướng Đài với công thức Pity 74-90, Bảo hiểm 50/50, triệu hoán đa dạng 28 danh tướng
 * 4. Hero Detail Inspector động với thanh chuyển đổi 28 Danh Tướng Tam Quốc, Tứ Duy, Kỹ năng, Duyên Phận
 * 5. Khóa chéo 3 Tầng (Mutual Gating) theo đúng chuẩn Game Systems Design
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DATA SOURCES INITIALIZATION (GAME_DATA)
  // =========================================================================
  const GD = window.GAME_DATA || {};
  const allHeroes = GD.heroes || [];
  const allCards = GD.cards || [];
  const allBattles = GD.battles || [];
  const allMilestones = GD.milestones || [];

  // Chapter Progression Matrix (Fallback & Enhancement)
  const chapterMatrix = [
    { id: 1, badge: "CHƯƠNG 1", title: "Phá Giải Câu Đối Hoàng Cung", knot: "chapter_1_start", featureUnlocked: "Kích Hoạt Hệ Thống & 1 Anh Hồn Lệnh", lore: "Quý Bình An xuyên không nhập thể phò mã, đối lại vế đối cái thế chấn động Vũ Hoàng.", unlocked: true, active: true },
    { id: 5, badge: "CHƯƠNG 5", title: "Bái Tướng Đài & Triệu Tử Long", knot: "chapter_5_transition", featureUnlocked: "Gacha Bái Tướng Đài & Bảng Tra Cứu Tướng", lore: "Dùng Anh Hồn Lệnh Sơ Cấp triệu hoán Triệu Vân SSR, mở khóa Bảng Tra Cứu Thuộc Tính Tứ Duy.", unlocked: false, active: false },
    { id: 8, badge: "CHƯƠNG 8", title: "Phát Minh Thấu Hoa Cao", knot: "chapter_8_transition", featureUnlocked: "Kinh Doanh Xà Phòng (+3.000 Vàng/Lượt)", lore: "Quý Bình An chế tạo xà phòng thơm từ mỡ cừu, hợp tác cùng Thiên Kim Lâu của Vệ Ti Vũ.", unlocked: false, active: false },
    { id: 10, badge: "CHƯƠNG 10", title: "Trận Thích Sát Phò Mã Phủ", knot: "chapter_10_transition", featureUnlocked: "Điều Tra & Phân Nhánh Thích Khách", lore: "Sát thủ đột kích phủ đệ trong đêm mưa, Triệu Vân một thương quét sạch.", unlocked: false, active: false },
    { id: 15, badge: "CHƯƠNG 15", title: "Vũ Hoàng Hạ Chỉ Bắc Chinh", knot: "chapter_15_transition", featureUnlocked: "TẦNG 2: Đế Nghiệp Sa Bàn & Lệnh Sa Bàn (AP)", lore: "Vũ Hoàng phong Quý Bình An làm Chinh Bắc Đại Tướng Quân, mở khóa bản đồ quân sự 4 phương.", unlocked: false, active: false },
    { id: 20, badge: "CHƯƠNG 20", title: "Biên Cương & Hãm Trận Doanh", knot: "chapter_20_start", featureUnlocked: "Danh Tướng Cao Thuận & Thẻ Hãm Trận Doanh", lore: "Thu phục Cao Thuận nghiêm cẩn, trang bị giáp trụ thép cho 800 dũng sĩ Hãm Trận Doanh.", unlocked: false, active: false },
    { id: 27, badge: "CHƯƠNG 27", title: "Độc Sĩ Giả Hủ Hiến Kế", knot: "chapter_27_transition", featureUnlocked: "Mưu Sĩ Giả Hủ & Thẻ Phản Gián Ly Gián", lore: "Hố 2 vạn vàng từ triều đình, thu phục Độc Sĩ Giả Hủ, định ra kế sách phục kích quân Nam Ly.", unlocked: false, active: false },
    { id: 35, badge: "CHƯƠNG 35", title: "Đại Kế Thủy Công Thanh Thủy", knot: "chapter_35_transition", featureUnlocked: "Siêu Thẻ Bài: Xả Lũ Sông Thanh Thủy", lore: "Đắp đập ngăn sông Thanh Thủy thượng nguồn, chuẩn bị xả lũ nhấn chìm chiến thành địch.", unlocked: false, active: false },
    { id: 43, badge: "CHƯƠNG 43", title: "Vạn Thạch Quân Lương Tiền Tuyến", knot: "chapter_43_transition", featureUnlocked: "Kho Lương Hậu Cần (+50.000 Thạch Lương)", lore: "Bí mật thu mua quân lương từ thương đoàn Giang Đông, sĩ khí ba quân đạt mức tối đa.", unlocked: false, active: false },
    { id: 52, badge: "CHƯƠNG 48-52", title: "Đại Chiến Thành Thanh Châu", knot: "chapter_48_transition", featureUnlocked: "TẦNG 3: Sa Trường Thẻ Bài 3 Làn & Quyết Chiến Địch Hỏa", lore: "5 vạn quân Địch Hỏa vây hãm, dùng thủy kế Giả Hủ và Triệu Vân đại phá quân Nam Ly khải hoàn.", unlocked: false, active: false }
  ];

  // =========================================================================
  // 2. MASTER GAME STATE
  // =========================================================================
  const state = {
    currentView: 'vn',
    currentChapterId: 1,

    // Progression Unlock Flags
    unlocked: {
      gacha: false,
      zhaoyun: false,
      soap: false,
      strategyMap: false,
      gaoshun: false,
      giaHu: false,
      flood: false,
      khaiNguyen: false,
      battleFront: false
    },

    // Resources (Bắt đầu tại Chương 1: Hàn vi, chưa có tài nguyên)
    ticketCount: 0,       // Anh Hồn Lệnh (Nhận khi hệ thống thức tỉnh cuối Ch.1)
    jade: 0,              // Ngọc Tỷ / Kim Bảo
    suspicion: 15,        // Emperor Suspicion (Khởi điểm 15%)
    gold: 0,              // Vàng khởi đầu (Thưởng 100 sau khi thắng đối thơ Ch.1)
    food: 0,              // Lương thảo (Chưa có quân đội)
    ap: 0,                // Điểm Hành Động (Mở tại Ch.15)
    maxAp: 3,

    // Gacha & Roster State (Chưa chiêu mộ anh linh nào)
    pityCount: 0,
    hasWon5050: false,
    ownedHeroIds: [],     // Trống rỗng! Chiêu mộ Triệu Vân tại Ch.5
    selectedInspectorHeroId: null,
    lastSummonedHero: null,

    // VN Dialogue State (Ink Engine Driven)
    dialogueHistory: [],
    currentTextIndex: 0,
    isTyping: false,
    autoAdvance: false,
    autoTimer: null,

    // Map State
    selectedNode: 'dedo',

    // Battle Arena State (Tier 3)
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
      { id: 'hamtran', name: 'Hãm Trận Doanh', cost: 3, hp: 140, atk: 65, type: 'infantry' },
      { id: 'bachma', name: 'Bạch Mã Nghĩa Tòng', cost: 4, hp: 110, atk: 80, type: 'cavalry' },
      { id: 'flood', name: 'XẢ LŨ THANH THỦY', cost: 5, type: 'tactic', reqStage: 2 },
      { id: 'seventh-spear', name: 'Thất Thám Bàn Xà', cost: 2, type: 'skill' }
    ]
  };

  // =========================================================================
  // 3. DOM ELEMENT REFERENCES
  // =========================================================================
  const ui = {
    // HUD Tracker & Tabs
    hudChapterBadge: document.getElementById('hud-chapter-badge'),
    hudChapterTitle: document.getElementById('hud-chapter-title'),
    hudChFill: document.getElementById('hud-ch-fill'),
    btnOpenMilestones: document.getElementById('btn-open-milestones'),
    btnHudGacha: document.getElementById('btn-hud-gacha'),
    hudTicketCount: document.getElementById('hud-ticket-count'),
    btnHudHero: document.getElementById('btn-hud-hero'),

    btnTabVn: document.getElementById('btn-tab-vn'),
    btnTabMap: document.getElementById('btn-tab-map'),
    btnTabBattle: document.getElementById('btn-tab-battle'),
    tabMapLock: document.getElementById('tab-map-lock'),
    tabBattleLock: document.getElementById('tab-battle-lock'),
    viewVn: document.getElementById('view-vn'),
    viewMap: document.getElementById('view-map'),
    viewBattle: document.getElementById('view-battle'),

    // HUD Monitors
    txtSuspicion: document.getElementById('txt-suspicion'),
    barSuspicion: document.getElementById('bar-suspicion'),
    suspicionDesc: document.getElementById('suspicion-status-desc'),
    txtGold: document.getElementById('txt-gold'),
    txtFood: document.getElementById('txt-food'),
    txtAp: document.getElementById('txt-ap'),

    // Visual Novel Stage
    vnStageContainer: document.getElementById('vn-stage-container'),
    vnSpeaker: document.getElementById('vn-speaker'),
    vnSpeakerSub: document.getElementById('vn-speaker-sub'),
    vnDialogueText: document.getElementById('vn-dialogue-text'),
    btnVnAdvance: document.getElementById('btn-vn-advance'),
    btnVnAuto: document.getElementById('btn-vn-auto'),
    btnVnLog: document.getElementById('btn-vn-log'),
    vnBranchIndicator: document.getElementById('vn-branch-indicator'),
    actorLeftSlot: document.getElementById('actor-left-slot'),
    actorLeftAvatar: document.getElementById('actor-left-avatar'),
    actorLeftNametag: document.getElementById('actor-left-nametag'),
    actorRightSlot: document.getElementById('actor-right-slot'),
    actorRightAvatar: document.getElementById('actor-right-avatar'),
    actorRightImg: document.getElementById('actor-right-img'),
    actorRightNametag: document.getElementById('actor-right-nametag'),

    // Branch Choices Modal
    choiceModal: document.getElementById('branch-choice-modal') || document.getElementById('choice-modal'),
    choiceQuestion: document.getElementById('choice-question'),
    choiceGrid: document.getElementById('choice-grid'),
    btnResetGame: document.getElementById('btn-reset-game'),

    // Backlog Modal
    backlogDrawer: document.getElementById('backlog-drawer'),
    backlogBody: document.getElementById('backlog-body'),
    btnCloseLog: document.getElementById('btn-close-log'),

    // Chapter Milestone Matrix Modal
    milestoneMatrixModal: document.getElementById('milestone-matrix-modal'),
    matrixTimelineList: document.getElementById('matrix-timeline-list'),
    btnCloseMatrix: document.getElementById('btn-close-matrix'),

    // Gacha Summoning Altar Modal
    gachaModal: document.getElementById('gacha-modal'),
    btnCloseGacha: document.getElementById('btn-close-gacha'),
    gachaTicketDisplay: document.getElementById('gacha-ticket-display'),
    altarBtnRow: document.getElementById('altar-btn-row'),
    btnDoSummon: document.getElementById('btn-do-summon'),
    revealActionRow: document.getElementById('reveal-action-row'),
    btnRevealInspect: document.getElementById('btn-reveal-inspect'),
    btnRevealConfirm: document.getElementById('btn-reveal-confirm'),
    summonTalisman: document.getElementById('summon-talisman'),
    gachaCardReveal: document.getElementById('gacha-card-reveal'),
    cardFlipper: document.getElementById('card-flipper'),
    baguaRing: document.getElementById('bagua-ring'),
    revealCardRarity: document.getElementById('reveal-card-rarity'),
    revealCardImg: document.getElementById('reveal-card-img'),
    revealCardName: document.getElementById('reveal-card-name'),
    revealCardTitle: document.getElementById('reveal-card-title'),
    revealCardRealm: document.getElementById('reveal-card-realm'),

    // Hero Detail Inspector Modal
    heroDetailModal: document.getElementById('hero-detail-modal'),
    btnCloseHeroDetail: document.getElementById('btn-close-hero-detail'),
    inspectorHeroSelector: document.getElementById('inspector-hero-selector'),
    inspectorRarityCrest: document.getElementById('inspector-rarity-crest'),
    inspectorHeroImg: document.getElementById('inspector-hero-img'),
    inspectorHeroName: document.getElementById('inspector-hero-name'),
    inspectorHeroEpithet: document.getElementById('inspector-hero-epithet'),
    inspectorRealmVal: document.getElementById('inspector-realm-val'),
    qsValForce: document.getElementById('qs-val-force'),
    qsBarForce: document.getElementById('qs-bar-force'),
    qsValCommand: document.getElementById('qs-val-command'),
    qsBarCommand: document.getElementById('qs-bar-command'),
    qsValIntel: document.getElementById('qs-val-intel'),
    qsBarIntel: document.getElementById('qs-bar-intel'),
    qsValPol: document.getElementById('qs-val-pol'),
    qsBarPol: document.getElementById('qs-bar-pol'),
    csValHp: document.getElementById('cs-val-hp'),
    csValAtk: document.getElementById('cs-val-atk'),
    csValCost: document.getElementById('cs-val-cost'),
    csValTroop: document.getElementById('cs-val-troop'),
    inspectorSkillsList: document.getElementById('inspector-skills-list'),

    // Feature Unlock Modal
    unlockEventModal: document.getElementById('unlock-event-modal'),
    unlockModalIcon: document.getElementById('unlock-modal-icon'),
    unlockModalTitle: document.getElementById('unlock-modal-title'),
    unlockModalName: document.getElementById('unlock-modal-name'),
    unlockModalLore: document.getElementById('unlock-modal-lore'),
    unlockModalEffect: document.getElementById('unlock-modal-effect'),
    btnCloseUnlock: document.getElementById('btn-close-unlock'),

    // Map View (Tier 2)
    provinceNodes: document.querySelectorAll('.map-node'),
    mapDetailsCard: document.getElementById('map-node-details'),
    nodeTitle: document.getElementById('node-title'),
    nodeDesc: document.getElementById('node-desc'),
    nodeActionCost: document.getElementById('node-action-cost'),
    btnActionSoap: document.getElementById('btn-action-soap'),
    btnActionTribute: document.getElementById('btn-action-tribute'),
    btnActionBattle: document.getElementById('btn-action-battle'),
    btnIntercept: document.getElementById('btn-intercept-threat'),

    // Battle View (Tier 3)
    wallHpBar: document.getElementById('wall-hp-bar'),
    wallHpText: document.getElementById('wall-hp-text'),
    bossHpBar: document.getElementById('boss-hp-bar'),
    bossHpText: document.getElementById('boss-hp-text'),
    bossIntentDesc: document.getElementById('boss-intent-desc'),
    reservoirText: document.getElementById('reservoir-text'),
    btnExecuteTurn: document.getElementById('btn-execute-turn'),
    victoryModal: document.getElementById('victory-modal'),
    btnTriumphNext: document.getElementById('btn-triumph-next'),

    cardEnemyLeft: document.getElementById('enemy-left'),
    cardEnemyCenter: document.getElementById('enemy-center'),
    cardEnemyRight: document.getElementById('enemy-right'),
    playerZoneLeft: document.getElementById('player-left'),
    playerZoneCenter: document.getElementById('player-center'),
    playerZoneRight: document.getElementById('player-right')
  };

  // =========================================================================
  // 4. INK ENGINE INITIALIZATION & SCRIPT LOADING
  // =========================================================================
  const ink = new (window.InkEngine || function() {})();
  if (GD.ink_stories) {
    if (GD.ink_stories.ch01_15) ink.loadStoryScript(GD.ink_stories.ch01_15);
    if (GD.ink_stories.ch16_52) ink.loadStoryScript(GD.ink_stories.ch16_52);
  }

  // Hook Ink Effects
  ink.setEffectHandler((tag) => {
    console.log("[InkEffect Tag]", tag);
    const parts = tag.split("|").map(s => s.trim());
    const action = parts[0].replace(/^EFFECT:\s*/, '').replace(/^#\s*/, '').trim();

    if (action.includes("camera_shake")) {
      triggerShake();
    } else if (action.includes("screen_flash")) {
      triggerLightning();
    } else if (action.includes("show_toast")) {
      const msg = parts[1] || "Thông báo";
      showToast(msg, true);
    } else if (action.includes("grant_ticket")) {
      const count = Number(parts[1] || 1);
      state.ticketCount += count;
      updateProgressTrackerUI();
      showToast(`🎫 Nhận được Anh Hồn Lệnh × ${count}!`, true);
    } else if (action.includes("unlock_feature")) {
      const feat = parts[1] || parts[0].split("|")[1];
      if (feat) triggerUnlockNotification(feat.trim());
    } else if (action.includes("trigger_gacha")) {
      setTimeout(() => openGachaModal(), 600);
    } else if (action.includes("trigger_battle")) {
      switchView('battle');
    } else if (action.includes("chapter_complete")) {
      const chNum = Number(parts[1] || parts[0].split("|")[1]);
      if (!isNaN(chNum)) advanceChapter(chNum);
    }
  });

  // =========================================================================
  // 5. PROGRESSION MATRIX & LOCK ENGINE (TIẾN TRÌNH KHÓA CHẶT CHẼ)
  // =========================================================================
  function updateProgressTrackerUI() {
    const currentChapter = chapterMatrix.find(c => c.id === state.currentChapterId) || chapterMatrix[0];
    ui.hudChapterBadge.textContent = currentChapter.badge;
    ui.hudChapterTitle.textContent = currentChapter.title;

    const progressPct = (chapterMatrix.indexOf(currentChapter) + 1) / chapterMatrix.length * 100;
    ui.hudChFill.style.width = `${progressPct}%`;
    ui.hudTicketCount.textContent = state.ticketCount;
    ui.gachaTicketDisplay.textContent = state.ticketCount;

    // 1. Tính năng Kinh Doanh Xà Phòng (Chương 8)
    if (state.unlocked.soap) {
      ui.btnActionSoap.classList.remove('locked-feature');
      const lockBadge = document.getElementById('soap-lock-badge');
      if (lockBadge) lockBadge.remove();
    } else {
      ui.btnActionSoap.classList.add('locked-feature');
    }

    // 2. Tầng 2: Đế Nghiệp Sa Bàn (Chương 15 - Sắc phong Chinh Bắc)
    // Hoàn toàn ẩn khỏi thanh điều hướng ở giai đoạn đầu để tránh tương tác sớm gây bug
    if (state.unlocked.strategyMap) {
      ui.btnTabMap.classList.remove('locked-tab', 'hidden');
      ui.btnTabMap.removeAttribute('disabled');
      if (ui.tabMapLock) ui.tabMapLock.style.display = 'none';
    } else {
      ui.btnTabMap.classList.add('locked-tab', 'hidden');
      ui.btnTabMap.setAttribute('disabled', 'true');
      if (ui.tabMapLock) ui.tabMapLock.style.display = 'inline-block';
    }

    // 3. Tầng 3: Sa Trường Thẻ Bài (Chương 48 - Đại Chiến Thanh Châu)
    // Hoàn toàn ẩn khỏi thanh điều hướng ở giai đoạn đầu
    if (state.unlocked.battleFront) {
      ui.btnTabBattle.classList.remove('locked-tab', 'hidden');
      ui.btnTabBattle.removeAttribute('disabled');
      if (ui.tabBattleLock) ui.tabBattleLock.style.display = 'none';
    } else {
      ui.btnTabBattle.classList.add('locked-tab', 'hidden');
      ui.btnTabBattle.setAttribute('disabled', 'true');
      if (ui.tabBattleLock) ui.tabBattleLock.style.display = 'inline-block';
    }

    // 4. Bái Tướng Đài Gacha (Chương 5 - Mật thất Phò Mã Phủ)
    // Chỉ xuất hiện trên HUD khi kịch bản đã khai mở đài chiêu mộ
    if (state.unlocked.gacha) {
      ui.btnHudGacha.classList.remove('hidden');
    } else {
      ui.btnHudGacha.classList.add('hidden');
    }

    // 5. Nút Tra Cứu Danh Tướng (Chỉ hiện khi đã triệu hoán thành công anh linh)
    if (state.unlocked.zhaoyun && state.ownedHeroIds.length > 0) {
      ui.btnHudHero.classList.remove('hidden');
    } else {
      ui.btnHudHero.classList.add('hidden');
    }

    // 6. An toàn trạng thái: Nếu view hiện tại bị khóa, tự động chuyển về VN
    if (state.currentView === 'map' && !state.unlocked.strategyMap) {
      switchView('vn');
    } else if (state.currentView === 'battle' && !state.unlocked.battleFront) {
      switchView('vn');
    }

    const cardFlood = document.getElementById('card-flood');
    if (cardFlood) {
      if (state.unlocked.giaHu || state.unlocked.flood) {
        cardFlood.classList.remove('locked-feature');
        cardFlood.title = "Siêu thẻ Giả Hủ: Trữ Nước Cấp 2+";
      } else {
        cardFlood.classList.add('locked-feature');
        cardFlood.title = "🔒 Khóa: Cần hoàn thành Chương 27-35 (Kế sách Thủy Công)";
      }
    }
  }

  function advanceChapter(chapterId) {
    state.currentChapterId = chapterId;
    chapterMatrix.forEach(c => {
      if (c.id <= chapterId) c.unlocked = true;
      c.active = (c.id === chapterId);
    });

    state.unlocked.gacha = (chapterId >= 5);
    state.unlocked.zhaoyun = (chapterId >= 5 && state.ownedHeroIds.length > 0);
    state.unlocked.soap = (chapterId >= 8);
    state.unlocked.strategyMap = (chapterId >= 15);
    if (state.unlocked.strategyMap && state.ap === 0) {
      state.ap = 3;
    }
    state.unlocked.gaoshun = (chapterId >= 20);
    state.unlocked.giaHu = (chapterId >= 27);
    state.unlocked.flood = (chapterId >= 35);
    state.unlocked.khaiNguyen = (chapterId >= 43);
    state.unlocked.battleFront = (chapterId >= 48);

    updateProgressTrackerUI();
    updateHudResources();
    renderMilestoneTimeline();
  }

  function triggerUnlockNotification(featureKey) {
    state.unlocked[featureKey] = true;
    if (featureKey === 'bai_tuong_dai') {
      state.unlocked.gacha = true;
      if (state.ticketCount < 1) state.ticketCount = 1;
      advanceChapter(5);
    } else if (featureKey === 'strategyMap' || featureKey === 'de_nghiep_sa_ban') {
      state.unlocked.strategyMap = true;
      if (state.ap === 0) state.ap = 3;
      advanceChapter(15);
    } else if (featureKey === 'soap') {
      state.unlocked.soap = true;
      advanceChapter(8);
    } else if (featureKey === 'battleFront') {
      state.unlocked.battleFront = true;
      advanceChapter(48);
    }
    updateProgressTrackerUI();
    updateHudResources();

    const unlockDetails = {
      soap: {
        icon: "🧼",
        title: "MỞ KHÓA KINH DOANH!",
        name: "XÀ PHÒNG THẤU HOA CAO (CHƯƠNG 8)",
        lore: "Quý Bình An bắt tay cùng Lâu chủ Vệ Ti Vũ (Thiên Kim Lâu) phân phối xà phòng thơm độc quyền.",
        effect: "⚡ Tác dụng: Cho phép thực hiện lệnh 'Mở Rộng Xưởng' thu hoạch +3.000 Vàng mỗi đợt!"
      },
      bai_tuong_dai: {
        icon: "⛩️",
        title: "MỞ KHÓA BÁI TƯỚNG ĐÀI!",
        name: "ĐÀI CHIÊU MỘ ANH LINH TAM QUỐC (CHƯƠNG 5)",
        lore: "Kích hoạt pháp trận Bát Quái thời thượng cổ, dùng Anh Hồn Lệnh triệu hoán anh linh Tam Quốc.",
        effect: "⚡ Tác dụng: Cho phép Chiêu Mộ Danh Tướng và kiểm tra Bảng Tra Cứu Tứ Duy!"
      },
      strategyMap: {
        icon: "🗺️",
        title: "MỞ KHÓA TẦNG 2 ĐẾ NGHIỆP!",
        name: "ĐẾ NGHIỆP SA BÀN & LỆNH AP (CHƯƠNG 15)",
        lore: "Vũ Hoàng sắc phong Chinh Bắc Đại Tướng Quân, ban cờ lệnh điều động binh mã 4 phương.",
        effect: "⚡ Tác dụng: Khai thông giao diện Sa Bàn Quân Sự và tiêu hao Điểm Hành Động (AP)!"
      },
      de_nghiep_sa_ban: {
        icon: "🗺️",
        title: "MỞ KHÓA TẦNG 2 ĐẾ NGHIỆP!",
        name: "ĐẾ NGHIỆP SA BÀN & LỆNH AP (CHƯƠNG 15)",
        lore: "Vũ Hoàng sắc phong Chinh Bắc Đại Tướng Quân, ban cờ lệnh điều động binh mã 4 phương.",
        effect: "⚡ Tác dụng: Khai thông giao diện Sa Bàn Quân Sự và tiêu hao Điểm Hành Động (AP)!"
      },
      feature_ham_tran_doanh: {
        icon: "🛡️",
        title: "MỞ KHÓA DANH TƯỚNG!",
        name: "CAO THUẬN & HÃM TRẬN DOANH (CHƯƠNG 20)",
        lore: "800 dũng sĩ cảm tử Hãm Trận Doanh mình mặc giáp thép tôi, xung phong hãm trận vô địch.",
        effect: "⚡ Tác dụng: Bổ sung thẻ bài phòng ngự siêu việt Hãm Trận Doanh vào bộ bài!"
      },
      giaHu: {
        icon: "🌊",
        title: "MỞ KHÓA MƯU THẦN TAM QUỐC!",
        name: "ĐỘC SĨ GIẢ HỦ & THỦY CÔNG (CHƯƠNG 27)",
        lore: "Hố 20 vạn lượng vàng từ triều đình, thu phục mưu sĩ Giả Hủ phụ trách mưu kế diệt quân Nam Ly.",
        effect: "⚡ Tác dụng: Mở khóa các thẻ bài mưu lược phản gián và độc kế!"
      },
      feature_water_stratagem: {
        icon: "🌊",
        title: "MỞ KHÓA KẾ SÁCH THỦY CÔNG!",
        name: "XẢ LŨ DÒNG THANH THỦY (CHƯƠNG 35)",
        lore: "Đắp đê thượng nguồn sông Thanh Thủy tích nước 3 tầng, chuẩn bị nhấn chìm quân địch.",
        effect: "⚡ Tác dụng: Mở khóa siêu kỹ năng Xả Lũ Sông Thanh Thủy trong trận chiến!"
      },
      khaiNguyen: {
        icon: "🌾",
        title: "MỞ KHÓA HẬU CẦN QUÂN LƯƠNG!",
        name: "CĂN CỨ KHO LƯƠNG KHAI NGUYÊN (CHƯƠNG 43)",
        lore: "Tích trữ 50.000 thạch lương thảo, đảm bảo hậu cần vững chắc cho đại quân.",
        effect: "⚡ Tác dụng: Kho lương tăng thêm +50.000 Thạch phục vụ nuôi quân và hành quân!"
      },
      battleFront: {
        icon: "⚔️",
        title: "MỞ KHÓA TẦNG 3 CHIẾN TRƯỜNG!",
        name: "SA TRƯỜNG THẺ BÀI CHIẾN THUẬT (CHƯƠNG 48-52)",
        lore: "2 vạn thiết kỵ Nam Ly của Địch Hỏa vây hãm thành trì, bước vào trận đại chiến thủ thành 3 làn.",
        effect: "⚡ Tác dụng: Trực tiếp điều binh thủ thành, đối phó Ý Đồ Kẻ Địch và quyết toán đại thắng!"
      }
    };

    const info = unlockDetails[featureKey] || {
      icon: "✨",
      title: "MỞ KHÓA TÍNH NĂNG MỚI!",
      name: featureKey.toUpperCase(),
      lore: "Ký chủ đã đạt mốc sự kiện quan trọng trong cốt truyện.",
      effect: "⚡ Đã cập nhật trạng thái mới cho toàn bộ hệ thống!"
    };

    ui.unlockModalIcon.textContent = info.icon;
    ui.unlockModalTitle.textContent = info.title;
    ui.unlockModalName.textContent = info.name;
    ui.unlockModalLore.textContent = info.lore;
    ui.unlockModalEffect.textContent = info.effect;

    triggerLightning();
    ui.unlockEventModal.classList.remove('hidden');
  }

  function renderMilestoneTimeline() {
    ui.matrixTimelineList.innerHTML = '';
    chapterMatrix.forEach(c => {
      const item = document.createElement('div');
      item.className = `milestone-item ${c.unlocked ? 'ms-unlocked' : 'ms-locked'} ${c.active ? 'ms-current' : ''}`;
      if (!c.unlocked) {
        item.style.cursor = 'not-allowed';
        item.style.opacity = '0.55';
      } else {
        item.style.cursor = 'pointer';
      }
      item.innerHTML = `
        <div class="ms-badge">${c.badge}</div>
        <div class="ms-body">
          <div class="ms-title">${c.title}</div>
          <div class="ms-feature-tag">🎁 ${c.featureUnlocked}</div>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${c.lore}</p>
        </div>
        <div class="ms-status-label">${c.unlocked ? 'ĐÃ MỞ KHÓA ▶' : 'KHÓA 🔒'}</div>
      `;
      // Click on unlocked milestone to replay/jump story knot!
      item.addEventListener('click', () => {
        if (!c.unlocked) {
          showToast(`🔒 ${c.badge} chưa mở khóa! Hãy hoàn thành cốt truyện để tiến tới.`);
          return;
        }
        if (c.knot && ink.knots.has(c.knot)) {
          advanceChapter(c.id);
          ink.start(c.knot);
          state.currentTextIndex = 0;
          ui.milestoneMatrixModal.classList.add('hidden');
          switchView('vn');
          renderCurrentDialogue();
          showToast(`Chuyển đến: ${c.badge} - ${c.title}`);
        }
      });
      ui.matrixTimelineList.appendChild(item);
    });
  }

  // =========================================================================
  // 6. GACHA SUMMONING ENGINE (BÁI TƯỚNG ĐÀI) — 28 HEROES POOL
  // =========================================================================
  function openGachaModal() {
    if (!state.unlocked.gacha) {
      showToast("🔒 Bái Tướng Đài chưa được khai mở! Cần tiến tới Chương 5 trong kịch bản.");
      return;
    }
    ui.gachaModal.classList.remove('hidden');
    ui.altarBtnRow.classList.remove('hidden');
    ui.revealActionRow.classList.add('hidden');
    ui.gachaCardReveal.classList.add('hidden');
    ui.cardFlipper.classList.remove('flipped');
    ui.summonTalisman.classList.remove('hidden');
    ui.gachaTicketDisplay.textContent = state.ticketCount;
  }

  function performSummon() {
    if (state.ticketCount < 1 && state.jade < 160) {
      showToast("⚠️ Không có Anh Hồn Lệnh hoặc đủ 160 Kim Bảo!");
      return;
    }

    if (state.ticketCount >= 1) {
      state.ticketCount -= 1;
    } else {
      state.jade -= 160;
    }
    ui.hudTicketCount.textContent = state.ticketCount;
    ui.gachaTicketDisplay.textContent = state.ticketCount;

    // Trigger Summon Animation Sequence
    triggerShake();
    triggerLightning();
    ui.summonTalisman.classList.add('active-pulse');
    ui.baguaRing.style.animationDuration = '1.8s';

    // Pity & Hero Selection Math
    state.pityCount++;
    let pulledHero = null;

    // First ever summon is canon Zhao Yun!
    if (!state.unlocked.zhaoyun) {
      pulledHero = allHeroes.find(h => h.id === 'hero_zhaoyun') || allHeroes[0];
    } else {
      // Piecewise Truncated Geometric Pity Math
      let ssrProb = 0.006;
      if (state.pityCount >= 74) {
        ssrProb += (state.pityCount - 74 + 1) * 0.06;
      }
      if (state.pityCount >= 90) ssrProb = 1.0;

      const roll = Math.random();
      if (roll < ssrProb) {
        // Pulled SSR/UR! Reset pity
        state.pityCount = 0;
        const ssrPool = allHeroes.filter(h => h.rarity === 'SSR' || h.rarity === 'UR');
        pulledHero = ssrPool[Math.floor(Math.random() * ssrPool.length)];
      } else if (roll < ssrProb + 0.051) {
        // Pulled SR
        const srPool = allHeroes.filter(h => h.rarity === 'SR');
        pulledHero = srPool[Math.floor(Math.random() * srPool.length)] || allHeroes[0];
      } else {
        // Pulled R or general pool
        pulledHero = allHeroes[Math.floor(Math.random() * allHeroes.length)];
      }
    }

    state.lastSummonedHero = pulledHero;
    if (!state.ownedHeroIds.includes(pulledHero.id)) {
      state.ownedHeroIds.push(pulledHero.id);
    }

    setTimeout(() => {
      ui.summonTalisman.classList.add('hidden');
      ui.gachaCardReveal.classList.remove('hidden');

      // Update Card Visuals with Pulled Hero Data
      ui.revealCardRarity.textContent = `${pulledHero.rarity} · ${pulledHero.rarity === 'UR' ? 'CHIẾN THẦN' : 'HOÀNG KIM'}`;
      ui.revealCardName.textContent = pulledHero.name.toUpperCase();
      ui.revealCardTitle.textContent = `${pulledHero.aliases[0] || pulledHero.name} · Võ Lực ${pulledHero.base_stats.force}`;
      ui.revealCardRealm.textContent = `Cảnh giới: ${pulledHero.realm}`;

      // Card Flip 3D
      setTimeout(() => {
        ui.cardFlipper.classList.add('flipped');
        triggerShake();
        showToast(`🌟 TRIỆU HOÁN THÀNH CÔNG: [${pulledHero.rarity}] ${pulledHero.name}!`, true);

        // State update
        state.unlocked.zhaoyun = true;
        if (ui.actorRightImg) ui.actorRightImg.classList.remove('hidden');
        if (ui.actorRightAvatar) ui.actorRightAvatar.classList.add('hidden');
        if (ui.actorRightNametag) ui.actorRightNametag.textContent = pulledHero.name;
        updateProgressTrackerUI();

        // Show result action buttons
        ui.altarBtnRow.classList.add('hidden');
        ui.revealActionRow.classList.remove('hidden');
      }, 700);
    }, 1200);
  }

  // =========================================================================
  // 7. HERO DETAIL INSPECTOR (RPG STAT SHEET — 28 HEROES)
  // =========================================================================
  function renderHeroInspector(heroId) {
    const hero = allHeroes.find(h => h.id === heroId) || allHeroes[0];
    if (!hero) return;

    state.selectedInspectorHeroId = hero.id;

    // Roster Switcher Bar
    ui.inspectorHeroSelector.innerHTML = '';
    allHeroes.forEach(h => {
      const chip = document.createElement('button');
      const isSelected = h.id === hero.id;
      const isOwned = state.ownedHeroIds.includes(h.id);
      chip.className = `hero-chip ${isSelected ? 'active' : ''}`;
      chip.style.padding = '4px 10px';
      chip.style.borderRadius = '6px';
      chip.style.border = isSelected ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.15)';
      chip.style.background = isSelected ? 'rgba(212,175,55,0.25)' : 'rgba(0,0,0,0.4)';
      chip.style.color = isSelected ? 'var(--gold-primary)' : '#cbd5e1';
      chip.style.fontSize = '11px';
      chip.style.fontWeight = '700';
      chip.style.cursor = 'pointer';
      chip.style.whiteSpace = 'nowrap';
      chip.innerHTML = `${h.rarity === 'UR' ? '👑' : h.rarity === 'SSR' ? '⭐' : '🔹'} ${h.name} ${!isOwned ? '🔒' : ''}`;
      chip.addEventListener('click', () => renderHeroInspector(h.id));
      ui.inspectorHeroSelector.appendChild(chip);
    });

    // Left Column
    ui.inspectorRarityCrest.textContent = `${hero.rarity} · ${hero.rarity === 'UR' ? 'CHIẾN THẦN VÔ SONG' : hero.rarity === 'SSR' ? 'HOÀNG KIM THƯỢNG TƯỚNG' : 'TINH ANH TIÊN PHONG'}`;
    ui.inspectorHeroName.textContent = hero.name.toUpperCase();
    ui.inspectorHeroEpithet.textContent = `${hero.aliases[0] || hero.name} · ${hero.troop_type}`;
    ui.inspectorRealmVal.textContent = hero.realm.toUpperCase();

    // Four Dimensions Grid (Tứ Duy Tam Quốc)
    const st = hero.base_stats;
    ui.qsValForce.textContent = st.force;
    ui.qsBarForce.style.width = `${Math.min(100, (st.force / 120) * 100)}%`;

    ui.qsValCommand.textContent = st.command;
    ui.qsBarCommand.style.width = `${Math.min(100, (st.command / 120) * 100)}%`;

    ui.qsValIntel.textContent = st.intelligence;
    ui.qsBarIntel.style.width = `${Math.min(100, (st.intelligence / 120) * 100)}%`;

    ui.qsValPol.textContent = st.politics;
    ui.qsBarPol.style.width = `${Math.min(100, (st.politics / 120) * 100)}%`;

    // Direct Combat stats
    ui.csValHp.textContent = hero.hp;
    ui.csValAtk.textContent = hero.atk;
    ui.csValCost.textContent = hero.cost || 6.0;
    ui.csValTroop.textContent = hero.troop_type;

    // Skills List
    ui.inspectorSkillsList.innerHTML = '';
    (hero.skills || []).forEach(sk => {
      const entry = document.createElement('div');
      entry.className = `skill-entry ${sk.type === 'active' ? 'skill-active' : ''}`;
      entry.innerHTML = `
        <div class="sk-icon">${sk.type === 'active' ? '⚡' : '🛡️'}</div>
        <div class="sk-info">
          <div class="sk-name-row">
            <span class="sk-name">${sk.name}</span>
            <span class="sk-tag ${sk.type === 'active' ? 'active-tag' : 'passive-tag'}">
              ${sk.type === 'active' ? `Tuyệt Kỹ · ${sk.mana_cost} Mana` : 'Bị Động'}
            </span>
          </div>
          <p class="sk-desc">${sk.description} ${sk.damage > 0 ? `(Sát thương: ${sk.damage})` : ''}</p>
        </div>
      `;
      ui.inspectorSkillsList.appendChild(entry);
    });
  }

  function openHeroInspector(heroId) {
    if (state.ownedHeroIds.length === 0) {
      showToast("🔒 Chưa có danh tướng nào quy thuận! Hãy hoàn thành triệu hoán tại Bái Tướng Đài trước.");
      return;
    }
    renderHeroInspector(heroId || state.selectedInspectorHeroId || state.ownedHeroIds[0]);
    ui.heroDetailModal.classList.remove('hidden');
  }

  // =========================================================================
  // 8. VISUAL NOVEL THEATER (INK ENGINE INTEGRATION)
  // =========================================================================
  let typewriterTimer = null;

  function renderCurrentDialogue() {
    // If ink engine has text, display it
    if (ink.currentText && ink.currentText.length > 0) {
      if (state.currentTextIndex >= ink.currentText.length) {
        state.currentTextIndex = 0;
      }
      const line = ink.currentText[state.currentTextIndex] || "";

      // Determine speaker & metadata dynamically
      let speakerName = "Dẫn Truyện";
      let speakerSub = "Hồi 1: Khởi Đầu & Sinh Tồn";

      if (line.startsWith('"') || line.startsWith('“') || line.startsWith("'")) {
        if (line.includes("Mạt tướng") || line.includes("Tử Long")) {
          speakerName = "Triệu Tử Long";
          speakerSub = "Thường Sơn Hổ Tướng · Hoàng Cảnh Sơ Kỳ";
        } else if (line.includes("Vũ Hoàng") || line.includes("Phò mã gia!") || line.includes("bệ hạ")) {
          speakerName = "Tỳ Nữ Phò Mã Phủ";
          speakerSub = "Cung Nhân Hầu Cận";
        } else if (line.includes("Địa tác tỳ bà") || line.includes("phò mã")) {
          speakerName = "Sứ Thần Nam Ly";
          speakerSub = "Sứ Đoàn Phương Nam";
        } else if (line.includes("Quý gia") || line.includes("xuyên không")) {
          speakerName = "Quý Bình An";
          speakerSub = "Phò Mã Hàn Vi";
        } else {
          speakerName = "Quý Bình An";
          speakerSub = "Phò Mã Gia";
        }
      } else if (line.includes("Vũ Hoàng")) {
        speakerName = "Vũ Hoàng";
        speakerSub = "Đại Vũ Đế Vương";
      } else if (line.includes("Cao Thuận")) {
        speakerName = "Cao Thuận";
        speakerSub = "Thống Soái Hãm Trận Doanh";
      } else if (line.includes("Giả Hủ")) {
        speakerName = "Giả Hủ (Văn Hòa)";
        speakerSub = "Tuyệt Thế Độc Sĩ";
      }

      ui.vnSpeaker.textContent = speakerName;
      ui.vnSpeakerSub.textContent = speakerSub;

      // Record into Backlog
      if (!state.dialogueHistory.some(h => h.text === line)) {
        state.dialogueHistory.push({
          speaker: speakerName,
          title: speakerSub,
          text: line
        });
        renderBacklog();
      }

      // Typewriter
      clearInterval(typewriterTimer);
      ui.vnDialogueText.textContent = '';
      state.isTyping = true;
      let charIdx = 0;

      typewriterTimer = setInterval(() => {
        if (charIdx < line.length) {
          ui.vnDialogueText.textContent += line[charIdx];
          charIdx++;
        } else {
          clearInterval(typewriterTimer);
          state.isTyping = false;
          // ONLY trigger choices at the very last line of this knot!
          if (state.currentTextIndex >= ink.currentText.length - 1) {
            checkInkChoices();
          }
        }
      }, 14);

      // Sync Resources
      state.gold = ink.variables.gold !== undefined ? ink.variables.gold : state.gold;
      state.suspicion = ink.variables.suspicion !== undefined ? ink.variables.suspicion : state.suspicion;
      state.food = ink.variables.rations !== undefined ? ink.variables.rations : state.food;
      updateHudResources();
    }
  }

  function advanceDialogue() {
    // If typing, finish immediately
    if (state.isTyping) {
      clearInterval(typewriterTimer);
      const line = ink.currentText[state.currentTextIndex] || "";
      ui.vnDialogueText.textContent = line;
      state.isTyping = false;
      if (state.currentTextIndex >= ink.currentText.length - 1) {
        checkInkChoices();
      }
      return;
    }

    if (ui.choiceModal && !ui.choiceModal.classList.contains('hidden')) return;

    if (state.currentTextIndex < ink.currentText.length - 1) {
      state.currentTextIndex++;
      renderCurrentDialogue();
    } else {
      // Reached knot end -> continue story or wait for choice
      if (ink.hasChoices()) {
        checkInkChoices();
      } else if (ink.canAutoContinue()) {
        ink.continueStory();
        state.currentTextIndex = 0;
        renderCurrentDialogue();
      } else {
        showToast("📜 Đã đến điểm hội tụ câu chuyện! Mở Ma Trận Chương hoặc Sa Bàn để tiếp tục.");
      }
    }
  }

  function checkInkChoices() {
    // ONLY display choices when reached the last line of current knot text
    if (state.currentTextIndex < ink.currentText.length - 1) {
      return;
    }

    if (ink.hasChoices() && ui.choiceModal) {
      ui.choiceQuestion.textContent = "Quý Bình An quyết định ứng phó ra sao?";
      ui.choiceGrid.innerHTML = '';

      ink.currentChoices.forEach((c, idx) => {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'choice-card-btn';
        choiceCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="choice-card-title">${c.text}</span>
            <span style="font-size: 10px; font-weight: 800; background: rgba(220, 38, 38, 0.3); border: 1px solid #dc2626; color: #fca5a5; padding: 2px 8px; border-radius: 4px;">QUYẾT ĐỊNH</span>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin: 4px 0;">Phân nhánh cốt truyện chiến lược</p>
          <div class="choice-card-consequence">⚡ Kích hoạt lựa chọn kịch bản Ink</div>
        `;
        choiceCard.addEventListener('click', () => {
          triggerShake();
          ui.choiceModal.classList.add('hidden');
          ink.makeChoice(idx);
          state.currentTextIndex = 0;
          ui.vnBranchIndicator.textContent = `Tuyến Rẽ: ${c.text.substring(0, 30)}...`;
          showToast(`Đã chọn: ${c.text.substring(0, 30)}...`);
          renderCurrentDialogue();
        });
        ui.choiceGrid.appendChild(choiceCard);
      });

      ui.choiceModal.classList.remove('hidden');
    }
  }

  // =========================================================================
  // RESET GAME ENGINE
  // =========================================================================
  function resetGame() {
    clearInterval(typewriterTimer);
    if (state.autoTimer) clearInterval(state.autoTimer);
    state.autoAdvance = false;
    state.isTyping = false;

    state.currentChapterId = 1;
    state.unlocked = {
      gacha: false,
      zhaoyun: false,
      soap: false,
      strategyMap: false,
      gaoshun: false,
      giaHu: false,
      flood: false,
      khaiNguyen: false,
      battleFront: false
    };

    state.ticketCount = 0;
    state.jade = 0;
    state.gold = 0;
    state.food = 0;
    state.suspicion = 15;
    state.ap = 0;
    state.pityCount = 0;
    state.ownedHeroIds = [];
    state.selectedInspectorHeroId = null;
    state.lastSummonedHero = null;
    state.currentTextIndex = 0;
    state.dialogueHistory = [];

    // Reset right actor slot in VN
    if (ui.actorRightImg) ui.actorRightImg.classList.add('hidden');
    if (ui.actorRightAvatar) ui.actorRightAvatar.classList.remove('hidden');
    if (ui.actorRightNametag) ui.actorRightNametag.textContent = "Chưa Triệu Hoán";

    // Hide all modals
    if (ui.choiceModal) ui.choiceModal.classList.add('hidden');
    if (ui.gachaModal) ui.gachaModal.classList.add('hidden');
    if (ui.heroDetailModal) ui.heroDetailModal.classList.add('hidden');
    if (ui.milestoneMatrixModal) ui.milestoneMatrixModal.classList.add('hidden');
    if (ui.unlockEventModal) ui.unlockEventModal.classList.add('hidden');
    if (ui.victoryModal) ui.victoryModal.classList.add('hidden');
    if (ui.backlogDrawer) ui.backlogDrawer.classList.add('hidden');
    if (ui.vnBranchIndicator) ui.vnBranchIndicator.textContent = 'Khởi Đầu: Nhập Thể Hàn Vi';

    // Reset ink variables and restart knot
    ink.variables.gold = 0;
    ink.variables.suspicion = 15;
    ink.variables.rations = 0;
    ink.variables.chapter = 1;
    ink.variables.has_anh_hon_lenh = false;
    ink.variables.system_awakened = false;
    ink.variables.unlocked_gacha = false;
    ink.variables.unlocked_soap = false;
    ink.variables.unlocked_map = false;
    ink.variables.unlocked_battle = false;
    ink.start('chapter_1_start');

    switchView('vn');
    advanceChapter(1);
    updateProgressTrackerUI();
    updateHudResources();
    renderCurrentDialogue();
  }

  function renderBacklog() {
    ui.backlogBody.innerHTML = '';
    state.dialogueHistory.forEach(d => {
      const item = document.createElement('div');
      item.className = 'backlog-entry';
      item.style.marginBottom = '14px';
      item.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
      item.style.paddingBottom = '8px';
      item.innerHTML = `
        <div style="color: var(--gold-primary); font-weight: 800; font-size: 12px; margin-bottom: 3px;">
          ${d.speaker}
        </div>
        <div style="font-size: 13px; color: #e2e8f0; line-height: 1.5;">${d.text}</div>
      `;
      ui.backlogBody.appendChild(item);
    });
  }

  // =========================================================================
  // 9. STRATEGY MAP (TẦNG 2)
  // =========================================================================
  const provinceData = {
    dedo: {
      name: "Kinh Đô Đại Vũ (Kim Loan Điện)",
      ruler: "Vũ Hoàng",
      status: "Nghi Kỵ Giám Sát",
      threat: "Thấp",
      income: "+1.200 Vàng/Tháng",
      garrison: "50.000 Ngự Lâm Quân",
      desc: "Trọng tâm quyền lực của hoàng triều. Vũ Hoàng thâm hiểm đa nghi, các thế lực hoàng tử đấu đá ngầm.",
      actionPrompt: "Tiến Cống Giảm Nghi Kỵ",
      actionCost: "Tiêu hao 1.500 Vàng (-15% Nghi Kỵ)",
      bgImg: "assets/images/bg_capital.jpg"
    },
    baccanh: {
      name: "Bắc Cảnh Biên Cương (Thanh Châu)",
      ruler: "Chinh Bắc Đại Tướng Quân (Quý Bình An)",
      status: "Khói Lửa Chiến Tranh",
      threat: "Cực Cao (20.000 Kỵ Binh Nam Ly)",
      income: "+3.500 Vàng (Xưởng Thấu Hoa Cao)",
      garrison: "800 Hãm Trận Doanh & 3.000 Bạch Mã Kỵ",
      desc: "Phòng tuyến hiểm yếu ngăn cách Đại Vũ và Nam Ly Quốc. Nơi Quý Bình An đặt xưởng xà phòng bí mật.",
      actionPrompt: "Mở Rộng Xưởng Thấu Hoa Cao",
      actionCost: "Tiêu hao 1 AP (+3.000 Vàng)",
      bgImg: "assets/images/bg_battle.jpg"
    },
    namly: {
      name: "Nam Ly Quốc (Phương Nam)",
      ruler: "Nam Ly Vương",
      status: "Thù Địch Căng Thẳng",
      threat: "Trung Bình",
      income: "0 Vàng",
      garrison: "80.000 Thiết Kỵ Chiến Tượng",
      desc: "Đế quốc lân bang hiếu chiến. Tướng tiên phong Địch Hỏa đang dòm ngó ải biên cương.",
      actionPrompt: "Tuần Tra Ranh Giới",
      actionCost: "Tiêu hao 1 AP (-5% Nguy Cơ)",
      bgImg: "assets/images/bg_capital.jpg"
    },
    taylang: {
      name: "Tây Lăng Hoang Mạc",
      ruler: "Tây Lăng Phiến Quân",
      status: "Hỗn Loạn Trung Lập",
      threat: "Thấp",
      income: "+500 Vàng/Tháng",
      garrison: "15.000 Du Mục Kỵ",
      desc: "Vùng đất cằn cỗi nhiều thớt ngựa chiến quý. Nơi thu mua ngựa tốt cho Bạch Mã Nghĩa Tòng.",
      actionPrompt: "Thu Mua Tuấn Mã",
      actionCost: "Tiêu hao 1 AP (Tăng 10% Tốc Độ Kỵ)",
      bgImg: "assets/images/bg_capital.jpg"
    }
  };

  function renderMapNodeDetails(nodeKey) {
    const data = provinceData[nodeKey] || provinceData.baccanh;
    state.selectedNode = nodeKey;

    ui.nodeTitle.textContent = data.name;
    ui.nodeDesc.textContent = data.desc;
    ui.nodeActionCost.textContent = data.actionCost;

    const rulerEl = document.getElementById('node-ruler');
    if (rulerEl) rulerEl.textContent = data.ruler;
    const threatEl = document.getElementById('node-threat');
    if (threatEl) threatEl.textContent = data.threat;
    const incomeEl = document.getElementById('node-income');
    if (incomeEl) incomeEl.textContent = data.income;
    const garrisonEl = document.getElementById('node-garrison');
    if (garrisonEl) garrisonEl.textContent = data.garrison;

    ui.provinceNodes.forEach(n => {
      n.classList.toggle('active', n.dataset.node === nodeKey);
    });
  }

  function handleSoapCommand() {
    if (!state.unlocked.soap) {
      showToast("🔒 Tính năng Kinh Doanh Xà Phòng bị khóa! Cần Chương 8.");
      return;
    }
    if (state.ap < 1) {
      showToast("⚠️ Hết Điểm Hành Động (AP) trong lượt!");
      return;
    }
    state.ap -= 1;
    state.gold += 3000;
    updateHudResources();
    triggerShake();
    showToast("💰 Xưởng Thấu Hoa Cao vận hành! +3.000 Vàng ròng thu hoạch!", true);
  }

  function handleBribeCommand() {
    if (state.gold < 1500) {
      showToast("⚠️ Không đủ 1.500 Vàng để đút lót triều thần!");
      return;
    }
    state.gold -= 1500;
    state.suspicion = Math.max(0, state.suspicion - 15);
    updateHudResources();
    triggerLightning();
    showToast("🕊️ Đút lót hoạn quan thành công! Giảm 15% Nghi Kỵ của Vũ Hoàng.", true);
  }

  // =========================================================================
  // 10. TACTICAL CARD BATTLER (TẦNG 3)
  // =========================================================================
  function renderBattlefield() {
    ui.wallHpText.textContent = `${state.wallHp} / ${state.maxWallHp} HP`;
    ui.wallHpBar.style.width = `${(state.wallHp / state.maxWallHp) * 100}%`;

    ui.bossHpText.textContent = `${state.bossHp} / ${state.maxBossHp} HP`;
    ui.bossHpBar.style.width = `${(state.bossHp / state.maxBossHp) * 100}%`;

    ui.reservoirText.textContent = `Cấp ${state.reservoirStage} (30% Sát Thương)`;
    ui.bossIntentDesc.textContent = state.bossIntent.desc;

    // Render Center Lane (Triệu Vân vs Xe Đục Thành)
    if (state.lanes.center.enemy && state.lanes.center.enemy.alive) {
      ui.cardEnemyCenter.style.opacity = '1';
      ui.cardEnemyCenter.querySelector('.sc-hp').textContent = `HP: ${state.lanes.center.enemy.hp}`;
    } else {
      ui.cardEnemyCenter.style.opacity = '0.2';
      ui.cardEnemyCenter.querySelector('.sc-hp').textContent = `HP: 0`;
    }

    if (state.lanes.center.player) {
      ui.playerZoneCenter.innerHTML = `
        <div class="soldier-card player-hero-card" style="border: 2px solid var(--gold-primary); background: rgba(212,175,55,0.15);">
          <div class="sc-badge">VẠN NHÂN ĐỊCH</div>
          <div class="sc-name" style="color: var(--gold-primary); font-weight: 800;">Triệu Tử Long</div>
          <div class="sc-hp" style="color: #4ade80;">HP: ${state.lanes.center.player.hp}</div>
          <div class="sc-atk" style="color: #f87171;">ATK: ${state.lanes.center.player.atk}</div>
        </div>
      `;
    }
  }

  function spawnDamage(targetEl, val, isCritical = false) {
    if (!targetEl) return;
    const pop = document.createElement('div');
    pop.className = `damage-pop ${isCritical ? 'damage-crit' : ''}`;
    pop.textContent = `-${val}`;
    pop.style.left = '50%';
    pop.style.top = '30%';
    targetEl.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
  }

  function playCard(cardType) {
    if (cardType === 'seventh-spear') {
      if (state.mana < 2) {
        showToast("⚠️ Không đủ 2 Mana!");
        return;
      }
      state.mana -= 2;
      triggerShake();
      triggerLightning();
      state.bossIntent.interrupted = true;
      state.bossIntent.desc = "⚡ Ý ĐỒ BỊ PHÁ VỠ bởi Thất Thám Bàn Xà của Triệu Tử Long!";
      ui.bossIntentDesc.textContent = state.bossIntent.desc;
      state.bossHp = Math.max(0, state.bossHp - 60);
      spawnDamage(ui.bossHpBar, 60, true);
      showToast("⚡ THẤT THÁM BÀN XÀ! Ngắt hoàn toàn ý đồ của Địch Hỏa & Gây 60 DMG!", true);
      renderBattlefield();
      checkVictoryDefeat();
      return;
    }

    if (cardType === 'flood') {
      if (!state.unlocked.giaHu && !state.unlocked.flood) {
        showToast("🔒 Thẻ 'XẢ LŨ THANH THỦY' bị khóa! Cần kế sách Giả Hủ ở Chương 27-35.");
        return;
      }
      if (state.mana < 5) {
        showToast("⚠️ Cần 5 Mana để phát lệnh phá đập xả lũ!");
        return;
      }
      state.mana -= 5;
      triggerShake();
      triggerLightning();

      if (state.lanes.center.enemy) {
        state.lanes.center.enemy.hp = 0;
        state.lanes.center.enemy.alive = false;
        spawnDamage(ui.cardEnemyCenter, 150, true);
      }
      state.bossHp = Math.max(0, state.bossHp - 120);
      spawnDamage(ui.bossHpBar, 120, true);
      showToast("🌊 THỦY CÔNG PHÁ ĐẬP! Dòng thác cuốn phăng Xe Đục Thành & Gây 120 DMG lên Địch Hỏa!", true);
      renderBattlefield();
      checkVictoryDefeat();
      return;
    }

    if (cardType === 'hamtran') {
      if (state.mana < 3) {
        showToast("⚠️ Cần 3 Mana để triển khai Hãm Trận Doanh!");
        return;
      }
      if (!state.lanes.left.player) {
        state.mana -= 3;
        state.lanes.left.player = { id: 'hamtran', name: 'Hãm Trận Doanh', hp: 140, atk: 65 };
        ui.playerZoneLeft.innerHTML = `
          <div class="soldier-card player-soldier-card" style="border: 2px solid #06b6d4; background: rgba(6,182,212,0.15);">
            <div class="sc-badge">THIẾT GIÁP</div>
            <div class="sc-name" style="color: #67e8f9; font-weight: 800;">Hãm Trận Doanh</div>
            <div class="sc-hp" style="color: #4ade80;">HP: 140</div>
            <div class="sc-atk" style="color: #f87171;">ATK: 65</div>
          </div>
        `;
        showToast("🛡️ Đã bố trí Hãm Trận Doanh án ngữ Tả Dực!");
        renderBattlefield();
      } else {
        showToast("⚠️ Tả Dực đã có quân phòng thủ!");
      }
      return;
    }

    if (cardType === 'bachma') {
      if (state.mana < 4) {
        showToast("⚠️ Cần 4 Mana để triển khai Bạch Mã Nghĩa Tòng!");
        return;
      }
      if (!state.lanes.right.player) {
        state.mana -= 4;
        state.lanes.right.player = { id: 'bachma', name: 'Bạch Mã Kỵ', hp: 110, atk: 80 };
        ui.playerZoneRight.innerHTML = `
          <div class="soldier-card player-soldier-card" style="border: 2px solid #f59e0b; background: rgba(245,158,11,0.15);">
            <div class="sc-badge">ĐỘT KÍCH</div>
            <div class="sc-name" style="color: #fcd34d; font-weight: 800;">Bạch Mã Kỵ</div>
            <div class="sc-hp" style="color: #4ade80;">HP: 110</div>
            <div class="sc-atk" style="color: #f87171;">ATK: 80</div>
          </div>
        `;
        showToast("🐎 Bạch Mã Nghĩa Tòng xuất kích tại Hữu Dực!");
        renderBattlefield();
      } else {
        showToast("⚠️ Hữu Dực đã có kỵ binh phong tỏa!");
      }
      return;
    }
  }

  function executeTurn() {
    triggerShake();
    showToast("⚔️ BA QUÂN XUNG TRẬN! QUYẾT TOÁN HIỆP ĐẤU!", true);

    // Player Attacks
    if (state.lanes.center.player && state.lanes.center.enemy && state.lanes.center.enemy.alive) {
      state.lanes.center.enemy.hp = Math.max(0, state.lanes.center.enemy.hp - state.lanes.center.player.atk);
      spawnDamage(ui.cardEnemyCenter, state.lanes.center.player.atk, true);
      if (state.lanes.center.enemy.hp === 0) state.lanes.center.enemy.alive = false;
    } else if (state.lanes.center.player) {
      spawnDamage(ui.bossHpBar, 75);
      state.bossHp = Math.max(0, state.bossHp - 75);
    }

    // Left Lane
    if (state.lanes.left.player && state.lanes.left.enemy && state.lanes.left.enemy.alive) {
      state.lanes.left.enemy.hp = Math.max(0, state.lanes.left.enemy.hp - state.lanes.left.player.atk);
      spawnDamage(ui.cardEnemyLeft, state.lanes.left.player.atk);
      if (state.lanes.left.enemy.hp === 0) state.lanes.left.enemy.alive = false;
    }

    // Right Lane
    if (state.lanes.right.player && state.lanes.right.enemy && state.lanes.right.enemy.alive) {
      state.lanes.right.enemy.hp = Math.max(0, state.lanes.right.enemy.hp - state.lanes.right.player.atk);
      spawnDamage(ui.cardEnemyRight, state.lanes.right.player.atk);
      if (state.lanes.right.enemy.hp === 0) state.lanes.right.enemy.alive = false;
    }

    // Enemy Intents Resolution
    if (state.lanes.center.enemy && state.lanes.center.enemy.alive) {
      state.wallHp = Math.max(0, state.wallHp - state.lanes.center.enemy.atk);
      spawnDamage(ui.wallHpBar, state.lanes.center.enemy.atk);
    }

    if (state.lanes.left.enemy && state.lanes.left.enemy.alive) {
      if (state.lanes.left.player) {
        state.lanes.left.player.hp = Math.max(0, state.lanes.left.player.hp - state.lanes.left.enemy.atk);
        spawnDamage(ui.playerZoneLeft, state.lanes.left.enemy.atk);
        if (state.lanes.left.player.hp === 0) state.lanes.left.player = null;
      } else {
        state.wallHp = Math.max(0, state.wallHp - 25);
        spawnDamage(ui.wallHpBar, 25);
      }
    }

    if (state.lanes.right.enemy && state.lanes.right.enemy.alive) {
      if (state.lanes.right.player) {
        state.lanes.right.player.hp = Math.max(0, state.lanes.right.player.hp - state.lanes.right.enemy.atk);
        spawnDamage(ui.playerZoneRight, state.lanes.right.enemy.atk);
        if (state.lanes.right.player.hp === 0) state.lanes.right.player = null;
      } else {
        state.wallHp = Math.max(0, state.wallHp - 30);
        spawnDamage(ui.wallHpBar, 30);
      }
    }

    // Boss Intent
    if (!state.bossIntent.interrupted) {
      state.wallHp = Math.max(0, state.wallHp - state.bossIntent.damage);
      spawnDamage(ui.wallHpBar, state.bossIntent.damage, true);
    } else {
      state.bossIntent.interrupted = false;
    }

    // Turn prep
    state.turn++;
    state.mana = Math.min(state.maxMana, state.mana + 4);
    if (state.reservoirStage < 3) {
      state.reservoirStage++;
      showToast(`💧 Trữ lượng nước sông Thanh Thủy tăng lên Cấp ${state.reservoirStage}!`);
    }

    renderBattlefield();
    checkVictoryDefeat();
  }

  function checkVictoryDefeat() {
    if (state.bossHp <= 0) {
      setTimeout(() => {
        ui.victoryModal.classList.remove('hidden');
        triggerLightning();
      }, 700);
      return;
    }

    if (state.wallHp <= 0) {
      alert("⚠️ Thành Thanh Châu thất thủ! Nam Ly phá vỡ phòng tuyến. Hãy thử lại sách lược đắp đê!");
      location.reload();
    }
  }

  // =========================================================================
  // 11. HUD VIEW SWITCHING & RESOURCES
  // =========================================================================
  function switchView(viewName) {
    if (viewName === 'map' && !state.unlocked.strategyMap) {
      showToast("🔒 Tầng 2: Đế Nghiệp Sa Bàn bị khóa! Cần hoàn thành Chương 15 (Thánh Chỉ Chinh Bắc).");
      return;
    }
    if (viewName === 'battle' && !state.unlocked.battleFront) {
      showToast("🔒 Tầng 3: Sa Trường Thẻ Bài bị khóa! Cần tiến tới Chương 48 (Đại Chiến Thanh Châu).");
      return;
    }

    state.currentView = viewName;
    [ui.btnTabVn, ui.btnTabMap, ui.btnTabBattle].forEach(btn => btn.classList.remove('active'));
    [ui.viewVn, ui.viewMap, ui.viewBattle].forEach(view => view.classList.remove('active'));

    if (viewName === 'vn') {
      ui.btnTabVn.classList.add('active');
      ui.viewVn.classList.add('active');
    } else if (viewName === 'map') {
      ui.btnTabMap.classList.add('active');
      ui.viewMap.classList.add('active');
      renderMapNodeDetails(state.selectedNode);
    } else if (viewName === 'battle') {
      ui.btnTabBattle.classList.add('active');
      ui.viewBattle.classList.add('active');
      renderBattlefield();
    }
  }

  function updateHudResources() {
    ui.txtSuspicion.textContent = `${state.suspicion}%`;
    ui.barSuspicion.style.width = `${state.suspicion}%`;

    if (state.suspicion >= 80) {
      ui.barSuspicion.style.background = 'linear-gradient(90deg, #dc2626, #ef4444)';
      ui.suspicionDesc.textContent = 'NGUY CẤP: Vũ Hoàng chuẩn bị ban rượu độc!';
      ui.suspicionDesc.style.color = '#ef4444';
    } else if (state.suspicion >= 50) {
      ui.barSuspicion.style.background = 'linear-gradient(90deg, #f59e0b, #dc2626)';
      ui.suspicionDesc.textContent = 'Cảnh báo: Hoàng Đế phái mật thám giám sát!';
      ui.suspicionDesc.style.color = '#f59e0b';
    } else {
      ui.barSuspicion.style.background = 'linear-gradient(90deg, #10b981, #f59e0b)';
      ui.suspicionDesc.textContent = 'Cảnh giới: An Toàn Tương Đối';
      ui.suspicionDesc.style.color = '#94a3b8';
    }

    ui.txtGold.textContent = state.gold.toLocaleString('vi-VN');
    ui.txtFood.textContent = state.food.toLocaleString('vi-VN');
    if (state.unlocked.strategyMap) {
      ui.txtAp.textContent = `${state.ap} / ${state.maxAp}`;
      ui.txtAp.style.color = '#fff';
    } else {
      ui.txtAp.textContent = 'Khóa (Ch.15)';
      ui.txtAp.style.color = '#64748b';
    }
  }

  // =========================================================================
  // 12. FX & FEEDBACK UTILITIES
  // =========================================================================
  function triggerShake() {
    const stage = document.body;
    stage.classList.remove('screen-shake');
    void stage.offsetWidth;
    stage.classList.add('screen-shake');
    setTimeout(() => stage.classList.remove('screen-shake'), 600);
  }

  function triggerLightning() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.background = 'rgba(255, 215, 0, 0.4)';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.4s ease';
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 400);
    }, 50);
  }

  function showToast(msg, isHighlight = false) {
    const toast = document.createElement('div');
    toast.className = 'hud-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = isHighlight ? 'linear-gradient(90deg, #b45309, #78350f)' : 'rgba(15, 23, 42, 0.95)';
    toast.style.border = isHighlight ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.15)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 18px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)';
    toast.style.fontSize = '13px';
    toast.style.fontWeight = '700';
    toast.style.zIndex = '10000';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '8px';
    toast.textContent = msg;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // =========================================================================
  // 13. EVENT LISTENERS INITIALIZATION
  // =========================================================================
  function initEvents() {
    // Nav Tabs
    if (ui.btnTabVn) ui.btnTabVn.addEventListener('click', () => switchView('vn'));
    if (ui.btnTabMap) ui.btnTabMap.addEventListener('click', () => switchView('map'));
    if (ui.btnTabBattle) ui.btnTabBattle.addEventListener('click', () => switchView('battle'));

    // Chapter Milestone Tracker Modal
    if (ui.btnOpenMilestones) {
      ui.btnOpenMilestones.addEventListener('click', () => {
        renderMilestoneTimeline();
        if (ui.milestoneMatrixModal) ui.milestoneMatrixModal.classList.remove('hidden');
      });
    }
    if (ui.btnCloseMatrix && ui.milestoneMatrixModal) {
      ui.btnCloseMatrix.addEventListener('click', () => {
        ui.milestoneMatrixModal.classList.add('hidden');
      });
    }

    // Gacha Altar Controls
    if (ui.btnHudGacha) ui.btnHudGacha.addEventListener('click', openGachaModal);
    if (ui.btnCloseGacha && ui.gachaModal) {
      ui.btnCloseGacha.addEventListener('click', () => {
        ui.gachaModal.classList.add('hidden');
      });
    }
    if (ui.btnDoSummon) ui.btnDoSummon.addEventListener('click', performSummon);
    if (ui.btnRevealInspect) {
      ui.btnRevealInspect.addEventListener('click', () => {
        openHeroInspector(state.lastSummonedHero ? state.lastSummonedHero.id : 'hero_zhaoyun');
      });
    }
    if (ui.btnRevealConfirm && ui.gachaModal) {
      ui.btnRevealConfirm.addEventListener('click', () => {
        ui.gachaModal.classList.add('hidden');
        const hName = state.lastSummonedHero ? state.lastSummonedHero.name : "Triệu Tử Long";
        showToast(`⚔️ Đã gia nhập đội ngũ! ${hName} đã sẵn sàng phò tá Chúa Công.`);
      });
    }

    // Hero Detail Inspector
    if (ui.btnHudHero) ui.btnHudHero.addEventListener('click', () => openHeroInspector('hero_zhaoyun'));
    if (ui.btnCloseHeroDetail && ui.heroDetailModal) {
      ui.btnCloseHeroDetail.addEventListener('click', () => {
        ui.heroDetailModal.classList.add('hidden');
      });
    }

    // Unlock Event Notification Modal
    if (ui.btnCloseUnlock && ui.unlockEventModal) {
      ui.btnCloseUnlock.addEventListener('click', () => {
        ui.unlockEventModal.classList.add('hidden');
      });
    }

    // VN Dialogue Controls
    if (ui.btnVnAdvance) ui.btnVnAdvance.addEventListener('click', advanceDialogue);
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && state.currentView === 'vn') {
        e.preventDefault();
        advanceDialogue();
      }
    });

    if (ui.btnVnLog && ui.backlogDrawer) {
      ui.btnVnLog.addEventListener('click', () => {
        ui.backlogDrawer.classList.toggle('hidden');
      });
    }
    if (ui.btnCloseLog && ui.backlogDrawer) {
      ui.btnCloseLog.addEventListener('click', () => {
        ui.backlogDrawer.classList.add('hidden');
      });
    }

    if (ui.btnVnAuto) {
      ui.btnVnAuto.addEventListener('click', () => {
        state.autoAdvance = !state.autoAdvance;
        ui.btnVnAuto.style.color = state.autoAdvance ? 'var(--gold-primary)' : 'var(--text-muted)';
        if (state.autoAdvance) {
          showToast("▶ Chế độ tự động đọc: BẬT");
          state.autoTimer = setInterval(() => {
            if (state.currentView === 'vn' && ui.choiceModal && ui.choiceModal.classList.contains('hidden')) {
              advanceDialogue();
            }
          }, 3200);
        } else {
          showToast("⏹ Chế độ tự động đọc: TẮT");
          clearInterval(state.autoTimer);
        }
      });
    }

    // Sa Bàn Map Controls
    if (ui.provinceNodes) {
      ui.provinceNodes.forEach(node => {
        node.addEventListener('click', () => {
          renderMapNodeDetails(node.dataset.node);
        });
      });
    }

    if (ui.btnActionSoap) ui.btnActionSoap.addEventListener('click', handleSoapCommand);
    if (ui.btnActionTribute) ui.btnActionTribute.addEventListener('click', handleBribeCommand);
    if (ui.btnActionBattle) ui.btnActionBattle.addEventListener('click', () => switchView('battle'));
    if (ui.btnIntercept) ui.btnIntercept.addEventListener('click', () => switchView('battle'));

    // Battle Card Deck
    document.querySelectorAll('.hand-card').forEach(card => {
      card.addEventListener('click', () => {
        playCard(card.dataset.card);
      });
    });

    if (ui.btnExecuteTurn) ui.btnExecuteTurn.addEventListener('click', executeTurn);

    // Victory Next
    if (ui.btnTriumphNext && ui.victoryModal) {
      ui.btnTriumphNext.addEventListener('click', () => {
        ui.victoryModal.classList.add('hidden');
        state.gold += 20000;
        state.food += 50000;
        updateHudResources();
        showToast("🎉 Đại thắng! Đã nhận 20.000 Vàng & 50.000 Thạch Lương.", true);
        switchView('vn');
      });
    }

    if (ui.btnResetGame) {
      ui.btnResetGame.addEventListener('click', resetGame);
    }
  }

  // Expose reset to window
  window.resetGame = resetGame;
  window.state = state;
  window.ink = ink;

  // =========================================================================
  // 14. INITIAL BOOT
  // =========================================================================
  ink.start('chapter_1_start');
  advanceChapter(1);
  updateProgressTrackerUI();
  updateHudResources();
  initEvents();
  renderCurrentDialogue();
  console.log("⚡ [Prototype V3] Khởi động thành công với 28 danh tướng và Ink Engine!");
});
