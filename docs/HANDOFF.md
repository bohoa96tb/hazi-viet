# Tiếp quản dự án 2.224 mục

Nguồn chính: bohoa96tb/hazi-viet; biên soạn `content/vocabulary-2224`, phát hành `main`. Đọc `AGENTS.md`, `PROMPT_TIEP_QUAN_DU_AN_2224.md`, `docs/CONTENT_STANDARD.md`, `docs/CONTENT_SCHEMA_V2.md`, `progress.json` và baseline tại HEAD mới nhất. Người dùng cho phép cập nhật `main` và triển khai sau khi kiểm tra; không hỏi lại thường lệ, không force-push.

## Trạng thái đợt 007

Đã hoàn tất 12 mục baseline 73–84: 洗、热、爱、球、白、笑、肉、花、茶、菜、雨、风. Đã xác nhận trên GitHub: 84/2.224, còn 2.140; tổng 94/2.234 bài đầy đủ, gồm 10 bài ngoài baseline. Commit nội dung được xác minh: 776234ddd73b740bb0ad2b75b362d750174bd859. Tiến độ và hash từng bài nằm trong `progress.json`.

Bài V2 dùng đúng hai câu chính mỗi mục. Đã sửa fixture trong `tools/vocabulary/verify-v2.mjs` để giữ correction đã có khi test thêm một câu sai tổng hợp; toàn bộ 12 bài qua verify sau khi sửa.

## Kiểm tra và phát hành

- `verifyV2`: 12/12 bài đạt; gồm audit schema, các màn renderer, audio tiếng Trung/Việt, cảnh báo câu sai, bài luyện/đáp án riêng và gợi ý tự dùng.
- `validateCourse`: 2.234 mục; 94 mục đầy đủ. Hash 72 bài đã hoàn thành và 10 hash baseline bảo vệ khớp trước/sau.
- Pages run 39743990647 hoàn tất thành công trên commit nội dung. Tệp khóa học live dài 2.680.784 byte; SHA256 `c16970cf19df773701df924db8b1b18c0b74d8d55158e513425940b390078e57`; có đủ 12 ID batch-007, lesson V2 và tổng 2.234 mục.
- Trình duyệt desktop live kiểm bài 洗 ordinal 73/sourceIndex 52: hai câu mẫu và bài tập có đáp án khóa. `test-dom.mjs` không chạy vì thiếu `happy-dom`; không xác nhận TTS/phát nền Android, mobile hoặc phản biện giáo viên độc lập.

## Đợt tiếp theo

Bắt đầu đúng baseline ordinal 85:
1. 下雨 (hz-h1-efc5a07d3d4f, sourceIndex 64)
2. 天气 (hz-h1-c4bc9119c0ea, sourceIndex 65)
3. 奶奶 (hz-h1-4b01c12e2fb5, sourceIndex 66)
4. 水果 (hz-h1-91011160c68e, sourceIndex 67)
5. 牛奶 (hz-h1-3f18a484d148, sourceIndex 68)
6. 鸡蛋 (hz-h1-4823c87cc791, sourceIndex 69)
7. 坏 (hz-h1-30c9c5791947, sourceIndex 70)
8. 多 (hz-h1-36e11bd81443, sourceIndex 71)
9. 大 (hz-h1-b83b12121e5b, sourceIndex 72)
10. 太 (hz-h1-f164a812765d, sourceIndex 73)
11. 好 (hz-h1-72f8c3542984, sourceIndex 74)
12. 小 (hz-h1-2bafadee60b3, sourceIndex 75)

Trạng thái triển khai mới nhất và các giới hạn được ghi trong `docs/RELEASE.md`, `data/vocabulary/release.json`. Luôn đọc HEAD, baseline và hash từ GitHub trước đợt kế tiếp.
