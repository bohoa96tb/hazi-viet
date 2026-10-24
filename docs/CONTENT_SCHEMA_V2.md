# Hợp đồng bài V2 và tương thích V1

## Hợp đồng V3 tổng quát

`word.lesson.version === 3` dùng cho quá trình tái biên soạn từ đầu baseline; `hz-h2-b68721647e72` (下) là mẫu định hướng, không phải khuôn độ dài. Bộ nạp vẫn giữ nguyên đường V1/V2. V3 bỏ trường giảng riêng `pronunciation` và không render `shape` trong bài từ vựng; audio từ/câu và liên kết từng Hanzi sang trang phân tích độc lập vẫn giữ. Quy tắc biên tập, độ khó, bẫy và năm bước chỉ lấy từ `docs/CONTENT_STANDARD_V3.md`; phần này chỉ ghi hợp đồng dữ liệu và điểm phụ thuộc kỹ thuật.

V3 tổ chức trực tiếp theo năm bước:

- `senses[]`: các khối cách dùng, mỗi khối có tình huống, nghĩa, vai trò, cấu trúc, cụm từ và ví dụ có Pinyin.
- `confusions[]`: bẫy được giảng ngay sau cách dùng liên quan qua `afterSense`; mỗi bẫy có đối chiếu cụ thể và có thể gắn `category: 'A1'|'A2'|'B'|'C'`.
- `guidedExercises[]`: sắp xếp, điền và hoàn thành cấu trúc ở bước Ghép câu.
- `discriminationExercises[]`: bài tương tác kiểm tra từng `trapId`, không lộ đáp án trước khi trả lời.
- `productionExercises[]`: nhiệm vụ tự tạo câu, gợi ý mở tuần tự ý → khung → mẫu; số lượng theo độ khó.
- `reviewExercises[]`: các kiểu nhớ lại theo độ khó; đáp án và từ mục tiêu được ẩn trước khi thử. Mỗi thẻ có trạng thái riêng và chỉ sau khi đủ thẻ mới cập nhật lịch ôn tổng hợp.

Validator V3 nằm ở `js/lesson-v3.js`, renderer ở `js/lesson-v3-view.js`, kiểm thử cấu trúc/ẩn đáp án ở `tools/vocabulary/verify-v3.mjs`. Việc áp dụng correction không tăng số bài hoàn thành và phải cập nhật digest của đúng ID.

`word.lesson.version === 2` chọn audit/renderer/audio V2 trong `js/lesson-v2.js` và `js/lesson-v2-view.js`. Các bài không mang version 2 tiếp tục qua hợp đồng V1 cũ; 58 record đã hoàn thiện tại mốc ce64b7f giữ nguyên byte nội dung JSON và hash đối tượng. Không chạy init lại.

