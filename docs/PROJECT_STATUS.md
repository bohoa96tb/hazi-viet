# Hazi-Viet — trạng thái dự án

Cập nhật: 2026-10-24. Chế độ hiện hành: `review-existing-first`.

## Rà soát bài đã có

- Phạm vi: 377 bài đang đủ cấu trúc trong thứ tự `data/vocabulary/hanzii-course.json`, gồm 10 bài ngoài baseline.
- Đã rà theo chuẩn `CONTENT_STANDARD_V2-2026-10-24-review-first`: 182/377 bài.
- Đã rà trong các đợt `review-001` đến `review-011`; đợt review-011 gồm 姐、子、常、弟、手、爸、儿子、哥哥、女儿、女朋友、妈妈、妹妹、姐姐、家人、小姐、弟弟、爷爷、爸爸.
- Bài có sửa nội dung trong review-011: 子 (sửa cặp đối chiếu 子女 bị lặp), 姐姐 (bỏ câu biên tập còn sót), 小姐 (căn chỉnh câu hỏi với đáp án). 15 bài còn lại được đọc và giữ nguyên sau kiểm tra.
- Còn rà: 195 bài. Tiếp theo: 不 (`hz-h1-091e097d8c14`), 会, 吗 và các ID trong `tools/vocabulary/review-checkpoint.json`.
- Chưa được coi là phản biện giáo viên độc lập; chưa kiểm bố cục mobile hoặc TTS Android thật.

## Bổ sung bài còn thiếu

- Phạm vi baseline: 2.224 mục; 367 mục đã có nội dung bổ sung; còn 1.857 mục.
- Tiến độ này độc lập với tiến độ rà soát ở trên và không được dùng để tuyên bố đã rà 367 bài.
- Trạng thái: `paused-until-review-complete`. Không xử lý từ ordinal 368 trở đi trong khi còn bài đủ cấu trúc chưa rà.

## Giao diện và chức năng

| Việc | Trạng thái | Ưu tiên | Ghi chú |
|---|---|---:|---|
| Ẩn số schema và mã kỹ thuật khỏi luồng học | Đã phát hành | Cao | Renderer lọc nhãn 5.1–5.6, mã ví dụ/cách dùng và dòng ID nguồn trong bài; Pages run 40095904330 thành công |
| Làm rõ số thứ tự bài/từ và tách ID dữ liệu | Chưa làm | Cao | Cần kiểm các trang chủ, thư viện và bài học |
| Cho chọn mức nhớ không buộc mở gợi ý | Đã phát hành | Cao | Màn hình Ôn tập cho chọn Quên/Còn khó/Đã nhớ ngay trước khi xem đáp án; dữ liệu lịch ôn giữ nguyên |
| Thu gọn đầu trang khi cuộn trên điện thoại | Chưa làm | Cao | Cần kiểm vùng an toàn và focus bàn phím |
| Đồng bộ số liệu và nhãn trang chủ | Chưa làm | Cao | Không dùng nhãn số bài mẫu cố định |
| Dừng audio cũ khi chuyển/đóng bài | Chưa xác minh | Trung bình | Cần kiểm bằng DOM và trình duyệt thực |

Chi tiết batch rà soát nằm trong `tools/vocabulary/reviews/`; checkpoint điều hướng nằm trong `tools/vocabulary/review-checkpoint.json`.
