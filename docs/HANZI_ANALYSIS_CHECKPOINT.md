# Checkpoint — Giao diện phân tích chữ Hán

Cập nhật: 2026-11-05. Chuẩn: `docs/HANZI_ANALYSIS_STANDARD.md`.
Tiến độ này tách khỏi tiến độ từ vựng (`progress.json`) và tiến độ Thực hành
(`docs/PRACTICE_CHECKPOINT.md`).

## Trạng thái

- **Mẫu 想 đã được chủ dự án duyệt và phát hành**: PR #61 merge vào `main`
  tại `c9894ee7add4d87ded2b2d6cc4f823d80a5d1ccb` (2026-11-05), GitHub
  Pages run #331 (id 41976105787) đúng SHA merge, trạng thái success.
  File `data/hanzi-analysis.json` trên live đã đối chiếu khớp bản merge
  (chỉ bật 想 ở thời điểm đó); `js/study-view.js` trên live đã đối chiếu
  là bản mới (4 bước, cổng `hanziProfileFor`).
- **Đợt chuẩn hóa toàn thư viện Hán tự đang hiệu lực** theo chỉ thị của
  chủ dự án ngày 2026-11-05: quy chuẩn ở
  `docs/HANZI_ANALYSIS_STANDARD.md`, tiến độ có cấu trúc ở
  `docs/hanzi-analysis-progress.json`. Đã chuẩn hóa **78 / 2.632** chữ
  (gồm mẫu 想 và các lô B-001 đến B-005 dưới đây); 1 chữ đang bị chặn
  （京). Vị trí tiếp theo: HSK1, chữ **姐** (index 78) — sau khi xử lý
  京 nếu bổ sung được nguồn.
- Màn hình học chữ chính thức có 4 bước cho mọi chữ (mục "Bỏ tab Gốc
  chữ" ở dưới). Chữ chưa chuẩn hóa giữ giao diện 4 bước với nội dung cũ.
- Thay đổi chính của đợt mẫu so với pilot:
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

## Lô B-001 — 8 chữ đầu HSK1 (2026-11-05)

- Chữ đã chuẩn hóa theo đúng thứ tự `data/hsk1-core.json`:
  **一 七 三 上 下 不 东 个** (tiến độ: 9/2.632 gồm 想).
- Nội dung từng chữ đã đối chiếu dữ liệu lõi + `etymology-vi` +
  `radicals-vi`: âm/Hán–Việt/nghĩa chính (NHẤT, THẤT, TAM, THƯỢNG, HẠ,
  BẤT, ĐÔNG, CÁ), bộ thủ, số nét, cây IDS. Các chữ này hầu hết là biểu ý
  hoặc đơn thể nên vai trò để trung tính; chú giải nguồn (đếm vạch của
  三， vạch mốc của 上/下, con chim của 不, dạng cũ 東 của 东, dấu đếm của
  个） ghi rõ là chú giải nguồn, tách khỏi mẹo liên tưởng.
- Renderer được siết thêm hai cổng từ lô này (đã ghi vào tài liệu chuẩn):
  không mở tiếp thành phần có phép tách chồng nét (⿻) hoặc chỉ lặp một lá
  giống hệt （二 = 一 + 一); chữ không có cây (như 一） hiện ghi chú riêng
  trong profile (`noTreeNote`) thay cho thông báo chung.
- Chinese Expert độc lập rà 8 chữ: 7 đạt ngay; các điểm cần sửa đã xử lý
  trước phát hành — mô tả nét móc của 七 (cong xuống, không "cắt chéo
  lên"), mẹo nhớ của 不改 sang hình dạng (tránh gán hình ảnh con chim của
  chú giải nguồn thành mẹo), mẹo của 个 sát hint nguồn hơn, ghi chú ⺊ của
  上 nói rõ gồm sổ ngắn + chấm.
- Kiểm thử: test logic (gồm cổng dữ liệu theo file tiến độ: mọi chữ trong
  `completed` phải có profile, render đúng số nét, vai trò khớp nguồn;
  khẳng định cổng mở rộng cho 七/二; ghi chú đơn thể của 一）, test DOM
  (gồm kịch bản mới: khôi phục điểm dừng cũ ghi bước 4 "Gốc chữ" → tự về
  bước 0, đúng 4 tab, không lỗi), `test-word-lookup`, `git diff --check`:
  đều đạt.
- **Đính chính sau phát hành (cùng ngày)**: báo cáo đầy đủ của Chinese
  Expert về lô về sau thời điểm phát hành; điểm cần sửa duy nhất còn lại
  là mô tả thành phần ⺊ của 上 — bản đã phát hành ghi "nét sổ ngắn và một
  nét chấm", nhưng theo `matches [[0],[0],[1]]` của nguồn và thứ tự nét,
  ⺊ gồm nét sổ ngắn + nét ngang ngắn (chữ 上 không có nét chấm). Đã sửa
  thành "cụm nét phía trên vạch mốc: nét sổ ngắn và nét ngang ngắn (thành
  phần hình nét)" qua PR đính chính riêng; 7 chữ còn lại chuyên gia xác
  nhận ĐẠT nguyên văn.
- **Đã phát hành**: PR #62 merge tại
  `b4dec6706479557b00562e30f4b2811ddb0d7b36`, GitHub Pages run #332
  (id 41977361220) đúng SHA merge, success. File
  `data/hanzi-analysis.json` trên live đã đối chiếu: đủ 9 chữ đã bật với
  đúng nội dung sau sửa của chuyên gia.

## Lô B-002 — 15 chữ HSK1 tiếp theo (2026-11-05)

- Chữ đã chuẩn hóa theo thứ tự `data/hsk1-core.json` (index 8–23, trừ 京
  bị chặn): **中 么 九 习 书 买 了 二 五 些 亮 人 什 今 他** (tiến độ:
  24/2.632).
- Điểm nội dung đáng chú ý: 中 ghi cả cách đọc phụ zhòng (trúng) nhưng
  dạy zhōng trước; 了 tách rõ le (trợ từ) và liǎo (hiểu rõ); 些 là chữ
  hình thanh thật （此 gợi âm, 二 gợi nghĩa — khớp `etymology` nguồn);
  买/卖 đối chiếu theo decomposition của 卖 (`⿱十买`); các hint nguồn
  （九 khuỷu tay, 五 trời–đất, 亮 đèn dầu, 了 trẻ quấn khăn, 什 hàng mười
  người) đều ghi là chú giải gốc, tách khỏi mẹo liên tưởng.
