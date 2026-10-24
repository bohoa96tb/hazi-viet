# Chuẩn nội dung V3 — năm bước, độ sâu theo độ khó

V3 áp dụng cho quá trình tái biên soạn 2.224 mục baseline và 10 mục hoàn thiện ngoài baseline. Thứ tự và ID lấy từ `tools/vocabulary/baseline.json`; `cohortOrdinal` không phải `sourceIndex`.

Mỗi bài có năm bước **Hiểu → Ghép câu → Phân biệt → Tự dùng → Ôn nhớ**. Bài lưu `difficulty` (`easy`, `medium`, `hard`), lý do ngắn, `contentVersion: 3`, ngày rà soát và trạng thái chất lượng. Độ khó được xét theo số nghĩa, vai trò ngữ pháp, cấu trúc, khả năng nhầm và khả năng tự áp dụng; không suy từ HSK hay số nét.

- `easy`: nghĩa và cách dùng trực tiếp; tối thiểu 1 bài ghép câu, 1 tình huống phân biệt, 1 nhiệm vụ tự dùng và 2 thẻ ôn.
- `medium`: có cấu trúc hoặc nhầm lẫn cần dạy; tối thiểu 2 bài ghép câu, 1 bài phân biệt, 1 nhiệm vụ tự dùng và 2 thẻ ôn.
- `hard`: nhiều nghĩa/cấu trúc hoặc bẫy; tối thiểu 3 bài ghép câu, 2 bài phân biệt, 2 nhiệm vụ tự dùng và 3 thẻ ôn.

Đây là mức sàn, không phải khuôn độ dài. Số `senses` và `confusions` theo nội dung thật. `confusions` có thể rỗng; bài Phân biệt khi đó gắn với một cách dùng đã dạy, không tạo bẫy giả. Mỗi bẫy có thật phải xuất hiện ngay sau cách dùng liên quan và có đối chiếu cụ thể.

Bài sắp xếp dùng các nút chạm thật. Trả lời sai không lộ đáp án và người học được sửa; lời giải chỉ hiện khi đúng hoặc chủ động yêu cầu. Tự dùng mở gợi ý theo ý → khung → mẫu và nói rõ app không chấm câu tự do. Mỗi thẻ Ôn nhớ có trạng thái riêng; mở đáp án không tính là nhớ, và chỉ sau khi đánh giá đủ thẻ mới ghi lịch ôn tổng hợp.

V3 không có bài giảng riêng về phát âm, khẩu hình, bộ thủ, cấu tạo, nguồn gốc hay thứ tự nét. Pinyin có dấu, audio câu/từ và liên kết Hanzi sang công cụ phân tích vẫn được giữ. V1/V2 tiếp tục được nạp và hiển thị trong giai đoạn chuyển đổi.

Checkpoint riêng: `tools/vocabulary/v3-rewrite-checkpoint.json`. Tiến độ V2 cũ không được dùng làm số hoàn thành V3.
