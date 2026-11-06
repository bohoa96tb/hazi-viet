// Logic and data tests for the reusable Hanzi analysis renderer.
// Run: node tools/hanzi/test-hanzi-analysis.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  renderHanziAnalysis, hanziProfileFor, roleFor, positionNote,
  expandableParts, isHanziBranchExpanded, setHanziBranchExpanded,
  hanziPartialLeaves, HANZI_ANALYSIS_MAX_DEPTH,
} from '../../js/hanzi-analysis.js';
import {renderStudyStage, renderStudyShell, studySteps} from '../../js/study-view.js';
import {parseIDS} from '../../js/detail-view.js';

const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const chars = [1, 2, 3, 4, 5, 6].flatMap(l => read(`data/hsk${l}-core.json`));
const data = {
  charMap: new Map(chars.map(c => [c.char, c])),
  words: [], sentences: [], grammar: [],
  radicals: read('data/radicals-vi.json'),
  etymologyVi: read('data/etymology-vi.json'),
  hanziAnalysis: read('data/hanzi-analysis.json'),
  hanziPartials: read('data/hanzi-partials.json'),
};
const xiang = data.charMap.get('想');
const profile = hanziProfileFor('想', data);

// 1. Gate: only 想 is enabled; other characters keep the legacy stage.
assert.ok(profile, '想 must have an enabled profile');
assert.equal(hanziProfileFor('休', data), null);
const progress = read('docs/hanzi-analysis-progress.json');
assert.deepEqual(data.hanziAnalysis.enabledChars, progress.completed,
  'enabledChars must exactly match the completed list in the progress file');
const stageXiang = renderStudyStage({c: xiang, data, stage: 0});
assert.ok(stageXiang.includes('hanzi-analysis'), '想 stage 0 must use the new renderer');
const stageMing = renderStudyStage({c: data.charMap.get('休'), data, stage: 0});
assert.ok(!stageMing.includes('hanzi-analysis'), '休 stage 0 must keep the legacy renderer');
assert.ok(stageMing.includes('structure-card'), '休 stage 0 must render the legacy structure card');

// 2. 想 tree and roles match the imported source data.
assert.equal(xiang.decomposition, '⿱相心');
assert.equal(data.charMap.get('相').decomposition, '⿰木目');
assert.equal(xiang.etymology.phonetic, '相');
assert.equal(xiang.etymology.semantic, '心');
assert.equal(profile.components['相'].role, 'phonetic');
assert.equal(profile.components['心'].role, 'semantic');
assert.equal(roleFor(xiang, '相'), 'phonetic', 'role must also derive from etymology');
assert.equal(roleFor(xiang, '心'), 'semantic');
assert.equal(roleFor(data.charMap.get('休'), '木'), 'neutral', 'ideographic parts stay neutral');
const html = renderHanziAnalysis(xiang, data, profile);
assert.ok(html.includes('PHẦN GỢI ÂM') && html.includes('PHẦN GỢI NGHĨA'));
assert.ok(html.includes('data-ha-toggle="相"'), '相 must be expandable');
assert.ok(html.includes('data-study-part="木"') && html.includes('data-study-part="目"'));
assert.ok(html.includes('data-study-part="心"'), '心 must link to its own study');
assert.ok(html.includes('data-study-part="相"'), 'opening a branch and studying the part are separate actions');
assert.ok(html.includes('木 bên trái · 目 bên phải'), 'position note for 相 parts');
assert.ok(html.includes('13 nét'), 'stroke count from source data');
assert.equal(xiang.strokeCount, 13);
assert.ok(html.includes('TƯỞNG') && html.includes('nghĩ · muốn · nhớ'));
assert.ok(html.includes('data-stage="1"'), 'writing button must go to stage 1');

