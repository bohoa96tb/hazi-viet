// Reusable Hanzi analysis renderer for the "Hiểu chữ" study stage.
// Pure string rendering; the only state is branch expansion, kept in this
// module so it survives stage switches inside one study session.
// Only characters with an enabled profile in data/hanzi-analysis.json use
// this renderer; every other character keeps the legacy stage.
// See docs/HANZI_ANALYSIS_STANDARD.md.
import {escapeHTML as e, parseIDS, idsLabels} from './detail-view.js?v=3.1.0';

export const HANZI_ANALYSIS_MAX_DEPTH = 2;

const ROLE_META = {
  phonetic: {label: 'PHẦN GỢI ÂM', cls: 'ha-sound', mark: 'ha-blue'},
  semantic: {label: 'PHẦN GỢI NGHĨA', cls: 'ha-meaning', mark: 'ha-green'},
  neutral: {label: 'THÀNH PHẦN', cls: 'ha-neutral', mark: ''},
};
const POSITIONS = {
  '⿰': ['bên trái', 'bên phải'],
  '⿱': ['ở trên', 'ở dưới'],
  '⿲': ['bên trái', 'ở giữa', 'bên phải'],
  '⿳': ['ở trên', 'ở giữa', 'ở dưới'],
  '⿴': ['bao quanh', 'ở trong'],
  '⿵': ['bao từ trên', 'ở trong'],
  '⿶': ['bao từ dưới', 'ở trong'],
  '⿷': ['bao từ trái', 'ở trong'],
  '⿸': ['bao từ trên trái', 'ở trong'],
  '⿹': ['bao từ trên phải', 'ở trong'],
  '⿺': ['bao từ dưới trái', 'ở trong'],
};

// --- Branch expansion state (per study session, not persisted) ---
const expandedBranches = new Set();
const branchKey = (root, branch) => `${root}>${branch}`;
export function isHanziBranchExpanded(root, branch) {
  return expandedBranches.has(branchKey(root, branch));
}
export function setHanziBranchExpanded(root, branch, open) {
  if (open) expandedBranches.add(branchKey(root, branch));
  else expandedBranches.delete(branchKey(root, branch));
}
// In-place toggle used by the app click delegation: updates only the button
// and its panel, never re-renders the study route or loses scroll position.
export function toggleHanziBranch(button) {
  if (!button) return false;
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  const panel = button.ownerDocument?.getElementById(button.getAttribute('aria-controls'));
  if (panel) panel.hidden = !open;
  const icon = button.querySelector('[data-ha-icon]');
  if (icon) icon.textContent = open ? '－' : '＋';
  setHanziBranchExpanded(button.dataset.haRoot, button.dataset.haToggle, open);
  return open;
}

// --- Profile access ---
export function hanziProfileFor(char, data) {
  const store = data?.hanziAnalysis;
  if (!store || !Array.isArray(store.enabledChars)) return null;
  if (!store.enabledChars.includes(char)) return null;
  return store.profiles?.[char] || null;
}

// --- IDS helpers ---
export function idsLeaves(node) {
  if (!node) return [];
  if (!node.children.length) return [node.char];
  return node.children.flatMap(idsLeaves);
}
export function decompositionTree(entry) {
  const text = String(entry?.decomposition || '').trim();
  if (!text || text === '？') return null;
  const tree = parseIDS(text);
  return tree && tree.children.length ? tree : null;
}
export function positionNote(operator, chars) {
  const pos = POSITIONS[operator];
  if (!pos || pos.length !== chars.length) return '';
  return chars.map((ch, i) => `${ch} ${pos[i]}`).join(' · ');
}

// Role comes from the profile override first, then from the parent entry's
// etymology fields in the imported Make Me a Hanzi data. Never guessed
// from the shape alone.
export function roleFor(parentEntry, partChar, override) {
  if (override?.role && ROLE_META[override.role]) return override.role;
  if (parentEntry?.etymology?.semantic === partChar) return 'semantic';
  if (parentEntry?.etymology?.phonetic === partChar) return 'phonetic';
  return 'neutral';
}

