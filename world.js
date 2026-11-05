// world.js — room variety, props, interactables, lore and extra ORIGINAL entities for every floor.
(function(){
const XT=['x_pil','x_paint','x_sw','x_crate','x_lad','x_vent','x_note','x_fdoor','x_prop','x_propS'];
Object.assign(SOLID,{x_pil:1,x_crate:1,x_propS:1});
const XI={x_paint:o=>!o.read,x_sw:()=>1,x_crate:o=>!o.gone,x_lad:()=>1,x_vent:()=>1,x_note:o=>!o.gone,x_fdoor:o=>!o.used};
for(const k in XI)NEWI[k]=XI[k];
const FH=window.FHINT;window.FHINT=o=>({x_paint:'[E] Осмотреть картину',x_sw:'[E] Выключатель',x_crate:'[E] Разбить ящик',x_lad:'[E] Лестница',x_vent:'[E] Пролезть в вентиляцию',x_note:'[E] Прочитать записку',x_fdoor:'[E] Открыть дверцу'}[o.t]||(FH?FH(o):''));
// ---------- lore (original) ----------
const LORE={
 hotel:['«Номера не идут по порядку. Я считал до сорока — и снова был в тридцать первом.» — горничная Ф.','«Портье не спит. Он просто закрывает глаза, когда звенит колокольчик.»','«Если шкаф дрожит — не прячься в нём. Там уже кто-то есть.»','«Свет любят не только люди. Мотыли тоже. Гаси фонарь, когда слышишь крылья.»','«Лифт привёз меня сюда в 1931-м. Или это я привёз лифт?» — без подписи','«Ключ от 50-й подходит к 50-й. Остальное — суеверие.»'],
 mines:['«Капает с потолка — отойди. Это не вода.» — бригадир Сеченов','«Угарник ест огни. Не стой в комнате, где гаснут лампы.»','«Шов уходит глубже, чем на картах. Карты врут нарочно.»','«Свечи зажигания держи сухими. Генераторы капризны, как мой тесть.»','«Плотину строили не для воды.»'],
 back:['«Здесь тикает не время. Здесь тикает он.»','«Моя тень отстаёт от меня на три секунды. Не оборачивайся.»','«Песок в склянке тёплый. Будто кто-то держал её в руке.»','«Изнанка — это отель, который забыли дорисовать.»'],
 garden:['«Не дыши жёлтым. Пригнись — пыльца стелется поверху.»','«Пугало двигается, только когда ты на него не смотришь.»','«Садовод стрижёт не кусты.»','«Фонари-обереги зажигали ещё до отеля.»'],
 archive:['«Чернила не любят света. Посвети — и лужа отступит.»','«Каталожный номер 0000 выдан тебе. Поздравляем.»','«Не шуми в читальне. Немой не любит, когда двигаются.»','«Пропуск сектора В выдают только мёртвым. Шутка. Наверное.»'],
 stair:['«Маятник качается с тех пор, как построили колодец. Считай взмахи.»','«Трубы шипят перед искрой. У тебя секунда.»','«Чем ниже — тем жарче. Вентиляция — твоя лучшая подруга.»','«Жестянщик принимает только золото. И зубы.»']};
// ---------- per-floor room variants (own designs) ----------
const RN={
 hotel:['Галерея портретов','Бильярдная','Курительная','Бельевая','Гостиная с колоннами','Коридор с нишами','Номер-люкс','Г-образный холл','Музыкальный салон','Зал с балконом','Кладовая портье','Двойной номер','Комната с ложной дверью','Зимний сад-галерея','Лестничная площадка'],
 mines:['Штрек с крепью','Г-образная выработка','Камера с колоннами','Склад взрывчатки','Подъёмник','Раздевалка горняков','Насосная','Провал с мостками','Штольня с нишами','Ламповая','Забой','Перекрёсток штреков','Двойной штрек'],
 back:['Пустой коридор','Комната-копия','Колонный зал','Ложная лестница','Склад эха','Перекрученная комната','Часовая'],
 garden:['Лабиринт живой изгороди','Беседка','Огород','Пруд с мостком','Оранжерея','Аллея статуй','Компостная'],
 archive:['Картотека','Переплётная','Зал микрофильмов','Коридор стеллажей','Читальня с балконом','Сортировочная','Комната с ложной дверью','Хранилище карт'],
 stair:['Площадка с трубами','Котельная','Лестничный марш','Мостик над шахтой','Щитовая','Ремонтный пролёт']};
const PK={hotel:['sofa','plantpot','clock','vase','piano','bust','lamp'],mines:['barrel','cart','rocks','helmet','beam','drill'],back:['chair','box','tv','shadow'],garden:['bench','pot','hedge','birdbath','rake'],archive:['cabinet','stack','globe','typewriter'],stair:['pipe','gauge','valvebox','toolbox']};
function inside(r,x,y){return x>r.x0&&x<r.x0+r.w-1&&y>r.y0&&y<r.y0+r.h-1}
function free(r,x,y){return inside(r,x,y)&&tiles[idx(x,y)]===1&&!occ.has(idx(x,y))&&!nearDoor(r,x,y)}
function start(r){if(r.west)return innerOf(r.west,r);for(let x=r.x0+1;x<r.x0+r.w-1;x++)for(let y=r.y0+1;y<r.y0+r.h-1;y++)if(passable(x,y))return[x,y];return null}
function reach(r){const s=start(r);if(!s)return false;const seen=new Set([idx(s[0],s[1])]),q=[s];while(q.length){const[x,y]=q.pop();for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+a,ny=y+b,k=idx(nx,ny);if(seen.has(k)||!inside(r,nx,ny)||!passable(nx,ny))continue;seen.add(k);q.push([nx,ny])}}
 const ok=(x,y)=>seen.has(idx(x,y))||[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>seen.has(idx(x+a,y+b)));
 if(r.east){const e=innerOf(r.east,r);if(!seen.has(idx(e[0],e[1])))return false}
 for(const d of r.cds||[]){const e=innerOf(d,r);if(!seen.has(idx(e[0],e[1])))return false}
 for(const o of r.objs){if(o.gone||!inside(r,o.x,o.y))continue;if(!ok(o.x,o.y))return false}return true}
function wall(r,cells){const done=[];for(const[x,y]of cells)if(free(r,x,y)){tiles[idx(x,y)]=0;done.push([x,y])}if(reach(r))return done.length;for(const[x,y]of done)tiles[idx(x,y)]=1;return 0}
function P_(r,t,x,y,ex){if(!free(r,x,y))return null;const o=put(r,t,x,y,ex);if(SOLID[t]&&!reach(r)){o.gone=true;solidObj.delete(idx(x,y));r.objs.pop();objs.pop();occ.delete(idx(x,y));return null}return o}
function spots(r,edge){const a=[];for(let y=r.y0+1;y<r.y0+r.h-1;y++)for(let x=r.x0+1;x<r.x0+r.w-1;x++){if(edge&&!(y===r.y0+1||y===r.y0+r.h-2))continue;if(free(r,x,y))a.push([x,y])}return a}
function some(r,t,n,edge,ex){let c=0;for(let k=0;k<n*4&&c<n;k++){const a=spots(r,edge);if(!a.length)break;const p=a[Math.floor(RNG()*a.length)];if(P_(r,t,p[0],p[1],typeof ex==='function'?ex():ex))c++}return c}
const F=()=>FLR;
// shape builders
const SH={
 L(r){const w=Math.floor(r.w/3),h=Math.floor(r.h/2)-1,top=RNG()<.5,x0=r.x0+Math.floor(r.w/2)-Math.floor(w/2)+ri(-2,2),cells=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++)cells.push([x0+x,top?r.y0+1+y:r.y0+r.h-2-y]);return wall(r,cells)},
 pillars(r){let c=0;for(let x=r.x0+3;x<r.x0+r.w-3;x+=3)for(const y of [r.y0+2,r.y0+r.h-3])if(P_(r,'x_pil',x,y))c++;return c},
 niches(r){const y=r.y0+Math.floor(r.h/2)+(RNG()<.5?-2:2),cells=[];for(let x=r.x0+2;x<r.x0+r.w-2;x++)if((x-r.x0)%4)cells.push([x,y]);return wall(r,cells)},
 split(r){const x=r.x0+Math.floor(r.w/2),gy=ri(r.y0+2,r.y0+r.h-3),cells=[];for(let y=r.y0+1;y<r.y0+r.h-1;y++)if(Math.abs(y-gy)>1)cells.push([x,y]);return wall(r,cells)},
 well(r){const w=Math.max(3,Math.floor(r.w/3)),h=Math.max(2,Math.floor(r.h/3)),x0=r.x0+Math.floor((r.w-w)/2),y0=r.y0+Math.floor((r.h-h)/2),cells=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++)cells.push([x0+x,y0+y]);const n=wall(r,cells);if(n)r.well={x:x0,y:y0,w,h};return n},
 stairs(r){const x=r.x0+ri(3,r.w-5);r.stairs={x,y:r.y0+1,h:r.h-2};const cells=[];for(let y=r.y0+1;y<r.y0+r.h-1;y+=1)if(y!==r.y0+Math.floor(r.h/2)&&y!==r.y0+Math.floor(r.h/2)+1)cells.push([x-1,y]);return wall(r,cells)||1},
 maze(r){const cells=[];for(let x=r.x0+3;x<r.x0+r.w-3;x+=3){const gap=ri(r.y0+2,r.y0+r.h-3);for(let y=r.y0+1;y<r.y0+r.h-1;y++)if(Math.abs(y-gap)>1)cells.push([x,y])}let n=0;for(let k=0;k<cells.length;k+=1){}return wall(r,cells)},
 wide(r){return 1}};
