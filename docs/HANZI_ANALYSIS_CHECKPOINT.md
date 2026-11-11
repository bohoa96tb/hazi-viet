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
  `docs/hanzi-analysis-progress.json`. Đã chuẩn hóa **338 / 2.632** chữ
  (gồm mẫu 想, các lô B-001 đến B-020 và đợt gỡ chặn UB-001 dưới đây).
  Hai chữ bị chặn: 面 (HSK1 index 173) và 飞 (HSK1 index 174) — phép
  tách toàn lá "？", xem mục B-011. Vị trí tiếp theo: HSK2, chữ **非**
  (index 162).
- **Đã phát hành (B-011)**: PR #86 merge tại
  `5021f94b4a4b6dbe517bd43e64cce97f0809fac2`, GitHub Pages run #356
  (id 42608938456) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live (sau khi chờ cache Pages hết hạn ~11 phút): 零 hiện giao diện
  mới (LINH · 13 nét · thẻ 雨 PHẦN GỢI NGHĨA · thẻ 令 PHẦN GỢI ÂM);
  雨 ở chế độ phân tích một phần (thẻ 帀 trung tính, chú giải hai
  tông, không thẻ "?"); 高 hiện CAO · 10 nét với ba thẻ trung tính.
  Kiểm live cũng phát hiện thẻ 冋 của 高 chỉ có chữ, thiếu mô tả —
  đã sửa bằng PR #87 merge tại `ed74503` (bổ sung ghi đè mô tả hình
  dạng cho 冋 trong profile 高）.
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

## Đợt UB-001 — Gỡ chặn 京 + sửa renderer cũ (2026-11-05)

- Chủ dự án xác nhận quyền đứng: được dùng Unihan bổ sung thuộc tính
  còn thiếu (Hán–Việt, tổng số nét) theo chỉ thị gốc, không xin lại
  từng chữ. Mục chuẩn đã sửa: bỏ ghi chú hạn chế của bối cảnh pilot,
  thay bằng tiểu mục "Bổ sung dữ liệu còn thiếu từ Unihan (quyền
  đứng)" — chỉ bổ sung trường thiếu, ghi nguồn/phiên bản/giấy phép/lý
  do vào mục `supplements` của file tiến độ, và ghi đúng quan hệ
  nguồn: Hanzi Writer Data tạo từ dữ liệu của Make Me a Hanzi (một
  dòng dữ liệu, không phải hai bằng chứng độc lập); cộng nét IDS chỉ
  là kiểm tra nhất quán.
- **京 đã gỡ chặn và hoàn thành**: `strokeCount = 8` (Unihan U+4EAC
  kTotalStrokes; nhất quán với matches 8 nét và phép tách
  ⿳亠口小 = 2+3+3) và `learningVi.sinoViet = KINH` (mục 京 của Kai
  trong `radicals-vi.json`; đối chiếu Unihan kVietnamese "kinh") —
  ghi đầy đủ ở `supplements`. Bộ thủ của 京 vẫn là 亠 theo dữ liệu lõi;
  việc 京 có mục trong radicals-vi.json (vì được dùng làm thành phần)
  không biến 京 thành bộ thủ của chính nó. Renderer hiện cây
  亠/口/小 bình thường; bước Luyện viết tải dữ liệu 8 nét như mọi chữ.
- **Sửa renderer cũ (chữ chưa chuẩn hóa)**: lá IDS "？" trong cây rút
  gọn của giao diện cũ (study-view) và cây trong panel "Xem đầy đủ"
  (detail-view) nay hiện dấu trung tính "···" kèm dòng giải thích
  "không phải một thành phần của chữ", thay cho ký tự "?" đứng như một
  thành phần. Đây **chỉ là sửa hiển thị** — không tính là đã kiểm
  duyệt nội dung bất kỳ chữ chưa chuẩn hóa nào.

## Lô B-006 — 18 chữ HSK1 tiếp theo (2026-11-05)

- Chữ theo thứ tự `data/hsk1-core.json` (index 78–95): **姐 子 字 学
  客 家 对 小 少 岁 工 师 年 店 开 影 很 怎** (tiến độ gồm cả 京:
  97/2.632). Index 96 là 想 — đã hoàn thành từ lô mẫu; vị trí tiếp
  theo là 我 (index 97).
