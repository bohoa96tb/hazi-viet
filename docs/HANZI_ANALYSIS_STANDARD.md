# Chuẩn giao diện phân tích chữ Hán (Hiểu chữ)

Quy chuẩn chính thức của module học Hán tự, áp dụng từ 2026-11-05. Mẫu
tham chiếu: chữ 想 ở bước "Hiểu chữ", đã được **chủ dự án duyệt**
(PR #61, merge commit `c9894ee7add4d87ded2b2d6cc4f823d80a5d1ccb`,
GitHub Pages run #331 thành công, dữ liệu live đã đối chiếu). Các phiên
sau không cần xin duyệt lại mẫu; commit mẫu chỉ là tham chiếu lịch sử,
không dùng làm mốc khôi phục phiên bản cũ. Tiến độ nằm ở
`docs/HANZI_ANALYSIS_CHECKPOINT.md` và `docs/hanzi-analysis-progress.json`.

Giao diện chính thức có đúng **4 bước**: Hiểu chữ → Luyện viết → Từ & câu
→ Cách dùng. Tab "Gốc chữ" đã bị xoá theo yêu cầu của chủ dự án vì lặp
lại bước Hiểu chữ; **không khôi phục tab này và không tạo tab khác thay
tên cho nó**. Kiến thức từ nguyên/mẹo nhớ hữu ích nằm trong bước Hiểu chữ
(khối riêng cho mẹo nhớ, nguồn trong phần thu gọn).

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
- Không cho mở tiếp một thành phần khi phép tách của nó là chồng nét (⿻)
  hoặc chỉ lặp lại một lá giống hệt nhau (ví dụ 二 = 一 + 一): đó là tách
  xuống mức nét, không phải thành phần có ích cho người học.
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

## Chuẩn nội dung bắt buộc cho mỗi chữ

Mỗi chữ được kiểm duyệt phải đối chiếu thực tế với dữ liệu nguồn:

- Chữ, cách đọc chính và nghĩa chính.
- Âm Hán–Việt phù hợp; chữ nhiều cách đọc xử lý theo ngữ cảnh (mục riêng ở
  trên), không lấy cách đọc đầu tiên gán cho mọi âm Hán–Việt.
- Bộ thủ và số nét theo dữ liệu lõi.
- Bố cục, các thành phần và cây phân tích theo `decomposition` nguồn.
- Vai trò gợi nghĩa/gợi âm chỉ khi nguồn xác nhận; chưa xác nhận thì trung
  tính. Không áp dụng máy móc cấu trúc của 想: không phải chữ nào cũng có
  một phần gợi âm và một phần gợi nghĩa; chữ đơn thể không bị ép thành cây
  nhiều nhánh.
- Giải thích tiếng Việt dễ hiểu, độ dài theo độ khó của chữ.
- Mẹo nhớ khi biên soạn được đáng tin cậy, luôn gắn nhãn là liên tưởng.
- Liên kết luyện viết hoạt động và nguồn dữ liệu ghi trong profile.
- Phân biệt rõ ba lớp: (1) cấu tạo hình thể hiện đại, (2) chú giải nguồn
  gốc có căn cứ, (3) mẹo liên tưởng để ghi nhớ. Không suy diễn nguồn gốc
  lịch sử từ cách tách hình dạng.

Dữ liệu thiếu: tìm bổ sung từ nguồn phù hợp; vẫn chưa xác minh được thì
ghi rõ trường thiếu và lý do vào checkpoint/progress, không bịa, và không
đánh dấu chữ đó là đã hoàn thành.

## Phạm vi và quy trình triển khai theo lô

- Phạm vi: toàn bộ chữ Hán trong thư viện Hán tự (`data/hsk1-core.json` …
  `data/hsk6-core.json`, hiện 2.632 chữ) — không mặc định gồm mục từ của
  khóa từ vựng. Không tự bổ sung chữ ngoài phạm vi, không sửa bài từ vựng
  hoặc Thực hành không liên quan.
- Thứ tự: cấp HSK tăng dần; trong từng cấp giữ nguyên thứ tự trong file
  dữ liệu. Giữ nguyên ID, cấp độ, liên kết, yêu thích, tiến độ học.
- Tiến độ chuẩn hóa Hán tự là trục riêng ở
  `docs/hanzi-analysis-progress.json`; không gộp với tiến độ biên soạn từ
  vựng (`progress.json`) hay tiến độ học của người dùng.
- Mỗi lô làm trọn quy trình trong một phiên: đọc dữ liệu → đối chiếu
  nguồn → biên soạn profile → kiểm giao diện → chạy kiểm thử → lưu tiến
  độ → tạo PR → merge → xác minh GitHub Pages đúng commit → kiểm website
  thật. Chủ dự án đã cho phép commit/merge/phát hành các lô đạt kiểm tra
  trong phạm vi này, không cần hỏi lại từng lô.
- Khi chủ dự án nhắn "Tiếp tục" trong ngữ cảnh này: đọc quy chuẩn và
  checkpoint, kiểm HEAD, tiếp tục phần đang dở trước rồi đến vị trí `next`
  trong file tiến độ; làm tối đa một lô chất lượng, phát hành, báo cáo,
  rồi dừng. Không tự chạy nền hay đặt lịch làm tiếp.
- Việc bật renderer cho một chữ (`enabledChars`) chỉ xảy ra sau khi chữ
  đó đạt tiêu chí hoàn thành dưới đây. Một chữ hiển thị bằng renderer mới
  không tự nó có nghĩa là nội dung đã kiểm duyệt — trạng thái kiểm duyệt
  lấy theo file tiến độ.

## Tiêu chí một chữ hoàn thành

1. Đã đọc và đối chiếu dữ liệu lõi của đúng chữ đó (không suy từ chữ khác).
2. Profile có đủ: âm Hán–Việt, nghĩa chính ngắn, bố cục, giải thích; vai
   trò thành phần khớp `etymology` nguồn hoặc để trung tính.
3. Mẹo nhớ (nếu có) gắn nhãn liên tưởng; không khẳng định sai về từ
   nguyên, cách đọc hoặc nghĩa.
4. Cây render đúng `decomposition`; dữ liệu thiếu/vòng lặp không làm hỏng
   giao diện; các kiểm thử trong checkpoint đạt.
5. Chữ có mặt trong `enabledChars` và trong `completed` của file tiến độ
   sau khi phát hành và xác minh live.
