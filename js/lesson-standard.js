import {auditV2,v2Audio,splitSpeech} from './lesson-v2.js?v=v3-rewrite-001';
import {auditV3,v3Audio,v3CheckAudio} from './lesson-v3.js?v=v3-rewrite-001';
// The 5.1–5.6 contract checks content coverage; it does not certify linguistic accuracy.
export const sections=[['introduction','5.1 · Giới thiệu từ mới'],['meaning','5.2 · Hiểu nghĩa và khi nào dùng'],['usages','5.3 · Cách sử dụng'],['examples','5.4 · Ví dụ có phân tích'],['traps','5.5 · Bẫy và phân biệt'],['pronunciation','5.6 · Đọc đúng']];
export const judgments={correct:'Đúng và phù hợp', 'wrong-grammar':'Câu sai ngữ pháp','different-meaning':'Đúng nhưng đổi nghĩa','wrong-intent':'Đúng nhưng không phù hợp ý định','unnatural':'Hiểu được nhưng kém tự nhiên trong ngữ cảnh này','overlap':'Vẫn đúng và gần nghĩa','context-needed':'Chưa đủ ngữ cảnh để kết luận'};
const text=v=>typeof v==='string'&&v.trim().length>0;
const list=Array.isArray;
export function auditLesson(word){
 if(word.lesson?.version===3)return auditV3(word);
 if(word.lesson?.version===2)return auditV2(word);
 const l=word.lesson,issues=[],add=(path,message)=>issues.push({path,message});
 if(!l||l.version!==1){for(const [key,label]of sections)add(key,'Chưa biên soạn theo mẫu '+label);return {ready:false,issues,completeSections:0,totalSections:6};}
 const need=(o,keys,path)=>{for(const key of keys)if(!text(o?.[key]))add(path+'.'+key,'Thiếu nội dung '+key);};
 need(l.introduction,['scope'],'introduction');
 if(!list(word.intro)||!word.intro.length||word.intro.some(i=>!text(i.pinyin)||!text(i.meaning)))add('introduction.readings','Thiếu chữ, cách đọc hoặc nghĩa giới thiệu');
 need(l.meaning,['scene','explanation','boundary','takeaway'],'meaning');
 if(!list(l.meaning?.conditions)||!l.meaning.conditions.length||l.meaning.conditions.some(x=>!text(x)))add('meaning.conditions','Thiếu điều kiện dùng cụ thể');
 for(const a of l.meaning?.alternatives||[])need(a,['zh','vi','purpose'],'meaning.alternatives');
 const examples=list(l.examples)?l.examples:[],ids=new Set(examples.map(e=>e.id));
 if(examples.length<3||new Set(examples.map(e=>e.zh)).size<3)add('examples','Cần ít nhất ba câu khác nhau');
 if(ids.size!==examples.length)add('examples.ids','Mã ví dụ bị trùng');
 for(const e of examples){need(e,['id','scene','zh','vi','why','position'],'examples.'+e.id);if(!e.zh?.includes(word.hanzi)&&!(list(e.targetParts)&&e.targetParts.length&&e.targetParts.every(p=>e.zh?.includes(p))))add('examples.'+e.id+'.target','Câu chưa thể hiện từ mục tiêu');if(e.practiceAllowed!==true)add('examples.'+e.id+'.practice','Chưa xác nhận câu dùng làm mẫu luyện');}
 if(!examples.some(e=>e.translationSteps&&['intention','choice','order','result'].every(k=>text(e.translationSteps[k]))&&e.translationSteps.result===e.zh))add('examples.translationSteps','Thiếu ví dụ chuyển từ ý Việt sang cách nói Trung');
 const ref=(id,path)=>{if(!ids.has(id))add(path,'Mã ví dụ không tồn tại: '+id);};
 if(!list(l.usages)||!l.usages.length)add('usages','Chưa có cách dùng');
 for(const u of l.usages||[]){need(u,['id','intent','frame','position','required','omission','caution'],'usages.'+u.id);ref(u.exampleId,'usages.'+u.id+'.example');need(u.transform,['change','limit'],'usages.'+u.id+'.transform');ref(u.transform?.exampleId,'usages.'+u.id+'.transform.example');if(u.exampleId===u.transform?.exampleId)add('usages.'+u.id+'.transform','Ví dụ biến đổi phải khác câu cơ sở');for(const c of u.collocations||[])need(c,['zh','vi','purpose'],'usages.'+u.id+'.collocations');for(const f of u.forms||[]){need(f,['type','why'],'usages.'+u.id+'.forms');ref(f.exampleId,'usages.'+u.id+'.forms');}}
 const checks=l.checks||[],checkIds=new Set(checks.map(c=>c.id));if(checkIds.size!==checks.length)add('traps.checks','Mã câu hỏi trùng');
 if(!list(l.traps))add('traps','Chưa rà soát bẫy');else if(!l.traps.length&&l.noTrapReason!=='Chưa thấy bẫy thông dụng cần lưu ý ở mức học này.')add('traps.noTrapReason','Cần ghi rõ kết quả rà soát khi không có bẫy');
 for(const t of l.traps||[]){need(t,['id','title','scene','possibleConfusion','difference','boundary','tip'],'traps.'+t.id);if(!list(t.cases)||t.cases.length<2)add('traps.'+t.id+'.cases','Thiếu cặp đối chiếu');need(t.replacement,['result','explanation'],'traps.'+t.id+'.replacement');if(!judgments[t.replacement?.result])add('traps.'+t.id+'.replacement.result','Nhãn kết quả thay thế chưa hợp lệ');for(const c of t.cases||[]){need(c,['id','zh','vi','comment'],'traps.'+t.id+'.cases');if(!judgments[c.judgment])add('traps.'+t.id+'.judgment','Nhãn đánh giá không hợp lệ');if(c.judgment==='wrong-grammar'){const correction=t.corrections?.find(r=>r.caseId===c.id);need(correction,['zh','vi','reason'],'traps.'+t.id+'.correction');}if(c.practiceAllowed!==false)add('traps.'+t.id+'.practice','Câu đối chiếu không được đưa vào mẫu nhắc lại tự động');}if(t.checkId&&!checkIds.has(t.checkId))add('traps.'+t.id+'.check','Thiếu câu tự kiểm tra được liên kết');}
 for(const c of checks){need(c,['id','question'],'traps.checks');const a=l.answers?.[c.id];if(!list(c.choices)||c.choices.length<2||!Number.isInteger(a?.correctIndex)||a.correctIndex<0||a.correctIndex>=c.choices?.length||!text(a?.explanation))add('traps.answers.'+c.id,'Thiếu đáp án hoặc lời giải riêng');if(Object.hasOwn(c,'answer')||Object.hasOwn(c,'explanation'))add('traps.checks.'+c.id,'Không đặt lời giải trong câu hỏi');}
 need(l.pronunciation,['text'],'pronunciation');
 const raw=JSON.stringify(l);if(/"(?:pinyin|sourcePinyin|numeric)"\s*:/.test(raw)||/[āǎēěīǐōǒūǔǖǘǚǜ]/iu.test(raw))add('introduction.pinyinOnly','Pinyin chỉ được nằm trong phần giới thiệu');
 const completeSections=sections.filter(([key])=>!issues.some(i=>i.path===key||i.path.startsWith(key+'.'))).length;
 return {ready:issues.length===0,issues,completeSections,totalSections:6};
}
export function exampleById(word,id){return word.lesson?.examples.find(e=>e.id===id)}
function mixed(text){return String(text||'').replace(/\*\*/g,'').split(/([\p{Script=Han}]+(?:[，。？！、；：…“”「」《》\s]*[\p{Script=Han}]+)*[，。？！、；：…]*)/u).filter(s=>/[\p{L}\p{N}]/u.test(s)).map(s=>({text:s.trim().replace(/[→/]/g,', '),lang:/\p{Script=Han}/u.test(s)?'zh-CN':'vi-VN'}));}
export function lessonAudio(word,part='full',index=0){
 if(word.lesson?.version===3)return v3Audio(word,part,index);
 if(word.lesson?.version===2)return v2Audio(word,part,index);
 if(!auditLesson(word).ready)return [];
 const l=word.lesson,q=[],seen=new Set(),say=(s,label)=>q.push(...mixed(s).map(x=>({...x,label}))),zh=(s,label)=>{if(s)q.push({text:s,lang:'zh-CN',label})},example=(id,label)=>{const e=exampleById(word,id);if(!e||(part==='full'&&seen.has(id)))return;seen.add(id); say(e.scene,label);zh(e.zh,label);say(e.vi,label);say(e.why,label);say(e.position,label);};
 if(part==='full'||part==='introduction'){zh(word.audioText||word.hanzi,'Từ mới');say(word.meaning,'Nghĩa trọng tâm');say(l.introduction.scope,'Phạm vi bài học');}
 if(part==='full'||part==='meaning'){const m=l.meaning;for(const k of ['scene','explanation','boundary'])say(m[k],'Hiểu nghĩa');for(const a of m.alternatives||[]){zh(a.zh,'Cách nói đối chiếu');say(a.vi,'Nghĩa đối chiếu');say(a.purpose,'Khi chọn cách khác');}m.conditions.forEach(t=>say(t,'Điều kiện dùng'));say(m.takeaway,'Chốt ý');}
 if(part==='full'||part==='usages'){for(const u of part==='full'?l.usages:[l.usages[index]].filter(Boolean)){say(u.intent,'Ý muốn nói');say(u.frame,'Khung câu');say(u.position,'Vị trí');say(u.required,'Thành phần cần có');say(u.omission,'Lược thành phần');example(u.exampleId,'Ví dụ cách dùng');say(u.transform.change,'Tự tạo câu');example(u.transform.exampleId,'Ví dụ biến đổi');say(u.transform.limit,'Giới hạn thay thế');for(const f of u.forms||[]){example(f.exampleId,f.type);say(f.why,'Vì sao dùng cách này');}for(const c of u.collocations||[]){zh(c.zh,'Cụm tự nhiên');say(c.vi,'Nghĩa cụm');say(c.purpose,'Khi dùng cụm');}say(u.caution,'Chú ý với khung câu');}}
 if(part==='full'||part==='examples'){for(const e of part==='full'?l.examples:[l.examples[index]].filter(Boolean)){example(e.id,'Ví dụ thực tế');if(e.translationSteps){say(e.translationSteps.intention,'Ý tiếng Việt');say(e.translationSteps.choice,'Chọn cách nói');say(e.translationSteps.order,'Sắp xếp ý');zh(e.translationSteps.result,'Câu hoàn chỉnh');}}}
 if(part==='example-only'){const e=l.examples[index];if(e?.practiceAllowed)zh(e.zh,'Nghe và nhắc lại');}
 if(part==='full'||part==='traps'){for(const t of part==='full'?l.traps:[l.traps[index]].filter(Boolean)){say(t.title,'Tên bẫy');say(t.scene,'Tình huống');say(t.possibleConfusion,'Dễ nhầm thế nào');say(t.difference,'Khác nhau ở đâu');for(const c of t.cases){if(c.judgment==='wrong-grammar')say('Đây là câu sai để phân tích.','Cảnh báo câu sai');else say(judgments[c.judgment],'Tính chất câu đối chiếu');zh(c.zh,'Câu đối chiếu');say(c.vi,'Nghĩa của chính câu này');say(c.comment,'Phân tích câu');for(const r of t.corrections||[])if(r.caseId===c.id){say('Câu sửa đúng.','Sửa câu');zh(r.zh,'Câu sửa đúng');say(r.vi,'Nghĩa câu sửa');say(r.reason,'Lý do sửa');}}say('Nếu thay trong tình huống này: '+judgments[t.replacement.result]+'. '+t.replacement.explanation,'Thử thay thế');say(t.boundary,'Ranh giới');say(t.tip,'Mẹo quyết định');}if(!l.traps.length)say(l.noTrapReason,'Kết quả rà soát');}
 if(part==='full'||part==='pronunciation')say(l.pronunciation.text,'Đọc đúng');
 return q.map((s,i)=>({...s,id:word.id+'-'+part+'-'+index+'-a'+(i+1)}));
}
export function checkAudio(word,id,kind,{revealed=false}={}){
 if(word.lesson?.version===3)return v3CheckAudio(word,id,kind,{revealed});
 const check=word.lesson?.checks.find(c=>c.id===id);if(!check)return [];
 if(kind==='question')return mixed(check.question).map((s,i)=>({...s,id:word.id+'-'+id+'-q'+i,label:'Câu tự kiểm tra'}));
 if(kind!=='answer'||!revealed)throw Error('Chỉ mở audio lời giải sau khi trả lời hoặc yêu cầu xem đáp án.');
 const answer=word.lesson.answers[id];if(word.lesson.version===2)return splitSpeech(answer.audioText||'Đáp án tham khảo: '+answer.accepted.join(' / ')+'. '+answer.explanation).map((s,i)=>({...s,id:word.id+'-'+id+'-answer'+i,label:'Lời giải riêng'}));return mixed('Đáp án: '+check.choices[answer.correctIndex]+'. '+answer.explanation).map((s,i)=>({...s,id:word.id+'-'+id+'-answer'+i,label:'Lời giải riêng'}));
}

