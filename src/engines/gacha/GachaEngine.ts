/**
 * GachaEngine.ts — 100% Authentic Bái Tướng Thần Đàn (Chiêu Mộ Anh Linh)
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * BẢO TỒN 100% NGHI THỨC BÁI TƯỚNG ĐIỆN ẢNH:
 * - Hệ thống âm thanh nghi lễ Web Audio API (chuông đồng, gió xoáy, sấm rền, fanfare)
 * - Canvas tàn lửa bập bùng (Ember canvas particles)
 * - Vòng Bát Quái xoay 3D tụ khí
 * - Tế Thần Lệnh Cửu Long, rạn nứt Kintsugi hoàng kim nổ tung, sóng chấn động phá ấn
 * - Universal Grand Reveal: Splash Art toàn màn hình, triện chu sa dập nổi, Bảng Tứ Duy, lời tuyên thệ
 * - Bảo hiểm Thiên Mệnh 90 lượt (Pity System 90) & Lịch Sử Thỉnh Tướng
 */

import gachaAltarTemplate from './gacha-altar.html?raw';
import { GameStateStore } from '../../core/GameStateStore';
import { EventBus } from '../../core/EventBus';
import { AudioSynthesizer } from '../../audio/AudioSynthesizer';
import { CANON_HEROES, resolveCanonHero } from '../../core/canonHeroesData';

declare const window: any;

export class GachaEngine {
  private container: HTMLElement;
  private store: GameStateStore;
  private bus: EventBus;
  private audio: AudioSynthesizer;

  private isSummoning: boolean = false;
  private summonTimers: any[] = [];
  private pendingGrandRevealFn: (() => void) | null = null;
  private emberInitialized: boolean = false;
  private emberAnimId: any = null;
  private gachaContext: { mode: string; returnKnot: string | null } = { mode: 'normal', returnKnot: null };

  // DOM Elements
  private gachaModal!: HTMLElement;
  private gachaEmberCanvas!: HTMLCanvasElement;
  private gachaTicketDisplay!: HTMLElement;
  private gachaJadeDisplay!: HTMLElement;
  private gachaPityCounter!: HTMLElement;
  private btnGachaSkip!: HTMLElement;
  private altarBtnRow!: HTMLElement;
  private revealActionRow!: HTMLElement;
  private btnDoSummon!: HTMLButtonElement;
  private summonTalisman!: HTMLElement;
  private talismanHint!: HTMLElement;
  private baguaFormation!: HTMLElement;
  private kintsugiFracturesLayer!: HTMLElement;
  private sealShatterFx!: HTMLElement;
  private gachaGrandReveal!: HTMLElement;
  private revealCardImg!: HTMLImageElement;
  private revealSealBadge!: HTMLElement;
  private revealCardName!: HTMLElement;
  private revealCardTitle!: HTMLElement;
  private revealCardRarity!: HTMLElement;
  private revealCardRealm!: HTMLElement;
  private revealQuoteText!: HTMLElement;
  private revealStatForce!: HTMLElement;
  private revealStatCmd!: HTMLElement;
  private revealStatInt!: HTMLElement;
  private revealStatTroop!: HTMLElement;
  private btnRevealInspect!: HTMLElement;
  private btnRevealAgain!: HTMLElement;
  private btnRevealConfirm!: HTMLElement;
  private gachaRulesModal!: HTMLElement;
  private gachaHistoryModal!: HTMLElement;
  private gachaHistoryList!: HTMLElement;

  constructor(containerId: string, store: GameStateStore, bus: EventBus, audio: AudioSynthesizer) {
    this.container = document.getElementById(containerId) || document.body;
    this.store = store;
    this.bus = bus;
    this.audio = audio;

    this.mountHTML();
    this.bindDOM();
    this.bindEvents();

    this.bus.on('OPEN_GACHA_MODAL', (options: any) => this.openGachaModal(options));
    this.bus.on('TRIGGER_HERO_GRAND_REVEAL', (data: any) => this.triggerHeroGrandReveal(data.heroId, data.onComplete));
    this.bus.on('TRIGGER_GACHA_STORY', (data: any) => this.openGachaModal(data));
  }