// wrong-door + interactables
function interactables(r,f,dense){
 if(RNG()<(dense?.8:.45))some(r,'x_paint',1,true,()=>({txt:pick(LORE[f]||LORE.hotel),fl:f}));
 if(RNG()<.3)some(r,'x_note',1,false,()=>({txt:pick(LORE[f]||LORE.hotel)}));
 if(RNG()<.35)some(r,'x_sw',1,true,{on:!r.dark});
 if(RNG()<.4)some(r,'x_crate',ri(1,2),false);
 if(r.w>=12&&RNG()<.22){const a=spots(r,true);if(a.length>4){const p=a[0],q=a[a.length-1];const v1=P_(r,'x_vent',p[0],p[1]),v2=v1&&P_(r,'x_vent',q[0],q[1]);if(v1&&v2){v1.to=r.objs.indexOf(v2);v2.to=r.objs.indexOf(v1)}else if(v1){v1.gone=true}}}}
function decorate(){const f=F(),names=RN[f]||RN.hotel,pk=PK[f]||PK.hotel;
 for(const r of rooms){if(r.t!=='normal'||r.n<2||r.fx&&r.fx.lawn&&RNG()<.5)continue;
  const v=Math.floor(RNG()*names.length);r.vi=v;r.vname=names[v];
  const shape=['L','pillars','niches','split','well','stairs','maze','wide'][v%8];
  if(r.w>=10&&r.h>=7){try{SH[shape](r)}catch(e){}}
  some(r,RNG()<.5?'x_propS':'x_prop',ri(1,3),true,()=>({k:pick(pk)}));
  some(r,'x_prop',ri(0,2),false,()=>({k:pick(pk),rug:RNG()<.4}));
  if(/ложной|Ложная/.test(r.vname)||RNG()<.08)some(r,'x_fdoor',1,true,()=>({bad:RNG()<.5}));
  if(shape==='stairs'&&r.stairs){const s=r.stairs;const l1=P_(r,'x_lad',s.x-2,r.y0+1),l2=P_(r,'x_lad',s.x,r.y0+r.h-2);if(l1&&l2){l1.to=r.objs.indexOf(l2);l2.to=r.objs.indexOf(l1)}}
  interactables(r,f,v%3===0)}}
