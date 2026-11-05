// Reusable Hanzi analysis renderer for the "Hiểu chữ" study stage.
// Pure string rendering; the only state is branch expansion, kept in this
// module so it survives stage switches inside one study session.
// Only characters with an enabled profile in data/hanzi-analysis.json use
// this renderer; every other character keeps the legacy stage.
// See docs/HANZI_ANALYSIS_STANDARD.md.
import {escapeHTML as e, parseIDS, idsLabels} from './detail-view.js?v=3.0.0';

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
  if (partChar === '？') {
    return `<div class="ha-branch ha-unknown"><span class="ha-role">CHƯA XÁC ĐỊNH</span><strong lang="zh-CN">？</strong><p>Nguồn chưa xác định phần này; app không đoán thay.</p></div>`;
  }
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

export function renderHanziAnalysis(c, data, profile = {}) {
  const tree = decompositionTree(c);
  const leaves = tree ? idsLeaves(tree) : [];
  const layoutLabel = tree ? (idsLabels[tree.char] || '') : '';
  const sinoViet = profile.sinoViet || c.learningVi?.sinoViet || '';
  const shortMeaning = profile.shortMeaning || String(c.vi || '').split(';').map(s => s.trim()).filter(Boolean).join(' · ');
  const radicalName = data?.radicals?.[c.radical]?.nameVi || '';
  const radicalLabel = profile.radicalLabel || (c.radical ? `${c.radical}${radicalName ? ' · ' + radicalName : ''}` : 'Chưa có');
  const ancestors = new Set([c.char]);
  const branches = tree
    ? leaves.map(leaf => partCardHTML({rootChar: c.char, partChar: leaf, data, profile, depth: 1, ancestors})).join('')
    : '<p class="ha-unknown-tree">Nguồn chưa có cây phân tích cho chữ này; app không đoán phần còn thiếu.</p>';
  const sources = (profile.sources || []).map(s => {
    const href = /^https:\/\//.test(String(s.href || '')) ? s.href : '';
    return `<p>${e(s.text)}${href ? ` <a href="${e(href)}" target="_blank" rel="noopener">${e(s.linkLabel || 'Nguồn ↗')}</a>` : ''}</p>`;
  }).join('');
  return `<section class="hanzi-analysis" aria-label="Phân tích chữ ${e(c.char)}"><div class="ha-heading"><span class="stage-kicker">01 / HIỂU CHỮ</span><span class="ha-badge">Giao diện mới</span></div><h3 class="stage-title">Hiểu từng phần, nhớ cả chữ.</h3><p class="ha-intro">${e(profile.intro || 'Nhìn bố cục trước, hiểu từng phần.')}</p>`
    + `<div class="ha-facts"><span><b>${e(sinoViet.toUpperCase())}</b>Hán–Việt</span><span><b>${c.strokeCount ? e(c.strokeCount) + ' nét' : 'Chưa có'}</b>Số nét</span><span><b lang="zh-CN">${e(radicalLabel)}</b>Bộ thủ</span></div>`
    + `<div class="ha-map"><div class="ha-root"><strong lang="zh-CN">${e(c.char)}</strong><span>${e((c.pinyin || []).join(' / '))}</span><small>${e(shortMeaning)}</small></div>`
    + (tree ? `<p class="ha-layout">Bố cục: ${e(profile.layoutNote || layoutLabel)}</p><div class="ha-branches">${branches}</div>` : branches)
    + '</div>'
    + (profile.explain ? `<div class="ha-explain"><h4>Vì sao ghép như vậy?</h4><p>${markedText(profile.explain, c, profile)}</p></div>` : '')
    + (profile.mnemonic ? `<div class="ha-memory"><span>MẸO NHỚ · TỰ LIÊN TƯỞNG</span><p>${markedText(profile.mnemonic, c, profile)}</p><small>${e(profile.mnemonicNote || 'Đây là mẹo học tập, không phải giải thích lịch sử chữ.')}</small></div>` : '')
    + `<button class="btn primary ha-write" data-stage="1">✎ Luyện viết${c.strokeCount ? ' ' + e(c.strokeCount) + ' nét' : ''} <span>→</span></button>`
    + (sources ? `<details class="ha-source"><summary>Nguồn dữ liệu & phạm vi</summary>${sources}<a href="./THIRD_PARTY_NOTICES.md" target="_blank" rel="noopener">Xem ghi nguồn và giấy phép ↗</a></details>` : '')
    + '</section>';
}
