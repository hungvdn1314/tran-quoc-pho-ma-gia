"""
Build Character Relationship Graph v2 for 'Trấn Quốc Phò Mã Gia'
Using NetworkX, PyVis, and game_bible_v2 extracted datasets.

Features:
- 120 Characters with rich metadata (realm, power, arcs, roles, skills, faction)
- 11 Distinct Faction color mappings:
    * Đại Hán / Quý gia: Red (#E74C3C)
    * Tây Lăng: Blue (#3498DB)
    * Nam Ly: Green (#2ECC71)
    * Đông Thương: Orange (#E67E22)
    * Bắc Minh: Cyan (#00BCD4)
    * Quốc Giáo: Purple (#9B59B6)
    * Quỷ Vương: Dark Gray (#34495E)
    * Thánh Nữ: Pink (#E91E63)
    * A Bố / Thiên A: Brown (#8D6E63)
    * Đại La: Yellow (#F1C40F)
    * Trung Lập / Cựu Triều: Light Gray (#BDC3C7)
- Dynamic node sizing based on arc appearance counts (1 to 5 arcs)
- Comprehensive edge classification:
    * Lord-vassal (Quân Thần): Blue (#2980B9)
    * Allies (Đồng Minh): Green (#27AE60)
    * Family (Gia Tộc / Huyết Thống): Green (#2ECC71)
    * Romantic (Tình Cảm / Phu Thê): Pink (#FF69B4)
    * Enemies (Kình Địch / Chiến Trường): Red (#E74C3C)
- Interactive HTML output with glassmorphism UI, search, filtering, and rich tooltips.
- Full JSON graph data export for game mechanics and UI integration.
"""

import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path
import networkx as nx
from pyvis.network import Network

# Ensure proper UTF-8 handling on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
GAME_BIBLE_DIR = DATA_DIR / "game_bible_v2"
OUTPUT_DIR = DATA_DIR / "character_graph_v2"

CHARACTERS_FILE = GAME_BIBLE_DIR / "characters.json"
ORGANIZATIONS_FILE = GAME_BIBLE_DIR / "organizations.json"
BATTLES_FILE = GAME_BIBLE_DIR / "battles.json"

HTML_OUTPUT_FILE = OUTPUT_DIR / "index.html"
JSON_OUTPUT_FILE = OUTPUT_DIR / "graph_data.json"

# Color Configuration
FACTION_CONFIG = {
    "Đại Hán / Quý gia": {
        "color": "#E74C3C",
        "order": 1,
        "desc": "Đại Hán Hoàng Triều, Quý Gia và các mưu thần hổ tướng Tam Quốc"
    },
    "Tây Lăng": {
        "color": "#3498DB",
        "order": 2,
        "desc": "Tây Lăng Hoàng Thất, Tần gia và văn võ Tây Lăng"
    },
    "Nam Ly": {
        "color": "#2ECC71",
        "order": 3,
        "desc": "Nam Ly Hoàng Triều, Cung Sinh và các thế lực Nam Ly"
    },
    "Đông Thương": {
        "color": "#E67E22",
        "order": 4,
        "desc": "Đông Thương Quốc, Bùi gia và An gia"
    },
    "Bắc Minh": {
        "color": "#00BCD4",
        "order": 5,
        "desc": "Bắc Minh và Thiên Bắc Thị (Bắc U Chi Địa)"
    },
    "Quốc Giáo": {
        "color": "#9B59B6",
        "order": 6,
        "desc": "Quốc Giáo Đại La (Giáo Hoàng Ninh Không Lâu, Cầu Hòa, Cầu Sinh)"
    },
    "Quỷ Vương": {
        "color": "#34495E",
        "order": 7,
        "desc": "Quỷ Vương, Quỷ Tộc và Tây Lăng Quỷ Quật"
    },
    "Thánh Nữ": {
        "color": "#E91E63",
        "order": 8,
        "desc": "Thánh Nữ Giáo Đại La (Hiên Thanh Nguyệt, An Khinh Ngôn)"
    },
    "A Bố / Thiên A": {
        "color": "#8D6E63",
        "order": 9,
        "desc": "Thế lực bóng tối A Bố và Thiên A Thị (Cự Nhân Tộc)"
    },
    "Đại La": {
        "color": "#F1C40F",
        "order": 10,
        "desc": "Đại La Đế Quốc (Hoàng tộc, Lục Quân, Viễn Chinh Hạm Đội)"
    },
    "Trung Lập / Cựu Triều": {
        "color": "#BDC3C7",
        "order": 11,
        "desc": "Hoàng thất Đại Vũ cựu triều, thích khách, gián điệp, thần thú"
    }
}

EDGE_CONFIG = {
    "lord-vassal": {
        "color": "#2980B9",
        "label": "Quân - Thần",
        "width": 2.5,
        "desc": "Quan hệ Chúa Công - Tướng lĩnh / Cận vệ / Quân sư"
    },
    "allies": {
        "color": "#27AE60",
        "label": "Đồng Minh",
        "width": 2.0,
        "desc": "Quan hệ Đồng minh, Chiến hữu, Cộng sự cùng phe"
    },
    "family": {
        "color": "#2ECC71",
        "label": "Gia Tộc",
        "width": 3.0,
        "desc": "Quan hệ Phụ tử, Huynh đệ, Tỷ muội, Huyết thống"
    },
    "romantic": {
        "color": "#FF69B4",
        "label": "Tình Cảm",
        "width": 3.5,
        "desc": "Quan hệ Phu thê, Hoàng hậu, Hôn nhân chính trị"
    },
    "enemies": {
        "color": "#E74C3C",
        "label": "Kình Địch",
        "width": 2.5,
        "desc": "Quan hệ Tử địch, Đối đầu chiến trường, Bại tướng"
    }
}


