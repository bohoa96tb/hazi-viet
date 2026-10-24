import fs from 'node:fs';
import assert from 'node:assert/strict';
import {auditLesson,lessonAudio} from '../../js/lesson-standard.js';

const read=f=>JSON.parse(fs.readFileSync(new URL('../../'+f,import.meta.url),'utf8'));
const course=read('data/vocabulary/hanzii-course.json');
const checkpoint=read('tools/vocabulary/review-checkpoint.json');
const batches=['review-001','review-002','review-003','review-004','review-005','review-006'].map(id=>read(`tools/vocabulary/reviews/${id}.json`));
const entries=batches.flatMap(batch=>batch.entries);
const byId=new Map(course.words.map(w=>[w.id,w]));
const ready=course.words.filter(w=>auditLesson(w).ready);
assert.equal(ready.length,checkpoint.scope.total,'Review scope must match structured lessons.');
assert.equal(checkpoint.reviewedIds.length,checkpoint.reviewedCount);
assert.deepEqual(checkpoint.reviewedIds,ready.slice(0,checkpoint.reviewedCount).map(w=>w.id),'Reviewed IDs must be a course-order prefix.');
assert.deepEqual(entries.map(e=>e.id),checkpoint.reviewedIds,'Review batch and checkpoint IDs differ.');
for(const entry of entries){
  const w=byId.get(entry.id);assert(w,`Missing review ID ${entry.id}`);assert.equal(auditLesson(w).ready,true,`${entry.hanzi} is not structurally ready`);
  assert.match(entry.difficulty,/^(dễ|trung bình|khó)$/);assert(entry.reason.length>10);assert.match(entry.status,/^reviewed$/);
  assert(lessonAudio(w).length>0,`${entry.hanzi} has no lesson audio plan`);
}
const you=byId.get('hz-h1-0a3f1c936624');
assert.equal(you.scene,'Bạn hỏi người đang nói chuyện có phải là giáo viên không.');
assert.equal(you.pattern,'你 + thời gian + hoạt động; 你 + 是 + người hoặc vai trò + 吗');
assert.equal(you.lesson.usages[0].intent,'Xác nhận người đang nói chuyện có phải là một người hoặc vai trò nào đó.');
assert(!JSON.stringify(you).includes('Hỏi người đang nói chuyện là ai.'));
assert(!JSON.stringify(you).includes('你 + 是 + danh tính + 吗'));
assert.equal(checkpoint.supplementation.status,'paused-until-review-complete');
console.log(`PASS review: ${checkpoint.reviewedCount}/${checkpoint.scope.total} reviewed; batch IDs, difficulty metadata, lesson/audio checks, and 你 correction verified; supplementation remains paused.`);
