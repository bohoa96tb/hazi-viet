# Chuẩn Thực hành sau bài (hội thoại/video) — mẫu pilot v6

Tài liệu này chốt cách làm phần **Thực hành** ở cuối mỗi bài từ vựng, lấy bộ video pilot v6
(bài HSK 2 chứa 公共汽车, xem `docs/LISTENING_PILOT.md`) làm mẫu chuẩn. Mọi bài làm sau
phải theo đúng quy trình này. Tiến độ của công việc này theo dõi ở `docs/PRACTICE_CHECKPOINT.md`.

## Ba loại tiến độ — không được gộp

1. **Tiến độ biên soạn từ vựng**: `progress.json` / `completedCount` (bài V2 hoàn chỉnh).
   Bổ sung video hay bài tập nghe **không bao giờ** làm tăng `completedCount`.
2. **Tiến độ tuyển chọn và hoàn thiện bài Thực hành**: `docs/PRACTICE_CHECKPOINT.md`.
3. **Tiến độ học của người dùng**: lưu cục bộ trên máy người học (localStorage),
   riêng từng bài, từng video; thêm bài mới không được xóa tiến độ cũ.

## Khi nào một bài được làm Thực hành

- Nội dung từ vựng của bài đã hoàn tất theo chuẩn dự án (mọi từ có bài V2 hoàn chỉnh,
  kiểm thử liên quan đạt). Bài có đủ 24 mục từ **không mặc nhiên** là đã xong.
- Bài chưa xong từ vựng: ghi rõ trạng thái và phần còn thiếu vào checkpoint, **không**
  tự biên soạn tiếp từ vựng trong đợt bổ sung Thực hành, chuyển sang bài kế tiếp đủ điều kiện.
- Bài đã có Thực hành đạt chuẩn này: ghi nhận vào checkpoint và bỏ qua, không làm lại.

## Chuẩn chọn video cho một bài

- **Tối đa 5 video** cho một bài; không bắt buộc đủ 5.
- Ưu tiên: người thật (xác minh bằng bằng chứng thực tế, không suy từ mô tả "giáo viên bản ngữ"
  hay đuôi file), giọng rõ, nội dung vừa trình độ của bài.
- Chủ động tìm trên YouTube và trang nguồn chính thức; **không giới hạn ở Chinese Station** —
  tái sử dụng nguồn tốt khi phù hợp, tìm nguồn khác khi phù hợp hơn.
- Ưu tiên video bổ sung từ **chưa xuất hiện** trong bộ của bài. Mỗi video thêm phải đóng góp
  ít nhất một từ mới đã xác minh; video chỉ lặp lại từ đã phủ thì không chọn.
- Chỉ tính từ **thực sự được nói** trong video, đúng nghĩa đang học của bài, tính theo ID từ,
  **không cộng trùng**. Không tính: tên vai/người nói, từ chỉ xuất hiện trong câu hỏi, bản dịch,
  gợi ý hay câu mẫu tự biên soạn.
- Không ép phủ đủ toàn bộ từ của bài. Đủ 5 video thì dừng và ghi từ còn thiếu.
  Ít hơn 5 mà sau khảo sát hợp lý không còn nguồn phù hợp: chốt số lượng thực tế, ghi lý do.
- Với HSK1, ưu tiên đặc biệt: câu ngắn, tình huống rõ, ít từ ngoài bài và kiến thức đã học;
  hoạt động đơn giản. Không đòi người mới hiểu hội thoại trình độ cao hơn chỉ vì có từ trùng.
- **Không tạo hội thoại AI để lấp từ còn thiếu.** Không tìm được video phù hợp nào:
  lưu kết quả khảo sát vào checkpoint/dữ liệu và báo rõ; phương án tự tạo chỉ dùng
  sau khi người dùng xác nhận.

## Chất lượng nguồn và nội dung (mỗi video)

- Ghi đủ: URL, kênh/nguồn, tiêu đề, tình huống, đoạn được chọn (cả video hoặc cửa sổ lượt).
- Transcript phải khớp **chính bản video đó**; không lấy transcript từ bài khác cùng chủ đề;
  không coi phụ đề tự động là chính xác khi chưa đối chiếu. Được chép lời bằng tai nhưng
  phải giữ đúng lời được nói; không tự viết hội thoại mới rồi gắn vào âm thanh có sẵn.
- Nghĩa tiếng Việt và câu hỏi biên soạn theo đúng lời thoại; đáp án/giải thích trích
  nguyên văn câu thoại liên quan.
- Kiểm tra điều kiện sử dụng của nguồn; nhúng chính thức qua trình phát của nền tảng,
  ghi credit trong app và tài liệu; không tải lại/đăng toàn bộ nội dung khi chưa có quyền.

## Mốc câu và phát video

- Kiểm tra mốc trên **đúng phiên bản video sẽ phát**. Bản có phụ đề và không phụ đề có thể
  khác mốc — kiểm tra riêng từng bản; lệch nhau thì lưu mốc riêng (ví dụ `subOffset`
  hoặc cửa sổ riêng `playWindow`/`subWindow` như pilot CS3-0107).
