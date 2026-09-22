/**
 * bridge.ts — Bridge connecting prototype/app.js to Master Canon Systems
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 */

import '../prototype/styles.css';
import './styles/diegetic-modals.css';
import { HeroInspectorScroll } from './ui/modals/HeroInspectorScroll';
import { GameStateStore } from './core/GameStateStore';
import { AudioSynthesizer } from './audio/AudioSynthesizer';

window.addEventListener('DOMContentLoaded', () => {
  const store = new GameStateStore();
  const audio = new AudioSynthesizer();

  const heroScroll = new HeroInspectorScroll('hero-inspector-modal', store, audio);

  // Ghi đè hàm openHeroInspector để mở Trục Cuốn Lụa Thủy Mặc thay vì card cũ
  (window as any).openHeroInspector = (heroId?: string) => {
    if ((window as any).state && (window as any).state.gold !== undefined) {
      store.setState({ gold: (window as any).state.gold });
    }
    heroScroll.open(heroId || 'trieu_van');
    audio.playWoodClick();
  };

  // Đồng bộ vàng ngược lại window.state khi người chơi mua Thần Binh / Thiên Phú
  store.subscribe((s) => {
    if ((window as any).state) {
      (window as any).state.gold = s.gold;
      const goldEl = document.getElementById('txt-gold');
      if (goldEl) goldEl.textContent = s.gold.toLocaleString();
    }
  });

  // Gắn sự kiện cho nút ấn triện Danh Tướng
  const btnHero = document.getElementById('btn-hud-hero');
  if (btnHero) {
    btnHero.addEventListener('click', (e) => {
      e.stopPropagation();
      (window as any).openHeroInspector('trieu_van');
    });
  }

  console.log('[Bridge] Trục Cuốn Lụa Thủy Mặc Danh Tướng kết nối thành công!');
});
