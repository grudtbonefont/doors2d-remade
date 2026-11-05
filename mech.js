// mech.js — extra mechanics (original take): room variants, items, tokens, pre-run shop, modifiers, achievements, stats, stash, seasons, minigames.
'use strict';
const LS=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},LW=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let TOK=LS('d2tok',0),STAT=LS('d2stat',{runs:0,deaths:0,best:0,doors:0,gold:0,tok:0,time:0,wins:0,by:{}}),ACH=LS('d2ach',{}),PRE=LS('d2pre',[]),MODS=LS('d2mods',{}),STASH=LS('d2stash',null),REVS=LS('d2revs',0);
const saveAll=()=>{LW('d2tok',TOK);LW('d2stat',STAT);LW('d2ach',ACH);LW('d2pre',PRE);LW('d2mods',MODS);LW('d2stash',STASH);LW('d2revs',REVS)};
// ---- items ----
Object.assign(ITEM,{skey:{n:'Ключ-отмычка',c:'#e8c46a'},shake:{n:'Трещотка-фонарь',c:'#9cf'},bandage:{n:'Бинт',c:'#f4f0e6'},berries:{n:'Сумрачные ягоды',c:'#7a5cff'},glowstick:{n:'Светопалочка',c:'#7f8'}});
window.TIPS={flashlight:'F — вкл/выкл, тратит батарею',battery:'Цифра — зарядить фонарик',lockpick:'Вскрывает одну запертую дверь',vitamins:'Ускорение и +15 HP',crucifix:'Изгоняет одну сущность',key:'Открывает дверь этой комнаты',lighter:'Свет без батареи, топливо тает',candle:'Мягкий свет, отпугивает Шорох',
 skey:'Открывает 3 замка (осталось: см. ниже)',shake:'Цифра — +30% батареи, но громко!',bandage:'Цифра — +35 HP',berries:'Цифра — короткий рывок, +8 HP',glowstick:'Брось (Q/G), чтобы оставить свет'};
const _icon=drawIcon;drawIcon=function(g,it,x,y,s){if(!['skey','shake','bandage','berries','glowstick'].includes(it))return _icon(g,it,x,y,s);g.save();g.translate(x,y);g.scale(s/32,s/32);
 if(it==='skey'){g.rotate(-.7);g.strokeStyle='#e8c46a';g.lineWidth=3;g.beginPath();g.arc(-8,0,6,0,7);g.stroke();g.fillStyle='#e8c46a';g.fillRect(-2,-1.5,16,3);g.fillRect(9,1,2,5);g.fillRect(13,1,2,4);g.fillStyle='#8a6a2a';g.beginPath();g.arc(-8,0,2,0,7);g.fill()}
 else if(it==='shake'){g.rotate(-.5);g.fillStyle='#4a5a6a';rr(g,-12,-5,18,10,3);g.fill();g.fillStyle='#9cf';g.fillRect(6,-6,5,12);g.strokeStyle='#cde';g.lineWidth=1.5;for(let i=-9;i<4;i+=4){g.beginPath();g.moveTo(i,-5);g.lineTo(i,5);g.stroke()}g.strokeStyle='rgba(160,220,255,.7)';g.beginPath();g.arc(-14,0,4,1.8,4.5);g.stroke()}
 else if(it==='bandage'){g.rotate(.5);g.fillStyle='#f4f0e6';rr(g,-12,-6,24,12,4);g.fill();g.fillStyle='#e8ddc6';g.fillRect(-4,-6,8,12);g.fillStyle='#c33';g.fillRect(-1,-4,2,8);g.fillRect(-4,-1,8,2)}
 else if(it==='berries'){[[-5,-3],[4,-4],[0,4],[-7,5],[7,4]].forEach(([a,b])=>{g.fillStyle='#4a2c9a';g.beginPath();g.arc(a,b,5,0,7);g.fill();g.fillStyle='#a890ff';g.beginPath();g.arc(a-1.5,b-1.5,1.4,0,7);g.fill()});g.fillStyle='#3a6a2a';g.beginPath();g.ellipse(0,-10,6,2.5,.3,0,7);g.fill()}
 else if(it==='glowstick'){g.rotate(.7);g.fillStyle='rgba(120,255,150,.35)';rr(g,-14,-6,28,12,6);g.fill();g.fillStyle='#8f9';rr(g,-12,-3,24,6,3);g.fill();g.fillStyle='#fff';g.fillRect(-9,-1,14,1.5);g.fillStyle='#333';g.fillRect(-14,-3,3,6)}
 g.restore()};
