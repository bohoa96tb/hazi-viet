# Quy trình biên soạn từ vựng — lệnh “Tiếp tục”

Nguồn chính: GitHub `bohoa96tb/hazi-viet`. Nhánh làm việc: `content/vocabulary-2224`. Không sửa hoặc force-push `main`. Không thay đổi giao diện/chức năng ngoài phần cần thiết để nạp nội dung. Không xóa dữ liệu.

1. Đọc HEAD mới nhất của nhánh GitHub, `progress.json`, `tools/vocabulary/baseline.json`, `docs/CONTENT_STANDARD.md`, code hiện tại và dữ liệu thật. Không dùng code cũ từ hội thoại làm nguồn chính.
2. Đối chiếu `progress.json` với nội dung bằng `node tools/vocabulary/process-batch.mjs verify`. Nếu lệch, tìm nguyên nhân trước khi viết. Không khởi tạo lại baseline để xóa dấu vết.
3. Lấy 12 ID tiếp theo từ baseline.orderedIds sau completedCount; không nhóm lại hoặc bỏ qua mục. Có thể nhiều hơn nếu vẫn giữ chất lượng, giải thích lý do trong batch.
4. Biên soạn đầy đủ theo chuẩn 5.1–5.6; không tự sinh lời giảng chung để đủ trường. Mỗi file batch lưu từng ID, chữ, lesson, wordEdits; dùng batch ID tăng dần và không tái sử dụng.
5. Chạy `node tools/vocabulary/process-batch.mjs apply tools/vocabulary/batches/batch-NNN.json`, rồi `node tools/vocabulary/process-batch.mjs verify`. Chạy `node --check` với JS thay đổi và kiểm tra liên kết/file thực tế liên quan. Kiểm tra cấu trúc không thay thế kiểm chứng ngôn ngữ hoặc âm thanh trên điện thoại.
6. Commit và push qua GitHub đã kết nối, trên nhánh làm việc. Ưu tiên một commit nguyên tử cho dữ liệu, báo cáo, nội dung batch và progress. Đọc lại HEAD trước khi ghi; dùng expected_sha và cập nhật fast-forward; không force để vượt xung đột.
7. Đọc lại HEAD/tree và progress trên GitHub để xác nhận dữ liệu mới thật sự được lưu. Lưu `lastVerifiedContentCommit` và URL sau xác nhận; commit ghi nhận xác minh có thể là commit kế tiếp. Không cố ghi SHA tự tham chiếu của commit đang tạo.
8. Nếu lưu thất bại, giữ nguyên tiến độ đã xác nhận trên GitHub, báo rõ bản nháp/chưa push. Không yêu cầu tải/upload thủ công. Chỉ hỏi khi thiếu thông tin thiết yếu hoặc cần thao tác phá hủy dữ liệu.
9. Báo ngắn: số thứ tự từ–đến trong nhóm 2.224, hoàn thành/2.224, số còn lại, file sửa, link commit, kiểm thử thực chạy và giới hạn/lỗi. 10 mục hoàn thiện trước baseline không tính vào 2.224; toàn khóa có 2.234 mục.

Mỗi lần người dùng nhắn “Tiếp tục”, thực hiện hết quy trình trong cùng lượt. Không tự gửi các lượt tiếp theo khi chưa có tin nhắn. Không tự merge, mở rộng đối tượng truy cập hoặc triển khai nhánh làm việc lên Pages/main.
