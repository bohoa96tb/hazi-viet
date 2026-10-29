# Chuẩn nội dung V2 — nghĩa, kết hợp và bẫy; giảm lặp

Chuẩn mới do người dùng yêu cầu ngày 22/10/2026, dựa trên bản thử 打电话 và 能. Quy định đầy đủ, độc lập để tiếp quản ở [PROMPT_TIEP_QUAN_DU_AN_2224.md](PROMPT_TIEP_QUAN_DU_AN_2224.md), mục 3–6. Bản cũ 5.1–5.6 lưu tại [CONTENT_STANDARD_V1.md](CONTENT_STANDARD_V1.md) để kiểm chứng các bài cũ; không dùng nó để bắt bài V2 lặp dài.

## Bố cục cho người học

1. `[Từ số …] CHỮ HÁN — PINYIN — NGHĨA TRỌNG TÂM`.
2. **Hiểu từ và biết khi nào dùng:** nghĩa chính, một tình huống cụ thể, phạm vi nghĩa Việt và điều kiện thực sự ảnh hưởng lựa chọn. Từ loại chỉ khi hữu ích.
3. **Vị trí và cách kết hợp — qua hai ví dụ:** 1–2 khung cốt lõi; hai câu chính có nghĩa Việt, phân tích ngắn ngay tại câu. Một câu cơ bản và một tình huống/cách kết hợp khác. Nêu giới từ, lượng từ, vị trí người/vật, phần lược được, trường hợp đổi chỗ đổi nghĩa nếu liên quan. Không kể lại y hệt ở một mục ví dụ riêng.
4. **Bẫy và cách phân biệt:** phần trọng tâm. Quét đa âm/đa nghĩa, hiểu sai Hán Việt/dịch từng chữ, từ/cấu trúc dễ nhầm kể cả ngoài danh sách. Chỉ hiển thị bẫy có thật, không ép số lượng. Mỗi bẫy có tình huống, khác biệt, cặp câu Trung + nghĩa Việt, kết quả thay thế, câu sửa nếu cần, vùng giao nhau và mẹo ngắn.
5. **Đọc đúng — ngắn:** chỉ đặc điểm thật có; thanh nhẹ vẫn phát âm; không tả thanh ba luôn hạ rồi nâng trọn. Phân biệt thanh gốc/biến điệu. Giao đọc từ một lần rồi câu mẫu một lần.
6. **Luyện vị trí và phân biệt:** 2–4 câu dựa nội dung đã giảng; không lộ đáp án. Từ đối chiếu ngoài danh sách phải được cung cấp nếu cần dùng trong đề.
7. **Tự dùng từ:** hai tình huống thực tế, không mở mẫu trước khi thử. Gợi ý ý → khung → mẫu. Chấp nhận nhiều đáp án hợp lý và giải thích khác biệt; không tự nhận app chấm câu mở nếu chưa có tính năng.

## Ngôn ngữ và độ dài

- Chữ giản thể, tiếng Trung phổ thông; tiếng Việt dễ hiểu, không lời dẫn dài. Một nghĩa chính; nghĩa phụ thường gặp dễ nhầm ở bẫy/Học thêm, không liệt kê nghĩa hiếm.
- Pinyin có dấu ở giới thiệu, 1–2 khung/câu minh họa khung và phần đọc đúng khi cần. Không Pinyin ở lời giảng dài, bẫy, bài tập hoặc đáp án *trong dữ liệu bài học* (audit vẫn cấm như cũ). Thanh nhẹ không dấu; mặc định thanh gốc, ghi biến điệu phải chú thích. Không dùng phiên âm tiếng Việt. Audio không đọc Pinyin thành tên chữ cái. Việc *hiển thị* Pinyin cho người học là việc của renderer, quy định ở mục “Hiển thị Pinyin và loa trong app” dưới đây — không phải lý do để ghi thêm Pinyin vào dữ liệu.
- Hai ví dụ chính là mục tiêu biên tập, không phải giới hạn cấm cặp đối chiếu cần thiết trong bẫy. Không thêm câu giống hệt chỉ đổi đại từ/số để đủ trường.
- Không tạo ranh giới giả: đúng nhưng đổi nghĩa, không hợp ý định, kém tự nhiên, gần nghĩa và thiếu ngữ cảnh phải có nhãn khác sai ngữ pháp. Câu sai có nhãn trước và câu sửa sau. Không gán lỗi cho người học chưa làm bài.
- Không bắt mọi từ có đủ ba loại bẫy. Không thấy bẫy thì ghi: “Chưa thấy bẫy thông dụng cần lưu ý ở mức học này.” Từ đã giải thích vẫn nhắc ngắn đủ hiểu độc lập.

