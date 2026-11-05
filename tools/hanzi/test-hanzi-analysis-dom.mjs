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
// Serve repo data files for fetch(); stub the stroke-data CDN with 13 empty
// strokes (the real CDN payload is verified on the live site instead).
globalThis.fetch = async url => {
  const u = new URL(String(url));
  if (u.hostname.includes('jsdelivr')) return {ok: true, json: async () => ({strokes: Array.from({length: 13}, () => ({}))})};
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

console.log('test-hanzi-analysis-dom: all assertions passed');
