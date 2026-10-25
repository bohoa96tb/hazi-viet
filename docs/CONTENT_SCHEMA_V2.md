# Hợp đồng bài V2 và tương thích V1

`word.lesson.version === 2` chọn audit/renderer/audio V2 trong `js/lesson-v2.js` và `js/lesson-v2-view.js`. Các bài không mang version 2 tiếp tục qua hợp đồng V1 cũ; 58 record đã hoàn thiện tại mốc ce64b7f giữ nguyên byte nội dung JSON và hash đối tượng. Không chạy init lại.

- `cohortOrdinal`: số mục trong baseline 2.224; khác `word.sourceIndex` (thứ tự nguồn trong cấp).
- `introduction.scope`; `word.intro`: chữ/cách đọc/nghĩa ở giới thiệu. Ghi thanh gốc mặc định; thanh nhẹ không dấu.
- `meaning`: `scene`, `explanation`, `boundary`, `conditions[]`. `takeaway` phục vụ chế độ nghe ngữ cảnh, không được phát lặp trong bài giảng đầy đủ.
- `usages[]`: 1–2 khung với `id`, `frame`, `position`, `required`, `omission`, `exampleId`. Mỗi khung gắn với một ví dụ; khung chung có thể dùng cho hai câu.
- `examples[]`: đúng hai câu chính khác nhau; `id`, `zh`, `vi`, `analysis`, `practiceAllowed:true`. Tùy chọn `pinyin` ở câu minh họa khung; `targetParts` khi từ bị tách trong câu. Không có tab ví dụ lặp.
- `traps[]`: `id`, `title`, `scene`, `possibleConfusion`, `difference`, `cases[]`, `replacement:{result,explanation}`, `boundary`, `tip`. Mỗi case có `id`, `zh`, `vi`, `comment`, `judgment`, `practiceAllowed:false`. Nhãn đúng/ngữ pháp sai/đổi nghĩa/không hợp ý/kém tự nhiên/gần nghĩa/cần ngữ cảnh được phân biệt. Case sai cần `corrections[]` có `caseId,zh,vi,reason`; cảnh báo trước khi TTS đọc. Không đưa case vào immersion/nhắc lại.
- `traps: []` hợp lệ khi không có bẫy hữu ích; giữ `noTrapReason: "Chưa thấy bẫy thông dụng cần lưu ý ở mức học này."` và đủ kết quả rà soát. Độ dài giải thích thay đổi theo độ khó, số thành phần bắt buộc không đổi.
- `trapReview`: ghi nội bộ kết quả rà `readingsAndMeanings`, `literalTranslation`, `confusables`; không ép đủ ba loại bẫy hiển thị. Nếu không có bẫy, ghi đúng `noTrapReason` theo chuẩn.
- `pronunciation.text`: ngắn, kết bằng nhiệm vụ đọc; có thể thêm `pronunciation.pinyin` riêng. Với từ có nhiều cách đọc, có thể thêm `pronunciation.contexts[]` gồm `introIndex`, câu chữ Hán có chứa từ và nghĩa Việt ngắn; TTS đọc các câu ngữ cảnh này để gắn từng cách đọc với cách dùng. TTS không nhận trường Pinyin.
- `checks[]`: 2–4 câu mở, `id,type:'open',question`. `answers[id]` riêng chứa `accepted[]` và `explanation`. Không chấm tự động theo chuỗi; người học tự đối chiếu, chấp nhận cách khác có lý.
- `selfUse[]`: đúng hai tình huống `id,prompt`. `selfAnswers[id]` riêng chứa `idea,frame,model,vi,criteria[]`. Mở lần lượt ý → khung → mẫu; F mở sau khi đã mở lời giải E hoặc chủ động yêu cầu.
- `authorship`, `sources[]`: ghi nguồn đối chiếu và giới hạn phản biện.