def classify_faction(char):
    """Categorize character into one of the 11 canonical faction groups."""
    cid = char.get("id", "")
    f = (char.get("faction") or "").lower()
    r = (char.get("role") or "").lower()
    n = (char.get("canonical_name") or "").lower()

    # Explicit character ID mappings for high precision
    if cid in ["CHAR_QUY_VO_SONG", "CHAR_QUY_BINH_XUYEN"]:
        return "Đại Hán / Quý gia"
    if cid in [
        "CHAR_DUC_BAT_NHAN", "CHAR_BAI_DANG", "CHAR_QUINTO",
        "CHAR_BURTON", "CHAR_BI_DAO", "CHAR_THAC_HAP", "CHAR_QUY_VO_SINH"
    ]:
        return "Đại La"
    if cid in ["CHAR_HIEN_THANH_NGUYET", "CHAR_AN_KHINH_NGON", "CHAR_LIEU_KHINH_NGON"]:
        return "Thánh Nữ"
    if cid in [
        "CHAR_A_BO", "CHAR_KIM_KHUE", "CHAR_DAC_PHO",
        "CHAR_TU_NGOC_SUNG", "CHAR_HAC_MA_QUY"
    ]:
        return "A Bố / Thiên A"
    if cid in ["CHAR_BAC_MINH", "CHAR_BAC_MACH_SON"]:
        return "Bắc Minh"
    if cid in ["CHAR_QUY_VUONG", "CHAR_QUY_THANH"]:
        return "Quỷ Vương"
    if cid in [
        "CHAR_NINH_KHONG_LAU", "CHAR_CAU_HOA", "CHAR_CAU_SINH",
        "CHAR_VUONG_SO", "CHAR_NGAN_GIAI", "CHAR_THI_KHOI_VUONG"
    ]:
        return "Quốc Giáo"
    if cid in [
        "CHAR_NINH_AN_CONG_CHUA", "CHAR_VU_HOANG", "CHAR_TU_NGOC_TRACH",
        "CHAR_TU_NGOC_HANG", "CHAR_TU_TRIEU_PHONG", "CHAR_TO_KIEN_PHONG",
        "CHAR_HUA_HOA_LAM", "CHAR_VE_TI_VU", "CHAR_TRAN_HAI",
        "CHAR_VU_VAN_CHAU", "CHAR_PHUONG_HOANG"
    ]:
        return "Trung Lập / Cựu Triều"

    # Pattern-based matching
    if "a bố" in f or "thiên a" in f:
        return "A Bố / Thiên A"
    if "thánh nữ" in f or "thánh nữ" in r:
        return "Thánh Nữ"
    if "quỷ vương" in f or "quỷ tộc" in f or "quỷ quật" in f or "quỷ vương" in r:
        return "Quỷ Vương"
    if "quốc giáo" in f or "quốc giáo" in r:
        return "Quốc Giáo"
    if "bắc minh" in f or "thiên bắc" in f or "bắc u" in f:
        return "Bắc Minh"
    if "tây lăng" in f:
        return "Tây Lăng"
    if "nam ly" in f:
        return "Nam Ly"
    if "đông thương" in f or "bùi gia" in f or "bùi thị" in f:
        return "Đông Thương"
    if "đại la" in f:
        return "Đại La"
    if (
        "quý gia" in f
        or "đại hán" in f
        or "huyết y" in f
        or "thiên cung" in f
        or "quý" in n
        or "tam quốc" in f
    ):
        return "Đại Hán / Quý gia"

    return "Trung Lập / Cựu Triều"


def calculate_node_size(char):
    """
    Calculate node size based on how many arcs the character appears in.
    1 arc = 20
    2 arcs = 30
    3 arcs = 42
    4 arcs = 54
    5 arcs = 68 (Quý Bình An protagonist = 75)
    """
    cid = char.get("id", "")
    arcs = char.get("_source_arcs", [])
    if not arcs and "_source_arc" in char:
        arcs = [char["_source_arc"]]
    arc_count = max(1, len(arcs))

    if cid == "CHAR_QUY_BINH_AN":
        return 75, arc_count, arcs

    size_map = {1: 20, 2: 30, 3: 42, 4: 54, 5: 68}
    size = size_map.get(arc_count, 20 + arc_count * 10)
    return size, arc_count, arcs


def build_entity_matcher(chars):
    """Build fast substring matcher for canonical names and aliases."""
    id_to_char = {c["id"]: c for c in chars}
    matcher_items = []

    for c in chars:
        cid = c["id"]
        canonical = c["canonical_name"].strip()
        matcher_items.append((canonical, cid))
        for alias in c.get("aliases", []):
            al = alias.strip()
            # Ignore overly generic titles that cause false positives
            if len(al) >= 3 and al.lower() not in [
                "chúa công", "chủ nhân", "hoàng đế", "hoàng hậu", "thái tử",
                "đại ca", "nhị ca", "tam ca", "tiên phong", "tướng quân",
                "đại tướng", "bệ hạ", "thừa tướng", "quân sư"
            ]:
                matcher_items.append((al, cid))

    # Sort descending by length so longer names match first
    matcher_items.sort(key=lambda x: len(x[0]), reverse=True)

    def find_character_ids(text):
        if text is None:
            return set()
        if isinstance(text, (list, tuple, set)):
            text = " ".join(str(item) for item in text)
        else:
            text = str(text)

        found = set()
        # Direct CHAR_ IDs
        for m in re.findall(r"CHAR_[A-Z0-9_]+", text):
            if m in id_to_char:
                found.add(m)
        # Names & Aliases
        for name_or_alias, cid in matcher_items:
            if name_or_alias in text:
                found.add(cid)
        return found

    return id_to_char, find_character_ids


