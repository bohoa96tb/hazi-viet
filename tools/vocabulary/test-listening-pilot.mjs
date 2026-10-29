// Integrity tests for the listening pilot v5 (a set of up to 5 verified real-human
// YouTube videos per lesson; each added video must contribute at least one new
// verified lesson word; the self-authored AI dialogue stays as extra practice).
// Run: node tools/vocabulary/test-listening-pilot.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';

const course = JSON.parse(fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8'));
const pilot = JSON.parse(fs.readFileSync('data/listening-pilot.json', 'utf8'));
const byId = new Map(course.words.map(w => [w.id, w]));

assert.equal(pilot.version, 5);
assert.ok(fs.existsSync(new URL('../../docs/LISTENING_PILOT.md', import.meta.url)), 'project doc must exist');

// --- the pilot lesson is the real course page containing the anchor word ---
const L = pilot.lesson;
const anchor = byId.get(L.anchorWordId);
assert.ok(anchor && anchor.hanzi === '公共汽车', 'anchor word must be 公共汽车');
const page = course.words.filter(w => w.level === L.level);
const start = page.findIndex(w => w.id === L.firstWordId);
assert.ok(start >= 0 && page.slice(start, start + 24).map(w => w.id).join() === L.wordIds.join(), 'lesson wordIds must be the real 24-word page');
const idOf = h => L.wordIds.find(id => byId.get(id).hanzi === h);

// --- the video set: at most 5 recordings, each verified end to end ---
const recs = pilot.recordings;
assert.ok(Array.isArray(recs) && recs.length >= 1 && recs.length <= 5, 'video set holds 1..5 recordings');
assert.ok(!('recording' in pilot), 'v4 single-recording field is replaced by the set');
assert.ok(pilot.authorship.voiceLabel.includes('Người thật'), 'set must be labelled human voices');

const expected = [
  { id: 'cs4-1108', videoId: '2qj-clU55zY', subtitleVideoId: 'kn9OLtuJ9qk', fullVideoId: 'a8XxWbPTy68',
    script: ['您好，这儿离火车站远吗？', '有两公里多。', '是吗，可以坐公交车去吗？', '坐地铁去更方便，前面就是地铁站。'],
    words: ['公里', '公交车', '地铁', '地铁站'], gistAnswer: 'Tàu điện ngầm' },
  { id: 'cs4-1206', videoId: 'rs5AjSsxeD0', subtitleVideoId: 'OwZNf6EtWHs', fullVideoId: '-8e17A-NzaY',
    script: ['能帮我们叫一辆出租车吗？', '没问题，您去哪儿？', '去历史博物馆。', '车到了我喊您。'],
    words: ['出租车', '辆'], gistAnswer: 'Bảo tàng lịch sử' },
  { id: 'cs4-3401', videoId: '2v5qr4gUPTE', subtitleVideoId: 'XuouQ2gbZ_0', fullVideoId: 'a1YSZblpTLo',
    script: ['丽丽，你给我介绍一下北外附近的交通好吗？', '好啊。北外交通非常方便，很多公交车经过北外。', '在哪里可以坐公交车呢？', '出了正门就有公交车站。', '我要去动物园就在那儿上车吗？', '去动物园你可以在大学东面的魏公村东口站上车。', '从小东门出去就是魏公村吧？', '对，向东不到十分钟就是中关村南大街，那里有很多公交车。', '北外附近有地铁站吗？', '有，地铁4号线就通过魏公村。'],
    words: ['交通', '公交车', '分钟', '地铁站', '地铁'], gistAnswer: 'Rất thuận tiện, nhiều xe buýt đi qua' },
  { id: 'cs4-3106', videoId: '8tdsPnGdT1g', subtitleVideoId: 'YEJR2T58NNw', fullVideoId: 'JRbn4nm7EHQ',
    script: ['丽丽，明天我就要回国了。', '是吗，时间过得真快，一转眼就要回国了。', '这段时间谢谢你们对我的照顾。', '不客气，希望你以后常来中国。', '我一定来，也希望你们来日本。', '好的，我们保持联系吧。', '嗯，再见。', '祝你一路平安。'],
    words: ['一路平安'], gistAnswer: 'Một bạn ngày mai về nước' },
  { id: 'cs4-2309', videoId: 'Sb--CARlN5w', subtitleVideoId: 'irVAfFuuRAw', fullVideoId: 's4SIU4mDKVI',
    script: ['你好，我要取钱。', '给我看看你的身份证。', '我是留学生，没有身份证。', '留学生？护照也可以。', '给你。', '你汉语说得真好！', '你听不出我是外国人吗？', '一点儿也听不出来。', '你真会夸奖人！'],
    words: ['护照'], gistAnswer: 'Rút tiền' },
];
assert.deepEqual(recs.map(r => r.id), expected.map(e => e.id), 'video set composition and order');

const union = new Set();
for (const [i, R] of recs.entries()) {
  const E = expected[i];
  assert.equal(R.kind, 'youtube');
  assert.equal(R.videoId, E.videoId, `${R.id}: main embed must be the no-subtitle version`);
  assert.equal(R.subtitleVideoId, E.subtitleVideoId, `${R.id}: Chinese-subtitle version id`);
  assert.equal(R.fullVideoId, E.fullVideoId, `${R.id}: full version id`);
  assert.ok(R.watchUrl.includes(R.videoId));
  assert.ok(R.sourcePage.includes('ch-station.org/' + R.id), `${R.id}: source page recorded`);
  assert.ok(R.rights.includes('Chinese Station'), `${R.id}: rights/credit note must name the source`);
  assert.ok(!('audio' in R), `${R.id}: video recording must not pretend to have local audio files`);
  // Transcript must be the video's own script, exactly as published by the source
  // and cross-checked against the burned-in Chinese subtitles.
  assert.deepEqual(R.lines.map(l => l.zh), E.script, `${R.id}: transcript must be the verified video script verbatim`);
  for (const ln of R.lines) {
    assert.ok(ln.vi && ln.vi.length > 3, `${R.id}: each line needs a Vietnamese meaning`);
    assert.ok(typeof ln.start === 'number' && typeof ln.end === 'number' && ln.start < ln.end && ln.end <= R.durationSec + 0.5, `${R.id}: segment timings must be inside the video`);
  }
  for (let j = 1; j < R.lines.length; j++) assert.ok(R.lines[j].start >= R.lines[j - 1].start, `${R.id}: segments in order`);
  // Coverage per video, recounted from its own transcript only.
  const covered = new Set();
  for (const ln of R.lines) for (const id of ln.words || []) covered.add(id);
  assert.deepEqual(covered, new Set(E.words.map(idOf)), `${R.id}: coverage must be exactly ${E.words.join('/')}`);
  for (const ln of R.lines) for (const id of ln.words || []) {
    assert.ok(ln.zh.includes(byId.get(id).hanzi), `${R.id}: claimed word ${byId.get(id).hanzi} must appear verbatim in its line`);
  }
  // Set rule: every video after the first must add at least one NEW word.
  const fresh = [...covered].filter(id => !union.has(id));
  if (i > 0) assert.ok(fresh.length >= 1, `${R.id}: must add at least one new word to the set`);
  fresh.forEach(id => union.add(id));
  covered.forEach(id => union.add(id));
  // Questions must be answerable from the video itself: every detail explanation quotes the script.
  const scriptJoined = R.lines.map(l => l.zh).join('');
  for (const d of R.details) {
    const quoted = d.explain.match(/“([^”]+)”/);
    assert.ok(quoted && scriptJoined.includes(quoted[1].replace(/[。”？]$/, '')), `${R.id}: detail explanation must quote the video script: ${d.q}`);
  }
  assert.equal(R.gist.options[R.gist.answer], E.gistAnswer, `${R.id}: gist answer`);
  assert.ok(R.repeat.every(n => n >= 1 && n <= R.lines.length), `${R.id}: repeat lines in range`);
  assert.ok(R.prepWords.length >= 1 && R.prepWords.length <= 5, `${R.id}: prep words sane`);
  assert.ok(R.task.sampleNote.includes('không được tính'), `${R.id}: sample must be marked as not counted`);
}
assert.deepEqual(union, new Set(['公里', '公交车', '地铁', '地铁站', '出租车', '辆', '交通', '分钟', '一路平安', '护照'].map(idOf)),
  'total set coverage must be exactly 10/24 with no double counting');

// --- extra practice: the old self-authored AI dialogue is kept intact, not deleted ---
const X = pilot.extraPractice;
assert.ok(X && Array.isArray(X.lines) && X.lines.length === 11, 'AI dialogue must be kept as extra practice');
let speech = 0;
for (const ln of X.lines) {
  assert.ok(ln.audio && fs.existsSync(ln.audio) && fs.statSync(ln.audio).size > 5000, `extra audio file missing: ${ln.audio}`);
  speech += ln.dur || 0;
}
assert.ok(speech > 25 && speech < 60, `extra dialogue speech duration sane (${speech}s)`);
const xCovered = new Set();
for (const ln of X.lines) for (const id of ln.words || []) xCovered.add(id);
assert.equal(xCovered.size, 6, 'extra dialogue keeps its own 6-word coverage');
assert.ok(pilot.surveyLog.length >= 15 && pilot.surveyLog.every(e => e.source && e.result && e.note), 'survey log entries complete');
for (const R of recs) assert.ok(pilot.references.some(r => r.url === R.sourcePage), `${R.id}: source page listed as a reference`);

console.log('PASS listening-pilot v5: set of 5 real-human videos (each verified verbatim, each adds new words), total coverage 10/24, AI dialogue kept as extra practice (11 files).');
