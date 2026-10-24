import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {auditLesson} from '../../js/lesson-standard.js';
import {validateCourse} from '../../js/vocabulary-course.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const write=(file,value)=>fs.writeFileSync(path.join(root,file),JSON.stringify(value,null,2)+'\n');
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const fileDigest=file=>createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
const coursePath='data/vocabulary/hanzii-course.json';
const auditPath='data/vocabulary/content-audit.json';
const baselinePath='tools/vocabulary/baseline.json';
const checkpointPath='tools/vocabulary/v3-quality-revision-checkpoint.json';
const progressPath='progress.json';
const branch='content/vocabulary-2224';
const noTrapReason='Chưa thấy bẫy thông dụng cần lưu ý ở mức học này.';

function refresh(data,baseline,progress){
 const records=data.words.map(word=>({id:word.id,hanzi:word.hanzi,level:word.level,sourceIndex:word.sourceIndex,status:word.status,...auditLesson(word)}));
 const ready=records.filter(record=>record.ready).length;
 const summary={total:records.length,ready,pending:records.length-ready,byLevel:[1,2,3].map(level=>({level,total:records.filter(record=>record.level===level).length,ready:records.filter(record=>record.level===level&&record.ready).length})),note:'Kiểm tra độ đầy đủ và liên kết; chưa thay thế phản biện ngôn ngữ của giáo viên.'};
 data.contentAuditSummary=summary;
 data.editorial=`Đã rà soát ${summary.total} mục. ${summary.ready} mục đủ cấu trúc V1/V2/V3; còn ${summary.pending}. Trong đợt bổ sung ban đầu ${baseline.scopeTotal} mục, đã lưu nội dung cho ${progress.completedCount} mục trên nhánh ${branch}. Đủ cấu trúc chưa đồng nghĩa được giáo viên phản biện.`;
 write(coursePath,data);write(auditPath,{version:1,standard:'V1/V2/V3',summary,records});write(progressPath,progress);
}

function updateSourceDigests(checkpoint,progress){
 checkpoint.sourceDigests={algorithm:'sha256',courseFile:fileDigest(coursePath),baselineFile:fileDigest(baselinePath),standardFile:fileDigest('docs/CONTENT_STANDARD_V3.md'),agentsFile:fileDigest('AGENTS.md'),rendererFile:fileDigest('js/lesson-v3-view.js'),vocabularyScriptFile:fileDigest('js/vocabulary.js'),vocabularyHtmlFile:fileDigest('vocabulary.html'),domTestFile:fileDigest('tools/vocabulary/test-dom.mjs'),progressFile:fileDigest(progressPath)};
}

const [command='apply',argument]=process.argv.slice(2);
assert.equal(execFileSync('git',['branch','--show-current'],{cwd:root,encoding:'utf8'}).trim(),branch,'Use the designated content branch.');
assert.equal(command,'apply','Only the apply command is supported.');
assert(argument,'Provide a quality-revision batch JSON path.');

const data=read(coursePath),baseline=read(baselinePath),progress=read(progressPath),checkpoint=read(checkpointPath),batch=read(argument);
validateCourse(data);
assert.equal(checkpoint.scopeTotal,2224);
assert(Array.isArray(batch.entries)&&batch.entries.length>0,'Quality revision batch must contain entries.');
const expected=baseline.orderedIds.slice(checkpoint.reviewedThroughOrdinal,checkpoint.reviewedThroughOrdinal+batch.entries.length);
assert.deepEqual(batch.entries.map(entry=>entry.id),expected,'Quality revision must follow the fixed baseline order.');
assert.equal(checkpoint.reviewedIds.length,checkpoint.reviewedThroughOrdinal);

const revisedWords=[];
for(const entry of batch.entries){
 const index=data.words.findIndex(word=>word.id===entry.id),current=data.words[index];
 assert(index>=0,'Word not found: '+entry.id);assert.equal(current.hanzi,entry.hanzi);assert.equal(entry.cohortOrdinal,checkpoint.reviewedThroughOrdinal+1+revisedWords.length);
 const lesson=entry.lesson||{...current.lesson,...entry.lessonPatch};
 assert.equal(lesson.cohortOrdinal,entry.cohortOrdinal);assert.equal(lesson.difficulty,entry.difficulty);
 const revised={...current,...entry.wordEdits,lesson,examples:entry.examples||current.examples,status:'deep'};
 const audit=auditLesson(revised);assert(audit.ready,entry.id+': '+JSON.stringify(audit.issues));
 data.words[index]=revised;progress.completedDigests[entry.id]=digest(revised);revisedWords.push(revised);
}

const from=checkpoint.reviewedThroughOrdinal+1;
for(const [index,word] of revisedWords.entries()){
 const entry=batch.entries[index],retained=entry.result==='retained';
 checkpoint.reviewedIds.push(word.id);checkpoint.passedIds.push(word.id);if(retained)checkpoint.retainedIds.push(word.id);else checkpoint.rewrittenIds.push(word.id);checkpoint.currentDigests[word.id]=digest(word);checkpoint.reviewRecords.push({ordinal:word.lesson.cohortOrdinal,id:word.id,result:retained?'retained':'passed-after-rewrite',difficulty:word.lesson.difficulty,reason:word.lesson.difficultyReason});checkpoint.difficultyCountsReviewed[word.lesson.difficulty]++;
}
checkpoint.reviewedThroughOrdinal+=revisedWords.length;checkpoint.nextOrdinal=checkpoint.reviewedThroughOrdinal+1;checkpoint.pendingReviewCount=checkpoint.scopeTotal-checkpoint.reviewedThroughOrdinal;checkpoint.passedCount+=revisedWords.length;checkpoint.rewrittenCount+=batch.entries.filter(entry=>entry.result!=='retained').length;checkpoint.retainedCount+=batch.entries.filter(entry=>entry.result==='retained').length;checkpoint.lastBatch=batch.id;checkpoint.status='worktree-prepared';checkpoint.validation={...checkpoint.validation,qualityRevision:'pending',processBatchVerify:'pending',v3LevelTests:'pending',domIntegration:'pending',gitDiffCheck:'pending'};checkpoint.note='Checkpoint kiểm định chất lượng riêng; nội dung được sửa không làm tăng số mục hoàn thành baseline.';
refresh(data,baseline,progress);validateCourse(data);updateSourceDigests(checkpoint,progress);write(checkpointPath,checkpoint);
console.log(`Prepared quality revision ${from}–${checkpoint.reviewedThroughOrdinal}; baseline completion remains ${progress.completedCount}/${progress.scopeTotal}.`);
