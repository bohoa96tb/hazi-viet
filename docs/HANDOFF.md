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

## Trạng thái đợt 008

Đã hoàn tất baseline ordinal 85–96: 下雨、天气、奶奶、水果、牛奶、鸡蛋、坏、多、大、太、好、小. Đã xác nhận trên GitHub: 96/2.224, còn 2.128; tổng khóa 106/2.234 bài đầy đủ, gồm 10 bài ngoài baseline. Commit nội dung: ffa5dfe57c211a1a17738dceb55993844c75fefb. Hash từng mục mới và tiến độ ở progress.json.

- `process-batch.mjs apply` và `verify` đạt: đúng cohort liên tục, 2.234 ID/thứ tự/liên kết bài, 106 bài đủ cấu trúc, hash 84 bài cũ và 10 bài được bảo vệ khớp.
- `verifyV2` 12/12 qua các audit, màn renderer, câu mẫu, audio, bài tập, đáp án khóa và gợi ý tự dùng; 15 trường hợp câu sai cũ được cảnh báo/sửa đúng trong hồi quy.
- Đã kiểm JSON, cú pháp JS liên quan và `git diff --check`. Live course SHA256 `bfef9291996769c5b9e0863bb80cc104780df2dff9deee69435da92b1758fc35`, 2.773.075 byte, 2.234 từ; đủ 12 ID batch-008, version 2, status deep. Pages run 39749818404 thành công trên SHA nội dung.
- Desktop live mở 好 ordinal 95/sourceIndex 74: thấy chuẩn V2, đúng hai câu chính, bẫy, và bài luyện không lộ đáp án trước thao tác. Các mục đọc 奶奶/牛奶/好 được đối chiếu thêm với từ điển Bộ Giáo dục.
- `test-dom.mjs` không chạy vì thiếu `happy-dom`; chưa kiểm bố cục mobile, TTS/phát nền Android thật hoặc phản biện giáo viên độc lập.

## Đợt tiếp theo

Bắt đầu đúng baseline ordinal 97:
1. 少 (hz-h1-733609098341, sourceIndex 76)
2. 差 (hz-h1-efc194540750, sourceIndex 77)
3. 很 (hz-h1-754e4b61ec92, sourceIndex 78)
4. 快 (hz-h1-22182cf36a90, sourceIndex 79)
5. 慢 (hz-h1-eca0ce94b683, sourceIndex 80)
6. 真 (hz-h1-878a1cbed839, sourceIndex 81)
7. 老 (hz-h1-9a887a256484, sourceIndex 82)
8. 贵 (hz-h1-b5fd29f3a43f, sourceIndex 83)
9. 过 (hz-h1-9dac1ef58f36, sourceIndex 84)
10. 远 (hz-h1-10ee35f935b7, sourceIndex 85)
11. 重 (hz-h1-42d1804d6de2, sourceIndex 86)
12. 错 (hz-h1-d59b70a3b4f4, sourceIndex 87)

Trạng thái phát hành: docs/RELEASE.md và data/vocabulary/release.json. Luôn đọc lại HEAD/baseline/progress/hash GitHub trước đợt tiếp theo.
