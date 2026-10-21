const KEY='hanzi-viet-vocabulary-v1',DAY=86400000;
export const intervals=[1,3,7,14,30];
export const freshState=()=>({version:1,cards:{},last:null});
export function validProgress(s){return !!s&&s.version===1&&s.cards&&typeof s.cards==='object'&&!Array.isArray(s.cards)&&Object.keys(s.cards).length<=20000&&Object.entries(s.cards).every(([id,c])=>/^[a-z0-9-]{1,80}$/.test(id)&&c&&typeof c.learned==='boolean'&&typeof c.favorite==='boolean'&&Number.isInteger(c.step)&&c.step>=0&&c.step<=5&&Number.isFinite(c.due)&&c.due>=0&&Number.isInteger(c.reviews)&&c.reviews>=0)&&(s.last===null||(s.last&&/^[a-z0-9-]{1,80}$/.test(s.last.id)&&Number.isInteger(s.last.stage)&&s.last.stage>=0&&s.last.stage<5))}
export function schedule(old={},quality,now=Date.now()){
 const card={learned:false,favorite:false,step:0,due:0,reviews:0,...old};
 if(!['again','hard','good'].includes(quality))throw Error('Đánh giá không hợp lệ.');
 const step=quality==='again'?0:quality==='hard'?card.step:Math.min(5,card.step+1);
 const delay=quality==='again'?600000:quality==='hard'?DAY:intervals[Math.min(step-1,4)]*DAY;
 return {...card,learned:true,step,due:now+delay,reviews:card.reviews+1};
}
export function createProgress(storage,onWarning=()=>{}){
 let state=freshState();try{const raw=storage.getItem(KEY);if(raw){const parsed=JSON.parse(raw);if(!validProgress(parsed))throw Error();state=parsed}}catch{onWarning('Không đọc được tiến độ từ vựng. Hãy nhập bản sao lưu nếu có.');}
 const save=()=>{try{storage.setItem(KEY,JSON.stringify(state))}catch{onWarning('Không lưu được tiến độ từ vựng. Hãy xuất bản sao trước khi đóng.')}};
 const card=id=>state.cards[id]||{learned:false,favorite:false,step:0,due:0,reviews:0};
 return {get state(){return state},card,favorite(id){state.cards[id]={...card(id),favorite:!card(id).favorite};save()},grade(id,q){state.cards[id]=schedule(card(id),q);save()},remember(id,stage){state.last={id,stage};save()},replace(s){if(!validProgress(s))throw Error('Không đúng bản sao lưu Từ vựng v1.');state=structuredClone(s);save()},due(words,now=Date.now()){return words.filter(w=>card(w.id).learned&&card(w.id).due<=now)}};
}
