# Quy trình tiếp quản — biên soạn và xuất bản

Nguồn chính: GitHub `bohoa96tb/hazi-viet`. Biên soạn trên `content/vocabulary-2224`; website phục vụ từ `main`. Đọc [prompt đầy đủ](docs/PROMPT_TIEP_QUAN_DU_AN_2224.md), [chuẩn V2](docs/CONTENT_STANDARD.md), [handoff](docs/HANDOFF.md), tiến độ và dữ liệu thật tại HEAD mới nhất trước khi sửa.

## Quyền người dùng đã cấp

Ngày 22/10/2026, người dùng cho phép sửa `main` để triển khai website luôn. Từ nay mỗi lệnh “Tiếp tục” trong dự án này cho phép biên soạn, sửa code/dữ liệu cần thiết, commit/push, merge/cập nhật `main` sau kiểm tra và triển khai GitHub Pages. Không hỏi lại quyền thông thường này. Quy định cũ cấm tự merge main đã được thay thế trong phạm vi trên. Không force-push, xóa lịch sử/dữ liệu, thay quyền truy cập hoặc dịch vụ hosting ngoài phạm vi.

## Quy trình mỗi đợt

1. Đọc HEAD hai nhánh, commit gần nhất, `progress.json`, `tools/vocabulary/baseline.json`, chuẩn, code và dữ liệu thực; đồng bộ main an toàn. GitHub là nguồn chính, không đoán từ chat.
2. Chạy `node tools/vocabulary/process-batch.mjs verify` trên nhánh biên soạn. Đối chiếu tiến độ, thứ tự, ID, hash và bài thật. Không chạy init lại để che lệch.
3. Chọn 12 ID chưa hoàn thành kế tiếp theo baseline. Không nhầm `sourceIndex` với ordinal. 10 mục ngoài baseline không tính vào 2.224.
4. Áp dụng chuẩn V2 ưu tiên nghĩa/bẫy, gộp vị trí với hai ví dụ; ít lặp. Trước batch V2 đầu tiên, giải quyết các khác biệt schema/renderer/audio/kiểm thử ghi ở handoff; không thêm câu thừa để qua validator V1.
5. Lưu batch có ID mới và phiên bản chuẩn. Giữ ID, thứ tự, tính năng và tiến độ học. Bài cũ chỉ biên tập lại khi có yêu cầu hoặc lỗi cần sửa; không tính mục sửa lại là mục mới.
6. Chạy apply/verify đã được cập nhật tương thích, kiểm tra cú pháp JS liên quan, hiển thị, audio, đề/đáp án, dữ liệu cũ và `git diff --check`. Tự rà ngôn ngữ, đối chiếu nguồn khi chưa chắc; không gọi schema là phản biện giáo viên.
7. Commit/push, bảo vệ HEAD bằng expected SHA/fast-forward. Đọc lại tree/file/progress để xác minh; lưu mã commit đã kiểm chứng bằng commit kế tiếp nếu cần. Không ghi SHA tự tham chiếu.
8. Đưa bản đã kiểm tra vào main, theo dõi đúng lượt GitHub Pages và kiểm tra dữ liệu trên URL website thật. Đã push, đã merge và đã xác minh website là ba trạng thái khác nhau. Không kết thúc bằng chỉ lưu nhánh khi yêu cầu là hoàn thành một đợt xuất bản.
9. Báo số mới hoàn thành/còn lại, mục sửa, file/commit, kiểm thử, deploy/live và vị trí tiếp theo. Nếu lỗi, ghi nguyên nhân, trạng thái thật và phần còn thiếu; không yêu cầu tải/upload thủ công.

Nếu chỉ được yêu cầu sửa/lưu prompt hoặc trình bày bản thử, hoàn thành đúng phạm vi đó, không tự tạo thêm một đợt từ vựng. Không dừng biên soạn app để chờ người dùng làm bài; chỉ chế độ dạy trong chat mới dừng chờ câu trả lời.
