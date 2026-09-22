#!/usr/bin/env python3
"""
Asset Compressor — Trấn Quốc Phò Mã Gia
Chuyển đổi và nén tối ưu hóa hình ảnh sang WebP/AVIF hiện đại.

Mục tiêu:
1. Quét prototype/assets/images/ tìm các file PNG và JPG lớn.
2. Nén sang .webp với tỷ lệ giữ nguyên độ trong suốt (Alpha Channel) và chi tiết thủy mặc.
3. Báo cáo dung lượng tiết kiệm (Size reduction percentage).
"""

import os
import sys
from pathlib import Path
from PIL import Image

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

IMAGES_DIR = Path(__file__).resolve().parent.parent / "prototype" / "assets" / "images"


def compress_image_to_webp(src_path: Path, quality: int = 85) -> tuple[int, int]:
    """Nén 1 file ảnh sang webp và lưu cùng thư mục."""
    dst_path = src_path.with_suffix(".webp")

    with Image.open(src_path) as img:
        # Nếu là RGBA thì dùng nén có kênh Alpha
        if img.mode in ("RGBA", "LA"):
            img.save(dst_path, "WEBP", quality=quality, method=6)
        else:
            # Chuyển sang RGB nếu đang là CMYK hoặc Palette
            if img.mode != "RGB":
                img = img.convert("RGB")
            img.save(dst_path, "WEBP", quality=quality, method=6)

    orig_size = src_path.stat().st_size
    new_size = dst_path.stat().st_size
    return orig_size, new_size


def run_compression_pipeline(dry_run: bool = False, max_files: int = 20):
    print("=" * 70)
    print("🖼️ BẮT ĐẦU PIPELINE NÉN TÀI NGUYÊN ĐỒ HỌA SANG WEBP")
    print("=" * 70)
    print(f"• Thư mục mục tiêu: {IMAGES_DIR}")
    print(f"• Chế độ Dry-Run: {dry_run}")
    print("-" * 70)

    # Ưu tiên nén các standee chính thức và cảnh nền chính thức
    target_patterns = ["actor_*.png", "bg_*.jpg"]
    files_to_compress = []
    for pat in target_patterns:
        files_to_compress.extend(list(IMAGES_DIR.glob(pat)))

    total_orig = 0
    total_new = 0
    processed_count = 0

    for f in sorted(files_to_compress)[:max_files]:
        orig_kb = f.stat().st_size / 1024
        if dry_run:
            est_kb = orig_kb * 0.35  # Ước tính giảm ~65%
            print(f"  [Dry-Run] {f.name:30} : {orig_kb:7.1f} KB ──→ ~{est_kb:6.1f} KB (-65%)")
            total_orig += f.stat().st_size
            total_new += int(f.stat().st_size * 0.35)
        else:
            orig_b, new_b = compress_image_to_webp(f, quality=85)
            total_orig += orig_b
            total_new += new_b
            saved_pct = (1 - (new_b / orig_b)) * 100
            print(f"  [Compressed] {f.name:28} : {orig_b/1024:7.1f} KB ──→ {new_b/1024:6.1f} KB (-{saved_pct:4.1f}%)")
        processed_count += 1

    print("-" * 70)
    orig_mb = total_orig / (1024 * 1024)
    new_mb = total_new / (1024 * 1024)
    saved_mb = orig_mb - new_mb
    overall_pct = (1 - (total_new / total_orig)) * 100 if total_orig > 0 else 0

    print(f"• Tổng số tệp đã xử lý: {processed_count}")
    print(f"• Dung lượng ban đầu: {orig_mb:.2f} MB")
    print(f"• Dung lượng sau nén: {new_mb:.2f} MB")
    print(f"• Đã tiết kiệm: {saved_mb:.2f} MB ({overall_pct:.1f}% dung lượng băng thông!)")
    print("=" * 70)


if __name__ == "__main__":
    dry_run_flag = "--dry-run" in sys.argv
    run_compression_pipeline(dry_run=dry_run_flag, max_files=22)
