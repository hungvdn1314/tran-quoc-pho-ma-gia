/**
 * DiegeticHud.ts — 4-Corner Imperial HUD Component
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * BẢO TỒN 100% GIAO DIỆN HOÀNG TRIỀU CỔ PHONG:
 * - Góc Trái Trên: Ngọc Bội Hoàng Triều, Thế Lực Quý Bình An & Cửu Đỉnh Long Lô (Nghi Kỵ)
 * - Giữa Trên: Trướng Kỳ Chương Tiết (Thánh Chỉ Lụa Treo) & Triện Bái Tướng / Tướng Tinh
 * - Góc Phải Trên: Kỳ Môn Sa Bàn (Astrolabe Switcher 3 Tầng Chơi)
 */

import hudTemplate from './hud.html?raw';
import { GameStateStore } from '../../core/GameStateStore';
import { EventBus } from '../../core/EventBus';
import { AudioSynthesizer } from '../../audio/AudioSynthesizer';
import { ProgressionEngine, CHAPTER_MATRIX } from '../../core/ProgressionEngine';
import { MasterGameState } from '../../core/types';

export class DiegeticHud {
  private container: HTMLElement;
  private store: GameStateStore;
  private bus: EventBus;
  private audio: AudioSynthesizer;
  private progression: ProgressionEngine;

  constructor(
    containerId: string = 'top-hud',
    store: GameStateStore,
    bus: EventBus,
    audio: AudioSynthesizer,
    progression: ProgressionEngine
  ) {
    this.container = document.getElementById(containerId) || document.body;
    this.store = store;
    this.bus = bus;
    this.audio = audio;
    this.progression = progression;

    this.mountHTML();
    this.bindDOM();
    this.bindEvents();

    this.store.subscribe((state) => this.update(state));
    this.update(this.store.getState());
  }

  private mountHTML(): void {
    this.container.innerHTML = hudTemplate;
  }

  private bindDOM(): void {
    // Khởi động hoạt ảnh Cửu Đỉnh Long Lô
    this.progression.initCenserSmoke('suspicion-smoke-canvas');
  }

