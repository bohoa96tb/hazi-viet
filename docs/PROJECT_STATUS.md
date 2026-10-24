# Hazi-Viet — trạng thái dự án

Cập nhật: 2026-10-24. Chế độ hiện hành: `review-existing-first`.

## Rà soát bài đã có

- Phạm vi: 377 bài đang đủ cấu trúc trong thứ tự `data/vocabulary/hanzii-course.json`, gồm 10 bài ngoài baseline.
- Đã rà theo chuẩn `CONTENT_STANDARD_V2-2026-10-24-review-first`: 164/377 bài.
- Đã rà trong các đợt `review-001` đến `review-010`; đợt review-010 gồm 图书馆、杯子、洗手间、电影、电影院、电脑、电视、电视机、看病、衣服、身体、钱包、门口、饭店、五、哥、妈、妹.
- Bài có sửa nội dung trong review-010: 杯子 (tách usage trùng lặp và đổi ví dụ thứ hai sang 一杯茶 để công thức 杯 + đồ uống khớp ví dụ). 17 bài còn lại được đọc và giữ nguyên sau kiểm tra; 饭店 được xếp khó vì nghĩa thay đổi theo vùng/ngữ cảnh.
- Còn rà: 213 bài. Tiếp theo: 姐 (`hz-h1-c0d309a81ef0`), 子, 常 và các ID trong `tools/vocabulary/review-checkpoint.json`.
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
| Cho chọn mức nhớ không buộc mở gợi ý | Chưa làm | Cao | Giữ tiến độ và hành vi ôn hiện có |
| Thu gọn đầu trang khi cuộn trên điện thoại | Chưa làm | Cao | Cần kiểm vùng an toàn và focus bàn phím |
| Đồng bộ số liệu và nhãn trang chủ | Chưa làm | Cao | Không dùng nhãn số bài mẫu cố định |
| Dừng audio cũ khi chuyển/đóng bài | Chưa xác minh | Trung bình | Cần kiểm bằng DOM và trình duyệt thực |

Chi tiết batch rà soát nằm trong `tools/vocabulary/reviews/`; checkpoint điều hướng nằm trong `tools/vocabulary/review-checkpoint.json`.