// 3. 相 readings: two pinyins paired with two different Sino-Vietnamese names.
//    The core entry alone is insufficient (pinyin only ["xiāng"], sinoViet
//    only "Tướng"), so the pairing must come from the curated profile and
//    stay consistent with the CVDICT senses present in dictionaryVi.
assert.deepEqual(profile.components['相'].readings, [
  {pinyin: 'xiāng', sinoViet: 'TƯƠNG'},
  {pinyin: 'xiàng', sinoViet: 'TƯỚNG'},
]);
const dictPinyins = new Set(xiang.dictionaryVi ? [] : []);
for (const s of data.charMap.get('相').dictionaryVi) dictPinyins.add(s.pinyin.toLowerCase());
assert.ok(dictPinyins.has('xiāng') && dictPinyins.has('xiàng'), 'both readings exist in CVDICT senses');
assert.ok(html.includes('xiāng / xiàng') && html.includes('TƯƠNG / TƯỚNG'));

// 4. Position notes come from the IDS operator, never from array order.
assert.equal(positionNote('⿰', ['木', '目']), '木 bên trái · 目 bên phải');
assert.equal(positionNote('⿱', ['相', '心']), '相 ở trên · 心 ở dưới');
assert.equal(positionNote('⿲', ['a', 'b', 'c']), 'a bên trái · b ở giữa · c bên phải');
assert.equal(positionNote('⿻', ['a', 'b']), '');

// 5. Escaping: curated text can never inject markup.
const evil = renderHanziAnalysis(xiang, data, {...profile, mnemonic: '<script>alert(1)</script>{心}'});
assert.ok(!evil.includes('<script>alert'), 'mnemonic must be escaped');
assert.ok(evil.includes('&lt;script&gt;'));

// 5b. Source links only render for https URLs (curated data, hardened anyway).
const badLink = renderHanziAnalysis(xiang, data, {...profile, sources: [{text: 'x', href: 'javascript:alert(1)', linkLabel: 'y'}]});
assert.ok(!badLink.includes('javascript:'), 'non-https source href must not render as a link');
assert.ok(html.includes('href="https://github.com/skishore/makemeahanzi"'), 'https source links render');

// 6. Missing data degrades honestly, never crashes or invents parts.
const heart = renderHanziAnalysis(data.charMap.get('心'), data, {});
assert.ok(heart.includes('Nguồn chưa có cây phân tích'), '心 has decomposition ？ in source');
const bare = renderHanziAnalysis({char: '龘', pinyin: [], vi: '', radical: '', decomposition: '', strokeCount: undefined}, data, {});
assert.ok(bare.includes('Nguồn chưa có cây phân tích'));
assert.ok(bare.includes('Chưa có'), 'missing stroke count must be labelled');
const water = renderHanziAnalysis(data.charMap.get('水'), data, {});
assert.ok(water.includes('Thành phần đã nhận diện'), '水 contains ？ in its decomposition: partial presentation, no placeholder card');
assert.ok(!water.includes('CHƯA XÁC ĐỊNH'), 'placeholder card must never render');

// 7. Depth limit: sub-parts are leaves; nothing renders past MAX_DEPTH.
assert.equal(HANZI_ANALYSIS_MAX_DEPTH, 2);
const leaf = (char, pinyin) => ({char, pinyin: [pinyin], vi: '', radical: '', decomposition: '？', etymology: {}, strokeCount: 1});
const chain = new Map([
  ['甲', {char: '甲', pinyin: ['a'], vi: '', radical: '', decomposition: '⿰乙丁', etymology: {}, strokeCount: 1}],
  ['乙', {char: '乙', pinyin: ['b'], vi: '', radical: '', decomposition: '⿰丙己', etymology: {}, strokeCount: 1}],
  ['丙', {char: '丙', pinyin: ['c'], vi: '', radical: '', decomposition: '⿰戊庚', etymology: {}, strokeCount: 1}],
  ['丁', leaf('丁', 'd')],
  ['己', leaf('己', 'f')],
  ['戊', leaf('戊', 'e')],
  ['庚', leaf('庚', 'g')],
]);
const chainData = {charMap: chain, radicals: {}, hanziAnalysis: {enabledChars: [], profiles: {}}};
const chainHtml = renderHanziAnalysis(chain.get('甲'), chainData, {});
assert.ok(chainHtml.includes('data-ha-toggle="乙"'), 'level-1 part expands');
assert.ok(chainHtml.includes('data-study-part="丙"'), 'level-2 parts render as study buttons');
assert.ok(!chainHtml.includes('data-ha-toggle="丙"'), 'level-2 parts must not expand further');
assert.ok(!chainHtml.includes('戊') && !chainHtml.includes('庚'), 'level-3 parts must not render');