- **京 (index 18) bị chặn, chưa tính hoàn thành**: dữ liệu lõi thiếu
  `strokeCount`, lớp Kai thiếu `learningVi` (không có âm Hán–Việt đã kiểm
  chứng theo nguồn dự án). Khóa từ vựng có 北京 = Bắc Kinh là manh mối âm
  KINH nhưng chưa đủ để chốt. Chinese Expert đồng ý việc chặn là đúng.
  Ghi cấu trúc vào `blocked` trong file tiến độ. Lưu ý hệ thống: trường
  `strokeCount` thiếu ở 1.973/2.632 chữ trong dữ liệu lõi — các lô sau
  nếu gặp chữ chỉ thiếu mỗi số nét (đủ Hán–Việt và nội dung) cần ghi rõ
  vào checkpoint để chủ dự án thấy quy mô, không tự ý nới chuẩn.
- Chinese Expert độc lập rà 15 chữ: 14 đạt ngay; điểm cần sửa đã xử lý
  trước phát hành — mô tả 冫 của 习 đảo thứ tự nét, đã sửa thành "hai nét
  ở phần dưới: một nét phẩy và một nét chấm" theo `matches` + thứ tự nét
  nguồn (cùng loại lỗi đã sửa ở 上 tại B-001: mô tả thành phần phải khớp
  dữ kiện nét).
- Kiểm thử: test logic (cổng tiến độ 24 chữ), test DOM, `test-word-lookup`,
  `git diff --check` đạt. Rà soát tĩnh CSS cho 360/390px: bố cục co giãn
  (grid tỉ lệ, thẻ `min-width:0`, breakpoint riêng dưới 380px, không có
  bề rộng cố định vượt khung) — không thấy nguy cơ tràn ngang; giả lập
  viewport bằng công cụ trình duyệt vẫn chưa thực hiện được, Android
  thật chưa kiểm chứng.
