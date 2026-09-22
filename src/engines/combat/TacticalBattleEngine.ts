/**
 * TacticalBattleEngine.ts — 100% Authentic 3-Lane Card Battler Arena
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * BẢO TỒN 100% NGUYÊN TÁC SA TRƯỜNG THẺ BÀI:
 * - Tường thành Thanh Châu 500 HP & hiệu ứng Cao Lâm Hạ
 * - Thủy Ách sông Thanh Thủy tích nước 3 cấp
 * - Soái kỳ Địch Hỏa báo trước ý đồ (Intent System)
 * - Triển khai thẻ bài 3 làn: Tả dực (Hãm Trận Doanh), Trung lộ (Triệu Tử Long), Hữu dực (Bạch Mã Nghĩa Tòng)
 * - Tuyệt kỹ Thất Thám Bàn Xà ngắt chiêu & Xả Lũ Thanh Thủy quét sạch xe phá thành
 * - Nút chiêng đồng KHỞI CHIẾN! Minh Kim Thu Quân quyết toán giao tranh
 * - Popup chiến thắng S-Rank và phần thưởng
 */

import battleArenaTemplate from './battle-arena.html?raw';
import { PhaserCombatFx } from './PhaserCombatFx';
import { GameStateStore } from '../../core/GameStateStore';
import { EventBus } from '../../core/EventBus';
import { AudioSynthesizer } from '../../audio/AudioSynthesizer';

export class TacticalBattleEngine {
  private container: HTMLElement;
  private store: GameStateStore;
  private bus: EventBus;
  private audio: AudioSynthesizer;
  public phaserFx: PhaserCombatFx;

  // DOM Elements
  private wallHpText!: HTMLElement;
  private wallHpBar!: HTMLElement;
  private bossHpText!: HTMLElement;
  private bossHpBar!: HTMLElement;
  private bossIntentDesc!: HTMLElement;
  private reservoirFill!: HTMLElement;
  private cardEnemyLeft!: HTMLElement;
  private cardEnemyCenter!: HTMLElement;
  private cardEnemyRight!: HTMLElement;
  private playerZoneLeft!: HTMLElement;
  private playerZoneCenter!: HTMLElement;
  private playerZoneRight!: HTMLElement;
  private txtMana!: HTMLElement;
  private btnExecuteTurn!: HTMLElement;
  private victoryModal!: HTMLElement;
  private btnTriumphNext!: HTMLElement;
  private defeatModal!: HTMLElement;
  private btnDefeatRetry!: HTMLElement;
  private btnDefeatRetreat!: HTMLElement;

  constructor(containerId: string, store: GameStateStore, bus: EventBus, audio: AudioSynthesizer) {
    this.container = document.getElementById(containerId) || document.body;
    this.store = store;
    this.bus = bus;
    this.audio = audio;
    this.phaserFx = new PhaserCombatFx('battle-phaser-container');

    this.mountHTML();
    this.bindDOM();
    this.bindEvents();
    this.phaserFx.init();
    this.renderBattlefield();
  }

  public onViewActivated(): void {
    this.phaserFx.resize();
    this.renderBattlefield();
  }

  private mountHTML(): void {
    this.container.innerHTML = battleArenaTemplate;
  }

  private bindDOM(): void {
    this.wallHpText = document.getElementById('wall-hp-val')!;
    this.wallHpBar = document.getElementById('wall-hp-bar')!;
    this.bossHpText = document.getElementById('enemy-hp-val')!;
    this.bossHpBar = document.getElementById('enemy-hp-bar')!;
    this.bossIntentDesc = document.getElementById('boss-intent-desc')!;
    this.reservoirFill = document.getElementById('reservoir-fill')!;
    this.cardEnemyLeft = document.getElementById('card-enemy-left')!;
    this.cardEnemyCenter = document.getElementById('card-enemy-center')!;
    this.cardEnemyRight = document.getElementById('card-enemy-right')!;
    this.playerZoneLeft = document.getElementById('player-zone-left')!;
    this.playerZoneCenter = document.getElementById('player-zone-center')!;
    this.playerZoneRight = document.getElementById('player-zone-right')!;
    this.txtMana = document.getElementById('txt-mana')!;
    this.btnExecuteTurn = document.getElementById('btn-execute-turn')!;
    this.victoryModal = document.getElementById('victory-modal')!;
    this.btnTriumphNext = document.getElementById('btn-triumph-next')!;
    this.defeatModal = document.getElementById('defeat-modal')!;
    this.btnDefeatRetry = document.getElementById('btn-defeat-retry')!;
    this.btnDefeatRetreat = document.getElementById('btn-defeat-retreat')!;
  }