// 8. Cycle guard: a part that repeats an ancestor renders a stop note and
//    offers no expansion, so recursive opening always terminates.
const cycle = new Map(chain);
cycle.set('乙', {char: '乙', pinyin: ['b'], vi: '', radical: '', decomposition: '⿰甲丁', etymology: {}, strokeCount: 1});
const cycleHtml = renderHanziAnalysis(cycle.get('甲'), {charMap: cycle, radicals: {}, hanziAnalysis: {enabledChars: [], profiles: {}}}, {});
assert.ok(cycleHtml.includes('data-ha-toggle="乙"'), '乙 itself still expands');
assert.equal(expandableParts('甲', {charMap: cycle}, 1, new Set(['甲', '乙'])), null, 'ancestor must not expand again');
// Render the second level through 乙's own card expansion data:
const lvl2 = renderHanziAnalysis(cycle.get('乙'), {charMap: cycle, radicals: {}, hanziAnalysis: {enabledChars: [], profiles: {}}}, {});
assert.ok(lvl2.includes('vòng lặp') || lvl2.includes('data-study-part="甲"'));
// Direct self-reference: a character whose decomposition contains itself.
const selfCycle = new Map([['自', {char: '自', pinyin: ['z'], vi: '', radical: '', decomposition: '⿱自心', etymology: {}, strokeCount: 1}], ['心', data.charMap.get('心')]]);
const selfHtml = renderHanziAnalysis(selfCycle.get('自'), {charMap: selfCycle, radicals: data.radicals, hanziAnalysis: {enabledChars: [], profiles: {}}}, {});
assert.ok(selfHtml.includes('vòng lặp'), 'self-referencing part must show the cycle stop note');
assert.ok(!selfHtml.includes('data-ha-toggle="自"'), 'self-referencing part must not be expandable');

// 9. Branch expansion state survives re-render (stage switch and back).
assert.equal(isHanziBranchExpanded('想', '相'), false);
setHanziBranchExpanded('想', '相', true);
const reopened = renderHanziAnalysis(xiang, data, profile);
assert.ok(reopened.includes('aria-expanded="true"'), 're-render must keep the branch open');
assert.ok(!/id="ha-panel-想-相"[^>]*hidden/.test(reopened), 'panel must render visible');
setHanziBranchExpanded('想', '相', false);
assert.ok(renderHanziAnalysis(xiang, data, profile).includes('aria-expanded="false"'));

// 10. The "Gốc chữ" tab is removed (it duplicated "Hiểu chữ"): exactly four
//     steps remain, stage 3 is the last one, and stage 4 renders nothing.
assert.deepEqual(studySteps.map(s => s.id), ['structure', 'writing', 'words', 'grammar']);
assert.ok(!studySteps.some(s => s.label.includes('Gốc chữ')));
assert.ok(renderStudyStage({c: xiang, data, stage: 3}).includes('CÁCH DÙNG'));
assert.equal(renderStudyStage({c: xiang, data, stage: 4}), '', 'stage 4 must no longer exist');
assert.ok(renderStudyShell({c: xiang, data, stage: 0}).includes('Bước 1/4'));
assert.ok(!renderStudyShell({c: xiang, data, stage: 3}).includes('Tiếp:'), 'last stage must offer finish, not a next step');