- **Đã phát hành cùng PR với UB-001**: PR #76 merge tại
  `488ecb1062b55116f2e200a4c39eee07aed96789`, GitHub Pages run #346
  (id 42135908319) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live: `hanzi-analysis.json` đủ 97 chữ; 京 hiện "8 nét · KINH · bộ
  thủ 亠 — ĐẦU", đủ thẻ 亠/口/小， Luyện viết 8 nét và hoạt ảnh chạy;
  姐 hiện TỈ với thẻ gợi nghĩa/gợi âm đúng; 年 ở chế độ phân tích một
  phần (thẻ 干, dòng bổ sung, không thẻ "?"); 令 ở giao diện cũ hiện
  dấu trung tính "···" kèm dòng giải thích ở cả cây rút gọn và panel
  đầy đủ; điều hướng 4 bước qua lại bình thường. (Việc phát hành từng
  bị treo qua đêm vì thẻ phê duyệt ghi GitHub hết hạn nhiều lần; chủ
  dự án duyệt phát hành ngày 2026-11-06.)
- Điểm nội dung: 姐/家/店/影/很/怎 hình thanh roles theo trường nguồn;
  字/学/客/少 thuộc khuôn hint gợi âm nhưng phân loại không phải
  pictophonetic → roles trung tính, gợi âm chỉ trong giải thích kèm
  quy thuộc nguồn; 少 ghi thêm cách đọc shào （ 少年） theo CVDICT;
  岁 không có chú giải nguồn → tiêu đề "Nhìn chữ để nhớ"; 年 thuộc
  diện phân tích một phần của PA-001 (phần đã nhận diện: 干; renderer
  tự áp dụng, có ánh xạ nét sẵn trong `hanzi-partials.json`).

## Lô B-007 — 18 chữ HSK1 tiếp theo (2026-11-06)

- Chữ theo thứ tự `data/hsk1-core.json` (index 97–114): **我 打 日 时
  明 星 昨 是 月 有 朋 服 期 本 机 来 杯 果** (tiến độ 115/2.632). Vị
  trí tiếp theo: 校 (index 115).
- Điểm nội dung: 打/星/昨/期/杯 hình thanh roles theo trường nguồn;
  时 chỉ có trường gợi nghĩa （ 日） trong nguồn — 寸 giữ trung tính,
  giải thích ghi là phần còn lại sau giản hóa; 机 thuộc khuôn hint gợi
  âm （ 几） → trung tính, quy thuộc nguồn; 有 thuộc diện phân tích một
  phần của PA-001 (phần đã nhận diện: 月 — nguồn gán vai trò gợi âm
  cổ, profile ghi rõ kèm hedge; ánh xạ nét sẵn trong
  `hanzi-partials.json`); 服 ghi thêm cách đọc fù (lượng từ liều
  thuốc) theo CVDICT.
- Hai test đã xoay fixture chữ-chưa-chuẩn-hóa từ 明 (nay đã chuẩn hóa)
  sang 休 (biểu ý, chưa chuẩn hóa): test logic (cổng profile + renderer
  cũ + vai trò trung tính) và test DOM (khôi phục vị trí đọc cũ).
- **Đã phát hành**: PR #78 merge tại
  `60b6b099ac1b0e3de7e5404008a67575b47c5b32`, GitHub Pages run #348
  (id 42148773008) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live: `hanzi-analysis.json` đủ 115 chữ; 我 hiện giao diện mới (NGÃ ·
  7 nét · 戈 — QUA · thẻ 扌/戈 trung tính · bố cục "扌 bên trái, 戈 bên
  phải" · Luyện viết 7 nét); 有 ở chế độ phân tích một phần (thẻ 月 —
  PHẦN GỢI ÂM, chú giải hai tông, dòng "Phân tích đầy đủ đang được bổ
  sung.", không thẻ "?", không "CHƯA XÁC ĐỊNH"); 明 hiện MINH · 8 nét ·
  日 — NHẬT · nghĩa "sáng · rõ". Hai lượt kiểm đầu thấy giao diện cũ là
  do cache GitHub Pages chưa hết hạn (dữ liệu live đã đủ 115 chữ ngay
  từ lượt kiểm đầu); sau ~12 phút kiểm lại đạt toàn bộ — đúng bài học
  cache đã ghi ở đợt trước.

## Lô B-008 — 18 chữ HSK1 tiếp theo (2026-11-06)

- Chữ theo thứ tự `data/hsk1-core.json` (index 115–132): **校 样 桌
  椅 欢 气 水 汉 没 漂 火 点 热 爱 爸 狗 猫 现** (tiến độ 133/2.632).
  Vị trí tiếp theo: 生 (index 133).
- Điểm nội dung: 校/样/椅/没/漂/点/热/爸/狗/猫 hình thanh roles theo
  trường nguồn; 现 thuộc khuôn hint gợi âm （ 见） → trung tính, quy
  thuộc nguồn; 桌/欢 không có chú giải nguồn → tiêu đề "Nhìn chữ để
  nhớ", roles trung tính; 气/水 thuộc diện phân tích một phần của
  PA-001 (phần đã nhận diện: 气 — 亻 ở phía trên; 水 — nét giữa 亅;
  ánh xạ nét sẵn trong `hanzi-partials.json`); 校 ghi thêm cách đọc
  jiào （ 校 đối chiếu) và 没 ghi mò theo CVDICT; 漂 có ba cách đọc —
  profile phân biệt piāo (trôi) / piào (đẹp trong 漂亮, cách đọc bài
  này học) / piǎo (tẩy trắng) theo CVDICT.
