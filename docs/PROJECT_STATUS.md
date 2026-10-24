# Hazi-Viet — trạng thái dự án

Cập nhật: 2026-10-24. Chế độ hiện hành: `review-existing-first`.

## Rà soát bài đã có

- Phạm vi: 377 bài đang đủ cấu trúc trong thứ tự `data/vocabulary/hanzii-course.json`, gồm 10 bài ngoài baseline.
- Đã rà theo chuẩn `CONTENT_STANDARD_V2-2026-10-24-review-first`: 10/377 bài.
- Đã rà trong đợt `review-001`: 我、你、您、他、她、我们、你们、汉字、谢谢、不客气.
- Bài có sửa nội dung: 你 (`hz-h1-0a3f1c936624`); sửa tình huống, công thức và tiêu đề khung hỏi xác nhận.
- Còn rà: 367 bài. Tiếp theo: 对不起 (`hz-h1-15b6a3af5e33`), 没关系, 再见, 是 và các ID trong `tools/vocabulary/review-checkpoint.json`.
- Chưa được coi là phản biện giáo viên độc lập; chưa kiểm bố cục mobile hoặc TTS Android thật.

## Bổ sung bài còn thiếu

- Phạm vi baseline: 2.224 mục; 367 mục đã có nội dung bổ sung; còn 1.857 mục.
- Tiến độ này độc lập với tiến độ rà soát ở trên và không được dùng để tuyên bố đã rà 367 bài.
- Trạng thái: `paused-until-review-complete`. Không xử lý từ ordinal 368 trở đi trong khi còn bài đủ cấu trúc chưa rà.

## Giao diện và chức năng

| Việc | Trạng thái | Ưu tiên | Ghi chú |
|---|---|---:|---|
| Ẩn số schema và mã kỹ thuật khỏi luồng học | Chưa làm | Cao | Còn nhãn 5.1–5.6/mã nội bộ trong renderer cũ |
| Làm rõ số thứ tự bài/từ và tách ID dữ liệu | Chưa làm | Cao | Cần kiểm các trang chủ, thư viện và bài học |
| Cho chọn mức nhớ không buộc mở gợi ý | Chưa làm | Cao | Giữ tiến độ và hành vi ôn hiện có |
| Thu gọn đầu trang khi cuộn trên điện thoại | Chưa làm | Cao | Cần kiểm vùng an toàn và focus bàn phím |
| Đồng bộ số liệu và nhãn trang chủ | Chưa làm | Cao | Không dùng nhãn số bài mẫu cố định |
| Dừng audio cũ khi chuyển/đóng bài | Chưa xác minh | Trung bình | Cần kiểm bằng DOM và trình duyệt thực |

Chi tiết batch rà soát nằm trong `tools/vocabulary/reviews/`; checkpoint điều hướng nằm trong `tools/vocabulary/review-checkpoint.json`.
