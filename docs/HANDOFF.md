# Tiếp quản dự án 2.224 mục

Nguồn chính: bohoa96tb/hazi-viet; biên soạn content/vocabulary-2224, phát hành main. Đọc AGENTS.md, PROMPT_TIEP_QUAN_DU_AN_2224.md, CONTENT_STANDARD.md, CONTENT_SCHEMA_V2.md, progress.json và baseline tại HEAD mới nhất. Quyền người dùng cho phép cập nhật main và triển khai sau kiểm tra; không hỏi lại thường lệ, không force-push.

## Trạng thái đợt 005

12 mục baseline 49–60: 回、帮、打、找、电、等、话、请、问、不用、回答、多少. Tiến độ dự kiến sau khi đọc lại xác minh GitHub: 60/2.224, còn 2.164; toàn khóa 70/2.234 bài đầy đủ, gồm 10 bài ngoài baseline. Lấy số chính thức từ progress tại HEAD, không dựa số trong tài liệu này.

Đợt kế tiếp bắt đầu 帮忙 (ordinal 61), rồi 怎么、手机、电话、说话、请进、请问、奶、树、歌、毛、水; đối chiếu lại baseline trước khi làm.

V2 đã có audit, renderer, audio riêng, hai câu mẫu gắn khung; 2–4 bài mở tách lời giải và hai tình huống tự dùng có ba mức gợi ý. Bộ nạp dispatch theo lesson.version. Bài V1 giữ nguyên nội dung/hash; không chuyển cả 48 bài. Bản giới thiệu 不用 mới ghi thanh gốc bù yòng; lời giảng phân biệt biến điệu. Đây là mục mới hoàn thiện, không phải tính lại bài cũ.

## Kiểm thử và phát hành

- `node tools/vocabulary/process-batch.mjs verify`: baseline, thứ tự, ID, hash bảo vệ; V1/V2 schema, renderer, audio, câu sai cảnh báo/sửa, ẩn đáp án và mẫu, kiểm tra từ chối draft thiếu.
- `node tools/vocabulary/test-dom.mjs`: entry point thật trong Happy DOM, hai ví dụ, sự kiện nghe, lời giải/gợi ý, giữ bản nháp khi vẽ lại, ôn, yêu thích, tìm kiếm, chuyển bẫy, hồi quy bài V1.
- Kiểm cú pháp JS và `git diff --check` trước phát hành. Chi tiết schema/quy trình trong CONTENT_SCHEMA_V2.md.
- Xem docs/RELEASE.md và release.json để biết kiểm chứng phát hành. Không đồng nhất đã commit, đã cập nhật main và đã xác minh Pages.

## Giới hạn phải giữ rõ

Chưa phản biện giáo viên độc lập. Chưa chứng nhận bố cục trực quan, TTS hay phát nền Android trên thiết bị thật. Môi trường ban đầu mất kết nối trình duyệt/Chromium; DOM là mô phỏng, không gọi nó là kiểm thử Chrome thật. Nếu HTTP Pages bị hạn chế truy cập, ghi nhận đúng trạng thái; không quy lỗi cache điện thoại.

Lần tiếp quản này khôi phục dữ liệu lớn qua fetch_blob của kết nối GitHub khi clone/HTTP gián đoạn. Local snapshot chỉ phục vụ kiểm thử; commit gửi GitHub phải dùng tree/parent SHA thật từ GitHub, không dùng lịch sử snapshot local để cập nhật nhánh.
