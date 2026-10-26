// Optional DOM integration: npm install --prefix /tmp/hazi-test-env happy-dom
// HAPPY_DOM_MODULE may point to an existing installation. No production dependency.
import fs from 'node:fs';import assert from 'node:assert/strict';
const {Window}=await import(process.env.HAPPY_DOM_MODULE||'/tmp/hazi-test-env/node_modules/happy-dom/lib/index.js');
const root=new URL('../..',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const d=JSON.parse(read('data/vocabulary/hanzii-course.json')),p=JSON.parse(read('progress.json'));
const sample=d.words.find(w=>w.id===p.batches.at(-1).wordIds[0]);
const sampleAnswer=sample.lesson.answers.q1.accepted[0], selfTranslation=sample.lesson.selfAnswers.s1.vi;
const window=new Window({url:'https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word='+p.batches.at(-1).wordIds[0]});
window.document.write(read('vocabulary.html').replace(/<script[^>]*>[\s\S]*?<\/script>/g,''));
for(const name of ['window','document','location','navigator','URL','Blob'])Object.defineProperty(globalThis,name,{value:name==='window'?window:window[name],configurable:true});
const speech=[];window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},resume(){},speak(u){speech.push(u);u.onstart?.()}};globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};
globalThis.fetch=async url=>({ok:true,json:async()=>structuredClone(d)});
await import(new URL('../../js/vocabulary.js?dom-test',import.meta.url));await new Promise(r=>setTimeout(r,20));
const $=s=>document.querySelector(s),click=s=>{assert($(s),'Missing '+s);$(s).click()},body=()=>$('#lessonBody').textContent;
assert($('#wordDialog').open);assert(!body().includes('Chuẩn V2'));assert(!body().includes('[Từ số '+sample.lesson.cohortOrdinal+']'));assert(!body().includes('Mã ví dụ:'));
click('[data-step="1"]');assert.equal(document.querySelectorAll('.standard-example').length,2);assert(!document.querySelector('[data-lesson-view]'));
click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,sample.examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');
click('[data-step="3"]');assert(!document.querySelector('.feedback'));assert(!document.querySelector('[data-v2-hint]'));
const input=$('[data-v2-draft="q1"]');input.value=sampleAnswer;input.dispatchEvent(new window.Event('input',{bubbles:true}));click('[data-reveal-check="q1"]');assert(body().includes('Đáp án tham khảo'));assert.equal($('[data-v2-draft="q1"]').value,sampleAnswer);
click('[data-v2-unlock]');assert(!body().includes(selfTranslation));click('[data-v2-hint="s1"]');assert(!body().includes(selfTranslation));click('[data-v2-hint="s1"]');assert(!body().includes(selfTranslation));click('[data-v2-hint="s1"]');assert(body().includes(selfTranslation));
click('[data-step="4"]');assert.equal(document.querySelectorAll('[data-grade]').length,3);assert(!document.querySelector('.feedback'));click('[data-action="revealReview"]');assert(document.querySelector('[data-grade="good"]'));assert(document.querySelector('.feedback'));
// Favorite and progress storage still operate; no grade is automatically assigned.
click('[data-action="favorite"]');assert.equal($('[data-action="favorite"]').getAttribute('aria-pressed'),'true');
click('[data-action="close"]');assert(!$('#wordDialog').open);click('[data-level="1"]');
$('#wordSearch').value='不用';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));assert(document.querySelector('[data-start="hz-h1-b51cd2090a80"]'));
click('[data-start="hz-h1-b51cd2090a80"]');assert(body().includes('bù yòng'));click('[data-step="2"]');assert(body().includes('不用 / 不要'));assert(!document.querySelector('[data-lesson-page="trap"]'),'Tier 1 with one trap has no pager');click('#lessonBody .learn-more summary');assert(document.querySelector('#lessonBody .learn-more').open);assert(body().includes('不用 / 没用'));
click('[data-action="close"]');$('#wordSearch').value='电话';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));click('[data-start="hz-h1-367df9600cd7"]');click('[data-step="2"]');assert(body().includes('电话 và 手机'));click('[data-lesson-page="trap"][data-delta="1"]');assert(body().includes('打电话 và 接电话'));
click('[data-action="close"]');$('#wordSearch').value='';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));
// A protected V1 word can still be opened through the same application.
const old=p.completedIds[0];$('#wordSearch').value=d.words.find(w=>w.id===old).hanzi;$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));click('[data-start="'+old+'"]');assert(!body().includes('5.1'));assert(!body().includes('Mã ví dụ:'));click('[data-step="1"]');assert(document.querySelector('[data-lesson-view]'));assert(!body().includes('5.3'));
// Exercise every new lesson through the real entry point, including empty traps.
for(const id of p.batches.at(-1).wordIds){
 const word=d.words.find(w=>w.id===id);
 click('[data-action="close"]');click('[data-level="'+word.level+'"]');$('#wordSearch').value=word.hanzi;$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));
 const target='[data-start="'+id+'"]';
 for(let page=0;!$(target)&&page<d.lessons.length;page++){assert(!$('[data-lesson="1"]').disabled,'Target must be reachable in filtered pages: '+id);click('[data-lesson="1"]');}
 click(target);
 assert(!body().includes('Chuẩn V2'));assert(!body().includes('[Từ số '+word.lesson.cohortOrdinal+']'));assert(!body().includes('Mã ví dụ:'));assert(!body().includes('Mã cách dùng:'));assert(!body().includes('Mã câu hỏi:'));
 click('[data-step="1"]');assert.equal(document.querySelectorAll('.standard-example').length,2);
 click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,word.examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');
 click('[data-step="2"]');if(!word.lesson.traps.length)assert(body().includes(word.lesson.noTrapReason));
 click('[data-step="3"]');
 if(id===sample.id)assert(document.querySelector('.feedback'),'Previously revealed answer must persist');
 else{assert(!document.querySelector('.feedback'));assert(!document.querySelector('[data-v2-hint]'));}
 assert.equal(document.querySelectorAll('[data-reveal-check]').length,word.lesson.checks.length);
}
console.log('PASS DOM: V1/V2 loader, two examples, audio dispatch, hidden answers, persisted drafts across redraw, three hint levels, review, favorite, search and trap paging; all latest-batch routes, empty traps and question counts. DOM simulation only; no visual layout/device playback certification.');
window.happyDOM.abort();window.close();process.exit(0);
