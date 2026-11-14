# HAZI-VIET — tự khởi tạo hàng đợi và theo dõi ngoài phiên chat

## Phạm vi thật

- Workflow `.github/workflows/hazi-manager-scheduler.yml` chạy mỗi ngày lúc 09:00 Asia/Tokyo (00:00 UTC), hoặc chạy tay bằng `workflow_dispatch`. GitHub có thể trì hoãn chạy theo lịch.
- Script `tools/automation/hazi-scheduler.mjs` chỉ đọc HEAD/checkpoint/PR và ghi GitHub Issues: một dashboard, một Issue nhiệm vụ nếu đủ điều kiện.
- Không chạy Muse Web, không thực thi AI lập trình, không ghi source/progress/checkpoint, không merge PR. Không đánh đồng tạo Issue với thực sự đã bắt đầu code.
- `ChatGPT` có một lịch theo dõi riêng; thông báo ChatGPT không phải tín hiệu rằng runner đang thực thi.

## Cổng an toàn

1. Đọc dữ liệu thật từ `main`: `progress.json`, `checkpoint.json`, `docs/PRACTICE_CHECKPOINT.md`.
2. Hiển thị riêng các số khác nhau. Nếu `progress.json.completedCount` khác `checkpoint.json.completedCount`, dashboard ghi CHẶN và **không** mở nhiệm vụ mới. Tuyệt đối không tự sửa chỉ số để cho qua.
3. Có bất kỳ PR mở nào thì chờ xử lý PR. Cấm tự merge.
4. Nếu checkpoint ghi phải chờ người dùng nhắn “Tiếp tục” hay xác nhận thì không tự vượt điểm dừng.
5. Khi các cổng đạt, chỉ tạo **một Issue nhiệm vụ** có fingerprint; chạy lại cùng checkpoint không tạo trùng. Issue đã đóng giữ dấu vết để không tạo lại chỉ vì lịch quét.
6. Mỗi lượt có báo cáo trong GitHub Actions Job Summary. Dashboard trong GitHub Issues được cập nhật chỉ khi nội dung thay đổi.
7. Mọi thao tác nhạy cảm đều theo `AGENTS.md` và (sau khi merge) `docs/AI_WORKFLOW.md`.

## Điều kiện kích hoạt ngoài phiên chat

**Giai đoạn A — theo dõi / xếp hàng** (PR này): GitHub Actions tự chạy lịch, tạo hoặc cập nhật Issues. Không yêu cầu API key của Muse.

**Giai đoạn B — AI tự lập trình** (chưa kích hoạt): phải triển khai một runner GitHub Actions dùng Muse Spark API + OpenCode (hoặc agent runtime tương đương), có GitHub permissions tối thiểu, bí mật `MODEL_API_KEY`, giới hạn chi phí và timeout; Agent chỉ được mở Pull Request sau QA. Đây là **Meta Model API riêng** chứ không phải phiên Muse Web. Tài liệu: https://dev.meta.ai/docs/cookbook/github-agent.

Trước khi bật giai đoạn B, thử một Issue đơn nhỏ và QA độc lập. Thiết lập giới hạn một job ghi repo tại một thời điểm, không tự merge, khóa sửa workflow/secret, không cho Agent nhận lệnh ghi từ nguồn không tin cậy. Không lưu API key trong commit, Issue, log hoặc prompt.

## Cách sử dụng

1. Duyệt và merge PR này sau khi đã xem diff. Workflow chạy theo lịch chỉ sau khi có trên nhánh mặc định `main`.
2. Vào **GitHub → Actions → HAZI-VIET | Scheduler and progress → Run workflow** để thử ngay; lần thử đầu có thể chỉ cập nhật bảng và báo CHẶN.
3. Vào **Issues** để xem `HAZI-VIET | Bảng theo dõi AI Manager`. Vào trang run để xem Job Summary hoặc lỗi GitHub permissions.
4. Nếu gặp lỗi `Resource not accessible by integration`, kiểm tra **Settings → Actions → General → Workflow permissions** và quyền tạo Issues. Chỉ tăng những quyền thật sự cần.
5. Khi còn PR đang mở, checkpoint cũ hoặc điểm dừng cần người dùng xác nhận, xử lý đúng nguyên nhân; không sửa script để bỏ qua.
6. Sau khi mọi cổng đạt, Issue `HAZI-VIET | Nhiệm vụ tiếp theo từ checkpoint` sẽ được tạo. Đến khi có runner giai đoạn B, việc thực thi vẫn do Muse Web hoặc người dùng khởi động từ Issue đó.

## Trạng thái khi soạn PR này (2026-10-30)

- Trên `main`, `progress.json` ghi 912/2.224; `checkpoint.json` vẫn ghi 552/2.224: nguồn tiến độ đang lệch. Script phải hiển thị và CHẶN, không tự “sửa” số đếm.
- Các PR #52 (hồ sơ), #53 (AI Manager), #54 (điều chỉnh mốc video) đang mở. Không tự tạo batch mới hoặc làm HSK1 Bài 4.
- Đã có skill `hazi_viet_ai_manager` phía Muse theo báo cáo phiên Muse, nhưng skill này không phải tiến trình chạy nền trên GitHub.

## Dừng/bật lại

- Có thể tắt lịch trong GitHub Actions hoặc vô hiệu hóa workflow bằng GitHub UI; dừng hẳn worker giai đoạn B bằng cách tắt workflow của worker, nếu sau này được bổ sung.
- Không xóa các Issue lịch sử; chúng là bằng chứng tiến độ và sự cố.
