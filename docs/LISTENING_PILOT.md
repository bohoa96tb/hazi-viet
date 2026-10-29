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

## Học liệu chính của pilot (v4 — video người thật)

Từ v4 (theo phản hồi của người dùng: không hài lòng với giọng AI), bản nghe chính là video người thật:

- **Chinese Station CS4-1108 “バスで行けますか？”** của nhóm 関西大学中国語教材研究会 (Kansai University),
  kênh YouTube `cnstation`. Hội thoại 4 câu quay ngoài trời, hai diễn viên thật: một bạn nữ hỏi đường tới ga tàu,
  một người qua đường trả lời. Trang nguồn: https://www.ch-station.org/cs4-1108/
- Các bản video (đều đã kiểm tra trực tiếp trên YouTube ngày 29/10/2026: phát được, có nút Nhúng):
  bản đầy đủ `a8XxWbPTy68` (1:03, hội thoại phát 3 lần), bản phụ đề chữ Hán `kn9OLtuJ9qk` (0:14),
  bản phụ đề Pinyin `fwIufoOS5QY` (0:14), bản phụ đề tiếng Nhật `TU0yi2Zg6dc` (0:14),
  bản không phụ đề `2qj-clU55zY` (0:14). App nhúng bản **không phụ đề** làm bản nghe chính
  (nghe thuần ở các bước đầu), bước Xem lời thoại có nút chuyển sang bản phụ đề chữ Hán cùng bản dựng.
- Lời thoại chép đúng nguyên văn trang nguồn và đối chiếu phụ đề chữ Hán cháy hình của chính video
  (hai câu đầu được xác nhận nguyên văn trên phụ đề; toàn bộ 4 câu khớp trang nguồn và bản phụ đề Pinyin).
  Bản dịch tiếng Việt, câu hỏi, giải thích do dự án biên soạn theo đúng nội dung video.
- Mốc từng câu đã đối chiếu trên bản phụ đề chữ Hán bằng cách tua từng bước và đọc đồng hồ trình phát:
  câu 1 ≈ 0–3s, câu 2 ≈ 3–5s, câu 3 ≈ 5–7,5s, câu 4 ≈ 7–11,5s; sai số khoảng ±1 giây (trình phát hiển thị giây nguyên).
  Bốn bản 14 giây dùng chung một bản dựng nên mốc áp dụng cho bản không phụ đề; giới hạn ±1 giây được ghi trong app.
- Độ phủ tính lại từ transcript của video: **4/24** — 公里 （有两公里多）, 公交车 （可以坐公交车去吗）,
  地铁 và 地铁站 （坐地铁去更方便，前面就是地铁站）. Không tính từ trong câu mẫu/bài tập.
- Quyền sử dụng: trang nguồn ghi rõ nhóm tác giả giữ bản quyền, cấm dùng thương mại,
  khuyến khích dùng素材 để tạo học liệu mới và yêu cầu ghi credit khi tái phân phối trên mạng.
  App là học liệu miễn phí: nhúng video chính thức qua YouTube IFrame API, ghi credit đầy đủ trong app và ở đây,
  không tải video về, không lưu trữ lại file video.
- Âm thanh hỗ trợ riêng: loa tra từ trong bước Xem lời thoại là giọng đọc của thiết bị (TTS),
  được ghi chú rõ trong app là hỗ trợ tra từ — không phải giọng trong video.
- Đóng vai: KHÔNG áp dụng cho video nhúng (trình phát không dừng đúng vai theo câu một cách tin cậy),
  nên bước Tự nói chỉ gồm nhắc lại (bước 4) + nhiệm vụ thay thông tin; app ghi rõ lý do cho người học.
- Ứng viên dự phòng đã kiểm tra: Growing Up with Chinese L17 (CCTV; video YouTube `1KCix1MTFno`,
  đoạn hội thoại 1:06–3:27 theo transcript ở hanyufanting.com) — người thật đóng, 3 từ （公交车/地铁/地铁站）,
  nhưng nhiều câu vượt HSK 2 （睡过头、十字路口、堵…), nhịp nhanh, và điều kiện dùng lại kém rõ ràng hơn; không chọn.

