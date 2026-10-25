# Hazi-Viet — trạng thái dự án

Cập nhật: 2026-10-25. Chế độ hiện hành: `supplementation` (đã qua cổng rà soát bài có sẵn).

## Rà soát bài đã có

- Phạm vi: 377 bài đang đủ cấu trúc trong thứ tự `data/vocabulary/hanzii-course.json`, gồm 10 bài ngoài baseline.
- Đã rà theo chuẩn `CONTENT_STANDARD_V2-2026-10-24-review-first`: 377/377 bài.
- Đã rà trong các đợt `review-001` đến `review-022`; review-022 gồm 再、坐、放、累、走、起、下次、下班、下课、下车、休息、坐下、放假、放学、最后.
- Review-022 đọc và kiểm tra toàn bộ 15 bài, phân loại 4 dễ, 8 trung bình, 3 khó. Bài 最后 được chỉnh rõ hai mẫu `最后 + số từ + lượng từ + danh từ` (最后一本书) và `最后的 + danh từ` (最后的书), cùng cách dùng 最后 làm trạng ngữ và phân biệt với 终于. MDBG được đọc để kiểm tra mục từ/cách đọc/nghĩa; không coi HTTP 200 là bằng chứng ngữ pháp.
- Đã hoàn tất rà soát toàn bộ 377 bài đủ cấu trúc. Cổng review đã đóng; giai đoạn hiện hành là supplementation. Đã sửa correction-002 cho 睡觉、起来、地 và batch-030 đã soạn mục khó 着 ở ordinal 380, giới hạn vào trạng thái/cách thức với 着 và cách đọc khác trong 睡着.
- Chưa được coi là phản biện giáo viên độc lập; TTS Android thật vẫn chưa xác minh.

## Bổ sung bài còn thiếu

- Phạm vi baseline: 2.224 mục; 481 mục đã có nội dung bổ sung; còn 1.743 mục.
- Tiến độ này độc lập với tiến độ rà soát ở trên và không được dùng để tuyên bố đã rà 367 bài.
- Trạng thái: batch-046 đã biên soạn và kiểm tra cục bộ trên content, đang chờ commit và phát hành Pages. CompletedCount là 481/2.224, còn 1.743; đợt kế tiếp bắt đầu từ ordinal 482 theo ID trong checkpoint. Batch-046 gồm 4 bài dễ và 8 bài trung bình; các bài mới có hai ví dụ, bẫy đối chiếu thật và hai tình huống tự dùng. Correction-008 sửa bản dịch 我今天去看医生 thành “Hôm nay tôi đi khám bệnh”, không tăng completedCount. Tiến độ supplementation độc lập với cổng rà soát 377/377.

## Giao diện và chức năng

| Việc | Trạng thái | Ưu tiên | Ghi chú |
|---|---|---:|---|
| Ẩn số schema và mã kỹ thuật khỏi luồng học | Đã phát hành | Cao | Renderer lọc nhãn 5.1–5.6, mã ví dụ/cách dùng và dòng ID nguồn trong bài; Pages run 40095904330 thành công |
| Làm rõ số thứ tự bài/từ và tách ID dữ liệu | Đã phát hành | Cao | Danh sách dùng số thứ tự toàn khóa; bài học hiển thị HSK · Bài · Từ, ID kỹ thuật chỉ còn trong dữ liệu |
| Cho chọn mức nhớ không buộc mở gợi ý | Đã phát hành | Cao | Màn hình Ôn tập cho chọn Quên/Còn khó/Đã nhớ ngay trước khi xem đáp án; dữ liệu lịch ôn giữ nguyên |
| Thu gọn đầu trang khi cuộn trên điện thoại | Đã phát hành | Cao | Đầu bài thu gọn sau khi cuộn vùng nội dung; footer giữ safe-area và nội dung có khoảng đệm |
| Đồng bộ số liệu và nhãn trang chủ | Đã phát hành | Cao | Trang chủ đọc `lessonTotal/courseTotal` từ `data/vocabulary/release.json`, không còn nhãn “10 bài mẫu” |
| Dừng audio cũ khi chuyển/đóng bài | Đã kiểm tra logic/DOM; còn giới hạn thiết bị | Trung bình | `route`, chuyển bước, chuyển từ và đóng bài đều gọi stop; chưa xác minh phát âm thật trên Android |
| Hiển thị đủ cách đọc và audio ngữ cảnh V2 | Đã kiểm tra cục bộ; chưa phát hành lượt này | Cao | Bài đa âm `地` hiện hiển thị cả hai cách đọc và đọc `地上`/`认真地学习`; chưa xác minh TTS thiết bị thật |

Chi tiết batch rà soát nằm trong `tools/vocabulary/reviews/`; checkpoint điều hướng nằm trong `tools/vocabulary/review-checkpoint.json`.
