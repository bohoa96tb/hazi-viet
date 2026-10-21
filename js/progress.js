const KEY='hanzi-viet-v1';export let state={version:1,cards:{},activity:{}};let saveWarning=()=>{};
export function onSaveWarning(cb){saveWarning=cb}
export function validState(s){return s&&s.version===1&&s.cards&&typeof s.cards==='object'&&!Array.isArray(s.cards)&&Object.keys(s.cards).length<=20000&&Object.entries(s.cards).every(([k,v])=>[...k].length===1&&v&&typeof v==='object'&&Number.isFinite(v.due)&&Number.isFinite(v.interval)&&v.interval>=0&&v.interval<=3650&&typeof v.favorite==='boolean'&&typeof v.learned==='boolean'&&Number.isFinite(v.reviews)&&v.reviews>=0)&&s.activity&&typeof s.activity==='object'&&!Array.isArray(s.activity)&&Object.entries(s.activity).every(([k,v])=>/^\d{4}-\d{2}-\d{2}$/.test(k)&&Number.isFinite(v)&&v>=0)}
let loadError=false;try{const raw=localStorage.getItem(KEY);if(raw){const s=JSON.parse(raw);if(validState(s))state=s;else loadError=true}}catch{loadError=true}
export function storageLoadFailed(){return loadError}
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{saveWarning('Không lưu được tiến độ trên trình duyệt. Hãy xuất bản sao lưu trước khi đóng.')}}
export function card(c){return state.cards[c]||{learned:false,favorite:false,reviews:0,interval:0,due:0}}
export function favorite(c){state.cards[c]={...card(c),favorite:!card(c).favorite};persist()}
export function grade(c,quality){const old=card(c);const interval=quality==='again'?0:quality==='hard'?1:Math.min(365,Math.max(1,Math.round((old.interval||.4)*2.5)));state.cards[c]={...old,learned:true,reviews:old.reviews+1,interval,due:Date.now()+(quality==='again'?10*60*1000:interval*86400000)};const t=today();state.activity[t]=(state.activity[t]||0)+1;persist()}
export function markLearned(c){const old=card(c);state.cards[c]={...old,learned:true,due:old.due||Date.now()};persist()}
export function dueChars(chars){return chars.filter(c=>card(c.char).learned&&card(c.char).due<=Date.now())}
export function exportState(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='hanzi-viet-tien-do-'+today()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
export function importState(s){if(!validState(s))throw new Error('Bản sao lưu không đúng định dạng Hanzi Việt v1.');state=s;persist()}