- `cohortOrdinal`: số mục trong baseline 2.224; khác `word.sourceIndex` (thứ tự nguồn trong cấp).
- `introduction.scope`; `word.intro`: chữ/cách đọc/nghĩa ở giới thiệu. Ghi thanh gốc mặc định; thanh nhẹ không dấu.
- `meaning`: `scene`, `explanation`, `boundary`, `conditions[]`. `takeaway` phục vụ chế độ nghe ngữ cảnh, không được phát lặp trong bài giảng đầy đủ.
- `usages[]`: 1–2 khung với `id`, `frame`, `position`, `required`, `omission`, `exampleId`. Mỗi khung gắn với một ví dụ; khung chung có thể dùng cho hai câu.
- `examples[]`: đúng hai câu chính khác nhau; `id`, `zh`, `vi`, `analysis`, `practiceAllowed:true`. Tùy chọn `pinyin` ở câu minh họa khung; `targetParts` khi từ bị tách trong câu. Không có tab ví dụ lặp.
- `traps[]`: `id`, `title`, `scene`, `possibleConfusion`, `difference`, `cases[]`, `replacement:{result,explanation}`, `boundary`, `tip`. Mỗi case có `id`, `zh`, `vi`, `comment`, `judgment`, `practiceAllowed:false`; có thể thêm `pinyin` để hiển thị cách đọc của câu đối chiếu. Pinyin này không được đưa vào TTS. Nhãn đúng/ngữ pháp sai/đổi nghĩa/không hợp ý/kém tự nhiên/gần nghĩa/cần ngữ cảnh được phân biệt. Case sai cần `corrections[]` có `caseId,zh,vi,reason`; cảnh báo trước khi TTS đọc. Không đưa case vào immersion/nhắc lại.
- `traps: []` hợp lệ khi không có bẫy hữu ích; giữ `noTrapReason: "Chưa thấy bẫy thông dụng cần lưu ý ở mức học này."` và đủ kết quả rà soát. Độ dài giải thích thay đổi theo độ khó, số thành phần bắt buộc không đổi.
- `trapReview`: object kết quả quét với `status:'complete'` và bốn mục `a1Readings`, `a2Meanings`, `bLiteralTranslation`, `cConfusables`; mỗi mục có `checked:true`, `found:boolean`, `summary`. Ý nghĩa sư phạm của bốn nhóm và điều kiện đưa vào `confusions[]` theo `docs/CONTENT_STANDARD_V3.md`; renderer dùng câu trạng thái chuẩn khi danh sách bẫy rỗng.
- `pronunciation.text`: ngắn, kết bằng nhiệm vụ đọc; có thể thêm `pronunciation.pinyin` riêng. TTS không nhận trường Pinyin.
- `checks[]`: 2–4 câu mở, `id,type:'open',question`. `answers[id]` riêng chứa `accepted[]` và `explanation`; có thể thêm `audioText` khi đáp án hiển thị chứa Pinyin hoặc ký hiệu không nên được TTS đọc nguyên văn. Không chấm tự động theo chuỗi; người học tự đối chiếu, chấp nhận cách khác có lý.
- `selfUse[]`: đúng hai tình huống `id,prompt`. `selfAnswers[id]` riêng chứa `idea,frame,model,vi,criteria[]`. Mở lần lượt ý → khung → mẫu; F mở sau khi đã mở lời giải E hoặc chủ động yêu cầu.
- `authorship`, `sources[]`: ghi nguồn đối chiếu và giới hạn phản biện.

Bài V2 không cần tạo `quiz`, `near` V1 giả để qua validator; đã có bài mở và đối chiếu thật ở lesson. `shape` nếu có vẫn hiển thị; liên kết từng chữ sang index.html giữ nguyên. `word.task/model` dùng cho bước ôn chủ động mở gợi ý, không phát trong bài giảng tự động.

## Kiểm tra

Chạy trên nhánh content/vocabulary-2224:

```
node tools/vocabulary/process-batch.mjs verify
node tools/vocabulary/test-dom.mjs
```

Lệnh DOM cần Happy DOM: `npm install --prefix /tmp/hazi-test-env happy-dom --no-audit --no-fund`; hoặc đặt `HAPPY_DOM_MODULE` tới file module có sẵn. Đây là phụ thuộc kiểm thử tùy chọn, không thêm vào website. Verify chính không cần npm.

Từ batch-006, verify còn đối chiếu cohortOrdinal với baseline và examples ở word/lesson; DOM test tự lấy bài mới nhất, giữ hồi quy V1/不用.

Verify V1 giữ nguyên tiêu chí cũ. Verify V2 kiểm tra hai ví dụ, hash, liên kết, ẩn lời giải/gợi ý khỏi HTML, tách câu hỏi/audio lời giải, loại Pinyin/Markdown khỏi TTS, câu sai giả lập phải cảnh báo và sửa, mẫu sai cấu trúc dữ liệu phải bị từ chối. DOM chạy entry point thật với API giọng giả lập để kiểm tra sự kiện và trạng thái; không chứng nhận bố cục trực quan hay TTS thiết bị.

## Phát hành

Lấy HEAD main/content qua GitHub trước ghi. Tạo tree dựa tree thực của commit nguồn; tạo commit có cha là HEAD thực; update_ref với expected_sha và force:false. Nếu main đã thay đổi, đọc lại và merge an toàn; không dựng tree đè main mới. Đọc lại progress, blob khóa học, hash/ID. Ghi contentCommit đã tồn tại trong commit kế tiếp. Fast-forward main sau kiểm tra, rồi theo dõi Actions run đúng head_sha. Đọc dữ liệu URL Pages, đối chiếu đủ ID mới và manifest/cache. Nếu không truy cập được live phải ghi rõ chưa xác minh live.
