import json,pathlib,collections
ROOT=pathlib.Path(__file__).resolve().parent; D=ROOT.parent/'data'; D.mkdir(exist_ok=True)
raw=json.load(open(ROOT/'complete-original.json'))
dictio={x['character']:x for l in open(ROOT/'dictionary-original.txt') if (x:=json.loads(l))}
vi={}
for line in '''一|một
二|hai
三|ba
四|bốn
五|năm
六|sáu
七|bảy
八|tám
九|chín
十|mười
人|người
口|miệng
日|ngày; mặt trời
月|tháng; mặt trăng
水|nước
火|lửa
山|núi
木|cây
大|to, lớn
小|nhỏ
上|trên; đi lên
下|dưới; đi xuống
中|giữa; trong
国|nước, quốc gia
我|tôi
你|bạn
他|anh ấy
她|cô ấy
们|hậu tố chỉ số nhiều
好|tốt; đẹp
学|học
生|sinh; sống
学生|học sinh
学习|học tập
中国|Trung Quốc
汉语|tiếng Hán
老师|giáo viên
朋友|bạn bè
是|là
不|không
有|có
没|không có
在|ở; đang
来|đến
去|đi
看|nhìn; xem
听|nghe
说|nói
读|đọc
写|viết
吃|ăn
喝|uống
爱|yêu
家|nhà; gia đình
爸|bố
妈|mẹ
儿|con
女|nữ
子|con
字|chữ
书|sách
天|trời; ngày
年|năm
今|nay
明|sáng; tiếp theo
会|biết (kỹ năng); có thể
想|muốn; nghĩ; nhớ
能|có thể
喜欢|thích
工作|công việc; làm việc
谢谢|cảm ơn
再见|tạm biệt
请|mời; xin
问|hỏi
买|mua
钱|tiền
多|nhiều
少|ít
几|mấy
这|này
那|kia
哪|nào
谁|ai
的|trợ từ liên kết
了|trợ từ chỉ thay đổi hoặc hoàn thành
吗|trợ từ nghi vấn
呢|trợ từ cuối câu
和|và
很|rất
都|đều
也|cũng
到|đến
时|thời gian
点|điểm; giờ
分|phút; phần
开|mở
关|đóng
雨|mưa
电|điện
话|lời nói
车|xe
热|nóng
冷|lạnh
高|cao
气|khí; hơi'''.splitlines():
 k,v=line.split('|');vi[k]=v
words=[]; chars={}
for w in raw:
 levels=[int(l[4:]) for l in w['level'] if l.startswith('old-')]
 if not levels:continue
 level=min(levels); f=w['forms'][0]; word=w['simplified']
 words.append({'word':word,'level':level,'pinyin':f['transcriptions']['pinyin'],'english':'; '.join(f['meanings']),'vi':vi.get(word,''),'traditional':f['traditional']})
 for c in word:
  if '\u3400'<=c<='\u9fff': chars[c]=min(chars.get(c,7),level)
for level in range(1,7):
 entries=[]
 for c,l in chars.items():
  if l!=level:continue
  x=dictio.get(c,{})
  entries.append({'char':c,'level':l,'pinyin':x.get('pinyin',[]),'english':x.get('definition',''),'vi':vi.get(c,''),'radical':x.get('radical',''),'decomposition':x.get('decomposition',''),'etymology':x.get('etymology')})
 entries.sort(key=lambda x:x['char'])
 (D/f'hsk{level}-core.json').write_text(json.dumps(entries,ensure_ascii=False))
 (D/f'words-hsk{level}.json').write_text(json.dumps([w for w in words if w['level']==level],ensure_ascii=False))
