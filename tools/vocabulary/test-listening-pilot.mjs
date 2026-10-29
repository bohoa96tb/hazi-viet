// Integrity tests for the one-lesson listening pilot data.
// Run: node tools/vocabulary/test-listening-pilot.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';

const course = JSON.parse(fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8'));
const pilot = JSON.parse(fs.readFileSync('data/listening-pilot.json', 'utf8'));
const byId = new Map(course.words.map(w => [w.id, w]));

// The pilot lesson must be the real course page that contains the anchor word.
const anchor = byId.get(pilot.lesson.anchorWordId);
assert.ok(anchor, 'Anchor word must exist in the course');
const levelWords = course.words.filter(w => w.level === pilot.lesson.level);
const anchorIndex = levelWords.findIndex(w => w.id === anchor.id);
const pageIndex = Math.floor(anchorIndex / 24);
const page = levelWords.slice(pageIndex * 24, pageIndex * 24 + 24);
assert.deepEqual(pilot.lesson.wordIds, page.map(w => w.id), 'Pilot wordIds must equal the real lesson page, in order');
assert.equal(pilot.lesson.firstWordId, page[0].id);
assert.equal(page[0].lesson.cohortOrdinal, pilot.lesson.ordinalFrom);
assert.equal(page.at(-1).lesson.cohortOrdinal, pilot.lesson.ordinalTo);
assert.equal(page.length, 24);

const lessonIds = new Set(pilot.lesson.wordIds);
const verified = new Map();
const translated = new Map();
for (const r of pilot.recordings) {
  assert.ok(r.id && r.title && r.sourceName && r.sourceUrl?.startsWith('https://'), 'Recording metadata complete: ' + r.id);
  assert.ok(r.voiceLabel && r.usageNote && r.transcriptNote, 'Voice label and rights notes present: ' + r.id);
  if (r.kind === 'embed') assert.ok(r.embedUrl?.startsWith('https://www.youtube-nocookie.com/embed/'), 'Embeds use the official YouTube nocookie player: ' + r.id);
  if (r.kind === 'link') assert.equal(r.embedUrl, null, 'Link recordings must not fake an embed: ' + r.id);
  for (const q of r.questions || []) assert.ok(q.q && q.a, 'Questions need text and an answer: ' + r.id);
  for (const c of r.coverage || []) {
    assert.ok(lessonIds.has(c.wordId), 'Coverage word belongs to the lesson: ' + c.wordId);
    const w = byId.get(c.wordId);
    assert.ok(c.sentence.includes(w.hanzi), `Quoted sentence must contain the word verbatim (${w.hanzi}): ${c.sentence}`);
    if (!verified.has(c.wordId)) verified.set(c.wordId, c.sentence);
  }
  for (const c of r.translationCovered || []) {
    assert.ok(lessonIds.has(c.wordId), 'Translation-covered word belongs to the lesson: ' + c.wordId);
    assert.ok(c.evidence, 'Translation-tier coverage needs its evidence note: ' + c.wordId);
    assert.ok(!verified.has(c.wordId), 'A word is counted once, in the stronger tier: ' + c.wordId);
    if (!translated.has(c.wordId)) translated.set(c.wordId, c.evidence);
  }
}
assert.deepEqual([...verified.keys()].map(id => byId.get(id).hanzi).sort(), ['公共汽车', '出租车', '地铁'].sort());
assert.deepEqual([...translated.keys()].map(id => byId.get(id).hanzi).sort(), ['公里', '分钟', '地铁站'].sort());
const missing = pilot.lesson.wordIds.filter(id => !verified.has(id) && !translated.has(id));
assert.equal(missing.length, 18, 'Exactly 18 lesson words remain uncovered');
assert.match(pilot.checkedDate, /^\d{4}-\d{2}-\d{2}$/);
console.log(`PASS listening-pilot data: lesson page verified (24 words), ${verified.size} words transcript-verified, ${translated.size} translation-corroborated, ${missing.length} uncovered.`);
