#!/usr/bin/env node
// Builds data/pinyin-dict.json: a compact word/char Pinyin dictionary covering
// exactly the Chinese strings the lesson renderer needs to annotate at runtime
// (trap cases, corrections, self-use models, accepted answers, V1 examples and
// collocations that carry no authored pinyin). Source: CC-CEDICT (MDBG export),
// a community-maintained free dictionary. Authored pinyin in the course data
// always wins at render time; this dictionary is only a fallback.
//
// Usage: CEDICT_PATH=~/workspace/hazi-tools/cedict.txt node tools/vocabulary/build-pinyin-dict.mjs
// Re-run after batches that introduce new characters/sentences, before release.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const cedictPath = process.env.CEDICT_PATH || path.join(os.homedir(), 'workspace/hazi-tools/cedict.txt');
const coursePath = 'data/vocabulary/hanzii-course.json';
const outPath = 'data/pinyin-dict.json';

const MARKS = {
  a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', 'ü': 'ǖǘǚǜ',
};
function convertSyllable(syl) {
  const m = /^([a-zü:]+)([1-5])$/i.exec(syl);
  if (!m) return syl.replace(/u:/gi, 'ü').replace(/v/g, 'ü');
  let base = m[1].toLowerCase().replace(/u:/g, 'ü').replace(/v/g, 'ü');
  const tone = Number(m[2]);
  if (tone === 5) return base;
  const vowels = ['a', 'e', 'i', 'o', 'u', 'ü'];
  if (![...base].some((c) => vowels.includes(c))) return base;
  let idx = -1;
  if (base.includes('a')) idx = base.indexOf('a');
  else if (base.includes('e')) idx = base.indexOf('e');
  else if (base.includes('ou')) idx = base.indexOf('o');
  else for (let i = base.length - 1; i >= 0; i--) if (vowels.includes(base[i])) { idx = i; break; }
  if (idx < 0) return base;
  return base.slice(0, idx) + MARKS[base[idx]][tone - 1] + base.slice(idx + 1);
}
function convertPinyin(numbered) {
  const parts = numbered.split(/\s+/).filter(Boolean).map(convertSyllable);
  const out = [];
  for (const p of parts) {
    if (p === 'r' && out.length) out[out.length - 1] += 'r'; // erhua suffix
    else out.push(p);
  }
  return out.join(' ');
}

// --- Load CC-CEDICT: first entry per simplified word wins. ---
const wordRaw = new Map();
const charRaw = new Map();
for (const line of fs.readFileSync(cedictPath, 'utf8').split('\n')) {
  if (!line || line.startsWith('#')) continue;
  const m = /^(\S+) (\S+) \[([^\]]+)\] \//.exec(line);
  if (!m) continue;
  const [, , simp, pin] = m;
  if (!wordRaw.has(simp)) wordRaw.set(simp, pin);
  if ([...simp].length === 1 && !charRaw.has(simp)) charRaw.set(simp, pin);
}
const wordPin = new Map([...wordRaw].map(([k, v]) => [k, convertPinyin(v)]));
const maxWordLen = Math.min(8, Math.max(...[...wordRaw.keys()].map((k) => [...k].length)));

const HAN = /\p{Script=Han}/u;
function candidatesAt(chars, i, dict) {
  const out = [];
  for (let len = 2; len <= Math.min(maxWordLen, chars.length - i); len++) {
    const cand = chars.slice(i, i + len).join('');
    if (![...cand].every((c) => HAN.test(c))) break;
    if (dict.has(cand)) out.push(cand);
  }
  return out;
}
// Corpus frequency of every candidate word (how many target strings contain it
// at some position). Common real words （一会儿） outscore accidental long
// matches （不一会） that only ever occur inside another word's span.
const wordFreq = new Map();
function countCandidates(targets) {
  for (const t of targets) {
    const chars = [...t];
    const seen = new Set();
    for (let i = 0; i < chars.length; i++) {
      if (!HAN.test(chars[i])) continue;
      for (const w of candidatesAt(chars, i, wordPin)) seen.add(w);
    }
    for (const w of seen) wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
  }
}
// DP segmentation: maximize total word score; a single char scores 0.
function segment(zh, dict) {
  const chars = [...zh];
  const n = chars.length;
  const best = new Array(n + 1).fill(-Infinity);
  const pick = new Array(n + 1).fill(null);
  best[n] = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (!HAN.test(chars[i])) { best[i] = best[i + 1]; pick[i] = [chars[i], null, 1]; continue; }
    best[i] = best[i + 1]; pick[i] = [chars[i], undefined, 1];
    for (const w of candidatesAt(chars, i, dict)) {
      const score = 1 + Math.log2(1 + (wordFreq.get(w) || 1)) - 0.01 + best[i + [...w].length];
      if (score > best[i]) { best[i] = score; pick[i] = [w, dict.get(w), [...w].length]; }
    }
  }
  const out = [];
  for (let i = 0; i < n;) { const [text, pin, len] = pick[i]; out.push([text, pin]); i += len; }
  return out;
}

