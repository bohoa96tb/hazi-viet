import assert from 'node:assert/strict';

const strip = value => String(value ?? '').replace(/[\\s。！？!?，,、；;：:“”"'‘’（）()]/gu, '');
const wordsOf = value => strip(value).split('');
const similarity = (a,b) => {
  const aa=wordsOf(a),bb=wordsOf(b),row=Array.from({length:bb.length+1},(_,i)=>i);
  for(let i=1;i<=aa.length;i++){
    let prev=row[0];row[0]=i;
    for(let j=1;j<=bb.length;j++){
      const old=row[j];
      row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(aa[i-1]===bb[j-1]?0:1));
      prev=old;
    }
  }
  return 1-row[bb.length]/Math.max(aa.length,bb.length,1);
};
const sentenceText = trap => [...(trap.cases??[]).map(c=>c.zh),trap.replacement?.explanation,trap.boundary,trap.tip].join(' ');
const pairTerms = title => {
  const match=String(title??'').match(/^(.+?)\s+và\s+([^:：]+)/u);
  const terms=match ? match.slice(1).map(x=>strip(x)) : [];
  return terms.length===2&&terms.every(x=>/[\p{Script=Han}]/u.test(x)) ? terms : [];
};
const targetForms = (word,answer) => answer.targetForms?.length ? answer.targetForms : word.lesson.targetForms?.length ? word.lesson.targetForms : [word.hanzi];
const targetSatisfied = (model,forms) => forms.some(form=>String(form)&&model.includes(form)) || forms.some(form=>String(form).length>1&&[...form].every(char=>model.includes(char)));

export function qualityWarnings(words,{nearThreshold=0.78}={}) {
  const warnings=[];
  for(const word of words.filter(w=>w.lesson?.version===2)){
    const examples=word.lesson.examples??[];
    const exampleText=examples.map(e=>strip(e.zh));
    for(const use of word.lesson.selfUse??[]){
      const answer=word.lesson.selfAnswers?.[use.id];
      if(!answer) continue;
      const model=strip(answer.model);
      const exact=exampleText.findIndex(x=>x===model);
      if(exact>=0) warnings.push({kind:'self-example-exact',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,exampleId:examples[exact]?.id,model:answer.model});
      else {
        const best=Math.max(0,...exampleText.map(x=>similarity(model,x)));
        if(best>=nearThreshold) warnings.push({kind:'self-example-near',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,similarity:Number(best.toFixed(2)),model:answer.model});
      }
      if(!answer.targetOptional && !targetSatisfied(String(answer.model??''),targetForms(word,answer))) warnings.push({kind:'self-target-missing',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,model:answer.model,targetForms:targetForms(word,answer)});
    }
    for(const trap of word.lesson.traps??[]){
      const terms=pairTerms(trap.title);
      const text=sentenceText(trap);
      for(const term of terms) if(term && !text.includes(term)) warnings.push({kind:'trap-pair-missing-example',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,trapId:trap.id,title:trap.title,missingTerm:term});
      for(const c of trap.cases??[]){
        if(c.judgment==='wrong-grammar') {
          const correction=(trap.corrections??[]).find(x=>x.caseId===c.id);
          if(!correction) warnings.push({kind:'wrong-grammar-missing-correction',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,trapId:trap.id,caseId:c.id});
        }
      }
    }
  }
  return warnings;
}

export function assertFreshV2(words) {
  const warnings=qualityWarnings(words);
  const blocking=warnings.filter(x=>['self-example-exact','self-target-missing','trap-pair-missing-example','wrong-grammar-missing-correction'].includes(x.kind));
  assert.equal(blocking.length,0,'New V2 quality warnings: '+JSON.stringify(blocking));
  return warnings;
}

function selfTest(){
  const base={id:'fixture',hanzi:'词',intro:[{pinyin:'cí'}],lesson:{version:2,examples:[{id:'e1',zh:'我学词。'},{id:'e2',zh:'他会用词。'}],selfUse:[{id:'s1',prompt:'x'}],selfAnswers:{s1:{model:'我学词。'}},traps:[{id:'t1',title:'甲 và 乙: đối chiếu',cases:[{id:'c1',zh:'甲句。'},{id:'c2',zh:'甲句 khác.'}],replacement:{result:'different-meaning',explanation:'甲 vẫn có.'},boundary:'Không có ví dụ cho phía thứ hai.',tip:'x'}]}};
  const warnings=qualityWarnings([base]);
  assert(warnings.some(x=>x.kind==='self-example-exact'));
  assert(warnings.some(x=>x.kind==='trap-pair-missing-example'));
  assert.throws(()=>assertFreshV2([base]));
  const valid=structuredClone(base);valid.lesson.selfAnswers.s1={model:'Tôi dùng 词 trong câu mới.',targetForms:['词']};valid.lesson.traps=[];assert.equal(qualityWarnings([valid]).filter(x=>x.kind==='self-example-exact'||x.kind==='self-target-missing').length,0);
  assert.doesNotThrow(()=>assertFreshV2([valid]));
  console.log('PASS quality-audit self-tests: exact/near/target/trap/correction paths.');
}
if(process.argv.includes('--self-test')) selfTest();
if(import.meta.url===`file://${process.argv[1]}`&&!process.argv.includes('--self-test')){
  const fs=await import('node:fs');
  const course=JSON.parse(fs.readFileSync(new URL('../../data/vocabulary/hanzii-course.json',import.meta.url),'utf8'));
  const warnings=qualityWarnings(course.words);
  const counts=Object.fromEntries([...new Set(warnings.map(x=>x.kind))].map(k=>[k,warnings.filter(x=>x.kind===k).length]));
  console.log(JSON.stringify({v2:course.words.filter(w=>w.lesson?.version===2).length,totalWarnings:warnings.length,counts,sample:warnings.slice(0,40)},null,2));
}
