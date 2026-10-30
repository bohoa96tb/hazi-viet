# Checkpoint Thực hành sau bài

Tiến độ **tuyển chọn và hoàn thiện phần Thực hành** (hội thoại/video) cho từng bài.
Đây là một trục tiến độ riêng: không gộp với tiến độ biên soạn từ vựng (`progress.json`)
và không phải tiến độ học của người dùng. Chuẩn làm việc: `docs/PRACTICE_STANDARD.md`.

Trạng thái: `chưa làm` · `đang tìm nguồn` · `đang biên soạn` · `đang kiểm tra` · `đã phát hành` · `bị chặn` · `bỏ qua (từ vựng chưa xong)`.

**Hành động đang chờ:** Nghe từng câu cho HSK1 · Bài 3 đã hoàn thiện và phát hành (PR #50, merge a53e2c9;
xem ghi chú phiên 2026-10-30 về đóng hồ sơ PR #50 ở dưới). Bài tiếp theo cần kiểm tra điều kiện là
HSK1 · Bài 4 — chỉ làm khi người dùng nhắn “Tiếp tục” lần kế. Chưa bắt đầu Bài 4.

| Bài | Khóa bài (từ đầu trang) | Số từ | Từ vựng | Thực hành | Video đã chọn | Độ phủ | Còn thiếu / ghi chú | Kiểm chứng | Commit |
|---|---|---|---|---|---|---|---|---|---|
| HSK 2 · Bài 12 | hz-h2-0f9648e9dded (neo: hz-h2-0ec2a615954f) | 24 | Đã xong (24/24 bài V2) | **đã phát hành** (pilot v6, mẫu chuẩn) | CS4-1108, CS3-0107, CS4-1206, CS4-3401, CS4-2309 (Chinese Station) | 10/24 | Thiếu 14 từ: 腿 骑 一路平安 一路顺风 人口 公路 司机 椅子 爬山 自行车 行人 车辆 道路 骑车. CS4-3106 đã bị thay ra ở v6 (dữ liệu giữ trong surveyLog của file pilot) | Đã phát thử cả 5 video trong app live, mốc câu rà trên 2 bản/video; chưa thử Android thật | PR #44, merge a08ec0c |
| HSK 1 · Bài 1 (Làm quen và giới thiệu) | hz-h1-64d354d405bb | 24 | Đã xong (24/24 bài V2, trạng thái deep) | **đã phát hành** | CS4-0203, CS4-0205, CS4-0105, CS4-0801, CS4-0804 (Chinese Station) | 15/24 (đính chính 2026-10-30, PR #46) | Còn thiếu 9 từ: 他 她 我们 你们 汉字 汉语 学生 同学 朋友. Đính chính ranh giới từ: 中文 trong 中文系 là từ độc lập （中文 + 系） nên tính; 学生 trong 留学生 là phần của từ nguyên khối nên không tính. Đã loại sau khảo sát: CS4-0806 (đã kiểm chứng, dự bị), CS4-0214 (có 同学, để cân nhắc khi mở rộng), CS4-0201/0104/0101 (không thêm từ mới), Yuyan Blues (không có lời thoại kiểm chứng được), Hong Hua Ep.4/5 (thẻ từ + câu đùa), CCTV Growing Up L1 (có người dẫn, không thêm từ mới). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử, hai bản/video dài bằng nhau, mốc câu đọc từ phụ đề cháy (±1 giây); 3 video quá ngắn nghe cả đoạn. Đã xác minh trên app live (CS4-0205 phát hết đoạn); chưa thử Android thật | PR #45, merge 151c75e |
| HSK 1 · Bài 2 | hz-h1-f05455e3c9c0 | 24 | Đã xong (24/24 bài V2, trạng thái deep) | **đã phát hành** | CS4-0807, CS4-0604, CS4-1009, CS4-1802, CS4-1210 (Chinese Station) | 11/24 | Còn thiếu 13 từ: 事 写 分 块 字 最 次 记 读 页 本子 课本 呢 （分/字 chỉ trong từ nguyên khối 分钟/汉字 nên không tính; 百 trong số 130 của CS4-1802 là từ “trăm” độc lập nên tính). Đã loại: CS4-1601 chưa từng quay （未撮影）; CS4-0605 không thêm từ mới （字 trong 汉字）; CS4-1011 chỉ lặp 点. Thứ tự câu 4–5 của CS4-1210 lấy theo video (trang nguồn in ngược). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử và đo mốc trên hai bản ở khâu tuyển nguồn; trên app live đã phát hết CS4-1210 (nút câu 7 nhảy đúng ~0:19) và CS4-1802; CS4-1009 câu 3 suy từ mốc kẹp; 2 video nghe cả đoạn. Chưa thử Android thật | PR #47, merge 02849ae |

| HSK 1 · Bài 3 (Hỏi, nhờ giúp đỡ và gọi điện thoại) | hz-h1-9e4bde0a04dc | 24 | Đã xong (24/24 bài V2, trạng thái deep) | **đã phát hành** | CS4-1402, CS4-1409, CS4-1408, CS4-3101, CS4-3001 (Chinese Station) | 13/24 | Còn thiếu 11 từ: 回 帮 不用 回答 帮忙 说话 请进 奶 树 歌 毛. Ranh giới từ: 话/电 không tính phần trong từ nguyên khối 电话 — 电 chỉ tính ở 手机没电了, 话 chỉ tính ở 我的话; 说话 không tính từ 说汉语 （说 + tân ngữ). Đã loại: CS4-1411 (chỉ +找, nhiều từ khó), CS4-1303 (chỉ +不用), CS4-2115 （帮助 không phải 帮忙）, CS4-1407 (không thêm từ mới), CS4-3002 (chỉ lặp 打电话, tình huống cấp cứu). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử trên YouTube: phát được, lời thoại khớp trang nguồn đúng thứ tự, thời lượng 19/17/22/11/9 giây, có tùy chọn nhúng chính thức; Nghe từng câu đã hoàn thiện ở PR #50: cả 5 video có mốc start/end từng lượt đo từ phụ đề cháy (±1 giây), bỏ hẳn segmentMode clip, dữ liệu lên version 2; phân bố 25 lượt = 4/7/6/4/4. QA độc lập trên main a53e2c9: validator + test DOM 6 kịch bản (deep4 kiểm từng nút khớp mốc dữ liệu) + pilot + test-dom đều đạt; script riêng xác nhận 25/25 mốc hợp lệ, không chồng lấn, độ phủ giữ 13/24, completedCount giữ 912. Nghiệm thu phát thật trên live (30/10/2026): đếm đủ nút từng câu ở cả 5 video; phát thử câu đầu + câu cuối của mỗi video (10 lần) đều nhảy đúng đoạn và tự dừng; nút nghe cả đoạn của CS4-1402 chạy hết 0:19; hướng dẫn “nghe theo cả đoạn” không còn ở Bài 3; hồi quy Bài 1–2 đạt; không có “undefined”. Giới hạn: mốc chưa đối chiếu bằng tai người ở độ chính xác từng giây (riêng ranh giới câu 1/2 của CS4-3101 rất sát, đáng nghe lại nếu cần chính xác tuyệt đối); chưa thử Android thật; viewport đúng 390px chưa kiểm chứng được — ở cửa sổ desktop đã xem không tràn ngang | PR #49, merge 2c9121a; nghe từng câu PR #50, merge a53e2c9 |

