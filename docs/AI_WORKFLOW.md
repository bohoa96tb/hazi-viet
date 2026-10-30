# Quy trình AI Manager — bốn vai trò cho HAZI-VIET

Tài liệu này chốt cách các vai trò AI phối hợp khi làm việc trên repository này.
Nó **không** là một nguồn tiến độ mới và **không** chép lại các chuẩn đã có:
tiến độ vẫn nằm ở `progress.json` / `checkpoint.json` (từ vựng),
`docs/PRACTICE_CHECKPOINT.md` (Thực hành) và `tools/vocabulary/review-checkpoint.json` (rà soát);
chuẩn nội dung vẫn nằm ở `docs/CONTENT_STANDARD.md`, `docs/CONTENT_SCHEMA_V2.md`
và `docs/PRACTICE_STANDARD.md`. File này chỉ định nghĩa **ai làm gì, theo thứ tự nào,
và bằng chứng nào thì được coi là xong**.

## Bốn vai trò

### AI Manager — Quản lý (phiên chính, giữ quyền quyết định)

- Đọc HEAD mới nhất của `main` và các checkpoint liên quan, ghim SHA đã quan sát cho cả đợt.
- Xác định nhiệm vụ từ checkpoint (không tự bịa nhiệm vụ mới, không bắt đầu lại phần đã xong).
- Viết brief cho từng vai trò: phạm vi, file được đụng, việc cấm, bằng chứng phải nộp.
- Phân công, theo dõi số vòng sửa, quyết định: đạt / sửa tiếp / dừng và báo cáo.
- Là vai trò duy nhất được tạo PR và đề xuất gộp; không tự gộp khi người dùng chưa cho phép ở đợt đó.
- Chịu trách nhiệm cuối về tính khớp nhau giữa code, checkpoint và báo cáo cho người dùng.

### Chinese Expert — Chuyên gia tiếng Trung

- Kiểm tra nội dung HSK: nghĩa, cách dùng, ngữ pháp, ví dụ, bẫy gần nghĩa.
- Kiểm tra hội thoại, transcript và bản dịch của phần Thực hành theo đúng nguồn đã xác minh.
- Chỉ ra lỗi kèm câu/ngữ cảnh cụ thể và yêu cầu sửa; không tự sửa dữ liệu khi đang ở vai kiểm tra.
- Không bịa nguồn, video, transcript hoặc quy tắc ngữ pháp để lấp chỗ thiếu.
- Làm việc **trước** khi Developer chốt dữ liệu nội dung, và độc lập với người biên soạn nội dung đó.

### Developer — Lập trình viên

- Biên soạn dữ liệu và sửa code đúng phạm vi brief trên một nhánh riêng từ HEAD đã ghim.
- Bảo vệ ID, thứ tự bài, `completedCount`, tiến độ học của người dùng và dữ liệu ngoài phạm vi.
- Tự chạy kiểm thử sơ bộ của phần mình làm trước khi bàn giao cho QA.
- Không tự tuyên bố "đã nghiệm thu"; chỉ báo đã làm gì và đã tự kiểm gì.
- Không gộp `main`, không force-push, không viết lại lịch sử.

### QA Agent — Kiểm thử (độc lập với Developer)

- Là agent khác với agent đã lập trình/biên soạn phần đang kiểm; nhận brief riêng từ Manager.
- Làm trên clone/checkout sạch của đúng commit cần kiểm; **chỉ đọc và chạy test, không sửa file**
  trong phạm vi đang kiểm (lỗi tìm được trả về Manager, không tự vá).
- Chạy các kiểm thử hiện có của repo liên quan thay đổi, kiểm schema/dữ liệu bằng bằng chứng số,
  và kiểm giao diện/phát thật trên live khi nhiệm vụ có phần người dùng nhìn thấy được.
- Báo cáo từng mục đạt/không đạt kèm lệnh và kết quả đã quan sát, và liệt kê riêng phần
  **chưa xác minh** (thiết bị thật, viewport, tai nghe đối chiếu…). Chưa chạy thì ghi chưa chạy.
