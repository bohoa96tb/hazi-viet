import assert from 'node:assert/strict';
import {auditLesson,lessonAudio,checkAudio} from '../../js/lesson-standard.js';
import {renderStandardLesson} from '../../js/lesson-standard-view.js';
import {buildPlaylist} from '../../js/vocabulary-audio.js';
export function verifyV2(w){
 assert(auditLesson(w).ready,JSON.stringify(auditLesson(w).issues));
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const render=(word,stage,state=new Map(),extra={})=>renderStandardLesson(word,{stage,checkState:state,esc,hanzi:esc,rich:esc,...extra});
 for(const stage of [0,1,2,3])assert(render(w,stage)?.length);
 assert(!render(w,1).includes('data-lesson-view'));
 for(const e of w.lesson.examples)assert.equal(render(w,1).split(esc(e.zh)).length-1,1,'Main example displayed exactly once');
 for(let i=0;i<w.lesson.traps.length;i++)assert(render(w,2,new Map(),{trapIndex:i}).includes(esc(w.lesson.traps[i].title)));
 const full=lessonAudio(w);assert(full.length&&full.every(s=>['vi-VN','zh-CN'].includes(s.lang)&&!/[\*_`#]/.test(s.text)));
 for(let i=0;i<2;i++)assert.deepEqual(lessonAudio(w,'example-only',i).map(s=>[s.lang,s.text]),[['zh-CN',w.lesson.examples[i].zh]]);
 for(const e of w.lesson.examples){assert.equal(full.filter(s=>s.label==='Câu mẫu'&&s.text===e.zh).length,1);if(e.pinyin)assert(full.every(s=>!s.text.includes(e.pinyin)))}
 assert(full.every(s=>!w.intro.some(i=>s.text.split(/[^\p{L}\p{M}]+/u).includes(i.pinyin))));
 for(const t of w.lesson.traps)for(const c of t.cases.filter(c=>c.judgment==='wrong-grammar')){const a=lessonAudio(w,'traps',w.lesson.traps.indexOf(t)),i=a.findIndex(s=>s.text===c.zh);assert.equal(a[i-1].text,'Đây là câu sai để phân tích.');assert(!buildPlaylist([w],'immersion').some(s=>s.text===c.zh));assert(a.some(s=>s.text===t.corrections.find(r=>r.caseId===c.id).zh))}
 const tagged=structuredClone(w),c=tagged.lesson.checks[0];tagged.lesson.answers[c.id]={accepted:['ANSWER_SENTINEL'],explanation:'EXPLANATION_SENTINEL'};tagged.lesson.selfAnswers.s1.model='MODEL_SENTINEL';tagged.lesson.selfAnswers.s1.idea='IDEA_SENTINEL';
 const show=state=>render(tagged,3,state);assert(!/SENTINEL/.test(show(new Map())));
 const state=new Map([[w.id+':'+c.id,'requested'],[w.id+':self-unlocked',true]]);assert(show(state).includes('ANSWER_SENTINEL'));assert(!/MODEL_SENTINEL|IDEA_SENTINEL/.test(show(state)));
 state.set(w.id+':hint:s1',1);assert(show(state).includes('IDEA_SENTINEL'));assert(!show(state).includes('MODEL_SENTINEL'));state.set(w.id+':hint:s1',3);assert(show(state).includes('MODEL_SENTINEL'));
 assert.throws(()=>checkAudio(tagged,c.id,'answer'));assert(checkAudio(tagged,c.id,'answer',{revealed:true}).some(s=>s.text.includes('ANSWER')));assert(!lessonAudio(tagged).some(s=>/SENTINEL/.test(s.text)));assert(!checkAudio(tagged,c.id,'question').some(s=>/ANSWER|EXPLANATION/.test(s.text)));
 // Trap-path negative tests use a separate fixture so real no-trap lessons stay valid.
 const trapFixture=structuredClone(w);
 if(!trapFixture.lesson.traps.length){
  const l=trapFixture.lesson;
  assert(render(w,2).includes(l.noTrapReason));
  assert(lessonAudio(w,'traps').some(s=>s.text===l.noTrapReason));
  const missing=structuredClone(w);delete missing.lesson.noTrapReason;assert(!auditLesson(missing).ready);
  l.traps=[{id:'test-trap',title:'Nhóm đối chiếu giả lập cho kiểm thử',scene:'Tình huống kiểm thử.',possibleConfusion:'Giả lập đường đi của nhãn và audio.',difference:'Chỉ dùng trong bộ nhớ kiểm thử, không phải nội dung biên soạn.',cases:l.examples.map((e,i)=>({id:'c'+(i+1),zh:e.zh,vi:e.vi,comment:'Câu đúng trong fixture.',judgment:'correct',practiceAllowed:false})),replacement:{result:'context-needed',explanation:'Fixture kiểm đường đi nhãn.'},boundary:'Không ghi fixture vào học liệu.',tip:'Chỉ phục vụ kiểm thử.'}];
 }
 assert(auditLesson(trapFixture).ready);
 for(const mutate of [x=>x.lesson.examples.pop(),x=>delete x.lesson.meaning.boundary,x=>x.lesson.examples[0].practiceAllowed=false,x=>x.lesson.checks[0].answer='leak',x=>x.lesson.selfUse.pop(),x=>delete x.lesson.answers[x.lesson.checks[0].id],x=>x.lesson.usages[0].exampleId='missing',x=>x.lesson.traps[0].replacement.result='unknown',x=>x.lesson.meaning.scene='pinyin dǎ']){const b=structuredClone(trapFixture);mutate(b);assert(!auditLesson(b).ready,'Malformed V2 accepted')}
 // A synthetic wrong contrast verifies the warning and correction path even when
 // the authored batch avoids wrong example sentences.
 const wrong=structuredClone(trapFixture);wrong.lesson.traps[0].cases[0].judgment='wrong-grammar';wrong.lesson.traps[0].cases[0].zh='错句测试';wrong.lesson.traps[0].corrections=[...(wrong.lesson.traps[0].corrections||[]).filter(r=>r.caseId!=='c1'),{caseId:'c1',zh:'正确句测试',vi:'Câu sửa thử nghiệm.',reason:'Lý do sửa thử nghiệm.'}];assert(auditLesson(wrong).ready);const a=lessonAudio(wrong,'traps',0),i=a.findIndex(s=>s.text==='错句测试');assert.equal(a[i-1].text,'Đây là câu sai để phân tích.');assert(a.some(s=>s.text==='正确句测试'));assert(!buildPlaylist([wrong],'immersion').some(s=>s.text==='错句测试'));
}
