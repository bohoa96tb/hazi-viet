// Deterministic scripts and a cancellable, segment-by-segment bilingual player.
export const audioModes=[
 {id:'quick',icon:'⚡',title:'Ôn nhanh',description:'Từ tiếng Trung → nghĩa tiếng Việt.'},
 {id:'context',icon:'🧩',title:'Ngấm ngữ cảnh',description:'Từ → nghĩa → giải thích ngắn → ví dụ Trung + Việt.'},
 {id:'podcast',icon:'🎙️',title:'Bài giảng Podcast',description:'Nghĩa, tình huống, cấu trúc, ví dụ, bẫy và học thêm; bỏ bài tập.'},
 {id:'immersion',icon:'🌊',title:'Tắm ngôn ngữ',description:'Chỉ tiếng Trung: từ mục tiêu và các câu ví dụ.'}
];
export function lessonsOf(words,size=24){const result=[];for(let i=0;i<words.length;i+=size)result.push(words.slice(i,i+size));return result}
export function columnsOf(words){const middle=Math.ceil(words.length/2);return [words.slice(0,middle),words.slice(middle)]}
export function selectAudioWords(words,{scope='lesson',lesson=0,from=1,to=words.length}={},card=()=>({})){const lessons=lessonsOf(words);switch(scope){case'lesson':return lessons[lesson]||[];case'all':return words;case'favorite':return words.filter(w=>card(w.id).favorite);case'new':return words.filter(w=>!card(w.id).learned);case'learned':return words.filter(w=>card(w.id).learned);case'range':return words.slice(Math.max(0,from-1),Math.min(words.length,to));default:return []}}
export function mixedSegments(text){
 // Keep Chinese runs with their punctuation, while Vietnamese is read by a vi-VN voice.
 return String(text??'').split(/([\p{Script=Han}]+(?:[，。？！、；：…“”「」《》\s]*[\p{Script=Han}]+)*[，。？！、；：…]*)/u).filter(t=>/[\p{L}\p{N}]/u.test(t)).map(t=>({text:t.trim().replace(/[→/]/g,', '),lang:/\p{Script=Han}/u.test(t)?'zh-CN':'vi-VN'}));
}
export function buildPlaylist(words,mode){
 if(!audioModes.some(m=>m.id===mode))throw Error('Chế độ nghe không hợp lệ.');
 const queue=[];words.forEach((w,wordIndex)=>{
  const push=(text,lang,label)=>{if(text)queue.push({wordId:w.id,word:w.hanzi,wordIndex,text,lang,label})};
  const mixed=(text,label)=>mixedSegments(text).forEach(s=>push(s.text,s.lang,label));
  push(w.hanzi,'zh-CN','Từ mục tiêu');
  if(mode==='immersion'){w.examples.forEach((s,i)=>push(s.zh,'zh-CN','Câu ví dụ '+(i+1)));return}
  mixed(w.meaning,'Nghĩa trọng tâm');if(mode==='quick')return;
  if(mode==='context')mixed(w.when,'Giải thích ngắn');
  if(mode==='podcast'){
   mixed(w.scene,'Tình huống');mixed(w.when,'Khi nào dùng');mixed(w.pattern,'Vị trí và cấu trúc');
   w.phrases.forEach(s=>mixed(s,'Cụm thường gặp'));
  }
  w.examples.forEach((s,i)=>{push(s.zh,'zh-CN','Ví dụ '+(i+1));mixed(s.vi,'Nghĩa câu');if(mode==='podcast')mixed(s.analysis,'Phân tích ví dụ')});
  if(mode==='podcast'){
   w.forms.forEach(s=>{push(s.zh,'zh-CN','Phủ định và câu hỏi');mixed(s.vi,'Nghĩa câu')});
   mixed(w.trap,'Bẫy cần tránh');mixed(w.shape.pair,'Giống mặt chữ');mixed(w.shape.difference,'Phân biệt mặt chữ');w.shape.examples.forEach(s=>mixed(s,'Đối chiếu mặt chữ'));
   mixed(w.near.pair,'Gần nghĩa');mixed(w.near.difference,'Phân biệt cách dùng');w.near.examples.forEach(s=>mixed(s,'Đối chiếu cách dùng'));
   w.more.forEach(s=>{mixed(s.title,'Học thêm');mixed(s.text,'Học thêm')});mixed(w.recognize,'Nhận mặt chữ');
  }
 });return queue;
}
export function createAudioPlayer({synth,makeUtterance,changed=()=>{},setTimer=setTimeout,clearTimer=clearTimeout}){
 let queue=[],index=0,status='idle',rate=.9,repeat=false,generation=0,timer=null,current=null;
 const state=()=>({status,index,total:queue.length,item:queue[index]||null,rate,repeat,queue});
 const emit=()=>changed(state());
 function invalidate(){generation++;if(timer!==null)clearTimer(timer);timer=null;current=null;synth?.cancel();}
 function playCurrent(){
  if(status!=='playing')return;if(!queue.length){status='idle';emit();return}
  if(index>=queue.length){if(repeat)index=0;else{index=queue.length-1;status='completed';emit();return}}
  const token=generation,item=queue[index];
  if(!synth){status='error';emit();return}
  try{
   const voices=synth.getVoices(),voice=voices.find(v=>v.lang.toLowerCase().replace('_','-')===item.lang.toLowerCase())||voices.find(v=>item.lang==='vi-VN'&&/^vi([-_]|$)/i.test(v.lang));
   // When voices are still loading, let the engine resolve the requested language.
   // If it advertises voices but lacks this language, do not silently read with another language.
   if(voices.length&&!voice){status='error';emit();return}
   const u=makeUtterance(item.text);current=u;u.lang=item.lang;u.rate=rate;if(voice)u.voice=voice;
   u.onend=()=>{if(token!==generation||status!=='playing')return;current=null;index++;timer=setTimer(()=>{timer=null;playCurrent()},400)};
   u.onerror=e=>{if(token!==generation||status!=='playing')return;if(['canceled','interrupted'].includes(e.error))return;current=null;status='error';emit()};
   emit();synth.resume();synth.speak(u);
  }catch{status='error';emit()}
 }
 return {get state(){return state()},load(items){invalidate();queue=items;index=0;status='idle';emit()},play(){if(!queue.length)return;if(status==='completed')index=0;invalidate();status='playing';playCurrent()},pause(){if(status!=='playing')return;invalidate();status='paused';emit()},stop(){invalidate();index=0;status='idle';emit()},moveWord(delta){
   if(!queue.length)return;const wasPlaying=status==='playing',currentWord=queue[Math.min(index,queue.length-1)].wordIndex,target=Math.max(0,currentWord+delta);let next=queue.findIndex(s=>s.wordIndex===target);if(next<0)return;invalidate();index=next;status=wasPlaying?'playing':'paused';if(wasPlaying)playCurrent();else emit();
  },setRate(value){const n=Number(value);if(!Number.isFinite(n))return;rate=Math.max(.5,Math.min(1.5,n));if(status==='playing'){invalidate();playCurrent()}else emit()},setRepeat(value){repeat=!!value;emit()}};
}
