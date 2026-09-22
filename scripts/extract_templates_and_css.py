import os
import re

def extract():
    with open('index.html', encoding='utf-8') as f:
        html = f.read()

    # Let's inspect sections:
    # 1. HUD: inside <header class="game-hud-frame" id="top-hud"> ... </header>
    hud_match = re.search(r'(<header class="game-hud-frame" id="top-hud">.*?</header>)', html, re.DOTALL)
    assert hud_match, "HUD not found"
    hud_content = hud_match.group(1)

    # 2. VN Stage: inside <section class="stage-view view-vn active" id="view-vn"> ... </section>
    vn_match = re.search(r'(<section class="stage-view view-vn active" id="view-vn">.*?</section>)', html, re.DOTALL)
    assert vn_match, "VN not found"
    vn_content = vn_match.group(1)

    # 3. Strategy Map: inside <section class="stage-view view-map" id="view-map"> ... </section>
    map_match = re.search(r'(<section class="stage-view view-map" id="view-map">.*?</section>)', html, re.DOTALL)
    assert map_match, "Map not found"
    map_content = map_match.group(1)

    # 4. Tactical Battle: inside <section class="stage-view view-battle" id="view-battle"> ... </section>
    battle_match = re.search(r'(<section class="stage-view view-battle" id="view-battle">.*?</section>)', html, re.DOTALL)
    assert battle_match, "Battle not found"
    battle_content = battle_match.group(1)

    # 5. Gacha Altar + rules + history:
    # From <div class="modal-backdrop gacha-backdrop hidden" id="gacha-modal"> ... through gacha-history-modal </div>
    gacha_match = re.search(r'(<div class="modal-backdrop gacha-backdrop hidden" id="gacha-modal">.*?id="gacha-history-modal".*?</div>\s*</div>\s*</div>)', html, re.DOTALL)
    assert gacha_match, "Gacha not found"
    gacha_content = gacha_match.group(1)

    # 6. Modals: victory-modal, hero-inspector-modal, milestone-matrix-modal, faction-progression-modal, unlock-event-modal
    victory_match = re.search(r'(<div class="modal-backdrop hidden" id="victory-modal">.*?</div>\s*</div>)', html, re.DOTALL)
    assert victory_match, "Victory modal not found"

    milestone_match = re.search(r'(<div class="modal-backdrop hidden" id="milestone-matrix-modal">.*?</div>\s*</div>)', html, re.DOTALL)
    assert milestone_match, "Milestone modal not found"

    faction_match = re.search(r'(<div class="modal-backdrop hidden" id="faction-progression-modal">.*?</div>\s*</div>)', html, re.DOTALL)
    assert faction_match, "Faction modal not found"

    unlock_match = re.search(r'(<div class="modal-backdrop hidden" id="unlock-event-modal">.*?</div>\s*</div>)', html, re.DOTALL)
    assert unlock_match, "Unlock modal not found"

    hero_inspector_match = re.search(r'(<div id="hero-inspector-modal" class="hero-scroll-overlay hidden">.*?</div>)', html, re.DOTALL)
    assert hero_inspector_match, "Hero inspector modal not found"

    modals_content = f"{victory_match.group(1)}\n\n{hero_inspector_match.group(1)}\n\n{milestone_match.group(1)}\n\n{faction_match.group(1)}\n\n{unlock_match.group(1)}"

    # Write template files:
    # Inner content only (so the mount points remain in index.html):
    # For HUD: inner content of <header class="game-hud-frame" id="top-hud"> ... </header>
    inner_hud = re.search(r'<header class="game-hud-frame" id="top-hud">(.*?)</header>', hud_content, re.DOTALL).group(1).strip()
    os.makedirs('src/ui/hud', exist_ok=True)
    with open('src/ui/hud/hud.html', 'w', encoding='utf-8') as f:
        f.write(inner_hud + '\n')
    print("Created src/ui/hud/hud.html")

    # For VN: inner content of <section class="stage-view view-vn active" id="view-vn"> ... </section>
    inner_vn = re.search(r'<section class="stage-view view-vn active" id="view-vn">(.*?)</section>', vn_content, re.DOTALL).group(1).strip()
    os.makedirs('src/engines/narrative', exist_ok=True)
    with open('src/engines/narrative/vn-stage.html', 'w', encoding='utf-8') as f:
        f.write(inner_vn + '\n')
    print("Created src/engines/narrative/vn-stage.html")

    # For Map: inner content of <section class="stage-view view-map" id="view-map"> ... </section>
    inner_map = re.search(r'<section class="stage-view view-map" id="view-map">(.*?)</section>', map_content, re.DOTALL).group(1).strip()
    os.makedirs('src/engines/strategy', exist_ok=True)
    with open('src/engines/strategy/war-table.html', 'w', encoding='utf-8') as f:
        f.write(inner_map + '\n')
    print("Created src/engines/strategy/war-table.html")

    # For Battle: inner content of <section class="stage-view view-battle" id="view-battle"> ... </section>
    inner_battle = re.search(r'<section class="stage-view view-battle" id="view-battle">(.*?)</section>', battle_content, re.DOTALL).group(1).strip()
    os.makedirs('src/engines/combat', exist_ok=True)
    with open('src/engines/combat/battle-arena.html', 'w', encoding='utf-8') as f:
        f.write(inner_battle + '\n')
    print("Created src/engines/combat/battle-arena.html")

    # For Gacha: gacha_content
    os.makedirs('src/engines/gacha', exist_ok=True)
    with open('src/engines/gacha/gacha-altar.html', 'w', encoding='utf-8') as f:
        f.write(gacha_content.strip() + '\n')
    print("Created src/engines/gacha/gacha-altar.html")

    # For Modals: modals_content
    os.makedirs('src/ui/modals', exist_ok=True)
    with open('src/ui/modals/modals.html', 'w', encoding='utf-8') as f:
        f.write(modals_content.strip() + '\n')
    print("Created src/ui/modals/modals.html")

if __name__ == '__main__':
    extract()