meta={'version':1,'standard':'HSK 2.0','characterLevelRule':'Cấp xuất hiện đầu tiên trong danh sách từ HSK 2.0 của nguồn; không phải danh mục chữ chính thức riêng.','levels':[{'level':l,'words':sum(w['level']==l for w in words),'characters':sum(v==l for v in chars.values())} for l in range(1,7)],'totalWords':len(words),'totalCharacters':len(chars),'vietnameseEntries':sum(c in vi for c in chars)}
(D/'data/catalog.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
examples=[('我','我是学生。','Tôi là học sinh.'),('你','你好吗？','Bạn khỏe không?'),('他','他是我的朋友。','Anh ấy là bạn của tôi.'),('她','她在家。','Cô ấy ở nhà.'),('学','我学习汉语。','Tôi học tiếng Hán.'),('好','今天天气很好。','Hôm nay thời tiết rất đẹp.'),('水','我想喝水。','Tôi muốn uống nước.'),('书','我喜欢看书。','Tôi thích đọc sách.'),('吃','你想吃什么？','Bạn muốn ăn gì?'),('喝','我不喝茶。','Tôi không uống trà.'),('家','我家有三个人。','Nhà tôi có ba người.'),('爱','我爱我的家。','Tôi yêu gia đình mình.'),('去','我去学校。','Tôi đi đến trường.'),('来','请进来。','Xin mời vào.'),('看','你看见了吗？','Bạn nhìn thấy chưa?'),('听','我喜欢听音乐。','Tôi thích nghe nhạc.'),('写','我会写汉字。','Tôi biết viết chữ Hán.'),('买','我想买一本书。','Tôi muốn mua một quyển sách.'),('钱','这个多少钱？','Cái này bao nhiêu tiền?'),('不','我不是老师。','Tôi không phải giáo viên.'),('有','我有一个问题。','Tôi có một câu hỏi.'),('在','他在学校。','Anh ấy ở trường.'),('吗','你是老师吗？','Bạn là giáo viên à?'),('的','这是我的书。','Đây là sách của tôi.'),('人','那个人是我的朋友。','Người kia là bạn của tôi.')]
(D/'data/sentences.json').write_text(json.dumps([{'char':c,'zh':z,'vi':v,'source':'Biên soạn cho Hanzi Việt; không khẳng định toàn bộ từ trong câu cùng cấp HSK.'}for c,z,v in examples],ensure_ascii=False))
grammar=[{'title':'Giới thiệu với 是','pattern':'Chủ ngữ + 是 + danh từ','ex':'我是学生。','meaning':'Tôi là học sinh.','trap':'Không thêm 是 trước tính từ trong câu miêu tả cơ bản. Dùng 她很好。','chars':'是我你他她'}, {'title':'Hỏi có / không với 吗','pattern':'Câu trần thuật + 吗？','ex':'你是老师吗？','meaning':'Bạn là giáo viên à?','trap':'Không thêm 吗 vào câu đã có từ hỏi như 什么, 谁 trong cách hỏi thông thường.','chars':'吗你是'}, {'title':'Sở hữu với 的','pattern':'Người sở hữu + 的 + vật/người','ex':'这是我的书。','meaning':'Đây là sách của tôi.','trap':'Không đặt 的 sau vật sở hữu. Một số quan hệ thân thuộc có thể lược 的: 我妈妈。','chars':'的我书这'}, {'title':'Phủ định với 不','pattern':'不 + động từ / tính từ','ex':'我不喝茶。','meaning':'Tôi không uống trà.','trap':'Phủ định 有 dùng 没有, không dùng 不有.','chars':'不喝有'}, {'title':'Nói vị trí với 在','pattern':'Người / vật + 在 + nơi chốn','ex':'他在学校。','meaning':'Anh ấy ở trường.','trap':'Phân biệt 在 chỉ vị trí với 在 đứng trước động từ để chỉ hành động đang diễn ra.','chars':'在他学'}, {'title':'Có với 有','pattern':'Chủ ngữ + 有 + đối tượng','ex':'我有一本书。','meaning':'Tôi có một quyển sách.','trap':'Giữa số và danh từ thường cần lượng từ: 一本书, không dùng 一书.','chars':'有一书我'}]
(D/'data/grammar.json').write_text(json.dumps(grammar,ensure_ascii=False))
print(json.dumps(meta,ensure_ascii=False))
