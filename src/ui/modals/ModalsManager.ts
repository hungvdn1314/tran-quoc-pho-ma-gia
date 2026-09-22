/**
 * ModalsManager.ts — Manages Diegetic Game Modals
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * - Faction & Identity Progression Modal (Tiến Trình Thế Lực Quý Bình An)
 * - Milestone Matrix Modal (Ma Trận Khai Mở Tính Năng Theo Chương)
 * - Feature Unlock Event Modal (Thông Báo Thiên Cơ Khai Mở)
 * - S-Rank Victory Triumph Modal (popup chiến thắng 3 làn)
 */

import modalsTemplate from './modals.html?raw';
import { GameStateStore } from '../../core/GameStateStore';
import { EventBus } from '../../core/EventBus';
import { AudioSynthesizer } from '../../audio/AudioSynthesizer';
import { ProgressionEngine, FACTION_STAGES, CHAPTER_MATRIX } from '../../core/ProgressionEngine';

export class ModalsManager {
  private container: HTMLElement;
  private store: GameStateStore;
  private bus: EventBus;
  private audio: AudioSynthesizer;
  private progression: ProgressionEngine;

  // DOM Elements
  private factionModal!: HTMLElement;
  private factionCurrentCard!: HTMLElement;
  private factionStagesList!: HTMLElement;
  private btnCloseFaction!: HTMLElement;

  private milestoneModal!: HTMLElement;
  private matrixTimelineList!: HTMLElement;
  private btnCloseMatrix!: HTMLElement;

  private unlockModal!: HTMLElement;
  private unlockIcon!: HTMLElement;
  private unlockTitle!: HTMLElement;
  private unlockName!: HTMLElement;
  private unlockLore!: HTMLElement;
  private unlockEffect!: HTMLElement;
  private btnCloseUnlock!: HTMLElement;

  constructor(
    containerId: string = 'modals-mount-point',
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
  }

  private mountHTML(): void {
    this.container.innerHTML = modalsTemplate;
  }

  private bindDOM(): void {
    // Faction Modal
    this.factionModal = document.getElementById('faction-progression-modal')!;
    this.factionCurrentCard = document.getElementById('faction-current-card')!;
    this.factionStagesList = document.getElementById('faction-stages-list')!;
    this.btnCloseFaction = document.getElementById('btn-close-faction')!;

    // Milestone Modal
    this.milestoneModal = document.getElementById('milestone-matrix-modal')!;
    this.matrixTimelineList = document.getElementById('matrix-timeline-list')!;
    this.btnCloseMatrix = document.getElementById('btn-close-matrix')!;

    // Unlock Event Modal
    this.unlockModal = document.getElementById('unlock-event-modal')!;
    this.unlockIcon = document.getElementById('unlock-modal-icon')!;
    this.unlockTitle = document.getElementById('unlock-modal-title')!;
    this.unlockName = document.getElementById('unlock-modal-name')!;
    this.unlockLore = document.getElementById('unlock-modal-lore')!;
    this.unlockEffect = document.getElementById('unlock-modal-effect')!;
    this.btnCloseUnlock = document.getElementById('btn-close-unlock')!;
  }

