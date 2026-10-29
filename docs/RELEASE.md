# Giai đoạn C đợt batch-082 → batch-084 — biên soạn mới ordinal 823–852 — đã phát hành và xác minh Pages

- Merge commit: 8ad9dde3abfc3495d0787ab20619f6901406b3f4 (nhánh main, PR #32); nhánh biên soạn: `a42ff57` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `dc2a26f` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-082 ordinal 823–832 （晚安 晚餐 筷子 菜单 西餐 食物 饺子 科 练 组）, batch-083 ordinal 833–842 （队 体育 健康 国际 图片 地球 影片 成绩 手表 排球）, batch-084 ordinal 843–852 （新闻 明星 球队 球鞋 科学 篮球 网球 英文 英语 运动）. completedCount 822 → 852/2.224, còn 1.372; toàn khóa 862/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 14, trung bình 16, khó 0. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Sửa danh mục: 影片 “bản sao của phim” → “phim; bộ phim” (sai hẳn); 图片 “bức tranh” → “hình ảnh; tranh ảnh” (quá hẹp); 食物 “thực phẩm” → “thức ăn; đồ ăn” (thực phẩm đóng gói/sản phẩm là 食品）; 体育 bổ sung “thể thao” cạnh “thể dục”; 明星 ghi rõ “ngôi sao (người nổi tiếng)” tách khỏi 星星 sao trời (560).
- Điểm nội dung: 晚餐 (824) khép bộ ba bữa theo giờ 早/午/晚餐 và luật 餐 trên giấy / 饭 trong nhà kiểm đủ ba lần (822/817/824); 西餐 (827) chốt trục ẩm thực theo nước với 中餐 (813) từ cả hai phía. Nhóm tập thể ba tầng 组 (832, nhiệm vụ) — 队 (833, hàng ngũ) — 球队 (845, sân bóng) chốt lẫn nhau cả hai chiều. Nhóm thể thao: 体育 (834, lĩnh vực/môn học) đối 运动 (852, hoạt động/môn chơi) chốt hai phía; ba môn bóng có lưới/rổ 排球 （打 tay, lưới, 842) — 篮球 (rổ, dẫn bóng, 848) — 网球 (vợt, 849) chốt lẫn nhau; 球队/球鞋 neo vào họ 球. Cặp ngôn ngữ 英文 (850, văn — sách báo thư) đối 英语 (851, ngữ — nói nghe giao tiếp) chốt hai phía. 科 (830, gốc phân ngành) và 科学 (847, hệ thống + tính từ “có căn cứ”) soi gương hai chiều; 练/练习 tách động từ kỹ năng khỏi bài tập; 图片 đặt 照片 (556) vào quan hệ bao hàm họ/loài; 成绩 tách kết quả tổng thể khỏi con số 分数； 健康 tách trạng thái khỏi vật chứa 身体； 地球 tách hành tinh khỏi xã hội 世界； 新闻 tách tin công bố khỏi tin cá nhân 消息。
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi), không phải áp dụng lại. Kiểm thử: process-batch verify PASS (852/2.224; 862 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-084.
- Nhánh sao lưu `backup/phasec-082-084-20261029` ở main HEAD `d35379a`.
- Pages run [40791521793](https://github.com/bohoa96tb/hazi-viet/actions/runs/40791521793) completed/success đúng HEAD 8ad9dde (run #283).
- Tệp khóa học live: 2.234 mục, 8.527.888 bytes, SHA-256 34fe14291764961a47edf940cc84b632343f383b3c43348b56aa5220d425d697, khớp byte với bản đã kiểm; progress live 852/2.224. Tiếp theo: Giai đoạn C từ ordinal 853 （音乐）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-079 → batch-081 — biên soạn mới ordinal 793–822 — đã phát hành và xác minh Pages

- Merge commit: 7e1ed12738203671f23b738b517d365c6f85a676 (nhánh main, PR #31); nhánh biên soạn: `95e53ac` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `e74c15b` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-079 ordinal 793–802 （也许 但是 可是 可能 好像 或者 故意 有一点儿 比如说 相同）, batch-080 ordinal 803–812 （而且 能够 虽然 喂 碗 米 蛋 面 饱 鸡）, batch-081 ordinal 813–822 （中餐 做法 做饭 午睡 午餐 味道 外卖 快餐 方便面 早餐）. completedCount 792 → 822/2.224, còn 1.402; toàn khóa 832/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 13, trung bình 17, khó 0. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Sửa danh mục: 中餐 “bữa trưa” → “món ăn Trung Quốc; ẩm thực Trung Hoa” (sai hẳn — bữa trưa là 午餐 817, hai bài đối chiếu nhau hai phía); 米 “mét” → “gạo; mét” (bổ sung nghĩa chính bị thiếu); 面 “mặt” → “mì; bột; mặt, bề mặt” (bổ sung cả nhóm nghĩa ăn uống); 做法 “cách xử lý” → “cách làm” (mở rộng vùng nấu ăn); 可能 bổ sung vai khả thi, 不可能是 dạng phủ định đặc trưng.
- Điểm nội dung: batch-079 khép chuỗi bốn chữ “nhưng” bắt đầu từ 783 （但 gọn, 不过 nhẹ, 但是 chuẩn trung tâm, 可是 khẩu ngữ cảm xúc) và dựng nhóm phỏng đoán ba tầng （也许 đoán nhẹ thuần trạng từ, 可能 đa năng có phủ định 不可能, 好像 phán đoán qua dấu hiệu đối lập 像 so sánh hai vật ở 713); 或者/还是 phân theo loại câu kể/hỏi; 故意/特意 phân theo sắc thái trách/khen; 有一点儿 dạy khuôn tách đôi （有点儿 + tính từ hơi-chê, 一点儿 + danh từ đo lượng) bằng targetParts/targetForms như từ tách được; 而且 (803) khép khuôn 不但…而且 của 785 và đối lập 但是 cùng vị trí khác chiều logic; 虽然…但是 dạy đủ cặp nhượng bộ (thói quen bỏ 但是 của người học bị chặn ngay trong bẫy). Nhóm ăn uống batch-081 dựng hai trục trực giao: bữa theo GIỜ （早餐/午餐/晚餐 — 餐 đầy đủ, 饭 đời thường) và món theo NƯỚC （中餐/西餐）, trục mì ba tầng （面/面条/方便面）, trục nhận đồ/loại đồ （外卖 giao đến / 快餐 loại nhanh), 做法/做饭 danh/động. Làm (114) được nối lại qua 做饭/做法。
- Ghi chú hạ tầng của đợt: lần phát hành này ban đầu bị chặn khoảng nửa ngày (tối 28 → sáng 29/10) vì đường truyền của công cụ kết nối GitHub liên tục đứt giữa các lệnh đẩy dài (lệnh ngắn như tạo nhánh sao lưu vẫn qua) — toàn bộ thay đổi được giữ nguyên trong một commit cục bộ đã kiểm chứng, và khi đường truyền hồi phục sáng 29/10 thì phát hành hoàn tất trong vài phút theo đúng quy trình thường lệ. Bộ hàm sinh bài hazi_lib.py đã chuyển khỏi /tmp (bị xóa mỗi lần thay VM) vào `~/workspace/hazi-tools/` — là nơi bền vững; các tệp đường dẫn push cũng để ở đó.
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi), không phải áp dụng lại. Kiểm thử: process-batch verify PASS (822/2.224; 832 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-081.
- Nhánh sao lưu `backup/phasec-079-081-20261028` ở main HEAD `1bbde23`.
- Pages run [40778150486](https://github.com/bohoa96tb/hazi-viet/actions/runs/40778150486) completed/success đúng HEAD 7e1ed12 (run #281).
- Tệp khóa học live: 2.234 mục, 8.304.634 bytes, SHA-256 f01b4041d7ea270af7a9112ab6ea83c6679d7d9d6b62f00d34ab5c3f0aa07506, khớp byte với bản đã kiểm; progress live 822/2.224. Tiếp theo: Giai đoạn C từ ordinal 823 （晚安）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-076 → batch-078 — biên soạn mới ordinal 763–792 — đã phát hành và xác minh Pages

- Merge commit: 5aef30013389e414749ddcd9ab09804b06f3e483 (nhánh main, PR #30); nhánh biên soạn: `9594277` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `b4e2102` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-076 ordinal 763–772 （一路顺风 交通 人口 公交车 公共汽车 公路 公里 出租车 分钟 司机）, batch-077 ordinal 773–782 （地铁 地铁站 护照 椅子 爬山 自行车 行人 车辆 道路 骑车）, batch-078 ordinal 783–792 （但 不一定 不但 不够 不太 不如 不满 不行 不过 为什么）. completedCount 762 → 792/2.224, còn 1.432; toàn khóa 802/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 16, trung bình 14, khó 0. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Sửa danh mục: 交通 “kết nối” → “giao thông” (sai hẳn); 公路 “đường cao tốc” → “đường quốc lộ; đường lớn”, bài học đối chiếu trực tiếp 公路/高速公路； 不过 bổ sung nghĩa chính “nhưng (nhẹ)” bị thiếu (cũ chỉ ghi “chỉ”); 不满 “bực bội” → “không hài lòng; bất mãn”; 一路顺风 ghi rõ là lời chúc đi đường.
- Điểm nội dung: 一路顺风 (763) khép cặp lời chúc với 一路平安 (762) từ phía “thuận buồm xuôi gió” kèm lưu ý chọn từ khi đi máy bay. Nhóm xe dạy theo tầng ngôn ngữ: đời thường （公交车 là tên rút gọn thắng thế, 公共汽车 là tên đầy đủ trên văn bản — chốt hai phía 766/767; 出租车 theo chuyến đối lập 公交车 theo tuyến; 地铁/地铁站 tàu và ga) và thuật ngữ quản lý — biển báo （行人 người đi bộ theo luật, đối chiếu 路人； 车辆 xe cộ tập thể, đối chiếu 汽车； 道路 đường sá vật chất, chốt cặp 交通 hệ thống/道路 mặt đường từ cả hai phía 764/781). 分钟 chốt bẫy giờ giấc khoảng/thời điểm （分钟/分）. Nhóm liên từ phủ định 783–792: Nhưng (783) mở chuỗi bốn chữ “nhưng” （但 gọn, 不过 nhẹ — 791, còn 但是/可是 ở hai ordinal tiếp), 不一定 chốt bẫy logic phủ định của 一定 (720): chưa chắc khác chắc chắn không; 不但…而且 là khuôn cộng dồn đối lập hẳn 但是 dù hình thức gần giống; 不如 chốt chiều so sánh (phía kém đứng trước) kèm câu sửa bằng 比； 不满 phân biệt đánh giá không hài lòng với cơn giận 生气； 不过 bổ sung khuôn 不过是 “chẳng qua”.
- Ghi chú biên soạn: đầu mục của ordinal 785 là 不但 (không phải 不但是） — bản nháp đầu viết thừa chữ 是 trong phần gọi tên, đã sửa trước khi áp dụng; nội dung câu mẫu tiếng Trung không bị ảnh hưởng.
- Bài học hạ tầng của đợt: thư mục /tmp bị xóa khi thay VM làm mất hazi_lib — đã tái dựng bộ hàm sinh bài từ chính hình dạng JSON của các batch đã phát hành (batch-073/071) và kiểm chứng bằng apply sạch của cả ba đợt; các generator /tmp vẫn là đồ bỏ đi, kho lưu batch trong repo là nguồn chuẩn.
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi), không phải áp dụng lại. Kiểm thử: process-batch verify PASS (792/2.224; 802 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-078.
- Nhánh sao lưu `backup/phasec-076-078-20261028` ở main HEAD `9073831`.
- Pages run [40681718089](https://github.com/bohoa96tb/hazi-viet/actions/runs/40681718089) completed/success đúng HEAD 5aef300 (run #279).
- Tệp khóa học live: 2.234 mục, 8.079.738 bytes, SHA-256 d2164010d26f8395a0c2d9b6cce85fe13a607ee5ef73e786fdabbf1293e62a88, khớp byte với bản đã kiểm; progress live 792/2.224. Tiếp theo: Giai đoạn C từ ordinal 793 （也许）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-073 → batch-075 — biên soạn mới ordinal 733–762 — đã phát hành và xác minh Pages

- Merge commit: ec5bb4a437c56a971e9b5a93f7b774b85bb74383 (nhánh main, PR #29); nhánh biên soạn: `3e0fb1f` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `37a3c6a` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-073 ordinal 733–742 （答应 要求 为 位 名 姓 段 称 级 词）, batch-074 ordinal 743–752 （作用 单位 叫作 名单 名称 姓名 字典 意思 生词 画儿）, batch-075 ordinal 753–762 （组成 表示 词典 词语 读音 音节 一路平安）. completedCount 732 → 762/2.224, còn 1.462; toàn khóa 772/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 11, trung bình 19, khó 0. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Điểm nội dung: đợt này chốt trọn ba cụm hay lẫn. Cụm lượng từ người và họ tên: 答应 sửa nghĩa danh mục (cũ chỉ “trả lời” → “đồng ý; hứa; đáp lại”) và đối chiếu 回答； 要求 đối chiếu 请求 (636) từ phía đặt chuẩn; 位 là lượng từ tôn trọng trong lời nói, 名 là lượng từ trang trọng trên giấy tờ — phân biệt theo môi trường nói/viết; 姓 chỉ phần họ, tách khỏi 名字 và khép bằng 姓名， nối 名单 và 名称 (tên chính thức của thứ, không dùng cho người). 单位 bổ sung nghĩa “cơ quan, nơi làm việc” — nghĩa đặc trưng đời sống Trung Quốc danh mục chưa có, đối chiếu 公司. Cụm ngôn ngữ học: 词/字 là nền của cả nhóm; 字典 （字典 tra chữ)/词典 (tra từ) chốt từ cả hai phía (749 và 755); 意思 đối chiếu 想法 (ý của lời nói và ý tưởng trong đầu), ôn 有意思 (605); 读音 đối chiếu 声音， 音节 đối chiếu 字 theo mặt âm/mặt chữ. 一路平安 (762) chốt cặp lời chúc đi đường với 一路顺风 (763) kèm lưu ý kỹ tính về máy bay.
- Bài học kiểm tra của đợt: neo “đứng” trong bộ kiểm tra chất lượng quét cả động từ “đứng đầu” trong đề tự dùng tiếng Việt — viết đề tránh cụm này （名单）; tiêu chí tự dùng chứa cụm Hán bị câu mẫu chen giữa （读三遍生词， 把生词写在） vẫn phải tránh như các đợt trước.
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi), không phải áp dụng lại. Kiểm thử: process-batch verify PASS (762/2.224; 772 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-075.
- Nhánh sao lưu `backup/phasec-073-075-20261028` ở main HEAD `24951db`.
- Pages run [40652747574](https://github.com/bohoa96tb/hazi-viet/actions/runs/40652747574) completed/success đúng HEAD ec5bb4a (run #277).
- Tệp khóa học live: 2.234 mục, 7.854.875 bytes, SHA-256 0097f0d8221ae2e0880d995313b4ea26d213c151a9d8e028a1b7e937bf778a08, khớp byte với bản đã kiểm; progress live 762/2.224. Tiếp theo: Giai đoạn C từ ordinal 763 （一路顺风）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-070 → batch-072 — biên soạn mới ordinal 703–732 — đã phát hành và xác minh Pages

- Merge commit: 66a07a3ab8956662fa96480ecfad5f5496de2b1f (nhánh main, PR #28); nhánh biên soạn: `04979ad` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `534c3ba` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-070 ordinal 703–712 （大自然 大衣 家庭 心里 月亮 洗澡 洗衣机 海边 举 会）, batch-071 ordinal 713–722 （像 刚 只 咱 够 它 才 一定 主要 只能）, batch-072 ordinal 723–732 （只要 如果 就要 常用 必须 快要 愿意 懂得 正是 直接）. completedCount 702 → 732/2.224, còn 1.492; toàn khóa 742/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 6, trung bình 22, khó 2. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Điểm nội dung: hai bài khó xử lý khác nhau theo đúng bản chất. 会 (712) dạy ba chức năng của cách đọc chính — biết làm do học, “sẽ” dự đoán, 开会 họp — bằng ba ví dụ và hai khung dùng; cách đọc thứ hai chỉ ở mức nhận biết trong 会计， không dùng readingBlocks (tiền lệ 对 ở batch-057). 只 (715) có hai cách đọc thật sự thông dụng nên dùng readingBlocks: “chỉ” giới hạn (thanh ba) và lượng từ đếm con vật, bộ phận đôi, đồ đơn chiếc (thanh một); bẫy có câu sửa đếm sách bằng 本. Nó (718) chốt lỗi viết ba đại từ đồng âm 他/她/它. Chuỗi điều kiện khép lại hai phía: 只要 (723, điều kiện đủ) đối chiếu 只能 (722, chỉ còn một cách), 如果 (724) nối khuôn 如果…的话 với bài 的话 (680) và phân biệt 要是 khẩu ngữ. Cặp “sắp” 就要 (725)/快要 (728) phân theo chủ thể người-lịch trình và hiện tượng tự nhiên, đối chiếu từ cả hai phía bằng câu mới. 洗澡 (708) dạy dạng tách （洗了个澡， 洗两次澡） kèm `targetParts`/`targetForms`; 心里 (706) phân biệt với 心情 (590): nơi chứa cảm xúc và trạng thái cảm xúc; 懂得 (730) chốt cặp hiểu thấu （懂得） / biết tin （知道）.
- Bài học kiểm tra của đợt: `auditLesson` giới hạn 1–2 khung dùng kể cả với bài khó nhiều chức năng không có readingBlocks — bài 会 phải bỏ khung thứ ba （开会 vẫn được dạy qua ví dụ và phần nghĩa); tiêu chí tự dùng chứa cụm Hán dài bị tách trong câu mẫu (như “看起来像” bị chen 很） sẽ báo thiếu token — viết tiêu chí tránh cụm bị tách.
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi), không phải áp dụng lại. Kiểm thử: process-batch verify PASS (732/2.224; 742 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-072.
- Nhánh sao lưu `backup/phasec-070-072-20261028` ở main HEAD `8624689`.
- Pages run [40649918056](https://github.com/bohoa96tb/hazi-viet/actions/runs/40649918056) completed/success đúng HEAD 66a07a3 (run #275).
- Tệp khóa học live: 2.234 mục, 7.632.458 bytes, SHA-256 f9627e303ac527c368f4cc7b5fe7c1d856726cbc7ef3d677783b5e4c042ccf8f, khớp byte với bản đã kiểm; progress live 732/2.224. Tiếp theo: Giai đoạn C từ ordinal 733 （答应）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-067 → batch-069 — biên soạn mới ordinal 673–702 — đã phát hành và xác minh Pages

- Merge commit: a2bf65abed3b19f251e252911154fef8dbac925d (nhánh main, PR #27); nhánh biên soạn: `989f6c6` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `fcc3bda` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-067 ordinal 673–682 （想法 意见 收入 方面 机会 条件 理想 的话 目的 看法）, batch-068 ordinal 683–692 （结果 观点 道理 重视 云 啊 墙 夜 怕 气）, batch-069 ordinal 693–702 （河 海 湖 网 船 道 那 鱼 鸟 大海）. completedCount 672 → 702/2.224, còn 1.522; toàn khóa 712/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 11, trung bình 19, khó 0. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Điểm nội dung: chuỗi phân biệt bốn bài về “ý” được chốt trọn qua hai đợt — 想法 (673, ý trong đầu) → 意见 (674, lời góp ý, kèm sắc thái phàn nàn của 有意见） → 看法 (682, cách nhìn cá nhân) → 观点 (684, quan điểm có hệ thống) — mỗi bài nhìn từ phía của nó với câu mới. 的话 (680) dạy như hạt từ ngữ pháp: đứng cuối mệnh đề điều kiện, bẫy sửa lỗi đặt nó lên đầu câu và đối chiếu vị trí với 如果. 条件 (678) và 机会 (677) chốt cặp điều kiện/cơ hội hai phía; 目的 (681)/结果 (683) chốt cặp trước/sau của một hành động hai phía. 气 (692) dạy qua các cụm sống 生气/空气/力气， bẫy đối chiếu 生气/生病. Chuỗi vùng nước 河 (693)/湖 (695)/海 (694) phân biệt theo cặp từ cả hai phía (chảy/đứng, ngọt/mặn), 大海 (702) chốt sắc thái văn vẻ so với 海 thường ngày. 道 (698) dạy lượng từ cho đề/món/tia và nhận diện trong 知道； 那 (699) là mục cấp 2 nâng cấp vai trò nối ý “vậy thì” cạnh vai chỉ định đã học cấp 1.
- Sửa hai nghĩa danh mục thiếu: 收入 (675) danh mục ghi “thu vào”, đúng vai trò chính là “thu nhập” — đã sửa thành “thu nhập; thu vào”; 理想 (679) danh mục ghi “một lý tưởng” thành “lý tưởng”. 网 (696) bổ sung nghĩa mạng internet cạnh nghĩa lưới (danh mục chỉ có “lưới”).
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi), không phải áp dụng lại. Kiểm thử: process-batch verify PASS (702/2.224; 712 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-069.
- Nhánh sao lưu `backup/phasec-067-069-20261028` ở main HEAD `f394afd`.
- Pages run [40648306370](https://github.com/bohoa96tb/hazi-viet/actions/runs/40648306370) completed/success đúng HEAD a2bf65a (run #273).
- Tệp khóa học live: 2.234 mục, 7.407.681 bytes, SHA-256 b435ddcca166a77667f50ec352c1f945c0be7c64195269780e4994d9997418e0, khớp byte với bản đã kiểm; progress live 702/2.224. Tiếp theo: Giai đoạn C từ ordinal 703 （大自然）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-064 → batch-066 — biên soạn mới ordinal 643–672 — đã phát hành và xác minh Pages

- Merge commit: b74302aaea913f0b8404a6d8447956180814a751 (nhánh main, PR #26); nhánh biên soạn: `736bcc4` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `0bfe5f8` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-064 ordinal 643–652 （脏 蓝 角 选 黄 黑 什么样 年轻 点头 特别）, batch-065 ordinal 653–662 （特点 白色 红色 绿色 蓝色 这样 那样 颜色 黄色 黑色）, batch-066 ordinal 663–672 （习惯 信号 信心 信息 努力 原因 实际 对话 影响 态度）. completedCount 642 → 672/2.224, còn 1.552; toàn khóa 682/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 14, trung bình 16, khó 0. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Điểm nội dung: nhóm tên màu （白色 红色 绿色 蓝色 黄色 黑色 + từ tổng 颜色） dạy theo một khuôn chung xuyên suốt 7 bài — tên màu là danh từ độc lập, ghép trước vật phải có 的， chữ màu trơ ghép thẳng vào vật là cách tả ngắn nhất; mỗi bài chốt một mặt của khuôn và đối chiếu một cặp riêng （白/白色， 红/红色， 绿色/蓝色， 蓝色 thiếu 的， 颜色/彩色， 黄色 khuôn chung, 黑色/天黑）. 角 (645) dạy đơn vị hào trong giá tiền （元/角） và đối chiếu chữ đồng âm 脚 (549). 这样 (658)/那样 (659) soi gương hai phía. Chuỗi bài 66x liên kết nhau: 习惯 (663) đối chiếu 态度 (672) ở cuối đợt; 信号 (664)/信息 (666) phân biệt sóng và nội dung, 信心 (665) đối chiếu 相信 (587) về hướng của “tin”.
- Sửa một nghĩa danh mục sai: 态度 (672) — danh mục ghi “cách thức”, đúng là “thái độ”; đã sửa trong `wordEdits` của batch-066 và ghi rõ trong bài.
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi); cả ba đợt qua cổng kiểm tra ngay vòng đầu, không phải áp dụng lại. Kiểm thử: process-batch verify PASS (672/2.224; 682 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-066.
- Nhánh sao lưu `backup/phasec-064-066-20261028` ở main HEAD `0146c75`.
- Pages run [40640530722](https://github.com/bohoa96tb/hazi-viet/actions/runs/40640530722) completed/success đúng HEAD b74302a (run #271). Lượt kiểm tra live đầu tiên bắt gặp run còn đang chạy nên dữ liệu vẫn là bản cũ; kiểm tra lại sau khi run hoàn tất mới khớp — đúng quy trình chờ triển khai xong mới kết luận.
- Tệp khóa học live: 2.234 mục, 7.188.556 bytes, SHA-256 ff36adf034e055644981eb986dee10df0197d393cbab015fb0b383e355913630, khớp byte với bản đã kiểm; progress live 672/2.224. Tiếp theo: Giai đoạn C từ ordinal 673 （想法）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-061 → batch-063 — biên soạn mới ordinal 613–642 — đã phát hành và xác minh Pages

- Merge commit: 5c0317a3c39d925f4eacaa60c63ba947b896ebeb (nhánh main, PR #25); nhánh biên soạn: `f2a251b` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `4998144` (file khóa học qua trình duyệt).
- Biên soạn mới 30 bài V2: batch-061 ordinal 613–622 （难过 顺利 交 信 借 办 发 取 响 回）, batch-062 ordinal 623–632 （封 急 接 收 条 查 求 让 通 东南）, batch-063 ordinal 633–642 （帮助 接到 短信 请求 通知 问题 亮 假 红 绿）. completedCount 612 → 642/2.224, còn 1.582; toàn khóa 652/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 8, trung bình 20, khó 2 — 让 (630, ba khung để cho/khiến/nhường, 3 ví dụ) và 假 (640, hai cách đọc jiǎ giả / jià nghỉ phép, dùng `readingBlocks` + ví dụ gắn `introIndex`). Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Điểm nội dung: 借 (617) là động từ hai chiều mượn/cho mượn — bài dạy khung 向…借 / 借给… kèm một câu đối chiếu “chưa đủ ngữ cảnh” để học viên thấy vì sao phải nói đủ khung; 回 (622) là mục baseline cấp 2, luyện vai trò lượng từ chỉ lần/dịp （这回、下回、一回事） nối tiếp nghĩa quay về đã dạy ở ordinal 49; Thông qua cặp 通 (631)/通过 (590) đối chiếu hai phía; chuỗi liên kết 信 (616) → 短信 (635) → 发 (619) và 接 (625) → 接到 (634), 收/收到 (626), 求 (629) → 请求 (636), 绿 (642) đặt nền cho 蓝 (644).
- Sửa ghi chép danh mục thiếu: 顺利 bổ sung nghĩa “thuận lợi”; 交 bổ sung “giao”; 信 bổ sung vai trò “tin” bên cạnh “thư”.
- Bài học kiểm tra mới: không trích nguyên văn một câu đối chiếu sai vào trường văn xuôi của bài （封, `possibleConfusion`) — bộ tách audio theo ngôn ngữ sẽ cắt đoạn văn tại ranh giới chữ Hán, tạo một đoạn trùng hệt câu sai và làm vỡ khẳng định thứ tự nhãn “câu sai” trong verify-v2; vòng áp dụng đầu vì thế bị chặn nguyên tử, đã viết lại đoạn giải thích, khôi phục các tệp và áp dụng lại sạch. Ngoài ra test-dom cần biến môi trường HAPPY_DOM_MODULE trỏ tới thư mục hazi-test-env (đường mặc định /tmp đã bị xóa khi máy ảo thay mới).
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi). Kiểm thử: process-batch verify PASS (642/2.224; 652 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-063.
- Nhánh sao lưu `backup/phasec-061-063-20261028` ở main HEAD `2d67f19`.
- Pages run [40633330927](https://github.com/bohoa96tb/hazi-viet/actions/runs/40633330927) completed/success đúng HEAD 5c0317a (run #269).
- Tệp khóa học live: 2.234 mục, 6.970.718 bytes, SHA-256 a9446bf7a2b65463e645dd24d1fc91473ef5599d56a68536e40e92201f00ca8d, khớp byte với bản đã kiểm; progress live 642/2.224. Tiếp theo: Giai đoạn C từ ordinal 643 （脏）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-058 → batch-060 — biên soạn mới ordinal 583–612 — đã phát hành và xác minh Pages

- Merge commit: ac676761dbebe16b088293dbfcdbbb7071946fb0 (nhánh main, PR #24); nhánh biên soạn: `1f45794` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `7b618f5` (file khóa học qua trình duyệt). Mô tả PR đã đính chính sau khi tạo: phân loại đúng là 11 dễ, 19 trung bình (bản đầu ghi nhầm 12/18).
- Biên soạn mới 30 bài V2: batch-058 ordinal 583–592 （正常 正确 清楚 满意 相信 真正 等于 通过 便宜 公平）, batch-059 ordinal 593–602 （关心 友好 可爱 安静 实在 平等 开心 心情 快乐 感动）, batch-060 ordinal 603–612 （故事 方便 有意思 漂亮 热情 笑话 自由 舒服 随便 难受）. completedCount 582 → 612/2.224, còn 1.612; toàn khóa 622/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 11, trung bình 19, khó 0. Mọi bài theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Sửa hai ghi chép danh mục sai/thiếu: 真正 (588) — nghĩa danh mục “chính hãng” quá hẹp, sửa thành “thật sự; đích thực”; 通过 (590) — danh mục chỉ ghi “đi qua”, bài dạy hai nghĩa chính là đỗ kiểm tra và làm qua phương tiện/kênh.
- Phối hợp soi gương hai phía với câu đối chiếu khác nhau: 正确 (584)/准确 (573); 公平 (592)/平等 (598); 开心 (599)/快乐 (601), cả hai nối tiếp bẫy 放心 ở bài 581; 故事 (603)/笑话 (608); 漂亮 (606)/好看 (567); 难受 (612) đặt nền cho 难过 (613).
- Chi tiết kiểm tra dữ liệu: ví dụ phủ định của 有意思 (e2: 今天的课没意思。) khai báo `targetParts: ["没","意思"]`; đề tự dùng của 真正 đổi tránh chữ “bạn” trong “tình bạn” bị kiểm tra neo hiểu nhầm là xưng hô người nghe; hai câu tự dùng gần ví dụ （清楚 s2, 挺 ở đợt trước cùng họ lỗi) đã viết lại ở vòng nháp.
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi). Kiểm thử: process-batch verify PASS (612/2.224; 622 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-060.
- Lưu ý vận hành: lệnh tạo nhánh sao lưu + đẩy file nhỏ bị hệ thống ngắt (SIGTERM) giữa chừng, nhưng kiểm tra bằng git fetch xác nhận cả hai đều đã lên đầy đủ (sao lưu ở `f6e4759`, commit file nhỏ `1f45794`) trước khi tiếp tục — không đẩy lại.
- Nhánh sao lưu `backup/phasec-058-060-20261028` ở main HEAD `f6e4759`.
- Pages run [40630526629](https://github.com/bohoa96tb/hazi-viet/actions/runs/40630526629) completed/success đúng HEAD ac67676 (run #267).
- Tệp khóa học live: 2.234 mục, 6.746.165 bytes, SHA-256 f8d9af06c11992cb9db606662982275839e950b67a6772f57a1d80a655ff0dd6, khớp byte với bản đã kiểm; progress live 612/2.224. Tiếp theo: Giai đoạn C từ ordinal 613 （难过）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C đợt batch-055 → batch-057 — biên soạn mới ordinal 553–582 — đã phát hành và xác minh Pages

- Merge commit: 5389bf98fb3ea9be8a84db4dd6dfa5f6d6aed71a (nhánh main, PR #23); nhánh biên soạn: `83ff096` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch) + `7f7a2d9` (file khóa học qua trình duyệt). Tiếp nối batch-054 (548–552) do cửa sổ làm việc khác phát hành cùng ngày; Giai đoạn B tiếp tục từ ordinal 122 ở cửa sổ riêng.
- Biên soạn mới 30 bài V2: batch-055 ordinal 553–562 （事情 动物 声音 太阳 头发 数字 星星 样子 照片 照相）, batch-056 ordinal 563–572 （相机 眼睛 礼物 角度 好 对 挺 算 不错 例子）, batch-057 ordinal 573–582 （准确 可以 合适 好事 好处 差不多 应该 挺好 放心 正好）. completedCount 552 → 582/2.224, còn 1.642; toàn khóa 592/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 12 （动物、太阳、头发、星星、照片、相机、眼睛、礼物、不错、例子、好事、挺好）, trung bình 17, khó 1 （对: một cách đọc nhưng ba chức năng — đúng, đối với người, đối với việc — 3 ví dụ, không dùng readingBlocks vì chỉ một cách đọc). Mọi bài biên soạn ngay theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng, trường phát âm chỉ nêu số thanh.
- Phối hợp soi gương hai phía với câu đối chiếu khác nhau: 照片 (561)/照相 (562); 眼睛 (564) nối với 眼 (549); 好 (567, mục baseline cấp 2) tập trung các cụm cảm giác 好吃/好看/好玩 và nối cách đọc trong 爱好 đã dạy ở bài 好 cấp 1 (ordinal 95); 合适 (575)/正好 (582); 挺 (569)/挺好 (580); 应该 (579) đối chiếu 必须; 准确 (573) đối chiếu 对 (568).
- Bài 照相 (562) là cụm động từ-tân ngữ tách được: ví dụ e2 （照张相） khai báo `targetParts`, câu tự dùng s2 khai báo `targetForms` — hai cơ chế có sẵn trong kiểm tra V2/quality audit cho từ tách.
- Áp dụng bằng `process-batch apply` từng đợt (kiểm tra nguyên tử trước khi ghi). Kiểm thử: process-batch verify PASS (582/2.224; 592 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 113 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 739; 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-057.
- Ba cảnh báo self-example-near ở vòng kiểm tra nháp đầu （星星 s1, 挺 s1, 好事 s1) đã viết lại trước khi apply; bản nháp cuối sạch hoàn toàn.
- Nhánh sao lưu `backup/phasec-055-057-20261028` ở main HEAD `ddeef3e`.
- Pages run [40622348093](https://github.com/bohoa96tb/hazi-viet/actions/runs/40622348093) completed/success đúng HEAD 5389bf9 (run #265).
- Tệp khóa học live: 2.234 mục, 6.526.870 bytes, SHA-256 b1257bb979af376ec9dd4f580b0e1a582b2a06b642499d882444d3aae54878d1, khớp byte với bản đã kiểm; progress live 582/2.224. Tiếp theo: Giai đoạn C từ ordinal 583 （正常）; Giai đoạn B từ ordinal 122 （试） ở cửa sổ chuẩn hóa.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại; chưa sửa trong đợt này.

# Giai đoạn C batch-054 — ordinal 548–552 — đã phát hành

- PR #22, merge 7cf871e4ff4fc7b962d1f4bae03d307690e9c032; nội dung 画、眼、脚、脸、阴. Hoàn thành 552/2224, còn 1672; năm bài mới: một dễ và bốn trung bình; không sửa bài cũ. Nhánh sao lưu backup/phasec-054-20261028.
- process-batch verify, verify-v2, quality audit self-test, audit 5 bài (0 cảnh báo), DOM và kiểm thử hồi quy 113 khẳng định đạt; tổng cảnh báo 739. Lỗi kiểm thử DOM ban đầu do giả định nút nghe ở bước Ghép câu; đã sửa kiểm thử và thêm 6 khẳng định hồi quy về readingBlocks.
- Pages run 40619958421 hoàn tất thành công đúng merge commit. Tệp live 6302274 byte, SHA-256 52325969e527d9c207f795435688e740dcbfa2f7a4bc3a13c4257cfb016cb786 khớp bản đã kiểm; trình duyệt mở được bài 画. Cache đã đổi thành batch-054.
- Chưa kiểm tra mobile tại các mốc 360/390/430/1280 px, TTS Android thật hoặc phản biện giáo viên độc lập. Tiếp theo ordinal 553 事情.

# Giai đoạn B đợt B-011 — chuẩn hóa 考 (ordinal 121)

- PR #20 hợp nhất nội dung tại 55cefb3d8f832e63e1ab44e6640587a2f90b3fef; PR #21 sửa cache tại f297ef5a7bca98e3d51fea20851bab8143d21b27. Nhánh biên soạn gồm 23f1ca2 (dữ liệu), 5234674 (checkpoint) và a4486ca (cache). Sao lưu: backup/321-b011-20261028.
- Một bài cũ 考, id hz-h1-3a9a7012652b, độ khó trung bình; completedCount giữ 547/2224, standardizedCount 122. Giải thích, ví dụ, khung, bài luyện và tình huống tự dùng được biên tập; đồng bộ digest.
- process-batch verify, verify-v2, quality audit self-test, audit bài sửa (0 cảnh báo), DOM, hồi quy 得 (107 khẳng định), node --check và diff --check đạt. Tổng cảnh báo audit 739. Không có bài mới.
- Pages run 40619046303 hoàn tất thành công tại f297ef5. Tệp dữ liệu live 6268592 byte, SHA-256 41f36bb4c40ad1e233a6d388533f94ced375587d6882b90ba30911629d014e5e, khớp bản đã kiểm. Kiểm tra trình duyệt cho thấy các khối ví dụ, khung câu và bài luyện ẩn đáp án. Trước đó dữ liệu cũ còn trong cache, nên PR #21 đổi phiên bản script và dữ liệu.
- Chưa kiểm tra bố cục ở từng mốc 360/390/430/1280 px, TTS Android thật hoặc phản biện giáo viên độc lập. Tiếp tục Giai đoạn B từ ordinal 122 (试).

# Giai đoạn C đợt batch-051 → batch-053 — biên soạn mới ordinal 518–547 — đã phát hành và xác minh Pages

- Merge commit: 4a8b41fd7a79043b1c6d5c1c28e90ac31fdcd478 (nhánh main, PR #18); nhánh biên soạn: `3b4e701` (file nhỏ: progress.json, content-audit.json, PROGRESS.md, cache-buster, ba tệp kho lưu batch, test-dom) + `a50e17e` (file khóa học qua trình duyệt). Bui yêu cầu ngày 2026-10-28 tiếp tục từ số 528 và làm tối đa số từ có thể; hệ thống tiến độ bắt buộc hoàn thành theo tiền tố liên tục của baseline nên đợt chạy liền từ 518, qua 528, tới 547. Giai đoạn B chuẩn hóa (đợt B-011 từ ordinal 121) tạm dừng theo chỉ thị này, sẽ tiếp tục khi Bui yêu cầu quay lại.
- Biên soạn mới 30 bài V2: batch-051 ordinal 518–527 （超过 倒 刻 加 变 吹 套 带 弄 拉）, batch-052 ordinal 528–537 （换 排 推 提 改 更 背 装 靠 变成）, batch-053 ordinal 538–547 （带来 成为 提高 改变 重新 嘴 头 灯 狗 猫）. completedCount 517 → 547/2.224, còn 1.677; toàn khóa 557/2.234 bài đủ cấu trúc.
- Phân loại tự đánh giá: dễ 5 （嘴、头、灯、狗、猫）, trung bình 23, khó 2 （倒 với hai cách đọc dǎo/dào, 背 với hai cách đọc bēi/bèi — cả hai dùng `readingBlocks` mẫu 3-2-1 và ví dụ gắn `introIndex`). Mọi bài biên soạn ngay theo chuẩn hiện hành: `lesson.tier1` hai tầng, Pinyin ở ví dụ, bẫy thật có câu đối chiếu, 2 câu luyện mở và 2 tình huống tự dùng đủ ba mức gợi ý, trường phát âm chỉ nêu số thanh.
- Phối hợp soi gương hai phía với câu đối chiếu khác nhau: 拉 (527)/推 (530) hướng lực; 变 (522)/换 (528) và 变/改变 (541); 改 (532)/改变 (541); 变成 (537)/成为 (539); 带 (525)/带来 (538); 弄 (526) đối chiếu 做 đã có; 排队 đối chiếu 等; 更 đối chiếu 最.
- Áp dụng bằng `process-batch apply` từng đợt (công cụ tự kiểm tra mọi bản nháp trước khi ghi, hủy nguyên tử nếu lỗi). Kiểm thử: process-batch verify PASS (547/2.224; 557 bài đủ cấu trúc), verify-v2 exit 0, quality-audit self-test PASS, test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Tổng cảnh báo quality audit giữ nguyên 741 (đều là cảnh báo lịch sử ở bài cũ); 30 bài mới có 0 cảnh báo. Cập nhật cache-buster khóa học thành batch-053.
- Trong đợt kiểm tra lần đầu có 1 lỗi test-dom và đã sửa trước khi phát hành: bài 背 có `readingBlocks` hiển thị ở bước Ghép câu chỉ các khung mẫu theo đúng thiết kế 3-2-1, nhưng vòng kiểm tra bài mới nhất trong test-dom.mjs kỳ vọng hai ví dụ kèm nút nghe ở bước đó; đã cập nhật test để với bài có readingBlocks thì kiểm tra khung ở bước Ghép câu và kiểm tra ví dụ kèm audio trong khối đọc ở bước Hiểu. Renderer và dữ liệu không đổi.
- Nhánh sao lưu `backup/phasec-051-053-20261028` ở main HEAD `a29a121`.
- Pages run [40613133694](https://github.com/bohoa96tb/hazi-viet/actions/runs/40613133694) completed/success đúng HEAD 4a8b41fd7a79043b1c6d5c1c28e90ac31fdcd478 (run #256).
- Tệp khóa học live: 2.234 mục, 6.268.705 bytes, SHA-256 1e7b710e191495d212b4bc2ce6d5589b512aa8eedb8faef9f51bebabf5e5cf5d, khớp byte với bản đã kiểm; progress live 547/2.224. Tiếp theo: Giai đoạn C từ ordinal 548, hoặc quay lại Giai đoạn B đợt B-011 từ ordinal 121 khi Bui yêu cầu.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px. Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-010 — chuẩn hóa ordinal 113–120 (V2) — đã phát hành và xác minh Pages

- Merge commit: 2b4f09b7011797673c72ab5c40300551337e6cff (nhánh main, PR #17); nhánh biên soạn: `dd7f698` (file nhỏ: progress.json + checkpoint) + `0a9e0e3` (file khóa học qua trình duyệt). Giai đoạn B đợt B-010 chuẩn hóa 8 bài V2 (ordinal 113–120: 重要 做 动 学 干 忙 用 看), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không tăng completedCount (vẫn 517/2.224).
- Cả 8 bài đều thuộc thế hệ mẫu tự động và có cùng một nhóm lỗi dữ liệu: cả hai câu mẫu tự dùng chép nguyên hai ví dụ của bài, khung cũng là câu đầy đủ chép nguyên, ý tưởng của s1 là ghi chú phát âm còn đề/ý tưởng của s2 đều là một câu tiếng Trung; trường phát âm chứa mẹo chọn từ thay vì hướng dẫn đọc; tiêu đề bẫy viết liền cả câu giải thích nên cặp từ không khớp câu đối chiếu. Đã sửa đồng loạt: thêm `lesson.tier1` (mỗi bài một bẫy nên toàn bộ ở Tầng 1), bổ sung Pinyin cho cả hai ví dụ mỗi bài (16 ví dụ), viết lại trường phát âm chỉ nêu số thanh, đổi 8 tiêu đề bẫy thành dạng "A và B: ...", viết lại khung dạng mẫu, ý tưởng và câu mẫu tự dùng mới khớp đề cho cả 16 câu.
- Lỗi riêng từng bài đã sửa: 重要 — phần khác nhau (difference) của bẫy là đoạn về 忙 không liên quan bẫy 重要/必须 và còn lẫn chữ "different-meaning" của máy; phần giải thích thay thế cũng chỉ ghi đúng chữ "different-meaning". 做 — phần khác nhau/giải thích thay thế của bẫy nói về 工作 thay vì 干. 动 — nói về 做 thay vì 走. 学 — nói về 教 thay vì 学习. 干 — phần khác nhau chép lại nguyên văn phần ranh giới về cách đọc. 用 — tiêu đề ghi 用/使用 nhưng cả hai câu đối chiếu và mẹo thực tế dạy cặp 用/有用 nên đổi tiêu đề thành "用 và 有用: dùng một vật hay nói vật có ích" cho khớp nội dung bẫy.
- Phối hợp soi gương: 做 (114) và 干 (117) là cặp soi gương — bẫy của 做 đi từ phía cụm cụ thể （做饭、做作业）, bẫy của 干 đi từ phía khẩu ngữ （干什么、干活）, câu đối chiếu khác hẳn nhau. Không thêm readingBlocks cho 干: cách đọc gān chỉ gặp trong từ ghép như 干净 ở mức nhận ra (giống xử lý 重 ở đợt B-009).
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 763 → 741 (giảm 22: exact −16, trap-pair −8, thêm 2 neo 'listener' ở câu mẫu tự dùng mới ngôi thứ nhất; không cảnh báo mới nào khác), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Cập nhật completedDigests cho 8 bài. 7 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b010-20261027` ở main HEAD `b1f3aee`.
- Trong đợt kiểm tra lần đầu có 2 vấn đề và đã sửa trước khi phát hành: bản nháp trường phát âm của 干 viết "gān" bị auditV2 báo "Pinyin ngoài phạm vi" (phần chữ đọc không được chứa Pinyin có dấu thanh 1/3 ngoài các trường Pinyin được phép); sau đó cách viết Pinyin đứng riêng trong trường phát âm của cả 8 bài làm hỏng kiểm tra audio của verify-v2 (audio toàn bài không được đọc Pinyin của từ). Đã viết lại cả 8 trường phát âm chỉ nêu số thanh và đặc điểm phát âm, không viết Pinyin.
- Lưu ý vận hành: công cụ GitHub API vẫn chậm (lệnh đẩy file nhỏ mất khoảng 6 phút mới xong) nên đã tạo PR #17 và merge qua trình duyệt GitHub thay thế; các bước sau đó xác minh độc lập bằng API đọc công khai và git fetch đều khớp.
- Pages run [40467466974](https://github.com/bohoa96tb/hazi-viet/actions/runs/40467466974) completed/success đúng HEAD 2b4f09b7011797673c72ab5c40300551337e6cff (run #254).
- Tệp khóa học live: 2.234 mục, 6.040.147 bytes, SHA-256 5829dba7d40276a20ca0473275fd5d25054bbd512ed8f5800ea717cc116d3e8a, khớp byte với bản đã kiểm; checkpoint live đã hiện 124 mục, standardizedCount 121, phase B. Tiếp theo: Giai đoạn B đợt B-011 từ ordinal 121.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-009 — chuẩn hóa ordinal 105–112 (V2) — đã phát hành và xác minh Pages

- Merge commit: ee14c3e9b986535b932546c4fb92245d1c0601fb (nhánh main, PR #16); nhánh biên soạn: `e4380f8` (file nhỏ: progress.json + checkpoint) + `3f05262` (file khóa học qua trình duyệt). Giai đoạn B đợt B-009 chuẩn hóa 8 bài V2 (ordinal 105–112: 过 远 重 错 难 高 不大 不对), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài: mỗi bài chỉ có một bẫy nên toàn bộ bẫy, câu luyện và câu tự dùng ở Tầng 1. Không thêm readingBlocks: 重 có cách đọc chóng nhưng chỉ gặp trong từ ghép như 重复 ở mức nhận ra (giống cách đọc shào của 少 ở đợt B-008).
- Bổ sung Pinyin cho cả hai ví dụ mỗi bài (16 ví dụ); 过 trong ví dụ trải nghiệm đọc nhẹ guo theo đúng chú thích của bài; 不 đổi thanh được ghi đúng trong Pinyin (bú dà, bú duì).
- Sửa lỗi dữ liệu thật ở 3 bài thuộc thế hệ mẫu tự động: 高 — trường phát âm chứa câu lạc "Bạn nói giá chiếc áo này cao." thay vì hướng dẫn đọc; ý tưởng (idea) của hai câu tự dùng là câu tiếng Trung lạc đề; cả hai câu mẫu tự dùng chép nguyên ví dụ; mẹo của bẫy lại chứa nội dung phát âm. 不大 — cả hai câu mẫu tự dùng chép nguyên ví dụ và lệch đề (đề nói căn bếp/tan ca muộn, câu mẫu là phòng/mưa); phần khác nhau của bẫy chép lại nguyên văn phần ranh giới; trường phát âm là ghi chú cách dùng. 不对 — đề tự dùng s1 là đề của bài 不大 chép nhầm sang; đề và ý tưởng s2 đều là một câu tiếng Trung; cả hai câu mẫu chép nguyên ví dụ; trường phát âm chứa mẹo chọn từ. Đã viết lại trường phát âm, phần khác nhau/mẹo của bẫy, khung dạng mẫu, ý tưởng và câu mẫu mới khớp đề cho cả 3 bài (高 s1 我哥哥很高。, s2 这座山比那座山高。; 不大 s1 我家厨房不大。, s2 今天我加班的可能性不大。; 不对 s1 这道题的答案不对。, s2 不对，我的手机还在车里。).
- Sửa nhỏ: 远 s2 câu mẫu dùng 很近 nên không chứa từ mục tiêu, đổi thành 不远 (câu mẫu 商店离这儿不远，走路就能到。); 错 s2 tiêu chí nhắc 一个字 không có trong câu mẫu nên viết lại; đổi 5 tiêu đề bẫy thành dạng "A và B: ..." để cặp từ khớp câu đối chiếu （远 và 近, 难 và 不容易, 高 và 大, 不大 và 小, 不对 và 错）.
- Phối hợp soi gương: 错 t1 soi gương bẫy của bài 差 (đợt B-008) từ phía lỗi cụ thể, câu đối chiếu khác hẳn; 不对 t1 phối hợp với bài 错 từ phía đánh giá đáp án; 远 t1 dùng cùng khung 离 với bài 近 đã học.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 775 → 763 (giảm 12: exact −6, target −1, criteria-token −1, trap-pair −5, thêm 1 neo 'listener' ở 不对 s2; không cảnh báo mới nào khác), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Cập nhật completedDigests cho 8 bài. 11 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b009-20261027` ở main HEAD `175a068`.
- Lưu ý vận hành: công cụ GitHub API vẫn chậm/ngắt (lệnh đẩy file nhỏ bị hệ thống ngắt giữa chừng nhưng commit thực tế đã lên nhánh — đã xác minh bằng git fetch trước khi làm tiếp) nên đã tạo PR #16 và merge qua trình duyệt GitHub thay thế; các bước sau đó xác minh độc lập bằng API đọc công khai và git fetch đều khớp.
- Pages run [40461085005](https://github.com/bohoa96tb/hazi-viet/actions/runs/40461085005) completed/success đúng HEAD ee14c3e9b986535b932546c4fb92245d1c0601fb (run #252).
- Tệp khóa học live: 2.234 mục, 6.036.692 bytes, SHA-256 8cc56faf359a3289d96706fc8b6d90bdb960e2ef8b0afa0b0eba887dd425779d, khớp byte với bản đã kiểm; checkpoint live đã hiện 116 mục, standardizedCount 113, phase B. Tiếp theo: Giai đoạn B đợt B-010 từ ordinal 113.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-008 — chuẩn hóa ordinal 97–104 (V2) — đã phát hành và xác minh Pages

- Merge commit: dffc5916b397b7da0b1b2e3c40973f35532525b4 (nhánh main, PR #15); nhánh biên soạn: `16abbc7` (file nhỏ: progress.json + checkpoint) + `9159a23` (file khóa học qua trình duyệt). Giai đoạn B đợt B-008 chuẩn hóa 8 bài V2 (ordinal 97–104: 少 差 很 快 慢 真 老 贵), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không phát hiện lỗi kiến thức; không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài: 少 chỉ giữ t1 ở Tầng 1 (t2 cách đọc shào trong 少年 vào Học thêm); 7 bài còn lại mỗi bài chỉ có một bẫy nên toàn bộ ở Tầng 1. Không thêm readingBlocks: cách đọc shào của 少 chỉ gặp trong từ ghép 少年 ở mức nhận ra, bài chính dạy shǎo; readingBlocks dành cho từ khó nhiều cách đọc thông dụng.
- Bổ sung Pinyin cho cả hai ví dụ mỗi bài (16 ví dụ); 4 câu mẫu có dấu phẩy trong bản chữ (快 e2, 慢 e2, 老 e1, 贵 e2) bỏ dấu phẩy trong Pinyin theo quy tắc `isPinyinText`.
- Dịch điều kiện dùng thứ nhất của bài 少 sang tiếng Việt (bản gốc viết bằng tiếng Trung giữa bài giảng tiếng Việt, học sinh trình độ này chưa đọc được; giữ ví dụ 人很少 nguyên văn).
- Viết lại câu mẫu tự dùng: 快 s1 chép nguyên ví dụ; 差 s1 chép nguyên câu đối chiếu trong bẫy và 差 s2 quá gần ví dụ (0,89); 老 s1/s2 và 贵 s2 không chứa từ mục tiêu (dùng 旧/年纪大/你姓什么？) nên viết lại để câu mẫu chứa đúng từ mục tiêu (我家隔壁的老奶奶九十岁了。/ 我叔叔老了，头发都白了。/ 您好，请问您贵姓？); sửa 6 cảnh báo tiêu chí (差 s1 错, 真 s1 很, 老 s1 老, 老 s2 老了, 贵 s2 贵姓/您贵姓). Cập nhật completedDigests cho 8 bài.
- Phối hợp soi gương: 少 t1 soi gương bài 小 (đợt B-007) từ phía lượng, dùng câu bát/cơm khác hẳn; 很 t1 soi gương bài 太 (đợt B-007) từ phía nhận xét trung tính; 快/慢 là cặp soi gương, cả hai ví dụ e1 đều dùng mẫu bổ ngữ 得 nối về pilot 得; câu luyện 慢 q2 chấp nhận đáp án 晚 là có chủ ý để luyện phân biệt 慢/晚, không phải lỗi.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 785 → 775 (giảm 10: exact −1, near −1, criteria-token −6, target −3, thêm 1 neo 'listener' ở 贵 s2; không cảnh báo mới nào khác), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. 15 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất hoặc xưng hô lịch sự đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b008-20261027` ở main HEAD `7a72ca5`.
- Lưu ý vận hành: công cụ GitHub API vẫn chậm/ngắt (tạo PR và merge qua API đều timeout ở các đợt trước) nên đã tạo PR #15 và merge qua trình duyệt GitHub thay thế; các bước sau đó xác minh độc lập bằng API đọc công khai và git fetch đều khớp.
- Pages run [40455975888](https://github.com/bohoa96tb/hazi-viet/actions/runs/40455975888) completed/success đúng HEAD dffc5916b397b7da0b1b2e3c40973f35532525b4 (run #250).
- Tệp khóa học live: 2.234 mục, 6.033.067 bytes, SHA-256 e2b305d32acab5d32b383d7ccdfc3ceb4d573fe3c35d3dacf23713be2567937c, khớp byte với bản đã kiểm; checkpoint live đã hiện 108 mục, standardizedCount 105, phase B. Tiếp theo: Giai đoạn B đợt B-009 từ ordinal 105.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-007 — chuẩn hóa ordinal 89–96 (V2) — đã phát hành và xác minh Pages

- Merge commit: bade73e0c885ffef3bc5d6138b2a080f16611b4b (nhánh main, PR #14); nhánh biên soạn: `48754b5` (file nhỏ: progress.json + checkpoint + kho lưu batch-008) + `3d8fa09` (file khóa học qua trình duyệt). Giai đoạn B đợt B-007 chuẩn hóa 8 bài V2 (ordinal 89–96: 牛奶 鸡蛋 坏 多 大 太 好 小), 7 tự đánh giá trung bình, 1 khó (好), 0 dễ. Sửa 1 lỗi nội dung thật. Không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài: 坏 chỉ giữ t1+q1 ở Tầng 1 (t2 坏人 và q2 vào Học thêm); 7 bài còn lại giữ t1+q1+q2 ở Tầng 1.
- Bài 好 (khó, hai cách đọc hǎo/hào): thêm `readingBlocks` 3 khối (hǎo/e1 khen tốt hay; hǎo/e2 khen vị món trong 好吃; hào/e3 sở thích trong 爱好) kèm mục intro mới hào và ví dụ mới e3 我的爱好是听音乐。; cập nhật scope và giải thích nghĩa để nhắc cả hai cách đọc (không viết Pinyin trong lời giảng, theo quy tắc âm thanh); đổi tiêu đề bẫy t2 thành "好 và 爱好: thanh ba hay thanh bốn" (sửa 2 cảnh báo trap-pair).
- Bổ sung Pinyin cho cả hai ví dụ mỗi bài (16 ví dụ) và ví dụ mới e3 của 好; e2 bài 坏 bỏ dấu phẩy trong Pinyin theo quy tắc `isPinyinText`.
- Viết lại 12/16 câu mẫu tự dùng vốn chép nguyên ví dụ; sửa lỗi self-target-missing ở 小 s2 (giữ 小 trong câu mẫu: 这个小杯子里的水很少。); sửa 5 cảnh báo tiêu chí (牛奶 s1 每天, 牛奶 s2 请给我, 多 s1 有很多客人, 好 s2 可以, 小 s2 杯子里水很少); sửa 2 cảnh báo neo (多 s1 dùng 商店里 thay 店里; 鸡蛋 s2 đổi đề để tránh neo 'cabinet' giả dương, câu mẫu vẫn giữ 冰箱里). Câu mẫu 大 s1/s2 đã khác ví dụ nên giữ nguyên.
- Sửa lỗi nội dung ở bài 坏: trường replacement của bẫy t1 chứa đoạn văn về 多/大 (这家店人很多/这家店很大) do chép nhầm từ bài khác; đã viết lại về 坏了/不好用.
- Cập nhật `wordEdits.intro` trong kho lưu batch-008 (thêm mục hào cho 好) theo yêu cầu kiểm tra toàn vẹn kho lưu khi sửa dữ liệu đã phát hành. Cập nhật completedDigests cho 8 bài.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 806 → 785 (giảm 21: exact −11, criteria-token −5, target −1, trap-pair −2, anchor −2; không cảnh báo mới), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Trong đợt kiểm tra lần đầu có 2 vấn đề và đã sửa trước khi phát hành: (1) ví dụ mới e3 của 好 thiếu `practiceAllowed=true` và `introIndex` nên `auditLesson` báo chưa đủ nội dung — đã bổ sung (introIndex 0 cho e1/e2, 1 cho e3) ở cả hai mảng examples; (2) Pinyin chỉ thêm vào `lesson.examples` mà chưa đồng bộ sang `word.examples` nên verify báo lệch — đã đồng bộ; (3) intro mới hào của 好 làm lệch kho lưu batch-008 — đã cập nhật `wordEdits.intro` trong kho lưu. 7 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b007-20261026` ở main HEAD `c56dfb0`.
- Lưu ý vận hành: công cụ GitHub API vẫn chậm/ngắt (tạo PR và merge qua API đều timeout ở đợt B-006) nên đã tạo PR #14 và merge qua trình duyệt GitHub thay thế; các bước sau đó xác minh độc lập bằng API đọc công khai và git fetch đều khớp.
- Pages run [40329713895](https://github.com/bohoa96tb/hazi-viet/actions/runs/40329713895) completed/success đúng HEAD bade73e0c885ffef3bc5d6138b2a080f16611b4b (run #248).
- Tệp khóa học live: 2.234 mục, 6.029.336 bytes, SHA-256 8e2aced0a58054316f1e3f29e757fabfd50d3ec6ea6e57de80da5fa5c4ca016f, khớp byte với bản đã kiểm; checkpoint live đã hiện 100 mục, standardizedCount 97, phase B. Tiếp theo: Giai đoạn B đợt B-008 từ ordinal 97.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-006 — chuẩn hóa ordinal 81–88 (V2) — đã phát hành và xác minh Pages

- Merge commit: 21fdbb400098eca31899606a1d36ac80be631036 (nhánh main, PR #13); nhánh biên soạn: `5d2dadc` (file nhỏ: progress.json + checkpoint) + `4a51570` (file khóa học qua trình duyệt). Giai đoạn B đợt B-006 chuẩn hóa 8 bài V2 (ordinal 81–88: 茶 菜 雨 风 下雨 天气 奶奶 水果), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không phát hiện lỗi kiến thức; không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài (mỗi bài chỉ có một bẫy t1 nên toàn bộ ở Tầng 1). Không thêm readingBlocks: bài trung bình một cách đọc; readingBlocks dành cho từ khó theo schema.
- Bổ sung Pinyin cho cả hai ví dụ mỗi bài (16 ví dụ; 8 bài này thuộc thế hệ V2 sớm nên cả hai ví dụ đều thiếu Pinyin). Viết lại 15/16 câu mẫu tự dùng vốn chép nguyên hoặc quá gần ví dụ (self-example-exact 11, self-example-near 3); sửa 2 cảnh báo tiêu chí (下雨 s2 会, 天气 s2 是); viết lại 风 s2 vì chép nguyên câu đối chiếu trong bẫy t1. Câu mẫu 茶 s2 đã khác ví dụ nên giữ nguyên. Đổi khung tự dùng của các bài thế hệ V2 sớm (81–84) từ câu đầy đủ thành khung mẫu có dấu +. Cập nhật completedDigests cho 8 bài.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 822 → 806 (giảm 16: exact −11, near −3, criteria-token −2; không cảnh báo mới), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Trong đợt kiểm tra lần đầu có 1 vấn đề và đã sửa trước khi phát hành: bản nháp câu mẫu 水果 s1/s2 (我喜欢吃香蕉。/我买了三种苹果。) bị cảnh báo self-target-missing vì không còn chứa từ mục tiêu 水果 nên đã sửa lại thành 我喜欢吃水果和香蕉。/我买了苹果和两种水果。. 5 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b006-20261026` ở main HEAD `56cd3b6`.
- Lưu ý vận hành: công cụ GitHub API bị chậm/ngắt nhiều lần trong đợt này (tạo nhánh sao lưu mất ~15 phút, tạo PR và merge qua API đều timeout dù đã kiểm tra chưa tạo xong) — đã tạo PR #13 và merge qua trình duyệt GitHub (merge commit, không squash/rebase) thay thế; các bước sau đó xác minh độc lập bằng API đọc công khai và git fetch đều khớp.
- Pages run [40286194348](https://github.com/bohoa96tb/hazi-viet/actions/runs/40286194348) completed/success đúng HEAD 21fdbb400098eca31899606a1d36ac80be631036 (run #246).
- Tệp khóa học live: 2.234 mục, 6.024.490 bytes, SHA-256 7cd33ef917649763518188ddbc1dbf872f09a22574e532d0e44cb690c8acf384, khớp byte với bản đã kiểm; checkpoint live đã hiện 92 mục, standardizedCount 89, phase B. Tiếp theo: Giai đoạn B đợt B-007 từ ordinal 89.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-005 — chuẩn hóa ordinal 73–80 (V2) — đã phát hành và xác minh Pages

- Merge commit: 16268b457039c87364f845f06e590e99f972d2fd (nhánh main, PR #12); nhánh biên soạn: `fa350ef` (file nhỏ: progress.json + checkpoint) + `f16f3fa` (file khóa học qua trình duyệt). Giai đoạn B đợt B-005 chuẩn hóa 8 bài V2 (ordinal 73–80: 洗 热 爱 球 白 笑 肉 花), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không phát hiện lỗi kiến thức; không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài (mỗi bài chỉ có một bẫy t1 nên toàn bộ ở Tầng 1). Không thêm readingBlocks: bài trung bình một cách đọc; readingBlocks dành cho từ khó theo schema.
- Bổ sung Pinyin cho cả hai ví dụ mỗi bài (16 ví dụ; 8 bài này thuộc thế hệ V2 sớm nên cả hai ví dụ đều thiếu Pinyin). Viết lại 15/16 câu mẫu tự dùng vốn chép nguyên ví dụ (self-example-exact); sửa một lỗi thật: câu mẫu 爱 s2 dùng 喜欢 và không chứa từ mục tiêu 爱 (self-target-missing) nên đổi thành 我爱学中文。; viết lại 白 s2 vì chép nguyên câu đối chiếu trong bẫy t1. Câu mẫu 球 s2 đã khác ví dụ nên giữ nguyên. Đổi khung tự dùng từ câu đầy đủ thành khung mẫu có dấu + như các bài V2 khác. Cập nhật completedDigests cho 8 bài.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 836 → 822 (giảm 14: exact −13, target −1; không cảnh báo mới), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. 13 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b005-20261026` ở main HEAD `954a1e5`.
- Pages run [40264042879](https://github.com/bohoa96tb/hazi-viet/actions/runs/40264042879) completed/success đúng HEAD 16268b457039c87364f845f06e590e99f972d2fd (run #244).
- Tệp khóa học live: 2.234 mục, 6.020.686 bytes, SHA-256 3bc99c97177bf6d763bba8d77dbcd34c7a6f7171d6ca758d0cd185b937c40ab6, khớp byte với bản đã kiểm; checkpoint live đã hiện 84 mục, standardizedCount 81, phase B. Tiếp theo: Giai đoạn B đợt B-006 từ ordinal 81.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-004 — chuẩn hóa ordinal 65–72 (V2) — đã phát hành và xác minh Pages

- Merge commit: 888d304d91a593575f7ab74de1302b81e1429692 (nhánh main, PR #11); nhánh biên soạn: `de77169` (file nhỏ: progress.json + checkpoint) + `b0dc71f` (file khóa học qua trình duyệt). Giai đoạn B đợt B-004 chuẩn hóa 8 bài V2 (ordinal 65–72: 说话 请进 请问 奶 树 歌 毛 水), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không phát hiện lỗi kiến thức; không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài: 说话/奶/毛/水 giữ bẫy chính t1 ở Tầng 1 (bẫy phụ t2 và câu luyện liên quan vào Học thêm: 说话 t2+q3, 奶 t2+q3, 毛 t2+q3, 水 t2+q2, 树 t2, 歌 t2); 请进 và 请问 giữ toàn bộ ở Tầng 1. Không thêm readingBlocks: bài trung bình một cách đọc; readingBlocks dành cho từ khó theo schema.
- Bổ sung Pinyin còn thiếu cho 1 ví dụ mỗi bài (8 ví dụ). Sửa Pinyin e1 của 请问 bỏ dấu phẩy (Qǐngwèn yīyuàn zài nǎr? — lỗi đã ghi từ đợt B-003; isPinyinText không chấp nhận dấu phẩy). Viết lại 16/16 câu mẫu tự dùng vốn chép nguyên ví dụ (self-example-exact), sửa tiêu chí/đề/ý/khung liên quan cho khớp. Cập nhật completedDigests cho 8 bài.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 862 → 836 (giảm 26: exact −16, criteria-token −9, anchor −1; không cảnh báo mới), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Trong đợt kiểm tra lần đầu có 1 vấn đề và đã sửa trước khi phát hành: bản nháp câu mẫu 说话 s1 (他们正在说话。) vẫn bị cảnh báo gần vì chỉ thêm một chữ 正 (khoảng cách Levenshtein 1/6 ≈ 0,83) nên đã đổi hẳn chủ ngữ thành 两个同事在说话。 (khớp đúng đề: hai đồng nghiệp). 6 cảnh báo còn lại ở 8 bài này đều là neo giả dương — listener (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) và door ở 请进 s1 (lời mời cố định không cần 门) — giữ nguyên có chủ ý; câu mẫu 歌 s2 mới có 你 nên sửa luôn cảnh báo neo cũ ở đó. Nhánh sao lưu `backup/321-b004-20261026` ở main HEAD `0602d4c`.
- Pages run [40263119208](https://github.com/bohoa96tb/hazi-viet/actions/runs/40263119208) completed/success đúng HEAD 888d304d91a593575f7ab74de1302b81e1429692 (run #242).
- Tệp khóa học live: 2.234 mục, 6.016.926 bytes, SHA-256 bf82e56185b8ca830327ec800e81488ca822fbf986cadcea8f7841a03f272578, khớp byte với bản đã kiểm; checkpoint live đã hiện 76 mục, standardizedCount 73, phase B. Tiếp theo: Giai đoạn B đợt B-005 từ ordinal 73.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-003 — chuẩn hóa ordinal 57–64 (V2) — đã phát hành và xác minh Pages

- Merge commit: 00d9e7e621c0df64332e477401be11f673590365 (nhánh main, PR #10); nhánh biên soạn: `823cc45` (file nhỏ: progress.json + checkpoint + test-dom.mjs) + `99000c2` (file khóa học qua trình duyệt). Giai đoạn B đợt B-003 chuẩn hóa 8 bài V2 (ordinal 57–64: 问 不用 回答 多少 帮忙 怎么 手机 电话), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không phát hiện lỗi kiến thức; không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài: 问/不用/回答/怎么 giữ bẫy chính t1 ở Tầng 1 (bẫy phụ t2 và câu luyện q3 vào Học thêm); 多少 và 电话 giữ cả 2 bẫy ở Tầng 1 vì đều là nội dung chính; 帮忙 và 手机 giữ toàn bộ ở Tầng 1. Không thêm readingBlocks: bài trung bình một cách đọc; readingBlocks dành cho từ khó theo schema.
- Bổ sung Pinyin còn thiếu cho 1 ví dụ mỗi bài (8 ví dụ; 问 e2 bỏ dấu phẩy vì isPinyinText không chấp nhận: "Qǐngwèn chēzhàn zài nǎr?"). Viết lại 16/16 câu mẫu tự dùng vốn chép nguyên ví dụ (self-example-exact), sửa tiêu chí/đề/ý/khung liên quan cho khớp. Khai báo caseExampleTerms cho bẫy 电话 t2. Phối hợp bẫy ở các cặp soi nhau: 问/回答, 帮忙 nối 帮 (50), 手机/电话 nối 电 (53) và 打电话 ở 打 (51) — giữ nguyên cách dạy đã có, không viết lại cùng một bẫy ở hai bài. Cập nhật completedDigests cho 8 bài.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 888 → 862 (giảm 26: exact −16, criteria-token −9, trap-pair −1; không cảnh báo mới), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Trong đợt kiểm tra lần đầu có 3 vấn đề và đã sửa trước khi phát hành: Pinyin 问 e2 chứa dấu phẩy (isPinyinText từ chối), câu mẫu 手机 s2 vừa sai token tiêu chí vừa thiếu neo đọc sách (đổi sang cụm chuẩn 看书), câu mẫu 电话 s2 quá gần ví dụ (thêm 请问 mở đầu). 5 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b003-20261026` ở main HEAD `c5e229d`.
- Vì tier1 của 不用 chỉ còn 1 bẫy nên nút chuyển bẫy không còn hiện ở bước Phân biệt — đã cập nhật `tools/vocabulary/test-dom.mjs` (kiểm tra Học thêm mở ra bẫy t2 của 不用 và kiểm tra nút chuyển bẫy ở 电话, tier1 có 2 bẫy). Đây là thay đổi kiểm thử theo hành vi mới có chủ ý, không phải nới lỏng kiểm tra.
- Pages run [40261784172](https://github.com/bohoa96tb/hazi-viet/actions/runs/40261784172) completed/success đúng HEAD 00d9e7e621c0df64332e477401be11f673590365 (40 giây).
- Tệp khóa học live: 2.234 mục, 6.014.109 bytes, SHA-256 7b5c2a931bacadaeb2764aed2260cc0f439de2a5d0c3480c1d033c7315b8ed5d, khớp byte với bản đã kiểm; checkpoint live đã hiện 68 mục, standardizedCount 65, phase B. Tiếp theo: Giai đoạn B đợt B-004 từ ordinal 65 (说话). Lưu ý cho đợt sau: ví dụ e1 của 请问 (ordinal 67) cũng có dấu phẩy trong Pinyin mà isPinyinText không chấp nhận; sửa khi chuẩn hóa ordinal 67.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-002 — chuẩn hóa ordinal 49–56 (V2) — đã phát hành và xác minh Pages

- Merge commit: 86898447d6e0ccf76ea7ce93b98b82f0a0fcdcb3 (nhánh main, PR #9); nhánh biên soạn: `2fd8255` (file nhỏ: progress.json + checkpoint) + `c469414` (file khóa học qua trình duyệt). Giai đoạn B đợt B-002 chuẩn hóa 8 bài V2 (ordinal 49–56: 回 帮 打 找 电 等 话 请), tất cả tự đánh giá trung bình, 0 dễ, 0 khó. Không phát hiện lỗi kiến thức; không tăng completedCount (vẫn 517/2.224).
- Thêm `lesson.tier1` cho cả 8 bài: 回/找/电 chỉ giữ bẫy chính t1 ở Tầng 1 (bẫy phụ t2 vào Học thêm); 等 giữ t1, q1–q2 (bẫy t2 và q3 về 等等 vào Học thêm); 打 và 请 giữ cả 2 bẫy ở Tầng 1 vì đều là nội dung chính; 帮 và 话 giữ toàn bộ ở Tầng 1.
- Bổ sung Pinyin còn thiếu cho 1 ví dụ mỗi bài (8 ví dụ: 回 e2, 帮 e1, 打 e1, 找 e2, 电 e1, 等 e2, 话 e2, 请 e2). Viết lại 13/16 câu mẫu tự dùng vốn chép nguyên ví dụ (self-example-exact), sửa tiêu chí/đề/ý/khung liên quan cho khớp (找 s2, 电 s2, 等 s1/s2, 打 s1/s2). Khai báo caseExampleTerms cho bẫy 回 t2 và 请 t1. Cập nhật completedDigests cho 8 bài.
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 910 → 888 (giảm 22: exact −14, near −1, criteria-token −3, trap-pair −3, anchor −1; không cảnh báo mới), test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. 5 cảnh báo còn lại ở 8 bài này đều là neo 'listener' giả dương (đề gọi người học là 'bạn', câu mẫu ngôi thứ nhất đúng nên không thêm 你) — giữ nguyên có chủ ý. Nhánh sao lưu `backup/321-b002-20261026` ở main HEAD `c05fb14`.
- Pages run [40252322719](https://github.com/bohoa96tb/hazi-viet/actions/runs/40252322719) completed/success đúng HEAD 86898447d6e0ccf76ea7ce93b98b82f0a0fcdcb3 (40 giây).
- Tệp khóa học live: 2.234 mục, 6.011.106 bytes, SHA-256 88e9edf977ecb2ff70c36c2cba15b140eacfe317a4ea3d355c4c642b09d65b58, khớp byte với bản đã kiểm; checkpoint live đã hiện 60 mục, standardizedCount 57, phase B. Tiếp theo: Giai đoạn B đợt B-003 từ ordinal 57 (问).
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Giai đoạn B đợt B-001 — chuẩn hóa ordinal 1–48 (checkpoint) — đã phát hành và xác minh Pages

- Merge commit: 81f80baeba31fc8d00f3281c0df355e894b7272f (nhánh main, PR #8); nhánh biên soạn: `c9aecf4` (chỉ checkpoint). Giai đoạn B bắt đầu sau khi Bui phê duyệt mẫu 3-2-1 bằng prompt chuẩn hóa toàn bộ ngày 2026-10-26 (áp dụng từ ordinal 1, không cần duyệt lại mẫu). Đợt B-001 rà soát 48 bài V1 đầu tiên (ordinal 1–48) theo chuẩn 3-2-1 áp dụng cho từ dễ/trung bình: 30 dễ, 18 trung bình, 0 khó. Không phát hiện lỗi kiến thức nên giữ nguyên nội dung khóa học: không đổi file dữ liệu, không đổi digest, completedCount vẫn 517/2.224.
- Chỉ cập nhật `tools/vocabulary/pedagogy-upgrade-checkpoint.json`: 48 mục mới (batch B-001) + twoTier sang phase B, pilotApproved=true, standardizedCount 1 → 49. Hai điểm đã kiểm tra kỹ và giữ nguyên: e06 bài 字 nhắc 图书馆 (scene đã nêu rõ) và điều kiện 两点 bài 点 (bài chọn 两点 làm mẫu, không khẳng định sai về 二点).
- Đã chạy process-batch verify PASS, verify-v2 (exit 0), quality-audit self-test PASS, quality audit tổng 910 không đổi, test-dom PASS, kiểm thử hồi quy 得 107 khẳng định PASS, git diff --check clean. Nhánh sao lưu `backup/321-b001-20261026` ở main HEAD `387a453`.
- Pages run [40241093720](https://github.com/bohoa96tb/hazi-viet/actions/runs/40241093720) completed/success đúng HEAD 81f80baeba31fc8d00f3281c0df355e894b7272f (39 giây).
- Tệp khóa học live không đổi: 2.234 mục, 6.008.075 bytes, SHA-256 ebb09b31466fa7e482ddac415e6ca3f85c8992167e36cf097fb3c321eb06d89a, khớp byte với bản đã kiểm; checkpoint live đã hiện 52 mục, standardizedCount 49, phase B. Tiếp theo: Giai đoạn B đợt B-002 từ ordinal 49 (回).
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Pilot 3-2-1 — bài 得 (Giai đoạn A) — đã phát hành và xác minh Pages

- Merge commit: 5a6a74a6238342288add31fe5881480510331f27 (nhánh main, PR #7); nhánh biên soạn: `6b13ec6` (file nhỏ) + `19f03c9` (file khóa học). Mẫu 3-2-1 do Bui đề xuất cho bài từ khó: 3 ý chính tối đa (mỗi cách đọc một khối — giải thích ngắn + câu mẫu ngay dưới), 2 câu mẫu trọng tâm + 1 câu ngắn, 1–2 câu tự luyện. Bài 得: ba khối de/děi/dé với ví dụ 他说得很快。/ 我得去上班。/ 他得到了礼物。; bẫy chính mới t0 "的 hay 得" (我的书。/ 他跑得很快。); câu luyện chính mới q6 (Điền 的 hay 得: 她唱___很好。) + tự dùng s2; 5 bẫy cũ, q1–q5 và s1 giữ nguyên trong Học thêm. Bước Ghép câu chỉ hiện khung mẫu, không lặp ví dụ. Renderer mới hỗ trợ `lesson.readingBlocks` với fallback: bài chưa có readingBlocks hiển thị đúng như trước. Audit cho phép 2–3 ví dụ (thay vì đúng 2). Không tăng completedCount (vẫn 517/2.224).
- Đã chạy process-batch verify, quality audit self-test, quality audit cho 得 (0 cảnh báo, tổng 910 không đổi), DOM simulation, kiểm thử hồi quy mở rộng (107 khẳng định), verify-v2, kiểm tra hiển thị (3 khối, Pinyin hiện/ẩn, không lặp ví dụ ở bước Ghép câu), kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB. Nhánh sao lưu `backup/321-de-20261026` ở main HEAD `8cb4eac` trước đợt này.
- Pages run [40238097330](https://github.com/bohoa96tb/hazi-viet/actions/runs/40238097330) completed/success đúng HEAD 5a6a74a6238342288add31fe5881480510331f27.
- Tệp khóa học live có 2.234 mục, 6.008.075 bytes, SHA-256 ebb09b31466fa7e482ddac415e6ca3f85c8992167e36cf097fb3c321eb06d89a, khớp byte với bản đã kiểm; bài 得 có readingBlocks (3 khối), tier1 {traps:[t0], checks:[q6], selfUse:[s2]}, 6 bẫy, 6 câu luyện, 3 câu mẫu, audioText 说得很快. Pilot đang chờ Bui duyệt nội dung và trải nghiệm; chưa bắt đầu Giai đoạn B.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc). Quirk còn tồn tại: mở đáp án làm phần Học thêm đóng lại (re-render đặt lại <details>); chưa sửa trong đợt này.

# Pilot hai tầng — bài 得 (Giai đoạn A) — đã phát hành và xác minh Pages

- Merge commit: 8f7c253999ec8331ed727394a3929afdfa9a9ffc (nhánh main, PR #6); nhánh biên soạn: `ab6c8f3` (file nhỏ) + `a02950b` (file khóa học). Chuẩn hai tầng v1 (`docs/CONTENT_STANDARD_TWO_TIER.md`): Tầng 1 hiển thị mặc định (giải thích tiếng Việt 169 từ, trong khoảng 150–230 cho bài khó; dạy de và děi bằng câu đơn giản; nhận biết ngắn ba cách đọc; 1 bẫy, 1 câu luyện, 2 tình huống tự dùng), Tầng 2 trong "Học thêm" (4 bẫy: 的/地/得, mức độ/khả năng, tân ngữ, 得/要; 4 câu luyện mở rộng). Ví dụ e2 đổi thành 我今天得早点回家 (děi); ví dụ cũ về tân ngữ giữ lại làm câu đúng trong bẫy t4; q1 thành câu điền đơn giản, thêm q5 kiểm tra 的/地/得. Renderer mới hỗ trợ `lesson.tier1` với fallback: bài chưa có tier1 hiển thị đúng như trước. Giới hạn checks nới từ 2–4 thành 2–6 để có cả bài chính và bài mở rộng. Không tăng completedCount (vẫn 517/2.224).
- Đã chạy process-batch verify, quality audit self-test, quality audit cho 得 (0 cảnh báo, tổng 910 không đổi), DOM simulation, kiểm thử hồi quy mới cho hai tầng (78 khẳng định), kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB. Nhánh sao lưu `backup/two-tier-de-20261025` ở main HEAD `3ee2ce5` trước đợt này.
- Pages run [40204346419](https://github.com/bohoa96tb/hazi-viet/actions/runs/40204346419) completed/success đúng HEAD 8f7c253999ec8331ed727394a3929afdfa9a9ffc.
- Tệp khóa học live có 2.234 mục, 6.004.896 bytes, SHA-256 d46d55b8281d28225e7f78882c81dfaba12f43a2ceba497f70833bd09e09ff5a, khớp byte với bản đã kiểm; bài 得 có tier1 {traps:[t1], checks:[q1], selfUse:[s1,s2]}, 5 bẫy, 5 câu luyện, 2 câu mẫu, audioText 说得很快. Pilot đang chờ Bui duyệt nội dung và trải nghiệm; chưa bắt đầu Giai đoạn B.
- Chưa xác minh: TTS Android thật, phản biện giáo viên độc lập, bố cục mobile 360/390/430px (chưa xác minh riêng từng mốc).

# Pilot V3 — sửa lỗi bài 得 (đợt 2) — đã phát hành và xác minh Pages

- Merge commit: 5d04330e12c802ef643d19501081d70a8129f6e0 (nhánh main, PR #5); nhánh biên soạn: `1c3e264` (file nhỏ) + `51beaea` (file khóa học). Sửa bài 得 (id `hz-h2-8ac3a59c0ef6`, ordinal 503) theo phản biện sau khi xem pilot trên web: q2 giữ chủ thể 他; q4 hỏi rõ cách nhấn mạnh bắt buộc và thừa nhận 要 cũng có thể dùng; t4 sửa giải thích khớp câu sai (tân ngữ chen vào giữa động từ và 得) và giới hạn quy tắc trong mẫu mức độ; t3 bỏ tuyên bố tuyệt đối về 听不懂/没听懂, thêm cặp đối chiếu cùng bối cảnh; t1 thêm 觉得 và 得到, cách đọc theo từ ghép/chức năng/ngữ cảnh; t2 đổi thành ba câu cùng bối cảnh học nghiêm túc; s1 nói về anh ấy (他); audioText đổi từ 得到 sang 说得很快. Không tăng completedCount (vẫn 517/2.224).
- Thêm nút HIỆN/ẨN PINYIN chung cho cả bài (lưu theo trình duyệt); Pinyin ở câu đối chiếu và câu sửa trong bẫy hiện trực tiếp thay vì từng nút riêng; câu sai có cảnh báo rõ và nền riêng; Pinyin nhỏ hơn chữ Hán. Đổi cache-buster dữ liệu và JS sang `pilot-de2`.
- Đã chạy process-batch verify, quality audit self-test, quality audit cho 得 (0 cảnh báo, tổng 910 không đổi), DOM simulation, kiểm thử hồi quy mới cho lỗi q2/q4/selfUse (36 khẳng định), kiểm tra render, kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB.
- Pages run [40199716691](https://github.com/bohoa96tb/hazi-viet/actions/runs/40199716691) completed/success đúng HEAD 5d04330e12c802ef643d19501081d70a8129f6e0.
- Tệp khóa học live có 2.234 mục, 6.004.555 bytes, SHA-256 c36bebfbe3b806da207393adce3a36987f25db12ede3c27e6abe3e895cfc8a02, khớp byte với bản đã kiểm; bài 得 có 5 bẫy, 4 câu luyện, 2 câu mẫu, audioText 说得很快. Kiểm tra bằng trình duyệt thật ở màn hình lớn: nút Pinyin, pager bẫy 1/5–5/5, cảnh báo câu sai, đáp án ẩn và gợi ý ba mức đều hoạt động; không có cuộn ngang. Chưa xác minh bố cục ở 360/390/430px (công cụ trình duyệt không đổi được viewport, Chrome headless trên máy chủ không chạy xong), TTS Android thật và phản biện giáo viên độc lập.

# Pilot V3 — 得 — đã phát hành và xác minh Pages

- Merge commit: 945e16c17b377a3e5d70cc5557a27ee3b4766492 (nhánh main, PR #4); nhánh biên soạn: `2edfc43` (file nhỏ) + `ceb507f` (file khóa học). Nâng cấp bài 得 (id `hz-h2-8ac3a59c0ef6`, ordinal 503) từ V2 batch-049 lên mẫu V3: 2 khung, 2 câu mẫu, 5 bẫy, 4 câu luyện mở, 2 tình huống tự dùng, 3 ngữ cảnh audio. Không tăng completedCount (vẫn 517/2.224).
- Thêm trường Pinyin tùy chọn cho câu đối chiếu và câu sửa trong bẫy, render bằng chi tiết hiện/ẩn, audit kiểm tra Pinyin hợp lệ và loại trừ khi kiểm tra Pinyin trong lời giảng, audio không đọc Pinyin. Đổi cache-buster dữ liệu và JS sang `pilot-de`.
- Đã chạy process-batch verify, verify-v2, quality audit self-test, quality audit cho 得 (0 cảnh báo), DOM simulation, kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB.
- Pages run [40196929322](https://github.com/bohoa96tb/hazi-viet/actions/runs/40196929322) completed/success đúng HEAD 945e16c17b377a3e5d70cc5557a27ee3b4766492.
- Tệp khóa học live có 2.234 mục, 5.999.590 bytes, SHA-256 d52b9dc2aebdff3d94332dfc1ad8295fe340215d8a379f1b61a1b5297b3f9280, khớp byte với bản đã kiểm; bài 得 có 5 bẫy, 4 câu luyện, 2 câu mẫu và Pinyin đối chiếu. Chưa xác minh TTS Android, bố cục trực quan trên điện thoại hoặc phản biện giáo viên độc lập.

# Batch-050 — đã phát hành và xác minh Pages

- Content commit: 1390bb1ebff458d3e87b051db77e4474022006f0 (nhánh main; cùng nội dung với commit 48c45a00b3bd6fab968d87ed158d308e3bce5093 trên nhánh biên soạn, khác mã do merge rebase); bổ sung 8 mục ordinal 510–517: 短、表、该、越、轻、过、近、长. Tiến độ: 517/2.224, còn 1.707.
- Phân loại: dễ gồm 短、轻、近; trung bình gồm 表、该; khó gồm 越、过、长 vì đa âm và cấu trúc cần phân biệt.
- Đã chạy process-batch verify, verify-v2, quality audit self-test, quality audit phạm vi 510–517 (không có cảnh báo mới), DOM simulation, kiểm tra cú pháp và git diff --check. File khóa học phải đẩy riêng qua trình duyệt vì API từ chối 413 với file gần 6 MB.
- Pages run [40190327237](https://github.com/bohoa96tb/hazi-viet/actions/runs/40190327237) completed/success đúng HEAD 1390bb1ebff458d3e87b051db77e4474022006f0.
- Tệp khóa học live có 2.234 mục, 5.985.728 bytes, SHA-256 2ff15d30b0e12c3b33de631e4aa0c6da2e7513ea23be1be671ac102b55ab4c53, khớp byte với bản đã kiểm; đủ 8 ID batch-050 đúng ordinal 510–517, đều deep và lesson version 2. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.


# Batch-049 — đã phát hành và xác minh Pages

- Content commit: fbd588b5f98cf802798d7cd230fd7066906aee16; bổ sung 8 mục ordinal 502–509: 当、得、懂、成、掉、满、熟、省. Tiến độ: 509/2.224, còn 1.715.
- Phân loại: dễ gồm 满; trung bình gồm 懂、成、掉、熟、省; khó gồm 当、得 vì có nhiều chức năng/cách đọc và cấu trúc cần phân biệt. Correction-009 đồng bộ archive batch-048 với cách đọc kǎ/qiǎ của 卡 và không tăng completedCount.
- Đã chạy process-batch verify, verify-v2, quality audit self-test, quality audit phạm vi 502–509 (không có cảnh báo mới), DOM simulation, kiểm tra cú pháp và git diff --check. Bộ kiểm tra archive mới đối chiếu id, meaning, intro giữa batch source và course để chặn mất correction khi tái tạo.
- Pages run [40171593524](https://github.com/bohoa96tb/hazi-viet/actions/runs/40171593524) completed/success đúng HEAD fbd588b5f98cf802798d7cd230fd7066906aee16.
- Tệp khóa học live có 2.234 mục, 5.910.364 bytes, SHA-256 d66a722b7ca9d83d080990f4be6872428a01831245503fff22b943c3a141b061, khớp byte với bản đã kiểm; đủ 8 ID batch-049 đúng ordinal 502–509. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-048 — đã phát hành và xác minh Pages

- Content commit: `8432075eb3eeaa5a822446c1e5fa355864c4be74`; bổ sung 8 mục ordinal 494–501: 非常、下、两、低、克、卡、小、平. Tiến độ: 501/2.224, còn 1.723.
- Phân loại: dễ gồm 非常、两、克; trung bình gồm 下、低、卡、小、平. Batch-048 giải thích riêng các bẫy mức độ/tần suất, hướng đối lập, 两/二, đơn vị khối lượng, thẻ/vé, kích thước/cách gọi và phẳng/thấp. Correction-009 bổ sung cách đọc `qiǎ` của 卡 bên cạnh `kǎ` và không tăng completedCount.
- Đã chạy `process-batch verify`, `verify-v2`, quality audit self-test, quality audit phạm vi 494–501 (không có cảnh báo mới), `test-dom.mjs` với kiểm tra chuyển cấp HSK, kiểm tra cú pháp và `git diff --check`. Pages run [40170494061](https://github.com/bohoa96tb/hazi-viet/actions/runs/40170494061) completed/success đúng HEAD `8432075`.
- Tệp khóa học live có 2.234 mục, 5.850.546 bytes, SHA-256 `777abad3498502b371670bacc54eb3631ef16ef54aee723870fa70b5cd79b5e1`; đủ 8 ID batch-048 đúng ordinal 494–501. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-045 — đã phát hành và xác minh Pages

- Content commit: `80d1c7fe35ee04d02c9724196dc3f792f9b33fa3`; bổ sung 10 mục ordinal 460–469: 中学生、书包、医生、大学、大学生、学校、学院、小学、小学生、工人. Tiến độ cục bộ: 469/2.224, còn 1.755.
- Phân loại: dễ gồm 中学生、书包、医生、大学生、学校、小学、小学生、工人; trung bình gồm 大学、学院.
- Correction-007 sửa 教 (ordinal 457): intro dùng `jiāo`/`jiào`, phần phát âm phân biệt thanh 1 và thanh 4, câu hỏi/đáp án đã đồng bộ. Validator mới kiểm tra Pinyin bằng tập âm tiết hợp lệ và từ chối nhãn mô tả.
- Đã chạy `process-batch verify`, `verify-v2`, quality audit self-test, quality audit nhóm 457–469, `test-dom.mjs`, kiểm tra cú pháp và `git diff --check`. Pages run [40168023790](https://github.com/bohoa96tb/hazi-viet/actions/runs/40168023790) completed/success đúng HEAD `ca28528`.
- Tệp khóa học live có 2.234 mục, 5.622.943 bytes, SHA-256 `788651592fc30c337797e62dcabb6160bd6029224546bd0fa077033f66c15158`; đủ `教` với `jiāo`/`jiào` và 10 ID batch-045 đúng ordinal 460–469. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-044 — đã phát hành và xác minh Pages

- Content commit: `3fe09028849d7bb270f4cc185cc810aac7ae6e2a`; bổ sung 8 mục ordinal 452–459: 门票、飞机、马路、从、四、教、班、中学. Tiến độ cục bộ: 459/2.224, còn 1.765.
- Phân loại: dễ gồm 门票、飞机、马路、四; trung bình gồm 从、班、中学; khó gồm 教 vì có hai cách đọc thông dụng. Bài 教 chỉ dạy sâu nghĩa dạy và nhận diện cách đọc trong 教育.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 452–459, `test-dom.mjs`, `node --check` và `git diff --check`. Live Pages đã được xác minh ở bước phát hành; chưa xác minh TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: \`d15668330937c4ffd9cc3a24757af01b7d395766\`; cả \`content/vocabulary-2224\` và \`main\` đã fast-forward. Pages run [40166924555](https://github.com/bohoa96tb/hazi-viet/actions/runs/40166924555) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.551.676 bytes, SHA-256 \`c6df285ef12f0ba2f2d901ebd007481d0d4ff91ff6bb0598087d22d67f5f9d8c\`, khớp byte với bản đã kiểm; đủ 8 ID batch-044 đúng ordinal 452–459. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-043 — đã phát hành và xác minh Pages

- Content commit: `2061eda667a6d30f0afa37005f0bd76f004f5597`; bổ sung 4 mục ordinal 448–451: 路口、车上、车票、车站. Tiến độ cục bộ: 451/2.224, còn 1.773.
- Phân loại batch-043: dễ gồm 车站; trung bình gồm 路口、车上、车票.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 448–451, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh live Pages, TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `762a9e5f501cebf41da5083c9d7e2569264b2dbc`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40165723821](https://github.com/bohoa96tb/hazi-viet/actions/runs/40165723821) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.495.934 bytes, SHA-256 `86f987386e867998e096c61a0a3b5e8644b6561867749cf13bc08b194bb68ac0`, khớp byte với bản đã kiểm; đủ 4 ID batch-043 đúng ordinal 448–451. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-042 — đã phát hành và xác minh Pages

- Content commit: `27bd49cb85f0a60c760bc8b5159d87cafd7ef330`; bổ sung 4 mục ordinal 444–447: 汽车、火车、走路、路上. Tiến độ cục bộ: 447/2.224, còn 1.777.
- Phân loại batch-042: dễ gồm 火车; trung bình gồm 汽车、走路、路上. Đã kiểm lại batch-040/041: mỗi batch 1 dễ và 3 trung bình, tổng 2 dễ và 6 trung bình.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 444–447, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh live Pages, TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `24f6a994c0e5e3d91e356ca46fd779b40fce6102`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40163436856](https://github.com/bohoa96tb/hazi-viet/actions/runs/40163436856) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.468.598 bytes, SHA-256 `833a3bc84de1f5fb79b7c3c2ed6ab878cb1fdd482679e779d1309fa29bcab5ab`, khớp byte với bản đã kiểm; đủ 4 ID batch-042 đúng ordinal 444–447. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-041 — đã phát hành và xác minh Pages

- Content commit: `4b2894bf846593ee90d71dfae6597c82277ca4aa`; bổ sung 4 mục ordinal 440–443: 开车、打车、机场、机票. Tiến độ cục bộ: 443/2.224, còn 1.781; không thay đổi tiến độ rà soát 377/377.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 440–443, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `1ad7898978d5c719c2a2a0b8d652bf0262cf8ac3`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40162821428](https://github.com/bohoa96tb/hazi-viet/actions/runs/40162821428) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.441.227 bytes, SHA-256 `5aca97bcb4cbb89656e5b027c64012f4190c6c25b259ee18c3f5e8ce2054cc31`, khớp byte với bản đã kiểm; đủ 4 ID batch-041 đúng ordinal 440–443. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-040 — đã phát hành và xác minh Pages

- Content commit: `b84c9ce05eac86535bafda79f89905442679b26f`; bổ sung 4 mục ordinal 436–439: 车、飞、上车、地图. Tiến độ cục bộ: 439/2.224, còn 1.785; không thay đổi tiến độ rà soát 377/377.
- Đã chạy `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 436–439, `test-dom.mjs`, `node --check` và `git diff --check`. Chưa xác minh live Pages, TTS Android, bố cục trực quan hoặc phản biện giáo viên độc lập.
- Tracker cuối: `ecc30ee1a25ba9aff07445bcd8d1f6edd379a726`; cả `content/vocabulary-2224` và `main` đã fast-forward. Pages run [40162418592](https://github.com/bohoa96tb/hazi-viet/actions/runs/40162418592) completed/success đúng HEAD.
- Tệp khóa học live có 2.234 mục, 5.413.703 bytes, SHA-256 `389beb478a7eb0ecd84523abbc75ccfebbc657128688c6efd469ec166eaa60b0`, khớp byte với bản đã kiểm; đủ 4 ID batch-040 đúng ordinal 436–439. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Correction-006 — đã phát hành và xác minh Pages

- Content commit: `52ef9688c3b4206f0d58fd2fa8db64c7d09bffbe`; sửa bài 430 那边 để đề, gợi ý, khung, đáp án, bản dịch và criteria cùng nghĩa “bên kia”.
- Sửa ownership nguồn: `batch-038.json` đúng 4 mục 428–431; `batch-039.json` đúng 4 mục 432–435, không trùng ID. Đồng bộ editorialStatus 432–435 về batch-039; completedCount vẫn 435/2.224.
- Quality audit thêm kiểm cặp đối lập 这边/那边, 左/右, 上/下, 前/后, 里/外, 有/没有; nhóm 428–435 đã qua semantic audit không cảnh báo. Pages run `40161612498` success đúng tracker `033e25f`; live course 5.389.793 bytes khớp SHA-256 `cb94aa73e46928ec0d326b7b1760fd1e961bbffc985ee6e167f6f59a5f621337`.

# Correction-005 và batch-038/039 — đã phát hành và xác minh Pages

- Commit nội dung: `0281429d4eabce14d65712875b88f56fea41ad7e`; tracker cuối: `778128c8b681ef64e9b552f8a877372556675764`; cả `content/vocabulary-2224` và `main` đã fast-forward.
- Sửa semantic prompt–ý tưởng–khung–đáp án–bản dịch–criteria ở 左, 下边, 外边; rà nhóm batch-036/037. Bổ sung 8 mục ordinal 428–435: 西边、这边、那边、里边、九、站、跑、路. Tiến độ: 435/2.224, còn 1.789; correction không tăng completedCount.
- Cổng cục bộ: `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 412–435, `test-dom.mjs`, `node --check` và `git diff --check` đạt. Pages run `40160760047` success đúng tracker `b416dd2`; live course 5.387.857 bytes khớp SHA-256 `bf7af0bbee789047bcf2cf586682f5ead32a6f042625eca4a26ad64d72620e89`. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-037 — đã phát hành và xác minh Pages

- Commit nội dung: `c70938f8ab5a21b8d45856fe060aec54e336f959`; tracker cuối: `5d3b4a48843f976e6ae716d251c2ea37dca92bfe`; cả `content/vocabulary-2224` và `main` đã fast-forward.
- Bổ sung 8 mục ordinal 420–427: 前边、北边、南边、右边、后边、外边、左边、旁边. Tiến độ: 427/2.224, còn 1.797; toàn khóa 437/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 前边、北边、南边、右边、后边、左边; trung bình gồm 外边、旁边 vì cần phân biệt mốc/vùng hoặc đối chiếu chức năng. Đã tự phản biện hai lượt.
- Nguồn đã đọc: 汉典 cho pinyin/nghĩa từng mục; MDBG bị chặn tự động trong lượt này và không được ghi là nguồn đã đọc cho batch-037. Chưa phản biện giáo viên độc lập.
- Kiểm cục bộ: `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 382–427, `test-dom.mjs`, `node --check`, `git diff --check` đều đạt. Pages run `40156085909` completed/success đúng tracker; live course 5.333.158 bytes khớp SHA-256 `33de48652e5f882bb4c454a649c5e9c196617c9c457022c42b3678edc35b0e15`. Chưa xác minh TTS Android hoặc bố cục trực quan riêng lượt này.

# Batch-036 và correction-004 — đã phát hành và xác minh Pages

- Commit nội dung: `c1b87a37eab4e0927f36e7e97ed42348ddd84c5b`; tracker cuối: `b58001ab42f6d515c70573905742e47cd958dfae`; cả `content/vocabulary-2224` và `main` đã fast-forward.
- Sửa 18 bài cũ ở ordinal 382–419 về đồng bộ đề bài–gợi ý–khung–đáp án–bản dịch–criteria; sửa cụ thể 400 女人, 402 她们 và 404 男人. `completedCount` chỉ tăng do bài mới.
- Bổ sung 8 mục ordinal 412–419: 南、右、左、西、一边、上边、下边、东边. Tiến độ: 419/2.224, còn 1.805; toàn khóa 429/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 南、右、左、西、上边、下边、东边; trung bình gồm 一边 vì có mẫu 一边…一边… và đối chiếu với 旁边. Đã tự phản biện hai lượt.
- Nguồn đã đọc: 汉典 cho pinyin/nghĩa từng mục; MDBG bị chặn tự động trong lượt này và không được ghi là nguồn đã đọc cho batch-036. Chưa phản biện giáo viên độc lập.
- Validator mới kiểm đồng bộ self-use và yêu cầu bẫy A/B có A và B trong câu case tiếng Trung thật; quality-audit lịch sử vẫn có cảnh báo cần biên tập thủ công.
- Kiểm cục bộ: `process-batch verify`, `verify-v2`, `quality-audit --self-test`, quality audit nhóm 382–419, `test-dom.mjs`, `node --check`, `git diff --check` đều đạt. Pages run `40155717136` completed/success đúng tracker; live course 5.280.571 bytes khớp SHA-256 `1e7dfb2bad6340ede73f61e4e5a09dd742a55f0a2b6a2d95223332045fe3a2ea`. Chưa xác minh TTS Android hoặc bố cục trực quan riêng lượt này.

# Batch-035 — đã phát hành và xác minh Pages

- Commit nội dung: `fd6307b63c8ea04ab66e2ce00664e04f8fb56a55`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung 5 mục ordinal 407–411: 病人、老人、东、前、北. Tiến độ: 411/2.224, còn 1.813; toàn khóa 421/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 病人、北; trung bình gồm 老人、东、前. Đã tự phản biện hai lượt; nguồn MDBG đã đọc cho từng mục, chưa phản biện giáo viên độc lập.
- `process-batch verify`, `verify-v2`, `quality-audit --self-test`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40154353838](https://github.com/bohoa96tb/hazi-viet/actions/runs/40154353838) completed/success đúng `head_sha=fd6307b63c8ea04ab66e2ce00664e04f8fb56a55`.
- Dữ liệu khóa học live có 2.234 mục, 421 bài đủ cấu trúc, 5.225.715 bytes, SHA-256 `c25cf6f17f91ef10db3960b3f3608b392aa647cf8259a9225c750e09ae9e619c`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-035`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Correction-003 và batch-034 — đã phát hành và xác minh Pages

- Commit nội dung: `a1dccdd753c48e99a36e286a54d4f83b0a4ddf4a`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Sửa 32 trường hợp tự dùng trùng nguyên văn ở ordinal 382–398; sửa lệch chủ thể/người nhận ở 介绍, đáp án 楼下 dùng đúng từ mục tiêu, bẫy 桌子 có câu thật với 桌面, và bản dịch 房子 không thu hẹp nghĩa. `completedCount` không tăng vì correction.
- Bổ sung 8 mục ordinal 399–406: 别人、女人、女生、她们、孩子、男人、男朋友、男生. Tiến độ: 406/2.224, còn 1.818; toàn khóa 416/2.234 bài đủ cấu trúc.
- Phân loại batch-034: dễ gồm 女生、她们、孩子、男生; trung bình gồm 别人、女人、男人、男朋友. MDBG đã được đọc cho từng mục; tự phản biện hai lượt, chưa phản biện giáo viên độc lập.
- Thêm `quality-audit.mjs`: cảnh báo tự dùng trùng/gần giống, thiếu từ mục tiêu, bẫy A/B thiếu ví dụ và correction thiếu; strict gate chặn lỗi trùng nguyên văn ở batch mới. Self-test có dữ liệu đúng, sai và ngoại lệ dạng tách được.
- `process-batch verify`, `verify-v2`, `quality-audit --self-test`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40154116343](https://github.com/bohoa96tb/hazi-viet/actions/runs/40154116343) completed/success đúng `head_sha=a1dccdd753c48e99a36e286a54d4f83b0a4ddf4a`.
- Dữ liệu khóa học live có 2.234 mục, 416 bài đủ cấu trúc, 5.190.399 bytes, SHA-256 `09db705dedbbf3929b489e4d998598c55620f91af493e8ab21dd18a6d24dcc3b`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-034`.
- Quality audit toàn lịch sử còn cảnh báo cần biên tập thủ công (chủ yếu bài cũ: 220 exact, 43 near, 65 trap-pair, 12 target); nhóm 381–406 hiện không còn cảnh báo. Chưa xác minh TTS Android, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-033 — đã phát hành và xác minh Pages

- Commit nội dung: `82634a222d56b0f197f9d1a0edf34e6f908f4dec`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung 5 mục ordinal 394–398: 们、谁、介绍、他们、先生. Tiến độ: 398/2.224, còn 1.826; toàn khóa 408/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 他们; trung bình gồm 们、谁、介绍、先生. Đã tự phản biện hai lượt; bài 谁 giữ hai cách đọc ở phần giới thiệu, không rải Pinyin vào lời giảng; chưa phản biện giáo viên độc lập.
- Nguồn đã đọc để xác minh mục từ, cách đọc và nghĩa: MDBG cho từng mục; các nhận định cấu trúc được viết và tự kiểm tra theo ngữ cảnh, không coi HTTP 200 là bằng chứng ngữ pháp.
- `process-batch apply`, `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40152291174](https://github.com/bohoa96tb/hazi-viet/actions/runs/40152291174) completed/success đúng `head_sha=82634a222d56b0f197f9d1a0edf34e6f908f4dec`.
- Dữ liệu khóa học live có 2.234 mục, 408 bài đủ cấu trúc, 5.131.318 bytes, SHA-256 `05c92a6f79dec3619c70a0741283d5aea7de05d678feedf9ff4ee7eaa0b3fb3d`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-033`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-031 và batch-032 — đã phát hành và xác minh Pages

- Commit nội dung: `78c3bb3378c8e3c2b6d1f0ea1edbb08a8f86cb19`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung 13 mục ordinal 381–393: 见、都、里、回家、在家、地上、家里、房子、房间、桌子、楼上、楼下、身上. Tiến độ: 393/2.224, còn 1.831; toàn khóa 403/2.234 bài đủ cấu trúc.
- Phân loại: dễ gồm 房间、桌子; trung bình gồm 见、都、里、回家、在家、地上、家里、房子、楼上、楼下、身上. Đã tự phản biện hai lượt; chưa phản biện giáo viên độc lập.
- Nguồn đã đọc để xác minh mục từ, cách đọc và nghĩa: MDBG cho từng mục; các nhận định cấu trúc được viết và tự kiểm tra theo ngữ cảnh, không coi HTTP 200 là bằng chứng ngữ pháp.
- `process-batch apply`, `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript và `git diff --check` đều đạt. DOM simulation không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40151960281](https://github.com/bohoa96tb/hazi-viet/actions/runs/40151960281) completed/success đúng `head_sha=78c3bb3378c8e3c2b6d1f0ea1edbb08a8f86cb19`.
- Dữ liệu khóa học live có 2.234 mục, 403 bài đủ cấu trúc, 5.092.739 bytes, SHA-256 `b7ebd505ae90283dc2abe52c72fb0699699fa1029c22cb5fed97cadfab87e941`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-032`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.

# Batch-030 — đã phát hành và xác minh Pages

- Commit nội dung: `86add34f55859a6bdac765b788c638fa1cbd84c9`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Bổ sung mục khó `着` ở ordinal 380. Tiến độ: 380/2.224, còn 1.844; toàn khóa 390/2.234 bài đủ cấu trúc.
- Bài giới hạn vào `着` trong trạng thái/cách thức và cách đọc khác trong `睡着`; nguồn đã đọc gồm MDBG và Chinese Grammar Wiki.
- `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript, `git diff --check` và kiểm segment audio đều đạt.
- GitHub Pages run [40150876963](https://github.com/bohoa96tb/hazi-viet/actions/runs/40150876963) completed/success đúng `head_sha=86add34f55859a6bdac765b788c638fa1cbd84c9`.
- Dữ liệu khóa học live có 2.234 mục, 390 bài đủ cấu trúc, 4.999.134 bytes, SHA-256 `5692d836c7f70ba2bec8e6ee7ca2a2c70c546f12bd72bbb2d4245c18194b1dd5`, khớp byte với bản đã kiểm; cache `vocabulary.js?v=batch-030`.
- Chưa xác minh TTS Android/phát âm thật, bố cục trực quan riêng lượt này hoặc phản biện giáo viên độc lập.


# Batch-029 và correction-002 — đã phát hành và xác minh Pages

- Commit nội dung: `86fce7351739d783c42a0c7794daf09d74c964b7`; đã fast-forward cả `content/vocabulary-2224` và `main`.
- Sửa ba bài đã xác nhận: 睡觉, 起来, 地. Bổ sung hai mục baseline 378–379: 床、楼. Tiến độ: 379/2.224, còn 1.845; toàn khóa 389/2.234 bài đủ cấu trúc.
- `process-batch verify`, `verify-v2`, `test-dom.mjs`, kiểm tra cú pháp JavaScript, `git diff --check` và kiểm segment audio đều đạt. DOM không chứng nhận bố cục trực quan hoặc phát âm trên thiết bị.
- GitHub Pages run [40150094286](https://github.com/bohoa96tb/hazi-viet/actions/runs/40150094286) completed/success đúng `head_sha=86fce7351739d783c42a0c7794daf09d74c964b7`.
- Dữ liệu khóa học live tải từ Pages có 2.234 mục, 389 bài đủ cấu trúc, 4.986.544 bytes, SHA-256 `6fc883516a28ccb360fa6a7d9c7b26e4acd3515fee63e1d9da2e70a27dfda3a0`, khớp byte với bản đã kiểm. Đã kiểm trực tiếp các ID sửa/bổ sung và cache `vocabulary.js?v=batch-029`.
- Chưa xác minh TTS Android/phát âm thật, chưa chạy Chromium trực quan riêng cho lượt này và chưa có phản biện giáo viên độc lập.


# Batch-019 · đã phát hành và xác minh Pages

Mục baseline 217–234: 生气、米饭、面包、面条儿、中、也、六、出、国、外、女、新、比、男、病、中间、别的、北京. Candidate có 18 bài V2; tiến độ candidate 234/2.224, còn 1.990; toàn khóa đủ cấu trúc 244/2.234.

- Mỗi mục giữ hai câu chính, khung cách dùng, phần bẫy/phân biệt, hai câu luyện mở với đáp án tách riêng và hai tình huống tự dùng với mẫu riêng.
- ID/thứ tự đã so khớp baseline; hash của 226 mục đã hoàn thành/bảo vệ trước đó không đổi.
- `process-batch apply`, `process-batch verify`, `verifyV2` cho 18 bài, `validateCourse` toàn khóa và `test-dom.mjs` đều đạt; hash 226 mục hoàn thành/bảo vệ không đổi.
- Commit nội dung [2adc40958ad8e6a81491e1001af2a73288a84699](https://github.com/bohoa96tb/hazi-viet/commit/2adc40958ad8e6a81491e1001af2a73288a84699); commit xác minh [e0b99bb1ac6b4748ba1befd4c5e8a7f31e3267b2](https://github.com/bohoa96tb/hazi-viet/commit/e0b99bb1ac6b4748ba1befd4c5e8a7f31e3267b2); `main` đã fast-forward.
- GitHub Pages run [39891898334](https://github.com/bohoa96tb/hazi-viet/actions/runs/39891898334) thành công trên commit `e0b99bb1ac6b4748ba1befd4c5e8a7f31e3267b2`.
- Tệp JSON live được tải trực tiếp và khớp từng byte với bản kiểm tra: 3.815.776 bytes, SHA-256 `4fe01a79aa5db07af87e2146b60fbb9634e361d5b12fbb11a3a53809f5896367`; toàn khóa gồm 2.234 mục.
- Chưa xác minh bố cục thiết bị, TTS Android hoặc phản biện giáo viên độc lập.
# Phát hành batch-017

Mục baseline 193–204: 有的、正在、没有、真的、还是、还有、八、冷、口、吃、喝、渴. Tiến độ: 204/2.224; còn 2.020; toàn khóa đủ cấu trúc 214/2.234.

- 12 bài V2 gồm 24 câu chính, 12 nhóm bẫy, 36 câu luyện mở và 24 tình huống tự dùng; đáp án/mẫu được tách riêng khỏi đề.
- Đã kiểm ID/thứ tự baseline, hai ví dụ mỗi mục, liên kết khung, hash các mục hoàn thành trước đó và SHA256 khóa học.
- GitHub Pages run [39880813380](https://github.com/bohoa96tb/hazi-viet/actions/runs/39880813380) completed/success trên commit `b5dbc6cef459d8aac515b4bc570a5cd9f6e4072b`.
- Chưa đọc trực tiếp URL Pages để đối chiếu JSON/route live; chưa kiểm bố cục mobile, Android TTS hoặc phản biện giáo viên độc lập.

---

# Phát hành batch-016

Đợt baseline 181–192: 爸爸、不、吗、对、有、没、的、还、是不是、有些、有时、有用. Tiến độ: 192/2.224; còn 2.032; toàn khóa đủ cấu trúc 202/2.234.

- Commit nội dung [a1e41dca6d9061ab466bd33e840ffd7e3bba90a4](https://github.com/bohoa96tb/hazi-viet/commit/a1e41dca6d9061ab466bd33e840ffd7e3bba90a4); main đã fast-forward.
- [GitHub Pages run 39860241131](https://github.com/bohoa96tb/hazi-viet/actions/runs/39860241131) thành công trên commit cache 099856dac0399631d26c24d209332914a5eb7d40. Cache HTML/JS dùng tag `batch-016-fix1`.
- Đã kiểm đủ 12/12 route live đúng ordinal/sourceIndex. Mỗi bài hiện BÀI HỌC ĐẦY ĐỦ, chuẩn V2, hai câu mẫu/audio và hai đề luyện không lộ đáp án trước thao tác; đã xác nhận khung thứ hai của 还 khớp ví dụ.
- `auditV2` 12/12, `validateCourse` trên 2.234 từ, 36 màn renderer và 12 bài audio đạt. Hash 180 bài cũ và 10 bài bảo vệ khớp. Course source SHA256: `4bca2857e543a9d74bfe8f29613a27520c7b9a42ccc242ae16cf2c2dc8d5b58e`.
- Chưa xác nhận TTS/phát nền Android hoặc phản biện giáo viên độc lập; `test-dom.mjs` không chạy vì thiếu `happy-dom`.


---

# Phát hành batch-015

Mục baseline 169–180: 爸、儿子、哥哥、女儿、女朋友、妈妈、妹妹、姐姐、家人、小姐、弟弟、爷爷. Tiến độ: 180/2.224; còn 2.044; toàn khóa đủ cấu trúc 190/2.234, gồm 10 mục ngoài baseline.

- Commit nội dung [85a590fc47ddce64f41616875d3db33cac0c27c6](https://github.com/bohoa96tb/hazi-viet/commit/85a590fc47ddce64f41616875d3db33cac0c27c6); đã fast-forward sang main.
- [GitHub Pages run 39796683993](https://github.com/bohoa96tb/hazi-viet/actions/runs/39796683993) hoàn tất thành công trên đúng commit.
- Đã mở đủ 12 route live; mọi route hiện BÀI HỌC ĐẦY ĐỦ, chuẩn V2, đúng ordinal/sourceIndex.
- Kiểm thứ tự 2.234 mục, liên kết bài và hash 168 mục đã hoàn thành trước đó cùng 10 hash bảo vệ: đạt.
- SHA256 của file course trong commit: `7e2c17edb01fef7dc61adc69f76c759089a74f065008ef7ad4f8472d863562ff`. Chưa tải bytes trực tiếp từ Pages để đối chiếu hash live.
- Chưa kiểm TTS/phát nền Android hoặc phản biện giáo viên độc lập.

Đợt kế tiếp bắt đầu tại ordinal 181; danh sách ID/sourceIndex nằm trong progress.json.

---

# Phát hành batch-014

Mục baseline 157–168: 钱包、门口、饭店、五、哥、妈、妹、姐、子、常、弟、手. Tiến độ: 168/2.224; còn 2.056; toàn khóa đủ cấu trúc 178/2.234, gồm 10 mục ngoài baseline.

- Commit nội dung [d9f1a7a5f7c322b7610124fd064b81c6d33b9dc4](https://github.com/bohoa96tb/hazi-viet/commit/d9f1a7a5f7c322b7610124fd064b81c6d33b9dc4); main đã fast-forward.
- [GitHub Pages run 39789475190](https://github.com/bohoa96tb/hazi-viet/actions/runs/39789475190) completed/success trên đúng commit nội dung.
- Trên Pages live, cả 12 ID ordinal 157–168 mở được với trạng thái BÀI HỌC ĐẦY ĐỦ/chuẩn V2. Đã kiểm giao diện 钱包, 饭店 và 手; thấy nội dung, năm bước và bài học mới.
- courseSha256 trong manifest là hash của tệp nguồn tại commit; lượt này chưa tải trực tiếp tệp Pages để đối chiếu byte và không ghi hash live riêng.
- Kiểm schema V2 và hash 156 mục cũ/10 mục bảo vệ đạt trước phát hành. Chưa kiểm TTS/phát nền Android hoặc phản biện giáo viên độc lập.

Đợt tiếp theo bắt đầu tại ordinal 169: 爸 (hz-h1-f11409a4c688), rồi 儿子、哥哥、女儿、女朋友、妈妈、妹妹、姐姐、家人、小姐、弟弟、爷爷.

---

# Phát hành batch-009

Mục baseline 97–108: 少、差、很、快、慢、真、老、贵、过、远、重、错. Tiến độ đã xác minh GitHub: 108/2.224, còn 2.116; toàn khóa đủ cấu trúc 118/2.234, gồm 10 mục ngoài baseline. Không sửa mục cũ.

- Commit nội dung [db829fb8c39c119a4b88c47c9c7312c668a01344](https://github.com/bohoa96tb/hazi-viet/commit/db829fb8c39c119a4b88c47c9c7312c668a01344); đã cập nhật `main` theo fast-forward.
- [GitHub Pages run 39754129731](https://github.com/bohoa96tb/hazi-viet/actions/runs/39754129731) thành công trên đúng SHA commit nội dung.
- Tệp khóa học live dài 2,863,798 byte, SHA256 `b302ae8d657ec03fb4eba70ddc373463c57d175af034c4dbe0f0364c55d4c296`; tải trực tiếp từ URL Pages khớp đúng file đã kiểm. Có 2.234 từ, 118 bài đủ cấu trúc và đủ 12 ID batch-009.
- `process-batch.mjs apply`, `refresh`, `verify`; `verifyV2`, `validateCourse`, kiểm tra schema, ID/thứ tự/đường dẫn/hash; `node --check`, `git diff --check` và `test-dom.mjs` đều đạt. DOM test không chứng nhận bố cục mobile hoặc TTS Android.
- Trình duyệt desktop live mở 少 ordinal 97/sourceIndex 76: hai câu chính, hai bẫy, phần luyện và khóa đáp án trước thao tác đều hiện đúng. Chưa có phản biện giáo viên độc lập hoặc kiểm Android TTS/phát nền.
- Phiên bản cache HTML và JS đã đổi sang `batch-009`; manifest phát hành ghi nhận commit nội dung, số mục, SHA dữ liệu live và Pages run.

Đợt tiếp theo bắt đầu tại ordinal 109: 难 (sourceIndex 88), rồi 高、不大、不对、重要、做、动、学、干、忙、用、看.

---

# Phát hành batch-006

Mục baseline 61–72: 帮忙、怎么、手机、电话、说话、请进、请问、奶、树、歌、毛、水. Tiến độ đã xác minh GitHub 72/2.224, còn 2.152; toàn khóa 82/2.234 bài đầy đủ. Chỉ 12 record mục tiêu thay đổi; 70 bài đầy đủ trước đó và tất cả record khác giữ nguyên.

24 ví dụ chính, 20 nhóm bẫy, 34 câu luyện mở, 24 tình huống tự dùng với gợi ý ba mức. Không đổi renderer/audio hay dữ liệu học cá nhân. Có ví dụ tách 帮忙 với targetParts; 请进 được bỏ dấu ngoặc kép thừa từ phần giới thiệu thẻ tra cứu.

Đã chạy verify toàn khóa, DOM integration trên bài mới nhất và hồi quy V1/不用, kiểm đồng nhất ví dụ/ordinal baseline, đối chiếu chỉ 12 record thay đổi, cú pháp JS/MJS và diff --check. DOM không chứng nhận TTS Android; chưa phản biện giáo viên độc lập.

Đã đọc lại GitHub ở commit 190bfb38850f92d643fbace8d60e9b7e22ac4c45: progress 72/2.224 và toàn bộ nội dung khóa học khớp bản kiểm tra. SHA được ghi trong commit kế tiếp để tránh tự tham chiếu. Đã phát hành main và xác minh live riêng cho batch-006; xem kết quả dưới đây.

## Xác minh live batch-006

- Commit nội dung `190bfb38850f92d643fbace8d60e9b7e22ac4c45`; commit phát hành đã kiểm `f20c34b2e92fc60f09ec89f8425b5e340ee89cae`.
- [GitHub Pages run 39728329710](https://github.com/bohoa96tb/hazi-viet/actions/runs/39728329710): completed/success, head_sha đúng commit phát hành.
- Toàn bộ byte dữ liệu tải từ URL Pages khớp bản kiểm tra; SHA256 `2b3c43d000393c0f902daff2511a95bdb1f2686162421af85a3132372e00cee9`. Đủ 12 ID mới, lesson.version=2; 82 bài đầy đủ/2.234. Manifest live ghi batch-006, scopeCompleted=72, đúng contentCommit.
- Trình duyệt thật mở [帮忙](https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word=hz-h1-8df32f671cf0), hiện từ số 61 và sourceIndex 39; hai ví dụ; targetParts tô đậm đúng 帮 và 忙 khi tách; lời giải ẩn ban đầu rồi mở riêng sau thao tác. [Ảnh kiểm chứng desktop](verification/batch-006.jpg).
- Chưa kiểm Android TTS/phát nền và bố cục mobile; chưa phản biện giáo viên độc lập. Không có lỗi triển khai còn mở tại bản được kiểm. Lần mở trong lúc build còn là bản cũ; chỉ xác nhận sau build và đọc lại server, không quy cho cache điện thoại.
- Commit ghi xác minh này chỉ đổi tài liệu/manifest và thêm ảnh kiểm chứng, không đổi khóa học hoặc số hoàn thành.

---

## Lịch sử batch-005

Nội dung mới: mục baseline 49–60, 回、帮、打、找、电、等、话、请、问、不用、回答、多少. 60/2.224 đã hoàn thiện, còn 2.164; toàn khóa 70/2.234 bài đủ dữ liệu. Không sửa nội dung 58 bài V1 đã bảo vệ.

Hỗ trợ V2: hai câu gắn khung, bài mở tách lời giải, hai tình huống với ba mức gợi ý, audio Trung/Việt không lấy Pinyin, giữ bài V1.

Đã chạy verify toàn khóa, DOM integration, kiểm cú pháp JS/MJS và diff --check. Chưa kiểm bố cục trực quan và TTS trên Android thật; chưa phản biện giáo viên độc lập.

Đã đọc lại progress và toàn bộ blob khóa học trên GitHub ở commit 89ce086f352807e43a7c68abf105452b5bc4a17e: khớp dữ liệu đã kiểm tra, 60/2.224 mục. Commit này được ghi trong commit kế tiếp để tránh tự tham chiếu SHA. Manifest release.json chứa SHA256 khóa học. Trạng thái main/Pages/live cần đối chiếu lượt Actions đúng HEAD; xác minh live sẽ được ghi riêng sau phát hành.


## Xác minh bản đã triển khai

- Commit nội dung: `89ce086f352807e43a7c68abf105452b5bc4a17e`; commit phát hành đã kiểm `42e8d618328b8af123ee58d6cce3527eb8b60139`.
- GitHub Pages run [39726376368](https://github.com/bohoa96tb/hazi-viet/actions/runs/39726376368): completed / success, head_sha đúng commit phát hành.
- HTTP khóa học live khớp toàn bộ byte với bản đã kiểm; SHA256 `85fcd98d17c99d4bbb69bc9b0e0995146a90e1be6ca4556f60ff7e541161e89d`. Đủ 12 ID mới, lesson.version=2, 70 bài đầy đủ/2.234; manifest và vocabulary.js?v=batch-005 khớp.
- Trình duyệt live: bài 回 số 49; hai ví dụ gắn khung, không tab ví dụ lặp; lời giải không hiện ban đầu, mở riêng; mẫu tự dùng chỉ hiện ở mức gợi ý thứ ba. Đã xem ảnh bố cục đại diện desktop. Chưa kiểm mobile/Android, giọng TTS thiết bị và phản biện giáo viên độc lập.
- Commit ghi kết quả xác minh này chỉ đổi tài liệu/manifest, không đổi khóa học, số tiến độ, code hay hash bài cũ. Các đợt tiếp theo vẫn phải kiểm HEAD main/content và tiến độ thật.




## Xác minh live batch-007

- Commit nội dung `776234ddd73b740bb0ad2b75b362d750174bd859`; [GitHub Pages run 39743990647](https://github.com/bohoa96tb/hazi-viet/actions/runs/39743990647) hoàn tất thành công với `head_sha` đúng commit nội dung.
- Tải trực tiếp `https://bohoa96tb.github.io/hazi-viet/data/vocabulary/hanzii-course.json`: 2.680.784 byte, SHA256 `c16970cf19df773701df924db8b1b18c0b74d8d55158e513425940b390078e57`; đủ 2.234 mục và đủ 12 ID batch-007, tất cả `status=deep`, `lesson.version=2`. Manifest live khớp SHA và commit.
- Trình duyệt thật tại [bài 洗](https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word=hz-h1-0896d5d77abe): ordinal 73/sourceIndex 52, chuẩn V2, đúng hai ví dụ; bài luyện hiển thị riêng và lời giải đóng trước khi thử. Ảnh chụp đã lưu kèm báo cáo.
- Đã chạy `verifyV2` cho 12 bài, `validateCourse` cho 2.234 mục (94 bài đầy đủ), xác nhận 82 hash cũ/bảo vệ khớp; kiểm JSON và audio/safety qua bộ test V2. `test-dom.mjs` không chạy vì môi trường này không có `happy-dom`; chưa kiểm trên Android/mobile và chưa có phản biện giáo viên độc lập.


## Xác minh live batch-008

- Commit nội dung [ffa5dfe57c211a1a17738dceb55993844c75fefb](https://github.com/bohoa96tb/hazi-viet/commit/ffa5dfe57c211a1a17738dceb55993844c75fefb); [GitHub Pages run 39749818404](https://github.com/bohoa96tb/hazi-viet/actions/runs/39749818404) hoàn tất thành công, đúng SHA commit nội dung.
- [Dữ liệu khóa học live](https://bohoa96tb.github.io/hazi-viet/data/vocabulary/hanzii-course.json) có 2.773.075 byte, SHA256 `bfef9291996769c5b9e0863bb80cc104780df2dff9deee69435da92b1758fc35`; đủ 2.234 từ, 106 bài đủ cấu trúc và 12 ID batch-008 (ordinal 85–96, status deep, lesson.version=2). Manifest ghi cùng hash và run.
- [Bài 好 trên website](https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word=hz-h1-72f8c3542984): ordinal 95/sourceIndex 74; desktop live hiện tiêu đề V2, đúng hai câu mẫu, hai bẫy (gồm cách đọc 好 trong 爱好), bài luyện riêng và lời giải ẩn trước khi thử.
- Đã chạy apply/verify toàn khóa: 2.234 ID/thứ tự/nhóm bài đúng, 96/2.224 hoàn thành, 2.128 còn lại; hash 84 bài đã hoàn thành và 10 bài ngoài baseline được bảo vệ giữ nguyên. 12/12 bài qua verifyV2; cú pháp JS liên quan và diff --check đều đạt.
- Đối chiếu thêm từ điển Bộ Giáo dục cho 奶奶/牛奶 và hai cách đọc thông dụng của 好. Chưa chạy test-dom vì thiếu happy-dom; không kiểm mobile/Android TTS hoặc phản biện giáo viên độc lập.
- Commit ghi tracker [49c58c1df00543624269a29c74b0c646d31f0048](https://github.com/bohoa96tb/hazi-viet/commit/49c58c1df00543624269a29c74b0c646d31f0048) và [Pages run 39750423025](https://github.com/bohoa96tb/hazi-viet/actions/runs/39750423025) hoàn tất thành công với đúng SHA tracker. Release manifest live đã được xác nhận; tracker không đổi dữ liệu khóa học hay số hoàn thành.


## Xác minh live batch-010

- Commit nội dung và phát hành: `dea910218412e89bd4f0dd78b921f94963200f4a`; Pages run [39767965404](https://github.com/bohoa96tb/hazi-viet/actions/runs/39767965404) hoàn tất thành công đúng SHA.
- Khóa học live: 2.947.230 byte, SHA256 `d8d1e594dfc4adb1af1ab68f3f9705b1988ea7215a71e49453beaefb583bc2a4`; đủ 2.234 mục, 130 bài đủ cấu trúc; 12 ID mới khớp ordinal 109–120.
- Đã chạy `process-batch.mjs apply`, `verify`, `verify-v2.mjs`, `test-dom.mjs` và `git diff --check`; đều đạt. Hash các bài cũ/bảo vệ được kiểm tra trong verify. Chưa xác nhận bố cục trực quan, Android TTS/phát nền hoặc phản biện giáo viên độc lập.

## Xác minh live batch-011

- Commit nội dung `b7d50ae12e196d231f60516b9b13f1371e65cbdf`; [GitHub Pages run 39772026450](https://github.com/bohoa96tb/hazi-viet/actions/runs/39772026450) hoàn tất thành công, đúng `head_sha`.
- Dữ liệu khóa học live có 2.234 mục; đủ 12 ID mới ở ordinal 121–132, tất cả `status=deep` và lesson V2. SHA256 live: `868db0c72b083127797120cd8795861e177e1c412dfb91a60fb9cc319ca0f7c6`.
- `process-batch.mjs verify`, `verify-v2.mjs`, `test-dom.mjs` và `git diff --check` đều đạt. Chưa kiểm tra giao diện trực quan/Android TTS hoặc phản biện giáo viên độc lập. Commit tracker này chỉ ghi tiến độ và bằng chứng phát hành.

## Xác minh live batch-012

- Nội dung mới: ordinal 133–144, commit `7d0a5a0f8cf9695e3602f223d791566d93087b99`; 144/2.224 mục đã hoàn thành, còn 2.080.
- Nhánh `main` được fast-forward tới `b60e104048187949dd09b98cebc92cabe150a48f`. [GitHub Pages run 39779817853](https://github.com/bohoa96tb/hazi-viet/actions/runs/39779817853) hoàn tất thành công với đúng `head_sha`.
- Dữ liệu live có 2.234 từ, `schemaVersion=2`, `status=expanding`; SHA256 `c26b49580cc23e0bd866e5949cfbb38aa0fc0628ac6f6765916fcfa6c4eaa027`, khớp byte với dữ liệu đã kiểm. 12 ID mới khớp batch-012, có `status=deep` và lesson V2.
- `process-batch.mjs verify`, `verify-v2.mjs`, `test-dom.mjs`, kiểm cú pháp JS/MJS và `git diff --check` đều đạt. Chưa kiểm bố cục trực quan trình duyệt, Android TTS/phát nền hoặc phản biện giáo viên độc lập.
- Commit tracker ghi bằng chứng này không đổi dữ liệu khóa học hay số hoàn thành.


## Xác minh live batch-013

- Nội dung mới: ordinal 145–156, commit nội dung `51b1e857bf0eb6bdbc02e8ac209a9829f3732a1d`; tiến độ 156/2.224, còn 2.068.
- Nhánh `main` triển khai commit `ddc45fc4183297f0e99a87b4022fff4857da76bb`. [GitHub Pages run 39781762042](https://github.com/bohoa96tb/hazi-viet/actions/runs/39781762042) hoàn tất thành công với đúng `head_sha`.
- Dữ liệu khóa học live có 2.234 từ, `schemaVersion=2`, `status=expanding`; SHA256 `3675a8d9717b38a5e43f3a4b135f8197f38894de3d9cca83bc3cb480e3ca3730`, khớp byte với bản đã kiểm. Đủ 12 ID mới, trạng thái `deep`, lesson V2; 166 bài đủ cấu trúc.
- Đã chạy `process-batch.mjs verify`, `verify-v2.mjs`, `test-dom.mjs`, kiểm cú pháp JS/MJS và `git diff --check`; đều đạt. Bài 商店 ordinal 145 hiển thị V2 trên trình duyệt live.
- Chưa kiểm bố cục chi tiết, Android TTS/phát nền hoặc phản biện giáo viên độc lập.


## Batch-014 — ordinal 157–168

Mục mới: 钱包、门口、饭店、五、哥、妈、妹、姐、子、常、弟、手. Dữ liệu sau batch: 168/2224, còn 2056; 178/2234 bài đủ cấu trúc. Nội dung theo chuẩn V2. Verify toàn khóa, test DOM, commit, Pages run và dữ liệu live sẽ được ghi sau khi xác nhận từng bước.


# Phát hành batch-018

Mục baseline 205–216: 睡、饭、饿、什么、包子、午饭、吃饭、好吃、干净、早饭、晚饭、最好. Tiến độ: 216/2.224; còn 2.008; toàn khóa đủ cấu trúc 226/2.234.

- 12 bài V2 gồm 24 câu chính, 12 nhóm phân biệt, 36 câu luyện mở và 24 tình huống tự dùng; đáp án/mẫu được tách riêng.
- `process-batch.mjs verify` và `test-dom.mjs` đều qua; đã rà ID/thứ tự, liên kết, hash hoàn thành, renderer, audio và luồng mở đáp án.
- Đã sửa một lỗi nội dung Pinyin trong lời giảng của 还 (mục 188) và phép dò Pinyin để tránh nhận nhầm chuỗi con trong từ tiếng Việt.
- Commit nội dung: [5baa08f6a647](https://github.com/bohoa96tb/hazi-viet/commit/5baa08f6a647e8ecd275805d5e8dbdbeff0a7262). `process-batch verify` và `test-dom.mjs` đều qua.
- GitHub Pages run [39887553064](https://github.com/bohoa96tb/hazi-viet/actions/runs/39887553064) completed/success trên commit [74a9cd63016e](https://github.com/bohoa96tb/hazi-viet/commit/74a9cd63016ee89be6614cc4a4c3f2cb73c5414a). JSON live không truy cập được qua web lookup nên chưa đối chiếu trực tiếp SHA/route.
- Chưa xác minh bố cục thiết bị, TTS Android hay phản biện giáo viên độc lập.


## Batch-021 — mục 253–270

18 mục: 半天、后天、早上、明天、星期天、星期日、昨天、晚上、白天、见面、马上、一、七、三、两、二、几、十. Tiến độ nội dung chuẩn bị: 270/2.224; còn 1.954; toàn khóa 280/2.234 bài đủ cấu trúc. Mỗi bài có hai câu chính, bài luyện mở với đáp án riêng và hai tình huống tự dùng. Có phân biệt 两/二, số lượng/thứ tự, thời gian/thời lượng, 几/多少/几乎 và cụm tách 见面.

`process-batch apply/verify`, kiểm cú pháp JS và `git diff --check` đạt; xác nhận ID/thứ tự/hash các bài cũ được bảo toàn. Trạng thái commit, DOM và Pages sẽ ghi sau khi xác minh. Chưa kiểm TTS/phát nền Android hoặc phản biện giáo viên độc lập.


### Bằng chứng batch-021 đã xác minh

- Commit nội dung [c67a4cb296bb783f81ccfd60003acbae9be617e6](https://github.com/bohoa96tb/hazi-viet/commit/c67a4cb296bb783f81ccfd60003acbae9be617e6) đã lưu và đưa vào main bằng fast-forward có expected SHA. Tree GitHub khớp tree bản đã kiểm, `f979cf3b928402531ae1db4f424697fc664a2146`.
- [Pages run 39915674513](https://github.com/bohoa96tb/hazi-viet/actions/runs/39915674513) completed/success trên đúng SHA nội dung.
- Live course 4.102.886 byte; SHA256 `8226cf8421195cedc0ad5afb740244fd96115bd0255860995df7d1ad33905a6d`, khớp byte với nguồn đã kiểm; 2.234 ID, 280 bài deep, đủ 18/18 bài mới có lesson khớp batch. Cache trang đã tăng lên batch-021.
- `test-dom.mjs` đạt, gồm loader V1/V2, hai câu, audio dispatch, đáp án ẩn, giữ bản nháp, ba mức gợi ý, ôn/yêu thích/tìm kiếm và phân trang bẫy. Verify toàn khóa, cú pháp JS và diff check đạt; hash 252 bài cũ và 10 bài bảo vệ giữ nguyên.
- UI live 半天: ordinal 253/sourceIndex 243, chuẩn V2, đúng hai câu chính, đề luyện chưa lộ lời giải. Chưa chứng nhận bố cục điện thoại, TTS/phát nền Android hay phản biện giáo viên độc lập.
- Tiến độ chính thức 270/2.224, còn 1.954; 280/2.234 bài đầy đủ toàn khóa. Tiếp theo ordinal 271: 哪, rồi 就、第.