## Bộ video của pilot (v5 — tối đa 5 video, ưu tiên phủ thêm từ chưa xuất hiện)

Từ v5 (quy tắc mới của người dùng: mỗi bài tối đa 5 video có sẵn; mỗi video thêm phải bổ sung
ít nhất một từ chưa xuất hiện trong các video đã chọn; không chọn video kém phù hợp để đủ số):

| Video | Tình huống | Từ của bài (theo transcript của chính video) | Từ mới | Thời lượng |
|---|---|---|---|---|
| CS4-1108 | Hỏi đường đi ga tàu | 公里、公交车、地铁、地铁站 | 4 | 14 giây |
| CS4-1206 | Gọi taxi giúp ở lễ tân | 出租车 （一辆出租车）, 辆 | +2 | 10 giây |
| CS4-3401 | Giao thông quanh trường đại học | 交通 （交通非常方便）, 分钟 （不到十分钟）; lặp 公交车/地铁/地铁站 | +2 | 55 giây |
| CS4-3106 | Chào tạm biệt trước khi về nước | 一路平安 （祝你一路平安） | +1 | 27 giây |
| CS4-2309 | Rút tiền ở ngân hàng | 护照 （护照也可以） | +1 | 29 giây |

- **Tổng độ phủ của bộ video: 10/24 từ** (không cộng trùng). 14 từ còn thiếu — 腿、骑、一路顺风、人口、
  公共汽车、公路、司机、椅子、爬山、自行车、行人、车辆、道路、骑车 — hiện trong vùng thu gọn của module.
- Cả 4 video thêm đều của Chinese Station (cùng nhóm tác giả, cùng điều kiện sử dụng như video 1):
  trang nguồn có transcript nguyên văn và các bản theo loại phụ đề; app nhúng bản không phụ đề,
  bước Xem lời thoại chuyển được sang bản chữ Hán cùng bản dựng.
  ID các bản: 1206 — không phụ đề `rs5AjSsxeD0`, chữ Hán `OwZNf6EtWHs`, đầy đủ `-8e17A-NzaY` (52 giây, phát 3 lượt);
  3401 — `2v5qr4gUPTE` / `XuouQ2gbZ_0` / đầy đủ `a1YSZblpTLo`;
  3106 — `8tdsPnGdT1g` / `YEJR2T58NNw` / đầy đủ `JRbn4nm7EHQ` (trang nguồn ghi thiếu một bản nên đã mở cả 4 ID ứng viên để xác định đúng bản: Pinyin là `lenoj57GPho`, tiếng Nhật `Rb2wgVm5yXU`);
  2309 — `Sb--CARlN5w` / `irVAfFuuRAw` / đầy đủ `s4SIU4mDKVI`.
- Kiểm chứng (29/10/2026, mở và nghe trực tiếp trên YouTube): cả 4 video phát được, diễn viên thật,
  âm thanh tiếng Trung rõ; transcript khớp phụ đề chữ Hán cháy hình. Hai đính chính theo video:
  CS4-2309 câu 8 là “一点儿也听不出来” (video có 儿化, trang nguồn không); CS4-2309 có khoảng lặng
  hành động đưa hộ chiếu ~11–16 giây giữa câu 4 và câu 5. Mốc câu đo trên bản chữ Hán bằng cách tua
  và đọc đồng hồ trình phát (sai số ±1 giây; một số câu kề nhau suy từ khung phụ đề lân cận, tới ±2 giây —
  ghi rõ ở trường `timingNote` của từng video trong dữ liệu).