const _g=gen;gen=function(){_g();try{decorate()}catch(e){console.warn('decorate',e)}};
// ---------- interaction ----------
function wxEv(o,a){netEv({k:'wx',r:o.r,i:rooms[o.r].objs.indexOf(o),a})}
function wxApply(o,a){const r=rooms[o.r];if(a==='sw'){o.on=!o.on;if(o.on){if(r._l){r.lamps=r._l;r._l=null}if(!r.lamps.length)for(let i=0;i<2;i++)r.lamps.push({x:(r.x0+(i+.5)*(r.w/2))*T,y:(r.y0+1)*T+4});r.dark=false}else{r._l=r.lamps;r.lamps=[];r.dark=true}}
 if(a==='cr'){o.gone=true;solidObj.delete(idx(o.x,o.y));for(let i=0;i<8;i++)PT&&PT.push&&PT.push({x:o.x*T+16,y:o.y*T+16,vx:(Math.random()-.5)*120,vy:(Math.random()-.5)*120,life:.6,c:'#8a6a3a',s:3})}
 if(a==='fd')o.used=true;if(a==='nt')o.gone=true}
window.wxRead=null;
function read(t){S.note={t,ttl:7};tone(600,.05,'triangle',.04)}
const _int=interact;interact=function(){if(P.hidden||S.dead)return _int();const o=nearObj();if(!o||!XI[o.t])return _int();
 switch(o.t){
  case 'x_paint':o.read=true;read(o.txt);STATX('paint');return;
  case 'x_note':o.gone=true;wxEv(o,'nt');read(o.txt);STATX('note');return;
  case 'x_sw':wxApply(o,'sw');wxEv(o,'sw');tone(o.on?900:400,.04,'square',.06);msg(o.on?'Свет включён':'Свет выключен',1.2);return;
  case 'x_crate':wxApply(o,'cr');wxEv(o,'cr');noise(.25,.25,500);P.noise=(P.noise||0)+.6;{const R=Math.random();if(R<.55){const g=ri(3,15);P.gold+=g;SND.gold();msg('+'+g+' золота',1.5)}else if(R<.75){const it=pick(['battery','bandage','lockpick','vitamins']);if(ITEM[it]&&addItem(it))msg('Найдено: '+ITEM[it].n,2)}else msg('Щепки и пыль',1.2)}STATX('crate');return;
  case 'x_lad':case 'x_vent':{const t=rooms[o.r].objs[o.to];if(!t){msg('Тупик',1);return}P.x=t.x*T+16;P.y=t.y*T+16;unstuck();if(o.t==='x_vent'){noise(.4,.15,300);msg('Ты пролез через вентиляцию',1.5)}else{tone(300,.08,'triangle',.05);msg('Лестница',1)}return}
  case 'x_fdoor':o.used=true;wxEv(o,'fd');if(o.bad){S.jolt=.6;damage(10,'fdoor');msg('За дверцей — пусто и холодно. Что-то укусило!',2.5)}else{const g=ri(10,30);P.gold+=g;SND.gold();msg('Тайник за дверцей: +'+g+' золота',2)}return}};
const _one=onNetEv;onNetEv=function(e){if(e&&e.k==='wxs'){const r=rooms[e.r];if(r){r._wx=e.kk;if(P.room===e.r&&!(S.wx||[]).some(q=>q.k===e.kk))spawn(e.kk,r)}return}if(e&&e.k==='wx'){const r=rooms[e.r],o=r&&r.objs[e.i];if(o)wxApply(o,e.a);return}return _one(e)};
function STATX(k){try{const s=JSON.parse(localStorage.getItem('d2wx')||'{}');s[k]=(s[k]||0)+1;localStorage.setItem('d2wx',JSON.stringify(s));if(k==='note'&&s.note>=10)d2ach('wx_lore');if(k==='crate'&&s.crate>=25)d2ach('wx_crate')}catch(e){}}
Object.assign(d2ACHL,{wx_lore:['Летописец','Прочитай 10 записок'],wx_crate:['Ломатель','Разбей 25 ящиков'],wx_ent:['Знаток','Переживи 8 разных новых сущностей']});
// ---------- extra ORIGINAL entities ----------
Object.assign(DNAME,{moth:'Мотыли',bell:'Звонарь',whis:'Шептун',drip:'Капельник',fume:'Угарник',tick:'Тикун',lag:'Запоздалая тень',pollen:'Пыльцевик',scare:'Пугало',ink:'Чернильник',pend:'Маятник',spark:'Искрун',fdoor:'Пустая дверца'});
Object.assign(HINTS,{moth:'Мотыли летят на свет. Услышал шорох крыльев — выключи фонарик (F).',bell:'Звонарь звонит трижды. К третьему звону пригнись (C) или спрячься.',whis:'Дрожащий шкаф уже занят. Прячься в другом.',drip:'Тёмный круг на полу — сейчас капнет. Отойди в сторону.',fume:'Когда лампы гаснут одна за другой — уходи из комнаты.',tick:'Тикание всё громче? Прячься в шкаф, пока не стихнет.',lag:'Тень повторяет твой путь с опозданием. Не возвращайся назад.',pollen:'Жёлтое облако идёт поверху — пригнись (C) и проползи.',scare:'Пугало двигается, только когда ты отвернулся. Смотри на него, отступая.',ink:'Чернильник боится света: направь на него фонарик.',pend:'Следи за тенью маятника и проходи, когда он на другой стороне.',spark:'Трубы шипят перед искрой — отойди от них.',fdoor:'Царапины у дверцы — плохой знак.'});
const EN={hotel:['moth','bell','whis'],mines:['drip','fume','bell'],back:['tick','lag'],garden:['pollen','scare','moth'],archive:['ink','tick','whis'],stair:['pend','spark','drip']};EN.halls=['lag','spark','tick'];RN.halls=['Служебный коридор','Гулкий зал','Склад №','Котельная','Перегон','Распределитель','Тамбур','Пустой зал ожидания','Кольцевой проход','Зал с эхом','Узкий сервисный ход'];PK.halls=PK.stair;LORE.halls=['«Смена 7: Ревун снова прошёл трижды. Шкафчики спасают, но там нечем дышать.»','«Если экран зашипел и показал знак — гаси фонарь. Не спрашивай почему.»','«Глубинник не любит свет. Но и тени он не боится.»','«Схема щитка всегда на мониторе. Ошибёшься дважды — ударит током.»','«Тихоня Мирон берёт только золото. Изолента у него — лучшая.»'];
const SEEN=new Set();
const _er=enterRoom;enterRoom=function(r){_er(r);S.wx=[];S.note=null;if(r.vname&&!r._vs){r._vs=1;S.vn={t:r.vname,ttl:2.5}}
 if(!started||r.t!=='normal'||r.n<4)return;const list=EN[FLR]||EN.hotel;const ri=rooms.indexOf(r);if(r._wx===undefined){let h=((typeof SEED!=='undefined'?SEED:1)^(ri*2654435761))>>>0;h=Math.imul(h^h>>>15,2246822507)>>>0;h^=h>>>13;const u=(h%10000)/10000;r._wx=u<.22+Math.min(.18,r.n/600)?list[h%list.length]:null}
 if(r._wx){spawn(r._wx,r);if(NET.coop)netEv({k:'wxs',r:ri,kk:r._wx})}};