## Bài bị bỏ qua (từ vựng chưa hoàn tất)

(Chưa có — sẽ ghi tại đây khi gặp trong quá trình quét theo thứ tự.)

## Ghi chú phiên

- 2026-10-30: **Đóng hồ sơ PR #50 — nghe từng câu cho Bài 3.** PR #50 (merge `a53e2c9`, commit nội dung
  `0c9027c`) đã gộp trước khi checkpoint kịp cập nhật, nên bản checkpoint trước ghi sai trạng thái
  “cả 5 nghe cả đoạn (chưa đo mốc từng câu)” và `docs/RELEASE.md` cũng chưa có mục nào cho Bài 3
  (kể cả của PR #49). PR đóng hồ sơ này chỉ sửa hai tài liệu đó cho khớp code, không đổi dữ liệu/code.
  Bằng chứng: QA độc lập (không phải người làm PR #50) chạy trên clone sạch của `a53e2c9` —
  `test-practice-data`, `test-listening-dom` (6 kịch bản), `test-listening-pilot`, `test-dom`,
  `node --check` đều đạt; script kiểm riêng xác nhận 25/25 lượt có mốc hợp lệ không chồng lấn,
  0 video còn `segmentMode: clip`, version file = manifest = 2, độ phủ 13/24 đếm khớp hai cách,
  câu cuối CS4-3001 là “您稍等一下。” (thay đổi chữ Hán duy nhất so với version 1), `completedCount` 912.
  Kiểm chứng phát thật trên app live: đủ nút từng câu ở 5 video theo phân bố 4/7/6/4/4; 10 lần phát thử
  (câu đầu + câu cuối mỗi video) đều đúng đoạn và tự dừng; nghe cả đoạn CS4-1402 hết 0:19/0:19;
  hồi quy Bài 1 (CS4-0203 câu 1 dừng 0:02/0:11) và Bài 2 (CS4-0604 câu 1 dừng 0:02/0:13) đạt.
  Quan sát ngoài phạm vi, không phải lỗi của PR #50: video 1 của Bài 2 (CS4-0807) vẫn nghe cả đoạn
  theo thiết kế cũ của Bài 2; tiêu đề video đang chọn ở Bài 3 hiển thị hơi nhạt.
  **Giới hạn chưa xác minh:** độ chính xác ±1 giây của mốc so với tai nghe người (mốc lấy từ phụ đề cháy;
  ranh giới câu 1/2 của CS4-3101 rất sát nhau), Android thật, viewport đúng 390px.
  **Việc tiếp theo: chờ người dùng nhắn “Tiếp tục” mới kiểm tra điều kiện HSK1 · Bài 4.**
- 2026-10-30: **Sự cố schema Bài 1–2 và bản sửa.** Người dùng phát hiện bước “Xem lời thoại” chỉ có nghĩa Việt,
  không có câu tiếng Trung; kiểm tra độc lập trên live xác nhận thêm lỗi mất câu hỏi nghe hiểu. Nguyên nhân:
  dữ liệu Bài 1–2 dùng tên trường cũ (`lines[].text`, `speaker` chứa tên, `gist.question`, `details` dạng
  `question/options/answer`, `task.note`, `references[].label`) trong khi renderer đọc schema của pilot
  (`zh`, `name`, `gist.q`, `details[].q/a`, `task.sampleNote`, `references[].title`) — 50/50 dòng thoại render rỗng.
  Bản sửa: chuyển cả hai file dữ liệu sang schema chuẩn (người nói dùng mã trung tính `N`, không suy giới tính từ tên),
  thêm điểm chuẩn hóa + kiểm chứng bắt buộc `lpNormalizePractice` ở loader chung, phân bố lại vị trí đáp án đúng
  của 10 câu ý chính (trước đó đều ở vị trí 0) và các câu chi tiết, làm rõ khung tự nói của CS4-0807/1802/1210,
  sửa nhãn độ phủ thành “từ của bài xuất hiện trong video”, rút gọn phần kỹ thuật đo mốc vào mục thu gọn.
  Validator `test-practice-data.mjs` nay cấm tên trường cũ và đòi trường chuẩn; test DOM render đủ 50 dòng thoại
  của 10 video + pilot hồi quy. Bài 1 dữ liệu lên version 3, Bài 2 lên version 2 (tiến độ học được di trú, không xóa).
  **Phát hành:** PR #48, merge `c92306f` trên main; GitHub Pages run cho đúng commit đó: success.
  **Nghiệm thu live (2026-10-30, trực tiếp trên trang thật):** Bài 2 bước 3 hiện đủ chữ Hán + tên người nói + nghĩa Việt
  (dòng đầu 山本 “不好意思，我想借本书。”), bước 2 có câu ý chính và chọn đáp án “Mượn một quyển sách” (nay ở vị trí 3)
  cho phản hồi “Đúng rồi”; video CS4-0807 phát được hết đoạn trong app live. Bài 1 dòng đầu 张丽丽 “你好，我叫张丽丽，是中文系的。”
  hiện đúng. Pilot HSK2 hồi quy: dòng đầu video 1 您好，这儿离火车站远吗？ hiện đúng. Cả 3 trang không có chữ “undefined”,
  không thấy tràn ngang ở khung nhìn đã xem. **Giới hạn:** chưa đặt được đúng viewport 390px trong phiên kiểm tra này và
  chưa thử Android thật; kiểm thử DOM (Happy DOM) bằng dữ liệu thật đã render đủ 50/50 dòng thoại của 10 video, cả 5 bước,
  popup tra từ có Pinyin + nghĩa, tiến độ tách theo bài/video. **Việc tiếp theo: chờ người dùng nhắn “Tiếp tục” mới làm Bài 3.**
- 2026-10-29: chốt quy trình theo chỉ thị của người dùng; bắt đầu đợt bổ sung từ HSK1 · Bài 1.
  Tổng quát hóa app (manifest + dữ liệu theo bài) phải giữ nguyên hành vi và tiến độ của pilot v6.