## Hiển thị Pinyin và loa trong app (logic hệ thống, từ 2026-10-29)

Theo yêu cầu của Bui, đây là hành vi mặc định của renderer, áp cho mọi bài (V1, V2, bài nền) mà không cần nhắc lại từng đợt:

- Mọi đơn vị tiếng Trung trong phần nội dung bài — ví dụ, câu đối chiếu và câu sửa của bẫy, đáp án tham khảo, câu mẫu tự dùng, cụm kết hợp và cách nói đối chiếu của bài V1 — hiển thị một dòng Pinyin ngay phía trên và một nút loa 🔊 ngay bên cạnh để nghe riêng đơn vị đó.
- Nút “Ẩn/Hiện Pinyin” ở đầu bài điều khiển toàn bộ các dòng Pinyin này; trạng thái được lưu trên máy người học (khóa `hanzi-viet-pinyin-v1`). Tắt là mọi dòng Pinyin biến mất, kể cả Pinyin ở phần giới thiệu.
- Pinyin do tác giả biên soạn trong dữ liệu (ví dụ, giới thiệu, phát âm) luôn được ưu tiên. Phần còn thiếu được sinh lúc hiển thị từ `data/pinyin-dict.json` qua `js/pinyin.js`; tuyệt đối không ghi Pinyin sinh tự động ngược vào dữ liệu bài học.
- Từ điển được dựng bằng `node tools/vocabulary/build-pinyin-dict.mjs` (nguồn CC-CEDICT tại `~/workspace/hazi-tools/cedict.txt`): cắt đoạn bằng chương trình động có trọng số tần suất trong chính khóa học, phiếu bầu cách đọc theo ngữ liệu, luật riêng cho hạt từ cấu trúc （得/地/着/过， 得 sau đại từ chủ ngữ + động từ đọc děi) và các chữ hay bị đọc sai khi đứng riêng （都 dōu, 和 hé, 吗/吧/呢 thanh nhẹ, 胖 pàng, 累 lèi; 儿 cuối từ gộp thành r). Mốc chất lượng khi đưa vào hệ thống: đối chiếu 991 câu mẫu có Pinyin của tác giả, khớp 99,6%.
- Câu sai ngữ pháp: hiển thị Pinyin để phân tích nhưng KHÔNG gắn nút loa riêng (giữ quy tắc cũ — chỉ nghe qua audio phân tích có câu cảnh báo đi trước).
- Sau mỗi đợt biên soạn có thêm câu/cụm mới: chạy lại `build-pinyin-dict.mjs` trước khi phát hành, bảo đảm báo cáo bao phủ 100% chuỗi nội dung và đưa `data/pinyin-dict.json` vào cùng đợt đẩy. Nút loa của ví dụ chính dùng lại cơ chế `data-lesson-audio="example-only"` sẵn có để giữ bất biến kiểm thử “ví dụ chính hiển thị đúng một lần”.

## Độ sâu linh hoạt theo độ khó

Trước khi biên soạn, đánh giá riêng từng mục theo số cách dùng cần dạy, mức đa nghĩa/đa âm và nguy cơ nhầm lẫn thực tế. Ghi mức cùng lý do ngắn trong metadata tệp batch; không đổi schema V2 hoặc buộc di chuyển dữ liệu cũ.

- **Đơn giản:** nghĩa và cách dùng trực tiếp, giải thích gọn; ví dụ đơn giản, tự nhiên, hợp trình độ HSK. Chỉ thêm lưu ý thật có ích, không viết để đủ số chữ.
- **Trung bình:** làm rõ vị trí trong câu, kết hợp thông dụng và những nhầm lẫn có căn cứ mà người Việt dễ gặp.
- **Phức tạp:** giải thích sâu bằng ngôn ngữ dễ hiểu, phân biệt các từ/cấu trúc gần nhau, thêm tình huống thực tế và lỗi thường gặp cùng cách tránh. Không gom mọi nghĩa hiếm vào một bài.

