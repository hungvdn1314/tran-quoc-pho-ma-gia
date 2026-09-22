import os

with open('prototype/styles.css', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in prototype/styles.css: {len(lines)}")

# Let's write the decompose script
os.makedirs('src/styles', exist_ok=True)

# 1. base.css: Lines 1-78
base_lines = lines[0:78]
with open('src/styles/base.css', 'w', encoding='utf-8') as f:
    f.writelines(base_lines)
print(f"Created src/styles/base.css ({len(base_lines)} lines)")

# 2. viewport.css: Lines 427-458 (0-indexed: 426 to 458)
viewport_lines = lines[426:458]
with open('src/styles/viewport.css', 'w', encoding='utf-8') as f:
    f.writelines(viewport_lines)
print(f"Created src/styles/viewport.css ({len(viewport_lines)} lines)")

# 3. hud.css: Lines 79-426 + Lines 3337-3623
hud_lines = lines[78:426] + ["\n/* --- HUD ADVANCED EXTENSIONS (ZERO-HUD & SA BAN 3D FRAME) --- */\n"] + lines[3336:3623]
with open('src/styles/hud.css', 'w', encoding='utf-8') as f:
    f.writelines(hud_lines)
print(f"Created src/styles/hud.css ({len(hud_lines)} lines)")

# 4. vn-stage.css: Lines 459-1093
vn_lines = lines[458:1093]
with open('src/styles/vn-stage.css', 'w', encoding='utf-8') as f:
    f.writelines(vn_lines)
print(f"Created src/styles/vn-stage.css ({len(vn_lines)} lines)")

# 5. war-table.css: Lines 1094-1537
war_lines = lines[1093:1537]
with open('src/styles/war-table.css', 'w', encoding='utf-8') as f:
    f.writelines(war_lines)
print(f"Created src/styles/war-table.css ({len(war_lines)} lines)")

# 6. battle-arena.css: Lines 1538-2537
battle_lines = lines[1537:2537]
with open('src/styles/battle-arena.css', 'w', encoding='utf-8') as f:
    f.writelines(battle_lines)
print(f"Created src/styles/battle-arena.css ({len(battle_lines)} lines)")

# 7. gacha-altar.css: Lines 2538-2856 + Lines 3833-4967
gacha_lines = lines[2537:2856] + ["\n/* --- FULL-SCREEN DIEGETIC GACHA THEATER & GRAND REVEAL --- */\n"] + lines[3832:len(lines)]
with open('src/styles/gacha-altar.css', 'w', encoding='utf-8') as f:
    f.writelines(gacha_lines)
print(f"Created src/styles/gacha-altar.css ({len(gacha_lines)} lines)")

# 8. modals.css: Lines 2857-3336 + Lines 3624-3832
modals_lines = lines[2856:3336] + ["\n/* --- FACTION & IDENTITY PROGRESSION MODAL --- */\n"] + lines[3623:3832]
with open('src/styles/modals.css', 'w', encoding='utf-8') as f:
    f.writelines(modals_lines)
print(f"Created src/styles/modals.css ({len(modals_lines)} lines)")

# 9. main.css: Master imports
main_css_content = """/* =========================================================================
 * MASTER STYLESHEET — TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷)
 * 100% Cổ Phong Thủy Mặc & Kim Kế Hắc Ám (Zero Web Dashboard Slop)
 * ========================================================================= */

@import './base.css';
@import './viewport.css';
@import './hud.css';
@import './vn-stage.css';
@import './war-table.css';
@import './battle-arena.css';
@import './gacha-altar.css';
@import './modals.css';
@import './diegetic-modals.css';
"""
with open('src/styles/main.css', 'w', encoding='utf-8') as f:
    f.write(main_css_content)
print("Created src/styles/main.css")
