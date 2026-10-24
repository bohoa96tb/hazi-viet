// Optional DOM integration: npm install --prefix /tmp/hazi-test-env happy-dom
// HAPPY_DOM_MODULE may point to an existing installation. No production dependency.
import fs from 'node:fs';import assert from 'node:assert/strict';
const {Window}=await import(process.env.HAPPY_DOM_MODULE||'/tmp/hazi-test-env/node_modules/happy-dom/lib/index.js');
const root=new URL('../..',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const d=JSON.parse(read('data/vocabulary/hanzii-course.json')),p=JSON.parse(read('progress.json')),v3=JSON.parse(read('tools/vocabulary/v3-rewrite-checkpoint.json'));
const sample=d.words.find(w=>w.lesson?.version===3&&w.lesson.difficulty==='easy');
const hard=d.words.find(w=>w.lesson?.version===3&&w.lesson.difficulty==='hard');
assert.equal(sample?.hanzi,'我','DOM test must directly exercise baseline word 1');assert(hard,'Hard V3 representative missing');
const window=new Window({url:'https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word='+sample.id});
window.document.write(read('vocabulary.html').replace(/<script[^>]*>[\s\S]*?<\/script>/g,''));
for(const name of ['window','document','location','navigator','URL','Blob'])Object.defineProperty(globalThis,name,{value:name==='window'?window:window[name],configurable:true});
const speech=[];let cancelCount=0;window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){cancelCount++},resume(){},speak(u){speech.push(u);u.onstart?.()}};globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};
globalThis.fetch=async url=>({ok:true,json:async()=>structuredClone(d)});
await import(new URL('../../js/vocabulary.js?dom-test',import.meta.url));await new Promise(r=>setTimeout(r,20));
const $=s=>document.querySelector(s),click=s=>{assert($(s),'Missing '+s);$(s).click()},body=()=>$('#lessonBody').textContent;
assert($('#wordDialog').open);assert(body().includes('Chuẩn bài học V3'));assert(body().includes('[Từ số 1]'));assert.equal(document.querySelectorAll('.usage-block').length,sample.lesson.senses.length);assert(!/Đọc đúng|Nhận mặt chữ/.test(body()));
assert(document.querySelector('.hanzi-char[href*="char=%E6%88%91"]'),'Hanzi analysis link missing');
click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,sample.lesson.senses[0].examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');const beforeStop=cancelCount;click('[data-lesson-stop]');assert(cancelCount>beforeStop,'Stop must cancel speech');
click('[data-step="1"]');assert(!body().includes('Đáp án:'));
click('[data-v3-check="g1"]');assert(body().includes('Bạn chưa nhập câu trả lời.'));assert(!body().includes('Đáp án:'));
for(const i of [1,0,2,3])click(`[data-v3-order="g1"][data-token-index="${i}"]`);click('[data-v3-check="g1"]');assert(body().includes(sample.lesson.guidedExercises[0].wrongFeedback));assert(!body().includes('Đáp án:'));click('[data-v3-answer="g1"]');assert(body().includes('Đáp án mẫu'));assert(body().includes('Đáp án:'));
click('[data-v3-order-clear="g1"]');for(let i=0;i<sample.lesson.guidedExercises[0].tokens.length;i++)click(`[data-v3-order="g1"][data-token-index="${i}"]`);click('[data-v3-check="g1"]');assert(body().includes('Đúng.'));assert(body().includes(sample.lesson.guidedExercises[0].accepted[0]));
click('[data-step="2"]');click('[data-v3-choice="d1"][data-choice-index="1"]');assert(body().includes(sample.lesson.discriminationExercises[0].wrongFeedback));assert(!body().includes('Đáp án:'));click('[data-v3-choice="d1"][data-choice-index="0"]');assert(body().includes('Đúng.'));
click('[data-step="3"]');const draft=$('[data-v2-draft="p1"]');draft.value='我是学生。';draft.dispatchEvent(new window.Event('input',{bubbles:true}));assert(!body().includes(sample.lesson.productionExercises[0].model));click('[data-v2-hint="p1"]');click('[data-v2-hint="p1"]');assert(!body().includes(sample.lesson.productionExercises[0].model));click('[data-v2-hint="p1"]');assert(body().includes(sample.lesson.productionExercises[0].model));
click('[data-action="back"]');assert(body().includes('03 / PHÂN BIỆT'));click('[data-action="next"]');assert(body().includes('04 / TỰ DÙNG'));assert.equal($('[data-v2-draft="p1"]').value,'我是学生。','Draft must survive step navigation');
click('[data-step="4"]');assert(!body().includes(sample.lesson.reviewExercises[0].hiddenAnswer));assert(!document.querySelector('[data-grade="good"]'));assert($('.word-identity').classList.contains('recall-hidden'));click('[data-v3-review-reveal="r1"]');assert(body().includes(sample.lesson.reviewExercises[0].hiddenAnswer));assert(document.querySelector('[data-grade="good"]'));assert(!JSON.parse(window.localStorage.getItem('hanzi-viet-vocabulary-v1')).cards[sample.id],'Reveal must not mark learned');
click('[data-grade="good"]');assert($('#wordDialog').open);assert(body().includes('Thẻ 2/2'));assert(body().includes('đã đánh giá 1/2'));click('[data-v3-review-reveal="r2"]');click('[data-grade="hard"]');const savedProgress=JSON.parse(window.localStorage.getItem('hanzi-viet-vocabulary-v1'));assert(savedProgress.cards[sample.id].learned);assert.equal(savedProgress.cards[sample.id].reviews,1);
// Favorite and progress storage still operate.
click('[data-action="favorite"]');assert.equal($('[data-action="favorite"]').getAttribute('aria-pressed'),'true');
click('[data-action="close"]');assert(!$('#wordDialog').open);
click('[data-level="1"]');
$('#wordSearch').value='不用';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));assert(document.querySelector('[data-start="hz-h1-b51cd2090a80"]'));
click('[data-start="hz-h1-b51cd2090a80"]');assert(body().includes('bù yòng'));click('[data-step="2"]');assert(body().includes('不用')&&body().includes('不要'));const trapNext=$('[data-lesson-page="trap"][data-delta="1"]');if(trapNext){trapNext.click();assert(body().includes('不用')&&body().includes('不要'));}
click('[data-action="close"]');$('#wordSearch').value='';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));
// A protected V1 word can still be opened through the same application.
const old=p.completedIds.find(id=>[1,2].includes(d.words.find(w=>w.id===id)?.lesson?.version));
$('#wordSearch').value=d.words.find(w=>w.id===old).hanzi;
$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));
const oldTarget=`[data-start="${old}"]`;
for(let page=0;!$(oldTarget)&&page<d.lessons.length;page++){
 assert(!$('[data-lesson="1"]').disabled,'Protected target must be reachable: '+old);
 click('[data-lesson="1"]');
}
click(oldTarget);assert($('#lessonBody'));click('[data-step="1"]');assert($('#lessonBody'));
// Exercise the latest V3 batch through the real entry point, including empty traps.
for(const id of v3.completedBaselineIds.slice(-6)){
 const word=d.words.find(w=>w.id===id);
 click('[data-action="close"]');click('[data-level="'+word.level+'"]');$('#wordSearch').value=word.hanzi;$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));
 const target='[data-start="'+id+'"]';
 for(let page=0;!$(target)&&page<d.lessons.length;page++){assert(!$('[data-lesson="1"]').disabled,'Target must be reachable in filtered pages: '+id);click('[data-lesson="1"]');}
 click(target);
 assert(body().includes('[Từ số '+word.lesson.cohortOrdinal+']'));
 if(word.lesson.version===3){assert.equal(document.querySelectorAll('.usage-block').length,word.lesson.senses.length);click('[data-step="1"]');assert.equal(document.querySelectorAll('.interactive-exercise').length,word.lesson.guidedExercises.length);click('[data-step="2"]');assert.equal(document.querySelectorAll('.interactive-exercise').length,word.lesson.discriminationExercises.length);}
 else{click('[data-step="1"]');assert.equal(document.querySelectorAll('.standard-example').length,2);click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,word.examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');click('[data-step="2"]');if(!word.lesson.traps.length)assert(body().includes(word.lesson.noTrapReason));click('[data-step="3"]');if(id===sample.id)assert(document.querySelector('.feedback'),'Previously revealed answer must persist');else{assert(!document.querySelector('.feedback'));assert(!document.querySelector('[data-v2-hint]'));}assert.equal(document.querySelectorAll('[data-reveal-check]').length,word.lesson.checks.length);}
}
console.log('PASS DOM: V1/V2/V3 loader; V3 usage blocks, correct/blank/wrong checks, trap choice, progressive hints and recall gating; audio, progress, favorite, search and latest-batch routes. DOM simulation only; no visual layout/device playback certification.');
window.happyDOM.abort();window.close();process.exit(0);