- **Đã phát hành**: PR #80 merge tại
  `8faaa0688ba921f600b86dcfa3057a18e8232606`, GitHub Pages run #350
  (id 42154034854) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live (sau khi chờ cache Pages hết hạn ~11 phút): 校 hiện giao diện
  mới (HIỆU · 10 nét · 木 — MỘC · thẻ 木 PHẦN GỢI NGHĨA · thẻ 交 PHẦN
  GỢI ÂM); 气 và 水 ở chế độ phân tích một phần (thẻ trung tính 亻 /
  亅, chú giải hai tông, dòng "Phân tích đầy đủ đang được bổ sung.",
  không thẻ "?", không "CHƯA XÁC ĐỊNH").

## Lô B-009 — 18 chữ HSK1 tiếp theo (2026-11-06)

- Chữ theo thứ tự `data/hsk1-core.json` (index 133–150): **生 电 的
  看 睡 租 站 米 系 老 能 脑 苹 茶 菜 衣 西 见** (tiến độ 151/2.632).
  Vị trí tiếp theo: 视 (index 151).
- Điểm nội dung: 睡/站/苹/菜 hình thanh roles theo trường nguồn; 系
  và 脑/茶 thuộc khuôn nguồn chỉ có trường gợi nghĩa — phần còn lại
  giữ trung tính (tiền lệ 时); 的 không có chú giải nguồn → "Nhìn chữ
  để nhớ", giải thích dạy trợ từ de là chính và ghi dī （ 的士） theo
  CVDICT; 看 ghi thêm cách đọc kān （ 字典）; 衣 thuộc diện phân tích
  một phần của PA-001 (phần đã nhận diện: 亠 — cổ áo; ghi thêm cách
  đọc yì theo CVDICT); 见 ghi liên hệ cách đọc xiàn = 现 theo CVDICT.
- **Đã phát hành**: PR #82 merge tại
  `46b747c164c1dc38c94a4b943e8085731ac110e8`, GitHub Pages run #352
  (id 42158748818) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live (sau khi chờ cache Pages hết hạn ~11 phút): 站 hiện giao diện
  mới (TRẠM · 10 nét · 立 — LẬP · thẻ 立 PHẦN GỢI NGHĨA · thẻ 占 PHẦN
  GỢI ÂM); 衣 ở chế độ phân tích một phần (thẻ 亠 trung tính, chú giải
  hai tông, dòng "Phân tích đầy đủ đang được bổ sung.", không thẻ "?");
  系 hiện HỆ · 7 nét · 糸 — MỊCH với 糸 gợi nghĩa và 丿 trung tính.

## Lô B-010 — 18 chữ HSK1 tiếp theo (2026-11-06)

- Chữ theo thứ tự `data/hsk1-core.json` (index 151–168): **视 觉 认
  识 话 语 说 请 读 谁 谢 起 车 这 那 都 里 钟** (tiến độ 169/2.632).
  Vị trí tiếp theo: 钱 (index 169); HSK1 còn 9 chữ (index 169–177).
- Điểm nội dung: 认/识/语/说/请/谁/谢/起/都/钟 hình thanh roles theo
  trường nguồn; 视 theo đúng trường nguồn dù ngược vị trí quen thuộc
  （ 礻 gợi âm — cùng đọc shì, 见 gợi nghĩa); 觉 theo trường nguồn
  （ ⺍ gợi âm cổ, 见 gợi nghĩa) và dạy phân biệt hai cách đọc jué
  （ 觉得） / jiào （ 睡觉） ngay trong bài; 话/读 thuộc khuôn hint gợi
  âm → trung tính, quy thuộc nguồn; 这 không có chú giải nguồn →
  "Nhìn chữ để nhớ"; 那 thuộc diện phân tích một phần của PA-001
  (phần đã nhận diện: 阝 ở bên phải); 都 dạy hai cách đọc dōu (đều —
  bài này) / dū （ 首都， ứng với Hán–Việt ĐÔ); 谁 ghi thêm cách đọc
  shéi; 识/说/读 ghi cách đọc phụ zhì/shuì/dòu theo CVDICT. Phồn thể
  của 钟 viết theo đúng trường `traditional` của lõi （ 鍾）, không
  dùng 鐘 — tiền lệ khớp lõi như B-006.