  private bindEvents(): void {
    // Faction Close
    this.btnCloseFaction?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.factionModal?.classList.add('hidden');
    });

    // Milestone Close
    this.btnCloseMatrix?.addEventListener('click', () => {
      this.audio.playWoodClick();
      this.milestoneModal?.classList.add('hidden');
    });

    // Unlock Modal Close
    this.btnCloseUnlock?.addEventListener('click', () => {
      this.audio.playSealStamp();
      this.unlockModal?.classList.add('hidden');
    });

    // Bus events
    this.bus.on('OPEN_FACTION_MODAL', () => this.openFactionModal());
    this.bus.on('OPEN_MILESTONE_MODAL', () => this.openMilestoneModal());
    this.bus.on('SHOW_UNLOCK_MODAL', (info: any) => this.showUnlockModal(info));

    // Keyboard ESC to close any modal
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  public openFactionModal(): void {
    this.audio.playWoodClick();
    this.renderFactionModal();
    this.factionModal?.classList.remove('hidden');
  }

  public renderFactionModal(): void {
    if (!this.factionCurrentCard || !this.factionStagesList) return;
    const current = this.progression.getCurrentFactionStage();
    const ch = this.store.getState().currentChapterId || 1;

    // Render Bệ Ngọc Thân Phận Đương Thời (Jade Plaque Pedestal)
    this.factionCurrentCard.innerHTML = `
      <div class="faction-jade-pedestal">
        <div class="pedestal-seal">${current.sealIcon}</div>
        <div class="pedestal-info">
          <span class="pedestal-tag">THẾ LỰC & THÂN PHẬN HIỆN THỜI (HỒI 1 · CHƯƠNG ${ch})</span>
          <h3 class="pedestal-name">${current.factionName}</h3>
          <span class="pedestal-role">${current.identityTitle} — ${current.fullTitle}</span>
          <p class="pedestal-desc">${current.description}</p>
        </div>
      </div>
    `;

    // Render 5 Đạo Phù Tiết Hoàng Triều (Five Imperial Tallies)
    this.factionStagesList.innerHTML = '';
    FACTION_STAGES.forEach((s) => {
      const isCurrent = s.id === current.id;
      const isCompleted = s.id < current.id;

      let statusClass = 'locked';
      let statusBadge = '<span class="tally-status-seal seal-locked">[ 待 · VỊ KHỞI ]</span>';
      if (isCurrent) {
        statusClass = 'active';
        statusBadge = '<span class="tally-status-seal seal-active">[ 執 · CHẤP CHƯỞNG ]</span>';
      } else if (isCompleted) {
        statusClass = 'completed';
        statusBadge = '<span class="tally-status-seal seal-completed">[ 履 · ĐÃ QUA ]</span>';
      }

      const stageEl = document.createElement('div');
      stageEl.className = `imperial-tally-item ${statusClass}`;
      stageEl.innerHTML = `
        <div class="tally-seal-box">${s.sealIcon}</div>
        <div class="tally-body">
          <div class="tally-header">
            <span class="tally-title">${s.factionName} · ${s.identityTitle}</span>
            ${statusBadge}
          </div>
          <div class="tally-range">Chương ${s.minChapter} - ${s.maxChapter === 999 ? 'Về Sau' : s.maxChapter} · ${s.fullTitle}</div>
          <p class="tally-desc">${s.description}</p>
          <div class="tally-buff">[ 賜 · Mở Rộng ] ${s.buffSummary}</div>
        </div>
      `;
      this.factionStagesList.appendChild(stageEl);
    });
  }

  public openMilestoneModal(): void {
    this.audio.playWoodClick();
    this.renderMilestoneTimeline();
    this.milestoneModal?.classList.remove('hidden');
  }

  public renderMilestoneTimeline(): void {
    if (!this.matrixTimelineList) return;
    this.matrixTimelineList.innerHTML = '';

    const numeralMap: Record<number, string> = {
      1: '壹', 5: '伍', 8: '捌', 10: '拾', 15: '拾伍',
      20: '贰拾', 27: '贰拾柒', 35: '叁拾伍', 43: '肆拾叁', 48: '肆拾捌', 52: '伍拾贰',
      63: '陆拾叁', 97: '玖拾柒', 100: '佰', 114: '佰拾肆', 140: '佰肆拾',
      150: '佰伍拾', 200: '贰佰', 201: '贰佰零壹', 255: '贰佰伍拾伍',
      303: '叁佰零叁', 386: '叁佰捌拾陆', 411: '肆佰拾壹', 725: '柒佰贰拾伍',
      817: '捌佰拾柒', 1509: '壹仟伍佰零玖'
    };

    CHAPTER_MATRIX.forEach((c) => {
      const item = document.createElement('div');
      const isCurrent = c.active;
      const isUnlocked = c.unlocked;

      let statusClass = 'locked';
      let statusTag = '<span class="chrono-seal-tag seal-locked">[ 封 · PHONG ẤN ]</span>';
      if (isCurrent) {
        statusClass = 'current';
        statusTag = '<span class="chrono-seal-tag seal-current">[ 臨 · ĐƯƠNG THỜI ]</span>';
      } else if (isUnlocked) {
        statusClass = 'unlocked';
        statusTag = '<span class="chrono-seal-tag seal-unlocked">[ 開 · ĐÃ KHAI ]</span>';
      }

      item.className = `chrono-node ${statusClass}`;

      const glyph = numeralMap[c.id] || String(c.id);

      item.innerHTML = `
        <div class="chrono-tally-seal">${glyph}</div>
        <div class="chrono-meta-col">
          <div class="chrono-title-row">
            <span class="chrono-title">${c.badge} · ${c.title}</span>
            ${statusTag}
          </div>
          <p class="chrono-lore">${c.lore}</p>
          <div class="chrono-reward-seal">[ 賜 · Ban Thưởng ] ${c.featureUnlocked}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        if (!c.unlocked) {
          this.bus.emit('SHOW_TOAST', `[ 密 ] ${c.badge} chưa mở phong ấn! Hãy hoàn thành cốt truyện để tiến tới.`);
          return;
        }
        if (c.knot) {
          this.audio.playWoodClick();
          this.milestoneModal?.classList.add('hidden');
          this.bus.emit('JUMP_TO_KNOT', { knot: c.knot, chapterId: c.id });
        }
      });

      this.matrixTimelineList.appendChild(item);
    });
  }

  public showUnlockModal(info: any): void {
    if (!this.unlockModal) return;

    const sealEl = document.getElementById('unlock-modal-seal');
    const originEl = document.getElementById('unlock-modal-origin');

    if (sealEl) sealEl.textContent = info.seal || '勅';
    if (originEl) originEl.textContent = info.origin || 'THIÊN CƠ HỆ THỐNG · THÁNH DỤ BAN THƯỞNG';
    if (this.unlockIcon) this.unlockIcon.innerHTML = `<span class="medallion-seal">${info.seal || '令'}</span>`;
    if (this.unlockTitle) this.unlockTitle.textContent = info.title || 'PHỤNG THIÊN THỪA VẬN BAN THƯỞNG';
    if (this.unlockName) this.unlockName.textContent = info.name || '';
    if (this.unlockLore) this.unlockLore.textContent = info.lore || '';
    if (this.unlockEffect) this.unlockEffect.textContent = info.effect || '';

    this.triggerLightning();
    this.audio.playSealStamp();
    this.unlockModal.classList.remove('hidden');
  }

  private triggerLightning(): void {
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
    }, 150);
  }

  public closeAllModals(): void {
    this.factionModal?.classList.add('hidden');
    this.milestoneModal?.classList.add('hidden');
    this.unlockModal?.classList.add('hidden');
  }
}