// --- Collect every Chinese string the renderer may need to annotate. ---
const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));
const targets = new Set();
const addStr = (s) => { if (typeof s === 'string' && HAN.test(s)) targets.add(s); };
for (const w of course.words) {
  const l = w.lesson || {};
  for (const e of l.examples || []) { addStr(e.zh); addStr(e.translationSteps?.result); }
  for (const t of l.traps || []) {
    for (const c of t.cases || []) addStr(c.zh);
    for (const r of t.corrections || []) addStr(r.zh);
  }
  for (const a of Object.values(l.selfAnswers || {})) addStr(a?.model);
  for (const a of Object.values(l.answers || {})) for (const s of a?.accepted || []) addStr(s);
  for (const a of l.meaning?.alternatives || []) addStr(a.zh);
  for (const u of l.usages || []) for (const c of u.collocations || []) addStr(c.zh);
  for (const c of l.checks || []) for (const o of c.choices || []) addStr(o);
}

countCandidates(targets);
const usedWords = new Map();
const neededChars = new Set();
// Vote for each char's reading from the word entries it actually appears in
// across the corpus: CC-CEDICT's first single-char entry is often an obscure
// reading (听 yǐn, 说 shuì, 读 dòu), while corpus frequency picks the real one.
const votes = new Map();
for (const t of targets) {
  for (const c of t) if (HAN.test(c)) neededChars.add(c);
  for (const [text, pin] of segment(t, wordPin)) {
    if (!pin) continue;
    usedWords.set(text, pin);
    const wc = [...text];
    const syllables = pin.split(' ');
    if (syllables.length === wc.length) {
      wc.forEach((c, i) => {
        if (!votes.has(c)) votes.set(c, new Map());
        const v = votes.get(c);
        v.set(syllables[i], (v.get(syllables[i]) || 0) + 1);
      });
    }
  }
}
const chars = {};
const missingChars = [];
for (const c of neededChars) {
  const v = votes.get(c);
  if (v && v.size) { chars[c] = [...v.entries()].sort((a, b) => b[1] - a[1])[0][0]; continue; }
  if (charRaw.has(c)) { chars[c] = convertPinyin(charRaw.get(c)); continue; }
  missingChars.push(c);
}
// Corpus voting can still mislead for a few very common bare chars; pin the
// readings learners will actually meet (sentence particles read neutrally).
const CHAR_OVERRIDES = { '都': 'dōu', '和': 'hé', '吗': 'ma', '吧': 'ba', '呢': 'ne', '胖': 'pàng', '累': 'lèi' };
for (const [c, p] of Object.entries(CHAR_OVERRIDES)) if (chars[c]) chars[c] = p;
const words = {};
for (const [k, v] of [...usedWords].sort()) words[k] = v;
const sortedChars = {};
for (const k of Object.keys(chars).sort()) sortedChars[k] = chars[k];
fs.writeFileSync(outPath, JSON.stringify({ words, chars: sortedChars }) + '\n');
const covered = [...targets].filter((t) => segment(t, new Map(Object.entries(words))).every(([txt, pin]) => pin !== undefined || [...txt].every((c) => !HAN.test(c) || sortedChars[c]))).length;
console.log(`targets: ${targets.size} strings; fully coverable: ${covered}`);
console.log(`dict: ${Object.keys(words).length} words, ${Object.keys(sortedChars).length} chars; missing chars: ${missingChars.join('') || 'none'}`);
console.log(`size: ${fs.statSync(outPath).size} bytes -> ${outPath}`);
