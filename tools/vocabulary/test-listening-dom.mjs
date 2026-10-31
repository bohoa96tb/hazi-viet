// DOM test for the unified listening-speaking practice (pilot merged into Practice):
// deep link into Practice, a set of up to 5 videos with per-video progress, five steps,
// independent answers, compact board entry, other lessons unaffected. v6 adds: saved-state
// migration from v5 (buckets of surviving videos kept, removed video dropped), lean
// activities for very short videos, and the windowed CS3-0107 recording in the set.
// Each scenario runs in its own process.
// Run with HAPPY_DOM_MODULE set, like test-dom.mjs.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const scenario = process.argv[2];
if (!scenario) {
  for (const s of ['deep', 'board', 'generic', 'deep2', 'deep3', 'deep4', 'deep5']) {
    execFileSync(process.execPath, [new URL(import.meta.url).pathname, s], { stdio: 'inherit', env: process.env });
  }
  console.log('PASS listening-practice DOM (all scenarios)');
  process.exit(0);
}

const { Window } = await import(process.env.HAPPY_DOM_MODULE);
const html = fs.readFileSync('vocabulary.html', 'utf8');
const courseText = fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8');
const pilotText = fs.readFileSync('data/listening-pilot.json', 'utf8');
const hsk1Text = fs.readFileSync('data/practice/hz-h1-64d354d405bb.json', 'utf8');
const hsk1b2Text = fs.readFileSync('data/practice/hz-h1-f05455e3c9c0.json', 'utf8');
const hsk1b3Text = fs.readFileSync('data/practice/hz-h1-9e4bde0a04dc.json', 'utf8');
const hsk2b5Text = fs.readFileSync('data/practice/hz-h2-05f3747c37f2.json', 'utf8');
const dictText = fs.readFileSync('data/pinyin-dict.json', 'utf8');
const convText = fs.readFileSync('data/vocabulary/conversations-demo.json', 'utf8');
const urls = {
  deep: 'https://example.test/vocabulary.html?practice=hz-h2-0ec2a615954f#practice',
  board: 'https://example.test/vocabulary.html#words',
  generic: 'https://example.test/vocabulary.html#practice',
  deep2: 'https://example.test/vocabulary.html?practice=hz-h1-64d354d405bb#practice',
  deep3: 'https://example.test/vocabulary.html?practice=hz-h1-f05455e3c9c0#practice',
  deep4: 'https://example.test/vocabulary.html?practice=hz-h1-9e4bde0a04dc#practice',
  deep5: 'https://example.test/vocabulary.html?practice=hz-h2-05f3747c37f2#practice',
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
if (scenario === 'deep') {
  // A v5 learner: video 1 at step 3 with gist+played done, plus progress on cs4-3106,
  // the recording removed in v6. Migration must keep the first, drop the second.
  window.localStorage.setItem('hanzi-viet-listen-v2', JSON.stringify({
    lessonId: 'hz-h2-0ec2a615954f', version: 5, video: 0, saved: true, self: 'again',
    videos: { 'cs4-1108': { step: 3, done: { gist: true, played: true } }, 'cs4-3106': { step: 2, done: { gist: true } } },
  }));
}
const respond = text => Promise.resolve({ ok: true, json: async () => JSON.parse(text) });
globalThis.fetch = url => {
  const u = String(url);
  if (u.includes('practice/manifest')) return respond(JSON.stringify({ version: 1, lessons: [{ key: 'hz-h2-0f9648e9dded', anchorWordId: 'hz-h2-0ec2a615954f', file: 'data/listening-pilot.json', version: 6 }, { key: 'hz-h1-64d354d405bb', anchorWordId: 'hz-h1-64d354d405bb', file: 'data/practice/hz-h1-64d354d405bb.json', version: 3 }, { key: 'hz-h1-f05455e3c9c0', anchorWordId: 'hz-h1-f05455e3c9c0', file: 'data/practice/hz-h1-f05455e3c9c0.json', version: 2 }, { key: 'hz-h1-9e4bde0a04dc', anchorWordId: 'hz-h1-9e4bde0a04dc', file: 'data/practice/hz-h1-9e4bde0a04dc.json', version: 2 }, { key: 'hz-h2-05f3747c37f2', anchorWordId: 'hz-h2-05f3747c37f2', file: 'data/practice/hz-h2-05f3747c37f2.json', version: 3 }] }));
  if (u.includes('hanzii-course')) return respond(courseText);
  if (u.includes('listening-pilot')) return respond(pilotText);
  if (u.includes('hz-h1-64d354d405bb.json')) return respond(hsk1Text);
  if (u.includes('hz-h1-f05455e3c9c0.json')) return respond(hsk1b2Text);
  if (u.includes('hz-h1-9e4bde0a04dc.json')) return respond(hsk1b3Text);
  if (u.includes('hz-h2-05f3747c37f2.json')) return respond(hsk2b5Text);
  if (u.includes('pinyin-dict')) return respond(dictText);
  if (u.includes('conversations-demo')) return respond(convText);
  return respond('{}');
};
await import('../../js/vocabulary.js');
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const waitFor = async (fn, label, tries = 240) => { for (let i = 0; i < tries; i++) { if (fn()) return; await new Promise(r => setTimeout(r, 25)); } assert.fail(`timeout: ${label}`); };
const tick = (ms = 60) => new Promise(r => setTimeout(r, ms));
const savedState = () => JSON.parse(window.localStorage.getItem('hanzi-viet-listen-v2'));
const savedLesson = () => savedState().lessons['hz-h2-0f9648e9dded'];
const visiblePanel = () => $$('.lp-panel').findIndex(p => !p.hidden);

if (scenario === 'deep') {
  await waitFor(() => $('.listening-pilot'), 'practice pilot module from deep link');
  assert.ok($('.lp-head h1').textContent.includes('HSK 2'), 'practice header names the lesson');
  assert.ok($('.lp-head').textContent.includes('24 từ'), 'header shows the word count');
  assert.ok($('.lp-head').textContent.includes('Người thật đóng hội thoại'), 'header labels the human-voice videos honestly');
  assert.ok($('.lp-head').textContent.includes('Chinese Station'), 'header names the video source');
  assert.ok($('#lpYtMount'), 'YouTube player mount exists');
  assert.ok($('[data-lp="ytplay"]'), 'video play control exists');
  assert.ok($('[data-lp-start]'), 'there is a Start button');
  assert.ok($('[data-lp-back]'), 'there is a back-to-the-word-board button');
  // Migration from the seeded v5 state.
  assert.equal(savedState().store, 2, 'progress store is the multi-lesson root');
  const s0 = savedLesson();
  assert.equal(s0.version, 6, 'saved state migrated to the current material version');
  assert.equal(s0.videos['cs4-1108'].step, 3, 'progress of a surviving video is kept');
  assert.equal(s0.videos['cs4-3106'], undefined, 'progress of the removed video is dropped');
  assert.equal(s0.saved, true, 'save-for-review flag survives migration');
  assert.equal(s0.self, 'again', 'self assessment survives migration');
  // The video set: exactly 5 selectable videos, one player only.
  assert.equal($$('[data-lp-video]').length, 5, 'video list shows the 5 selected videos');
  assert.equal($$('#lpYtMount').length, 1, 'only one YouTube player mount exists');
  assert.ok($('.listening-pilot').textContent.includes('Tổng cả bộ 5 video: 10/24'), 'total set coverage shown in the module');
  assert.ok($('.listening-pilot').textContent.includes('14 từ của bài chưa xuất hiện trong bộ video'), 'missing words are listed in a collapsed box');
  await waitFor(() => $('#conversationSelect'), 'sample conversations mounted below the module');
  assert.ok($('.lp-samples-head'), 'a clearly separated sample-conversation area exists');
  const panels = $$('.lp-panel');
  assert.equal(panels.length, 5);
  assert.equal(panels.filter(p => !p.hidden).length, 1);
  assert.equal(visiblePanel(), 2, 'video 1 restores its migrated step (3)');
  // Step 3 of video 1 (restored open; click its step button like a learner re-entering it):
  // 4 segments, tappable words, and the bus-pair note.
  $('[data-lp-step="3"]').click(); await tick();
  assert.equal($$('[data-panel="3"] [data-lp-seg]').length, 4, 'video 1 transcript has 4 playable segments');
  assert.ok($('[data-lp="sub"]'), 'subtitle-version toggle exists in the transcript step');
  assert.ok($$('[data-panel="3"] .wz').length > 10, 'transcript words are tappable lookup spans');
  assert.ok($('[data-panel="3"]').textContent.includes('đều có thể chỉ xe buýt'), 'transcript step explains 公交车 / 公共汽车');
  // Step 2 of video 1: gist only — a very short video has NO padded detail questions.
  $('[data-lp-step="2"]').click(); await tick();
  assert.equal(visiblePanel(), 1);
  assert.equal($$('.lp-detail').length, 0, 'very short video 1 has no detail questions');
  $('[data-lp-gist="0"]').click(); await tick();
  let fb = $('.lp-feedback');
  assert.ok(fb && !fb.hidden && fb.textContent.includes('Chưa đúng'), 'wrong gist choice gives honest feedback');
  $('[data-lp-gist="1"]').click(); await tick();
  assert.ok(fb.textContent.includes('Đúng rồi'), 'right gist choice confirmed');
  // Step 4: exactly one repeat line for the very short video.
  $('[data-lp-step="4"]').click(); await tick();
  assert.equal($$('.lp-rep-label').length, 1, 'very short video 1 repeats exactly one line');
  const saved1 = savedLesson();
  assert.equal(saved1.videos['cs4-1108'].step, 4, 'video 1 step persists in its own bucket');
  // Video 2 is now CS3-0107 (the windowed skit with the anchor word): fresh bucket, own questions.
  $('[data-lp-video="1"]').click();
  await waitFor(() => $('.listening-pilot') && $('.listening-pilot').textContent.includes('bản 公共汽车'), 'CS3-0107 loads after switching');
  assert.equal(visiblePanel(), 0, 'a newly added video starts from its own step 1');
  $('[data-lp-step="3"]').click(); await tick();
  assert.equal($$('[data-panel="3"] [data-lp-seg]').length, 4, 'CS3-0107 transcript has 4 playable segments');
  assert.ok($('[data-panel="3"]').textContent.includes('đều có thể chỉ xe buýt'), 'CS3-0107 also explains the bus pair');
  $('[data-lp-step="2"]').click(); await tick();
  $('[data-lp-gist="0"]').click(); await tick();
  assert.ok($('.lp-feedback').textContent.includes('Đúng rồi'), 'CS3-0107 gist answer is its own (index 0)');
  assert.ok(savedLesson().videos['cs3-0107'].done.gist, 'CS3-0107 progress recorded in its own bucket');
  // Video 3 is the taxi video: its own gist, untouched buckets elsewhere.
  $('[data-lp-video="2"]').click();
  await waitFor(() => $('.listening-pilot') && $('.listening-pilot').textContent.includes('Gọi taxi giúp'), 'taxi video loads after switching');
  $('[data-lp-step="2"]').click(); await tick();
  $('[data-lp-gist="0"]').click(); await tick();
  assert.ok($('.lp-feedback').textContent.includes('Đúng rồi'), 'taxi video gist answer is its own (index 0)');
  const savedMid = savedLesson();
  assert.ok(savedMid.videos['cs4-1206'].done.gist, 'taxi video progress recorded separately');
  assert.equal(savedMid.videos['cs4-1108'].step, 4, 'video 1 step untouched while learning other videos');
  // Video 4 (CS4-3401) keeps its detail questions, answered independently.
  $('[data-lp-video="3"]').click();
  await waitFor(() => $('.listening-pilot') && $('.listening-pilot').textContent.includes('Giao thông quanh trường'), 'campus video loads after switching');
  $('[data-lp-step="2"]').click(); await tick();
  const answers = $$('.lp-detail .lp-answer');
  assert.equal(answers.length, 3, 'longer video keeps three detail questions');
  assert.ok(answers.every(a => a.hidden), 'detail answers start hidden');
  $('[data-lp-reveal="1"]').click(); await tick();
  assert.deepEqual($$('.lp-detail .lp-answer').map(a => a.hidden), [true, false, true], 'detail answers open independently');
  assert.ok(savedLesson().videos['cs4-3401'].done.detail, 'detail activity recorded on the campus video bucket');
  // Back to video 1: its step 4 is restored.
  $('[data-lp-video="0"]').click();
  await waitFor(() => $('.listening-pilot') && $('.listening-pilot').textContent.includes('Hỏi đường đi ga tàu'), 'video 1 reloads after switching back');
  assert.equal(visiblePanel(), 3, 'video 1 restores its own step 4');
  // Step 5 (Tự nói): no role-play for embedded video, sample reveal; self/saved survived the round trip.
  $('[data-lp-step="5"]').click(); await tick();
  assert.equal($('[data-lp-role]'), null, 'role-play is NOT offered for the embedded video');
  assert.ok($('[data-panel="5"]').textContent.includes('không đóng vai'), 'step 5 explains honestly why there is no role-play');
  assert.ok($('[data-panel="5"] .lp-answer').hidden, 'sample answer starts hidden');
  const extra = $('.lp-extra');
  assert.ok(extra, 'extra practice block exists');
  assert.ok(extra.textContent.includes('Giọng đọc máy (AI)'), 'extra practice labels the AI voice');
  assert.equal(extra.querySelectorAll('[data-lp-line]').length, 11, 'extra practice keeps 11 playable lines');
  $('[data-lp-sample]').click(); await tick();
  assert.ok(!$('[data-panel="5"] .lp-answer').hidden, 'sample opens after the learner tries');
  assert.ok($('input[name="lpSelf"][value="again"]').checked, 'migrated self assessment is shown selected');
  assert.ok($('[data-lp="save"]').textContent.includes('Đã lưu'), 'migrated save flag is shown on the button');
  const done1 = savedLesson().videos['cs4-1108'].done;
  assert.ok(done1.gist && done1.task && done1.compare && done1.played, 'video 1 activities are recorded in its bucket');
  $('[data-lp-seg]').click(); await tick(60); // no YouTube API in the test env: must be a safe no-op
  console.log('PASS deep: Practice deep link, 5-video set with CS3-0107, v5→v6 migration, lean short-video activities, per-video progress, extra practice.');
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
  assert.ok($('.lp-entry').textContent.includes('video người thật'), 'entry announces the human-voice video set');
  assert.ok($('.lp-entry').textContent.includes('10/24'), 'entry shows the set coverage');
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

if (scenario === 'deep2') {
  // Second lesson through the same module: HSK 1 · Bài 1 via its own deep link.
  await waitFor(() => $('.listening-pilot'), 'HSK1 practice module from manifest');
  assert.ok($('.lp-head').textContent.includes('Làm quen và giới thiệu'), 'HSK1 lesson title from the course is shown');
  assert.ok($('.listening-pilot').textContent.includes('15/24'), 'HSK1 header shows its own verified coverage 15/24');
  assert.equal($$('[data-lp-video]').length, 5, 'HSK1 set lists 5 videos');
  assert.ok($$('[data-lp-video]')[0].textContent.includes('Lần đầu gặp nhau'), 'first HSK1 video is the first-meeting dialogue (CS4-0203)');
  assert.ok($('.lp-missing-box') && $('.lp-missing-box').textContent.includes('汉字'), 'missing words of this lesson are listed');
  // Schema regression (2026-10-30): EVERY transcript line of EVERY video must render
  // its real Chinese text and speaker name, and gist/detail/task/reference text must
  // not be empty or "undefined" — the exact failure the old legacy schema caused.
  const b1 = JSON.parse(hsk1Text);
  assert.ok(!$('.listening-pilot').textContent.includes('undefined'), 'module shows no undefined text');
  for (let vi = 0; vi < b1.recordings.length; vi++) {
    $$('[data-lp-video]')[vi].click(); await tick(60);
    const R = b1.recordings[vi];
    $('[data-lp-step="3"]').click(); await tick(40);
    const p3 = $$('.lp-panel').find(p => p.dataset.panel === '3').textContent;
    for (const ln of R.lines) {
      assert.ok(p3.includes(ln.zh), `${R.id}: rendered transcript contains “${ln.zh}”`);
      assert.ok(p3.includes(ln.name), `${R.id}: rendered transcript names speaker ${ln.name}`);
      assert.ok(p3.includes(ln.vi), `${R.id}: rendered transcript shows the Vietnamese meaning`);
    }
    $('[data-lp-step="4"]').click(); await tick(40);
    const p4 = $$('.lp-panel').find(p => p.dataset.panel === '4').textContent;
    for (const n of R.repeat) assert.ok(p4.includes(R.lines[n - 1].zh), `${R.id}: repeat step shows chosen line ${n} (1-based)`);
    $('[data-lp-step="2"]').click(); await tick(40);
    const p2 = $$('.lp-panel').find(p => p.dataset.panel === '2').textContent;
    assert.ok(p2.includes(R.gist.q), `${R.id}: gist question renders`);
    for (const d of R.details) { assert.ok(p2.includes(d.q), `${R.id}: detail question renders`); }
    $(`[data-lp-gist="${R.gist.answer}"]`).click(); await tick(40);
    assert.ok($('.lp-feedback').textContent.includes('Đúng rồi'), `${R.id}: gist answer at its redistributed position is correct`);
    for (let di = 0; di < R.details.length; di++) {
      $(`[data-lp-reveal="${di}"]`).click(); await tick(20);
      const box = $$('.lp-detail .lp-answer')[di];
      assert.ok(box.textContent.includes(R.details[di].a), `${R.id}: detail answer text renders`);
    }
    $('[data-lp-step="5"]').click(); await tick(40);
    const p5 = $$('.lp-panel').find(p => p.dataset.panel === '5').textContent;
    assert.ok(p5.includes(R.task.prompt), `${R.id}: self-speaking prompt renders`);
    $('[data-lp-sample]').click(); await tick(20);
    assert.ok(p5.includes(R.task.sampleNote), `${R.id}: self-speaking note renders`);
    assert.ok(p5.includes(R.task.sample.zh), `${R.id}: self-speaking sample renders`);
  }
  // Word lookup from the transcript: tapping a word opens the popup with Pinyin + meaning.
  $$('[data-lp-video]')[0].click(); await tick(60);
  $('[data-lp-step="3"]').click(); await tick(40);
  const wzWord = $$('[data-panel="3"] .wz').find(w => w.textContent.includes('你'));
  assert.ok(wzWord, 'transcript exposes tappable words');
  wzWord.click(); await tick(60);
  const popup = $('#wzPopup');
  assert.ok(popup && !popup.hidden, 'word-lookup popup opens from the transcript');
  assert.ok(/n[iǐìí]/.test(popup.textContent), 'lookup popup shows Pinyin');
  assert.ok(popup.textContent.length > 10, 'lookup popup shows a meaning');
  $$('[data-lp-video]')[3].click(); await tick(60);
  assert.ok($$('[data-lp-video]')[3].textContent.includes('Va chạm nhẹ') && $$('[data-lp-video]')[3].getAttribute('aria-pressed') === 'true', 'apology video (CS4-0801) selected');
  $('[data-lp-step="3"]').click(); await tick(40);
  assert.ok($$('.lp-panel').find(p => p.dataset.panel === '3').textContent.includes('nghe theo') && $$('.lp-panel').find(p => p.dataset.panel === '3').textContent.includes('cả đoạn'), 'clip-mode note explains whole-clip listening');
  assert.equal($$('[data-lp-line]').length, 0, 'clip mode has no per-line buttons');
  assert.equal($$('[data-lp-seg]').length, 0, 'clip mode has no per-segment play buttons');
  assert.ok($('[data-lp="ytplay"]'), 'whole-clip play button is the player control');
  $('[data-lp-step="2"]').click(); await tick(40);
  $('[data-lp-gist="0"]').click(); await tick(40);
  const root = savedState();
  assert.ok(root.lessons['hz-h1-64d354d405bb'].videos['cs4-0801'].done.gist, 'HSK1 progress saved under its own lesson key');
  assert.equal(root.lessons['hz-h2-0f9648e9dded'], undefined, 'pilot lesson bucket untouched in this scenario');
  console.log('PASS deep2: second lesson (HSK 1 · Bài 1) runs through the same module, clip mode for tiny videos, per-lesson progress isolation.');
}

if (scenario === 'deep3') {
  // Third lesson through the same module: HSK 1 · Bài 2 via its own deep link.
  await waitFor(() => $('.listening-pilot'), 'HSK1 Bai 2 practice module from manifest');
  assert.ok($('.lp-head').textContent.includes('HSK 1 · Bài 2'), 'Bai 2 lesson title shown');
  assert.ok($('.listening-pilot').textContent.includes('11/24'), 'Bai 2 header shows its own verified coverage 11/24');
  assert.equal($$('[data-lp-video]').length, 5, 'Bai 2 set lists 5 videos');
  assert.ok($$('[data-lp-video]')[0].textContent.includes('Mượn sách'), 'first Bai 2 video is the library dialogue (CS4-0807)');
  assert.ok($('.lp-missing-box') && $('.lp-missing-box').textContent.includes('课本'), 'missing words of Bai 2 are listed');
  // Schema regression (2026-10-30): every line of every Bai 2 video renders for real.
  const b2 = JSON.parse(hsk1b2Text);
  assert.ok(!$('.listening-pilot').textContent.includes('undefined'), 'Bai 2 module shows no undefined text');
  for (let vi = 0; vi < b2.recordings.length; vi++) {
    $$('[data-lp-video]')[vi].click(); await tick(60);
    const R = b2.recordings[vi];
    $('[data-lp-step="3"]').click(); await tick(40);
    const p3 = $$('.lp-panel').find(p => p.dataset.panel === '3').textContent;
    for (const ln of R.lines) {
      assert.ok(p3.includes(ln.zh), `${R.id}: rendered transcript contains “${ln.zh}”`);
      assert.ok(p3.includes(ln.name), `${R.id}: rendered transcript names speaker ${ln.name}`);
    }
    assert.ok(p3.includes('不好意思，我想借本书。') || R.id !== 'cs4-0807', 'the reported library line renders in Chinese');
    $('[data-lp-step="2"]').click(); await tick(40);
    const p2 = $$('.lp-panel').find(p => p.dataset.panel === '2').textContent;
    assert.ok(p2.includes(R.gist.q), `${R.id}: gist question renders`);
    $(`[data-lp-gist="${R.gist.answer}"]`).click(); await tick(40);
    assert.ok($('.lp-feedback').textContent.includes('Đúng rồi'), `${R.id}: gist answer correct at position ${R.gist.answer}`);
    $('[data-lp-step="5"]').click(); await tick(40);
    const p5 = $$('.lp-panel').find(p => p.dataset.panel === '5').textContent;
    assert.ok(p5.includes(R.task.sampleNote), `${R.id}: self-speaking note renders`);
  }
  // Per-line recording: the train-ticket video has segment buttons in panel 3.
  $$('[data-lp-video]')[4].click(); await tick(60);
  assert.ok($$('[data-lp-video]')[4].textContent.includes('Hàng Châu'), 'train-ticket video (CS4-1210) selected');
  $('[data-lp-step="3"]').click(); await tick(40);
  assert.ok($$('[data-lp-seg]').length >= 8, 'per-line segment buttons exist for the 8-line recording');
  $('[data-lp-step="2"]').click(); await tick(40);
  $('[data-lp-gist="1"]').click(); await tick(40);
  assert.ok($('.lp-feedback').textContent.includes('Đúng rồi'), 'train-ticket gist correct at its redistributed position (index 1)');
  const root = savedState();
  assert.ok(root.lessons['hz-h1-f05455e3c9c0'].videos['cs4-1210'].done.gist, 'Bai 2 progress saved under its own lesson key');
  assert.equal(root.lessons['hz-h1-64d354d405bb'], undefined, 'Bai 1 bucket untouched in this scenario');
  assert.equal(root.lessons['hz-h2-0f9648e9dded'], undefined, 'pilot bucket untouched in this scenario');
  console.log('PASS deep3: third lesson (HSK 1 · Bài 2) runs through the same module, per-line segments on the long recording, per-lesson progress isolation.');
}

if (scenario === 'deep4') {
  // Fourth lesson through the same module: HSK 1 · Bài 3 (phone/help cluster).
  await waitFor(() => $('.listening-pilot'), 'HSK1 Bai 3 practice module from manifest');
  assert.ok($('.lp-head').textContent.includes('HSK 1 · Bài 3'), 'Bai 3 lesson title shown');
  assert.ok($('.listening-pilot').textContent.includes('13/24'), 'Bai 3 header shows its own verified coverage 13/24');
  assert.equal($$('[data-lp-video]').length, 5, 'Bai 3 set lists 5 videos');
  assert.ok($$('[data-lp-video]')[0].textContent.includes('Hỏi số điện thoại'), 'first Bai 3 video is the phone-number dialogue (CS4-1402)');
  assert.ok($('.lp-missing-box') && $('.lp-missing-box').textContent.includes('请进'), 'missing words of Bai 3 are listed');
  // Schema/render regression, same as deep2/deep3: every line of every video renders.
  const b3 = JSON.parse(hsk1b3Text);
  assert.ok(!$('.listening-pilot').textContent.includes('undefined'), 'Bai 3 module shows no undefined text');
  for (let vi = 0; vi < b3.recordings.length; vi++) {
    $$('[data-lp-video]')[vi].click(); await tick(60);
    const R = b3.recordings[vi];
    $('[data-lp-step="3"]').click(); await tick(40);
    const p3 = $$('.lp-panel').find(p => p.dataset.panel === '3').textContent;
    for (const ln of R.lines) {
      assert.ok(p3.includes(ln.zh), `${R.id}: rendered transcript contains “${ln.zh}”`);
      assert.ok(p3.includes(ln.name), `${R.id}: rendered transcript names speaker ${ln.name}`);
      assert.ok(p3.includes(ln.vi), `${R.id}: rendered transcript shows the Vietnamese meaning`);
    }
    assert.equal($$('[data-panel="3"] [data-lp-seg]').length, R.lines.length, `${R.id}: every transcript line has its own segment play button`);
    for (const btn of $$('[data-panel="3"] [data-lp-seg]')) { const ln = R.lines[$$('[data-panel="3"] [data-lp-seg]').indexOf(btn)]; assert.equal(Number(btn.dataset.start), ln.start, `${R.id}: segment button start matches line timing`); assert.equal(Number(btn.dataset.end), ln.end, `${R.id}: segment button end matches line timing`); }
    $('[data-lp-step="4"]').click(); await tick(40);
    const p4 = $$('.lp-panel').find(p => p.dataset.panel === '4').textContent;
    for (const n of R.repeat) assert.ok(p4.includes(R.lines[n - 1].zh), `${R.id}: repeat step shows chosen line ${n} (1-based)`);
    $('[data-lp-step="2"]').click(); await tick(40);
    const p2 = $$('.lp-panel').find(p => p.dataset.panel === '2').textContent;
    assert.ok(p2.includes(R.gist.q), `${R.id}: gist question renders`);
    for (const d of R.details) assert.ok(p2.includes(d.q), `${R.id}: detail question renders`);
    $(`[data-lp-gist="${R.gist.answer}"]`).click(); await tick(40);
    assert.ok($('.lp-feedback').textContent.includes('Đúng rồi'), `${R.id}: gist answer correct at position ${R.gist.answer}`);
    for (let di = 0; di < R.details.length; di++) {
      $(`[data-lp-reveal="${di}"]`).click(); await tick(20);
      assert.ok($$('.lp-detail .lp-answer')[di].textContent.includes(R.details[di].a), `${R.id}: detail answer text renders`);
    }
    $('[data-lp-step="5"]').click(); await tick(40);
    const p5 = $$('.lp-panel').find(p => p.dataset.panel === '5').textContent;
    assert.ok(p5.includes(R.task.prompt), `${R.id}: self-speaking prompt renders`);
    $('[data-lp-sample]').click(); await tick(20);
    assert.ok(p5.includes(R.task.sampleNote), `${R.id}: self-speaking note renders`);
    assert.ok(p5.includes(R.task.sample.zh), `${R.id}: self-speaking sample renders`);
  }
  // Word lookup from a Bai 3 transcript line (手机 in video 1).
  $$('[data-lp-video]')[0].click(); await tick(60);
  $('[data-lp-step="3"]').click(); await tick(40);
  const wzWord = $$('[data-panel="3"] .wz').find(w => w.textContent.includes('手机'));
  assert.ok(wzWord, 'Bai 3 transcript exposes tappable words');
  wzWord.click(); await tick(60);
  const popup = $('#wzPopup');
  assert.ok(popup && !popup.hidden, 'word-lookup popup opens from the Bai 3 transcript');
  assert.ok(/sh[oǒòó]u/.test(popup.textContent) || popup.textContent.includes('手机'), 'lookup popup shows the word with Pinyin');
  const root = savedState();
  assert.ok(root.lessons['hz-h1-9e4bde0a04dc'], 'Bai 3 progress saved under its own lesson key');
  assert.equal(root.lessons['hz-h1-64d354d405bb'], undefined, 'Bai 1 bucket untouched in this scenario');
  assert.equal(root.lessons['hz-h1-f05455e3c9c0'], undefined, 'Bai 2 bucket untouched in this scenario');
  assert.equal(root.lessons['hz-h2-0f9648e9dded'], undefined, 'pilot bucket untouched in this scenario');
  console.log('PASS deep4: fourth lesson (HSK 1 · Bài 3) runs through the same module, all 5 videos render fully with per-line segment buttons, per-lesson progress isolation.');
}

if (scenario === 'deep5') {
  // Fifth lesson through the same module: HSK 2 · Bài 5 (priority build, feelings/description).
  await waitFor(() => $('.listening-pilot'), 'HSK2 Bai 5 practice module from manifest');
  const b5 = JSON.parse(hsk2b5Text);
  assert.ok($('.lp-head').textContent.includes('HSK 2 · Bài 5'), 'Bai 5 lesson title shown');
  assert.ok($('.listening-pilot').textContent.includes('10/24'), 'Bai 5 header shows its own verified coverage 10/24');
  assert.equal($$('[data-lp-video]').length, b5.recordings.length, 'Bai 5 set lists every recording in its data');
  assert.ok($$('[data-lp-video]')[0].textContent.includes('Tâm trạng'), 'first Bai 5 video is the mood dialogue (CS4-4113)');
  assert.ok($('.lp-missing-box') && $('.lp-missing-box').textContent.includes('难过'), 'missing words of Bai 5 are listed (incl. 难过）');
  assert.ok(![...$('.lp-missing-box').querySelectorAll('*')].some(n => n.children.length === 0 && n.textContent.trim() === '顺利'), 'covered word 顺利 no longer listed as missing');
  assert.ok(!$('.listening-pilot').textContent.includes('undefined'), 'Bai 5 module shows no undefined text');
  for (let vi = 0; vi < b5.recordings.length; vi++) {
    $$('[data-lp-video]')[vi].click(); await tick(60);
    const R = b5.recordings[vi];
    $('[data-lp-step="3"]').click(); await tick(40);
    const p3 = $$('.lp-panel').find(p => p.dataset.panel === '3').textContent;
    for (const ln of R.lines) {
      assert.ok(p3.includes(ln.zh), `${R.id}: rendered transcript contains “${ln.zh}”`);
      assert.ok(p3.includes(ln.name), `${R.id}: rendered transcript names speaker ${ln.name}`);
      assert.ok(p3.includes(ln.vi), `${R.id}: rendered transcript shows the Vietnamese meaning`);
    }
    if (R.segmentMode === 'clip') {
      assert.equal($$('[data-panel="3"] [data-lp-seg]').length, 0, `${R.id}: clip mode renders no per-line buttons`);
    } else {
      assert.equal($$('[data-panel="3"] [data-lp-seg]').length, R.lines.length, `${R.id}: every transcript line has its own segment play button`);
      for (const btn of $$('[data-panel="3"] [data-lp-seg]')) { const ln = R.lines[$$('[data-panel="3"] [data-lp-seg]').indexOf(btn)]; assert.equal(Number(btn.dataset.start), ln.start, `${R.id}: segment button start matches line timing`); assert.equal(Number(btn.dataset.end), ln.end, `${R.id}: segment button end matches line timing`); }
    }
    $('[data-lp-step="4"]').click(); await tick(40);
    const p4 = $$('.lp-panel').find(p => p.dataset.panel === '4').textContent;
    for (const n of R.repeat) assert.ok(p4.includes(R.lines[n - 1].zh), `${R.id}: repeat step shows chosen line ${n} (1-based)`);
    $('[data-lp-step="2"]').click(); await tick(40);
    const p2 = $$('.lp-panel').find(p => p.dataset.panel === '2').textContent;
    assert.ok(p2.includes(R.gist.q), `${R.id}: gist question renders`);
    for (const d of R.details) assert.ok(p2.includes(d.q), `${R.id}: detail question renders`);
    $(`[data-lp-gist="${R.gist.answer}"]`).click(); await tick(40);
    assert.ok($('.lp-feedback').textContent.includes('Đúng rồi'), `${R.id}: gist answer correct at position ${R.gist.answer}`);
    $('[data-lp-step="5"]').click(); await tick(40);
    const p5 = $$('.lp-panel').find(p => p.dataset.panel === '5').textContent;
    assert.ok(p5.includes(R.task.prompt), `${R.id}: self-speaking prompt renders`);
    $('[data-lp-sample]').click(); await tick(20);
    assert.ok(p5.includes(R.task.sampleNote), `${R.id}: self-speaking note renders`);
    assert.ok(p5.includes(R.task.sample.zh), `${R.id}: self-speaking sample renders`);
  }
  // Word lookup from a Bai 5 transcript line （心情 in video 1).
  $$('[data-lp-video]')[0].click(); await tick(60);
  $('[data-lp-step="3"]').click(); await tick(40);
  const wzWord = $$('[data-panel="3"] .wz').find(w => w.textContent.includes('心情'));
  assert.ok(wzWord, 'Bai 5 transcript exposes tappable words');
  wzWord.click(); await tick(60);
  const popup = $('#wzPopup');
  assert.ok(popup && !popup.hidden, 'word-lookup popup opens from the Bai 5 transcript');
  const root = savedState();
  assert.ok(root.lessons['hz-h2-05f3747c37f2'], 'Bai 5 progress saved under its own lesson key');
  assert.equal(root.lessons['hz-h1-9e4bde0a04dc'], undefined, 'Bai 3 bucket untouched in this scenario');
  assert.equal(root.lessons['hz-h2-0f9648e9dded'], undefined, 'pilot bucket untouched in this scenario');
  console.log('PASS deep5: fifth lesson (HSK 2 · Bài 5) runs through the same module, all videos render fully (per-line and clip modes), per-lesson progress isolation.');
}