// ---- solids & room variants ----
Object.assign(SOLID,{table:1,tub:1,statue:1,fountain:1,medcab:1,stash:1,safe:1,bush:1,sink:1,shelfs:1});
const LBL={hall:'ГАЛЕРЕЯ',dining:'СТОЛОВАЯ',storage:'КЛАДОВАЯ',bath:'УМЫВАЛЬНАЯ',courtyard:'ВНУТРЕННИЙ ДВОР',infirmary:'ЛАЗАРЕТ',study:'КАБИНЕТ'};
const _gen=gen;gen=function(){_gen();const sea=(typeof season==='function')?season():null;
 const free=(r,x,y)=>tiles[idx(x,y)]===1&&rmap[idx(x,y)]===r.n&&!occ.has(idx(x,y))&&!nearDoor(r,x,y)&&x>r.x0&&x<r.x0+r.w-1&&y>r.y0&&y<r.y0+r.h-1;
 const ok=r=>{if(!r.west||!r.east)return true;const A=innerOf(r.west,r),B=innerOf(r.east,r);return bfs(r,A[0],A[1],B[0],B[1])};
 const tryPut=(r,t,x,y,ex)=>{if(!free(r,x,y))return null;const o=put(r,t,x,y,ex);if(SOLID[t]&&!ok(r)){o.gone=true;solidObj.delete(idx(x,y));occ.delete(idx(x,y));return null}return o};
 const edgeSpots=r=>{const a=[];for(let x=r.x0+2;x<r.x0+r.w-2;x++){a.push([x,r.y0+1]);a.push([x,r.y0+r.h-2])}return a};
 for(const r of rooms){if(r.t==='reception'){tryPut(r,'stash',r.x0+2,r.y0+1)||tryPut(r,'stash',r.x0+3,r.y0+r.h-2);continue}
  if(r.t==='chase'){for(let i=0;i<ri(2,4);i++){const x=ri(r.x0+3,r.x0+r.w-4),y=ri(r.y0+2,r.y0+r.h-3);tryPut(r,'tar',x,y)}continue}
  if(r.t==='halt'){if(RNG()<.5)for(let x=r.x0+3;x<r.x0+r.w-3;x+=ri(3,6))tryPut(r,'ink',x,r.y0+(RNG()<.5?1:r.h-2));continue}
  if(r.t==='greenhouse'){for(let i=0;i<2;i++){const p=pick(edgeSpots(r));tryPut(r,'bush',p[0],p[1])}continue}
  if(r.t!=='normal'||r.n<3||r.dupe)continue;
  let sub=null;const R=RNG();if(r.w>=17&&r.h<=9)sub='hall';else if(R<.12)sub='dining';else if(R<.22)sub='storage';else if(R<.31)sub='bath';else if(R<.38&&!r.dark&&r.h>=10)sub='courtyard';else if(R<.44)sub='infirmary';else if(R<.52)sub='study';
  if(!sub)continue;r.sub=sub;r.label=LBL[sub];const cx=r.x0+Math.floor(r.w/2),cy=r.y0+Math.floor(r.h/2);
  if(sub==='hall'){for(let x=r.x0+3;x<r.x0+r.w-3;x+=4)tryPut(r,RNG()<.5?'statue':'bench',x,r.y0+1)}
  else if(sub==='dining'){for(let k=-1;k<=1;k++){tryPut(r,'table',cx+k,cy);tryPut(r,'chair',cx+k,cy-1);tryPut(r,'chair',cx+k,cy+1)}}
  else if(sub==='storage'){for(let i=0;i<6;i++){const p=pick(edgeSpots(r));tryPut(r,'crate',p[0],p[1])}if(RNG()<.55){const p=pick(edgeSpots(r));tryPut(r,'safe',p[0],p[1],{code:0})}}
  else if(sub==='bath'){tryPut(r,'tub',r.x0+2,r.y0+1);tryPut(r,'sink',r.x0+4,r.y0+1);tryPut(r,'sink',r.x0+6,r.y0+1);if(RNG()<.5)tryPut(r,'medcab',r.x0+r.w-3,r.y0+1)}
  else if(sub==='courtyard'){tryPut(r,'fountain',cx,cy);for(let i=0;i<4;i++){const p=pick(edgeSpots(r));tryPut(r,RNG()<.5?'bush':'bench',p[0],p[1])}}
  else if(sub==='infirmary'){for(let i=0;i<2;i++){const p=pick(edgeSpots(r));tryPut(r,'medcab',p[0],p[1])}}
  else if(sub==='study'){for(let i=0;i<4;i++){const p=pick(edgeSpots(r));tryPut(r,'shelf',p[0],p[1])}if(RNG()<.5){const p=pick(edgeSpots(r));tryPut(r,'safe',p[0],p[1])}}
 }
 if(sea==='halloween')for(const r of rooms)if(r.t==='normal'&&RNG()<.35){const p=pick(edgeSpots(r));if(p)tryPut(r,'pumpkin',p[0],p[1])}
};
// ---- object drawing ----
window.drawObjX=function(o,px,py,t){const g=X,cx=px+16,cy=py+16,sh=()=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(cx+2,py+28,13,4,0,0,7);g.fill()};
 switch(o.t){
 case 'table':sh();g.fillStyle='#3a2214';g.fillRect(px+1,py+6,30,22);g.fillStyle='#efe6d2';g.fillRect(px+1,py+4,30,20);g.fillStyle='#d8ccb0';g.fillRect(px+1,py+20,30,4);g.fillStyle='#c8a04a';g.beginPath();g.arc(cx,py+13,4,0,7);g.fill();g.fillStyle='#fff';g.fillRect(cx-1,py+5,2,6);if(HQ())glow(g,cx,py+5,10,'255,210,120',.5);break;
 case 'chair':g.fillStyle='#4a2c18';rr(g,px+9,py+8,14,14,3);g.fill();g.fillStyle='#7a1e22';rr(g,px+10,py+9,12,10,2);g.fill();g.fillStyle='rgba(255,200,160,.15)';g.fillRect(px+11,py+10,10,2);break;
 case 'tub':sh();g.fillStyle='#e8e4dc';rr(g,px-14,py+3,44,24,11);g.fill();g.fillStyle='#24323a';rr(g,px-10,py+7,36,16,8);g.fill();g.fillStyle='rgba(140,200,220,.25)';g.fillRect(px-6,py+10,20,2);g.fillStyle='#c8a04a';g.fillRect(px+24,py+4,3,4);break;
 case 'sink':g.fillStyle='#e8e4dc';rr(g,px+5,py+4,22,16,6);g.fill();g.fillStyle='#4a5a62';g.beginPath();g.ellipse(cx,py+12,7,4,0,0,7);g.fill();g.fillStyle='#c8a04a';g.fillRect(cx-1,py+2,2,6);g.fillStyle='rgba(180,220,255,.25)';g.fillRect(px+7,py-6,18,8);break;
 case 'statue':sh();g.fillStyle='#2a2420';g.fillRect(px+6,py+18,20,10);g.fillStyle='#8a8478';g.beginPath();g.ellipse(cx,py+14,7,8,0,0,7);g.fill();g.beginPath();g.arc(cx,py+4,5,0,7);g.fill();g.fillStyle='rgba(255,255,255,.2)';g.beginPath();g.arc(cx-2,py+3,2,0,7);g.fill();g.strokeStyle='#e8b84a';g.lineWidth=.8;g.beginPath();g.moveTo(cx-3,py+9);g.lineTo(cx+1,py+15);g.stroke();break;
 case 'bench':g.fillStyle='#4a2c18';g.fillRect(px+1,py+12,30,9);g.fillStyle='#6b4426';g.fillRect(px+1,py+11,30,3);g.fillStyle='#222';g.fillRect(px+3,py+21,3,5);g.fillRect(px+26,py+21,3,5);break;
 case 'fountain':g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(cx,cy+6,24,10,0,0,7);g.fill();g.fillStyle='#6a6458';g.beginPath();g.ellipse(cx,cy+2,22,13,0,0,7);g.fill();g.fillStyle='#1c3a48';g.beginPath();g.ellipse(cx,cy+1,18,10,0,0,7);g.fill();
  g.strokeStyle='rgba(170,220,240,.4)';for(let i=0;i<3;i++){const r2=((t*14+i*6)%18);g.beginPath();g.ellipse(cx,cy+1,r2,r2*.55,0,0,7);g.stroke()}g.fillStyle='#8a8478';g.fillRect(cx-2,cy-12,4,12);g.fillStyle='rgba(200,240,255,.6)';for(let i=0;i<5;i++){const a=i/5*6.28+t;g.fillRect(cx+Math.cos(a)*((t*20+i*3)%8),cy-12+((t*30+i*7)%12),1.5,1.5)}break;
 case 'medcab':sh();g.fillStyle='#d8d4c8';rr(g,px+4,py+2,24,24,3);g.fill();g.strokeStyle='#8a8478';g.stroke();g.fillStyle=o.used?'#8a5a5a':'#c33';g.fillRect(cx-2,py+7,4,14);g.fillRect(cx-7,py+12,14,4);break;
 case 'stash':{sh();const q=g.createLinearGradient(px,py,px,py+28);q.addColorStop(0,'#4a2a5a');q.addColorStop(1,'#1a0c22');g.fillStyle=q;rr(g,px+2,py+4,28,24,5);g.fill();g.strokeStyle='#c8a0ff';g.lineWidth=1.2;g.stroke();const p=.5+.5*Math.sin(t*2);glow(g,cx,cy,22,'180,120,255',.25+.15*p);g.fillStyle='#e8d0ff';g.beginPath();g.moveTo(cx,py+9);g.lineTo(cx+5,cy+1);g.lineTo(cx,py+23);g.lineTo(cx-5,cy+1);g.fill();if(STASH){g.save();g.globalAlpha=.8;drawIcon(g,STASH,cx,py-6+Math.sin(t*2)*2,16);g.restore()}break}
 case 'safe':sh();g.fillStyle='#2a2e34';rr(g,px+3,py+3,26,25,3);g.fill();g.fillStyle='#3e444c';rr(g,px+6,py+6,20,19,2);g.fill();g.strokeStyle='#c8a04a';g.lineWidth=1.5;g.beginPath();g.arc(cx,py+15,5,0,7);g.stroke();g.save();g.translate(cx,py+15);g.rotate(t*(o.used?0:.6));g.fillStyle='#c8a04a';g.fillRect(-.7,-5,1.4,4);g.restore();if(o.used){g.fillStyle='#111';g.fillRect(px+6,py+6,20,19)}break;
 case 'tar':{g.fillStyle='rgba(6,4,3,.92)';g.beginPath();for(let i=0;i<10;i++){const a=i/10*6.28,r2=15+3*Math.sin(i*2.3+hash(o.x,o.y));g.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2*.7)}g.closePath();g.fill();g.fillStyle='rgba(255,200,140,.1)';g.beginPath();g.ellipse(cx-4,cy-3,5,2,0,0,7);g.fill();const b=(t*.8+o.x)%1;g.strokeStyle='rgba(60,50,40,'+(1-b)+')';g.beginPath();g.arc(cx+3,cy+2,b*5,0,7);g.stroke();break}
 case 'ink':g.fillStyle='rgba(10,30,50,.7)';g.beginPath();g.ellipse(cx,py+(o.y===rooms[o.r].y0+1?8:24),12,5,0,0,7);g.fill();g.fillStyle='rgba(120,220,255,.25)';g.fillRect(cx-1,py,2,((t*20+o.x*3)%16));break;
 case 'bush':sh();for(let i=0;i<6;i++){g.fillStyle=i%2?'#2a4a22':'#1e3a1a';g.beginPath();g.arc(cx+Math.cos(i)*7,cy+Math.sin(i*1.7)*5,8,0,7);g.fill()}if(!o.used)[[-5,-2],[4,3],[2,-6]].forEach(([a,b])=>{g.fillStyle='#6a4cff';g.beginPath();g.arc(cx+a,cy+b,2.4,0,7);g.fill()});break;
 case 'pumpkin':{const f=.8+.2*Math.sin(t*9+o.x);glow(g,cx,cy+6,26,'255,140,30',.35*f);g.fillStyle='#c8601a';g.beginPath();g.ellipse(cx,cy+8,11,8,0,0,7);g.fill();g.strokeStyle='#8a3a0a';g.beginPath();g.ellipse(cx,cy+8,4,8,0,0,7);g.stroke();g.fillStyle='#3a5a1a';g.fillRect(cx-1,cy-2,3,4);g.fillStyle='rgba(255,220,90,'+f+')';g.beginPath();g.moveTo(cx-6,cy+5);g.lineTo(cx-3,cy+8);g.lineTo(cx-7,cy+8);g.moveTo(cx+6,cy+5);g.lineTo(cx+3,cy+8);g.lineTo(cx+7,cy+8);g.fill();g.fillRect(cx-5,cy+11,10,2);break}
 }};
