# Checkpoint — Giao diện phân tích chữ Hán

Cập nhật: 2026-11-05. Chuẩn: `docs/HANZI_ANALYSIS_STANDARD.md`.
Tiến độ này tách khỏi tiến độ từ vựng (`progress.json`) và tiến độ Thực hành
(`docs/PRACTICE_CHECKPOINT.md`).

## Trạng thái

- HEAD gốc của đợt: `04e4033` (main, "Add single-character 想 structure
  interface pilot") — chính là commit tham chiếu của mẫu.
- Nhánh làm việc: `feature/hanzi-analysis-xiang`.
- Chữ đã bật giao diện mới: **想** (duy nhất). Mọi chữ khác giữ giao diện cũ.
- Thay đổi chính so với pilot:
  - `js/xiang-preview.js` / `css/xiang-preview.css` (viết riêng cho 想) được
    thay bằng renderer dùng chung `js/hanzi-analysis.js` /
    `css/hanzi-analysis.css`; nội dung từng chữ tách ra
    `data/hanzi-analysis.json`, tải qua `js/data-loader.js` (lỗi tải file này
    thì tự rơi về giao diện cũ).
  - Nút "Tách tiếp 相" là nút thật có `aria-expanded`, đóng/mở tại chỗ,
    không render lại route; có thêm nút "Học 相 ↗" tách bạch với thao tác
    mở nhánh. Trạng thái nhánh giữ khi chuyển bước / sang chữ thành phần
    rồi quay lại trong cùng phiên.
  - Cây dựng tổng quát từ IDS: bố cục trái–phải, trên–dưới, ba thành phần,
    bao quanh; giới hạn sâu 2 tầng; chặn vòng lặp; ký hiệu `？` hiện ô
    "CHƯA XÁC ĐỊNH"; vai trò gợi âm/nghĩa lấy từ `etymology` nguồn, phần
    chưa rõ dùng màu trung tính + nhãn chữ.
  - Tài nguyên đổi phiên bản chống cache cũ: `app.js?v=hanzi-1`,
    `study-view.js?v=hanzi-1`, CSS/JS phân tích `?v=1`.

## Dữ liệu chữ 想 đã đối chiếu

- 想: `decomposition ⿱相心`, `etymology {type: pictophonetic, phonetic: 相,
  semantic: 心}`, `strokeCount 13`, bộ 心, `xiǎng`, Hán–Việt TƯỞNG
  (Kai, CC BY 4.0).
- 相: `decomposition ⿰木目`. Dữ liệu lõi thiếu cách đọc (`pinyin` chỉ
  `["xiāng"]`, `learningVi.sinoViet` chỉ "Tướng"); profile ghi tường minh
  hai cặp đã đối chiếu `dictionaryVi` (CVDICT): `xiāng — TƯƠNG`,
  `xiàng — TƯỚNG`.
- Giải thích và mẹo nhớ ("Nhìn cây 木 bằng mắt 目, trong lòng 心 chợt nhớ
  một người.") là Hazi-Viet biên soạn, ghi rõ là liên tưởng.

## Kiểm thử đã chạy (bản local, trước phát hành)

- `node --check` cho 4 file JS đã sửa: đạt.
- `node tools/hanzi/test-hanzi-analysis.mjs`: đạt — cổng bật chỉ 想,
  cây/vai trò khớp nguồn, cặp cách đọc của 相, vị trí theo ký hiệu IDS,
  escape HTML, dữ liệu thiếu, giới hạn sâu, vòng lặp, giữ trạng thái nhánh.
- `node tools/hanzi/test-hanzi-analysis-dom.mjs` (happy-dom, app thật):
  đạt — mở thẳng link 想, mở/thu 相 tại chỗ, học 木/相 rồi quay lại 想
  (nhánh còn mở), sang Luyện viết tải dữ liệu 13 nét (dữ liệu nét được stub
  trong môi trường này), Xem nét/Tự viết chạy, yêu thích và
  `hanzi-viet-reading` vẫn lưu đúng.
- Môi trường thử tái sử dụng (không phát hành): renderer dựng đúng cho 明
  （日/月 trung tính), 心 (thiếu cây → thông báo), 水 (có `？` → ô chưa xác
  định) và dữ liệu vòng lặp tổng hợp.
- `node tools/vocabulary/test-word-lookup.mjs`: đạt (hồi quy vùng lân cận).
- `git diff --check`: đạt.

## Kiểm chứng nội dung độc lập (Chinese Expert, 2026-11-05)

- 8/8 khẳng định cốt lõi về 想 （âm, Hán–Việt, nghĩa, bộ, 13 nét, bố cục ⿱,
  tách 相+心, 相 tách ⿰木目, vai trò 心 gợi nghĩa / 相 gợi âm): ĐẠT, đối chiếu
  ba lớp dữ liệu (Make Me a Hanzi gốc, CVDICT, Kai Hanzi).
