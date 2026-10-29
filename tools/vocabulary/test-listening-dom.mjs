// DOM test for the unified listening-speaking practice (pilot merged into Practice):
// deep link into Practice, five steps, independent answers, role-play, per-lesson state,
// compact board entry, other lessons unaffected. Each scenario runs in its own process.
// Run with HAPPY_DOM_MODULE set, like test-dom.mjs.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const scenario = process.argv[2];
if (!scenario) {
  for (const s of ['deep', 'board', 'generic']) {
    execFileSync(process.execPath, [new URL(import.meta.url).pathname, s], { stdio: 'inherit', env: process.env });
  }
  console.log('PASS listening-practice DOM (all scenarios)');
  process.exit(0);
}

const { Window } = await import(process.env.HAPPY_DOM_MODULE);
const html = fs.readFileSync('vocabulary.html', 'utf8');
const courseText = fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8');
const pilotText = fs.readFileSync('data/listening-pilot.json', 'utf8');
const dictText = fs.readFileSync('data/pinyin-dict.json', 'utf8');
const convText = fs.readFileSync('data/vocabulary/conversations-demo.json', 'utf8');
const urls = {
  deep: 'https://example.test/vocabulary.html?practice=hz-h2-0ec2a615954f#practice',
  board: 'https://example.test/vocabulary.html#words',
  generic: 'https://example.test/vocabulary.html#practice',
};
const window = new Window({ url: urls[scenario] });
const { document } = window;
document.open(); document.write(html.replace(/<script[\s\S]*?<\/script>/g, '')); document.close();
for (const key of Object.getOwnPropertyNames(window)) if (!(key in globalThis)) globalThis[key] = window[key];
globalThis.window = window; globalThis.document = document; globalThis.location = window.location;
window.speechSynthesis = { getVoices: () => [], speak() {}, cancel() {}, addEventListener() {} };
window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
window.HTMLDialogElement.prototype.close = function () { this.open = false; };
window.HTMLElement.prototype.scrollIntoView = () => {};
const respond = text => Promise.resolve({ ok: true, json: async () => JSON.parse(text) });
globalThis.fetch = url => {
  const u = String(url);
  if (u.includes('hanzii-course')) return respond(courseText);
  if (u.includes('listening-pilot')) return respond(pilotText);
  if (u.includes('pinyin-dict')) return respond(dictText);
  if (u.includes('conversations-demo')) return respond(convText);
  return respond('{}');
};
await import('../../js/vocabulary.js');
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const waitFor = async (fn, label, tries = 240) => { for (let i = 0; i < tries; i++) { if (fn()) return; await new Promise(r => setTimeout(r, 25)); } assert.fail(`timeout: ${label}`); };
const tick = (ms = 60) => new Promise(r => setTimeout(r, ms));

