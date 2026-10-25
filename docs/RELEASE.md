

# Batch-030 — đã phát hành và xác minh Pages

- Commit nội dung: `86add34f55859a6bdac765b788c638fa1cbd84c9`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung mục khó `着` ở ordinal 380. Tiến độ: 380/2.224, còn 1.844; toàn khóa 390/2.234 bài đủ cấu trúc.
- Bài giới hạn vào `着` trong trạng thái/cách thức và cách đọc khác trong `睡着`; nguồn đã đọc gồm MDBG và Chinese Grammar Wiki.
- `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript, `git diff --check` và kiểm segment audio đều đạt.
- GitHub Pages run [40150876963](https://github.com/bohoa96tb/hazi-viet/actions/runs/40150876963) completed/success đúng `head_sha=86add34f55859a6bdac765b788c638fa1cbd84c9`.
- Dữ liệu khóa học live có 2.234 mục, 390 bài đủ cấu trúc, 4.999.134 bytes, SHA-256 `5692d836c7f70ba2bec8e6ee7ca2a2c70c546f12bd72bbb2d4245c18194b1dd5`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-030`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.


# Batch-029 và correction-002 — đã phát hành và xác minh Pages

- Commit nội dung: `86fce7351739d783c42a0c7794daf09d74c964b7`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Sửa ba bài đã xác nhận: 睡觉, 起来, 地. Bổ sung hai mục baseline 378–379: 床、楼. Tiến độ: 379/2.224, còn 1.845; toàn khóa 389/2.234 bài đủ cấu trúc.
- `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript, `git diff --check` và kiểm segment audio đều đạt. DOM không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40150094286](https://github.com/bohoa96tb/hazi-viet/actions/runs/40150094286) completed/success đúng `head_sha=86fce7351739d783c42a0c7794daf09d74c964b7`.
- Dữ liệu khóa học live tải từ Pages có 2.234 mục, 389 bài đủ cấu trúc, 4.986.544 bytes, SHA-256 `6fc883516a28ccb360fa6a7d9c7b26e4acd3515fee63e1d9da2e70a27dfda3a0`, khớp byte với bản đã kiểm. Đã kiểm trực tiếp các ID sửa/bổ sung và cache `vocabulary.js?v=batch-029`.
- Chưa xác minh TTS Android/phát âm thật, chưa chạy Chromium trực quan riêng cho lượt này và chưa có phản biện giáo viên độc lập.


# Batch-019 · đã phát hành và xác minh Pages

Mục baseline 217–234: 生气、米饭、面包、面条儿、中、也、六、出、国、外、女、新、比、男、病、中间、别的、北京. Candidate có 18 bài V2; tiến độ candidate 234/2.224, còn 1.990; toàn khóa đủ cấu trúc 244/2.234.

- Mỗi mục giữ hai câu chính, khung cách dùng, phần bẫy/phân biệt, hai câu luyện mở với đáp án tách riêng và hai tình huống tự dùng với mẫu riêng.
- ID/thứ tự đã so khớp baseline; hash của 226 mục đã hoàn thành/bảo vệ trước đó không đổi.
- `process-batch apply`, `process-batch verify`, `verifyV2` cho 18 bài, `validateCourse` toàn khóa và `test-dom.mjs` đều đạt; hash 226 mục hoàn thành/bảo vệ không đổi.
- Commit nội dung [2adc40958ad8e6a81491e1001af2a73288a84699](https://github.com/bohoa96tb/hazi-viet/commit/2adc40958ad8e6a81491e1001af2a73288a84699); commit xác minh [e0b99bb1ac6b4748ba1befd4c5e8a7f31e3267b2](https://github.com/bohoa96tb/hazi-viet/commit/e0b99bb1ac6b4748ba1befd4c5e8a7f31e3267b2); `main` đã fast-forward.
- GitHub Pages run [39891898334](https://github.com/bohoa96tb/hazi-viet/actions/runs/39891898334) thành công trên commit `e0b99bb1ac6b4748ba1befd4c5e8a7f31e3267b2`.
- Tệp JSON live được tải trực tiếp và khớp từng byte với bản kiểm tra: 3.815.776 bytes, SHA-256 `4fe01a79aa5db07af87e2146b60fbb9634e361d5b12fbb11a3a53809f5896367`; toàn khóa gồm 2.234 mục.
- Chưa xác minh bố cục thiết bị, TTS Android hoặc phản biện giáo viên độc lập.
# Phát hành batch-017

Mục baseline 193–204: 有的、正在、没有、真的、还是、还有、八、冷、口、吃、喝、渴. Tiến độ: 204/2.224; còn 2.020; toàn khóa đủ cấu trúc 214/2.234.

- 12 bài V2 gồm 24 câu chính, 12 nhóm bẫy, 36 câu luyện mở và 24 tình huống tự dùng; đáp án/mẫu được tách riêng khỏi đề.
- Đã kiểm ID/thứ tự baseline, hai ví dụ mỗi mục, liên kết khung, hash các mục hoàn thành trước đó và SHA256 khóa học.
- GitHub Pages run [39880813380](https://github.com/bohoa96tb/hazi-viet/actions/runs/39880813380) completed/success trên commit `b5dbc6cef459d8aac515b4bc570a5cd9f6e4072b`.
- Chưa đọc trực tiếp URL Pages để đối chiếu JSON/route live; chưa kiểm bố cục mobile, Android TTS hoặc phản biện giáo viên độc lập.

---

# Phát hành batch-016

Đợt baseline 181–192: 爸爸、不、吗、对、有、没、的、还、是不是、有些、有时、有用. Tiến độ: 192/2.224; còn 2.032; toàn khóa đủ cấu trúc 202/2.234.

- Commit nội dung [a1e41dca6d9061ab466bd33e840ffd7e3bba90a4](https://github.com/bohoa96tb/hazi-viet/commit/a1e41dca6d9061ab466bd33e840ffd7e3bba90a4); main đã fast-forward.
- [GitHub Pages run 39860241131](https://github.com/bohoa96tb/hazi-viet/actions/runs/39860241131) thành công trên commit cache 099856dac0399631d26c24d209332914a5eb7d40. Cache HTML/JS dùng tag `batch-016-fix1`.
- Đã kiểm đủ 12/12 route live đúng ordinal/sourceIndex. Mỗi bài hiện BÀI HỌC ĐẦY ĐỦ, chuẩn V2, hai câu mẫu/audio và hai đề luyện không lộ đáp án trước thao tác; đã xác nhận khung thứ hai của 还 khớp ví dụ.
- `auditV2` 12/12, `validateCourse` trên 2.234 từ, 36 màn renderer và 12 bài audio đạt. Hash 180 bài cũ và 10 bài bảo vệ khớp. Course source SHA256: `4bca2857e543a9d74bfe8f29613a27520c7b9a42ccc242ae16cf2c2dc8d5b58e`.
- Chưa xác nhận TTS/phát nền Android hoặc phản biện giáo viên độc lập; `test-dom.mjs` không chạy vì thiếu `happy-dom`.


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


# Phát hành batch-018

Mục baseline 205–216: 睡、饭、饿、什么、包子、午饭、吃饭、好吃、干净、早饭、晚饭、最好. Tiến độ: 216/2.224; còn 2.008; toàn khóa đủ cấu trúc 226/2.234.

- 12 bài V2 gồm 24 câu chính, 12 nhóm phân biệt, 36 câu luyện mở và 24 tình huống tự dùng; đáp án/mẫu được tách riêng.
- `process-batch.mjs verify` và `test-dom.mjs` đều qua; đã rà ID/thứ tự, liên kết, hash hoàn thành, renderer, audio và luồng mở đáp án.
- Đã sửa một lỗi nội dung Pinyin trong lời giảng của 还 (mục 188) và phép dò Pinyin để tránh nhận nhầm chuỗi con trong từ tiếng Việt.
- Commit nội dung: [5baa08f6a647](https://github.com/bohoa96tb/hazi-viet/commit/5baa08f6a647e8ecd275805d5e8dbdbeff0a7262). `process-batch verify` và `test-dom.mjs` đều qua.
- GitHub Pages run [39887553064](https://github.com/bohoa96tb/hazi-viet/actions/runs/39887553064) completed/success trên commit [74a9cd63016e](https://github.com/bohoa96tb/hazi-viet/commit/74a9cd63016ee89be6614cc4a4c3f2cb73c5414a). JSON live không truy cập được qua web lookup nên chưa đối chiếu trực tiếp SHA/route.
- Chưa xác minh bố cục thiết bị, TTS Android hay phản biện giáo viên độc lập.


## Batch-021 — mục 253–270

18 mục: 半天、后天、早上、明天、星期天、星期日、昨天、晚上、白天、见面、马上、一、七、三、两、二、几、十. Tiến độ nội dung chuẩn bị: 270/2.224; còn 1.954; toàn khóa 280/2.234 bài đủ cấu trúc. Mỗi bài có hai câu chính, bài luyện mở với đáp án riêng và hai tình huống tự dùng. Có phân biệt 两/二, số lượng/thứ tự, thời gian/thời lượng, 几/多少/几乎 và cụm tách 见面.

`process-batch apply/verify`, kiểm cú pháp JS và `git diff --check` đạt; xác nhận ID/thứ tự/hash các bài cũ được bảo toàn. Trạng thái commit, DOM và Pages sẽ ghi sau khi xác minh. Chưa kiểm TTS/phát nền Android hoặc phản biện giáo viên độc lập.


### Bằng chứng batch-021 đã xác minh

- Commit nội dung [c67a4cb296bb783f81ccfd60003acbae9be617e6](https://github.com/bohoa96tb/hazi-viet/commit/c67a4cb296bb783f81ccfd60003acbae9be617e6) đã lưu và đưa vào main bằng fast-forward có expected SHA. Tree GitHub khớp tree bản đã kiểm, `f979cf3b928402531ae1db4f424697fc664a2146`.
- [Pages run 39915674513](https://github.com/bohoa96tb/hazi-viet/actions/runs/39915674513) completed/success trên đúng SHA nội dung.
- Live course 4.102.886 byte; SHA256 `8226cf8421195cedc0ad5afb740244fd96115bd0255860995df7d1ad33905a6d`, khớp byte với nguồn đã kiểm; 2.234 ID, 280 bài deep, đủ 18/18 bài mới có lesson khớp batch. Cache trang đã tăng lên batch-021.
- `test-dom.mjs` đạt, gồm loader V1/V2, hai câu, audio dispatch, đáp án ẩn, giữ bản nháp, ba mức gợi ý, ôn/yêu thích/tìm kiếm và phân trang bẫy. Verify toàn khóa, cú pháp JS và diff check đạt; hash 252 bài cũ và 10 bài bảo vệ giữ nguyên.
- UI live 半天: ordinal 253/sourceIndex 243, chuẩn V2, đúng hai câu chính, đề luyện chưa lộ lời giải. Chưa chứng nhận bố cục điện thoại, TTS/phát nền Android hay phản biện giáo viên độc lập.
- Tiến độ chính thức 270/2.224, còn 1.954; 280/2.234 bài đầy đủ toàn khóa. Tiếp theo ordinal 271: 哪, rồi 就、第.
