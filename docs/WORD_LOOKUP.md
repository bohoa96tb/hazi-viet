# Tra nghĩa tại chỗ theo từ (bấm từ xem nghĩa) — cách hoạt động và cách bổ sung dữ liệu

Từ 2026-10-29, vùng đọc trong bài học (câu ví dụ, câu đối chiếu và câu sửa, đáp án tham
khảo, câu mẫu tự dùng, cụm kết hợp, thẻ câu bài nền, lời giải thích có tiếng Trung và
lượt hội thoại) không còn gắn liên kết Hanzi lên từng chữ. Thay vào đó, văn bản tiếng
Trung được tách thành đơn vị có nghĩa; người học bấm vào từ/cụm từ để mở hộp nghĩa
ngay tại chỗ. Phân tích Hanzi chỉ mở từ nút “字 Phân tích chữ” trong hộp nghĩa (từ
nhiều chữ thì chọn chữ trước). Đầu mục từ, ô nhập liệu, nút điều khiển và đáp án chưa
mở không bị can thiệp.

## Thành phần

- `js/word-lookup.js` — bộ tách từ và tra nghĩa dùng chung, có bộ nhớ đệm theo câu.
- `data/word-overrides.json` — dữ liệu ghi đè đã biên soạn (xem dưới).
- `js/vocabulary.js` — hàm hiển thị `hanziWords`/`richWords`, hộp nghĩa `#wzPopup`,
  nút loa (dùng hệ thống TTS hiện có), nút “Xem cách dùng” (mở đúng bài theo ID thật)
  và nút mở phân tích Hanzi (giữ tham số quay lại `word`/`step` hoặc
  `conversation`/`turn` như liên kết chữ trước đây).

Hộp nghĩa luôn hiện một dòng Pinyin có dấu thanh ngay dưới từ (17px), lấy từ dữ liệu
của đúng từ đang chọn: Pinyin tác giả trong phần giới thiệu của bài (từ nhiều cách
đọc thì liệt kê tất cả, nối bằng “ / ”; ghi đè theo câu có thể chỉ định `pinyin`
riêng cho gloss), nếu không có mới suy từ từ điển Pinyin theo đúng đơn vị đã tách.
Thiếu dữ liệu thì bỏ dòng Pinyin, không hiện chuỗi rỗng hay “undefined”. Dòng Pinyin
này độc lập với nút Ẩn/Hiện Pinyin của phần câu trong bài — yêu cầu này thay thế quy
định trước đây là hộp nghĩa không cần Pinyin.

## Thứ tự ưu tiên dữ liệu

1. **Ghi đè theo câu** trong `word-overrides.json`: cách tách và nghĩa theo ngữ cảnh
   đã biên soạn cho đúng câu đó.
2. **Từ vựng của khóa học**: mọi đầu mục là một mục từ điển kèm nghĩa tiếng Việt do
   app biên soạn; nếu một chữ Hán chỉ ứng với đúng một bài thì hộp nghĩa có nút
   “Xem cách dùng”. Nếu ứng với nhiều bài, app không đoán — hộp nghĩa ghi rõ và
   không hiện nút.
3. **Mục từ bổ sung** trong `words` của file ghi đè (cụm thông dụng chưa có bài riêng).
4. **Từ điển Pinyin** (`data/pinyin-dict.json`, từ CC-CEDICT): chỉ làm bằng chứng
   tách từ. Từ chỉ có ở đây được báo trung thực là “Chưa có nghĩa tiếng Việt trong
   dữ liệu của app”, không bịa nghĩa.

Bộ tách từ dùng quy hoạch động trên từng đoạn chữ Hán (không bao giờ ghép qua dấu
câu), chấm điểm ưu tiên mục dài hơn và mục có nghĩa — vì vậy 公共汽车 thắng
公共 + 汽车 và 打电话 thắng 打 + 电话. Cách tách được đệm theo từng câu; rê chuột
không tách lại.

## Cách bổ sung khi biên soạn

### Thêm cụm từ hoặc nghĩa còn thiếu

Thêm vào `words` của `data/word-overrides.json`:

```json
"words": {
  "花钱": { "meaning": "tiêu tiền" }
}
```

### Ghi đè một câu cụ thể

Thêm vào `sentences`, khóa là nguyên văn câu (đúng từng dấu câu):

```json
"sentences": {
  "我花了十块钱。": {
    "segments": ["我", "花", "了", "十", "块", "钱", "。"],
    "glosses": {
      "花": { "meaning": "tiêu; tốn (tiền)", "context": "Trong câu: 花了十块钱 = đã tiêu mười tệ" }
    }
  }
}
```

Quy tắc:

- `segments` nối lại phải bằng đúng nguyên văn câu (cả dấu câu là phần tử riêng);
  nếu không khớp, app bỏ qua ghi đè và tách tự động.
- Chỉ gắn nhãn “Trong câu” (`context`) khi nghĩa ngữ cảnh đã được biên soạn/xác minh.
  Nghĩa lấy từ từ điển luôn được hộp nghĩa ghi là “Nghĩa thường gặp”.
- Sau khi sửa file ghi đè, chạy `node tools/vocabulary/test-word-lookup.mjs`.

## Giới hạn đã biết

- Cụm tách rời không liên tục (kiểu 打了个电话， 给他打个电话） hiện được tách thành
  các phần liên tục; nghĩa từng phần vẫn tra được nhưng chưa gộp thành một cụm.
- Hội thoại: mở phân tích chữ từ hộp nghĩa chưa mang tham số quay lại theo lượt
  hội thoại (trang Hanzi vẫn mở đúng chữ).
- Nghĩa theo ngữ cảnh chỉ có ở câu đã biên soạn ghi đè; ngoài ra app chỉ hiện nghĩa
  thường gặp và ghi rõ nhãn.