// 11. Every completed character in the progress file is genuinely enabled
//     and consistent with its source entry (data-driven batch gate).
for (const ch of progress.completed) {
  const entry = data.charMap.get(ch);
  assert.ok(entry, `completed char must exist in core data: ${ch}`);
  const p = hanziProfileFor(ch, data);
  assert.ok(p, `completed char must have an enabled profile: ${ch}`);
  const out = renderHanziAnalysis(entry, data, p);
  assert.ok(!out.includes('undefined'), `render must not contain "undefined": ${ch}`);
  if (entry.strokeCount) assert.ok(out.includes(`${entry.strokeCount} nét`), `stroke count must render: ${ch}`);
  for (const part of Object.keys(p.components || {})) {
    const role = p.components[part].role;
    if (!role) continue;
    if (entry.etymology?.phonetic === part) assert.equal(role, 'phonetic', `${ch}/${part} role`);
    if (entry.etymology?.semantic === part) assert.equal(role, 'semantic', `${ch}/${part} role`);
  }
}
// Expansion guards learned in batch B-001: stroke-overlay (⿻) parts and
// parts whose decomposition repeats one identical leaf never expand.
assert.equal(expandableParts('七', data, 1, new Set(['东', '七'])), null, '七 (⿻) must not expand');
assert.equal(expandableParts('二', data, 1, new Set(['三', '二'])), null, '二 (identical leaves) must not expand');
// Single-stroke 一 uses its curated no-tree note instead of a tree.
assert.ok(renderHanziAnalysis(data.charMap.get('一'), data, hanziProfileFor('一', data)).includes('chữ đơn thể'));

// 12. Partial characters (IDS contains a fused '？' component): the study
//     UI must never show a placeholder card. The character is presented
//     whole, only identified components are listed, and a small note says
//     the full analysis is being supplemented. (Standard amendment
//     2026-11-05; first applied to 后 and 今, swept over all completed.)
const partialChars = progress.completed.filter(ch => {
  const d = data.charMap.get(ch).decomposition || '';
  return d.includes('？') && d !== '？';
});
assert.ok(partialChars.length >= 9, `expected at least the 9 known partial chars, got ${partialChars.length}`);
for (const ch of progress.completed) {
  const out = renderHanziAnalysis(data.charMap.get(ch), data, hanziProfileFor(ch, data));
  assert.ok(!out.includes('CHƯA XÁC ĐỊNH'), `no placeholder label may render: ${ch}`);
  assert.ok(!out.includes('ha-unknown"'), `no placeholder card may render: ${ch}`);
}
for (const ch of partialChars) {
  const entry = data.charMap.get(ch);
  const info = hanziPartialLeaves(entry);
  assert.ok(info && info.identified.length >= 1, `partial char must have identified parts: ${ch}`);
  const out = renderHanziAnalysis(entry, data, hanziProfileFor(ch, data));
  assert.ok(out.includes('Thành phần đã nhận diện'), `identified-parts heading: ${ch}`);
  assert.ok(out.includes('Phân tích đầy đủ đang được bổ sung'), `supplement note: ${ch}`);
  assert.ok(out.includes(`data-ha-partial="${ch}"`), `partial figure hook: ${ch}`);
  for (const leaf of info.identified) assert.ok(out.includes(`<strong lang="zh-CN">${leaf}</strong>`), `identified leaf card ${leaf}: ${ch}`);
  assert.ok(!out.includes('Bố cục:'), `partial char must not present a full layout line: ${ch}`);
}
// Whole-character chars (decomposition exactly '？') are NOT partial: they
// keep their curated no-tree note.
assert.equal(hanziPartialLeaves(data.charMap.get('人')), null);

