// Build data/hanzi-partials.json: per-stroke "identified" flags for
// characters whose Make Me a Hanzi IDS decomposition contains a '？'
// component (a fused shape with no codepoint of its own in the source).
//
// Source of truth: SOURCE_DATA/dictionary-original.txt (Make Me a Hanzi,
// LGPL-3.0-or-later). Its `matches` array maps every stroke to the IDS
// component path it belongs to (null = unassigned). A stroke counts as
// identified only when its path resolves to a leaf that is not '？'.
// Nothing is guessed: characters failing validation are left out and the
// renderer falls back to a plain whole-character display.
//
// Usage: node tools/hanzi/build-hanzi-partials.mjs
import {readFileSync, writeFileSync} from 'node:fs';

const ARITY = {'⿰': 2, '⿱': 2, '⿴': 2, '⿵': 2, '⿶': 2, '⿷': 2, '⿸': 2, '⿹': 2, '⿺': 2, '⿻': 2, '⿲': 3, '⿳': 3};

function parseIDS(text) {
  const tokens = [...text];
  let pos = 0;
  function parse() {
    const tok = tokens[pos++];
    if (ARITY[tok]) {
      const children = [];
      for (let i = 0; i < ARITY[tok]; i++) children.push(parse());
      return {char: tok, children};
    }
    return {char: tok, children: []};
  }
  const root = parse();
  return pos === tokens.length ? root : null;
}

function leavesWithPaths(node, path = [], out = []) {
  if (!node.children.length) { out.push({path, glyph: node.char}); return out; }
  node.children.forEach((child, i) => leavesWithPaths(child, [...path, i], out));
  return out;
}

const core = new Map();
for (let level = 1; level <= 6; level++) {
  for (const entry of JSON.parse(readFileSync(`data/hsk${level}-core.json`, 'utf8'))) core.set(entry.char, entry);
}
const original = new Map();
for (const line of readFileSync('SOURCE_DATA/dictionary-original.txt', 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const entry = JSON.parse(line);
  original.set(entry.character, entry);
}

const chars = {};
const skipped = [];
for (const [char, entry] of core) {
  const decomposition = String(entry.decomposition || '');
  if (!decomposition.includes('？') || decomposition === '？') continue;
  const src = original.get(char);
  const tree = parseIDS(decomposition);
  const fail = reason => skipped.push(`${char}: ${reason}`);
  if (!src?.matches) { fail('no matches in source'); continue; }
  if (!tree) { fail('IDS parse failed'); continue; }
  if (src.matches.length !== entry.strokeCount) { fail(`matches ${src.matches.length} != strokeCount ${entry.strokeCount}`); continue; }
  const leaves = leavesWithPaths(tree);
  const identifiedGlyphs = new Set(leaves.filter(l => l.glyph !== '？').map(l => l.glyph));
  const known = [];
  const knownGlyphs = new Set();
  let ok = true;
  src.matches.forEach(match => {
    if (!Array.isArray(match)) { known.push(false); return; }
    let node = tree;
    for (const idx of match) node = node?.children?.[idx];
    if (!node || node.children.length) { ok = false; known.push(false); return; }
    if (node.char === '？') { known.push(false); return; }
    known.push(true); knownGlyphs.add(node.char);
  });
  if (!ok) { fail('match path does not resolve to a leaf'); continue; }
  if (!known.includes(true) || !known.includes(false)) { fail('needs both identified and unidentified strokes'); continue; }
  if ([...knownGlyphs].sort().join() !== [...identifiedGlyphs].sort().join()) { fail(`known glyphs ${[...knownGlyphs]} != identified leaves ${[...identifiedGlyphs]}`); continue; }
  chars[char] = {known};
}

const out = {
  version: 1,
  note: 'Per-stroke identified flags for characters whose IDS contains a fused component without its own codepoint. Derived from Make Me a Hanzi dictionary.txt matches (LGPL-3.0-or-later) by tools/hanzi/build-hanzi-partials.mjs. Stroke paths are loaded at runtime from Hanzi Writer Data (Arphic) — the same source as the writing step.',
  chars,
};
writeFileSync('data/hanzi-partials.json', JSON.stringify(out) + '\n');
console.log(`wrote data/hanzi-partials.json: ${Object.keys(chars).length} chars`);
for (const [char, v] of Object.entries(chars)) console.log(`  ${char}: ${v.known.map(k => (k ? '1' : '0')).join('')}`);
if (skipped.length) console.log('skipped:\n  ' + skipped.join('\n  '));
