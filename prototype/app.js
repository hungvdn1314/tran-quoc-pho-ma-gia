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
    if (GD.ink_stories.ch01_15) ink.loadStoryScript(GD.ink_stories.ch01_15);
    if (GD.ink_stories.ch16_52) ink.loadStoryScript(GD.ink_stories.ch16_52);
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
    console.log("[InkEffect Tag]", tag);
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

    // 4. Standee Actor & Audio Directives (Music handled by ambient/audio system)
    if (tag.startsWith("ACTORS:") || tag.startsWith("MUSIC:")) {
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
      showToast(`🎫 Nhận được Anh Hồn Lệnh × ${count}!`, true);
    } else if (action === "unlock_feature") {
      const feat = parts[1] || action;
      if (feat) triggerUnlockNotification(feat.trim());
    } else if (action === "trigger_gacha") {
      setTimeout(() => openGachaModal({ mode: 'story', returnKnot: 'trieu_van_arrival' }), 600);
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
        <div class="f-current-role">👑 ${current.identityTitle} — ${current.fullTitle}</div>
        <div class="f-current-desc">${current.description}</div>
      </div>
    `;

    // Render 5 Progression Stages
    ui.factionStagesList.innerHTML = '';
    factionStages.forEach(s => {
      const isCurrent = s.id === current.id;
      const isCompleted = s.id < current.id;

      let statusClass = 'stage-locked';
      let statusBadge = '<span class="f-stage-badge badge-locked">CHƯA ĐẠT ĐẾN 🔒</span>';
      if (isCurrent) {
        statusClass = 'stage-active';
        statusBadge = '<span class="f-stage-badge badge-active">HIỆN THỜI ⚡</span>';
      } else if (isCompleted) {
        statusClass = 'stage-completed';
        statusBadge = '<span class="f-stage-badge badge-completed">ĐÃ VƯỢT QUA ✓</span>';
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
          <div class="f-stage-buff">✨ Mở rộng: ${s.buffSummary}</div>
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
  // 6. GACHA SUMMONING ENGINE (BÁI TƯỚNG THẦN ĐÀN) — 5-PHASE DIEGETIC THEATER
  // =========================================================================
  let gachaContext = {
    mode: 'normal', // 'normal' | 'story'
    returnKnot: null
  };
  let isSummoning = false;

  function openGachaModal(options = {}) {
    gachaContext = {
      mode: options.mode || 'normal',
      returnKnot: options.returnKnot || null
    };

    if (!state.unlocked.gacha && gachaContext.mode !== 'story') {
      showToast("🔒 Bái Tướng Đài chưa được khai mở! Cần tiến tới Chương 5 trong kịch bản.");
      return;
    }

    resetGachaAltarState();

    if (ui.gachaTicketDisplay) ui.gachaTicketDisplay.textContent = state.ticketCount;
    if (ui.gachaJadeDisplay) ui.gachaJadeDisplay.textContent = state.jade;
    if (ui.gachaPityCounter) ui.gachaPityCounter.textContent = `${state.pityCount} / 90`;

    ui.gachaModal.classList.remove('hidden');
  }

  function resetGachaAltarState() {
    isSummoning = false;
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

  function performSummon() {
    if (isSummoning) return;

    if (state.ticketCount < 1 && state.jade < 160) {
      showToast("⚠️ Không có Anh Hồn Lệnh hoặc đủ 160 Kim Bảo!");
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
    if (ui.btnDoSummon) ui.btnDoSummon.disabled = true;

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

    const isHighRarity = pulledHero.rarity === 'SSR' || pulledHero.rarity === 'UR';

    // -------------------------------------------------------------
    // PHASE 1: TẾ PHÙ (Talisman Plunges into Bagua Core)
    // -------------------------------------------------------------
    if (ui.summonTalisman) ui.summonTalisman.classList.add('talisman-sacrificed');
    if (ui.talismanHint) ui.talismanHint.textContent = "Đang Tế Phù... Linh khí Thượng Cổ khởi phát!";

    // -------------------------------------------------------------
    // PHASE 2: TỤ KHÍ BÁT QUÁI & KINTSUGI RESONANCE
    // -------------------------------------------------------------
    setTimeout(() => {
      if (ui.baguaFormation) ui.baguaFormation.classList.add('fast-spin');

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

    // -------------------------------------------------------------
    // PHASE 3: PHÁ ẤN (Seal Shatter Shockwave)
    // -------------------------------------------------------------
    setTimeout(() => {
      if (ui.sealShatterFx) ui.sealShatterFx.classList.remove('hidden');
      triggerShake('impact');
    }, 1450);

    // -------------------------------------------------------------
    // PHASE 4: GIÁNG THẾ (Grand Full-Screen Hero Reveal)
    // -------------------------------------------------------------
    setTimeout(() => {
      // Clear buildup animations
      if (ui.kintsugiFracturesLayer) ui.kintsugiFracturesLayer.classList.add('hidden');
      if (ui.sealShatterFx) ui.sealShatterFx.classList.add('hidden');
      if (ui.baguaFormation) ui.baguaFormation.classList.remove('fast-spin');

      // Populate hero data
      if (ui.revealCardImg) {
        ui.revealCardImg.src = (pulledHero.id === 'hero_zhaoyun') ? 'assets/images/zhaoyun.jpg' : (pulledHero.avatar || 'assets/images/actor_quy_binh_an.png');
      }
      if (ui.revealSealBadge) {
        ui.revealSealBadge.textContent = pulledHero.name ? pulledHero.name[0] : '將';
      }
      if (ui.revealCardName) {
        ui.revealCardName.textContent = pulledHero.name.toUpperCase();
      }
      if (ui.revealCardTitle) {
        const alias = (pulledHero.aliases && pulledHero.aliases[0]) ? pulledHero.aliases[0] : '';
        ui.revealCardTitle.textContent = `${alias ? alias + ' · ' : ''}Võ Lực ${pulledHero.base_stats ? pulledHero.base_stats.force : 90}`;
      }
      if (ui.revealCardRarity) {
        const rarityText = pulledHero.rarity === 'UR' ? 'CHIẾN THẦN TRUYỀN THUYẾT' : (pulledHero.rarity === 'SSR' ? 'HOÀNG KIM THƯỢNG TƯỚNG' : 'DANH TƯỚNG PHƯƠNG BẮC');
        ui.revealCardRarity.textContent = `${pulledHero.rarity} · ${rarityText}`;
      }
      if (ui.revealCardRealm) {
        ui.revealCardRealm.textContent = `Cảnh giới: ${pulledHero.realm || 'Hóa Cảnh Đỉnh Phong'}`;
      }
      if (ui.revealQuoteText) {
        const quotes = {
          'hero_zhaoyun': '“Long Đảm Nhất Xuất, Thiên Quân Vạn Mã Tẫn Đoạn Hồn!”',
          'hero_gaoshun': '“Hãm Trận Dũng Sĩ, Hữu Tử Vô Sinh, Quyết Bất Thối Bộ!”',
          'hero_jiaxu': '“Trời Đất Là Cờ, Nhân Tâm Là Mồi, Mưu Định Giang Sơn!”'
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

      showToast(`🌟 THỈNH TRIỆU THÀNH CÔNG: [${pulledHero.rarity}] ${pulledHero.name}!`, true);

      // State progression
      if (pulledHero.id === 'hero_zhaoyun') {
        state.unlocked.zhaoyun = true;
      }
      state.unlocked.gacha = true;
      updateProgressTrackerUI();

      isSummoning = false;
    }, 2050);
  }

  function handleConfirmSummon() {
    if (ui.gachaModal) ui.gachaModal.classList.add('hidden');
    resetGachaAltarState();

    const heroName = state.lastSummonedHero ? state.lastSummonedHero.name : "Triệu Tử Long";
    showToast(`⚔️ Đã tiếp nhận danh tướng! ${heroName} đã quy vị dưới trướng.`);

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
      showToast("⚠️ Không có Anh Hồn Lệnh hoặc đủ 160 Kim Bảo để thỉnh triệu tiếp!");
      return;
    }
    resetGachaAltarState();
    performSummon();
  }

  function handleInspectHero() {
    const heroId = state.lastSummonedHero ? state.lastSummonedHero.id : 'hero_zhaoyun';
    renderHeroInspector(heroId);
    if (ui.heroDetailModal) ui.heroDetailModal.classList.remove('hidden');
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
      const glyph = h.rarity === 'UR' ? '[ 帝 ]' : (h.rarity === 'SSR' ? '[ 神 ]' : '[ 將 ]');
      const lockGlyph = !isOwned ? ' [ 鎖 ]' : '';
      chip.innerHTML = `<span style="font-family: var(--font-seal); font-size: 13px; margin-right: 4px;">${glyph}</span> ${h.name}${lockGlyph}`;
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
      const typeGlyph = sk.type === 'active' ? '技' : '禦';
      entry.innerHTML = `
        <div class="sk-icon" style="font-family: var(--font-seal); font-size: 16px; color: var(--gold-primary);">${typeGlyph}</div>
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
      let speakerName = "Người Dẫn Truyện";
      let speakerSub = "Hồi 1 · Phò Mã Phủ Thức Tỉnh";

      const trimmedLine = line.trim();
      const isQuoted = trimmedLine.startsWith('"') || trimmedLine.startsWith('“') || trimmedLine.startsWith("'") || trimmedLine.startsWith('「');
      const hasSpeakerColon = trimmedLine.includes(': "') || trimmedLine.includes(': “') || trimmedLine.includes('：');

      if (isQuoted || hasSpeakerColon) {
        if (line.includes("Mạt tướng") || line.includes("Tử Long") || line.includes("Triệu Vân")) {
          speakerName = "Triệu Tử Long";
          speakerSub = "Thường Sơn Hổ Tướng · Hoàng Cảnh Sơ Kỳ";
        } else if (line.includes("Phò mã gia!") || line.includes("bệ hạ triệu kiến") || line.includes("Tỳ nữ")) {
          speakerName = "Tỳ Nữ Phò Mã Phủ";
          speakerSub = "Cung Nhân Hầu Cận";
        } else if (line.includes("Bệ hạ Đại Vũ") || line.includes("Lễ nghĩa chi bang") || line.includes("Thiên đương kỳ bàn") || line.includes("Địa tác tỳ bà")) {
          speakerName = "Sứ Thần Nam Ly";
          speakerSub = "Sứ Đoàn Phương Nam";
        } else if (line.includes("HAY! HAY LẮM!") || line.includes("Trẫm không ngờ") || line.includes("Đối đi.") || line.includes("Ban thưởng phò mã")) {
          speakerName = "Vũ Hoàng";
          speakerSub = "Đại Vũ Đế Vương";
        } else if (line.includes("Cao Thuận") || line.includes("Hãm Trận Doanh")) {
          speakerName = "Cao Thuận";
          speakerSub = "Thống Soái Hãm Trận Doanh";
        } else if (line.includes("Văn Hòa") || line.includes("Độc kế")) {
          speakerName = "Giả Hủ (Văn Hòa)";
          speakerSub = "Tuyệt Thế Độc Sĩ";
        } else {
          speakerName = "Quý Bình An";
          speakerSub = "Phò Mã Gia";
        }
      } else if (trimmedLine.startsWith("[HỆ THỐNG]") || trimmedLine.includes("[HỆ THỐNG]")) {
        speakerName = "Hệ Thống Tam Quốc";
        speakerSub = "Trí Huệ Xuyên Không";
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
        speakerSeal.textContent = isNarrator ? "史" : (speakerName[0] || "鎮");
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
        showToast("📜 Tiết tấu tạm lắng. Hãy thẩm định Sa Bàn Quân Cơ hoặc Ma Trận Chương để tiếp nối đại nghiệp.");
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
          <img src="assets/images/actor_to_kien_phong.png" alt="Triệu Vân" class="hero-mini-art">
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
        showToast("⚠️ Không đủ 2 Mana!");
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
    if (viewName === 'battle' && !state.unlocked.battleFront) {
      showToast("🔒 Tầng 3: Sa Trường Thẻ Bài bị khóa! Cần tiến tới Chương 48 (Đại Chiến Thanh Châu).");
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
        showToast("📜 Đang thám sát Sa Bàn Quân Cơ — Hoàn thành Ch.15 để mở quyền điều binh!");
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
        showToast("🗺️ Mở Đế Nghiệp Sa Bàn — Tham kiến thế cục hoàng triều & 4 phương", true);
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
    if (ui.btnDoSummon) ui.btnDoSummon.addEventListener('click', performSummon);
    if (ui.summonTalisman) ui.summonTalisman.addEventListener('click', performSummon);
    if (ui.btnRevealInspect) ui.btnRevealInspect.addEventListener('click', handleInspectHero);
    if (ui.btnRevealAgain) ui.btnRevealAgain.addEventListener('click', handleSummonAgain);
    if (ui.btnRevealConfirm) ui.btnRevealConfirm.addEventListener('click', handleConfirmSummon);

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
      console.log("⚡ [PixiJS] WebGL atmospheric ink-mist active");
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
        showToast(`📍 Chuyển tầm mắt Sa Bàn tới: ${tok.userData.name}`);
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
      console.log("⚡ [Three.js] 3D tactical relief war sand-table active with real texture and 3D tokens");
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
      console.log("⚡ [Phaser 3] Full tactical card battler battlefield engine active");
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
  renderCurrentDialogue();

  // Initialize Trio Techstack
  setTimeout(() => {
    initPixiEngine();
    initThreeEngine();
    initPhaserEngine();
    censerSmokeSystem.init();
  }, 100);

  console.log("⚡ [Prototype V3] Khởi động thành công với Trio (Phaser/Three/Pixi), 28 danh tướng và Ink Engine!");
});
