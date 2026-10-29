// Word segmentation and gloss lookup for in-place reading support.
//
// Priority of data (highest first):
//  1. Authored per-sentence overrides (data/word-overrides.json): exact
//     segmentation for a sentence plus contextual glosses. An override is
//     used only when its segments join back to the exact sentence text.
//  2. The course vocabulary itself: every course word is a lexicon entry
//     with its authored Vietnamese meaning and, when the hanzi maps to
//     exactly one course entry, the lesson id for "Xem cách dùng".
//  3. Authored extra words/phrases from the overrides file (words map).
//  4. The CC-CEDICT-derived pinyin dictionary (data/pinyin-dict.json):
//     segmentation evidence only; it carries no Vietnamese meaning, so a
//     word found only there is reported honestly as "no meaning data".
//
// Segmentation is a dynamic-programming pass per Han run (never across
// punctuation or other non-Han characters). Scores favour longer entries
// and entries that carry a meaning, so 公共汽车 beats 公共 + 汽车 and
// 打电话 beats 打 + 电话. Results are cached per sentence string.
export function createWordLookup({courseWords = [], dict = null, overrides = {}} = {}) {
  const HAN = /\p{Script=Han}/u;
  const lexicon = new Map();
  const add = (text, entry, force = false) => {
    if (!text) return;
    const cur = lexicon.get(text);
    if (!cur) { lexicon.set(text, { ...entry }); return; }
    lexicon.set(text, force ? { ...cur, ...entry } : { ...entry, ...cur });
  };
  if (dict) {
    for (const [t, py] of Object.entries(dict.chars || {})) add(t, { pinyin: py });
    for (const [t, py] of Object.entries(dict.words || {})) add(t, { pinyin: py });
  }
  const ow = overrides && typeof overrides === 'object' ? overrides.words || {} : {};
  for (const [t, g] of Object.entries(ow)) {
    if (g && typeof g === 'object') add(t, { meaning: g.meaning || undefined, note: g.context || undefined, pinyin: g.pinyin || undefined });
  }
  const byHanzi = new Map();
  for (const w of courseWords || []) {
    if (!w || !w.hanzi) continue;
    const list = byHanzi.get(w.hanzi) || [];
    list.push(w);
    byHanzi.set(w.hanzi, list);
  }
  for (const [h, list] of byHanzi) {
    const entry = { meaning: list[0].meaning, pinyin: list[0].intro?.[0]?.pinyin || undefined, readings: (list[0].intro || []).map(x => x.pinyin).filter(Boolean) };
    if (list.length === 1) entry.id = list[0].id; else entry.ambiguous = list.length;
    add(h, entry, true);
  }
  const sentOverrides = overrides && typeof overrides === 'object' ? overrides.sentences || {} : {};
  const cache = new Map();

  function score(seg) {
    const entry = lexicon.get(seg);
    const n = [...seg].length;
    if (!entry) return n === 1 ? -4 : -1e9;
    return n * n * (entry.meaning ? 4 : 1.5) + (n > 1 ? 1 : 0);
  }
  function segmentRun(chars) {
    const n = chars.length;
    const dp = new Array(n + 1).fill(-Infinity);
    const nxt = new Array(n).fill(1);
    dp[n] = 0;
    for (let i = n - 1; i >= 0; i--) {
      const max = Math.min(8, n - i);
      for (let len = max; len >= 1; len--) {
        const s = score(chars.slice(i, i + len).join('')) + dp[i + len];
        if (s > dp[i]) { dp[i] = s; nxt[i] = len; }
      }
    }
    const out = [];
    let i = 0;
    while (i < n) { const len = nxt[i] || 1; out.push(chars.slice(i, i + len).join('')); i += len; }
    return out;
  }
  function segment(text) {
    text = String(text ?? '');
    if (cache.has(text)) return cache.get(text);
    let parts;
    const ov = sentOverrides[text];
    if (ov && Array.isArray(ov.segments) && ov.segments.join('') === text) {
      parts = ov.segments.map(t => ({ t, word: HAN.test(t) }));
    } else {
      parts = [];
      let run = [];
      const flush = () => { if (run.length) { for (const t of segmentRun(run)) parts.push({ t, word: true }); run = []; } };
      for (const ch of text) {
        if (HAN.test(ch)) run.push(ch);
        else { flush(); parts.push({ t: ch, word: false }); }
      }
      flush();
      parts = parts.reduce((acc, p) => {
        const last = acc[acc.length - 1];
        if (last && !last.word && !p.word) last.t += p.t; else acc.push({ ...p });
        return acc;
      }, []);
    }
    if (cache.size > 800) cache.clear();
    cache.set(text, parts);
    return parts;
  }
  function lookup(seg, sentence) {
    const entry = lexicon.get(seg);
    const readings = entry ? (entry.readings?.length ? entry.readings : entry.pinyin ? [entry.pinyin] : []) : [];
    const ov = sentOverrides[sentence];
    if (ov && ov.glosses && ov.glosses[seg]) {
      const g = ov.glosses[seg];
      return {
        known: true, context: true,
        meaning: g.meaning || entry?.meaning || '',
        note: g.context || '',
        readings: g.pinyin ? [g.pinyin] : readings,
        id: entry?.id || null, ambiguous: entry?.ambiguous || 0,
      };
    }
    if (!entry) return { known: false, readings: [] };
    return {
      known: !!entry.meaning,
      meaning: entry.meaning || '',
      id: entry.id || null,
      ambiguous: entry.ambiguous || 0,
      note: entry.note || '',
      readings,
    };
  }
  return { segment, lookup, has: t => lexicon.has(t) };
}
