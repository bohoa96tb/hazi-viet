# Chuẩn nội dung V3 — năm bước, độ sâu theo độ khó

V3 áp dụng cho quá trình tái biên soạn 2.224 mục baseline và 10 mục hoàn thiện ngoài baseline. Thứ tự và ID lấy từ `tools/vocabulary/baseline.json`; `cohortOrdinal` không phải `sourceIndex`.

Mỗi bài có năm bước **Hiểu → Ghép câu → Phân biệt → Tự dùng → Ôn nhớ**. Bài lưu `difficulty` (`easy`, `medium`, `hard`), lý do ngắn, `contentVersion: 3`, ngày rà soát và trạng thái chất lượng. Giao diện phải hiển thị ngay dưới tiêu đề nhãn **Độ khó thực tế: Dễ / Trung bình / Khó** và lý do ngắn để người học biết cách học. Độ khó được xét theo năm tiêu chí: số nghĩa/chức năng, vai trò ngữ pháp và vị trí, cấu trúc/kết hợp, khả năng nhầm lẫn, và độ khó khi người Việt tự đặt câu; không suy từ HSK, số nét hoặc số chữ Hán.

- `easy`: nghĩa và cách dùng trực tiếp; tối thiểu 1 bài ghép câu, 1 tình huống phân biệt cách dùng, 1 nhiệm vụ tự dùng và 2 thẻ ôn.
- `medium`: có cấu trúc hoặc nhầm lẫn cần dạy; tối thiểu 2 bài ghép câu, 1 bài phân biệt, 1 nhiệm vụ tự dùng và 2 thẻ ôn.
- `hard`: nhiều nghĩa/cấu trúc hoặc bẫy; tối thiểu 3 bài ghép câu, 2 bài phân biệt, 2 nhiệm vụ tự dùng và 3 thẻ ôn.

Đây là mức sàn, không phải khuôn độ dài hay tỷ lệ thống kê. Số `senses`, `collocations` và `confusions` theo nội dung thật; danh sách cụm từ và bẫy có thể rỗng. Bài Phân biệt khi không có bẫy gắn với một cách dùng đã dạy, không tạo bẫy giả. Mỗi bẫy có thật phải xuất hiện ngay sau cách dùng liên quan và có đối chiếu cụ thể. Bài 下 ở ordinal 495 là gold standard về độ rõ, trình tự, tương tác và trải nghiệm học; không sao chép độ dài hoặc số nghĩa của bài đó sang từ khác.

## Quét bẫy A1–A2–B–C bắt buộc

Trước khi hoàn tất mọi bài, ghi `lesson.trapReview` với `status: "complete"` và kết quả riêng cho A1 nhiều cách đọc, A2 nhiều nghĩa, B bẫy Hán Việt/dịch từng chữ và C từ hoặc cấu trúc dễ nhầm. Mỗi mục phải có `checked: true`, `found: true|false` và `summary` trung thực. `confusions[]` chỉ chứa bẫy thực sự phát hiện được; bẫy có thể gắn `category` để renderer nhóm đúng.

Nếu không có bẫy thông dụng đáng chú ý, giữ `confusions: []` và hiển thị đúng câu: “Chưa thấy bẫy thông dụng cần lưu ý ở mức học này.” Không dùng câu này khi chưa kiểm tra. Với bài trung bình/khó, mọi bẫy thông dụng đã phát hiện phải được giải thích bằng ví dụ Hanzi, Pinyin có dấu, nghĩa Việt, khác biệt và mẹo nhớ; không chỉ ghi tên từ cần phân biệt.

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

Checkpoint biên soạn lịch sử: `tools/vocabulary/v3-rewrite-checkpoint.json`. Checkpoint kiểm định chất lượng riêng: `tools/vocabulary/v3-quality-revision-checkpoint.json`. Tiến độ V2 cũ không được dùng làm số hoàn thành V3. `completedBaselineIds` phải là tiền tố liên tục của baseline và chỉ tăng trong cùng lần áp dụng batch đã qua validator. Checkpoint kiểm định phải ghi chuẩn đang dùng, ordinal hiện tại, bài đạt/giữ nguyên, bài đã viết lại, bài còn cần sửa, lý do độ khó, SHA/digest và trạng thái kiểm thử. Không biến bài chỉ PASS validator thành bài đã đạt chuẩn mới nếu chưa rà ngôn ngữ và sư phạm. Checkpoint lưu SHA remote đã xác minh của lượt trước, trạng thái batch hiện tại và digest dữ liệu; không lưu SHA tự tham chiếu của commit đang chứa chính checkpoint. Sau push phải đối chiếu HEAD remote bằng Git.

Khi người dùng nhắn “Tiếp tục”, ưu tiên hoàn tất đợt kiểm định từ ordinal 1 theo thứ tự, kể cả khi tiến độ biên soạn cũ đã ở ordinal cao hơn. Chỉ quay lại luồng biên soạn mới sau khi checkpoint kiểm định ghi nhận đã bắt kịp tiến độ cũ.

Mỗi lượt chỉ đọc HEAD, checkpoint, phần baseline sắp làm và file trực tiếp liên quan. Chọn cỡ batch theo độ khó và khả năng rà soát; có thể làm nhiều batch liên tiếp, nhưng từng batch phải kiểm thử, commit, push và xác minh trước khi tăng tiếp. Mục 495 `下` là pilot tham khảo và chỉ được tính đúng một lần khi tiến trình tuần tự tới đó. Mười ID ngoài baseline được giữ riêng, không làm lệch ordinal.

## Cổng phát hành

Chạy validator V3, JSON/schema, toàn vẹn ID/baseline, kiểm tra nội dung/bài tập, cú pháp JavaScript, DOM/hồi quy, `git diff --check` và kiểm thử triển khai hiện có. Chỉ push fast-forward; không force-push. Đồng bộ `main` sau khi fetch và kiểm tra HEAD mới nhất. Xác minh Pages bằng run gắn đúng `head_sha`, rồi kiểm dữ liệu live và cache; nếu chưa kiểm được phải báo đúng trạng thái, không gọi là đã triển khai thành công.
