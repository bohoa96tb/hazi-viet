import {auditLesson} from './lesson-standard.js?v=v3-quality-revision-001';
export const statusLabels={deep:'Bài học đầy đủ',editing:'Bài đang bổ sung',example:'Thẻ có ví dụ',catalog:'Thẻ tra cứu'};
export function studySteps(word){return ['deep','editing'].includes(word?.status)?[0,1,2,3,4]:[0,3,4]}
export function moveStep(word,stage,direction){const steps=studySteps(word),i=steps.indexOf(stage);return steps[Math.max(0,Math.min(steps.length-1,i+direction))]}
export function coursePages(dataset,list){const ids=new Set(list.map(w=>w.id)),byId=new Map(dataset.words.map(w=>[w.id,w]));return dataset.lessons.map(l=>({...l,words:l.wordIds.filter(id=>ids.has(id)).map(id=>byId.get(id))})).filter(l=>l.words.length)}
export function validateCourse(data){
 if(data?.schemaVersion!==2||!Array.isArray(data.words)||!Array.isArray(data.lessons))throw Error('Dữ liệu khóa học không đúng phiên bản.');
 const ids=new Set(),numbers=new Set();
 for(const w of data.words){if(!/^[a-z0-9-]{1,80}$/.test(w.id)||ids.has(w.id)||!w.hanzi||!w.meaning||!Array.isArray(w.intro)||!w.intro.length||w.intro.some(i=>!i.pinyin||!i.meaning)||!Array.isArray(w.examples)||!statusLabels[w.status]||![1,2,3].includes(w.level)||numbers.has(w.level+':'+w.sourceIndex))throw Error('Mục từ bị thiếu hoặc trùng.');ids.add(w.id);numbers.add(w.level+':'+w.sourceIndex);if(w.status==='deep'&&(!auditLesson(w).ready||(![2,3].includes(w.lesson?.version)&&(!w.quiz||!w.shape||!w.near))))throw Error('Bài chi tiết chưa đủ nội dung.');if(w.status==='example'&&!w.examples.length)throw Error('Thẻ có ví dụ bị thiếu câu.');}
 const assigned=data.lessons.flatMap(l=>l.wordIds);if(assigned.length!==ids.size||new Set(assigned).size!==ids.size||assigned.some(id=>!ids.has(id)))throw Error('Phân bài bị thiếu hoặc trùng từ.');
 const byId=new Map(data.words.map(w=>[w.id,w]));if(data.lessons.some(l=>!l.wordIds.length||l.wordIds.length>24||l.wordIds.some(id=>byId.get(id).level!==l.level)))throw Error('Bài có quá 24 từ hoặc trộn cấp độ.');return data;
}
export function meaningQuiz(word,words){
 const alternatives=[...new Set(words.filter(w=>w.id!==word.id&&w.meaning!==word.meaning).map(w=>w.meaning))].slice(0,2);
 const choices=[...alternatives];const answer=word.sourceIndex%3;choices.splice(answer,0,word.meaning);
 return {question:'Chọn nghĩa trọng tâm của từ đang học.',choices,answer,explain:'Nghĩa trọng tâm trong thẻ này: '+word.meaning+'.'};
}

