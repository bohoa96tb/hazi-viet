// Focused tests for word segmentation, authored overrides and gloss honesty.
// Run: node tools/vocabulary/test-word-lookup.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createWordLookup } from '../../js/word-lookup.js';

const course = JSON.parse(fs.readFileSync('data/vocabulary/hanzii-course.json', 'utf8'));
const dict = JSON.parse(fs.readFileSync('data/pinyin-dict.json', 'utf8'));
const overrides = JSON.parse(fs.readFileSync('data/word-overrides.json', 'utf8'));
const lk = createWordLookup({ courseWords: course.words, dict, overrides });
const wordsOf = text => lk.segment(text).filter(p => p.word).map(p => p.t);

// 1. Longest meaningful unit wins: 公共汽车 is one word from any character.
assert.deepEqual(wordsOf('我每天坐公共汽车去学校。'), ['我', '每天', '坐', '公共汽车', '去', '学校']);
const bus = lk.lookup('公共汽车', '我每天坐公共汽车去学校。');
assert.equal(bus.known, true);
assert.match(bus.meaning, /xe buýt/);
assert.ok(bus.id, '公共汽车 must resolve to exactly one course lesson');

// 2. The separable phone-call phrase is one unit in this context.
assert.deepEqual(wordsOf('我给妈妈打电话。'), ['我', '给', '妈妈', '打电话']);
const call = lk.lookup('打电话', '我给妈妈打电话。');
assert.equal(call.known, true);
assert.match(call.meaning, /gọi điện/);

// 3. Contextual gloss beats the dictionary sense for 花 in the spending sentence.
const spend = lk.lookup('花', '我花了十块钱。');
assert.equal(spend.context, true);
assert.match(spend.meaning, /tiêu/);
const flower = lk.lookup('花', '我喜欢花。');
assert.notEqual(flower.context, true, 'No "in this sentence" label without authored context data');

// 4. Text preservation and punctuation boundaries over a battery of shapes.
const battery = [
  '我每天坐公共汽车去学校。',
  '你好，你好吗？',
  '他一边走路一边说话。',
  '我我我，要要要。',
  '学中文，也学英文；还学画画儿！',
  '《中文》很难，可是很有意思。',
  '第一行\n第二行',
  'HSK 二级 123 好',
  '龘龘',
];
for (const s of battery) {
  const parts = lk.segment(s);
  assert.equal(parts.map(p => p.t).join(''), s, 'Segmentation must preserve the text exactly: ' + s);
  for (const p of parts) assert.ok(!/[，。！？；：、\n]/.test(p.t) || !p.word, 'No word segment may contain punctuation: ' + p.t);
}
// The 一边…一边 structure must never be glued into one long "word".
const side = wordsOf('他一边走路一边说话。');
assert.ok(side.every(w => [...w].length <= 4), 'No glued mega-segment: ' + side.join('/'));

// 5. Unknown characters are honest: segmented singly, no invented meaning.
const rare = lk.segment('龘').filter(p => p.word);
assert.deepEqual(rare.map(p => p.t), ['龘']);
assert.equal(lk.lookup('龘', '龘').known, false);

// 6. Overrides win only when the segments join back to the exact sentence.
const tampered = createWordLookup({
  courseWords: course.words, dict,
  overrides: { sentences: { '我花了十块钱。': { segments: ['我', '花了十块钱'] } }, words: {} },
});
assert.equal(tampered.segment('我花了十块钱。').map(p => p.t).join(''), '我花了十块钱。', 'Invalid override falls back to automatic segmentation and preserves the text');

// 7. Authored extra word 花钱 is in the lexicon with its gloss.
assert.equal(lk.lookup('花钱', '他花钱很多。').meaning, 'tiêu tiền');

// 8. Segmentation is cached and stable.
assert.equal(lk.segment('我每天坐公共汽车去学校。'), lk.segment('我每天坐公共汽车去学校。'));

console.log('PASS word-lookup: segmentation, overrides, contextual gloss, punctuation boundaries, unknown-word honesty.');