- **Đã phát hành**: PR #66 merge tại
  `dc6e737594ecfd0a8afc56992f4bed7fd9006295`, GitHub Pages run #336
  (id 42001840924) đúng SHA merge, success. File
  `data/hanzi-analysis.json` trên live đã đối chiếu: đủ 24 chữ đã bật,
  gồm cả dòng mô tả 冫 của 习 sau sửa.

## Lô B-003 — 18 chữ HSK1 tiếp theo (2026-11-05)

- Chữ đã chuẩn hóa theo thứ tự `data/hsk1-core.json` (index 24–41):
  **们 会 住 作 你 候 做 儿 先 八 六 关 兴 再 写 冷 几 出** (tiến độ:
  42/2.632). 京 vẫn bị chặn như đã ghi ở B-002.
- Điểm nội dung đáng chú ý: 们/候/冷 là hình thanh thật (roles khớp
  `etymology`); 住/作/做 có hint nguồn nói thành phần gợi âm nhưng phân
  loại là biểu ý — giữ roles trung tính, chỉ ghi gợi âm trong giải thích
  kèm quy thuộc nguồn, nhất quán cả ba chữ; 兴 tách hai cách đọc
  xìng/xīng, 几 tách jǐ/jī; 六/关/写 nguồn không có chú giải nên chỉ mô
  tả hình dạng, riêng 六 ghi rõ không suy nghĩa từ 八.
- Chinese Expert độc lập rà 18 chữ: 16 đạt ngay; 2 điểm nhẹ đã sửa trước
  phát hành — 作: nhận định "(zhà gần zuò)" quá lời với âm hiện đại, đã
  đổi thành "(âm cổ gần nhau; nay zhà đã khác zuò khá xa)"; 先:
  `layoutNote` đặt sai vị trí 土 (theo `⿱⿰？土儿`, 土 thuộc cụm trên),
  đã sửa thành "土 ở phần trên, 儿 ở dưới".
- Kiểm thử: test logic (cổng tiến độ 42 chữ), test DOM, `test-word-lookup`,
  `git diff --check` đạt. Bố cục dùng chung CSS đã rà soát tĩnh cho
  360/390px ở B-002 (không đổi ở lô này); giả lập viewport bằng công cụ
  trình duyệt vẫn chưa thực hiện được, Android thật chưa kiểm chứng.
- **Đã phát hành**: PR #68 merge tại
  `84551fb3b993909972e4351fe4c1c5a1b63973fb`, GitHub Pages run #338
  (id 42004086093) đúng SHA merge, success. File
  `data/hanzi-analysis.json` trên live đã đối chiếu: đủ 42 chữ đã bật.

## Lô B-004 — 18 chữ HSK1 tiếp theo (2026-11-05)

- Chữ đã chuẩn hóa theo thứ tự `data/hsk1-core.json` (index 42–59):
  **分 前 北 医 十 午 去 友 叫 吃 同 名 后 吗 听 呢 和 哪** (tiến độ:
  60/2.632). 京 vẫn bị chặn như đã ghi ở B-002.
- Điểm nội dung đáng chú ý: cả dãy 口 （叫 吃 吗 呢 和 哪） đều là hình
  thanh thật, roles khớp `etymology`; 听 giữ trung tính theo phân loại
  biểu ý của nguồn (không tự gán 斤 gợi âm dù âm gần); 友 theo tiền lệ
  B-003 (hint gợi âm, roles trung tính); 十/午 dùng `noTreeNote` vì
  phép tách ⿻ chồng nét; 前/后/去 không có chú giải nguồn nên chỉ mô
  tả hình dạng.
- Chinese Expert độc lập rà 18 chữ: 17 đạt ngay; 1 điểm đã sửa trước
  phát hành — 医: cách đọc của 匸 ghi sai (xǐ), đúng là **xì** theo mục
  từ trong `dictionary-original.txt`. Lưu ý ngoài: nhãn bộ "匸 — HỂ"
  không có trong `radicals-vi.json` của dự án; đây là tên Hán–Việt thông
  dụng của bộ Khang Hy 23, không bị dữ kiện nào mâu thuẫn — giữ, ghi rõ
  căn cứ ngoài dự án tại đây.
