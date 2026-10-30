#!/usr/bin/env node
// Deterministic HAZI-VIET scheduler; never runs Muse or changes product code.
import fs from 'node:fs';
import crypto from 'node:crypto';

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (!token || !repository || !/^[\w.-]+\/[\w.-]+$/.test(repository)) {
  throw new Error('Missing GITHUB_TOKEN or GITHUB_REPOSITORY');
}

async function api(method, path, body) {
  const response = await fetch('https://api.github.com/repos/' + repository + path, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer ' + token,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  if (!response.ok) {
    throw new Error(method + ' ' + path + ': HTTP ' + response.status + ' ' +
      (await response.text()).slice(0, 300));
  }
  return response.json();
}

async function paginate(path) {
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const items = await api('GET', path + (path.includes('?') ? '&' : '?') +
      'per_page=100&page=' + page);
    if (!Array.isArray(items)) throw new Error('Expected array at ' + path);
    all.push(...items);
    if (items.length < 100) return all;
  }
  throw new Error('Too many items: cannot scan without risking duplicates');
}

function pendingAction(md) {
  const m = md.match(/\*\*Hành động đang chờ:\*\*\s*([\s\S]*?)(?=\n\s*\n|\n\|)/i);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}
function short(s, n = 700) {
  return s.length <= n ? s : s.slice(0, n - 1) + '…';
}

async function run() {
  const md = fs.readFileSync('docs/PRACTICE_CHECKPOINT.md', 'utf8');
  const progress = JSON.parse(fs.readFileSync('progress.json', 'utf8'));
  const checkpoint = JSON.parse(fs.readFileSync('checkpoint.json', 'utf8'));
  const pending = pendingAction(md);
  if (!pending) throw new Error('Pending-action heading absent');
  const done = progress.completedCount;
  const total = checkpoint.scopeTotal;
  if (!Number.isInteger(done) || done !== checkpoint.completedCount ||
      !Number.isInteger(total) || done < 0 || done > total) {
    throw new Error('Vocabulary progress/checkpoint mismatch');
  }

  const [prs, entries] = await Promise.all([
    paginate('/pulls?state=open'),
    paginate('/issues?state=all')
  ]);
  const issues = entries.filter(x => !x.pull_request);
  const dashboardMark = '<!-- hazi-ai-dashboard-v1 -->';
  const taskMark = '<!-- hazi-ai-next-task-v1 -->';
  const dashboard = issues.find(i => (i.body || '').includes(dashboardMark));
  const tasks = issues.filter(i => i.state === 'open' &&
    (i.body || '').includes(taskMark));
  const waitingConsent = /chỉ làm khi người dùng nhắn|chờ người dùng|chờ xác nhận/i.test(pending);
  const status = prs.length ? 'TẠM DỪNG — PR đang mở'
    : tasks.length ? 'ĐÃ XẾP HÀNG — chờ xử lý Issue'
    : waitingConsent ? 'CHỜ XÁC NHẬN CỦA NGƯỜI DÙNG'
    : 'SẴN SÀNG XẾP HÀNG';
  const sha = (process.env.GITHUB_SHA || '').slice(0, 12);
  const prList = prs.length ? prs.map(p =>
    '- [#' + p.number + '](' + p.html_url + ') ' + p.title.replace(/\n/g, ' ')
  ).join('\n') : '- Không có';
  const taskList = tasks.length ? tasks.map(i =>
    '- [#' + i.number + '](' + i.html_url + ')'
  ).join('\n') : '- Không có';
  const body = [
    dashboardMark,
    '# Theo dõi AI Manager — HAZI-VIET',
    '',
    '> GitHub Actions cập nhật từ main, không phải trạng thái nội bộ của Muse.',
    '',
    '- Main SHA: ' + sha,
    '- Từ vựng: **' + done + '/' + total + '** (không gồm tiến độ Thực hành)',
    '- Trạng thái: **' + status + '**',
    '- Hành động trong checkpoint: ' + short(pending),
    '',
    '## PR đang mở',
    prList,
    '',
    '## Issue nhiệm vụ đang mở',
    taskList,
    '',
    '## Quy tắc',
    '- PR đang mở hoặc tiến độ lệch: không khởi tạo việc tiếp theo.',
    '- Điểm dừng đòi người dùng xác nhận: không tự vượt qua.',
    '- Chỉ xếp hàng bằng Issue; không gọi Muse Web, không sửa code, không merge.',
    '- Chạy AI thực sự ngoài chat cần một runner với API key riêng.',
    ''
  ].join('\n');
  if (!dashboard) {
    await api('POST', '/issues', {
      title: 'HAZI-VIET | Bảng theo dõi AI Manager', body
    });
  } else if (dashboard.state === 'open' && dashboard.body !== body) {
    await api('PATCH', '/issues/' + dashboard.number, { body });
  }

  let newTask = null;
  if (!prs.length && !tasks.length && !waitingConsent) {
    const fingerprint = crypto.createHash('sha256')
      .update(md + '\n' + pending).digest('hex').slice(0, 20);
    const previous = issues.find(i => (i.body || '').includes(taskMark) &&
      (i.body || '').includes('fingerprint=' + fingerprint));
    if (!previous) {
      const taskBody = [
        taskMark,
        '<!-- fingerprint=' + fingerprint + ' -->',
        '# Công việc tiếp theo từ HAZI-VIET checkpoint',
        '',
        '- Main SHA lúc xếp hàng: ' + sha,
        '- Nhiệm vụ: ' + short(pending),
        '',
        '1. Đọc AGENTS.md, AI_WORKFLOW.md nếu đã merge và checkpoint mới nhất.',
        '2. Phân vai Chinese Expert / Developer / QA độc lập, chỉ một agent ghi file.',
        '3. Tối đa 3 vòng sửa và tạo PR chờ người dùng duyệt.',
        '4. Không tự merge, không tuyên bố kiểm thử khi chưa chạy.',
        '',
        '> Issue này KHÔNG chứng minh Muse Web đã tự nhận việc.',
        ''
      ].join('\n');
      newTask = await api('POST', '/issues', {
        title: 'HAZI-VIET | Nhiệm vụ tiếp theo từ checkpoint',
        body: taskBody
      });
    }
  }
  const report = [
    '## HAZI-VIET scheduler',
    '',
    '- Main: ' + sha,
    '- Vocabulary: ' + done + '/' + total,
    '- State: ' + status,
    '- Open PRs: ' + prs.length,
    '- Open task Issues: ' + tasks.length,
    '- Created new task: ' + (newTask ? '#' + newTask.number : 'no'),
    '- Pending: ' + short(pending),
    '',
    '**Scheduler does not run coding agents or merge PRs.**',
    ''
  ].join('\n');
  if (summaryPath) fs.appendFileSync(summaryPath, report);
  console.log(report);
}
run().catch(error => {
  console.error('HAZI-VIET scheduler failed:', error.message);
  if (summaryPath) fs.appendFileSync(summaryPath,
    '## HAZI-VIET scheduler failed\n\n' + error.message + '\n');
  process.exitCode = 1;
});
