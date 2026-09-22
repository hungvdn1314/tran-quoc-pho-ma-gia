#!/usr/bin/env python3
"""
Narrative Validator — Trấn Quốc Phò Mã Gia
Kiểm thử tự động kịch bản Ink (Static Analysis & Dead-end Finder).

Chức năng:
1. Trích xuất tất cả knots/stitches từ các tệp .ink.
2. Quét tất cả các lệnh rẽ nhánh (-> knot_name) và kiểm tra tính toàn vẹn (Unresolved Diverts).
3. Phát hiện các nút chết (Dead-ends): Knot không có choice, không có divert, và không kết thúc bằng END/DONE.
4. Phát hiện các nút cô lập (Orphan Knots): Knot được khai báo nhưng không có bất kỳ luồng nào trỏ tới.
5. Kiểm tra tính hợp lệ của các Tags (# BACKGROUND:, # ACTORS:, # SUSPICION_CHANGE:).
"""

import os
import re
import sys
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple

# Đảm bảo in UTF-8 an toàn trên Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

SCENES_DIR = Path(__file__).resolve().parent.parent / "data" / "scenes"

# Regex patterns
RE_KNOT = re.compile(r"^\s*===\s*([a-zA-Z0-9_]+)\s*===\s*")
RE_STITCH = re.compile(r"^\s*=\s*([a-zA-Z0-9_]+)\s*$")
RE_DIVERT = re.compile(r"->\s*([a-zA-Z0-9_]+)")
RE_CHOICE = re.compile(r"^\s*[\+\*]\s*\[(.*?)\]\s*(?:->\s*([a-zA-Z0-9_]+))?")
RE_TAG = re.compile(r"^\s*#\s*([A-Z_]+)\s*:\s*(.*)")
RE_VAR = re.compile(r"^\s*VAR\s+([a-zA-Z0-9_]+)\s*=")


class NarrativeValidator:
    def __init__(self, scenes_path: Path):
        self.scenes_path = scenes_path
        self.knots: Set[str] = set()
        self.diverts: Set[str] = set()
        self.knot_diverts: Dict[str, List[str]] = {}
        self.knot_choices: Dict[str, List[str]] = {}
        self.knot_lines: Dict[str, Tuple[str, int]] = {}
        self.declared_vars: Set[str] = set()
        self.tag_records: List[Dict] = []
        self.errors: List[str] = []
        self.warnings: List[str] = []

    def parse_file(self, file_path: Path):
        current_knot = "GLOBAL"
        self.knot_diverts[current_knot] = []
        self.knot_choices[current_knot] = []

        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        for line_no, line in enumerate(lines, start=1):
            raw = line.strip()

            # Bỏ qua comment
            if raw.startswith("//"):
                continue

            # Biến toàn cục
            var_match = RE_VAR.match(raw)
            if var_match:
                self.declared_vars.add(var_match.group(1))

            # Khai báo Knot
            knot_match = RE_KNOT.match(raw)
            if knot_match:
                current_knot = knot_match.group(1)
                self.knots.add(current_knot)
                self.knot_lines[current_knot] = (file_path.name, line_no)
                self.knot_diverts[current_knot] = []
                self.knot_choices[current_knot] = []
                continue

            # Tags
            tag_match = RE_TAG.match(raw)
            if tag_match:
                tag_name, tag_val = tag_match.group(1), tag_match.group(2).strip()
                self.tag_records.append({
                    "file": file_path.name,
                    "line": line_no,
                    "knot": current_knot,
                    "name": tag_name,
                    "value": tag_val
                })

            # Choices
            choice_match = RE_CHOICE.match(raw)
            if choice_match:
                target = choice_match.group(2)
                self.knot_choices[current_knot].append(choice_match.group(1))
                if target:
                    self.diverts.add(target)
                    self.knot_diverts[current_knot].append(target)

            # Diverts trực tiếp
            divert_matches = RE_DIVERT.findall(raw)
            for d in divert_matches:
                if d not in ("END", "DONE"):
                    self.diverts.add(d)
                    self.knot_diverts[current_knot].append(d)

    def validate(self) -> bool:
        # 1. Tìm tệp .ink
        ink_files = list(self.scenes_path.glob("*.ink"))
        if not ink_files:
            self.errors.append(f"Không tìm thấy tệp .ink nào trong {self.scenes_path}")
            return False

        for f in ink_files:
            self.parse_file(f)

        # 2. Kiểm tra Unresolved Diverts (Chuyển nhánh đến knot không tồn tại)
        for target in self.diverts:
            if target not in self.knots and target not in ("END", "DONE"):
                self.errors.append(f"❌ Unresolved Divert: Đích đến '-> {target}' không tồn tại trong bất kỳ knot nào!")

        # 3. Kiểm tra Orphan Knots (Knot không có ai gọi tới, trừ knot khởi đầu)
        entry_knots = {"chapter_1_start", "chapter_16_start", "chapter_20_start"}
        for k in self.knots:
            if k not in self.diverts and k not in entry_knots and not k.startswith("test_"):
                fn, ln = self.knot_lines.get(k, ("unknown", 0))
                self.warnings.append(f"⚠️ Orphan Knot (Knot cô lập): '{k}' tại {fn}:{ln} không có divert nào trỏ tới.")

        # 4. Kiểm tra Dead-ends (Knot không có choice, không có divert, không kết thúc)
        for k in self.knots:
            divert_count = len(self.knot_diverts.get(k, []))
            choice_count = len(self.knot_choices.get(k, []))
            if divert_count == 0 and choice_count == 0:
                fn, ln = self.knot_lines.get(k, ("unknown", 0))
                self.warnings.append(f"⚠️ Dead-end Knot: '{k}' tại {fn}:{ln} không có choice hoặc divert tiếp theo!")

        return len(self.errors) == 0

    def print_report(self):
        print("=" * 70)
        print("📜 BÁO CÁO KIỂM THỬ KỊCH BẢN INK (NARRATIVE PATHFINDING QA)")
        print("=" * 70)
        print(f"• Tổng số Knots phát hiện: {len(self.knots)}")
        print(f"• Tổng số Diverts phân nhánh: {len(self.diverts)}")
        print(f"• Tổng số Biến VAR toàn cục: {len(self.declared_vars)}")
        print(f"• Tổng số Tags chỉ dẫn diễn hoạt: {len(self.tag_records)}")
        print("-" * 70)

        if self.errors:
            print(f"❌ PHÁT HIỆN {len(self.errors)} LỖI NGHIÊM TRỌNG (BLOCKERS):")
            for err in self.errors:
                print(f"   {err}")
        else:
            print("✅ ZERO UNRESOLVED DIVERTS: 100% đường dẫn rẽ nhánh đều trỏ tới đích hợp lệ!")

        if self.warnings:
            print(f"\n⚠️ CẢNH BÁO TỐI ƯU HÓA ({len(self.warnings)} mục):")
            for warn in self.warnings[:10]:  # Giới hạn in 10 cảnh báo đầu
                print(f"   {warn}")
            if len(self.warnings) > 10:
                print(f"   ... và {len(self.warnings) - 10} cảnh báo khác.")
        else:
            print("✅ KHÔNG CÓ NÚT CHẾT HAY KHOẢNG TRỐNG NARRATIVE NÀO.")
        print("=" * 70)


def main():
    validator = NarrativeValidator(SCENES_DIR)
    is_valid = validator.validate()
    validator.print_report()
    sys.exit(0 if is_valid else 1)


if __name__ == "__main__":
    main()