- Kiểm thử: test logic (cổng tiến độ 60 chữ), test DOM, `test-word-lookup`,
  `git diff --check` đạt. CSS dùng chung không đổi; giả lập viewport
  360/390px bằng công cụ trình duyệt vẫn chưa thực hiện được, Android
  thật chưa kiểm chứng.
- **Đã phát hành**: PR #70 merge tại
  `e239204dd5af528fb0bbc5e98dc583b2d3bc8143`, GitHub Pages run #340
  (id 42006164647) đúng SHA merge, success. File
  `data/hanzi-analysis.json` trên live đã đối chiếu: đủ 60 chữ đã bật.

## Lô B-005 — 18 chữ HSK1 tiếp theo (2026-11-05)

- Chữ đã chuẩn hóa theo thứ tự `data/hsk1-core.json` (index 60–77):
  **商 喂 喜 喝 四 回 国 在 坐 块 多 大 天 太 女 她 好 妈** (tiến độ:
  78/2.632). 京 vẫn bị chặn như đã ghi ở B-002.
- Điểm nội dung đáng chú ý: 商 là hình thanh mà phần gợi âm 章 đã giản
  lược khỏi cây IDS — chỉ gán gợi nghĩa cho 冏 theo nguồn, phần 章 xử
  lý trong giải thích; 喂/喝/在/块/妈 hình thanh roles khớp nguồn;
  喜/四/回/国/多/天/太/她/好 giữ trung tính theo hint biểu ý.
- **Bài học renderer (quan trọng, chuyên gia phát hiện khi chạy thử
  module thật)**: `noTreeNote` chỉ hiển thị khi cây IDS trả về null
  (chữ có `decomposition: "？"` như 一/八/女/人）. Chữ có phép tách ⿻
  (chồng nét) VẪN dựng được cây và hiện thẻ thành phần kèm dòng bố cục
  tự sinh — nên `noTreeNote` kiểu "học nguyên khối, không tách" là sai
  với hiển thị thật. Đã sửa ngay trong lô này: 坐/大 bỏ `noTreeNote`,
  thay bằng `layoutNote` mô tả chồng khít; đồng thời sửa hồi tố hai
  chữ cùng khuôn đã phát hành ở B-004 là 十 và 午 (chỉ đổi trường ghi
  chú bố cục, nội dung khác giữ nguyên). Từ nay: ⿻ → `layoutNote`;
  `noTreeNote` chỉ cho `decomposition: "？"`.
- Chinese Expert độc lập rà 18 chữ: 16 đạt ngay; 2 điểm （ 坐/大 ở trên)
  đã sửa trước phát hành. Ghi chú không bắt buộc: 喂 còn cách đọc phụ
  wéi (alô) trong từ điển — trường Pinyin chính của dự án chỉ có wèi,
  không bổ sung ở lô này.
- Kiểm thử: test logic (cổng tiến độ 78 chữ), test DOM, `test-word-lookup`,
  `git diff --check` đạt. CSS dùng chung không đổi; giả lập viewport
  360/390px bằng công cụ trình duyệt vẫn chưa thực hiện được, Android
  thật chưa kiểm chứng.
- **Đã phát hành**: PR #72 merge tại
  `ce3fb9c0275c57a4163e52ed65bf30f43d03c340`, GitHub Pages run #342
  (id 42013475570) đúng SHA merge, success. File
  `data/hanzi-analysis.json` trên live đã đối chiếu: đủ 78 chữ đã bật,
  gồm cả bản sửa `layoutNote` của 坐/大/十/午.

## Đợt PA-001 — Xử lý chữ thiếu dữ liệu phân tích (2026-11-05)

- Chỉ thị của chủ dự án: bổ sung quy chuẩn xử lý Hán tự thiếu dữ liệu,
  áp dụng trước cho 后 và 今 trong ảnh chụp (thẻ "?" lớn), rồi rà các
  trường hợp tương tự. Quy tắc đã ghi vào mục "Xử lý chữ thiếu dữ liệu
  phân tích" của `docs/HANZI_ANALYSIS_STANDARD.md`.