- Xác nhận mâu thuẫn dữ liệu lõi của 相: `pinyin: ["xiāng"]` nhưng
  `learningVi.sinoViet: "Tướng"` (thuộc xiàng). Cặp đúng
  `xiāng — TƯƠNG`, `xiàng — TƯỚNG` có bằng chứng từ `dictionaryVi` của 相;
  profile của đợt này đã ghi đúng hai cặp này, không suy từ trường lõi.
- 木 không có `learningVi` trong dữ liệu lõi; "MỘC — cây, gỗ" lấy hậu thuẫn
  từ `radicals-vi.json` (Kai), profile ghi tường minh.
- Mẹo nhớ đạt với điều kiện gắn nhãn liên tưởng tự biên soạn — giao diện đã
  có nhãn "MẸO NHỚ · TỰ LIÊN TƯỞNG" và ghi chú không phải bằng chứng lịch
  sử chữ, tách khỏi mục "Vì sao ghép như vậy?".
- Lưu ý giữ nguyên khi mở rộng: vai trò gợi âm của 相 chỉ đúng trong 想;
  bản thân 相 là chữ biểu ý theo nguồn.

## QA độc lập (2026-11-05, trên commit `6896768`)

- Cả 5 mục QA đều ĐẠT: test mới + `node --check`; diff đúng 13 file trong
  phạm vi, không đổi ID/localStorage; khẳng định dữ liệu tự đối chiếu lại
  từ `data/hsk*-core.json`; escape HTML + `aria-expanded` + toggle không
  render lại route; hồi quy chữ khác （明 đủ 5 stage giữ giao diện cũ) và
  `test-word-lookup` đạt.
- Sau QA, một vòng sửa nhỏ theo ghi chú phòng thủ của QA: link nguồn trong
  profile chỉ render khi là URL `https://` (kèm test). Đã chạy lại toàn bộ
  test sau sửa: đạt.

## Kiểm tra live của pilot (2026-11-05, trước khi sửa)

- File `js/xiang-preview.js` trên live khớp nội dung commit `04e4033`
  (đối chiếu trực tiếp nội dung file public).
- Kiểm tra tương tác trên trình duyệt desktop: mở thẳng link 想 vào bước
  Hiểu chữ; mở nhánh 相 thấy 木/目 và ghi chú vị trí; Luyện viết tải được
  dữ liệu nét và Xem nét chạy. Hạn chế đã quan sát của pilot: chuyển bước
  rồi quay lại thì nhánh 相 đóng lại (bản mới đã sửa và có test DOM).
- Chưa xác minh: viewport 390px/360px (công cụ trình duyệt không đặt được
  bề rộng) và thiết bị Android thật.
- Dữ liệu nét thật từ CDN trên live sẽ kiểm lại sau phát hành bản mới
  (môi trường happy-dom dùng bản stub).

## Bỏ tab "Gốc chữ" (yêu cầu của chủ dự án, 2026-11-05)

- Chủ dự án nhận xét tab "Gốc chữ" (bước 5) lặp lại nội dung của tab
  "Hiểu chữ" và yêu cầu xoá. Đã xoá khỏi `studySteps`; màn hình học còn 4
  bước: Hiểu chữ → Luyện viết → Từ & câu → Cách dùng.
- Mọi logic theo chỉ số bước đã cập nhật: giới hạn bước cuối, nút "Bước
  tiếp" ở bước cuối thành hoàn thành, phím End/mũi tên, khôi phục điểm
  dừng đã lưu (bản lưu cũ ghi bước 4 sẽ tự về bước 0), và văn bản hướng
  dẫn "Đi qua 4 bước". Trạng thái `originMode` đã gỡ hẳn.
- Thay đổi này nằm trong cùng PR #61 (commit nối tiếp), áp dụng cho mọi
  chữ vì đây là khung màn hình học chung. Test logic và DOM đã bổ sung
  khẳng định: đúng 4 tab, không còn tab "Gốc chữ", bước 4 không render,
  nút chính ở bước cuối là hoàn thành.

## Việc tiếp theo khi người dùng nhắn "Tiếp tục"

- Nếu chủ dự án chưa nghiệm thu mẫu 想: dừng, không mở rộng.
- Sau khi nghiệm thu và có phê duyệt merge riêng: merge PR của đợt này,
  kiểm workflow GitHub Pages đúng SHA, kiểm lại chữ 想 trên live (mở
  nhánh 相, luyện viết 13 nét thật, viewport điện thoại) rồi cập nhật
  checkpoint này.
- Mở rộng sang chữ khác chỉ khi chủ dự án duyệt danh sách chữ; mỗi chữ
  làm theo mục "Khi bật thêm một chữ" trong tài liệu chuẩn.
