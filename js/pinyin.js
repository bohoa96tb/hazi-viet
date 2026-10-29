// Runtime Pinyin fallback for lesson rendering.
// Authored pinyin stored in the course data always wins; this module only
// annotates Chinese strings that carry no authored pinyin (trap cases,
// corrections, self-use models, accepted answers, V1 examples/collocations).
// Dictionary: data/pinyin-dict.json, built from CC-CEDICT by
// tools/vocabulary/build-pinyin-dict.mjs (re-run it after new batches).
const HAN = /\p{Script=Han}/u;
// Bare structural particles read neutrally after a verb/word; the dictionary's
// first char reading alone would mislead (得 dé instead of de, 着 zháo...).
const BARE_AFTER_HAN = { '得': 'de', '地': 'de', '着': 'zhe', '过': 'guo' };
const PUNCT = { '，': ',', '。': '.', '？': '?', '！': '!', '、': ',', '；': ';', '：': ':', '…': '…', ',': ',', '.': '.', '?': '?', '!': '!', ';': ';', ':': ':' };

export function createPinyin(dict) {
  const words = dict?.words || {};
  const chars = dict?.chars || {};
  const maxLen = Math.max(2, ...Object.keys(words).map((k) => [...k].length));
  function segmentRun(run) {
    const cs = [...run];
    const out = [];
    let i = 0;
    let prevHan = false;
    while (i < cs.length) {
      let hit = null;
      for (let len = Math.min(maxLen, cs.length - i); len >= 2; len--) {
        const cand = cs.slice(i, i + len).join('');
        if (words[cand]) { hit = cand; break; }
      }
      if (hit) { out.push(words[hit]); i += [...hit].length; prevHan = true; continue; }
      const c = cs[i];
      // A bare 儿 after a word is the erhua suffix: merge it as r (一点儿 diǎnr).
      if (c === '儿' && prevHan && out.length) { out[out.length - 1] += 'r'; i++; continue; }
      let pin = chars[c] || '';
      if (prevHan && BARE_AFTER_HAN[c]) pin = BARE_AFTER_HAN[c];
      // 我得去… pattern: subject pronoun + 得 + verb reads děi (must), not de.
      if (c === '得' && '我你他她它'.includes(cs[i - 1] || '') && i + 1 < cs.length) pin = 'děi';
      out.push(pin);
      i++; prevHan = true;
    }
    return out.filter(Boolean).join(' ');
  }
  // Returns a pinyin string for a (possibly mixed-language) string, or ''.
  return function pinyinOf(text) {
    const s = String(text ?? '');
    if (!HAN.test(s)) return '';
    const parts = [];
    let run = '';
    const flush = () => { if (run) { const p = segmentRun(run); if (p) parts.push(p); run = ''; } };
    for (const ch of s) {
      if (HAN.test(ch)) { run += ch; continue; }
      flush();
      if (/[\p{L}\p{N}]/u.test(ch)) parts.push(ch);
      else if (parts.length && PUNCT[ch]) parts[parts.length - 1] += PUNCT[ch];
    }
    flush();
    return parts.join(' ').replace(/\s+([,.!?;:])/g, '$1').trim();
  };
}
