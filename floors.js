// floors.js — original extra floors for DOORS 2D Remade (own designs; mechanics loosely inspired by the genre)
(function(){
window.FLR='hotel';
const FL={
 hotel:{name:'Отель',short:'Отель',dw:'Дверь '},
 mines:{name:'Копи «Глубокий Шов»',short:'Копи',N:100,dw:'Дверь ',lab:n=>pad(n+100),need:'hotel'},
 back:{name:'Изнанка',short:'Изнанка',N:50,dw:'Дверь ',lab:n=>n<=0?'-51':'-'+String(51-n).padStart(2,'0'),need:'portal'},
 garden:{name:'Сумеречный сад',short:'Сад',N:40,dw:'Тропа ',lab:n=>(n*25)+' м',need:'portal'},
 archive:{name:'Нижний Архив',short:'Архив',N:60,dw:'Стеллаж ',lab:n=>'А-'+pad(n),need:'portal'},
 stair:{name:'Лестничный колодец',short:'Колодец',N:30,dw:'Пролёт ',lab:n=>'Л-'+pad(n),need:'portal'}};
window.FLOORS=FL;
let UNL={};try{UNL=JSON.parse(localStorage.getItem('d2floors')||'{}')}catch(e){}UNL.hotel=1;
const saveU=()=>localStorage.setItem('d2floors',JSON.stringify(UNL));
const unlock=f=>{if(!UNL[f]){UNL[f]=1;saveU();msg('Открыт новый этаж: '+FL[f].name+'!',4)}};
window.FNAME=f=>(FL[f]||FL.hotel).name;
window.setFLR=f=>{FLR=FL[f]?f:'hotel';window.FDW=FL[FLR].dw;window.FDP=FL[FLR].lab||null};
window.FDW='Дверь ';
const A=k=>{try{d2ach(k)}catch(e){}};
Object.assign(d2ACHL,{
 fl_mines:['Шахтёр','Пройди Копи «Глубокий Шов»'],fl_nest:['Тихий маяк','Зажги маяки гнезда Матки'],fl_cart:['Рельсовый гонщик','Уйди от Обвала на вагонетке'],
 fl_back:['Обратный отсчёт','Пройди Изнанку'],fl_backt:['С запасом','Выйди из Изнанки, имея ≥60 секунд'],fl_garden:['Тихие шаги','Пройди Сумеречный сад'],
 fl_gq:['Невидимка сада','Пройди сад, ни разу не разбудив Садовода'],fl_arch:['Архивариус','Пройди Нижний Архив'],fl_mute:['Молчание — золото','Переживи Немого 3 раза'],
 fl_stair:['На самое дно','Пройди Лестничный колодец'],fl_vent:['Сквозняк','Открой 8 вентиляций'],fl_portal:['Под черепом','Открой дверь с черепом'],fl_dam:['Плотина','Одолей Смоль']});
Object.assign(ITEM,{mfuse:{n:'Свеча зажигания',c:'#fc6'},shears:{n:'Садовые ножницы',c:'#cde'},card:{n:'Пропуск',c:'#8cf'},vial:{n:'Склянка песка',c:'#fd9'},lantern:{n:'Обережный фонарь',c:'#ffb'}});
Object.assign(window.TIPS||{},{mfuse:'Вставь в генератор (E у генератора)',shears:'Срезай лозы у дверей и сундуков (E)',card:'Открывает ворота сектора',vial:'Цифра — +30 секунд в Изнанке / +20 HP',lantern:'Отнеси к воротам сада'});
Object.assign(DNAME,{gas:'Рудничный газ',flood:'Затопление',cavein:'Обвал',queen:'Матка Жильников',crawl:'Жильник',tarboss:'Смоль',sand:'Песочник',stare:'Пристальник',gust:'Шквал',gardener:'Садовод',paper:'Перелист',mute:'Немой',clerk:'Счетовод',heat:'Жар',ember:'Окалина'});
Object.assign(HINTS,{gas:'Рудничный газ жжёт лёгкие. Не входи в облако с огнём — рванёт!',flood:'Вода прибывает. Ищи насос (E), чтобы откачать её.',cavein:'Обвал гонится за вагонеткой. Меняй ряд (W/S) и не врезайся в балки.',queen:'Матка слепа, но слышит. Зажигай маяки в порядке, что показал терминал, и не бегай.',crawl:'Жильники боятся фонарика — свети прямо на них.',tarboss:'Смоль бьёт по подсвеченным кругам — уходи. Крути вентили, держась рядом.',sand:'Когда часы на нуле, приходит Песочник. Дёргай рычаги-часы, чтобы добавить время.',stare:'Пристальник ранит, если смотреть на него. Отвернись!',gust:'Шквал проносится по подсвеченной полосе — уйди с неё.',gardener:'На газоне Садовод слышит шаги. Крадись (Ctrl) по траве или прячься в сарае.',paper:'Перелист — бумажная буря. Когда страницы шелестят — прячься.',mute:'Когда появляется Немой — замри полностью до исчезновения маски.',clerk:'Счетовод слеп. Двигайся тихо и прячься под столами.',heat:'Жар растёт. Открывай вентиляции (E), чтобы остыть.',ember:'Окалина приходит на жар. Вентиляция её гасит.'});
const MYI={gen:o=>!o.on,sdoor:()=>1,gas:()=>0,pump:()=>1,beacon:o=>!o.lit,term:()=>1,valve:o=>!o.used&&S.dam&&o.ph===S.dam.ph,tlever:o=>!o.used,glever:o=>!o.used,exit:()=>1,vialp:o=>!o.used,tshed:o=>!o.used,vine:()=>1,vchest:o=>!o.used,lantp:o=>!o.used,ggate:o=>!o.used,aterm:o=>!o.used,agate:o=>!o.used,vent:o=>!(o.cd>0),fdesk:o=>!o.used};
for(const k in MYI)NEWI[k]=MYI[k];
Object.assign(SOLID,{gen:1,valve:1,term:1,beacon:1,vchest:1,tshed:1,aterm:1,vent:1,fdesk:1,ggate:1});
window.FHINT=o=>({gen:o.dam?'[E] Запустить главный генератор':'[E] Генератор ('+(o.have||0)+'/'+o.need+' свечей)',sdoor:'[E] Дверь с черепом → '+(FL[o.to]||{}).name,pump:'[E] Откачать воду',beacon:'[E] Зажечь маяк «'+o.L+'»',term:'[E] Терминал',valve:'[E] Крутить вентиль (держись рядом)',tlever:'[E] Рычаг-часы',glever:'[E] Рычаг',exit:'[E] Выход',vialp:'[E] Склянка песка — 40 зол.',tshed:'[E] Обыскать сарай',vine:'[E] Срезать лозу',vchest:'[E] Сундук под лозой',lantp:'[E] Взять фонарь',ggate:'[E] Ворота сада ('+(S.lant||0)+'/3)',aterm:'[E] Выдать пропуск',agate:'[E] Ворота сектора',vent:'[E] Открыть вентиляцию',fdesk:'[E] Обыскать стол'}[o.t]||'');
// ---------- generator ----------
function layout(N,typeOf){
 rooms=[];objs=[];doors=[];doorAt=new Map();occ=new Set();let cur=null,vdir=0;GH=160;
 for(let n=0;n<=N;n++){const q=typeOf(n);let w=q.w||ri(12,18),h=q.h||ri(8,12);const t=q.t||'normal';
  const r={n,x0:1,y0:80-Math.floor(h/2),w,h,t,sub:q.sub,dir:'E',dark:!!q.dark,visited:false,objs:[],lamps:[],cds:[],fx:q.fx||{}};
  if(cur){let dir='E';if(q.vert!==false&&cur.fx.vert!==false&&t==='normal'&&cur.t==='normal'&&n>2&&RNG()<(q.vp||.4)){const o=[];if(vdir!==-1&&cur.y0-h>4)o.push('N');if(vdir!==1&&cur.y0+cur.h+h<GH-4)o.push('S');if(o.length)dir=pick(o)}
   if(dir==='E'){r.x0=cur.x0+cur.w-1;r.y0=Math.max(2,Math.min(GH-h-2,cur.y0+Math.floor(cur.h/2)-Math.floor(h/2)+(t==='normal'&&cur.t==='normal'?ri(-1,1):0)));vdir=0}
   else{r.w=Math.min(w,cur.w);r.x0=cur.x0+cur.w-r.w;r.y0=dir==='N'?cur.y0-h+1:cur.y0+cur.h-1;vdir=dir==='N'?1:-1}r.dir=dir}
  rooms.push(r);cur=r}
 GW=Math.max(...rooms.map(r=>r.x0+r.w))+2;tiles=new Uint8Array(GW*GH);solidObj=new Map();rmap=new Int16Array(GW*GH).fill(-1);allDoors=[];
 for(const r of rooms)for(let yy=r.y0;yy<r.y0+r.h;yy++)for(let xx=r.x0;xx<r.x0+r.w;xx++){const inn=yy>r.y0&&yy<r.y0+r.h-1&&xx>r.x0&&xx<r.x0+r.w-1;if(inn){tiles[idx(xx,yy)]=1;rmap[idx(xx,yy)]=r.n}else if(rmap[idx(xx,yy)]<0)rmap[idx(xx,yy)]=r.n}
 for(let n=1;n<=N;n++){const a=rooms[n-1],b=rooms[n];let d;
  if(b.dir==='E'){let lo=Math.max(a.y0,b.y0)+1,hi=Math.min(a.y0+a.h,b.y0+b.h)-2;if(hi-lo>=2){lo++;hi--}d={x:b.x0,y:ri(lo,hi)}}
  else{let lo=Math.max(a.x0,b.x0)+1,hi=Math.min(a.x0+a.w,b.x0+b.w)-2;if(hi-lo>=2){lo++;hi--}d={x:ri(lo,hi),y:b.dir==='N'?a.y0:b.y0}}
  Object.assign(d,{n,room:n,dir:b.dir,open:false,locked:false,code:false,sealed:false});tiles[idx(d.x,d.y)]=2;doors.push(d);allDoors.push(d);doorAt.set(idx(d.x,d.y),d);a.east=d;b.west=d}
 for(const r of rooms){if(r.t!=='normal'||r.n<2||RNG()>.25)continue;const cw=ri(5,7),ch=5,up=RNG()<.5;
  const c={x0:r.x0+ri(1,Math.max(1,r.w-cw-1)),y0:up?r.y0-ch+1:r.y0+r.h-1,w:cw,h:ch};if(c.x0+cw>r.x0+r.w-1)continue;
  if(rooms.some(q=>q!==r&&rectHit(c,q))||rooms.some(q=>q.cl&&q.cl.some(k=>rectHit(c,k))))continue;
  const dx=c.x0+Math.floor(cw/2),dy=up?r.y0:r.y0+r.h-1;if(allDoors.some(d=>Math.abs(d.x-dx)<=2&&Math.abs(d.y-dy)<=2))continue;if(c.y0<1||c.y0+ch>=GH-1)continue;
  for(let yy=c.y0+1;yy<c.y0+ch-1;yy++)for(let xx=c.x0+1;xx<c.x0+cw-1;xx++){tiles[idx(xx,yy)]=1;rmap[idx(xx,yy)]=r.n}
  for(let yy=c.y0;yy<c.y0+ch;yy++)for(let xx=c.x0;xx<c.x0+cw;xx++)if(rmap[idx(xx,yy)]<0)rmap[idx(xx,yy)]=r.n;
  const d={n:0,closet:true,room:r.n,x:dx,y:dy,dir:up?'N':'S',open:false,locked:false,code:false,sealed:false};tiles[idx(dx,dy)]=2;allDoors.push(d);doorAt.set(idx(dx,dy),d);r.cds.push(d);(r.cl=r.cl||[]).push(Object.assign(c,{up}))}
}
function R(r){const ints=[],edges=[];for(let yy=r.y0+1;yy<r.y0+r.h-1;yy++)for(let xx=r.x0+1;xx<r.x0+r.w-1;xx++){if(nearDoor(r,xx,yy))continue;ints.push([xx,yy]);if(yy===r.y0+1||yy===r.y0+r.h-2)edges.push([xx,yy])}
 const take=a=>{for(let k=0;k<80;k++){const p=pick(a);if(p&&!occ.has(idx(p[0],p[1])))return p}return null};
 const ok=()=>{if(!r.west||!r.east)return true;const a=innerOf(r.west,r),b=innerOf(r.east,r);return !!bfs(r,a[0],a[1],b[0],b[1])};
 const safe=(t,a,ex)=>{for(let k=0;k<12;k++){const p=take(a);if(!p)return null;const o=put(r,t,p[0],p[1],ex);if(!SOLID[t]||ok())return o;o.gone=true;solidObj.delete(idx(p[0],p[1]));r.objs.pop();objs.pop()}return null};
 const lamps=k=>{if(r.dark)return;for(let i=0;i<k;i++)r.lamps.push({x:(r.x0+(i+.5)*(r.w/k))*T,y:(r.y0+1)*T+4})};
 return{ints,edges,take,safe,lamps,my:r.y0+Math.floor(r.h/2)}}
function std(r,o){o=o||{};const q=R(r);const nd=ri(1,3);const keyD=r.east&&r.east.locked?0:-1;
 for(let i=0;i<nd;i++)q.safe('dresser',q.edges,{key:i===keyD});if(keyD>=0&&!r.objs.some(o=>o.key))q.safe('dresser',q.ints,{key:true});
 if(o.hide!==false){const nw=ri(1,2);for(let i=0;i<nw;i++)q.safe('wardrobe',q.edges,o.skin?{skin:o.skin}:null)}
 if(r.cl)for(const c of r.cl){const yy=c.up?c.y0+1:c.y0+c.h-2;put(r,'dresser',c.x0+1,yy);put(r,'dresser',c.x0+c.w-2,yy,{rich:true})}
 q.lamps(2);return q}
function locks(N,p,skip){for(let n=2;n<N;n++){const a=rooms[n-1],b=rooms[n];if(a.t==='normal'&&b.t==='normal'&&!skip(n)&&RNG()<p)doors[n-1].locked=true}}
const GEN={};
GEN.mines=function(){const N=100,halts=new Set();while(halts.size<3){const n=ri(14,74);if((n<30||n>49)&&(n<49||n>55))halts.add(n)}
 const flood=new Set();for(let n=60;n<=70;n++)if(RNG()<.5)flood.add(n);
 layout(N,n=>n===0?{t:'adit',w:18,h:12,sub:'mine'}:n===50?{t:'nest',w:30,h:22,sub:'nest',dark:true}:n===52?{t:'shop',w:14,h:10,sub:'mine'}:n===100?{t:'dam',w:34,h:22,sub:'dam'}:
  halts.has(n)?{t:'halt',w:40,h:5}:(n>=36&&n<=41)||(n>=83&&n<=88)?{t:'chase',w:ri(18,24),h:9,sub:n>60?'sewer':'mine'}:n>=43&&n<=47?{t:'rail',w:30,h:7,sub:'rail'}:
  {t:'normal',sub:n>55?'sewer':'mine',dark:n>=6&&RNG()<.25,fx:{flood:flood.has(n)}});
 locks(N,.12,n=>n>=42&&n<=49);
 for(let n=37;n<=42;n++)doors[n-1].open=true;for(let n=84;n<=89;n++)doors[n-1].open=true;for(let n=43;n<=48;n++)doors[n-1].open=true;
 doors[0].sealed=true;doors[50].sealed=true;
 for(const r of rooms){const t=r.t;
  if(t==='adit'){const q=R(r);put(r,'gen',r.x0+r.w-3,r.y0+2,{need:2,door:0});for(let i=0;i<2;i++)q.safe('dresser',q.edges,{give:'mfuse'});q.safe('dresser',q.edges);q.safe('crate',q.edges);q.lamps(3)}
  else if(t==='normal'){const q=std(r,{skin:'locker'});
   if(r.n>=4&&r.east&&!r.east.locked&&r.east.dir==='E'&&RNG()<.12&&!(r.n>=42&&r.n<=49)){const need=ri(1,2);r.east.sealed=true;const g=q.safe('gen',q.edges,{need,door:r.n});if(!g)r.east.sealed=false;else for(let i=0;i<need;i++)q.safe('dresser',q.ints,{give:'mfuse'})}
   if(r.n>=8&&!r.fx.flood&&RNG()<.16){for(let i=0;i<ri(2,4);i++){const p=q.take(q.ints);if(p)put(r,'gas',p[0],p[1])}}
   if(r.fx.flood){q.safe('pump',q.edges)}
   if(RNG()<.3)q.safe('crate',q.edges)}
  else if(t==='chase'){for(let c=r.x0+4,k=0;c<r.x0+r.w-4;c+=4,k++){const top=k%2===0;for(let j=0;j<4;j++){const yy=top?r.y0+1+j:r.y0+r.h-2-j;if(!nearDoor(r,c,yy))put(r,'rubble',c,yy)}}R(r).lamps(3)}
  else if(t==='halt')R(r).lamps(4);
  else if(t==='rail'){for(let x=r.x0+6;x<r.x0+r.w-3;x+=ri(4,6)){const yy=ri(r.y0+1,r.y0+r.h-2);put(r,'beam',x,yy)}R(r).lamps(4)}
  else if(t==='nest'){const q=R(r);const L=['Ж','Л','Ы','К','Э'];for(let i=0;i<5;i++)q.safe('beacon',q.ints,{L:L[i]});put(r,'term',r.x0+3,r.y0+2,{});for(let i=0;i<6;i++)q.safe('crate',q.ints);for(let i=0;i<3;i++)q.safe('wardrobe',q.edges,{skin:'locker'})}
  else if(t==='shop'){for(let i=0;i<4;i++)put(r,'counter',r.x0+4+i,r.y0+3,{item:i});put(r,'sdoor',r.x0+r.w-3,r.y0+r.h-2,{to:'stair'});R(r).lamps(2)}
  else if(t==='dam'){const q=R(r);const ph=[0,0,1,1,1,2,2,2,2];for(const p of ph)q.safe('valve',q.ints,{ph:p});put(r,'gen',r.x0+r.w-4,r.y0+Math.floor(r.h/2),{need:0,dam:true});for(let i=0;i<3;i++)q.safe('wardrobe',q.edges,{skin:'locker'});q.lamps(5)}}};
GEN.back=function(){const N=50,gates=new Set([8,17,26,35,44]);
 layout(N,n=>n===0?{t:'bstart',w:14,h:10,sub:'back'}:n===N?{t:'vest',w:16,h:12,sub:'back'}:{t:'normal',sub:'back',dark:n>3&&RNG()<.4,fx:{gate:gates.has(n)}});
 locks(N,.08,n=>gates.has(n));
 for(const r of rooms){if(r.t==='bstart'){const q=R(r);q.safe('dresser',q.edges);q.lamps(2)}
  else if(r.t==='vest'){const q=R(r);put(r,'vialp',r.x0+4,r.y0+3);put(r,'exit',r.x0+r.w-3,r.y0+Math.floor(r.h/2));q.lamps(3)}
  else{const q=std(r);if(r.n===1||RNG()<.38)q.safe('tlever',q.edges);
   if(r.fx.gate&&r.east){r.east.sealed=true;q.safe('glever',q.edges,{});const cl=r.cl&&r.cl[0];if(cl&&!occ.has(idx(cl.x0+2,cl.up?cl.y0+1:cl.y0+cl.h-2)))put(r,'glever',cl.x0+2,cl.up?cl.y0+1:cl.y0+cl.h-2,{});else q.safe('glever',q.ints,{})}}}};
GEN.garden=function(){const N=40;
 layout(N,n=>n===0?{t:'gstart',w:14,h:11,sub:'garden'}:n===N?{t:'gfinal',w:18,h:12,sub:'garden'}:{t:'normal',sub:'garden',w:ri(14,20),h:ri(9,13),vp:.3,fx:{lawn:n>1&&RNG()<.6}});
 const L=[8,20,32];
 for(const r of rooms){if(r.t==='gstart'){const q=R(r);q.safe('tshed',q.edges);q.safe('wardrobe',q.edges,{skin:'shed'})}
  else if(r.t==='gfinal'){put(r,'ggate',r.x0+r.w-3,r.y0+Math.floor(r.h/2))}
  else{const q=R(r);for(let i=0;i<ri(1,2);i++)q.safe('wardrobe',q.edges,{skin:'shed'});if(RNG()<.5)q.safe('dresser',q.edges,{skin:'crate'});
   if(r.n%8===4)q.safe('tshed',q.edges);if(L.includes(r.n))q.safe('lantp',q.ints);
   if(RNG()<.35)q.safe('vchest',q.edges);
   for(let i=0;i<ri(2,5);i++)q.safe('plant',q.ints);for(let i=0;i<ri(1,3);i++){const p=q.take(q.ints);if(p)put(r,'snare',p[0],p[1])}
   if(r.n>2&&r.east&&!L.includes(r.n)&&RNG()<.3){r.east.sealed=r.east.vine=true;if(!r.objs.some(o=>o.t==='tshed'))q.safe('tshed',q.edges)}
   if(r.fx.lawn){r.lawn=[];const lx=r.x0+ri(2,4),lw=r.w-ri(5,7),ly=r.y0+2,lh=r.h-4;r.lawn=[lx,ly,lw,lh];r.gard=RNG()<.75}}}};
GEN.archive=function(){const N=60;
 layout(N,n=>n===0?{t:'astart',w:14,h:10,sub:'archive'}:n===N?{t:'afinal',w:20,h:14,sub:'archive'}:n%15===10?{t:'stacks',w:26,h:18,sub:'archive',dark:true}:{t:'normal',sub:'archive',dark:n>4&&RNG()<.3});
 locks(N,.12,n=>n%15===0);
 for(const s of [15,30,45]){doors[s-1].sealed=true;doors[s-1].sector=s/15}
 for(const r of rooms){if(r.t==='astart'){const q=R(r);for(let i=0;i<3;i++)q.safe('fdesk',q.edges);q.lamps(2)}
  else if(r.t==='afinal'){put(r,'exit',r.x0+r.w-3,r.y0+Math.floor(r.h/2));R(r).lamps(4)}
  else if(r.t==='stacks'){for(let yy=r.y0+3;yy<r.y0+r.h-3;yy+=3)for(let xx=r.x0+3;xx<r.x0+r.w-3;xx++){if((xx-r.x0)%6<2||nearDoor(r,xx,yy))continue;put(r,'shelf',xx,yy)}const q=R(r);for(let i=0;i<4;i++)q.safe('desk',q.ints,{hide:true})}
  else{const q=std(r);if(RNG()<.5)q.safe('fdesk',q.ints);if(RNG()<.4)q.safe('shelf',q.edges)}}
 for(const s of [1,2,3]){const cand=rooms.filter(r=>r.t==='normal'&&r.n>(s-1)*15+2&&r.n<s*15-1);const r=pick(cand);const q=R(r);q.safe('aterm',q.edges,{sec:s})}};
GEN.stair=function(){const N=30;
 layout(N,n=>n===0?{t:'sstart',w:12,h:10,sub:'stair'}:n===15?{t:'shop',w:16,h:10,sub:'stair',fx:{tin:1}}:n===N?{t:'sfinal',w:16,h:12,sub:'stair'}:{t:'normal',sub:'stair',w:ri(10,14),h:ri(8,11),vp:.7,dark:n>3&&RNG()<.3});
 locks(N,.1,()=>0);
 for(const r of rooms){if(r.t==='sstart'){const q=R(r);q.safe('vent',q.edges);q.safe('dresser',q.edges);q.lamps(2)}
  else if(r.t==='shop'){for(let i=0;i<4;i++)put(r,'counter',r.x0+5+i,r.y0+3,{item:i,tin:1});const q=R(r);q.safe('vent',q.edges);q.lamps(2)}
  else if(r.t==='sfinal'){put(r,'exit',r.x0+r.w-3,r.y0+Math.floor(r.h/2));R(r).lamps(3)}
  else{const q=std(r,{skin:'locker'});if(RNG()<.6)q.safe('vent',q.edges)}}};
const _gen=gen;gen=function(){if(FLR==='hotel'||!GEN[FLR]){_gen();
  if(rooms[0]&&rooms[100]){const r0=rooms[0];const q=R(r0);q.safe('sdoor',q.edges,{to:'back'});
   const lib=rooms[50],q2=R(lib);q2.safe('sdoor',q2.edges,{to:'archive'});const gh=rooms[90],q3=R(gh);q3.safe('sdoor',q3.edges,{to:'garden'})}return}
 GEN[FLR]()};
window.isOutdoor=isOutdoor=(o=>r=>SUB(r)==='garden'||o(r))(isOutdoor);
// ---------- state / reset ----------
let CARRY=null;
const _reset=reset;reset=function(o){o=o||{};if(FLR!=='hotel')o.start=0;_reset(o);
 S.fl={};S.lant=0;S.cards=0;S.mutes=0;S.vents=0;S.gAlerted=false;
 if(CARRY){const c=CARRY;CARRY=null;P.inv=c.inv.slice();P.gold=c.gold;P.hp=Math.max(40,c.hp);P.skey=c.skey;P.bat=c.bat}
 if(FLR!=='hotel'){const m={mines:'Копи «Глубокий Шов». Генератор у входа мёртв — найди 2 свечи зажигания.',back:'Изнанка. Время идёт против тебя — дёргай рычаги-часы!',garden:'Сумеречный сад. Не топай по газону — Садовод слышит. Найди ножницы в сарае.',archive:'Нижний Архив. Пропуска сектора выдают терминалы.',stair:'Лестничный колодец. Становится жарко... ищи вентиляции.'}[FLR];msg(m,6)}
 if(FLR==='stair')S.heat=0;if(FLR==='back')S.clock=null;
 S.muteT=30+Math.random()*20};
function goFloor(f,seed,carry,remote){if(carry)CARRY={inv:P.inv,gold:P.gold,hp:P.hp,skey:P.skey,bat:P.bat};
 if(!remote&&NET.coop)netEv({k:'fx',a:'go',f,seed});setFLR(f);unlock(f);reset({seed,start:0});started=true;
 try{startElev([(document.getElementById('lnm')||{}).value||'Ты'],0,2.2)}catch(e){}}
window.goFloor=goFloor;
// ---------- interaction ----------
function fx(o,a,extra){netEv(Object.assign({k:'fx',a,r:o.r,i:rooms[o.r].objs.indexOf(o)},extra||{}))}
function apply(o,a,ex){const r=rooms[o.r];
 switch(o.t){
  case 'gen':if(a==='fuse'){o.have=(o.have||0)+1}if(!o.dam&&(o.have||0)>=o.need&&!o.on){o.on=true;const d=doors[o.door];if(d){d.sealed=false;d.open=true}SND.holy();msg('Генератор запущен! Дверь открыта.',3)}break;
  case 'beacon':o.lit=true;break;
  case 'valve':o.used=true;break;
  case 'glever':o.used=true;if(r.objs.filter(q=>q.t==='glever').every(q=>q.used)&&r.east){r.east.sealed=false;r.east.open=true;msg('Ворота открылись!',2)}break;
  case 'tlever':o.used=true;if(S.clock!=null)S.clock+=ex.add||15;S.sand=null;break;
  case 'vine':o.gone=true;break;
  case 'ggate':o.used=true;break;
  case 'agate':break;
  case 'aterm':o.used=true;break;
  case 'pump':r.fl=0;break;
  case 'lantp':o.gone=true;S.lant=(S.lant||0)+1;break}}
function door(n){const d=doors[n];if(d){d.sealed=false;d.open=true}}
function myInteract(o){
 switch(o.t){
  case 'gen':if(o.dam){if(S.dam&&S.dam.ph>=3)winFloor('Плотина запущена, Смоль ушла в глубину — ты выбрался из Копей!','N — Перейти на следующий этаж ещё нет: ты прошёл все Копи!');else{SND.bad();msg('Сначала перекрой все вентили плотины',2)}return}
   if(P.inv.includes('mfuse')){removeItem('mfuse');o.have=(o.have||0)+1;tone(500,.1,'square',.06);fx(o,'fuse');apply(o,'');msg('Свеча вставлена ('+o.have+'/'+o.need+')',2)}else{SND.bad();msg('Нужны свечи зажигания ('+(o.have||0)+'/'+o.need+') — ищи в ящиках',2.5)}return;
  case 'sdoor':if(P.inv.includes('skey')){P.skey=(P.skey||3)-1;if(P.skey<=0)removeItem('skey');A('fl_portal');SND.lock();goFloor(o.to,(SEED*31+o.r*7)|0,true)}else{SND.bad();msg('Дверь с черепом. Нужен ключ-отмычка.',2.5)}return;
  case 'pump':rooms[o.r].fl=0;fx(o,'pump');tone(180,.4,'sawtooth',.05);msg('Вода уходит...',2);return;
  case 'term':{const s=S.nest;if(s){msg('Терминал: следующий маяк — «'+s.seq[s.i]+'»  (порядок: '+s.seq.join(' → ')+')',4);tone(800,.08,'square',.05)}return}
  case 'beacon':{const s=S.nest;if(!s)return;if(o.L===s.seq[s.i]){s.i++;o.lit=true;fx(o,'lit');SND.pick();msg('Маяк '+s.i+'/5',2);if(s.i>=5){door(50);netEv({k:'door',n:50});S.figure=null;S.crawl=[];msg('Гнездо стихло. Путь открыт!',3);A('fl_nest')}}else{SND.bad();msg('Не тот маяк! Матка услышала...',2.5);if(S.figure){S.figure.alert=true;S.figure.target={x:P.x,y:P.y};S.figure.path=[]}}return}
  case 'valve':if(!S.turn){S.turn={o,t:1.6};msg('Крутишь вентиль...',1.5)}return;
  case 'tlever':{const add=S.clock==null?0:S.clock<30?60:S.clock<70?30:15;o.used=true;if(S.clock!=null)S.clock+=add;S.sand=null;fx(o,'',{add});SND.lock();msg(S.clock==null?'Механизм щёлкнул.':'+'+add+' секунд!',2);return}
  case 'glever':apply(o,'');fx(o,'');SND.lock();{const r=rooms[o.r],k=r.objs.filter(q=>q.t==='glever'&&q.used).length;if(k<2)msg('Рычаг '+k+'/2',2)}return;
  case 'exit':if(FLR==='back')winFloor('Ты вышел из Изнанки в сени отеля. Время на твоей стороне.',S.clock>=60?(A('fl_backt'),'Осталось '+Math.floor(S.clock)+' с — отличный запас!'):'');else if(FLR==='archive'){if((S.cards||0)<3){SND.bad();msg('Нужны 3 пропуска ('+(S.cards||0)+'/3)',2);return}winFloor('Читальный зал позади — Архив отпустил тебя.','')}else winFloor('Ты достиг дна Колодца и нашёл выход наружу.','');return;
  case 'vialp':if(P.gold>=40){if(addItem('vial')){P.gold-=40;o.used=true;SND.gold()}}else{SND.bad();msg('Нужно 40 золота',2)}return;
  case 'tshed':o.used=true;SND.drawer();if(!P.inv.includes('shears')){if(addItem('shears')){P.shear=6;SND.pick();msg('Садовые ножницы (6 срезов)',2.5)}}else{P.shear=(P.shear||0)+4;msg('Ножницы наточены: '+P.shear+' срезов',2)}if(Math.random()<.5){const g=ri(5,20);P.gold+=g}return;
  case 'vchest':if(!o.cut){if(!cut())return;o.cut=true;msg('Лоза срезана — открой сундук',2);return}o.used=true;SND.drawer();{const g=ri(20,50);P.gold+=g;SND.gold();msg('+'+g+' золота',2);if(Math.random()<.35)addItem(pick(['vitamins','battery','crucifix','bandage']))}return;
  case 'lantp':o.gone=true;S.lant=(S.lant||0)+1;fx(o,'');SND.holy();msg('Обережный фонарь '+S.lant+'/3',2.5);return;
  case 'ggate':if((S.lant||0)>=3){o.used=true;winFloor('Ворота сада распахнулись, Садовод остался в тумане.','');if(!S.gAlerted)A('fl_gq')}else{SND.bad();msg('Нужно 3 обережных фонаря ('+(S.lant||0)+'/3)',2.5)}return;
  case 'aterm':o.used=true;if(addItem('card')){S.cards=(S.cards||0)+1;SND.pick();msg('Пропуск сектора '+'АБВ'[o.sec-1]+' получен',2.5);fx(o,'')}else o.used=false;return;
  case 'vent':o.cd=12;S.heat=Math.max(0,(S.heat||0)-45);S.ember=null;S.vents=(S.vents||0)+1;if(S.vents>=8)A('fl_vent');noise&&noise(.5,.2,800);msg('Свежий воздух!',1.5);return;
  case 'fdesk':o.used=true;SND.drawer();{const R=Math.random();if(R<.5){const g=ri(5,25);P.gold+=g;SND.gold();msg('+'+g+' золота')}else if(R<.75){const it=pick(['battery','lockpick','vitamins','candle']);if(addItem(it))msg('Найдено: '+ITEM[it].n)}else msg('Только пыльные бумаги...')}return}}
function cut(){if(!P.inv.includes('shears')||!(P.shear>0)){SND.bad();msg('Нужны садовые ножницы',2);return false}P.shear--;if(P.shear<=0){removeItem('shears');msg('Ножницы сломались')}tone(1400,.05,'square',.05);return true}
function winFloor(t,n){if(S.win)return;S.win=true;S.winT=t;S.winN=n||'';SND.win();netEv({k:'win'});const nx={hotel:'mines'}[FLR];
 A({mines:'fl_mines',back:'fl_back',garden:'fl_garden',archive:'fl_arch',stair:'fl_stair'}[FLR]);
 if(FLR==='mines')A('fl_dam')}
const _int=interact;interact=function(){if(!P.hidden&&!S.safe&&!S.dead){
  // vine doors & sector gates
  for(const d of [doors[P.room],doors[P.room-1]]){if(d&&d.sealed&&Math.hypot(d.x*T+16-P.x,d.y*T+16-P.y)<52){
   if(d.vine){if(cut()){d.vine=false;d.sealed=false;d.open=true;netEv({k:'door',n:doors.indexOf(d)});msg('Лоза срезана',1.5)}return}
   if(d.sector){if(P.inv.includes('card')){removeItem('card');d.sealed=false;d.open=true;netEv({k:'door',n:doors.indexOf(d)});SND.lock();msg('Сектор '+'АБВ'[d.sector-1]+' открыт',2)}else{SND.bad();msg('Нужен пропуск сектора — ищи терминал',2.5)}return}}}
  const o=nearObj();if(o&&MYI[o.t]){if(o.t==='dresser')return _int();myInteract(o);return}
  if(o&&o.t==='dresser'&&o.give&&!o.used){o.used=true;SND.drawer();if(addItem(o.give)){SND.pick();msg('Найдено: '+ITEM[o.give].n,2)}return}}
 return _int()};
const _ue=useSlot;useSlot=function(i){const it=P.inv[i];if(it==='vial'){P.inv[i]=null;if(S.clock!=null){S.clock+=30;S.sand=null;msg('+30 секунд',2)}else{P.hp=Math.min(100,P.hp+20);msg('+20 HP',2)}SND.holy();return}return _ue(i)};
// network
const _one=onNetEv;onNetEv=function(e){if(e&&e.k==='fx'){if(e.a==='go'){if(FLR!==e.f||!started||S.win||S.dead)goFloor(e.f,e.seed,true,true);return}const r=rooms[e.r];const o=r&&r.objs[e.i];if(o)apply(o,e.a,e);return}if(e&&e.k==='door'&&doors[e.n]){doors[e.n].sealed=false;doors[e.n].vine=false}return _one(e)};
// ---------- enterRoom ----------
const _er=enterRoom;enterRoom=function(r){const first=!r.visited;
 if(FLR==='hotel')return _er(r);
 const t0=r.t;let swap=null;
 // suppress hotel-only behaviours by temporarily masking room type
 if(t0==='chase'&&FLR==='mines'&&first&&(r.n===36||r.n===83)){_er(r);msg('Из темноты лезет Ищейка! БЕГИ!',3);return}
 if(t0!=='normal'&&t0!=='chase'&&t0!=='halt'){swap=r.t;r.t='_'+t0}
 const dk=r.dark;if(FLR==='garden'||FLR==='stair'&&RNG()<.5)r.dark=false;
 const allow=FLR==='mines'||FLR==='archive'||FLR==='back';
 if(!allow&&r.t==='normal'){r.t='_n'}
 _er(r);r.dark=dk;if(swap)r.t=swap;if(r.t==='_n')r.t='normal';
 if(FLR==='archive'){for(const e of S.ents)if(e.type==='rush')e.type='paper';for(const e of S.ents)if(e.type==='ambush')e.type='paper'}
 if(!first)return;
 if(FLR==='mines'){if(r.t==='nest'){const seq=['Ж','Л','Ы','К','Э'];for(let i=4;i>0;i--){const j=Math.floor(mulberry(SEED+i)()*(i+1));[seq[i],seq[j]]=[seq[j],seq[i]]}S.nest={seq,i:0};S.figure=mkFigure(r);S.figure.skin='queen';S.crawl=[];for(let i=0;i<4;i++){const p=randomFloor(r);S.crawl.push({x:p.x,y:p.y,cd:0,fl:0})}msg('Гнездо. Матка Жильников слышит шаги. Терминал покажет порядок маяков.',6)}
  if(r.t==='rail'&&r.n===43){S.cart={x:P.x,lane:P.y};S.cave={x:P.x-340};msg('Вагонетка! W/S — менять ряд, не врежься в балки. Обвал позади!',4)}
  if(r.t==='rail'&&r.n===47&&S.cave){}
  if(r.t==='dam'){S.dam={ph:0,hands:[],ht:2,sl:null,worm:null,wt:6};msg('Плотина. Смоль поднимается из дёгтя! Перекрой вентили (по фазам).',6)}
  if(r.fx.flood){r.fl=0;msg('Под ногами хлюпает вода... найди насос.',3)}}
 if(FLR==='back'){if(r.n===1&&S.clock==null){S.clock=60;msg('Часы пошли: 60 секунд!',3)}
  if(r.dark&&r.n>3&&Math.random()<.5)S.stare={room:r.n,t:-2,x:(r.x0+r.w-2)*T,y:(r.y0+1+Math.random()*(r.h-2))*T};
  if(r.t==='normal'&&r.n>5&&Math.random()<.18)S.gust={room:r.n,y:(r.y0+1+Math.floor(Math.random()*(r.h-2)))*T+16,t:1.8}}
 if(FLR==='garden'&&r.gard){const p=randomFloor(r);S.gard={room:r.n,x:p.x,y:p.y,alert:0,st:'tend',tx:p.x,ty:p.y}}
 if(FLR==='archive'){if(r.t==='stacks'&&(r.n===25||r.n===55||r.n===40)){S.figure=mkFigure(r);S.figure.skin='clerk';msg('Счетовод бродит меж стеллажей. Тише...',4)}}
 if(FLR==='stair'&&r.fx.tin)msg('Мастерская Жестянщика. Оловянный торговец скрипит: «Покупай!»',4)};
// ---------- per-frame ----------
const near=(o,d)=>Math.hypot(o.x*T+16-P.x,o.y*T+16-P.y)<d;
const _pre=window.preUpdateX;window.preUpdateX=function(dt){_pre&&_pre(dt);if(!started||!S||S.dead||S.win||ELEV)return;const r=rooms[P.room];if(!r)return;
 if(FLR==='hotel')return;
 for(const o of r.objs)if(o.cd>0)o.cd-=dt;
 if(FLR==='mines')mines(dt,r);else if(FLR==='back')back(dt,r);else if(FLR==='garden')garden(dt,r);else if(FLR==='archive')archive(dt,r);else if(FLR==='stair')stair(dt,r)};
function mines(dt,r){
 for(const o of r.objs)if(o.t==='gas'&&!o.gone&&near(o,42)&&!P.hidden){if(held('lighter')||held('candle')){o.gone=true;damage(45,'gas');S.shake=.8;for(let i=0;i<30;i++)puff(o.x*T+16,o.y*T+16,(Math.random()-.5)*300,(Math.random()-.5)*300,.8,8,'255,160,40',1);msg('ВЗРЫВ ГАЗА!',2)}else{P.hp-=7*dt;if(P.hp<=0)die('gas')}}
 if(r.fx.flood){r.fl=Math.min(1.3,(r.fl||0)+dt/16);if(r.fl>1){P.hp-=10*dt;if(P.hp<=0)die('flood')}}
 if(S.cave){const c=S.cave;if(r.t==='rail'||r.n===42||r.n===48){c.x+=(205+P.room*0)*dt;if(r.t==='rail'&&!(P.stun>0)){const nx=P.x+220*dt;if(passable(Math.floor((nx+10)/T),Math.floor(P.y/T)))P.x=nx}
   if(P.x-c.x<10)die('cavein');if(Math.random()<.5)puff(c.x,P.y+(Math.random()-.5)*200,-40,0,1,10,'90,80,70',1);S.shake=Math.max(S.shake,.08);
   for(const o of r.objs)if(o.t==='beam'&&!o.hit&&near(o,22)){o.hit=1;damage(15,'cavein');P.stun=.4;SND.bad()}}
  if(P.room>=48){S.cave=null;A('fl_cart');msg('Ты ушёл от Обвала!',3)}}
 if(S.nest&&r.t==='nest'&&S.crawl)for(const c of S.crawl){const dx=P.x-c.x,dy=P.y-c.y,d=Math.hypot(dx,dy)||1;const lit=P.light&&d<300&&Math.abs(((Math.atan2(-dy,-dx)-P.face+9.42)%6.283)-3.14)<.5;
  const sp=lit?-130:d<260?70:20;const nx=c.x+dx/d*sp*dt,ny=c.y+dy/d*sp*dt;if(passable(Math.floor(nx/T),Math.floor(ny/T))){c.x=nx;c.y=ny}c.cd-=dt;if(d<20&&c.cd<=0&&!P.hidden){c.cd=1.2;damage(18,'crawl')}}
 if(S.dam&&r.t==='dam')dam(dt,r);
 if(S.turn){const o=S.turn.o;if(!near(o,60)){S.turn=null;msg('Вентиль сорвался',1.5)}else{S.turn.t-=dt;if(Math.random()<.2)tone(120+Math.random()*40,.05,'sawtooth',.03);if(S.turn.t<=0){o.used=true;fx(o,'');S.turn=null;SND.lock();damCheck(r)}}}}
function damCheck(r){const s=S.dam;if(!s||s.ph>=3)return;const left=r.objs.filter(o=>o.t==='valve'&&o.ph===s.ph&&!o.used).length;if(!left){s.ph++;S.shake=1;msg(s.ph>=3?'Все вентили перекрыты! Запусти главный генератор!':'Фаза '+(s.ph+1)+'/3 — Смоль злится!',3)}}
function dam(dt,r){const s=S.dam;damCheck(r);if(s.ph>=3){s.hands=[];return}
 s.ht-=dt;if(s.ht<=0&&!P.hidden){s.ht=Math.max(.8,2-s.ph*.45);s.hands.push({x:P.x+(Math.random()-.5)*60,y:P.y+(Math.random()-.5)*60,t:.95})}
 for(const h of s.hands){h.t-=dt;if(h.t<=0&&!h.done){h.done=1;S.shake=.4;for(let i=0;i<10;i++)puff(h.x,h.y,(Math.random()-.5)*160,(Math.random()-.5)*160,.6,6,'20,15,10',1);if(Math.hypot(h.x-P.x,h.y-P.y)<36&&!P.hidden){if(held('crucifix')){useCrucifix('Длани Смоли',h.x,h.y,'отбросило');s.ht=8}else damage(20,'tarboss')}}}
 s.hands=s.hands.filter(h=>h.t>-.4);
 if(s.ph>=1){if(!s.sl)s.sl={x:(r.x0+2)*T,y:(r.y0+2)*T};const dx=P.x-s.sl.x,dy=P.y-s.sl.y,d=Math.hypot(dx,dy)||1;if(!P.hidden){s.sl.x+=dx/d*58*dt;s.sl.y+=dy/d*58*dt}if(d<26&&!P.hidden){damage(35,'tarboss');s.sl.x=(r.x0+2)*T;s.sl.y=(r.y0+r.h-3)*T}}
 if(s.ph>=2){s.wt-=dt;if(s.wt<=0&&!s.worm){s.worm={y:P.y,t:1.2};s.wt=6}if(s.worm){s.worm.t-=dt;if(s.worm.t<=0&&!s.worm.hit){s.worm.hit=1;S.shake=.8;if(Math.abs(P.y-s.worm.y)<24&&!P.hidden)damage(60,'tarboss')}if(s.worm.t<-.5)s.worm=null}}}
function back(dt,r){
 if(S.clock!=null&&P.room<50){S.clock-=dt;if(S.clock<=0){S.clock=0;if(!S.sand){S.sand={x:P.x-400,y:P.y,sp:110};msg('Время вышло! ПЕСОЧНИК!',3);SND.ambush&&SND.ambush()}}}
 if(S.sand){const s=S.sand;s.sp=Math.min(270,s.sp+dt*18);const dx=P.x-s.x,dy=P.y-s.y,d=Math.hypot(dx,dy)||1;s.x+=dx/d*s.sp*dt;s.y+=dy/d*s.sp*dt;if(Math.random()<.6)puff(s.x,s.y,(Math.random()-.5)*60,(Math.random()-.5)*60,.7,5,'230,200,140',1);if(d<22)die('sand');if(S.clock>0)S.sand=null}
 const st=S.stare;if(st&&st.room===P.room){st.t+=dt;if(st.t>0&&st.t<8){const a=Math.atan2(st.y-P.y,st.x-P.x),df=Math.abs(((a-P.face+9.42)%6.283)-3.14);if(df<.7&&!P.hidden){if(held('crucifix')){useCrucifix('Пристальника',st.x,st.y);S.stare=null}else{P.hp-=14*dt;P.hurtT=.1;if(P.hp<=0)die('stare');if(Math.random()<.02)msg('Не смотри на него!',1)}}}if(st.t>8)S.stare=null}
 const g=S.gust;if(g&&g.room===P.room){g.t-=dt;if(g.t<=0&&!g.hit){g.hit=1;S.shake=.5;if(Math.abs(P.y-g.y)<28&&!P.hidden){damage(40,'gust');P.x=Math.max(P.x-60,r.x0*T+48)}}if(g.t<-.6)S.gust=null}}
function garden(dt,r){const g=S.gard;if(!g||g.room!==P.room)return;
 const L=r.lawn,on=L&&P.x>L[0]*T&&P.x<(L[0]+L[2])*T&&P.y>L[1]*T&&P.y<(L[1]+L[3])*T,mv=Math.hypot(P.x-(g.px||P.x),P.y-(g.py||P.y))>0.5;g.px=P.x;g.py=P.y;
 if(g.st==='tend'){if(on&&mv&&!P.hidden)g.alert+=dt*(P.crouch?.22:1.1);else g.alert=Math.max(0,g.alert-dt*.3);
  if(Math.random()<.01){const p=randomFloor(r);g.tx=p.x;g.ty=p.y}const dx=g.tx-g.x,dy=g.ty-g.y,d=Math.hypot(dx,dy);if(d>4){g.x+=dx/d*30*dt;g.y+=dy/d*30*dt}
  if(g.alert>=1){g.st='charge';S.gAlerted=true;msg('САДОВОД ЗАМЕТИЛ ТЕБЯ! Прячься в сарай!',2.5);SND.figure&&SND.figure()}}
 else{const dx=P.x-g.x,dy=P.y-g.y,d=Math.hypot(dx,dy)||1;if(P.hidden){g.st='tend';g.alert=.3;msg('Садовод потерял тебя...',2);return}g.x+=dx/d*210*dt;g.y+=dy/d*210*dt;if(d<24){if(held('crucifix')){useCrucifix('Садовода',g.x,g.y);S.gard=null;return}damage(70,'gardener');g.st='tend';g.alert=0;const p=randomFloor(r);g.x=p.x;g.y=p.y}}}
let lastMv=0;
function archive(dt,r){S.muteT-=dt;if(P.room>=5&&S.muteT<=0&&!S.mute){S.mute={t:2.6,moved:0};msg('НЕМОЙ. ЗАМРИ!',2);tone(60,.8,'sine',.12)}
 const m=S.mute;if(m){m.t-=dt;const mv=Math.hypot(P.x-(m.px??P.x),P.y-(m.py??P.y));m.px=P.x;m.py=P.y;if(m.t<2.1&&mv>.3)m.moved+=dt;if(m.t<=0){if(m.moved>.08&&!P.hidden)damage(60,'mute');else{S.mutes++;if(S.mutes>=3)A('fl_mute')}S.mute=null;S.muteT=25+Math.random()*25}}}
function stair(dt,r){S.heat=Math.min(130,(S.heat||0)+dt*(r.t==='shop'?-3:1.4));if(S.heat<0)S.heat=0;if(S.heat>=100&&!P.hidden){P.hp-=6*dt;if(P.hp<=0)die('heat')}
 if(S.heat>65&&!S.ember&&P.room!==15){S.ember={x:P.x+(Math.random()<.5?-300:300),y:P.y-200,room:P.room};msg('Пахнет гарью... Окалина!',2)}
 const e=S.ember;if(e){const dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||1;e.x+=dx/d*75*dt;e.y+=dy/d*75*dt;if(Math.random()<.5)puff(e.x,e.y,(Math.random()-.5)*40,-30,.6,4,'255,120,30',1);if(d<22&&!P.hidden){damage(25,'ember');S.ember=null;S.heat=Math.max(0,S.heat-15)}if(S.heat<40)S.ember=null}}
// ---------- figure skins & death ----------
const _die=die;die=function(c){if(c==='figure'&&S.figure&&S.figure.skin)c=S.figure.skin;return _die(c)};
const _sf=ED.figure;ED.figure=function(x,y,t,al,face){const f=S.figure;if(!f||!f.skin)return _sf(x,y,t,al,face);const g=X;g.save();g.translate(x,y);
 if(f.skin==='queen'){const b=Math.sin(t*4);g.fillStyle='#2a1d14';g.beginPath();g.ellipse(0,0,30+b*2,22,0,0,7);g.fill();g.strokeStyle='#5a3b22';g.lineWidth=3;for(let i=0;i<8;i++){const a=i/8*6.28+t*.5;g.beginPath();g.moveTo(Math.cos(a)*24,Math.sin(a)*18);g.quadraticCurveTo(Math.cos(a)*40,Math.sin(a)*34+b*4,Math.cos(a)*46,Math.sin(a)*42);g.stroke()}g.fillStyle=al?'#ff4020':'#b89048';for(let i=0;i<5;i++){g.beginPath();g.arc(-12+i*6,-6+Math.abs(i-2)*3,3,0,7);g.fill()}}
 else{g.rotate(face||0);g.fillStyle='#3a3a44';g.fillRect(-14,-18,28,36);g.fillStyle='#d8d2c0';g.fillRect(4,-12,10,24);g.fillStyle='#222';for(let i=0;i<4;i++)g.fillRect(6,-10+i*6,6,1.5);g.fillStyle=al?'#f33':'#888';g.beginPath();g.arc(-4,0,7,0,7);g.fill();g.fillStyle='#111';g.fillRect(-9,-1,10,2)}
 g.restore()};
const _rush=ED.rush;ED.rush=function(x,y,t,amb,d){if(FLR!=='archive')return _rush(x,y,t,amb,d);const g=X;for(let i=0;i<26;i++){const a=i*2.4+t*6,rr=18+((i*13)%30);g.save();g.translate(x+Math.cos(a)*rr,y+Math.sin(a*1.3)*rr);g.rotate(a);g.fillStyle=i%3?'#e8e0c8':'#c8b890';g.fillRect(-7,-5,14,10);g.fillStyle='rgba(60,50,40,.5)';g.fillRect(-5,-2,10,1);g.restore()}glow(g,x,y,40,'255,240,200',.25)};
// ---------- drawing ----------
Object.assign(PAL,{mine:{f:'#4a3e34',w:'#2a221c',wp:'#3a2e24',trim:'#6a4a2a'},sewer:{f:'#3a423c',w:'#1e2622',wp:'#2a342e',trim:'#4a5a50'},nest:{f:'#3a2a1e',w:'#1e140c',wp:'#2a1c12',trim:'#4a3020'},dam:{f:'#2e3236',w:'#16191c',wp:'#22272b',trim:'#4a5258'},rail:{f:'#3a3028',w:'#221a14',wp:'#2e241c',trim:'#5a4a3a'},
 back:{f:'#3a2a2e',w:'#1c1418',wp:'#2a1e22',trim:'#5a3a40'},garden:{f:'#3e4a30',w:'#1c2618',wp:'#2a3a22',trim:'#5a6a40'},archive:{f:'#5a5040',w:'#2e2a24',wp:'#3c362e',trim:'#6a5e48'},stair:{f:'#4a3a32',w:'#2a1c18',wp:'#3a2622',trim:'#7a4a32'}});
const _dox=window.drawObjX;window.drawObjX=function(o,px,py,t){const g=X,cx=px+16,cy=py+16;
 switch(o.t){
  case 'gen':g.fillStyle='#3a3f44';g.fillRect(px+2,py+6,28,22);g.fillStyle=o.on||(o.dam&&S.dam&&S.dam.ph>=3)?'#7f6':'#a33';g.beginPath();g.arc(cx+8,py+12,3,0,7);g.fill();g.fillStyle='#222';for(let i=0;i<4;i++)g.fillRect(px+5,py+14+i*3,14,1.5);if(o.dam){g.strokeStyle='#fd4';g.strokeRect(px+1,py+5,30,24)}break;
  case 'sdoor':g.fillStyle='#2a1a10';g.fillRect(px+4,py+2,24,28);g.strokeStyle='#e8c46a';g.lineWidth=2;g.strokeRect(px+4,py+2,24,28);g.fillStyle='#eee';g.beginPath();g.arc(cx,py+13,6,0,7);g.fill();g.fillStyle='#000';g.fillRect(cx-4,py+11,3,3);g.fillRect(cx+1,py+11,3,3);g.fillStyle='#eee';g.fillRect(cx-4,py+18,8,4);break;
  case 'gas':glow(g,cx+Math.sin(t+o.x)*4,cy,40,'150,190,60',.28);break;
  case 'pump':g.fillStyle='#4a5a64';g.fillRect(px+8,py+4,16,24);g.fillStyle='#c33';g.beginPath();g.arc(cx,py+10,5,0,7);g.fill();break;
  case 'beam':g.fillStyle='#6a4a2a';g.fillRect(px,py+10,32,12);g.fillStyle='#4a3018';g.fillRect(px,py+20,32,3);break;
  case 'beacon':g.fillStyle='#333';g.fillRect(px+10,py+8,12,20);if(o.lit)glow(g,cx,py+8,26,'120,220,255',.6);g.fillStyle=o.lit?'#9df':'#666';g.beginPath();g.arc(cx,py+8,6,0,7);g.fill();g.fillStyle='#fff';g.font='700 10px '+FU;g.textAlign='center';g.fillText(o.L,cx,py+26);break;
  case 'term':case 'aterm':g.fillStyle='#2a2e34';g.fillRect(px+4,py+4,24,24);g.fillStyle=o.used?'#333':'#3f8';g.fillRect(px+7,py+7,18,12);break;
  case 'valve':g.strokeStyle=o.used?'#555':(S.dam&&o.ph===S.dam.ph)?'#fd4':'#8a6a3a';g.lineWidth=3;g.beginPath();g.arc(cx,cy,10,0,7);g.stroke();g.save();g.translate(cx,cy);g.rotate(o.used?0:t*(S.turn&&S.turn.o===o?6:0));g.fillRect(-11,-1.5,22,3);g.fillRect(-1.5,-11,3,22);g.restore();break;
  case 'tlever':case 'glever':g.fillStyle='#444';g.fillRect(px+10,py+18,12,10);g.strokeStyle=o.t==='tlever'?'#e8c46a':'#9ab';g.lineWidth=3;g.beginPath();g.moveTo(cx,py+20);g.lineTo(cx+(o.used?8:-8),py+6);g.stroke();if(o.t==='tlever'){g.fillStyle='#e8c46a';g.beginPath();g.moveTo(cx-4,py+8);g.lineTo(cx+4,py+8);g.lineTo(cx-4,py+16);g.lineTo(cx+4,py+16);g.fill()}break;
  case 'exit':g.fillStyle='#fff8d0';g.fillRect(px+4,py,24,32);glow(g,cx,cy,40,'255,240,180',.4);break;
  case 'vialp':if(!o.used){g.fillStyle='#fd9';g.fillRect(cx-4,py+8,8,16)}g.fillStyle='#5a3b22';g.fillRect(px+4,py+24,24,6);break;
  case 'tshed':g.fillStyle='#5a4028';g.fillRect(px+2,py+6,28,24);g.fillStyle='#3a2818';g.beginPath();g.moveTo(px,py+8);g.lineTo(cx,py-2);g.lineTo(px+32,py+8);g.fill();break;
  case 'vchest':g.fillStyle='#6a4a22';g.fillRect(px+4,py+12,24,16);if(!o.cut){g.strokeStyle='#2f6a2a';g.lineWidth=3;for(let i=0;i<3;i++){g.beginPath();g.moveTo(px+4,py+12+i*6);g.quadraticCurveTo(cx,py+4+i*8,px+28,py+14+i*5);g.stroke()}}break;
  case 'lantp':glow(g,cx,cy,30,'255,250,190',.5);g.fillStyle='#ffd';g.fillRect(cx-5,cy-7,10,14);break;
  case 'ggate':g.strokeStyle='#4a5a3a';g.lineWidth=3;for(let i=0;i<4;i++){g.beginPath();g.moveTo(px+4+i*8,py);g.lineTo(px+4+i*8,py+32);g.stroke()}for(let i=0;i<3;i++){g.fillStyle=i<(S.lant||0)?'#ffd':'#333';g.beginPath();g.arc(px+6+i*10,py-4,3,0,7);g.fill()}break;
  case 'vine':break;
  case 'vent':g.fillStyle='#55606a';g.fillRect(px+4,py+4,24,24);g.fillStyle=o.cd>0?'#7cf':'#222';for(let i=0;i<4;i++)g.fillRect(px+7,py+8+i*5,18,2);break;
  case 'fdesk':g.fillStyle='#6a5a40';g.fillRect(px+2,py+8,28,18);g.fillStyle='#e8e0c8';g.fillRect(px+6,py+10,10,7);break;
  default:if(_dox)_dox(o,px,py,t)}};
const _do=drawObj;drawObj=function(o,px,py,t){if(o.skin&&o.t==='wardrobe'){const g=X;if(o.skin==='locker'){g.fillStyle='#4a5560';g.fillRect(px+5,py+1,22,30);g.fillStyle='#2a3038';for(let i=0;i<3;i++)g.fillRect(px+9,py+5+i*3,14,1.5);g.fillRect(px+15,py+2,1.5,28);return}if(o.skin==='shed'){g.fillStyle='#5a4a30';g.fillRect(px+3,py+6,26,25);g.fillStyle='#3a2a18';g.beginPath();g.moveTo(px+1,py+8);g.lineTo(px+16,py-3);g.lineTo(px+31,py+8);g.fill();g.fillStyle='#2a1a0a';g.fillRect(px+12,py+16,8,15);return}}
 if(o.tin&&o.t==='counter'){_do(o,px,py,t);if(o.item===1){const g=X;g.fillStyle='#9aa4ae';g.fillRect(px+8,py-26,16,18);g.fillStyle='#fd4';g.fillRect(px+11,py-20,3,3);g.fillRect(px+18,py-20,3,3);g.fillStyle='#777';g.fillRect(px+15,py-32,2,6)}return}
 return _do(o,px,py,t)};
window.drawWorldX=(o=>function(cx,cy,t){o&&o(cx,cy,t);if(FLR==='hotel')return;const g=X,r=rooms[P.room];if(!r)return;
 for(const d of doors)if(d&&d.vine&&Math.abs(d.room-P.room)<=1){g.strokeStyle='#2f6a2a';g.lineWidth=4;for(let i=0;i<4;i++){g.beginPath();g.moveTo(d.x*T+2,d.y*T+4+i*7);g.quadraticCurveTo(d.x*T+16,d.y*T-4+i*9,d.x*T+30,d.y*T+6+i*6);g.stroke()}}
 for(const d of doors)if(d&&d.sector&&d.sealed&&Math.abs(d.room-P.room)<=1){g.fillStyle='rgba(80,160,255,.5)';g.fillRect(d.x*T,d.y*T,T,T);g.fillStyle='#fff';g.font='700 12px '+FU;g.textAlign='center';g.fillText('АБВ'[d.sector-1],d.x*T+16,d.y*T+20)}
 for(const d of doors)if(d&&d.sealed&&!d.vine&&!d.sector&&Math.abs(d.room-P.room)<=1){g.strokeStyle='#a33';g.lineWidth=3;g.beginPath();g.moveTo(d.x*T+4,d.y*T+4);g.lineTo(d.x*T+28,d.y*T+28);g.moveTo(d.x*T+28,d.y*T+4);g.lineTo(d.x*T+4,d.y*T+28);g.stroke()}
 if(r.lawn){const L=r.lawn;g.fillStyle='rgba(70,130,50,.35)';g.fillRect(L[0]*T,L[1]*T,L[2]*T,L[3]*T);g.strokeStyle='rgba(120,180,80,.25)';for(let x=L[0]*T;x<(L[0]+L[2])*T;x+=9){g.beginPath();g.moveTo(x,(L[1]+L[3])*T);g.lineTo(x+3,L[1]*T);g.stroke()}}
 if(r.fx&&r.fx.flood&&r.fl>0){g.fillStyle='rgba(40,90,120,'+Math.min(.6,r.fl*.5)+')';g.fillRect(r.x0*T,r.y0*T,r.w*T,r.h*T)}
 if(S.cave&&(r.t==='rail'||r.n===42)){g.fillStyle='rgba(60,50,40,.9)';g.fillRect(S.cave.x-600,r.y0*T-60,600,r.h*T+120);for(let i=0;i<6;i++){g.fillStyle='#4a3e34';g.beginPath();g.arc(S.cave.x-10+Math.sin(t*9+i)*6,r.y0*T+i*r.h*T/6+10,18,0,7);g.fill()}}
 if(r.t==='rail'){g.strokeStyle='#6a5a4a';g.lineWidth=2;for(let yy=r.y0+1;yy<r.y0+r.h-1;yy++){g.beginPath();g.moveTo(r.x0*T,yy*T+8);g.lineTo((r.x0+r.w)*T,yy*T+8);g.moveTo(r.x0*T,yy*T+24);g.lineTo((r.x0+r.w)*T,yy*T+24);g.stroke()}g.fillStyle='#555';g.fillRect(P.x-16,P.y-4,32,18)}
 if(S.crawl&&r.t==='nest')for(const c of S.crawl){g.fillStyle='#3a2414';g.beginPath();g.ellipse(c.x,c.y,10,6,Math.atan2(P.y-c.y,P.x-c.x),0,7);g.fill();g.strokeStyle='#5a3a22';g.lineWidth=1.5;for(let i=0;i<6;i++){const a=i*1.05+Math.sin(t*20)*.2;g.beginPath();g.moveTo(c.x,c.y);g.lineTo(c.x+Math.cos(a)*13,c.y+Math.sin(a)*13);g.stroke()}g.fillStyle='#f84';g.fillRect(c.x+2,c.y-2,2,2)}
 const s=S.dam;if(s&&r.t==='dam'){const cx2=(r.x0+r.w/2)*T,cy2=(r.y0+1)*T;g.fillStyle='#0c0806';g.beginPath();g.ellipse(cx2,cy2+30,120,50+Math.sin(t*2)*6,0,0,7);g.fill();g.fillStyle='#f42';g.beginPath();g.arc(cx2-30,cy2+30,5,0,7);g.arc(cx2+30,cy2+30,5,0,7);g.fill();
  for(const h of s.hands){g.strokeStyle='rgba(255,60,30,'+(h.t>0?.6:0)+')';g.lineWidth=2;g.beginPath();g.arc(h.x,h.y,36*(1-Math.max(0,h.t)/.95*.3),0,7);g.stroke();if(h.t<=0){g.fillStyle='#120a06';g.beginPath();g.ellipse(h.x,h.y,22,16,0,0,7);g.fill()}}
  if(s.sl){g.fillStyle='#140c08';g.beginPath();g.ellipse(s.sl.x,s.sl.y,22+Math.sin(t*5)*3,16,0,0,7);g.fill()}
  if(s.worm){g.fillStyle=s.worm.t>0?'rgba(255,40,20,.25)':'#1a0e08';g.fillRect(r.x0*T,s.worm.y-24,r.w*T,48)}}
 if(S.sand){glow(g,S.sand.x,S.sand.y,50,'230,200,140',.4);g.fillStyle='#d8b878';g.beginPath();g.moveTo(S.sand.x-14,S.sand.y-22);g.lineTo(S.sand.x+14,S.sand.y-22);g.lineTo(S.sand.x-14,S.sand.y+22);g.lineTo(S.sand.x+14,S.sand.y+22);g.fill()}
 const st=S.stare;if(st&&st.room===P.room&&st.t>0){g.fillStyle='#0a0a0a';g.fillRect(st.x-6,st.y-26,12,52);g.fillStyle='#e8f0ff';g.beginPath();g.ellipse(st.x,st.y,4,20,0,0,7);g.fill();g.fillStyle='#c22';g.fillRect(st.x-1,st.y-3,2,6)}
 const gu=S.gust;if(gu&&gu.room===P.room){g.fillStyle=gu.t>0?'rgba(180,220,255,'+(.15+.1*Math.sin(t*20))+')':'rgba(220,240,255,.6)';g.fillRect(r.x0*T,gu.y-28,r.w*T,56)}
 const ga=S.gard;if(ga&&ga.room===P.room){g.save();g.translate(ga.x,ga.y);g.fillStyle='#3a5a2a';g.beginPath();g.ellipse(0,4,14,18,0,0,7);g.fill();g.strokeStyle='#6a5030';g.lineWidth=2;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(i*5,-8);g.lineTo(i*4,20);g.stroke()}g.fillStyle='#7a8a90';g.fillRect(-9,-24,18,13);g.fillRect(9,-20,10,3);g.fillStyle=ga.st==='charge'?'#f33':'#cfa';g.fillRect(-4,-19,3,3);g.fillRect(2,-19,3,3);g.restore();if(ga.alert>0&&ga.st==='tend'){g.fillStyle='rgba(0,0,0,.5)';g.fillRect(ga.x-20,ga.y-38,40,5);g.fillStyle='#fd4';g.fillRect(ga.x-20,ga.y-38,40*Math.min(1,ga.alert),5)}}
 if(S.ember){glow(g,S.ember.x,S.ember.y,40,'255,120,30',.5);g.fillStyle='#ffb060';g.beginPath();g.arc(S.ember.x,S.ember.y,9,0,7);g.fill()}})(window.drawWorldX);
window.lightX=(o=>function(cx,cy){o&&o(cx,cy);if(FLR==='hotel'||!rooms[P.room])return;for(const q of rooms[P.room].objs)if(!q.gone&&(q.t==='lantp'||q.t==='exit'||(q.t==='beacon'&&q.lit)||q.t==='gen'&&q.on))lamp(q.x*T+16-cx,q.y*T+16-cy,90,.7);if(S.ember)lamp(S.ember.x-cx,S.ember.y-cy,120,.8);if(S.sand)lamp(S.sand.x-cx,S.sand.y-cy,100,.6)})(window.lightX);
window.hudX=(o=>function(){o&&o();if(FLR==='hotel'||!started)return;X.textAlign='right';X.font='700 16px '+FU;const C=(s,c,y)=>{X.fillStyle='rgba(0,0,0,.6)';X.fillRect(W-232,y-18,222,24);X.fillStyle=c;X.fillText(s,W-16,y)};let y=150;
 C(FL[FLR].short,'#d9b86a',y);y+=28;
 if(S.clock!=null){C('⏳ '+Math.ceil(S.clock)+' с',S.clock<15?'#f55':'#fd9',y);y+=28}
 if(FLR==='stair'){C('Жар: '+Math.floor(S.heat||0)+'%',S.heat>65?'#f63':'#fc8',y);y+=28}
 if(FLR==='garden'){C('Фонари: '+(S.lant||0)+'/3   Ножницы: '+(P.shear||0),'#cfa',y);y+=28}
 if(FLR==='archive'){C('Пропуска: '+(S.cards||0)+'/3','#8cf',y);y+=28}
 if(S.dam&&P.room===100){C('Фаза '+Math.min(3,S.dam.ph+1)+'/3','#f84',y);y+=28}
 if(S.mute){X.save();X.globalAlpha=.85;X.fillStyle='#ddd';X.beginPath();X.ellipse(W/2,H/2-40,60,80,0,0,7);X.fill();X.fillStyle='#111';X.fillRect(W/2-35,H/2-60,22,6);X.fillRect(W/2+13,H/2-60,22,6);X.fillRect(W/2-20,H/2+5,40,3);X.restore();X.textAlign='center';X.fillStyle='#fff';X.fillText('ЗАМРИ',W/2,H/2+70)}
 if(S.turn){X.fillStyle='#000';X.fillRect(W/2-80,H/2+60,160,10);X.fillStyle='#fd4';X.fillRect(W/2-80,H/2+60,160*(1-S.turn.t/1.6),10)}
 if(S.win&&FLR==='hotel'){} X.textAlign='left'})(window.hudX);
// hotel win → offer mines
addEventListener('keydown',e=>{if(started&&S&&S.win&&e.code==='KeyN'){const nx={hotel:'mines',back:'hotel',garden:'hotel',archive:'hotel',mines:null,stair:'mines'}[FLR];if(nx){e.stopImmediatePropagation();e.preventDefault();goFloor(nx,(Math.random()*2147483647)|0,false)}}},true);
const _pr=window.preUpdateX;window.preUpdateX=function(dt){_pr(dt);if(S&&S.win&&!S._fu){S._fu=1;if(FLR==='hotel'){unlock('mines');S.winN='N — спуститься в Копи «Глубокий Шов» (этаж 2)'}else if(!S.winN||FLR!=='mines')S.winN=(S.winN?S.winN+'   ':'')+'N — '+(FLR==='stair'?'вернуться в Копи':'вернуться в Отель')}};
// ---------- music: procedural per-floor ambience (generated live, no samples) ----------
const MOOD={mines:{root:55,sc:[0,3,7,10],wave:'triangle',bpm:50,col:'brown'},back:{root:73.4,sc:[0,1,6,7],wave:'sine',bpm:90,col:'tick'},garden:{root:65.4,sc:[0,2,7,9],wave:'sine',bpm:40,col:'wind'},archive:{root:61.7,sc:[0,3,5,8],wave:'triangle',bpm:46,col:'paper'},stair:{root:49,sc:[0,1,5,8],wave:'sawtooth',bpm:56,col:'fire'}};
let mt=0,mi=0;
function musTick(){if(!AC||!MG||FLR==='hotel'||!started||ELEV||!S||S.dead||S.win||MUTE)return;const m=MOOD[FLR];const now=AC.currentTime;const vol=(window.SET&&SET.music!=null?SET.music:1)*.05;if(now<mt)return;mt=now+60/m.bpm;mi++;
 const f=m.root*Math.pow(2,m.sc[mi%m.sc.length]/12)*(mi%8<4?1:2);const o=AC.createOscillator(),g=AC.createGain();o.type=m.wave;o.frequency.value=f;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(vol,now+.4);g.gain.exponentialRampToValueAtTime(.0001,now+60/m.bpm*2.2);o.connect(g);g.connect(MG);o.start(now);o.stop(now+60/m.bpm*2.4);
 if(mi%2===0){const o2=AC.createOscillator(),g2=AC.createGain();o2.type='sine';o2.frequency.value=m.root/2;g2.gain.setValueAtTime(vol*.8,now);g2.gain.exponentialRampToValueAtTime(.0001,now+2.5);o2.connect(g2);g2.connect(MG);o2.start(now);o2.stop(now+2.6)}
 if(m.col==='tick'){const o3=AC.createOscillator(),g3=AC.createGain();o3.type='square';o3.frequency.value=2400;g3.gain.setValueAtTime(vol*.4,now);g3.gain.exponentialRampToValueAtTime(.0001,now+.03);o3.connect(g3);g3.connect(MG);o3.start(now);o3.stop(now+.05)}
 else if(Math.random()<.35&&typeof noise==='function')noise(.6,vol*1.2,m.col==='fire'?400:m.col==='wind'?900:m.col==='paper'?3000:150)}
setInterval(musTick,120);
window.FMUS=room=>FLR==='hotel'?'music_hotel':room&&room.t==='shop'?'music_shop':null;
window.FAMB=()=>FLR==='hotel'?'rain':FLR==='garden'?'rain':null;
// ---------- lobby floor select ----------
let LOBF='hotel';
function mkSel(){const row=document.querySelector('[data-s]');if(!row||document.getElementById('flsel'))return;const d=document.createElement('div');d.className='row';d.id='flsel';row.parentNode.parentNode.insertBefore(d,row.parentNode.nextSibling);paintSel()}
function paintSel(){const d=document.getElementById('flsel');if(!d)return;d.innerHTML='<b>Этаж:</b> '+Object.keys(FL).map(f=>'<button data-f="'+f+'" '+(UNL[f]?'':'disabled title="Закрыто"')+' class="'+(f===LOBF?'on':'')+'">'+(UNL[f]?'':'🔒')+FL[f].short+'</button>').join(' ');
 d.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{LOBF=b.dataset.f;try{netSend({t:'cfg',floor:LOBF})}catch(e){}paintSel()})}
const _rl=renderLobby;renderLobby=function(){_rl();mkSel();paintSel()};
const _ss=soloStart;soloStart=function(){setFLR(LOBF);_ss()};
setInterval(mkSel,1000);
const _tl=toLobby;toLobby=function(){setFLR('hotel');_tl()};
// test hooks
window.__fl={FL,UNL,unlockAll(){for(const f in FL)UNL[f]=1;saveU();paintSel()},go(f,seed){setFLR(f);if(typeof showLobby==="function")showLobby(false);reset({seed:seed||1234,start:0});started=true;ELEV=null},
 tp(n){const r=rooms[n],p=randomFloor(r);P.x=p.x;P.y=p.y;for(let k=0;k<n;k++){const d=doors[k];if(d){d.open=true;d.locked=false;d.sealed=false;d.vine=false}}enterRoom(r)},
 interact:o=>myInteract(o),win:()=>S.win,state:()=>({FLR,room:P.room,hp:P.hp,dead:S.dead,win:S.win,clock:S.clock,heat:S.heat,cards:S.cards,lant:S.lant,dam:S.dam&&S.dam.ph,nest:S.nest&&S.nest.i})};
})();
