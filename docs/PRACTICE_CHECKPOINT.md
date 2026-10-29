# Checkpoint Thực hành sau bài

Tiến độ **tuyển chọn và hoàn thiện phần Thực hành** (hội thoại/video) cho từng bài.
Đây là một trục tiến độ riêng: không gộp với tiến độ biên soạn từ vựng (`progress.json`)
và không phải tiến độ học của người dùng. Chuẩn làm việc: `docs/PRACTICE_STANDARD.md`.

Trạng thái: `chưa làm` · `đang tìm nguồn` · `đang biên soạn` · `đang kiểm tra` · `đã phát hành` · `bị chặn` · `bỏ qua (từ vựng chưa xong)`.

**Hành động đang chờ:** đợt bổ sung Thực hành đang hiệu lực — bài tiếp theo cần kiểm tra điều kiện là HSK1 · Bài 2
(theo thứ tự cấp/bài; chỉ làm bài đã xong từ vựng mà chưa có Thực hành đạt chuẩn).

| Bài | Khóa bài (từ đầu trang) | Số từ | Từ vựng | Thực hành | Video đã chọn | Độ phủ | Còn thiếu / ghi chú | Kiểm chứng | Commit |
|---|---|---|---|---|---|---|---|---|---|
| HSK 2 · Bài 12 | hz-h2-0f9648e9dded (neo: hz-h2-0ec2a615954f) | 24 | Đã xong (24/24 bài V2) | **đã phát hành** (pilot v6, mẫu chuẩn) | CS4-1108, CS3-0107, CS4-1206, CS4-3401, CS4-2309 (Chinese Station) | 10/24 | Thiếu 14 từ: 腿 骑 一路平安 一路顺风 人口 公路 司机 椅子 爬山 自行车 行人 车辆 道路 骑车. CS4-3106 đã bị thay ra ở v6 (dữ liệu giữ trong surveyLog của file pilot) | Đã phát thử cả 5 video trong app live, mốc câu rà trên 2 bản/video; chưa thử Android thật | PR #44, merge a08ec0c |
| HSK 1 · Bài 1 (Làm quen và giới thiệu) | hz-h1-64d354d405bb | 24 | Đã xong (24/24 bài V2, trạng thái deep) | **đã phát hành** | CS4-0203, CS4-0205, CS4-0105, CS4-0801, CS4-0804 (Chinese Station) | 15/24 (đính chính 2026-10-30, PR #46) | Còn thiếu 9 từ: 他 她 我们 你们 汉字 汉语 学生 同学 朋友. Đính chính ranh giới từ: 中文 trong 中文系 là từ độc lập （中文 + 系） nên tính; 学生 trong 留学生 là phần của từ nguyên khối nên không tính. Đã loại sau khảo sát: CS4-0806 (đã kiểm chứng, dự bị), CS4-0214 (có 同学, để cân nhắc khi mở rộng), CS4-0201/0104/0101 (không thêm từ mới), Yuyan Blues (không có lời thoại kiểm chứng được), Hong Hua Ep.4/5 (thẻ từ + câu đùa), CCTV Growing Up L1 (có người dẫn, không thêm từ mới). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử, hai bản/video dài bằng nhau, mốc câu đọc từ phụ đề cháy (±1 giây); 3 video quá ngắn nghe cả đoạn. Đã xác minh trên app live (CS4-0205 phát hết đoạn); chưa thử Android thật | PR #45, merge 151c75e |
| HSK 1 · Bài 2 | hz-h1-f05455e3c9c0 | 24 | Đã xong (24/24 bài V2, trạng thái deep) | đang kiểm tra (bộ 5 video đã biên soạn xong, chờ phát hành) | CS4-0807, CS4-0604, CS4-1009, CS4-1802, CS4-1210 (Chinese Station) | 11/24 | Còn thiếu 13 từ: 事 写 分 块 字 最 次 记 读 页 本子 课本 呢 （分/字 chỉ trong từ nguyên khối 分钟/汉字 nên không tính; 百 trong số 130 của CS4-1802 là từ “trăm” độc lập nên tính). Đã loại: CS4-1601 chưa từng quay （未撮影）; CS4-0605 không thêm từ mới （字 trong 汉字）; CS4-1011 chỉ lặp 点. Thứ tự câu 4–5 của CS4-1210 lấy theo video (trang nguồn in ngược). Chi tiết ở surveyLog của file dữ liệu bài | Cả 5 video đã phát thử và đo mốc trên hai bản; CS4-1009 câu 3 suy từ mốc kẹp; 2 video nghe cả đoạn. Chưa thử Android thật | — |

## Bài bị bỏ qua (từ vựng chưa hoàn tất)

(Chưa có — sẽ ghi tại đây khi gặp trong quá trình quét theo thứ tự.)

## Ghi chú phiên

- 2026-10-29: chốt quy trình theo chỉ thị của người dùng; bắt đầu đợt bổ sung từ HSK1 · Bài 1.
  Tổng quát hóa app (manifest + dữ liệu theo bài) phải giữ nguyên hành vi và tiến độ của pilot v6.