- **Đã phát hành**: PR #84 merge tại
  `3af965591407229fffc9d368537527fd5fe21d5e`, GitHub Pages run #354
  (id 42164461777) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live (sau khi chờ cache Pages hết hạn ~11 phút): 视 hiện giao diện
  mới với vai trò hoán đổi đúng theo nguồn （ 礻 PHẦN GỢI ÂM bên trái,
  见 PHẦN GỢI NGHĨA bên phải); 那 ở chế độ phân tích một phần (thẻ 阝
  trung tính, chú giải hai tông, không thẻ "?"); 觉 hiện GIÁC · 9 nét
  với 见 gợi nghĩa và ⺍ gợi âm.

## Lô B-011 — 7 chữ HSK1 cuối đủ điều kiện (2026-11-09)

- Chữ theo thứ tự `data/hsk1-core.json` (index 169–177, trừ hai chữ
  bị chặn dưới đây): **钱 院 雨 零 饭 馆 高** (tiến độ 176/2.632).
  HSK1 đã đi hết thứ tự file; vị trí tiếp theo: 丈 — chữ đầu tiên của
  HSK2 (index 0 trong `data/hsk2-core.json`).
- Điểm nội dung: 钱/院/零/饭 hình thanh roles theo trường nguồn （ 零
  令 gợi âm chỉ khác thanh; 饭 反 gợi âm chỉ khác thanh); 馆 thuộc
  khuôn hint gợi âm （ 官 guān/guǎn chỉ khác thanh) → trung tính, quy
  thuộc nguồn; 雨 thuộc diện phân tích một phần của PA-001 (phần đã
  nhận diện: 帀 — khung mây; các giọt mưa chưa tách riêng); 高 hình
  tượng (vẽ tòa nhà cao), không ép tách vai trò.
- **Hai chữ bị chặn — 面 (index 173) và 飞 (index 174)**: phép tách
  IDS trong dữ liệu lõi của cả hai đều là toàn lá "？" (⿱？？ và
  ⿻？？) — không có phần nào nhận diện được, trong khi cổng kiểm thử
  của dự án yêu cầu chữ phân tích một phần phải có ít nhất một phần
  đã nhận diện. Cả hai đều có chú giải hình tượng dùng được （ 面 vẽ
  khuôn mặt; 飞 là giản thể của 飛， vẽ chim vỗ cánh) nhưng chưa có
  đường hiển thị hợp lệ. Đã ghi vào `blocked` trong file tiến độ kèm
  lý do. Hướng xử lý đề xuất (chờ chủ dự án quyết hoặc giao đợt
  riêng): quy về hiển thị "không tách phần" như chữ đơn thể — cần
  sửa renderer/cổng kiểm thử, ngoài phạm vi một lô nội dung. HSK1 vì
  vậy đạt 176/178 chữ chuẩn hóa, còn đúng 2 chữ này.

## Lô B-012 — 18 chữ đầu HSK2 (2026-11-09)

- Chữ theo thứ tự `data/hsk2-core.json` (index 0–17): **丈 两 为 乐
  也 事 介 从 以 件 休 但 体 便 元 公 共 准** (tiến độ 194/2.632).
  Vị trí tiếp theo: 别 (HSK2 index 18).
- Điểm nội dung: 但 theo khuôn nguồn chỉ có trường gợi âm （ 旦 — cùng
  đọc dàn; 亻 trung tính); 准 hình thanh đầy đủ （ 隹 gợi âm cổ, 冫
  gợi nghĩa qua hình ống thủy bình theo chú giải nguồn); bốn chữ
  thuộc diện phân tích một phần của PA-001: 乐 (phần đã nhận diện 丿
  và 小）, 也 （ 乚）, 介 （ 人）, 以 （ 人）; ba chữ dạy phân biệt hai
  cách đọc ngay trong bài: 为 wèi （ 因为） / wéi （ 为什么）, 乐 lè
  （ 快乐） / yuè （ 音乐）, 便 biàn （ 方便） / pián （ 便宜）; các chữ
  không có chú giải nguồn （ 丈 为 事 体 便） giữ trung tính, không
  gán vai trò.
- **Xoay fixture kiểm thử**: 休 thuộc chính lô này nên không còn là
  chữ "chưa chuẩn hóa" cho bộ test — fixture ở
  `tools/hanzi/test-hanzi-analysis.mjs` và
  `tools/hanzi/test-hanzi-analysis-dom.mjs` đã chuyển từ 休 sang 森
  (HSK4, biểu ý, phép tách ⿱木⿰木木 giữ nguyên khẳng định lá 木 trung
  tính). Đây là thay đổi test duy nhất ngoài 3 file nội dung thường
  lệ, cùng tiền lệ xoay fixture ở B-007 （ 明 → 休）. Chuyên gia sửa 2
  điểm trước phát hành: 从 bỏ mệnh đề "giản thể của 從" vì trường
  `traditional` của lõi là chính 从 (tiền lệ khớp trường lõi như 钟 ở
  B-010); 便 giới hạn phạm vi câu về cách đọc pián thành "ở cấp này
  chỉ gặp trong 便宜" (từ điển còn ghi 便便/便嬛 là từ hiếm, không
  dạy ở cấp này nhưng không được khẳng định tuyệt đối sai).
