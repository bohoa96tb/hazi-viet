// DOM test for the listening pilot v2: deep link, five steps, independent answers, player wiring.
// Run with HAPPY_DOM_MODULE set, like test-dom.mjs.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const { Window } = await import(process.env.HAPPY_DOM_MODULE);
const html = fs.readFileSync('vocabulary.html', 'utf8');
const courseText = fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8');
const pilotText = fs.readFileSync('data/listening-pilot.json', 'utf8');
const dictText = fs.readFileSync('data/pinyin-dict.json', 'utf8');
const window = new Window({ url: 'https://example.test/vocabulary.html?listen=hz-h2-0ec2a615954f#words' });
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
  return respond('{}');
};
await import('../../js/vocabulary.js');
await new Promise(r => setTimeout(r, 50));
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
// The deep link must land on the pilot lesson with the section visible, no manual navigation.
const section = $('.listening-pilot');
assert(section, 'Deep link ?listen= must open the pilot lesson directly');
const text = section.textContent;
assert(text.includes('Giọng đọc máy (AI)'), 'AI voice is labelled honestly');
assert(text.includes('tự biên soạn'), 'Self-authored dialogue is labelled');
assert(text.includes('Từ của bài xuất hiện trong bản nghe: 6/24'), 'Verified coverage count is 6/24');
assert(!section.querySelector('iframe') && !section.querySelector('.lp-card') && section.querySelector('[data-lp="play"]'), 'v1 recording cards and embeds are gone (rejected sources remain only as text in the survey log)');
// Five steps, only the first visible.
assert.equal($$('.lp-panel').length, 5);
assert(!$('.lp-panel[data-panel="1"]').hidden && $('.lp-panel[data-panel="2"]').hidden, 'Step 1 shown first');
// Gist: wrong answer is rejected, right answer accepted with explanation.
$('[data-lp-step="2"]').click();
assert(!$('.lp-panel[data-panel="2"]').hidden, 'Step 2 opens');
$('[data-lp-gist="0"]').click();
assert($('.lp-feedback').textContent.includes('Chưa đúng'), 'Wrong gist answer rejected');
$('[data-lp-gist="1"]').click();
assert($('.lp-feedback').textContent.includes('Đúng rồi'), 'Right gist answer accepted');
// Details: each answer hidden independently.
$('[data-lp-step="3"]').click();
const answers = $$('.lp-detail .lp-answer');
assert(answers.every(a => a.hidden), 'All detail answers start hidden');
$$('[data-lp-reveal]')[0].click();
assert(!answers[0].hidden && answers[1].hidden && answers[2].hidden, 'Revealing one answer leaves the others hidden');
// Step 4: full transcript with per-line play buttons and word lookup spans.
$('[data-lp-step="4"]').click();
assert.equal($$('[data-panel="4"] [data-lp-line]').length, 11, 'One play button per dialogue line');
assert($('[data-panel="4"]').querySelector('.wz'), 'Transcript sentences reuse the word-lookup spans');
// Step 5: repeat lines + sample hidden until requested.
$('[data-lp-step="5"]').click();
assert($('[data-panel="5"] .lp-answer').hidden, 'Sample answer starts hidden');
$('[data-lp-sample]').click();
assert(!$('[data-panel="5"] .lp-answer').hidden, 'Sample answer reveals on its own button');
// Player: pressing play wires the chain to the first line.
$('[data-lp="play"]').click();
assert($('.lp-now').textContent.includes('Câu 1/11'), 'Player starts at line 1: ' + $('.lp-now').textContent);
// Self-assessment and save-for-review persist to local storage.
$$('input[name="lpSelf"]')[1].click();
$$('input[name="lpSelf"]')[1].dispatchEvent(new window.Event('change', { bubbles: true }));
$('[data-lp="save"]').click();
const saved = JSON.parse(window.localStorage.getItem('hanzi-viet-listen-v2'));
assert(saved.done.gist && saved.done.detail && saved.done.compare && saved.self === 'need-text' && saved.saved === true, 'Progress, self-assessment and bookmark persist: ' + JSON.stringify(saved));
// Leaving the lesson removes the section.
const jump = $('#courseLesson'); jump.value = '0'; jump.dispatchEvent(new window.Event('change', { bubbles: true }));
assert(!$('.listening-pilot'), 'Pilot section disappears on other pages');
console.log('PASS listening-pilot DOM v2: deep link lands directly, five steps, independent hidden answers, player chain, persistence.');
process.exit(0);
