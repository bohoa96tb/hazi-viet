# Hazi-Viet — trạng thái dự án

Cập nhật: 2026-10-24. Chế độ hiện hành: `review-existing-first`.

## Rà soát bài đã có

- Phạm vi: 377 bài đang đủ cấu trúc trong thứ tự `data/vocabulary/hanzii-course.json`, gồm 10 bài ngoài baseline.
- Đã rà theo chuẩn `CONTENT_STANDARD_V2-2026-10-24-review-first`: 254/377 bài.
- Đã rà trong các đợt `review-001` đến `review-015`; review-015 gồm 病、中间、别的、北京、国外、国家、外国、外语、有名、网上、上、半、后、早、晚、穿、上午、下午.
- Review-015 đọc và kiểm tra toàn bộ 18 bài, phân loại độ khó và giữ nguyên nội dung sau khi đối chiếu công thức, ví dụ, bẫy, bài tập và đáp án.
- Còn rà: 123 bài. Tiếp theo: bài 255 (`hz-h1-f5222818a6aa`) và các ID trong `tools/vocabulary/review-checkpoint.json`.
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