- **Đã phát hành**: PR #89 merge tại
  `03b5ef63038936335f4704205fee4e0148181c05`, GitHub Pages run #359
  (id 42613549439) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live (sau khi chờ cache Pages hết hạn ~11 phút): 但 hiện giao diện
  mới （ 旦 PHẦN GỢI ÂM, 亻 trung tính); 乐 ở chế độ phân tích một
  phần (hai thẻ trung tính 丿 và 小， nghĩa hai cách đọc lè/yuè, không
  thẻ "?"); 准 hiện CHUẨN · 10 nét với 冫 gợi nghĩa và 隹 gợi âm.

## Lô B-013 — 18 chữ HSK2 tiếp theo (2026-11-09)

- Chữ theo thứ tự `data/hsk2-core.json` (index 18–35): **别 到 务
  动 助 千 卖 可 右 号 司 向 吧 告 员 咖 哥 唱** (tiến độ 212/2.632).
  Vị trí tiếp theo: 啡 (index 36).
- Điểm nội dung: 到/可 theo đúng trường nguồn dù ngược vị trí quen
  thuộc （ 至/丁 gợi nghĩa, 刂/口 gợi âm); 动/员 theo khuôn nguồn chỉ
  có trường gợi nghĩa (phần còn lại trung tính); ba chữ phân tích
  một phần: 右 （ 口）, 司 （ 口）, 向 （ 口）; 咖 là chữ phiên âm
  （ 咖啡） có cách đọc phụ gā trong 咖喱.
- **Bổ sung dữ liệu cho 卖 theo quyền Unihan đã cấp (như UB-001)**:
  dữ liệu lõi của 卖 thiếu cả `strokeCount` lẫn `learningVi`. Đã bổ
  sung vào `data/hsk2-core.json`: strokeCount = 8 (Unihan U+5356
  kTotalStrokes; đối chiếu nhất quán: matches nguồn có 8 nét) và
  learningVi Hán–Việt "Mại" (nguồn Kai trong dự án — mục 卖 ở
  radicals-vi ghi "chữ Mại (bán)"; đối chiếu: 卖淫 = mại dâm, 卖国 =
  mại quốc; Unihan không có kVietnamese cho chữ này — vắng, không
  mâu thuẫn). Đã ghi sổ `supplements` trong file tiến độ. 卖 là chữ
  hình thanh đặc biệt: nguồn gán 买 cả hai vai gợi âm và gợi nghĩa;
  profile không đặt role cho 买 (cổng kiểm thử và renderer ưu tiên
  vai gợi nghĩa khi một phần gánh cả hai), giải thích ghi rõ cả hai
  vai. Lô này vì vậy có 4 file thay đổi (thêm `data/hsk2-core.json`).
  Chuyên gia sửa 1 chữ trước phát hành: 咖 (hedge gợi âm jiā/kā —
  vần ia/a khác nhau, chỉ cùng nguyên âm chính a; và giới hạn câu
  "chỉ dùng để ghi âm" theo phạm vi cấp học).
- **Đã phát hành**: PR #91 merge tại
  `35491ec5494840efc513a3d0683e466affb464c7`, GitHub Pages run #361
  (id 42616176410) đúng SHA merge, success. Kiểm chứng trực tiếp trên
  live (sau khi chờ cache Pages hết hạn ~11 phút): 卖 hiện giao diện
  mới với dữ kiện đã bổ sung (MẠI · 8 nét · thẻ 买 PHẦN GỢI NGHĨA kèm
  ghi chú hai vai); 到 hiện vai trò hoán đổi đúng theo nguồn （ 至 gợi
  nghĩa trái, 刂 gợi âm phải); 右 ở chế độ phân tích một phần (thẻ 口
  trung tính, không thẻ "?").

## Lô B-014 — 18 chữ HSK2 tiếp theo (2026-11-09)

- Chữ theo thứ tự `data/hsk2-core.json` (index 36–53): **啡 因 场
  备 外 夫 奶 妹 妻 始 姓 孩 它 完 宜 室 就 左** (tiến độ 230/2.632).
  Vị trí tiếp theo: 已 (index 54).
