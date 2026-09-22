/**
 * main.ts — Master Application Entry Point
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * 100% MODULAR ARCHITECTURE (OPTION B):
 * - CSS: src/styles/main.css (decomposed into modular scoped stylesheets)
 * - HTML: Clean mount points in index.html with ?raw template injections
 * - TypeScript: GameCoordinator orchestrating core state, diegetic HUD, and all 3 gameplay stages
 */

import './styles/main.css';
import { GameCoordinator } from './core/GameCoordinator';

function init(): void {
  console.log('[Trấn Quốc Phò Mã Gia] Khởi động hệ thống modular Option B...');
  const coordinator = new GameCoordinator();
  console.log('[Trấn Quốc Phò Mã Gia] Khởi tạo hoàn tất!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
