---
name: narrative-scene-scripting
description: >-
  Skill viết kịch bản phân nhánh chuyên nghiệp cho Visual Novel hybrid.
  Sử dụng khi cần viết scene scripts (YAML/JSON/Ink), thiết kế dialogue trees,
  quản lý flag systems, tạo branching narrative với Foldback Diamond structure,
  hoặc tích hợp narrative events với gameplay mechanics (card rewards, map unlocks,
  resource changes). Hỗ trợ cả Ink scripting (inkjs) và custom JSON schema.
---

# Narrative Scene Scripting Skill

Quy trình viết, chuẩn hóa, và kiểm tra kịch bản phân nhánh (Branching Narrative)
cho game hybrid Visual Novel + Grand Strategy + Tactical Card Battler.

---

## Triết Lý Scripting

### 1. Narrative = Gameplay (Không Tách Rời)
Mỗi scene script PHẢI chứa gameplay hooks:
- Thay đổi resource (gold, suspicion, affinity)
- Grant/remove items, cards, heroes
- Set flags ảnh hưởng future scenes
- Trigger feature unlocks

### 2. Foldback Diamond (Không Phải Cây Nhị Phân Vô Hạn)
Branching theo cấu trúc Kim Cương:
```
[A] ──┬──> [B1] ──┐
      ├──> [B2] ──┤──> [C] (bottleneck)
      └──> [B3] ──┘
```
Mỗi nhánh khác nhau về **context, flags, và rewards** nhưng hội tụ.

### 3. Diegetic Choices (Lựa Chọn Nội Tại)
Không dùng menu pop-up phá immersion. Lựa chọn = hành động trong thế giới game:
- Đọc hoặc đốt mật thư
- Chấp nhận hoặc từ chối sắc phong
- Trả lời hoặc im lặng trước vế đối

---

## Scene Script Schema (JSON/YAML)

### Cấu trúc Node
```yaml
node_id: string           # Unique identifier
chapter: int              # Chương truyện tương ứng
scene_type: enum          # "dialogue" | "choice" | "battle_trigger" | "cutscene" | "investigation"
location: string          # Background setting

# Visual
background: string        # Background asset ID
music: string             # BGM track ID
ambience: string          # Ambient SFX (rain, crowd, etc.)

# Actors on stage
actors:
  - id: string            # Character ID from game_bible
    sprite: string        # Sprite variant (happy, angry, shocked)
    position: enum        # "left" | "center" | "right"
    highlight: bool       # Active speaker glow

# Dialogue lines (sequential)
dialogue:
  - speaker: string       # Actor ID or "narrator" or "system"
    text: string          # Displayed text (max 180 chars for UI box)
    voice: string         # VO audio file (optional)
    text_speed: float     # Typewriter speed override (optional)
    effects:              # Side effects when line displays
      - type: string      # "camera_shake" | "screen_flash" | "sfx" | "set_flag" | etc.
        params: object

# Branching choices (if scene_type == "choice")
choices:
  - text: string          # Choice display text
    tooltip: string       # Hover hint (optional)
    conditions:           # Prerequisites to show this choice
      - flag: string
        op: string        # "==" | "!=" | ">=" | "<"
        value: any
    effects:              # Gameplay consequences
      - type: string
        params: object
    next_node: string     # Target node ID

# Linear progression (if scene_type != "choice")
next_node: string         # Next node in sequence
```

### Effect Types Reference
| Effect Type | Params | Example |
| :--- | :--- | :--- |
| `set_flag` | `{flag, value}` | `{flag: "met_gia_hu", value: true}` |
| `set_resource` | `{resource, delta}` | `{resource: "gold", delta: 3000}` |
| `set_affinity` | `{npc, dimension, delta}` | `{npc: "trieu_van", dimension: "loyalty", delta: 15}` |
| `grant_item` | `{item_id, quantity}` | `{item_id: "anh_hon_lenh", quantity: 1}` |
| `add_card` | `{card_id}` | `{card_id: "that_tham_ban_xa"}` |
| `unlock_feature` | `{feature_id}` | `{feature_id: "bai_tuong_dai"}` |
| `trigger_battle` | `{battle_id}` | `{battle_id: "battle_ch10_assassin"}` |
| `trigger_gacha` | `{banner_id}` | `{banner_id: "bai_tuong_dai_v1"}` |
| `camera_shake` | `{intensity, duration}` | `{intensity: 0.8, duration: 500}` |
| `screen_flash` | `{color, duration}` | `{color: "#FFD700", duration: 300}` |
| `play_sfx` | `{sfx_id}` | `{sfx_id: "thunder_crack"}` |
| `change_bgm` | `{track_id, fade_ms}` | `{track_id: "bgm_battle", fade_ms: 1000}` |
| `change_bg` | `{bg_id, transition}` | `{bg_id: "bg_night_camp", transition: "fade"}` |
| `show_toast` | `{message, type}` | `{message: "Mở khóa Bái Tướng Đài!", type: "unlock"}` |
| `suspicion_change` | `{delta, reason}` | `{delta: 20, reason: "Áp giải lên Kim Loan Điện"}` |