- Điểm nội dung: 啡 là nửa sau của 咖啡 (nối tiếp 咖 ở B-013); 场 là
  trường hợp đặc biệt — trường gợi âm của nguồn là 昜 (theo dạng
  đầy đủ 場), nhưng dạng giản thể 场 đã thay bằng 勿 (không mang
  âm), nên profile chỉ ghi 土 gợi nghĩa và 勿 mang ghi chú trung
  tính giải thích rõ; 左 là chữ phân tích một phần (phần đã nhận
  diện 工; cặp với 右 ở B-013); 宜 được dạy qua từ 便宜 (ghép với
  便 ở B-012); 就 có thành phần gợi âm là 京 — chữ KINH đã chuẩn hóa
  ở HSK1 (đợt UB-001). Nhãn bộ thủ của 就 dùng "尢 — UÔNG" (dữ liệu
  radicals-vi không có mục 尢; chuyên gia đối chiếu độc lập xác
  nhận 尢 là bộ Khang Hy 43, âm Hán–Việt Uông). Chuyên gia sửa 2
  hedge gợi âm trước phát hành: 奶 （ 乃 và 奶 cùng đọc nǎi trọn
  vẹn, bỏ cụm "chỉ khác thanh") và 妹 （ 未/妹 cùng thanh 4; vần
  uei/ei chỉ cùng nguyên âm chính e). Việc phát hành lô này bị
  chậm một ngày vì thẻ phê duyệt ghi GitHub hết hạn ở lần đẩy đầu
  (2026-11-09); đẩy lại ngày 2026-11-10 sau khi người dùng nhắn
  tiếp tục.
- **Đã phát hành**: PR #93 merge tại
  `25f2eeb120a8ef358e9b0853c800f09b623fd796`, GitHub Pages run #363
  (id 42820821745) đúng SHA merge, success. Kiểm chứng trực tiếp
  trên live (sau khi chờ cache Pages hết hạn ~11 phút): 场 hiện
  giao diện mới （ 土 PHẦN GỢI NGHĨA, 勿 trung tính kèm ghi chú
  không mang âm chǎng); 左 ở chế độ phân tích một phần (thẻ 工
  trung tính, không thẻ "?"); 就 hiện TỰU · 12 nét · 尢 — UÔNG,
  thẻ 京 PHẦN GỢI ÂM.

## Lô B-015 — 18 chữ HSK2 tiếp theo (2026-11-10)

- Chữ theo thứ tự `data/hsk2-core.json` (index 54–71): **已 希 帮
  常 床 弟 张 得 忙 快 思 息 您 情 意 慢 懂 房** (tiến độ 248/2.632).
  Vị trí tiếp theo: 所 (index 72).
- Điểm nội dung: 已 là chữ không có phép tách trong dữ liệu nguồn
  (học như khối duy nhất, kèm phân biệt 已/己); 弟 là chữ phân tích
  một phần (phần đã nhận diện 丷/弓, hai nét cuối chưa tách); năm
  chữ nguồn xếp "biểu ý" nhưng hint có ghi một phần gợi âm （ 帮/
  床/忙/快/息） — theo tiền lệ, vai trò giữ trung tính, phần gợi âm
  chỉ nói trong giải thích kèm quy thuộc nguồn kèm đối chiếu âm
  chính xác; 得 dạy đủ ba cách đọc dé/děi/de ngay ở tầng chữ.
  Chuyên gia sửa 1 hedge trước phát hành: 息 — 心 xīn và 息 xī
  cùng thanh điệu (đều thanh 1), chỉ khác âm cuối -n; bản thảo
  viết sai "chỉ khác thanh".
- **Đã phát hành**: PR #95 merge tại
  `91b1a5b023617a0928c47f2985430b114cac33b5`, GitHub Pages run #365
  (id 42823665033) đúng SHA merge, success. Kiểm chứng trực tiếp
  trên live (sau khi chờ cache Pages hết hạn ~11 phút): 已 hiện
  ghi chú khối duy nhất, không cây thành phần, không dòng "Bố
  cục"; 弟 ở chế độ phân tích một phần (hai thẻ trung tính 丷/弓,
  không thẻ "?"); 得 hiện ĐẮC · 11 nét kèm đủ ba cách đọc
  dé/děi/de và ví dụ trong giải thích.

## Lô B-016 — 18 chữ HSK2 tiếp theo (2026-11-10)

- Chữ theo thứ tự `data/hsk2-core.json` (index 72–89): **所 手 找
  报 教 斤 新 旁 旅 早 晚 晴 最 望 次 歌 正 步** (tiến độ 266/2.632).
  Vị trí tiếp theo: 每 (index 90).
- Điểm nội dung: 手 không có phép tách (khối duy nhất, chú giải vẽ
  bàn tay xòe ngón); hai chữ phân tích một phần: 旅 (phần đã nhận
  diện 方/氏) và 步 （ 止）; hai chữ biểu ý có hint gợi âm giữ trung
  tính theo tiền lệ （ 晚 免， 望 亡 — 望 nối tiếp 希望 ở B-015); 教
  dạy cả hai cách đọc jiào/jiāo kèm quy tắc phân biệt theo vị trí;
  最 không nêu mệnh đề giản/phồn vì trường traditional của lõi là
  biến thể 㝡 (như 备 ở B-014). Chuyên gia đạt 18/18 không sửa —
  lô đầu tiên không có lỗi hedge gợi âm sau khi áp quy tắc tự đối
  chiếu bốn yếu tố (âm đầu, vần, âm cuối, thanh điệu) từ B-015.
