/**
 * TRẤN QUỐC PHÒ MÃ GIA — PROTOTYPE GAME ENGINE
 * Architecture: Tam Đại Tầng (Visual Novel, Grand Strategy Node Map, Tactical Card Battler)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. GAME STATE
  // =========================================================================
  const state = {
    currentView: 'vn',
    suspicion: 15,    // Emperor's Suspicion Meter (0 - 100%)
    gold: 10500,
    food: 50000,
    ap: 3,
    maxAp: 3,
    mana: 6,
    maxMana: 10,

    // Battle State
    wallHp: 500,
    maxWallHp: 500,
    enemyHp: 250,
    maxEnemyHp: 250,
    floodActivated: false,
    battleEnded: false,

    // Current Node
    selectedNode: 'thanhchau',

    // Visual Novel Script Index
    vnStep: 0,
  };

  // =========================================================================
  // 2. DOM ELEMENT REFERENCES
  // =========================================================================
  const ui = {
    // Top HUD
    txtSuspicion: document.getElementById('txt-suspicion'),
    barSuspicion: document.getElementById('bar-suspicion'),
    txtGold: document.getElementById('txt-gold'),
    txtFood: document.getElementById('txt-food'),
    txtAp: document.getElementById('txt-ap'),

    // Tabs
    btnTabVn: document.getElementById('btn-tab-vn'),
    btnTabMap: document.getElementById('btn-tab-map'),
    btnTabBattle: document.getElementById('btn-tab-battle'),

    // Views
    viewVn: document.getElementById('view-vn'),
    viewMap: document.getElementById('view-map'),
    viewBattle: document.getElementById('view-battle'),

    // VN Elements
    speakerTag: document.getElementById('speaker-tag'),
    speakerTitle: document.getElementById('speaker-title'),
    dialogueText: document.getElementById('dialogue-text'),
    btnVnNext: document.getElementById('btn-vn-next'),
    choiceOverlay: document.getElementById('choice-overlay'),
    choicePrompt: document.getElementById('choice-prompt'),
    choiceOptions: document.getElementById('choice-options'),
    characterSprite: document.getElementById('character-sprite'),

    // Map Elements
    nodes: document.querySelectorAll('.map-node'),
    nodeDetailTitle: document.getElementById('node-detail-title'),
    nodeDetailDesc: document.getElementById('node-detail-desc'),
    nodeGarrison: document.getElementById('node-garrison'),
    nodeFood: document.getElementById('node-food'),
    nodeDistance: document.getElementById('node-distance'),
    nodeIntel: document.getElementById('node-intel'),
    btnCmdMarch: document.getElementById('btn-cmd-march'),
    btnCmdSoap: document.getElementById('btn-cmd-soap'),
    btnCmdBribe: document.getElementById('btn-cmd-bribe'),

    // Battle Elements
    txtWallHp: document.getElementById('txt-wall-hp'),
    barWallHp: document.getElementById('bar-wall-hp'),
    txtEnemyHp: document.getElementById('txt-enemy-hp'),
    barEnemyHp: document.getElementById('bar-enemy-hp'),
    txtMana: document.getElementById('txt-mana'),
    manaCrystals: document.getElementById('mana-crystals'),
    playerHand: document.getElementById('player-hand'),
    btnEndTurn: document.getElementById('btn-end-turn'),
    victoryModal: document.getElementById('victory-modal'),
    btnVictoryContinue: document.getElementById('btn-victory-continue'),
  };

  // Node database for Strategy Map
  const nodeData = {
    dedo: {
      name: "ĐẾ ĐÔ ĐẠI VŨ",
      owner: "Vũ Hoàng & Triều Đình",
      desc: "Trọng tâm chính trị của đế quốc. Phò Mã Phủ tọa lạc tại đây. Cần cẩn trọng từng hành vi để không kích động thanh Nghi Kỵ của Vũ Hoàng.",
      garrison: "500 Cấm Vệ Hộ Phủ",
      food: "5.000 Thạch",
      distance: "0 Ngày (Bản Doanh)",
      intel: "Trần Hải (Thiên Cơ) đang mật thám"
    },
    khainguyen: {
      name: "HUYỆN KHAI NGUYÊN",
      owner: "Điển Nông Doanh (Quý Bình An)",
      desc: "Căn cứ tiếp tế hậu cần đầu tiên tại ngoại ô kinh kỳ. Vừa tịch thu 10 vạn thạch lương từ Huyện lệnh tham ô Lưu Nguyên.",
      garrison: "1.000 Dân Binh",
      food: "50.000 Thạch Lương",
      distance: "2 Ngày Đường (từ Đế Đô)",
      intel: "Bách tính lập đền thờ sống Quý Bình An"
    },
    thanhchau: {
      name: "THÀNH THANH CHÂU",
      owner: "Tiền Tuyến Đại Chiến (Nguy Cấp)",
      desc: "Cửa ngõ biên cương phía Bắc. Tiên phong Nam Ly Địch Hỏa đang xua 20.000 quân vây hãm. Tường thành có độ bền 500 HP và con đập sông Thanh Thủy ở thượng nguồn.",
      garrison: "Triệu Vân + 1.000 Quân",
      food: "15.000 Thạch",
      distance: "2 Ngày Đường (từ Khai Nguyên)",
      intel: "Đã cài gian tế mở cổng trước trận"
    },
    lieuchau: {
      name: "THÀNH LIỄU CHÂU",
      owner: "Hậu Phương Bắc Cảnh (An Toàn)",
      desc: "Thành trì phồn hoa nhất phương Bắc. Nơi tập trung lò rèn giáp sắt và xưởng sản xuất xà phòng Thấu Hoa Cao chi nhánh 2.",
      garrison: "2.000 Thiết Giáp Binh",
      food: "40.000 Thạch",
      distance: "3 Ngày Đường (từ Thanh Châu)",
      intel: "Thương nhân Tây Lăng đang buôn bán"
    },
    baccoson: {
      name: "HIỂM ĐỊA BẮC CÔ SƠN",
      owner: "Địa Đầu Chiến Lược (Act 3)",
      desc: "Hẻm núi hiểm trở nối liền biên giới Nam Ly. Nơi Cổ Hủ vạch ra đại kế hỏa thiêu 30 vạn quân Nam Ly của Quân Thần Cung Sinh.",
      garrison: "Chưa Đồn Trú",
      food: "0 Thạch",
      distance: "4 Ngày Đường",
      intel: "Rừng phong rậm rạp, gió đông thổi mạnh"
    }
  };

  // VN Dialogue Script (Act 1 key sequence)
  const vnScript = [
    {
      speaker: "Quý Bình An",
      title: "Phò Mã Gia · Xuyên Không Thức Tỉnh",
      text: "Khụ... đầu óc ong ong... Ta đang ở đâu? Phò Mã Gia phế vật của Đại Vũ triều? Bị hoàng đế nghi kỵ, bị công chúa khinh thường... Đây chẳng phải là ngồi trên đống lửa sao?!",
      sprite: "assets/images/zhaoyun.jpg"
    },
    {
      speaker: "Hệ Thống",
      title: "Tam Quốc Anh Linh Hệ Thống",
      text: "Đinh! Thức tỉnh Hệ Thống Tam Quốc Anh Linh! Ký chủ nhận Tân Thủ Lễ Bao: 1 Anh Hồn Lệnh Sơ Cấp và 100 lượng vàng khởi nghiệp!",
      sprite: "assets/images/zhaoyun.jpg"
    },
    {
      speaker: "Triệu Tử Long",
      title: "Thường Sơn Hổ Tướng · Anh Linh Thức Tỉnh",
      text: "Mạt tướng Thường Sơn Triệu Tử Long! Bái kiến Chúa Công! Nguyện vì Chúa Công xông pha khói lửa, muôn thác không từ!",
      sprite: "assets/images/zhaoyun.jpg"
    },
    {
      speaker: "Triệu Tử Long",
      title: "Thường Sơn Hổ Tướng · Cảnh Giác",
      text: "Chúa Công cẩn thận! Nóc nhà có sát khí! Sáu tên thích khách Hoàng Cảnh đang lao xuống nhằm vào ngài! Xin Chúa Công lùi lại!",
      sprite: "assets/images/zhaoyun.jpg"
    },
    {
      speaker: "Quý Bình An",
      title: "Phò Mã Gia · Quyết Đoán",
      text: "Tử Long! Đừng để một tên nào chạy thoát! Bắt sống tên đầu lĩnh cho ta!",
      sprite: "assets/images/zhaoyun.jpg",
      choice: {
        prompt: "Xử trí tên thích khách Hoàng Cảnh bị bắt sống ra sao?",
        options: [
          {
            title: "Bí mật ép cung rồi ném xác ra ngoại ô, giữ kín hành tung (Khuyên Dùng)",
            impact: "Thanh Nghi Kỵ Vũ Hoàng an toàn (15%) · Ẩn nhẫn dưỡng quân",
            action: () => {
              updateSuspicion(-5);
              advanceVn();
            }
          },
          {
            title: "Đưa ra Cần Chính Điện công khai tố giác có kẻ mưu hại Phò Mã",
            impact: "Tăng 15 Uy Vọng · Nghi Kỵ Vũ Hoàng tăng vọt (+25%)!",
            action: () => {
              updateSuspicion(25);
              advanceVn();
            }
          }
        ]
      }
    },
    {
      speaker: "Quý Bình An",
      title: "Phò Mã Gia · Kinh Thương Chi Đạo",
      text: "Nhờ bán xà phòng Thấu Hoa Cao độc quyền cho giới quý tộc kinh kỳ, ta đã gom đủ 10.000 lượng vàng! Hệ thống, triệu hoán Độc Sĩ Giả Hủ cho ta!",
      sprite: "assets/images/zhaoyun.jpg"
    },
    {
      speaker: "Giả Hủ (Giả Văn Hòa)",
      title: "Tuyệt Thế Độc Sĩ · Bái Kiến Chúa Công",
      text: "Lão hủ Giả Hủ, tự Văn Hòa, bái kiến Chúa Công! Lão hủ chỉ có một tôn chỉ: Kẻ nào muốn Chúa Công chết, lão hủ sẽ khiến cả cửu tộc kẻ đó chôn cùng!",
      sprite: "assets/images/zhaoyun.jpg"
    },
    {
      speaker: "Giả Hủ (Giả Văn Hòa)",
      title: "Tuyệt Thế Độc Sĩ · Quân Sư Bày Trận",
      text: "Chúa Công, Vũ Hoàng phái ngài làm Điển Nông Trung Lang Tướng đến Bắc Cảnh. Tiên phong Nam Ly Địch Hỏa đã đem 2 vạn quân vây thành Thanh Châu. Đã đến lúc kích hoạt Sa Bàn điều quân xuất chiến!",
      sprite: "assets/images/zhaoyun.jpg",
      choice: {
        prompt: "Hành động chiến lược tiếp theo của Chúa Công?",
        options: [
          {
            title: "Mở Đế Nghiệp Sa Bàn: Điều phối quân đoàn đến Thanh Châu",
            impact: "Chuyển sang giao diện Sa Bàn Cứ Điểm",
            action: () => {
              switchView('map');
            }
          },
          {
            title: "Tiến thẳng vào Sa Trường: Trực tiếp chỉ huy Thủ Thành Thanh Châu",
            impact: "Bắt đầu trận đánh thẻ bài công/thủ thành",
            action: () => {
              switchView('battle');
            }
          }
        ]
      }
    }
  ];

  // =========================================================================
  // 3. CORE FUNCTIONS: HUD & STATS
  // =========================================================================
  function updateHud() {
    ui.txtSuspicion.textContent = `${state.suspicion}%`;
    ui.barSuspicion.style.width = `${state.suspicion}%`;

    // Suspicion color feedback
    if (state.suspicion > 60) {
      ui.barSuspicion.style.background = '#dc2626';
      ui.txtSuspicion.style.color = '#ef4444';
    } else if (state.suspicion > 30) {
      ui.barSuspicion.style.background = '#f59e0b';
      ui.txtSuspicion.style.color = '#fbbf24';
    } else {
      ui.barSuspicion.style.background = '#10b981';
      ui.txtSuspicion.style.color = '#34d399';
    }

    ui.txtGold.textContent = state.gold.toLocaleString();
    ui.txtFood.textContent = state.food.toLocaleString();
    ui.txtAp.textContent = `${state.ap}/${state.maxAp}`;
    ui.txtMana.textContent = `${state.mana}/${state.maxMana}`;

    renderManaCrystals();
  }

  function updateSuspicion(delta) {
    state.suspicion = Math.max(0, Math.min(100, state.suspicion + delta));
    updateHud();
  }

  function renderManaCrystals() {
    ui.manaCrystals.innerHTML = '';
    for (let i = 0; i < state.maxMana; i++) {
      const dot = document.createElement('div');
      dot.className = `mana-dot ${i < state.mana ? '' : 'empty'}`;
      ui.manaCrystals.appendChild(dot);
    }
  }

  // =========================================================================
  // 4. VIEW SWITCHING
  // =========================================================================
  function switchView(viewName) {
    state.currentView = viewName;

    // Update Nav Buttons
    [ui.btnTabVn, ui.btnTabMap, ui.btnTabBattle].forEach(btn => btn.classList.remove('active'));
    if (viewName === 'vn') ui.btnTabVn.classList.add('active');
    if (viewName === 'map') ui.btnTabMap.classList.add('active');
    if (viewName === 'battle') ui.btnTabBattle.classList.add('active');

    // Update Views
    [ui.viewVn, ui.viewMap, ui.viewBattle].forEach(v => v.classList.remove('active'));
    if (viewName === 'vn') ui.viewVn.classList.add('active');
    if (viewName === 'map') ui.viewMap.classList.add('active');
    if (viewName === 'battle') ui.viewBattle.classList.add('active');
  }

  ui.btnTabVn.addEventListener('click', () => switchView('vn'));
  ui.btnTabMap.addEventListener('click', () => switchView('map'));
  ui.btnTabBattle.addEventListener('click', () => switchView('battle'));

  // =========================================================================
  // 5. VISUAL NOVEL THEATER LOGIC
  // =========================================================================
  function renderVnStep() {
    if (state.vnStep >= vnScript.length) {
      state.vnStep = 0; // Loop or end
    }

    const curr = vnScript[state.vnStep];
    ui.speakerTag.textContent = curr.speaker;
    ui.speakerTitle.textContent = curr.title;
    ui.dialogueText.textContent = curr.text;

    // Check for choices
    if (curr.choice) {
      showChoiceModal(curr.choice);
    } else {
      ui.choiceOverlay.classList.add('hidden');
    }
  }

  function advanceVn() {
    state.vnStep++;
    renderVnStep();
  }

  function showChoiceModal(choiceData) {
    ui.choicePrompt.textContent = choiceData.prompt;
    ui.choiceOptions.innerHTML = '';

    choiceData.options.forEach(opt => {
      const btn = document.createElement('div');
      btn.className = 'choice-btn';
      btn.innerHTML = `
        <div class="choice-btn-title">${opt.title}</div>
        <div class="choice-btn-impact">👉 ${opt.impact}</div>
      `;
      btn.addEventListener('click', () => {
        ui.choiceOverlay.classList.add('hidden');
        opt.action();
      });
      ui.choiceOptions.appendChild(btn);
    });

    ui.choiceOverlay.classList.remove('hidden');
  }

  ui.btnVnNext.addEventListener('click', () => {
    const curr = vnScript[state.vnStep];
    if (!curr.choice) {
      advanceVn();
    }
  });

  // =========================================================================
  // 6. GRAND STRATEGY NODE MAP LOGIC
  // =========================================================================
  ui.nodes.forEach(nodeEl => {
    nodeEl.addEventListener('click', () => {
      const nodeId = nodeEl.dataset.node;
      selectNode(nodeId, nodeEl);
    });
  });

  function selectNode(nodeId, element) {
    state.selectedNode = nodeId;
    ui.nodes.forEach(n => n.classList.remove('active'));
    element.classList.add('active');

    const data = nodeData[nodeId];
    if (data) {
      ui.nodeDetailTitle.textContent = data.name;
      ui.nodeDetailDesc.textContent = data.desc;
      ui.nodeGarrison.textContent = data.garrison;
      ui.nodeFood.textContent = data.food;
      ui.nodeDistance.textContent = data.distance;
      ui.nodeIntel.textContent = data.intel;
    }
  }

  // Strategy Command Actions
  ui.btnCmdMarch.addEventListener('click', () => {
    if (state.ap >= 1) {
      state.ap -= 1;
      state.food = Math.max(0, state.food - 500);
      updateHud();
      // Transition smoothly to Battle
      switchView('battle');
    } else {
      alert('Đã hết Điểm Hành Động (AP) trong tháng này! Hãy kết thúc lượt để hồi phục.');
    }
  });

  ui.btnCmdSoap.addEventListener('click', () => {
    if (state.ap >= 1) {
      state.ap -= 1;
      state.gold += 3000;
      updateHud();
      alert('Đã mở rộng cơ sở sản xuất xà phòng Thấu Hoa Cao! Thu hoạch ngay +3.000 lượng vàng!');
    } else {
      alert('Không đủ AP để mở rộng cơ sở kinh thương!');
    }
  });

  ui.btnCmdBribe.addEventListener('click', () => {
    if (state.gold >= 1000) {
      state.gold -= 1000;
      updateSuspicion(-15);
      alert('Đã trích 1.000 lượng vàng tiến cống nội khố và mua chuộc hoạn quan! Thanh Nghi Kỵ của Vũ Hoàng giảm -15%!');
    } else {
      alert('Không đủ vàng để dâng nạp cống phẩm!');
    }
  });

  // =========================================================================
  // 7. TACTICAL CARD BATTLER LOGIC
  // =========================================================================
  function updateBattleStatus() {
    ui.txtWallHp.textContent = state.wallHp;
    ui.barWallHp.style.width = `${(state.wallHp / state.maxWallHp) * 100}%`;

    ui.txtEnemyHp.textContent = state.enemyHp;
    ui.barEnemyHp.style.width = `${(state.enemyHp / state.maxEnemyHp) * 100}%`;

    // Color indicators
    if (state.wallHp < 200) {
      ui.barWallHp.style.background = '#ef4444';
    }
  }

  // Card click / play logic
  const cards = ui.playerHand.querySelectorAll('.battle-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cardType = card.dataset.card;
      const cost = parseInt(card.dataset.cost || 2);

      if (state.mana < cost) {
        alert(`Không đủ nội lực! Cần ${cost} điểm nội lực để thi triển lá bài này.`);
        return;
      }

      // Execute card action
      state.mana -= cost;
      updateHud();

      if (cardType === 'flood') {
        // Tactic: Xả Lũ Thanh Thủy
        activateFloodTactic();
        card.style.opacity = '0.3';
        card.style.pointerEvents = 'none';
      } else if (cardType === 'seventh-spear') {
        // Skill: Thất Thám Bàn Xà
        state.enemyHp = Math.max(0, state.enemyHp - 120);
        updateBattleStatus();
        showFloatingDamage('-120 Bạo Kích!', '#fbbf24');
        card.style.opacity = '0.3';
        card.style.pointerEvents = 'none';
        checkVictoryCondition();
      } else if (cardType === 'hamtran') {
        // Deploy Hãm Trận Doanh to Left Lane
        const slot = document.getElementById('player-drop-left');
        slot.innerHTML = `
          <div class="unit-card" style="border-color: #10b981;">
            <div class="unit-badge" style="background:#059669;">Trọng Giáp</div>
            <div class="unit-name">Hãm Trận Doanh</div>
            <div class="unit-stats">HP: 140 · ATK: 65</div>
          </div>
        `;
        card.style.display = 'none';
      } else if (cardType === 'bachma') {
        // Deploy Bạch Mã Nghĩa Tòng to Right Lane
        const slot = document.getElementById('player-drop-right');
        slot.innerHTML = `
          <div class="unit-card" style="border-color: #3b82f6;">
            <div class="unit-badge" style="background:#2563eb;">Kỵ Binh</div>
            <div class="unit-name">Bạch Mã Nghĩa Tòng</div>
            <div class="unit-stats">HP: 110 · ATK: 80</div>
          </div>
        `;
        card.style.display = 'none';
      }
    });
  });

  function activateFloodTactic() {
    state.floodActivated = true;
    // Destroy enemy siege engine in center lane
    const centerEnemy = document.getElementById('enemy-drop-center');
    centerEnemy.innerHTML = `
      <div class="unit-card" style="border-color: #38bdf8; background: #082f49;">
        <div class="unit-badge" style="background:#0284c7;">Nhấn Chìm</div>
        <div class="unit-name">Xe Phá Thành Bị Cuốn Trôi!</div>
        <div class="unit-stats" style="color:#7dd3fc;">HP: 0 · VÔ HIỆU HÓA</div>
      </div>
    `;

    // Deal AoE damage to Địch Hỏa
    state.enemyHp = Math.max(0, state.enemyHp - 130);
    updateBattleStatus();

    showFloatingDamage('HỒNG THỦY XẢ LŨ! -130 HP', '#38bdf8');
    checkVictoryCondition();
  }

  function showFloatingDamage(msg, color) {
    const floatEl = document.createElement('div');
    floatEl.style.position = 'fixed';
    floatEl.style.top = '25%';
    floatEl.style.left = '50%';
    floatEl.style.transform = 'translate(-50%, -50%)';
    floatEl.style.fontSize = '24px';
    floatEl.style.fontWeight = '900';
    floatEl.style.color = color || '#ef4444';
    floatEl.style.textShadow = '0 0 20px rgba(0,0,0,0.9)';
    floatEl.style.zIndex = '999';
    floatEl.style.transition = 'all 1s ease-out';
    floatEl.textContent = msg;

    document.body.appendChild(floatEl);

    setTimeout(() => {
      floatEl.style.transform = 'translate(-50%, -120%)';
      floatEl.style.opacity = '0';
    }, 50);

    setTimeout(() => {
      floatEl.remove();
    }, 1050);
  }

  // End Turn Button
  ui.btnEndTurn.addEventListener('click', () => {
    if (state.enemyHp <= 0) {
      triggerVictory();
      return;
    }

    // Enemy Turn: Enemy attacks Wall
    if (!state.floodActivated) {
      state.wallHp = Math.max(0, state.wallHp - 80);
      showFloatingDamage('Tường Thành Bị Công Phá! -80 HP', '#f87171');
      updateBattleStatus();
    }

    // Triệu Vân attacks Địch Hỏa
    state.enemyHp = Math.max(0, state.enemyHp - 90);
    updateBattleStatus();

    // Restore Mana for player next turn
    state.mana = Math.min(state.maxMana, state.mana + 4);
    updateHud();

    checkVictoryCondition();
  });

  function checkVictoryCondition() {
    if (state.enemyHp <= 0 && !state.battleEnded) {
      state.battleEnded = true;
      setTimeout(() => {
        triggerVictory();
      }, 600);
    }
  }

  function triggerVictory() {
    ui.victoryModal.classList.remove('hidden');
  }

  ui.btnVictoryContinue.addEventListener('click', () => {
    ui.victoryModal.classList.add('hidden');
    // Reward player
    state.gold += 20000;
    state.food += 50000;
    updateHud();
    // Return to Map
    switchView('map');
  });

  // =========================================================================
  // 8. INITIAL BOOT
  // =========================================================================
  updateHud();
  renderVnStep();
  updateBattleStatus();

});
