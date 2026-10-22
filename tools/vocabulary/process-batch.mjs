// GitHub is authoritative: run only in a fresh checkout of the designated branch.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {auditLesson,lessonAudio,checkAudio} from '../../js/lesson-standard.js';
import {validateCourse} from '../../js/vocabulary-course.js';
import {buildPlaylist} from '../../js/vocabulary-audio.js';
import {renderStandardLesson} from '../../js/lesson-standard-view.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const write=(f,x)=>fs.writeFileSync(path.join(root,f),JSON.stringify(x,null,2)+'\n');
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const coursePath='data/vocabulary/hanzii-course.json',auditPath='data/vocabulary/content-audit.json';
const baselinePath='tools/vocabulary/baseline.json',branch='content/vocabulary-2224';
const data=read(coursePath);validateCourse(data);
const byId=new Map(data.words.map(w=>[w.id,w]));
const branchName=execFileSync('git',['branch','--show-current'],{cwd:root,encoding:'utf8'}).trim();
assert.equal(branchName,branch,'Use the designated content branch; never main.');
const [command='verify',argument]=process.argv.slice(2);
function assertProgress(b,p){
 assert.equal(b.repository,'bohoa96tb/hazi-viet');assert.equal(p.branch,branch);
 assert.equal(b.orderedIds.length,b.scopeTotal);assert.equal(b.scopeTotal,2224);
 assert.equal(new Set(b.orderedIds).size,b.scopeTotal);
 assert.deepEqual(data.words.map(w=>w.id),b.courseOrderedIds,'Course membership/order changed.');
 assert.deepEqual(data.lessons,b.lessons,'Lesson membership/order changed.');
 assert.deepEqual(p.completedIds,b.orderedIds.slice(0,p.completedIds.length),'Progress must be an uninterrupted prefix of the fixed cohort.');
 assert.equal(p.completedCount,p.completedIds.length);assert.equal(p.remaining,b.scopeTotal-p.completedCount);
 assert.equal(p.lastCompletedId,p.completedIds.at(-1)||null);
 assert.equal(p.lastCompletedOrdinal,p.completedCount);
 assert.deepEqual(p.nextIds,b.orderedIds.slice(p.completedCount,p.completedCount+12));
 for(const id of b.initialCompleteIds){assert(auditLesson(byId.get(id)).ready);assert.equal(digest(byId.get(id)),b.protectedDigests[id],'Previously complete word changed: '+id);}
 for(const id of p.completedIds){assert(auditLesson(byId.get(id)).ready);assert.equal(digest(byId.get(id)),p.completedDigests[id],'Completed word changed: '+id);}
 for(const id of b.orderedIds.slice(p.completedCount))assert.equal(auditLesson(byId.get(id)).ready,false,'Untracked complete record: '+id);
 const actual=data.words.filter(w=>auditLesson(w).ready).length;
 assert.equal(actual,b.initialCompleteIds.length+p.completedCount);
 return actual;
}
function refresh(b,p){
 const records=data.words.map(w=>({id:w.id,hanzi:w.hanzi,level:w.level,sourceIndex:w.sourceIndex,status:w.status,...auditLesson(w)}));
 const ready=records.filter(r=>r.ready).length;
 const summary={total:records.length,ready,pending:records.length-ready,byLevel:[1,2,3].map(level=>({level,total:records.filter(r=>r.level===level).length,ready:records.filter(r=>r.level===level&&r.ready).length})),note:'Kiểm tra độ đầy đủ và liên kết; chưa thay thế phản biện ngôn ngữ của giáo viên.'};
 data.contentAuditSummary=summary;
 data.editorial=`Đã rà soát ${summary.total} mục. ${summary.ready} mục đủ cấu trúc 5.1–5.6; còn ${summary.pending}. Trong đợt bổ sung ban đầu ${b.scopeTotal} mục, đã lưu nội dung cho ${p.completedCount} mục trên nhánh ${branch}. Đủ cấu trúc chưa đồng nghĩa được giáo viên phản biện.`;
 write(coursePath,data);write(auditPath,{version:1,standard:'5.1–5.6',summary,records});write('progress.json',p);
 const next=p.nextIds.map(id=>byId.get(id));
 fs.writeFileSync(path.join(root,'docs/PROGRESS.md'),`# Tiến độ nội dung trên nhánh biên soạn\n\nPhạm vi: ${b.scopeTotal} mục chưa đủ cấu trúc tại commit gốc ${b.sourceCommit}. Không gồm ${b.initialCompleteIds.length} mục đã có trước đó.\n\nĐã bổ sung: ${p.completedCount}/${b.scopeTotal}. Còn: ${p.remaining}. Toàn khóa đủ cấu trúc: ${ready}/${data.words.length}.\n\n## Các đợt đã đưa vào dữ liệu\n\n${p.batches.map(x=>'- '+x.id+' · mục '+x.ordinalFrom+'–'+x.ordinalTo+' · '+x.wordIds.map(id=>byId.get(id).hanzi).join('、')).join('\n')}\n\n## 12 mục tiếp theo\n\n${next.map(w=>'- '+w.hanzi+' · '+w.id).join('\n')}\n\nTrạng thái lưu chính thức phải đối chiếu HEAD GitHub và progress.json; bài đủ mẫu chưa được giáo viên phản biện độc lập. Nhánh này không tự triển khai lên website/main.\n`);
 const cache=p.batches.at(-1)?.id;
 if(cache){
  const js=path.join(root,'js/vocabulary.js'),html=path.join(root,'vocabulary.html');
  fs.writeFileSync(js,fs.readFileSync(js,'utf8').replace(/hanzii-course\.json\?v=[^']+/, 'hanzii-course.json?v='+cache));
  fs.writeFileSync(html,fs.readFileSync(html,'utf8').replace(/(\.\/js\/vocabulary\.js\?v=)[^"]+/, '$1'+cache));
 }
}
if(command==='init'){
 assert(!fs.existsSync(path.join(root,'progress.json')),'Progress already exists; reconcile instead of reinitializing.');
 const initial=data.words.filter(w=>auditLesson(w).ready),pending=data.words.filter(w=>!auditLesson(w).ready);
 assert.equal(initial.length,10);assert.equal(pending.length,2224);
 const sourceCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
 const baseline={schemaVersion:1,repository:'bohoa96tb/hazi-viet',sourceCommit,coursePath,scopeTotal:pending.length,initialCompleteIds:initial.map(w=>w.id),protectedDigests:Object.fromEntries(initial.map(w=>[w.id,digest(w)])),orderedIds:pending.map(w=>w.id),courseOrderedIds:data.words.map(w=>w.id),lessons:data.lessons};
 const progress={schemaVersion:1,repository:baseline.repository,branch,baselinePath,standardPath:'docs/CONTENT_STANDARD.md',scopeTotal:pending.length,initialCompleteOutsideScope:initial.length,completedCount:0,remaining:pending.length,lastCompletedOrdinal:0,lastCompletedId:null,completedIds:[],completedDigests:{},nextIds:baseline.orderedIds.slice(0,12),batches:[],lastVerifiedContentCommit:null,lastVerifiedContentCommitUrl:null,verificationNote:'Commit chứa nội dung được ghi sau khi đã xác nhận nhánh GitHub. Không lưu SHA tự tham chiếu của chính commit đang ghi file này.'};
 write(baselinePath,baseline);refresh(baseline,progress);console.log('Initialized fixed cohort of 2,224 records; no unverified completions.');
}else{
 const b=read(baselinePath),p=read('progress.json');assertProgress(b,p);
 if(command==='apply'){
  assert(argument,'Provide an authored batch JSON path.');const batch=read(argument);
  assert(!p.batches.some(x=>x.id===batch.id),'Batch already applied.');
  assert(batch.entries.length>=Math.min(12,p.remaining),'Default batch is 12.');
  const expected=b.orderedIds.slice(p.completedCount,p.completedCount+batch.entries.length);
  assert.deepEqual(batch.entries.map(e=>e.id),expected,'Only the next uncompleted cohort records may be edited.');
  // Catalog/example records may not yet have the recognition and comparison
  // fields required by validateCourse for a completed lesson.
  const allowed=new Set(['meaning','intro','task','model','quiz','more','editorialStatus','shape','near']);
  // Validate every draft before touching files; abort atomically on invalid content.
  const drafts=batch.entries.map(entry=>{
   const w=structuredClone(byId.get(entry.id));assert.equal(w.hanzi,entry.hanzi);assert(!auditLesson(w).ready);
   for(const [key,value]of Object.entries(entry.wordEdits||{})){assert(allowed.has(key),'Out-of-scope edit: '+key);w[key]=value;}
   w.lesson=entry.lesson;w.examples=entry.lesson.examples;w.status='deep';
   const a=auditLesson(w);assert(a.ready,w.id+': '+JSON.stringify(a.issues));
   return w;
  });
  for(const w of drafts){data.words[data.words.findIndex(x=>x.id===w.id)]=w;byId.set(w.id,w);p.completedIds.push(w.id);p.completedDigests[w.id]=digest(w);}
  const from=p.completedCount+1;p.completedCount+=drafts.length;p.remaining=b.scopeTotal-p.completedCount;
  p.lastCompletedOrdinal=p.completedCount;p.lastCompletedId=p.completedIds.at(-1);p.nextIds=b.orderedIds.slice(p.completedCount,p.completedCount+12);
  p.batches.push({id:batch.id,ordinalFrom:from,ordinalTo:p.completedCount,wordIds:drafts.map(w=>w.id),contentFile:argument,authorship:batch.authorship,contentCommit:null});
  assertProgress(b,p);validateCourse(data);refresh(b,p);
  console.log(`Prepared ${from}–${p.completedCount}; ${p.completedCount}/${p.scopeTotal}; remaining ${p.remaining}. Remote confirmation still required.`);
 }else if(command==='refresh'){
  assertProgress(b,p);refresh(b,p);console.log('Refreshed report and cache identifiers; content and completion count unchanged.');
 }else if(command==='verify'){
  const actual=assertProgress(b,p),report=read(auditPath);
  assert.equal(report.records.length,data.words.length);assert.equal(report.summary.ready,actual);assert.equal(report.summary.pending,p.remaining);
  assert.deepEqual(data.contentAuditSummary,report.summary);
  for(const w of data.words){const a=auditLesson(w),r=report.records.find(x=>x.id===w.id);assert.equal(w.status==='deep',a.ready);assert.deepEqual(r,{id:w.id,hanzi:w.hanzi,level:w.level,sourceIndex:w.sourceIndex,status:w.status,...a});}
  const ready=data.words.filter(w=>auditLesson(w).ready);let wrong=0;
  for(const w of ready){
   const l=w.lesson;
   // Exercise the actual renderer as well as the structural audit: stage 0
   // requires provenance fields that auditLesson alone does not currently check.
   const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
   const render=options=>{const html=renderStandardLesson(w,{esc:escape,hanzi:escape,rich:escape,checkState:new Map(),...options});assert.equal(typeof html,'string',w.id+': renderer must return HTML');assert(html.length>0);};
   render({stage:0});
   for(let i=0;i<l.usages.length;i++)render({stage:1,view:'usages',usageIndex:i});
   for(let i=0;i<l.examples.length;i++)render({stage:1,view:'examples',exampleIndex:i});
   for(let i=0;i<l.traps.length;i++){
    render({stage:2,trapIndex:i});
    const id=l.traps[i].checkId;
    if(id)render({stage:2,trapIndex:i,checkState:new Map([[w.id+':'+id,'requested']])});
   }
   for(let i=0;i<l.examples.length;i++)assert.deepEqual(lessonAudio(w,'example-only',i).map(s=>[s.lang,s.text]),[['zh-CN',l.examples[i].zh]]);
   const full=lessonAudio(w);assert(full.length);assert(full.every(s=>!w.intro.some(x=>s.text.includes(x.pinyin))));
   for(let i=0;i<l.traps.length;i++)for(const c of l.traps[i].cases.filter(c=>c.judgment==='wrong-grammar')){
    wrong++;const audio=lessonAudio(w,'traps',i),at=audio.findIndex(s=>s.label==='Câu đối chiếu'&&s.text===c.zh);assert(at>0);assert.equal(audio[at-1].text,'Đây là câu sai để phân tích.');
    const fix=l.traps[i].corrections.find(r=>r.caseId===c.id);assert(audio.slice(at+1).some(s=>s.label==='Câu sửa đúng'&&s.text===fix.zh));assert(!buildPlaylist([w],'immersion').some(s=>s.text===c.zh));
   }
   const tagged=structuredClone(w);if(tagged.lesson.checks.length){const q=tagged.lesson.checks[0];q.question='QUESTION_SENTINEL';tagged.lesson.answers[q.id].explanation='ANSWER_SENTINEL';assert(!lessonAudio(tagged).some(s=>/QUESTION_SENTINEL|ANSWER_SENTINEL/.test(s.text)));assert.throws(()=>checkAudio(tagged,q.id,'answer'));assert(checkAudio(tagged,q.id,'answer',{revealed:true}).some(s=>s.text.includes('ANSWER_SENTINEL')));}
  }
  assert.equal(buildPlaylist(data.words.filter(w=>!auditLesson(w).ready),'podcast').length,0);
  assert.equal(new Set(buildPlaylist(data.words,'podcast').map(s=>s.wordId)).size,actual);
  const sample=structuredClone(ready[0]);delete sample.lesson.meaning.boundary;assert(!auditLesson(sample).ready);
  const tampered=structuredClone(p);tampered.completedIds.reverse();assert.throws(()=>assertProgress(b,tampered));
  console.log(`PASS: ${data.words.length} IDs and lesson links; fixed cohort and protected content hashes; ${p.completedCount}/${b.scopeTotal} completed; ${p.remaining} remaining; ${actual} structured lessons and renderer views; ${wrong} wrong contrast sentences warned/corrected; example audio and isolated answers; pending podcasts blocked. Browser/device playback and teacher review not verified.`);
 }else throw Error('Unknown command: '+command);
}