- **Chẩn đoán** (đối chiếu `SOURCE_DATA/dictionary-original.txt` với dữ
  liệu lõi đã nhập — khớp nhau từng chữ): trong 78 chữ đã chuẩn hóa có
  9 chữ cây IDS chứa lá "？" — 后 今 不 习 书 五 先 北 友. Nguyên nhân
  thống nhất: Make Me a Hanzi dùng "？" cho **phần không phải một chữ
  riêng** — một cụm nét hợp nhất không có chữ Unicode/tên riêng ở 7 chữ
  （ 后 今 不 书 五 北 友）; riêng 习/先 phần đó chỉ là **một nét lẻ có
  tên nét** (nét gấp móc; nét phẩy) — nét lẻ không phải chữ/thành phần
  và không được gán vai trò (điểm này do Chinese Expert bắt được khi rà:
  bản nháp đầu gọi cả 9 chữ là "cụm nét", đã sửa ở explain của 习/先,
  mục chuẩn và hồ sơ `dataGaps`). Không phải lỗi phân tích IDS, không
  phải thiếu dữ liệu nét (mọi chữ đều đủ số nét và trường `matches`
  ánh xạ từng nét). Bốn chữ có `decomposition` đúng bằng "？" （ 一 人
  八 女） không thuộc diện này — chúng đã hiện chữ nguyên vẹn kèm ghi
  chú đơn thể. Expert cũng bắt điểm tiêu đề của 今 (có `etymology` mà
  explain chưa dùng): đã bổ sung câu theo chú giải nguồn vào explain
  của 今. QA độc lập: toàn bộ suite đạt, không điểm chặn; đã nâng
  cache-buster của CSS lên `?v=2` theo ghi chú của QA. **Ngoài phạm vi
  đợt này** (QA ghi nhận): giao diện cũ cho chữ *chưa* chuẩn hóa vẫn có
  thể hiện một lá "？" nhỏ trong cây rút gọn — không phải thẻ lớn của
  giao diện mới; xử lý riêng nếu chủ dự án yêu cầu.
- **Cách xử lý đã cài đặt**:
  - Renderer bỏ hẳn thẻ giữ chỗ; chữ thuộc diện này hiện ở chế độ
    "phân tích một phần": chữ nguyên vẹn + mục "Thành phần đã nhận
    diện" (chỉ phần đã xác minh, không gán vai trò cho phần chưa rõ) +
    dòng nhỏ "Phân tích đầy đủ đang được bổ sung."; không hiện dòng
    "Bố cục:".
  - Tô nét theo `matches` đã kiểm chứng chéo tự động:
    `data/hanzi-partials.json` (62 chữ trong toàn thư viện, gồm đủ 9
    chữ trên) do `tools/hanzi/build-hanzi-partials.mjs` dựng từ dữ
    liệu gốc; nét lấy từ Hanzi Writer Data (Arphic) cùng nguồn bước
    Luyện viết; thiếu ánh xạ hoặc lệch số nét thì tự rơi về chữ nguyên
    vẹn dạng ký tự, không tô. Đối chiếu tay cho 后: nét tô (3 nét cuối)
    khớp cả `matches` của Make Me a Hanzi lẫn `radStrokes` của Hanzi
    Writer cho bộ 口.
  - Tiêu đề giải thích theo căn cứ: "Vì sao ghép như vậy?" chỉ khi chữ
    có `etymology` nguồn; ngược lại "Nhìn chữ để nhớ" （ 前 后 去 六 关
    写 习… thuộc nhóm sau). Sửa câu chữ trong explain của 不 习 书 今
    先 (bỏ khẳng định "app để trống" không còn đúng với giao diện mới).
- **Hồ sơ**: mục `dataGaps` trong file tiến độ ghi 10 hồ sơ （ 京
  blocked + 9 chữ diagnosed-partial, phân biệt trạng thái giao diện và
  trạng thái nội dung). **Số chữ hoàn thiện giữ nguyên 78** — đợt này
  không tăng đếm.