- **Đã phát hành**: PR #97 merge tại
  `b372782e5c2be749be6173fbc22a7d70b8c31e9a`, GitHub Pages run #367
  (id 42826545685) đúng SHA merge, success. Kiểm chứng trực tiếp
  trên live (sau khi chờ cache Pages hết hạn ~11 phút): 手 hiện
  ghi chú khối duy nhất, không cây thành phần; 步 ở chế độ phân
  tích một phần (thẻ 止 trung tính, không thẻ "?"); 教 hiện đủ
  hai cách đọc jiào/jiāo kèm quy tắc phân biệt trong giải thích.

## Lô B-017 — 18 chữ HSK2 tiếp theo (2026-11-11)

- Chữ theo thứ tự `data/hsk2-core.json` (index 90–107): **每 比 汽
  泳 洗 游 牛 玩 班 球 瓜 男 病 白 百 真 眼 着** (tiến độ 284/2.632).
  Vị trí tiếp theo: 睛 (index 108).
- Điểm nội dung: ba chữ phân tích một phần — 每 (phần đã nhận diện
  母; nguồn xếp hình thanh với 母 gợi âm, nói trong giải thích),
  瓜 （ 厶), 白 （ 日）; 牛 không phép tách (khối duy nhất, vẽ đầu bò);
  比/汽 theo khuôn biểu ý có hint gợi âm giữ trung tính; 着 dạy
  cách đọc chính zhe kèm zháo trong 着急/睡着. Chuyên gia sửa 1
  hedge nhẹ trước phát hành: 洗 — vần ian của xiān và i của xǐ
  khác nhau cả nguyên âm chính a lẫn âm cuối -n, không chỉ âm
  cuối (bỏ -n khỏi xiān được xiā, không phải xǐ).
- **Đã phát hành**: PR #99 merge tại
  `002ca4ff99e945442b139d7857e33b2804e7bdd9`, GitHub Pages run #369
  (id 42969669147) đúng SHA merge, success. Kiểm chứng trực tiếp
  trên live (sau khi chờ cache Pages hết hạn ~11 phút): 牛 hiện
  ghi chú khối duy nhất, không cây thành phần; 着 hiện đủ zhe
  (kèm 门开着/他穿着一件外套) và zháo trong giải thích; 每 ở chế
  độ phân tích một phần — một điểm cần ghi rõ: thẻ 母 hiện nhãn
  "PHẦN GỢI ÂM" (không phải trung tính) vì renderer lấy nhãn từ
  hàm suy vai trò theo trường etymology của lõi (trường gợi âm
  của 每 đúng là 母) — đây là hành vi đúng theo dữ liệu nguồn và
  khớp giải thích của profile, không phải lỗi; các chữ partial
  trước đây hiện trung tính chỉ vì phần đã nhận diện không ứng
  với trường gợi âm/nghĩa nào của nguồn. Từ nay khi giao kiểm
  live chữ partial, phải đối chiếu trường etymology trước khi kỳ
  vọng nhãn thẻ.

## Lô B-018 — 18 chữ HSK2 tiếp theo (2026-11-11)

- Chữ theo thứ tự `data/hsk2-core.json` (index 108–125): **睛 知 票
  离 穿 笑 第 答 篮 累 红 纸 绍 经 给 羊 考 肉** (tiến độ 302/2.632).
  Vị trí tiếp theo: 自 (index 126).
- Điểm nội dung: hai chữ phân tích một phần — 经 (phần đã nhận
  diện 纟 gợi nghĩa và 工 gợi âm theo trường nguồn; nhãn thẻ đúng
  theo làm rõ ở mục B-017), 羊 （ 丷); 知 và 穿 giữ vai trò hoán
  đổi theo nguồn （ 知： 矢 gợi âm/口 gợi nghĩa; 穿： 穴 gợi âm/牙
  gợi nghĩa); 第 theo khuôn biểu ý có hint gợi âm （ 弟） giữ trung
  tính; 答 dạy dá kèm dā trong 答应; 累 dạy lèi kèm lěi học sau.
  Chuyên gia sửa 1 chi tiết nhẹ trước phát hành: 睛 — giải thích
  ban đầu gọi 眼 là “chữ cuối lô trước” nhưng 眼 là chữ thứ 16/18
  của B-017 (chữ cuối lô là 着), đã sửa thành “đã học ở lô trước”.
