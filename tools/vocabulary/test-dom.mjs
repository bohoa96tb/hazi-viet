// Optional DOM integration: npm install --prefix /tmp/hazi-test-env happy-dom
// HAPPY_DOM_MODULE may point to an existing installation. No production dependency.
import fs from 'node:fs';import assert from 'node:assert/strict';
const {Window}=await import(process.env.HAPPY_DOM_MODULE||'/tmp/hazi-test-env/node_modules/happy-dom/lib/index.js');
const root=new URL('../..',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const d=JSON.parse(read('data/vocabulary/hanzii-course.json')),p=JSON.parse(read('progress.json'));
const sample=d.words.find(w=>w.id===p.batches.at(-1).wordIds[0]);
const window=new Window({url:'https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word='+p.batches.at(-1).wordIds[0]});
window.document.write(read('vocabulary.html').replace(/<script[^>]*>[\s\S]*?<\/script>/g,''));
for(const name of ['window','document','location','navigator','URL','Blob'])Object.defineProperty(globalThis,name,{value:name==='window'?window:window[name],configurable:true});
const speech=[];window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},resume(){},speak(u){speech.push(u);u.onstart?.()}};globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};
globalThis.fetch=async url=>({ok:true,json:async()=>structuredClone(d)});
await import(new URL('../../js/vocabulary.js?dom-test',import.meta.url));await new Promise(r=>setTimeout(r,20));
const $=s=>document.querySelector(s),click=s=>{assert($(s),'Missing '+s);$(s).click()},body=()=>$('#lessonBody').textContent;
assert($('#wordDialog').open);assert(body().includes('Chuẩn bài học V3'));assert(body().includes('[Từ số '+sample.lesson.cohortOrdinal+']'));assert.equal(document.querySelectorAll('.usage-block').length,4);assert(!/Đọc đúng|Nhận mặt chữ/.test(body()));
click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,sample.lesson.senses[0].examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');
click('[data-step="1"]');assert(!body().includes(sample.lesson.guidedExercises[0].model));
for(let i=0;i<sample.lesson.guidedExercises[0].tokens.length;i++)click(`[data-v3-order="g1"][data-token-index="${i}"]`);click('[data-v3-check="g1"]');assert(body().includes('Đúng.'));assert(body().includes(sample.lesson.guidedExercises[0].accepted[0]));
click('[data-v3-check="g2"]');assert(body().includes('Bạn chưa nhập câu trả lời.'));
const wrong=$('[data-v2-draft="g3"]');wrong.value='桌子下面在猫。';wrong.dispatchEvent(new window.Event('input',{bubbles:true}));click('[data-v3-check="g3"]');assert(body().includes('Chưa đúng'));
click('[data-step="2"]');click('[data-v3-choice="d1"][data-choice-index="0"]');assert(body().includes('Chưa đúng'));assert(!body().includes(sample.lesson.discriminationExercises[0].model));click('[data-v3-choice="d1"][data-choice-index="1"]');assert(body().includes('Đúng.'));click('[data-v3-choice="d2"][data-choice-index="0"]');assert(body().includes('Đúng.'));
click('[data-step="3"]');assert(!body().includes(sample.lesson.productionExercises[0].model));click('[data-v2-hint="p1"]');assert(!body().includes(sample.lesson.productionExercises[0].model));click('[data-v2-hint="p1"]');assert(!body().includes(sample.lesson.productionExercises[0].model));click('[data-v2-hint="p1"]');assert(body().includes(sample.lesson.productionExercises[0].model));
click('[data-step="4"]');assert(!body().includes(sample.lesson.reviewExercises[0].hiddenAnswer));assert(!document.querySelector('[data-grade="good"]'));assert($('.word-identity').classList.contains('recall-hidden'));click('[data-v3-review-reveal="r1"]');assert(body().includes(sample.lesson.reviewExercises[0].hiddenAnswer));assert(document.querySelector('[data-grade="good"]'));
click('[data-grade="good"]');assert($('#wordDialog').open);assert(body().includes('Thẻ 2/3'));assert(body().includes('đã đánh giá 1/3'));
// Favorite and progress storage still operate; no grade is automatically assigned.
click('[data-action="favorite"]');assert.equal($('[data-action="favorite"]').getAttribute('aria-pressed'),'true');
click('[data-action="close"]');assert(!$('#wordDialog').open);
click('[data-level="1"]');
$('#wordSearch').value='不用';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));assert(document.querySelector('[data-start="hz-h1-b51cd2090a80"]'));
click('[data-start="hz-h1-b51cd2090a80"]');assert(body().includes('bù yòng'));click('[data-step="2"]');assert(body().includes('不用 / 不要'));click('[data-lesson-page="trap"][data-delta="1"]');assert(body().includes('不用 / 没用'));
click('[data-action="close"]');$('#wordSearch').value='';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));
// A protected V1 word can still be opened through the same application.
const old=p.completedIds.find(id=>d.words.find(w=>w.id===id)?.lesson?.version===1);$('#wordSearch').value=d.words.find(w=>w.id===old).hanzi;$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));click('[data-start="'+old+'"]');assert(body().includes('5.1'));click('[data-step="1"]');assert(document.querySelector('[data-lesson-view]'));
// Exercise every new lesson through the real entry point, including empty traps.
for(const id of p.batches.at(-1).wordIds){
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
