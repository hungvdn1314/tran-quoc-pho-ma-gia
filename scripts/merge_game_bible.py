"""
Merge all 5 arc extraction files into a unified, deduplicated Game Bible.
Handles variations in key names across different arc files.
"""
import json
import sys
import os
from pathlib import Path
from collections import OrderedDict

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = Path("c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data")
OUTPUT_DIR = DATA_DIR / "game_bible_v2"
OUTPUT_DIR.mkdir(exist_ok=True)

# Key mapping: normalize different key names across arc files
KEY_MAP = {
    "characters": ["characters"],
    "organizations": ["organizations", "organizations_and_forces"],
    "battles": ["battles"],
    "key_plot_events": ["key_plot_events"],
    "locations": ["locations"],
    "technologies": ["technologies_and_inventions", "technology_and_inventions", 
                     "technology_inventions", "technologies_and_artifacts"],
    "political_events": ["political_events", "political_and_court_events"],
}

def load_arc_files():
    """Load all extraction files."""
    arcs = []
    for fname in sorted(os.listdir(DATA_DIR)):
        if fname.startswith("extraction_arc") and fname.endswith(".json"):
            fpath = DATA_DIR / fname
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)
            arcs.append({"filename": fname, "data": data})
            print(f"  Loaded {fname}")
    return arcs

def extract_category(arcs, target_key, source_keys):
    """Extract and merge a category from all arc files."""
    merged = []
    for arc in arcs:
        data = arc["data"]
        for sk in source_keys:
            if sk in data and isinstance(data[sk], list):
                for item in data[sk]:
                    item["_source_arc"] = arc["filename"]
                merged.extend(data[sk])
                break
    return merged

def deduplicate_characters(chars):
    """Deduplicate characters by name, merging info from multiple arcs."""
    seen = OrderedDict()
    for ch in chars:
        # Get character name - handle various key names
        name = (ch.get("canonical_name") or ch.get("name") or 
                ch.get("character_name") or ch.get("tên") or "")
        if not name:
            # Try to find any key that looks like a name
            for k in ["name_vi", "ten", "nhan_vat"]:
                if k in ch:
                    name = ch[k]
                    break
        if not name:
            continue
            
        # Normalize name for dedup
        name_key = name.strip().lower()
        
        if name_key not in seen:
            seen[name_key] = ch
        else:
            # Merge: keep existing but add new info
            existing = seen[name_key]
            for k, v in ch.items():
                if k == "_source_arc":
                    # Track all source arcs
                    if "_source_arcs" not in existing:
                        existing["_source_arcs"] = [existing.get("_source_arc", "")]
                    existing["_source_arcs"].append(v)
                elif k not in existing or (not existing[k] and v):
                    existing[k] = v
                elif isinstance(v, str) and isinstance(existing.get(k), str):
                    if len(v) > len(existing[k]):
                        existing[k] = v  # Keep longer description
    
    return list(seen.values())

def deduplicate_by_name(items, name_keys=None):
    """Generic deduplication by name field."""
    if name_keys is None:
        name_keys = ["name", "canonical_name", "battle_name", "event_name", 
                     "location_name", "tech_name", "tên", "ten"]
    
    seen = OrderedDict()
    for item in items:
        name = ""
        for nk in name_keys:
            if nk in item and item[nk]:
                name = item[nk]
                break
        if not name:
            # Use first string value as name
            for v in item.values():
                if isinstance(v, str) and len(v) > 2:
                    name = v
                    break
        
        name_key = name.strip().lower() if name else str(len(seen))
        
        if name_key not in seen:
            seen[name_key] = item
        else:
            # Merge additional info
            existing = seen[name_key]
            for k, v in item.items():
                if k not in existing or (not existing.get(k) and v):
                    existing[k] = v
    
    return list(seen.values())

def extract_system_mechanics(arcs):
    """Extract system mechanics from arc files that have them."""
    mechanics = {}
    for arc in arcs:
        data = arc["data"]
        for key in ["system_mechanics_upgrade", "system_mechanics", "he_thong"]:
            if key in data:
                mechanics[arc["filename"]] = data[key]
    return mechanics

