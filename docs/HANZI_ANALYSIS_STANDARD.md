# Chuẩn giao diện phân tích chữ Hán (Hiểu chữ)

Áp dụng từ đợt hoàn thiện mẫu 想 (2026-11-05). Mẫu tham chiếu: chữ 想 ở bước
"Hiểu chữ". Tài liệu này ghi cấu trúc đã chốt, nguồn dữ liệu và cách xử lý
các trường hợp lệch chuẩn. Tiến độ và kết quả kiểm thử nằm ở
`docs/HANZI_ANALYSIS_CHECKPOINT.md`.

## Phạm vi

- Renderer dùng chung: `js/hanzi-analysis.js` + `css/hanzi-analysis.css`
  (class tiền tố `ha-`, không ảnh hưởng màn học khác).
- Dữ liệu biên soạn riêng cho từng chữ: `data/hanzi-analysis.json`
  (`enabledChars` + `profiles`). Dữ liệu này tách khỏi HTML/CSS/JS.
- Cổng bật: `hanziProfileFor()` chỉ trả profile khi chữ nằm trong
  `enabledChars` VÀ có profile. Chữ chưa bật giữ nguyên giao diện cũ.
- ID chữ, ID từ, liên kết quay về bài từ vựng, yêu thích và tiến độ học
  (localStorage) không thay đổi.

## Cấu trúc giao diện (theo thứ tự)

1. Tiêu đề ngắn ("Hiểu từng phần, nhớ cả chữ.").
2. Hàng thông tin: Hán–Việt, số nét, bộ thủ.
3. Chữ gốc và cây thành phần.
4. "Vì sao ghép như vậy?" — giải thích vai trò gợi âm / gợi nghĩa.
5. Mẹo nhớ ngắn, ghi rõ là liên tưởng tự biên soạn, không phải bằng chứng
   lịch sử chữ.
6. Nút chuyển sang luyện viết (đúng số nét khi có dữ liệu).
7. Nguồn dữ liệu thu gọn (`<details>`), trỏ tới `THIRD_PARTY_NOTICES.md`.

## Quy tắc cây thành phần

- Cây dựng từ trường `decomposition` (IDS) bằng `parseIDS` hiện có; nhãn bố
  cục lấy từ ký hiệu IDS của nút đó (`idsLabels`: trái–phải, trên–dưới,
  ba thành phần, bao quanh…), không suy diễn từ vị trí trong mảng.
- Tầng đầu hiện sẵn. Thành phần có phân tích sâu thì có nút "Tách tiếp X"
  riêng; bấm nút này chỉ đóng/mở panel tại chỗ (cập nhật `aria-expanded`),
  không render lại route, không mất vị trí đọc. Nút "Học X ↗" là thao tác
  khác hẳn: sang bài học của thành phần, quay lại bằng nút lùi hiện có.
- Độ sâu tối đa 2 tầng tính từ chữ gốc (gốc → thành phần → thành phần con
  dạng nút học, không mở tiếp). Không tách đến từng nét, không biến mỗi nét
  thành một chữ có nghĩa.
- Chặn vòng lặp: thành phần đã xuất hiện ở tầng trên thì dừng, hiện ghi chú
  "đã xuất hiện ở tầng trên", không cho mở tiếp.
- Vai trò gợi âm / gợi nghĩa lấy từ trường `etymology` của dữ liệu nguồn
  (Make Me a Hanzi) hoặc profile đã đối chiếu; không suy diễn từ hình dạng.
  Không ép mọi chữ vào mẫu "một gợi âm + một gợi nghĩa": phần chưa rõ vai
  trò dùng màu trung tính và nhãn "THÀNH PHẦN". Màu luôn đi kèm nhãn chữ
  (xanh lam = gợi âm, xanh lá = gợi nghĩa).
- Dữ liệu thiếu hoặc ký hiệu `？`: hiện ô "CHƯA XÁC ĐỊNH" hoặc thông báo
  "Nguồn chưa có cây phân tích cho chữ này"; không bịa phần còn thiếu.
- Trạng thái mở nhánh giữ trong bộ nhớ phiên học (module state), giữ
  nguyên khi chuyển bước hoặc sang chữ thành phần rồi quay lại.