- Lưu ý nhúng: mở trực tiếp địa chỉ `youtube.com/embed/<ID>` trong tab trần báo “Lỗi 153” cho cả video cũ
  và mới — đây là lỗi cấu hình khi thiếu ngữ cảnh trang, không phải thông báo tắt nhúng: hộp Chia sẻ của
  YouTube vẫn cấp mã nhúng, trang nguồn tự nhúng các ID này, và video 1 đã phát nhúng bình thường trên
  site live ở v4. Sau phát hành v5, cả 5 video được phát thử ngay trong app trên site live để kết luận cuối.
- Ứng viên đã khảo sát nhưng KHÔNG chọn (chi tiết trong `surveyLog` của dữ liệu): CS4-4118 kịch bản xe đạp
  rất khớp nhưng chưa từng quay video （未撮影）; CS4-0511/CS4-1210 trùng 分钟 với CS4-3401; CS4-2306 là
  phương án thay thế cho 护照； CS4-2510 （腿） đạt nhưng hết 5 vị trí; CS3-0107 có 公共汽车 nhưng định dạng
  series cũ và tình huống gần trùng video 1. 司机 không tính được: trong các hội thoại taxi của Chinese
  Station, 司机 chỉ là tên vai, không được nói thành lời; phỏng vấn tài xế của Mandarin Corner quá dài/khó.
- Giao diện v5: danh sách video theo tình huống ở đầu module (tiêu đề, thời lượng, từ của bài, số từ mới,
  trạng thái đã học); mỗi video chạy đủ 5 bước với số câu hỏi theo độ dài (video 4 câu: 1 ý chính + 2 chi tiết);
  tiến độ (bước, hoạt động) lưu **riêng từng video** trong cùng khóa `hanzi-viet-listen-v2` (trường `videos`
  theo ID video); chỉ **một** trình phát YouTube duy nhất tồn tại — chuyển video là nạp lại đúng video đó,
  không tải trước cả 5.

## Học liệu luyện thêm (giữ từ v2/v3, không còn là bản chính)

- Hội thoại tự biên soạn “Đi sân bay bằng gì？” (11 câu) với 11 file MP3 giọng đọc máy (AI) tạo sẵn
  ở `data/audio/listening-pilot/` (tổng tiếng nói 31,7 giây) — chuyển xuống mục “Luyện thêm” trong cùng
  màn hình Thực hành, ghi nhãn rõ “tự biên soạn / giọng đọc máy (AI)”, độ phủ riêng của đoạn này 6/24.
  Dữ liệu và file giữ nguyên, không xóa.

## Kiến trúc tích hợp (từ v3, cập nhật v4)

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
  Từ v5: tiến độ bước/hoạt động lưu riêng theo từng video (`videos[<id video>]`), kèm chỉ số video đang học;
  tự đánh giá và cờ lưu vẫn tính chung cho cả bài. Nâng phiên bản học liệu (v4 → v5) đặt lại tiến độ pilot một lần.
- Âm thanh dùng một điều phối chung: `stop()` của app dừng cả trình phát pilot;
  loa tra từ tạm dừng bài nghe; phát từng câu theo file nên mốc câu chính xác tuyệt đối;
  đóng vai dùng chính các file từng câu (app phát vai còn lại, dừng ở câu của người học).
- Mục “Nghe” ở thanh dưới (nghe rảnh tay/ôn từ) không thay đổi trong đợt này.

## Giới hạn đã biết

- Mốc câu của 4 video mới (v5) đo trên bản phụ đề chữ Hán của chính video; một số câu kề nhau được suy từ khung phụ đề lân cận nên sai số có thể tới ±2 giây (đã ghi ở từng video). Nút nghe theo câu là công cụ đối chiếu, không phải mốc tuyệt đối.
- Chưa kiểm chứng bằng tai chất lượng phát âm giọng AI trên thiết bị thật; giọng máy có thể chưa hoàn hảo ở vài từ.
- Chưa kiểm tra bố cục trên điện thoại thật (đã kiểm qua trình duyệt mô phỏng và trang live trên trình duyệt máy tính).
- Không cam kết nghe nền khi tắt màn hình.
- Đóng vai không ghi âm, không chấm phát âm — đúng phạm vi pilot.
