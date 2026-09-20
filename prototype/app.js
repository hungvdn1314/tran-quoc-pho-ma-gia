/**
 * TRẤN QUỐC PHÒ MÃ GIA — ADVANCED GAME CLIENT & ENGINE
 * Complete 3-Tier Integrated Architecture:
 * 1. Visual Novel (Dual-Actor Stage, Consequential Branching, Typewriter, Backlog)
 * 2. Grand Strategy Sa Bàn (Geographic 4-Zone Map, Tactical Intel, Economy & AP)
 * 3. Tactical Card Battler (Enemy Intent System, Fortress Wall 500 HP, Giả Hủ Flood Reservoir, 3-Lane Clash)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. GAME STATE MASTER
  // =========================================================================
  const state = {
    currentView: 'vn', // 'vn' | 'map' | 'battle'

    // Top Imperial HUD Resources
    suspicion: 15,       // Emperor's Suspicion (0 - 100%)
    gold: 10500,         // Gold reserves
    food: 50000,         // Food (Thạch)
    ap: 3,               // Action Points (Sa Bàn Lệnh)
    maxAp: 3,

    // Visual Novel State
    vnBranch: 'intro',   // 'intro' | 'branch_imperial' | 'branch_secret' | 'branch_torture'
    vnIndex: 0,
    isTyping: false,
    autoAdvance: false,
    autoTimer: null,
    dialogueHistory: [], // Backlog array of {speaker, title, text}

    // Sa Bàn Map State
    selectedNode: 'thanhchau',
    marchTarget: null,
    invasionCountdown: 3, // Turns until breach

    // Battle Arena State
    turn: 1,
    mana: 6,
    maxMana: 10,
    playerMorale: 100,
    enemyMorale: 100,

    wallHp: 500,
    maxWallHp: 500,

    reservoirStage: 1, // 1: Đắp Đê, 2: Nước Dâng, 3: Đại Hồng Thủy
    reservoirCharges: 1,

    bossHp: 250,
    maxBossHp: 250,
    bossIntent: {
      name: "Bạo Liệt Đao Pháp",
      damage: 90,
      target: "wall",
      interrupted: false,
      desc: "Ý Đồ: Chuẩn bị phát động Bạo Liệt Đao Pháp (Gây 90 HP Tường Thành)"
    },

    // Lane Units State
    lanes: {
      left: {
        enemy: { id: 'left-archer', name: 'Hỏa Tiễn Doanh', hp: 100, maxHp: 100, atk: 35, intent: 'Bắn Cung: 35 Sát thương', alive: true },
        player: null
      },
      center: {
        enemy: { id: 'center-siege', name: 'Xe Đục Thành Nam Ly', hp: 150, maxHp: 150, atk: 80, intent: 'Công Thành: 80 sát thương Tường', alive: true, isSiege: true },
        player: { id: 'zhaoyun', name: 'Triệu Tử Long', hp: 180, maxHp: 180, atk: 102, alive: true }
      },
      right: {
        enemy: { id: 'right-cavalry', name: 'Kỵ Binh Khởi Đột', hp: 120, maxHp: 120, atk: 45, intent: 'Đột Kích: 45 Sát thương', alive: true },
        player: null
      }
    },

    hand: [
      { id: 'hamtran', name: 'Hãm Trận Doanh', cost: 3, hp: 140, atk: 65, type: 'infantry', desc: 'Trọng giáp tinh luyện. Giảm 50% sát thương từ cung tiễn.' },
      { id: 'bachma', name: 'Bạch Mã Nghĩa Tòng', cost: 4, hp: 110, atk: 80, type: 'cavalry', desc: 'Xung kích thần tốc. Tấn công trực tiếp cung thủ.' },
      { id: 'flood', name: 'XẢ LŨ THANH THỦY', cost: 5, type: 'tactic', reqStage: 2, desc: 'Phá đê trút lũ! Quét sạch khí giới và gây 130 AoE.' },
      { id: 'seventh-spear', name: 'Thất Thám Bàn Xà', cost: 2, type: 'skill', desc: 'Đâm liên tiếp 7 thương, gây 120 DMG lên Boss và ngắt Ý Đồ!' }
    ]
  };

  // =========================================================================
  // 2. DOM CACHE
  // =========================================================================
  const ui = {
    // Nav Tabs & Views
    btnTabVn: document.getElementById('btn-tab-vn'),
    btnTabMap: document.getElementById('btn-tab-map'),
    btnTabBattle: document.getElementById('btn-tab-battle'),
    viewVn: document.getElementById('view-vn'),
    viewMap: document.getElementById('view-map'),
    viewBattle: document.getElementById('view-battle'),
    hudActName: document.getElementById('hud-act-name'),

    // Top HUD Monitors
    txtSuspicion: document.getElementById('txt-suspicion'),
    barSuspicion: document.getElementById('bar-suspicion'),
    suspicionDesc: document.getElementById('suspicion-status-desc'),
    txtGold: document.getElementById('txt-gold'),
    txtFood: document.getElementById('txt-food'),
    txtAp: document.getElementById('txt-ap'),

    // Visual Novel
    vnStage: document.getElementById('vn-stage'),
    lightningFlash: document.getElementById('lightning-flash'),
    actorLeftSlot: document.getElementById('actor-left-slot'),
    actorLeftCard: document.getElementById('actor-left-card'),
    actorLeftAvatar: document.getElementById('actor-left-avatar'),
    actorLeftNametag: document.getElementById('actor-left-nametag'),
    actorRightSlot: document.getElementById('actor-right-slot'),
    actorRightCard: document.getElementById('actor-right-card'),
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

    // Sa Bàn Map
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
    txtThreatCountdown: document.getElementById('txt-threat-countdown'),
    mapAlertBadge: document.getElementById('map-alert-badge'),

    // Battle Arena
    wallHpVal: document.getElementById('wall-hp-val'),
    wallHpBar: document.getElementById('wall-hp-bar'),
    reservoirFill: document.getElementById('reservoir-fill'),
    stageDots: [document.getElementById('stage-1'), document.getElementById('stage-2'), document.getElementById('stage-3')],
    bossHpVal: document.getElementById('enemy-hp-val'),
    bossHpBar: document.getElementById('enemy-hp-bar'),
    enemyMoraleVal: document.getElementById('enemy-morale-val'),
    bossIntentDisplay: document.getElementById('boss-intent-display'),

    // Lanes
    laneLeft: document.getElementById('lane-left'),
    laneCenter: document.getElementById('lane-center'),
    laneRight: document.getElementById('lane-right'),
    cardEnemyLeft: document.getElementById('card-enemy-left'),
    cardEnemyCenter: document.getElementById('card-enemy-center'),
    cardEnemyRight: document.getElementById('card-enemy-right'),
    hpEnemyLeft: document.getElementById('hp-enemy-left'),
    hpEnemyCenter: document.getElementById('hp-enemy-center'),
    hpEnemyRight: document.getElementById('hp-enemy-right'),
    playerZoneLeft: document.getElementById('player-zone-left'),
    playerZoneCenter: document.getElementById('player-zone-center'),
    playerZoneRight: document.getElementById('player-zone-right'),
    hpZhaoYun: document.getElementById('hp-zhaoyun'),

    // Command Dock
    txtMana: document.getElementById('txt-mana'),
    manaGemTrack: document.getElementById('mana-gem-track'),
    playerMoraleBar: document.getElementById('player-morale-bar'),
    handDeck: document.getElementById('hand-deck'),
    btnExecuteTurn: document.getElementById('btn-execute-turn'),

    // Victory Modal
    victoryModal: document.getElementById('victory-modal'),
    btnTriumphNext: document.getElementById('btn-triumph-next'),
  };

  // =========================================================================
  // 3. DIALOGUE SCRIPTS & BRANCHING TREES (TẦNG 1)
  // =========================================================================
  const dialogueBranches = {
    intro: [
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia · Xuyên Không Thức Tỉnh",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg", // Note: player uses iconic hero/protagonist persona
        actorName: "Quý Bình An",
        leftName: "Tô Kiến Phong",
        leftText: "Cấm Vệ Quân Thống Lĩnh",
        text: "Khụ... đầu óc đau như búa bổ... Ta xuyên không rồi? Trở thành tên Phò Mã phế vật vô dụng của Ninh An Công Chúa, bên ngoài thì phong lưu bất tài, bên trong bị Vũ Hoàng nghi kỵ ngấm ngầm muốn trừ khử?!",
      },
      {
        speaker: "Hệ Thống Triệu Hoán",
        title: "Kim Kế Thần Bảng · Thức Tỉnh Thiên Cơ",
        side: "center",
        text: "【Keng! Phát hiện Ký chủ rơi vào tử cục 'Tứ Diện Sở Ca'. Hệ Thống Thần Cấp Triệu Hoán Tam Quốc chính thức thức tỉnh! Ban tặng Gói Quà Khởi Đầu: Triệu hoán Tuyệt Thế Danh Tướng Triệu Tử Long!】",
        flash: true
      },
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng · Hoàng Cảnh Sơ Kỳ",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        leftName: "Sát Thủ Áo Đen",
        leftText: "Thiên Cơ Lâu Tử Sĩ",
        text: "Mạt tướng Thường Sơn Triệu Tử Long! Bái kiến Chúa Công! Nghe lệnh Chúa Công triệu hoán, Long Đảm Ngân Thương sẵn sàng lấy đầu kẻ nghịch tặc!",
        shake: true
      },
      {
        speaker: "Sát Thủ Áo Đen",
        title: "Kẻ Ám Sát Núp Bóng Xà Nhà",
        side: "left",
        actorName: "Sát Thủ Tử Sĩ",
        actorText: "Hắc Y Nhân",
        text: "Cái gì?! Không thể nào... Phò Mã rõ ràng chỉ là tên thư sinh trói gà không chặt, luồng khí tức Thần Tướng này từ đâu xuất hiện... Aaa!",
        shake: true
      },
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Chúa Công, một thương đã đoạn mạng tên thích khách. Nhưng trên người hắn có mật lệnh ấn tín của Thiên Cơ Lâu cùng độc dược Hủ Cốt Tán. Kính xin Chúa Công định đoạt bước tiếp theo!",
        choicePrompt: "Sát thủ đã bị Triệu Vân hạ gục trong mật thất Phò Mã Phủ. Quý Bình An quyết định xử lý ra sao?",
        choices: [
          {
            badge: "MƯU LƯỢC TỐI THƯỢNG",
            title: "Ngụy tạo tai nạn & Bí mật trữ xác",
            desc: "Triệu hoán Mưu sĩ Giả Hủ phụ trách điều tra ngầm. Giữ kín tin tức với triều đình.",
            effect: "Nghi Kỵ -10% · Giả Hủ xuất trận · Mở Mưu Thất",
            targetBranch: "branch_secret"
          },
          {
            badge: "QUANG MINH CHÍNH ĐẠI",
            title: "Áp giải thi thể lên Kim Loan Điện",
            desc: "Đối chất trực tiếp trước mặt Vũ Hoàng và bách quan, ép Thống lĩnh Tô Kiến Phong nhận trách nhiệm!",
            effect: "Nghi Kỵ +20% · Nhận 5.000 Vàng · Vũ Hoàng tứ hôn sắc phong",
            targetBranch: "branch_imperial"
          },
          {
            badge: "HỎA TỐC ĐIỀU TRA",
            title: "Truy xét ngọn nguồn tới Nam Ly",
            desc: "Ra lệnh Triệu Vân dẫn kỵ binh thám thính biên cương Thanh Châu, nơi quân Nam Ly rục rịch tiến đánh.",
            effect: "Mở Sa Bàn Chiến Sự · Khai thông Tuyến Thanh Châu",
            targetBranch: "branch_torture"
          }
        ]
      }
    ],

    branch_secret: [
      {
        speaker: "Giả Hủ (Văn Hòa)",
        title: "Độc Sĩ Đệ Nhất · Tuyệt Đỉnh Mưu Thần",
        side: "left",
        actorName: "Giả Hủ Văn Hòa",
        actorText: "Mưu Sĩ Thần Cấp",
        text: "Chúa Công anh minh! Giấu xác là thượng sách. Nếu mang lên triều, Vũ Hoàng tất sinh lòng đề phòng cao độ. Giả Hủ ta đã điều tra ra: Kẻ đứng sau chính là Tứ Hoàng Tử liên kết với gian tế Nam Ly!",
        suspicionChange: -10,
        goldChange: 2000
      },
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Mưu sĩ nói rất hợp ý mạt tướng! Tiên phong Địch Hỏa của Nam Ly đã dẫn 2 vạn đại quân kéo đến cửa ải Thanh Châu. Chúng ta cần lập tức xuất chinh ứng cứu!",
      },
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Tốt lắm! Tử Long thống lĩnh tiên phong, Văn Hòa phụ trách kế đắp đê sông Thanh Thủy. Chúng ta lập tức chuyển quân đến Sa Bàn Bắc Cảnh!",
        jumpToView: 'map'
      }
    ],

    branch_imperial: [
      {
        speaker: "Vũ Hoàng",
        title: "Đại Vũ Đế Hoàng · Hoàng Quyền Uy Nghi",
        side: "left",
        actorName: "Vũ Hoàng",
        actorText: "Chí Tôn Cửu Ngũ",
        text: "To gan! Giữa ban ngày ban mặt, thích khách lại dám mò vào Phò Mã Phủ ám sát ái tế của Trẫm?! Tô Kiến Phong, Cấm Vệ Quân của ngươi làm ăn như thế nào?!",
        flash: true,
        suspicionChange: 20,
        goldChange: 5000
      },
      {
        speaker: "Tô Kiến Phong",
        title: "Cấm Vệ Quân Thống Lĩnh · Đại Thần Tâm Phúc",
        side: "left",
        actorName: "Tô Kiến Phong",
        actorText: "Tâm phúc Vũ Hoàng",
        text: "Khởi bẩm Bệ Hạ... thần tội đáng muôn chết! Thần lập tức phong tỏa chín cổng thành kinh đô, quyết bắt kẻ đồng mưu!",
        shake: true
      },
      {
        speaker: "Vũ Hoàng",
        title: "Đại Vũ Đế Hoàng",
        side: "left",
        actorName: "Vũ Hoàng",
        actorText: "Chí Tôn Cửu Ngũ",
        text: "Bình An, ngươi không hổ là con cháu Quý gia. Trẫm ban thưởng 5.000 lượng vàng, sắc phong ngươi hiệp trợ đốc chiến biên ải Bắc Cảnh tại Thanh Châu!",
      },
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Tạ ơn Bệ Hạ long ân! Thần nguyện đem hết tài mọn bảo vệ bờ cõi Đại Vũ!",
        jumpToView: 'map'
      }
    ],

    branch_torture: [
      {
        speaker: "Triệu Tử Long",
        title: "Thường Sơn Hổ Tướng",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Triệu Tử Long",
        text: "Chúa Công, bồ câu đưa thư khẩn từ Huyện Khai Nguyên bay tới! Quân Nam Ly đã vượt qua sông Hoài Hà, mục tiêu chính là công phá Thành Thanh Châu để tiến đánh Đế Đô!",
      },
      {
        speaker: "Quý Bình An",
        title: "Phò Mã Gia",
        side: "right",
        actorImg: "assets/images/zhaoyun.jpg",
        actorName: "Quý Bình An",
        text: "Chiến sự khẩn cấp ngàn cân treo sợi tóc. Mở Sa Bàn Quân Sự ngay, điều động binh lực chặn đứng Địch Hỏa!",
        jumpToView: 'map'
      }
    ]
  };

  // =========================================================================
  // 4. STRATEGY MAP PROVINCE DATABASE (TẦNG 2)
  // =========================================================================
  const provinceData = {
    dedo: {
      badge: "ĐẾ ĐÔ HOÀNG TRIỀU",
      name: "ĐẾ ĐÔ ĐẠI VŨ",
      threat: "Bình yên · Nhưng vòng vây chính trị ngột ngạt",
      desc: "Trọng tâm quyền lực tối cao của Đại Vũ quốc. Phò Mã Phủ tọa lạc tại tây thành. Mọi hành tung của Quý gia đều bị mật thám Cẩm Y Vệ và hoạn quan theo dõi gắt gao. Cần giữ chỉ số Nghi Kỵ thấp để tránh bị tru di.",
      garrison: "500 Cấm Vệ Hộ Phủ",
      food: "5.000 Thạch",
      dist: "Bản Doanh (0 Ngày)",
      intel: "Cẩm Y Vệ hoạt động dày đặc",
      activeRoute: "rt-dedo-kh"
    },
    khainguyen: {
      badge: "VỰA LƯƠNG HẬU CẦN",
      name: "HUYỆN KHAI NGUYÊN",
      threat: "Ổn định · Huyết mạch tiếp tế cho quân tuyến đầu",
      desc: "Vùng đất trù phú cách Đế Đô 2 ngày đường. Quý Bình An vừa triệt phá tham quan Huyện lệnh Lưu Nguyên, tịch thu trọn vẹn kho quân lương cứu đói cho dân và lập Điển Nông Doanh.",
      garrison: "1.000 Dân Binh Điển Nông",
      food: "50.000 Thạch Lương Tịch Thu",
      dist: "2 Ngày Đường (từ Đế Đô)",
      intel: "Bách tính dựng sinh từ ca tụng",
      activeRoute: "rt-kh-tc"
    },
    thanhchau: {
      badge: "CỬA NGÕ BIÊN THÙY",
      name: "THÀNH THANH CHÂU",
      threat: "⚠️ Báo Động Cấp 1: Đại quân Địch Hỏa (20.000 Thiết kỵ) bao vây!",
      desc: "Cửa ải yết hầu che chở toàn bộ 3 châu Bắc Cảnh. Có đập nước sông Thanh Thủy ở thượng nguồn do Giả Hủ phụ trách đắp đê ngăn dòng. Tường thành có độ bền 500 HP, kết hợp địa thế hiểm yếu Cao Lâm Hạ.",
      garrison: "Triệu Vân + 1.000 Hổ Bí Quân",
      food: "15.000 Thạch Lương Thủ Thành",
      dist: "3 Ngày Đường (từ Khai Nguyên)",
      intel: "Đã cài gian tế Hồng Nhan trong doanh địch",
      activeRoute: "rt-tc-lc"
    },
    lieuchau: {
      badge: "HẬU PHƯƠNG KINH TẾ",
      name: "THÀNH LIỄU CHÂU",
      threat: "An toàn · Trung tâm rèn đúc và chế tác",
      desc: "Thành trì phồn hoa nhất phương Bắc. Nơi đóng các xưởng sản xuất xà phòng 'Thấu Hoa Cao' mang lại lợi nhuận hoàng kim hàng vạn lượng vàng cho Quý Bình An.",
      garrison: "2.000 Thiết Giáp Vệ",
      food: "40.000 Thạch Lương",
      dist: "2 Ngày Đường (từ Thanh Châu)",
      intel: "Thương gia Tây Lăng tấp nập thu mua",
      activeRoute: "rt-tc-lc"
    },
    baccoson: {
      badge: "HẺM NÚI TỬ HUYỆT",
      name: "HIỂM ĐỊA BẮC CÔ SƠN",
      threat: "Trắc trở hiểm trở · Rừng phong dễ cháy",
      desc: "Dãy hẻm núi đá vôi kéo dài dọc ranh giới Tây Lăng và Nam Ly. Địa thế lòng chảo gió hút mạnh, là nơi hoàn hảo để thực hiện mưu kế hỏa công mai phục thiêu rụi đại quân địch.",
      garrison: "Chưa Bố Trí Phục Binh",
      food: "0 Thạch",
      dist: "4 Ngày Đường",
      intel: "Thích hợp cho chiến dịch Act 3",
      activeRoute: "rt-tc-bcs"
    }
  };

  // =========================================================================
  // 5. CORE HELPER FUNCTIONS & FEEDBACK
  // =========================================================================
  function showToast(message, isGold = false) {
    const existing = document.querySelector('.resource-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'resource-toast';
    toast.innerHTML = `<span>${isGold ? '🪙' : '📜'}</span><span>${message}</span>`;
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

  function updateHudResources() {
    // Suspicion Bar
    state.suspicion = Math.max(0, Math.min(100, state.suspicion));
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

    // Gold & Food & AP
    ui.txtGold.textContent = state.gold.toLocaleString('vi-VN');
    ui.txtFood.textContent = state.food.toLocaleString('vi-VN');
    ui.txtAp.textContent = `${state.ap} / ${state.maxAp}`;
  }

  function switchView(viewName) {
    state.currentView = viewName;

    // Reset tab active states
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

  // =========================================================================
  // 6. VISUAL NOVEL ENGINE (TẦNG 1)
  // =========================================================================
  let typewriterTimer = null;

  function renderCurrentDialogue() {
    const branch = dialogueBranches[state.vnBranch] || dialogueBranches.intro;
    if (state.vnIndex >= branch.length) {
      // Reached end of branch
      return;
    }

    const item = branch[state.vnIndex];

    // Record into Backlog history
    if (!state.dialogueHistory.some(h => h.text === item.text)) {
      state.dialogueHistory.push({
        speaker: item.speaker,
        title: item.title,
        text: item.text
      });
      renderBacklog();
    }

    // Update Speaker UI
    ui.vnSpeaker.textContent = item.speaker;
    ui.vnSpeakerSub.textContent = item.title;

    // Audio / Visual FX
    if (item.flash) triggerLightning();
    if (item.shake) triggerShake();

    // Resource impacts
    if (item.suspicionChange) {
      state.suspicion += item.suspicionChange;
      showToast(`${item.suspicionChange > 0 ? '+' : ''}${item.suspicionChange}% Nghi Kỵ Vũ Hoàng`);
    }
    if (item.goldChange) {
      state.gold += item.goldChange;
      showToast(`+${item.goldChange.toLocaleString('vi-VN')} Lượng Vàng Ban Thưởng!`, true);
    }
    updateHudResources();

    // Actor stage lighting & presence
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
      // Narrator / System
      ui.actorLeftSlot.classList.remove('active');
      ui.actorRightSlot.classList.remove('active');
    }

    // Typewriter effect
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
        checkIfChoicePrompt(item);
      }
    }, 18);
  }

  function advanceDialogue() {
    const branch = dialogueBranches[state.vnBranch] || dialogueBranches.intro;
    const item = branch[state.vnIndex];

    // If currently typing, finish instantly
    if (state.isTyping && item) {
      clearInterval(typewriterTimer);
      ui.vnDialogueText.textContent = item.text;
      state.isTyping = false;
      checkIfChoicePrompt(item);
      return;
    }

    // If choice is visible, do not advance until chosen
    if (!ui.choiceModal.classList.contains('hidden')) {
      return;
    }

    // Handle view jump transition
    if (item && item.jumpToView) {
      switchView(item.jumpToView);
      return;
    }

    // Advance to next line
    if (state.vnIndex < branch.length - 1) {
      state.vnIndex++;
      renderCurrentDialogue();
    } else {
      // End of this branch -> if not transitioned, switch to map
      switchView('map');
    }
  }

  function checkIfChoicePrompt(item) {
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
          <div class="choice-card-consequence">⚡ Hệ quả: ${c.effect}</div>
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
  // 7. STRATEGY MAP ENGINE (TẦNG 2)
  // =========================================================================
  function renderMapNodeDetails(nodeKey) {
    const data = provinceData[nodeKey];
    if (!data) return;

    state.selectedNode = nodeKey;

    // Update Node Active Class
    ui.provinceNodes.forEach(node => {
      if (node.dataset.node === nodeKey) {
        node.classList.add('active-node');
      } else {
        node.classList.remove('active-node');
      }
    });

    // Update Route SVG Highlight
    document.querySelectorAll('.route-line').forEach(line => line.classList.remove('active-route'));
    if (data.activeRoute) {
      const activeLine = document.getElementById(data.activeRoute);
      if (activeLine) activeLine.classList.add('active-route');
    }

    // Update Right Panel UI
    ui.panelCityBadge.textContent = data.badge;
    ui.panelCityName.textContent = data.name;
    ui.panelCityThreat.textContent = data.threat;
    ui.panelCityDesc.textContent = data.desc;
    ui.panelGarrison.textContent = data.garrison;
    ui.panelFood.textContent = data.food;
    ui.panelDist.textContent = data.dist;
    ui.panelIntel.textContent = data.intel;

    // Adjust Action Button Label
    if (nodeKey === 'thanhchau') {
      ui.btnActionBattle.style.display = 'flex';
    } else {
      ui.btnActionBattle.style.display = 'none';
    }
  }

  function handleSoapExpansion() {
    if (state.ap < 1) {
      showToast("⚠️ Không đủ Điểm Hành Động (AP) tháng này!");
      return;
    }
    state.ap -= 1;
    state.gold += 3000;
    updateHudResources();
    showToast("🧼 Mở rộng xưởng Thấu Hoa Cao thành công! Thu về +3.000 Vàng.", true);
  }

  function handleBribeCourt() {
    if (state.gold < 1500) {
      showToast("⚠️ Không đủ 1.500 Vàng để cống nạp & đút lót!");
      return;
    }
    state.gold -= 1500;
    state.suspicion = Math.max(0, state.suspicion - 15);
    updateHudResources();
    showToast("🏛️ Đã đút lót Thập Thường Thị hoạn quan! Nghi Kỵ Vũ Hoàng -15%.");
  }

  // =========================================================================
  // 8. TACTICAL CARD BATTLER ENGINE (TẦNG 3)
  // =========================================================================
  function renderBattlefield() {
    // Wall Durability
    ui.wallHpVal.textContent = state.wallHp;
    ui.wallHpBar.style.width = `${Math.max(0, (state.wallHp / state.maxWallHp) * 100)}%`;
    if (state.wallHp < 200) {
      ui.wallHpBar.style.background = 'linear-gradient(90deg, #dc2626, #ef4444)';
    }

    // Reservoir Water Stage
    const stageWidths = [33, 66, 100];
    ui.reservoirFill.style.width = `${stageWidths[state.reservoirStage - 1]}%`;
    ui.stageDots.forEach((dot, idx) => {
      if (idx < state.reservoirStage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Boss & Morale
    ui.bossHpVal.textContent = state.bossHp;
    ui.bossHpBar.style.width = `${Math.max(0, (state.bossHp / state.maxBossHp) * 100)}%`;
    ui.enemyMoraleVal.textContent = `${state.enemyMorale}%`;
    ui.playerMoraleBar.style.width = `${state.playerMorale}%`;

    // Boss Intent Display
    if (state.bossIntent.interrupted) {
      ui.bossIntentDisplay.innerHTML = `<span class="intent-icon">🚫</span><span class="intent-text" style="color: #60a5fa;">Ý Đồ BỊ NGẮT BỞI TRIỆU VÂN!</span>`;
    } else {
      ui.bossIntentDisplay.innerHTML = `<span class="intent-icon">💥</span><span class="intent-text">${state.bossIntent.desc}</span>`;
    }

    // Mana Crystals Render
    ui.txtMana.textContent = `${state.mana} / ${state.maxMana}`;
    ui.manaGemTrack.innerHTML = '';
    for (let i = 0; i < state.maxMana; i++) {
      const gem = document.createElement('div');
      gem.className = `mana-gem ${i < state.mana ? '' : 'spent'}`;
      ui.manaGemTrack.appendChild(gem);
    }

    // Enemy Cards Live Stats
    renderEnemyLanes();
    renderPlayerLanes();
    checkFloodCardAvailability();
  }

  function renderEnemyLanes() {
    // Left
    if (state.lanes.left.enemy && state.lanes.left.enemy.alive) {
      ui.hpEnemyLeft.textContent = `🛡 ${state.lanes.left.enemy.hp}`;
    } else if (ui.cardEnemyLeft) {
      ui.cardEnemyLeft.style.opacity = '0.3';
      ui.cardEnemyLeft.style.pointerEvents = 'none';
      ui.hpEnemyLeft.textContent = 'TỬ TRẬN';
    }

    // Center Siege
    if (state.lanes.center.enemy && state.lanes.center.enemy.alive) {
      ui.hpEnemyCenter.textContent = `🛡 ${state.lanes.center.enemy.hp}`;
    } else if (ui.cardEnemyCenter) {
      ui.cardEnemyCenter.style.opacity = '0.3';
      ui.cardEnemyCenter.style.pointerEvents = 'none';
      ui.hpEnemyCenter.textContent = 'BỊ ĐÁNH NÁT';
    }

    // Right
    if (state.lanes.right.enemy && state.lanes.right.enemy.alive) {
      ui.hpEnemyRight.textContent = `🛡 ${state.lanes.right.enemy.hp}`;
    } else if (ui.cardEnemyRight) {
      ui.cardEnemyRight.style.opacity = '0.3';
      ui.cardEnemyRight.style.pointerEvents = 'none';
      ui.hpEnemyRight.textContent = 'TỬ TRẬN';
    }
  }

  function renderPlayerLanes() {
    // Center Hero Zhao Yun
    if (state.lanes.center.player) {
      ui.hpZhaoYun.textContent = `🛡 ${state.lanes.center.player.hp}`;
    }

    // Left Lane
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

    // Right Lane
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

  function checkFloodCardAvailability() {
    const cardFlood = document.getElementById('card-flood');
    if (!cardFlood) return;

    if (state.reservoirStage >= 2) {
      cardFlood.style.opacity = '1';
      cardFlood.style.filter = 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))';
    } else {
      cardFlood.style.opacity = '0.55';
      cardFlood.style.filter = 'none';
    }
  }

  function spawnDamageNumber(parentEl, amount, isCrit = false, isHeal = false) {
    if (!parentEl) return;
    const dmg = document.createElement('div');
    dmg.className = `floating-damage ${isCrit ? 'crit' : ''} ${isHeal ? 'heal' : ''}`;
    dmg.textContent = `${isHeal ? '+' : '-'}${amount}`;

    const rect = parentEl.getBoundingClientRect();
    dmg.style.left = `${rect.left + rect.width / 2 - 20}px`;
    dmg.style.top = `${rect.top + 10}px`;
    document.body.appendChild(dmg);

    setTimeout(() => dmg.remove(), 1100);
  }

  // Playing Cards
  function playCard(cardKey) {
    const cardData = state.hand.find(c => c.id === cardKey);
    if (!cardData) return;

    if (state.mana < cardData.cost) {
      showToast(`⚠️ Không đủ Quân Khí (Cần ${cardData.cost} Mana)!`);
      return;
    }

    if (cardKey === 'flood') {
      if (state.reservoirStage < 2) {
        showToast("⚠️ Trữ Lượng Nước chưa đạt Cấp 2! Cần chờ thêm hiệp.");
        return;
      }

      // Execute Giả Hủ Flood Tactic
      state.mana -= cardData.cost;
      triggerShake();
      triggerLightning();
      showToast("🌊 ĐẠI HỒNG THỦY THANH THỦY TRÚT XUỐNG CHIẾN TRƯỜNG!", true);

      // Wipe siege engine and damage all enemies
      if (state.lanes.center.enemy) {
        spawnDamageNumber(ui.cardEnemyCenter, 150, true);
        state.lanes.center.enemy.hp = 0;
        state.lanes.center.enemy.alive = false;
      }
      if (state.lanes.left.enemy) {
        spawnDamageNumber(ui.cardEnemyLeft, 130);
        state.lanes.left.enemy.hp = Math.max(0, state.lanes.left.enemy.hp - 130);
        if (state.lanes.left.enemy.hp === 0) state.lanes.left.enemy.alive = false;
      }
      if (state.lanes.right.enemy) {
        spawnDamageNumber(ui.cardEnemyRight, 130);
        state.lanes.right.enemy.hp = Math.max(0, state.lanes.right.enemy.hp - 130);
        if (state.lanes.right.enemy.hp === 0) state.lanes.right.enemy.alive = false;
      }

      // Damage Boss & Reduce enemy morale by 35%
      spawnDamageNumber(ui.bossHpBar, 80, true);
      state.bossHp = Math.max(0, state.bossHp - 80);
      state.enemyMorale = Math.max(0, state.enemyMorale - 35);
      state.reservoirStage = 1; // Reset reservoir

      renderBattlefield();
      checkVictoryDefeat();
      return;
    }

    if (cardKey === 'seventh-spear') {
      state.mana -= cardData.cost;
      triggerShake();
      showToast("⚡ Triệu Vân thi triển Thất Thám Bàn Xà! Ngắt Ý Đồ Boss!", true);

      spawnDamageNumber(ui.bossHpBar, 120, true);
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
        state.lanes.left.player = { id: 'hamtran', name: 'Hãm Trận Doanh', hp: 140, maxHp: 140, atk: 65 };
        showToast("🛡️ Đã bố trí Hãm Trận Doanh vào Tả Dực!");
        renderBattlefield();
      } else if (!state.lanes.right.player) {
        state.mana -= cardData.cost;
        state.lanes.right.player = { id: 'hamtran', name: 'Hãm Trận Doanh', hp: 140, maxHp: 140, atk: 65 };
        showToast("🛡️ Đã bố trí Hãm Trận Doanh vào Hữu Dực!");
        renderBattlefield();
      } else {
        showToast("⚠️ Hai bên cánh đã có quân đồn trú!");
      }
      return;
    }

    if (cardKey === 'bachma') {
      if (!state.lanes.right.player) {
        state.mana -= cardData.cost;
        state.lanes.right.player = { id: 'bachma', name: 'Bạch Mã Nghĩa Tòng', hp: 110, maxHp: 110, atk: 80 };
        showToast("🐎 Đã bố trí Bạch Mã Nghĩa Tòng vào Hữu Dực!");
        renderBattlefield();
      } else if (!state.lanes.left.player) {
        state.mana -= cardData.cost;
        state.lanes.left.player = { id: 'bachma', name: 'Bạch Mã Nghĩa Tòng', hp: 110, maxHp: 110, atk: 80 };
        showToast("🐎 Đã bố trí Bạch Mã Nghĩa Tòng vào Tả Dực!");
        renderBattlefield();
      } else {
        showToast("⚠️ Hai bên cánh đã có quân đồn trú!");
      }
      return;
    }
  }

  // Resolving Round ("XUNG TRẬN!")
  function executeTurn() {
    triggerShake();
    showToast("⚔️ BA QUÂN XUNG TRẬN! QUYẾT TOÁN HIỆP ĐẤU!", true);

    // 1. Player Units Attack
    // Center: Zhao Yun attacks
    if (state.lanes.center.player && state.lanes.center.enemy && state.lanes.center.enemy.alive) {
      const dmg = state.lanes.center.player.atk;
      state.lanes.center.enemy.hp = Math.max(0, state.lanes.center.enemy.hp - dmg);
      spawnDamageNumber(ui.cardEnemyCenter, dmg, true);
      if (state.lanes.center.enemy.hp === 0) state.lanes.center.enemy.alive = false;
    } else if (state.lanes.center.player) {
      // Direct hit on Boss
      spawnDamageNumber(ui.bossHpBar, 75);
      state.bossHp = Math.max(0, state.bossHp - 75);
    }

    // Left Lane Clash
    if (state.lanes.left.player && state.lanes.left.enemy && state.lanes.left.enemy.alive) {
      state.lanes.left.enemy.hp = Math.max(0, state.lanes.left.enemy.hp - state.lanes.left.player.atk);
      spawnDamageNumber(ui.cardEnemyLeft, state.lanes.left.player.atk);
      if (state.lanes.left.enemy.hp === 0) state.lanes.left.enemy.alive = false;
    }

    // Right Lane Clash
    if (state.lanes.right.player && state.lanes.right.enemy && state.lanes.right.enemy.alive) {
      state.lanes.right.enemy.hp = Math.max(0, state.lanes.right.enemy.hp - state.lanes.right.player.atk);
      spawnDamageNumber(ui.cardEnemyRight, state.lanes.right.player.atk);
      if (state.lanes.right.enemy.hp === 0) state.lanes.right.enemy.alive = false;
    }

    // 2. Enemy Units Execute Their Intents
    // Siege Engine damages wall
    if (state.lanes.center.enemy && state.lanes.center.enemy.alive) {
      state.wallHp = Math.max(0, state.wallHp - state.lanes.center.enemy.atk);
      spawnDamageNumber(ui.wallHpBar, state.lanes.center.enemy.atk);
    }

    // Archer attacks
    if (state.lanes.left.enemy && state.lanes.left.enemy.alive) {
      if (state.lanes.left.player) {
        state.lanes.left.player.hp = Math.max(0, state.lanes.left.player.hp - state.lanes.left.enemy.atk);
        spawnDamageNumber(ui.playerZoneLeft, state.lanes.left.enemy.atk);
        if (state.lanes.left.player.hp === 0) state.lanes.left.player = null;
      } else {
        state.wallHp = Math.max(0, state.wallHp - 25);
        spawnDamageNumber(ui.wallHpBar, 25);
      }
    }

    // Cavalry attacks
    if (state.lanes.right.enemy && state.lanes.right.enemy.alive) {
      if (state.lanes.right.player) {
        state.lanes.right.player.hp = Math.max(0, state.lanes.right.player.hp - state.lanes.right.enemy.atk);
        spawnDamageNumber(ui.playerZoneRight, state.lanes.right.enemy.atk);
        if (state.lanes.right.player.hp === 0) state.lanes.right.player = null;
      } else {
        state.wallHp = Math.max(0, state.wallHp - 30);
        spawnDamageNumber(ui.wallHpBar, 30);
      }
    }

    // Boss Action (if not interrupted)
    if (!state.bossIntent.interrupted) {
      state.wallHp = Math.max(0, state.wallHp - state.bossIntent.damage);
      spawnDamageNumber(ui.wallHpBar, state.bossIntent.damage, true);
    } else {
      // Reset interrupted for next round
      state.bossIntent.interrupted = false;
    }

    // 3. New Turn Prep
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
      // Victory!
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
  // 9. EVENT LISTENERS & INITIALIZATION
  // =========================================================================
  function initEvents() {
    // Nav Tabs
    ui.btnTabVn.addEventListener('click', () => switchView('vn'));
    ui.btnTabMap.addEventListener('click', () => switchView('map'));
    ui.btnTabBattle.addEventListener('click', () => switchView('battle'));

    // VN Controls
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

    // Sa Bàn Map Events
    ui.provinceNodes.forEach(node => {
      node.addEventListener('click', () => {
        const nodeKey = node.dataset.node;
        renderMapNodeDetails(nodeKey);
      });
    });

    ui.btnActionBattle.addEventListener('click', () => switchView('battle'));
    ui.btnIntercept.addEventListener('click', () => switchView('battle'));
    ui.btnActionSoap.addEventListener('click', handleSoapExpansion);
    ui.btnActionTribute.addEventListener('click', handleBribeCourt);

    // Battle Card Deck Events
    document.querySelectorAll('.hand-card').forEach(card => {
      card.addEventListener('click', () => {
        const cardKey = card.dataset.card;
        playCard(cardKey);
      });
    });

    ui.btnExecuteTurn.addEventListener('click', executeTurn);

    // Victory Modal Continue
    ui.btnTriumphNext.addEventListener('click', () => {
      ui.victoryModal.classList.add('hidden');
      state.gold += 20000;
      state.food += 50000;
      updateHudResources();
      showToast("🎉 Đại thắng! Đã thưởng 20.000 Vàng & 50.000 Thạch Lương.", true);
      switchView('vn');
      state.vnBranch = 'branch_secret';
      state.vnIndex = 1;
      renderCurrentDialogue();
    });
  }

  // Run initial setup
  updateHudResources();
  initEvents();
  renderCurrentDialogue();
});