window.lightX=function(cx,cy){for(const o of rooms[P.room].objs)if(!o.gone&&(o.t==='pumpkin'||o.t==='stash'))lamp(o.x*T+16-cx,o.y*T+16-cy,70,.6)};
// ---- interaction ----
const NEWI={medcab:o=>!o.used,stash:()=>1,safe:o=>!o.used,bush:o=>!o.used};
const _near=nearObj;nearObj=function(){const a=_near();let best=a,bd=a?Math.hypot(a.x*T+16-P.x,a.y*T+16-P.y):46;for(const o of rooms[P.room].objs){if(o.gone||!NEWI[o.t]||!NEWI[o.t](o))continue;const d=Math.hypot(o.x*T+16-P.x,o.y*T+16-P.y);if(d<bd){bd=d;best=o}}return best};
const give=it=>{if(addItem(it)){SND.pick();msg('Найдено: '+ITEM[it].n);if(it==='skey')P.skey=3;return true}return false};
const _inter=interact;interact=function(){if(S.safe)return;
 if(!P.hidden){const o=nearObj();
  if(o&&NEWI[o.t]){switch(o.t){
   case 'medcab':o.used=true;SND.drawer();give(Math.random()<.6?'bandage':'berries');break;
   case 'bush':o.used=true;tone(300,.08,'triangle',.06);give('berries');break;
   case 'safe':S.safe={o,a:0,dir:1,hits:0,zone:Math.random()*5+.6,miss:0};window.d2modal=true;break;
   case 'stash':{const h=P.inv[P.sel];if(STASH){if(addItem(STASH)){msg('Из Тайника: '+ITEM[STASH].n,2.5);if(STASH==='skey')P.skey=3;STASH=null;SND.holy();saveAll()}}else if(h&&h!=='flashlight'){STASH=h;P.inv[P.sel]=null;saveAll();SND.holy();msg('«'+ITEM[h].n+'» — в Тайнике. Он ждёт тебя в следующем забеге.',3.5);ach('rift')}else msg('Тайник пуст. Возьми предмет в руку и положи его сюда — он сохранится между забегами.',3.5);break}
  }return}
  if(o&&o.t==='dresser'&&!o.used&&!o.key){if(MODS.empty&&Math.random()<.4){o.used=true;SND.drawer();msg('Пусто...');return}
   if(Math.random()<.13){o.used=true;SND.drawer();give(pick(['skey','shake','bandage','bandage','berries','glowstick']));return}}
  if(!o){const d=nearLockedDoor();if(d&&!d.code&&!P.inv.includes('key')&&P.inv.includes('skey')){d.locked=false;netEv({k:'door',n:doors.indexOf(d)});SND.lock();P.skey=(P.skey||3)-1;if(P.skey<=0){removeItem('skey');msg('Ключ-отмычка сломалась')}else msg('Открыто ключом-отмычкой (ещё '+P.skey+')');return}}}
 return _inter()};