  private mountHTML(): void {
    this.container.innerHTML = gachaAltarTemplate;
  }

  private bindDOM(): void {
    this.gachaModal = document.getElementById('gacha-modal')!;
    this.gachaEmberCanvas = document.getElementById('gacha-ember-canvas') as HTMLCanvasElement;
    this.gachaTicketDisplay = document.getElementById('gacha-ticket-display')!;
    this.gachaJadeDisplay = document.getElementById('gacha-jade-display')!;
    this.gachaPityCounter = document.getElementById('gacha-pity-counter')!;
    this.btnGachaSkip = document.getElementById('btn-gacha-skip')!;
    this.altarBtnRow = document.getElementById('altar-btn-row')!;
    this.revealActionRow = document.getElementById('reveal-action-row')!;
    this.btnDoSummon = document.getElementById('btn-do-summon') as HTMLButtonElement;
    this.summonTalisman = document.getElementById('summon-talisman')!;
    this.talismanHint = document.getElementById('talisman-hint')!;
    this.baguaFormation = document.getElementById('bagua-formation')!;
    this.kintsugiFracturesLayer = document.getElementById('kintsugi-fractures-layer')!;
    this.sealShatterFx = document.getElementById('seal-shatter-fx')!;
    this.gachaGrandReveal = document.getElementById('gacha-grand-reveal')!;
    this.revealCardImg = document.getElementById('reveal-card-img') as HTMLImageElement;
    this.revealSealBadge = document.getElementById('reveal-seal-badge')!;
    this.revealCardName = document.getElementById('reveal-card-name')!;
    this.revealCardTitle = document.getElementById('reveal-card-title')!;
    this.revealCardRarity = document.getElementById('reveal-card-rarity')!;
    this.revealCardRealm = document.getElementById('reveal-card-realm')!;
    this.revealQuoteText = document.getElementById('reveal-quote-text')!;
    this.revealStatForce = document.getElementById('reveal-stat-force')!;
    this.revealStatCmd = document.getElementById('reveal-stat-cmd')!;
    this.revealStatInt = document.getElementById('reveal-stat-int')!;
    this.revealStatTroop = document.getElementById('reveal-stat-troop')!;
    this.btnRevealInspect = document.getElementById('btn-reveal-inspect')!;
    this.btnRevealAgain = document.getElementById('btn-reveal-again')!;
    this.btnRevealConfirm = document.getElementById('btn-reveal-confirm')!;
    this.gachaRulesModal = document.getElementById('gacha-rules-modal')!;
    this.gachaHistoryModal = document.getElementById('gacha-history-modal')!;
    this.gachaHistoryList = document.getElementById('gacha-history-list')!;
  }

  private bindEvents(): void {
    if (this.btnDoSummon) {
      this.btnDoSummon.addEventListener('click', () => this.performSummon());
    }
    if (this.summonTalisman) {
      this.summonTalisman.addEventListener('click', () => this.performSummon());
    }

    if (this.btnGachaSkip) {
      this.btnGachaSkip.addEventListener('click', () => this.skipSummonRitual());
    }

    const btnCloseGacha = document.getElementById('btn-close-gacha');
    if (btnCloseGacha) {
      btnCloseGacha.addEventListener('click', () => {
        this.closeGachaModal();
      });
    }

    const btnRules = document.getElementById('btn-gacha-rules');
    const btnCloseRules = document.getElementById('btn-close-gacha-rules');
    if (btnRules && this.gachaRulesModal) {
      btnRules.addEventListener('click', () => this.gachaRulesModal.classList.remove('hidden'));
    }
    if (btnCloseRules && this.gachaRulesModal) {
      btnCloseRules.addEventListener('click', () => this.gachaRulesModal.classList.add('hidden'));
    }

    const btnHistory = document.getElementById('btn-gacha-history');
    const btnCloseHistory = document.getElementById('btn-close-gacha-history');
    if (btnHistory) {
      btnHistory.addEventListener('click', () => this.renderSummonHistory());
    }
    if (btnCloseHistory && this.gachaHistoryModal) {
      btnCloseHistory.addEventListener('click', () => this.gachaHistoryModal.classList.add('hidden'));
    }

    if (this.btnRevealInspect) {
      this.btnRevealInspect.addEventListener('click', () => {
        const s = this.store.getState();
        const heroId = s.lastSummonedHero ? s.lastSummonedHero.id : 'hero_zhaoyun';
        this.bus.emit('OPEN_HERO_INSPECTOR', heroId);
      });
    }

    if (this.btnRevealAgain) {
      this.btnRevealAgain.addEventListener('click', () => {
        this.handleSummonAgain();
      });
    }

    if (this.btnRevealConfirm) {
      this.btnRevealConfirm.addEventListener('click', () => {
        this.handleConfirmSummon();
      });
    }
  }

