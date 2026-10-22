# Phát hành batch-016

Đợt 181–192: 爸爸、不、吗、对、有、没、的、还、是不是、有些、有时、有用. Tiến độ dự kiến sau batch: 192/2.224; còn 2.032; toàn khóa đủ cấu trúc 202/2.234.

- Nội dung đã qua auditV2 (12/12), validateCourse (2.234 từ), 36 lượt render ba màn cho từng bài, 12 bài kiểm tra audio và playlist immersion.
- Course source SHA256: `41988e9e358f0620e3b3e98e48cf302c25a0d01b09fc33f15de46c416607ded0`. Commit, Pages và live routes chưa xác minh.
- Chưa kiểm TTS/phát nền Android hoặc phản biện giáo viên độc lập.

---

# Phát hành batch-015

Mục baseline 169–180: 爸、儿子、哥哥、女儿、女朋友、妈妈、妹妹、姐姐、家人、小姐、弟弟、爷爷. Tiến độ: 180/2.224; còn 2.044; toàn khóa đủ cấu trúc 190/2.234, gồm 10 mục ngoài baseline.

- Commit nội dung [85a590fc47ddce64f41616875d3db33cac0c27c6](https://github.com/bohoa96tb/hazi-viet/commit/85a590fc47ddce64f41616875d3db33cac0c27c6); đã fast-forward sang main.
- [GitHub Pages run 39796683993](https://github.com/bohoa96tb/hazi-viet/actions/runs/39796683993) hoàn tất thành công trên đúng commit.
- Đã mở đủ 12 route live; mọi route hiện BÀI HỌC ĐẦY ĐỦ, chuẩn V2, đúng ordinal/sourceIndex.
- Kiểm thứ tự 2.234 mục, liên kết bài và hash 168 mục đã hoàn thành trước đó cùng 10 hash bảo vệ: đạt.
- SHA256 của file course trong commit: `7e2c17edb01fef7dc61adc69f76c759089a74f065008ef7ad4f8472d863562ff`. Chưa tải bytes trực tiếp từ Pages để đối chiếu hash live.
- Chưa kiểm TTS/phát nền Android hoặc phản biện giáo viên độc lập.

Đợt kế tiếp bắt đầu tại ordinal 181; danh sách ID/sourceIndex nằm trong progress.json.

---

# Phát hành batch-014

Mục baseline 157–168: 钱包、门口、饭店、五、哥、妈、妹、姐、子、常、弟、手. Tiến độ: 168/2.224; còn 2.056; toàn khóa đủ cấu trúc 178/2.234, gồm 10 mục ngoài baseline.

- Commit nội dung [d9f1a7a5f7c322b7610124fd064b81c6d33b9dc4](https://github.com/bohoa96tb/hazi-viet/commit/d9f1a7a5f7c322b7610124fd064b81c6d33b9dc4); main đã fast-forward.
- [GitHub Pages run 39789475190](https://github.com/bohoa96tb/hazi-viet/actions/runs/39789475190) completed/success trên đúng commit nội dung.
- Trên Pages live, cả 12 ID ordinal 157–168 mở được với trạng thái BÀI HỌC ĐẦY ĐỦ/chuẩn V2. Đã kiểm giao diện 钱包, 饭店 và 手; thấy nội dung, năm bước và bài học mới.
- courseSha256 trong manifest là hash của tệp nguồn tại commit; lượt này chưa tải trực tiếp tệp Pages để đối chiếu byte và không ghi hash live riêng.
- Kiểm schema V2 và hash 156 mục cũ/10 mục bảo vệ đạt trước phát hành. Chưa kiểm TTS/phát nền Android hoặc phản biện giáo viên độc lập.

Đợt tiếp theo bắt đầu tại ordinal 169: 爸 (hz-h1-f11409a4c688), rồi 儿子、哥哥、女儿、女朋友、妈妈、妹妹、姐姐、家人、小姐、弟弟、爷爷.

---

# Phát hành batch-009

Mục baseline 97–108: 少、差、很、快、慢、真、老、贵、过、远、重、错. Tiến độ đã xác minh GitHub: 108/2.224, còn 2.116; toàn khóa đủ cấu trúc 118/2.234, gồm 10 mục ngoài baseline. Không sửa mục cũ.

- Commit nội dung [db829fb8c39c119a4b88c47c9c7312c668a01344](https://github.com/bohoa96tb/hazi-viet/commit/db829fb8c39c119a4b88c47c9c7312c668a01344); đã cập nhật `main` theo fast-forward.
- [GitHub Pages run 39754129731](https://github.com/bohoa96tb/hazi-viet/actions/runs/39754129731) thành công trên đúng SHA commit nội dung.
- Tệp khóa học live dài 2,863,798 byte, SHA256 `b302ae8d657ec03fb4eba70ddc373463c57d175af034c4dbe0f0364c55d4c296`; tải trực tiếp từ URL Pages khớp đúng file đã kiểm. Có 2.234 từ, 118 bài đủ cấu trúc và đủ 12 ID batch-009.
- `process-batch.mjs apply`, `refresh`, `verify`; `verifyV2`, `validateCourse`, kiểm tra schema, ID/thứ tự/đường dẫn/hash; `node --check`, `git diff --check` và `test-dom.mjs` đều đạt. DOM test không chứng nhận bố cục mobile hoặc TTS Android.
- Trình duyệt desktop live mở 少 ordinal 97/sourceIndex 76: hai câu chính, hai bẫy, phần luyện và khóa đáp án trước thao tác đều hiện đúng. Chưa có phản biện giáo viên độc lập hoặc kiểm Android TTS/phát nền.
- Phiên bản cache HTML và JS đã đổi sang `batch-009`; manifest phát hành ghi nhận commit nội dung, số mục, SHA dữ liệu live và Pages run.

Đợt tiếp theo bắt đầu tại ordinal 109: 难 (sourceIndex 88), rồi 高、不大、不对、重要、做、动、学、干、忙、用、看.

---

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




## Xác minh live batch-007

- Commit nội dung `776234ddd73b740bb0ad2b75b362d750174bd859`; [GitHub Pages run 39743990647](https://github.com/bohoa96tb/hazi-viet/actions/runs/39743990647) hoàn tất thành công với `head_sha` đúng commit nội dung.
- Tải trực tiếp `https://bohoa96tb.github.io/hazi-viet/data/vocabulary/hanzii-course.json`: 2.680.784 byte, SHA256 `c16970cf19df773701df924db8b1b18c0b74d8d55158e513425940b390078e57`; đủ 2.234 mục và đủ 12 ID batch-007, tất cả `status=deep`, `lesson.version=2`. Manifest live khớp SHA và commit.
- Trình duyệt thật tại [bài 洗](https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word=hz-h1-0896d5d77abe): ordinal 73/sourceIndex 52, chuẩn V2, đúng hai ví dụ; bài luyện hiển thị riêng và lời giải đóng trước khi thử. Ảnh chụp đã lưu kèm báo cáo.
- Đã chạy `verifyV2` cho 12 bài, `validateCourse` cho 2.234 mục (94 bài đầy đủ), xác nhận 82 hash cũ/bảo vệ khớp; kiểm JSON và audio/safety qua bộ test V2. `test-dom.mjs` không chạy vì môi trường này không có `happy-dom`; chưa kiểm trên Android/mobile và chưa có phản biện giáo viên độc lập.


## Xác minh live batch-008

- Commit nội dung [ffa5dfe57c211a1a17738dceb55993844c75fefb](https://github.com/bohoa96tb/hazi-viet/commit/ffa5dfe57c211a1a17738dceb55993844c75fefb); [GitHub Pages run 39749818404](https://github.com/bohoa96tb/hazi-viet/actions/runs/39749818404) hoàn tất thành công, đúng SHA commit nội dung.
- [Dữ liệu khóa học live](https://bohoa96tb.github.io/hazi-viet/data/vocabulary/hanzii-course.json) có 2.773.075 byte, SHA256 `bfef9291996769c5b9e0863bb80cc104780df2dff9deee69435da92b1758fc35`; đủ 2.234 từ, 106 bài đủ cấu trúc và 12 ID batch-008 (ordinal 85–96, status deep, lesson.version=2). Manifest ghi cùng hash và run.
- [Bài 好 trên website](https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word=hz-h1-72f8c3542984): ordinal 95/sourceIndex 74; desktop live hiện tiêu đề V2, đúng hai câu mẫu, hai bẫy (gồm cách đọc 好 trong 爱好), bài luyện riêng và lời giải ẩn trước khi thử.
- Đã chạy apply/verify toàn khóa: 2.234 ID/thứ tự/nhóm bài đúng, 96/2.224 hoàn thành, 2.128 còn lại; hash 84 bài đã hoàn thành và 10 bài ngoài baseline được bảo vệ giữ nguyên. 12/12 bài qua verifyV2; cú pháp JS liên quan và diff --check đều đạt.
- Đối chiếu thêm từ điển Bộ Giáo dục cho 奶奶/牛奶 và hai cách đọc thông dụng của 好. Chưa chạy test-dom vì thiếu happy-dom; không kiểm mobile/Android TTS hoặc phản biện giáo viên độc lập.
- Commit ghi tracker [49c58c1df00543624269a29c74b0c646d31f0048](https://github.com/bohoa96tb/hazi-viet/commit/49c58c1df00543624269a29c74b0c646d31f0048) và [Pages run 39750423025](https://github.com/bohoa96tb/hazi-viet/actions/runs/39750423025) hoàn tất thành công với đúng SHA tracker. Release manifest live đã được xác nhận; tracker không đổi dữ liệu khóa học hay số hoàn thành.


## Xác minh live batch-010

- Commit nội dung và phát hành: `dea910218412e89bd4f0dd78b921f94963200f4a`; Pages run [39767965404](https://github.com/bohoa96tb/hazi-viet/actions/runs/39767965404) hoàn tất thành công đúng SHA.
- Khóa học live: 2.947.230 byte, SHA256 `d8d1e594dfc4adb1af1ab68f3f9705b1988ea7215a71e49453beaefb583bc2a4`; đủ 2.234 mục, 130 bài đủ cấu trúc; 12 ID mới khớp ordinal 109–120.
- Đã chạy `process-batch.mjs apply`, `verify`, `verify-v2.mjs`, `test-dom.mjs` và `git diff --check`; đều đạt. Hash các bài cũ/bảo vệ được kiểm tra trong verify. Chưa xác nhận bố cục trực quan, Android TTS/phát nền hoặc phản biện giáo viên độc lập.

## Xác minh live batch-011

- Commit nội dung `b7d50ae12e196d231f60516b9b13f1371e65cbdf`; [GitHub Pages run 39772026450](https://github.com/bohoa96tb/hazi-viet/actions/runs/39772026450) hoàn tất thành công, đúng `head_sha`.
- Dữ liệu khóa học live có 2.234 mục; đủ 12 ID mới ở ordinal 121–132, tất cả `status=deep` và lesson V2. SHA256 live: `868db0c72b083127797120cd8795861e177e1c412dfb91a60fb9cc319ca0f7c6`.
- `process-batch.mjs verify`, `verify-v2.mjs`, `test-dom.mjs` và `git diff --check` đều đạt. Chưa kiểm tra giao diện trực quan/Android TTS hoặc phản biện giáo viên độc lập. Commit tracker này chỉ ghi tiến độ và bằng chứng phát hành.

## Xác minh live batch-012

- Nội dung mới: ordinal 133–144, commit `7d0a5a0f8cf9695e3602f223d791566d93087b99`; 144/2.224 mục đã hoàn thành, còn 2.080.
- Nhánh `main` được fast-forward tới `b60e104048187949dd09b98cebc92cabe150a48f`. [GitHub Pages run 39779817853](https://github.com/bohoa96tb/hazi-viet/actions/runs/39779817853) hoàn tất thành công với đúng `head_sha`.
- Dữ liệu live có 2.234 từ, `schemaVersion=2`, `status=expanding`; SHA256 `c26b49580cc23e0bd866e5949cfbb38aa0fc0628ac6f6765916fcfa6c4eaa027`, khớp byte với dữ liệu đã kiểm. 12 ID mới khớp batch-012, có `status=deep` và lesson V2.
- `process-batch.mjs verify`, `verify-v2.mjs`, `test-dom.mjs`, kiểm cú pháp JS/MJS và `git diff --check` đều đạt. Chưa kiểm bố cục trực quan trình duyệt, Android TTS/phát nền hoặc phản biện giáo viên độc lập.
- Commit tracker ghi bằng chứng này không đổi dữ liệu khóa học hay số hoàn thành.


## Xác minh live batch-013

- Nội dung mới: ordinal 145–156, commit nội dung `51b1e857bf0eb6bdbc02e8ac209a9829f3732a1d`; tiến độ 156/2.224, còn 2.068.
- Nhánh `main` triển khai commit `ddc45fc4183297f0e99a87b4022fff4857da76bb`. [GitHub Pages run 39781762042](https://github.com/bohoa96tb/hazi-viet/actions/runs/39781762042) hoàn tất thành công với đúng `head_sha`.
- Dữ liệu khóa học live có 2.234 từ, `schemaVersion=2`, `status=expanding`; SHA256 `3675a8d9717b38a5e43f3a4b135f8197f38894de3d9cca83bc3cb480e3ca3730`, khớp byte với bản đã kiểm. Đủ 12 ID mới, trạng thái `deep`, lesson V2; 166 bài đủ cấu trúc.
- Đã chạy `process-batch.mjs verify`, `verify-v2.mjs`, `test-dom.mjs`, kiểm cú pháp JS/MJS và `git diff --check`; đều đạt. Bài 商店 ordinal 145 hiển thị V2 trên trình duyệt live.
- Chưa kiểm bố cục chi tiết, Android TTS/phát nền hoặc phản biện giáo viên độc lập.


## Batch-014 — ordinal 157–168

Mục mới: 钱包、门口、饭店、五、哥、妈、妹、姐、子、常、弟、手. Dữ liệu sau batch: 168/2224, còn 2056; 178/2234 bài đủ cấu trúc. Nội dung theo chuẩn V2. Verify toàn khóa, test DOM, commit, Pages run và dữ liệu live sẽ được ghi sau khi xác nhận từng bước.
