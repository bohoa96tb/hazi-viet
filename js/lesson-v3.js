import {splitSpeech} from './lesson-v2.js?v=v3-word-495';

const filled=value=>typeof value==='string'&&value.trim().length>0;
const list=(value,min=1)=>Array.isArray(value)&&value.length>=min;

export function auditV3(word){
 const l=word.lesson,issues=[],bad=(path,message)=>issues.push({path,message});
 const need=(object,keys,path)=>keys.forEach(key=>{if(!filled(object?.[key]))bad(path+'.'+key,'Thiếu '+key)});
 const ids=(items,path)=>{if(!list(items)||items.some(item=>!filled(item.id))||new Set(items.map(item=>item.id)).size!==items.length)bad(path,'Danh sách thiếu hoặc trùng ID')};
 if(l?.version!==3)bad('lesson.version','Không phải bài V3');
 if(!Number.isInteger(l?.cohortOrdinal)||l.cohortOrdinal<1)bad('introduction.ordinal','Thiếu số thứ tự');
 need(l,['authorship'],'introduction');if(!list(l?.sources)||l.sources.some(url=>!/^https:\/\//.test(url)))bad('introduction.sources','Thiếu nguồn HTTPS');
 need(l?.introduction,['scope'],'introduction');
 if(!list(word.intro)||word.intro.some(item=>!filled(item.pinyin)||!filled(item.meaning)))bad('introduction.readings','Thiếu Pinyin hoặc nghĩa');
 ids(l?.senses,'senses');if(l?.senses?.length!==4)bad('senses','Bài 下 cần đúng bốn cách dùng trọng tâm');
 for(const sense of l?.senses||[]){need(sense,['title','when','meaning','grammar','pattern'],'senses');if(!list(sense.collocations,1))bad('senses.collocations','Thiếu cụm từ');for(const item of sense.collocations||[])need(item,['zh','pinyin','vi'],'senses.collocations');if(!list(sense.examples,1))bad('senses.examples','Thiếu ví dụ');for(const example of sense.examples||[])need(example,['zh','pinyin','vi','note'],'senses.examples');}
 ids(l?.confusions,'confusions');if((l?.confusions||[]).length<4)bad('confusions','Thiếu bốn bẫy bắt buộc');for(const trap of l?.confusions||[]){need(trap,['title','explanation','tip'],'confusions');if(!list(trap.contrasts,2))bad('confusions.contrasts','Thiếu đối chiếu');for(const item of trap.contrasts||[])need(item,['zh','pinyin','vi','note'],'confusions.contrasts');}
 const exerciseGroups=['guidedExercises','discriminationExercises','productionExercises','reviewExercises'];
 for(const group of exerciseGroups){ids(l?.[group],group);for(const exercise of l?.[group]||[]){need(exercise,['prompt'],'exercise');if(group!=='reviewExercises'&&!filled(exercise.model))bad(group+'.model','Thiếu đáp án mẫu');}}
 if((l?.guidedExercises||[]).length<3)bad('guidedExercises','Cần ba mức ghép câu');
 const trapIds=new Set((l?.confusions||[]).map(item=>item.id));for(const exercise of l?.discriminationExercises||[]){if(!trapIds.has(exercise.trapId))bad('discriminationExercises.trapId','Bẫy chưa được giảng');if(!['choice','fill','repair','meaning'].includes(exercise.type))bad('discriminationExercises.type','Loại bài không hỗ trợ');if(exercise.type==='choice'&&(!list(exercise.choices,2)||!Number.isInteger(exercise.correctIndex)||!exercise.choices[exercise.correctIndex]))bad('discriminationExercises.choice','Thiếu lựa chọn/đáp án');}
 if(l?.productionExercises?.length!==2)bad('productionExercises','Cần đúng hai nhiệm vụ tự dùng');for(const exercise of l?.productionExercises||[]){if(!list(exercise.hints,2)||!list(exercise.criteria,1)||!filled(exercise.vi))bad('productionExercises','Thiếu gợi ý tăng dần hoặc tiêu chí');}
 if((l?.reviewExercises||[]).length<3)bad('reviewExercises','Cần ba kiểu ôn nhớ');for(const exercise of l?.reviewExercises||[]){need(exercise,['hiddenAnswer','model'],'reviewExercises');}
 const forbidden=JSON.stringify(l);if(/"(?:pronunciation|shape|strokes|radical)"\s*:/.test(forbidden))bad('lesson','V3 không chứa bài giảng phát âm hoặc phân tích chữ');
 return {ready:issues.length===0,issues,completeSections:Math.max(0,5-new Set(issues.map(item=>item.path.split('.')[0])).size),totalSections:5};
}

export function v3Audio(word,part='full',index=0){
 if(!auditV3(word).ready)return [];
 const l=word.lesson,queue=[],say=(text,label)=>queue.push(...splitSpeech(text).map(item=>({...item,label}))),zh=(text,label)=>queue.push({text,lang:'zh-CN',label});
 if(['full','introduction'].includes(part)){zh(word.hanzi,'Từ mới');say(word.meaning,'Nghĩa trọng tâm');say(l.introduction.scope,'Phạm vi bài');}
 if(['full','sense'].includes(part))for(const sense of (part==='full'?l.senses:[l.senses[index]]).filter(Boolean)){say(sense.title,'Cách dùng');say(sense.when,'Tình huống');say(sense.meaning,'Nghĩa');say(sense.grammar,'Chức năng');say(sense.pattern,'Cấu trúc');for(const item of sense.collocations){zh(item.zh,'Cụm thông dụng');say(item.vi,'Nghĩa cụm');}for(const example of sense.examples){zh(example.zh,'Câu mẫu');say(example.vi,'Nghĩa câu');say(example.note,'Lưu ý');}}
 if(part==='example-only'){const examples=l.senses.flatMap(sense=>sense.examples);if(examples[index])zh(examples[index].zh,'Nghe câu Trung');}
 if(['full','confusion'].includes(part))for(const trap of (part==='full'?l.confusions:[l.confusions[index]]).filter(Boolean)){say(trap.title,'Bẫy');say(trap.explanation,'Phân biệt');for(const item of trap.contrasts){zh(item.zh,'Câu đối chiếu');say(item.vi,'Nghĩa câu');say(item.note,'Điểm cần nhớ');}say(trap.tip,'Mẹo');}
 return queue.map((item,i)=>({...item,id:`${word.id}-${part}-${index}-v3-${i}`}));
}

export function v3CheckAudio(word,id,kind,{revealed=false}={}){
 const l=word.lesson,exercise=[...l.guidedExercises,...l.discriminationExercises].find(item=>item.id===id);if(!exercise)return [];
 if(kind==='question')return splitSpeech(exercise.prompt).map((item,i)=>({...item,id:`${word.id}-${id}-q${i}`,label:'Câu hỏi'}));
 if(kind!=='answer'||!revealed)throw Error('Chỉ mở audio lời giải sau khi người học đã kiểm tra hoặc yêu cầu đáp án.');
 return splitSpeech(`${exercise.model}. ${exercise.explanation}`).map((item,i)=>({...item,id:`${word.id}-${id}-a${i}`,label:'Lời giải'}));
}