  private bindEvents(): void {
    // Chuyển tầng chơi qua Kỳ Môn Sa Bàn (Astrolabe Switcher)
    const btnVn = document.getElementById('btn-tab-vn');
    btnVn?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.bus.emit('CHANGE_VIEW', 'vn');
    });

    const btnMap = document.getElementById('btn-tab-map');
    btnMap?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.bus.emit('CHANGE_VIEW', 'map');
    });

    const btnBattle = document.getElementById('btn-tab-battle');
    btnBattle?.addEventListener('click', () => {
      this.audio.playWarDrum();
      this.bus.emit('CHANGE_VIEW', 'battle');
    });

    // Mở Bái Tướng Thần Đàn
    const btnGacha = document.getElementById('btn-hud-gacha');
    btnGacha?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.bus.emit('OPEN_GACHA_MODAL', { mode: 'normal' });
    });

    // Mở Danh Tướng Thủy Mặc (Hero Inspector Silk Scroll)
    const btnHeroes = document.getElementById('btn-hud-hero');
    btnHeroes?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.bus.emit('OPEN_HERO_INSPECTOR', 'trieu_van');
    });

    // Mở Tiến Trình Thế Lực Quý Bình An
    const btnFaction = document.getElementById('dynasty-seal-plate');
    btnFaction?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.bus.emit('OPEN_FACTION_MODAL');
    });

    // Mở Ma Trận Kỷ Niệm Cốt Truyện
    const btnMilestones = document.getElementById('btn-open-milestones');
    btnMilestones?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.bus.emit('OPEN_MILESTONE_MODAL');
    });
  }

  public update(state: MasterGameState): void {
    // 1. Tài nguyên ngân khố
    const goldEl = document.getElementById('txt-gold');
    if (goldEl) goldEl.textContent = state.gold.toLocaleString('vi-VN');

    const foodEl = document.getElementById('txt-food');
    if (foodEl) foodEl.textContent = state.food.toLocaleString('vi-VN');

    const apEl = document.getElementById('txt-ap');
    if (apEl) {
      const isMapUnlocked = state.unlockedFeatures.includes('strategyMap') || (state.currentChapterId || 1) >= 15;
      if (isMapUnlocked) {
        apEl.textContent = `${state.ap} / ${state.maxAp}`;
        apEl.style.color = '#fff';
      } else {
        apEl.textContent = 'Khóa (Ch.15)';
        apEl.style.color = '#64748b';
      }
    }

    // 2. Cửu Đỉnh Long Lô (Nghi Kỵ)
    const susEl = document.getElementById('txt-suspicion');
    if (susEl) susEl.textContent = `${state.suspicion}%`;

    const susBar = document.getElementById('bar-suspicion');
    if (susBar) {
      susBar.style.width = `${state.suspicion}%`;
      if (state.suspicion >= 80) {
        susBar.style.background = 'linear-gradient(90deg, #dc2626, #ef4444)';
      } else if (state.suspicion >= 50) {
        susBar.style.background = 'linear-gradient(90deg, #f59e0b, #dc2626)';
      } else {
        susBar.style.background = 'linear-gradient(90deg, #10b981, #f59e0b)';
      }
    }

    const susDesc = document.getElementById('suspicion-status-desc');
    if (susDesc) {
      if (state.suspicion >= 80) {
        susDesc.textContent = 'NGUY CẤP: Vũ Hoàng chuẩn bị ban rượu độc!';
        susDesc.style.color = '#ef4444';
      } else if (state.suspicion >= 50) {
        susDesc.textContent = 'Cảnh báo: Hoàng Đế phái mật thám giám sát!';
        susDesc.style.color = '#f59e0b';
      } else {
        susDesc.textContent = 'Cảnh giới: An Toàn Tương Đối';
        susDesc.style.color = '#94a3b8';
      }
    }

    const censerIcon = document.getElementById('suspicion-censer-icon');
    if (censerIcon) {
      censerIcon.classList.remove('censer-stage-white', 'censer-stage-gold', 'censer-stage-red');
      if (state.suspicion >= 80) {
        censerIcon.classList.add('censer-stage-red');
      } else if (state.suspicion >= 50) {
        censerIcon.classList.add('censer-stage-gold');
      } else {
        censerIcon.classList.add('censer-stage-white');
      }
    }
    this.progression.setSmokeTier(state.suspicion);

    // 3. Số lượng Anh Hồn Lệnh
    const ticketEl = document.getElementById('hud-ticket-count');
    if (ticketEl) ticketEl.textContent = `${state.ticketCount}`;

    // 4. Faction Identity Quý Bình An
    const faction = this.progression.getCurrentFactionStage();
    const sealIcon = document.getElementById('dynasty-seal-icon');
    if (sealIcon) sealIcon.textContent = faction.sealIcon;

    const eraEl = document.getElementById('dynasty-era');
    if (eraEl) eraEl.textContent = faction.factionName;

    const roleEl = document.getElementById('dynasty-role');
    if (roleEl) roleEl.textContent = faction.identityTitle;

    const sealPlate = document.getElementById('dynasty-seal-plate');
    if (sealPlate) {
      sealPlate.title = `Thế lực: ${faction.factionName} · Thân phận: ${faction.identityTitle} (Bấm để xem Lộ trình Khởi Nghiệp)`;
    }

    // 5. Chương Hồi & Tiêu Đề
    const curChapterId = state.currentChapterId || 1;
    const curMilestone = CHAPTER_MATRIX.find((c) => c.id === curChapterId) || CHAPTER_MATRIX[0];

    const chapterBadge = document.getElementById('hud-chapter-badge');
    if (chapterBadge) chapterBadge.textContent = curMilestone.badge;

    const chapterTitle = document.getElementById('hud-chapter-title');
    if (chapterTitle) chapterTitle.textContent = curMilestone.title;

    const chFill = document.getElementById('hud-ch-fill');
    if (chFill) {
      const idx = CHAPTER_MATRIX.findIndex((c) => c.id === curChapterId);
      const pct = Math.min(100, Math.max(10, ((idx + 1) / CHAPTER_MATRIX.length) * 100));
      chFill.style.width = `${pct}%`;
    }

    // 6. Highlight active view in astrolabe
    document.querySelectorAll('.astrolabe-btn[data-view]').forEach((btn) => {
      const v = btn.getAttribute('data-view');
      if (v === state.currentView) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 7. Mở khóa tầng chơi theo tiến trình
    const btnMap = document.getElementById('btn-tab-map') as HTMLButtonElement;
    if (btnMap) {
      const isMapUnlocked = state.unlockedFeatures.includes('strategyMap') || curChapterId >= 15;
      if (isMapUnlocked) {
        btnMap.classList.remove('hidden', 'locked-tab');
        btnMap.disabled = false;
        const lockIcon = document.getElementById('tab-map-lock');
        if (lockIcon) lockIcon.style.display = 'none';
      } else {
        btnMap.classList.add('locked-tab', 'hidden');
        btnMap.disabled = true;
        const lockIcon = document.getElementById('tab-map-lock');
        if (lockIcon) lockIcon.style.display = 'inline-block';
      }
    }

    const btnBattle = document.getElementById('btn-tab-battle') as HTMLButtonElement;
    if (btnBattle) {
      const isBattleUnlocked = state.unlockedFeatures.includes('battleFront') || curChapterId >= 48;
      if (isBattleUnlocked) {
        btnBattle.classList.remove('hidden', 'locked-tab');
        btnBattle.disabled = false;
        const lockIcon = document.getElementById('tab-battle-lock');
        if (lockIcon) lockIcon.style.display = 'none';
      } else {
        btnBattle.classList.add('locked-tab', 'hidden');
        btnBattle.disabled = true;
        const lockIcon = document.getElementById('tab-battle-lock');
        if (lockIcon) lockIcon.style.display = 'inline-block';
      }
    }

    // 8. Bái Tướng & Tra Cứu Tướng
    const btnGacha = document.getElementById('btn-hud-gacha');
    if (btnGacha) {
      const isGachaUnlocked = state.unlockedFeatures.includes('gacha') || curChapterId >= 5;
      if (isGachaUnlocked) {
        btnGacha.classList.remove('hidden');
      } else {
        btnGacha.classList.add('hidden');
      }
    }

    const btnHero = document.getElementById('btn-hud-hero');
    if (btnHero) {
      const isHeroUnlocked = state.ownedHeroIds.length > 0 || curChapterId >= 5;
      if (isHeroUnlocked) {
        btnHero.classList.remove('hidden');
      } else {
        btnHero.classList.add('hidden');
      }
    }
  }
}
