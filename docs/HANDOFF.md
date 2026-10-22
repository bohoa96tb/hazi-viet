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
- Đã kiểm JSON, cú pháp JS liên quan và `git diff --check`. Live course SHA256 `bfef9291996769c5b9e0863bb80cc104780df2dff9deee69435da92b1758fc35`, 2.773.075 byte, 2.234 từ; đủ 12 ID batch-008, version 2, status deep. Pages run 39749818404 thành công trên SHA nội dung. Commit ghi tracker 49c58c1df00543624269a29c74b0c646d31f0048 và Pages run 39750423025 cũng thành công; tracker không đổi dữ liệu khóa học.
- Desktop live mở 好 ordinal 95/sourceIndex 74: thấy chuẩn V2, đúng hai câu chính, bẫy, và bài luyện không lộ đáp án trước thao tác. Các mục đọc 奶奶/牛奶/好 được đối chiếu thêm với từ điển Bộ Giáo dục.
- `test-dom.mjs` không chạy vì thiếu `happy-dom`; chưa kiểm bố cục mobile, TTS/phát nền Android thật hoặc phản biện giáo viên độc lập.

## Trạng thái đợt 009

Đã hoàn tất baseline ordinal 97–108: 少、差、很、快、慢、真、老、贵、过、远、重、错. Đã xác nhận trên GitHub: 108/2.224, còn 2.116; tổng khóa 118/2.234 bài đủ cấu trúc, gồm 10 mục hoàn thiện trước baseline. Commit nội dung `db829fb8c39c119a4b88c47c9c7312c668a01344`; các hash bài mới được lưu trong `progress.json`.

- `process-batch.mjs apply`, `refresh`, `verify` đạt; đúng ID, thứ tự và cohort liên tục, 2.234 liên kết bài, hash 96 bài trước và 10 bài bảo vệ không đổi. 12 mục mới dùng đúng hai ví dụ chính, 13 nhóm bẫy có câu đối chiếu, đề và đáp án riêng, hai tình huống tự dùng.
- `verifyV2` và `validateCourse` đạt; kiểm cú pháp JavaScript và `git diff --check` đạt. `test-dom.mjs` đạt sau khi cài Happy DOM trong `/tmp`; không thêm dependency vào sản phẩm.
- Pages run [39754129731](https://github.com/bohoa96tb/hazi-viet/actions/runs/39754129731) thành công trên đúng commit nội dung. Dữ liệu live tải 2.863.798 byte, SHA256 `b302ae8d657ec03fb4eba70ddc373463c57d175af034c4dbe0f0364c55d4c296`, có đủ 2.234 từ, 118 bài đủ cấu trúc và 12 bài mới phiên bản 2.
- Trình duyệt desktop live mở 少 ordinal 97/sourceIndex 76: thấy hai câu chính; hai bẫy phân biệt lượng với kích thước và cách đọc trong 少年; đáp án E ẩn trước thao tác. Chưa kiểm Android TTS/phát nền hoặc phản biện giáo viên độc lập.


## Trạng thái đợt batch-014

Đã biên soạn baseline ordinal 157–168: 钱包、门口、饭店、五、哥、妈、妹、姐、子、常、弟、手. Tiến độ sau batch: 168/2224; còn 2056; toàn khóa 178/2234 mục đủ cấu trúc. Nội dung V2 gồm hai ví dụ chính, bẫy theo ngữ cảnh, hai câu luyện có đáp án riêng và hai tình huống tự dùng. Đã tự rà và đối chiếu từ điển Bộ Giáo dục Đài Loan khi có mục từ; chưa có phản biện giáo viên độc lập.

Phát hành Pages và kiểm tra live cần xác nhận sau khi commit. Chưa kiểm audio trên thiết bị Android.

## Đợt tiếp theo

1. 爸 (hz-h1-f11409a4c688, sourceIndex 148)
2. 儿子 (hz-h1-d9629d68254a, sourceIndex 149)
3. 哥哥 (hz-h1-079686d86ab4, sourceIndex 151)
4. 女儿 (hz-h1-c88d3bcef8b6, sourceIndex 152)
5. 女朋友 (hz-h1-7567d7604868, sourceIndex 153)
6. 妈妈 (hz-h1-048cf67d79cd, sourceIndex 154)
7. 妹妹 (hz-h1-b78f99866010, sourceIndex 155)
8. 姐姐 (hz-h1-2b1dac7c586f, sourceIndex 156)
9. 家人 (hz-h1-0cab89fe1634, sourceIndex 157)
10. 小姐 (hz-h1-e07066fa7728, sourceIndex 158)
11. 弟弟 (hz-h1-289012dc14bb, sourceIndex 159)
12. 爷爷 (hz-h1-d11fb38916bc, sourceIndex 160)
