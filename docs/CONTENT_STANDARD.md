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
- Pinyin có dấu ở giới thiệu, 1–2 khung/câu minh họa khung và phần đọc đúng khi cần. Không Pinyin ở lời giảng dài, bẫy, bài tập hoặc đáp án. Thanh nhẹ không dấu; mặc định thanh gốc, ghi biến điệu phải chú thích. Không dùng phiên âm tiếng Việt. Audio không đọc Pinyin thành tên chữ cái.
- Hai ví dụ chính là mục tiêu biên tập, không phải giới hạn cấm cặp đối chiếu cần thiết trong bẫy. Không thêm câu giống hệt chỉ đổi đại từ/số để đủ trường.
- Không tạo ranh giới giả: đúng nhưng đổi nghĩa, không hợp ý định, kém tự nhiên, gần nghĩa và thiếu ngữ cảnh phải có nhãn khác sai ngữ pháp. Câu sai có nhãn trước và câu sửa sau. Không gán lỗi cho người học chưa làm bài.
- Không bắt mọi từ có đủ ba loại bẫy. Không thấy bẫy thì ghi: “Chưa thấy bẫy thông dụng cần lưu ý ở mức học này.” Từ đã giải thích vẫn nhắc ngắn đủ hiểu độc lập.

## Chat và app

Trong chat, sau luyện vị trí/bẫy dừng chờ trả lời, chưa đưa đáp án; chấm rồi mới giao hai tình huống tự dùng. Trong chế độ biên soạn app, lưu đủ đề, đáp án, lời giải, gợi ý và câu mẫu vào các phần tách riêng; không đợi người dùng làm bài để tiếp tục cả đợt.

## Tương thích và trạng thái áp dụng

Tại thời điểm lưu chuẩn, 48 mục trong baseline (và 10 mục ngoài baseline) đã có nội dung theo V1; dữ liệu và hash của chúng được giữ nguyên. Đây là cập nhật prompt/tài liệu, chưa phải chuyển toàn bộ 48 bài hoặc thay giao diện ứng dụng.

Bộ mã V1 hiện kiểm tra ít nhất ba ví dụ, giới hạn Pinyin trong lesson và dựng giao diện 5.1–5.6. Trước batch V2 đầu tiên, phải bổ sung hỗ trợ có kiểm thử cho hai câu chính, vị trí Pinyin cho phép, câu hỏi mở/đáp án riêng, tự dùng/gợi ý và cách hiển thị không lặp. Giữ bài V1 đọc được; không nhét câu thừa hoặc nới kiểm tra tùy tiện để gọi V2 hoàn thành. Chỉ ghi đã hỗ trợ V2 sau khi code, dữ liệu và giao diện thực sự được kiểm tra.

Nếu sửa lại bài cũ theo yêu cầu, dùng đợt chỉnh sửa có danh sách ID và cập nhật hash hợp lệ; không đổi baseline, không cộng thêm completedCount cho mục đã hoàn thành.
