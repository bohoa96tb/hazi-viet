# Checkpoint Thực hành sau bài

Tiến độ **tuyển chọn và hoàn thiện phần Thực hành** (hội thoại/video) cho từng bài.
Đây là một trục tiến độ riêng: không gộp với tiến độ biên soạn từ vựng (`progress.json`)
và không phải tiến độ học của người dùng. Chuẩn làm việc: `docs/PRACTICE_STANDARD.md`.

Trạng thái: `chưa làm` · `đang tìm nguồn` · `đang biên soạn` · `đang kiểm tra` · `đã phát hành` · `bị chặn` · `bỏ qua (từ vựng chưa xong)`.

**Hành động đang chờ:** Thực hành HSK1 · Bài 3 đã phát hành và nghiệm thu live xong (PR #49, merge 2c9121a;
ghi chép này là commit nối tiếp trên main). Bài tiếp theo cần kiểm tra điều kiện là HSK1 · Bài 4 —
chỉ làm khi người dùng nhắn “Tiếp tục” lần kế.

| Bài | Khóa bài (từ đầu trang) | Số từ | Từ vựng | Thực hành | Video đã chọn | Độ phủ | Còn thiếu / ghi chú | Kiểm chứng | Commit |
|---|---|---|---|---|---|---|---|---|---|
| HSK 2 · Bài 12 | hz-h2-0f9648e9dded (neo: hz-h2-0ec2a615954f) | 24 | Đã xong (24/24 bài V2) | **đã phát hành** (pilot v6, mẫu chuẩn) | CS4-1108, CS3-0107, CS4-1206, CS4-3401, CS4-2309 (Chinese Station) | 10/24 | Thiếu 14 từ: 腿 骑 一路平安 一路顺风 人口 公路 司机 椅子 爬山 自行车 行人 车辆 道路 骑车. CS4-3106 đã bị thay ra ở v6 (dữ liệu giữ trong surveyLog của file pilot) | Đã phát thử cả 5 video trong app live, mốc câu rà trên 2 bản/video; chưa thử Android thật | PR #44, merge a08ec0c |
| HSK 1 · Bài 1 (Làm quen và giới thiệu) | hz-h1-64d354d405bb | 24 | Đã xong (24/24 bài V2, trạng thái deep) | **đã phát hành** | CS4-0203, CS4-0205, CS4-0105, CS4-0801, CS4-0804 (Chinese Station) | 15/24 (đính chính 2026-10-30, PR #46) | Còn thiếu 9 từ: 他 她 我们 你们 汉字 汉语 学生 同学 朋友. Đính chính ranh giới từ: 中文 trong 中文系 là từ độc lập （中文 + 系） nên tính; 学生 trong 留学生 là phần của từ nguyên khối nên không tính. Đã loại sau khảo sát: CS4-0806 (đã kiểm chứng, dự bị), CS4-0214 (có 同学, để cân nhắc khi mở rộng), CS4-0201/0104/0101 (không thêm từ mới), Yuyan Blues (không có lời thoại kiểm chứng được), Hong Hua Ep.4/5 (thẻ từ + câu đùa), CCTV Growing Up L1 (có người dẫn, không thêm từ mới). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử, hai bản/video dài bằng nhau, mốc câu đọc từ phụ đề cháy (±1 giây); 3 video quá ngắn nghe cả đoạn. Đã xác minh trên app live (CS4-0205 phát hết đoạn); chưa thử Android thật | PR #45, merge 151c75e |
| HSK 2 · Bài 5 (Cảm xúc, tâm trạng và miêu tả) — ƯU TIÊN theo yêu cầu trực tiếp của Bui 30/10/2026, làm trước hàng đợi HSK1 | hz-h2-05f3747c37f2 | 24 | Đã xong (24/24 bài V2, trạng thái deep, auditLesson đạt cả 24) | **đã phát hành** (bản đầu PR #57); bản mở rộng 9 video đang kiểm tra, chờ phát hành | CS4-4113, CS4-4120, CS4-4123, CS4-4105, CS4-0805 + mở rộng: CS4-2511, CS4-2517, CS4-2710, CS4-0214 (Chinese Station) | 10/24 | Còn thiếu 14 từ: 便宜 公平 友好 实在 平等 开心 感动 故事 热情 笑话 自由 随便 难受 难过. Mở rộng 31/10/2026 theo phê duyệt của Bui (nới giới hạn 5 video cho riêng bài này, ghi ở capException của dữ liệu): thêm CS4-2511 （舒服 — phán quyết ranh giới: 不舒服 ĐƯỢC tính vì 不 là phủ định độc lập, 舒服 giữ nguyên nghĩa; tiền lệ đã vào PRACTICE_STANDARD), CS4-2517 （关心）, CS4-2710 （可爱）, CS4-0214 （顺利） → 6/24 → 10/24. Đã loại: CS4-1616 （便宜） và CS4-1605 （随便） chưa từng quay; CS4-EXTRA-001 （便宜） là footage mặc cả tự do ở chợ, dưới chuẩn HSK2; 12 từ còn lại không có trong CS4/CS3. Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử và đo mốc trên hai bản ở khâu tuyển nguồn; trên app live: nút câu 3 của CS4-4113 nhảy đúng 0:07, CS4-4105 phát hết đoạn 0:26, trả lời ý chính được xác nhận đúng. CS4-4123 bản phụ đề ngắn hơn bản chính ~1 giây; 3 video nghe từng câu, 2 video nghe cả đoạn. Chưa thử Android thật | PR #57, merge 023c29c |
| HSK 1 · Bài 2 | hz-h1-f05455e3c9c0 | 24 | Đã xong (24/24 bài V2, trạng thái deep) | **đã phát hành** | CS4-0807, CS4-0604, CS4-1009, CS4-1802, CS4-1210 (Chinese Station) | 11/24 | Còn thiếu 13 từ: 事 写 分 块 字 最 次 记 读 页 本子 课本 呢 （分/字 chỉ trong từ nguyên khối 分钟/汉字 nên không tính; 百 trong số 130 của CS4-1802 là từ “trăm” độc lập nên tính). Đã loại: CS4-1601 chưa từng quay （未撮影）; CS4-0605 không thêm từ mới （字 trong 汉字）; CS4-1011 chỉ lặp 点. Thứ tự câu 4–5 của CS4-1210 lấy theo video (trang nguồn in ngược). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử và đo mốc trên hai bản ở khâu tuyển nguồn; trên app live đã phát hết CS4-1210 (nút câu 7 nhảy đúng ~0:19) và CS4-1802; CS4-1009 câu 3 suy từ mốc kẹp; 2 video nghe cả đoạn. Chưa thử Android thật | PR #47, merge 02849ae |

| HSK 1 · Bài 3 (Hỏi, nhờ giúp đỡ và gọi điện thoại) | hz-h1-9e4bde0a04dc | 24 | Đã xong (24/24 bài V2, trạng thái deep) | **đã phát hành** | CS4-1402, CS4-1409, CS4-1408, CS4-3101, CS4-3001 (Chinese Station) | 13/24 | Còn thiếu 11 từ: 回 帮 不用 回答 帮忙 说话 请进 奶 树 歌 毛. Ranh giới từ: 话/电 không tính phần trong từ nguyên khối 电话 — 电 chỉ tính ở 手机没电了, 话 chỉ tính ở 我的话; 说话 không tính từ 说汉语 （说 + tân ngữ). Đã loại: CS4-1411 (chỉ +找, nhiều từ khó), CS4-1303 (chỉ +不用), CS4-2115 （帮助 không phải 帮忙）, CS4-1407 (không thêm từ mới), CS4-3002 (chỉ lặp 打电话, tình huống cấp cứu). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử trên YouTube: phát được, lời thoại khớp trang nguồn đúng thứ tự, thời lượng 19/17/22/11/9 giây, có tùy chọn nhúng chính thức; cả 5 nghe cả đoạn (chưa đo mốc từng câu). Validator + test DOM render đủ mọi dòng thoại của 5 video, cả 5 bước và popup tra từ đạt. Nghiệm thu trực tiếp trên live (30/10/2026): video 1 phát hết đoạn trong app, transcript/gist/popup （手机 → shǒujī + nghĩa) hiện đúng ở video 1/3/5, hồi quy Bài 2 đạt, không có “undefined”. Chưa thử Android thật; viewport đúng 390px chưa kiểm chứng được (công cụ trình duyệt không hỗ trợ đổi kích thước) — ở kích thước đã xem không tràn ngang | PR #49, merge 2c9121a |

## Bài bị bỏ qua (từ vựng chưa hoàn tất)

(Chưa có — sẽ ghi tại đây khi gặp trong quá trình quét theo thứ tự.)

## Ghi chú phiên

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