- Nghe từng câu phải đủ âm đầu/cuối, không lấn sang câu đáp kế tiếp. Ghi chú sai số
  **không** thay cho việc sửa đoạn bị cắt. Không chia chính xác được thì nghe cả lượt
  hoặc cả đoạn (`segmentMode: 'clip'`), không cắt đoạn mạo hiểm.
- Trước phát hành phải phát thử thật trong app: thời gian phát thực sự tăng, tua/dừng
  hoạt động. Báo rõ phần chưa nghe đối chiếu hoặc chưa thử trên thiết bị thật.
- Không phát chồng video với loa tra từ; chỉ tải trình phát đang dùng (một trình phát tại một thời điểm).

## Hoạt động học (module Thực hành hiện có)

Trình tự 5 bước: **Chuẩn bị → Nghe hiểu → Xem lời thoại → Nhắc lại → Tự nói.**

- Lượng nội dung theo độ dài: video rất ngắn (khoảng ≤4 câu) chỉ gồm một câu hỏi hiểu chính,
  đối chiếu lời thoại, nhắc lại một câu và một nhiệm vụ tự nói. Video dài hơn có thể thêm
  câu hỏi chi tiết hữu ích. Không tạo câu hỏi lặp ý chỉ để đủ số.
- Giữ các hành vi chuẩn: câu hỏi hiện trước, đáp án mở độc lập từng câu; nghĩa Việt bật/tắt
  theo vùng đọc; bấm từ hiện hộp nghĩa + Pinyin + loa; **không phủ Pinyin toàn bộ transcript**;
  tự nói phù hợp thể loại (không ép mọi video thành đóng vai — video nhúng không đóng vai,
  app ghi rõ lý do).
- Thống kê viết đúng bản chất: “X/N từ xuất hiện đã xác minh”, không gọi là số từ đã thành thạo.

## Dữ liệu và mở rộng

- Thực hành gắn với **ID bài ổn định** (từ đầu trang của bài) và danh sách từ thực tế của bài;
  không hard-code bài pilot hay số 24. Bài cuối cấp ít từ hơn vẫn phải chạy đúng.
- Danh mục nhẹ: `data/practice/manifest.json` (mỗi mục: khóa bài, ID từ neo để mở trực tiếp,
  đường dẫn file dữ liệu, phiên bản dữ liệu). Dữ liệu chi tiết theo bài nằm ở file riêng
  (bài pilot giữ nguyên `data/listening-pilot.json`), app chỉ tải file của bài đang mở.
- Video được nhiều bài dùng có thể dùng chung thông tin nguồn; độ phủ và hoạt động
  phải tính riêng đúng từng bài.
- Tiến độ học: một kho lưu chung, bên trong tách theo từng bài rồi từng video;
  nâng phiên bản dữ liệu của một bài phải di trú bucket của các video còn trong bộ,
  không xóa trắng (mẫu: di trú v5 → v6 của pilot).

## Quy trình làm việc và điểm dừng

### Đợt bổ sung Thực hành (đang hiệu lực từ 2026-10-29)

- Tạm dừng biên soạn từ mới. Đi theo thứ tự bài: HSK1 bài 1 → hết HSK1 → các cấp tiếp theo,
  chỉ làm bài đã xong từ vựng mà chưa có Thực hành đạt chuẩn.
- Hoàn thiện trọn một bài (tuyển nguồn → biên soạn → kiểm thử → phát hành → ghi checkpoint)
  trước khi mở bài dang dở khác; một phiên có thể xong nhiều bài nếu chất lượng giữ vững.
- Gần giới hạn phiên: lưu checkpoint chính xác và báo phần còn lại, không hạ chất lượng để chạy số.

### Khi biên soạn từ vựng (ngoài đợt bổ sung)

Sau khi một bài hoàn tất từ vựng: kiểm tra và lưu kết quả → **dừng trước từ đầu tiên của bài kế tiếp**
→ thông báo và hỏi đúng ý: “Bài [cấp/bài] đã hoàn tất từ vựng. Bạn xác nhận làm phần Thực hành
hội thoại/video cuối bài này chứ?” → chỉ làm Thực hành khi được xác nhận → Thực hành xong thì
báo cáo và chờ lệnh tiếp theo. Batch từ vựng không được vượt ranh giới bài; cắt batch ở cuối bài.

### Ý nghĩa lệnh “Tiếp tục” (theo trạng thái ở checkpoint)

- Đang trong đợt bổ sung Thực hành: làm tiếp bài đang dở, rồi các bài đủ điều kiện theo thứ tự.
  Không chuyển sang biên soạn từ mới.
- Đang biên soạn dở từ vựng một bài: làm tiếp bài đó và dừng ở cuối bài.
- Đang chờ xác nhận làm Thực hành sau khi xong từ vựng một bài: “Tiếp tục” = xác nhận làm
  Thực hành của bài vừa xong.
- Đang làm dở Thực hành: hoàn thiện phần đó.
- Thực hành đã xong và đã báo cáo, không còn trong đợt bổ sung: “Tiếp tục” lần kế mới cho phép
  bắt đầu từ vựng bài tiếp theo.
- Một lượt “Tiếp tục” không vượt qua nhiều điểm dừng.