  private initGachaEmbers(): void {
    if (this.emberInitialized || !this.gachaEmberCanvas) return;
    this.emberInitialized = true;
    const canvas = this.gachaEmberCanvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const makeParticle = (randomY: boolean = false) => ({
      x: Math.random() * (canvas.width || 800),
      y: randomY ? Math.random() * (canvas.height || 600) : (canvas.height || 600) + 10,
      size: Math.random() * 2.6 + 1.0,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.65 + 0.25,
      fadeSpeed: Math.random() * 0.004 + 0.002,
      color: Math.random() > 0.35 ? '251, 191, 36' : '239, 68, 68',
      pulse: Math.random() * Math.PI * 2
    });

    const particles: any[] = [];
    for (let i = 0; i < 40; i++) particles.push(makeParticle(true));

    const renderLoop = () => {
      if (!this.gachaModal || this.gachaModal.classList.contains('hidden')) {
        this.emberAnimId = requestAnimationFrame(renderLoop);
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
      this.emberAnimId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
  }

  private clearSummonTimers(): void {
    this.summonTimers.forEach(id => clearTimeout(id));
    this.summonTimers = [];
  }

  private skipSummonRitual(): void {
    if (!this.pendingGrandRevealFn) return;
    this.clearSummonTimers();
    if (this.btnGachaSkip) this.btnGachaSkip.classList.add('hidden');
    const fn = this.pendingGrandRevealFn;
    this.pendingGrandRevealFn = null;
    fn();
  }

  public openGachaModal(options: any = {}): void {
    this.gachaContext = {
      mode: options.mode || 'normal',
      returnKnot: options.returnKnot || null
    };

    const s = this.store.getState();
    if (!s.unlockedFeatures.includes('gacha') && this.gachaContext.mode !== 'story') {
      this.bus.emit('SHOW_TOAST', "[ 封 · PHONG ẤN ] Bái Tướng Đài chưa khai mở! Cần đạt Chương 5 trong kịch bản.");
      return;
    }

    this.resetGachaAltarState();
    this.initGachaEmbers();

    if (this.gachaTicketDisplay) this.gachaTicketDisplay.textContent = String(s.ticketCount);
    if (this.gachaJadeDisplay) this.gachaJadeDisplay.textContent = String(s.jade);
    if (this.gachaPityCounter) this.gachaPityCounter.textContent = `${s.pityCount} / 90`;

    if (this.gachaModal) this.gachaModal.classList.remove('hidden');
  }

  public closeGachaModal(): void {
    if (this.gachaModal) this.gachaModal.classList.add('hidden');
    this.resetGachaAltarState();
  }

  public resetGachaAltarState(): void {
    this.isSummoning = false;
    this.clearSummonTimers();
    this.pendingGrandRevealFn = null;

    if (this.btnGachaSkip) this.btnGachaSkip.classList.add('hidden');
    if (this.altarBtnRow) this.altarBtnRow.classList.remove('hidden');
    if (this.revealActionRow) this.revealActionRow.classList.add('hidden');
    if (this.btnDoSummon) this.btnDoSummon.disabled = false;

    if (this.summonTalisman) {
      this.summonTalisman.classList.remove('talisman-sacrificed');
      this.summonTalisman.style.opacity = '1';
      this.summonTalisman.style.transform = '';
    }
    if (this.talismanHint) {
      this.talismanHint.textContent = "Nhấp vào Cửu Long Thần Lệnh hoặc Phím [Tế Lệnh] để Khởi Động Trận Đồ";
    }

    if (this.baguaFormation) this.baguaFormation.classList.remove('fast-spin');
    if (this.kintsugiFracturesLayer) this.kintsugiFracturesLayer.classList.add('hidden');
    if (this.sealShatterFx) this.sealShatterFx.classList.add('hidden');
    if (this.gachaGrandReveal) this.gachaGrandReveal.classList.add('hidden');
  }

  public renderSummonHistory(): void {
    if (!this.gachaHistoryList) return;
    this.gachaHistoryList.innerHTML = '';
    const s = this.store.getState();

    if (!s.summonHistory || s.summonHistory.length === 0) {
      this.gachaHistoryList.innerHTML = `
        <div style="text-align: center; color: var(--stone-warm); padding: 28px; font-style: italic; font-family: var(--font-serif);">
          Chưa có điển tích thỉnh triệu nào được ghi chép vào Thiên Mệnh Giản.
        </div>
      `;
    } else {
      const reversed = [...s.summonHistory].reverse();
      reversed.forEach((item: any) => {
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
        `;
        row.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="tag-badge ${badgeClass}" style="font-weight: 700; padding: 2px 7px;">${hero.rarity}</span>
            <strong style="color: ${isHigh ? '#fbbf24' : '#e2e8f0'}; font-family: var(--font-title); font-size: 1.05rem;">${hero.name}</strong>
            <span style="color: var(--stone-warm); font-size: 0.8rem;">(${hero.troop_type || hero.troopType || 'Binh Chủng'})</span>
          </div>
          <div style="text-align: right; font-size: 0.8rem; color: var(--stone-warm);">
            <div>Thiên mệnh: <strong style="color: #38bdf8;">${item.pity}</strong>/90</div>
            <div style="font-size: 0.72rem; opacity: 0.7;">${item.timestamp}</div>
          </div>
        `;
        this.gachaHistoryList.appendChild(row);
      });
    }

    if (this.gachaHistoryModal) this.gachaHistoryModal.classList.remove('hidden');
  }

  public performSummon(): void {
    if (this.isSummoning) return;
    const s = this.store.getState();

    if (s.ticketCount < 1 && s.jade < 160) {
      this.bus.emit('SHOW_TOAST', '[ 警 · CẢNH BÁO ] Không có Anh Hồn Lệnh hoặc đủ 160 Kim Bảo!');
      return;
    }

    const nextTickets = s.ticketCount >= 1 ? s.ticketCount - 1 : s.ticketCount;
    const nextJade = s.ticketCount < 1 ? s.jade - 160 : s.jade;
    const nextPity = s.pityCount + 1;

    this.isSummoning = true;
    this.clearSummonTimers();
    if (this.btnDoSummon) this.btnDoSummon.disabled = true;
    if (this.btnGachaSkip) this.btnGachaSkip.classList.remove('hidden');

    if (this.gachaTicketDisplay) this.gachaTicketDisplay.textContent = String(nextTickets);
    if (this.gachaJadeDisplay) this.gachaJadeDisplay.textContent = String(nextJade);
    if (this.gachaPityCounter) this.gachaPityCounter.textContent = `${nextPity} / 90`;

    // Roll Logic
    let pulledHero: any = null;
    const heroes = CANON_HEROES;

    if (this.gachaContext.mode === 'story' || (!s.ownedHeroIds.includes('trieu_van') && !s.ownedHeroIds.includes('hero_zhaoyun'))) {
      pulledHero = resolveCanonHero('trieu_van') || heroes.find(h => h.id === 'trieu_van') || heroes[0];
    } else {
      let ssrProb = 0.016;
      if (nextPity >= 74) ssrProb += (nextPity - 74 + 1) * 0.06;
      if (nextPity >= 90) ssrProb = 1.0;

      const roll = Math.random();
      if (roll < ssrProb) {
        const ssrPool = heroes.filter(h => h.rarity === 'SSR' || h.rarity === 'UR');
        pulledHero = ssrPool[Math.floor(Math.random() * ssrPool.length)];
      } else if (roll < ssrProb + 0.13) {
        const srPool = heroes.filter(h => h.rarity === 'SR');
        pulledHero = srPool[Math.floor(Math.random() * srPool.length)] || heroes[0];
      } else {
        pulledHero = heroes[Math.floor(Math.random() * heroes.length)];
      }
    }

    pulledHero = resolveCanonHero(pulledHero.id) || pulledHero;

    const historyRecord = {
      hero: pulledHero,
      pity: nextPity,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    this.store.setState({
      ticketCount: nextTickets,
      jade: nextJade,
      pityCount: pulledHero.rarity === 'SSR' || pulledHero.rarity === 'UR' ? 0 : nextPity,
      lastSummonedHero: pulledHero,
      ownedHeroIds: [...new Set([...s.ownedHeroIds, pulledHero.id])],
      summonHistory: [...(s.summonHistory || []), historyRecord]
    });

    const isHighRarity = pulledHero.rarity === 'SSR' || pulledHero.rarity === 'UR';

    // Phase 1: Tế Phù
    this.audio.playBellChime();
    if (this.summonTalisman) this.summonTalisman.classList.add('talisman-sacrificed');
    if (this.talismanHint) this.talismanHint.textContent = "Đang Tế Phù... Linh khí Thượng Cổ khởi phát!";

    const executeGrandReveal = () => {
      this.clearSummonTimers();
      if (this.btnGachaSkip) this.btnGachaSkip.classList.add('hidden');
      if (this.kintsugiFracturesLayer) this.kintsugiFracturesLayer.classList.add('hidden');
      if (this.sealShatterFx) this.sealShatterFx.classList.add('hidden');
      if (this.baguaFormation) this.baguaFormation.classList.remove('fast-spin');

      this.audio.playGrandFanfare();

      if (this.revealCardImg) {
        this.revealCardImg.src = pulledHero.splashUrl || pulledHero.avatarUrl || 'assets/images/seal_placeholder.png';
      }
      if (this.revealSealBadge) {
        this.revealSealBadge.textContent = pulledHero.sealGlyph || pulledHero.name[0] || '將';
      }
      if (this.revealCardName) {
        this.revealCardName.textContent = pulledHero.name.toUpperCase();
      }
      if (this.revealCardTitle) {
        this.revealCardTitle.textContent = `${pulledHero.title || 'Võ Tướng'} · Võ Lực ${pulledHero.baseForce || pulledHero.stats?.force || 90}`;
      }
      if (this.revealCardRarity) {
        const rText = pulledHero.rarity === 'UR' ? 'CHIẾN THẦN TRUYỀN THUYẾT' : (pulledHero.rarity === 'SSR' ? 'HOÀNG KIM THƯỢNG TƯỚNG' : 'VẠN KIM VÕ TƯỚNG');
        this.revealCardRarity.textContent = `${pulledHero.rarity} · ${rText}`;
      }
      if (this.revealCardRealm) {
        this.revealCardRealm.textContent = `Cảnh giới: ${pulledHero.realmName || pulledHero.realm || 'Hoàng Giả Cảnh'}`;
      }
      if (this.revealQuoteText) {
        this.revealQuoteText.textContent = `“${pulledHero.quote || 'Mạt tướng phụng mệnh quy vị, vì Chúa Công bình định giang sơn!'}”`;
      }

      if (this.revealStatForce) this.revealStatForce.textContent = String(pulledHero.baseForce || pulledHero.stats?.force || 90);
      if (this.revealStatCmd) this.revealStatCmd.textContent = String(pulledHero.baseCommand || pulledHero.stats?.command || 85);
      if (this.revealStatInt) this.revealStatInt.textContent = String(pulledHero.baseIntelligence || pulledHero.stats?.intelligence || 75);
      if (this.revealStatTroop) this.revealStatTroop.textContent = pulledHero.troopType || 'Bạch Mã Nghĩa Tòng';

      if (this.gachaGrandReveal) this.gachaGrandReveal.classList.remove('hidden');
      if (this.altarBtnRow) this.altarBtnRow.classList.add('hidden');
      if (this.revealActionRow) this.revealActionRow.classList.remove('hidden');

      this.bus.emit('SHOW_TOAST', `[ 召 · THỈNH TRIỆU ] THÀNH CÔNG: [${pulledHero.rarity}] ${pulledHero.name}!`);
      this.isSummoning = false;
    };

    this.pendingGrandRevealFn = executeGrandReveal;

    // Phase 2: Tụ Khí Bát Quái
    const t1 = setTimeout(() => {
      if (this.baguaFormation) this.baguaFormation.classList.add('fast-spin');
      this.audio.playVortexWhoosh();
      if (isHighRarity) {
        if (this.kintsugiFracturesLayer) this.kintsugiFracturesLayer.classList.remove('hidden');
        this.bus.emit('TRIGGER_LIGHTNING', '#FFD700');
        this.bus.emit('TRIGGER_SHAKE', 'subtle');
        if (this.talismanHint) this.talismanHint.textContent = "Thiên cơ chấn động! Kim quang vạn trượng tụ hội!";
      } else {
        this.bus.emit('TRIGGER_LIGHTNING', '#38bdf8');
        if (this.talismanHint) this.talismanHint.textContent = "Linh khí tụ hội!";
      }
    }, 550);
    this.summonTimers.push(t1);

    // Phase 3: Phá Ấn
    const t2 = setTimeout(() => {
      if (this.sealShatterFx) this.sealShatterFx.classList.remove('hidden');
      this.audio.playThunder();
      this.bus.emit('TRIGGER_SHAKE', 'impact');
    }, 1450);
    this.summonTimers.push(t2);

    // Phase 4: Giáng Thế
    const t3 = setTimeout(() => {
      executeGrandReveal();
    }, 2050);
    this.summonTimers.push(t3);
  }

  public triggerHeroGrandReveal(heroId: string, onComplete?: () => void): void {
    const hero = CANON_HEROES.find(h => h.id === heroId || h.id.includes(heroId)) || CANON_HEROES[0];
    if (!hero) return;

    this.resetGachaAltarState();
    this.isSummoning = true;
    this.initGachaEmbers();
    this.clearSummonTimers();

    if (this.gachaModal) this.gachaModal.classList.remove('hidden');
    if (this.altarBtnRow) this.altarBtnRow.classList.add('hidden');
    if (this.summonTalisman) this.summonTalisman.classList.add('talisman-sacrificed');
    if (this.btnGachaSkip) this.btnGachaSkip.classList.remove('hidden');

    this.audio.playBellChime();

    if (this.baguaFormation) this.baguaFormation.classList.add('fast-spin');
    if (this.kintsugiFracturesLayer) this.kintsugiFracturesLayer.classList.remove('hidden');
    this.bus.emit('TRIGGER_LIGHTNING', '#FFD700');
    this.bus.emit('TRIGGER_SHAKE', 'subtle');

    const executeReveal = () => {
      this.clearSummonTimers();
      if (this.btnGachaSkip) this.btnGachaSkip.classList.add('hidden');
      if (this.kintsugiFracturesLayer) this.kintsugiFracturesLayer.classList.add('hidden');
      if (this.sealShatterFx) this.sealShatterFx.classList.add('hidden');
      if (this.baguaFormation) this.baguaFormation.classList.remove('fast-spin');

      this.audio.playGrandFanfare();

      if (this.revealCardImg) this.revealCardImg.src = hero.splashUrl || hero.avatarUrl || 'assets/images/seal_placeholder.png';
      if (this.revealSealBadge) this.revealSealBadge.textContent = hero.sealGlyph || hero.name[0] || '將';
      if (this.revealCardName) this.revealCardName.textContent = hero.name.toUpperCase();
      if (this.revealCardTitle) this.revealCardTitle.textContent = `${hero.title || 'Võ Tướng'} · Võ Lực ${hero.baseForce || 90}`;
      if (this.revealCardRarity) this.revealCardRarity.textContent = `${hero.rarity} · HOÀNG KIM THƯỢNG TƯỚNG`;
      if (this.revealCardRealm) this.revealCardRealm.textContent = `Cảnh giới: ${hero.realmName || 'Hoàng Giả Cảnh'}`;
      if (this.revealQuoteText) this.revealQuoteText.textContent = `“${hero.quote || 'Mạt tướng phụng mệnh quy vị!'}”`;

      if (this.revealStatForce) this.revealStatForce.textContent = String(hero.baseForce || 90);
      if (this.revealStatCmd) this.revealStatCmd.textContent = String(hero.baseCommand || 85);
      if (this.revealStatInt) this.revealStatInt.textContent = String(hero.baseIntelligence || 75);
      if (this.revealStatTroop) this.revealStatTroop.textContent = hero.troopType || 'Bạch Mã Nghĩa Tòng';

      if (this.gachaGrandReveal) this.gachaGrandReveal.classList.remove('hidden');
      if (this.revealActionRow) this.revealActionRow.classList.remove('hidden');

      this.bus.emit('SHOW_TOAST', `[ 召 · THỈNH TRIỆU ] THÀNH CÔNG: [${hero.rarity}] ${hero.name}!`);

      const onStoryConfirm = () => {
        if (this.gachaModal) this.gachaModal.classList.add('hidden');
        this.resetGachaAltarState();
        this.btnRevealConfirm.removeEventListener('click', onStoryConfirm);
        this.btnRevealConfirm.addEventListener('click', () => this.handleConfirmSummon());
        if (onComplete) onComplete();
      };
      this.btnRevealConfirm.addEventListener('click', onStoryConfirm);
    };

    this.pendingGrandRevealFn = executeReveal;

    const t1 = setTimeout(() => {
      if (this.sealShatterFx) this.sealShatterFx.classList.remove('hidden');
      this.audio.playThunder();
      this.bus.emit('TRIGGER_SHAKE', 'impact');
    }, 700);
    this.summonTimers.push(t1);

    const t2 = setTimeout(() => {
      executeReveal();
    }, 1400);
    this.summonTimers.push(t2);
  }

  private handleConfirmSummon(): void {
    if (this.gachaModal) this.gachaModal.classList.add('hidden');
    this.resetGachaAltarState();
    const s = this.store.getState();
    const heroName = s.lastSummonedHero ? s.lastSummonedHero.name : "Triệu Tử Long";
    this.bus.emit('SHOW_TOAST', `[ 武 · QUY VỊ ] Đã tiếp nhận danh tướng! ${heroName} đã quy vị dưới trướng.`);

    if (this.gachaContext.mode === 'story' || this.gachaContext.returnKnot) {
      const returnKnot = this.gachaContext.returnKnot || 'trieu_van_arrival';
      this.gachaContext = { mode: 'normal', returnKnot: null };
      this.bus.emit('JUMP_TO_KNOT', returnKnot);
    }
  }

  private handleSummonAgain(): void {
    const s = this.store.getState();
    if (s.ticketCount < 1 && s.jade < 160) {
      this.bus.emit('SHOW_TOAST', "[ 警 · CẢNH BÁO ] Không có Anh Hồn Lệnh hoặc đủ 160 Kim Bảo để thỉnh triệu tiếp!");
      return;
    }
    this.resetGachaAltarState();
    this.performSummon();
  }
}
