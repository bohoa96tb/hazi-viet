# HAZI-VIET — chế độ tiếp tục nhanh

## Nguồn và quyền
GitHub `bohoa96tb/hazi-viet` là nguồn chính. Biên soạn trên `content/vocabulary-2224`, phát hành từ `main`.
Người dùng đã cho phép biên soạn, sửa dữ liệu/code cần thiết, commit, cập nhật main và triển khai GitHub Pages sau kiểm tra. Không hỏi lại quyền này. Không force-push, xóa lịch sử/dữ liệu hoặc đổi quyền/hosting.

## Mỗi khi người dùng nhắn “Tiếp tục”
1. Đọc HEAD mới nhất của hai nhánh, file này và `checkpoint.json`. Ghim mọi lần đọc của đợt vào SHA đã quan sát. Không đọc lịch sử commit, toàn bộ mã nguồn, toàn bộ từ vựng hoặc phân tích lại kiến trúc thường lệ.
2. Checkpoint gọn chỉ là chỉ mục dẫn đường; `progress.json` và baseline cố định `tools/vocabulary/baseline.json` vẫn là nguồn tiến độ. Đối chiếu sourceBlobs với blob SHA tại HEAD. Nếu khớp, dùng nextIds/nextOrdinal để đọc đúng dữ liệu cần làm. Nếu lệch, đọc lại các nguồn tiến độ và tái tạo checkpoint; không tin số cũ. Không dùng sourceSnapshotCommit làm HEAD hiện tại.
3. Với V3, đọc `docs/CONTENT_STANDARD_V3.md`, schema V3 trong `docs/CONTENT_SCHEMA_V2.md` và chỉ các file liên quan đến đợt. V2 tiếp tục dùng `docs/CONTENT_STANDARD.md`. Trong cùng phiên chỉ đọc lại file nếu SHA đổi. Prompt/handoff/release là tài liệu tham khảo, không thay tiến độ hiện hành.
4. Trong đợt kiểm định chất lượng, ưu tiên liên tục từ ordinal 1 theo `tools/vocabulary/v3-quality-revision-checkpoint.json` cho đến khi bắt kịp tiến độ cũ; không tiếp tục từ 92 chỉ vì checkpoint lịch sử đã ghi 91. Sau khi đợt kiểm định hoàn tất, dùng `tools/vocabulary/v3-rewrite-checkpoint.json` để tiếp tục biên soạn ID V3 chưa hoàn thành. Không dùng tiến độ V2 để nhảy tới 513. 10 mục ngoài baseline được quản lý riêng; toàn khóa 2.234 mục. Không nhầm ordinal với sourceIndex. Tự đánh giá DỄ/TRUNG BÌNH/KHÓ theo năm yếu tố trong chuẩn V3 và lưu lý do. Cỡ batch linh hoạt theo chất lượng; không bỏ qua ID, rút bài khó hay kéo dài bài dễ để đạt số lượng.
5. V3 giữ đúng năm bước Hiểu → Ghép câu → Phân biệt → Tự dùng → Ôn nhớ; độ sâu theo từ, không theo khuôn `下`. Giữ ID, thứ tự, audio, nhấn Hanzi, dữ liệu và tiến độ trình duyệt. Không thêm bài phát âm/cấu tạo chữ riêng. Sửa bài đã đạt không tính là mục mới.
6. Chạy kiểm thử cần thiết cho thay đổi và phần phụ thuộc. Dùng `node tools/vocabulary/process-batch.mjs apply <batch-path>` theo cú pháp công cụ hiện hành và `node tools/vocabulary/process-batch.mjs verify` khi thay nội dung/tiến độ: kiểm tra máy trên dữ liệu toàn khóa để bảo vệ hash/ID không phải yêu cầu đọc lại toàn bộ nội dung bằng mô hình. Kiểm schema/ngôn ngữ từng bài mới; kiểm renderer/audio/đáp án liên quan bằng công cụ hiện có. Chỉ kiểm cú pháp JS khi JS thay đổi; `git diff --check` cho diff. Thay tài liệu đơn thuần chỉ cần kiểm tài liệu/đường dẫn/checkpoint liên quan. Không chạy lại cùng kiểm thử đã đạt nếu không có thay đổi hoặc nghi vấn mới. Không gọi schema validation là phản biện giáo viên.
7. Lưu nội dung và checkpoint V3 trong cùng commit. Checkpoint lịch sử `v3-rewrite-checkpoint.json` không được dùng để tuyên bố đã kiểm định chất lượng. Checkpoint kiểm định riêng phải ghi ordinal liên tục, trạng thái giữ nguyên/viết lại/còn sửa, lý do phân loại, digest dữ liệu, SHA đã kiểm và giới hạn kiểm thử. `completedBaselineIds` chỉ tăng khi batch đã áp dụng nguyên tử và qua validator; lưu digest của dữ liệu cùng trạng thái batch. Chỉ lưu SHA remote đã xác minh từ lượt trước, không ghi SHA tự tham chiếu của commit chứa checkpoint. Commit phải có parent là HEAD đã kiểm; push fast-forward và đối chiếu SHA remote. Nếu HEAD đổi, đọc phần liên quan và tích hợp an toàn; không ghi đè.
8. Cập nhật main đã được cho phép. Xác minh file/tree liên quan sau ghi. Kiểm GitHub Pages bằng workflow run có head_sha đúng commit phát hành (không chỉ run mới nhất, không chỉ workflow PR). Phân biệt đã lưu GitHub, đang triển khai, triển khai thành công, và dữ liệu live đã xác minh. Với thay đổi học liệu, kiểm các bài mới/dữ liệu liên quan trên website thật. Ghi bằng chứng đã quan sát; không báo thành công khi pending hoặc chưa kiểm.
9. Cuối lượt chỉ báo: số mục mới hoàn thành, tổng tiến độ, commit, trạng thái phát hành và lỗi nếu có.