function partInfo(partChar, data, override) {
  const entry = data?.charMap?.get(partChar);
  const rad = data?.radicals?.[partChar];
  const readings = override?.readings?.length
    ? override.readings
    : entry
      ? [{pinyin: (entry.pinyin || []).join(' / '), sinoViet: entry.learningVi?.sinoViet || ''}]
      : [];
  return {
    entry,
    readings,
    pinyinLine: readings.map(r => r.pinyin).filter(Boolean).join(' / '),
    sinoLine: override?.sinoViet || readings.map(r => r.sinoViet).filter(Boolean).join(' / '),
    meaning: override?.meaning || entry?.learningVi?.meaningVi || rad?.meaningVi || entry?.vi || '',
    note: override?.note || '',
  };
}

// A part may be expanded one more level only when its own decomposition is
// a clean composition of known parts, the depth limit allows it and the
// part is not already an ancestor (cycle guard).
export function expandableParts(partChar, data, depth, ancestors) {
  if (depth >= HANZI_ANALYSIS_MAX_DEPTH) return null;
  if (ancestors.has(partChar)) return null;
  const entry = data?.charMap?.get(partChar);
  if (!entry) return null;
  const tree = decompositionTree(entry);
  if (!tree) return null;
  const leaves = idsLeaves(tree);
  if (leaves.length < 2 || leaves.includes('？')) return null;
  if (tree.char === '⿻') return null;
  if (new Set(leaves).size < 2) return null;
  return {tree, leaves};
}

// Wrap {字} tokens of a curated profile text in role-coloured <b> marks;
// everything else is escaped plain text.
function markedText(text, rootEntry, profile) {
  return String(text || '').split(/\{([^{}]+)\}/g).map((seg, i) => {
    if (i % 2 === 0) return e(seg);
    const role = roleFor(rootEntry, seg, profile?.components?.[seg]);
    const cls = ROLE_META[role].mark;
    return `<b lang="zh-CN"${cls ? ` class="${cls}"` : ''}>${e(seg)}</b>`;
  }).join('');
}

function subpartHTML(partChar, data, override) {
  const info = partInfo(partChar, data, override);
  const inner = `<b lang="zh-CN">${e(partChar)}</b>${info.sinoLine ? `<span>${e(info.sinoLine)}</span>` : ''}${info.meaning ? `<small>${e(info.meaning)}</small>` : ''}`;
  if (info.entry) return `<button data-study-part="${e(partChar)}" aria-label="Học thành phần ${e(partChar)}">${inner}</button>`;
  return `<div class="ha-subpart-static">${inner}</div>`;
}

function partCardHTML({rootChar, partChar, data, profile, depth, ancestors}) {
  const parentEntry = data?.charMap?.get(rootChar);
  const override = profile?.components?.[partChar];
  // A '？' IDS leaf is a fused shape with no codepoint of its own. It is
  // never rendered as a card; partial characters are presented whole
  // (see renderHanziAnalysis). Defensive: render nothing for it here.
  if (partChar === '？') return '';
  const info = partInfo(partChar, data, override);
  const role = roleFor(parentEntry, partChar, override);
  const meta = ROLE_META[role];
  const cycle = ancestors.has(partChar);
  const expansion = cycle ? null : expandableParts(partChar, data, depth, ancestors);
  let inner = '';
  if (cycle) {
    inner = '<p class="ha-cycle">Phần này đã xuất hiện ở tầng trên; dừng tại đây để tránh vòng lặp.</p>';
  } else if (expansion) {
    const open = isHanziBranchExpanded(rootChar, partChar);
    const panelId = `ha-panel-${rootChar}-${partChar}`;
    const note = positionNote(expansion.tree.char, expansion.leaves);
    inner = `<button type="button" class="ha-expand-btn" data-ha-toggle="${e(partChar)}" data-ha-root="${e(rootChar)}" aria-expanded="${open}" aria-controls="${e(panelId)}">Tách tiếp ${e(partChar)} <span data-ha-icon aria-hidden="true">${open ? '－' : '＋'}</span></button>`
      + `<div class="ha-expand-panel" id="${e(panelId)}" role="region" aria-label="Phân tích tiếp ${e(partChar)}" ${open ? '' : 'hidden'}>`
      + `<div class="ha-subparts">${expansion.leaves.map(leaf => subpartHTML(leaf, data, profile?.components?.[leaf])).join('')}</div>`
      + (note ? `<p class="ha-subnote">${e(note)}</p>` : '')
      + '</div>'
      + (info.entry ? `<button class="ha-part-link" data-study-part="${e(partChar)}">Học ${e(partChar)} ↗</button>` : '');
  } else if (info.entry) {
    inner = `<button class="ha-part-link" data-study-part="${e(partChar)}">Khám phá ${e(partChar)} ↗</button>`;
  }
  return `<div class="ha-branch ${meta.cls}"><span class="ha-role">${meta.label}</span><strong lang="zh-CN">${e(partChar)}</strong>`
    + (info.pinyinLine ? `<span class="ha-pinyin">${e(info.pinyinLine)}</span>` : '')
    + (info.sinoLine ? `<small class="ha-sino">${e(info.sinoLine)}</small>` : '')
    + (info.note ? `<p>${e(info.note)}</p>` : '')
    + (!info.note && info.meaning ? `<p>${e(info.meaning)}</p>` : '')
    + inner + '</div>';
}

