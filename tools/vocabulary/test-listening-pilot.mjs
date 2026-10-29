// Integrity tests for the listening pilot v4 (real-human YouTube video as the main recording;
// the self-authored AI dialogue is kept as extra practice).
// Run: node tools/vocabulary/test-listening-pilot.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';

const course = JSON.parse(fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8'));
const pilot = JSON.parse(fs.readFileSync('data/listening-pilot.json', 'utf8'));
const byId = new Map(course.words.map(w => [w.id, w]));

assert.equal(pilot.version, 4);
assert.ok(fs.existsSync(new URL('../../docs/LISTENING_PILOT.md', import.meta.url)), 'project doc must exist');

// --- the pilot lesson is the real course page containing the anchor word ---
const L = pilot.lesson;
const anchor = byId.get(L.anchorWordId);
assert.ok(anchor && anchor.hanzi === '公共汽车', 'anchor word must be 公共汽车');
const page = course.words.filter(w => w.level === L.level);
const start = page.findIndex(w => w.id === L.firstWordId);
assert.ok(start >= 0 && page.slice(start, start + 24).map(w => w.id).join() === L.wordIds.join(), 'lesson wordIds must be the real 24-word page');

// --- main recording: the verified Chinese Station video ---
const R = pilot.recording;
assert.equal(R.kind, 'youtube');
assert.equal(R.videoId, '2qj-clU55zY', 'main embed must be the no-subtitle version');
assert.equal(R.subtitleVideoId, 'kn9OLtuJ9qk', 'Chinese-subtitle version id');
assert.equal(R.fullVideoId, 'a8XxWbPTy68', 'full version id');
assert.ok(R.watchUrl.includes(R.videoId));
assert.ok(R.sourcePage.includes('ch-station.org/cs4-1108'), 'source page recorded');
assert.ok(pilot.authorship.voiceLabel.includes('Người thật'), 'main recording must be labelled human voices');
assert.ok(R.rights.includes('Chinese Station'), 'rights/credit note must name the source');
assert.ok(!('audio' in R), 'video recording must not pretend to have local audio files');

// The transcript must be the video's own script, exactly as published by the source
// and cross-checked against the burned-in Chinese subtitles.
const expectedScript = [
  '您好，这儿离火车站远吗？',
  '有两公里多。',
  '是吗，可以坐公交车去吗？',
  '坐地铁去更方便，前面就是地铁站。',
];
assert.deepEqual(R.lines.map(l => l.zh), expectedScript, 'transcript must be the verified video script verbatim');
assert.deepEqual(R.lines.map(l => l.speaker), ['F', 'M', 'F', 'M']);
for (const ln of R.lines) {
  assert.ok(ln.vi && ln.vi.length > 3, 'each line needs a Vietnamese meaning');
  assert.ok(typeof ln.start === 'number' && typeof ln.end === 'number' && ln.start < ln.end && ln.end <= 14.5, 'segment timings must be inside the 14s video');
}
for (let i = 1; i < R.lines.length; i++) assert.ok(R.lines[i].start >= R.lines[i - 1].start, 'segments in order');

// Coverage is recounted from the video transcript only: exactly these 4 lesson words.
const covered = new Set();
for (const ln of R.lines) for (const id of ln.words || []) covered.add(id);
const expectedCovered = new Set(['公里', '公交车', '地铁', '地铁站'].map(h => L.wordIds.find(id => byId.get(id).hanzi === h)));
assert.deepEqual(covered, expectedCovered, 'coverage must be exactly 公里/公交车/地铁/地铁站');
for (const ln of R.lines) for (const id of ln.words || []) {
  assert.ok(ln.zh.includes(byId.get(id).hanzi), `claimed word ${byId.get(id).hanzi} must appear verbatim in its line`);
}
// The sample answer and exercises must not smuggle extra words into the coverage count.
assert.ok(R.task.sampleNote.includes('không được tính'), 'sample must be marked as not counted');

// Questions must be answerable from the video itself: every detail explanation quotes the script.
const scriptJoined = R.lines.map(l => l.zh).join('');
for (const d of R.details) {
  const quoted = d.explain.match(/“([^”]+)”/);
  assert.ok(quoted && scriptJoined.includes(quoted[1].replace(/[。”？]$/, '')), `detail explanation must quote the video script: ${d.q}`);
}
assert.ok(R.gist.options[R.gist.answer] === 'Tàu điện ngầm');
assert.ok(R.repeat.every(n => n >= 1 && n <= R.lines.length));
assert.ok(R.prepWords.length >= 1 && R.prepWords.length <= 5);

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
assert.ok(pilot.surveyLog.length >= 5 && pilot.surveyLog.every(e => e.source && e.result && e.note), 'survey log entries complete');
assert.ok(pilot.references.some(r => r.url.includes('ch-station.org')), 'source page listed as a reference');

console.log('PASS listening-pilot v4: real-human video main recording (CS4-1108, verified script, 4/24 coverage, checked timings), AI dialogue kept as extra practice (11 files).');