- **Đã phát hành**: PR #101 merge tại
  `593a430c4e80727277c4dfe26eeecb50dba6a2c1`, GitHub Pages run #371
  (id 42972147529) đúng SHA merge, success. Kiểm chứng trực tiếp
  trên live (sau khi chờ cache Pages hết hạn ~11 phút): 经 ở chế
  độ phân tích một phần với hai thẻ 纟 “PHẦN GỢI NGHĨA” và 工
  “PHẦN GỢI ÂM” đúng theo trường nguồn; 知 hiện 矢 gợi âm / 口
  gợi nghĩa đúng trường nguồn; 睛 hiện đủ vai và từ 眼睛.

## Lô B-019 — 18 chữ HSK2 tiếp theo (2026-11-11)

- Chữ theo thứ tự `data/hsk2-core.json` (index 126–143): **自 舞 船
  色 药 蛋 行 表 要 让 诉 试 课 贵 走 跑 路 跳** (tiến độ 320/2.632).
  Vị trí tiếp theo: 踢 (index 144).
- Điểm nội dung: 自 phân tích một phần (phần đã nhận diện 目;
  chú giải nguồn nói tự gốc vẽ cái mũi); 蛋 theo tiền lệ 场 —
  trường gợi âm của nguồn là 延 nhưng 延 không phải một phần
  trong phép tách hiện tại nên chỉ ghi vai gợi nghĩa của 虫;
  船/贵 theo khuôn trường gợi âm để trống, chỉ ghi vai gợi nghĩa;
  诉 theo khuôn biểu ý có hint gợi âm giữ trung tính; 行 dạy
  xíng (chính) kèm háng trong 银行. Chuyên gia sửa 2 điểm nhẹ
  trước phát hành: 船 — cụm 几/口 nằm ở phía phải （ 几 trên, 口
  dưới), không phải “trên-phải”; 跳 — hedge zhào/tiào sai ở âm
  đệm: tiào có vần iao (thêm âm đệm i), zhào là ao, không được
  viết “chỉ khác âm đầu”.
- **Đã phát hành**: PR #103 merge tại
  `f95d5227e22e3920d5bd5ecf88b30632450a4056`, GitHub Pages run #373
  (id 42974601634) đúng SHA merge, success. Kiểm chứng trực tiếp
  trên live (sau khi chờ cache Pages hết hạn ~11 phút): 自 ở chế
  độ phân tích một phần với thẻ 目 trung tính và chú giải vẽ cái
  mũi; 蛋 chỉ hiện thẻ 虫 gợi nghĩa, không có thẻ cho 延; 行 hiện
  đủ hai cách đọc xíng/háng đúng phạm vi đã soạn.

## Lô B-020 — 18 chữ HSK2 tiếp theo (2026-11-11)

- Chữ theo thứ tự `data/hsk2-core.json` (index 144–161): **踢 身 边
  迎 运 近 还 进 远 送 道 错 长 门 问 间 阴 雪** (tiến độ 338/2.632).
  Vị trí tiếp theo: 非 (index 162).
- Điểm nội dung: Thân không phép tách (khối duy nhất); hai chữ
  phân tích một phần — 长 (phần đã nhận diện 一; dạy zhǎng chính
  kèm cháng), 门 (hai nét đầu 丶/丨); 边 theo tiền lệ 蛋/场 —
  trường gợi âm của nguồn là 臱 nhưng 臱 không phải một phần
  trong phép tách hiện tại nên chỉ ghi 辶 gợi nghĩa; 还 dạy hái
  (chính) kèm huán trong 还书. Chuyên gia đạt 18/18 không sửa —
  lô sạch thứ hai sau B-016.
- **Đã phát hành**: PR #105 merge tại
  `3757aa67d0cc0ab71b1c5a182e2b0bb2974c4539`, GitHub Pages run #375
  (id 42977023355) đúng SHA merge, success. Kiểm chứng trực tiếp
  trên live (sau khi chờ cache Pages hết hạn ~11 phút): 边 chỉ
  hiện thẻ 辶 gợi nghĩa, không có thẻ cho 臱; 长 ở chế độ phân
  tích một phần với thẻ 一 trung tính và đủ hai cách đọc
  zhǎng/cháng đúng phạm vi; 身 hiện ghi chú khối duy nhất,
  không cây thành phần.

## Việc tiếp theo khi người dùng nhắn "Tiếp tục"

- Đọc quy chuẩn + checkpoint này + `docs/hanzi-analysis-progress.json`,
  kiểm HEAD của `main`. Vị trí tiếp theo: **HSK2 · 非** (index 162, vị
  trí `next` trong file tiến độ), giữ thứ tự file. Hai chữ treo: 面 và
  飞 (HSK1) đang ở trạng thái blocked chờ quyết định xử lý riêng, xem
  mục B-011.
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