// 13. Explanation heading: "Vì sao ghép như vậy?" only when the entry has
//     a source etymology; otherwise the observation heading is used.
const lengHtml = renderHanziAnalysis(data.charMap.get('冷'), data, hanziProfileFor('冷', data));
assert.ok(lengHtml.includes('Vì sao ghép như vậy?'), '冷 has source etymology');
const qianHtml = renderHanziAnalysis(data.charMap.get('前'), data, hanziProfileFor('前', data));
assert.ok(qianHtml.includes('Nhìn chữ để nhớ'), '前 has no source etymology');
assert.ok(!qianHtml.includes('Vì sao ghép như vậy?'), '前 must not claim a sourced composition reason');
const houHtml = renderHanziAnalysis(data.charMap.get('后'), data, hanziProfileFor('后', data));
assert.ok(houHtml.includes('Nhìn chữ để nhớ'), '后 has no source etymology');

// 14. hanzi-partials.json must agree with an independent recomputation
//     from the source dictionary (app parser + source matches), and every
//     shipped mapping must be internally consistent.
const original = new Map();
for (const line of fs.readFileSync('SOURCE_DATA/dictionary-original.txt', 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const e = JSON.parse(line);
  original.set(e.character, e);
}
for (const [ch, v] of Object.entries(data.hanziPartials.chars)) {
  const entry = data.charMap.get(ch);
  assert.ok(entry, `partial data char must exist in core: ${ch}`);
  assert.equal(v.known.length, entry.strokeCount, `stroke count agreement: ${ch}`);
  assert.ok(v.known.includes(true) && v.known.includes(false), `both stroke kinds: ${ch}`);
  const tree = parseIDS(entry.decomposition);
  const expected = original.get(ch).matches.map(m => {
    if (!Array.isArray(m)) return false;
    let node = tree;
    for (const idx of m) node = node?.children?.[idx];
    return !!node && !node.children.length && node.char !== '？';
  });
  assert.deepEqual(v.known, expected, `known flags must match source recomputation: ${ch}`);
}
for (const ch of ['后', '今', '不', '习', '书', '五', '先', '北', '友']) {
  assert.ok(data.hanziPartials.chars[ch], `stroke mapping must be shipped for ${ch}`);
}

// 15. 京 is unblocked via the recorded supplements: stroke count and
//     Sino-Vietnamese reading come from the supplemented core fields.
const jing = data.charMap.get('京');
assert.equal(jing.strokeCount, 8, '京 strokeCount supplemented from Unihan kTotalStrokes');
assert.equal(jing.learningVi?.sinoViet, 'KINH', '京 sinoViet supplemented from the Kai entry');
const jingHtml = renderHanziAnalysis(jing, data, hanziProfileFor('京', data));
assert.ok(jingHtml.includes('8 nét') && jingHtml.includes('KINH'));
assert.ok(jingHtml.includes('Unihan U+4EAC'), '京 profile must disclose the supplement source');
const supplements = progress.supplements || [];
assert.ok(supplements.some(s => s.char === '京' && s.fields.length === 2), 'supplements register must record 京');

// 16. Legacy renderer (unstandardized characters): a '？' IDS leaf must
//     not be presented as a component. It renders as a neutral marker
//     with an explanation, in both the compact study tree and the full
//     learning panel. This is a display fix only; it does not mark any
//     unstandardized character as reviewed.
const lingStage = renderStudyStage({c: data.charMap.get('令'), data, stage: 0});
assert.ok(!lingStage.includes('hanzi-analysis'), '令 keeps the legacy stage');
assert.ok(lingStage.includes('tiny-tree-unknown'), 'legacy compact tree must use the neutral marker');
assert.ok(lingStage.includes('không phải một thành phần của chữ'), 'legacy stage must explain the marker');
assert.ok(!lingStage.includes('>？<'), 'no literal placeholder glyph as a tree leaf');
assert.ok(lingStage.includes('ids-unknown'), 'full panel tree must use the neutral marker too');

console.log('test-hanzi-analysis: all assertions passed');
