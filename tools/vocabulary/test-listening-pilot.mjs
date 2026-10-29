// Integrity tests for the listening pilot v2 (self-authored dialogue, pre-made AI-voice files).
// Run: node tools/vocabulary/test-listening-pilot.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';

const course = JSON.parse(fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8'));
const pilot = JSON.parse(fs.readFileSync('data/listening-pilot.json', 'utf8'));
const byId = new Map(course.words.map(w => [w.id, w]));

assert.equal(pilot.version, 3);
assert.ok(!('recordings' in pilot), 'The v1 external recordings must be gone');
// The pilot lesson must be the real course page that contains the anchor word.
const anchor = byId.get(pilot.lesson.anchorWordId);
assert.ok(anchor, 'Anchor word must exist in the course');
const levelWords = course.words.filter(w => w.level === pilot.lesson.level);
const pageIndex = Math.floor(levelWords.findIndex(w => w.id === anchor.id) / 24);
const page = levelWords.slice(pageIndex * 24, pageIndex * 24 + 24);
assert.deepEqual(pilot.lesson.wordIds, page.map(w => w.id), 'Pilot wordIds must equal the real lesson page, in order');
assert.equal(page.length, 24);

// Honest labelling and the survey log that justifies the self-authored fallback.
assert.match(pilot.authorship.label, /tự biên soạn/);
assert.match(pilot.authorship.voiceLabel, /AI/);
assert.ok(pilot.surveyLog.length >= 5 && pilot.surveyLog.every(s => s.source && s.result && s.note), 'Survey log complete');
assert.ok(pilot.references.every(r => r.url.startsWith('https://') && r.access && r.note), 'References carry access conditions');

const R = pilot.recording;
const lessonIds = new Set(pilot.lesson.wordIds);
assert.equal(R.lines.length, 11, 'Dialogue has 11 lines');
const covered = new Map();
let totalDur = 0;
for (const [i, ln] of R.lines.entries()) {
  assert.ok(ln.zh && ln.vi && ln.name, `Line ${i + 1} has text, translation and speaker`);
  assert.ok(fs.existsSync(ln.audio) && fs.statSync(ln.audio).size > 5000, `Line ${i + 1} audio file exists: ${ln.audio}`);
  assert.ok(ln.dur > 0, `Line ${i + 1} has a measured duration`);
  totalDur += ln.dur;
  for (const id of ln.words || []) {
    assert.ok(lessonIds.has(id), 'Coverage word belongs to the lesson: ' + id);
    assert.ok(ln.zh.includes(byId.get(id).hanzi), `Claimed word must appear verbatim in its line (${byId.get(id).hanzi}): ${ln.zh}`);
    if (!covered.has(id)) covered.set(id, ln.zh);
  }
}
assert.ok(totalDur >= 25 && totalDur <= 60, `Dialogue speech stays in the short range (got ${totalDur.toFixed(1)}s)`);
assert.deepEqual([...covered.keys()].map(id => byId.get(id).hanzi).sort(), ['公共汽车', '出租车', '分钟', '地铁', '地铁站', '护照'].sort());
assert.equal(pilot.lesson.wordIds.length - covered.size, 18, 'Exactly 18 lesson words remain uncovered');

// Questions must be answerable from the dialogue itself.
assert.equal(R.gist.options.length, 3);
assert.ok(R.gist.answer >= 0 && R.gist.answer < 3);
const allZh = R.lines.map(l => l.zh).join('');
for (const d of R.details) {
  assert.ok(d.q && d.a && d.explain, 'Detail question complete');
  const quote = d.explain.match(/“([^”]+)”/)?.[1];
  assert.ok(quote && allZh.includes(quote), `Detail explanation must quote the dialogue verbatim: ${d.explain}`);
}
assert.ok(R.details.length >= 2 && R.details.length <= 3);
assert.ok(R.listeningNotes.length >= 1 && R.listeningNotes.length <= 2);
for (const n of R.repeat) assert.ok(R.lines[n - 1], 'Repeat line exists: ' + n);
assert.ok(R.task.sample.zh && R.task.frame, 'Personal task has a frame and a sample');
assert.match(pilot.checkedDate, /^\d{4}-\d{2}-\d{2}$/);
console.log(`PASS listening-pilot v2: self-authored 11-line dialogue (${totalDur.toFixed(1)}s speech), ${covered.size}/24 words verified in the script itself, survey log and honest AI-voice labelling present.`);
