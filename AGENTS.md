# HAZI-VIET — chế độ tiếp tục nhanh

## Nguồn và quyền
GitHub `bohoa96tb/hazi-viet` là nguồn chính. Biên soạn trên `content/vocabulary-2224`, phát hành từ `main`.
Người dùng đã cho phép biên soạn, sửa dữ liệu/code cần thiết, commit, cập nhật main và triển khai GitHub Pages sau kiểm tra. Không hỏi lại quyền này. Không force-push, xóa lịch sử/dữ liệu hoặc đổi quyền/hosting.

## Mỗi khi người dùng nhắn “Tiếp tục”
1. Đọc HEAD mới nhất của hai nhánh, file này và `checkpoint.json`. Ghim mọi lần đọc của đợt vào SHA đã quan sát. Không đọc lịch sử commit, toàn bộ mã nguồn, toàn bộ từ vựng hoặc phân tích lại kiến trúc thường lệ.
2. Checkpoint gọn chỉ là chỉ mục dẫn đường; `progress.json` và baseline cố định `tools/vocabulary/baseline.json` vẫn là nguồn tiến độ. Đối chiếu sourceBlobs với blob SHA tại HEAD. Nếu khớp, dùng nextIds/nextOrdinal để đọc đúng dữ liệu cần làm. Nếu lệch, đọc lại các nguồn tiến độ và tái tạo checkpoint; không tin số cũ. Không dùng sourceSnapshotCommit làm HEAD hiện tại.
3. Đọc chuẩn `docs/CONTENT_STANDARD.md`, schema `docs/CONTENT_SCHEMA_V2.md` và chỉ các file liên quan đến đợt. Trong cùng phiên chỉ đọc lại file nếu SHA đổi. Prompt đầy đủ `docs/PROMPT_TIEP_QUAN_DU_AN_2224.md` dùng khi thiếu yêu cầu; handoff và release là tài liệu lịch sử, không thay tiến độ hiện hành.
4. Chọn các ID chưa hoàn thành liên tiếp theo baseline 2.224 mục. 10 mục có sẵn ngoài baseline không tính vào 2.224; toàn khóa 2.234 mục. Không nhầm ordinal với sourceIndex. Tối đa hợp lý theo độ khó và dung lượng lượt; 18 mục là mức gần đây để tham khảo, không phải giới hạn hay chỉ tiêu bắt buộc. Không rút ngắn hoặc bỏ bất kỳ thành phần bắt buộc nào để tăng số lượng.
5. Giữ chuẩn V2: nghĩa/cách dùng/bẫy đầy đủ, đúng hai câu chính theo chuẩn, bài luyện và đáp án tách riêng, gợi ý tự dùng và audio. Đọc chuẩn để biết toàn bộ yêu cầu; không xem danh sách tóm tắt này là thay thế. Giữ ID, thứ tự, tính năng và tiến độ học. Sửa bài cũ không tính là mục mới.
6. Chạy kiểm thử cần thiết cho thay đổi và phần phụ thuộc. Dùng `node tools/vocabulary/process-batch.mjs apply <batch-path>` theo cú pháp công cụ hiện hành và `node tools/vocabulary/process-batch.mjs verify` khi thay nội dung/tiến độ: kiểm tra máy trên dữ liệu toàn khóa để bảo vệ hash/ID không phải yêu cầu đọc lại toàn bộ nội dung bằng mô hình. Kiểm schema/ngôn ngữ từng bài mới; kiểm renderer/audio/đáp án liên quan bằng công cụ hiện có. Chỉ kiểm cú pháp JS khi JS thay đổi; `git diff --check` cho diff. Thay tài liệu đơn thuần chỉ cần kiểm tài liệu/đường dẫn/checkpoint liên quan. Không chạy lại cùng kiểm thử đã đạt nếu không có thay đổi hoặc nghi vấn mới. Không gọi schema validation là phản biện giáo viên.
7. Lưu nội dung, tiến độ và checkpoint trong cùng commit khi khả thi. Tái tạo checkpoint từ progress/baseline đã cập nhật; sourceBlobs phải là blob SHA đúng của các nguồn trong tree mới. Không ghi SHA tự tham chiếu. Commit phải có parent là HEAD đã kiểm; cập nhật ref fast-forward với expected SHA. Nếu HEAD đổi, đọc thay đổi liên quan và tích hợp an toàn; không ghi đè.
8. Cập nhật main đã được cho phép. Xác minh file/tree liên quan sau ghi. Kiểm GitHub Pages bằng workflow run có head_sha đúng commit phát hành (không chỉ run mới nhất, không chỉ workflow PR). Phân biệt đã lưu GitHub, đang triển khai, triển khai thành công, và dữ liệu live đã xác minh. Với thay đổi học liệu, kiểm các bài mới/dữ liệu liên quan trên website thật. Ghi bằng chứng đã quan sát; không báo thành công khi pending hoặc chưa kiểm.
9. Cuối lượt chỉ báo: số mục mới hoàn thành, tổng tiến độ, commit, trạng thái phát hành và lỗi nếu có.