function rc(r){return{x:(r.x0+r.w/2)*T,y:(r.y0+r.h/2)*T}}
function spawn(k,r){const c=rc(r);const e={k,t:0,x:c.x,y:c.y};
 if(k==='whis'){const w=r.objs.filter(o=>o.t==='wardrobe');if(!w.length)return;e.o=pick(w);e.o.shake=1}
 if(k==='fume'){e.l=r.lamps.slice()}
 if(k==='lag'){e.trail=[];e.x=P.x;e.y=P.y}
 if(k==='pollen'){e.x=(r.x0+r.w-2)*T;e.y=P.y}
 if(k==='scare'){const p=randomFloor(r);e.x=p.x;e.y=p.y}
 if(k==='ink'){e.x=(r.x0+r.w-2)*T;e.y=c.y}
 if(k==='pend'){e.x=c.x;e.y0=(r.y0+1)*T;e.h=(r.h-2)*T}
 if(k==='spark'){e.p=[];for(let i=0;i<3;i++){const p=randomFloor(r);e.p.push(p)}}
 S.wx.push(e);if(!SEEN.has(k)){SEEN.add(k);if(SEEN.size>=8)d2ach('wx_ent')}}
window.__wx={spawn:(k)=>spawn(k,rooms[P.room]),get list(){return S.wx},EN};
const dist=(e)=>Math.hypot(e.x-P.x,e.y-P.y);
function facing(e,deg){const a=Math.atan2(e.y-P.y,e.x-P.x);let d=Math.abs(((a-P.face)+Math.PI*3)%(Math.PI*2)-Math.PI);return d<deg*Math.PI/180}
let lpx=0,lpy=0;
function upd(dt){if(!S.wx)return;const mv=Math.hypot(P.x-lpx,P.y-lpy);lpx=P.x;lpy=P.y;const hid=!!P.hidden;
 for(let i=S.wx.length-1;i>=0;i--){const e=S.wx[i];e.t+=dt;const d=dist(e);let done=false;
  switch(e.k){
   case 'moth':e.x+=(P.x-e.x)*dt*.4;e.y+=(P.y-e.y)*dt*.4;if(Math.random()<dt*6)tone(2000+Math.random()*800,.02,'triangle',.015);if(P.light&&d<170&&!hid){e.hurt=(e.hurt||0)+dt;if(e.hurt>.6){e.hurt=0;damage(8,'moth')}}if(e.t>14)done=true;if(e.t<.1)msg('Шорох крыльев...',1.5);break;
   case 'bell':{const n=Math.floor(e.t/1.3);if(n>(e.n||0)&&n<=3){e.n=n;tone(1250,.6,'sine',.12);tone(1870,.4,'sine',.05);msg(['','Динь...','Динь-динь...','ДИНЬ!'][n],1.2);if(n===3){if(!(P.crouch||hid))damage(25,'bell');done=true}}break}
   case 'whis':if(Math.random()<dt*2)noise(.15,.04,1200,'bandpass');if(P.hidden===e.o){damage(30,'whis');P.hidden=null;SND.hideOut&&SND.hideOut();msg('Шептун вытолкнул тебя из шкафа!',2);done=true}if(e.t>20){e.o.shake=0;done=true}break;
   case 'drip':if(!e.tx){e.tx=P.x;e.ty=P.y;e.c=0}e.c+=dt;if(e.c>1.3){if(Math.hypot(P.x-e.tx,P.y-e.ty)<26&&!hid)damage(20,'drip');noise(.2,.2,300);e.tx=0;e.n=(e.n||0)+1;if(e.n>=4)done=true}break;
   case 'fume':{const r=rooms[P.room];const k=Math.floor(e.t/3);if(e.l&&k>(e.k2||0)){e.k2=k;if(r.lamps.length){r.lamps.pop();tone(120,.3,'sawtooth',.04);msg('Лампа погасла...',1)}}if(e.t>12){if(!hid){e.hc=(e.hc||0)+dt;if(e.hc>1){e.hc=0;damage(10,'fume')}}}if(e.t>22)done=true;break}
   case 'tick':{const v=Math.min(.12,.02+e.t*.025);if(Math.floor(e.t*3)!==Math.floor((e.t-dt)*3))tone(e.t>3?1400:900,.03,'square',v);if(e.t>4.5){if(!hid)damage(35,'tick');else msg('Тикание стихло',1.5);done=true}else if(e.t<.1)msg('Тик... так... тик...',1.5);break}
   case 'lag':e.trail.push([P.x,P.y,e.t]);while(e.trail.length&&e.trail[0][2]<e.t-3){const q=e.trail.shift();e.x=q[0];e.y=q[1]}if(e.t>3&&d<18&&!hid){damage(15,'lag');done=true}if(e.t>16)done=true;break;
   case 'pollen':e.x-=dt*55;e.y+=(P.y-e.y)*dt*.3;if(Math.abs(e.x-P.x)<70&&Math.abs(e.y-P.y)<60&&!P.crouch&&!hid){e.h2=(e.h2||0)+dt;if(e.h2>.5){e.h2=0;damage(6,'pollen');if(Math.random()<.5)noise(.3,.2,2500,'highpass')}}if(e.x<rooms[P.room].x0*T)done=true;break;
   case 'scare':if(!facing(e,60)&&!hid){const a=Math.atan2(P.y-e.y,P.x-e.x),s=90*dt,nx=e.x+Math.cos(a)*s,ny=e.y+Math.sin(a)*s;if(!solidPx(nx,ny)){e.x=nx;e.y=ny}if(Math.random()<dt*3)noise(.1,.05,700)}if(d<20&&!hid){damage(25,'scare');done=true}if(e.t>25)done=true;break;
   case 'ink':{const lit=P.light&&facing(e,30)&&d<240;const a=Math.atan2(P.y-e.y,P.x-e.x),s=(lit?-70:45)*dt,nx=e.x+Math.cos(a)*s,ny=e.y+Math.sin(a)*s;if(!solidPx(nx,ny)){e.x=nx;e.y=ny}if(d<22&&!hid){damage(20,'ink');done=true}if(e.t>30)done=true;break}
   case 'pend':{e.px=e.x+Math.sin(e.t*1.6)*(rooms[P.room].w*T*.35);const near=Math.abs(e.px-P.x)<20&&Math.abs(Math.cos(e.t*1.6))>.3;if(Math.floor(e.t/2)!==Math.floor((e.t-dt)/2))tone(90,.4,'sawtooth',.03);if(near&&!hid){e.cd=(e.cd||0)-dt;if(e.cd<=0){e.cd=1;damage(30,'pend')}}if(e.t>30)done=true;break}
   case 'spark':{const ph=e.t%4;if(ph<dt)noise(.8,.05,4000,'highpass');if(ph>1&&ph<1.4){for(const p of e.p)if(Math.hypot(p.x-P.x,p.y-P.y)<40&&!hid){e.cd=(e.cd||0)-dt;if(e.cd<=0){e.cd=.5;damage(15,'spark')}}}if(e.t>24)done=true;break}}
  if(done)S.wx.splice(i,1)}}
