import assert from 'node:assert/strict';
import {isPinyinText} from '../../js/lesson-v2.js';

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
const sentenceText = trap => (trap.cases??[]).map(c=>c.zh).join(' ');
const pairTerms = title => {
  const match=String(title??'').match(/^(.+?)\s+và\s+([^:：]+)/u);
  const terms=match ? match.slice(1).map(x=>strip(x)) : [];
  return terms.length===2&&terms.every(x=>/[\p{Script=Han}]/u.test(x)) ? terms : [];
};
const targetForms = (word,answer) => answer.targetForms?.length ? answer.targetForms : word.lesson.targetForms?.length ? word.lesson.targetForms : [word.hanzi];
const targetSatisfied = (model,forms) => forms.some(form=>String(form)&&model.includes(form)) || forms.some(form=>String(form).length>1&&[...form].every(char=>model.includes(char)));
const semanticRules=[
  {kind:'role',id:'first-person',prompt:/\btôi\b/iu,forms:['我']},
  {kind:'role',id:'listener',prompt:/\bbạn\b(?!\s*(?:trai|gái|bè|của))/iu,forms:['你']},
  {kind:'role',id:'we',prompt:/\bchúng ta\b/iu,forms:['我们']},
  {kind:'role',id:'he',prompt:/\banh ấy\b/iu,forms:['他']},
  {kind:'role',id:'she',prompt:/\bcô ấy\b/iu,forms:['她']},
  {kind:'role',id:'older-sister',prompt:/\bchị gái\b/iu,forms:['姐姐']},
  {kind:'role',id:'younger-sister',prompt:/\bem gái\b/iu,forms:['妹妹']},
  {kind:'action',id:'stand',prompt:/đứng/iu,forms:['站']},
  {kind:'action',id:'sit',prompt:/ngồi/iu,forms:['坐']},
  {kind:'action',id:'turn-right',prompt:/rẽ phải/iu,forms:['转','右']},
  {kind:'action',id:'left-hand',prompt:/tay trái/iu,forms:['左手']},
  {kind:'action',id:'open-door',prompt:/mở cửa/iu,forms:['开门']},
  {kind:'action',id:'wait',prompt:/đợi/iu,forms:['等']},
  {kind:'object',id:'wait-for-you',prompt:/đợi bạn/iu,forms:['你']},
  {kind:'object',id:'wait-for-customer',prompt:/đợi khách/iu,forms:['客人']},
  {kind:'object',id:'introduce-your-friend',prompt:/giới thiệu bạn của mình/iu,forms:['朋友']},
  {kind:'action',id:'do-not-enter',prompt:/đừng vào/iu,forms:['别进']},
  {kind:'action',id:'write-comment',prompt:/viết nhận xét/iu,forms:['写','评论']},
  {kind:'action',id:'drink-coffee',prompt:/uống cà phê/iu,forms:['喝咖啡']},
  {kind:'action',id:'read-book',prompt:/đọc sách/iu,forms:['看书','读书']},
  {kind:'action',id:'walk-and-call',prompt:/đi bộ/iu,forms:['走路','走']},
  {kind:'action',id:'call',prompt:/gọi điện thoại/iu,forms:['打电话']},
  {kind:'action',id:'go-home',prompt:/về nhà/iu,forms:['回家']},
  {kind:'place',id:'hospital',prompt:/bệnh viện/iu,forms:['医院']},
  {kind:'place',id:'station',prompt:/nhà ga/iu,forms:['车站']},
  {kind:'place',id:'school',prompt:/trường học/iu,forms:['学校']},
  {kind:'place',id:'classroom',prompt:/lớp học/iu,forms:['教室']},
  {kind:'place',id:'shop',prompt:/cửa hàng/iu,forms:['商店']},
  {kind:'place',id:'park',prompt:/công viên/iu,forms:['公园']},
  {kind:'place',id:'restaurant',prompt:/nhà hàng/iu,forms:['饭店']},
  {kind:'place',id:'cafe',prompt:/quán cà phê/iu,forms:['咖啡店']},
  {kind:'place',id:'bookshop',prompt:/hiệu sách/iu,forms:['书店']},
  {kind:'place',id:'post-office',prompt:/bưu điện/iu,forms:['邮局']},
  {kind:'place',id:'crossroads',prompt:/ngã tư/iu,forms:['路口']},
  {kind:'place',id:'door-at-home',prompt:/cửa nhà/iu,forms:['家门','门']},
  {kind:'place',id:'door',prompt:/\bcửa\b(?!\s*(?:hàng|sổ|nhà))/iu,forms:['门']},
  {kind:'place',id:'cabinet',prompt:/tủ/iu,forms:['柜子']},
  {kind:'place',id:'window',prompt:/cửa sổ/iu,forms:['窗户']},
  {kind:'place',id:'bed',prompt:/giường/iu,forms:['床']},
  {kind:'place',id:'post',prompt:/bài đăng/iu,forms:['文章']},
  {kind:'place',id:'bag',prompt:/\btúi\b/iu,forms:['包']},
  {kind:'place',id:'bicycle',prompt:/xe đạp/iu,forms:['自行车']},
  {kind:'place',id:'car',prompt:/chiếc xe/iu,forms:['车']},
  {kind:'direction',id:'south',prompt:/(?:phía|hướng) nam/iu,forms:['南']},
  {kind:'direction',id:'north',prompt:/(?:phía|hướng) bắc/iu,forms:['北']},
  {kind:'direction',id:'east',prompt:/(?:phía|hướng) đông/iu,forms:['东']},
  {kind:'direction',id:'west',prompt:/(?:phía|hướng) tây/iu,forms:['西']},
  {kind:'direction',id:'right',prompt:/bên phải/iu,forms:['右']},
  {kind:'direction',id:'left',prompt:/bên trái/iu,forms:['左']},
  {kind:'direction',id:'above',prompt:/phía trên/iu,forms:['上']},
  {kind:'direction',id:'below',prompt:/phía dưới/iu,forms:['下']},
  {kind:'direction',id:'beside',prompt:/bên cạnh/iu,forms:['旁边']}
];
const semanticOpposites=[
  {id:'this-that',prompt:/\b(?:bên này|phía này)\b/iu,expected:['这边'],opposite:['那边']},
  {id:'that-this',prompt:/\b(?:bên kia|phía kia)\b/iu,expected:['那边'],opposite:['这边']},
  {id:'left-right',prompt:/\bbên trái\b/iu,expected:['左','左边'],opposite:['右','右边']},
  {id:'right-left',prompt:/\bbên phải\b/iu,expected:['右','右边'],opposite:['左','左边']},
  {id:'above-below',prompt:/\b(?:phía trên|bên trên)\b/iu,expected:['上','上边','上面'],opposite:['下','下边','下面']},
  {id:'below-above',prompt:/\b(?:phía dưới|bên dưới)\b/iu,expected:['下','下边','下面'],opposite:['上','上边','上面']},
  {id:'front-back',prompt:/\b(?:phía trước|bên trước)\b/iu,expected:['前','前边','前面'],opposite:['后','后边','后面']},
  {id:'back-front',prompt:/\b(?:phía sau|bên sau)\b/iu,expected:['后','后边','后面'],opposite:['前','前边','前面']},
  {id:'inside-outside',prompt:/\b(?:bên trong|phía trong)\b/iu,expected:['里','里边','里面'],opposite:['外','外边','外面']},
  {id:'outside-inside',prompt:/\b(?:bên ngoài|phía ngoài)\b/iu,expected:['外','外边','外面'],opposite:['里','里边','里面']},
  {id:'presence-absence',prompt:/\bcó\b/iu,expected:['有'],opposite:['没','没有']},
  {id:'absence-presence',prompt:/\bkhông có\b/iu,expected:['没','没有'],opposite:['有']}
];