## Khi nào rà soát sâu
Chỉ mở rộng phạm vi khi xung đột commit, checkpoint sai, baseline/hash/ID lệch, cấu trúc thay đổi hoặc kiểm thử lỗi. Điều tra đúng phần gây lỗi trước. Không init lại baseline hay sửa hash để che lỗi. Không hạ chuẩn hoặc bỏ kiểm tính toàn vẹn để tăng tốc.

## Checkpoint
`checkpoint.json` là cache gọn có dấu vân tay nguồn, đợt cuối và nhóm tiếp theo; phải cập nhật mỗi đợt. Nếu thiếu hoặc cũ, tái tạo từ progress/baseline hiện hành. Không cần append dài vào handoff hay tạo commit chỉ để ghi SHA của chính nó.
Yêu cầu chỉ sửa/lưu quy trình hoặc bản thử thì hoàn thành đúng phạm vi; không tự tạo thêm đợt từ vựng.

## Cổng an toàn trước cập nhật main

- Nếu có xung đột commit/merge, checkpoint bất thường hoặc kiểm thử lỗi: dừng cập nhật `main`, báo bằng chứng, bước đã xong và bước bị chặn. Không tự coi việc tái tạo checkpoint là đã giải quyết bất thường; phải xác minh nguyên nhân và tính toàn vẹn trước khi tiếp tục phát hành.
- HEAD đổi nhưng chưa có xung đột: fetch lại, đối chiếu thay đổi liên quan và kiểm tra lại phần bị ảnh hưởng trước khi fast-forward; không dùng bản kiểm thử của tree cũ để phát hành tree mới.
- Trước commit nội dung, đối chiếu checkpoint với nguồn: `completedIds` phải là tiền tố liên tục, không trùng của `baseline.orderedIds`; số hoàn thành bằng độ dài tiền tố; còn lại bằng 2.224 trừ số hoàn thành. `lastCompletedId`, `lastBatch`, `nextOrdinal` và `nextIds` phải khớp progress/baseline; kiểm hash bài hoàn thành và 10 bài ngoài baseline bằng công cụ verify. Không sửa số đếm thủ công để che thiếu bài.
- Tạo checkpoint từ các nguồn đã kiểm, ghi tạm rồi thay file một lần; sourceBlobs lấy bằng `git hash-object <path>` trên chính file sắp commit, không lấy nhầm blob HEAD cũ. Kiểm lại các blob trong tree commit trước khi push. Với đợt chỉ sửa tài liệu và nguồn tiến độ không đổi, giữ checkpoint nguyên trạng sau khi đối chiếu thành công.
- Kiểm thử chỉ đọc không được âm thầm thay dữ liệu. Trước push, kiểm diff chỉ gồm file đúng phạm vi, rồi dùng push fast-forward thông thường; đồng bộ nhánh biên soạn và main với cùng commit đã kiểm. Khi hai nhánh cùng điểm xuất phát, có thể push `--atomic` cả hai ref để tránh cập nhật một nửa; không force-push.
- Khi xác minh tiến độ, “hoàn thành” là nội dung đủ cấu trúc và hash hợp lệ theo kiểm thử hiện hành; không suy diễn thành đã phản biện ngôn ngữ hay đã thử âm thanh trên thiết bị thật.