Bài V2 không cần tạo `quiz`, `near` V1 giả để qua validator; đã có bài mở và đối chiếu thật ở lesson. `shape` nếu có vẫn hiển thị; liên kết từng chữ sang index.html giữ nguyên. `word.task/model` dùng cho bước ôn chủ động mở gợi ý, không phát trong bài giảng tự động.

## Kiểm tra

Chạy trên nhánh content/vocabulary-2224:

```
node tools/vocabulary/process-batch.mjs verify
node tools/vocabulary/test-dom.mjs
node tools/vocabulary/quality-audit.mjs --self-test
node tools/vocabulary/quality-audit.mjs
```

Lệnh DOM cần Happy DOM: `npm install --prefix /tmp/hazi-test-env happy-dom --no-audit --no-fund`; hoặc đặt `HAPPY_DOM_MODULE` tới file module có sẵn. Đây là phụ thuộc kiểm thử tùy chọn, không thêm vào website. Verify chính không cần npm.

Từ batch-006, verify còn đối chiếu cohortOrdinal với baseline và examples ở word/lesson; DOM test tự lấy bài mới nhất, giữ hồi quy V1/不用.

Verify V1 giữ nguyên tiêu chí cũ. Verify V2 kiểm tra hai ví dụ, hash, liên kết, ẩn lời giải/gợi ý khỏi HTML, tách câu hỏi/audio lời giải, loại Pinyin/Markdown khỏi TTS, câu sai giả lập phải cảnh báo và sửa, mẫu sai cấu trúc dữ liệu phải bị từ chối. DOM chạy entry point thật với API giọng giả lập để kiểm tra sự kiện và trạng thái; không chứng nhận bố cục trực quan hay TTS thiết bị.

`quality-audit.mjs` là cổng cảnh báo biên tập riêng: tìm tự dùng trùng hoặc gần giống máy móc với ví dụ, đáp án không chứa từ/cấu trúc mục tiêu (kể cả dạng tách được), thiếu một trong các trường đồng bộ `idea/frame/model/vi/criteria`, token tiếng Trung trong tiêu chí không có bằng chứng trong prompt/ý tưởng/khung/đáp án, tiêu đề đối chiếu A/B thiếu chính A hoặc B trong câu case tiếng Trung thật và câu sai thiếu correction. Cổng này cũng dùng các neo ngữ nghĩa có chủ đích để cảnh báo mâu thuẫn rõ giữa chủ thể, hành động, địa điểm hoặc đối tượng trong prompt tiếng Việt và mẫu tiếng Trung; riêng các cặp đối lập như 这边/那边, 左/右, 上/下, 前/后, 里/外 và 有/没有 được kiểm tra theo cả cực được yêu cầu và cực đối lập xuất hiện trong câu mẫu. Đây là bộ lọc khoanh vùng dựa trên nghĩa của tình huống, không thay thế phản biện ngôn ngữ. Cảnh báo cũ cần đọc lại, không tự động kết luận câu sai; batch mới bị chặn nếu có lỗi trùng nguyên văn, thiếu từ mục tiêu, đồng bộ trường không đủ, tiêu chí không có bằng chứng, neo prompt–mẫu bị lệch, cặp đối lập bị đảo hoặc bẫy A/B thiếu ví dụ thật. `--self-test` bao phủ dữ liệu đúng, sai, ngoại lệ ngữ cảnh hợp lệ và `targetForms`/`targetOptional`.

## Phát hành

Lấy HEAD main/content qua GitHub trước ghi. Tạo tree dựa tree thực của commit nguồn; tạo commit có cha là HEAD thực; update_ref với expected_sha và force:false. Nếu main đã thay đổi, đọc lại và merge an toàn; không dựng tree đè main mới. Đọc lại progress, blob khóa học, hash/ID. Ghi contentCommit đã tồn tại trong commit kế tiếp. Fast-forward main sau kiểm tra, rồi theo dõi Actions run đúng head_sha. Đọc dữ liệu URL Pages, đối chiếu đủ ID mới và manifest/cache. Nếu không truy cập được live phải ghi rõ chưa xác minh live.
