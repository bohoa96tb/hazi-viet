import assert from 'node:assert/strict';
import {auditLesson,lessonAudio,checkAudio} from '../../js/lesson-standard.js';
import {renderStandardLesson} from '../../js/lesson-standard-view.js';

export function verifyV3(word){
 assert.equal(word.lesson.version,3);assert(auditLesson(word).ready,JSON.stringify(auditLesson(word).issues));
 const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const render=(stage,state=new Map())=>renderStandardLesson(word,{stage,checkState:state,esc,hanzi:esc,rich:esc});
 for(const stage of [0,1,2,3,4])assert(render(stage)?.length,'V3 stage must render: '+stage);
 const understand=render(0);for(const sense of word.lesson.senses)assert(understand.includes(esc(sense.title)));assert(!/Đọc đúng|Nhận mặt chữ|thứ tự nét|bộ thủ/.test(understand));
 const guided=render(1);for(const item of word.lesson.guidedExercises){assert(guided.includes(esc(item.prompt)));assert(!guided.includes(esc(item.model)),'Guided answer leaked');}
 for(const item of word.lesson.guidedExercises.filter(item=>item.type==='order'))for(const token of item.tokens)assert(guided.includes(`data-v3-order="${esc(item.id)}"`)&&guided.includes(esc(token)),'Touch-order token missing');
 const discrimination=render(2);for(const item of word.lesson.discriminationExercises){assert(discrimination.includes(esc(item.prompt)));if(item.type!=='choice'&&item.type!=='meaning')assert(!discrimination.includes(esc(item.model)),'Discrimination answer leaked');}
 const production=render(3);for(const item of word.lesson.productionExercises){assert(production.includes(esc(item.prompt)));assert(!production.includes(esc(item.model)),'Production model leaked');}
 const review=render(4);assert(!review.includes(esc(word.lesson.reviewExercises[0].hiddenAnswer)),'Review answer leaked');assert(!review.includes(esc(word.lesson.reviewExercises[0].model)),'Review model leaked');assert(review.includes(`đã đánh giá 0/${word.lesson.reviewExercises.length}`));
 const revealed=new Map([[`${word.id}:review-reveal:${word.lesson.reviewExercises[0].id}`,true]]);assert(render(4,revealed).includes(esc(word.lesson.reviewExercises[0].model)));
 const full=lessonAudio(word);assert(full.length);assert(full.every(item=>['zh-CN','vi-VN'].includes(item.lang)));assert(!full.some(item=>item.lang==='zh-CN'&&word.intro.some(intro=>item.text.includes(intro.pinyin))));
 const question=word.lesson.guidedExercises[0];assert.throws(()=>checkAudio(word,question.id,'answer'));assert(checkAudio(word,question.id,'answer',{revealed:true}).length);
}
