---
name: novel-crawler
description: Pipeline cào và chuẩn hóa văn bản truyện chữ mạng (tiểu thuyết) với cơ chế đa luồng không đồng bộ (async), giới hạn tốc độ (rate-limiting), thử lại thông minh (exponential backoff) và lưu trữ checkpoint phục hồi bằng SQLite.
---

# Novel Crawler Pipeline Skill

Quy chuẩn và công cụ thu thập toàn bộ chương tiểu thuyết từ các website truyện tiếng Việt (cụ thể: tvtruyen.live) về máy tính để phục vụ phân tích ngôn ngữ tự nhiên và xây dựng Game Design Document.

## Cấu Trúc Script
- `scripts/crawler.py`: Engine tải async dùng `httpx` kết hợp `aiolimiter` (3-5 req/s) và `tenacity`.
- `scripts/consolidate.py`: Tổng hợp từ `chapters_raw.jsonl` thành file JSON tổng có metadata đầy đủ.

## Tiêu Chuẩn Trích Xuất Dữ Liệu
Mỗi chương sau khi trích xuất phải đạt các tiêu chí:
1. Tiêu đề chương rõ ràng (bóc tách cả số chương và tên chương).
2. Nội dung sạch: đã decompose toàn bộ quảng cáo, thẻ script, watermark trang web (`tvtruyen`, `xem bản dịch...`).
3. Đếm số đoạn văn (paragraph count) và số từ (word count).
4. Lưu nguyên vẹn dấu tiếng Việt chuẩn UTF-8.

## Checkpoint & Resume
Queue được lưu trong database SQLite (`data/crawler_state.db`). Khi một request thành công, trạng thái chuyển thành `completed` và ghi ngay 1 dòng vào `data/chapters_raw.jsonl`. Nếu quá trình bị gián đoạn, chỉ cần chạy lại script, crawler sẽ tự động tiếp tục các chương còn `pending` hoặc `failed`.
