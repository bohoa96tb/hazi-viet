# Batch-023 — kiểm chứng trước phát hành

Nguồn trước đợt: `80db84eea035d1be715a9ab65de23f8d192a8475` trên cả `main` và `content/vocabulary-2224`.

- Mục 289–313: 岁、年、日、月、正、间、一样、今年、半年、去年、地方、地点、小时、新年、日期、时候、时间、明年、星期、现在、生日、听、唱、忘、听写.
- Đánh giá trước khi viết lưu cùng lý do trong `tools/vocabulary/batches/batch-023.json`: 8 đơn giản, 12 trung bình, 5 phức tạp. Đợt hỗn hợp chọn 25 mục để đủ dung lượng cho các mục khó.
- Tiến độ sau đợt: 313/2.224, còn 1.911; toàn khóa 323/2.234 bài đủ cấu trúc (10 bài ngoài baseline). Tiếp theo mục 314 — 听到 (`hz-h1-02b7c349829c`).
- Giữ nguyên schema V2, hai câu chính mỗi bài, 2–4 bài luyện/đáp án riêng, hai tình huống tự dùng và đủ gợi ý/mẫu riêng. 8 bài không có nhóm bẫy riêng dùng `traps: []`, `noTrapReason` và `trapReview` đúng hợp đồng hiện có.
- `apply`, `verify`, kiểm cú pháp JS đã sửa và `test-dom.mjs` đạt. DOM mở đủ 25 bài mới qua tìm kiếm/phân trang thật, kiểm hai câu chính, audio tiếng Trung, đáp án ban đầu ẩn và kết quả rà bẫy; giữ hồi quy V1, 不用, lưu nháp, gợi ý ba mức, yêu thích và ôn tập.
- Đối chiếu toàn bộ 2.209 record ngoài đợt: nguyên vẹn; ID, thứ tự và cấu trúc bài học gốc không đổi. Baseline không chỉnh sửa. Source blobs checkpoint tính từ file đã kiểm, ghi nguyên tử sau khi các kiểm thử đạt.
- Lỗi bắt được và đã xử lý trước cập nhật main: khung 新年 lặp nguyên câu ví dụ; các giả định của phần mở rộng kiểm thử DOM về bài mẫu đã mở đáp án, ô tự dùng và phân trang. Bộ kiểm thử không còn bắt buộc bài thật phải có bẫy; fixture câu sai chỉ nằm trong bộ nhớ kiểm thử.
- Chưa phản biện giáo viên độc lập, chưa kiểm bố cục trực quan hoặc TTS/phát nền trên Android thật. Kiểm kế hoạch audio/DOM không thay thế các bước đó.

## Phát hành

Đây là bằng chứng kiểm trước commit, không tuyên bố đã triển khai. Trạng thái phát hành hiện hành lấy từ HEAD GitHub, Pages run có `head_sha` đúng commit và dữ liệu live; không ghi SHA tự tham chiếu vào checkpoint. Các ghi chú RELEASE/manifest cũ là lịch sử, không thay tiến độ từ baseline/progress hiện tại.

SHA-256 dữ liệu khóa học đã kiểm: `c8595664b7b4139ff36696f8d78447c05fc92dd56618e79174f4c6e1bf7a2ecb`.