## Khi nào rà soát sâu
Chỉ mở rộng phạm vi khi xung đột commit, checkpoint sai, baseline/hash/ID lệch, cấu trúc thay đổi hoặc kiểm thử lỗi. Điều tra đúng phần gây lỗi trước. Không init lại baseline hay sửa hash để che lỗi. Không hạ chuẩn hoặc bỏ kiểm tính toàn vẹn để tăng tốc.

## Dependency và phạm vi kiểm thử
Thiếu dependency kiểm thử có thể cài đặt phải được xử lý trước khi coi là blocker; tái tạo môi trường theo workflow của repository và ghi rõ kết quả. Không đưa dependency chỉ dùng cho test vào bundle production. Không lặp lại phân tích kiến trúc khi hệ thống đã ổn định; migration V3 là tối ưu tùy chọn, không phải điều kiện để biên soạn. V2 chỉ áp dụng cho nội dung V2, không áp số câu hay độ dài V2 lên bài V3. Khi chỉ thêm học liệu, ưu tiên validator, rà ngôn ngữ, kiểm tra dữ liệu và hồi quy liên quan; test engine/renderer chỉ bắt buộc khi code đổi hoặc có nghi vấn hồi quy. Nếu test bắt buộc chưa chạy được, không báo PASS hay phát hành thành công; vẫn có thể lưu công việc đã đạt chuẩn lên nhánh biên soạn sau khi ghi rõ giới hạn.

## Checkpoint
`checkpoint.json` là cache gọn có dấu vân tay nguồn, đợt cuối và nhóm tiếp theo; phải cập nhật mỗi đợt. Nếu thiếu hoặc cũ, tái tạo từ progress/baseline hiện hành. Không cần append dài vào handoff hay tạo commit chỉ để ghi SHA của chính nó.
Yêu cầu chỉ sửa/lưu quy trình hoặc bản thử thì hoàn thành đúng phạm vi; không tự tạo thêm đợt từ vựng.

## AUTO-MAX-BATCH và đợt kiểm định chất lượng V3

Khi người dùng nhắn “Tiếp tục”, tự động tính toán và xử lý số từ tối đa hợp lý theo độ khó, chất lượng, tài nguyên và giới hạn thực thi thực tế. Không giới hạn số lượng từ cố định. Sau mỗi batch đã kiểm định và lưu an toàn, tự tiếp tục batch kế tiếp nếu vẫn đủ khả năng. Không giảm chuẩn nội dung để tăng số lượng.

Mỗi lượt phải đọc HEAD mới nhất của hai nhánh, file này và checkpoint; xem trước nhóm ID liên tiếp để ước lượng độ khó rồi chọn cỡ batch linh hoạt. Từ dễ có thể làm nhiều hơn, từ trung bình/khó phải dành đủ nguồn lực cho cấu trúc, bẫy và kiểm định. Sau từng batch phải kiểm thử, lưu checkpoint nhất quán, kiểm diff và lưu an toàn trước khi quyết định tiếp tục. Chỉ dừng khi hết nguồn lực an toàn, gặp lỗi không thể giải quyết, gặp xung đột cần người dùng quyết định hoặc đã hết phạm vi.

Mỗi lượt “Tiếp tục” phải đọc `v3-quality-revision-checkpoint.json` và xử lý ordinal kế tiếp từ đầu baseline; không dùng số lượng batch trước làm giới hạn và không rút ngắn bài để tăng số lượng.

## Đợt kiểm định chất lượng V3