const _pre=window.preUpdateX;window.preUpdateX=function(dt){_pre&&_pre(dt);if(!started||!S||S.dead||S.win||ELEV)return;if(S.note){S.note.ttl-=dt;if(S.note.ttl<=0)S.note=null}if(S.vn){S.vn.ttl-=dt;if(S.vn.ttl<=0)S.vn=null}if(S.jolt)S.jolt=Math.max(0,S.jolt-dt);try{upd(dt)}catch(e){console.warn(e)}};
// ---------- drawing ----------
const PROPC={hotel:'#6a3a2a',mines:'#5a4a3a',back:'#8a8460',garden:'#3a5a32',archive:'#4a4036',stair:'#5a5a60'};
const _do=window.drawObjX;window.drawObjX=function(o,px,py,t){const g=X,cx=px+16,cy=py+16;
 switch(o.t){
  case 'x_pil':g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(cx+3,cy+10,13,6,0,0,7);g.fill();g.fillStyle=FLR==='mines'?'#6b5236':FLR==='garden'?'#7a8a78':'#b8ac90';g.beginPath();g.arc(cx,cy,12,0,7);g.fill();g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.arc(cx-4,cy-4,5,0,7);g.fill();if(FLR==='mines'){g.strokeStyle='#3a2a1a';g.lineWidth=3;g.beginPath();g.moveTo(cx-12,cy);g.lineTo(cx+12,cy);g.stroke()}return;
  case 'x_paint':g.fillStyle='#5a3a1a';g.fillRect(px+3,py+2,26,20);g.fillStyle=['#3a5a6a','#6a4a3a','#4a5a3a','#5a3a5a'][(o.x+o.y)%4];g.fillRect(px+6,py+5,20,14);g.fillStyle='rgba(255,230,180,.35)';g.beginPath();g.arc(px+12+((o.x*7)%8),py+11,3,0,7);g.fill();if(!o.read){g.fillStyle='#ffd96a';g.fillRect(px+26,py+2,3,3)}return;
  case 'x_note':g.save();g.translate(cx,cy);g.rotate(((o.x*13+o.y*7)%10-5)/20);g.fillStyle='#e8dcc0';g.fillRect(-7,-9,14,18);g.fillStyle='#776';for(let i=0;i<4;i++)g.fillRect(-5,-6+i*4,10,1);g.restore();return;
  case 'x_sw':g.fillStyle='#ddd';g.fillRect(px+11,py+6,10,16);g.fillStyle=o.on?'#4c4':'#a33';g.fillRect(px+14,py+(o.on?8:14),4,6);return;
  case 'x_crate':g.fillStyle='rgba(0,0,0,.35)';g.fillRect(px+5,py+8,26,24);g.fillStyle='#8a6a3a';g.fillRect(px+3,py+4,26,24);g.strokeStyle='#5a3a1a';g.lineWidth=2;g.strokeRect(px+3,py+4,26,24);g.beginPath();g.moveTo(px+3,py+4);g.lineTo(px+29,py+28);g.moveTo(px+29,py+4);g.lineTo(px+3,py+28);g.stroke();return;
  case 'x_lad':g.strokeStyle='#a07a40';g.lineWidth=3;g.beginPath();g.moveTo(px+9,py+2);g.lineTo(px+9,py+30);g.moveTo(px+23,py+2);g.lineTo(px+23,py+30);for(let i=0;i<4;i++){g.moveTo(px+9,py+6+i*7);g.lineTo(px+23,py+6+i*7)}g.stroke();return;
  case 'x_vent':g.fillStyle='#333';g.fillRect(px+4,py+8,24,16);g.fillStyle='#777';for(let i=0;i<4;i++)g.fillRect(px+6,py+10+i*4,20,2);return;
  case 'x_fdoor':g.fillStyle='#3a2414';g.fillRect(px+6,py+2,20,26);g.fillStyle='#c9a24a';g.fillRect(px+21,py+15,3,3);if(o.used){g.fillStyle='#000';g.fillRect(px+8,py+4,16,22)}if(o.bad&&!o.used&&Math.hypot(cx-P.x,cy-P.y)<120){g.strokeStyle='rgba(200,200,200,.6)';g.lineWidth=1;for(let i=0;i<3;i++){g.beginPath();g.moveTo(px+9+i*4,py+6);g.lineTo(px+12+i*4,py+16);g.stroke()}}return;
  case 'x_prop':case 'x_propS':prop(g,o,px,py,cx,cy);return}
 if(_do)_do(o,px,py,t)};
