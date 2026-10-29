# Pilot nghe–nói theo bài — tài liệu thiết kế, khảo sát nguồn và quyết định

Tài liệu này lưu ghi chú biên tập của pilot “Thực hành nghe–nói theo bài”.
Màn hình học chỉ hiển thị nhãn nguồn/giọng ngắn gọn và thông tin cần cho người học;
toàn bộ nhật ký khảo sát và lý do chọn nguồn nằm ở đây và trong `data/listening-pilot.json`
(trường `surveyLog`, `revisionNote`), không đưa lên giao diện học.

## Bài pilot

- Bài HSK 2 chứa từ 公共汽车 (ID ổn định của từ neo: `hz-h2-0ec2a615954f`), 24 từ (ordinal 759–782).
- Gắn kết bằng danh sách ID từ đầy đủ của bài (`lesson.wordIds` trong `data/listening-pilot.json`),
  có kiểm thử đối chiếu với dữ liệu khóa học; không xác định bài bằng số trang hiển thị.
- Trạng thái: một bài duy nhất, chờ người dùng đánh giá trước khi mở rộng.

## Căn cứ sư phạm (tham khảo, áp dụng có chọn lọc cho người Việt học tiếng Trung HSK1–2)

- British Council — TeachingEnglish, khung bài nghe và hoạt động trước khi nghe
  (https://www.teachingenglish.org.uk/professional-development/teachers/teaching-knowledge-database/n-p/pre-listening):
  hoạt động trước khi nghe gồm khơi gợi bối cảnh, dạy trước ít từ thật sự cần, làm rõ nhiệm vụ.
  Áp dụng: Bước 1 chỉ giới thiệu tình huống, một mục tiêu nghe và tối đa 5 từ cần thiết;
  không đưa đáp án hay toàn bộ bản dịch trước.
- Cùng hệ thống tài liệu của British Council (bài nghe mẫu “Learning Languages”) tổ chức
  nghe theo ý chính trước, chi tiết sau, rồi liên hệ trải nghiệm bản thân.
  Áp dụng: Bước 2 tách hai lượt — lượt 1 một câu ý chính (không đòi chi tiết nhỏ),
  lượt 2 mới hỏi 2–3 chi tiết có trong bản thu, mỗi đáp án mở độc lập.
- Paul Nation (Victoria University of Wellington), nguyên lý bốn mạch học
  (meaning-focused input / meaning-focused output / language-focused learning / fluency development;
  xem “How vocabulary is learned” và các bài về four strands): học qua nghe cần tài liệu phần lớn quen thuộc,
  người học muốn hiểu nội dung; nói là mạch đầu ra có ý nghĩa dùng lại chính chất liệu vừa nghe.
  Áp dụng: hội thoại chỉ dùng từ/cấu trúc HSK 1–2 quen thuộc; Bước 4 nhắc lại câu mẫu,
  Bước 5 đóng vai và thay thông tin để nói về bản thân; transcript và tra từ là hỗ trợ sau khi nghe,
  Pinyin không phủ toàn bộ transcript.
- Đây là căn cứ thiết kế tham khảo, không phải “tiêu chuẩn bắt buộc”; các hoạt động gốc vốn cho tiếng Anh
  đã được rút gọn cho người học tự học trên điện thoại.

## Khảo sát nguồn (tóm tắt; chi tiết từng mục trong `surveyLog` của dữ liệu)

| Nguồn | Kết quả | Quyết định |
|---|---|---|
| ChineseFor.Us “How Far Is The Airport?” | Trang tổng hợp nhiều hội thoại; script chữ Hán của hội thoại sân bay bị khóa Premium; điều kiện phát cho người chưa mua không xác minh được. Bản v1 từng gắn nhầm câu của hội thoại khác (giáo trình) vào trang này. | Không dùng làm bài chính; chỉ ghi nhận trong nhật ký. |
| ChinesePod (các hội thoại đi lại) | Nội dung phù hợp nhưng truy cập chính thức phải trả phí; bản sao lưu hành là của bên thứ ba. | Tham khảo, không dùng. |
| Popup Chinese “The Beijing Subway” | Transcript công khai nhưng không có trình phát nhúng hợp lệ để điều khiển trong app; nhiều 儿化 và đoạn vượt HSK 2; chỉ gặp 1 từ của bài. | Không dùng. |
| italki — podcast 中文每日一练 (đi làm) | Nội dung phù hợp, transcript công khai, nhưng chỉ phát tại italki, không điều khiển được trong app; loại giọng chưa xác minh. | Để ở “Nguồn liên quan” trong app. |
| ChineseClass101 “Talking About Transportation” | Hội thoại chính dùng 电车 (không phải từ của bài); các câu luyện là câu rời. | Không dùng. |
| Mandarin Corner / Mandarin Bean / Chinese Voices / CTCFL (Oxford) | Qua hai vòng khảo sát không tìm được đoạn ngắn HSK 2 về đi lại có transcript khớp bản thu và cách dùng hợp lệ trong app. | Không dùng. |
| Truyện YouTube (bản v1 từng gắn) | Khoảng 15 phút cho một từ, không có mốc đoạn đã xác minh. | Đã gỡ ở v2. |

Kết luận: không có bản thu người thật có sẵn nào đạt đồng thời các điều kiện
(đúng chủ đề và nhóm từ, vừa trình độ, transcript khớp, truy cập rõ ràng, dùng được cho đủ
quy trình nghe–hiểu–đối chiếu–tự nói). Theo điều kiện dự phòng đã thống nhất với người dùng,
pilot tự biên soạn hội thoại và tạo audio sẵn bằng giọng đọc máy (AI), ghi nhãn minh bạch.
Đây là quyết định cho pilot này, không phải mặc định cho các bài sau: mỗi bài mới phải khảo sát lại.

## Học liệu chính của pilot

- Hội thoại tự biên soạn “Đi sân bay bằng gì？”, 11 câu, hai vai nam/nữ, tình huống chọn phương tiện đi sân bay.
- Audio: 11 file MP3 tạo sẵn ở `data/audio/listening-pilot/line-01.mp3` … `line-11.mp3`
  (hai giọng đọc máy AI hỗ trợ tiếng Trung của công cụ tạo giọng mà dự án được phép dùng);
  tổng tiếng nói 31,7 giây đo từ file, nghe liền mạch khoảng 35 giây.
  App không gọi API tạo giọng khi người học bấm nghe; không lưu khóa API ở frontend.
- Loại giọng ghi trong app: “Giọng đọc máy (AI)” — trạng thái đã xác minh theo nguồn tạo file,
  không suy diễn người thật/AI cho bất kỳ nguồn ngoài nào khi chưa có căn cứ.
- Transcript là chính văn bản đã dùng để tạo audio nên khớp tuyệt đối; bản dịch tiếng Việt tự biên soạn.
- Độ phủ đã xác minh từ transcript: 6/24 từ （地铁、地铁站、分钟、公共汽车、出租车、护照）,
  mỗi từ có câu chứa nguyên văn trong dữ liệu (`lines[].words` + `lines[].zh`) và được kiểm thử máy đối chiếu.
  18 từ còn lại liệt kê trong app ở mục thu gọn; không ép đủ 24 từ.
- Quyền sử dụng: hội thoại, bản dịch và file audio đều do dự án tự tạo cho pilot này.

## Kiến trúc tích hợp (từ v3)

- Một nơi thực hành duy nhất: màn hình `#practice`. Khi nhóm từ đang mở trùng đúng bài pilot
  (khớp toàn bộ danh sách ID), màn hình hiển thị: đầu bài (tên bài, tình huống, mục tiêu,
  bản nghe chính, nút Bắt đầu, nút về bảng từ) → module 5 bước
  (Chuẩn bị → Nghe hiểu → Xem lời thoại → Nhắc lại → Tự nói) → khu “Hội thoại mẫu”
  (module hội thoại sẵn có `js/conversation.js` với dữ liệu `data/vocabulary/conversations-demo.json`,
  ghi rõ tự biên soạn + giọng tổng hợp của thiết bị, không phải bài chính).
- Bảng từ chỉ còn lối vào ngắn (`Nghe–nói theo bài` + nút mở Thực hành).
- Bài khác: màn hình Thực hành giữ nguyên hành vi cũ (hội thoại mẫu liên quan hoặc thông báo chưa có hội thoại riêng).
- Mở trực tiếp/tải lại: tham số `?practice=<id từ neo>` (tương thích ngược `?listen=`) đặt đúng nhóm từ của bài
  và vào thẳng `#practice`; khi mở Thực hành của bài pilot từ bảng từ, URL được cập nhật tham số này.
- Tiến độ lưu cục bộ theo ID bài + phiên bản học liệu (khóa `hanzi-viet-listen-v2`):
  bước hiện tại, hoạt động đã hoàn thành, tự đánh giá, cờ lưu để ôn lại.
  Dữ liệu lưu của bản cũ không có ID bài/phiên bản sẽ được đặt lại một lần, không đụng tiến độ học từ vựng.
- Âm thanh dùng một điều phối chung: `stop()` của app dừng cả trình phát pilot;
  loa tra từ tạm dừng bài nghe; phát từng câu theo file nên mốc câu chính xác tuyệt đối;
  đóng vai dùng chính các file từng câu (app phát vai còn lại, dừng ở câu của người học).
- Mục “Nghe” ở thanh dưới (nghe rảnh tay/ôn từ) không thay đổi trong đợt này.

## Giới hạn đã biết

- Chưa kiểm chứng bằng tai chất lượng phát âm giọng AI trên thiết bị thật; giọng máy có thể chưa hoàn hảo ở vài từ.
- Chưa kiểm tra bố cục trên điện thoại thật (đã kiểm qua trình duyệt mô phỏng và trang live trên trình duyệt máy tính).
- Không cam kết nghe nền khi tắt màn hình.
- Đóng vai không ghi âm, không chấm phát âm — đúng phạm vi pilot.
