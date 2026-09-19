import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'data\game_bible_v2\characters.json', 'r', encoding='utf-8') as f:
    chars = json.load(f)

with open(r'data\game_bible_v2\organizations.json', 'r', encoding='utf-8') as f:
    orgs = json.load(f)

with open(r'data\game_bible_v2\battles.json', 'r', encoding='utf-8') as f:
    battles = json.load(f)

# Build entity dictionary
id_to_char = {c['id']: c for c in chars}
name_to_id = {}
alias_to_id = {}

for c in chars:
    cid = c['id']
    name_to_id[c['canonical_name'].strip()] = cid
    for a in c.get('aliases', []):
        alias_to_id[a.strip()] = cid

# Sort names and aliases by length descending so longer matches take precedence
all_name_aliases = []
for name, cid in name_to_id.items():
    if len(name) >= 3:
        all_name_aliases.append((name, cid))
for alias, cid in alias_to_id.items():
    # skip very short or generic aliases
    if len(alias) >= 3 and alias.lower() not in ["chúa công", "chủ nhân", "hoàng đế", "hoàng hậu", "thái tử", "đại ca", "nhị ca", "tam ca"]:
        all_name_aliases.append((alias, cid))

all_name_aliases.sort(key=lambda x: len(x[0]), reverse=True)

print(f"Total characters: {len(chars)}")
print(f"Total name/alias matchers: {len(all_name_aliases)}")

def find_characters_in_text(text):
    if not text:
        return set()
    found = set()
    # Check direct CHAR_ IDs
    for match in re.findall(r'CHAR_[A-Z0-9_]+', text):
        if match in id_to_char:
            found.add(match)
    
    # Check names / aliases
    for name_alias, cid in all_name_aliases:
        # regex boundary or simple in
        if name_alias in text:
            found.add(cid)
    return found

# Test relationship extraction from characters.json
print("\nTesting relationship parsing from characters.json:")
char_edges = []
for c in chars:
    src_id = c['id']
    src_name = c['canonical_name']
    rels = c.get('relationships', {})
    if not isinstance(rels, dict):
        continue
    
    for rel_key, rel_val in rels.items():
        if rel_key.startswith('CHAR_'):
            # Key is character ID!
            target_id = rel_key
            if target_id in id_to_char:
                char_edges.append((src_id, target_id, rel_val, rel_key))
        else:
            # Value is text, rel_key is category (e.g. monarch, allies, rivals, family, husband, etc.)
            val_str = str(rel_val)
            targets = find_characters_in_text(val_str)
            for tid in targets:
                if tid != src_id:
                    char_edges.append((src_id, tid, f"{rel_key}: {val_str[:40]}", rel_key))

print(f"Extracted {len(char_edges)} direct relationships from characters.json")
for e in char_edges[:15]:
    s_name = id_to_char[e[0]]['canonical_name']
    t_name = id_to_char[e[1]]['canonical_name']
    print(f"  {s_name} -> {t_name} | Key: {e[3]} | Info: {e[2]}")
