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
    { id: 20, badge: "CHƯƠNG 20", title: "Triệu Hoán Cao Thuận & Hãm Trận Doanh", knot: "chapter_20_start", featureUnlocked: "Triệu Hoán Cao Thuận & Khởi Tạo Hãm Trận Doanh", lore: "Dùng vạn lượng hoàng kim kích hoạt Bái Tướng Đài triệu hoán Cao Thuận, sáng lập quân đoàn thiết giáp Hãm Trận Doanh.", unlocked: false, active: false },
    { id: 27, badge: "CHƯƠNG 27", title: "Hố Vũ Hoàng & Triệu Hoán Giả Hủ", knot: "chapter_27_transition", featureUnlocked: "Triệu Hoán Độc Sĩ Giả Hủ & Mưu Kế Độc Tâm", lore: "Hố 20 vạn vàng từ triều đình, tế 10 vạn vàng triệu hoán Độc Sĩ Giả Hủ từ Bái Tướng Thần Đàn, định độc kế hủy diệt địch quân.", unlocked: false, active: false },
    { id: 35, badge: "CHƯƠNG 35", title: "Đại Kế Thủy Công Thanh Thủy", knot: "chapter_35_transition", featureUnlocked: "Siêu Thẻ Bài: Xả Lũ Sông Thanh Thủy", lore: "Đắp đập ngăn sông Thanh Thủy thượng nguồn, chuẩn bị xả lũ nhấn chìm chiến thành địch.", unlocked: false, active: false },
    { id: 43, badge: "CHƯƠNG 43", title: "Vạn Thạch Quân Lương Tiền Tuyến", knot: "chapter_43_transition", featureUnlocked: "Kho Lương Hậu Cần (+50.000 Thạch Lương)", lore: "Bí mật thu mua quân lương từ thương đoàn Giang Đông, sĩ khí ba quân đạt mức tối đa.", unlocked: false, active: false },
    { id: 52, badge: "CHƯƠNG 48-52", title: "Đại Chiến Thành Thanh Châu", knot: "chapter_48_transition", featureUnlocked: "TẦNG 3: Sa Trường Thẻ Bài 3 Làn & Quyết Chiến Địch Hỏa", lore: "5 vạn quân Địch Hỏa vây hãm, dùng thủy kế Giả Hủ và Triệu Vân đại phá quân Nam Ly khải hoàn.", unlocked: false, active: false }
  ];

  // Faction & Identity Progression Stages (Tiến Trình Thế Lực & Định Danh Quý Bình An)
  const factionStages = [
    {
      id: 1,
      minChapter: 1,
      maxChapter: 14,
      sealIcon: "駙",
      factionName: "PHÒ MÃ PHỦ",
      identityTitle: "PHÒ MÃ GIA",
      fullTitle: "Hàn Vi Phò Mã · Đích Tử Phủ Trấn Quốc Công",
      description: "Đích tử thứ ba của phủ Trấn Quốc Công Quý gia, ở rể hoàng tộc Đại Vũ chịu đủ ghẻ lạnh và nghi kỵ. Ẩn nhẫn giấu tài, phá giải vế đối cứu nguy thể diện quốc gia tại điện Kim Loan, thức tỉnh Bái Tướng Đài triệu hoán Triệu Tử Long và phát minh xà phòng Thấu Hoa Cao gây dựng ngân quỹ.",
      buffSummary: "Ngân Khố Bí Mật · Thức Tỉnh Anh Hồn Lệnh · Chiêu Mộ Triệu Vân",
      colorTag: "tag-amber"
    },
    {
      id: 2,
      minChapter: 15,
      maxChapter: 19,
      sealIcon: "征",
      factionName: "BẮC CHINH TIỀN PHONG",
      identityTitle: "TIỀN PHONG TƯỚNG QUÂN",
      fullTitle: "Chinh Bắc Tiền Phong Tướng Quân",
      description: "Bắc Cương khói lửa, Vũ Hoàng hạ chỉ phong làm Tiền Phong Tướng Quân thống lĩnh cấm quân xuất chinh bắc phạt. Tiếp nhận 5.000 Vàng và Hổ Phù Lệnh Sa Bàn (AP), khai mở quyền thám sát và điều phối binh mã trên Sa Bàn Sơn Hà.",
      buffSummary: "Khai Mở Tầng 2 Sa Bàn · Hổ Phù Lệnh Sa Bàn (AP) · Điều Binh Bốn Cõi",
      colorTag: "tag-cyan"
    },
    {
      id: 3,
      minChapter: 20,
      maxChapter: 47,
      sealIcon: "鎮",
      factionName: "TRẤN BẮC QUÂN",
      identityTitle: "TRẤN BẮC TƯỚNG QUÂN",
      fullTitle: "Trấn Bắc Quân Thống Soái · Tiền Tuyến Thống Lĩnh",
      description: "Tự chủ quân cơ nơi biên ải hiểm trở, bỏ 5.000 Vàng rèn đúc thiết giáp thu phục 800 dũng sĩ Hãm Trận Doanh (Cao Thuận), chiêu mộ Độc Sĩ Giả Hủ mưu định giang sơn, đắp đập ngăn sông Thanh Thủy, thu mua 5 vạn thạch quân lương. Thế lực Trấn Bắc Quân danh chấn thiên hạ.",
      buffSummary: "Thu Phục Hãm Trận Doanh · Độc Kế Giả Hủ · Đại Kế Thủy Công · 50.000 Thạch Lương",
      colorTag: "tag-crimson"
    },
    {
      id: 4,
      minChapter: 48,
      maxChapter: 51,
      sealIcon: "北",
      factionName: "BA CHÂU BẮC CẢNH",
      identityTitle: "CHINH BẮC ĐẠI TƯỚNG QUÂN",
      fullTitle: "Chinh Bắc Đại Tướng Quân · Chúa Công Ba Châu",
      description: "Thống lĩnh đại chiến Thanh Châu, xả lũ sông Thanh Thủy và phái Triệu Tử Long đơn thương độc mã bắt sống phản tướng Địch Hỏa, quét sạch 5 vạn phản quân. Vũ Hoàng ban phong chức Chinh Bắc Đại Tướng Quân, nắm trọn 3 châu hiểm yếu phương Bắc (Thanh Châu, Liễu Châu, Khai Nguyên), binh hùng tướng mạnh trở thành thế lực cát cứ chư hầu lớn nhất.",
      buffSummary: "Thống Nhất Bắc Cương · Nắm Giữ Ba Châu · Mười Vạn Hùng Binh · Trấn Nhiếp Phiên Trấn",
      colorTag: "tag-emerald"
    },
    {
      id: 5,
      minChapter: 52,
      maxChapter: 999,
      sealIcon: "帝",
      factionName: "ĐỊNH QUỐC HOÀNG TRIỀU",
      identityTitle: "ĐỊNH QUỐC HOÀNG ĐẾ",
      fullTitle: "Khai Quốc Hoàng Đế · Cửu Ngũ Chí Tôn",
      description: "Kinh đô đại biến, chín hoàng tử tranh giành ngai vàng tương tàn, xã tắc ngả nghiêng. Quý Bình An từ Ba Châu Bắc Cảnh hưng binh tiến vào kinh kỳ dẹp yên phản loạn, đăng cơ Hoàng Đế tại điện Kim Loan, khai sáng triều đại Định Quốc Hoàng Triều, mở ra thiên hạ thái bình.",
      buffSummary: "Đăng Cơ Hoàng Đế · Niên Hiệu Định Quốc · Nhất Thống Thiên Hạ Giang Sơn",
      colorTag: "tag-gold"
    }
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
    hostForce: 5,         // Chân Khí Bổn Thể Quý Bình An
    heroProgression: {},  // heroId -> 5 Trọng Trận Khắc Minh
    activeInspectorCategory: 'all',

    // Gacha & Roster State (Chưa chiêu mộ anh linh nào)
    pityCount: 0,
    hasWon5050: false,
    ownedHeroIds: [],     // Trống rỗng! Chiêu mộ Triệu Vân tại Ch.5
    selectedInspectorHeroId: null,
    lastSummonedHero: null,
    summonHistory: [],

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

    // Faction & Identity Plate (Cụm Trái)
    dynastySealPlate: document.getElementById('dynasty-seal-plate'),
    dynastySealIcon: document.getElementById('dynasty-seal-icon'),
    dynastyEra: document.getElementById('dynasty-era'),
    dynastyRole: document.getElementById('dynasty-role'),
    factionModal: document.getElementById('faction-progression-modal'),
    btnCloseFaction: document.getElementById('btn-close-faction'),
    factionCurrentCard: document.getElementById('faction-current-card'),
    factionStagesList: document.getElementById('faction-stages-list'),

    btnTabVn: document.getElementById('btn-tab-vn'),
    btnTabMap: document.getElementById('btn-tab-map'),
    btnTabBattle: document.getElementById('btn-tab-battle'),
    tabMapLock: document.getElementById('tab-map-lock'),
    tabBattleLock: document.getElementById('tab-battle-lock'),
    viewVn: document.getElementById('view-vn'),
    viewMap: document.getElementById('view-map'),
    viewBattle: document.getElementById('view-battle'),

    // HUD Monitors
    suspicionCenserIcon: document.getElementById('suspicion-censer-icon'),
    txtSuspicion: document.getElementById('txt-suspicion'),
    barSuspicion: document.getElementById('bar-suspicion'),
    suspicionDesc: document.getElementById('suspicion-status-desc'),
    txtGold: document.getElementById('txt-gold'),
    txtFood: document.getElementById('txt-food'),
    txtAp: document.getElementById('txt-ap'),

    // Visual Novel Stage
    vnStageContainer: document.getElementById('vn-stage-container') || document.getElementById('vn-stage'),
    vnDialoguePanel: document.getElementById('vn-dialogue-panel'),
    vnSpeaker: document.getElementById('vn-speaker'),
    vnSpeakerSub: document.getElementById('vn-speaker-sub'),
    vnDialogueText: document.getElementById('vn-dialogue-text'),
    btnVnAdvance: document.getElementById('btn-vn-advance'),
    btnVnAuto: document.getElementById('btn-vn-auto'),
    btnVnLog: document.getElementById('btn-vn-log'),
    vnBranchIndicator: document.getElementById('vn-branch-indicator'),
    actorLeftSlot: document.getElementById('actor-left-slot'),
    actorLeftAvatar: document.getElementById('actor-left-avatar'),
    actorLeftImg: document.getElementById('actor-left-img'),
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

    // Gacha Summoning Altar Modal (Diegetic Theater)
    gachaModal: document.getElementById('gacha-modal'),
    btnCloseGacha: document.getElementById('btn-close-gacha'),
    gachaEmberCanvas: document.getElementById('gacha-ember-canvas'),
    btnGachaRules: document.getElementById('btn-gacha-rules'),
    gachaRulesModal: document.getElementById('gacha-rules-modal'),
    btnCloseGachaRules: document.getElementById('btn-close-gacha-rules'),
    btnGachaHistory: document.getElementById('btn-gacha-history'),
    gachaHistoryModal: document.getElementById('gacha-history-modal'),
    btnCloseGachaHistory: document.getElementById('btn-close-gacha-history'),
    gachaHistoryList: document.getElementById('gacha-history-list'),
    btnGachaSkip: document.getElementById('btn-gacha-skip'),
    gachaTicketDisplay: document.getElementById('gacha-ticket-display'),
    gachaJadeDisplay: document.getElementById('gacha-jade-display'),
    gachaPityCounter: document.getElementById('gacha-pity-counter'),
    altarBtnRow: document.getElementById('altar-btn-row'),
    btnDoSummon: document.getElementById('btn-do-summon'),
    revealActionRow: document.getElementById('reveal-action-row'),
    btnRevealInspect: document.getElementById('btn-reveal-inspect'),
    btnRevealAgain: document.getElementById('btn-reveal-again'),
    btnRevealConfirm: document.getElementById('btn-reveal-confirm'),
    summonTalisman: document.getElementById('summon-talisman'),
    talismanHint: document.getElementById('talisman-hint'),
    baguaFormation: document.getElementById('bagua-formation'),
    kintsugiFracturesLayer: document.getElementById('kintsugi-fractures-layer'),
    sealShatterFx: document.getElementById('seal-shatter-fx'),
    gachaGrandReveal: document.getElementById('gacha-grand-reveal'),
    revealCardRarity: document.getElementById('reveal-card-rarity'),
    revealCardImg: document.getElementById('reveal-card-img'),
    revealCardName: document.getElementById('reveal-card-name'),
    revealCardTitle: document.getElementById('reveal-card-title'),
    revealCardRealm: document.getElementById('reveal-card-realm'),
    revealSealBadge: document.getElementById('reveal-seal-badge'),
    revealQuoteText: document.getElementById('reveal-quote-text'),
    revealStatForce: document.getElementById('reveal-stat-force'),
    revealStatCmd: document.getElementById('reveal-stat-cmd'),
    revealStatInt: document.getElementById('reveal-stat-int'),
    revealStatTroop: document.getElementById('reveal-stat-troop'),

    // Hero Card Inspector: Tranh Cuộn Thủy Mặc & Trúc Giản Quân Cơ
    heroDetailModal: document.getElementById('hero-detail-modal'),
    scrollHostForce: document.getElementById('scroll-host-force'),
    scrollGoldDisplay: document.getElementById('scroll-gold-display'),
    btnCloseHeroDetail: document.getElementById('btn-close-hero-detail'),
    bambooTalliesRow: document.getElementById('bamboo-tallies-row'),
    bambooTalliesViewport: document.getElementById('bamboo-tallies-viewport'),
    scrollHeroContent: document.getElementById('scroll-hero-content'),
    scrollNoticeBanner: document.getElementById('scroll-notice-banner'),
    defeatModal: document.getElementById('defeat-modal'),
    btnDefeatRetry: document.getElementById('btn-defeat-retry'),
    btnDefeatRetreat: document.getElementById('btn-defeat-retreat'),

    // Feature Unlock Modal
    unlockEventModal: document.getElementById('unlock-event-modal'),
    unlockModalIcon: document.getElementById('unlock-modal-icon'),
    unlockModalTitle: document.getElementById('unlock-modal-title'),
    unlockModalName: document.getElementById('unlock-modal-name'),
    unlockModalLore: document.getElementById('unlock-modal-lore'),
    unlockModalEffect: document.getElementById('unlock-modal-effect'),
    btnCloseUnlock: document.getElementById('btn-close-unlock'),

    // Map View (Tier 2)
    provinceNodes: document.querySelectorAll('.province-node, .map-node'),
    mapDetailsCard: document.getElementById('map-node-details'),
    nodeTitle: document.getElementById('panel-city-name') || document.getElementById('node-title'),
    nodeDesc: document.getElementById('panel-city-desc') || document.getElementById('node-desc'),
    nodeActionCost: document.getElementById('node-action-cost'),
    btnActionSoap: document.getElementById('btn-action-soap'),
    btnActionTribute: document.getElementById('btn-action-tribute'),
    btnActionBattle: document.getElementById('btn-action-battle'),
    btnIntercept: document.getElementById('btn-intercept') || document.getElementById('btn-intercept-threat'),

    // Battle View (Tier 3)
    wallHpBar: document.getElementById('wall-hp-bar'),
    wallHpText: document.getElementById('wall-hp-val') || document.getElementById('wall-hp-text'),
    bossHpBar: document.getElementById('enemy-hp-bar') || document.getElementById('boss-hp-bar'),
    bossHpText: document.getElementById('enemy-hp-val') || document.getElementById('boss-hp-text'),
    bossIntentDesc: document.getElementById('boss-intent-desc') || document.getElementById('boss-intent-display'),
    reservoirText: document.getElementById('reservoir-text') || document.getElementById('reservoir-card'),
    btnExecuteTurn: document.getElementById('btn-execute-turn'),
    victoryModal: document.getElementById('victory-modal'),
    btnTriumphNext: document.getElementById('btn-triumph-next'),

    cardEnemyLeft: document.getElementById('card-enemy-left') || document.getElementById('enemy-left'),
    cardEnemyCenter: document.getElementById('card-enemy-center') || document.getElementById('enemy-center'),
    cardEnemyRight: document.getElementById('card-enemy-right') || document.getElementById('enemy-right'),
    playerZoneLeft: document.getElementById('player-zone-left') || document.getElementById('player-left'),
    playerZoneCenter: document.getElementById('player-zone-center') || document.getElementById('player-center'),
    playerZoneRight: document.getElementById('player-zone-right') || document.getElementById('player-right')
  };

  // =========================================================================
  // 3B. CENSER SMOKE PARTICLE SYSTEM (Diegetic Suspicion Visualization)
  // =========================================================================
  const censerSmokeSystem = {
    canvas: null,
    ctx: null,
    particles: [],
    tier: 'safe',
    animId: null,
    
    init() {
      this.canvas = document.getElementById('suspicion-smoke-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      if (this.animId) cancelAnimationFrame(this.animId);
      this.animate();
    },
    
    setTier(pct) {
      const el = document.querySelector('.suspicion-diegetic');
      if (!el) return;
      el.classList.remove('tier-safe', 'tier-caution', 'tier-danger');
      
      if (pct <= 30) {
        this.tier = 'safe';
        el.classList.add('tier-safe');
      } else if (pct <= 60) {
        this.tier = 'caution';
        el.classList.add('tier-caution');
      } else {
        this.tier = 'danger';
        el.classList.add('tier-danger');
      }
    },
    
    spawnParticle() {
      const configs = {
        safe: { count: 1, color: [148, 163, 184], maxAlpha: 0.25, speed: 0.3, size: 2 },
        caution: { count: 2, color: [251, 191, 36], maxAlpha: 0.4, speed: 0.5, size: 3 },
        danger: { count: 3, color: [239, 68, 68], maxAlpha: 0.55, speed: 0.7, size: 4 }
      };
      const cfg = configs[this.tier] || configs.safe;
      for (let i = 0; i < cfg.count; i++) {
        this.particles.push({
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
    },
    
    animate() {
      if (!this.ctx) return;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, 60, 40);
      
      // Spawn new particles every few frames
      if (Math.random() < 0.3) this.spawnParticle();
      
      // Update and draw particles
      this.particles = this.particles.filter(p => {
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
      
      this.animId = requestAnimationFrame(() => this.animate());
    }
  };

  // =========================================================================
  // 4. INK ENGINE INITIALIZATION & SCRIPT LOADING
  // =========================================================================
  const ink = new (window.InkEngine || function() {})();
  if (GD.ink_stories) {
    for (const key of Object.keys(GD.ink_stories)) {
      if (typeof GD.ink_stories[key] === 'string') {
        ink.loadStoryScript(GD.ink_stories[key]);
      }
    }
  }

  // Dynamic Multi-Scene Background Engine (Cross-Fade Layering)
  const SCENE_BACKGROUNDS = {
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

  let activeBgLayer = 'a';
  function changeSceneBackground(bgKey) {
    const bgUrl = SCENE_BACKGROUNDS[bgKey] || `assets/images/${bgKey}.jpg`;
    const layerA = document.getElementById('vn-bg-layer-a');
    const layerB = document.getElementById('vn-bg-layer-b');
    if (!layerA || !layerB) return;

    if (activeBgLayer === 'a') {
      layerB.style.backgroundImage = `url('${bgUrl}')`;
      layerB.classList.add('active');
      layerA.classList.remove('active');
      activeBgLayer = 'b';
    } else {
      layerA.style.backgroundImage = `url('${bgUrl}')`;
      layerA.classList.add('active');
      layerB.classList.remove('active');
      activeBgLayer = 'a';
    }
  }

  // Hook Ink Effects & Visual Directives
  ink.setEffectHandler((tag) => {
    if (!tag) return;

    // 1. Scene Background Transitions
    if (tag.startsWith("BACKGROUND:")) {
      const bgKey = tag.replace(/^BACKGROUND:\s*/, '').trim();
      changeSceneBackground(bgKey);
      return;
    }

    // 2. Ambient Atmosphere (Rain, Fog, Clear)
    if (tag.startsWith("AMBIENT:")) {
      const ambientType = tag.replace(/^AMBIENT:\s*/, '').trim().toLowerCase();
      const vnStage = document.getElementById('vn-stage');
      if (vnStage) {
        if (ambientType.includes("rain")) {
          vnStage.classList.add('ambient-rain');
        } else if (ambientType === "clear" || ambientType === "none") {
          vnStage.classList.remove('ambient-rain');
        }
      }
      return;
    }

    // 3. Chapter Title Banner Updates
    if (tag.startsWith("CHAPTER_TITLE:")) {
      const titleStr = tag.replace(/^CHAPTER_TITLE:\s*/, '').trim();
      const parts = titleStr.split(":");
      if (parts.length >= 2) {
        if (ui.hudChapterBadge) ui.hudChapterBadge.textContent = parts[0].trim();
        if (ui.hudChapterTitle) ui.hudChapterTitle.textContent = parts.slice(1).join(":").trim();
      } else {
        if (ui.hudChapterTitle) ui.hudChapterTitle.textContent = titleStr;
      }
      return;
    }

    // 4. Standee Actor Directives (Dynamic Cast Placement)
    if (tag.startsWith("ACTORS:")) {
      const actorsStr = tag.replace(/^ACTORS:\s*/, '').trim();
      const actorTokens = actorsStr.split(",").map(t => t.trim());
      const ACTOR_STANDY_TAG_MAP = {
        'qui_binh_an': 'assets/images/actor_quy_binh_an.png',
        'trieu_van': 'assets/images/actor_trieu_van.png',
        'gao_shun': 'assets/images/actor_cao_thuan.png',
        'jia_xu': 'assets/images/actor_gia_hu.png',
        'dien_vi': 'assets/images/actor_dien_vi.png',
        'vu_hoang': 'assets/images/actor_vu_hoang.png',
        'to_kien_phong': 'assets/images/actor_to_kien_phong.png',
        'nam_ly_envoy': 'assets/images/actor_nam_ly_envoy.png',
        'servant': 'assets/images/actor_servant.png',
        'assassin': 'assets/images/actor_assassin.png',
        've_ti_vu': 'assets/images/actor_ve_ti_vu.png'
      };
      actorTokens.forEach(token => {
        const parts = token.split("|").map(t => t.trim());
        const charId = parts[0];
        const pos = parts[1] || 'left';
        const path = ACTOR_STANDY_TAG_MAP[charId];
        if (path) {
          if (pos === 'left' || pos === 'center') {
            if (ui.actorLeftImg) ui.actorLeftImg.src = path;
          } else if (pos === 'right') {
            if (ui.actorRightImg) ui.actorRightImg.src = path;
          }
        }
      });
      return;
    }
    if (tag.startsWith("MUSIC:")) {
      return;
    }

    // 5. FX Directives
    const cleanTag = tag.replace(/^EFFECT:\s*/, '').replace(/^#\s*/, '').trim();
    const parts = cleanTag.split("|").map(s => s.trim());
    const action = parts[0];

    if (action === "camera_shake" || action === "shake_screen") {
      const intensity = parseFloat(parts[1]) || 0.5;
      triggerShake(intensity >= 0.7 ? 'impact' : 'subtle');
    } else if (action === "screen_flash") {
      const color = parts[1] || '#FFD700';
      triggerLightning(color);
    } else if (action === "show_toast") {
      const msg = parts[1] || "Thông báo";
      showToast(msg, true);
    } else if (action === "grant_ticket") {
      const count = Number(parts[1] || 1);
      state.ticketCount += count;
      updateProgressTrackerUI();
      showToast(`[ 令 ] Nhận được Anh Hồn Lệnh × ${count}!`, true);
    } else if (action === "unlock_feature") {
      const feat = parts[1] || action;
      if (feat) triggerUnlockNotification(feat.trim());
    } else if (action === "trigger_gacha") {
      setTimeout(() => openGachaModal({ mode: 'story', returnKnot: 'trieu_van_arrival' }), 600);
    } else if (action === "summon_grand_reveal") {
      const heroId = parts[1] || 'hero_zhaoyun';
      triggerHeroGrandReveal(heroId, () => {
        advanceDialogue();
      });
      return;
    } else if (action === "trigger_battle") {
      switchView('battle');
    } else if (action === "chapter_complete") {
      const chNum = Number(parts[1] || action);
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
    updateFactionIdentityUI();

    const progressPct = (chapterMatrix.indexOf(currentChapter) + 1) / chapterMatrix.length * 100;
    if (ui.hudChFill) ui.hudChFill.style.width = `${progressPct}%`;
    if (ui.hudTicketCount) ui.hudTicketCount.textContent = state.ticketCount;
    if (ui.gachaTicketDisplay) ui.gachaTicketDisplay.textContent = state.ticketCount;

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
        cardFlood.title = "[ 封 ] Khóa: Cần hoàn thành Chương 27-35 (Kế sách Thủy Công)";
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
    updateFactionIdentityUI();
    renderMilestoneTimeline();
  }

  // =========================================================================
  // 5B. FACTION & IDENTITY PROGRESSION ENGINE (QUÝ BÌNH AN ĐẾ NGHIỆP)
  // =========================================================================
  function getCurrentFactionStage() {
    const ch = state.currentChapterId || 1;
    return factionStages.find(s => ch >= s.minChapter && ch <= s.maxChapter) || factionStages[0];
  }

  function updateFactionIdentityUI() {
    const stage = getCurrentFactionStage();
    if (ui.dynastySealIcon) ui.dynastySealIcon.textContent = stage.sealIcon;
    if (ui.dynastyEra) ui.dynastyEra.textContent = stage.factionName;
    if (ui.dynastyRole) ui.dynastyRole.textContent = stage.identityTitle;
    if (ui.dynastySealPlate) {
      ui.dynastySealPlate.title = `Thế Lực: ${stage.factionName} · Thân Phận: ${stage.identityTitle} (Bấm để xem Lộ Trình Đế Nghiệp)`;
    }
  }

  function openFactionModal() {
    if (!ui.factionModal) return;
    renderFactionModal();
    ui.factionModal.classList.remove('hidden');
  }

  function renderFactionModal() {
    if (!ui.factionCurrentCard || !ui.factionStagesList) return;
    const current = getCurrentFactionStage();
    const ch = state.currentChapterId || 1;

    // Render Current Faction Card
    ui.factionCurrentCard.innerHTML = `
      <div class="f-current-seal">${current.sealIcon}</div>
      <div class="f-current-info">
        <div class="f-current-tag">THẾ LỰC & THÂN PHẬN HIỆN THỜI (HỒI 1 · CHƯƠNG ${ch})</div>
        <div class="f-current-name">${current.factionName}</div>
        <div class="f-current-role"><span class="f-crown-seal">璽</span> ${current.identityTitle} — ${current.fullTitle}</div>
        <div class="f-current-desc">${current.description}</div>
      </div>
    `;

    // Render 5 Progression Stages
    ui.factionStagesList.innerHTML = '';
    factionStages.forEach(s => {
      const isCurrent = s.id === current.id;
      const isCompleted = s.id < current.id;

      let statusClass = 'stage-locked';
      let statusBadge = '<span class="f-stage-badge badge-locked">CHƯA ĐẠT ĐẾN [ 封 ]</span>';
      if (isCurrent) {
        statusClass = 'stage-active';
        statusBadge = '<span class="f-stage-badge badge-active">HIỆN THỜI [ 領 ]</span>';
      } else if (isCompleted) {
        statusClass = 'stage-completed';
        statusBadge = '<span class="f-stage-badge badge-completed">ĐÃ VƯỢT QUA [ 畢 ]</span>';
      }

      const stageEl = document.createElement('div');
      stageEl.className = `faction-stage-item ${statusClass}`;
      stageEl.innerHTML = `
        <div class="f-stage-seal">${s.sealIcon}</div>
        <div class="f-stage-body">
          <div class="f-stage-header">
            <div class="f-stage-title">${s.factionName} · ${s.identityTitle}</div>
            ${statusBadge}
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #c5a059;">Chương ${s.minChapter} - ${s.maxChapter === 999 ? 'Về Sau' : s.maxChapter} · ${s.fullTitle}</div>
          <p class="f-stage-desc">${s.description}</p>
          <div class="f-stage-buff"><span class="buff-seal">詔</span> Khế ước: ${s.buffSummary}</div>
        </div>
      `;
      ui.factionStagesList.appendChild(stageEl);
    });
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
        seal: "商",
        origin: "PHÒ MÃ NỘI PHỦ · THƯƠNG HỘI QUY HOẠCH",
        title: "KHỞI ĐỘNG ĐẾ NGHIỆP TÀI PHÚ",
        name: "XÀ PHÒNG THƯƠNG NGHIỆP TRẤN BẮC",
        lore: "Quý Bình An bắt tay cùng Lâu chủ Vệ Ti Vũ (Thiên Kim Lâu) sản xuất xà phòng Thấu Hoa Cao, mở đường tích lũy quân tư tự chủ.",
        effect: "Tác dụng: Khai mở lệnh bồi thực xưởng thủ công, mỗi đợt tích lũy +3.000 Vàng ròng."
      },
      bai_tuong_dai: {
        seal: "壇",
        origin: "THIÊN CƠ HỆ THỐNG · BÁI TƯỚNG DIỆC CƠ",
        title: "KHAI MỞ BÁI TƯỚNG THẦN ĐÀN",
        name: "THƯỢNG CỔ ANH HỒN LỆNH",
        lore: "Khai mở pháp trận Bát Quái thời thượng cổ, nối liền thiên ngoại hà giang để triệu hoán thần tướng Tam Quốc nhập thế quy vị.",
        effect: "Tác dụng: Sử dụng Anh Hồn Lệnh tế đàn chiêu mộ danh tướng và mở Thư Trục Phong Thần Bảng."
      },
      strategyMap: {
        seal: "輿",
        origin: "TRIỀU ĐÌNH BAN PHONG · SOÁI ẤN BẮC CẢNH",
        title: "TIẾP NHẬN BẮC CẢNH QUÂN CƠ SA BÀN",
        name: "CHINH BẮC ĐẠI TƯỚNG QUÂN SOÁI KỲ",
        lore: "Vũ Hoàng hạ chiếu ban soái kỳ cùng cờ lệnh Chinh Bắc, giao quyền quản thúc và tuần tra tuyến phòng thủ 4 phương.",
        effect: "Tác dụng: Khai thông Sa Bàn Quân Sự 3D, ban bố 3 Điểm Hành Động (AP) mỗi lượt xoay vần."
      },
      de_nghiep_sa_ban: {
        seal: "輿",
        origin: "TRIỀU ĐÌNH BAN PHONG · SOÁI ẤN BẮC CẢNH",
        title: "TIẾP NHẬN BẮC CẢNH QUÂN CƠ SA BÀN",
        name: "CHINH BẮC ĐẠI TƯỚNG QUÂN SOÁI KỲ",
        lore: "Vũ Hoàng hạ chiếu ban soái kỳ cùng cờ lệnh Chinh Bắc, giao quyền quản thúc và tuần tra tuyến phòng thủ 4 phương.",
        effect: "Tác dụng: Khai thông Sa Bàn Quân Sự 3D, ban bố 3 Điểm Hành Động (AP) mỗi lượt xoay vần."
      },
      feature_ham_tran_doanh: {
        seal: "陣",
        origin: "THIÊN CƠ TRIỆU HOÁN · DANH TƯỚNG TÙY TÙNG",
        title: "DANH TƯỚNG CAO THUẬN QUY THUẬN",
        name: "HÃM TRẬN DOANH THIẾT QUÂN PHÙ",
        lore: "800 tử sĩ áo giáp sáng ngời, xung phong hãm trận chưa từng lùi bước. Thiết quân phù đúc bằng thép lạnh phương Bắc.",
        effect: "Tác dụng: Bổ sung thẻ bài phòng ngự Thần Cấp Hãm Trận Doanh vào bộ bài thủ thành."
      },
      giaHu: {
        seal: "謀",
        origin: "THIÊN CƠ HỆ THỐNG · MƯU THẦN TẠI VỊ",
        title: "ĐỘC SĨ GIẢ HỦ NHẬP MẠC",
        name: "LOẠN THẾ QUÂN CƠ MẬT QUYỂN",
        lore: "Mưu sĩ Giả Hủ xuất thế, kế sách liên hoàn giấu kín trong bóng tối, sẵn sàng xoay chuyển càn khôn đại chiến.",
        effect: "Tác dụng: Khai thông các thẻ bài mưu lược Đoạt Hồn, Ly Gián và Độc Kế trên sa trường."
      },
      feature_water_stratagem: {
        seal: "水",
        origin: "BẮC CẢNH ĐỊA LÝ · QUÂN CƠ DIỆU TOÁN",
        title: "QUY HOẠCH CHIẾN THUẬT ĐẮP ĐÊ",
        name: "THANH THỦY THỦY CÔNG BÍ THƯ",
        lore: "Quan sát địa hình sông Thanh Thủy, xây dựng 3 tầng đê trữ nước thượng nguồn, chờ thời cơ nhấn chìm 2 vạn thiết kỵ.",
        effect: "Tác dụng: Mở khóa chiến thuật Xả Lũ Sông Thanh Thủy, càn quét toàn bộ chiến tuyến kẻ địch."
      },
      khaiNguyen: {
        seal: "糧",
        origin: "BẮC THÀNH THƯƠNG QUÂN · HẬU CẦN KHO BẢO",
        title: "TIẾP QUẢN KHO LƯƠNG KHAI NGUYÊN",
        name: "KHAI NGUYÊN THƯƠNG ĐẠO KHỐ PHÙ",
        lore: "Chiếm cứ huyết mạch lương thảo phương Bắc, tích trữ 50.000 thạch quân lương, bảo đảm hậu cần vững như bàn thạch.",
        effect: "Tác dụng: Dung lượng quân lương tăng thêm +50.000 Thạch, sẵn sàng nghênh tiếp đại quân."
      },
      battleFront: {
        seal: "戈",
        origin: "BẮC THÀNH HUYẾT CHIẾN · NGUY CƠ TIỀN TUYẾN",
        title: "KHỞI ĐỘNG SA TRƯỜNG THỦ THÀNH",
        name: "THANH CHÂU THÀNH PHÒNG CHIẾN THỦY",
        lore: "Đại quân Nam Ly ập tới chân thành Thanh Châu. Tiếng tù và rền vang, ba đạo phòng tuyến chính thức bước vào tử chiến.",
        effect: "Tác dụng: Khai thông Sa Trường Thẻ Bài 3 làn, trực tiếp chỉ huy tướng sĩ tử thủ giữ thành."
      }
    };

    const info = unlockDetails[featureKey] || {
      seal: "令",
      origin: "THIÊN CƠ HỆ THỐNG · THÁNH DỤ BAN THƯỞNG",
      title: "PHỤNG THIÊN THỪA VẬN BAN THƯỞNG",
      name: featureKey.toUpperCase(),
      lore: "Ký chủ đã đạt mốc sự kiện quan trọng trong thiên cơ đế nghiệp.",
      effect: "Tác dụng: Đã cập nhật trạng thái mới cho toàn bộ hệ thống đại nghiệp!"
    };

    const sealEl = document.getElementById('unlock-modal-seal');
    const originEl = document.getElementById('unlock-modal-origin');
    const titleEl = document.getElementById('unlock-modal-title');
    const nameEl = document.getElementById('unlock-modal-name');
    const loreEl = document.getElementById('unlock-modal-lore');
    const effectEl = document.getElementById('unlock-modal-effect');
    const iconEl = document.getElementById('unlock-modal-icon');

    if (sealEl) sealEl.textContent = info.seal;
    if (originEl) originEl.textContent = info.origin;
    if (titleEl) titleEl.textContent = info.title;
    if (nameEl) nameEl.textContent = info.name;
    if (loreEl) loreEl.textContent = info.lore;
    if (effectEl) {
      effectEl.innerHTML = `<span class="effect-seal-icon">※</span> <span class="effect-text-body">${info.effect}</span>`;
    }
    if (iconEl) {
      iconEl.innerHTML = `<span class="medallion-seal">${info.seal}</span>`;
    }

    triggerLightning();
    ui.unlockEventModal.classList.remove('hidden');
  }

  function renderMilestoneTimeline() {
    ui.matrixTimelineList.innerHTML = '';
    chapterMatrix.forEach(c => {
      const item = document.createElement('div');
      const statusClass = c.active ? 'current' : (c.unlocked ? 'unlocked' : 'locked');
      item.className = `chrono-node ${statusClass}`;

      const sealChar = c.active ? '今' : (c.unlocked ? '啓' : '封');
      const tagText = c.active ? 'HIỆN THỜI [ 今 ]' : (c.unlocked ? 'ĐÃ KHAI MỞ [ 啓 ]' : 'PHONG ẤN [ 封 ]');
      const tagClass = c.active ? 'seal-current' : (c.unlocked ? 'seal-unlocked' : 'seal-locked');

      item.innerHTML = `
        <div class="chrono-tally-seal">${sealChar}</div>
        <div class="chrono-meta-col">
          <div class="chrono-title-row">
            <span class="chrono-title">${c.badge} · ${c.title}</span>
            <span class="chrono-seal-tag ${tagClass}">${tagText}</span>
          </div>
          <div class="chrono-reward-seal"><span class="chrono-reward-glyph">賜</span> ${c.featureUnlocked}</div>
          <p class="chrono-lore">${c.lore}</p>
        </div>
      `;

      item.addEventListener('click', () => {
        if (!c.unlocked) {
          showToast(`[ 封 ] ${c.badge} chưa mở khóa! Hãy hoàn thành cốt truyện để tiến tới.`);
          return;
        }
        if (c.knot && ink.knots.has(c.knot)) {
          advanceChapter(c.id);
          ink.start(c.knot);
          state.currentTextIndex = 0;
          ui.milestoneMatrixModal.classList.add('hidden');
          switchView('vn');
          renderCurrentDialogue();
          showToast(`[ 啓 ] Chuyển đến: ${c.badge} - ${c.title}`);
        }
      });
      ui.matrixTimelineList.appendChild(item);
    });
  }

  // =========================================================================
  // 6. GACHA SUMMONING ENGINE (BÁI TƯỚNG THẦN ĐÀN) — DIEGETIC THEATER
  // =========================================================================
  let gachaContext = {
    mode: 'normal', // 'normal' | 'story'
    returnKnot: null
  };
  let isSummoning = false;
  let summonTimers = [];
  let pendingGrandRevealFn = null;

  // -------------------------------------------------------------
  // PROCEDURAL AUDIO SYNTHESIZER (WEB AUDIO API)
  // -------------------------------------------------------------
  let gachaAudioCtx = null;
  function getGachaAudioCtx() {
    if (!gachaAudioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) gachaAudioCtx = new AudioContextClass();
    }
    if (gachaAudioCtx && gachaAudioCtx.state === 'suspended') {
      gachaAudioCtx.resume().catch(() => {});
    }
    return gachaAudioCtx;
  }

  function playBellChime() {
    try {
      const ctx = getGachaAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [440, 880, 1320, 1760];
      const gains = [0.22, 0.11, 0.05, 0.02];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.2);
      });
    } catch (e) {}
  }

  function playVortexWhoosh() {
    try {
      const ctx = getGachaAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * 1.1);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(1300, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(280, now + 1.1);
      filter.Q.setValueAtTime(3.2, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 1.1);
    } catch (e) {}
  }

  function playThunderCrack() {
    try {
      const ctx = getGachaAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(36, now + 0.65);
      oscGain.gain.setValueAtTime(0.35, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);

      const bufferSize = Math.floor(ctx.sampleRate * 0.35);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.07));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.35);
    } catch (e) {}
  }

  function playGrandFanfare() {
    try {
      const ctx = getGachaAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [261.63, 392.00, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = now + idx * 0.05;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.16, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 2.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 2.4);
      });
    } catch (e) {}
  }

  // -------------------------------------------------------------
  // EMBER CANVAS PARTICLES
  // -------------------------------------------------------------
  let emberInitialized = false;
  let emberAnimId = null;
  function initGachaEmbers() {
    if (emberInitialized) return;
    const canvas = ui.gachaEmberCanvas;
    if (!canvas) return;
    emberInitialized = true;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push(makeParticle(true));
    }

    function makeParticle(randomY = false) {
      return {
        x: Math.random() * (canvas.width || 800),
        y: randomY ? Math.random() * (canvas.height || 600) : (canvas.height || 600) + 10,
        size: Math.random() * 2.6 + 1.0,
        speedY: Math.random() * 0.7 + 0.35,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.65 + 0.25,
        fadeSpeed: Math.random() * 0.004 + 0.002,
        color: Math.random() > 0.35 ? '251, 191, 36' : '239, 68, 68',
        pulse: Math.random() * Math.PI * 2
      };
    }

    function renderLoop() {
      if (!ui.gachaModal || ui.gachaModal.classList.contains('hidden')) {
        emberAnimId = requestAnimationFrame(renderLoop);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.pulse) * 0.25;
        p.pulse += 0.025;
        p.opacity -= p.fadeSpeed;
        if (p.opacity <= 0 || p.y < -15) {
          particles[i] = makeParticle(false);
          p = particles[i];
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowColor = `rgba(${p.color}, 0.7)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
      emberAnimId = requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }

  // -------------------------------------------------------------
  // TIMERS & SKIP CONTROLLER
  // -------------------------------------------------------------
  function clearSummonTimers() {
    summonTimers.forEach(id => clearTimeout(id));
    summonTimers = [];
  }

  function skipSummonRitual() {
    if (!pendingGrandRevealFn) return;
    clearSummonTimers();
    if (ui.btnGachaSkip) ui.btnGachaSkip.classList.add('hidden');
    const fn = pendingGrandRevealFn;
    pendingGrandRevealFn = null;
    fn();
  }

  // -------------------------------------------------------------
  // MODALS & ALTAR STATE
  // -------------------------------------------------------------
  function openGachaModal(options = {}) {
    gachaContext = {
      mode: options.mode || 'normal',
      returnKnot: options.returnKnot || null
    };

    if (!state.unlocked.gacha && gachaContext.mode !== 'story') {
      showToast("[ 封 ] Bái Tướng Thần Đàn chưa khai mở! Cần tiến tới Chương 5 trong kịch bản.");
      return;
    }

    resetGachaAltarState();
    initGachaEmbers();

    if (ui.gachaTicketDisplay) ui.gachaTicketDisplay.textContent = state.ticketCount;
    if (ui.gachaJadeDisplay) ui.gachaJadeDisplay.textContent = state.jade;
    if (ui.gachaPityCounter) ui.gachaPityCounter.textContent = `${state.pityCount} / 90`;

    ui.gachaModal.classList.remove('hidden');
  }

  function resetGachaAltarState() {
    isSummoning = false;
    clearSummonTimers();
    pendingGrandRevealFn = null;

    if (ui.btnGachaSkip) ui.btnGachaSkip.classList.add('hidden');
    if (ui.altarBtnRow) ui.altarBtnRow.classList.remove('hidden');
    if (ui.revealActionRow) ui.revealActionRow.classList.add('hidden');
    if (ui.btnDoSummon) ui.btnDoSummon.disabled = false;

    // Talisman reset
    if (ui.summonTalisman) {
      ui.summonTalisman.classList.remove('talisman-sacrificed');
      ui.summonTalisman.style.opacity = '1';
      ui.summonTalisman.style.transform = '';
    }
    if (ui.talismanHint) {
      ui.talismanHint.textContent = "Nhấp vào Thần Lệnh hoặc Phím [Tế Lệnh] để Khởi Động Trận Đồ";
    }

    // Bagua formation reset
    if (ui.baguaFormation) {
      ui.baguaFormation.classList.remove('fast-spin');
    }

    // FX layers reset
    if (ui.kintsugiFracturesLayer) {
      ui.kintsugiFracturesLayer.classList.add('hidden');
    }
    if (ui.sealShatterFx) {
      ui.sealShatterFx.classList.add('hidden');
    }

    // Grand reveal reset
    if (ui.gachaGrandReveal) {
      ui.gachaGrandReveal.classList.add('hidden');
    }
  }

  function renderSummonHistory() {
    if (!ui.gachaHistoryList) return;
    ui.gachaHistoryList.innerHTML = '';

    if (!state.summonHistory || state.summonHistory.length === 0) {
      ui.gachaHistoryList.innerHTML = `
        <div style="text-align: center; color: var(--stone-warm); padding: 28px; font-style: italic; font-family: var(--font-serif);">
          Chưa có điển tích thỉnh triệu nào được ghi chép vào Thiên Mệnh Giản.
        </div>
      `;
    } else {
      const reversed = [...state.summonHistory].reverse();
      reversed.forEach((item) => {
        const hero = item.hero;
        const isHigh = hero.rarity === 'UR' || hero.rarity === 'SSR';
        const badgeClass = hero.rarity === 'UR' ? 'tag-gold' : (hero.rarity === 'SSR' ? 'tag-amber' : 'tag-slate');

        const row = document.createElement('div');
        row.className = `history-item ${isHigh ? 'highlight-gold' : ''}`;
        row.style.cssText = `
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(16, 20, 27, 0.7);
          border: 1px solid ${isHigh ? 'rgba(251, 191, 36, 0.4)' : 'rgba(148, 163, 184, 0.15)'};
          border-radius: 4px;
          margin-bottom: 8px;
          box-shadow: ${isHigh ? '0 0 10px rgba(251, 191, 36, 0.15)' : 'none'};
        `;
        row.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="tag-badge ${badgeClass}" style="font-weight: 700; padding: 2px 7px;">${hero.rarity}</span>
            <strong style="color: ${isHigh ? '#fbbf24' : '#e2e8f0'}; font-family: var(--font-title); font-size: 1.05rem;">${hero.name}</strong>
            <span style="color: var(--stone-warm); font-size: 0.8rem;">(${hero.troop_type || 'Binh Chủng'})</span>
          </div>
          <div style="text-align: right; font-size: 0.8rem; color: var(--stone-warm);">
            <div>Thiên mệnh: <strong style="color: #38bdf8;">${item.pity}</strong>/90</div>
            <div style="font-size: 0.72rem; opacity: 0.7;">${item.timestamp}</div>
          </div>
        `;
        ui.gachaHistoryList.appendChild(row);
      });
    }

    if (ui.gachaHistoryModal) ui.gachaHistoryModal.classList.remove('hidden');
  }

  function performSummon() {
    if (isSummoning) return;

    if (state.ticketCount < 1 && state.jade < 160) {
      showToast("[ 儆 ] Không có Anh Hồn Lệnh hoặc không đủ 160 Kim Bảo!");
      return;
    }

    if (state.ticketCount >= 1) {
      state.ticketCount -= 1;
    } else {
      state.jade -= 160;
    }

    if (ui.hudTicketCount) ui.hudTicketCount.textContent = state.ticketCount;
    if (ui.gachaTicketDisplay) ui.gachaTicketDisplay.textContent = state.ticketCount;
    if (ui.gachaJadeDisplay) ui.gachaJadeDisplay.textContent = state.jade;

    isSummoning = true;
    clearSummonTimers();
    if (ui.btnDoSummon) ui.btnDoSummon.disabled = true;
    if (ui.btnGachaSkip) ui.btnGachaSkip.classList.remove('hidden');

    // Pity & Hero Selection Math
    state.pityCount++;
    if (ui.gachaPityCounter) ui.gachaPityCounter.textContent = `${state.pityCount} / 90`;

    let pulledHero = null;
    // First ever summon is canon Zhao Yun!
    if (!state.unlocked.zhaoyun) {
      pulledHero = allHeroes.find(h => h.id === 'hero_zhaoyun') || allHeroes[0];
    } else {
      let ssrProb = 0.006;
      if (state.pityCount >= 74) {
        ssrProb += (state.pityCount - 74 + 1) * 0.06;
      }
      if (state.pityCount >= 90) ssrProb = 1.0;

      const roll = Math.random();
      if (roll < ssrProb) {
        state.pityCount = 0;
        const ssrPool = allHeroes.filter(h => h.rarity === 'SSR' || h.rarity === 'UR');
        pulledHero = ssrPool[Math.floor(Math.random() * ssrPool.length)];
      } else if (roll < ssrProb + 0.051) {
        const srPool = allHeroes.filter(h => h.rarity === 'SR');
        pulledHero = srPool[Math.floor(Math.random() * srPool.length)] || allHeroes[0];
      } else {
        pulledHero = allHeroes[Math.floor(Math.random() * allHeroes.length)];
      }
    }

    state.lastSummonedHero = pulledHero;
    if (!state.ownedHeroIds.includes(pulledHero.id)) {
      state.ownedHeroIds.push(pulledHero.id);
    }

    // Record into summon history
    const historyRecord = {
      hero: pulledHero,
      pity: state.pityCount,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    if (!state.summonHistory) state.summonHistory = [];
    state.summonHistory.push(historyRecord);

    const isHighRarity = pulledHero.rarity === 'SSR' || pulledHero.rarity === 'UR';

    // -------------------------------------------------------------
    // PHASE 1: TẾ PHÙ (Talisman Plunges into Bagua Core)
    // -------------------------------------------------------------
    playBellChime();
    if (ui.summonTalisman) ui.summonTalisman.classList.add('talisman-sacrificed');
    if (ui.talismanHint) ui.talismanHint.textContent = "Đang Tế Phù... Linh khí Thượng Cổ khởi phát!";

    // Grand reveal action closure
    const executeGrandReveal = () => {
      clearSummonTimers();
      if (ui.btnGachaSkip) ui.btnGachaSkip.classList.add('hidden');
      if (ui.kintsugiFracturesLayer) ui.kintsugiFracturesLayer.classList.add('hidden');
      if (ui.sealShatterFx) ui.sealShatterFx.classList.add('hidden');
      if (ui.baguaFormation) ui.baguaFormation.classList.remove('fast-spin');

      playGrandFanfare();

      // Populate hero data
      const HERO_IMAGE_MAP = {
        'hero_zhaoyun': 'assets/images/zhaoyun.jpg',
        'hero_gaoshun': 'assets/images/caoshun.jpg',
        'hero_jiaxu': 'assets/images/giahu.jpg',
        'hero_dianwei': 'assets/images/dianwei.jpg'
      };
      if (ui.revealCardImg) {
        ui.revealCardImg.src = HERO_IMAGE_MAP[pulledHero.id] || pulledHero.avatar || 'assets/images/caoshun.jpg';
      }
      if (ui.revealSealBadge) {
        const HERO_SEAL_MAP = {
          'hero_zhaoyun': '趙',
          'hero_gaoshun': '高',
          'hero_jiaxu': '賈',
          'hero_guojia': '郭',
          'hero_dianwei': '典',
          'hero_lvbu': '呂',
          'hero_guan_yu': '關',
          'hero_zhang_fei': '張',
          'hero_zhuge_liang': '諸',
          'hero_zhou_yu': '周',
          'hero_diaochan': '貂',
          'hero_machao': '馬',
          'hero_huangzhong': '黃',
          'hero_zhangliao': '張'
        };
        ui.revealSealBadge.textContent = HERO_SEAL_MAP[pulledHero.id] || '將';
      }
      if (ui.revealCardName) {
        ui.revealCardName.textContent = pulledHero.name.toUpperCase();
      }
      if (ui.revealCardTitle) {
        const alias = (pulledHero.aliases && pulledHero.aliases[0]) ? pulledHero.aliases[0] : '';
        ui.revealCardTitle.textContent = `${alias ? alias + ' · ' : ''}Võ Lực ${pulledHero.base_stats ? pulledHero.base_stats.force : 90}`;
      }
      if (ui.revealCardRarity) {
        const rarityText = pulledHero.rarity === 'UR' ? 'CHIẾN THẦN TRUYỀN THUYẾT' : (pulledHero.rarity === 'SSR' ? 'HOÀNG KIM THƯỢNG TƯỚNG' : 'VẠN KIM VÕ TƯỚNG');
        ui.revealCardRarity.textContent = `${pulledHero.rarity} · ${rarityText}`;
      }
      if (ui.revealCardRealm) {
        ui.revealCardRealm.textContent = `Cảnh giới: ${pulledHero.realm || 'Hóa Cảnh Đỉnh Phong'}`;
      }
      if (ui.revealQuoteText) {
        const quotes = {
          'hero_zhaoyun': '“Long Đảm Nhất Xuất, Thiên Quân Vạn Mã Tẫn Đoạn Hồn!”',
          'hero_gaoshun': '“Hãm Trận Dũng Sĩ, Hữu Tử Vô Sinh, Quyết Bất Thối Bộ!”',
          'hero_jiaxu': '“Trời Đất Là Cờ, Nhân Tâm Là Mồi, Mưu Định Giang Sơn!”',
          'hero_dianwei': '“Chúa Công Tại Đâu, Thiết Kích Điển Vi Trấn Sát Tại Đó!”'
        };
        ui.revealQuoteText.textContent = quotes[pulledHero.id] || `“${pulledHero.name} phụng mệnh quy vị, vì Chúa Công bình định thiên hạ!”`;
      }
      if (ui.revealStatForce) ui.revealStatForce.textContent = pulledHero.base_stats ? pulledHero.base_stats.force : 90;
      if (ui.revealStatCmd) ui.revealStatCmd.textContent = pulledHero.base_stats ? pulledHero.base_stats.command : 85;
      if (ui.revealStatInt) ui.revealStatInt.textContent = pulledHero.base_stats ? pulledHero.base_stats.intelligence : 75;
      if (ui.revealStatTroop) ui.revealStatTroop.textContent = pulledHero.troop_type || 'Bạch Mã Nghĩa Tòng';

      // Show grand reveal stage
      if (ui.gachaGrandReveal) ui.gachaGrandReveal.classList.remove('hidden');

      // Update Altar buttons dock
      if (ui.altarBtnRow) ui.altarBtnRow.classList.add('hidden');
      if (ui.revealActionRow) ui.revealActionRow.classList.remove('hidden');

      showToast(`[ 靈 ] THỈNH TRIỆU THÀNH CÔNG: [${pulledHero.rarity}] ${pulledHero.name}!`, true);

      // State progression
      if (pulledHero.id === 'hero_zhaoyun') state.unlocked.zhaoyun = true;
      if (pulledHero.id === 'hero_gaoshun') state.unlocked.gaoshun = true;
      if (pulledHero.id === 'hero_jiaxu') state.unlocked.giaHu = true;
      state.unlocked.gacha = true;
      updateProgressTrackerUI();

      isSummoning = false;
    };

    pendingGrandRevealFn = executeGrandReveal;

    // -------------------------------------------------------------
    // PHASE 2: TỤ KHÍ BÁT QUÁI & KINTSUGI RESONANCE
    // -------------------------------------------------------------
    const t1 = setTimeout(() => {
      if (ui.baguaFormation) ui.baguaFormation.classList.add('fast-spin');
      playVortexWhoosh();

      if (isHighRarity) {
        if (ui.kintsugiFracturesLayer) ui.kintsugiFracturesLayer.classList.remove('hidden');
        triggerLightning('#FFD700');
        triggerShake('subtle');
        if (ui.talismanHint) ui.talismanHint.textContent = "Thiên cơ chấn động! Kim quang vạn trượng tụ hội!";
      } else {
        triggerLightning('#38bdf8');
        if (ui.talismanHint) ui.talismanHint.textContent = "Linh khí tụ hội!";
      }
    }, 550);
    summonTimers.push(t1);

    // -------------------------------------------------------------
    // PHASE 3: PHÁ ẤN (Seal Shatter Shockwave)
    // -------------------------------------------------------------
    const t2 = setTimeout(() => {
      if (ui.sealShatterFx) ui.sealShatterFx.classList.remove('hidden');
      playThunderCrack();
      triggerShake('impact');
    }, 1450);
    summonTimers.push(t2);

    // -------------------------------------------------------------
    // PHASE 4: GIÁNG THẾ (Grand Full-Screen Hero Reveal)
    // -------------------------------------------------------------
    const t3 = setTimeout(() => {
      executeGrandReveal();
    }, 2050);
    summonTimers.push(t3);
  }

  function handleConfirmSummon() {
    if (ui.gachaModal) ui.gachaModal.classList.add('hidden');
    resetGachaAltarState();

    const heroName = state.lastSummonedHero ? state.lastSummonedHero.name : "Triệu Tử Long";
    showToast(`[ 將 ] Đã tiếp nhận danh tướng! ${heroName} đã quy vị dưới trướng.`);

    // If triggered from Ink story flow (e.g. Chapter 5)
    if (gachaContext.mode === 'story' || gachaContext.returnKnot) {
      const returnKnot = gachaContext.returnKnot || 'trieu_van_arrival';
      gachaContext = { mode: 'normal', returnKnot: null };
      if (ink.knots.has(returnKnot)) {
        ink.start(returnKnot);
        state.currentTextIndex = 0;
        renderCurrentDialogue();
      }
    }
  }

  function handleSummonAgain() {
    if (state.ticketCount < 1 && state.jade < 160) {
      showToast("[ 儆 ] Không có Anh Hồn Lệnh hoặc không đủ 160 Kim Bảo để thỉnh triệu tiếp!");
      return;
    }
    resetGachaAltarState();
    performSummon();
  }

  // =========================================================================
  // 6B. UNIVERSAL SYSTEM HERO GRAND REVEAL (IN-STORY DIEGETIC RITUAL)
  // =========================================================================
  function triggerHeroGrandReveal(heroId, onComplete) {
    const hero = allHeroes.find(h => h.id === heroId) || allHeroes[0];
    if (!hero) return;

    state.lastSummonedHero = hero;
    if (!state.ownedHeroIds.includes(hero.id)) {
      state.ownedHeroIds.push(hero.id);
    }
    if (hero.id === 'hero_zhaoyun') state.unlocked.zhaoyun = true;
    if (hero.id === 'hero_gaoshun') state.unlocked.gaoshun = true;
    if (hero.id === 'hero_jiaxu') state.unlocked.giaHu = true;
    state.unlocked.gacha = true;
    updateProgressTrackerUI();

    // Record into summon history
    const historyRecord = {
      hero: hero,
      pity: state.pityCount,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    if (!state.summonHistory) state.summonHistory = [];
    state.summonHistory.push(historyRecord);

    resetGachaAltarState();
    isSummoning = true;
    initGachaEmbers();
    clearSummonTimers();

    if (ui.gachaModal) ui.gachaModal.classList.remove('hidden');
    if (ui.altarBtnRow) ui.altarBtnRow.classList.add('hidden');
    if (ui.summonTalisman) ui.summonTalisman.classList.add('talisman-sacrificed');
    if (ui.btnGachaSkip) ui.btnGachaSkip.classList.remove('hidden');

    playBellChime();

    // 1. Fast spin & Kintsugi fractures
    if (ui.baguaFormation) ui.baguaFormation.classList.add('fast-spin');
    if (ui.kintsugiFracturesLayer) ui.kintsugiFracturesLayer.classList.remove('hidden');
    triggerLightning('#FFD700');
    triggerShake('subtle');

    const executeReveal = () => {
      clearSummonTimers();
      if (ui.btnGachaSkip) ui.btnGachaSkip.classList.add('hidden');
      if (ui.kintsugiFracturesLayer) ui.kintsugiFracturesLayer.classList.add('hidden');
      if (ui.sealShatterFx) ui.sealShatterFx.classList.add('hidden');
      if (ui.baguaFormation) ui.baguaFormation.classList.remove('fast-spin');

      playGrandFanfare();

      const HERO_IMAGE_MAP = {
        'hero_zhaoyun': 'assets/images/zhaoyun.jpg',
        'hero_gaoshun': 'assets/images/caoshun.jpg',
        'hero_jiaxu': 'assets/images/giahu.jpg',
        'hero_dianwei': 'assets/images/dianwei.jpg'
      };
      const HERO_SEAL_MAP = {
        'hero_zhaoyun': '趙',
        'hero_gaoshun': '高',
        'hero_jiaxu': '賈',
        'hero_guojia': '郭',
        'hero_dianwei': '典',
        'hero_lvbu': '呂',
        'hero_guan_yu': '關',
        'hero_zhang_fei': '張',
        'hero_zhuge_liang': '諸',
        'hero_zhou_yu': '周',
        'hero_diaochan': '貂',
        'hero_machao': '馬',
        'hero_huangzhong': '黃',
        'hero_zhangliao': '張'
      };

      if (ui.revealCardImg) {
        ui.revealCardImg.src = HERO_IMAGE_MAP[hero.id] || hero.avatar || 'assets/images/caoshun.jpg';
      }
      if (ui.revealSealBadge) {
        ui.revealSealBadge.textContent = HERO_SEAL_MAP[hero.id] || '將';
      }
      if (ui.revealCardName) {
        ui.revealCardName.textContent = hero.name.toUpperCase();
      }
      if (ui.revealCardTitle) {
        const alias = (hero.aliases && hero.aliases[0]) ? hero.aliases[0] : '';
        ui.revealCardTitle.textContent = `${alias ? alias + ' · ' : ''}Võ Lực ${hero.base_stats ? hero.base_stats.force : 90}`;
      }
      if (ui.revealCardRarity) {
        const rarityText = hero.rarity === 'UR' ? 'CHIẾN THẦN TRUYỀN THUYẾT' : (hero.rarity === 'SSR' ? 'HOÀNG KIM THƯỢNG TƯỚNG' : 'VẠN KIM VÕ TƯỚNG');
        ui.revealCardRarity.textContent = `${hero.rarity} · ${rarityText}`;
      }
      if (ui.revealCardRealm) {
        ui.revealCardRealm.textContent = `Cảnh giới: ${hero.realm || 'Hóa Cảnh Đỉnh Phong'}`;
      }
      if (ui.revealQuoteText) {
        const quotes = {
          'hero_zhaoyun': '“Long Đảm Nhất Xuất, Thiên Quân Vạn Mã Tẫn Đoạn Hồn!”',
          'hero_gaoshun': '“Hãm Trận Dũng Sĩ, Hữu Tử Vô Sinh, Quyết Bất Thối Bộ!”',
          'hero_jiaxu': '“Trời Đất Là Cờ, Nhân Tâm Là Mồi, Mưu Định Giang Sơn!”',
          'hero_dianwei': '“Chúa Công Tại Đâu, Thiết Kích Điển Vi Trấn Sát Tại Đó!”'
        };
        ui.revealQuoteText.textContent = quotes[hero.id] || `“${hero.name} phụng mệnh quy vị, vì Chúa Công bình định thiên hạ!”`;
      }
      if (ui.revealStatForce) ui.revealStatForce.textContent = hero.base_stats ? hero.base_stats.force : 90;
      if (ui.revealStatCmd) ui.revealStatCmd.textContent = hero.base_stats ? hero.base_stats.command : 85;
      if (ui.revealStatInt) ui.revealStatInt.textContent = hero.base_stats ? hero.base_stats.intelligence : 75;
      if (ui.revealStatTroop) ui.revealStatTroop.textContent = hero.troop_type || 'Bạch Mã Nghĩa Tòng';

      if (ui.gachaGrandReveal) ui.gachaGrandReveal.classList.remove('hidden');
      if (ui.revealActionRow) ui.revealActionRow.classList.remove('hidden');

      showToast(`[ 靈 ] THỈNH TRIỆU THÀNH CÔNG: [${hero.rarity}] ${hero.name}!`, true);

      // Temporary override for confirm button
      const onStoryConfirm = () => {
        if (ui.gachaModal) ui.gachaModal.classList.add('hidden');
        resetGachaAltarState();
        showToast(`[ 將 ] Đã tiếp nhận danh tướng! ${hero.name} đã quy vị dưới trướng.`);
        ui.btnRevealConfirm.removeEventListener('click', onStoryConfirm);
        ui.btnRevealConfirm.addEventListener('click', handleConfirmSummon);
        if (onComplete) onComplete();
      };
      ui.btnRevealConfirm.removeEventListener('click', handleConfirmSummon);
      ui.btnRevealConfirm.addEventListener('click', onStoryConfirm);
    };

    pendingGrandRevealFn = executeReveal;

    const t1 = setTimeout(() => {
      // 2. Shockwave shatter
      if (ui.sealShatterFx) ui.sealShatterFx.classList.remove('hidden');
      playThunderCrack();
      triggerShake('impact');
    }, 700);
    summonTimers.push(t1);

    const t2 = setTimeout(() => {
      executeReveal();
    }, 1400);
    summonTimers.push(t2);
  }

  function handleInspectHero() {
    const heroId = state.lastSummonedHero ? state.lastSummonedHero.id : 'hero_zhaoyun';
    renderHeroInspector(heroId);
    if (ui.heroDetailModal) ui.heroDetailModal.classList.remove('hidden');
  }

  // =========================================================================
  // 7. HERO DETAIL INSPECTOR: BẢNG TRA CỨU TRANH CUỘN LỤA & NGŨ TRỌNG KHẮC MINH
  // =========================================================================
  const allCanonHeroes = (window.GAME_DATA && window.GAME_DATA.canon_heroes) || [];

  const HERO_ID_MAP = {
    'hero_zhaoyun': 'trieu_van',
    'hero_gaoshun': 'cao_thuan',
    'hero_jiaxu': 'co_hu',
    'hero_dianwei': 'dien_vi',
    'hero_matac': 'ma_tac',
    'hero_liru': 'ly_nho',
    'hero_diaochan': 'dieu_thuyen',
    'hero_machao': 'ma_sieu',
    'hero_zhangliao': 'truong_lieu',
    'hero_guojia': 'quach_gia',
    'hero_xunyu': 'tuan_uc',
    'hero_huatuo': 'hoa_da',
    'hero_huangzhong': 'hoang_trung',
    'hero_zhouyu': 'chu_du',
    'hero_xizhicai': 'hi_chi_tai',
    'hero_huaxiong': 'hoa_hung',
    'hero_quyi': 'khuc_nghia'
  };

  const HERO_SEAL_GLYPHS = {
    trieu_van: '趙', ma_tac: '馬', co_hu: '賈', dien_vi: '典',
    ly_nho: '李', dieu_thuyen: '貂', hoa_hung: '華', khuc_nghia: '麴',
    truong_lieu: '張', cao_thuan: '高', tuan_uc: '荀', chu_du: '周',
    hoang_trung: '黃', hi_chi_tai: '戲', ma_sieu: '馬', hoa_da: '華',
    quach_gia: '郭', hac_chieu: '郝', truong_phi: '張', hua_chu: '許',
    cam_ninh: '甘', quan_vu: '關', gia_cat_luong: '諸', bang_duc: '龐',
    thai_su_tu: '太', lu_bo: '呂', bang_thong: '龐', tu_ma_y: '司',
    van_uong: '文'
  };

  const HERO_PORTRAIT_MAP = {
    'trieu_van': 'assets/images/actor_trieu_van.webp',
    'hero_zhaoyun': 'assets/images/actor_trieu_van.webp',
    'cao_thuan': 'assets/images/actor_cao_thuan.webp',
    'hero_gaoshun': 'assets/images/actor_cao_thuan.webp',
    'dien_vi': 'assets/images/actor_dien_vi.webp',
    'hero_dianwei': 'assets/images/actor_dien_vi.webp',
    'co_hu': 'assets/images/actor_gia_hu.webp',
    'hero_jiaxu': 'assets/images/actor_gia_hu.webp',
    'ma_tac': 'assets/images/actor_ma_tac.webp',
    'hero_matac': 'assets/images/actor_ma_tac.webp',
    'ly_nho': 'assets/images/actor_ly_nho.webp',
    'hero_liru': 'assets/images/actor_ly_nho.webp',
    'dieu_thuyen': 'assets/images/actor_dieu_thuyen.webp',
    'hero_diaochan': 'assets/images/actor_dieu_thuyen.webp',
    'hoa_hung': 'assets/images/actor_hoa_hung.webp',
    'hero_huaxiong': 'assets/images/actor_hoa_hung.webp',
    'khuc_nghia': 'assets/images/actor_khuc_nghia.webp',
    'hero_quyi': 'assets/images/actor_khuc_nghia.webp',
    'truong_lieu': 'assets/images/actor_truong_lieu.webp',
    'hero_zhangliao': 'assets/images/actor_truong_lieu.webp',
    'tuan_uc': 'assets/images/actor_tuan_uc.webp',
    'hero_xunyu': 'assets/images/actor_tuan_uc.webp',
    'chu_du': 'assets/images/actor_chu_du.webp',
    'hero_zhouyu': 'assets/images/actor_chu_du.webp',
    'hoang_trung': 'assets/images/actor_hoang_trung.webp',
    'hero_huangzhong': 'assets/images/actor_hoang_trung.webp',
    'hi_chi_tai': 'assets/images/actor_hi_chi_tai.webp',
    'hero_xizhicai': 'assets/images/actor_hi_chi_tai.webp',
    'ma_sieu': 'assets/images/actor_ma_sieu.webp',
    'hero_machao': 'assets/images/actor_ma_sieu.webp',
    'hoa_da': 'assets/images/actor_hoa_da.webp',
    'hero_huatuo': 'assets/images/actor_hoa_da.webp',
    'quach_gia': 'assets/images/actor_quach_gia.webp',
    'hero_guojia': 'assets/images/actor_quach_gia.webp'
  };

  function resolveHero(id) {
    const canonId = HERO_ID_MAP[id] || id;
    let found = allCanonHeroes.find(h => h.id === canonId || h.id === id);
    if (found) return found;
    const legacy = allHeroes.find(h => h.id === id);
    if (legacy) {
      return {
        id: legacy.id,
        name: legacy.name,
        courtesyName: (legacy.aliases && legacy.aliases[0]) || '',
        primaryClass: legacy.faction || 'Võ Tướng',
        role: legacy.troop_type || 'Tiên Phong',
        classRoleBadge: `${legacy.faction || 'Võ Tướng'} • ${legacy.troop_type || 'Tiên Phong'}`,
        summonTier: '10 Vạn Kim',
        chapterSummon: legacy.summon_chapter || 1,
        loyalty: 100,
        baseStats: legacy.base_stats || { force: 85, command: 85, intelligence: 75, politics: 60 },
        weapon: {
          name: (legacy.equipment && legacy.equipment[0] && legacy.equipment[0].name) || 'Bản Mệnh Thần Binh',
          costGold: 10000,
          forceBonus: 7,
          specialEffect: 'Khắc minh thần binh tăng uy áp sa trường'
        },
        skills: (legacy.skills || []).map(s => ({ name: s.name, costGold: 1000, forceBonus: 2 })),
        specialTalent: {
          name: 'Võ Hồn Bộc Phát',
          costGold: 100000,
          forceBonus: 12,
          description: 'Phá vỡ phong ấn thần cấp, giải phóng uy áp chí tôn!'
        },
        mount: {
          name: 'Hãn Huyết Thần Câu',
          costGold: 50000,
          forceBonus: 5,
          description: 'Thiên lý lương câu thần dũng vô song'
        },
        troopType: legacy.troop_type || 'Thiết Kỵ',
        quote: 'Tuyệt thế vô song, phụng mệnh xuất chinh!',
        lore: 'Danh tướng Tam Quốc mang hào khí ngất trời giáng thế trợ giúp Phò Mã Gia định quốc an dân.'
      };
    }
    return allCanonHeroes[0] || {};
  }

  function getHeroProgression(heroId) {
    if (!state.heroProgression[heroId]) {
      const hero = resolveHero(heroId);
      const baseF = (hero.baseStats && hero.baseStats.force) || 80;
      state.heroProgression[heroId] = {
        baseForce: baseF,
        currentForce: baseF,
        martialRealm: getMartialRealmName(baseF),
        loyalty: 100,
        hasWeapon: false,
        weaponForceBonus: 0,
        unlockedSkillNames: [],
        skillForceBonus: 0,
        hasSpecialTalent: false,
        talentForceBonus: 0,
        hasMount: false,
        mountForceBonus: 0,
        directForceUpgrades: 0,
        hostForceGiven: 0
      };
    }
    return state.heroProgression[heroId];
  }

  function getMartialRealmName(force) {
    if (force < 80) return 'Vương Giả Cảnh Sơ Kỳ';
    if (force < 85) return 'Vương Giả Cảnh Trung Kỳ';
    if (force < 90) return 'Vương Giả Cảnh Đỉnh Phong';
    if (force < 95) return 'Hoàng Giả Cảnh Sơ Kỳ';
    if (force < 100) return 'Hoàng Giả Cảnh Đỉnh Phong';
    if (force < 120) return 'Đế Cấp Sơ Kỳ';
    if (force < 150) return 'Đế Cấp Viên Mãn';
    return 'Bán Thánh Xuất Thế';
  }

  function showScrollNotice(message, isSuccess) {
    const noticeEl = document.getElementById('scroll-notice-banner');
    if (!noticeEl) return;
    noticeEl.textContent = message;
    noticeEl.className = `scroll-notice-banner ${isSuccess ? 'notice-success' : 'notice-warning'}`;
    noticeEl.classList.remove('hidden');
    setTimeout(() => {
      noticeEl.classList.add('hidden');
    }, 3500);
  }

  function updateScrollHeaderStats() {
    const hostForceEl = document.getElementById('scroll-host-force');
    const goldEl = document.getElementById('scroll-gold-display');
    if (hostForceEl) hostForceEl.textContent = `${state.hostForce || 5}`;
    if (goldEl) goldEl.textContent = (state.gold || 0).toLocaleString();
  }

  function renderBambooTallies() {
    const row = document.getElementById('bamboo-tallies-row');
    if (!row) return;

    const roster = allCanonHeroes.length > 0 ? allCanonHeroes : allHeroes;
    const cat = state.activeInspectorCategory || 'all';

    let filtered = roster;
    if (cat === 'vo') {
      filtered = roster.filter(h => (h.primaryClass === 'Võ Tướng' || (!h.primaryClass && h.base_stats && h.base_stats.force >= 85)));
    } else if (cat === 'muu') {
      filtered = roster.filter(h => (h.primaryClass === 'Mưu Thần' || (!h.primaryClass && h.base_stats && h.base_stats.intelligence >= 85)));
    } else if (cat === 'nu_khac') {
      filtered = roster.filter(h => (h.primaryClass !== 'Võ Tướng' && h.primaryClass !== 'Mưu Thần'));
    }

    const currentId = state.selectedInspectorHeroId || (roster[0] && roster[0].id) || 'trieu_van';

    row.innerHTML = filtered.map(h => {
      const canonId = HERO_ID_MAP[h.id] || h.id;
      const isActive = (h.id === currentId || canonId === currentId) ? 'active' : '';
      const sealChar = HERO_SEAL_GLYPHS[canonId] || (h.primaryClass === 'Mưu Thần' ? '謀' : '武');
      const isOwned = state.ownedHeroIds.includes(h.id) || state.ownedHeroIds.includes(canonId);
      const lockGlyph = !isOwned ? ' <span class="tally-lock">[ 封 ]</span>' : '';

      return `
        <div class="bamboo-tally ${isActive}" data-hero-id="${h.id}" title="${h.name}: ${h.classRoleBadge || h.name}">
          <div class="tally-cord-hole"></div>
          <span class="tally-seal-glyph">${sealChar}</span>
          <span class="tally-hero-name">${h.name}${lockGlyph}</span>
          <span class="tally-role-badge">${h.role || (h.base_stats ? 'Hổ Tướng' : 'Tiên Phong')}</span>
        </div>
      `;
    }).join('');

    row.querySelectorAll('.bamboo-tally').forEach(tally => {
      tally.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-hero-id');
        if (id) {
          renderHeroInspector(id);
        }
      });
    });
  }

  function renderHeroInspector(heroId) {
    const hero = resolveHero(heroId);
    if (!hero || !hero.id) return;

    state.selectedInspectorHeroId = hero.id;
    updateScrollHeaderStats();
    renderBambooTallies();

    const contentEl = document.getElementById('scroll-hero-content');
    if (!contentEl) return;

    const prog = getHeroProgression(hero.id);
    const gold = state.gold || 0;

    const totalForce = prog.currentForce;
    const totalCmd = (hero.baseStats && hero.baseStats.command) || 85;
    const totalInt = (hero.baseStats && hero.baseStats.intelligence) || 75;
    const totalPol = (hero.baseStats && hero.baseStats.politics) || 60;

    const isUR = (hero.role && hero.role.includes('Thiên Mệnh')) || totalForce >= 98;
    const rarityLabel = isUR ? 'CHÍ TÔN [UR]' : 'TUYỆT THẾ [SSR]';
    const rarityClass = isUR ? 'ur' : 'ssr';

    const archetypeClass = hero.primaryClass === 'Mưu Thần' ? 'archetype-muu-than' :
                           hero.primaryClass === 'Tuyệt Thế Nữ Thần' ? 'archetype-hong-nhan' : 'archetype-vo-tuong';

    const portraitUrl = HERO_PORTRAIT_MAP[hero.id] || hero.avatar || 'assets/images/actor_trieu_van.webp';
    const sealChar = HERO_SEAL_GLYPHS[HERO_ID_MAP[hero.id] || hero.id] || '武';

    const weaponCost = (hero.weapon && hero.weapon.costGold) || 10000;
    const talentCost = (hero.specialTalent && hero.specialTalent.costGold) || 100000;
    const mountCost = (hero.mount && hero.mount.costGold) || 50000;
    const trainCost = 5000;

    const canBuyWeapon = !prog.hasWeapon && gold >= weaponCost;
    const canUnlockTalent = !prog.hasSpecialTalent && gold >= talentCost;
    const canBuyMount = !prog.hasMount && gold >= mountCost;
    const canTrainMartial = gold >= trainCost;

    contentEl.innerHTML = `
      <div class="scroll-hero-grid">
        <!-- CỘT 1: HỌA ẢNH THỦY MẶC LIỀN KHỐI & TRIỆN CHU SA -->
        <div class="scroll-portrait-col">
          <div class="scroll-silk-portrait">
            <img src="${portraitUrl}" alt="${hero.name}" class="scroll-silk-img" id="hero-portrait-img">
            <div class="scroll-cinnabar-seal-stamp">
              <span class="seal-char">${sealChar}</span>
            </div>
            <div class="scroll-rarity-silk-badge ${rarityClass}">
              <span>${rarityLabel}</span>
            </div>
          </div>

          <!-- THÁNH CHỈ CẢNH GIỚI VÕ ĐẠO -->
          <div class="scroll-realm-decree">
            <div class="decree-header">
              <span class="decree-seal">敕</span>
              <span class="decree-lbl">VÕ ĐẠO CẢNH GIỚI:</span>
              <span class="decree-realm">${prog.martialRealm}</span>
            </div>
            <span class="decree-force-summary">Tổng Uy Áp Sa Trường: <strong>${totalForce}</strong> Điểm Võ Lực</span>
          </div>

          <!-- CÂU TUYÊN THỆ XUẤT THẾ -->
          <div class="scroll-silk-calligraphy">
            <span>『${hero.quote || 'Trấn Quốc An Dân, Phò Mã Xuất Chinh!'}』</span>
          </div>
        </div>

        <!-- CỘT 2: LÝ LỊCH, THẠCH BIA TỨ DUY & NGŨ TRỌNG KHẮC MINH -->
        <div class="scroll-info-col">
          <div class="scroll-header-area">
            <div class="scroll-tags-row">
              <span class="scroll-dynasty-tag">ĐẠI HÁN · QUÝ GIA</span>
              <div class="hero-archetype-badge ${archetypeClass}">
                ${hero.classRoleBadge || hero.primaryClass || 'Võ Tướng'}
              </div>
              <span class="scroll-summon-tier-badge">Triệu hoán: ${hero.summonTier || '10 Vạn Kim'}</span>
            </div>

            <div class="scroll-name-row">
              <h2 class="scroll-hero-name">${hero.name}</h2>
              <span class="scroll-hero-courtesy">(${hero.courtesyName || '—'})</span>
            </div>
          </div>

          <p class="scroll-hero-lore">${hero.lore || ''}</p>

          <!-- THẠCH BIA BÁT QUÁI TỨ DUY -->
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
                  <span class="stat-note">Gốc ${(hero.baseStats && hero.baseStats.force) || 80}${prog.weaponForceBonus > 0 ? ` +${prog.weaponForceBonus} Binh` : ''}${prog.skillForceBonus > 0 ? ` +${prog.skillForceBonus} Kỹ` : ''}${prog.talentForceBonus > 0 ? ` +${prog.talentForceBonus} Phú` : ''}${prog.mountForceBonus > 0 ? ` +${prog.mountForceBonus} Mã` : ''}${prog.directForceUpgrades > 0 ? ` +${prog.directForceUpgrades} Đỉnh` : ''}</span>
                </div>
              </div>
              <div class="stele-stat thong">
                <span class="stat-seal">統</span>
                <div class="stat-info">
                  <span class="stat-name">THỐNG SOÁI CHỈ HUY</span>
                  <span class="stat-value">${totalCmd}</span>
                  <span class="stat-note">${hero.troopType || 'Thiết Kỵ'}</span>
                </div>
              </div>
              <div class="stele-stat muu">
                <span class="stat-seal">謀</span>
                <div class="stat-info">
                  <span class="stat-name">MƯU LƯỢC QUÂN CƠ</span>
                  <span class="stat-value">${totalInt}</span>
                  <span class="stat-note">${hero.primaryClass || 'Võ Tướng'}</span>
                </div>
              </div>
              <div class="stele-stat tri">
                <span class="stat-seal">政</span>
                <div class="stat-info">
                  <span class="stat-name">TRỊ QUỐC AN DÂN</span>
                  <span class="stat-value">${totalPol}</span>
                  <span class="stat-note">${hero.role || 'Tiên Phong'}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- NGŨ TRỌNG TRẬN ĐỒ KHẮC MINH -->
          <div class="ngu-trong-khac-minh-panel">
            <div class="khac-minh-title">
              <span class="title-glyph">璽</span>
              NGŨ TRỌNG TRẬN ĐỒ KHẮC MINH · ANH LINH THẦN ĐÀI BỒI DƯỠNG
            </div>

            <!-- 1. TRỌNG 1: THẦN BINH KHẮC MINH ĐÀI -->
            <div class="inscribed-seal-card ${prog.hasWeapon ? 'inscribed' : ''}">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 1: THẦN BINH TRUYỀN THẾ</span>
                <strong class="inscribe-name">${(hero.weapon && hero.weapon.name) || 'Bản Mệnh Thần Binh'}</strong>
                <span class="inscribe-lore">Tăng +${(hero.weapon && hero.weapon.forceBonus) || 7} Võ Lực. ${(hero.weapon && hero.weapon.specialEffect) || ''}</span>
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
                    <span class="stamp-cost">${weaponCost.toLocaleString()} Vàng</span>
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
                  ${((hero.skills && hero.skills.length > 0) ? hero.skills : [{ name: 'Bản Mệnh Trảm', costGold: 1000, forceBonus: 2 }]).map(s => {
                    const isLearned = prog.unlockedSkillNames.includes(s.name);
                    const canLearn = !isLearned && gold >= (s.costGold || 1000);
                    return isLearned ?
                      `<span class="completed-cinnabar-seal" style="padding: 2px 8px; font-size: 11px;">
                        <span class="seal-glyph" style="font-size: 14px;">悟</span> ${s.name} (+${s.forceBonus || 2})
                      </span>` :
                      `<button class="diegetic-seal-stamp-btn btn-learn-skill" data-skill-name="${s.name}" ${!canLearn ? 'disabled' : ''} style="padding: 3px 8px;">
                        <span class="stamp-char" style="font-size: 14px;">悟</span> ${s.name} (${(s.costGold || 1000).toLocaleString()}V)
                      </button>`;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- 3. TRỌNG 3: THIÊN PHÚ TINH ĐỒ (BÁT QUÁI PHÁ GIỚI) -->
            <div class="inscribed-seal-card ${prog.hasSpecialTalent ? 'inscribed' : ''}">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 3: THIÊN PHÚ TINH ĐỒ</span>
                <strong class="inscribe-name">${(hero.specialTalent && hero.specialTalent.name) || 'Võ Hồn Bộc Phát'}</strong>
                <span class="inscribe-lore">${(hero.specialTalent && hero.specialTalent.description) || ''} (+${(hero.specialTalent && hero.specialTalent.forceBonus) || 12} Võ Lực).</span>
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
                    <span class="stamp-cost">${talentCost.toLocaleString()} Vàng</span>
                  </button>`
                }
              </div>
            </div>

            <!-- 4. TRỌNG 4: MÃ PHÙ TIẾT (LƯƠNG CÂU HỘ CHỦ) -->
            <div class="inscribed-seal-card ${prog.hasMount ? 'inscribed' : ''}">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 4: MÃ PHÙ TIẾT</span>
                <strong class="inscribe-name">${(hero.mount && hero.mount.name) || 'Hãn Huyết Thần Câu'}</strong>
                <span class="inscribe-lore">${(hero.mount && hero.mount.description) || 'Lương câu thần dũng'} (+${(hero.mount && hero.mount.forceBonus) || 5} Võ Lực).</span>
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
                    <span class="stamp-cost">${mountCost.toLocaleString()} Vàng</span>
                  </button>`
                }
              </div>
            </div>

            <!-- 5. TRỌNG 5: CỬU ĐỈNH LUYỆN KHÍ -->
            <div class="inscribed-seal-card">
              <div class="inscribe-card-info">
                <span class="inscribe-badge">TRỌNG 5: CỬU ĐỈNH LUYỆN KHÍ</span>
                <strong class="inscribe-name">Tôi Thể Chân Khí (${prog.directForceUpgrades} Chu Thiên)</strong>
                <span class="inscribe-lore">Đã hun đúc: +${prog.directForceUpgrades} Võ Lực. Cứ mỗi 3 chu thiên → Quý Bình An hấp thu +1 Võ Lực!</span>
              </div>
              <div class="inscribe-stamp-action">
                <button class="diegetic-seal-stamp-btn" id="btn-train-martial" ${!canTrainMartial ? 'disabled' : ''}>
                  <span class="stamp-char">煉</span>
                  <span class="stamp-action">Đốt Đỉnh</span>
                  <span class="stamp-cost">${trainCost.toLocaleString()} Vàng (+1 Võ Lực)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindHeroScrollActions(hero, prog);
  }

  function bindHeroScrollActions(hero, prog) {
    const btnWeapon = document.getElementById('btn-unlock-weapon');
    if (btnWeapon) {
      btnWeapon.addEventListener('click', () => {
        const cost = (hero.weapon && hero.weapon.costGold) || 10000;
        if (state.gold < cost) {
          showScrollNotice(`[ 儆 ] Không đủ ${cost.toLocaleString()} Vàng để khắc minh Thần Binh!`, false);
          return;
        }
        state.gold -= cost;
        prog.hasWeapon = true;
        prog.weaponForceBonus = (hero.weapon && hero.weapon.forceBonus) || 7;
        prog.currentForce += prog.weaponForceBonus;
        prog.martialRealm = getMartialRealmName(prog.currentForce);
        state.hostForce = (state.hostForce || 5) + 2;
        updateHudResources();
        showScrollNotice(`[ 銘 ] Khắc minh thành công Thần Binh ${hero.weapon.name}! Quý Bình An +2 Võ Lực.`, true);
        renderHeroInspector(hero.id);
      });
    }

    document.querySelectorAll('.btn-learn-skill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const skillName = e.currentTarget.getAttribute('data-skill-name');
        if (!skillName) return;
        const skill = (hero.skills || []).find(s => s.name === skillName) || { costGold: 1000, forceBonus: 2 };
        const cost = skill.costGold || 1000;
        if (state.gold < cost) {
          showScrollNotice(`[ 儆 ] Không đủ ${cost.toLocaleString()} Vàng để lĩnh ngộ bí pháp!`, false);
          return;
        }
        state.gold -= cost;
        prog.unlockedSkillNames.push(skillName);
        prog.skillForceBonus += (skill.forceBonus || 2);
        prog.currentForce += (skill.forceBonus || 2);
        prog.martialRealm = getMartialRealmName(prog.currentForce);
        state.hostForce = (state.hostForce || 5) + 1;
        updateHudResources();
        showScrollNotice(`[ 悟 ] Lĩnh ngộ thành công bí pháp ${skillName}! Võ lực +${skill.forceBonus || 2}.`, true);
        renderHeroInspector(hero.id);
      });
    });

    const btnTalent = document.getElementById('btn-unlock-talent');
    if (btnTalent) {
      btnTalent.addEventListener('click', () => {
        const cost = (hero.specialTalent && hero.specialTalent.costGold) || 100000;
        if (state.gold < cost) {
          showScrollNotice(`[ 儆 ] Không đủ ${cost.toLocaleString()} Vàng để phá vỡ phong ấn Thiên Phú!`, false);
          return;
        }
        state.gold -= cost;
        prog.hasSpecialTalent = true;
        prog.talentForceBonus = (hero.specialTalent && hero.specialTalent.forceBonus) || 12;
        prog.currentForce += prog.talentForceBonus;
        prog.martialRealm = getMartialRealmName(prog.currentForce);
        state.hostForce = (state.hostForce || 5) + 5;
        triggerLightning();
        updateHudResources();
        showScrollNotice(`[ 破 ] Phá ấn thành công Thiên Phú ${hero.specialTalent.name}! Quý Bình An +5 Võ Lực!`, true);
        renderHeroInspector(hero.id);
      });
    }

    const btnMount = document.getElementById('btn-unlock-mount');
    if (btnMount) {
      btnMount.addEventListener('click', () => {
        const cost = (hero.mount && hero.mount.costGold) || 50000;
        if (state.gold < cost) {
          showScrollNotice(`[ 儆 ] Không đủ ${cost.toLocaleString()} Vàng để khớp nối Mã Phù!`, false);
          return;
        }
        state.gold -= cost;
        prog.hasMount = true;
        prog.mountForceBonus = (hero.mount && hero.mount.forceBonus) || 5;
        prog.currentForce += prog.mountForceBonus;
        prog.martialRealm = getMartialRealmName(prog.currentForce);
        state.hostForce = (state.hostForce || 5) + 3;
        updateHudResources();
        showScrollNotice(`[ 驥 ] Khớp nối thành công Lương Câu ${hero.mount.name}! Quý Bình An +3 Võ Lực.`, true);
        renderHeroInspector(hero.id);
      });
    }

    const btnTrain = document.getElementById('btn-train-martial');
    if (btnTrain) {
      btnTrain.addEventListener('click', () => {
        const cost = 5000;
        if (state.gold < cost) {
          showScrollNotice(`[ 儆 ] Không đủ 5.000 Vàng để đốt đỉnh tôi luyện chân khí!`, false);
          return;
        }
        state.gold -= cost;
        prog.directForceUpgrades += 1;
        prog.currentForce += 1;
        prog.martialRealm = getMartialRealmName(prog.currentForce);
        if (prog.directForceUpgrades % 3 === 0) {
          state.hostForce = (state.hostForce || 5) + 1;
          showScrollNotice(`[ 煉 ] Đốt đỉnh hoàn thành chu thiên thứ ${prog.directForceUpgrades}! Quý Bình An hấp thu +1 Võ Lực.`, true);
        } else {
          showScrollNotice(`[ 煉 ] Đốt đỉnh hoàn thành chu thiên thứ ${prog.directForceUpgrades}! ${hero.name} +1 Võ Lực.`, true);
        }
        updateHudResources();
        renderHeroInspector(hero.id);
      });
    }
  }

  function handleInspectHero() {
    const heroId = state.lastSummonedHero ? state.lastSummonedHero.id : 'hero_zhaoyun';
    openHeroInspector(heroId);
  }

  function openHeroInspector(heroId) {
    const targetHeroId = heroId || state.selectedInspectorHeroId || (state.ownedHeroIds[0] ? (HERO_ID_MAP[state.ownedHeroIds[0]] || state.ownedHeroIds[0]) : 'trieu_van');
    renderHeroInspector(targetHeroId);
    if (ui.heroDetailModal) ui.heroDetailModal.classList.remove('hidden');
  }

  // =========================================================================
  // 8. VISUAL NOVEL THEATER (INK ENGINE INTEGRATION)
  // =========================================================================
  let typewriterTimer = null;

  function renderCurrentDialogue() {
    // Hide choice modal whenever dialogue starts or is not at choice point
    if (ui.choiceModal && (!ink.hasChoices() || state.currentTextIndex < ink.currentText.length - 1)) {
      ui.choiceModal.classList.add('hidden');
    }

    // If ink engine has text, display it
    if (ink.currentText && ink.currentText.length > 0) {
      if (state.currentTextIndex >= ink.currentText.length) {
        state.currentTextIndex = 0;
      }
      const line = ink.currentText[state.currentTextIndex] || "";

      // Determine speaker & metadata dynamically
      let speakerName = "Người Dẫn Truyện";
      let speakerSub = "Hồi 1 · Phò Mã Phủ Thức Tỉnh";

      const trimmedLine = line.trim();
      const isQuoted = trimmedLine.startsWith('"') || trimmedLine.startsWith('“') || trimmedLine.startsWith("'") || trimmedLine.startsWith('「');
      const hasSpeakerColon = trimmedLine.includes(': "') || trimmedLine.includes(': “') || trimmedLine.includes('：');

      // Check if previous line introduced the speaker
      const prevLine = state.currentTextIndex > 0 ? (ink.currentText[state.currentTextIndex - 1] || "") : "";

      if (isQuoted || hasSpeakerColon) {
        if (prevLine.includes("Vũ Hoàng") || line.includes("trẫm") || line.includes("Trẫm") || line.includes("HAY! HAY LẮM!") || line.includes("Ban thưởng")) {
          speakerName = "Vũ Hoàng";
          speakerSub = "Đại Vũ Hoàng Đế · Cửu Ngũ Chí Tôn";
        } else if (prevLine.includes("Sứ thần") || prevLine.includes("Nam Ly") || line.includes("Bệ hạ Đại Vũ") || line.includes("Thiên đương kỳ bàn") || line.includes("Nam Ly ta")) {
          speakerName = "Sứ Thần Nam Ly";
          speakerSub = "Sứ Đoàn Phương Nam";
        } else if (prevLine.includes("Tỳ nữ") || prevLine.includes("Tiểu Thúy") || line.includes("Phò mã gia!") || line.includes("bệ hạ triệu kiến") || line.includes("Tỳ nữ")) {
          speakerName = "Tỳ Nữ Cung Đình";
          speakerSub = "Cung Nhân Hầu Cận";
        } else if (prevLine.includes("Triệu Vân") || prevLine.includes("Tử Long") || line.includes("Mạt tướng") || line.includes("Tử Long") || line.includes("Triệu Tử Long")) {
          speakerName = "Triệu Tử Long";
          speakerSub = "Thường Sơn Hổ Tướng · Hoàng Cảnh Sơ Kỳ";
        } else if (prevLine.includes("Cao Thuận") || line.includes("Cao Thuận") || line.includes("Hãm Trận Doanh") || line.includes("Hãm Trận")) {
          speakerName = "Cao Thuận";
          speakerSub = "Thống Soái Hãm Trận Doanh · Vạn Kim Võ Tướng";
        } else if (prevLine.includes("Giả Hủ") || prevLine.includes("Cổ Hủ") || line.includes("Cổ Hủ") || line.includes("Giả Hủ") || line.includes("Văn Hòa") || line.includes("Độc kế")) {
          speakerName = "Giả Hủ (Văn Hòa)";
          speakerSub = "Tuyệt Thế Độc Sĩ · Mưu Định Tam Quốc";
        } else if (prevLine.includes("Điển Vi") || line.includes("Điển Vi") || line.includes("Ác Lai")) {
          speakerName = "Điển Vi";
          speakerSub = "Cổ Chi Ác Lai · Hộ Pháp Hùng Tướng";
        } else if (prevLine.includes("Tô Kiến Phong") || line.includes("Tô tướng quân")) {
          speakerName = "Tô Kiến Phong";
          speakerSub = "Chấn Uy Tướng Quân Đại Vũ";
        } else if (prevLine.includes("Thích khách") || line.includes("Nạp mạng đi") || line.includes("Chết đi")) {
          speakerName = "Hắc Y Thích Khách";
          speakerSub = "Dạ Hành Sát Thủ";
        } else {
          speakerName = "Quý Bình An";
          speakerSub = "Phò Mã Gia";
        }
      } else if (trimmedLine.startsWith("[HỆ THỐNG]") || trimmedLine.includes("[HỆ THỐNG]") || trimmedLine.startsWith("[THIÊN CƠ") || trimmedLine.includes("[THIÊN CƠ")) {
        speakerName = "Thiên Cơ Hệ Thống";
        speakerSub = "Trí Huệ Tam Quốc Xuyên Không";
      } else {
        // Pure narration: ALWAYS "Người Dẫn Truyện"
        speakerName = "Người Dẫn Truyện";
        speakerSub = "Hồi 1 · Phò Mã Phủ Thức Tỉnh";
      }

      const isNarrator = speakerName === "Người Dẫn Truyện" || speakerName === "Dẫn Truyện" || !speakerName;
      if (ui.vnSpeaker) ui.vnSpeaker.textContent = speakerName;
      if (ui.vnSpeakerSub) ui.vnSpeakerSub.textContent = speakerSub;

      const speakerSeal = document.getElementById('vn-speaker-seal');
      if (speakerSeal) {
        let sealGlyph = "史";
        if (isNarrator) {
          sealGlyph = "史";
        } else if (speakerName.includes("Triệu") || speakerName.includes("Tử Long")) {
          sealGlyph = "趙";
        } else if (speakerName.includes("Quý Bình An") || speakerName.includes("Phò Mã")) {
          sealGlyph = "駙";
        } else if (speakerName.includes("Vũ Hoàng") || speakerName.includes("Hoàng")) {
          sealGlyph = "武";
        } else if (speakerName.includes("Cao Thuận")) {
          sealGlyph = "高";
        } else if (speakerName.includes("Giả Hủ") || speakerName.includes("Cổ Hủ")) {
          sealGlyph = "賈";
        } else if (speakerName.includes("Điển Vi")) {
          sealGlyph = "典";
        } else if (speakerName.includes("Tô")) {
          sealGlyph = "蘇";
        } else if (speakerName.includes("Vệ")) {
          sealGlyph = "衛";
        } else if (speakerName.includes("Sứ Thần")) {
          sealGlyph = "使";
        } else if (speakerName.includes("Tỳ Nữ") || speakerName.includes("Nha Hoàn")) {
          sealGlyph = "侍";
        } else if (speakerName.includes("Thích Khách") || speakerName.includes("Hắc Y")) {
          sealGlyph = "刺";
        } else if (speakerName.includes("Hệ Thống")) {
          sealGlyph = "天";
        } else {
          sealGlyph = "鎮";
        }
        speakerSeal.textContent = sealGlyph;
      }

      // Dynamic Standee Character Resolution (Zero Asset Sharing)
      let leftStandeePath = null;
      const speakerLower = speakerName.toLowerCase();

      if (speakerLower.includes("triệu vân") || speakerLower.includes("tử long")) {
        leftStandeePath = 'assets/images/actor_trieu_van.png';
      } else if (speakerLower.includes("mã tắc") || speakerLower.includes("ấu thường")) {
        leftStandeePath = 'assets/images/actor_ma_tac.png';
      } else if (speakerLower.includes("cao thuận")) {
        leftStandeePath = 'assets/images/actor_cao_thuan.png';
      } else if (speakerLower.includes("giả hủ") || speakerLower.includes("cổ hủ") || speakerLower.includes("văn hòa")) {
        leftStandeePath = 'assets/images/actor_gia_hu.png';
      } else if (speakerLower.includes("điển vi") || speakerLower.includes("ác lai")) {
        leftStandeePath = 'assets/images/actor_dien_vi.png';
      } else if (speakerLower.includes("vũ hoàng") || speakerLower.includes("hoàng đế") || speakerLower.includes("bệ hạ")) {
        leftStandeePath = 'assets/images/actor_vu_hoang.png';
      } else if (speakerLower.includes("sứ thần") || speakerLower.includes("nam ly")) {
        leftStandeePath = 'assets/images/actor_nam_ly_envoy.png';
      } else if (speakerLower.includes("vệ tí vũ") || speakerLower.includes("vệ ti vũ") || speakerLower.includes("vệ lâu chủ")) {
        leftStandeePath = 'assets/images/actor_ve_ti_vu.png';
      } else if (speakerLower.includes("tỳ nữ") || speakerLower.includes("nha hoàn") || speakerLower.includes("cung tỳ") || speakerLower.includes("tiểu thúy")) {
        leftStandeePath = 'assets/images/actor_servant.png';
      } else if (speakerLower.includes("thích khách") || speakerLower.includes("hắc y") || speakerLower.includes("sát thủ")) {
        leftStandeePath = 'assets/images/actor_assassin.png';
      } else if (speakerLower.includes("tô kiến phong") || speakerLower.includes("tô tướng")) {
        leftStandeePath = 'assets/images/actor_to_kien_phong.png';
      } else if (speakerLower.includes("lý nho") || speakerLower.includes("văn ưu")) {
        leftStandeePath = 'assets/images/actor_ly_nho.png';
      } else if (speakerLower.includes("điêu thuyền")) {
        leftStandeePath = 'assets/images/actor_dieu_thuyen.png';
      } else if (speakerLower.includes("hoa hùng")) {
        leftStandeePath = 'assets/images/actor_hoa_hung.png';
      } else if (speakerLower.includes("khúc nghĩa")) {
        leftStandeePath = 'assets/images/actor_khuc_nghia.png';
      } else if (speakerLower.includes("trương liêu") || speakerLower.includes("văn viễn")) {
        leftStandeePath = 'assets/images/actor_truong_lieu.png';
      } else if (speakerLower.includes("tuân úc") || speakerLower.includes("văn nhược")) {
        leftStandeePath = 'assets/images/actor_tuan_uc.png';
      } else if (speakerLower.includes("chu du") || speakerLower.includes("công cẩn")) {
        leftStandeePath = 'assets/images/actor_chu_du.png';
      } else if (speakerLower.includes("hoàng trung") || speakerLower.includes("hán thăng")) {
        leftStandeePath = 'assets/images/actor_hoang_trung.png';
      } else if (speakerLower.includes("hí chí tài")) {
        leftStandeePath = 'assets/images/actor_hi_chi_tai.png';
      } else if (speakerLower.includes("mã siêu") || speakerLower.includes("mạnh khởi")) {
        leftStandeePath = 'assets/images/actor_ma_sieu.png';
      } else if (speakerLower.includes("hoa đà") || speakerLower.includes("nguyên hóa")) {
        leftStandeePath = 'assets/images/actor_hoa_da.png';
      } else if (speakerLower.includes("quách gia") || speakerLower.includes("phụng hiếu")) {
        leftStandeePath = 'assets/images/actor_quach_gia.png';
      } else if (speakerLower.includes("an hoàng hậu") || speakerLower.includes("thái hậu")) {
        leftStandeePath = 'assets/images/actor_an_hoang_hau.png';
      } else if (speakerLower.includes("ninh an")) {
        leftStandeePath = 'assets/images/actor_ninh_an_cong_chua.png';
      } else if (speakerLower.includes("hứa hòa lâm")) {
        leftStandeePath = 'assets/images/actor_hua_hoa_lam.png';
      } else if (speakerLower.includes("tần tứ nghiệp")) {
        leftStandeePath = 'assets/images/actor_tan_tu_nghiep.png';
      } else if (speakerLower.includes("tử triệu phong") || speakerLower.includes("khai sơn vương")) {
        leftStandeePath = 'assets/images/actor_tu_trieu_phong.png';
      } else if (speakerLower.includes("tử ngọc trạch") || speakerLower.includes("tân hoàng")) {
        leftStandeePath = 'assets/images/actor_tu_ngoc_trach.png';
      } else if (speakerLower.includes("địch hỏa")) {
        leftStandeePath = 'assets/images/actor_dich_hoa.png';
      } else if (speakerLower.includes("quý bình sinh")) {
        leftStandeePath = 'assets/images/actor_quy_binh_sinh.png';
      } else if (speakerLower.includes("tử ngọc hằng") || speakerLower.includes("tứ hoàng tử")) {
        leftStandeePath = 'assets/images/actor_tu_ngoc_hang.png';
      } else if (speakerLower.includes("cung sinh") || speakerLower.includes("quân thần")) {
        leftStandeePath = 'assets/images/actor_cung_sinh.png';
      } else if (speakerLower.includes("chu bất ninh")) {
        leftStandeePath = 'assets/images/actor_chu_bat_ninh.png';
      } else if (speakerLower.includes("cơ vô pháp")) {
        leftStandeePath = 'assets/images/actor_co_vo_phap.png';
      } else if (speakerLower.includes("cơ vô thiên")) {
        leftStandeePath = 'assets/images/actor_co_vo_thien.png';
      } else if (speakerLower.includes("hề nhan")) {
        leftStandeePath = 'assets/images/actor_he_nhan_cong_chua.png';
      } else if (speakerLower.includes("triệu văn dụ")) {
        leftStandeePath = 'assets/images/actor_trieu_van_du.png';
      } else if (speakerLower.includes("vu văn châu")) {
        leftStandeePath = 'assets/images/actor_vu_van_chau.png';
      } else if (speakerLower.includes("trầm hạo")) {
        leftStandeePath = 'assets/images/actor_tram_hao.png';
      } else if (speakerLower.includes("quý bình xuyên")) {
        leftStandeePath = 'assets/images/actor_quy_binh_xuyen.png';
      } else {
        leftStandeePath = 'assets/images/seal_placeholder.png';
      }

      // Update Standee Speaking / Listening Focus (Dynamic VN Depth)
      if (speakerName.includes("Quý Bình An")) {
        if (ui.actorRightSlot) {
          ui.actorRightSlot.classList.add('speaking');
          ui.actorRightSlot.classList.remove('listening');
        }
        if (ui.actorLeftSlot) {
          ui.actorLeftSlot.classList.add('listening');
          ui.actorLeftSlot.classList.remove('speaking');
        }
      } else if (!isNarrator) {
        if (ui.actorLeftSlot) {
          ui.actorLeftSlot.classList.remove('hidden');
          ui.actorLeftSlot.classList.add('speaking');
          ui.actorLeftSlot.classList.remove('listening');
          if (ui.actorLeftNametag) ui.actorLeftNametag.textContent = speakerName;
          if (ui.actorLeftImg && leftStandeePath) {
            if (!ui.actorLeftImg.src.endsWith(leftStandeePath)) {
              ui.actorLeftImg.src = leftStandeePath;
              ui.actorLeftImg.alt = speakerName;
            }
          }
        }
        if (ui.actorRightSlot) {
          ui.actorRightSlot.classList.add('listening');
          ui.actorRightSlot.classList.remove('speaking');
        }
      } else {
        // Neutral narrative state
        if (ui.actorRightSlot) {
          ui.actorRightSlot.classList.remove('speaking');
          ui.actorRightSlot.classList.remove('listening');
        }
        if (ui.actorLeftSlot) {
          ui.actorLeftSlot.classList.remove('speaking');
          ui.actorLeftSlot.classList.remove('listening');
        }
      }

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
        showToast("[ 簡 ] Tiết tấu tạm lắng. Hãy thẩm định Sa Bàn Quân Cơ hoặc Ma Trận Chương để tiếp nối đại nghiệp.");
      }
    }
  }

  function checkInkChoices() {
    // ONLY display choices when reached the last line of current knot text
    if (state.currentTextIndex < ink.currentText.length - 1) {
      return;
    }

    if (ink.hasChoices() && ui.choiceModal) {
      ui.choiceQuestion.textContent = "THIÊN ĐỊNH CHI THỜI · ĐỐI SÁCH QUYỀN MƯU";
      ui.choiceGrid.innerHTML = '';

      const numGlyphs = ["壹", "贰", "叁", "肆", "伍"];

      ink.currentChoices.forEach((c, idx) => {
        let tagText = "QUYẾT SÁCH";
        let tagClass = "";
        let displayText = c.text;

        // Parse tag from either [TAG] Content OR "TAG · Content"
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
          ui.choiceModal.classList.add('hidden');
          ink.makeChoice(idx);
          state.currentTextIndex = 0;
          const cleanExcerpt = displayText.length > 32 ? displayText.substring(0, 32) + '...' : displayText;
          ui.vnBranchIndicator.textContent = `Quyết Sách: ${cleanExcerpt}`;
          showToast(`Đã định: ${cleanExcerpt}`, true);
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
    if (ui.factionModal) ui.factionModal.classList.add('hidden');
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
      name: "Đại Vũ Kinh Đô (Kim Loan Điện)",
      type: "Đế Đô",
      ruler: "Vũ Hoàng",
      status: "Nghi Kỵ Giám Sát",
      threat: "An Ninh Cảnh Giới",
      income: "Triều Cống 1.200 Vàng",
      dist: "Hậu Phương Triều Đình",
      intel: "Cẩm Y Vệ & Nội Các",
      garrison: "50.000 Ngự Lâm Quân",
      desc: "Trung tâm quyền lực hoàng triều Đại Vũ. Vũ Hoàng đa nghi theo dõi nhất cử nhất động của phò mã phủ. Cần dâng biểu, tiến cống vàng để giải tỏa lòng ngờ vực.",
      actionPrompt: "Tiến Cống Giảm Nghi Kỵ",
      actionCost: "Tiêu hao 1 Lệnh (-15% Nghi Kỵ)",
      bgImg: "assets/images/bg_capital.jpg"
    },
    khainguyen: {
      name: "Khai Nguyên (Đại Kho Lương)",
      type: "Hậu Cần",
      ruler: "Trấn Bắc Quân Hậu Cần",
      status: "An Cư Lạc Nghiệp",
      threat: "An Toàn Tuyệt Đối",
      income: "+5.000 Thạch Lương/Tháng",
      dist: "2 Ngày Đến Thanh Châu",
      intel: "Thương Hội Vệ Ti Vũ",
      garrison: "5.000 Binh Hộ Lương",
      desc: "Hậu cần trung chuyển quân lương cho toàn tuyến biên cương. Quý Bình An tích trữ 5 vạn thạch lương tại đây thông qua thương hội Vệ Ti Vũ, bảo đảm sĩ khí ba quân không bao giờ cạn.",
      actionPrompt: "Tiếp Nhận Quân Lương",
      actionCost: "Tiêu hao 1 Lệnh (+5.000 Thạch Lương)",
      bgImg: "assets/images/bg_capital.jpg"
    },
    thanhchau: {
      name: "Thành Thanh Châu (Tiền Tuyến)",
      type: "Tiền Tuyến",
      ruler: "Chinh Bắc Quân (Quý Bình An)",
      status: "Khói Lửa Chiến Tranh",
      threat: "Báo Động: 20.000 Quân Nam Ly Áp Sát!",
      income: "+3.500 Vàng (Xưởng Thấu Hoa Cao)",
      dist: "3 Ngày Đến Đế Đô",
      intel: "Hồng Nhan Mật Thám",
      garrison: "Triệu Vân + 800 Hãm Trận Doanh",
      desc: "Cửa ải yết hầu che chở toàn bộ ba châu Bắc Cảnh. Giả Hủ đã bí mật đắp đê ngăn dòng thượng nguồn sông Thanh Thủy. Thành cao hào sâu, có thể cầm cự trước nhiều đợt tấn công của Địch Hỏa.",
      actionPrompt: "Mở Rộng Xưởng Thấu Hoa Cao",
      actionCost: "Tiêu hao 1 Lệnh (+3.000 Vàng)",
      bgImg: "assets/images/bg_battle.jpg"
    },
    baccoson: {
      name: "Bắc Cô Sơn (Hiểm Quan)",
      type: "Hiểm Quan",
      ruler: "Trấn Bắc Quân Phục Kỵ",
      status: "Bố Trí Trận Địa",
      threat: "Phục Binh Sẵn Sàng",
      income: "Kiểm Soát Sơn Đạo",
      dist: "1 Ngày Đến Thanh Châu",
      intel: "Bạch Mã Tiền Tiêu",
      garrison: "3.000 Bạch Mã Nghĩa Tòng",
      desc: "Địa hình núi non hiểm trở, thắt cổ chai đón lõng đường rút lui của địch. Nơi bố trí phục binh cung nỏ và kỵ binh cơ động sẵn sàng đánh bọc sườn quân Nam Ly.",
      actionPrompt: "Bố Trí Cạm Bẫy Phục Kích",
      actionCost: "Tiêu hao 1 Lệnh (+15 Sĩ Khí)",
      bgImg: "assets/images/bg_capital.jpg"
    },
    lieuchau: {
      name: "Liễu Châu (Hậu Phương Bắc Cảnh)",
      type: "Bắc Cảnh",
      ruler: "Bắc Cảnh Trấn Phủ Ty",
      status: "Thái Bình Ổn Định",
      threat: "Ổn Định Tuyệt Đối",
      income: "+2.000 Vàng & 100 Ngựa Chiến",
      dist: "2 Ngày Đến Bắc Cô Sơn",
      intel: "Thiên Cơ Lâu Mật Tuyến",
      garrison: "8.000 Thủ Thành Quân",
      desc: "Căn cứ địa trù phú của 3 châu phương Bắc, nơi cung cấp tuấn mã chiến trường và nhân lực thợ rèn đúc giáp trụ thép cho quân đội Quý Bình An.",
      actionPrompt: "Chiêu Mộ Tân Binh",
      actionCost: "Tiêu hao 1 Lệnh (+500 Binh Lực)",
      bgImg: "assets/images/bg_capital.jpg"
    },
    namly: {
      name: "Nam Ly Doanh (Tiền Tiêu Địch)",
      type: "Địch Doanh",
      ruler: "Tiên Phong Địch Hỏa (Nam Ly Quốc)",
      status: "Bao Vây Chiến Thành",
      threat: "Địch Hỏa 20.000 Quân Tinh Nhuệ",
      income: "Địch Binh Chiếm Đóng",
      dist: "Đối Mặt Trực Diện",
      intel: "Mật Báo Quân Doanh",
      garrison: "20.000 Thiết Giáp Tượng Binh",
      desc: "Đại doanh tiền phương của Nam Ly Vương triều do đại tướng Địch Hỏa chỉ huy. Bày trận hãm thành chuẩn bị nuốt chửng Thanh Châu hòng mở toang cánh cửa tiến thẳng về kinh đô Đại Vũ.",
      actionPrompt: "Thám Sát Trận Địa Địch",
      actionCost: "Tiêu hao 1 Lệnh (-5% Nguy Cơ)",
      bgImg: "assets/images/bg_battle.jpg"
    },
    // Aliases
    baccanh: {
      name: "Thành Thanh Châu (Tiền Tuyến)",
      type: "Tiền Tuyến",
      ruler: "Chinh Bắc Quân (Quý Bình An)",
      status: "Khói Lửa Chiến Tranh",
      threat: "Báo Động: 20.000 Quân Nam Ly Áp Sát!",
      income: "+3.500 Vàng (Xưởng Thấu Hoa Cao)",
      dist: "3 Ngày Đến Đế Đô",
      intel: "Hồng Nhan Mật Thám",
      garrison: "Triệu Vân + 800 Hãm Trận Doanh",
      desc: "Cửa ải yết hầu che chở toàn bộ ba châu Bắc Cảnh. Giả Hủ đã bí mật đắp đê ngăn dòng thượng nguồn sông Thanh Thủy.",
      actionPrompt: "Mở Rộng Xưởng Thấu Hoa Cao",
      actionCost: "Tiêu hao 1 Lệnh (+3.000 Vàng)",
      bgImg: "assets/images/bg_battle.jpg"
    },
    taylang: {
      name: "Tây Lăng Hoang Mạc",
      type: "Trung Lập",
      ruler: "Tây Lăng Phiến Quân",
      status: "Hỗn Loạn Trung Lập",
      threat: "Thấp",
      income: "+500 Vàng/Tháng",
      dist: "5 Ngày Đến Thanh Châu",
      intel: "Thương Lộ Tây Vực",
      garrison: "15.000 Du Mục Kỵ",
      desc: "Vùng đất cằn cỗi nhiều thớt ngựa chiến quý. Nơi thu mua ngựa tốt cho Bạch Mã Nghĩa Tòng.",
      actionPrompt: "Thu Mua Tuấn Mã",
      actionCost: "Tiêu hao 1 Lệnh (Tăng 10% Tốc Độ Kỵ)",
      bgImg: "assets/images/bg_capital.jpg"
    }
  };

  function renderMapNodeDetails(nodeKey) {
    const data = provinceData[nodeKey] || provinceData.thanhchau || provinceData.baccanh;
    if (!data) return;
    state.selectedNode = nodeKey;

    if (ui.nodeTitle) ui.nodeTitle.textContent = data.name || '';
    if (ui.nodeDesc) ui.nodeDesc.textContent = data.desc || '';
    if (ui.nodeActionCost) ui.nodeActionCost.textContent = data.actionCost || '1 AP';

    const rulerEl = document.getElementById('node-ruler') || document.getElementById('panel-ruler');
    if (rulerEl) rulerEl.textContent = data.ruler || 'Đại Vũ Triều';
    const threatEl = document.getElementById('node-threat') || document.getElementById('panel-city-threat');
    if (threatEl) threatEl.textContent = data.threat || 'Báo Động: Bình Thường';
    const incomeEl = document.getElementById('node-income') || document.getElementById('panel-food');
    if (incomeEl) incomeEl.textContent = data.income || '15.000 Thạch';
    const garrisonEl = document.getElementById('node-garrison') || document.getElementById('panel-garrison');
    if (garrisonEl) garrisonEl.textContent = data.garrison || '1.000 Quân';
    const distEl = document.getElementById('panel-dist');
    if (distEl) distEl.textContent = data.dist || '1 Ngày Đường';
    const intelEl = document.getElementById('panel-intel');
    if (intelEl) intelEl.textContent = data.intel || 'Hồng Nhan Mật Thám';
    const badgeEl = document.getElementById('panel-city-badge');
    if (badgeEl && data.type) badgeEl.textContent = data.type.toUpperCase();

    // Auto-expand bamboo scroll if collapsed
    const scrollPanel = document.getElementById('bamboo-scroll-panel');
    if (scrollPanel) scrollPanel.classList.remove('collapsed');

    if (ui.provinceNodes) {
      ui.provinceNodes.forEach(n => {
        n.classList.toggle('active', n.dataset.node === nodeKey);
      });
    }
  }

  function handleSoapCommand() {
    if (!state.unlocked.soap) {
      showToast("[ 封 ] Tính năng Kinh Doanh Xà Phòng bị khóa! Cần Chương 8.");
      return;
    }
    if (state.ap < 1) {
      showToast("[ 儆 ] Hết Điểm Hành Động (AP) trong lượt!");
      return;
    }
    state.ap -= 1;
    state.gold += 3000;
    updateHudResources();
    showToast("[ 金 ] Xưởng Thấu Hoa Cao vận hành! +3.000 Vàng ròng thu hoạch!", true);
  }

  function handleBribeCommand() {
    if (state.gold < 1500) {
      showToast("[ 儆 ] Không đủ 1.500 Vàng để đút lót triều thần!");
      return;
    }
    state.gold -= 1500;
    state.suspicion = Math.max(0, state.suspicion - 15);
    updateHudResources();
    triggerLightning();
    showToast("[ 賂 ] Đút lót hoạn quan thành công! Giảm 15% Nghi Kỵ của Vũ Hoàng.", true);
  }

  // =========================================================================
  // 10. TACTICAL CARD BATTLER (TẦNG 3)
  // =========================================================================
  function renderBattlefield() {
    if (ui.wallHpText) ui.wallHpText.textContent = `${state.wallHp} / ${state.maxWallHp} HP`;
    if (ui.wallHpBar) ui.wallHpBar.style.width = `${(state.wallHp / state.maxWallHp) * 100}%`;

    if (ui.bossHpText) ui.bossHpText.textContent = `${state.bossHp} / ${state.maxBossHp} HP`;
    if (ui.bossHpBar) ui.bossHpBar.style.width = `${(state.bossHp / state.maxBossHp) * 100}%`;

    const resFill = document.getElementById('reservoir-fill');
    if (resFill) resFill.style.width = `${(state.reservoirStage / 3) * 100}%`;
    ['stage-1', 'stage-2', 'stage-3'].forEach((stId, idx) => {
      const dot = document.getElementById(stId);
      if (dot) dot.classList.toggle('active', idx + 1 <= state.reservoirStage);
    });

    if (ui.bossIntentDesc) ui.bossIntentDesc.textContent = state.bossIntent.desc;

    // Center Lane (Xe Đục Thành vs Triệu Tử Long)
    if (ui.cardEnemyCenter) {
      const hpSpan = document.getElementById('hp-enemy-center')?.querySelector('span') || ui.cardEnemyCenter.querySelector('.sc-hp, .stat-pill.hp span');
      if (state.lanes.center.enemy && state.lanes.center.enemy.alive) {
        ui.cardEnemyCenter.style.opacity = '1';
        if (hpSpan) hpSpan.textContent = state.lanes.center.enemy.hp;
      } else {
        ui.cardEnemyCenter.style.opacity = '0.25';
        if (hpSpan) hpSpan.textContent = '0';
      }
    }

    // Left Lane Enemy
    if (ui.cardEnemyLeft) {
      const hpSpan = document.getElementById('hp-enemy-left')?.querySelector('span') || ui.cardEnemyLeft.querySelector('.sc-hp, .stat-pill.hp span');
      if (state.lanes.left.enemy && state.lanes.left.enemy.alive) {
        ui.cardEnemyLeft.style.opacity = '1';
        if (hpSpan) hpSpan.textContent = state.lanes.left.enemy.hp;
      } else {
        ui.cardEnemyLeft.style.opacity = '0.25';
        if (hpSpan) hpSpan.textContent = '0';
      }
    }

    // Right Lane Enemy
    if (ui.cardEnemyRight) {
      const hpSpan = document.getElementById('hp-enemy-right')?.querySelector('span') || ui.cardEnemyRight.querySelector('.sc-hp, .stat-pill.hp span');
      if (state.lanes.right.enemy && state.lanes.right.enemy.alive) {
        ui.cardEnemyRight.style.opacity = '1';
        if (hpSpan) hpSpan.textContent = state.lanes.right.enemy.hp;
      } else {
        ui.cardEnemyRight.style.opacity = '0.25';
        if (hpSpan) hpSpan.textContent = '0';
      }
    }

    // Player Center Hero Unit (Triệu Tử Long)
    if (state.lanes.center.player && ui.playerZoneCenter) {
      ui.playerZoneCenter.innerHTML = `
        <div class="card-unit hero-card" id="card-hero-center">
          <div class="hero-crest">DANH TƯỚNG</div>
          <img src="assets/images/actor_trieu_van.png" alt="Triệu Vân" class="hero-mini-art">
          <div class="hero-details">
            <div class="hero-name">Triệu Tử Long</div>
            <div class="hero-title">Thường Sơn Triệu Tử Long</div>
            <div class="hero-skill-passive">Thất Tiến Thất Xuất: Kháng 50% sát thương</div>
            <div class="unit-bars">
              <div class="stat-pill atk"><span>ATK: ${state.lanes.center.player.atk}</span></div>
              <div class="stat-pill hp"><span>HP: ${state.lanes.center.player.hp}</span></div>
            </div>
          </div>
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
        showToast("[ 儆 ] Không đủ 2 Mana!");
        return;
      }
      state.mana -= 2;
      triggerShake();
      triggerLightning();
      if (window.phaserCombatFx) window.phaserCombatFx.slash(600, 250);
      state.bossIntent.interrupted = true;
      state.bossIntent.desc = "Ý ĐỒ BỊ PHÁ VỠ bởi Thất Thám Bàn Xà của Triệu Tử Long!";
      ui.bossIntentDesc.textContent = state.bossIntent.desc;
      state.bossHp = Math.max(0, state.bossHp - 60);
      spawnDamage(ui.bossHpBar, 60, true);
      showToast("THẤT THÁM BÀN XÀ! Ngắt hoàn toàn ý đồ của Địch Hỏa & Gây 60 DMG!", true);
      renderBattlefield();
      checkVictoryDefeat();
      return;
    }

    if (cardType === 'flood') {
      if (!state.unlocked.giaHu && !state.unlocked.flood) {
        showToast("Thẻ 'XẢ LŨ THANH THỦY' bị khóa! Cần kế sách Giả Hủ ở Chương 27-35.");
        return;
      }
      if (state.mana < 5) {
        showToast("Cần 5 Mana để phát lệnh phá đập xả lũ!");
        return;
      }
      state.mana -= 5;
      triggerShake();
      triggerLightning();
      if (window.phaserCombatFx) window.phaserCombatFx.flood();

      if (state.lanes.center.enemy) {
        state.lanes.center.enemy.hp = 0;
        state.lanes.center.enemy.alive = false;
        spawnDamage(ui.cardEnemyCenter, 150, true);
      }
      state.bossHp = Math.max(0, state.bossHp - 120);
      spawnDamage(ui.bossHpBar, 120, true);
      showToast("THỦY CÔNG PHÁ ĐẬP! Dòng thác cuốn phăng Xe Đục Thành & Gây 120 DMG lên Địch Hỏa!", true);
      renderBattlefield();
      checkVictoryDefeat();
      return;
    }

    if (cardType === 'hamtran') {
      if (state.mana < 3) {
        showToast("[ 儆 ] Cần 3 Mana để triển khai Hãm Trận Doanh!");
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
        showToast("[ 陣 ] Đã bố trí Hãm Trận Doanh án ngữ Tả Dực!");
        renderBattlefield();
      } else {
        showToast("[ 儆 ] Tả Dực đã có quân phòng thủ!");
      }
      return;
    }

    if (cardType === 'bachma') {
      if (state.mana < 4) {
        showToast("[ 儆 ] Cần 4 Mana để triển khai Bạch Mã Nghĩa Tòng!");
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
        showToast("[ 騎 ] Bạch Mã Nghĩa Tòng xuất kích tại Hữu Dực!");
        renderBattlefield();
      } else {
        showToast("[ 儆 ] Hữu Dực đã có kỵ binh phong tỏa!");
      }
      return;
    }
  }

  function executeTurn() {
    triggerShake();
    if (window.phaserCombatFx) window.phaserCombatFx.slash(500, 250);
    showToast("BA QUÂN XUNG TRẬN! QUYẾT TOÁN HIỆP ĐẤU!", true);

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
      showToast(`[ 水 ] Trữ lượng nước sông Thanh Thủy tăng lên Cấp ${state.reservoirStage}!`);
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
      setTimeout(() => {
        if (ui.defeatModal) ui.defeatModal.classList.remove('hidden');
      }, 500);
    }
  }

  // =========================================================================
  // 11. HUD VIEW SWITCHING & RESOURCES
  // =========================================================================
  function switchView(viewName) {
    if (viewName === 'battle' && !state.unlocked.battleFront) {
      showToast("[ 封 ] Tầng 3: Sa Trường Thẻ Bài bị khóa! Cần tiến tới Chương 48 (Đại Chiến Thanh Châu).");
      return;
    }

    state.currentView = viewName;
    document.body.classList.remove('view-mode-vn', 'view-mode-map', 'view-mode-battle');
    document.body.classList.add(`view-mode-${viewName}`);

    [ui.btnTabVn, ui.btnTabMap, ui.btnTabBattle].forEach(btn => btn?.classList.remove('active'));
    [ui.viewVn, ui.viewMap, ui.viewBattle].forEach(view => view?.classList.remove('active'));

    if (viewName === 'vn') {
      ui.btnTabVn?.classList.add('active');
      ui.viewVn.classList.add('active');
    } else if (viewName === 'map') {
      ui.btnTabMap?.classList.add('active');
      ui.viewMap.classList.add('active');
      renderMapNodeDetails(state.selectedNode);
      updateHudResources();
      if (!state.unlocked.strategyMap) {
        showToast("[ 輿 ] Đang thám sát Sa Bàn Quân Cơ — Hoàn thành Ch.15 để mở quyền điều binh!");
      }
    } else if (viewName === 'battle') {
      ui.btnTabBattle?.classList.add('active');
      ui.viewBattle.classList.add('active');
      renderBattlefield();
      updateHudResources();
    }
  }

  function updateHudResources() {
    ui.txtSuspicion.textContent = `${state.suspicion}%`;
    ui.barSuspicion.style.width = `${state.suspicion}%`;

    // Cửu Đỉnh Long Lô 4-Stage Incense Glow
    if (ui.suspicionCenserIcon) {
      ui.suspicionCenserIcon.classList.remove('censer-stage-white', 'censer-stage-gold', 'censer-stage-red');
      if (state.suspicion >= 80) {
        ui.suspicionCenserIcon.classList.add('censer-stage-red');
      } else if (state.suspicion >= 50) {
        ui.suspicionCenserIcon.classList.add('censer-stage-gold');
      } else {
        ui.suspicionCenserIcon.classList.add('censer-stage-white');
      }
    }

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

    if (typeof censerSmokeSystem !== 'undefined' && censerSmokeSystem.setTier) {
      censerSmokeSystem.setTier(state.suspicion);
    }
  }

  // =========================================================================
  // 12. FX & FEEDBACK UTILITIES
  // =========================================================================
  function triggerShake(type = 'subtle') {
    let target = document.getElementById('view-vn');
    if (state.currentView === 'battle') {
      target = document.getElementById('view-battle') || target;
    } else if (ui.gachaModal && !ui.gachaModal.classList.contains('hidden')) {
      target = document.getElementById('gacha-ritual-theater') || target;
    }

    if (!target) target = document.querySelector('.game-viewport') || document.body;

    const className = type === 'impact' ? 'shake-impact' : 'shake-subtle';
    target.classList.remove('shake-subtle', 'shake-impact', 'screen-shake');
    void target.offsetWidth;
    target.classList.add(className);
    setTimeout(() => {
      target.classList.remove('shake-subtle', 'shake-impact', 'screen-shake');
    }, type === 'impact' ? 380 : 200);
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

    // Subtle VN Realm Portal to open Sa Bàn
    const btnVnToSaban = document.getElementById('btn-vn-to-saban');
    if (btnVnToSaban) {
      btnVnToSaban.addEventListener('click', (e) => {
        e.stopPropagation();
        switchView('map');
        showToast("[ 輿 ] Mở Đế Nghiệp Sa Bàn — Tham kiến thế cục hoàng triều & 4 phương", true);
      });
    }

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

    // Gacha Altar Controls (Diegetic Ritual Theater)
    if (ui.btnHudGacha) ui.btnHudGacha.addEventListener('click', () => openGachaModal({ mode: 'normal' }));
    if (ui.btnCloseGacha && ui.gachaModal) {
      ui.btnCloseGacha.addEventListener('click', () => {
        ui.gachaModal.classList.add('hidden');
        resetGachaAltarState();
      });
    }
    if (ui.btnGachaRules && ui.gachaRulesModal) {
      ui.btnGachaRules.addEventListener('click', () => ui.gachaRulesModal.classList.remove('hidden'));
    }
    if (ui.btnCloseGachaRules && ui.gachaRulesModal) {
      ui.btnCloseGachaRules.addEventListener('click', () => ui.gachaRulesModal.classList.add('hidden'));
    }
    if (ui.btnGachaHistory && ui.gachaHistoryModal) {
      ui.btnGachaHistory.addEventListener('click', renderSummonHistory);
    }
    if (ui.btnCloseGachaHistory && ui.gachaHistoryModal) {
      ui.btnCloseGachaHistory.addEventListener('click', () => ui.gachaHistoryModal.classList.add('hidden'));
    }
    if (ui.btnGachaSkip) {
      ui.btnGachaSkip.addEventListener('click', skipSummonRitual);
    }
    if (ui.btnDoSummon) ui.btnDoSummon.addEventListener('click', performSummon);
    if (ui.summonTalisman) ui.summonTalisman.addEventListener('click', performSummon);
    if (ui.btnRevealInspect) ui.btnRevealInspect.addEventListener('click', handleInspectHero);
    if (ui.btnRevealAgain) ui.btnRevealAgain.addEventListener('click', handleSummonAgain);
    if (ui.btnRevealConfirm) ui.btnRevealConfirm.addEventListener('click', handleConfirmSummon);

    // Hero Detail Inspector & Bamboo Tallies Category Filtering
    if (ui.btnHudHero) ui.btnHudHero.addEventListener('click', () => openHeroInspector('trieu_van'));
    if (ui.btnCloseHeroDetail && ui.heroDetailModal) {
      ui.btnCloseHeroDetail.addEventListener('click', () => {
        ui.heroDetailModal.classList.add('hidden');
      });
    }
    if (ui.heroDetailModal) {
      ui.heroDetailModal.addEventListener('click', (e) => {
        if (e.target === ui.heroDetailModal) {
          ui.heroDetailModal.classList.add('hidden');
        }
      });
    }
    document.querySelectorAll('.tally-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-cat') || 'all';
        state.activeInspectorCategory = cat;
        document.querySelectorAll('.tally-tag').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderBambooTallies();
      });
    });

    // Defeat Modal Action Buttons
    if (ui.btnDefeatRetry) {
      ui.btnDefeatRetry.addEventListener('click', () => {
        if (ui.defeatModal) ui.defeatModal.classList.add('hidden');
        state.wallHp = state.maxWallHp || 500;
        state.bossHp = state.maxBossHp || 250;
        state.mana = 6;
        state.reservoirStage = 1;
        updateBattleUI();
        showToast("[ 重 ] Tái khởi chiến cuộc! Chấn chỉnh hàng ngũ thủ thành.");
      });
    }
    if (ui.btnDefeatRetreat) {
      ui.btnDefeatRetreat.addEventListener('click', () => {
        if (ui.defeatModal) ui.defeatModal.classList.add('hidden');
        switchView('map');
        showToast("[ 撤 ] Thoái thủ Sa Bàn Quân Cơ, tái thẩm định thế trận.");
      });
    }
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

    // VN Dialogue Controls: Bấm bất kỳ đâu trên màn hình hoặc khung thoại đều chuyển lời thoại
    if (ui.vnAdvance) ui.vnAdvance.addEventListener('click', advanceDialogue);
    if (ui.btnVnAdvance) ui.btnVnAdvance.addEventListener('click', advanceDialogue);

    if (ui.viewVn) {
      ui.viewVn.addEventListener('click', (e) => {
        if (e.target.closest('.vn-quick-ribbon') || 
            e.target.closest('.vn-portal-seal') || 
            e.target.closest('.backlog-drawer') || 
            e.target.closest('.branch-choice-modal') ||
            e.target.closest('#choice-modal') ||
            e.target.closest('button')) {
          return;
        }
        advanceDialogue();
      });
    }

    if (ui.vnDialoguePanel) {
      ui.vnDialoguePanel.addEventListener('click', (e) => {
        if (e.target.closest('.vn-quick-ribbon')) return;
        advanceDialogue();
      });
    }

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
          showToast("[ 靜 ] Chế độ tự động đọc: TẮT");
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
        showToast("[ 捷 ] Đại thắng! Đã nhận 20.000 Vàng & 50.000 Thạch Lương.", true);
        switchView('vn');
      });
    }

    if (ui.btnResetGame) {
      ui.btnResetGame.addEventListener('click', resetGame);
    }

    // Faction & Identity Progression Modal (Cụm Trái)
    if (ui.dynastySealPlate) {
      ui.dynastySealPlate.addEventListener('click', openFactionModal);
    }
    if (ui.btnCloseFaction) {
      ui.btnCloseFaction.addEventListener('click', () => {
        if (ui.factionModal) ui.factionModal.classList.add('hidden');
      });
    }
    if (ui.factionModal) {
      ui.factionModal.addEventListener('click', (e) => {
        if (e.target === ui.factionModal) ui.factionModal.classList.add('hidden');
      });
    }
  }

  // =========================================================================
  // TRIO ENGINES INITIALIZATION (PIXI.JS + THREE.JS + PHASER 3)
  // =========================================================================

  /**
   * 1. PixiJS Atmospheric & Shader Engine (Tier 1 VN)
   * Ambient ink-wash mist drifting and dynamic lighting
   */
  async function initPixiEngine() {
    if (typeof PIXI === 'undefined') {
      console.warn("PixiJS library not found");
      return;
    }
    const canvas = document.getElementById('vn-pixi-canvas');
    if (!canvas) return;

    try {
      const parent = canvas.parentElement || document.body;
      const app = new PIXI.Application();
      await app.init({
        canvas: canvas,
        resizeTo: parent,
        backgroundAlpha: 0,
        antialias: true
      });

      const mistContainer = new PIXI.Container();
      app.stage.addChild(mistContainer);

      const particles = [];
      const count = 24;

      for (let i = 0; i < count; i++) {
        const g = new PIXI.Graphics();
        const isGold = Math.random() < 0.3;
        const color = isGold ? 0xfbbf24 : 0x0f172a;
        const alpha = isGold ? (0.12 + Math.random() * 0.2) : (0.05 + Math.random() * 0.08);
        const radius = 35 + Math.random() * 65;

        if (typeof g.circle === 'function') {
          g.circle(0, 0, radius).fill({ color, alpha });
        } else {
          g.beginFill(color, alpha);
          g.drawCircle(0, 0, radius);
          g.endFill();
        }

        g.x = Math.random() * (app.screen.width || 1200);
        g.y = Math.random() * (app.screen.height || 700);
        g.vx = (Math.random() - 0.5) * 0.5;
        g.vy = -0.2 - Math.random() * 0.4;
        g.scaleSpeed = (Math.random() - 0.5) * 0.002;

        mistContainer.addChild(g);
        particles.push(g);
      }

      app.ticker.add((delta) => {
        particles.forEach(p => {
          p.x += p.vx * delta;
          p.y += p.vy * delta;
          p.scale.x += p.scaleSpeed * delta;
          p.scale.y += p.scaleSpeed * delta;

          if (p.y < -80) {
            p.y = (app.screen.height || 700) + 40;
            p.x = Math.random() * (app.screen.width || 1200);
          }
          if (p.x < -80) p.x = (app.screen.width || 1200) + 40;
          if (p.x > (app.screen.width || 1200) + 80) p.x = -40;
        });
      });

      window.pixiApp = app;
      console.log("[ 印 ] [PixiJS] WebGL atmospheric ink-mist active");
    } catch (err) {
      console.warn("PixiJS init error:", err);
    }
  }

  /**
   * 2. Three.js 3D Sand-Table Engine (Tier 2 Sa Bàn)
   * 3D war sand-table with elevation grid & flickering candlelight
   */
  function initThreeEngine() {
    if (typeof THREE === 'undefined') {
      console.warn("Three.js library not found");
      return;
    }
    const container = document.getElementById('saban-threejs-container');
    if (!container) return;

    try {
      container.innerHTML = '';
      container.style.pointerEvents = 'auto';
      const w = container.clientWidth || 1000;
      const h = container.clientHeight || 650;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x06080b);

      const camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000);
      camera.position.set(0, -110, 160);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Warm candle / lantern ambient light
      const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
      scene.add(ambientLight);

      // Flickering campaign tent lantern (Point light casting light on the war table)
      const lanternLight = new THREE.PointLight(0xf59e0b, 2.8, 600);
      lanternLight.position.set(30, -35, 95);
      scene.add(lanternLight);

      // Secondary cool moonlight rim light
      const moonRimLight = new THREE.DirectionalLight(0x60a5fa, 0.4);
      moonRimLight.position.set(-80, 80, 120);
      scene.add(moonRimLight);

      // 1. Dark Rosewood War Council Table Base
      const tableBaseGeo = new THREE.BoxGeometry(320, 210, 8);
      const tableBaseMat = new THREE.MeshStandardMaterial({
        color: 0x140e09,
        roughness: 0.75,
        metalness: 0.2
      });
      const tableBase = new THREE.Mesh(tableBaseGeo, tableBaseMat);
      tableBase.position.set(0, 0, -5);
      scene.add(tableBase);

      // Brass Corner Brackets on the table
      const cornerGeo = new THREE.BoxGeometry(16, 16, 10);
      const cornerMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.35,
        metalness: 0.85
      });
      [[-155, -100], [155, -100], [-155, 100], [155, 100]].forEach(([cx, cy]) => {
        const cornerMesh = new THREE.Mesh(cornerGeo, cornerMat);
        cornerMesh.position.set(cx, cy, -4);
        scene.add(cornerMesh);
      });

      // 2. The Antique Silk War Map (Direct Texture)
      const mapTexture = new THREE.TextureLoader().load('assets/images/bg_saban_table.jpg');
      mapTexture.generateMipmaps = true;
      mapTexture.minFilter = THREE.LinearMipmapLinearFilter;

      const mapGeo = new THREE.PlaneGeometry(290, 185, 32, 20);
      const mapMat = new THREE.MeshStandardMaterial({
        map: mapTexture,
        roughness: 0.88,
        metalness: 0.08
      });
      const mapMesh = new THREE.Mesh(mapGeo, mapMat);
      mapMesh.position.set(0, 0, 0);
      scene.add(mapMesh);

      // Helper function to create silk pennant texture (High-DPI 512x256)
      function createFlagTexture(sealChar, subText, isEnemy, isSiege) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Silk fabric background (dark ink / aged parchment)
        const grad = ctx.createLinearGradient(0, 0, 512, 256);
        if (isEnemy) {
          grad.addColorStop(0, '#5c1414');
          grad.addColorStop(1, '#2d0a0a');
        } else if (isSiege) {
          grad.addColorStop(0, '#59320e');
          grad.addColorStop(1, '#261505');
        } else {
          grad.addColorStop(0, '#221912');
          grad.addColorStop(1, '#120d09');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 256);

        // Weathered gold border & trim
        ctx.strokeStyle = isEnemy ? '#f87171' : (isSiege ? '#fbbf24' : '#d4af37');
        ctx.lineWidth = 10;
        ctx.strokeRect(10, 10, 492, 236);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 20, 472, 216);

        // Large Chinese Calligraphic Character
        ctx.fillStyle = isEnemy ? '#fca5a5' : '#f6d89b';
        ctx.font = 'bold 112px "ZCOOL XiaoWei", "Noto Serif SC", "Songti SC", "SimSun", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sealChar, 256, 108);

        // Subtitle (Vietnamese province role)
        ctx.fillStyle = isEnemy ? '#f87171' : '#c5a059';
        ctx.font = 'bold 34px "Playfair Display", "Cormorant Garamond", "Lora", serif';
        ctx.fillText(subText, 256, 196);

        const tex = new THREE.CanvasTexture(canvas);
        tex.generateMipmaps = true;
        return tex;
      }

      function createSealPlateTexture(sealChar, isEnemy) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Circular bronze disc background
        ctx.fillStyle = isEnemy ? '#451212' : '#241a12';
        ctx.beginPath();
        ctx.arc(128, 128, 120, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isEnemy ? '#b91c1c' : '#d4af37';
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.fillStyle = isEnemy ? '#fca5a5' : '#fbbf24';
        ctx.font = 'bold 128px "ZCOOL XiaoWei", "Noto Serif SC", "Songti SC", "SimSun", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sealChar, 128, 136);

        const tex = new THREE.CanvasTexture(canvas);
        tex.generateMipmaps = true;
        return tex;
      }

      // 3. Exact 3D War Tokens Strictly Calibrated Inside the Silk Map Boundaries
      const tokenConfigs = [
        {
          key: 'dedo',
          name: 'Đại Vũ Kinh Đô',
          x: -36,
          y: -26,
          sealChar: '武',
          sub: 'KINH ĐÔ',
          baseCol: 0x1c150e,
          trimCol: 0xd4af37,
          auraCol: 0xd4af37,
          isCapital: true
        },
        {
          key: 'khainguyen',
          name: 'Khai Nguyên',
          x: -22,
          y: -8,
          sealChar: '粮',
          sub: 'KHO LƯƠNG',
          baseCol: 0x161b20,
          trimCol: 0x60a5fa,
          auraCol: 0x38bdf8
        },
        {
          key: 'thanhchau',
          name: 'Thành Thanh Châu',
          x: 28,
          y: 4,
          sealChar: '青',
          sub: 'TIỀN TUYẾN',
          baseCol: 0x22160e,
          trimCol: 0xf59e0b,
          auraCol: 0xf59e0b,
          isSiege: true
        },
        {
          key: 'baccoson',
          name: 'Bắc Cô Sơn',
          x: -4,
          y: 22,
          sealChar: '关',
          sub: 'HIỂM QUAN',
          baseCol: 0x1c1712,
          trimCol: 0xd4af37,
          auraCol: 0xd4af37
        },
        {
          key: 'lieuchau',
          name: 'Liễu Châu',
          x: 52,
          y: 18,
          sealChar: '北',
          sub: 'BẮC CẢNH',
          baseCol: 0x141f1a,
          trimCol: 0x34d399,
          auraCol: 0x10b981
        },
        {
          key: 'namly',
          name: 'Nam Ly Doanh',
          x: 42,
          y: -24,
          sealChar: '南',
          sub: 'ĐỊCH DOANH',
          baseCol: 0x280e0e,
          trimCol: 0xef4444,
          auraCol: 0xef4444,
          isEnemy: true
        }
      ];

      const tokenObjects = [];

      tokenConfigs.forEach(cfg => {
        const group = new THREE.Group();
        group.position.set(cfg.x, cfg.y, 0);
        group.userData = cfg;

        const baseRadius = cfg.isCapital ? 7.5 : (cfg.isSiege ? 6.5 : 5.5);

        // 1. Ebony Carved Chess Piece Base (pedestal)
        const baseGeo = new THREE.CylinderGeometry(baseRadius * 0.88, baseRadius, 3.2, 32);
        const baseMat = new THREE.MeshStandardMaterial({
          color: cfg.baseCol,
          roughness: 0.75,
          metalness: 0.2
        });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.rotation.x = Math.PI / 2;
        baseMesh.position.z = 1.6;
        group.add(baseMesh);

        // 2. Molten Gold / Antique Bronze Torus Rim
        const rimGeo = new THREE.TorusGeometry(baseRadius * 0.94, 0.65, 12, 32);
        const rimMat = new THREE.MeshStandardMaterial({
          color: cfg.trimCol,
          roughness: 0.35,
          metalness: 0.85
        });
        const rimMesh = new THREE.Mesh(rimGeo, rimMat);
        rimMesh.position.z = 3.2;
        group.add(rimMesh);

        // 3. Cast Bronze Seal Character Plate on top of base
        const sealPlateTex = createSealPlateTexture(cfg.sealChar, cfg.isEnemy);
        const plateGeo = new THREE.CircleGeometry(baseRadius * 0.76, 32);
        const plateMat = new THREE.MeshStandardMaterial({
          map: sealPlateTex,
          roughness: 0.4,
          metalness: 0.7
        });
        const plateMesh = new THREE.Mesh(plateGeo, plateMat);
        plateMesh.position.z = 3.25;
        group.add(plateMesh);

        // 4. Burnished Brass Flagstaff Pole
        const staffGeo = new THREE.CylinderGeometry(0.45, 0.45, 20, 12);
        const staffMat = new THREE.MeshStandardMaterial({
          color: cfg.trimCol,
          metalness: 0.85,
          roughness: 0.3
        });
        const staffMesh = new THREE.Mesh(staffGeo, staffMat);
        staffMesh.rotation.x = Math.PI / 2;
        staffMesh.position.set(0, 0, 11);
        group.add(staffMesh);

        // Spearhead tip
        const tipGeo = new THREE.ConeGeometry(1.2, 3.5, 12);
        const tipMesh = new THREE.Mesh(tipGeo, staffMat);
        tipMesh.rotation.x = -Math.PI / 2;
        tipMesh.position.set(0, 0, 22.5);
        group.add(tipMesh);

        // 5. Silk Pennant Flag
        const flagTex = createFlagTexture(cfg.sealChar, cfg.sub, cfg.isEnemy, cfg.isSiege);
        const flagGeo = new THREE.PlaneGeometry(15, 7.5);
        const flagMat = new THREE.MeshBasicMaterial({
          map: flagTex,
          side: THREE.DoubleSide
        });
        const flagMesh = new THREE.Mesh(flagGeo, flagMat);
        flagMesh.position.set(7.5, 0, 16);
        flagMesh.rotation.x = Math.PI / 2;
        group.add(flagMesh);

        // 6. Diegetic Ground Aura (Subtle Molten Gold / Ink Halo, NOT neon)
        const auraGeo = new THREE.RingGeometry(baseRadius + 1.2, baseRadius + 3.5, 32);
        const auraMat = new THREE.MeshBasicMaterial({
          color: cfg.auraCol,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.32
        });
        const auraMesh = new THREE.Mesh(auraGeo, auraMat);
        auraMesh.position.z = 0.2;
        group.add(auraMesh);
        group.userData.auraMesh = auraMesh;
        group.userData.flagMesh = flagMesh;
        group.userData.plateMesh = plateMesh;
        group.userData.cfg = cfg;

        // 7. Generous Invisible Hit Collider for responsive mouse click & hover
        const hitGeo = new THREE.CylinderGeometry(baseRadius * 1.5, baseRadius * 1.5, 26, 16);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.rotation.x = Math.PI / 2;
        hitMesh.position.z = 12;
        group.add(hitMesh);

        scene.add(group);
        tokenObjects.push(group);
      });

      // Refresh 3D canvas textures once web fonts are fully loaded
      if (document.fonts) {
        document.fonts.ready.then(() => {
          tokenObjects.forEach(grp => {
            if (grp.userData && grp.userData.cfg) {
              const c = grp.userData.cfg;
              if (grp.userData.flagMesh && grp.userData.flagMesh.material) {
                grp.userData.flagMesh.material.map = createFlagTexture(c.sealChar, c.sub, c.isEnemy, c.isSiege);
                grp.userData.flagMesh.material.map.needsUpdate = true;
              }
              if (grp.userData.plateMesh && grp.userData.plateMesh.material) {
                grp.userData.plateMesh.material.map = createSealPlateTexture(c.sealChar, c.isEnemy);
                grp.userData.plateMesh.material.map.needsUpdate = true;
              }
            }
          });
        });
      }

      // 4. Ambient Lantern Embers & Dust Specks (Diegetic Tent Lighting)
      const emberCount = 40;
      const emberGeo = new THREE.BufferGeometry();
      const emberPositions = new Float32Array(emberCount * 3);
      const emberSpeeds = new Float32Array(emberCount);
      for (let i = 0; i < emberCount; i++) {
        emberPositions[i * 3] = (Math.random() - 0.5) * 180;
        emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        emberPositions[i * 3 + 2] = Math.random() * 80 + 5;
        emberSpeeds[i] = 0.08 + Math.random() * 0.12;
      }
      emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
      const emberMat = new THREE.PointsMaterial({
        color: 0xf59e0b,
        size: 2.2,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const emberPoints = new THREE.Points(emberGeo, emberMat);
      scene.add(emberPoints);

      // Raycaster & Comprehensive Mouse Controls (Drag-to-Pan, Wheel-to-Zoom, Click-to-Select)
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let hoveredToken = null;
      const defaultCameraPos = new THREE.Vector3(0, -110, 160);
      const defaultLookAt = new THREE.Vector3(0, 0, 0);
      let targetCameraPos = defaultCameraPos.clone();
      let targetLookAt = defaultLookAt.clone();
      let currentLookAt = defaultLookAt.clone();

      let isMouseDown = false;
      let isDragging = false;
      let dragStartX = 0;
      let dragStartY = 0;
      let cameraStartX = 0;
      let cameraStartY = 0;
      let lookAtStartX = 0;
      let lookAtStartY = 0;

      container.style.cursor = 'grab';

      function onMouseDown(event) {
        if (event.button !== 0 && event.button !== 2) return;
        isMouseDown = true;
        isDragging = false;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        cameraStartX = targetCameraPos.x;
        cameraStartY = targetCameraPos.y;
        lookAtStartX = targetLookAt.x;
        lookAtStartY = targetLookAt.y;
      }

      function onMouseMove(event) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        if (isMouseDown) {
          const deltaX = event.clientX - dragStartX;
          const deltaY = event.clientY - dragStartY;
          if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
            isDragging = true;
            container.style.cursor = 'grabbing';
            const panFactor = (targetCameraPos.z / 160) * 0.22;
            targetCameraPos.x = Math.max(-70, Math.min(70, cameraStartX - deltaX * panFactor));
            targetCameraPos.y = Math.max(-160, Math.min(-60, cameraStartY + deltaY * panFactor));
            targetLookAt.x = Math.max(-70, Math.min(70, lookAtStartX - deltaX * panFactor));
            targetLookAt.y = Math.max(-40, Math.min(40, lookAtStartY + deltaY * panFactor));
          }
          return;
        }

        // Raycasting for token hover
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(tokenObjects, true);

        if (intersects.length > 0) {
          let root = intersects[0].object;
          while (root.parent && root.parent !== scene) root = root.parent;
          if (root.userData && root.userData.key) {
            if (hoveredToken !== root) {
              if (hoveredToken) hoveredToken.position.z = 0;
              hoveredToken = root;
            }
            container.style.cursor = 'pointer';
            return;
          }
        }

        if (hoveredToken) {
          hoveredToken.position.z = 0;
          hoveredToken = null;
        }
        container.style.cursor = 'grab';
      }

      function onMouseUp(event) {
        if (!isMouseDown) return;
        isMouseDown = false;

        if (isDragging) {
          isDragging = false;
          container.style.cursor = 'grab';
          return;
        }

        // Treat as Click
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(tokenObjects, true);

        if (intersects.length > 0) {
          let root = intersects[0].object;
          while (root.parent && root.parent !== scene) root = root.parent;
          if (root.userData && root.userData.key) {
            select3DToken(root.userData.key);
            return;
          }
        }

        // Clicked empty area -> smoothly reset to default overview
        targetCameraPos.copy(defaultCameraPos);
        targetLookAt.copy(defaultLookAt);
      }

      function onWheel(event) {
        event.preventDefault();
        const zoomDelta = event.deltaY * 0.12;
        const newZ = Math.max(90, Math.min(220, targetCameraPos.z + zoomDelta));
        targetCameraPos.z = newZ;
        targetCameraPos.y = -newZ * 0.68;
      }

      function select3DToken(key) {
        const tok = tokenObjects.find(t => t.userData.key === key);
        if (!tok) return;

        targetCameraPos.set(tok.userData.x * 0.45, tok.userData.y * 0.45 - 90, 140);
        targetLookAt.set(tok.userData.x, tok.userData.y, 0);

        renderMapNodeDetails(key);
        triggerLightning();
        showToast(`[ 標 ] Chuyển tầm mắt Sa Bàn tới: ${tok.userData.name}`);
      }

      container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      container.addEventListener('wheel', onWheel, { passive: false });
      container.addEventListener('contextmenu', (e) => e.preventDefault());

      window.selectProvinceIn3D = select3DToken;
      window.threeCamera = camera;

      // Wire up Bamboo Scroll Toggle Tab
      const btnToggleBamboo = document.getElementById('btn-toggle-bamboo');
      const bambooPanel = document.getElementById('bamboo-scroll-panel');
      if (btnToggleBamboo && bambooPanel) {
        btnToggleBamboo.addEventListener('click', (e) => {
          e.stopPropagation();
          bambooPanel.classList.toggle('collapsed');
        });
      }

      let time = 0;
      function renderLoop() {
        requestAnimationFrame(renderLoop);
        time += 0.02;

        lanternLight.intensity = 2.6 + Math.sin(time * 4) * 0.35 + Math.cos(time * 7) * 0.15;

        tokenObjects.forEach((tok, idx) => {
          if (tok.userData.auraMesh) {
            const scale = 1 + Math.sin(time * 2.2 + idx) * 0.08;
            tok.userData.auraMesh.scale.set(scale, scale, 1);
          }
        });

        if (hoveredToken) {
          hoveredToken.position.z = Math.min(hoveredToken.position.z + 0.25, 3.5);
        }

        // Animate floating embers
        const posAttr = emberGeo.attributes.position;
        for (let i = 0; i < emberCount; i++) {
          let z = posAttr.getZ(i) + emberSpeeds[i];
          if (z > 95) {
            z = 5;
            posAttr.setX(i, (Math.random() - 0.5) * 180);
            posAttr.setY(i, (Math.random() - 0.5) * 120);
          }
          posAttr.setZ(i, z);
        }
        posAttr.needsUpdate = true;

        camera.position.lerp(targetCameraPos, 0.05);
        currentLookAt.lerp(targetLookAt, 0.05);
        camera.lookAt(currentLookAt);

        renderer.render(scene, camera);
      }
      renderLoop();

      window.addEventListener('resize', () => {
        const newW = container.clientWidth || 1000;
        const newH = container.clientHeight || 650;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      });

      window.threeScene = scene;
      console.log("[ 輿 ] [Three.js] 3D tactical relief war sand-table active with real texture and 3D tokens");
    } catch (err) {
      console.warn("Three.js init error:", err);
    }
  }

  /**
   * 3. Phaser 3 Combat Event & Particle Engine (Tier 3 Cards)
   */
  function initPhaserEngine() {
    if (typeof Phaser === 'undefined') {
      console.warn("Phaser 3 library not found");
      return;
    }
    const container = document.getElementById('battle-phaser-container');
    if (!container) return;

    try {
      let battleSceneRef = null;
      container.innerHTML = '';

      const config = {
        type: Phaser.AUTO,
        parent: 'battle-phaser-container',
        transparent: true,
        width: container.clientWidth || 1000,
        height: container.clientHeight || 600,
        scene: {
          create: function() {
            battleSceneRef = this;
            const w = this.scale.width;
            const h = this.scale.height;

            // Ambient storm rain particles
            this.rainGraphics = this.add.graphics();
            this.rainDrops = [];
            for (let i = 0; i < 60; i++) {
              this.rainDrops.push({
                x: Phaser.Math.Between(0, w),
                y: Phaser.Math.Between(0, h),
                speed: Phaser.Math.Between(15, 25),
                len: Phaser.Math.Between(10, 20)
              });
            }

            // 3 Tactical Lane Ground Sectors (Drawn in 2.5D perspective)
            this.laneGraphics = this.add.graphics();
            this.drawBattlefieldLanes();
          },
          update: function() {
            if (!this.rainGraphics) return;
            const w = this.scale.width;
            const h = this.scale.height;
            this.rainGraphics.clear();
            this.rainGraphics.lineStyle(1.5, 0x93c5fd, 0.35);

            for (let i = 0; i < this.rainDrops.length; i++) {
              const r = this.rainDrops[i];
              this.rainGraphics.beginPath();
              this.rainGraphics.moveTo(r.x, r.y);
              this.rainGraphics.lineTo(r.x - 3, r.y + r.len);
              this.rainGraphics.strokePath();

              r.x -= 1.5;
              r.y += r.speed;
              if (r.y > h) {
                r.y = 0;
                r.x = Phaser.Math.Between(0, w);
              }
            }
          },
          drawBattlefieldLanes: function() {
            const w = this.scale.width;
            const h = this.scale.height;
            const g = this.laneGraphics;
            g.clear();

            // Lane 1: Tả Dực (Left Flank) Ground Beacon
            g.lineStyle(2, 0x0284c7, 0.4);
            g.strokeEllipse(w * 0.22, h * 0.52, 140, 60);

            // Lane 2: Trung Lộ (Center Gate) Ground Beacon
            g.lineStyle(2, 0xfbbf24, 0.5);
            g.strokeEllipse(w * 0.50, h * 0.54, 180, 75);

            // Lane 3: Hữu Dực (Right Flank) Ground Beacon
            g.lineStyle(2, 0xf59e0b, 0.4);
            g.strokeEllipse(w * 0.78, h * 0.52, 140, 60);
          }
        }
      };

      const phaserGame = new Phaser.Game(config);

      window.phaserCombatFx = {
        slash: function(x = 500, y = 300) {
          if (!battleSceneRef) return;
          const g = battleSceneRef.add.graphics();
          g.lineStyle(5, 0xfbbf24, 1);
          g.beginPath();
          g.moveTo(x - 100, y - 70);
          g.lineTo(x + 100, y + 70);
          g.strokePath();

          for (let i = 0; i < 12; i++) {
            const spark = battleSceneRef.add.circle(x, y, Phaser.Math.Between(2, 4), 0xfffbeb, 1);
            battleSceneRef.tweens.add({
              targets: spark,
              x: x + Phaser.Math.Between(-80, 80),
              y: y + Phaser.Math.Between(-80, 80),
              alpha: 0,
              duration: 300,
              onComplete: () => spark.destroy()
            });
          }

          battleSceneRef.tweens.add({
            targets: g,
            alpha: 0,
            scaleX: 1.6,
            scaleY: 1.6,
            duration: 350,
            onComplete: () => g.destroy()
          });
        },
        flood: function() {
          if (!battleSceneRef) return;
          const w = battleSceneRef.scale.width;
          const h = battleSceneRef.scale.height;

          const wave = battleSceneRef.add.rectangle(w / 2, h / 2, w, h, 0x0284c7, 0.55);
          battleSceneRef.tweens.add({
            targets: wave,
            alpha: 0,
            duration: 900,
            onComplete: () => wave.destroy()
          });

          for (let i = 0; i < 40; i++) {
            const drop = battleSceneRef.add.circle(
              Phaser.Math.Between(50, w - 50),
              Phaser.Math.Between(h * 0.3, h * 0.8),
              Phaser.Math.Between(4, 10),
              0x38bdf8,
              0.8
            );
            battleSceneRef.tweens.add({
              targets: drop,
              y: drop.y + Phaser.Math.Between(-100, 100),
              alpha: 0,
              scale: 1.8,
              duration: 800,
              onComplete: () => drop.destroy()
            });
          }
        },
        arrowVolley: function(startX, startY, targetX, targetY) {
          if (!battleSceneRef) return;
          for (let i = 0; i < 5; i++) {
            const arrow = battleSceneRef.add.rectangle(
              startX + Phaser.Math.Between(-20, 20),
              startY + Phaser.Math.Between(-15, 15),
              20, 3,
              0xfbbf24
            );
            battleSceneRef.tweens.add({
              targets: arrow,
              x: targetX + Phaser.Math.Between(-30, 30),
              y: targetY + Phaser.Math.Between(-30, 30),
              duration: 400 + i * 60,
              ease: 'Quad.easeOut',
              onComplete: () => arrow.destroy()
            });
          }
        },
        cavalryCharge: function(laneX, laneY) {
          if (!battleSceneRef) return;
          const shock = battleSceneRef.add.circle(laneX, laneY, 15, 0xf59e0b, 0.8);
          battleSceneRef.tweens.add({
            targets: shock,
            radius: 80,
            alpha: 0,
            duration: 500,
            onComplete: () => shock.destroy()
          });
        }
      };

      window.phaserGame = phaserGame;
      console.log("[ 陣 ] [Phaser 3] Full tactical card battler battlefield engine active");
    } catch (err) {
      console.warn("Phaser 3 init error:", err);
    }
  }

  // Expose to window
  window.resetGame = resetGame;
  window.state = state;
  window.ink = ink;
  window.switchView = switchView;
  window.advanceChapter = advanceChapter;
  window.openFactionModal = openFactionModal;
  window.updateFactionIdentityUI = updateFactionIdentityUI;
  window.openGachaModal = openGachaModal;
  window.performSummon = performSummon;
  window.skipSummonRitual = skipSummonRitual;
  window.renderSummonHistory = renderSummonHistory;
  window.openHeroInspector = openHeroInspector;

  // =========================================================================
  // 14. INITIAL BOOT (DEFAULT TO ZERO-HUD CINEMATIC VISUAL NOVEL)
  // =========================================================================
  switchView('vn');
  ink.start('chapter_1_start');
  advanceChapter(1);
  updateProgressTrackerUI();
  updateHudResources();
  initEvents();
  window.game = {
    ink,
    state,
    switchView,
    renderCurrentDialogue,
    advanceDialogue,
    openGachaModal,
    performSummon,
    skipSummonRitual,
    renderSummonHistory,
    triggerHeroGrandReveal,
    advanceChapter,
    jumpToKnot: (knot) => {
      ink.start(knot);
      state.currentTextIndex = 0;
      switchView('vn');
      renderCurrentDialogue();
    }
  };
  renderCurrentDialogue();

  // Initialize Trio Techstack
  setTimeout(() => {
    initPixiEngine();
    initThreeEngine();
    initPhaserEngine();
    censerSmokeSystem.init();
  }, 100);

  console.log("[ 鑑 ] [Prototype V3] Khởi động thành công với Trio (Phaser/Three/Pixi), 29 danh tướng và Ink Engine!");
});