- Mọi chuỗi dữ liệu chèn vào HTML đều qua `escapeHTML`. Nút chạm tối thiểu
  44px, có `:focus-visible` rõ.

## Nguồn và giấy phép theo trường hiển thị

| Trường | Nguồn | Loại | Giấy phép | Trạng thái kiểm duyệt |
|---|---|---|---|---|
| `decomposition`, cây IDS | Make Me a Hanzi `dictionary.txt`, bản đã nhập trong `data/hsk*-core.json` | dữ liệu gốc đã biến đổi (tách trường) | LGPL-3.0-or-later (`data/HANZI-LICENSE.txt`, `data/LGPL.txt`) | cấu trúc đã đối chiếu từng chữ khi bật |
| `etymology.phonetic/semantic` | Make Me a Hanzi, cùng bản nhập; tóm tắt Việt ở `data/etymology-vi.json` | dữ liệu gốc / tóm tắt | LGPL-3.0-or-later | tóm tắt trường có cấu trúc, không phải dịch toàn bộ chú giải |
| Pinyin của chữ | dữ liệu lõi đã nhập | dữ liệu gốc | LGPL-3.0-or-later / CVDICT (xem dưới) | theo nguồn |
| Số nét, bộ thủ | trường `strokeCount`/`radical` của dữ liệu lõi (nguồn gốc Unihan qua Make Me a Hanzi) | dữ liệu gốc | LGPL-3.0-or-later | không mặc định thống nhất mọi dạng chữ; chữ thiếu thì hiện "Chưa có" |
| Âm Hán–Việt, tên/nghĩa thành phần | Kai Hanzi (`learningVi`, `data/radicals-vi.json`) | học liệu đã nhập | CC BY 4.0 (`data/KAI-LICENSE.txt`) | nguồn ghi "tham khảo; chưa rà soát học thuật toàn bộ" |
| Các cách đọc và nghĩa theo mục từ | CVDICT (`dictionaryVi`) | dữ liệu đã nhập | CC BY-SA 4.0 (`data/CVDICT-CC-BY-SA-4.0.txt`) | một phần dịch tự động, chưa rà soát toàn bộ |
| Dữ liệu nét luyện viết | Hanzi Writer Data 2.0.1, tải lúc chạy qua CDN | dữ liệu gốc, không đóng gói | Arphic Public License (`vendor/STROKE-DATA-LICENSE.txt`) | mã Hanzi Writer riêng: MIT (`vendor/HANZI-WRITER-LICENSE.txt`) — không gộp chung |
| Giải thích, mẹo nhớ, ghép cặp cách đọc trong profile | Hazi-Viet biên soạn, đối chiếu các nguồn trên | biên soạn riêng | nội dung của dự án | phải qua kiểm chứng nội dung trước khi bật chữ |

Unihan (Unicode) chỉ là nguồn gốc thượng nguồn của dữ liệu Make Me a Hanzi
đã nhập; đợt này không tải thêm dữ liệu Unihan mới.

## Chữ có nhiều cách đọc

- Không lấy cách đọc đầu tiên trong mảng rồi gán một âm Hán–Việt cho mọi
  trường hợp. Dữ liệu lõi có thể thiếu cách đọc (ví dụ 相 chỉ có
  `pinyin: ["xiāng"]` và `learningVi.sinoViet: "Tướng"`).
- Profile ghi tường minh từng cặp `readings: [{pinyin, sinoViet}]` đã đối
  chiếu `dictionaryVi` và lớp Kai. Với 相 trong 想: `xiāng — TƯƠNG`,
  `xiàng — TƯỚNG`.

## Khi bật thêm một chữ (chỉ sau khi chủ dự án duyệt)

1. Đối chiếu `decomposition`, `etymology`, số nét, bộ thủ trong dữ liệu lõi.
2. Viết profile trong `data/hanzi-analysis.json` (giải thích, mẹo nhớ,
   `readings` nếu nhiều âm, ghi chú thành phần), ghi nguồn từng phần.
3. Thêm chữ vào `enabledChars`, bổ sung khẳng định vào
   `tools/hanzi/test-hanzi-analysis.mjs`.
4. Chạy đủ bộ kiểm thử ở checkpoint rồi mới tạo PR; merge vào `main` cần
   phê duyệt riêng của chủ dự án cho từng lần.
