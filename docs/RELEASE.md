# Phát hành batch-006

Mục baseline 61–72: 帮忙、怎么、手机、电话、说话、请进、请问、奶、树、歌、毛、水. Tiến độ đã xác minh GitHub 72/2.224, còn 2.152; toàn khóa 82/2.234 bài đầy đủ. Chỉ 12 record mục tiêu thay đổi; 70 bài đầy đủ trước đó và tất cả record khác giữ nguyên.

24 ví dụ chính, 20 nhóm bẫy, 34 câu luyện mở, 24 tình huống tự dùng với gợi ý ba mức. Không đổi renderer/audio hay dữ liệu học cá nhân. Có ví dụ tách 帮忙 với targetParts; 请进 được bỏ dấu ngoặc kép thừa từ phần giới thiệu thẻ tra cứu.

Đã chạy verify toàn khóa, DOM integration trên bài mới nhất và hồi quy V1/不用, kiểm đồng nhất ví dụ/ordinal baseline, đối chiếu chỉ 12 record thay đổi, cú pháp JS/MJS và diff --check. DOM không chứng nhận TTS Android; chưa phản biện giáo viên độc lập.

Đã đọc lại GitHub ở commit 190bfb38850f92d643fbace8d60e9b7e22ac4c45: progress 72/2.224 và toàn bộ nội dung khóa học khớp bản kiểm tra. SHA được ghi trong commit kế tiếp để tránh tự tham chiếu. Đã phát hành main và xác minh live riêng cho batch-006; xem kết quả dưới đây.

## Xác minh live batch-006

- Commit nội dung `190bfb38850f92d643fbace8d60e9b7e22ac4c45`; commit phát hành đã kiểm `f20c34b2e92fc60f09ec89f8425b5e340ee89cae`.
- [GitHub Pages run 39728329710](https://github.com/bohoa96tb/hazi-viet/actions/runs/39728329710): completed/success, head_sha đúng commit phát hành.
- Toàn bộ byte dữ liệu tải từ URL Pages khớp bản kiểm tra; SHA256 `2b3c43d000393c0f902daff2511a95bdb1f2686162421af85a3132372e00cee9`. Đủ 12 ID mới, lesson.version=2; 82 bài đầy đủ/2.234. Manifest live ghi batch-006, scopeCompleted=72, đúng contentCommit.
- Trình duyệt thật mở [帮忙](https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word=hz-h1-8df32f671cf0), hiện từ số 61 và sourceIndex 39; hai ví dụ; targetParts tô đậm đúng 帮 và 忙 khi tách; lời giải ẩn ban đầu rồi mở riêng sau thao tác. [Ảnh kiểm chứng desktop](verification/batch-006.jpg).
- Chưa kiểm Android TTS/phát nền và bố cục mobile; chưa phản biện giáo viên độc lập. Không có lỗi triển khai còn mở tại bản được kiểm. Lần mở trong lúc build còn là bản cũ; chỉ xác nhận sau build và đọc lại server, không quy cho cache điện thoại.
- Commit ghi xác minh này chỉ đổi tài liệu/manifest và thêm ảnh kiểm chứng, không đổi khóa học hoặc số hoàn thành.

---

## Lịch sử batch-005

Nội dung mới: mục baseline 49–60, 回、帮、打、找、电、等、话、请、问、不用、回答、多少. 60/2.224 đã hoàn thiện, còn 2.164; toàn khóa 70/2.234 bài đủ dữ liệu. Không sửa nội dung 58 bài V1 đã bảo vệ.

Hỗ trợ V2: hai câu gắn khung, bài mở tách lời giải, hai tình huống với ba mức gợi ý, audio Trung/Việt không lấy Pinyin, giữ bài V1.

Đã chạy verify toàn khóa, DOM integration, kiểm cú pháp JS/MJS và diff --check. Chưa kiểm bố cục trực quan và TTS trên Android thật; chưa phản biện giáo viên độc lập.

Đã đọc lại progress và toàn bộ blob khóa học trên GitHub ở commit 89ce086f352807e43a7c68abf105452b5bc4a17e: khớp dữ liệu đã kiểm tra, 60/2.224 mục. Commit này được ghi trong commit kế tiếp để tránh tự tham chiếu SHA. Manifest release.json chứa SHA256 khóa học. Trạng thái main/Pages/live cần đối chiếu lượt Actions đúng HEAD; xác minh live sẽ được ghi riêng sau phát hành.


## Xác minh bản đã triển khai

- Commit nội dung: `89ce086f352807e43a7c68abf105452b5bc4a17e`; commit phát hành đã kiểm `42e8d618328b8af123ee58d6cce3527eb8b60139`.
- GitHub Pages run [39726376368](https://github.com/bohoa96tb/hazi-viet/actions/runs/39726376368): completed / success, head_sha đúng commit phát hành.
- HTTP khóa học live khớp toàn bộ byte với bản đã kiểm; SHA256 `85fcd98d17c99d4bbb69bc9b0e0995146a90e1be6ca4556f60ff7e541161e89d`. Đủ 12 ID mới, lesson.version=2, 70 bài đầy đủ/2.234; manifest và vocabulary.js?v=batch-005 khớp.
- Trình duyệt live: bài 回 số 49; hai ví dụ gắn khung, không tab ví dụ lặp; lời giải không hiện ban đầu, mở riêng; mẫu tự dùng chỉ hiện ở mức gợi ý thứ ba. Đã xem ảnh bố cục đại diện desktop. Chưa kiểm mobile/Android, giọng TTS thiết bị và phản biện giáo viên độc lập.
- Commit ghi kết quả xác minh này chỉ đổi tài liệu/manifest, không đổi khóa học, số tiến độ, code hay hash bài cũ. Các đợt tiếp theo vẫn phải kiểm HEAD main/content và tiến độ thật.



## Đợt 007 — đang kiểm tra và phát hành

Mục baseline 73–84: 洗、热、爱、球、白、笑、肉、花、茶、菜、雨、风. Nội dung V2 có hai câu chính mỗi bài; đã chạy `verifyV2` cho 12 bài và `validateCourse` trên toàn khóa 2.234 từ (94 bài đầy đủ). Fixture của `verify-v2.mjs` được sửa để giữ các correction hiện có khi thêm câu sai tổng hợp; kiểm thử lại đạt.

Tiến độ cập nhật 84/2.224, còn 2.140; toàn khóa 94/2.234. Phát hành GitHub Pages và kiểm dữ liệu live đang chờ sau commit.