function prop(g,o,px,py,cx,cy){const c=PROPC[FLR]||'#555';g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(cx+2,py+28,12,4,0,0,7);g.fill();
 if(o.rug){g.fillStyle='rgba(120,40,40,.5)';g.fillRect(px-8,py+4,48,24);g.strokeStyle='rgba(220,180,90,.4)';g.strokeRect(px-6,py+6,44,20);return}
 switch(o.k){
  case 'sofa':g.fillStyle='#6a2a2a';g.fillRect(px+1,py+8,30,18);g.fillStyle='#8a3a3a';g.fillRect(px+4,py+10,24,10);break;
  case 'plantpot':case 'pot':g.fillStyle='#7a4a2a';g.fillRect(px+10,py+18,12,10);g.fillStyle='#2f6a2a';for(let i=0;i<5;i++){g.beginPath();g.ellipse(cx+Math.cos(i*1.3)*6,py+14+Math.sin(i*1.3)*4,5,3,i,0,7);g.fill()}break;
  case 'clock':g.fillStyle='#4a2a14';g.fillRect(px+9,py+1,14,29);g.fillStyle='#e8dcc0';g.beginPath();g.arc(cx,py+9,5,0,7);g.fill();g.strokeStyle='#000';g.beginPath();g.moveTo(cx,py+9);g.lineTo(cx+Math.cos(S.t||0)*4,py+9+Math.sin(S.t||0)*4);g.stroke();break;
  case 'vase':g.fillStyle='#3a5a8a';g.beginPath();g.ellipse(cx,cy+4,7,10,0,0,7);g.fill();break;
  case 'piano':g.fillStyle='#111';g.fillRect(px-2,py+4,36,22);g.fillStyle='#eee';for(let i=0;i<8;i++)g.fillRect(px+i*4,py+20,3,6);break;
  case 'bust':g.fillStyle='#bbb';g.fillRect(px+10,py+18,12,10);g.beginPath();g.arc(cx,py+12,6,0,7);g.fill();break;
  case 'lamp':g.fillStyle='#c9a24a';g.fillRect(cx-1,py+8,2,20);g.fillStyle='rgba(255,220,140,.8)';g.beginPath();g.moveTo(cx-7,py+10);g.lineTo(cx+7,py+10);g.lineTo(cx+4,py+3);g.lineTo(cx-4,py+3);g.fill();break;
  case 'barrel':g.fillStyle='#5a3a1a';g.beginPath();g.arc(cx,cy,11,0,7);g.fill();g.strokeStyle='#888';g.lineWidth=2;g.beginPath();g.arc(cx,cy,8,0,7);g.stroke();break;
  case 'cart':g.fillStyle='#555';g.fillRect(px+2,py+8,28,14);g.fillStyle='#222';g.beginPath();g.arc(px+8,py+24,4,0,7);g.arc(px+24,py+24,4,0,7);g.fill();break;
  case 'rocks':g.fillStyle='#5a5048';for(let i=0;i<4;i++){g.beginPath();g.arc(px+8+i*5,py+18+(i%2)*5,5,0,7);g.fill()}break;
  case 'helmet':g.fillStyle='#c9a24a';g.beginPath();g.arc(cx,cy+4,8,Math.PI,0);g.fill();g.fillStyle='#ffd';g.fillRect(cx-2,cy-3,4,3);break;
  case 'beam':g.fillStyle='#6b4a26';g.fillRect(px+12,py,8,32);break;
  case 'drill':g.fillStyle='#777';g.fillRect(px+4,py+12,20,6);g.fillStyle='#aaa';g.beginPath();g.moveTo(px+24,py+10);g.lineTo(px+31,py+15);g.lineTo(px+24,py+20);g.fill();break;
  case 'chair':g.fillStyle=c;g.fillRect(px+10,py+10,12,12);g.fillRect(px+10,py+4,12,4);break;
  case 'box':g.fillStyle='#b8a878';g.fillRect(px+6,py+8,20,18);g.fillStyle='#a89868';g.fillRect(px+6,py+14,20,2);break;
  case 'tv':g.fillStyle='#222';g.fillRect(px+4,py+6,24,18);g.fillStyle='rgba(180,200,220,'+(.3+Math.random()*.3)+')';g.fillRect(px+7,py+9,18,12);break;
  case 'shadow':g.fillStyle='rgba(0,0,0,.5)';g.beginPath();g.ellipse(cx,cy,12,6,0,0,7);g.fill();break;
  case 'bench':g.fillStyle='#6a4a2a';g.fillRect(px,py+12,32,8);g.fillRect(px+3,py+20,3,6);g.fillRect(px+26,py+20,3,6);break;
  case 'hedge':g.fillStyle='#2a4a22';g.beginPath();g.arc(cx,cy,13,0,7);g.fill();g.fillStyle='#3a6a2a';g.beginPath();g.arc(cx-3,cy-3,7,0,7);g.fill();break;
  case 'birdbath':g.fillStyle='#999';g.fillRect(cx-2,cy,4,12);g.beginPath();g.ellipse(cx,cy,11,5,0,0,7);g.fill();g.fillStyle='#4a6a8a';g.beginPath();g.ellipse(cx,cy,8,3,0,0,7);g.fill();break;
  case 'rake':g.strokeStyle='#8a6a3a';g.lineWidth=2;g.beginPath();g.moveTo(px+4,py+28);g.lineTo(px+26,py+6);g.stroke();break;
  case 'cabinet':g.fillStyle='#5a4a36';g.fillRect(px+4,py+2,24,28);g.fillStyle='#c9a24a';for(let i=0;i<3;i++)g.fillRect(cx-3,py+7+i*8,6,2);break;
  case 'stack':g.fillStyle='#d8ccb0';for(let i=0;i<4;i++)g.fillRect(px+8+(i%2),py+20-i*4,16,4);break;
  case 'globe':g.fillStyle='#3a6a8a';g.beginPath();g.arc(cx,cy-2,9,0,7);g.fill();g.fillStyle='#5a8a4a';g.fillRect(cx-4,cy-6,6,4);g.fillStyle='#8a6a3a';g.fillRect(cx-1,cy+7,2,6);break;
  case 'typewriter':g.fillStyle='#222';g.fillRect(px+5,py+12,22,12);g.fillStyle='#eee';g.fillRect(px+9,py+6,14,7);break;
  case 'pipe':g.fillStyle='#6a6a70';g.fillRect(px,py+12,32,8);g.fillStyle='#8a8a90';g.fillRect(px+14,py+10,4,12);break;
  case 'gauge':g.fillStyle='#ddd';g.beginPath();g.arc(cx,cy,8,0,7);g.fill();g.strokeStyle='#a00';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos((S.t||0)*3)*6,cy+Math.sin((S.t||0)*3)*6);g.stroke();break;
  case 'valvebox':g.fillStyle='#5a3a2a';g.fillRect(px+6,py+6,20,20);g.strokeStyle='#c33';g.lineWidth=2;g.beginPath();g.arc(cx,cy,6,0,7);g.stroke();break;
  case 'toolbox':g.fillStyle='#a33';g.fillRect(px+5,py+14,22,12);g.fillStyle='#666';g.fillRect(px+12,py+10,8,4);break;
  default:g.fillStyle=c;g.fillRect(px+8,py+8,16,16)}}