export function qualityWarnings(words,{nearThreshold=0.78}={}) {
  const warnings=[];
  for(const word of words.filter(w=>w.lesson?.version===2)){
    for(const reading of word.intro??[]) if(!isPinyinText(reading.pinyin)) warnings.push({kind:'invalid-pinyin',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,pinyin:reading.pinyin});
    const examples=word.lesson.examples??[];
    const exampleText=examples.map(e=>strip(e.zh));
    for(const use of word.lesson.selfUse??[]){
      const answer=word.lesson.selfAnswers?.[use.id];
      if(!answer){warnings.push({kind:'self-sync-missing-answer',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id});continue;}
      const requiredFields=['idea','frame','model','vi','criteria'];
      for(const field of requiredFields) if(answer[field]===undefined||answer[field]===null||answer[field]===''||(field==='criteria'&&(!Array.isArray(answer[field])||answer[field].length===0))) warnings.push({kind:'self-sync-missing-field',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,field});
      const model=strip(answer.model);
      const exact=exampleText.findIndex(x=>x===model);
      if(exact>=0) warnings.push({kind:'self-example-exact',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,exampleId:examples[exact]?.id,model:answer.model});
      else {
        const best=Math.max(0,...exampleText.map(x=>similarity(model,x)));
        if(best>=nearThreshold) warnings.push({kind:'self-example-near',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,similarity:Number(best.toFixed(2)),model:answer.model});
      }
      if(!answer.targetOptional && !targetSatisfied(String(answer.model??''),targetForms(word,answer))) warnings.push({kind:'self-target-missing',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,model:answer.model,targetForms:targetForms(word,answer)});
      const evidence=[answer.model,answer.frame,answer.idea,use.prompt].join(' ');
      for(const criterion of answer.criteria??[]) for(const token of String(criterion).match(/[\p{Script=Han}]+/gu)??[]){
        if(token.length>0&&!evidence.includes(token)) warnings.push({kind:'self-criteria-token-missing',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,criterion,token,model:answer.model});
      }
      for(const rule of semanticRules) if(rule.prompt.test(use.prompt)&&!rule.forms.some(form=>String(answer.model??'').includes(form))) warnings.push({kind:'self-prompt-model-anchor-missing',anchorKind:rule.kind,anchorId:rule.id,id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,prompt:use.prompt,model:answer.model,expected:rule.forms});
      for(const rule of semanticOpposites) if(rule.prompt.test(use.prompt)){
        const model=String(answer.model??'');
        if(!rule.expected.some(form=>model.includes(form))) warnings.push({kind:rule.opposite.some(form=>model.includes(form))?'self-semantic-antonym-mismatch':'self-semantic-anchor-missing',anchorKind:'opposite',anchorId:rule.id,id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,selfId:use.id,prompt:use.prompt,model:answer.model,expected:rule.expected,opposite:rule.opposite});
      }
    }
    for(const trap of word.lesson.traps??[]){
      const terms=trap.caseExampleTerms??pairTerms(trap.title);
      const text=sentenceText(trap);
      for(const term of terms) if(term && !text.includes(term)) warnings.push({kind:'trap-pair-missing-case-example',id:word.id,ordinal:word.lesson.cohortOrdinal,hanzi:word.hanzi,trapId:trap.id,title:trap.title,missingTerm:term});
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
  const blocking=warnings.filter(x=>['invalid-pinyin','self-example-exact','self-target-missing','self-sync-missing-answer','self-sync-missing-field','self-criteria-token-missing','self-prompt-model-anchor-missing','self-semantic-antonym-mismatch','self-semantic-anchor-missing','trap-pair-missing-case-example','wrong-grammar-missing-correction'].includes(x.kind));
  assert.equal(blocking.length,0,'New V2 quality warnings: '+JSON.stringify(blocking));
  return warnings;
}

function selfTest(){
  const base={id:'fixture',hanzi:'词',intro:[{pinyin:'cí'}],lesson:{version:2,examples:[{id:'e1',zh:'我学词。'},{id:'e2',zh:'他会用词。'}],selfUse:[{id:'s1',prompt:'x'}],selfAnswers:{s1:{model:'我学词。'}},traps:[{id:'t1',title:'甲 và 乙: đối chiếu',cases:[{id:'c1',zh:'甲句。'},{id:'c2',zh:'甲句 khác.'}],replacement:{result:'different-meaning',explanation:'甲 vẫn có.'},boundary:'Không có ví dụ cho phía thứ hai.',tip:'x'}]}};
  const warnings=qualityWarnings([base]);
  assert(warnings.some(x=>x.kind==='self-example-exact'));
  assert(warnings.some(x=>x.kind==='trap-pair-missing-case-example'));
  assert.throws(()=>assertFreshV2([base]));
  const valid=structuredClone(base);valid.lesson.selfAnswers.s1={idea:'Dùng 词 trong câu mới.',frame:'...词...',model:'Tôi dùng 词 trong câu mới.',vi:'Tôi dùng từ này trong câu mới.',criteria:['Có 词.'],targetForms:['词']};valid.lesson.traps=[];assert.equal(qualityWarnings([valid]).filter(x=>x.kind==='self-example-exact'||x.kind==='self-target-missing'||x.kind.startsWith('self-sync-')||x.kind==='self-criteria-token-missing').length,0);
  assert.doesNotThrow(()=>assertFreshV2([valid]));
  const invalidPinyin=structuredClone(valid);invalidPinyin.intro=[{pinyin:'cách đọc dạy',meaning:'mô tả giả'}];assert(!isPinyinText(invalidPinyin.intro[0].pinyin));assert(qualityWarnings([invalidPinyin]).some(x=>x.kind==='invalid-pinyin'));assert.throws(()=>assertFreshV2([invalidPinyin]));
  const mismatch=structuredClone(valid);mismatch.lesson.selfUse[0].prompt='Nói tôi đứng ở bệnh viện đợi bạn.';mismatch.lesson.selfAnswers.s1.model='他在公园用词。';assert(qualityWarnings([mismatch]).some(x=>x.kind==='self-prompt-model-anchor-missing'&&x.anchorId==='first-person'));assert(qualityWarnings([mismatch]).some(x=>x.kind==='self-prompt-model-anchor-missing'&&x.anchorId==='stand'));assert(qualityWarnings([mismatch]).some(x=>x.kind==='self-prompt-model-anchor-missing'&&x.anchorId==='hospital'));assert(qualityWarnings([mismatch]).some(x=>x.kind==='self-prompt-model-anchor-missing'&&x.anchorId==='wait-for-you'));assert.throws(()=>assertFreshV2([mismatch]));
  const antonym=structuredClone(valid);antonym.lesson.selfUse[0].prompt='Nói bên này có một chỗ trống.';antonym.lesson.selfAnswers.s1={...antonym.lesson.selfAnswers.s1,model:'那边有一个词。',targetForms:['词']};assert(qualityWarnings([antonym]).some(x=>x.kind==='self-semantic-antonym-mismatch'&&x.anchorId==='this-that'));assert.throws(()=>assertFreshV2([antonym]));
  const contextual=structuredClone(valid);contextual.lesson.selfUse[0].prompt='Nói có thể ngồi bên này hoặc bên kia.';contextual.lesson.selfAnswers.s1={...contextual.lesson.selfAnswers.s1,model:'这边或那边都可以用词。',targetForms:['词']};assert(!qualityWarnings([contextual]).some(x=>x.kind.startsWith('self-semantic-')));
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
