# 🛡️ Project Rules: Trấn Quốc Phò Mã Gia (镇国驸马爷)

Welcome to the **Trấn Quốc Phò Mã Gia** repository. Every agent, developer, and automated pipeline working on this project MUST strictly adhere to the following rules:

---

## 1. Typography & Vietnamese Language Inviolable Rules (QUY TẮC BẤT KHẢ XÂM PHẠM)

1. **Strict 4-Layer Typography Architecture**:
   - `--font-title`: `'Playfair Display', 'Cormorant Garamond', 'Lora', 'Noto Serif', serif;` (Imperial titles, chapter headers, province names, faction identity, damage pop numbers). 100% Vietnamese diacritic native.
   - `--font-text`: `'Be Vietnam Pro', 'Segoe UI', -apple-system, sans-serif;` (UI labels, numbers, stat counters, buttons, badges, tooltips).
   - `--font-serif`: `'Lora', 'Noto Serif', 'Palatino Linotype', 'Times New Roman', serif;` (Visual Novel literary narrative, dialogue text, lore excerpts).
   - `--font-seal`: `'ZCOOL XiaoWei', 'Noto Serif SC', 'Songti SC', 'SimSun', 'STSong', 'KaiTi', serif;` (Ancient seal script for cinnabar stamps `[ 駙 ]`, `[ 武 ]`, `[ 青 ]`, `[ 關 ]`, `[ 殿 ]`, `[ 輿 ]`, `[ 戈 ]`, `[ 密 ]`, `[ 卷 ]`).

2. **Absolute Font Blacklist**:
   - 🚫 **NEVER use `Cinzel`, `Trajan`, `Bebas Neue`** or any font lacking the Vietnamese Unicode block (`U+1EA0 - U+1EF9`).
   - Using non-Vietnamese fonts causes "Frankenstein Typography", splitting letters in the same word between different fallback fonts.

3. **3D Canvas & WebGL Texture Safety**:
   - Always re-render Canvas 2D / Three.js textures upon `document.fonts.ready` to ensure high-resolution web fonts are applied without raw fallback glitches.

4. **No Awkward Word-Wrapping**:
   - All chapter badges (`.banner-chapter`) and short headers must use `white-space: nowrap;`.

---

## 2. Art Direction & Visual Cohesion (Tả Thực Cổ Phong Thủy Mặc & Kim Kế)

1. **Harmonic 60 - 30 - 10 Palette**:
   - **60% Obsidian Foundation**: `#080a0d` deep void, `#10141b` surface.
   - **30% Cultural Identity**: Imperial Cinnabar `#991b1b` / `#dc2626`, Northern Steel `#e2e8f0` / `#94a3b8`, Jade `#10b981`.
   - **10% Power Accent**: Molten Gold `#fbbf24` / `#f59e0b` strictly reserved for Primary CTAs, SSR/UR auras, and Kintsugi fractures.
2. **Anti-Slop Disciplines**:
   - NO generic AI-purple gradients.
   - NO excessive glassmorphism.
   - NO emojis as UI icons; always use official SVG vector icons or authentic seal glyphs.
   - NO layout jumps during state changes.

---

## 3. UI/UX & Interaction Standards

1. **Pointer-Events Hierarchy**:
   - Inactive views MUST use `visibility: hidden !important; pointer-events: none !important;` and `.stage-view:not(.active) * { pointer-events: none !important; }` to prevent invisible 3D canvases or scroll panels from hijacking mouse events.
2. **Tactile Accessibility**:
   - Minimum touch target: `44 × 44 px`.
   - Text contrast ratio: WCAG AA (>= `4.5:1`).
   - Keyboard navigation: `Space` advances dialogue, `Escape` closes modals.