const _dw=window.drawWorldX;window.drawWorldX=function(cx,cy,t){_dw&&_dw(cx,cy,t);const g=X,r=rooms[P.room];if(!r)return;
 for(const q of [rooms[P.room-1],r,rooms[P.room+1]]){if(!q)continue;
  if(q.well){const w=q.well;g.fillStyle='#050505';g.fillRect(w.x*T,w.y*T,w.w*T,w.h*T);g.strokeStyle='#8a6a3a';g.lineWidth=4;g.strokeRect(w.x*T-2,w.y*T-2,w.w*T+4,w.h*T+4);g.lineWidth=2;for(let x=w.x*T;x<(w.x+w.w)*T;x+=10){g.beginPath();g.moveTo(x,w.y*T-6);g.lineTo(x,w.y*T);g.stroke()}g.fillStyle='rgba(255,200,120,.05)';g.fillRect(w.x*T+6,w.y*T+6,w.w*T-12,w.h*T-12)}
  if(q.stairs){const s=q.stairs;for(let i=0;i<s.h;i++){g.fillStyle=i%2?'rgba(0,0,0,.18)':'rgba(255,255,255,.05)';g.fillRect((s.x)*T,(s.y+i)*T,T*2,T)}}}
 for(const e of S.wx||[])drawE(g,e,t)};