- Sau khi Developer sửa, QA kiểm lại đúng mục đã lỗi cộng hồi quy liên quan.

## Quy tắc phối hợp bắt buộc

1. **Một người ghi tại một thời điểm cho một phạm vi file.** Hai agent không bao giờ cùng sửa
   cùng một file hoặc cùng một bài trong cùng một lúc. Agent song song chỉ dùng cho việc đọc,
   khảo sát hoặc kiểm tra độc lập trên bản sao riêng.
2. **QA độc lập với Developer.** Agent đã viết code/dữ liệu của một nhiệm vụ thì không tự làm
   QA cuối cho chính nhiệm vụ đó.
3. **Ghim HEAD.** Mọi vai trò làm và kiểm trên cùng một SHA đã quan sát. HEAD đổi giữa chừng
   thì dừng, đối chiếu phần thay đổi liên quan, rồi mới tiếp tục; không dùng kết quả kiểm
   của tree cũ cho tree mới.
4. **Bằng chứng trước tuyên bố.** Không tuyên bố đã kiểm thử, đã phát hành hoặc đã nghiệm thu
   nếu chưa thực sự chạy/nhìn thấy. Phân biệt rõ: đã lưu trên GitHub, đã triển khai Pages,
   đã xác minh trên live là ba trạng thái khác nhau.
5. **Tối đa 3 vòng sửa cho một nhiệm vụ.** Hết 3 vòng mà QA vẫn không đạt thì dừng nhiệm vụ,
   Manager báo người dùng nguyên nhân, bằng chứng và phần còn thiếu; không nới chuẩn để qua.
6. **Checkpoint khớp code trong cùng đợt.** Đổi nội dung thì cập nhật checkpoint/release
   liên quan trong cùng PR hoặc PR hồ sơ nối tiếp ngay sau đó; không để hồ sơ ghi trạng thái
   mà code không có (và ngược lại).
7. **Dừng khi có xung đột.** Xung đột commit, checkpoint lệch nguồn tiến độ, hash/ID lệch
   hoặc kiểm thử lỗi không rõ nguyên nhân: dừng phát hành, báo bằng chứng, không tự vá số liệu.

## Vòng đời một nhiệm vụ

1. **Nhận nhiệm vụ** — Manager đọc HEAD + checkpoint, xác định nhiệm vụ đang dở/kế tiếp,
   phạm vi và điểm dừng.
2. **Phân công** — Manager viết brief; nếu có nội dung tiếng Trung, Chinese Expert kiểm tra
   nguồn và nội dung trước hoặc song song ở chế độ chỉ đọc.
3. **Thực hiện** — Developer làm trên nhánh riêng, một người ghi cho mỗi phạm vi file.
4. **QA** — QA Agent độc lập kiểm tra trên bản sạch: test, dữ liệu, giao diện live nếu có.
5. **Sửa lỗi (nếu có)** — Manager giao lại đúng vai trò gây ra lỗi (Developer hoặc
   Chinese Expert); sửa xong quay lại bước 4. Tối đa 3 vòng sửa.
6. **Tạo PR** — Manager tạo PR với mô tả gồm: thay đổi, kết quả QA, giới hạn chưa xác minh.
   Gộp hay không theo quyền người dùng đã cấp cho đợt đó; mặc định đợt tài liệu và đợt
   đóng hồ sơ chỉ tạo PR, không tự gộp.
7. **Sau khi gộp** — kiểm Pages theo đúng `head_sha` của commit gộp và đối chiếu dữ liệu live
   liên quan trước khi báo người dùng là đã phát hành.

## Kích hoạt ở phiên Muse mới

- Trong repository này, `AGENTS.md` trỏ tới file này; phiên làm việc mới đọc `AGENTS.md`
  là thấy quy trình.
- Phía Muse, skill `hazi_viet_ai_manager` (custom skill của người dùng) tóm tắt quy trình
  này và yêu cầu đọc bản gốc tại đây trước khi phân công. Nếu skill và file này lệch nhau,
  file trong repository là bản đúng.
