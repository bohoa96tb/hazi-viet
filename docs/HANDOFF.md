# Tiếp quản qua cuộc trò chuyện mới

Repository: `bohoa96tb/hazi-viet`. Nhánh duy nhất được ghi nội dung: `content/vocabulary-2224`. Không merge, force-push hoặc triển khai lên `main` khi chưa có yêu cầu riêng.

## Nguồn và cách xác định vị trí tiếp tục

Đọc `AGENTS.md`, `docs/CONTENT_STANDARD.md`, `progress.json`, `tools/vocabulary/baseline.json`, `docs/PROGRESS.md` và code/dữ liệu từ HEAD mới nhất của nhánh. Không dùng nội dung hội thoại làm tiến độ chính thức. Baseline cố định có 2.224 ID cần bổ sung; 10 mục hoàn thiện trước baseline nằm ngoài số này. Toàn khóa có 2.234 mục.

Chạy `node tools/vocabulary/process-batch.mjs verify` trước khi sửa. Chỉ tiếp tục khi tiến độ, dữ liệu, thứ tự, hash nội dung đã hoàn thiện và báo cáo khớp nhau. Nếu không khớp, điều tra trước; không chạy `init` lại. Vị trí tiếp tục lấy từ `progress.nextIds` và `baseline.orderedIds` sau `completedCount`, không suy từ số của file batch hoặc mô tả cũ. `docs/PROGRESS.md` là báo cáo dễ đọc được tạo lại từ dữ liệu.

## Biên soạn và kiểm tra

Mỗi đợt lưu ở `tools/vocabulary/batches/batch-NNN.json`, theo mẫu các đợt đã có. Không sinh lời giảng chung để đủ trường. Mỗi lesson cần cả `authorship` và `sources` (mảng rỗng nếu không trích nguồn ngoài), vì giao diện dùng những trường này. Thẻ tra cứu/ví dụ có thể chưa có `shape` và `near`; cần biên soạn hai phần này trong `wordEdits` khi thiếu để tương thích với khóa học hoàn chỉnh. Bộ áp dụng chỉ cho sửa danh sách trường được phép; không mở quyền sửa ID hay cấu trúc khóa học. Pinyin chỉ ở `wordEdits.intro` hoặc phần giới thiệu hiện có; không ghi trong lesson/audio. Ghi nghĩa, cách đọc, ví dụ, cách dùng, bẫy và nhãn đánh giá chính xác; không xem câu đúng nhưng đổi nghĩa là sai ngữ pháp. Nếu chưa chắc về ngôn ngữ, đối chiếu nguồn đáng tin cậy trước khi ghi hoàn thành.

1. Tạo 12 mục kế tiếp trong batch mới, không sửa ID hoặc thứ tự khóa học.
2. Chạy `node tools/vocabulary/process-batch.mjs apply tools/vocabulary/batches/batch-NNN.json`.
3. Chạy `node tools/vocabulary/process-batch.mjs verify`, `node --check` cho JS/MJS thay đổi và `git diff --check`.
4. Xem diff: chỉ dữ liệu mục tiêu, tiến độ/báo cáo, nội dung batch và phiên bản cache cần thiết. Không sửa các mục cũ đã hoàn thiện.
5. Kiểm tra HEAD GitHub trước khi ghi. Tạo một commit nguyên tử giữ toàn bộ cây cũ và chỉ thay file cần thiết; cập nhật nhánh fast-forward với `expected_sha`. Nếu HEAD đổi, đọc lại và đối chiếu, không force để vượt xung đột.
6. Đọc lại HEAD/tree/file trên GitHub, đối chiếu SHA nội dung với bản đã kiểm tra. Chỉ lúc đó báo hoàn thành.
7. Ghi SHA/URL commit nội dung đã xác minh vào `lastVerifiedContentCommit`, `lastVerifiedContentCommitUrl` và `batches[].contentCommit` bằng commit kế tiếp; đọc lại file tiến độ. Không ghi SHA tự tham chiếu của commit đang tạo.

Lệnh verify kiểm tra 2.234 ID/liên kết; thứ tự baseline; hash mục bảo vệ; các màn hình của hàm render ở phần giới thiệu/cách dùng/ví dụ/bẫy và trạng thái mở đáp án; audio ví dụ; cảnh báo và câu sửa của câu sai; cách ly audio lời giải; chặn podcast cho mục chưa đủ mẫu. Đây là kiểm tra dữ liệu và hàm dựng HTML, chưa phải kiểm thử trình duyệt hoặc thiết bị thật.

## Vấn đề chưa giải quyết và giới hạn kiểm chứng

- Chưa có phản biện ngôn ngữ bởi giáo viên độc lập cho các đợt mới; không xem trạng thái đủ cấu trúc là chứng nhận đúng tuyệt đối.
- Chưa kiểm tra TTS, giọng đọc, phát nền hoặc điều khiển tương tác trên Android. Hàm dựng HTML chạy thành công không thay cho kiểm thử trên điện thoại.
- Nhánh biên soạn chưa tự xuất bản lên website; việc commit không đồng nghĩa người dùng trên Pages/main đã thấy nội dung mới.
- Trường `sourceIndex` là số từ trong nguồn, khác số thứ tự thuộc phạm vi bổ sung 2.224 mục. Báo cáo đợt dùng ordinal trong baseline để tránh nhầm.

Nếu lỗi công cụ hoặc xung đột ngăn lưu, báo chính xác; không tăng tiến độ xác nhận và không yêu cầu người dùng tải/upload thủ công. Sau mỗi đợt báo nhánh, từ vừa hoàn thành, số hoàn thành/còn lại, file sửa, link commit, kiểm thử thực chạy và mục tiếp theo.