const _use=useSlot;useSlot=function(i){const it=P.inv[i];
 if(it==='bandage'){P.sel=i;if(P.hp>=maxHp()){msg('Ты и так цел');return}P.hp=Math.min(maxHp(),P.hp+35);removeItem('bandage');SND.pick();msg('Перевязка: +35 HP');RUN.heal++;return}
 if(it==='berries'){P.sel=i;P.vit=Math.max(P.vit||0,3.5);P.hp=Math.min(maxHp(),P.hp+8);removeItem('berries');SND.pick();msg('Сумрачные ягоды: рывок!');RUN.berry=4;return}
 if(it==='shake'){P.sel=i;if(P.inv.includes('flashlight')){P.bat=Math.min(100,P.bat+30);P.noise=1;S.shake=.15;for(let k=0;k<4;k++)setTimeout(()=>tone(140+Math.random()*80,.05,'square',.08),k*70);msg('Трещотка: +30% батареи (тебя слышно!)')}else msg('Нужен фонарик');return}
 return _use(i)};
const maxHp=()=>MODS.fragile?60:100;
// ---- run lifecycle ----
let RUN={heal:0,berry:0};
const MODLIST=[['slip','Скользкий пол','Ты скользишь на поворотах',15],['fog','Туман','Свет бьёт ближе',15],['fragile','Хрупкое здоровье','Максимум 60 HP',25],['empty','Пустые ящики','Ящики часто пусты',15],['norev','Без возрождений','Смерть окончательна',30],['stingy','Скупой Портье','Цены в лавке ×1.5',10]];
const modBonus=()=>MODLIST.reduce((a,m)=>a+(MODS[m[0]]?m[3]:0),0);
const BASESHOP=SHOP.map(s=>s[1]);
const PRESHOP=[['bandage','Бинт',8],['lockpick','Отмычка',10],['skey','Ключ-отмычка',22],['shake','Трещотка-фонарь',14],['glowstick','Светопалочка',6],['vitamins','Витамины',12],['crucifix','Распятие',55],['rev','Доп. возрождение',35]];
function startRun(){S._pre=true;RUN={heal:0,berry:0,t0:performance.now(),hid:0};STAT.runs++;
 SHOP.forEach((s,i)=>s[1]=Math.round(BASESHOP[i]*(MODS.stingy?1.5:1)));S.fog=!!MODS.fog;if(MODS.fragile)P.hp=60;if(MODS.norev)P.revived=true;
 for(const it of PRE){if(it==='rev'){REVS++;continue}if(addItem(it)&&it==='skey')P.skey=3}if(PRE.length){msg('Снаряжение из лавки жетонов уже в инвентаре',3);ach('shopper')}PRE=[];if(modBonus())ach('brave');saveAll()}
