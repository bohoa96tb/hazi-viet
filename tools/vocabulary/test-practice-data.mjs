// Validates every per-lesson practice file listed in data/practice/manifest.json
// (except the pilot file, which has its own dedicated test) against the course:
// word list identity, honest coverage, per-recording new words, activity shapes
// and timing sanity. Run: node tools/vocabulary/test-practice-data.mjs
//
// Canonical schema regression guard (added after the 2026-10-30 Bài 1-2 incident,
// where data used legacy names — lines[].text, gist.question, task.note,
// references[].label — that the renderer never reads, so transcripts and questions
// rendered empty while this test still passed): the stored files themselves must
// use the renderer's field names. Legacy names anywhere in a practice file fail.
// The matching DOM assertions live in test-listening-dom.mjs (deep2/deep3 render
// every transcript line of every video and compare against this data).
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
const gistAnswers = [];
for (const e of manifest.lessons) {
  if (e.file === 'data/listening-pilot.json') continue; // pilot has its own test
  const P = JSON.parse(readFileSync(new URL(e.file, root), 'utf8'));
  const L = P.lesson;
  assert.equal(L.firstWordId, e.key, `${e.key}: firstWordId matches the manifest key`);
  assert.equal(L.anchorWordId, e.anchorWordId, `${e.key}: anchor matches the manifest`);
  const lesson = (course.lessons || []).find(l => l.wordIds[0] === e.key);
  assert.deepEqual(L.wordIds, lesson.wordIds, `${e.key}: wordIds equal the real course lesson (${lesson.wordIds.length} words)`);
  assert.equal(P.authorship.type, 'human-video', `${e.key}: human video only`);
  assert.ok(Array.isArray(P.references) && P.references.length >= 1 && P.references.every(r => typeof r.title === 'string' && r.title.length >= 3 && r.url && !('label' in r)), `${e.key}: references use canonical title (not legacy label)`);
  assert.ok(Array.isArray(P.recordings) && P.recordings.length >= 1, `${e.key}: at least 1 recording`);
  if (P.recordings.length > 5) assert.ok(P.capException && P.capException.reason && P.capException.approvedBy, `${e.key}: more than 5 recordings requires a recorded owner-approved capException`);
  const covered = new Set(); const recIds = new Set(); const vidIds = new Set();
  for (const R of P.recordings) {
    assert.ok(!recIds.has(R.id) && !vidIds.has(R.videoId), `${R.id}: unique ids`); recIds.add(R.id); vidIds.add(R.videoId);
    assert.ok(/^[A-Za-z0-9_-]{11}$/.test(R.videoId) && /^[A-Za-z0-9_-]{11}$/.test(R.subtitleVideoId), `${R.id}: YouTube ids well-formed`);
    assert.ok(R.lines.length >= 3, `${R.id}: at least 3 lines`);
    const tagged = new Set();
    R.lines.forEach((ln, i) => {
      assert.ok(typeof ln.zh === 'string' && (/[\u3400-\u9fff]/.test(ln.zh) || /^[\d\s\-+。！？!?、，,.;；:：…·]+$/.test(ln.zh)), `${R.id} line ${i + 1}: canonical zh holds real Chinese text (or a pure spoken-number line, e.g. a phone number read digit by digit)`);
      assert.ok(!('text' in ln), `${R.id} line ${i + 1}: legacy field text must not be stored (use zh)`);
      assert.ok(typeof ln.name === 'string' && ln.name.length >= 1, `${R.id} line ${i + 1}: speaker display name present (canonical name)`);
      assert.ok(['F', 'M', 'N'].includes(ln.speaker), `${R.id} line ${i + 1}: speaker is a verified code F/M/N (never a name, never inferred)`);
      assert.ok(typeof ln.vi === 'string' && ln.vi.length >= 2, `${R.id} line ${i + 1}: Vietnamese meaning present`);
      for (const id of ln.words || []) {
        assert.ok(L.wordIds.includes(id), `${R.id} line ${i + 1}: tagged word belongs to the lesson`);
        // Numerals may be printed as digits in the source transcript (e.g. 130元 is spoken 一百三十元）.
        const appears = ln.zh.includes(hanziOf(id)) || (hanziOf(id) === '百' && /\d{3}/.test(ln.zh));
        assert.ok(appears, `${R.id} line ${i + 1}: tagged hanzi ${hanziOf(id)} appears in the line`);
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
    assert.ok(typeof R.gist.q === 'string' && R.gist.q.length >= 5 && !('question' in R.gist), `${R.id}: gist uses canonical q (not legacy question)`);
    assert.ok(R.gist.options.length === 3 && R.gist.options[R.gist.answer], `${R.id}: gist shape`);
    assert.ok(typeof R.gist.explain === 'string' && R.gist.explain.length >= 5, `${R.id}: gist explanation present`);
    gistAnswers.push(R.gist.answer);
    assert.ok(typeof R.goal === 'string' && R.goal.length > 10, `${R.id}: listening goal present (renderer contract)`);
    assert.ok(Array.isArray(R.prepWords) && R.prepWords.length >= 1 && R.prepWords.every(p => p.zh && p.vi), `${R.id}: prepWords present (renderer contract)`);
    for (const f of ['kind', 'channel', 'sourceName', 'sourcePage', 'watchUrl', 'voiceLabel', 'rights', 'access', 'durationNote']) assert.ok(typeof R[f] === 'string' && R[f].length > 3, `${R.id}: field ${f} present (renderer contract)`);
    assert.ok(Array.isArray(R.listeningNotes) && R.listeningNotes.length >= 1, `${R.id}: listeningNotes present (renderer contract)`);
    assert.ok(R.task && typeof R.task.prompt === 'string' && R.task.sample && R.task.sample.zh && R.task.sample.vi && typeof R.task.sampleNote === 'string' && R.task.sampleNote.length >= 10 && !('note' in R.task), `${R.id}: self-speaking task shape (canonical sampleNote, renderer contract)`);
    for (const d of R.details || []) {
      assert.ok(typeof d.q === 'string' && d.q.length >= 5 && !('question' in d), `${R.id}: detail uses canonical q`);
      assert.ok(d.options.length === 3 && d.options[d.answer], `${R.id}: detail shape`);
      assert.equal(d.a, d.options[d.answer], `${R.id}: detail answer text a matches options[answer]`);
      assert.ok(typeof d.explain === 'string' && d.explain.length >= 5, `${R.id}: detail explanation present`);
    }
    for (const n of R.repeat || []) assert.ok(R.lines[n - 1], `${R.id}: repeat line ${n} exists`);
    if (R.lines.length <= 3) assert.equal((R.details || []).length, 0, `${R.id}: tiny recordings carry no filler detail questions`);
    if (R.lines.length === 4) assert.ok((R.details || []).length <= 1, `${R.id}: a 4-line recording carries at most one non-filler detail question`);
  }
  console.log(`PASS practice data ${e.key} (${L.lessonLabel}): ${P.recordings.length} recordings, verified coverage ${covered.size}/${L.wordIds.length}.`);
  checked++;
}
assert.ok(checked >= 1, 'at least one non-pilot practice file validated');
assert.ok(gistAnswers.length >= 2 && new Set(gistAnswers).size >= 2, `gist correct answers are distributed across positions, not all at index 0 (got ${gistAnswers.join(',')})`);
console.log('PASS practice-data: manifest and per-lesson files are consistent with the course.');