// A character is "partial" when its IDS tree contains a '？' leaf: in the
// Make Me a Hanzi source that marks a fused component shape which has no
// codepoint of its own. Partial characters are shown whole, with only the
// identified components listed — never with a placeholder card, and the
// remaining parts are never implied to be the whole character.
export function hanziPartialLeaves(entry) {
  const tree = decompositionTree(entry);
  if (!tree) return null;
  const leaves = idsLeaves(tree);
  if (!leaves.includes('？')) return null;
  return {identified: leaves.filter(leaf => leaf !== '？')};
}

export function renderHanziAnalysis(c, data, profile = {}) {
  const tree = decompositionTree(c);
  const leaves = tree ? idsLeaves(tree) : [];
  const layoutLabel = tree ? (idsLabels[tree.char] || '') : '';
  const partial = tree ? hanziPartialLeaves(c) : null;
  const sinoViet = profile.sinoViet || c.learningVi?.sinoViet || '';
  const shortMeaning = profile.shortMeaning || String(c.vi || '').split(';').map(s => s.trim()).filter(Boolean).join(' · ');
  const radicalName = data?.radicals?.[c.radical]?.nameVi || '';
  const radicalLabel = profile.radicalLabel || (c.radical ? `${c.radical}${radicalName ? ' · ' + radicalName : ''}` : 'Chưa có');
  const ancestors = new Set([c.char]);
  const cardFor = leaf => partCardHTML({rootChar: c.char, partChar: leaf, data, profile, depth: 1, ancestors});
  let mapInner;
  if (partial) {
    const hasStrokeMap = Array.isArray(data?.hanziPartials?.chars?.[c.char]?.known);
    mapInner = `<div class="ha-partial-figure" data-ha-partial="${e(c.char)}"><span class="ha-partial-glyph" lang="zh-CN">${e(c.char)}</span>`
      + (hasStrokeMap ? `<p class="ha-partial-legend"><span class="ha-dot ha-dot-known"></span>Phần đã nhận diện<span class="ha-dot ha-dot-unknown"></span>Phần chưa tách được</p>` : '')
      + '</div>'
      + `<h4 class="ha-partial-title">Thành phần đã nhận diện</h4><div class="ha-branches ha-branches-partial">${partial.identified.map(cardFor).join('')}</div>`
      + '<p class="ha-partial-note">Phân tích đầy đủ đang được bổ sung.</p>';
  } else if (tree) {
    mapInner = `<p class="ha-layout">Bố cục: ${e(profile.layoutNote || layoutLabel)}</p><div class="ha-branches">${leaves.map(cardFor).join('')}</div>`;
  } else {
    mapInner = `<p class="ha-unknown-tree">${e(profile.noTreeNote || 'Nguồn chưa có cây phân tích cho chữ này; app không đoán phần còn thiếu.')}</p>`;
  }
  const sources = (profile.sources || []).map(s => {
    const href = /^https:\/\//.test(String(s.href || '')) ? s.href : '';
    return `<p>${e(s.text)}${href ? ` <a href="${e(href)}" target="_blank" rel="noopener">${e(s.linkLabel || 'Nguồn ↗')}</a>` : ''}</p>`;
  }).join('');
  // "Vì sao ghép như vậy?" is shown only when the explanation rests on a
  // source etymology; shape-only descriptions are labelled as observation.
  const explainTitle = profile.explainHeading || (c.etymology ? 'Vì sao ghép như vậy?' : 'Nhìn chữ để nhớ');
  return `<section class="hanzi-analysis" aria-label="Phân tích chữ ${e(c.char)}"><div class="ha-heading"><span class="stage-kicker">01 / HIỂU CHỮ</span><span class="ha-badge">Giao diện mới</span></div><h3 class="stage-title">Hiểu từng phần, nhớ cả chữ.</h3><p class="ha-intro">${e(profile.intro || 'Nhìn bố cục trước, hiểu từng phần.')}</p>`
    + `<div class="ha-facts"><span><b>${e(sinoViet.toUpperCase())}</b>Hán–Việt</span><span><b>${c.strokeCount ? e(c.strokeCount) + ' nét' : 'Chưa có'}</b>Số nét</span><span><b lang="zh-CN">${e(radicalLabel)}</b>Bộ thủ</span></div>`
    + `<div class="ha-map"><div class="ha-root"><strong lang="zh-CN">${e(c.char)}</strong><span>${e((c.pinyin || []).join(' / '))}</span><small>${e(shortMeaning)}</small></div>`
    + mapInner
    + '</div>'
    + (profile.explain ? `<div class="ha-explain"><h4>${e(explainTitle)}</h4><p>${markedText(profile.explain, c, profile)}</p></div>` : '')
    + (profile.mnemonic ? `<div class="ha-memory"><span>MẸO NHỚ · TỰ LIÊN TƯỞNG</span><p>${markedText(profile.mnemonic, c, profile)}</p><small>${e(profile.mnemonicNote || 'Đây là mẹo học tập, không phải giải thích lịch sử chữ.')}</small></div>` : '')
    + `<button class="btn primary ha-write" data-stage="1">✎ Luyện viết${c.strokeCount ? ' ' + e(c.strokeCount) + ' nét' : ''} <span>→</span></button>`
    + (sources ? `<details class="ha-source"><summary>Nguồn dữ liệu & phạm vi</summary>${sources}<a href="./THIRD_PARTY_NOTICES.md" target="_blank" rel="noopener">Xem ghi nguồn và giấy phép ↗</a></details>` : '')
    + '</section>';
}