function endRun(win){if(S._paid)return;S._paid=true;const b=P.best||0,base=Math.floor(b/4)+Math.floor(P.gold/25)+(win?40:0),earn=Math.round(base*(1+modBonus()/100));TOK+=earn;S._earn=earn;
 STAT.tok+=earn;STAT.doors+=b;STAT.gold+=P.gold;STAT.best=Math.max(STAT.best,b);STAT.time+=(performance.now()-(RUN.t0||performance.now()))/1000;if(win)STAT.wins++;else{STAT.deaths++;const c=S.dead||'?';STAT.by[c]=(STAT.by[c]||0)+1}
 if(Object.keys(STAT.by).length>=5)ach('scholar');if(STAT.runs>=10)ach('regular');saveAll()}
window.d2meta={get TOK(){return TOK},set TOK(v){TOK=v;saveAll()},get STAT(){return STAT},get ACH(){return ACH},get MODS(){return MODS},get STASH(){return STASH},get PRE(){return PRE},get REVS(){return REVS},endRun,startRun};
const _rev=revive;revive=function(){const was=P.revived;_rev();if(!was&&!S.dead)ach('second')};
const _cru=useCrucifix;useCrucifix=function(n,x,y,v){_cru(n,x,y,v);ach('faith')};
// ---- achievements ----
const ACHL={first:['Первый шаг','Открой дверь 001'],d25:['Постоялец','Дойди до двери 025'],d50:['Книжный червь','Дойди до библиотеки (050)'],d75:['Старожил','Дойди до двери 075'],win:['Свет в конце','Восстанови электричество (100)'],
 faith:['Вера','Изгони сущность распятием'],second:['Второй шанс','Возродись'],safe:['Медвежатник','Взломай сейф'],rift:['Тайник','Оставь предмет на следующий забег'],shopper:['Подготовка','Купи снаряжение за жетоны'],brave:['Смельчак','Начни забег с модификатором'],
 scholar:['Знаток','Погибни от 5 разных угроз'],regular:['Завсегдатай','Сыграй 10 забегов'],medic:['Санитар','Используй 3 бинта за забег'],nolight:['Во тьме','Дойди до 030 не включая фонарик'],rich:['Толстый кошелёк','Собери 300 золота']};
