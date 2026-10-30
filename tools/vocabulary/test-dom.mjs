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
click('[data-step="1"]');assert.equal(document.querySelectorAll('.standard-example').length,sample.lesson.readingBlocks ? sample.lesson.usages.length : 2);assert(!document.querySelector('[data-lesson-view]'));
if(sample.lesson.readingBlocks)click('[data-step="0"]');
click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,sample.examples[0].zh);
 // In-place word lookup: a segmented word opens the meaning popup in place, never Hanzi.
 const wzSpan=document.querySelector('#lessonBody .wz');assert(wzSpan,'Lesson examples must render segmented word spans');
 const wzWord=wzSpan.dataset.wz;wzSpan.click();
 const wzPopup=document.querySelector('#wzPopup');assert(wzPopup&&!wzPopup.hidden,'Word popup must open when a word is clicked');
 assert(wzPopup.textContent.includes(wzWord),'Popup must show the clicked word: '+wzWord);
 assert(wzPopup.querySelector('[data-wz-hanzi]'),'Popup must offer the separate Hanzi analysis button');
 assert(wzPopup.querySelector('.wz-pinyin'),'Popup must show a pinyin line by default');
 const wzCourse=d.words.find(w=>w.hanzi===wzWord);
 if(wzCourse)assert.equal(wzPopup.querySelector('.wz-pinyin').textContent.trim(),wzCourse.intro.map(x=>x.pinyin).join(' / '),'Popup pinyin must be the authored readings of the exact word');
 assert(!document.querySelector('#lessonBody .wz a.hanzi-char'),'Upgraded reading text must not keep per-character Hanzi links');
 document.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 assert(wzPopup.hidden,'Escape must close the word popup');assert.equal(speech.at(-1).lang,'zh-CN');
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
 click('[data-step="1"]');
 if(word.lesson.readingBlocks){
  assert.equal(document.querySelectorAll('.standard-example').length,word.lesson.usages.length,'readingBlocks lesson step 1 shows usage frames only: '+id);
  click('[data-step="0"]');click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,word.examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');
  click('[data-step="1"]');
 }else{
  assert.equal(document.querySelectorAll('.standard-example').length,2);
  click('[data-lesson-audio="example-only"]');assert.equal(speech.at(-1).text,word.examples[0].zh);assert.equal(speech.at(-1).lang,'zh-CN');
 }
 click('[data-step="2"]');if(!word.lesson.traps.length)assert(body().includes(word.lesson.noTrapReason));
 click('[data-step="3"]');
 if(id===sample.id)assert(document.querySelector('.feedback'),'Previously revealed answer must persist');
 else{assert(!document.querySelector('.feedback'));assert(!document.querySelector('[data-v2-hint]'));}
 assert.equal(document.querySelectorAll('[data-reveal-check]').length,word.lesson.checks.length);
}
// --- Audio display toggles: Pinyin từ / Câu ví dụ / Pinyin câu ---
const tick=ms=>new Promise(r=>setTimeout(r,ms));
window.location.hash='audio';await tick(60);
const tgl=k=>document.querySelector('[data-audio-display="'+k+'"]');
for(const k of ['wordPinyin','example','examplePinyin']){assert(tgl(k),'toggle exists: '+k);assert.equal(tgl(k).getAttribute('aria-pressed'),'false','toggle off by default: '+k)}
assert($('#playerWordPinyin').hidden&&$('#playerExample').hidden&&$('#playerExamplePinyin').hidden,'all three display lines hidden by default');
const w0=d.words[0];
click('#audioPlay');await tick(30);
assert.equal($('#playerState').textContent,'Đang phát');
const spokenBefore=speech.length;
tgl('wordPinyin').click();
assert.equal(tgl('wordPinyin').getAttribute('aria-pressed'),'true');
assert(!$('#playerWordPinyin').hidden);assert.equal($('#playerWordPinyin').textContent,'wǒ');
assert.equal(speech.length,spokenBefore,'toggling must not restart, replay or skip speech');
assert.equal($('#playerState').textContent,'Đang phát','toggling must not pause playback');
tgl('examplePinyin').click();
assert($('#playerExamplePinyin').hidden,'sentence pinyin stays hidden while the sentence itself is hidden');
tgl('example').click();
assert(!$('#playerExample').hidden);assert.equal($('#playerExample').textContent,w0.examples[0].zh);
assert($('#playerExamplePinyin').hidden,'no verified pinyin available in this harness -> line hidden, never fabricated');
click('[data-player="next"]');await tick(30);
assert.equal($('#playerWord').textContent,'你');assert.equal($('#playerWordPinyin').textContent,'nǐ');assert.equal($('#playerExample').textContent,d.words[1].examples[0].zh);
document.querySelector('[name="audioMode"][value="context"]').click();await tick(30);
assert.equal(tgl('wordPinyin').getAttribute('aria-pressed'),'true','toggles survive a mode switch');
assert(!$('#playerExample').hidden,'example line still shown after mode switch');
const ai=d.words.findIndex(w=>w.examples&&w.examples[0]&&w.examples[0].pinyin);
assert(ai>=0,'fixture: a word whose first example carries authored pinyin');
const aw=d.words[ai];
$('#audioScope').value='range';$('#audioScope').dispatchEvent(new window.Event('change',{bubbles:true}));
$('#audioFrom').value=String(ai+1);$('#audioFrom').dispatchEvent(new window.Event('input',{bubbles:true}));
$('#audioTo').value=String(ai+1);$('#audioTo').dispatchEvent(new window.Event('input',{bubbles:true}));await tick(30);
assert.equal($('#playerExample').textContent,aw.examples[0].zh);
assert(!$('#playerExamplePinyin').hidden);assert.equal($('#playerExamplePinyin').textContent,aw.examples[0].pinyin,'authored example pinyin shown verbatim');
assert.deepEqual(JSON.parse(window.localStorage.getItem('hanzi-viet-audio-display-v1')),{wordPinyin:true,example:true,examplePinyin:true},'toggle states persisted');
window.location.hash='words';await tick(40);window.location.hash='audio';await tick(60);
assert.equal(tgl('example').getAttribute('aria-pressed'),'true','toggle states restored when re-entering the audio view');
document.querySelector('[name="audioMode"][value="quick"]').click();await tick(30);
click('#audioPlay');await tick(30);
for(let i=0;i<8&&$('#playerState').textContent!=='Đã nghe hết';i++){speech.at(-1).onend?.();await tick(480)}
assert.equal($('#playerState').textContent,'Đã nghe hết','one-word plan completes');
assert.equal($('#audioPlay').textContent,'Nghe lại từ đầu');
click('#audioPlay');await tick(30);assert.equal($('#playerState').textContent,'Đang phát','replay from the start works after completion');
console.log('PASS DOM: V1/V2 loader, two examples, audio dispatch, hidden answers, persisted drafts across redraw, three hint levels, review, favorite, search and trap paging; all latest-batch routes, empty traps and question counts. DOM simulation only; no visual layout/device playback certification.');
window.happyDOM.abort();window.close();process.exit(0);
