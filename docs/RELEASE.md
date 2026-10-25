# Pilot 3-2-1 — bài 得 (Giai đoạn A) — đã phát hành và xác minh Pages

- Merge commit: 5a6a74a6238342288add31fe5881480510331f27 (nhánh main, PR #7); nhánh biên soạn: `6b13ec6` (file nhỏ) + `19f03c9` (file khóa học). Mẫu 3-2-1 do Bui đề xuất cho bài từ khó: 3 ý chính tối đa (mỗi cách đọc một khối — giải thích ngắn + câu mẫu ngay dưới), 2 câu mẫu trọng tâm + 1 câu ngắn, 1–2 câu tự luyện. Bài 得: ba khối de/děi/dé với ví dụ 他说得很快。/ 我得去上班。/ 他得到了礼物。; bẫy chính mới t0 "的 hay 得" (我的书。/ 他跑得很快。); câu luyện chính mới q6 (Điền 的 hay 得: 她唱___很好。) + tự dùng s2; 5 bẫy cũ, q1–q5 và s1 giữ nguyên trong Học thêm. Bước Ghép câu chỉ hiện khung mẫu, không lặp ví dụ. Renderer mới hỗ trợ `lesson.readingBlocks` với fallback: bài chưa có readingBlocks hiển thị đúng như trước. Audit cho phép 2–3 ví dụ (thay vì đúng 2). Không tăng completedCount (vẫn 517/2.224).
- Đã chạy process-batch verify, quality audit self-test, quality audit cho 得 (0 cảnh báo, tổng 910 không đổi), DOM simulation, kiểm thử hồi quy mở rộng (107 khẳng định), verify-v2, kiểm tra hiển thị (3 khối, Pinyin hiện/ẩn, không lặp ví dụ ở bước Ghép câu), kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB. Nhánh sao lưu `backup/321-de-20261026` ở main HEAD `8cb4eac` trước đợt này.
- Pages run [40238097330](https://github.com/bohoa96tb/hazi-viet/actions/runs/40238097330) completed/success đúng HEAD 5a6a74a6238342288add31fe5881480510331f27.
- Tệp khóa học live có 2.234 mục, 6.008.075 bytes, SHA-256 ebb09b31466fa7e482ddac415e6ca3f85c8992167e36cf097fb3c321eb06d89a, khớp byte với bản đã kiểm; bài 得 có readingBlocks (3 khối), tier1 {traps:[t0], checks:[q6], selfUse:[s2]}, 6 bẫy, 6 câu luyện, 3 câu mẫu, audioText 说得很快. Pilot đang chờ Bui duyệt nội dung và trải nghiệm; chưa bắt đầu Giai đoạn B.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Pilot hai tầng — bài 得 (Giai đoạn A) — đã phát hành và xác minh Pages

- Merge commit: 8f7c253999ec8331ed727394a3929afdfa9a9ffc (nhánh main, PR #6); nhánh biên soạn: `ab6c8f3` (file nhỏ) + `a02950b` (file khóa học). Chuẩn hai tầng v1 (`docs/CONTENT_STANDARD_TWO_TIER.md`): Tầng 1 hiển thị mặc định (giải thích tiếng Việt 169 từ, trong khoảng 150–230 cho bài khó; dạy de và děi bằng câu đơn giản; nhận biết ngắn ba cách đọc; 1 bẫy, 1 câu luyện, 2 tình huống tự dùng), Tầng 2 trong "Học thêm" (4 bẫy: 的/地/得, mức độ/khả năng, tân ngữ, 得/要; 4 câu luyện mở rộng). Ví dụ e2 đổi thành 我今天得早点回家 (děi); ví dụ cũ về tân ngữ giữ lại làm câu đúng trong bẫy t4; q1 thành câu điền đơn giản, thêm q5 kiểm tra 的/地/得. Renderer mới hỗ trợ `lesson.tier1` với fallback: bài chưa có tier1 hiển thị đúng như trước. Giới hạn checks nới từ 2–4 thành 2–6 để có cả bài chính và bài mở rộng. Không tăng completedCount (vẫn 517/2.224).
- Đã chạy process-batch verify, quality audit self-test, quality audit cho 得 (0 cảnh báo, tổng 910 không đổi), DOM simulation, kiểm thử hồi quy mới cho hai tầng (78 khẳng định), kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB. Nhánh sao lưu `backup/two-tier-de-20261025` ở main HEAD `3ee2ce5` trước đợt này.
- Pages run [40204346419](https://github.com/bohoa96tb/hazi-viet/actions/runs/40204346419) completed/success đúng HEAD 8f7c253999ec8331ed727394a3929afdfa9a9ffc.
- Tệp khóa học live có 2.234 mục, 6.004.896 bytes, SHA-256 d46d55b8281d28225e7f78882c81dfaba12f43a2ceba497f70833bd09e09ff5a, khớp byte với bản đã kiểm; bài 得 có tier1 {traps:[t1], checks:[q1], selfUse:[s1,s2]}, 5 bẫy, 5 câu luyện, 2 câu mẫu, audioText 说得很快. Pilot đang chờ Bui duyệt nội dung và trải nghiệm; chưa bắt đầu Giai đoạn B.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc).

# Pilot V3 — sửa lỗi bài 得 (đợt 2) — đã phát hành và xác minh Pages

- Merge commit: 5d04330e12c802ef643d19501081d70a8129f6e0 (nhánh main, PR #5); nhánh biên soạn: `1c3e264` (file nhỏ) + `51beaea` (file khóa học). Sửa bài 得 (id `hz-h2-8ac3a59c0ef6`, ordinal 503) theo phản biện sau khi xem pilot trên web: q2 giữ chủ thể 他; q4 hỏi rõ cách nhấn mạnh bắt buộc và thừa nhận 要 cũng có thể dùng; t4 sửa giải thích khớp câu sai (tân ngữ chen vào giữa động từ và 得) và giới hạn quy tắc trong mẫu mức độ; t3 bỏ tuyên bố tuyệt đối về 听不懂/没听懂, thêm cặp đối chiếu cùng bối cảnh; t1 thêm 觉得 và 得到, cách đọc theo từ ghép/chức năng/ngữ cảnh; t2 đổi thành ba câu cùng bối cảnh học nghiêm túc; s1 nói về anh ấy (他); audioText đổi từ 得到 sang 说得很快. Không tăng completedCount (vẫn 517/2.224).
- Thêm nút HIỆN/ẨN PINYIN chung cho cả bài (lưu theo trình duyệt); Pinyin ở câu đối chiếu và câu sửa trong bẫy hiện trực tiếp thay vì từng nút riêng; câu sai có cảnh báo rõ và nền riêng; Pinyin nhỏ hơn chữ Hán. Đổi cache-buster dữ liệu và JS sang `pilot-de2`.
- Đã chạy process-batch verify, quality audit self-test, quality audit cho 得 (0 cảnh báo, tổng 910 không đổi), DOM simulation, kiểm thử hồi quy mới cho lỗi q2/q4/selfUse (36 khẳng định), kiểm tra render, kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB.
- Pages run [40199716691](https://github.com/bohoa96tb/hazi-viet/actions/runs/40199716691) completed/success đúng HEAD 5d04330e12c802ef643d19501081d70a8129f6e0.
- Tệp khóa học live có 2.234 mục, 6.004.555 bytes, SHA-256 c36bebfbe3b806da207393adce3a36987f25db12ede3c27e6abe3e895cfc8a02, khớp byte với bản đã kiểm; bài 得 có 5 bẫy, 4 câu luyện, 2 câu mẫu, audioText 说得很快. Kiểm tra bằng trình duyệt thật ở màn hình lớn: nút Pinyin, pager bẫy 1/5–5/5, cảnh báo câu sai, đáp án ẩn và gợi ý ba mức đều hoạt động; không có cuộn ngang. Chưa xác minh bố cục ở 360/390/430px (công cụ trình duyệt không đổi được viewport, Chrome headless trên máy chủ không chạy xong), TTS Android thật và phản biện giáo viên độc lập.

# Pilot V3 — 得 — đã phát hành và xác minh Pages

- Merge commit: 945e16c17b377a3e5d70cc5557a27ee3b4766492 (nhánh main, PR #4); nhánh biên soạn: `2edfc43` (file nhỏ) + `ceb507f` (file khóa học). Nâng cấp bài 得 (id `hz-h2-8ac3a59c0ef6`, ordinal 503) từ V2 batch-049 lên mẫu V3: 2 khung, 2 câu mẫu, 5 bẫy, 4 câu luyện mở, 2 tình huống tự dùng, 3 ngữ cảnh audio. Không tăng completedCount (vẫn 517/2.224).
- Thêm trường Pinyin tùy chọn cho câu đối chiếu và câu sửa trong bẫy, render bằng chi tiết hiện/ẩn, audit kiểm tra Pinyin hợp lệ và loại trừ khi kiểm tra Pinyin trong lời giảng, audio không đọc Pinyin. Đổi cache-buster dữ liệu và JS sang `pilot-de`.
- Đã chạy process-batch verify, verify-v2, quality audit self-test, quality audit cho 得 (0 cảnh báo), DOM simulation, kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB.
- Pages run [40196929322](https://github.com/bohoa96tb/hazi-viet/actions/runs/40196929322) completed/success đúng HEAD 945e16c17b377a3e5d70cc5557a27ee3b4766492.
- Tệp khóa học live có 2.234 mục, 5.999.590 bytes, SHA-256 d52b9dc2aebdff3d94332dfc1ad8295fe340215d8a379f1b61a1b5297b3f9280, khớp byte với bản đã kiểm; bài 得 có 5 bẫy, 4 câu luyện, 2 câu mẫu và Pinyin đối chiếu. Chưa xác minh TTS Android, bố cục trực quan trên điện thoại hoặc phản biện giáo viên độc lập.

# Batch-050 — đã phát hành và xác minh Pages

- Content commit: 1390bb1ebff458d3e87b051db77e4474022006f0 (nhánh main; cùng nội dung với commit 48c45a00b3bd6fab968d87ed158d308e3bce5093 trên nhánh biên soạn, khác mã do merge rebase); bổ sung 8 mục ordinal 510–517: 短、表、该、越、轻、过、近、长. Tiến độ: 517/2.224, còn 1.707.
- Phân loại: dễ gồm 短、轻、近; trung bình gồm 表、该; khó gồm 越、过、长 vì đa âm và cấu trúc cần phân biệt.
- Đã chạy process-batch verify, verify-v2, quality audit self-test, quality audit phạm vi 510–517 (không có cảnh báo mới), DOM simulation, kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB.
- Pages run [40190327237](https://github.com/bohoa96tb/hazi-viet/actions/runs/40190327237) completed/success đúng HEAD 1390bb1ebff458d3e87b051db77e4474022006f0.
- Tệp khóa học live có 2.234 mục, 5.985.728 bytes, SHA-256 2ff15d30b0e12c3b33de631e4aa0c6da2e7513ea23be1be671ac102b55ab4c53, khớp byte với bản đã kiểm; đủ 8 ID batch-050 đúng ordinal 510–517, đều deep và lesson version 2. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.


# Batch-049 — đã phát hành và xác minh Pages

- Content commit: fbd588b5f98cf802798d7cd230fd7066906aee16; bổ sung 8 mục ordinal 502–509: 当、得、懂、成、掉、满、熟、省. Tiến độ: 509/2.224, còn 1.715.
- Phân loại: dễ gồm 满; trung bình gồm 懂、成、掉、熟、省; khó gồm 当、得 vì có nhiều chức năng/cách đọc và cấu trúc cần phân biệt. Correction-009 đồng bộ archive batch-048 với cách đọc kǎ/qiǎ của 卡 và không tăng completedCount.
- Đã chạy process-batch verify, verify-v2, quality audit self-test, quality audit phạm vi 502–509 (không có cảnh báo mới), DOM simulation, kiểm tra cú pháp và git diff --check. Bộ kiểm tra archive mới đối chiếu id, meaning, intro giữa batch source và course để chặn mất correction khi tái tạo.
- Pages run [40171593524](https://github.com/bohoa96tb/hazi-viet/actions/runs/40171593524) completed/success đúng HEAD fbd588b5f98cf802798d7cd230fd7066906aee16.
- Tệp khóa học live có 2.234 mục, 5.910.364 bytes, SHA-256 d66a722b7ca9d83d080990f4be6872428a01831245503fff22b943c3a141b061, khớp byte với bản đã kiểm; đủ 8 ID batch-049 đúng ordinal 502–509. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-048 — đã phát hành và xác minh Pages

- Content commit: `8432075eb3eeaa5a822446c1e5fa355864c4be74`; bổ sung 8 mục ordinal 494–501: 非常、下、两、低、克、卡、小、平. Tiến độ: 501/2.224, còn 1.723.
- Phân loại: dễ gồm 非常、两、克; trung bình gồm 下、低、卡、小、平. Batch-048 giải thích riêng các bẫy mức độ/tần suất, hướng đối lập, 两/二, đơn vị khối lượng, thẻ/vé, kích thước/cách gọi và phẳng/thấp. Correction-009 bổ sung cách đọc `qiǎ` của 卡 bên cạnh `kǎ` và không tăng completedCount.
- Đã chạy `process-batch verify`, `verify-v2`, quality audit self-test, quality audit phạm vi 494–501 (không có cảnh báo mới), `test-dom.mjs` với kiểm tra chuyển cấp HSK, kiểm tra cú pháp và `git diff --check`. Pages run [40170494061](https://github.com/bohoa96tb/hazi-viet/actions/runs/40170494061) completed/success đúng HEAD `8432075`.
- Tệp khóa học live có 2.234 mục, 5.850.546 bytes, SHA-256 `777abad3498502b371670bacc54eb3631ef16ef54aee723870fa70b5cd79b5e1`; đủ 8 ID batch-048 đúng ordinal 494–501. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-045 — đã phát hành và xác minh Pages

- Content commit: `80d1c7fe35ee04d02c9724196dc3f792f9b33fa3`; bổ sung 10 mục ordinal 460–469: 中学生、书包、医生、大学、大学生、学校、学院、小学、小学生、工人. Tiến độ cục bộ: 469/2.224, còn 1.755.
- Phân loại: dễ gồm 中学生、书包、医生、大学生、学校、小学、小学生、工人; trung bình gồm 大学、学院.
- Correction-007 sửa 教 (ordinal 457): intro dùng `jiāo`/`jiào`, phần phát âm phân biệt thanh 1 và thanh 4, câu hỏi/đáp án đã đồng bộ. Validator mới kiểm tra Pinyin bằng tập âm tiết hợp lệ và từ chối nhãn mô tả.
- Đã chạy `process-batch verify`, `verify-v2`, quality audit self-test, quality audit nhóm 457–469, `test-dom.mjs`, kiểm tra cú pháp và `git diff --check`. Pages run [40168023790](https://github.com/bohoa96tb/hazi-viet/actions/runs/40168023790) completed/success đúng HEAD `ca28528`.
- Tệp khóa học live có 2.234 mục, 5.622.943 bytes, SHA-256 `788651592fc30c337797e62dcabb6160bd6029224546bd0fa077033f66c15158`; đủ `教` với `jiāo`/`jiào` và 10 ID batch-045 đúng ordinal 460–469. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-044 — đã phát hành và xác minh Pages

- Content commit: `3fe09028849d7bb270f4cc185cc810aac7ae6e2a`; bổ sung 8 mục ordinal 452–459: 门票、飞机、马路、从、四、教、班、中学. Tiến độ cục bộ: 459/2.224, còn 1.765.
- Phân loại: dễ gồm 门票、飞机、马路、四; trung bình gồm 从、班、中学; khó gồm 教 vì có hai cách đọc thông dụng. Bài 教 chỉ dạy sâu nghĩa dạy và nhận diện cách đọc trong 教育.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 452–459, `test-dom.mjs`, `node --check` và `git diff --check`. Live Pages đã được xác minh ở bước phát hành; chưa xác minh TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: \`d15668330937c4ffd9cc3a24757af01b7d395766\`; cả \`content/vocabulary-2224\` và \`main\` đã fast-forward. Pages run [40166924555](https://github.com/bohoa96tb/hazi-viet/actions/runs/40166924555) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.551.676 bytes, SHA-256 \`c6df285ef12f0ba2f2d901ebd007481d0d4ff91ff6bb0598087d22d67f5f9d8c\`, khớp byte với bản đã kiểm; đủ 8 ID batch-044 đúng ordinal 452–459. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-043 — đã phát hành và xác minh Pages

- Content commit: `2061eda667a6d30f0afa37005f0bd76f004f5597`; bổ sung 4 mục ordinal 448–451: 路口、车上、车票、车站. Tiến độ cục bộ: 451/2.224, còn 1.773.
- Phân loại batch-043: dễ gồm 车站; trung bình gồm 路口、车上、车票.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 448–451, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh live Pages, TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `762a9e5f501cebf41da5083c9d7e2569264b2dbc`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40165723821](https://github.com/bohoa96tb/hazi-viet/actions/runs/40165723821) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.495.934 bytes, SHA-256 `86f987386e867998e096c61a0a3b5e8644b6561867749cf13bc08b194bb68ac0`, khớp byte với bản đã kiểm; đủ 4 ID batch-043 đúng ordinal 448–451. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-042 — đã phát hành và xác minh Pages

- Content commit: `27bd49cb85f0a60c760bc8b5159d87cafd7ef330`; bổ sung 4 mục ordinal 444–447: 汽车、火车、走路、路上. Tiến độ cục bộ: 447/2.224, còn 1.777.
- Phân loại batch-042: dễ gồm 火车; trung bình gồm 汽车、走路、路上. Đã kiểm lại batch-040/041: mỗi batch 1 dễ và 3 trung bình, tổng 2 dễ và 6 trung bình.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 444–447, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh live Pages, TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `24f6a994c0e5e3d91e356ca46fd779b40fce6102`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40163436856](https://github.com/bohoa96tb/hazi-viet/actions/runs/40163436856) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.468.598 bytes, SHA-256 `833a3bc84de1f5fb79b7c3c2ed6ab878cb1fdd482679e779d1309fa29bcab5ab`, khớp byte với bản đã kiểm; đủ 4 ID batch-042 đúng ordinal 444–447. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-041 — đã phát hành và xác minh Pages

- Content commit: `4b2894bf846593ee90d71dfae6597c82277ca4aa`; bổ sung 4 mục ordinal 440–443: 开车、打车、机场、机票. Tiến độ cục bộ: 443/2.224, còn 1.781; không thay đổi tiến độ rà soát 377/377.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 440–443, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `1ad7898978d5c719c2a2a0b8d652bf0262cf8ac3`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40162821428](https://github.com/bohoa96tb/hazi-viet/actions/runs/40162821428) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.441.227 bytes, SHA-256 `5aca97bcb4cbb89656e5b027c64012f4190c6c25b259ee18c3f5e8ce2054cc31`, khớp byte với bản đã kiểm; đủ 4 ID batch-041 đúng ordinal 440–443. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-040 — đã phát hành và xác minh Pages

- Content commit: `b84c9ce05eac86535bafda79f89905442679b26f`; bổ sung 4 mục ordinal 436–439: 车、飞、上车、地图. Tiến độ cục bộ: 439/2.224, còn 1.785; không thay đổi tiến độ rà soát 377/377.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 436–439, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh live Pages, TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `ecc30ee1a25ba9aff07445bcd8d1f6edd379a726`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40162418592](https://github.com/bohoa96tb/hazi-viet/actions/runs/40162418592) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.413.703 bytes, SHA-256 `389beb478a7eb0ecd84523abbc75ccfebbc657128688c6efd469ec166eaa60b0`, khớp byte với bản đã kiểm; đủ 4 ID batch-040 đúng ordinal 436–439. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Correction-006 — đã phát hành và xác minh Pages

- Content commit: `52ef9688c3b4206f0d58fd2fa8db64c7d09bffbe`; sửa bài 430 那边 để đề, gợi ý, khung, đáp án, bản dịch và criteria cùng nghĩa “bên kia”.
- Sửa ownership nguồn: `batch-038.json` đúng 4 mục 428–431; `batch-039.json` đúng 4 mục 432–435, không trùng ID. Đồng bộ editorialStatus 432–435 về batch-039; completedCount vẫn 435/2.224.
- Quality audit thêm kiểm cặp đối lập 这边/那边, 左/右, 上/下, 前/后, 里/外, 有/没有; nhóm 428–435 đã qua semantic audit không cảnh báo. Pages run `40161612498` success đúng tracker `033e25f`; live course 5.389.793 bytes khớp SHA-256 `cb94aa73e46928ec0d326b7b1760fd1e961bbffc985ee6e167f6f59a5f621337`.

# Correction-005 và batch-038/039 — đã phát hành và xác minh Pages

- Commit nội dung: `0281429d4eabce14d65712875b88f56fea41ad7e`; tracker cuối: `778128c8b681ef64e9b552f8a877372556675764`; cả `content/vocabulary-2224` và `main` đã fast-forward.
- Sửa semantic prompt–ý tưởng–khung–đáp án–bản dịch–criteria ở 左, 下边, 外边; rà nhóm batch-036/037. Bổ sung 8 mục ordinal 428–435: 西边、这边、那边、里边、九、站、跑、路. Tiến độ: 435/2.224, còn 1.789; correction không tăng completedCount.
- Cổng cục bộ: `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 412–435, `test-dom.mjs`, `node --check` và `git diff --check` đạt. Pages run `40160760047` success đúng tracker `b416dd2`; live course 5.387.857 bytes khớp SHA-256 `bf7af0bbee789047bcf2cf586682f5ead32a6f042625eca4a26ad64d72620e89`. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-037 — đã phát hành và xác minh Pages

- Commit nội dung: `c70938f8ab5a21b8d45856fe060aec54e336f959`; tracker cuối: `5d3b4a48843f976e6ae716d251c2ea37dca92bfe`; cả `content/vocabulary-2224` và `main` đã fast-forward.
- Bổ sung 8 mục ordinal 420–427: 前边、北边、南边、右边、后边、外边、左边、旁边. Tiến độ: 427/2.224, còn 1.797; toàn khóa 437/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 前边、北边、南边、右边、后边、左边; trung bình gồm 外边、旁边 vì cần phân biệt mốc/vùng hoặc đối chiếu chức năng. Đã tự phản biện hai lượt.
- Nguồn đã đọc: 汉典 cho pinyin/nghĩa từng mục; MDBG bị chặn tự động trong lượt này và không được ghi là nguồn đã đọc cho batch-037. Chưa phản biện giáo viên độc lập.
- Kiểm cục bộ: `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 382–427, `test-dom.mjs`, `node --check`, `git diff --check` đều đạt. Pages run `40156085909` completed/success đúng tracker; live course 5.333.158 bytes khớp SHA-256 `33de48652e5f882bb4c454a649c5e9c196617c9c457022c42b3678edc35b0e15`. Chưa xác minh TTS Android hoặc bố cục trực quan riêng lượt này.

# Batch-036 và correction-004 — đã phát hành và xác minh Pages

- Commit nội dung: `c1b87a37eab4e0927f36e7e97ed42348ddd84c5b`; tracker cuối: `b58001ab42f6d515c70573905742e47cd958dfae`; cả `content/vocabulary-2224` và `main` đã fast-forward.
- Sửa 18 bài cũ ở ordinal 382–419 về đồng bộ đề bài–gợi ý–khung–đáp án–bản dịch–criteria; sửa cụ thể 400 女人, 402 她们 và 404 男人. `completedCount` chỉ tăng do bài mới.
- Bổ sung 8 mục ordinal 412–419: 南、右、左、西、一边、上边、下边、东边. Tiến độ: 419/2.224, còn 1.805; toàn khóa 429/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 南、右、左、西、上边、下边、东边; trung bình gồm 一边 vì có mẫu 一边…一边… và đối chiếu với 旁边. Đã tự phản biện hai lượt.
- Nguồn đã đọc: 汉典 cho pinyin/nghĩa từng mục; MDBG bị chặn tự động trong lượt này và không được ghi là nguồn đã đọc cho batch-036. Chưa phản biện giáo viên độc lập.
- Validator mới kiểm đồng bộ self-use và yêu cầu bẫy A/B có A và B trong câu case tiếng Trung thật; quality-audit lịch sử vẫn có cảnh báo cần biên tập thủ công.
- Kiểm cục bộ: `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 382–419, `test-dom.mjs`, `node --check`, `git diff --check` đều đạt. Pages run `40155717136` completed/success đúng tracker; live course 5.280.571 bytes khớp SHA-256 `1e7dfb2bad6340ede73f61e4e5a09dd742a55f0a2b6a2d95223332045fe3a2ea`. Chưa xác minh TTS Android hoặc bố cục trực quan riêng lượt này.

# Batch-035 — đã phát hành và xác minh Pages

- Commit nội dung: `fd6307b63c8ea04ab66e2ce00664e04f8fb56a55`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung 5 mục ordinal 407–411: 病人、老人、东、前、北. Tiến độ: 411/2.224, còn 1.813; toàn khóa 421/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 病人、北; trung bình gồm 老人、东、前. Đã tự phản biện hai lượt; nguồn MDBG đã đọc cho từng mục, chưa phản biện giáo viên độc lập.
- `process-batch verify`, `verify-v2`, `quality-audit --self-test`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40154353838](https://github.com/bohoa96tb/hazi-viet/actions/runs/40154353838) completed/success đúng `head_sha=fd6307b63c8ea04ab66e2ce00664e04f8fb56a55`.
- Dữ liệu khóa học live có 2.234 mục, 421 bài đủ cấu trúc, 5.225.715 bytes, SHA-256 `c25cf6f17f91ef10db3960b3f3608b392aa647cf8259a9225c750e09ae9e619c`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-035`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Correction-003 và batch-034 — đã phát hành và xác minh Pages

- Commit nội dung: `a1dccdd753c48e99a36e286a54d4f83b0a4ddf4a`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Sửa 32 trường hợp tự dùng trùng nguyên văn ở ordinal 382–398; sửa lệch chủ thể/người nhận ở 介绍, đáp án 楼下 dùng đúng từ mục tiêu, bẫy 桌子 có câu thật với 桌面, và bản dịch 房子 không thu hẹp nghĩa. `completedCount` không tăng vì correction.
- Bổ sung 8 mục ordinal 399–406: 别人、女人、女生、她们、孩子、男人、男朋友、男生. Tiến độ: 406/2.224, còn 1.818; toàn khóa 416/2.234 bài đủ cấu trúc.
- Phân loại batch-034: dễ gồm 女生、她们、孩子、男生; trung bình gồm 别人、女人、男人、男朋友. MDBG đã được đọc cho từng mục; tự phản biện hai lượt, chưa phản biện giáo viên độc lập.
- Thêm `quality-audit.mjs`: cảnh báo tự dùng trùng/gần giống, thiếu từ mục tiêu, bẫy A/B thiếu ví dụ và correction thiếu; strict gate chặn lỗi trùng nguyên văn ở batch mới. Self-test có dữ liệu đúng, sai và ngoại lệ dạng tách được.
- `process-batch verify`, `verify-v2`, `quality-audit --self-test`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40154116343](https://github.com/bohoa96tb/hazi-viet/actions/runs/40154116343) completed/success đúng `head_sha=a1dccdd753c48e99a36e286a54d4f83b0a4ddf4a`.
- Dữ liệu khóa học live có 2.234 mục, 416 bài đủ cấu trúc, 5.190.399 bytes, SHA-256 `09db705dedbbf3929b489e4d998598c55620f91af493e8ab21dd18a6d24dcc3b`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-034`.
- Quality audit toàn lịch sử còn cảnh báo cần biên tập thủ công (chủ yếu bài cũ: 220 exact, 43 near, 65 trap-pair, 12 target); nhóm 381–406 hiện không còn cảnh báo. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-033 — đã phát hành và xác minh Pages

- Commit nội dung: `82634a222d56b0f197f9d1a0edf34e6f908f4dec`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung 5 mục ordinal 394–398: 们、谁、介绍、他们、先生. Tiến độ: 398/2.224, còn 1.826; toàn khóa 408/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 他们; trung bình gồm 们、谁、介绍、先生. Đã tự phản biện hai lượt; bài 谁 giữ hai cách đọc ở phần giới thiệu, không rải Pinyin vào lời giảng; chưa phản biện giáo viên độc lập.
- Nguồn đã đọc để xác minh mục từ, cách đọc và nghĩa: MDBG cho từng mục; các nhận định cấu trúc được viết và tự kiểm tra theo ngữ cảnh, không coi HTTP 200 là bằng chứng ngữ pháp.
- `process-batch apply`, `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40152291174](https://github.com/bohoa96tb/hazi-viet/actions/runs/40152291174) completed/success đúng `head_sha=82634a222d56b0f197f9d1a0edf34e6f908f4dec`.
- Dữ liệu khóa học live có 2.234 mục, 408 bài đủ cấu trúc, 5.131.318 bytes, SHA-256 `05c92a6f79dec3619c70a0741283d5aea7de05d678feedf9ff4ee7eaa0b3fb3d`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-033`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-031 và batch-032 — đã phát hành và xác minh Pages

- Commit nội dung: `78c3bb3378c8e3c2b6d1f0ea1edbb08a8f86cb19`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung 13 mục ordinal 381–393: 见、都、里、回家、在家、地上、家里、房子、房间、桌子、楼上、楼下、身上. Tiến độ: 393/2.224, còn 1.831; toàn khóa 403/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 房间、桌子; trung bình gồm 见、都、里、回家、在家、地上、家里、房子、楼上、楼下、身上. Đã tự phản biện hai lượt; chưa phản biện giáo viên độc lập.
- Nguồn đã đọc để xác minh mục từ, cách đọc và nghĩa: MDBG cho từng mục; các nhận định cấu trúc được viết và tự kiểm tra theo ngữ cảnh, không coi HTTP 200 là bằng chứng ngữ pháp.
- `process-batch apply`, `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40151960281](https://github.com/bohoa96tb/hazi-viet/actions/runs/40151960281) completed/success đúng `head_sha=78c3bb3378c8e3c2b6d1f0ea1edbb08a8f86cb19`.
- Dữ liệu khóa học live có 2.234 mục, 403 bài đủ cấu trúc, 5.092.739 bytes, SHA-256 `b7ebd505ae90283dc2abe52c72fb0699699fa1029c22cb5fed97cadfab87e941`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-032`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

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
