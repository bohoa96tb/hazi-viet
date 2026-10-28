// Regression test for the V3 pilot lesson 得 (hz-h2-8ac3a59c0ef6), fix round 2,
// the two-tier pilot and the 3-2-1 model (Phase A, 2026-10-25).
// Catches the teaching errors reported by the user on 2026-10-25:
//  - q2 accepted answers switching the subject (你 instead of 他)
//  - q4 forcing a single 得/要 answer where both are natural
//  - selfUse prompts not saying who speaks about whom
//  - absolute claims about 得/要, 听不懂/没听懂 and object position
//  - audioText 得到 (dé) standing for the main reading de
// 3-2-1 checks (Phase A):
//  - tier1 metadata is valid; Tier 1 is 1 confusion + 1 check + 1 self-use
//  - three reading blocks, each with its example right underneath
//  - the old object example is preserved as a t4 case, not dropped
//  - examples are shown in stage 0 (reading blocks), not repeated in stage 1
//  - the renderer shows Tier 1 by default and Tier 2 behind "Học thêm"
// Run: node tools/vocabulary/regression-de-pilot.mjs
// Exit 0 on pass; assertion failure on any regression.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {auditLesson,tierSplit} from '../..//js/lesson-standard.js';
import {renderStandardLesson} from '../..//js/lesson-standard-view.js';
import {buildPlaylist} from '../..//js/vocabulary-audio.js';

const root = new URL('../..', import.meta.url).pathname;
const data = JSON.parse(fs.readFileSync(root + 'data/vocabulary/hanzii-course.json', 'utf8'));
const progress = JSON.parse(fs.readFileSync(root + 'progress.json', 'utf8'));
const w = data.words.find(x => x.id === 'hz-h2-8ac3a59c0ef6');
assert.ok(w, '得 must exist');
const l = w.lesson;
const trap = id => l.traps.find(t => t.id === id);
const PRONOUNS = ['我们', '你们', '他们', '她们', '她们', '他', '你', '我', '她', '它'];
const pronounsIn = s => PRONOUNS.filter(p => String(s).includes(p));

let passed = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); passed++; console.log('PASS:', msg); };

// 1. The lesson still satisfies the V2 contract.
ok(auditLesson(w).ready, 'auditLesson(得) is ready');

// 2. q2: the question is about 他; every accepted answer keeps 他 and never switches to 你.
{
  const q = l.checks.find(c => c.id === 'q2');
  const a = l.answers.q2;
  ok(q.question.includes('他说中文得很好。'), 'q2 asks about 他说中文得很好');
  for (const ans of a.accepted) {
    const ps = pronounsIn(ans);
    ok(ps.includes('他') && !ps.includes('你'), `q2 accepted "${ans}" keeps 他, never 你`);
  }
}

// 3. General invariant for this lesson: a check answer that names a person
//    must name the same person as the question.
for (const c of l.checks) {
  const qp = pronounsIn(c.question);
  if (!qp.length) continue;
  for (const ans of l.answers[c.id].accepted) {
    const ap = pronounsIn(ans);
    if (ap.length) ok(JSON.stringify(ap) === JSON.stringify(qp), `${c.id}: answer "${ans}" keeps the question's person (${qp.join('/')})`);
  }
}

// 4. q4: asks explicitly about emphasising obligation, and the explanation
//    admits 要 can be right in another reading.
{
  const q = l.checks.find(c => c.id === 'q4');
  ok(/nhấn mạnh/.test(q.question) && /bắt buộc/.test(q.question), 'q4 asks which word emphasises obligation');
  ok(l.answers.q4.accepted.includes('得'), 'q4 accepts 得 for the emphasis');
  ok(l.answers.q4.explanation.includes('要 cũng có thể'), 'q4 explanation admits 要 can also be used');
}