  private bindEvents(): void {
    // Click thẻ bài trên tay
    const handCards = this.container.querySelectorAll('.hand-card');
    handCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const cardType = target.getAttribute('data-card');
        if (cardType) {
          this.playCard(cardType);
        }
      });
    });

    // Nút Chiêng Đồng Khởi Chiến
    if (this.btnExecuteTurn) {
      this.btnExecuteTurn.addEventListener('click', () => {
        this.executeTurn();
      });
    }

    // Nút Báo Công Sau Chiến Thắng
    // Nút Báo Công Sau Chiến Thắng (Khải Hoàn Tiệp Báo)
    if (this.btnTriumphNext) {
      this.btnTriumphNext.addEventListener('click', () => {
        this.audio.playSealStamp();
        if (this.victoryModal) this.victoryModal.classList.add('hidden');
        const s = this.store.getState();
        this.store.setState({
          gold: s.gold + 20000,
          food: s.food + 50000,
          ticketCount: s.ticketCount + 2
        });
        this.bus.emit('SHOW_TOAST', '[ 捷 ] Đại thắng quân Nam Ly! Nhận +20.000 Vàng & +2 Anh Hồn Lệnh!');
        this.bus.emit('CHANGE_VIEW', 'vn');
      });
    }

    // Nút Bại Trận: Trùng chỉnh kỳ cổ
    if (this.btnDefeatRetry) {
      this.btnDefeatRetry.addEventListener('click', () => {
        this.audio.playWarDrum();
        if (this.defeatModal) this.defeatModal.classList.add('hidden');
        this.restartBattle();
      });
    }

    // Nút Bại Trận: Lùi về sa bàn
    if (this.btnDefeatRetreat) {
      this.btnDefeatRetreat.addEventListener('click', () => {
        this.audio.playWoodClick();
        if (this.defeatModal) this.defeatModal.classList.add('hidden');
        this.bus.emit('CHANGE_VIEW', 'map');
      });
    }
  }

  public renderBattlefield(): void {
    const s = this.store.getState();

    if (this.wallHpText) this.wallHpText.textContent = `${s.wallHp} / ${s.maxWallHp} HP`;
    if (this.wallHpBar) this.wallHpBar.style.width = `${(s.wallHp / s.maxWallHp) * 100}%`;

    if (this.bossHpText) this.bossHpText.textContent = `${s.bossHp} / ${s.maxBossHp} HP`;
    if (this.bossHpBar) this.bossHpBar.style.width = `${(s.bossHp / s.maxBossHp) * 100}%`;

    if (this.txtMana) this.txtMana.textContent = `${s.mana} / ${s.maxMana} Phù`;

    if (this.reservoirFill) this.reservoirFill.style.width = `${(s.reservoirStage / 3) * 100}%`;
    ['stage-1', 'stage-2', 'stage-3'].forEach((stId, idx) => {
      const dot = document.getElementById(stId);
      if (dot) dot.classList.toggle('active', idx + 1 <= s.reservoirStage);
    });

    if (this.bossIntentDesc) this.bossIntentDesc.textContent = s.bossIntent.desc;

    // Center Enemy (Xe Đục Thành)
    if (this.cardEnemyCenter) {
      const hpSpan = document.getElementById('hp-enemy-center')?.querySelector('span:last-child') || this.cardEnemyCenter.querySelector('.stat-tally.troop span:last-child');
      if (s.lanes.center.enemy && s.lanes.center.enemy.alive) {
        this.cardEnemyCenter.style.opacity = '1';
        if (hpSpan) hpSpan.textContent = String(s.lanes.center.enemy.hp);
      } else {
        this.cardEnemyCenter.style.opacity = '0.25';
        if (hpSpan) hpSpan.textContent = '0';
      }
    }

    // Left Lane Enemy
    if (this.cardEnemyLeft) {
      const hpSpan = document.getElementById('hp-enemy-left')?.querySelector('span:last-child') || this.cardEnemyLeft.querySelector('.stat-tally.troop span:last-child');
      if (s.lanes.left.enemy && s.lanes.left.enemy.alive) {
        this.cardEnemyLeft.style.opacity = '1';
        if (hpSpan) hpSpan.textContent = String(s.lanes.left.enemy.hp);
      } else {
        this.cardEnemyLeft.style.opacity = '0.25';
        if (hpSpan) hpSpan.textContent = '0';
      }
    }

    // Right Lane Enemy
    if (this.cardEnemyRight) {
      const hpSpan = document.getElementById('hp-enemy-right')?.querySelector('span:last-child') || this.cardEnemyRight.querySelector('.stat-tally.troop span:last-child');
      if (s.lanes.right.enemy && s.lanes.right.enemy.alive) {
        this.cardEnemyRight.style.opacity = '1';
        if (hpSpan) hpSpan.textContent = String(s.lanes.right.enemy.hp);
      } else {
        this.cardEnemyRight.style.opacity = '0.25';
        if (hpSpan) hpSpan.textContent = '0';
      }
    }

    // Player Center Hero Unit (Triệu Tử Long)
    if (s.lanes.center.player && this.playerZoneCenter) {
      this.playerZoneCenter.innerHTML = `
        <div class="card-unit hero-card" id="card-hero-center">
          <div class="hero-crest">DANH TƯỚNG</div>
          <img src="assets/images/actor_trieu_van.png" alt="Triệu Vân" class="hero-mini-art">
          <div class="hero-details">
            <div class="hero-name">Triệu Tử Long</div>
            <div class="hero-title">Thường Sơn Triệu Tử Long</div>
            <div class="hero-skill-passive">Thất Tiến Thất Xuất: Kháng 50% sát thương</div>
            <div class="unit-bars">
              <div class="stat-tally martial"><span class="tally-glyph">武</span><span>${s.lanes.center.player.atk}</span></div>
              <div class="stat-tally troop"><span class="tally-glyph">兵</span><span>${s.lanes.center.player.hp}</span></div>
            </div>
          </div>
        </div>
      `;
    }
  }

  private spawnDamage(targetEl: HTMLElement | null, val: number, isCritical: boolean = false): void {
    if (!targetEl) return;
    const pop = document.createElement('div');
    pop.className = `damage-pop ${isCritical ? 'damage-crit' : ''}`;
    pop.textContent = `-${val}`;
    pop.style.left = '50%';
    pop.style.top = '30%';
    targetEl.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
  }

  public playCard(cardType: string): void {
    const s = this.store.getState();

    // Thất Thám Bàn Xà
    if (cardType === 'seventh-spear') {
      if (s.mana < 2) {
        this.bus.emit('SHOW_TOAST', '[ 符 ] Chưa đủ 2 Hổ Phù Quân Lệnh!');
        return;
      }
      this.store.setState({
        mana: s.mana - 2,
        bossHp: Math.max(0, s.bossHp - 60),
        bossIntent: {
          ...s.bossIntent,
          interrupted: true,
          desc: "Ý ĐỒ BỊ PHÁ VỠ bởi Thất Thám Bàn Xà của Triệu Tử Long!"
        }
      });
      this.audio.playWarDrum();
      this.bus.emit('TRIGGER_SHAKE', 'impact');
      this.bus.emit('TRIGGER_LIGHTNING', '#fbbf24');
      this.phaserFx.slash(600, 250);
      this.spawnDamage(this.bossHpBar, 60, true);
      this.bus.emit('SHOW_TOAST', '[ 戈 ] THẤT THÁM BÀN XÀ! Ngắt ý đồ của Địch Hỏa & Gây 60 Sát Thương!');
      this.renderBattlefield();
      this.checkVictoryDefeat();
      return;
    }

    // Xả Lũ Thanh Thủy
    if (cardType === 'flood') {
      if (s.mana < 5) {
        this.bus.emit('SHOW_TOAST', '[ 符 ] Cần 5 Hổ Phù để phát lệnh phá đê xả lũ!');
        return;
      }
      if (s.reservoirStage < 2) {
        this.bus.emit('SHOW_TOAST', '[ 水 ] Trữ lượng nước chưa đủ! Cần tối thiểu Cấp 2 để phá đê!');
        return;
      }
      const nextLanes = { ...s.lanes };
      if (nextLanes.center.enemy) {
        nextLanes.center.enemy.hp = 0;
        nextLanes.center.enemy.alive = false;
        this.spawnDamage(this.cardEnemyCenter, 150, true);
      }
      this.store.setState({
        mana: s.mana - 5,
        bossHp: Math.max(0, s.bossHp - 120),
        lanes: nextLanes
      });
      this.audio.playThunder();
      this.bus.emit('TRIGGER_SHAKE', 'impact');
      this.bus.emit('TRIGGER_LIGHTNING', '#38bdf8');
      this.phaserFx.flood();
      this.spawnDamage(this.bossHpBar, 120, true);
      this.bus.emit('SHOW_TOAST', '[ 謀 ] ĐẠI HỒNG THỦY! Giả Hủ phá đê thượng nguồn dìm chết quân địch!');
      this.renderBattlefield();
      this.checkVictoryDefeat();
      return;
    }

    // Hãm Trận Doanh
    if (cardType === 'hamtran') {
      if (s.mana < 3) {
        this.bus.emit('SHOW_TOAST', '[ 符 ] Cần 3 Hổ Phù để triển khai Hãm Trận Doanh!');
        return;
      }
      if (!s.lanes.left.player) {
        const nextLanes = { ...s.lanes };
        nextLanes.left.player = { id: 'hamtran', name: 'Hãm Trận Doanh', hp: 140, atk: 65, alive: true };
        this.store.setState({
          mana: s.mana - 3,
          lanes: nextLanes
        });
        if (this.playerZoneLeft) {
          this.playerZoneLeft.innerHTML = `
            <div class="soldier-card player-soldier-card hamtran-card">
              <div class="sc-badge">THIẾT GIÁP</div>
              <div class="sc-name">Hãm Trận Doanh</div>
              <div class="sc-stat-row">
                <span class="sc-tally troop"><em class="sc-glyph">兵</em> 140</span>
                <span class="sc-tally martial"><em class="sc-glyph">武</em> 65</span>
              </div>
            </div>
          `;
        }
        this.audio.playSealStamp();
        this.bus.emit('SHOW_TOAST', '[ 陣 ] Đã bố trí Hãm Trận Doanh án ngữ Tả Dực!');
        this.renderBattlefield();
      } else {
        this.bus.emit('SHOW_TOAST', '[ 陣 ] Tả Dực đã có quân phòng thủ!');
      }
      return;
    }

    // Bạch Mã Nghĩa Tòng
    if (cardType === 'bachma') {
      if (s.mana < 4) {
        this.bus.emit('SHOW_TOAST', '[ 符 ] Cần 4 Hổ Phù để triển khai Bạch Mã Nghĩa Tòng!');
        return;
      }
      if (!s.lanes.right.player) {
        const nextLanes = { ...s.lanes };
        nextLanes.right.player = { id: 'bachma', name: 'Bạch Mã Kỵ', hp: 110, atk: 80, alive: true };
        this.store.setState({
          mana: s.mana - 4,
          lanes: nextLanes
        });
        if (this.playerZoneRight) {
          this.playerZoneRight.innerHTML = `
            <div class="soldier-card player-soldier-card bachma-card">
              <div class="sc-badge">ĐỘT KÍCH</div>
              <div class="sc-name">Bạch Mã Kỵ</div>
              <div class="sc-stat-row">
                <span class="sc-tally troop"><em class="sc-glyph">兵</em> 110</span>
                <span class="sc-tally martial"><em class="sc-glyph">武</em> 80</span>
              </div>
            </div>
          `;
        }
        this.audio.playSealStamp();
        this.phaserFx.cavalryCharge(780, 310);
        this.bus.emit('SHOW_TOAST', '[ 戈 ] Bạch Mã Nghĩa Tòng xuất kích tại Hữu Dực!');
        this.renderBattlefield();
      } else {
        this.bus.emit('SHOW_TOAST', '[ 陣 ] Hữu Dực đã có kỵ binh phong tỏa!');
      }
      return;
    }
  }

  public executeTurn(): void {
    const s = this.store.getState();
    this.audio.playWarDrum();
    this.bus.emit('TRIGGER_SHAKE', 'impact');
    this.phaserFx.slash(500, 250);
    this.bus.emit('SHOW_TOAST', '[ 戈 ] BA QUÂN XUNG TRẬN! QUYẾT TOÁN HIỆP ĐẤU!');

    const nextLanes = { ...s.lanes };
    let bossHp = s.bossHp;
    let wallHp = s.wallHp;

    // Player Attacks: Center Lane
    if (nextLanes.center.player && nextLanes.center.enemy && nextLanes.center.enemy.alive) {
      nextLanes.center.enemy.hp = Math.max(0, nextLanes.center.enemy.hp - nextLanes.center.player.atk);
      this.spawnDamage(this.cardEnemyCenter, nextLanes.center.player.atk, true);
      if (nextLanes.center.enemy.hp === 0) nextLanes.center.enemy.alive = false;
    } else if (nextLanes.center.player) {
      this.spawnDamage(this.bossHpBar, 75);
      bossHp = Math.max(0, bossHp - 75);
    }

    // Left Lane
    if (nextLanes.left.player && nextLanes.left.enemy && nextLanes.left.enemy.alive) {
      nextLanes.left.enemy.hp = Math.max(0, nextLanes.left.enemy.hp - nextLanes.left.player.atk);
      this.spawnDamage(this.cardEnemyLeft, nextLanes.left.player.atk);
      if (nextLanes.left.enemy.hp === 0) nextLanes.left.enemy.alive = false;
    }

    // Right Lane
    if (nextLanes.right.player && nextLanes.right.enemy && nextLanes.right.enemy.alive) {
      nextLanes.right.enemy.hp = Math.max(0, nextLanes.right.enemy.hp - nextLanes.right.player.atk);
      this.spawnDamage(this.cardEnemyRight, nextLanes.right.player.atk);
      if (nextLanes.right.enemy.hp === 0) nextLanes.right.enemy.alive = false;
    }

    // Enemy Attacks on Wall / Soldiers
    if (nextLanes.center.enemy && nextLanes.center.enemy.alive) {
      wallHp = Math.max(0, wallHp - nextLanes.center.enemy.atk);
      this.spawnDamage(this.wallHpBar, nextLanes.center.enemy.atk);
    }

    if (nextLanes.left.enemy && nextLanes.left.enemy.alive) {
      if (nextLanes.left.player) {
        nextLanes.left.player.hp = Math.max(0, nextLanes.left.player.hp - nextLanes.left.enemy.atk);
        this.spawnDamage(this.playerZoneLeft, nextLanes.left.enemy.atk);
        if (nextLanes.left.player.hp === 0) nextLanes.left.player = null;
      } else {
        wallHp = Math.max(0, wallHp - 25);
        this.spawnDamage(this.wallHpBar, 25);
      }
    }

    if (nextLanes.right.enemy && nextLanes.right.enemy.alive) {
      if (nextLanes.right.player) {
        nextLanes.right.player.hp = Math.max(0, nextLanes.right.player.hp - nextLanes.right.enemy.atk);
        this.spawnDamage(this.playerZoneRight, nextLanes.right.enemy.atk);
        if (nextLanes.right.player.hp === 0) nextLanes.right.player = null;
      } else {
        wallHp = Math.max(0, wallHp - 30);
        this.spawnDamage(this.wallHpBar, 30);
      }
    }

    // Boss Intent Resolution
    if (!s.bossIntent.interrupted) {
      wallHp = Math.max(0, wallHp - s.bossIntent.damage);
      this.spawnDamage(this.wallHpBar, s.bossIntent.damage, true);
    }

    // Turn prep
    const nextReservoir = Math.min(3, s.reservoirStage + 1);
    if (nextReservoir > s.reservoirStage) {
      this.bus.emit('SHOW_TOAST', `[ 水 ] Trữ lượng nước sông Thanh Thủy dâng lên Cấp ${nextReservoir}!`);
    }

    this.store.setState({
      bossHp,
      wallHp,
      turn: s.turn + 1,
      mana: Math.min(s.maxMana, s.mana + 4),
      reservoirStage: nextReservoir,
      lanes: nextLanes,
      bossIntent: {
        ...s.bossIntent,
        interrupted: false,
        desc: "Ý Đồ: Chuẩn bị phát động Bạo Liệt Đao Pháp (90 Sát Thương Tường)"
      }
    });

    this.renderBattlefield();
    this.checkVictoryDefeat();
  }

  public restartBattle(): void {
    this.store.setState({
      bossHp: 250,
      wallHp: 500,
      turn: 1,
      mana: 6,
      reservoirStage: 1,
      lanes: {
        left: {
          enemy: { id: 'archer', name: 'Hỏa Tiễn Doanh', hp: 100, atk: 35, alive: true },
          player: null
        },
        center: {
          enemy: { id: 'ram', name: 'Trọng Khí Đục Thành', hp: 160, atk: 50, alive: true },
          player: { id: 'zhaoyun', name: 'Triệu Tử Long', hp: 180, atk: 102, alive: true }
        },
        right: {
          enemy: { id: 'cavalry', name: 'Kỵ Binh Khởi Đột', hp: 120, atk: 45, alive: true },
          player: null
        }
      },
      bossIntent: {
        name: 'Bạo Liệt Đao Pháp',
        damage: 90,
        interrupted: false,
        desc: "Ý Đồ: Chuẩn bị phát động Bạo Liệt Đao Pháp (90 Sát Thương Tường)"
      }
    });

    if (this.playerZoneLeft) {
      this.playerZoneLeft.innerHTML = `
        <div class="deploy-placeholder">
          <span>Kéo thả thẻ bài hoặc bấm vào để triển khai quân</span>
        </div>
      `;
    }
    if (this.playerZoneRight) {
      this.playerZoneRight.innerHTML = `
        <div class="deploy-placeholder">
          <span>Kéo thả thẻ bài hoặc bấm vào để triển khai quân</span>
        </div>
      `;
    }

    this.renderBattlefield();
    this.bus.emit('SHOW_TOAST', '[ 陣 ] Đã trùng chỉnh kỳ cổ! Binh lực sẵn sàng bảo vệ Thanh Châu.');
  }

  private checkVictoryDefeat(): void {
    const s = this.store.getState();
    if (s.bossHp <= 0) {
      setTimeout(() => {
        if (this.victoryModal) this.victoryModal.classList.remove('hidden');
        this.bus.emit('TRIGGER_LIGHTNING', '#fbbf24');
      }, 700);
      return;
    }

    if (s.wallHp <= 0) {
      setTimeout(() => {
        if (this.defeatModal) this.defeatModal.classList.remove('hidden');
        this.audio.playThunder();
        this.bus.emit('TRIGGER_LIGHTNING', 'rgba(220, 38, 38, 0.5)');
      }, 600);
      return;
    }
  }
}