---

## Flag Management System

### Hai Tầng Persistence
1. **Global State** (across saves/NG+):
   - Route completions, CG gallery, ending counter
   - Meta-progression currency

2. **Session State** (current save slot):
   - Boolean flags: `met_general_X = true`
   - Scalar affinity: `affinity_trieu_van_loyalty = 85`
   - Resource values: `gold = 13500`
   - Bitmask clues: `evidence_gathered = 0b00101110`

### Flag Naming Convention
```
[scope]_[subject]_[predicate]
```
Examples:
- `ch1_poetry_duel_won`
- `ch5_gacha_completed`
- `ch8_soap_business_unlocked`
- `ch10_assassin_method` (values: "hide", "confront", "investigate")
- `npc_gia_hu_recruited`
- `system_suspicion_level` (int 0-100)

### Precondition Query Syntax
```yaml
conditions:
  - flag: "npc_gia_hu_recruited"
    op: "=="
    value: true
  - flag: "system_suspicion_level"
    op: "<"
    value: 60
  - flag: "gold"
    op: ">="
    value: 5000
```

---

## Ink Scripting Support (inkjs)

### Khi nào dùng Ink vs JSON
| Trường hợp | Dùng | Lý do |
| :--- | :--- | :--- |
| Dialogue-heavy linear scenes | **Ink** | Nhanh, dễ viết, readable |
| Complex multi-effect choices | **JSON** | Cần structured effects |
| Prototype / iteration nhanh | **Ink** | Live preview với Inky editor |
| Production data pipeline | **JSON** | Machine-parseable, validatable |

### Ink → JSON Compilation
```bash
# Compile Ink to JSON for runtime
inklecate story.ink -o story.json

# Or use inkjs directly in browser
import { Story } from 'inkjs';
const story = new Story(jsonContent);
```

### Ink Template cho Chapter Scene
```ink
VAR gold = 0
VAR suspicion = 0
VAR has_anh_hon_lenh = false

=== chapter_1_poetry_duel ===
Sứ thần Nam Ly đứng lên, mỉm cười ngạo mạn.

"Ta có một vế đối, đố triều đình Đại Vũ có ai dám đối!"

Cả triều đình im phắc. Vũ Hoàng nhíu mày.

"Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?"

* [Đứng lên đối: "Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn!"]
  ~ gold += 100
  ~ has_anh_hon_lenh = true
  Quý Bình An đứng bật dậy, giọng vang vọng cả đại điện!
  Vũ Hoàng kinh ngạc: "Hay! Hay lắm! Ban thưởng 100 lượng vàng!"
  -> system_awakening

* [Im lặng, cúi đầu tránh ánh mắt Vũ Hoàng]
  ~ suspicion -= 5
  Quý Bình An cúi đầu. Không ai dám lên tiếng.
  Sứ thần cười lớn: "Đại Vũ quả nhiên không có nhân tài!"
  -> humiliation_path

=== system_awakening ===
# system_notification
[HỆ THỐNG]: Phát hiện trí tuệ vượt thời đại. Kích hoạt Hệ Thống Tam Quốc!
[HỆ THỐNG]: Nhận được ⟨Anh Hồn Lệnh Sơ Cấp⟩ × 1!
-> chapter_1_aftermath
```

---

## Scene Validation Checklist

Trước khi submit bất kỳ scene script nào:

- [ ] **node_id** unique trong toàn project
- [ ] **next_node** references tồn tại (no dangling pointers)
- [ ] **actor IDs** khớp với `game_bible_v2/characters.json`
- [ ] **sprite IDs** tồn tại trong asset manifest
- [ ] **text length** ≤ 180 ký tự per dialogue box
- [ ] **effects** có ít nhất 1 gameplay hook per choice
- [ ] **conditions** không tạo deadlock (always reachable)
- [ ] **flags set** trong scene này được consumed ở scene khác
- [ ] **resource deltas** không gây negative balance

---

## Content Pipeline Integration

### Automated Linting (CI/CD)
```python
# Scene linter checks:
1. Validate all target_node references exist
2. Verify actor sprite IDs exist in graphics atlas
3. Check text length < 180 chars per node
4. Ensure no orphan flags (set but never read)
5. Verify resource deltas don't cause negative values
```

### Localization Export
```python
# Auto-extract strings to .po/.pot
for node in scene_nodes:
    for line in node.dialogue:
        pot_file.add(line.text, context=f"{node.node_id}:{line.speaker}")
```
