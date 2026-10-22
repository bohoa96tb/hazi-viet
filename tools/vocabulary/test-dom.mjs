// Optional DOM integration: npm install --prefix /tmp/hazi-test-env happy-dom
// HAPPY_DOM_MODULE may point to an existing installation. No production dependency.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
const {Window}=await import(process.env.HAPPY_DOM_MODULE||'/tmp/hazi-test-env/node_modules/happy-dom/lib/index.js');
const root=new URL('../..',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const d=JSON.parse(read('data/vocabulary/hanzii-course.json')),p=JSON.parse(read('progress.json'));
const window=new Window({url:'https://bohoa96tb.github.io/hazi-viet/vocabulary.html?word='+p.batches.at(-1).wordIds[0]});
window.document.write(read('vocabulary.html').replace(/<script[^>]*>[\s\S]*?<\/script>/g,''));
for(const name of ['window','document','location','navigator','URL','Blob'])Object.defineProperty(globalThis,name,{value:name==='window'?window:window[name],configurable:true});
const speech=[];window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},resume(){},speak(u){speech.push(u);u.onstart?.()}};globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};
globalThis.fetch=async url=>({ok:true,json:async()=>structuredClone(d)});
await import(new URL('../../js/vocabulary.js?dom-test',import.meta.url));await new Promise(r=>setTimeout(r,20));
const $=s=>document.querySelector(s),click=s=>{assert($(s),'Missing '+s);$(s).click()},body=()=>$('#lessonBody').textContent;
assert($('#wordDialog').open);assert(body().includes('Chuẩn V2'));assert(body().includes('[Từ số 49]'));
click('[data-step="1"]');assert.equal(document.querySelectorAll('.standard-example').length,2);assert(!document.querySelector('[data-lesson-view]'));
click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,d.words.find(w=>w.id===p.batches.at(-1).wordIds[0]).examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');
click('[data-step="3"]');assert(!document.querySelector('.feedback'));assert(!document.querySelector('[data-v2-hint]'));
const input=$('[data-v2-draft="q1"]');input.value='我六点回家。';input.dispatchEvent(new window.Event('input',{bubbles:true}));click('[data-reveal-check="q1"]');assert(body().includes('Đáp án tham khảo'));assert.equal($('[data-v2-draft="q1"]').value,'我六点回家。');
click('[data-v2-unlock]');assert(!body().includes('Tôi về nhà lúc bảy giờ.'));click('[data-v2-hint="s1"]');assert(!body().includes('Tôi về nhà lúc bảy giờ.'));click('[data-v2-hint="s1"]');assert(!body().includes('Tôi về nhà lúc bảy giờ.'));click('[data-v2-hint="s1"]');assert(body().includes('Tôi về nhà lúc bảy giờ.'));
click('[data-step="4"]');click('[data-action="revealReview"]');assert(document.querySelector('[data-grade="good"]'));
// Favorite and progress storage still operate; no grade is automatically assigned.
click('[data-action="favorite"]');assert.equal($('[data-action="favorite"]').getAttribute('aria-pressed'),'true');
click('[data-action="close"]');assert(!$('#wordDialog').open);
$('#wordSearch').value='不用';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));assert(document.querySelector('[data-start="hz-h1-b51cd2090a80"]'));
click('[data-start="hz-h1-b51cd2090a80"]');assert(body().includes('bù yòng'));click('[data-step="2"]');assert(body().includes('不用 / 不要'));click('[data-lesson-page="trap"][data-delta="1"]');assert(body().includes('不用 / 没用'));
click('[data-action="close"]');$('#wordSearch').value='';$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));
// A protected V1 word can still be opened through the same application.
const old=p.completedIds[0];$('#wordSearch').value=d.words.find(w=>w.id===old).hanzi;$('#wordSearch').dispatchEvent(new window.Event('input',{bubbles:true}));click('[data-start="'+old+'"]');assert(body().includes('5.1'));click('[data-step="1"]');assert(document.querySelector('[data-lesson-view]'));
console.log('PASS DOM: V1/V2 loader, two examples, audio dispatch, hidden answers, persisted drafts across redraw, three hint levels, review, favorite, search and trap paging. DOM simulation only; no visual layout/device playback certification.');
window.happyDOM.abort();window.close();process.exit(0);