if (scenario === 'deep') {
  await waitFor(() => $('.listening-pilot'), 'practice pilot module from deep link');
  assert.ok($('.lp-head h1').textContent.includes('HSK 2'), 'practice header names the lesson');
  assert.ok($('.lp-head').textContent.includes('24 từ'), 'header shows the word count');
  assert.ok($('.lp-head').textContent.includes('Giọng đọc máy (AI)'), 'header labels the AI voice honestly');
  assert.ok($('.lp-head').textContent.includes('tự biên soạn'), 'header labels the dialogue as self-authored');
  assert.ok($('[data-lp-start]'), 'there is a Start button');
  assert.ok($('[data-lp-back]'), 'there is a back-to-the-word-board button');
  await waitFor(() => $('#conversationSelect'), 'sample conversations mounted below the module');
  assert.ok($('.lp-samples-head'), 'a clearly separated sample-conversation area exists');
  assert.ok($('.listening-pilot').textContent.includes('Từ của bài xuất hiện trong bản nghe: 6/24'), 'verified coverage shown in the module');
  const panels = $$('.lp-panel');
  assert.equal(panels.length, 5);
  assert.equal(panels.filter(p => !p.hidden).length, 1);
  assert.equal(panels.findIndex(p => !p.hidden), 0);
  // Step 2 (Nghe hiểu) holds gist AND details.
  $('[data-lp-step="2"]').click(); await tick();
  assert.equal(panels.findIndex(p => !p.hidden), 1);
  $('[data-lp-gist="0"]').click(); await tick();
  let fb = $('.lp-feedback');
  assert.ok(fb && !fb.hidden && fb.textContent.includes('Chưa đúng'), 'wrong gist choice gives honest feedback');
  $('[data-lp-gist="1"]').click(); await tick();
  assert.ok(fb.textContent.includes('Đúng rồi'), 'right gist choice confirmed');
  const answers = $$('.lp-detail .lp-answer');
  assert.equal(answers.length, 3);
  assert.ok(answers.every(a => a.hidden), 'detail answers start hidden');
  $('[data-lp-reveal="1"]').click(); await tick();
  assert.deepEqual($$('.lp-detail .lp-answer').map(a => a.hidden), [true, false, true], 'detail answers open independently');
  // Step 3 (Xem lời thoại).
  $('[data-lp-step="3"]').click(); await tick();
  assert.equal($$('[data-panel="3"] .lp-line [data-lp-line]').length, 11, 'transcript has 11 playable lines');
  assert.ok($$('[data-panel="3"] .wz').length > 10, 'transcript words are tappable lookup spans');
  // Step 4 (Nhắc lại) + persisted state keyed by lesson and material version.
  $('[data-lp-step="4"]').click(); await tick();
  assert.equal($$('.lp-rep-label').length, 3, 'three repeat lines');
  const saved1 = JSON.parse(window.localStorage.getItem('hanzi-viet-listen-v2'));
  assert.equal(saved1.step, 4, 'current step is persisted');
  assert.equal(saved1.lessonId, 'hz-h2-0ec2a615954f', 'progress is keyed by lesson id');
  assert.equal(saved1.version, 3, 'progress is keyed by material version');
  // Step 5 (Tự nói): role-play with the line files + sample reveal.
  $('[data-lp-step="5"]').click(); await tick();
  assert.ok($('[data-lp-role="M"]') && $('[data-lp-role="F"]'), 'both roles are offered');
  assert.ok($('[data-panel="5"] .lp-answer').hidden, 'sample answer starts hidden');
  $('[data-lp-role="M"]').click(); await tick();
  const rp = $('.lp-rp');
  assert.ok(rp && !rp.hidden && rp.textContent.includes('Đến lượt bạn'), 'role-play waits at the learner line (line 1 is Da Wei)');
  $('[data-lp-rp-done]').click(); await tick();
  assert.ok(rp.textContent.includes('Đang đóng vai'), 'after speaking, the app plays the other role');
  $('[data-lp-rp-stop]').click(); await tick();
  $('[data-lp-sample]').click(); await tick();
  assert.ok(!$('[data-panel="5"] .lp-answer').hidden, 'sample opens after the learner tries');
  const selfRadio = $('input[name="lpSelf"][value="again"]');
  selfRadio.click(); selfRadio.dispatchEvent(new window.Event('change', { bubbles: true })); await tick();
  $('[data-lp="save"]').click(); await tick();
  const saved2 = JSON.parse(window.localStorage.getItem('hanzi-viet-listen-v2'));
  assert.equal(saved2.self, 'again'); assert.equal(saved2.saved, true);
  assert.ok(saved2.done.gist && saved2.done.task && saved2.done.detail && saved2.done.compare, 'activities are recorded');
  $('[data-lp="play"]').click(); await tick(150);
  assert.ok($('.lp-now').textContent.includes('Câu 1/11'), 'play-all starts at line 1');
  console.log('PASS deep: Practice deep link, five merged steps, role-play, per-lesson state.');
}

if (scenario === 'board') {
  await waitFor(() => $('#courseLesson'), 'word board');
  $('[data-level="2"]').click();
  await tick(120);
  const sel = $('#courseLesson');
  [...sel.options].forEach(o => { if (o.textContent.includes('Bài 12')) sel.value = o.value; });
  sel.dispatchEvent(new window.Event('change', { bubbles: true }));
  await tick(120);
  assert.ok($('.lp-entry'), 'board shows the compact practice entry');
  assert.equal($('.listening-pilot'), null, 'the full module is NOT on the word board');
  assert.ok($('.lp-entry [data-action="practiceLesson"]'), 'entry button opens Practice for this lesson');
  console.log('PASS board: compact entry only, module lives in Practice.');
}

if (scenario === 'generic') {
  await waitFor(() => $('#conversationSelect'), 'generic practice');
  assert.equal($('.listening-pilot'), null, 'no pilot module without the pilot lesson selected');
  assert.equal($('.lp-head'), null, 'no pilot header on generic practice');
  console.log('PASS generic: other lessons keep the existing practice, no pilot leakage.');
}