// 5. t5: 得/要 is not an absolute split; the trap shows 要 for a planned necessity.
{
  const t = trap('t5');
  ok(t.boundary.includes('Không có ranh giới tuyệt đối'), 't5 boundary says there is no absolute split');
  ok(t.cases.some(c => c.zh === '明天我要去医院。'), 't5 shows 要 for a planned necessity');
  ok(t.difference.includes('vùng giao nhau'), 't5 difference names the overlap');
}

// 6. t4: the object rule matches the real wrong sentence (object between verb and 得).
{
  const t = trap('t4');
  ok(t.difference.includes('giữa động từ và 得'), 't4 difference says no object between verb and 得');
  ok(t.cases[0].comment.includes('chen vào giữa 说 và 得'), 't4 wrong case explains the object sits between 说 and 得');
  ok(t.boundary.includes('mẫu bổ ngữ mức độ đang dạy'), 't4 boundary scopes the rule to the degree-complement pattern');
}

// 7. t3: 听不懂 is not permanent inability; both forms can be used with different emphasis.
{
  const t = trap('t3');
  ok(t.boundary.includes('cả 听不懂 và 没听懂 đều dùng được'), 't3 boundary admits both forms can be used');
  ok(!/không bao giờ/.test(JSON.stringify(t)), 't3 never claims permanent inability');
  ok(t.cases.some(c => c.zh === '我听不懂这句话。') && t.cases.some(c => c.zh === '我没听懂这句话。'), 't3 contrasts the two forms in one shared context');
  ok(t.difference.includes('việc vừa làm, đang làm hoặc thói quen'), 't3 degree complement is not past-only');
}

// 8. t1: readings are decided by compound/function/context, and 觉得/得到 are named.
{
  const t = trap('t1');
  ok(t.difference.includes('từ ghép') && t.difference.includes('ngữ cảnh'), 't1 difference uses compound/function/context');
  ok(t.cases.some(c => c.zh.includes('觉得')) && t.cases.some(c => c.zh.includes('得到')), 't1 shows 觉得 and 得到');
}

// 9. t2: 的/地/得 in one shared context; the two near-meaning sentences are said to be near-meaning.
{
  const t = trap('t2');
  ok(t.cases.some(c => c.zh === '他认真地学习。') && t.cases.some(c => c.zh === '他学得很认真。'), 't2 contrasts 地/得 in the same context');
  ok(t.cases.find(c => c.zh === '他学得很认真。').comment.includes('cùng ý với câu trên'), 't2 says the two sentences are near-meaning');
}

// 10. selfUse: the prompt says who speaks about whom, and the model matches.
{
  const s1 = l.selfUse.find(s => s.id === 's1');
  const a1 = l.selfAnswers.s1;
  ok(s1.prompt.includes('anh ấy') && pronounsIn(a1.model).includes('他'), 's1 is about anh ấy and the model uses 他');
  const s2 = l.selfUse.find(s => s.id === 's2');
  const a2 = l.selfAnswers.s2;
  ok(s2.prompt.includes('tôi') && pronounsIn(a2.model).includes('我'), 's2 is about tôi and the model uses 我');
  for (const s of l.selfUse) {
    const m = l.selfAnswers[s.id].model;
    ok(!l.examples.some(e => e.zh === m), `selfUse ${s.id} model is not a copy of a lesson example`);
  }
}

