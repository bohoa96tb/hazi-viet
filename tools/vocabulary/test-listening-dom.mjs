// DOM test for the listening pilot section on the lesson board.
// Run with HAPPY_DOM_MODULE set, like test-dom.mjs.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const { Window } = await import(process.env.HAPPY_DOM_MODULE);
const html = fs.readFileSync('vocabulary.html', 'utf8');
const courseText = fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8');
const pilotText = fs.readFileSync('data/listening-pilot.json', 'utf8');
const dictText = fs.readFileSync('data/pinyin-dict.json', 'utf8');
const window = new Window({ url: 'https://example.test/vocabulary.html' });
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
await new Promise(r => setTimeout(r, 30));
const $ = s => document.querySelector(s);
assert(!$('.listening-pilot'), 'Pilot section must not render on other lessons');
// Go to HSK 2 and jump to the pilot page (index 11 within the level).
$('[data-level="2"]').click();
const jump = $('#courseLesson'); assert(jump, 'Lesson select exists');
jump.value = '11'; jump.dispatchEvent(new window.Event('change', { bubbles: true }));
const section = $('.listening-pilot');
assert(section, 'Pilot section must render on the pilot lesson page');
const text = section.textContent;
assert(text.includes('Nghe theo bài'), 'Section title present');
assert(text.includes('6/24 từ'), 'Practised count combines both evidence tiers: ' + text.slice(0, 200));
assert(text.includes('公共汽车') && text.includes('出租车') && text.includes('地铁'), 'Verified words shown');
assert(text.includes('腿'), 'Uncovered words are listed honestly');
assert(!text.includes('hz-h2-'), 'No internal IDs leak into the UI');
const frame = section.querySelector('iframe');
assert(frame, 'YouTube embed present for the story recording');
assert.equal(frame.getAttribute('loading'), 'lazy', 'Embed must not load eagerly with the page');
assert(frame.src.includes('youtube-nocookie.com/embed/wcblX9JkLD4'), 'Official embed URL');
// The link recording must be a plain source link, never a fake player.
assert(section.querySelector('a.lp-open')?.href.includes('chinesefor.us'), 'Link recording opens the source page');
assert(section.querySelector('.lp-qa'), 'Comprehension questions present with hidden answers');
assert(section.querySelector('.wz'), 'Coverage sentences reuse the word-lookup spans');
// Leaving the page removes the section again.
jump.value = '0'; jump.dispatchEvent(new window.Event('change', { bubbles: true }));
assert(!$('.listening-pilot'), 'Pilot section disappears on other pages');
console.log('PASS listening-pilot DOM: section renders only on the pilot lesson, counts and embeds correct.');
process.exit(0);