function drawE(g,e,t){g.save();
 switch(e.k){
  case 'moth':for(let i=0;i<9;i++){const a=t*6+i*.7,x=e.x+Math.cos(a*1.3+i)*24,y=e.y+Math.sin(a+i*2)*18;g.fillStyle='rgba(230,220,180,.85)';g.beginPath();g.ellipse(x-3,y,4,2+Math.abs(Math.sin(a*8))*3,0,0,7);g.ellipse(x+3,y,4,2+Math.abs(Math.cos(a*8))*3,0,0,7);g.fill()}break;
  case 'bell':{g.globalAlpha=.5+.5*Math.sin(t*10);g.fillStyle='#d9b86a';g.beginPath();g.moveTo(P.x-8,P.y-40);g.quadraticCurveTo(P.x,P.y-58,P.x+8,P.y-40);g.lineTo(P.x+11,P.y-34);g.lineTo(P.x-11,P.y-34);g.fill();g.fillStyle='#fff';g.font='bold 11px Arial';g.textAlign='center';g.fillText('×'+Math.max(0,3-(e.n||0)),P.x,P.y-62);break}
  case 'whis':{const o=e.o;const x=o.x*T+16+Math.sin(t*40)*2,y=o.y*T+16;g.strokeStyle='rgba(180,180,255,.6)';g.lineWidth=1.5;for(let i=0;i<3;i++){g.beginPath();g.arc(x,y-20,6+i*5+(t*10%5),Math.PI*1.1,Math.PI*1.9);g.stroke()}break}
  case 'drip':if(e.tx){const k=Math.min(1,e.c/1.3);g.fillStyle='rgba(20,10,10,'+(.25+k*.5)+')';g.beginPath();g.ellipse(e.tx,e.ty,10+k*18,5+k*9,0,0,7);g.fill();g.fillStyle='#2a1a1a';g.beginPath();g.ellipse(e.tx,e.ty-200*(1-k),4,7,0,0,7);g.fill()}break;
  case 'fume':g.fillStyle='rgba(90,90,80,'+Math.min(.35,e.t/40)+')';g.fillRect(P.x-600,P.y-400,1200,800);break;
  case 'tick':{const s=1+e.t*.4;g.strokeStyle='rgba(255,255,255,'+(.2+e.t*.12)+')';g.lineWidth=2;g.beginPath();g.arc(P.x,P.y,30*s,0,7);g.stroke();g.beginPath();g.moveTo(P.x,P.y);g.lineTo(P.x+Math.cos(e.t*6)*30*s,P.y+Math.sin(e.t*6)*30*s);g.stroke();break}
  case 'lag':if(e.t>3){g.globalAlpha=.7;g.fillStyle='#000';g.beginPath();g.arc(e.x,e.y,11,0,7);g.fill();g.fillStyle='#fff';g.fillRect(e.x-5,e.y-3,3,2);g.fillRect(e.x+2,e.y-3,3,2)}break;
  case 'pollen':for(let i=0;i<24;i++){const x=e.x+Math.sin(i*7+t)*50,y=e.y+Math.cos(i*3+t*1.3)*40-10;g.fillStyle='rgba(240,210,60,.35)';g.beginPath();g.arc(x,y,6+(i%3)*3,0,7);g.fill()}break;
  case 'scare':g.strokeStyle='#6a4a2a';g.lineWidth=4;g.beginPath();g.moveTo(e.x-16,e.y-8);g.lineTo(e.x+16,e.y-8);g.moveTo(e.x,e.y-18);g.lineTo(e.x,e.y+16);g.stroke();g.fillStyle='#c9b070';g.beginPath();g.arc(e.x,e.y-20,8,0,7);g.fill();g.fillStyle='#222';g.fillRect(e.x-4,e.y-22,2,2);g.fillRect(e.x+2,e.y-22,2,2);g.fillStyle='#3a2a1a';g.fillRect(e.x-10,e.y-30,20,4);break;
  case 'ink':g.fillStyle='rgba(10,10,30,.9)';g.beginPath();for(let i=0;i<12;i++){const a=i/12*6.283,rr=16+Math.sin(t*4+i*2)*5;g.lineTo(e.x+Math.cos(a)*rr,e.y+Math.sin(a)*rr*.6)}g.fill();g.fillStyle='#fff';g.fillRect(e.x-6,e.y-3,3,3);g.fillRect(e.x+3,e.y-3,3,3);break;
  case 'pend':{const x=e.px??e.x,y1=e.y0+e.h;g.strokeStyle='#777';g.lineWidth=2;g.beginPath();g.moveTo(e.x,e.y0);g.lineTo(x,y1-20);g.stroke();g.fillStyle='#bbb';g.beginPath();g.moveTo(x-18,y1-24);g.lineTo(x+18,y1-24);g.lineTo(x,y1);g.fill();g.fillStyle='rgba(0,0,0,.3)';g.fillRect(x-14,e.y0,28,e.h);break}
  case 'spark':{const ph=e.t%4;for(const p of e.p){g.fillStyle='#555';g.fillRect(p.x-12,p.y-4,24,8);if(ph<1){g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(p.x,p.y-8,4+ph*6,0,7);g.fill()}if(ph>1&&ph<1.4){for(let i=0;i<8;i++){g.strokeStyle='#ffd34a';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x+Math.cos(i+t*20)*36,p.y+Math.sin(i+t*20)*36);g.stroke()}}}break}}
 g.restore()}
const _lx=window.lightX;window.lightX=function(cx,cy){_lx&&_lx(cx,cy);for(const e of S.wx||[]){if(e.k==='spark'&&e.t%4>1&&e.t%4<1.4)for(const p of e.p)lamp(p.x-cx,p.y-cy,90,.8)}};
const _hx=window.hudX;window.hudX=function(){_hx&&_hx();if(!started||S.dead)return;
 if(S.vn){X.globalAlpha=Math.min(1,S.vn.ttl);X.textAlign='center';X.font='italic 600 18px Georgia';X.fillStyle='rgba(0,0,0,.6)';X.fillText(S.vn.t,W/2+1,71);X.fillStyle='#e8d4a0';X.fillText(S.vn.t,W/2,70);X.globalAlpha=1}
 if(S.note){const w=Math.min(520,W-40),x=W/2-w/2,y=H-180;X.fillStyle='rgba(232,220,192,.95)';X.fillRect(x,y,w,90);X.strokeStyle='#6a5a3a';X.strokeRect(x,y,w,90);X.fillStyle='#2a2014';X.font='italic 15px Georgia';X.textAlign='left';wrap(S.note.t,x+14,y+26,w-28,20)}
 if(S.jolt){X.fillStyle='rgba(255,255,255,'+S.jolt*.4+')';X.fillRect(0,0,W,H)}X.textAlign='left'};
})();