// 11. audioText must represent the main reading de, and the quick/context
//     playlists must start with it (not 得到 / dé).
{
  ok(w.audioText === '说得很快', 'audioText is 说得很快 (main reading de)');
  for (const mode of ['quick', 'context', 'immersion']) {
    const first = buildPlaylist([w], mode)[0];
    ok(first && first.text === '说得很快', `${mode} playlist starts with 说得很快`);
  }
  const full = buildPlaylist([w], 'podcast');
  ok(full.some(s => s.text === '他说得很快。') && full.some(s => s.text === '我今天得早点回家。') && full.some(s => s.text === '我得了亚军。'), 'podcast reads all three reading contexts');
  // Same restricted tone set as auditV2: macron/caron marks (ā ǎ ē ě ī ǐ ō ǒ ū ǔ ǖ ǘ ǚ ǜ).
  // Acute/grave marks (á à é è …) also occur in Vietnamese words, so they cannot
  // prove a segment is Pinyin; the audit's contract uses this set.
  ok(!full.some(s => /[āǎēěīǐōǒūǔǖǘǚǜ]/u.test(s.text)), 'no playlist segment reads Pinyin');
  const wrongIdx = full.findIndex(s => s.text === '你说中文得很好。');
  ok(wrongIdx > 0 && full[wrongIdx - 1].text === 'Đây là câu sai để phân tích.', 'podcast warns immediately before the wrong-grammar case');
  ok(!buildPlaylist([w], 'immersion').some(s => s.text === '你说中文得很好。'), 'immersion never includes the wrong-grammar case');
}

// 12. Digest consistency: progress.json records this exact word.
{
  const digest = createHash('sha256').update(JSON.stringify(w)).digest('hex');
  ok(progress.completedDigests[w.id] === digest, 'progress.json digest matches the word');
}

// 13. 3-2-1 metadata: tier1 lists valid ids; Tier 1 is 1 confusion + 1 check + 1 self-use.
{
  const split = tierSplit(w);
  ok(Array.isArray(l.tier1?.traps) && Array.isArray(l.tier1?.checks) && Array.isArray(l.tier1?.selfUse), 'tier1 metadata exists');
  for (const [list, ids] of [['traps', l.tier1.traps], ['checks', l.tier1.checks], ['selfUse', l.tier1.selfUse]])
    for (const id of ids) ok(l[list].some(x => x.id === id), `tier1 ${list} id ${id} exists`);
  ok(JSON.stringify(split.tier1Traps.map(t => t.id)) === '["t0"]', 'Tier 1 trap is only t0 (的 hay 得)');
  ok(JSON.stringify(split.tier2Traps.map(t => t.id)) === '["t1","t2","t3","t4","t5"]', 'Tier 2 traps are t1-t5 (readings, 的/地/得, ability, object, 得/要)');
  ok(JSON.stringify(split.tier1Checks.map(c => c.id)) === '["q6"]', 'Tier 1 check is only q6');
  ok(JSON.stringify(split.tier2Checks.map(c => c.id)) === '["q1","q2","q3","q4","q5"]', 'Tier 2 checks are q1-q5');
  ok(JSON.stringify(split.tier1SelfUse.map(s => s.id)) === '["s2"]', 'Tier 1 self-use is only s2 (děi)');
  ok(JSON.stringify(split.tier2SelfUse.map(s => s.id)) === '["s1"]', 'Tier 2 self-use is s1');
}

// 14. Three reading blocks: one per reading, each with its example right
//     underneath; the section-1 reading text stays short and jargon-free.
{
  ok(Array.isArray(l.readingBlocks) && l.readingBlocks.length === 3, 'three reading blocks (one per reading)');
  const covered = new Set(l.readingBlocks.map(b => b.exampleId));
  ok(covered.size === l.examples.length && l.examples.every(e => covered.has(e.id)), 'reading blocks cover every example exactly once');
  for (const b of l.readingBlocks) {
    ok(Number.isInteger(b.introIndex) && b.introIndex >= 0 && b.introIndex < w.intro.length, `reading block links to intro reading ${b.introIndex}`);
    const e = l.examples.find(x => x.id === b.exampleId);
    ok(e && e.introIndex === b.introIndex, 'block example carries the same intro index');
    ok(b.heading && b.heading.length > 5, 'block has a short explanation heading');
  }
  const text = l.readingBlocks.map(b => {
    const e = l.examples.find(x => x.id === b.exampleId);
    return b.heading + ' ' + e.analysis;
  }).join(' ');
  const count = text.split(/\s+/).filter(t => /[a-zA-Zà-ỹÀ-Ỹ]/.test(t)).length;
  ok(count <= 120, `section-1 reading text is ${count} Vietnamese words (<=120, short)`);
  for (const term of ['trợ từ', 'bổ ngữ', 'vị ngữ', 'bổ ngữ mức độ'])
    ok(!text.includes(term), `section-1 reading text avoids the jargon "${term}"`);
}

