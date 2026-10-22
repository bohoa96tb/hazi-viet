# Tiếp quản dự án 2.224 mục

Nguồn chính: bohoa96tb/hazi-viet; biên soạn content/vocabulary-2224, phát hành main. Đọc AGENTS.md, PROMPT_TIEP_QUAN_DU_AN_2224.md, CONTENT_STANDARD.md, CONTENT_SCHEMA_V2.md, progress.json và baseline tại HEAD mới nhất. Quyền người dùng cho phép cập nhật main và triển khai sau kiểm tra; không hỏi lại thường lệ, không force-push.

## Trạng thái đợt 006

12 mục baseline 61–72: 帮忙、怎么、手机、电话、说话、请进、请问、奶、树、歌、毛、水. Đã đọc lại GitHub và xác minh toàn bộ blob khóa học ở commit 190bfb38850f92d643fbace8d60e9b7e22ac4c45: 72/2.224, còn 2.152; toàn khóa 82/2.234 bài đầy đủ. Số tại progress/HEAD là nguồn chính.

Đợt kế tiếp bắt đầu 洗 (ordinal 73), rồi 热、爱、球、白、笑、肉、花、茶、菜、雨、风. Đối chiếu lại baseline trước khi làm; sourceIndex của 洗 không phải ordinal 73.

Batch-006 theo V2: 24 ví dụ chính, 20 nhóm bẫy, 34 câu luyện, 24 tình huống tự dùng. 帮忙 có ví dụ tách 帮我一个忙 với targetParts; sửa nghĩa giới thiệu 请进 để bỏ dấu ngoặc kép thừa của thẻ tra cứu. Không biên tập lại record đã hoàn thiện. 70 record đầy đủ trước batch-006 giữ nguyên nội dung/hash.

Hỗ trợ V2 từ batch-005 giữ nguyên. Đợt này chỉ làm kiểm thử DOM lấy bài mới nhất và dữ liệu mẫu động thay vì cố định bài 回 số 49; vẫn kiểm hồi quy 不用 và một bài V1. Verify đối chiếu cohortOrdinal với baseline và đồng nhất examples ở cấp word/lesson.

## Kiểm thử và phát hành

- `node tools/vocabulary/process-batch.mjs verify`: baseline, thứ tự, ID, hash bảo vệ; V1/V2 schema, renderer, audio, câu sai cảnh báo/sửa, ẩn đáp án và mẫu, kiểm tra từ chối draft thiếu.
- `node tools/vocabulary/test-dom.mjs`: entry point thật trong Happy DOM, hai ví dụ, sự kiện nghe, lời giải/gợi ý, giữ bản nháp khi vẽ lại, ôn, yêu thích, tìm kiếm, chuyển bẫy, hồi quy bài V1.
- Kiểm cú pháp JS và `git diff --check` trước phát hành. Chi tiết schema/quy trình trong CONTENT_SCHEMA_V2.md.
- Xem docs/RELEASE.md và release.json để biết kiểm chứng phát hành. Không đồng nhất đã commit, đã cập nhật main và đã xác minh Pages.

## Giới hạn phải giữ rõ

Chưa phản biện giáo viên độc lập. Đã kiểm bố cục đại diện desktop và tương tác V2 trên website thật. Chưa kiểm bố cục mobile, TTS hay phát nền Android trên thiết bị thật. Môi trường ban đầu mất kết nối trình duyệt/Chromium; sau đó đã khôi phục trình duyệt và kiểm đại diện live. Bộ test-dom vẫn là mô phỏng; không đồng nhất với kiểm thử thiết bị. Nếu HTTP Pages bị hạn chế truy cập, ghi nhận đúng trạng thái; không quy lỗi cache điện thoại.

Lần tiếp quản này khôi phục dữ liệu lớn qua fetch_blob của kết nối GitHub khi clone/HTTP gián đoạn. Local snapshot chỉ phục vụ kiểm thử; commit gửi GitHub phải dùng tree/parent SHA thật từ GitHub, không dùng lịch sử snapshot local để cập nhật nhánh.

