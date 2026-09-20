/**
 * TRẤN QUỐC PHÒ MÃ GIA — ADVANCED STRATEGY & NOVEL ADAPTATION GAME CLIENT
 * 
 * 100% NOVEL CANON PROGRESSION & 3-TIER ENGINE:
 * 1. Chapter-by-Chapter Feature Unlock Matrix (Ch.1 -> Ch.52)
 * 2. Authentic Three Kingdoms Gacha Summoning Altar (Bái Tướng Đài)
 * 3. Hero Card Detail Inspector (Tứ Duy: Võ 96/Thống 91/Trí 76/Chính 65, Hoàng Cảnh, Thần Binh, Duyên Phận)
 * 4. Progressive Feature Locking (Xà Phòng Ch.8, Sa Bàn Ch.15, Giả Hủ Ch.27, Khai Nguyên Ch.43, Sa Trường Ch.48-52)
 * 5. 3-Tier Tactical Battle with Fortress Wall 500 HP & Enemy Intent Telegraph
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. NOVEL CHAPTER PROGRESSION MATRIX DATABASE
  // =========================================================================
  const chapterMatrix = [
    {
      id: 1,
      badge: "CHƯƠNG 1",
      title: "Phá Giải Câu Đối Hoàng Cung",
      featureUnlocked: "Kích Hoạt Hệ Thống & 1 Anh Hồn Lệnh",
      lore: "Quý Bình An xuyên không nhập thể phò mã phế vật, đối lại câu đối cái thế 'Địa tác tỳ bà lộ tác huyền...', chấn động Vũ Hoàng và bách quan triều đình.",
      unlocked: true,
      active: true
    },
    {
      id: 5,
      badge: "CHƯƠNG 5",
      title: "Bái Tướng Đài & Triệu Hoán Triệu Vân",
      featureUnlocked: "Gacha Bái Tướng Đài & Bảng Thuộc Tính Tướng",
      lore: "Dùng Anh Hồn Lệnh Sơ Cấp triệu hoán Thường Sơn Triệu Tử Long SSR, mở khóa Bảng Tra Cứu Thuộc Tính Tứ Duy (Võ Lực 96).",
      unlocked: false,
      active: false
    },
    {
      id: 8,
      badge: "CHƯƠNG 8",
      title: "Phát Minh Thấu Hoa Cao",
      featureUnlocked: "Kinh Doanh Xà Phòng (+3.000 Vàng/Lượt)",
      lore: "Quý Bình An chế tạo xà phòng thơm từ mỡ cừu và tro kiềm, bắt tay Thiên Kim Lâu của Vệ Ti Vũ tạo ra nguồn tài chính khổng lồ.",
      unlocked: false,
      active: false
    },
    {
      id: 10,
      badge: "CHƯƠNG 10",
      title: "Trận Thích Sát Phò Mã Phủ",
      featureUnlocked: "Thử Thách Quý Vô Song & Tô Kiến Phong",
      lore: "Sát thủ đột kích phủ đệ trong đêm mưa, Triệu Vân một thương quét sạch, bộc lộ uy áp Hoàng Cảnh Sơ Kỳ.",
      unlocked: false,
      active: false
    },
    {
      id: 15,
      badge: "CHƯƠNG 15",
      title: "Vũ Hoàng Hạ Chỉ Bắc Chinh",
      featureUnlocked: "TẦNG 2: Đế Nghiệp Sa Bàn & Lệnh Sa Bàn (AP)",
      lore: "Vũ Hoàng phong Quý Bình An làm Chinh Bắc Đại Tướng Quân, mở khóa bản đồ quân sự 4 phương và điều binh khiển tướng.",
      unlocked: false,
      active: false
    },
    {
      id: 27,
      badge: "CHƯƠNG 27",
      title: "Triệu Hoán Độc Sĩ Giả Hủ",
      featureUnlocked: "Siêu Thẻ Bài: Xả Lũ Sông Thanh Thủy",
      lore: "Hố 20 vạn vàng từ triều đình, triệu hoán Độc Sĩ Giả Hủ Văn Hòa, vạch ra mưu kế đắp đê ngăn sông Thanh Thủy diệt địch.",
      unlocked: false,
      active: false
    },
    {
      id: 43,
      badge: "CHƯƠNG 43",
      title: "Đoạt Cửa Ngõ Huyện Khai Nguyên",
      featureUnlocked: "Vựa Lương Hậu Cần Khai Nguyên (50.000 Thạch)",
      lore: "Quý Bình An giả trúng độc bắt sống Lưu Nguyên, tước đoạt toàn bộ kho quân lương của Tứ Hoàng Tử.",
      unlocked: false,
      active: false
    },
    {
      id: 52,
      badge: "CHƯƠNG 48-52",
      title: "Đại Chiến Thành Thanh Châu",
      featureUnlocked: "TẦNG 3: Sa Trường Thẻ Bài 3 Làn & Tường Thành 500 HP",
      lore: "2 vạn thiết kỵ Địch Hỏa vây hãm, dùng thủy kế Giả Hủ và Triệu Vân đại phá quân Nam Ly bảo vệ biên cương.",
      unlocked: false,
      active: false
    }
  ];

  // =========================================================================
  // 2. MASTER GAME STATE
  // =========================================================================
  const state = {
    currentView: 'vn', // 'vn' | 'map' | 'battle'
    currentChapterId: 1,

    // Progression Unlock Flags
    unlocked: {
      gacha: false,        // Unlocked at Ch.5
      zhaoyun: false,      // Unlocked at Ch.5 (after summon)
      soap: false,         // Unlocked at Ch.8
      strategyMap: false,  // Unlocked at Ch.15
      giaHu: false,        // Unlocked at Ch.27
      khaiNguyen: false,   // Unlocked at Ch.43
      battleFront: false   // Unlocked at Ch.52
    },

    // Resources
    ticketCount: 1,       // Anh Hồn Lệnh Sơ Cấp
    suspicion: 15,        // Emperor Suspicion (0 - 100%)
    gold: 100,            // Starts with 100 gold from poem victory
    food: 5000,           // Starts with initial mansion supplies
    ap: 3,
    maxAp: 3,

    // VN Dialogue State
    vnBranch: 'scene1_poem',
    vnIndex: 0,
    isTyping: false,
    autoAdvance: false,
    autoTimer: null,
    dialogueHistory: [],

    // Map State
    selectedNode: 'dedo',

    // Battle Arena State
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

    // VN Elements
    vnStage: document.getElementById('vn-stage'),
    lightningFlash: document.getElementById('lightning-flash'),
    actorLeftSlot: document.getElementById('actor-left-slot'),
    actorLeftAvatar: document.getElementById('actor-left-avatar'),
    actorLeftNametag: document.getElementById('actor-left-nametag'),
    actorRightSlot: document.getElementById('actor-right-slot'),
    actorRightAvatar: document.getElementById('actor-right-avatar'),
    actorRightImg: document.getElementById('actor-right-img'),
    actorRightNametag: document.getElementById('actor-right-nametag'),
    vnSpeaker: document.getElementById('vn-speaker'),
    vnSpeakerSub: document.getElementById('vn-speaker-sub'),
    vnDialogueText: document.getElementById('vn-dialogue-text'),
    vnBranchIndicator: document.getElementById('vn-branch-indicator'),
    btnVnAdvance: document.getElementById('btn-vn-advance'),
    btnVnLog: document.getElementById('btn-vn-log'),
    btnVnAuto: document.getElementById('btn-vn-auto'),
    choiceModal: document.getElementById('branch-choice-modal'),
    choiceQuestion: document.getElementById('choice-question'),
    choiceGrid: document.getElementById('choice-grid'),
    backlogDrawer: document.getElementById('backlog-drawer'),
    backlogBody: document.getElementById('backlog-body'),
    btnCloseLog: document.getElementById('btn-close-log'),

    // Map Elements
    provinceNodes: document.querySelectorAll('.province-node'),
    panelCityBadge: document.getElementById('panel-city-badge'),
    panelCityName: document.getElementById('panel-city-name'),
    panelCityThreat: document.getElementById('panel-city-threat'),
    panelCityDesc: document.getElementById('panel-city-desc'),
    panelGarrison: document.getElementById('panel-garrison'),
    panelFood: document.getElementById('panel-food'),
    panelDist: document.getElementById('panel-dist'),
    panelIntel: document.getElementById('panel-intel'),
    btnActionBattle: document.getElementById('btn-action-battle'),
    btnActionSoap: document.getElementById('btn-action-soap'),
    btnActionTribute: document.getElementById('btn-action-tribute'),
    btnIntercept: document.getElementById('btn-intercept'),

    // Battle Elements
    wallHpVal: document.getElementById('wall-hp-val'),
    wallHpBar: document.getElementById('wall-hp-bar'),
    reservoirFill: document.getElementById('reservoir-fill'),
    stageDots: [document.getElementById('stage-1'), document.getElementById('stage-2'), document.getElementById('stage-3')],
    bossHpVal: document.getElementById('enemy-hp-val'),
    bossHpBar: document.getElementById('enemy-hp-bar'),
    enemyMoraleVal: document.getElementById('enemy-morale-val'),
    bossIntentDisplay: document.getElementById('boss-intent-display'),
    hpEnemyLeft: document.getElementById('hp-enemy-left'),
    hpEnemyCenter: document.getElementById('hp-enemy-center'),
    hpEnemyRight: document.getElementById('hp-enemy-right'),
    cardEnemyLeft: document.getElementById('card-enemy-left'),
    cardEnemyCenter: document.getElementById('card-enemy-center'),
    cardEnemyRight: document.getElementById('card-enemy-right'),
    playerZoneLeft: document.getElementById('player-zone-left'),
    playerZoneRight: document.getElementById('player-zone-right'),
    hpZhaoYun: document.getElementById('hp-zhaoyun'),
    txtMana: document.getElementById('txt-mana'),
    manaGemTrack: document.getElementById('mana-gem-track'),
    playerMoraleBar: document.getElementById('player-morale-bar'),
    btnExecuteTurn: document.getElementById('btn-execute-turn'),

    // Gacha Modal
    gachaModal: document.getElementById('gacha-modal'),
    btnCloseGacha: document.getElementById('btn-close-gacha'),
    gachaTicketDisplay: document.getElementById('gacha-ticket-display'),
    btnDoSummon: document.getElementById('btn-do-summon'),
    altarBtnRow: document.getElementById('altar-btn-row'),
    revealActionRow: document.getElementById('reveal-action-row'),
    gachaCardReveal: document.getElementById('gacha-card-reveal'),
    cardFlipper: document.getElementById('card-flipper'),
    summonTalisman: document.getElementById('summon-talisman'),
    baguaRing: document.getElementById('bagua-ring'),
    btnRevealInspect: document.getElementById('btn-reveal-inspect'),
    btnRevealConfirm: document.getElementById('btn-reveal-confirm'),

    // Hero Detail Modal
    heroDetailModal: document.getElementById('hero-detail-modal'),
    btnCloseHeroDetail: document.getElementById('btn-close-hero-detail'),

    // Milestone Matrix Modal
    milestoneMatrixModal: document.getElementById('milestone-matrix-modal'),
    btnCloseMatrix: document.getElementById('btn-close-matrix'),
    matrixTimelineList: document.getElementById('matrix-timeline-list'),

    // Unlock Event Modal
    unlockEventModal: document.getElementById('unlock-event-modal'),
    unlockModalIcon: document.getElementById('unlock-modal-icon'),
    unlockModalTitle: document.getElementById('unlock-modal-title'),
    unlockModalName: document.getElementById('unlock-modal-name'),
    unlockModalLore: document.getElementById('unlock-modal-lore'),
    unlockModalEffect: document.getElementById('unlock-modal-effect'),
    btnCloseUnlock: document.getElementById('btn-close-unlock'),

    // Victory Modal
    victoryModal: document.getElementById('victory-modal'),
    btnTriumphNext: document.getElementById('btn-triumph-next')
  };

  // =========================================================================
  // 4. CANONICAL NOVEL SCRIPT (CHƯƠNG 1 -> CHƯƠNG 52)
  // =========================================================================
  const dialogueBranches = {
    // CHƯƠNG 1: ĐẠI ĐIỆN ĐỐI THƠ KINH ĐỘNG VŨ HOÀNG
    scene1_poem: [
      {
        speaker: "Dẫn Chuyện",
        title: "Đại Vũ Triều · Cần Chính Điện",
        side: "center",
        text: "Kinh đô Đại Vũ nguy nga tráng lệ, đại yến tiếp đón sứ đoàn Nam Ly và Tây Lăng đang diễn ra vô cùng căng thẳng. Quý Bình An—tên Phò Mã bị bách quan coi là phế vật ăn chơi—ngồi nép mình bên cạnh Ninh An Công Chúa."
      },
      {
        speaker: "Ninh An Công Chúa",
        title: "Trưởng Công Chúa · Thê Tử Hờ",
        side: "left",
        actorName: "Ninh An Công Chúa",
        actorText: "Hoàng Gia Công Chúa",
        text: "Quý Bình An, đến đại điện thì an phận ngậm miệng lại! Đừng để thiên hạ cười chê bản cung gả cho một tên chỉ biết ăn chơi đàng điếm làm mất mặt Hoàng thất!"
      },
      {
        speaker: "Sứ Thần Nam Ly",
        title: "Sứ Đoàn Ngoại Bang · Ngạo Mạn Khôn Cùng",
        side: "left",
        actorName: "Sứ Thần Nam Ly",
        actorText: "Đại Sứ Nam Ly",
        text: "Haha! Trăm vạn văn nhân Đại Vũ chỉ có bấy nhiêu thôi sao?! Quân Thần Cung Sinh của Nam Ly ta có một vế đối: 'Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?' (Trời làm bàn cờ sao làm quân cờ, ai dám đánh?). Nếu không ai đối được, hãy ngoan ngoãn dâng nạp 3 châu biên giới!",
        shake: true
      },
      {
        speaker: "Vũ Hoàng",
        title: "Đại Vũ Đế Hoàng · Long Nhan Thịnh Nộ",
        side: "left",
        actorName: "Vũ Hoàng",
        actorText: "Chí Tôn Cửu Ngũ",
        text: "Trơ trẽn! Trăm vạn sĩ tử, Hàn lâm học sĩ của Trẫm đâu hết rồi?! Chẳng lẽ Đại Vũ ta không có một người dám đứng ra đối lại câu này sao?!",
        flash: true
      },
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia · Xuyên Không Thức Tỉnh",
        side: "right",
        actorName: "Quý Bình An",
        text: "Khụ... Một vế đối tầm thường như vậy mà cũng dám đem ra diễu võ dương oai trước mặt thiên hạ? Bản Phò mã có câu đối này, các ngươi hãy nghe cho rõ!",
        choicePrompt: "Quý Bình An quyết định chọn vế đối nào để đối đáp với sứ đoàn Nam Ly?",
        choices: [
          {
            badge: "CHUẨN NGUYÊN TÁC TUYỆT PHẨM",
            title: "Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?!",
            desc: "Đất làm đàn tỳ bà, đường xá làm dây đàn, bậc cái thế ai dám gảy?! Khí phách áp đảo thiên hạ!",
            effect: "Vũ Hoàng chấn động · Thưởng 100 Vàng · Thức tỉnh Hệ Thống Tam Quốc & Anh Hồn Lệnh Sơ Cấp",
            targetBranch: "scene1_win"
          },
          {
            badge: "KHIÊM TỐN THẬN TRỌNG",
            title: "Hải tác nghiên mặc vân tác chỉ, cổ kim thùy thư?",
            desc: "Biển làm nghiên mực, mây làm giấy, xưa nay ai viết? Câu đối thi vị nhưng thiếu khí phách đế vương.",
            effect: "Không gây được chấn động · Chỉ nhận 50 Vàng",
            targetBranch: "scene1_win"
          }
        ]
      }
    ],

    scene1_win: [
      {
        speaker: "Vũ Hoàng",
        title: "Đại Vũ Đế Hoàng",
        side: "left",
        actorName: "Vũ Hoàng",
        actorText: "Chí Tôn Cửu Ngũ",
        text: "'Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?!' Tuyệt! Tuyệt diệu vô cùng! Khí phách ngang tàng cái thế! Sứ thần Nam Ly, các ngươi còn lời nào để nói nữa không?!",
        shake: true,
        flash: true,
        goldChange: 100
      },
      {
        speaker: "Ninh An Công Chúa",
        title: "Trưởng Công Chúa",
        side: "left",
        actorName: "Ninh An Công Chúa",
        actorText: "Hoàng Gia Công Chúa",
        text: "Ngươi... Quý Bình An, ngươi thật sự là tên phế vật mà cả kinh thành đồn đại bấy lâu nay sao? Tại sao ngươi lại có thể xuất khẩu thành tuyệt tác bực này..."
      },
      {
        speaker: "Hệ Thống Triệu Hoán",
        title: "Tam Quốc Anh Linh Hệ Thống",
        side: "center",
        text: "【Keng! Chúc mừng Ký chủ giải nguy thành công, lập uy trước thiên hạ! Hệ Thống Tam Quốc Anh Linh chính thức thức tỉnh! Ban thưởng 1 Anh Hồn Lệnh Sơ Cấp! Đang dẫn đường tới Chương 5: Bái Tướng Đài!】",
        flash: true,
        triggerChapterAdvance: 5
      }
    ],

    // CHƯƠNG 5: PHÒ MÃ PHỦ & KÍCH HOẠT BÁI TƯỚNG ĐÀI
    scene5_summon: [
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia",
        side: "right",
        actorName: "Quý Bình An",
        text: "Trở về Phò Mã Phủ rồi... Trận đối thơ vừa rồi tuy thắng lớn, nhưng ánh mắt của Vũ Hoàng nhìn ta lại thêm vài phần băng lãnh nghi kỵ. Ở cái thế giới võ đạo vi tôn này, nếu không có thực lực, sớm muộn gì cũng thành cái xác không đầu!"
      },
      {
        speaker: "Hệ Thống Triệu Hoán",
        title: "Bái Tướng Đài",
        side: "center",
        text: "【Keng! Phát hiện Ký chủ nắm giữ 1 Anh Hồn Lệnh Sơ Cấp! Bái Tướng Đài đã khai mở. Ký chủ hãy tiến hành triệu hoán Võ Tướng Tam Quốc đầu tiên để hộ giá!】",
        triggerGachaModal: true
      },
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng · Hoàng Cảnh Sơ Kỳ",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Mạt tướng Thường Sơn Triệu Tử Long! Bái kiến Chúa Công! Nguyện vì Chúa Công xông pha khói lửa, dẫu muôn thác không từ!",
        shake: true
      },
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Tử Long mau đứng dậy! Có được Thường Sơn Triệu Tử Long, ta như cá gặp nước! Nhưng muốn nuôi dưỡng đại quân và củng cố thế lực, ta cần phải phát minh ra thứ gì đó để kiếm tiền.",
        triggerChapterAdvance: 8
      }
    ],

    // CHƯƠNG 8: PHÁT MINH THẤU HOA CAO & THIÊN KIM LÂU
    scene8_soap: [
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Thời cổ đại này người ta toàn dùng bồ kết và tro bẩn để tắm giặt. Ta dùng mỡ cừu đun sôi kết hợp tro kiềm tinh lọc, thêm hương hoa cúc và hoa quế... Bùm! Xà phòng thơm 'Thấu Hoa Cao' thượng đẳng đã ra lò!"
      },
      {
        speaker: "Vệ Ti Vũ",
        title: "Lâu Chủ Thiên Kim Lâu · Thương Gia Đệ Nhất",
        side: "left",
        actorName: "Vệ Ti Vũ",
        actorText: "Lâu Chủ Thiên Kim",
        text: "Trời ơi! Thấu Hoa Cao này bọt mịn như tơ, thơm ngát ba ngày không tan! Phò Mã Gia, ta nguyện đem toàn bộ mạng lưới Thiên Kim Lâu hợp tác cùng ngài, mỗi bánh xà phòng bán ra với giá trăm lượng vàng!"
      },
      {
        speaker: "Hệ Thống",
        title: "Thiên Cơ Khai Mở",
        side: "center",
        text: "【Đinh! Hoàn thành Chương 8: Chế tạo Thấu Hoa Cao & Bắt tay Vệ Ti Vũ! CHÍNH THỨC MỞ KHÓA TÍNH NĂNG: KINH DOANH XÀ PHÒNG THẤU HOA CAO! Thu về +3.000 Vàng mỗi đợt!】",
        triggerFeatureUnlock: 'soap',
        triggerChapterAdvance: 10
      }
    ],

    // CHƯƠNG 10: THÍCH SÁT PHÒ MÃ PHỦ
    scene10_assassin: [
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Chúa Công cẩn thận! Có sát khí trên nóc nhà! Là tử sĩ Luyện Cốt Cảnh đỉnh phong, tên cầm đầu là Hoàng Cảnh!",
        shake: true
      },
      {
        speaker: "Sát Thủ Áo Đen",
        title: "Hắc Y Tử Sĩ",
        side: "left",
        actorName: "Sát Thủ Áo Đen",
        actorText: "Hắc Y Tử Sĩ",
        text: "Quý Bình An, nợ máu Quý gia đêm nay ngươi phải đền mạng! Chết đi!",
        shake: true
      },
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Thương dưới chân, ai dám đụng tới Chúa Công ta?! Vút! Xoẹt!",
        shake: true,
        flash: true
      },
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Chúa Công, toàn bộ 6 tên thích khách đã bị mạt tướng đâm thủng yết hầu. Trên người có lệnh bài Tô gia và ám chỉ từ Trấn Quốc Hầu phủ Quý Vô Song muốn thử thách thực lực của ngài!",
        choicePrompt: "Xử lý hậu quả trận thích sát ra sao để giữ thế cân bằng chính trị?",
        choices: [
          {
            badge: "ẨN NHẪN KÍN KẼ (CANON)",
            title: "Ngụy tạo tai nạn, giữ kín tin tức với triều đình",
            desc: "Không đánh rắn động cỏ, che giấu thực lực Hoàng Cảnh của Triệu Vân.",
            effect: "Nghi Kỵ -10% · Chuẩn bị tiếp nhận thánh chỉ Chinh Bắc",
            targetBranch: "scene15_march"
          },
          {
            badge: "QUYỀN BIẾN ĐỐI CHẤT",
            title: "Gửi phong thư cảnh cáo đến phủ Tô Kiến Phong",
            desc: "Răn đe Cấm Vệ Quân không được manh động.",
            effect: "Tăng 200 điểm uy danh sát khí",
            targetBranch: "scene15_march"
          }
        ]
      }
    ],

    // CHƯƠNG 15: THÁNH CHỈ CHINH BẮC & MỞ KHÓA SA BÀN
    scene15_march: [
      {
        speaker: "Tô Kiến Phong",
        title: "Cấm Vệ Quân Thống Lĩnh",
        side: "left",
        actorName: "Tô Kiến Phong",
        actorText: "Khâm Sai Hoàng Triều",
        text: "Phò Mã Quý Bình An tiếp chỉ! Nam Ly xua quân xâm phạm Bắc Cảnh. Bệ Hạ hạ chiếu phong ngươi làm Chinh Bắc Đại Tướng Quân, dẫn quân thu phục 3 châu biên thùy!",
        suspicionChange: -10
      },
      {
        speaker: "Quý Bình An",
        title: "Chinh Bắc Đại Tướng Quân",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Thần Quý Bình An lĩnh chỉ tạ ơn! Khởi binh Bắc tiến!"
      },
      {
        speaker: "Hệ Thống",
        title: "Thiên Cơ Khai Mở",
        side: "center",
        text: "【Đinh! Hoàn thành Chương 15: Sắc phong Chinh Bắc Đại Tướng Quân! CHÍNH THỨC MỞ KHÓA TẦNG 2: ĐẾ NGHIỆP SA BÀN & ĐIỂM HÀNH ĐỘNG (AP)! Ký chủ có thể truy cập Bản Đồ 4 Phương!】",
        triggerFeatureUnlock: 'strategyMap',
        triggerChapterAdvance: 27
      }
    ],

    // CHƯƠNG 27: HỐ VÀNG TRIỀU ĐÌNH & TRIỆU HOÁN GIẢ HỦ
    scene27_giahu: [
      {
        speaker: "Quý Bình An",
        title: "Chinh Bắc Đại Tướng Quân",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Muốn ta đi dẹp loạn nhưng không cấp lương thảo? Hừ, ta ép Vũ Hoàng chi 20 vạn lượng vàng mua quân công cho Thập Tam hoàng tử! Giờ ta có đủ ngân lượng để triệu hoán Độc Sĩ đệ nhất Tam Quốc!"
      },
      {
        speaker: "Giả Hủ (Văn Hòa)",
        title: "Tuyệt Thế Độc Sĩ · Mưu Kế Thần Sầu",
        side: "left",
        actorName: "Giả Hủ Văn Hòa",
        actorText: "Độc Sĩ Mưu Thần",
        text: "Giả Hủ bái kiến Chúa Công! Tiên phong Địch Hỏa của Nam Ly cậy 2 vạn thiết kỵ đang tiến vào thung lũng Thanh Châu. Giả Hủ hiến kế: Lén đắp đê ngăn sông Thanh Thủy ở thượng nguồn, chờ quân địch vào hẻm thì phá đê trút lũ quét sạch toàn quân!",
        shake: true
      },
      {
        speaker: "Hệ Thống",
        title: "Thiên Cơ Khai Mở",
        side: "center",
        text: "【Đinh! Hoàn thành Chương 27: Triệu hoán Giả Hủ! CHÍNH THỨC MỞ KHÓA SIÊU THẺ BÀI: XẢ LŨ THANH THỦY TRONG SA TRƯỜNG!】",
        triggerFeatureUnlock: 'giaHu',
        triggerChapterAdvance: 43
      }
    ],

    // CHƯƠNG 43: ĐOẠT KHAI NGUYÊN HUYỆN
    scene43_khainguyen: [
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Khởi bẩm Chúa Công! Kế giả trúng độc của ngài đã thành công! Huyện lệnh tham ô Lưu Nguyên vừa mở cổng đã bị mạt tướng bắt sống. Toàn bộ kho 50.000 thạch lương thảo của Tứ Hoàng Tử đã thuộc về chúng ta!"
      },
      {
        speaker: "Hệ Thống",
        title: "Thiên Cơ Khai Mở",
        side: "center",
        text: "【Đinh! Hoàn thành Chương 43: Đoạt Huyện Khai Nguyên! MỞ KHÓA KHO LƯƠNG HẬU CẦN KHAI NGUYÊN (+50.000 Thạch Lương)!】",
        triggerFeatureUnlock: 'khaiNguyen',
        foodChange: 45000,
        triggerChapterAdvance: 52
      }
    ],

    // CHƯƠNG 48-52: ĐẠI CHIẾN THÀNH THANH CHÂU
    scene52_battle: [
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Chúa Công! Đại quân 2 vạn thiết kỵ của Địch Hỏa đã bao vây chân thành Thanh Châu! Xe đục thành và dàn hỏa tiễn đang nhắm thẳng vào tường thành!",
        shake: true
      },
      {
        speaker: "Quý Bình An",
        title: "Chúa Công",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Đã đến lúc! Tử Long thống lĩnh ba quân giữ vững Tường Thành, Văn Hòa phụ trách tháo đê xả lũ! Toàn quân xuất trận!",
        triggerFeatureUnlock: 'battleFront',
        jumpToView: 'battle'
      }
    ]
  };

  // =========================================================================
  // 5. HELPER UTILITIES & SOUND/SCREEN FEEDBACK
  // =========================================================================
  function showToast(msg, isGold = false) {
    const existing = document.querySelector('.resource-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'resource-toast';
    toast.innerHTML = `<span>${isGold ? '🪙' : '📜'}</span><span>${msg}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  function triggerShake() {
    document.body.classList.remove('shake-screen');
    void document.body.offsetWidth;
    document.body.classList.add('shake-screen');
    setTimeout(() => document.body.classList.remove('shake-screen'), 450);
  }

  function triggerLightning() {
    if (!ui.lightningFlash) return;
    ui.lightningFlash.classList.add('flash-active');
    setTimeout(() => ui.lightningFlash.classList.remove('flash-active'), 400);
  }

  // =========================================================================
  // 6. PROGRESSION MATRIX & LOCK ENGINE
  // =========================================================================
  function updateProgressTrackerUI() {
    const currentChapter = chapterMatrix.find(c => c.id === state.currentChapterId) || chapterMatrix[0];
    ui.hudChapterBadge.textContent = currentChapter.badge;
    ui.hudChapterTitle.textContent = currentChapter.title;

    const progressPct = (chapterMatrix.indexOf(currentChapter) + 1) / chapterMatrix.length * 100;
    ui.hudChFill.style.width = `${progressPct}%`;
    ui.hudTicketCount.textContent = state.ticketCount;
    ui.gachaTicketDisplay.textContent = state.ticketCount;

    // Feature lock representations
    // 1. Soap button
    if (state.unlocked.soap) {
      ui.btnActionSoap.classList.remove('locked-feature');
      const lockBadge = document.getElementById('soap-lock-badge');
      if (lockBadge) lockBadge.remove();
    } else {
      ui.btnActionSoap.classList.add('locked-feature');
    }

    // 2. Map Tab
    if (state.unlocked.strategyMap) {
      ui.btnTabMap.classList.remove('locked-tab');
      ui.tabMapLock.style.display = 'none';
    } else {
      ui.btnTabMap.classList.add('locked-tab');
      ui.tabMapLock.style.display = 'inline-block';
    }

    // 3. Battle Tab
    if (state.unlocked.battleFront) {
      ui.btnTabBattle.classList.remove('locked-tab');
      ui.tabBattleLock.style.display = 'none';
    } else {
      ui.btnTabBattle.classList.add('locked-tab');
      ui.tabBattleLock.style.display = 'inline-block';
    }

    // 4. Hero Quick Access on HUD
    if (state.unlocked.zhaoyun) {
      ui.btnHudHero.classList.remove('hidden');
    } else {
      ui.btnHudHero.classList.add('hidden');
    }

    // 5. Flood Tactic Card lock
    const cardFlood = document.getElementById('card-flood');
    if (cardFlood) {
      if (state.unlocked.giaHu) {
        cardFlood.classList.remove('locked-feature');
        cardFlood.title = "Siêu thẻ Giả Hủ: Cần Trữ Nước Cấp 2+";
      } else {
        cardFlood.classList.add('locked-feature');
        cardFlood.title = "🔒 Khóa: Cần hoàn thành Chương 27 (Triệu hoán Giả Hủ)";
      }
    }
  }

  function advanceChapter(chapterId) {
    state.currentChapterId = chapterId;
    chapterMatrix.forEach(c => {
      if (c.id <= chapterId) c.unlocked = true;
      c.active = (c.id === chapterId);
    });
    updateProgressTrackerUI();
    renderMilestoneTimeline();
  }

  function triggerUnlockNotification(featureKey) {
    state.unlocked[featureKey] = true;
    updateProgressTrackerUI();

    const unlockDetails = {
      soap: {
        icon: "🧼",
        title: "MỞ KHÓA KINH DOANH!",
        name: "XÀ PHÒNG THẤU HOA CAO (CHƯƠNG 8)",
        lore: "Quý Bình An bắt tay cùng Lâu chủ Vệ Ti Vũ (Thiên Kim Lâu) phân phối xà phòng thơm độc quyền.",
        effect: "⚡ Tác dụng: Cho phép thực hiện lệnh 'Mở Rộng Xưởng' thu hoạch +3.000 Vàng mỗi đợt!"
      },
      strategyMap: {
        icon: "🗺️",
        title: "MỞ KHÓA TẦNG 2 ĐẾ NGHIỆP!",
        name: "ĐẾ NGHIỆP SA BÀN & LỆNH AP (CHƯƠNG 15)",
        lore: "Vũ Hoàng sắc phong Chinh Bắc Đại Tướng Quân, ban cờ lệnh điều động binh mã 4 phương.",
        effect: "⚡ Tác dụng: Khai thông giao diện Sa Bàn Quân Sự và tiêu hao Điểm Hành Động (AP)!"
      },
      giaHu: {
        icon: "🌊",
        title: "MỞ KHÓA MƯU THẦN TAM QUỐC!",
        name: "ĐỘC SĨ GIẢ HỦ & THỦY CÔNG (CHƯƠNG 27)",
        lore: "Hố 20 vạn lượng vàng từ triều đình, thu phục mưu sĩ Giả Hủ phụ trách thủy kế sông Thanh Thủy.",
        effect: "⚡ Tác dụng: Mở khóa siêu thẻ bài huyền thoại 'XẢ LŨ THANH THỦY' trong Sa Trường!"
      },
      khaiNguyen: {
        icon: "🌾",
        title: "MỞ KHÓA HẬU CẦN QUÂN LƯƠNG!",
        name: "CĂN CỨ KHO LƯƠNG KHAI NGUYÊN (CHƯƠNG 43)",
        lore: "Triệt phá Huyện lệnh tham ô Lưu Nguyên, thâu tóm toàn bộ kho quân lương 50.000 thạch.",
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

    const info = unlockDetails[featureKey];
    if (!info) return;

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
      item.innerHTML = `
        <div class="ms-badge">${c.badge}</div>
        <div class="ms-body">
          <div class="ms-title">${c.title}</div>
          <div class="ms-feature-tag">🎁 ${c.featureUnlocked}</div>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${c.lore}</p>
        </div>
        <div class="ms-status-label">${c.unlocked ? 'ĐÃ MỞ KHÓA' : 'KHÓA 🔒'}</div>
      `;
      ui.matrixTimelineList.appendChild(item);
    });
  }

  // =========================================================================
  // 7. GACHA SUMMONING ENGINE (BÁI TƯỚNG ĐÀI)
  // =========================================================================
  function openGachaModal() {
    ui.gachaModal.classList.remove('hidden');
    ui.altarBtnRow.classList.remove('hidden');
    ui.revealActionRow.classList.add('hidden');
    ui.gachaCardReveal.classList.add('hidden');
    ui.cardFlipper.classList.remove('flipped');
    ui.summonTalisman.classList.remove('hidden');
    ui.gachaTicketDisplay.textContent = state.ticketCount;
  }

  function performSummon() {
    if (state.ticketCount < 1) {
      showToast("⚠️ Không có Anh Hồn Lệnh! Hãy thu thập thêm từ nhiệm vụ chính tuyến.");
      return;
    }

    state.ticketCount -= 1;
    ui.hudTicketCount.textContent = state.ticketCount;
    ui.gachaTicketDisplay.textContent = state.ticketCount;

    // Trigger Summon Animation Sequence
    triggerShake();
    triggerLightning();
    ui.summonTalisman.classList.add('active-pulse');
    ui.baguaRing.style.animationDuration = '2s';

    setTimeout(() => {
      ui.summonTalisman.classList.add('hidden');
      ui.gachaCardReveal.classList.remove('hidden');

      // Card Flip 3D
      setTimeout(() => {
        ui.cardFlipper.classList.add('flipped');
        triggerShake();
        showToast("🌟 TRIỆU HOÁN THÀNH CÔNG: SSR THƯỜNG SƠN TRIỆU TỬ LONG!", true);

        // State update
        state.unlocked.zhaoyun = true;
        if (ui.actorRightImg) ui.actorRightImg.classList.remove('hidden');
        if (ui.actorRightAvatar) ui.actorRightAvatar.classList.add('hidden');
        if (ui.actorRightNametag) ui.actorRightNametag.textContent = 'Triệu Tử Long';
        updateProgressTrackerUI();

        // Show result action buttons
        ui.altarBtnRow.classList.add('hidden');
        ui.revealActionRow.classList.remove('hidden');
      }, 700);
    }, 1200);
  }

  function openHeroInspector() {
    ui.heroDetailModal.classList.remove('hidden');
  }

  // =========================================================================
  // 8. VISUAL NOVEL THEATER (TẦNG 1)
  // =========================================================================
  let typewriterTimer = null;

  function renderCurrentDialogue() {
    const branch = dialogueBranches[state.vnBranch] || dialogueBranches.scene1_poem;
    if (state.vnIndex >= branch.length) return;

    const item = branch[state.vnIndex];

    // Record into Backlog
    if (!state.dialogueHistory.some(h => h.text === item.text)) {
      state.dialogueHistory.push({
        speaker: item.speaker,
        title: item.title,
        text: item.text
      });
      renderBacklog();
    }

    // Update Speaker Display
    ui.vnSpeaker.textContent = item.speaker;
    ui.vnSpeakerSub.textContent = item.title;

    // Visual/Haptic FX
    if (item.flash) triggerLightning();
    if (item.shake) triggerShake();

    // Resource Changes
    if (item.goldChange) {
      state.gold += item.goldChange;
      showToast(`+${item.goldChange} Lượng Vàng Ban Thưởng!`, true);
    }
    if (item.foodChange) {
      state.food += item.foodChange;
      showToast(`+${item.foodChange.toLocaleString('vi-VN')} Thạch Lương Tịch Thu!`);
    }
    if (item.suspicionChange) {
      state.suspicion = Math.max(0, Math.min(100, state.suspicion + item.suspicionChange));
      showToast(`${item.suspicionChange > 0 ? '+' : ''}${item.suspicionChange}% Nghi Kỵ`);
    }
    updateHudResources();

    // Actor slot lighting
    if (item.side === 'left') {
      ui.actorLeftSlot.classList.add('active');
      ui.actorRightSlot.classList.remove('active');
      if (item.actorName) ui.actorLeftNametag.textContent = item.actorName;
      if (item.actorText) ui.actorLeftAvatar.textContent = item.actorText;
    } else if (item.side === 'right') {
      ui.actorRightSlot.classList.add('active');
      ui.actorLeftSlot.classList.remove('active');
      if (item.actorName) ui.actorRightNametag.textContent = item.actorName;
      if (item.actorImg) ui.actorRightImg.src = item.actorImg;
    } else {
      ui.actorLeftSlot.classList.remove('active');
      ui.actorRightSlot.classList.remove('active');
    }

    // Typewriter
    clearInterval(typewriterTimer);
    ui.vnDialogueText.textContent = '';
    state.isTyping = true;
    let charIdx = 0;
    const fullText = item.text;

    typewriterTimer = setInterval(() => {
      if (charIdx < fullText.length) {
        ui.vnDialogueText.textContent += fullText[charIdx];
        charIdx++;
      } else {
        clearInterval(typewriterTimer);
        state.isTyping = false;
        checkSpecialTriggers(item);
      }
    }, 16);
  }

  function advanceDialogue() {
    const branch = dialogueBranches[state.vnBranch] || dialogueBranches.scene1_poem;
    const item = branch[state.vnIndex];

    // If typing, finish immediately
    if (state.isTyping && item) {
      clearInterval(typewriterTimer);
      ui.vnDialogueText.textContent = item.text;
      state.isTyping = false;
      checkSpecialTriggers(item);
      return;
    }

    if (!ui.choiceModal.classList.contains('hidden')) return;

    if (item && item.jumpToView) {
      switchView(item.jumpToView);
      return;
    }

    if (state.vnIndex < branch.length - 1) {
      state.vnIndex++;
      renderCurrentDialogue();
    } else {
      // Reached branch end -> transition sequentially
      handleBranchTransition();
    }
  }

  function checkSpecialTriggers(item) {
    if (item.triggerChapterAdvance) {
      advanceChapter(item.triggerChapterAdvance);
    }
    if (item.triggerFeatureUnlock) {
      triggerUnlockNotification(item.triggerFeatureUnlock);
    }
    if (item.triggerGachaModal) {
      setTimeout(() => openGachaModal(), 500);
    }
    if (item.choices && item.choices.length > 0) {
      ui.choiceQuestion.textContent = item.choicePrompt || "Quý Bình An quyết định ứng phó ra sao?";
      ui.choiceGrid.innerHTML = '';

      item.choices.forEach(c => {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'choice-card-btn';
        choiceCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="choice-card-title">${c.title}</span>
            <span style="font-size: 10px; font-weight: 800; background: rgba(220, 38, 38, 0.3); border: 1px solid #dc2626; color: #fca5a5; padding: 2px 8px; border-radius: 4px;">${c.badge}</span>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin: 4px 0;">${c.desc}</p>
          <div class="choice-card-consequence">⚡ ${c.effect}</div>
        `;
        choiceCard.addEventListener('click', () => {
          triggerShake();
          ui.choiceModal.classList.add('hidden');
          state.vnBranch = c.targetBranch;
          state.vnIndex = 0;
          ui.vnBranchIndicator.textContent = `Tuyến Rẽ: ${c.title}`;
          showToast(`Đã chọn: ${c.title}`);
          renderCurrentDialogue();
        });
        ui.choiceGrid.appendChild(choiceCard);
      });

      ui.choiceModal.classList.remove('hidden');
    }
  }

  function handleBranchTransition() {
    if (state.vnBranch === 'scene1_win') {
      state.vnBranch = 'scene5_summon';
      state.vnIndex = 0;
      renderCurrentDialogue();
    } else if (state.vnBranch === 'scene5_summon') {
      state.vnBranch = 'scene8_soap';
      state.vnIndex = 0;
      renderCurrentDialogue();
    } else if (state.vnBranch === 'scene8_soap') {
      state.vnBranch = 'scene10_assassin';
      state.vnIndex = 0;
      renderCurrentDialogue();
    } else if (state.vnBranch === 'scene15_march') {
      state.vnBranch = 'scene27_giahu';
      state.vnIndex = 0;
      renderCurrentDialogue();
    } else if (state.vnBranch === 'scene27_giahu') {
      state.vnBranch = 'scene43_khainguyen';
      state.vnIndex = 0;
      renderCurrentDialogue();
    } else if (state.vnBranch === 'scene43_khainguyen') {
      state.vnBranch = 'scene52_battle';
      state.vnIndex = 0;
      renderCurrentDialogue();
    }
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
          ${d.speaker} <span style="color: var(--text-muted); font-size: 10px; font-weight: 400;">(${d.title})</span>
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
      badge: "ĐẾ ĐÔ HOÀNG TRIỀU",
      name: "ĐẾ ĐÔ ĐẠI VŨ",
      threat: "Bình yên · Phò Mã Phủ tọa lạc",
      desc: "Trung tâm chính trị Đại Vũ. Giữ chỉ số Nghi Kỵ thấp để tránh bị hoàng đế tru di.",
      garrison: "500 Cấm Vệ Hộ Phủ",
      food: "5.000 Thạch",
      dist: "Bản Doanh (0 Ngày)",
      intel: "Cẩm Y Vệ giám sát",
      activeRoute: "rt-dedo-kh"
    },
    khainguyen: {
      badge: "VỰA LƯƠNG HẬU CẦN",
      name: "HUYỆN KHAI NGUYÊN",
      threat: "Ổn định · Huyết mạch tiếp tế",
      desc: "Kho lương 50.000 thạch vừa tước đoạt từ tay Lưu Nguyên cứu tế ba quân.",
      garrison: "1.000 Dân Binh",
      food: "50.000 Thạch Lương",
      dist: "2 Ngày Đường (từ Đế Đô)",
      intel: "Bách tính lập đền thờ sống",
      activeRoute: "rt-kh-tc"
    },
    thanhchau: {
      badge: "CỬA NGÕ BIÊN THÙY",
      name: "THÀNH THANH CHÂU",
      threat: "⚠️ Nguy Cấp: Địch Hỏa 20.000 quân bao vây!",
      desc: "Cửa ải yết hầu che chở 3 châu Bắc Cảnh. Tường thành 500 HP và đập nước Thanh Thủy thượng nguồn.",
      garrison: "Triệu Vân + 1.000 Hổ Bí Quân",
      food: "15.000 Thạch",
      dist: "3 Ngày Đường",
      intel: "Đã cài gian tế Hồng Nhan",
      activeRoute: "rt-tc-lc"
    },
    lieuchau: {
      badge: "HẬU PHƯƠNG KINH TẾ",
      name: "THÀNH LIỄU CHÂU",
      threat: "An toàn · Lò rèn giáp sắt",
      desc: "Thành trì phồn hoa nhất phương Bắc, nơi chế tạo xà phòng Thấu Hoa Cao chi nhánh 2.",
      garrison: "2.000 Thiết Giáp",
      food: "40.000 Thạch",
      dist: "2 Ngày Đường",
      intel: "Thương nhân tấp nập",
      activeRoute: "rt-tc-lc"
    },
    baccoson: {
      badge: "HẺM NÚI TỬ HUYỆT",
      name: "HIỂM ĐỊA BẮC CÔ SƠN",
      threat: "Hiểm trở · Rừng phong dễ cháy",
      desc: "Địa thế lòng chảo gió hút mạnh, nơi Giả Hủ vạch đại kế hỏa công mai phục.",
      garrison: "Chưa Đồn Trú",
      food: "0 Thạch",
      dist: "4 Ngày Đường",
      intel: "Thích hợp hỏa công",
      activeRoute: "rt-tc-bcs"
    }
  };

  function renderMapNodeDetails(nodeKey) {
    const data = provinceData[nodeKey];
    if (!data) return;

    state.selectedNode = nodeKey;
    ui.provinceNodes.forEach(node => {
      node.classList.toggle('active-node', node.dataset.node === nodeKey);
    });

    document.querySelectorAll('.route-line').forEach(line => line.classList.remove('active-route'));
    if (data.activeRoute) {
      const activeLine = document.getElementById(data.activeRoute);
      if (activeLine) activeLine.classList.add('active-route');
    }

    ui.panelCityBadge.textContent = data.badge;
    ui.panelCityName.textContent = data.name;
    ui.panelCityThreat.textContent = data.threat;
    ui.panelCityDesc.textContent = data.desc;
    ui.panelGarrison.textContent = data.garrison;
    ui.panelFood.textContent = data.food;
    ui.panelDist.textContent = data.dist;
    ui.panelIntel.textContent = data.intel;

    ui.btnActionBattle.style.display = (nodeKey === 'thanhchau') ? 'flex' : 'none';
  }

  function handleSoapCommand() {
    if (!state.unlocked.soap) {
      showToast("🔒 Tính năng Kinh Doanh Xà Phòng bị khóa! Cần phát minh Thấu Hoa Cao ở Chương 8.");
      return;
    }
    if (state.ap < 1) {
      showToast("⚠️ Không đủ Điểm Hành Động (AP) tháng này!");
      return;
    }
    state.ap -= 1;
    state.gold += 3000;
    updateHudResources();
    showToast("🧼 Mở rộng xưởng Thấu Hoa Cao thành công! Thu về +3.000 Vàng.", true);
  }

  function handleBribeCommand() {
    if (state.gold < 1500) {
      showToast("⚠️ Không đủ 1.500 Vàng để cống nạp hoạn quan!");
      return;
    }
    state.gold -= 1500;
    state.suspicion = Math.max(0, state.suspicion - 15);
    updateHudResources();
    showToast("🏛️ Đã cống nạp hoạn quan! Nghi Kỵ Vũ Hoàng giảm -15%.");
  }

  // =========================================================================
  // 10. TACTICAL CARD BATTLER (TẦNG 3)
  // =========================================================================
  function renderBattlefield() {
    ui.wallHpVal.textContent = state.wallHp;
    ui.wallHpBar.style.width = `${Math.max(0, (state.wallHp / state.maxWallHp) * 100)}%`;

    const stageWidths = [33, 66, 100];
    ui.reservoirFill.style.width = `${stageWidths[state.reservoirStage - 1]}%`;
    ui.stageDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx < state.reservoirStage);
    });

    ui.bossHpVal.textContent = state.bossHp;
    ui.bossHpBar.style.width = `${Math.max(0, (state.bossHp / state.maxBossHp) * 100)}%`;
    ui.enemyMoraleVal.textContent = `${state.enemyMorale}%`;
    ui.playerMoraleBar.style.width = `${state.playerMorale}%`;

    if (state.bossIntent.interrupted) {
      ui.bossIntentDisplay.innerHTML = `<span class="intent-icon">🚫</span><span class="intent-text" style="color: #60a5fa;">Ý Đồ ĐÃ BỊ TRIỆU VÂN NGẮT HOÀN TOÀN!</span>`;
    } else {
      ui.bossIntentDisplay.innerHTML = `<span class="intent-icon">💥</span><span class="intent-text">${state.bossIntent.desc}</span>`;
    }

    ui.txtMana.textContent = `${state.mana} / ${state.maxMana}`;
    ui.manaGemTrack.innerHTML = '';
    for (let i = 0; i < state.maxMana; i++) {
      const gem = document.createElement('div');
      gem.className = `mana-gem ${i < state.mana ? '' : 'spent'}`;
      ui.manaGemTrack.appendChild(gem);
    }

    renderEnemyLanes();
    renderPlayerLanes();
  }

  function renderEnemyLanes() {
    if (state.lanes.left.enemy && state.lanes.left.enemy.alive) {
      ui.hpEnemyLeft.textContent = `🛡 ${state.lanes.left.enemy.hp}`;
    } else if (ui.cardEnemyLeft) {
      ui.cardEnemyLeft.style.opacity = '0.3';
      ui.hpEnemyLeft.textContent = 'TỬ TRẬN';
    }

    if (state.lanes.center.enemy && state.lanes.center.enemy.alive) {
      ui.hpEnemyCenter.textContent = `🛡 ${state.lanes.center.enemy.hp}`;
    } else if (ui.cardEnemyCenter) {
      ui.cardEnemyCenter.style.opacity = '0.3';
      ui.hpEnemyCenter.textContent = 'BỊ ĐÁNH NÁT';
    }

    if (state.lanes.right.enemy && state.lanes.right.enemy.alive) {
      ui.hpEnemyRight.textContent = `🛡 ${state.lanes.right.enemy.hp}`;
    } else if (ui.cardEnemyRight) {
      ui.cardEnemyRight.style.opacity = '0.3';
      ui.hpEnemyRight.textContent = 'TỬ TRẬN';
    }
  }

  function renderPlayerLanes() {
    if (state.lanes.center.player) {
      ui.hpZhaoYun.textContent = `🛡 ${state.lanes.center.player.hp}`;
    }

    if (state.lanes.left.player) {
      ui.playerZoneLeft.innerHTML = `
        <div class="card-unit player-deployed" style="border-color: #34d399;">
          <div class="unit-type-tag" style="color: #34d399;">Bộ Binh Thân Vệ</div>
          <div class="unit-name">${state.lanes.left.player.name}</div>
          <div class="unit-bars">
            <div class="stat-pill atk">⚔ ${state.lanes.left.player.atk}</div>
            <div class="stat-pill hp">🛡 ${state.lanes.left.player.hp}</div>
          </div>
        </div>
      `;
    } else {
      ui.playerZoneLeft.innerHTML = `<div class="deploy-placeholder"><span>Trống (Thả thẻ lính vào đây)</span></div>`;
    }

    if (state.lanes.right.player) {
      ui.playerZoneRight.innerHTML = `
        <div class="card-unit player-deployed" style="border-color: #38bdf8;">
          <div class="unit-type-tag" style="color: #38bdf8;">Kỵ Binh Tiên Phong</div>
          <div class="unit-name">${state.lanes.right.player.name}</div>
          <div class="unit-bars">
            <div class="stat-pill atk">⚔ ${state.lanes.right.player.atk}</div>
            <div class="stat-pill hp">🛡 ${state.lanes.right.player.hp}</div>
          </div>
        </div>
      `;
    } else {
      ui.playerZoneRight.innerHTML = `<div class="deploy-placeholder"><span>Trống (Thả thẻ lính vào đây)</span></div>`;
    }
  }

  function spawnDamage(parentEl, amount, isCrit = false) {
    if (!parentEl) return;
    const dmg = document.createElement('div');
    dmg.className = `floating-damage ${isCrit ? 'crit' : ''}`;
    dmg.textContent = `-${amount}`;
    const rect = parentEl.getBoundingClientRect();
    dmg.style.left = `${rect.left + rect.width / 2 - 20}px`;
    dmg.style.top = `${rect.top + 10}px`;
    document.body.appendChild(dmg);
    setTimeout(() => dmg.remove(), 1100);
  }

  function playCard(cardKey) {
    const cardData = state.hand.find(c => c.id === cardKey);
    if (!cardData) return;

    if (state.mana < cardData.cost) {
      showToast(`⚠️ Không đủ Quân Khí (Cần ${cardData.cost} Mana)!`);
      return;
    }

    if (cardKey === 'flood') {
      if (!state.unlocked.giaHu) {
        showToast("🔒 Siêu Thẻ Xả Lũ bị phong ấn! Cần chiêu mộ Độc Sĩ Giả Hủ ở Chương 27.");
        return;
      }
      if (state.reservoirStage < 2) {
        showToast("⚠️ Trữ lượng nước chưa đạt Cấp 2! Cần chờ thêm hiệp tích nước.");
        return;
      }

      state.mana -= cardData.cost;
      triggerShake();
      triggerLightning();
      showToast("🌊 ĐẠI HỒNG THỦY THANH THỦY TRÚT XUỐNG CHIẾN TRƯỜNG!", true);

      if (state.lanes.center.enemy) {
        spawnDamage(ui.cardEnemyCenter, 150, true);
        state.lanes.center.enemy.hp = 0;
        state.lanes.center.enemy.alive = false;
      }
      if (state.lanes.left.enemy) {
        spawnDamage(ui.cardEnemyLeft, 130);
        state.lanes.left.enemy.hp = Math.max(0, state.lanes.left.enemy.hp - 130);
        if (state.lanes.left.enemy.hp === 0) state.lanes.left.enemy.alive = false;
      }
      if (state.lanes.right.enemy) {
        spawnDamage(ui.cardEnemyRight, 130);
        state.lanes.right.enemy.hp = Math.max(0, state.lanes.right.enemy.hp - 130);
        if (state.lanes.right.enemy.hp === 0) state.lanes.right.enemy.alive = false;
      }

      spawnDamage(ui.bossHpBar, 80, true);
      state.bossHp = Math.max(0, state.bossHp - 80);
      state.enemyMorale = Math.max(0, state.enemyMorale - 35);
      state.reservoirStage = 1;

      renderBattlefield();
      checkVictoryDefeat();
      return;
    }

    if (cardKey === 'seventh-spear') {
      state.mana -= cardData.cost;
      triggerShake();
      showToast("⚡ Triệu Vân thi triển Thất Thám Bàn Xà! Ngắt Ý Đồ Boss!", true);

      spawnDamage(ui.bossHpBar, 120, true);
      state.bossHp = Math.max(0, state.bossHp - 120);
      state.bossIntent.interrupted = true;
      state.enemyMorale = Math.max(0, state.enemyMorale - 25);

      renderBattlefield();
      checkVictoryDefeat();
      return;
    }

    if (cardKey === 'hamtran') {
      if (!state.lanes.left.player) {
        state.mana -= cardData.cost;
        state.lanes.left.player = { id: 'hamtran', name: 'Hãm Trận Doanh', hp: 140, atk: 65 };
        showToast("🛡️ Đã bố trí Hãm Trận Doanh vào Tả Dực!");
        renderBattlefield();
      } else {
        showToast("⚠️ Tả Dực đã có quân phòng ngự!");
      }
      return;
    }

    if (cardKey === 'bachma') {
      if (!state.lanes.right.player) {
        state.mana -= cardData.cost;
        state.lanes.right.player = { id: 'bachma', name: 'Bạch Mã Nghĩa Tòng', hp: 110, atk: 80 };
        showToast("🐎 Đã bố trí Bạch Mã Nghĩa Tòng vào Hữu Dực!");
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
    if (state.bossHp <= 0 || state.enemyMorale <= 0) {
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
    ui.txtAp.textContent = `${state.ap} / ${state.maxAp}`;
  }

  // =========================================================================
  // 12. EVENT LISTENERS INITIALIZATION
  // =========================================================================
  function initEvents() {
    // Nav Tabs
    ui.btnTabVn.addEventListener('click', () => switchView('vn'));
    ui.btnTabMap.addEventListener('click', () => switchView('map'));
    ui.btnTabBattle.addEventListener('click', () => switchView('battle'));

    // Chapter Milestone Tracker Modal
    ui.btnOpenMilestones.addEventListener('click', () => {
      renderMilestoneTimeline();
      ui.milestoneMatrixModal.classList.remove('hidden');
    });
    ui.btnCloseMatrix.addEventListener('click', () => {
      ui.milestoneMatrixModal.classList.add('hidden');
    });

    // Gacha Altar Controls
    ui.btnHudGacha.addEventListener('click', openGachaModal);
    ui.btnCloseGacha.addEventListener('click', () => {
      ui.gachaModal.classList.add('hidden');
    });
    ui.btnDoSummon.addEventListener('click', performSummon);
    ui.btnRevealInspect.addEventListener('click', openHeroInspector);
    ui.btnRevealConfirm.addEventListener('click', () => {
      ui.gachaModal.classList.add('hidden');
      showToast("⚔️ Đã gia nhập đội ngũ! Triệu Tử Long đã sẵn sàng phò tá Chúa Công.");
    });

    // Hero Detail Inspector
    ui.btnHudHero.addEventListener('click', openHeroInspector);
    ui.btnCloseHeroDetail.addEventListener('click', () => {
      ui.heroDetailModal.classList.add('hidden');
    });

    // Unlock Event Notification Modal
    ui.btnCloseUnlock.addEventListener('click', () => {
      ui.unlockEventModal.classList.add('hidden');
    });

    // VN Dialogue Controls
    ui.btnVnAdvance.addEventListener('click', advanceDialogue);
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && state.currentView === 'vn') {
        e.preventDefault();
        advanceDialogue();
      }
    });

    ui.btnVnLog.addEventListener('click', () => {
      ui.backlogDrawer.classList.toggle('hidden');
    });
    ui.btnCloseLog.addEventListener('click', () => {
      ui.backlogDrawer.classList.add('hidden');
    });

    ui.btnVnAuto.addEventListener('click', () => {
      state.autoAdvance = !state.autoAdvance;
      ui.btnVnAuto.style.color = state.autoAdvance ? 'var(--gold-primary)' : 'var(--text-muted)';
      if (state.autoAdvance) {
        showToast("▶ Chế độ tự động đọc: BẬT");
        state.autoTimer = setInterval(() => {
          if (state.currentView === 'vn' && ui.choiceModal.classList.contains('hidden')) {
            advanceDialogue();
          }
        }, 3200);
      } else {
        showToast("⏹ Chế độ tự động đọc: TẮT");
        clearInterval(state.autoTimer);
      }
    });

    // Sa Bàn Map Controls
    ui.provinceNodes.forEach(node => {
      node.addEventListener('click', () => {
        renderMapNodeDetails(node.dataset.node);
      });
    });

    ui.btnActionSoap.addEventListener('click', handleSoapCommand);
    ui.btnActionTribute.addEventListener('click', handleBribeCommand);
    ui.btnActionBattle.addEventListener('click', () => switchView('battle'));
    ui.btnIntercept.addEventListener('click', () => switchView('battle'));

    // Battle Card Deck
    document.querySelectorAll('.hand-card').forEach(card => {
      card.addEventListener('click', () => {
        playCard(card.dataset.card);
      });
    });

    ui.btnExecuteTurn.addEventListener('click', executeTurn);

    // Victory Next
    ui.btnTriumphNext.addEventListener('click', () => {
      ui.victoryModal.classList.add('hidden');
      state.gold += 20000;
      state.food += 50000;
      updateHudResources();
      showToast("🎉 Đại thắng! Đã nhận 20.000 Vàng & 50.000 Thạch Lương.", true);
      switchView('vn');
    });
  }

  // Initial Boot
  advanceChapter(1);
  updateProgressTrackerUI();
  updateHudResources();
  initEvents();
  renderCurrentDialogue();
});
