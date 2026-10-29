// Validates every per-lesson practice file listed in data/practice/manifest.json
// (except the pilot file, which has its own dedicated test) against the course:
// word list identity, honest coverage, per-recording new words, activity shapes
// and timing sanity. Run: node tools/vocabulary/test-practice-data.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../../', import.meta.url);
const course = JSON.parse(readFileSync(new URL('data/vocabulary/hanzii-course.json', root), 'utf8'));
const manifest = JSON.parse(readFileSync(new URL('data/practice/manifest.json', root), 'utf8'));
const byId = new Map(course.words.map(w => [w.id, w]));
const hanziOf = id => byId.get(id)?.hanzi;

assert.ok(Array.isArray(manifest.lessons) && manifest.lessons.length >= 2, 'manifest lists the pilot and at least one more lesson');
const keys = new Set();
for (const e of manifest.lessons) {
  assert.ok(e.key && e.anchorWordId && e.file && e.version, 'manifest entry is complete');
  assert.ok(!keys.has(e.key), 'manifest keys are unique'); keys.add(e.key);
  const lesson = (course.lessons || []).find(l => l.wordIds[0] === e.key);
  assert.ok(lesson && lesson.wordIds.includes(e.anchorWordId), `manifest entry ${e.key} matches a real course lesson and anchor`);
}

let checked = 0;
for (const e of manifest.lessons) {
  if (e.file === 'data/listening-pilot.json') continue; // pilot has its own test
  const P = JSON.parse(readFileSync(new URL(e.file, root), 'utf8'));
  const L = P.lesson;
  assert.equal(L.firstWordId, e.key, `${e.key}: firstWordId matches the manifest key`);
  assert.equal(L.anchorWordId, e.anchorWordId, `${e.key}: anchor matches the manifest`);
  const lesson = (course.lessons || []).find(l => l.wordIds[0] === e.key);
  assert.deepEqual(L.wordIds, lesson.wordIds, `${e.key}: wordIds equal the real course lesson (${lesson.wordIds.length} words)`);
  assert.equal(P.authorship.type, 'human-video', `${e.key}: human video only`);
  assert.ok(Array.isArray(P.recordings) && P.recordings.length >= 1 && P.recordings.length <= 5, `${e.key}: 1-5 recordings`);
  const covered = new Set(); const recIds = new Set(); const vidIds = new Set();
  for (const R of P.recordings) {
    assert.ok(!recIds.has(R.id) && !vidIds.has(R.videoId), `${R.id}: unique ids`); recIds.add(R.id); vidIds.add(R.videoId);
    assert.ok(/^[A-Za-z0-9_-]{11}$/.test(R.videoId) && /^[A-Za-z0-9_-]{11}$/.test(R.subtitleVideoId), `${R.id}: YouTube ids well-formed`);
    assert.ok(R.lines.length >= 3, `${R.id}: at least 3 lines`);
    const tagged = new Set();
    R.lines.forEach((ln, i) => {
      for (const id of ln.words || []) {
        assert.ok(L.wordIds.includes(id), `${R.id} line ${i + 1}: tagged word belongs to the lesson`);
        assert.ok(ln.text.includes(hanziOf(id)), `${R.id} line ${i + 1}: tagged hanzi ${hanziOf(id)} appears in the line`);
        tagged.add(id);
      }
      if (R.segmentMode !== 'clip') {
        assert.ok(typeof ln.start === 'number' && typeof ln.end === 'number' && ln.start < ln.end, `${R.id} line ${i + 1}: timing window present`);
        assert.ok(ln.end <= R.durationSec + 1, `${R.id} line ${i + 1}: window inside the video`);
        if (i) assert.ok(ln.start >= R.lines[i - 1].start, `${R.id}: line windows do not go backwards`);
      }
    });
    const fresh = (R.addsNewWords || []).map(hanzi => L.wordIds.find(id => hanziOf(id) === hanzi));
    assert.ok(fresh.length >= 1, `${R.id}: adds at least one new word`);
    for (const id of fresh) {
      assert.ok(id && tagged.has(id), `${R.id}: claimed new word is really tagged in this recording`);
      assert.ok(!covered.has(id), `${R.id}: new word ${hanziOf(id)} was not already covered`);
      covered.add(id);
    }
    for (const id of tagged) covered.add(id);
    assert.ok(R.gist.options.length === 3 && R.gist.options[R.gist.answer], `${R.id}: gist shape`);
    assert.ok(typeof R.goal === 'string' && R.goal.length > 10, `${R.id}: listening goal present (renderer contract)`);
    assert.ok(Array.isArray(R.prepWords) && R.prepWords.length >= 1 && R.prepWords.every(p => p.zh && p.vi), `${R.id}: prepWords present (renderer contract)`);
    for (const f of ['kind', 'channel', 'sourceName', 'sourcePage', 'watchUrl', 'voiceLabel', 'rights', 'access', 'durationNote']) assert.ok(typeof R[f] === 'string' && R[f].length > 3, `${R.id}: field ${f} present (renderer contract)`);
    assert.ok(Array.isArray(R.listeningNotes) && R.listeningNotes.length >= 1, `${R.id}: listeningNotes present (renderer contract)`);
    assert.ok(R.task && typeof R.task.prompt === 'string' && R.task.sample && R.task.sample.zh && R.task.sample.py && R.task.sample.vi, `${R.id}: self-speaking task shape (renderer contract)`);
    for (const d of R.details || []) assert.ok(d.options.length === 3 && d.options[d.answer], `${R.id}: detail shape`);
    for (const n of R.repeat || []) assert.ok(R.lines[n - 1], `${R.id}: repeat line ${n} exists`);
    if (R.lines.length <= 4) assert.equal((R.details || []).length, 0, `${R.id}: very short recordings carry no filler detail questions`);
  }
  console.log(`PASS practice data ${e.key} (${L.lessonLabel}): ${P.recordings.length} recordings, verified coverage ${covered.size}/${L.wordIds.length}.`);
  checked++;
}
assert.ok(checked >= 1, 'at least one non-pilot practice file validated');
console.log('PASS practice-data: manifest and per-lesson files are consistent with the course.');
