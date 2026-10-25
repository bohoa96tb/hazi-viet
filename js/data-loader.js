const cache=new Map();
export async function loadJSON(path){if(cache.has(path))return cache.get(path);const p=fetch(new URL('../data/'+path,import.meta.url)).then(async r=>{if(!r.ok)throw new Error('Không tải được data/'+path+' (HTTP '+r.status+'). Kiểm tra tên file và thư mục.');try{return await r.json()}catch{throw new Error('File '+path+' không phải JSON hợp lệ.')}});cache.set(path,p);try{return await p}catch(e){cache.delete(path);throw e}}
export async function loadAll(){
 const [catalog,chars,words,sentences,grammar,radicals,etymologyVi,vocabularyRelease]=await Promise.all([
 loadJSON('catalog.json'),Promise.all([1,2,3,4,5,6].map(l=>loadJSON(`hsk${l}-core.json`))),Promise.all([1,2,3,4,5,6].map(l=>loadJSON(`words-hsk${l}.json`))),loadJSON('sentences.json'),loadJSON('grammar.json'),loadJSON('radicals-vi.json'),loadJSON('etymology-vi.json'),loadJSON('vocabulary/release.json')]);
 const flat=chars.flat();return{catalog,chars:flat,charMap:new Map(flat.map(c=>[c.char,c])),words:words.flat(),sentences,grammar,radicals,etymologyVi,vocabularyRelease};
}
