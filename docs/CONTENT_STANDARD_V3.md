# Chuẩn nội dung V3 — năm bước, độ sâu theo độ khó

V3 áp dụng cho quá trình tái biên soạn 2.224 mục baseline và 10 mục hoàn thiện ngoài baseline. Thứ tự và ID lấy từ `tools/vocabulary/baseline.json`; `cohortOrdinal` không phải `sourceIndex`.

Mỗi bài có năm bước **Hiểu → Ghép câu → Phân biệt → Tự dùng → Ôn nhớ**. Bài lưu `difficulty` (`easy`, `medium`, `hard`), lý do ngắn, `contentVersion: 3`, ngày rà soát và trạng thái chất lượng. Độ khó được xét theo số nghĩa, vai trò ngữ pháp, cấu trúc, khả năng nhầm và khả năng tự áp dụng; không suy từ HSK hay số nét.

- `easy`: nghĩa và cách dùng trực tiếp; tối thiểu 1 bài ghép câu, 1 tình huống phân biệt cách dùng, 1 nhiệm vụ tự dùng và 2 thẻ ôn.
- `medium`: có cấu trúc hoặc nhầm lẫn cần dạy; tối thiểu 2 bài ghép câu, 1 bài phân biệt, 1 nhiệm vụ tự dùng và 2 thẻ ôn.
- `hard`: nhiều nghĩa/cấu trúc hoặc bẫy; tối thiểu 3 bài ghép câu, 2 bài phân biệt, 2 nhiệm vụ tự dùng và 3 thẻ ôn.

Đây là mức sàn, không phải khuôn độ dài. Số `senses`, `collocations` và `confusions` theo nội dung thật; danh sách cụm từ và bẫy có thể rỗng. Bài Phân biệt khi không có bẫy gắn với một cách dùng đã dạy, không tạo bẫy giả. Mỗi bẫy có thật phải xuất hiện ngay sau cách dùng liên quan và có đối chiếu cụ thể.

## Quy trình phân loại và kiểm định từng mục

Trước khi viết, đánh giá riêng năm yếu tố: số nghĩa thông dụng, vai trò ngữ pháp, cấu trúc/kết hợp, nhầm lẫn thực tế và độ khó khi tự đặt câu. Không dùng HSK, số nét hay số phần có thể viết làm căn cứ. Từ DỄ đi thẳng vào một nghĩa chính; từ TRUNG BÌNH làm rõ vị trí/cấu trúc hoặc nhầm lẫn thật; từ KHÓ chia theo các nghĩa/chức năng thực tế. Không ép mọi từ có cùng số cách dùng, bẫy, ví dụ hoặc độ dài.

Trước khi đánh dấu đạt, rà riêng chất lượng ngôn ngữ và kỹ thuật: nghĩa/từ loại/ngữ pháp, cách dùng thông dụng, Pinyin, bản dịch, độ tự nhiên, bẫy đã được dạy trước khi kiểm tra, đáp án và khả năng sửa sai. Validator chỉ chứng nhận hợp đồng dữ liệu, không thay cho rà soát sư phạm. Nếu chưa có giáo viên thứ hai, phải ghi rõ là kiểm định nội bộ.

## Nội dung năm bước

1. **Hiểu:** nghĩa trọng tâm, khi dùng, vị trí/cấu trúc cần thiết, cụm từ nếu hữu ích, ví dụ Hanzi–Pinyin–Việt và bẫy thật.
2. **Ghép câu:** bài chạm sắp xếp/điền/hoàn thành theo độ khó; sai lần đầu không lộ đáp án và được sửa.
3. **Phân biệt:** kiểm tra bẫy đã dạy hoặc tình huống dùng nếu từ đơn giản; không tạo bẫy giả.
4. **Tự dùng:** người học viết trước; gợi ý mở theo ý → khung → mẫu; không tuyên bố AI chấm câu khi app không có khả năng đó.
5. **Ôn nhớ:** đáp án ẩn, từng thẻ có trạng thái riêng; mở lời giải không tính là nhớ và chỉ cập nhật lịch sau khi đánh giá đủ thẻ.

Không thêm bài riêng về khẩu hình, thanh điệu, bộ thủ, nguồn gốc, nét hay tập viết. Luôn giữ Pinyin có dấu, audio Trung/giải thích phù hợp và liên kết nhấn Hanzi sang công cụ phân tích.

Bài sắp xếp dùng các nút chạm thật. Trả lời sai không lộ đáp án và người học được sửa; lời giải chỉ hiện khi đúng hoặc chủ động yêu cầu. Tự dùng mở gợi ý theo ý → khung → mẫu và nói rõ app không chấm câu tự do. Mỗi thẻ Ôn nhớ có trạng thái riêng; mở đáp án không tính là nhớ, và chỉ sau khi đánh giá đủ thẻ mới ghi lịch ôn tổng hợp.

V3 không có bài giảng riêng về phát âm, khẩu hình, bộ thủ, cấu tạo, nguồn gốc hay thứ tự nét. Pinyin có dấu, audio câu/từ và liên kết Hanzi sang công cụ phân tích vẫn được giữ. V1/V2 tiếp tục được nạp và hiển thị trong giai đoạn chuyển đổi.

Checkpoint riêng: `tools/vocabulary/v3-rewrite-checkpoint.json`. Tiến độ V2 cũ không được dùng làm số hoàn thành V3. `completedBaselineIds` phải là tiền tố liên tục của baseline và chỉ tăng trong cùng lần áp dụng batch đã qua validator. Checkpoint lưu SHA remote đã xác minh của lượt trước, trạng thái batch hiện tại và digest dữ liệu; không lưu SHA tự tham chiếu của commit đang chứa chính checkpoint. Sau push phải đối chiếu HEAD remote bằng Git.

Mỗi lượt chỉ đọc HEAD, checkpoint, phần baseline sắp làm và file trực tiếp liên quan. Chọn cỡ batch theo độ khó và khả năng rà soát; có thể làm nhiều batch liên tiếp, nhưng từng batch phải kiểm thử, commit, push và xác minh trước khi tăng tiếp. Mục 495 `下` là pilot tham khảo và chỉ được tính đúng một lần khi tiến trình tuần tự tới đó. Mười ID ngoài baseline được giữ riêng, không làm lệch ordinal.

## Cổng phát hành

Chạy validator V3, JSON/schema, toàn vẹn ID/baseline, kiểm tra nội dung/bài tập, cú pháp JavaScript, DOM/hồi quy, `git diff --check` và kiểm thử triển khai hiện có. Chỉ push fast-forward; không force-push. Đồng bộ `main` sau khi fetch và kiểm tra HEAD mới nhất. Xác minh Pages bằng run gắn đúng `head_sha`, rồi kiểm dữ liệu live và cache; nếu chưa kiểm được phải báo đúng trạng thái, không gọi là đã triển khai thành công.
