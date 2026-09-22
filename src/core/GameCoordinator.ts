/**
 * GameCoordinator.ts — Master Orchestrator for Trấn Quốc Phò Mã Gia
 * 
 * BẢO TỒN 100% TRẢI NGHIỆM ĐẾ NGHIỆP:
 * - Khởi tạo theo chuỗi tuần tự chính xác:
 *   1. GameStateStore & EventBus
 *   2. AudioSynthesizer (Web Audio API)
 *   3. ProgressionEngine (Cửu Đỉnh Long Lô & Faction Stages)
 *   4. ModalsManager (Faction, Milestones, Unlocks)
 *   6. HeroInspectorScroll (Tranh Cuộn Lụa Thủy Mặc)
 *   7. DiegeticHud (Hoàng Triều Khung Hoa Văn HUD)
 *   8. VisualNovelEngine (Kịch bản Ink & Hộp thoại)
 *   9. ThreeWarTable (Sa Bàn 3D gỗ mun nẹp đồng)
 *   10. TacticalBattleEngine (Sa Trường Thẻ Bài 3 Làn)
 *   11. GachaEngine (Bái Tướng Thần Đàn)
 * - Quản lý chuyển đổi 3 tầng chơi (switchView: 'vn' | 'map' | 'battle')
 * - Quản lý Toast thông báo phong cách cổ phong
 */

import { GameStateStore } from './GameStateStore';
import { EventBus } from './EventBus';
import { AudioSynthesizer } from '../audio/AudioSynthesizer';
import { ProceduralAmbientBgm } from '../audio/ProceduralAmbientBgm';
import { ProgressionEngine } from './ProgressionEngine';
import { DiegeticHud } from '../ui/hud/DiegeticHud';
import { ModalsManager } from '../ui/modals/ModalsManager';
import { HeroInspectorScroll } from '../ui/modals/HeroInspectorScroll';
import { VisualNovelEngine } from '../engines/narrative/VisualNovelEngine';
import { ThreeWarTable } from '../engines/strategy/ThreeWarTable';
import { TacticalBattleEngine } from '../engines/combat/TacticalBattleEngine';
import { GachaEngine } from '../engines/gacha/GachaEngine';

export class GameCoordinator {
  public store: GameStateStore;
  public bus: EventBus;
  public audio: AudioSynthesizer;
  public bgm: ProceduralAmbientBgm;
  public progression: ProgressionEngine;
  public modals: ModalsManager;
  public heroInspector: HeroInspectorScroll;
  public hud: DiegeticHud;
  public vn: VisualNovelEngine;
  public warTable: ThreeWarTable;
  public battle: TacticalBattleEngine;
  public gacha: GachaEngine;

  constructor() {
    // 1. Core State & Communication
    this.bus = new EventBus();
    this.store = new GameStateStore();
    this.audio = new AudioSynthesizer();
    this.bgm = new ProceduralAmbientBgm();
    this.progression = new ProgressionEngine(this.store, this.bus);

    // 2. UI Shell & Modals
    this.modals = new ModalsManager('modals-mount-point', this.store, this.bus, this.audio, this.progression);
    this.heroInspector = new HeroInspectorScroll('hero-inspector-modal', this.store, this.audio);
    this.hud = new DiegeticHud('top-hud', this.store, this.bus, this.audio, this.progression);

    // 4. Game Engines
    this.vn = new VisualNovelEngine('view-vn', this.store, this.bus, this.audio);
    this.warTable = new ThreeWarTable('view-map', this.store, this.bus, this.audio);
    this.battle = new TacticalBattleEngine('view-battle', this.store, this.bus, this.audio);
    this.gacha = new GachaEngine('gacha-mount-point', this.store, this.bus, this.audio);

    // 5. Global Event Routing
    this.bindGlobalEvents();

    // 6. Expose globals for bridge backwards-compatibility & dev tools
    (window as any).gameStore = this.store;
    (window as any).gameBus = this.bus;
    (window as any).gameAudio = this.audio;
    (window as any).gameBgm = this.bgm;
    (window as any).gameCoordinator = this;
    (window as any).switchView = (view: string) => this.switchView(view as any);

    // 7. Start initial game state at Visual Novel Chapter 1
    this.start();
  }

  private bindGlobalEvents(): void {
    this.bus.on('CHANGE_VIEW', (viewName: 'vn' | 'map' | 'battle') => {
      this.switchView(viewName);
    });

    this.bus.on('SHOW_TOAST', (msg: string, isHighlight?: boolean) => {
      this.showToast(msg, isHighlight);
    });

    this.bus.on('OPEN_HERO_INSPECTOR', (heroId: string) => {
      this.heroInspector.open(heroId || 'trieu_van');
    });

    this.bus.on('TRIGGER_LIGHTNING', (color?: string) => {
      this.triggerLightning(color);
    });
  }

  public switchView(viewName: 'vn' | 'map' | 'battle'): void {
    const s = this.store.getState();
    const curCh = s.currentChapterId || 1;

    // Check unlocks
    if (viewName === 'map') {
      const isMapUnlocked = s.unlockedFeatures.includes('strategyMap') || curCh >= 15;
      if (!isMapUnlocked) {
        this.showToast('[ 密 · MẬT CHỈ ] Đang thám sát Sa Bàn Quân Cơ — Hoàn thành Ch.15 để mở quyền điều binh!');
      }
    } else if (viewName === 'battle') {
      const isBattleUnlocked = s.unlockedFeatures.includes('battleFront') || curCh >= 48;
      if (!isBattleUnlocked) {
        this.showToast('[ 禁 · QUÂN CẤM ] Tầng 3: Sa Trường Thẻ Bài bị khóa! Cần tiến tới Chương 48 (Đại Chiến Thanh Châu).');
        return;
      }
    }

    this.store.setState({ currentView: viewName });

    document.body.classList.remove('view-mode-vn', 'view-mode-map', 'view-mode-battle');
    document.body.classList.add(`view-mode-${viewName}`);

    const viewVn = document.getElementById('view-vn');
    const viewMap = document.getElementById('view-map');
    const viewBattle = document.getElementById('view-battle');

    if (viewVn) viewVn.classList.toggle('active', viewName === 'vn');
    if (viewMap) viewMap.classList.toggle('active', viewName === 'map');
    if (viewBattle) viewBattle.classList.toggle('active', viewName === 'battle');

    if (viewName === 'battle') {
      this.battle.onViewActivated();
    } else if (viewName === 'map') {
      this.warTable.onViewActivated();
    } else if (viewName === 'vn') {
      this.vn.onViewActivated();
    }
  }

  public showToast(msg: string, isHighlight: boolean = false): void {
    const toast = document.createElement('div');
    toast.className = 'hud-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = isHighlight ? 'linear-gradient(90deg, #b45309, #78350f)' : 'rgba(15, 23, 42, 0.95)';
    toast.style.border = isHighlight ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.15)';
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
    toast.style.fontFamily = "var(--font-text), sans-serif";
    toast.textContent = msg;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  public triggerLightning(color: string = 'rgba(255, 215, 0, 0.4)'): void {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.background = color.startsWith('rgba') ? color : 'rgba(255, 215, 0, 0.4)';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.4s ease';
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 400);
    }, 150);
  }

  public start(): void {
    this.switchView('vn');
    this.vn.startStory('chapter_1_start');
  }
}