let TOASTS=[];function ach(k){if(ACH[k]||!ACHL[k])return;ACH[k]=Date.now();TOK+=10;saveAll();TOASTS.push({k,t:4.5});try{SND.holy()}catch(e){}}window.d2ach=ach;window.d2ACHL=ACHL;
// ---- per-frame hooks ----
let prevX=0,prevY=0,vx=0,vy=0,usedLight=false;
window.preUpdateX=function(dt){if(!started){S._pre=false;return}if(!S._pre)startRun();
 if(P.light)usedLight=true;if(P.room===0)usedLight=P.light;
 if(P.hp>maxHp())P.hp=maxHp();
 const room=rooms[P.room];let mx=P.x-prevX,my=P.y-prevY;
 if(Math.abs(mx)<40&&Math.abs(my)<40&&!S.dead&&!P.hidden){
  for(const o of room.objs)if(o.t==='tar'&&!o.gone&&Math.hypot(o.x*T+16-P.x,o.y*T+16-P.y)<17){P.x=prevX+mx*.45;P.y=prevY+my*.45;if(Math.random()<.2)puff(P.x,P.y+8,0,-5,.5,2,'20,15,10',1);break}
  if(MODS.slip){const nx=P.x+vx*.55,ny=P.y+vy*.55;if(passableAt(nx,P.y))P.x=nx;if(passableAt(P.x,ny))P.y=ny;vx=(P.x-prevX)*.6;vy=(P.y-prevY)*.6}}
 prevX=P.x;prevY=P.y;
 if(RUN.berry>0)RUN.berry-=dt;
 const b=window.FLR&&FLR!=='hotel'?0:P.best;if(b>=1)ach('first');if(b>=25)ach('d25');if(b>=50)ach('d50');if(b>=75)ach('d75');if(b>=30&&!usedLight)ach('nolight');if(P.gold>=300)ach('rich');if(RUN.heal>=3)ach('medic');
 if(S.win){if(!window.FLR||FLR==='hotel')ach('win');endRun(true)}if(S.dead&&(P.revived||MODS.norev)&&!REVS)endRun(false);
 if(S.safe)stepSafe(dt)};
function passableAt(x,y){const r=9;for(const [a,b] of [[-r,-r],[r,-r],[-r,r],[r,r]])if(!passable(Math.floor((x+a)/T),Math.floor((y+b)/T)))return false;return true}
const _reset=reset;reset=function(o){try{if(S&&S._pre&&!S._paid&&P&&P.best>0)endRun(!!S.win)}catch(e){}return _reset(o)};
function stepSafe(dt){const s=S.safe;s.a+=dt*(2.4+s.hits*1.1)*s.dir;if(s.a>6.283)s.a-=6.283;if(s.a<0)s.a+=6.283;if(Math.hypot(s.o.x*T+16-P.x,s.o.y*T+16-P.y)>70){S.safe=null;window.d2modal=false}}
function safeHit(){const s=S.safe,d=Math.abs(((s.a-s.zone+9.42)%6.283)-3.14);if(d<.32){s.hits++;tone(900+s.hits*200,.06,'square',.07);s.dir*=-1;s.zone=(s.zone+2+Math.random()*2)%6.283;if(s.hits>=3){s.o.used=true;S.safe=null;window.d2modal=false;const g=ri(40,90);P.gold+=g;SND.gold();msg('Сейф открыт! +'+g+' золота',3);give(pick(['skey','crucifix','bandage','vitamins','glowstick']));ach('safe')}}else{s.miss++;SND.bad();S.shake=.1;if(s.miss>=3){S.safe=null;window.d2modal=false;msg('Механизм заклинило. Попробуй позже.',2.5);s.o.used=false}}}
addEventListener('keydown',e=>{if(!started)return;if(S.safe){if(e.code==='KeyE'||e.code==='Space'){safeHit()}else if(e.code==='Escape'){S.safe=null;window.d2modal=false}e.stopImmediatePropagation();e.preventDefault();return}
 if(e.code==='KeyB'&&S.dead&&P.revived&&REVS>0&&!MODS.norev){REVS--;saveAll();P.revived=false;revive();msg('Запасное возрождение использовано (осталось '+REVS+')',3)}},true);
