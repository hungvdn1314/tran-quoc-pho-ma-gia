import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

print("ℹ️ [THÔNG BÁO] Hệ thống đồ thị đã được nâng cấp lên Character Graph V2 (120 nhân vật, PyVis tương tác cao cấp).")
print("ℹ️ Đang kích hoạt scripts/build_character_graph_v2.py...")

script_v2 = Path(__file__).resolve().parent / "build_character_graph_v2.py"
subprocess.run([sys.executable, str(script_v2)], check=True)
sys.exit(0)

net = Network(height="750px", width="100%", bgcolor="#1a1a2e", font_color="white", directed=True)

# Color mapping by faction
faction_colors = {
    "Quý Gia / Đại Hán": "#e94560",
    "Quý Gia": "#e94560",
    "Quý Gia (Lãnh tụ)": "#ffd700",
    "Hoàng Thất Đại Vũ": "#0f3460",
    "Hoàng Thất Đại Vũ / Quý Gia": "#16213e",
    "Quý Gia / Chiến Hổ Quân": "#e94560"
}

for node in data["nodes"]:
    nid = node["id"]
    label = node.get("label", nid)
    faction = node.get("faction", "Chưa rõ")
    realm = node.get("realm", "Phàm Nhân")
    role = node.get("role", "")
    power = node.get("power", 50)
    is_spirit = node.get("is_spirit", False)
    
    color = faction_colors.get(faction, "#533483")
    if is_spirit:
        title = f"<b>{label}</b> (Anh Linh Tam Quốc)<br>Cảnh giới: {realm}<br>Võ lực: {power}<br>Vai trò: {role}"
        size = 25
    else:
        title = f"<b>{label}</b><br>Phe: {faction}<br>Cảnh giới: {realm}<br>Võ lực: {power}<br>Vai trò: {role}"
        size = 35 if "QUY_BINH_AN" in nid else 20
        
    net.add_node(nid, label=label, title=title, color=color, size=size)

for link in data["links"]:
    source = link["source"]
    target = link["target"]
    relation = link.get("relation", "")
    net.add_edge(source, target, title=relation, label=relation, color="#aaaaaa")

net.set_options("""
var options = {
  "physics": {
    "barnesHut": {
      "gravitationalConstant": -4000,
      "centralGravity": 0.3,
      "springLength": 120
    }
  }
}
""")

net.write_html(str(html_out))
print(f"✓ Saved interactive character network graph to {html_out}")
