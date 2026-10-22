# Tiếp quản dự án qua cuộc trò chuyện mới

## Điểm bắt đầu

Đọc [prompt đầy đủ](PROMPT_TIEP_QUAN_DU_AN_2224.md), `AGENTS.md`, [chuẩn V2](CONTENT_STANDARD.md), `progress.json`, `tools/vocabulary/baseline.json` và code/dữ liệu tại HEAD GitHub mới nhất. Không dùng số trong tài liệu cũ làm tiến độ chính thức. Danh sách tiếp theo lấy từ `progress.nextIds` và `baseline.orderedIds` sau `completedCount`.

Repository `bohoa96tb/hazi-viet`, nhánh biên soạn `content/vocabulary-2224`, nhánh website `main`. Người dùng đã cho phép commit, cập nhật/merge main và triển khai sau mỗi đợt đạt kiểm tra; không cần xác nhận lại. Không force-push hoặc xóa dữ liệu. Đồng bộ hai nhánh bằng fast-forward hoặc merge an toàn sau thay đổi main.

Phạm vi bổ sung: 2.224 mục; có 10 mục đầy đủ từ trước, toàn khóa 2.234. Trước thay đổi prompt này, bốn batch đã hoàn thành 48 mục và đã được xuất bản qua PR #1, merge commit `180db2aa2e4e3bbf6afde78957556b56d7d00142`. Bản phát hành đã được kiểm tra live có 58 bài đủ mẫu tính cả 10 mục ngoài baseline. Đây là mốc lịch sử, không thay việc đọc tiến độ mới nhất.

## Chuẩn mới và việc cần làm trước đợt nội dung tiếp theo

Người dùng muốn giảm lặp 5.1–5.6, ưu tiên nghĩa và bẫy; gộp vị trí/kết hợp với hai ví dụ chính. Có 2–4 câu luyện, rồi hai tình huống tự dùng có gợi ý từng mức, mẫu/đáp án ẩn. Prompt V2 đầy đủ đã lưu; V1 lưu lại để hiểu bài cũ.

**Cập nhật này chỉ sửa prompt/tài liệu.** Nội dung 48 mục, schema, renderer và audio chưa được chuyển sang V2 trong đợt lưu prompt. Trước batch V2 đầu tiên, phải thực hiện:

- Hỗ trợ hai ví dụ chính mà vẫn kiểm tra chặt nội dung; audit V1 hiện yêu cầu tối thiểu ba ví dụ.
- Cho phép đúng phạm vi Pinyin của chuẩn mới: giới thiệu, khung/câu minh họa khung và đọc đúng khi cần; không lọt vào TTS hoặc rải khắp bài. Audit V1 hiện cấm Pinyin trong lesson.
- Bổ sung mô hình phiên bản nội dung và adapter cho V1/V2; giữ bài V1 đọc/hiển thị được. Không chuyển hash cũ tùy tiện hoặc dùng init xóa lịch sử.
- Hỗ trợ đề mở, các đáp án hợp lý, lời giải tách riêng; không giả vờ có bộ chấm câu tự do/giọng nói nếu app chưa có. Thêm hai tình huống tự dùng với gợi ý ý → khung → mẫu.
- Gộp giao diện và audio để một ý không bị hiển thị/đọc lại ở nhiều bước. Giữ câu sai ngoài nhắc lại/tắm ngôn ngữ; giữ lời giải đóng đến khi người học thử hoặc yêu cầu mở.
- Kiểm tra hồi quy ID/liên kết/thứ tự, nội dung cũ, render, audio, bước luyện và ẩn đáp án trước khi tăng tiến độ cho bài V2.

Không tự biên tập lại cả 48 bài chỉ vì đọc chuẩn mới; người dùng mới yêu cầu lưu prompt. Nếu sau đó có yêu cầu sửa lại, lập batch chỉnh sửa có ID/bản trước–sau và cập nhật hash hợp lệ mà không tăng số mục hoàn thành.

## Kiểm tra và phát hành

Lệnh hiện có: `node tools/vocabulary/process-batch.mjs verify` và `apply tools/vocabulary/batches/batch-NNN.json`; chúng chạy trên nhánh biên soạn. Không chạy init khi tiến độ tồn tại. Đọc script thực tế trước khi áp dụng vì hỗ trợ V2 còn cần bổ sung như trên. Mỗi lesson V1 cần `authorship`, `sources`; thẻ tra cứu chuyển hoàn thiện cần `shape`/`near` khi app còn dùng các trường đó.

Sau kiểm tra phù hợp và `git diff --check`, commit/push với bảo vệ HEAD, đọc lại tree/progress; ghi SHA xác minh sau khi commit đã tồn tại. Đưa bản đã kiểm tra vào main và theo dõi GitHub Pages. Đọc dữ liệu từ URL website, đối chiếu bài/ID và phiên bản cache. Nếu chưa xác minh live, báo chưa xác minh live; không gọi đã xuất bản chỉ vì có commit.

## Giới hạn còn tồn tại

Chưa có phản biện giáo viên độc lập cho các batch; chưa kiểm chứng TTS/phát nền/điều khiển trên Android thật. Kiểm tra schema và hàm HTML không thay kiểm thử thiết bị. Tiến độ biên soạn và trạng thái phát hành phải phân biệt trong báo cáo. Lỗi triển khai không được che bằng thông báo chỉ yêu cầu người dùng xóa cache.