addEventListener('pointerdown',e=>{if(S&&S.safe){safeHit();e.stopImmediatePropagation()}},true);
window.hudX=function(){const t=S.t;
 // prompt for new objects
 if(!S.dead&&!P.hidden&&S.codeInput===null&&!S.shop&&!S.safe){const o=nearObj();if(o&&NEWI[o.t]){const h={medcab:'[E] Открыть аптечку',bush:'[E] Сорвать ягоды',safe:'[E] Взломать сейф',stash:STASH?'[E] Забрать из Тайника':'[E] Положить в Тайник'}[o.t]||(window.FHINT?FHINT(o):'');X.textAlign='center';X.font='600 16px '+FU;X.fillStyle='#fff';X.fillText(h,W/2,H-80)}}
 // chips: tokens, mods, revive stock
 X.textAlign='right';X.font='600 13px '+FU;let y=26;const chip=(s,c)=>{const w=X.measureText(s).width+18;box(W-w-10,y-16,w,24);X.fillStyle=c;X.fillText(s,W-19,y);y+=30};
 chip('Жетоны: '+TOK,'#e8c46a');if(modBonus())chip('Модификаторы +'+modBonus()+'%','#f88');if(REVS)chip('Возрождения: '+REVS,'#c8a0ff');if(P.inv.includes('skey'))chip('Ключ-отмычка: '+(P.skey||3),'#e8c46a');
 if(S.dead&&P.revived&&REVS>0&&!MODS.norev){X.textAlign='center';X.font='700 22px '+FS;X.fillStyle='rgba(200,160,255,'+(.6+.4*Math.sin(t*4))+')';X.fillText('[B] Запасное возрождение ('+REVS+')',W/2,H-110)}
 if(S._earn!=null&&S.dead){X.textAlign='center';X.font='600 16px '+FU;X.fillStyle='#e8c46a';X.fillText('+'+S._earn+' жетонов',W/2,H-140)}
 if(S.safe){const s=S.safe,cx=W/2,cy=H/2;box(cx-130,cy-150,260,260);X.textAlign='center';X.fillStyle='#f0d48a';X.font='700 20px '+FS;X.fillText('СЕЙФ',cx,cy-120);
  X.lineWidth=14;X.strokeStyle='#2a2e34';X.beginPath();X.arc(cx,cy,80,0,7);X.stroke();X.strokeStyle='#e8c46a';X.beginPath();X.arc(cx,cy,80,s.zone-.32,s.zone+.32);X.stroke();
  X.strokeStyle='#fff';X.lineWidth=3;X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+Math.cos(s.a)*90,cy+Math.sin(s.a)*90);X.stroke();X.fillStyle='#c8a04a';X.beginPath();X.arc(cx,cy,10,0,7);X.fill();
  X.font='13px '+FU;X.fillStyle='#ccc';X.fillText('E / тап — когда стрелка в золоте  ('+s.hits+'/3, промахи '+s.miss+'/3)',cx,cy+100)}
 if(P.vit>0||RUN.berry>0){X.fillStyle='rgba(255,200,80,'+(.05+.03*Math.sin(t*12))+')';X.fillRect(0,0,W,H)}};
window.overlayX=function(dt){for(let i=0;i<TOASTS.length;i++){const a=TOASTS[i];a.t-=dt;const k=Math.min(1,a.t,4.5-a.t+.001)*1,y=70+i*62;X.globalAlpha=Math.max(0,Math.min(1,k*2));box(W/2-170,y,340,54);drawTrophy(W/2-145,y+27);X.textAlign='left';X.fillStyle='#f0d48a';X.font='700 16px '+FS;X.fillText('Достижение: '+ACHL[a.k][0],W/2-118,y+23);X.fillStyle='#bbb';X.font='12px '+FU;X.fillText(ACHL[a.k][1]+'  · +10 жетонов',W/2-118,y+41);X.globalAlpha=1}TOASTS=TOASTS.filter(a=>a.t>0)};
function drawTrophy(x,y){X.fillStyle='#e8c46a';X.beginPath();X.moveTo(x-10,y-12);X.lineTo(x+10,y-12);X.quadraticCurveTo(x+10,y+4,x,y+4);X.quadraticCurveTo(x-10,y+4,x-10,y-12);X.fill();X.fillRect(x-2,y+3,4,6);X.fillRect(x-7,y+9,14,3)}
// ---- lobby meta panels ----
function ov(id,title,body){let d=document.getElementById(id);if(!d){d=document.createElement('div');d.className='d2ov';d.id=id;document.body.appendChild(d)}d.innerHTML=`<div class="d2pn"><h2>${title}</h2>${body}<button class="d2b" data-x>Закрыть</button></div>`;d.style.display='flex';d.querySelector('[data-x]').onclick=()=>{d.style.display='none';refreshBar()};return d}
function openShop(){const rows=PRESHOP.map(([k,n,p],i)=>`<div class="d2r"><span>${n} <small style="color:#999">${k==='rev'?'возродиться ещё раз после смерти':TIPS[k]||''}</small></span><button class="d2k" data-b="${i}">${p} ж.</button></div>`).join('');
 const d=ov('d2shop','ЛАВКА ЖЕТОНОВ',`<p style="text-align:center;color:#e8c46a">У тебя: <b>${TOK}</b> жетонов · в рюкзаке на старт: ${PRE.length?PRE.map(k=>k==='rev'?'возрождение':ITEM[k].n).join(', '):'пусто'}</p>${rows}<p style="color:#888;font-size:12px">Жетоны даются за пройденные двери, золото, победу и достижения. Предметы попадут в инвентарь в начале следующего забега.</p>`);
 d.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const [k,,p]=PRESHOP[+b.dataset.b];if(TOK<p){b.textContent='мало';return}if(PRE.length>=5){b.textContent='макс. 5';return}TOK-=p;PRE.push(k);saveAll();openShop()})}
