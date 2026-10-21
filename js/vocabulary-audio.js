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
export function languageCode(value){return String(value||'').replace(/_/g,'-').toLowerCase()}
export function voiceMatches(voice,lang){const code=languageCode(voice.lang);return lang==='vi-VN'?/^vi(?:-|$)/.test(code):/^(?:zh|cmn)(?:-|$)/.test(code)&&!/(?:^|-)(?:hk|yue)(?:-|$)/.test(code)}
export function chooseVoice(voices,lang,preferredURI=''){
 const compatible=voices.filter(v=>voiceMatches(v,lang));
 if(preferredURI){const selected=compatible.find(v=>v.voiceURI===preferredURI);if(selected)return selected}
 if(lang==='vi-VN')return compatible.find(v=>languageCode(v.lang)==='vi-vn')||compatible[0];
 return compatible.find(v=>languageCode(v.lang)==='zh-cn')||compatible.find(v=>/^(zh|cmn)-(hans-)?cn$/.test(languageCode(v.lang)))||compatible.find(v=>/^(zh|cmn)(-hans)?(-sg)?$/.test(languageCode(v.lang)));
}
export function speechErrorMessage(error){
 if(!error)return '';const label=error.lang==='vi-VN'?'tiếng Việt':'tiếng Trung';
 const messages={
 'api-unavailable':'Trình duyệt chưa hỗ trợ đọc văn bản. Hãy mở bằng Chrome trên điện thoại.',
 'not-allowed':'Trình duyệt đang chặn phát. Mở trang trực tiếp trong Chrome và bấm Thử giọng hoặc Bắt đầu nghe.',
 'language-unavailable':'Bộ đọc chưa cung cấp '+label+'. Hãy cài dữ liệu giọng tương ứng trong cài đặt chuyển văn bản thành giọng nói của điện thoại.',
 'voice-unavailable':'Giọng đã chọn không còn sẵn sàng. Chọn Tự động rồi thử lại.',
 'synthesis-unavailable':'Thiết bị chưa có bộ đọc hoạt động. Chọn hoặc cập nhật bộ đọc Google trong cài đặt điện thoại.',
 'synthesis-failed':'Bộ đọc báo lỗi. Thử Tự động, thử lại câu mẫu; nếu vẫn lỗi, kiểm tra bộ đọc trong cài đặt điện thoại.',
 'network':'Không tải được dữ liệu giọng qua mạng. Kiểm tra mạng hoặc tải giọng ngoại tuyến trên thiết bị.',
 'audio-busy':'Thiết bị âm thanh đang bận. Dừng ứng dụng đang dùng âm thanh rồi thử lại.',
 'audio-hardware':'Trình duyệt không truy cập được đầu ra âm thanh. Kiểm tra loa hoặc tai nghe.',
 'start-timeout':'Bộ đọc không phản hồi sau 12 giây. Thử lại giọng Tự động và kiểm tra bộ đọc của điện thoại.',
 'interrupted':'Lượt đọc bị thiết bị hoặc ứng dụng khác ngắt. Bấm phát lại đoạn hiện tại.',
 'canceled':'Lượt đọc bị hủy ngoài thao tác của app. Bấm phát lại.',
 'text-too-long':'Đoạn đọc quá dài đối với bộ đọc này.',
 'exception':'Không khởi tạo được lệnh đọc. Hãy tải lại trang và thử trong Chrome.'
 };return (messages[error.code]||'Bộ đọc báo lỗi chưa xác định. Thử lại câu mẫu trong Chrome.')+' [Mã: '+error.code+'; '+(error.lang||'không rõ ngôn ngữ')+']';
}
export function createAudioPlayer({synth,makeUtterance,changed=()=>{},preferredVoice=()=>'',segmentGap=400,setTimer=setTimeout,clearTimer=clearTimeout}){
 let queue=[],index=0,status='idle',rate=.9,repeat=false,generation=0,timer=null,watchdog=null,current=null,error=null;
 const state=()=>({status,index,total:queue.length,item:queue[index]||null,rate,repeat,queue,error});
 const emit=()=>changed(state());
 function clearWatch(){if(watchdog!==null)clearTimer(watchdog);watchdog=null}
 function invalidate(){const ownsSpeech=current!==null;generation++;if(timer!==null)clearTimer(timer);timer=null;clearWatch();current=null;if(ownsSpeech)try{synth?.cancel()}catch{}}
 function fail(code,item,voice=''){clearWatch();current=null;status='error';error={code,lang:item?.lang||'',voice};emit()}
 function playCurrent(systemDefault=false){
  if(status!=='playing')return;if(!queue.length){status='idle';emit();return}
  if(index>=queue.length){if(repeat)index=0;else{index=queue.length-1;status='completed';emit();return}}
  const token=generation,item=queue[index];
  if(!synth){fail('api-unavailable',item);return}
  try{
   const voice=systemDefault?undefined:chooseVoice(synth.getVoices(),item.lang,preferredVoice(item.lang,item));
   // A partial or empty browser voice list does not prove the OS lacks a language.
   // If no compatible voice is exposed, request the language from the OS directly.
   const u=makeUtterance(item.text);current=u;u.lang=voice?.lang||item.lang;u.rate=rate;if(voice)u.voice=voice;
   u.onstart=()=>{if(token===generation)clearWatch()};
   u.onend=()=>{if(token!==generation||status!=='playing')return;clearWatch();current=null;index++;timer=setTimer(()=>{timer=null;playCurrent()},segmentGap)};
   u.onerror=e=>{if(token!==generation||status!=='playing')return;clearWatch();current=null;
    if(!systemDefault&&['voice-unavailable','synthesis-failed'].includes(e.error)){
     generation++;try{synth.cancel()}catch{};timer=setTimer(()=>{timer=null;playCurrent(true)},600);return;
    }
    fail(e.error||'unknown',item,voice?.name||'Tự động');
   };
   error=null;emit();watchdog=setTimer(()=>{watchdog=null;if(token!==generation||status!=='playing')return;generation++;try{synth.cancel()}catch{};fail('start-timeout',item,voice?.name||'Tự động')},12000);
   synth.resume();synth.speak(u);
  }catch{fail('exception',item)}
 }
 return {get state(){return state()},load(items){invalidate();queue=items;index=0;status='idle';error=null;emit()},play(){if(!queue.length)return;if(status==='completed')index=0;invalidate();error=null;status='playing';playCurrent()},pause(){if(status!=='playing')return;invalidate();status='paused';emit()},stop(){invalidate();index=0;status='idle';error=null;emit()},moveWord(delta){
   if(!queue.length)return;const wasPlaying=status==='playing',currentWord=queue[Math.min(index,queue.length-1)].wordIndex,target=Math.max(0,currentWord+delta);const next=queue.findIndex(s=>s.wordIndex===target);if(next<0)return;invalidate();index=next;error=null;status=wasPlaying?'playing':'paused';if(wasPlaying)playCurrent();else emit();
  },setRate(value){const n=Number(value);if(!Number.isFinite(n))return;rate=Math.max(.5,Math.min(1.5,n));if(status==='playing'){invalidate();playCurrent()}else emit()},setRepeat(value){repeat=!!value;emit()}};
}