Mỗi lượt “Tiếp tục” phải đọc `v3-quality-revision-checkpoint.json` và xử lý ordinal kế tiếp từ đầu baseline cho đến khi bắt kịp tiến độ cũ. Một bài đã đạt validator vẫn phải được rà nghĩa, từ loại, cấu trúc, Pinyin có dấu, bản dịch, độ tự nhiên, bẫy, đáp án, audio và cả năm bước hiển thị. Bài đạt chuẩn có thể giữ nguyên byte nội dung nhưng phải ghi bằng chứng trong checkpoint; sửa bài không tính thành mục mới. Không xóa hoặc đặt lại checkpoint biên soạn lịch sử.

## Cổng an toàn trước cập nhật main

- Nếu có xung đột commit/merge, checkpoint bất thường hoặc kiểm thử lỗi: dừng cập nhật `main`, báo bằng chứng, bước đã xong và bước bị chặn. Không tự coi việc tái tạo checkpoint là đã giải quyết bất thường; phải xác minh nguyên nhân và tính toàn vẹn trước khi tiếp tục phát hành.
- HEAD đổi nhưng chưa có xung đột: fetch lại, đối chiếu thay đổi liên quan và kiểm tra lại phần bị ảnh hưởng trước khi fast-forward; không dùng bản kiểm thử của tree cũ để phát hành tree mới.
- Trước commit nội dung, đối chiếu checkpoint với nguồn: `completedIds` phải là tiền tố liên tục, không trùng của `baseline.orderedIds`; số hoàn thành bằng độ dài tiền tố; còn lại bằng 2.224 trừ số hoàn thành. `lastCompletedId`, `lastBatch`, `nextOrdinal` và `nextIds` phải khớp progress/baseline; kiểm hash bài hoàn thành và 10 bài ngoài baseline bằng công cụ verify. Không sửa số đếm thủ công để che thiếu bài.
- Tạo checkpoint từ các nguồn đã kiểm, ghi tạm rồi thay file một lần; sourceBlobs lấy bằng `git hash-object <path>` trên chính file sắp commit, không lấy nhầm blob HEAD cũ. Kiểm lại các blob trong tree commit trước khi push. Với đợt chỉ sửa tài liệu và nguồn tiến độ không đổi, giữ checkpoint nguyên trạng sau khi đối chiếu thành công.
- Kiểm thử chỉ đọc không được âm thầm thay dữ liệu. Trước push, kiểm diff chỉ gồm file đúng phạm vi, rồi dùng push fast-forward thông thường; đồng bộ nhánh biên soạn và main với cùng commit đã kiểm. Khi hai nhánh cùng điểm xuất phát, có thể push `--atomic` cả hai ref để tránh cập nhật một nửa; không force-push.
- Khi xác minh tiến độ, “hoàn thành” là nội dung đủ cấu trúc và hash hợp lệ theo kiểm thử hiện hành; không suy diễn thành đã phản biện ngôn ngữ hay đã thử âm thanh trên thiết bị thật.

## Chuẩn chất lượng theo độ khó

Bài 下 (ordinal 495) là chuẩn tham khảo vàng về chất lượng sư phạm và trải nghiệm, không phải khuôn cố định về độ dài, số nghĩa hay số câu. V3 không bị ràng buộc bởi số câu hoặc độ dài cũ của V2. Giữ đủ schema V3 và mức sàn luyện tập theo độ khó; chỉ thêm nội dung khi cần để người học hiểu và tự dùng đúng. Validator PASS chỉ xác nhận hợp đồng dữ liệu, không đồng nghĩa bài đã được kiểm định tốt về ngôn ngữ và giảng dạy.

Mọi bài V3 phải ghi kết quả quét A1–A2–B–C trong `lesson.trapReview`: đã kiểm tra cách đọc, nhiều nghĩa, bẫy Hán Việt/dịch từng chữ và từ/cấu trúc gần nghĩa. Chỉ đưa bẫy thật vào `confusions[]`; nếu không có bẫy hữu ích, renderer hiện câu trạng thái chuẩn thay vì tạo mục rỗng.

## Giải thích linh hoạt theo độ khó

Từ đơn giản đi thẳng vào nghĩa/cách dùng, ví dụ tự nhiên phù hợp trình độ HSK; không kéo dài để đủ chữ. Từ trung bình làm rõ vị trí, kết hợp phổ biến và nhầm lẫn thực tế của người Việt. Từ phức tạp giải thích sâu bằng lời dễ hiểu, có so sánh gần nghĩa/cách dùng, tình huống thực tế và cách tránh lỗi. Không bịa bẫy hay quy tắc ngữ pháp. Ưu tiên chính xác, tự nhiên, dễ hiểu và dễ nhớ hơn số chữ. Giữ đủ schema V3 và mức sàn luyện tập theo độ khó; số câu, cụm từ và bẫy linh hoạt theo nhu cầu thật của từ. Chỉ cập nhật checkpoint sau khi bài hoàn chỉnh và kiểm thử đạt.