function openMods(){const rows=MODLIST.map(([k,n,dsc,b])=>`<div class="d2r"><span>${n} <small style="color:#999">${dsc}</small></span><label style="color:#f88">+${b}% <input type="checkbox" data-m="${k}" ${MODS[k]?'checked':''}></label></div>`).join('');
 const d=ov('d2mods','МОДИФИКАТОРЫ',`<p style="text-align:center;color:#f88">Бонус к жетонам: +<b id="mb">${modBonus()}</b>%</p>${rows}`);d.querySelectorAll('[data-m]').forEach(c=>c.onchange=()=>{MODS[c.dataset.m]=c.checked;saveAll();d.querySelector('#mb').textContent=modBonus()})}
window.openStats=function(){const DN={rush:'Рой',ambush:'Звонарь',screech:'Шорох',eyes:'Люстра',halt:'Отлив',seek:'Ищейка',figure:'Слухач',snare:'Терновник',dupe:'Двойник',hide:'Теснота'};const h=Math.floor(STAT.time/3600),m=Math.floor(STAT.time/60)%60;
 const by=Object.entries(STAT.by).map(([k,v])=>`${DN[k]||k}: ${v}`).join(' · ')||'—';
 const a=Object.entries(ACHL).map(([k,[n,dsc]])=>`<div class="d2r" style="opacity:${ACH[k]?1:.45}"><span>${ACH[k]?'🏆':'🔒'} <b style="color:#f0d48a">${n}</b> <small style="color:#999">${dsc}</small></span></div>`).join('');
 ov('d2stats','СТАТИСТИКА',`<div class="d2r">Забегов<b>${STAT.runs}</b></div><div class="d2r">Побед<b>${STAT.wins}</b></div><div class="d2r">Смертей<b>${STAT.deaths}</b></div><div class="d2r">Лучшая дверь<b>${pad(STAT.best)}</b></div><div class="d2r">Всего дверей<b>${STAT.doors}</b></div><div class="d2r">Золота собрано<b>${STAT.gold}</b></div><div class="d2r">Жетонов заработано<b>${STAT.tok}</b></div><div class="d2r">Время в отеле<b>${h} ч ${m} мин</b></div><div class="d2r" style="font-size:12px;color:#bbb">Причины: ${by}</div><h2 style="font-size:20px">Достижения ${Object.keys(ACH).length}/${Object.keys(ACHL).length}</h2>${a}`)};
let bar=null;function refreshBar(){if(!bar)return;bar.querySelector('#d2tk').textContent='Жетоны: '+TOK+(STASH?' · В Тайнике: '+ITEM[STASH].n:'')+(REVS?' · Возрождений: '+REVS:'')+(modBonus()?' · Модиф. +'+modBonus()+'%':'')}
function mkBar(){const lb=document.querySelector('#lob .lb');if(!lb||bar)return;bar=document.createElement('div');bar.id='d2meta';bar.style.cssText='margin-top:14px;border-top:1px solid rgba(217,184,106,.3);padding-top:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center';
 bar.innerHTML='<span id="d2tk" style="color:#e8c46a;font-weight:600;width:100%;text-align:center"></span>'+[['shop','Лавка жетонов'],['mods','Модификаторы'],['stats','Статистика и достижения'],['set','Настройки']].map(([k,n])=>`<button data-mt="${k}" style="padding:8px 12px;cursor:pointer">${n}</button>`).join('');lb.appendChild(bar);
 bar.querySelectorAll('[data-mt]').forEach(b=>b.onclick=()=>({shop:openShop,mods:openMods,stats:openStats,set:()=>window.openSettings&&openSettings()})[b.dataset.mt]());refreshBar()}
mkBar();setInterval(()=>{mkBar();refreshBar()},1500);