Có thể viết ngắn nội dung từng trường, nhưng giữ đầy đủ trường bắt buộc V2: 1–2 khung, đúng hai câu chính, 2–4 bài luyện và đáp án tách riêng, hai tình huống tự dùng với đủ ba mức gợi ý/mẫu riêng, phát âm và audio theo hợp đồng hiện có. Không tạo bẫy giả; nếu chưa thấy bẫy hữu ích, dùng `traps: []` và `noTrapReason` đúng câu quy định, vẫn ghi đủ `trapReview`. Kiểm thử phải hỗ trợ trường hợp này, không ép biên tập viên bịa cặp đối chiếu.

Quy mô thử mỗi đợt: nhóm chủ yếu đơn giản 40–50; trung bình 25–35; phức tạp 15–25. Đây là mục tiêu linh hoạt, không phải chỉ tiêu. Nhóm hỗn hợp chọn dung lượng theo những mục khó và thời gian rà soát; không đổi thứ tự baseline. Không đánh đổi độ chính xác, tự nhiên, dễ hiểu, hiệu quả ghi nhớ hoặc kiểm thử lấy số lượng. Chỉ cập nhật checkpoint khi toàn bộ mục được ghi nhận đã đầy đủ và kiểm thử đạt.

## Chat và app

Trong chat, sau luyện vị trí/bẫy dừng chờ trả lời, chưa đưa đáp án; chấm rồi mới giao hai tình huống tự dùng. Trong chế độ biên soạn app, lưu đủ đề, đáp án, lời giải, gợi ý và câu mẫu vào các phần tách riêng; không đợi người dùng làm bài để tiếp tục cả đợt.

## Tương thích và trạng thái áp dụng

Từ batch-005, bài mới dùng `lesson.version:2`; hợp đồng dữ liệu và kiểm thử ở [CONTENT_SCHEMA_V2.md](CONTENT_SCHEMA_V2.md). Bộ nạp, audit, renderer và audio đã dispatch V1/V2. Hai ví dụ gắn cách dùng không có tab ví dụ lặp; bài mở tách đáp án, tự dùng có gợi ý ba mức. Chỉ trường Pinyin được phép được hiển thị; TTS không lấy các trường đó.

58 record đủ mẫu ở mốc trước batch-005 (48 trong baseline và 10 ngoài baseline) giữ nguyên nội dung và hash. Không gọi việc giữ tương thích là biên tập lại bài cũ. Mục sửa lại trong tương lai phải có danh sách ID, trước/sau, hash hợp lệ và không tăng completedCount.

Đã kiểm đại diện desktop trên website live. Kiểm thử DOM và kế hoạch audio không chứng nhận bố cục mobile hoặc phát âm trên Android thật; chưa phản biện giáo viên độc lập. Trạng thái xuất bản phải đọc docs/RELEASE.md và GitHub/live thực tế.

## Quy trình rà soát bài đã có

Rà soát bài đã có là một tiến độ riêng, không được suy ra từ số mục bổ sung trong `progress.json`. Phạm vi là mọi bài hiện đang đủ cấu trúc theo thứ tự khóa học, gồm cả bài V1, V2 và 10 bài ngoài baseline. Trong mỗi lượt:

- Đọc nội dung thật trước khi đánh dấu; phân loại `dễ`, `trung bình` hoặc `khó` và ghi lý do trong metadata đợt rà soát.
- Bài dễ được rút gọn phần lặp nhưng vẫn giữ trường dữ liệu, âm thanh, ví dụ và bài tập bắt buộc. Bài trung bình phải làm rõ kết hợp, vị trí và bẫy thật. Bài khó phải tách nghĩa/chức năng, điều kiện và đối chiếu cần thiết; tra nguồn khi điểm đó chưa chắc.
- Kiểm tra riêng sự khớp nhau giữa công thức, câu mẫu, câu hỏi, đáp án, lời giải và audio. Validator chỉ xác nhận hợp đồng dữ liệu, không thay cho việc đọc hiểu nội dung.
- Lưu ID đã rà trong `tools/vocabulary/review-checkpoint.json` và metadata chi tiết trong `tools/vocabulary/reviews/`. Không tăng `completedCount` khi sửa bài cũ.
- Khi còn ID chưa rà, chế độ mặc định là `review-existing-first`; không tự chuyển sang bổ sung ID kế tiếp của baseline.
