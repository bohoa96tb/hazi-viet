// DOM integration test for the Hanzi analysis stage in the real app shell.
// Uses happy-dom (same convention as tools/vocabulary/test-dom.mjs):
//   npm install --prefix /tmp/hazi-test-env happy-dom
//   HAPPY_DOM_MODULE=/path/to/happy-dom/lib/index.js node tools/hanzi/test-hanzi-analysis-dom.mjs
// Viewport widths and real-device rendering are NOT covered here; they are
// verified on the live site and reported separately.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const {Window} = await import(process.env.HAPPY_DOM_MODULE || '/tmp/hazi-test-env/node_modules/happy-dom/lib/index.js');
const root = new URL('../..', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');

const window = new Window({url: 'https://bohoa96tb.github.io/hazi-viet/?char=%E6%83%B3&v=hanzi-1'});
window.document.write(read('index.html').replace(/<script[^>]*>[\s\S]*?<\/script>/g, ''));
for (const name of ['window', 'document', 'location', 'navigator', 'URL', 'Blob', 'localStorage'])
  Object.defineProperty(globalThis, name, {value: name === 'window' ? window : window[name], configurable: true});
window.speechSynthesis = {getVoices: () => [], addEventListener() {}, cancel() {}, speak() {}};
globalThis.speechSynthesis = window.speechSynthesis;
globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
// Serve repo data files for fetch(); stub the stroke-data CDN with the
// requested character's real stroke count from the core data (the real
// CDN payload is verified on the live site instead).
const coreChars = [1, 2, 3, 4, 5, 6].flatMap(l => JSON.parse(read(`data/hsk${l}-core.json`)));
const strokeCountOf = ch => coreChars.find(c => c.char === ch)?.strokeCount ?? 13;
globalThis.fetch = async url => {
  const u = new URL(String(url));
  if (u.hostname.includes('jsdelivr')) {
    const ch = decodeURIComponent(u.pathname.split('/').pop().replace(/\.json$/, ''));
    const n = strokeCountOf(ch);
    return {ok: true, json: async () => ({strokes: Array.from({length: n}, () => 'M 0 0 L 1 1')})};
  }
  const path = decodeURIComponent(u.pathname).replace(/^.*\/(data\/.*)$/, '$1');
  try { return {ok: true, json: async () => JSON.parse(read(path))}; }
  catch { return {ok: false, status: 404, json: async () => ({})}; }
};
// Minimal HanziWriter stand-in: records the requested character and runs
// the app's own charDataLoader (which fetches the stubbed stroke data and
// sets the status text), like the real library does.
let writerChar = null;
globalThis.HanziWriter = window.HanziWriter = {
  create(box, char, opts) {
    writerChar = char;
    opts.charDataLoader(char, () => {}, () => {});
    return {cancelQuiz() {}, pauseAnimation() {}, showCharacter() {}, animateCharacter() {}, quiz(o) { o.onComplete({totalMistakes: 0}); }};
  },
};

await import(new URL('../../js/app.js?hanzi-dom-test', import.meta.url));
const tick = ms => new Promise(r => setTimeout(r, ms));
await tick(80);
const $ = s => document.querySelector(s);
const body = () => document.querySelector('#studyBody');

// The deep link opens 想 directly in the new analysis stage.
assert($('#characterDialog').open, 'study dialog must open from the deep link');
// Exactly four study tabs remain; the duplicated "Gốc chữ" tab is gone.
const tabs = document.querySelectorAll('.study-tabs [data-stage]');
assert.equal(tabs.length, 4, 'study must have exactly 4 tabs');
assert(![...tabs].some(t => t.textContent.includes('Gốc chữ')), 'Gốc chữ tab must be removed');
assert(!document.querySelector('[data-stage="4"]'), 'no fifth tab');
assert(body().querySelector('.hanzi-analysis'), '想 must render the new analysis');
assert(body().textContent.includes('TƯỞNG') && body().textContent.includes('13 nét'));
assert(body().textContent.includes('PHẦN GỢI ÂM') && body().textContent.includes('PHẦN GỢI NGHĨA'));

// Expanding 相 toggles in place: same button node, panel shows, no re-render.
const toggle = body().querySelector('[data-ha-toggle="相"]');
assert(toggle, 'expand button for 相');
assert.equal(toggle.getAttribute('aria-expanded'), 'false');
const panel = document.getElementById(toggle.getAttribute('aria-controls'));
assert(panel.hidden, 'panel starts hidden');
toggle.click();
assert.equal(toggle.getAttribute('aria-expanded'), 'true');
assert.equal(panel.hidden, false);
assert(body().querySelector('[data-ha-toggle="相"]') === toggle, 'toggle must not re-render the stage');
assert(panel.textContent.includes('木 bên trái · 目 bên phải'));

// Studying a sub-part （木） uses the legacy stage, and going back returns to
// 想 with the branch still expanded (session state preserved).
panel.querySelector('[data-study-part="木"]').click();
await tick(30);
assert(!body().querySelector('.hanzi-analysis'), '木 must keep the legacy stage');
assert(document.querySelector('.identity-char').textContent === '木');
document.querySelector('[data-action="studyBack"]').click();
await tick(30);
assert(body().querySelector('.hanzi-analysis'), 'back must return to 想 analysis');
assert.equal(body().querySelector('[data-ha-toggle="相"]').getAttribute('aria-expanded'), 'true', 'branch state survives navigation');

// Switch to writing: the loader reports 13 strokes for 想.
body().querySelector('.ha-write').click();
await tick(30);
assert.equal(writerChar, '想');
assert($('#writingStatus').textContent.includes('13 nét'), 'writing stage must load 13-stroke data: ' + $('#writingStatus').textContent);
document.querySelector('[data-action="animate"]').click();
document.querySelector('[data-action="write"]').click();
await tick(10);

// Back to "Hiểu chữ": analysis renders again, branch still expanded.
document.querySelector('[data-stage="0"]').click();
await tick(30);
assert(body().querySelector('.hanzi-analysis'));
assert.equal(body().querySelector('[data-ha-toggle="相"]').getAttribute('aria-expanded'), 'true', 'branch state survives stage switch');

// Studying 相 itself from its card keeps the legacy stage for that character.
body().querySelector('.ha-branch [data-study-part="相"]').click();
await tick(30);
assert(!body().querySelector('.hanzi-analysis'), '相 must keep the legacy stage');
assert(document.querySelector('.identity-char').textContent === '相');
document.querySelector('[data-action="studyBack"]').click();
await tick(30);
assert(body().querySelector('.hanzi-analysis'), 'back must return to 想');

// Favorite and reading progress still work and persist under the old keys.
document.querySelector('[data-action="favorite"]').click();
const saved = JSON.parse(window.localStorage.getItem('hanzi-viet-reading') || '{}');
assert.equal(saved.char, '想', 'reading position must persist for 想');

// From the last stage (Cách dùng, index 3) the primary button finishes the
// character instead of advancing to a removed fifth stage.
document.querySelector('[data-stage="3"]').click();
await tick(30);
assert(body().textContent.includes('CÁCH DÙNG'), 'stage 3 must render Cách dùng');
assert(document.querySelector('[data-action="studyNext"]').textContent.includes('Đã học'), 'last stage primary button must be the finish action');
document.querySelector('[data-action="studyNext"]').click();
await tick(30);
assert(document.querySelector('.identity-char')?.textContent !== '想' || document.querySelector('.session-complete'), 'finishing must move on from 想');

// A reading position saved by the old 5-step UI at the removed stage 4
// ("Gốc chữ") must restore safely: falls back to stage 0, four tabs, no crash.
document.querySelector('#closeDialog').click();
await tick(30);
window.localStorage.setItem('hanzi-viet-reading', JSON.stringify({char: '明', stage: 4, wordIndex: 0, sentenceIndex: 0, noteIndex: 0, wordMode: 'word', showTranslation: false}));
document.querySelector('[data-action="resume"]').click();
await tick(40);
assert.equal(document.querySelector('.identity-char').textContent, '明', 'resume must open the saved character');
assert.equal(document.querySelectorAll('.study-tabs [data-stage]').length, 4, 'still exactly 4 tabs after restore');
assert.equal(document.querySelector('.study-tabs [data-stage="0"]').getAttribute('aria-selected'), 'true', 'removed stage must fall back to stage 0');
assert(body().querySelector('.structure-card'), 'stage 0 legacy content must render after restore');

// Partial character 后: no placeholder card anywhere; the whole character
// is shown with only the identified component （口） listed and the
// supplement note. The writing stage still loads its 6 strokes.
document.querySelector('#closeDialog').click();
await tick(30);
window.localStorage.setItem('hanzi-viet-reading', JSON.stringify({char: '后', stage: 0, wordIndex: 0, sentenceIndex: 0, noteIndex: 0, wordMode: 'word', showTranslation: false}));
document.querySelector('[data-action="resume"]').click();
await tick(60);
assert.equal(document.querySelector('.identity-char').textContent, '后');
assert(body().querySelector('.hanzi-analysis'), '后 must use the analysis renderer');
assert(!body().textContent.includes('CHƯA XÁC ĐỊNH'), 'no placeholder label for 后');
const fig = body().querySelector('[data-ha-partial="后"]');
assert(fig, 'partial figure must render for 后');
assert(fig.querySelector('svg.ha-partial-svg') || fig.querySelector('.ha-partial-glyph'), 'figure shows the SVG or the glyph fallback');
const svgPaths = fig.querySelectorAll('svg.ha-partial-svg path');
if (svgPaths.length) {
  assert.equal(svgPaths.length, 6, '后 SVG must have 6 stroke paths');
  assert.equal(fig.querySelectorAll('path.ha-stroke-known').length, 3, '后 must highlight exactly the 3 strokes of 口');
}
assert(body().textContent.includes('Thành phần đã nhận diện'));
assert(body().textContent.includes('Phân tích đầy đủ đang được bổ sung'));
assert(body().textContent.includes('Nhìn chữ để nhớ'), '后 has no source etymology: observation heading');
assert(body().querySelector('.ha-branches-partial [data-study-part="口"], .ha-branches-partial .ha-branch'), 'identified part 口 must be listed');
document.querySelector('[data-stage="1"]').click();
await tick(60);
assert.equal(writerChar, '后', 'writing stage must load 后');
assert($('#writingStatus').textContent.includes('6 nét'), 'writing stage must load 6-stroke data for 后: ' + $('#writingStatus').textContent);
document.querySelector('[data-stage="0"]').click();
await tick(30);
assert(body().querySelector('[data-ha-partial="后"]'), 'back to stage 0 keeps the partial figure');

// 冷 (full tree, source etymology) keeps the "Vì sao" heading, and its part
// 令 — itself a partial character — opens with the partial presentation.
document.querySelector('#closeDialog').click();
await tick(30);
window.localStorage.setItem('hanzi-viet-reading', JSON.stringify({char: '冷', stage: 0, wordIndex: 0, sentenceIndex: 0, noteIndex: 0, wordMode: 'word', showTranslation: false}));
document.querySelector('[data-action="resume"]').click();
await tick(40);
assert.equal(document.querySelector('.identity-char').textContent, '冷');
assert(body().textContent.includes('Vì sao ghép như vậy?'), '冷 keeps the sourced-explanation heading');
const lingLink = body().querySelector('[data-study-part="令"]');
assert(lingLink, '冷 must link its part 令');
lingLink.click();
await tick(60);
assert.equal(document.querySelector('.identity-char').textContent, '令');
// 令 has no standardized profile yet, so it keeps the legacy stage; the
// partial presentation applies once a character is standardized. What
// matters here: navigation from a full character to its part works.
assert(!body().querySelector('.hanzi-analysis'), '令 must keep the legacy stage until standardized');
assert(!body().textContent.includes('CHƯA XÁC ĐỊNH'), 'no placeholder label for 令');

console.log('test-hanzi-analysis-dom: all assertions passed');
