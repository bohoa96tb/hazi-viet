const filled=x=>typeof x==='string'&&x.trim().length>0;
// Keep learner-facing Pinyin separate from prose labels. This explicit
// syllable inventory rejects values such as “cách đọc dạy”.
const PINYIN_BASES=new Set(`a ai an ang ao ba bai ban bang bao bei ben beng bi bian biao bie bin bing bo bu
ca cai can cang cao ce cei cen ceng ci cong cou cu cuan cui cun cuo
cha chai chan chang chao che chen cheng chi chong chou chu chua chuai chuan chuang chui chun chuo
da dai dan dang dao de dei den deng di dian diao die ding diu dong dou du duan dui dun duo
e ei en eng er fa fan fang fei fen feng fo fou fu ga gai gan gang gao ge gei gen geng gong gou gu gua guai guan guang gui gun guo
ha hai han hang hao he hei hen heng hong hou hu hua huai huan huang hui hun huo
ji jia jian jiang jiao jie jin jing jiong jiu ju juan jue jun ka kai kan kang kao ke kei ken keng kong kou ku kua kuai kuan kuang kui kun kuo
la lai lan lang lao le lei leng li lia lian liang liao lie lin ling liu lo lou lu luan lue lun luo lü lüe
ma mai man mang mao me mei men meng mi mian miao mie min ming miu mo mou mu
na nai nan nang nao ne nei nen neng ni nian niang niao nie nin ning niu nong nou nu nuo nü nüe
o ou pa pai pan pang pao pei pen peng pi pian piao pie pin ping po pou pu
qi qia qian qiang qiao qie qin qing qiong qiu qu quan que qun ran rang rao re ren reng ri rong rou ru rua ruan rui run ruo
sa sai san sang sao se sei sen seng si song sou su suan sui sun suo
sha shai shan shang shao she shei shen sheng shi shou shu shua shuai shuan shuang shui shun shuo
ta tai tan tang tao te teng ti tian tiao tie ting tong tou tu tuan tui tun tuo wa wai wan wang wei wen weng wo wu
xi xia xian xiang xiao xie xin xing xiong xiu xu xuan xue xun ya yan yang yao ye yi yin ying yo yong you yu yuan yue yun
za zai zan zang zao ze zei zen zeng zi zong zou zu zuan zui zun zuo
zha zhai zhan zhang zhao zhe zhei zhen zheng zhi zhong zhou zhu zhua zhuai zhuan zhuang zhui zhun zhuo nar zher`.split(/\s+/));
const PINYIN_MARKS=new Map([
 ['ā',['a',1]],['á',['a',2]],['ǎ',['a',3]],['à',['a',4]],['ē',['e',1]],['é',['e',2]],['ě',['e',3]],['è',['e',4]],
 ['ī',['i',1]],['í',['i',2]],['ǐ',['i',3]],['ì',['i',4]],['ō',['o',1]],['ó',['o',2]],['ǒ',['o',3]],['ò',['o',4]],
 ['ū',['u',1]],['ú',['u',2]],['ǔ',['u',3]],['ù',['u',4]],['ǖ',['ü',1]],['ǘ',['ü',2]],['ǚ',['ü',3]],['ǜ',['ü',4]]
]);
const pinyinChar=char=>{if(PINYIN_MARKS.has(char)){const [base,tone]=PINYIN_MARKS.get(char);return [base,tone];}if(/[a-zA-Z]/u.test(char))return [char.toLowerCase(),0];if(char==='ü'||char==='Ü')return ['ü',0];return null;};
const syllableSequenceValid=token=>{if(!token)return false;let source=[...token];if(source.at(-1)==='r'&&source.length>1)source=source.slice(0,-1);const memo=new Map();const visit=pos=>{if(pos===source.length)return true;if(memo.has(pos))return memo.get(pos);for(const base of PINYIN_BASES){if(pos+base.length>source.length)continue;let tone=0,ok=true;for(let i=0;i<base.length;i++){const part=pinyinChar(source[pos+i]);if(!part||part[0]!==base[i]){ok=false;break;}if(part[1])tone=part[1];}if(!ok)continue;let end=pos+base.length;if(end<source.length&&/[1-5]/u.test(source[end]))end++;if(visit(end)){memo.set(pos,true);return true;}}memo.set(pos,false);return false;};return visit(0);};
export function isPinyinText(value){const raw=String(value??'').normalize('NFC');if(!raw||/[^ -\u007eāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ’']/u.test(raw))return false;return raw.split(/[ '\u2019]+/u).every(syllableSequenceValid);}
export const judgmentsV2={correct:'Đúng và phù hợp','wrong-grammar':'Câu sai ngữ pháp','different-meaning':'Đúng nhưng đổi nghĩa','wrong-intent':'Không hợp ý định','unnatural':'Kém tự nhiên trong ngữ cảnh','overlap':'Vẫn đúng và gần nghĩa','context-needed':'Cần ngữ cảnh'};
export function auditV2(w){
 const l=w.lesson,issues=[],bad=(path,message)=>issues.push({path,message});
 const need=(o,keys,path)=>keys.forEach(k=>{if(!filled(o?.[k]))bad(path+'.'+k,'Thiếu '+k)});
 const unique=(a,path)=>{if(!Array.isArray(a)||a.some(x=>!filled(x.id))||new Set(a.map(x=>x.id)).size!==a.length)bad(path,'Danh sách thiếu hoặc trùng ID')};
 need(l,['authorship'],'introduction');if(!Array.isArray(l.sources)||!l.sources.length||l.sources.some(x=>!/^https:\/\//.test(x)))bad('introduction.sources','Thiếu nguồn');
 if(!Number.isInteger(l.cohortOrdinal)||l.cohortOrdinal<1)bad('introduction.ordinal','Thiếu thứ tự baseline');
 need(l.introduction,['scope'],'introduction');if(!Array.isArray(w.intro)||!w.intro.length||w.intro.some(i=>!isPinyinText(i.pinyin)||!filled(i.meaning)))bad('introduction.readings','Thiếu Pinyin hợp lệ hoặc nghĩa giới thiệu');
 need(l.meaning,['scene','explanation','boundary','takeaway'],'meaning');if(!Array.isArray(l.meaning?.conditions)||!l.meaning.conditions.length||l.meaning.conditions.some(x=>!filled(x)))bad('meaning.conditions','Thiếu điều kiện dùng');
 const ex=l.examples||[];unique(ex,'examples');if(ex.length!==2||new Set(ex.map(e=>e.zh)).size!==2)bad('examples','Cần đúng hai câu chính khác nhau');for(const e of ex){need(e,['zh','vi','analysis'],'examples');if(!e.zh?.includes(w.hanzi)&&!(Array.isArray(e.targetParts)&&e.targetParts.length&&e.targetParts.every(p=>e.zh?.includes(p))))bad('examples.target','Thiếu từ mục tiêu');if(e.practiceAllowed!==true)bad('examples.practice','Câu mẫu phải đúng để luyện');}
 const us=l.usages||[];unique(us,'usages');if(us.length<1||us.length>2)bad('usages','Cần 1–2 khung');for(const u of us){need(u,['frame','position','required','omission'],'usages');if(!ex.some(e=>e.id===u.exampleId))bad('usages.exampleId','Liên kết ví dụ sai')}
 unique(l.traps,'traps');if(!l.traps?.length&&l.noTrapReason!=='Chưa thấy bẫy thông dụng cần lưu ý ở mức học này.')bad('traps','Thiếu kết quả rà bẫy');need(l.trapReview,['readingsAndMeanings','literalTranslation','confusables'],'traps.review');
 for(const t of l.traps||[]){need(t,['title','scene','possibleConfusion','difference','boundary','tip'],'traps');unique(t.cases,'traps.cases');if((t.cases||[]).length<2)bad('traps.cases','Thiếu cặp đối chiếu');need(t.replacement,['result','explanation'],'traps.replacement');if(!judgmentsV2[t.replacement?.result])bad('traps.replacement','Nhãn không hợp lệ');for(const c of t.cases||[]){need(c,['zh','vi','comment'],'traps.cases');if(!judgmentsV2[c.judgment]||c.practiceAllowed!==false)bad('traps.cases','Nhãn/luyện sai');if(c.judgment==='wrong-grammar')need(t.corrections?.find(r=>r.caseId===c.id),['zh','vi','reason'],'traps.correction')}}
 const pinyinOk=v=>isPinyinText(String(v).replace(/[.!?。？！]+$/u,''));
 for(const t of l.traps||[]){for(const c of t.cases||[])if(c.pinyin&&!pinyinOk(c.pinyin))bad('traps.cases.pinyin','Pinyin đối chiếu không hợp lệ');for(const r of t.corrections||[])if(r.pinyin&&!pinyinOk(r.pinyin))bad('traps.correction.pinyin','Pinyin câu sửa không hợp lệ');}
 unique(l.checks,'checks');if((l.checks||[]).length<2||(l.checks||[]).length>4)bad('checks','Cần 2–4 bài luyện');for(const c of l.checks||[]){need(c,['question'],'checks');if(c.type!=='open'||'answer'in c||'explanation'in c)bad('checks','Phải tách đáp án');const a=l.answers?.[c.id];need(a,['explanation'],'checks.answer');if(!Array.isArray(a?.accepted)||!a.accepted.length||a.accepted.some(x=>!filled(x)))bad('checks.answer','Thiếu đáp án chấp nhận')}
 unique(l.selfUse,'selfUse');if(l.selfUse?.length!==2)bad('selfUse','Cần hai tình huống');for(const s of l.selfUse||[]){need(s,['prompt'],'selfUse');if('model'in s||'hints'in s)bad('selfUse','Phải tách gợi ý');const a=l.selfAnswers?.[s.id];need(a,['idea','frame','model','vi'],'selfUse.answer');if(!Array.isArray(a?.criteria)||!a.criteria.length||a.criteria.some(x=>!filled(x)))bad('selfUse.criteria','Thiếu tiêu chí tự đối chiếu')}
 if(Object.keys(l.answers||{}).some(id=>!l.checks?.some(c=>c.id===id)))bad('checks.answers','Đáp án mồ côi');if(Object.keys(l.selfAnswers||{}).some(id=>!l.selfUse?.some(s=>s.id===id)))bad('selfUse.answers','Mẫu mồ côi');
 need(l.pronunciation,['text'],'pronunciation');if(!l.pronunciation?.text?.endsWith('Đọc từ một lần, rồi đọc câu mẫu một lần.'))bad('pronunciation','Thiếu nhiệm vụ đọc');if(l.pronunciation?.contexts&&(!Array.isArray(l.pronunciation.contexts)||!l.pronunciation.contexts.length||l.pronunciation.contexts.some(c=>!Number.isInteger(c.introIndex)||c.introIndex<0||c.introIndex>=w.intro.length||!filled(c.text)||!c.text.includes(w.hanzi))))bad('pronunciation.contexts','Ngữ cảnh cách đọc không hợp lệ');
 const raw=structuredClone(l);for(const e of raw.examples||[])delete e.pinyin;if(raw.pronunciation)delete raw.pronunciation.pinyin;for(const t of raw.traps||[]){for(const c of t.cases||[])delete c.pinyin;for(const r of t.corrections||[])delete r.pinyin;}if(/"(?:pinyin|numeric|sourcePinyin)"\s*:/.test(JSON.stringify(raw))||/[āǎēěīǐōǒūǔǖǘǚǜ]/iu.test(JSON.stringify(raw)))bad('introduction.pinyin','Pinyin ngoài phạm vi');
 return {ready:!issues.length,issues,completeSections:Math.max(0,6-new Set(issues.map(i=>i.path.split('.')[0])).size),totalSections:6};
}
export function splitSpeech(s){return String(s||'').replace(/[*_`#]/g,'').split(/([\p{Script=Han}]+(?:[，。？！、；：…“”「」《》\s]*[\p{Script=Han}]+)*[，。？！、；：…]*)/u).filter(s=>/[\p{L}\p{N}]/u.test(s)).map(s=>({text:s.trim().replace(/[→/]/g,', '),lang:/\p{Script=Han}/u.test(s)?'zh-CN':'vi-VN'}))}
export function v2Audio(w,part='full',index=0){
 if(!auditV2(w).ready)return [];const l=w.lesson,q=[],say=(s,label)=>q.push(...splitSpeech(s).map(x=>({...x,label}))),zh=(s,label)=>q.push({text:s,lang:'zh-CN',label});
 if(['full','introduction'].includes(part)){const contexts=l.pronunciation?.contexts;if(contexts?.length)for(const c of contexts)zh(c.text,'Ngữ cảnh cách đọc');else zh(w.hanzi,'Từ mới');say(w.meaning,'Nghĩa trọng tâm');say(l.introduction.scope,'Phạm vi bài')}
 if(['full','meaning'].includes(part)){const m=l.meaning;[m.scene,m.explanation,m.boundary,...m.conditions].forEach(s=>say(s,'Hiểu từ'))}
 if(['full','usages','examples'].includes(part))for(const e of (part==='examples'?[l.examples[index]]:l.examples).filter(Boolean)){const u=l.usages.find(u=>u.exampleId===e.id);if(u)[u.frame,u.position,u.required,u.omission].forEach(s=>say(s,'Vị trí và kết hợp'));zh(e.zh,'Câu mẫu');say(e.vi,'Nghĩa câu');say(e.analysis,'Phân tích')}
 if(part==='example-only'&&l.examples[index])zh(l.examples[index].zh,'Nghe và nhắc lại');
 if(['full','traps'].includes(part))for(const t of (part==='full'?l.traps:[l.traps[index]]).filter(Boolean)){[t.title,t.scene,t.possibleConfusion,t.difference].forEach(s=>say(s,'Phân biệt'));for(const c of t.cases){if(c.judgment==='wrong-grammar')say('Đây là câu sai để phân tích.','Cảnh báo câu sai');zh(c.zh,'Câu đối chiếu');say(c.vi,'Nghĩa câu');say(c.comment,'Phân tích');for(const r of t.corrections||[])if(r.caseId===c.id){zh(r.zh,'Câu sửa đúng');say(r.vi,'Nghĩa câu sửa');say(r.reason,'Lý do sửa')}}[t.replacement.explanation,t.boundary,t.tip].forEach(s=>say(s,'Chốt phân biệt'))}
 if(['full','traps'].includes(part)&&!l.traps.length)say(l.noTrapReason,'Kết quả rà bẫy');if(['full','pronunciation'].includes(part))say(l.pronunciation.text,'Đọc đúng');return q.map((s,i)=>({...s,id:w.id+'-'+part+'-'+index+'-v2-'+i}));
}