def create_relationship_graph():
    """Main pipeline to build NetworkX relationship graph and export outputs."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Load data
    with open(CHARACTERS_FILE, "r", encoding="utf-8") as f:
        chars = json.load(f)
    print(f"✓ Loaded {len(chars)} characters from {CHARACTERS_FILE}")

    orgs = []
    if ORGANIZATIONS_FILE.exists():
        with open(ORGANIZATIONS_FILE, "r", encoding="utf-8") as f:
            orgs = json.load(f)
        print(f"✓ Loaded {len(orgs)} organizations from {ORGANIZATIONS_FILE}")

    battles = []
    if BATTLES_FILE.exists():
        with open(BATTLES_FILE, "r", encoding="utf-8") as f:
            battles = json.load(f)
        print(f"✓ Loaded {len(battles)} battles from {BATTLES_FILE}")

    id_to_char, find_cids = build_entity_matcher(chars)

    # 2. Initialize NetworkX Graph
    G = nx.Graph()

    # Add Nodes
    for c in chars:
        cid = c["id"]
        cname = c["canonical_name"]
        faction_group = classify_faction(c)
        faction_color = FACTION_CONFIG[faction_group]["color"]
        node_size, arc_count, source_arcs = calculate_node_size(c)
        realm = c.get("martial_realm", "Chưa rõ")
        power = c.get("martial_power", 50)
        role = c.get("role", "Nhân vật")
        is_spirit = c.get("is_summoned_spirit", False)
        aliases = c.get("aliases", [])

        # Build Rich HTML Tooltip for PyVis
        aliases_str = ", ".join(aliases[:4]) if aliases else "Không có"
        spirit_badge = "★ Anh Linh Tam Quốc" if is_spirit else "Nhân vật Bản Địa"
        source_arcs_clean = ", ".join([a.replace("extraction_", "").replace(".json", "") for a in source_arcs])

        tooltip_html = (
            f"<div style='font-family: Segoe UI, sans-serif; min-width: 250px; max-width: 340px; padding: 10px; color: #fff; background: #16213e; border-radius: 8px; border: 1px solid {faction_color}; box-shadow: 0 4px 15px rgba(0,0,0,0.5);'>"
            f"<div style='font-size: 16px; font-weight: bold; color: {faction_color}; margin-bottom: 4px;'>{cname}</div>"
            f"<div style='font-size: 11px; color: #94a3b8; margin-bottom: 8px;'>{spirit_badge} | {aliases_str}</div>"
            f"<div style='font-size: 12px; margin-bottom: 4px;'><b>Phe phái:</b> <span style='color:{faction_color}'>{faction_group}</span></div>"
            f"<div style='font-size: 12px; margin-bottom: 4px;'><b>Cảnh giới:</b> {realm} (Võ lực: {power})</div>"
            f"<div style='font-size: 12px; margin-bottom: 4px;'><b>Vai trò:</b> {role}</div>"
            f"<div style='font-size: 12px; margin-bottom: 6px;'><b>Số Arc xuất hiện:</b> {arc_count} ({source_arcs_clean})</div>"
            f"</div>"
        )

        G.add_node(
            cid,
            id=cid,
            label=cname,
            canonical_name=cname,
            aliases=aliases,
            faction_raw=c.get("faction", ""),
            faction_group=faction_group,
            color=faction_color,
            size=node_size,
            arc_count=arc_count,
            source_arcs=source_arcs,
            martial_realm=realm,
            martial_power=power,
            role=role,
            is_summoned_spirit=is_spirit,
            title=tooltip_html
        )

    # 3. Extract & Consolidate Edges
    # Structure: edges_registry[(u, v)] = {type, desc, weight, sources}
    edges_registry = {}

    priority_map = {
        "romantic": 5,
        "family": 4,
        "lord-vassal": 3,
        "enemies": 2,
        "allies": 1
    }

    def record_edge(u, v, rel_type, desc="", weight=2, source_tag=""):
        if u == v or u not in id_to_char or v not in id_to_char:
            return
        key = tuple(sorted([u, v]))
        current = edges_registry.get(key)

        if current:
            curr_priority = priority_map.get(current["type"], 0)
            new_priority = priority_map.get(rel_type, 0)
            if new_priority > curr_priority:
                current["type"] = rel_type
                current["source"] = u
                current["target"] = v

            # Merge description
            if desc and desc not in current["desc"]:
                current["desc"] += f"; {desc}"
            current["weight"] = max(current["weight"], weight)
            if source_tag and source_tag not in current.get("sources", []):
                current.setdefault("sources", []).append(source_tag)
        else:
            edges_registry[key] = {
                "source": u,
                "target": v,
                "type": rel_type,
                "desc": desc,
                "weight": weight,
                "sources": [source_tag] if source_tag else []
            }

    # Helper for clause-level relationship classification
    def classify_clause(rel_key, clause_text):
        k_low = rel_key.lower()
        c_low = clause_text.lower()

        # Romantic check
        if any(w in c_low for w in ["thê tử", "phu thê", "hoàng hậu", "hôn thê", "ái nhân", "người yêu", "ái mộ"]) or k_low in ["husband", "wife"]:
            return "romantic", "Hôn nhân / Tình cảm"

        # Family check
        if any(w in c_low for w in [
            "phụ thân", "mẫu thân", "phụ hoàng", "mẫu hậu", "huynh đệ", "tỷ muội", "con trai", "con gái",
            "thái tử", "father", "mother", "son", "daughter", "brothers", "sister", "adoptive_father",
            "real_father", "tam ca", "đại ca", "nhị ca", "tứ đệ", "con nuôi", "dì ruột", "huynh muội"
        ]) or k_low in ["family", "brothers", "sister", "son", "daughter", "mother", "father", "adoptive_father", "real_father", "sons", "daughters"]:
            return "family", "Huyết thống / Gia tộc"

        # Lord-vassal check
        if any(w in c_low for w in [
            "chúa công", "chủ nhân", "chủ tướng", "chúa tể", "bệ hạ", "cận vệ", "thu hạ", "thuộc hạ",
            "phục vụ", "phụng sự", "quân cờ", "cấp dưới", "cấp trên"
        ]) or k_low in ["monarch", "commander", "masters", "disciple"]:
            return "lord-vassal", "Quân - Thần / Chủ - Thuộc"

        # Enemy check
        if any(w in c_low for w in [
            "kình địch", "kẻ thù", "bại tướng", "trảm đầu", "hạ sát", "đả thương", "đoạt mạng",
            "thôn phệ", "đối đầu", "tử thù", "tiêu diệt"
        ]) or k_low in ["enemies", "rivals"]:
            return "enemies", "Kình địch / Đối đầu"

        # Default to allies
        return "allies", "Đồng minh / Cộng sự"

    # A. Parse direct relationships from characters.json
    for c in chars:
        src_id = c["id"]
        rels = c.get("relationships", {})
        if not isinstance(rels, dict):
            continue

        for rel_key, rel_val in rels.items():
            val_str = str(rel_val)

            # Check if key is a direct character ID
            if rel_key.startswith("CHAR_") and rel_key in id_to_char:
                rtype, rdesc = classify_clause(val_str, val_str)
                record_edge(src_id, rel_key, rtype, f"{rdesc}: {val_str}", 4, "char_relationships")
                continue

            # Split value by semicolons and newlines first, then commas
            raw_segments = re.split(r"[;\n]", val_str)
            for seg in raw_segments:
                sub_clauses = re.split(r"[,]", seg)
                for cl in sub_clauses:
                    cl = cl.strip()
                    if not cl:
                        continue
                    targets = find_cids(cl)
                    for tid in targets:
                        if tid == src_id:
                            continue
                        rtype, rdesc = classify_clause(rel_key, cl)
                        record_edge(src_id, tid, rtype, f"{rdesc}: {cl}", 4, "char_relationships")

    # B. Canonical lore core ties
    # Quý Family Core
    record_edge("CHAR_QUY_BINH_AN", "CHAR_DIEU_THUYEN", "romantic", "Quốc Hậu Điêu Thuyền & Hoàng Đế Quý Bình An", 5, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_NINH_AN_CONG_CHUA", "romantic", "Phò Mã Quý Bình An & Công Chúa Ninh An (Hôn ước Đại Vũ)", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_QUY_VO_SONG", "family", "Phụ tử: Quý Vô Song (Phụ thân) & Quý Bình An (Tứ công tử)", 5, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_QUY_BINH_SINH", "family", "Huynh đệ: Đại ca Quý Bình Sinh & Tứ đệ Quý Bình An", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_QUY_BINH_XUYEN", "family", "Huynh đệ: Nhị ca Quý Bình Xuyên & Tứ đệ Quý Bình An", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_QUY_BINH_THUONG", "family", "Huynh đệ: Tam ca Quý Bình Thường & Tứ đệ Quý Bình An", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_SINH", "CHAR_QUY_VO_SONG", "family", "Phụ tử: Quý Vô Song & Quý Bình Sinh", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_XUYEN", "CHAR_QUY_VO_SONG", "family", "Phụ tử: Quý Vô Song & Quý Bình Xuyên", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_THUONG", "CHAR_QUY_VO_SONG", "family", "Phụ tử: Quý Vô Song & Quý Bình Thường", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_QUY_SON_HA", "family", "Phụ tử: Phụ hoàng Quý Bình An & Thái tử Quý Sơn Hà", 5, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_QUY_THIEN_TU", "family", "Phụ tử: Phụ hoàng Quý Bình An & Hoàng tử Quý Thiên Tứ", 5, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_TRAM_HAO", "family", "Nghĩa phụ tử: Nghĩa phụ Quý Bình An & Nghĩa tử Trầm Hạo", 4, "canonical_lore")
    record_edge("CHAR_QUY_BINH_AN", "CHAR_HIEN_THANH_NGUYET", "family", "Huyết thống: Hiên Thanh Nguyệt là dì ruột của Quý Bình An", 4, "canonical_lore")
    record_edge("CHAR_TRAM_CAN", "CHAR_TRAM_HAO", "family", "Phụ tử ruột: Trầm Căn & Trầm Hạo", 4, "canonical_lore")
    record_edge("CHAR_CO_VO_THIEN", "CHAR_CO_VO_PHAP", "family", "Huynh đệ Cơ gia (An Tức Vệ & Cơ Quan Thuật)", 4, "canonical_lore")
    record_edge("CHAR_CAU_HOA", "CHAR_CAU_SINH", "family", "Liên thể huynh đệ Quốc Giáo", 5, "canonical_lore")

    # Imperial Royalties & Others
    record_edge("CHAR_VU_HOANG", "CHAR_TU_NGOC_TRACH", "family", "Phụ tử: Vũ Hoàng & Tam hoàng tử Tử Ngọc Trạch", 4, "canonical_lore")
    record_edge("CHAR_VU_HOANG", "CHAR_TU_NGOC_HANG", "family", "Phụ tử: Vũ Hoàng & Tứ hoàng tử Tử Ngọc Hằng", 4, "canonical_lore")
    record_edge("CHAR_VU_HOANG", "CHAR_NINH_AN_CONG_CHUA", "family", "Phụ nữ: Vũ Hoàng & Ninh An công chúa", 4, "canonical_lore")
    record_edge("CHAR_TU_NGOC_TRACH", "CHAR_NINH_AN_CONG_CHUA", "family", "Huynh muội hoàng thất Đại Vũ", 4, "canonical_lore")
    record_edge("CHAR_TU_NGOC_TRACH", "CHAR_TU_NGOC_HANG", "family", "Huynh đệ hoàng tộc tranh đoạt ngai vàng", 3, "canonical_lore")
    record_edge("CHAR_TRUONG_BAT_MINH", "CHAR_HE_NHAN", "family", "Phụ nữ: Trương Bất Minh & Công chúa Hề Nhan", 4, "canonical_lore")
    record_edge("CHAR_VAN_NHAN_HAO", "CHAR_VAN_NHAN_MUC", "family", "Hoàng tộc Tây Lăng", 4, "canonical_lore")

    # Summoned spirits lord-vassal connection to Quý Bình An
    for c in chars:
        cid = c["id"]
        if cid == "CHAR_QUY_BINH_AN":
            continue
        grp = classify_faction(c)
        if c.get("is_summoned_spirit") or (grp == "Đại Hán / Quý gia" and "đại hán" in (c.get("faction") or "").lower()):
            record_edge("CHAR_QUY_BINH_AN", cid, "lord-vassal", f"Chúa công Quý Bình An triệu hoán & thống soái {c['canonical_name']}", 3, "summoned_spirit")

    # C. Organizations connections
    for o in orgs:
        oname = o.get("name", "Tổ chức")
        leaders = find_cids(o.get("leader", ""))
        members = find_cids(o.get("members", ""))

        for l in leaders:
            for m in members:
                if l != m:
                    record_edge(l, m, "lord-vassal", f"Thủ lĩnh & thành viên tổ chức {oname}", 3, "organization")
        l_list = list(leaders)
        for i in range(len(l_list)):
            for j in range(i + 1, len(l_list)):
                record_edge(l_list[i], l_list[j], "allies", f"Đồng lãnh đạo tổ chức {oname}", 3, "organization")

    # D. Battles connections (Enemies & Comrades)
    for b in battles:
        bname = b.get("name", "Chiến dịch")
        p = b.get("participants") or {}
        c = b.get("commanders") or {}

        sa_text = f"{p.get('side_a', '')} {c.get('side_a', '')}"
        sb_text = f"{p.get('side_b', '')} {c.get('side_b', '')}"

        chars_a = find_cids(sa_text)
        chars_b = find_cids(sb_text)

        # Enemies across sides
        for ca in chars_a:
            for cb in chars_b:
                if ca != cb:
                    record_edge(ca, cb, "enemies", f"Đối đầu trực tiếp trong trận chiến: {bname}", 4, "battle")

        # Comrades on side A
        list_a = list(chars_a)
        for i in range(len(list_a)):
            for j in range(i + 1, len(list_a)):
                record_edge(list_a[i], list_a[j], "allies", f"Chiến hữu cùng tham chiến tại: {bname}", 2, "battle")

    # E. Faction hubs and Same-Faction Weak Ally Connections
    # "Characters sharing the same faction should have a weak ally edge."
    faction_members = defaultdict(list)
    for c in chars:
        grp = classify_faction(c)
        faction_members[grp].append(c["id"])

    faction_hubs = {
        "Đại Hán / Quý gia": "CHAR_QUY_BINH_AN",
        "Tây Lăng": "CHAR_TRUONG_BAT_MINH",
        "Nam Ly": "CHAR_TRUONG_BAT_MINH",
        "Đông Thương": "CHAR_BUI_KHUOC",
        "Bắc Minh": "CHAR_BAC_MINH",
        "Quốc Giáo": "CHAR_NINH_KHONG_LAU",
        "Quỷ Vương": "CHAR_QUY_VUONG",
        "Thánh Nữ": "CHAR_HIEN_THANH_NGUYET",
        "A Bố / Thiên A": "CHAR_A_BO",
        "Đại La": "CHAR_DUC_BAT_NHAN",
        "Trung Lập / Cựu Triều": "CHAR_VU_HOANG"
    }

    # Connect faction members to hub or peers so there are no isolated nodes
    for grp, member_ids in faction_members.items():
        hub = faction_hubs.get(grp)
        if hub and hub in id_to_char:
            for mid in member_ids:
                if mid != hub:
                    pair_key = tuple(sorted([hub, mid]))
                    if pair_key not in edges_registry:
                        record_edge(hub, mid, "allies", f"Thành viên cốt cán cùng phe {grp}", 1, "faction_link")

        # For smaller factions (<= 8 members), interconnect members pairwise if not already linked
        if len(member_ids) <= 8:
            for i in range(len(member_ids)):
                for j in range(i + 1, len(member_ids)):
                    pair_key = tuple(sorted([member_ids[i], member_ids[j]]))
                    if pair_key not in edges_registry:
                        record_edge(member_ids[i], member_ids[j], "allies", f"Đồng minh cùng phe {grp}", 1, "faction_link")

    # Add Edges into NetworkX Graph
    for (u, v), e_data in edges_registry.items():
        rel_type = e_data["type"]
        color = EDGE_CONFIG[rel_type]["color"]
        width = EDGE_CONFIG[rel_type]["width"]
        label_type = EDGE_CONFIG[rel_type]["label"]
        desc = e_data["desc"]

        u_name = id_to_char[u]["canonical_name"]
        v_name = id_to_char[v]["canonical_name"]

        edge_tooltip = (
            f"<div style='font-family: Segoe UI, sans-serif; padding: 6px; color: #fff; background: #0f172a; border-radius: 6px; border: 1px solid {color};'>"
            f"<div style='font-weight: bold; color: {color}; font-size: 13px;'>{label_type}</div>"
            f"<div style='font-size: 12px; margin-top: 3px;'>{u_name} ↔ {v_name}</div>"
            f"<div style='font-size: 11px; color: #94a3b8; margin-top: 4px;'>{desc}</div>"
            f"</div>"
        )

        G.add_edge(
            u, v,
            source=u,
            target=v,
            relation_type=rel_type,
            relation_label=label_type,
            relation_desc=desc,
            color=color,
            width=width,
            weight=e_data["weight"],
            title=edge_tooltip
        )

    print(f"✓ Built NetworkX Graph: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")

    # 4. Compute Network Centralities for Game Lore Balance
    deg_centrality = nx.degree_centrality(G)
    between_centrality = nx.betweenness_centrality(G)

    # 5. Export JSON for Game Use
    export_nodes = []
    for nid, data in G.nodes(data=True):
        export_nodes.append({
            "id": nid,
            "canonical_name": data["canonical_name"],
            "aliases": data["aliases"],
            "faction_group": data["faction_group"],
            "faction_raw": data["faction_raw"],
            "color": data["color"],
            "size": data["size"],
            "arc_count": data["arc_count"],
            "source_arcs": data["source_arcs"],
            "martial_realm": data["martial_realm"],
            "martial_power": data["martial_power"],
            "role": data["role"],
            "is_summoned_spirit": data["is_summoned_spirit"],
            "degree_centrality": round(deg_centrality.get(nid, 0), 4),
            "betweenness_centrality": round(between_centrality.get(nid, 0), 4)
        })

    export_edges = []
    for u, v, data in G.edges(data=True):
        export_edges.append({
            "source": u,
            "target": v,
            "source_name": id_to_char[u]["canonical_name"],
            "target_name": id_to_char[v]["canonical_name"],
            "relation_type": data["relation_type"],
            "relation_label": data["relation_label"],
            "relation_desc": data["relation_desc"],
            "color": data["color"],
            "width": data["width"],
            "weight": data["weight"]
        })

    # Summary Statistics
    faction_stats = defaultdict(int)
    for n in export_nodes:
        faction_stats[n["faction_group"]] += 1

    relation_stats = defaultdict(int)
    for e in export_edges:
        relation_stats[e["relation_type"]] += 1

    graph_json_data = {
        "meta": {
            "title": "Trấn Quốc Phò Mã Gia - Bản Đồ Quan Hệ Nhân Vật v2",
            "version": "2.0.0",
            "total_nodes": len(export_nodes),
            "total_edges": len(export_edges),
            "factions": {
                name: {
                    "count": faction_stats[name],
                    "color": cfg["color"],
                    "description": cfg["desc"]
                }
                for name, cfg in FACTION_CONFIG.items()
            },
            "relation_types": {
                name: {
                    "count": relation_stats[name],
                    "color": cfg["color"],
                    "label": cfg["label"],
                    "description": cfg["desc"]
                }
                for name, cfg in EDGE_CONFIG.items()
            }
        },
        "nodes": export_nodes,
        "edges": export_edges
    }

    with open(JSON_OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(graph_json_data, f, ensure_ascii=False, indent=2)
    print(f"✓ Exported game graph JSON: {JSON_OUTPUT_FILE}")

    # 6. Build PyVis Interactive Visualization
    net = Network(
        height="100vh",
        width="100%",
        bgcolor="#0d1117",
        font_color="#ffffff",
        directed=False,
        select_menu=False,
        filter_menu=False
    )

    # Transfer nodes
    for nid, data in G.nodes(data=True):
        net.add_node(
            nid,
            label=data["canonical_name"],
            title=data["title"],
            color=data["color"],
            size=data["size"],
            borderWidth=2,
            borderWidthSelected=4,
            shape="dot"
        )

    # Transfer edges
    for u, v, data in G.edges(data=True):
        net.add_edge(
            u, v,
            color=data["color"],
            width=data["width"],
            title=data["title"]
        )

    # Set Vis.js physics and styling options
    net.set_options("""
    var options = {
      "nodes": {
        "font": {
          "color": "#ffffff",
          "size": 13,
          "face": "Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          "strokeWidth": 2,
          "strokeColor": "#0d1117"
        },
        "shadow": {
          "enabled": true,
          "color": "rgba(0,0,0,0.6)",
          "size": 8,
          "x": 2,
          "y": 2
        }
      },
      "edges": {
        "smooth": {
          "type": "continuous",
          "forceDirection": "none",
          "roundness": 0.15
        },
        "selectionWidth": 3
      },
      "physics": {
        "barnesHut": {
          "gravitationalConstant": -15000,
          "centralGravity": 0.35,
          "springLength": 130,
          "springConstant": 0.04,
          "damping": 0.09,
          "avoidOverlap": 0.6
        },
        "minVelocity": 0.75,
        "stabilization": {
          "enabled": true,
          "iterations": 150
        }
      },
      "interaction": {
        "hover": true,
        "hoverConnectedEdges": true,
        "selectConnectedEdges": true,
        "tooltipDelay": 150,
        "navigationButtons": true,
        "keyboard": true
      }
    }
    """)

    # Write initial PyVis HTML
    net.write_html(str(HTML_OUTPUT_FILE))

    # 7. Inject Glassmorphism Header, Control Panel, Legend, and Interactive Filter JS
    inject_interactive_ui(HTML_OUTPUT_FILE, graph_json_data)
    print(f"✓ Saved interactive visualization HTML: {HTML_OUTPUT_FILE}")

    return G, graph_json_data


def inject_interactive_ui(html_path, graph_data):
    """Enhance the generated PyVis HTML with modern game-themed control panel and legend."""
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    total_nodes = graph_data["meta"]["total_nodes"]
    total_edges = graph_data["meta"]["total_edges"]

    # Build Legend HTML
    faction_items_html = ""
    for name, cfg in sorted(FACTION_CONFIG.items(), key=lambda x: x[1]["order"]):
        cnt = graph_data["meta"]["factions"][name]["count"]
        color = cfg["color"]
        faction_items_html += f"""
        <div class="legend-item" onclick="filterByFaction('{name}')" title="{cfg['desc']}">
            <span class="color-dot" style="background-color: {color}; box-shadow: 0 0 8px {color};"></span>
            <span class="legend-label">{name}</span>
            <span class="badge">{cnt}</span>
        </div>
        """

    edge_items_html = ""
    for rtype, cfg in EDGE_CONFIG.items():
        cnt = graph_data["meta"]["relation_types"][rtype]["count"]
        color = cfg["color"]
        edge_items_html += f"""
        <div class="legend-item" onclick="filterByEdgeType('{rtype}')" title="{cfg['desc']}">
            <span class="edge-line" style="background-color: {color};"></span>
            <span class="legend-label">{cfg['label']}</span>
            <span class="badge">{cnt}</span>
        </div>
        """

    custom_overlay = f"""
    <!-- Custom Game Lore UI Overlay -->
    <style>
        body, html {{
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            background-color: #0d1117;
            color: #f0f6fc;
        }}
        #mynetwork {{
            width: 100vw !important;
            height: 100vh !important;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }}
        .ui-header {{
            position: absolute;
            top: 15px;
            left: 20px;
            z-index: 10;
            background: rgba(22, 27, 34, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 14px 22px;
            border-radius: 12px;
            border: 1px solid rgba(240, 246, 252, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
            max-width: 480px;
        }}
        .ui-header h1 {{
            margin: 0;
            font-size: 19px;
            font-weight: 700;
            letter-spacing: 0.5px;
            background: linear-gradient(135deg, #f39c12, #e74c3c, #9b59b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        .ui-header p {{
            margin: 4px 0 8px 0;
            font-size: 12px;
            color: #8b949e;
        }}
        .stats-bar {{
            display: flex;
            gap: 12px;
            font-size: 11.5px;
            color: #c9d1d9;
            padding-top: 6px;
            border-top: 1px solid rgba(240, 246, 252, 0.1);
        }}
        .stats-pill {{
            background: rgba(56, 139, 253, 0.15);
            padding: 3px 8px;
            border-radius: 6px;
            border: 1px solid rgba(56, 139, 253, 0.3);
        }}
        .stats-pill strong {{
            color: #58a6ff;
        }}

        /* Search & Control Box */
        .search-container {{
            margin-top: 10px;
            display: flex;
            gap: 8px;
            position: relative;
        }}
        .search-input {{
            flex: 1;
            padding: 7px 12px;
            background: rgba(13, 17, 23, 0.9);
            border: 1px solid rgba(240, 246, 252, 0.2);
            border-radius: 8px;
            color: #fff;
            font-size: 12.5px;
            outline: none;
            transition: all 0.2s ease;
        }}
        .search-input:focus {{
            border-color: #58a6ff;
            box-shadow: 0 0 8px rgba(88, 166, 255, 0.4);
        }}
        .btn-action {{
            padding: 7px 12px;
            background: #238636;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 12px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.2s;
        }}
        .btn-action:hover {{
            background: #2ea043;
        }}
        .btn-reset {{
            padding: 7px 12px;
            background: rgba(110, 118, 129, 0.2);
            color: #c9d1d9;
            border: 1px solid rgba(240, 246, 252, 0.15);
            border-radius: 8px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .btn-reset:hover {{
            background: rgba(110, 118, 129, 0.35);
            color: #fff;
        }}

        /* Autocomplete dropdown */
        #search-results {{
            position: absolute;
            top: 38px;
            left: 0;
            right: 0;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            max-height: 220px;
            overflow-y: auto;
            display: none;
            z-index: 50;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
        }}
        .search-item {{
            padding: 8px 12px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(240,246,252,0.05);
        }}
        .search-item:hover {{
            background: #1f6feb;
            color: #fff;
        }}

        /* Legend Panel */
        .legend-panel {{
            position: absolute;
            top: 15px;
            right: 20px;
            z-index: 10;
            background: rgba(22, 27, 34, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 14px 18px;
            border-radius: 12px;
            border: 1px solid rgba(240, 246, 252, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
            max-width: 290px;
            max-height: 88vh;
            overflow-y: auto;
        }}
        .legend-title {{
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #8b949e;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
        }}
        .legend-section {{
            margin-bottom: 12px;
        }}
        .legend-item {{
            display: flex;
            align-items: center;
            padding: 4px 6px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.15s;
        }}
        .legend-item:hover {{
            background: rgba(255, 255, 255, 0.08);
        }}
        .color-dot {{
            width: 11px;
            height: 11px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
            flex-shrink: 0;
        }}
        .edge-line {{
            width: 18px;
            height: 3px;
            border-radius: 2px;
            display: inline-block;
            margin-right: 8px;
            flex-shrink: 0;
        }}
        .legend-label {{
            flex: 1;
            color: #c9d1d9;
        }}
        .badge {{
            font-size: 10.5px;
            padding: 1px 6px;
            background: rgba(110, 118, 129, 0.2);
            border-radius: 10px;
            color: #8b949e;
        }}

        /* Selected Info Card */
        #node-details-card {{
            position: absolute;
            bottom: 20px;
            left: 20px;
            z-index: 10;
            background: rgba(22, 27, 34, 0.92);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            padding: 14px 18px;
            border-radius: 12px;
            border: 1px solid rgba(88, 166, 255, 0.4);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            max-width: 380px;
            display: none;
        }}
        #node-details-card h3 {{
            margin: 0 0 4px 0;
            font-size: 16px;
        }}
        #node-details-card .close-btn {{
            position: absolute;
            top: 10px;
            right: 12px;
            background: none;
            border: none;
            color: #8b949e;
            font-size: 16px;
            cursor: pointer;
        }}
        #node-details-card .close-btn:hover {{
            color: #fff;
        }}
        .info-row {{
            font-size: 12px;
            margin-top: 4px;
            color: #c9d1d9;
        }}
        .info-row strong {{
            color: #8b949e;
        }}
    </style>

    <div class="ui-header">
        <h1>Trấn Quốc Phò Mã Gia</h1>
        <p>Bản Đồ Quan Hệ Nhân Vật & Mạng Lưới Thế Lực v2</p>
        <div class="stats-bar">
            <span class="stats-pill"><strong>{total_nodes}</strong> Nhân vật</span>
            <span class="stats-pill"><strong>{total_edges}</strong> Quan hệ</span>
            <span class="stats-pill"><strong>11</strong> Phe phái</span>
            <span class="stats-pill"><strong>5</strong> Đại Hồi</span>
        </div>
        <div class="search-container">
            <input type="text" id="char-search" class="search-input" placeholder="Tìm tên nhân vật hoặc biệt hiệu..." oninput="handleSearch(this.value)">
            <button class="btn-reset" onclick="resetGraphView()" title="Đặt lại góc nhìn">Đặt lại</button>
            <div id="search-results"></div>
        </div>
    </div>

    <div class="legend-panel">
        <div class="legend-section">
            <div class="legend-title">
                <span>Phe Phái (Nút)</span>
            </div>
            {faction_items_html}
        </div>
        <div class="legend-section" style="border-top: 1px solid rgba(240,246,252,0.1); padding-top: 10px;">
            <div class="legend-title">
                <span>Mối Quan Hệ (Đường)</span>
            </div>
            {edge_items_html}
        </div>
    </div>

    <div id="node-details-card">
        <button class="close-btn" onclick="closeDetailsCard()">×</button>
        <h3 id="card-name" style="color: #58a6ff;">Quý Bình An</h3>
        <div class="info-row" id="card-faction"></div>
        <div class="info-row" id="card-realm"></div>
        <div class="info-row" id="card-role"></div>
        <div class="info-row" id="card-arcs"></div>
        <div class="info-row" id="card-connections"></div>
    </div>

    <script>
        // Graph metadata passed from python
        const GRAPH_DATA = {json.dumps(graph_data, ensure_ascii=False)};
        const nodeMap = {{}};
        GRAPH_DATA.nodes.forEach(n => {{ nodeMap[n.id] = n; }});

        function handleSearch(val) {{
            const resultsBox = document.getElementById('search-results');
            if (!val || val.trim().length === 0) {{
                resultsBox.style.display = 'none';
                return;
            }}
            const q = val.trim().toLowerCase();
            const matches = GRAPH_DATA.nodes.filter(n => {{
                if (n.canonical_name.toLowerCase().includes(q)) return true;
                return n.aliases.some(a => a.toLowerCase().includes(q));
            }}).slice(0, 8);

            if (matches.length === 0) {{
                resultsBox.innerHTML = '<div class="search-item" style="color:#8b949e">Không tìm thấy nhân vật</div>';
            }} else {{
                resultsBox.innerHTML = matches.map(m => `
                    <div class="search-item" onclick="selectCharacter('${{m.id}}')">
                        <span>${{m.canonical_name}}</span>
                        <span style="font-size: 11px; color: ${{m.color}}">${{m.faction_group}}</span>
                    </div>
                `).join('');
            }}
            resultsBox.style.display = 'block';
        }}

        function selectCharacter(nodeId) {{
            document.getElementById('search-results').style.display = 'none';
            if (typeof network !== 'undefined') {{
                network.selectNodes([nodeId]);
                network.focus(nodeId, {{
                    scale: 1.3,
                    animation: {{ duration: 700, easingFunction: 'easeInOutQuad' }}
                }});
                showNodeCard(nodeId);
            }}
        }}

        function showNodeCard(nodeId) {{
            const n = nodeMap[nodeId];
            if (!n) return;
            const card = document.getElementById('node-details-card');
            document.getElementById('card-name').innerText = n.canonical_name;
            document.getElementById('card-name').style.color = n.color;
            document.getElementById('card-faction').innerHTML = `<strong>Phe phái:</strong> <span style="color:${{n.color}}">${{n.faction_group}}</span>`;
            document.getElementById('card-realm').innerHTML = `<strong>Cảnh giới:</strong> ${{n.martial_realm}} (Võ lực: ${{n.martial_power}})`;
            document.getElementById('card-role').innerHTML = `<strong>Vai trò:</strong> ${{n.role}}`;
            document.getElementById('card-arcs').innerHTML = `<strong>Xuất hiện:</strong> ${{n.arc_count}} Đại Hồi (Arcs)`;
            
            // Find connected neighbors
            const neighbors = GRAPH_DATA.edges.filter(e => e.source === nodeId || e.target === nodeId);
            const allyCount = neighbors.filter(e => e.relation_type === 'allies').length;
            const enemyCount = neighbors.filter(e => e.relation_type === 'enemies').length;
            const vassalCount = neighbors.filter(e => e.relation_type === 'lord-vassal').length;
            const familyCount = neighbors.filter(e => e.relation_type === 'family').length;
            const romanticCount = neighbors.filter(e => e.relation_type === 'romantic').length;

            document.getElementById('card-connections').innerHTML = `<strong>Liên kết (${{neighbors.length}}):</strong> ` +
                [
                    allyCount ? `<span style="color:#27AE60">Đồng minh: ${{allyCount}}</span>` : '',
                    enemyCount ? `<span style="color:#E74C3C">Kình địch: ${{enemyCount}}</span>` : '',
                    vassalCount ? `<span style="color:#2980B9">Quân thần: ${{vassalCount}}</span>` : '',
                    familyCount ? `<span style="color:#2ECC71">Gia tộc: ${{familyCount}}</span>` : '',
                    romanticCount ? `<span style="color:#FF69B4">Tình cảm: ${{romanticCount}}</span>` : ''
                ].filter(Boolean).join(' | ');

            card.style.display = 'block';
        }}

        function closeDetailsCard() {{
            document.getElementById('node-details-card').style.display = 'none';
        }}

        function filterByFaction(factionName) {{
            if (typeof network === 'undefined') return;
            const nodeIds = GRAPH_DATA.nodes.filter(n => n.faction_group === factionName).map(n => n.id);
            network.selectNodes(nodeIds);
            if (nodeIds.length > 0) {{
                network.fit({{ nodes: nodeIds, animation: {{ duration: 600 }} }});
            }}
        }}

        function filterByEdgeType(relType) {{
            if (typeof network === 'undefined') return;
            const edgeIds = [];
            const connectedNodes = new Set();
            GRAPH_DATA.edges.forEach((e, idx) => {{
                if (e.relation_type === relType) {{
                    connectedNodes.add(e.source);
                    connectedNodes.add(e.target);
                }}
            }});
            network.selectNodes(Array.from(connectedNodes));
        }}

        function resetGraphView() {{
            document.getElementById('char-search').value = '';
            document.getElementById('search-results').style.display = 'none';
            closeDetailsCard();
            if (typeof network !== 'undefined') {{
                network.unselectAll();
                network.fit({{ animation: {{ duration: 600, easingFunction: 'easeInOutQuad' }} }});
            }}
        }}

        // Listen for click event on nodes
        window.addEventListener('DOMContentLoaded', () => {{
            setTimeout(() => {{
                if (typeof network !== 'undefined') {{
                    network.on('selectNode', function(params) {{
                        if (params.nodes.length > 0) {{
                            showNodeCard(params.nodes[0]);
                        }}
                    }});
                    network.on('deselectNode', function() {{
                        closeDetailsCard();
                    }});
                }}
            }}, 500);
        }});
    </script>
    """

    # Inject right before </body>
    if "</body>" in html_content:
        html_content = html_content.replace("</body>", f"{custom_overlay}\n</body>")
    else:
        html_content += custom_overlay

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)


if __name__ == "__main__":
    create_relationship_graph()