// Progressive enhancement for partial characters: replace the plain glyph
// in [data-ha-partial] figures with an SVG built from Hanzi Writer Data
// stroke paths (the same CDN source as the writing step), coloured by the
// verified per-stroke mapping in data/hanzi-partials.json. Any failure
// (offline, count mismatch) keeps the plain glyph and drops the legend —
// the identified-parts list below the figure stays correct either way.
export function enhanceHanziPartials(rootEl, data) {
  if (!rootEl?.querySelectorAll) return;
  rootEl.querySelectorAll('[data-ha-partial]').forEach(fig => {
    const char = fig.getAttribute('data-ha-partial');
    const known = data?.hanziPartials?.chars?.[char]?.known;
    const legend = fig.querySelector('.ha-partial-legend');
    if (!Array.isArray(known) || !known.length) { legend?.remove(); return; }
    const url = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/' + encodeURIComponent(char) + '.json';
    fetch(url, {signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined})
      .then(r => { if (!r.ok) throw new Error('stroke data'); return r.json(); })
      .then(d => {
        if (!Array.isArray(d?.strokes) || d.strokes.length !== known.length) throw new Error('stroke count');
        const paths = d.strokes.map((p, i) => `<path d="${e(p)}" class="${known[i] ? 'ha-stroke-known' : 'ha-stroke-unknown'}"/>`).join('');
        const svg = `<svg viewBox="0 0 1024 1024" class="ha-partial-svg" role="img" aria-label="Chữ ${e(char)}: phần đã nhận diện được tô màu"><g transform="translate(0,1024) scale(1,-1)">${paths}</g></svg>`;
        const glyph = fig.querySelector('.ha-partial-glyph');
        if (glyph) glyph.outerHTML = svg; else fig.insertAdjacentHTML('afterbegin', svg);
      })
      .catch(() => { legend?.remove(); });
  });
}