// 15. Main examples: one per reading (de, děi, dé); the old object example is kept as a t4 case.
{
  const e1 = l.examples.find(e => e.id === 'e1');
  const e2 = l.examples.find(e => e.id === 'e2');
  const e3 = l.examples.find(e => e.id === 'e3');
  ok(e1.zh === '他说得很快。' && e1.introIndex === 0, 'e1 is the de example 他说得很快');
  ok(e2.zh === '我得去上班。' && e2.introIndex === 1, 'e2 is the simple děi example 我得去上班');
  ok(e3.zh === '他得到了礼物。' && e3.introIndex === 2, 'e3 is the short dé example 他得到了礼物');
  const u2 = l.usages.find(u => u.id === 'u2');
  ok(u2.exampleId === 'e2' && u2.frame.includes('việc cần làm'), 'u2 is the děi frame linked to e2');
  ok(trap('t4').cases.some(c => c.zh === '我吃饭吃得很快。' && c.judgment === 'correct'), 'old object example is kept as a correct t4 case');
  ok(JSON.stringify(w.examples) === JSON.stringify(l.examples), 'top-level examples match lesson examples');
  ok(!l.examples.some(e => e.zh === '我吃饭吃得很快。'), 'the object example is no longer a main example');
}

// 16. q6 is the Tier-1 的/得 check; q1 is now Tier 2; q5 is the 的/地/得 check.
{
  const q6 = l.checks.find(c => c.id === 'q6');
  ok(q6.question.includes('她唱___很好') && q6.question.includes('的 hay 得'), 'q6 is the 的/得 fill-in');
  ok(l.answers.q6.accepted.includes('得'), 'q6 accepts 得');
  ok(l.answers.q6.explanation.includes('的 chỉ dùng trước danh từ'), 'q6 explains why 的 is wrong here');
  const q1 = l.checks.find(c => c.id === 'q1');
  ok(q1.question.includes('他跑___很快'), 'q1 is still the simple de fill-in (now Tier 2)');
  const q5 = l.checks.find(c => c.id === 'q5');
  ok(q5 && q5.question.includes('他认真___学习'), 'q5 asks the 的/地/得 fill-in');
  ok(l.answers.q5.accepted.includes('地'), 'q5 accepts 地');
}