- Kiểm thử: test logic (cổng không-thẻ-giữ-chỗ cho mọi chữ đã hoàn
  thiện, tính chất partial cho 9 chữ, đối chiếu độc lập toàn bộ
  `hanzi-partials.json` với dữ liệu gốc), test DOM (mở 后 thật: không
  còn "?", SVG 6 nét/3 nét tô nếu tải được nét, Luyện viết 6 nét, quay
  lại; hồi quy 想/冷）, test tra từ, diff check. Giả lập viewport
  360/390px bằng công cụ trình duyệt vẫn chưa thực hiện được — CSS mới
  dùng bề rộng tương đối (`min(148px, 52vw)`, lưới tự co) và đã rà
  tĩnh; Android thật chưa kiểm chứng.
- **Đã phát hành**: PR #74 merge tại
  `d79691b585ba2999779d76c58378000e8ec824d2`, GitHub Pages run #344
  (id 42019716148) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live: file `data/hanzi-partials.json` đủ 62 chữ; mở trang 后 và 今 —
  không còn thẻ "?", hình SVG đúng chiều （ 后： 3 nét của 口 ở dưới tô
  vàng nâu, phần trên xám; 今： 2 nét của 人 ở trên tô vàng nâu), mục
  "Thành phần đã nhận diện" và dòng bổ sung hiện đúng, tiêu đề giải
  thích: 后 = "Nhìn chữ để nhớ", 今 = "Vì sao ghép như vậy?". Lưu ý
  nhỏ từ lượt kiểm live: nét xám của phần chưa tách có tương phản thấp
  (đúng thiết kế phân cấp chính/phụ, không phải lỗi).

## Việc tiếp theo khi người dùng nhắn "Tiếp tục"

- Đọc quy chuẩn + checkpoint này + `docs/hanzi-analysis-progress.json`,
  kiểm HEAD của `main`. Vị trí tiếp theo: **HSK1 · 京 (bị chặn)** — xử lý
  京 trước nếu bổ sung được nguồn đã kiểm chứng cho `strokeCount` và âm
  Hán–Việt; nếu chưa, tiếp tục từ **HSK1 · 姐** (index 78, vị trí `next`
  trong file tiến độ), giữ thứ tự file.
- Mỗi lô: đối chiếu từng chữ → biên soạn → kiểm thử → PR → merge (đã
  được chủ dự án cho phép trong phạm vi đợt chuẩn hóa) → xác minh Pages
  đúng SHA → kiểm live → cập nhật checkpoint + file tiến độ → dừng.
- **Nghiệm thu tương tác trên live ĐÃ ĐẠT** (kiểm tra trình duyệt
  2026-11-05, ngay sau phát hành PR #61): mở link sâu 想 hiện đúng 4 tab
  (không còn "Gốc chữ"), dòng "Bước 1/4"; mở nhánh 相 tại chỗ
  (`aria-expanded=true`, hiện 木/目） và nhánh vẫn mở sau khi chuyển bước
  rồi quay lại; tab Luyện viết tải dữ liệu nét thật từ CDN, hiện "13 nét"
  và hoạt ảnh Xem nét chạy; bước cuối hiện "Bước 4/4" và nút "Đã học ·
  Chữ tiếp" (không bấm, không đổi tiến độ). Lưu ý nhỏ: ký hiệu ⌃ trên nút
  sau khi mở nhánh nhìn giống gạch ngang nhỏ trong ảnh chụp desktop —
  chi tiết thẩm mỹ, không ảnh hưởng chức năng.
- Hạn chế kiểm chứng còn lại: viewport 390px/360px và Android thật chưa
  kiểm được bằng công cụ hiện có (công cụ trình duyệt không đặt được bề
  rộng). Hai lần kiểm tra tự động khác từng báo không bấm được hộp thoại
  dù trang render đủ — kết quả nghiệm thu đạt ở trên là bằng chứng trực
  tiếp mới nhất; nếu gặp lại báo cáo mâu thuẫn, ưu tiên quan sát trực
  tiếp và đối chiếu file live trước khi kết luận lỗi.