def build_game_bible():
    print("=" * 60)
    print("BUILDING UNIFIED GAME BIBLE V2")
    print("=" * 60)
    
    # Load all arc files
    print("\n[1/6] Loading arc extraction files...")
    arcs = load_arc_files()
    
    # Extract and merge each category
    print("\n[2/6] Merging categories...")
    raw_data = {}
    for target_key, source_keys in KEY_MAP.items():
        items = extract_category(arcs, target_key, source_keys)
        raw_data[target_key] = items
        print(f"  {target_key}: {len(items)} raw items")
    
    # Deduplicate
    print("\n[3/6] Deduplicating...")
    deduped = {
        "characters": deduplicate_characters(raw_data["characters"]),
        "organizations": deduplicate_by_name(raw_data["organizations"]),
        "battles": deduplicate_by_name(raw_data["battles"]),
        "key_plot_events": raw_data["key_plot_events"],  # Events are unique per chapter
        "locations": deduplicate_by_name(raw_data["locations"]),
        "technologies": deduplicate_by_name(raw_data["technologies"]),
        "political_events": raw_data["political_events"],  # Also unique
    }
    
    for cat, items in deduped.items():
        print(f"  {cat}: {len(items)} after dedup")
    
    # Extract system mechanics
    print("\n[4/6] Extracting system mechanics...")
    system_mechanics = extract_system_mechanics(arcs)
    
    # Build master Game Bible
    print("\n[5/6] Building master Game Bible...")
    game_bible = {
        "metadata": {
            "title": "Trấn Quốc Phò Mã Gia - Game Bible V2",
            "novel": "Trấn Quốc Phò Mã Gia (鎮國駙馬爺)",
            "author": "Hiên Chí (轩轾)",
            "total_chapters": 1509,
            "total_words": 2468141,
            "extraction_source": "Deep chapter-by-chapter analysis of all 1509 chapters",
            "version": "2.0",
        },
        "statistics": {
            "total_characters": len(deduped["characters"]),
            "total_organizations": len(deduped["organizations"]),
            "total_battles": len(deduped["battles"]),
            "total_key_events": len(deduped["key_plot_events"]),
            "total_locations": len(deduped["locations"]),
            "total_technologies": len(deduped["technologies"]),
            "total_political_events": len(deduped["political_events"]),
            "grand_total_elements": sum(len(v) for v in deduped.values()),
        },
        "system_mechanics": system_mechanics,
        **deduped
    }
    
    # Save master file
    master_path = OUTPUT_DIR / "game_bible_v2_master.json"
    with open(master_path, "w", encoding="utf-8") as f:
        json.dump(game_bible, f, ensure_ascii=False, indent=2)
    
    # Save individual category files
    print("\n[6/6] Saving individual category files...")
    for cat, items in deduped.items():
        cat_path = OUTPUT_DIR / f"{cat}.json"
        with open(cat_path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
        print(f"  Saved {cat}.json ({len(items)} items)")
    
    # Save system mechanics
    mech_path = OUTPUT_DIR / "system_mechanics.json"
    with open(mech_path, "w", encoding="utf-8") as f:
        json.dump(system_mechanics, f, ensure_ascii=False, indent=2)
    
    # Print final summary
    print("\n" + "=" * 60)
    print("✅ GAME BIBLE V2 COMPLETE!")
    print("=" * 60)
    master_kb = os.path.getsize(master_path) / 1024
    print(f"\nMaster file: {master_path} ({master_kb:.0f} KB)")
    print(f"\nStatistics:")
    for k, v in game_bible["statistics"].items():
        print(f"  {k}: {v}")
    
    # Compare with v1
    print(f"\n📊 COMPARISON WITH V1:")
    print(f"  Characters: 22 → {game_bible['statistics']['total_characters']} ({game_bible['statistics']['total_characters']/22:.0f}x improvement)")
    print(f"  Battles: 6 → {game_bible['statistics']['total_battles']} ({game_bible['statistics']['total_battles']/6:.0f}x improvement)")
    print(f"  Events: 3 → {game_bible['statistics']['total_key_events']} ({game_bible['statistics']['total_key_events']/3:.0f}x improvement)")
    print(f"  Technologies: 7 → {game_bible['statistics']['total_technologies']} ({game_bible['statistics']['total_technologies']/7:.0f}x improvement)")
    print(f"  Organizations: 0 → {game_bible['statistics']['total_organizations']} (NEW!)")
    print(f"  Locations: 0 → {game_bible['statistics']['total_locations']} (NEW!)")
    print(f"  Political: 0 → {game_bible['statistics']['total_political_events']} (NEW!)")

if __name__ == "__main__":
    build_game_bible()