// 17. Renderer: reading blocks in stage 0, frames only in stage 1, Tier 2 behind
//     "Học thêm", unlock by the Tier-1 check; fallback for lessons without readingBlocks.
{
  const esc = s => String(s ?? '').replace(/[&<>\"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const render = (word, stage, state = new Map()) => renderStandardLesson(word, {stage, checkState: state, esc, hanzi: esc, rich: esc});
  const s0 = render(w, 0);
  ok(s0.includes('A. Hiểu từ và cách dùng'), 'stage 0 has the 3-2-1 "Hiểu từ và cách dùng" heading');
  for (const b of l.readingBlocks) {
    const e = l.examples.find(x => x.id === b.exampleId);
    ok(s0.includes(esc(b.heading)), `stage 0 shows the heading for ${e.zh}`);
    ok(s0.indexOf(esc(b.heading)) < s0.indexOf(esc(e.zh)), `example ${e.zh} sits right under its heading`);
  }
  const s1 = render(w, 1);
  ok(s1.includes('B. Vị trí và cách kết hợp'), 'stage 1 has the frame section');
  for (const e of l.examples) ok(!s1.includes(esc(e.zh)), `stage 1 does not repeat example ${e.zh}`);
  const s2 = render(w, 2);
  ok(s2.includes('的 hay 得: đọc giống nhau, dùng khác nhau'), 'stage 2 shows the Tier-1 trap t0 by default');
  ok(!s2.includes('card-pager'), 'stage 2 has no pager when there is only one Tier-1 trap');
  ok(s2.includes('Học thêm · 5 bẫy nữa'), 'stage 2 has the Học thêm section for 5 more traps');
  for (const t of ['Ba cách đọc của 得', '的, 地, 得: ba chữ cùng đọc thanh nhẹ', 'Mức độ hay khả năng: 听得懂', 'Tân ngữ đi đâu khi có 得', '得 hay 要: mức bắt buộc khác nhau'])
    ok(s2.includes(esc(t)), `stage 2 Học thêm contains trap "${t}"`);
  const s3 = render(w, 3);
  ok(s3.includes('Học thêm · 5 câu luyện nữa'), 'stage 3 has the Học thêm section for 5 more checks');
  ok(s3.indexOf(esc(l.checks.find(c => c.id === 'q6').question)) < s3.indexOf('Học thêm · 5 câu luyện nữa'), 'q6 renders before the Học thêm section');
  ok(s3.indexOf('Học thêm · 5 câu luyện nữa') < s3.indexOf(esc(l.checks.find(c => c.id === 'q1').question)), 'q1 renders inside the Học thêm section');
  const onlyTier1 = new Map([[w.id + ':q6', 'requested']]);
  const unlocked = render(w, 3, onlyTier1);
  ok(unlocked.includes('Nói ngày mai tôi phải đi làm sớm.'), 'self-use s2 opens after only the Tier-1 check is revealed');
  ok(!unlocked.includes('Hãy thử các bài trên'), 'no "try the exercises first" gate once the Tier-1 check is done');
  ok(render(w, 3).includes('Hãy thử các bài trên'), 'self-use stays gated until the Tier-1 check is tried');
  // Fallback: a lesson without readingBlocks renders examples in stage 1 as before.
  const plain = structuredClone(w);
  delete plain.lesson.readingBlocks;
  const p0 = render(plain, 0);
  ok(p0.includes('A. Hiểu từ và biết khi nào dùng'), 'no-readingBlocks lesson keeps the old stage-0 heading');
  const p1 = render(plain, 1);
  for (const e of plain.lesson.examples) ok(p1.includes(esc(e.zh)), `no-readingBlocks lesson still shows ${e.zh} in stage 1`);
  // Fallback: a lesson without tier1 renders everything as before.
  const plain2 = structuredClone(w);
  delete plain2.lesson.tier1;
  const q2 = render(plain2, 2);
  ok(q2.includes('card-pager') && q2.includes('1/6'), 'no-tier1 lesson still pages all 6 traps');
  ok(!q2.includes('Học thêm'), 'no-tier1 lesson has no Học thêm section');
  ok(!render(plain2, 3).includes('Học thêm'), 'no-tier1 lesson stage 3 has no Học thêm section');
}

// Batch-054 exposed a DOM harness assumption that examples always appear in
// stage 1. Verify the first batch lesson places examples and their audio in
// stage 0, while stage 1 contains frames rather than repeated examples.
{
  const sample = data.words.find(x => x.id === 'hz-h2-43e89d23df99');
  if (sample?.lesson?.readingBlocks) {
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
    const render = stage => renderStandardLesson(sample, {stage, checkState: new Map(), esc, hanzi: esc, rich: esc});
    const understand = render(0), frames = render(1);
    ok(understand.includes('data-lesson-audio="example-only"'), 'readingBlocks batch sample offers example audio in stage 0');
    for (const example of sample.lesson.examples) {
      ok(understand.includes(esc(example.zh)), 'batch example is shown in stage 0: ' + example.id);
      ok(!frames.includes(esc(example.zh)), 'batch example is not repeated in stage 1: ' + example.id);
    }
    ok(!frames.includes('data-lesson-audio="example-only"'), 'readingBlocks frames do not offer example-only audio in stage 1');
  }
}

console.log(`regression-de-pilot: ${passed} assertions passed`);
