// halls.js — ORIGINAL floor «Гулкие Залы» (long service-corridor complex). Own names/designs; pacing loosely inspired by the genre.
(function(){
const X_=window.__FLX;if(!X_)return;const {FL,GEN,R,std,layout,MYI,winFloor,fx,A,MOOD}=X_;
const N=120;
FL.halls={name:'Гулкие Залы',short:'Залы',N,dw:'Зал ',lab:n=>'З-'+String(n).padStart(3,'0'),need:'halls'};
Object.assign(d2ACHL,{fl_halls:['Эхо стихло','Пройди Гулкие Залы'],fl_howl:['Глухой','Переживи 6 проходов Ревуна'],fl_glitch:['Без сигнала','Переживи Помеху 4 раза'],fl_relay:['Электрик','Собери 5 щитков без ошибки']});
Object.assign(DNAME,{howl:'Ревун',glitch:'Помеха',deep:'Глубинник',stuffy:'Духота'});
Object.assign(HINTS,{howl:'Красное мигание и нарастающий треск — Ревун. Сразу прячься в шкафчик: он проходит по залу до трёх раз.',glitch:'Когда на экране вспыхивает знак Помехи — выключи фонарик (F) за секунду.',deep:'Глубинник медлителен. Свети на него фонарём, чтобы замедлить, и прячься — он уходит вглубь.',stuffy:'В шкафчике мало воздуха. Следи за шкалой и выходи вовремя.'});
Object.assign(ITEM,{tape:{n:'Изолента',c:'#8ab'},relayk:{n:'Предохранитель-Г',c:'#fa6'}});
Object.assign(window.TIPS||{},{tape:'Почини щиток без ошибки: при неверном коде не ударит током',relayk:'Вставь в реле финального зала'});
const H={hsw:o=>1,hmon:()=>1,hrelay:o=>!o.on,hvend:o=>!o.sold,hsafe:o=>!o.used,hexit:()=>1,hfuse:o=>!o.gone};
for(const k in H){MYI[k]=H[k];NEWI[k]=H[k]}Object.assign(SOLID,{hmon:1,hrelay:1,hvend:1,hsafe:1});
const _fh=window.FHINT;window.FHINT=o=>{const r=rooms[o.r]||{};const m={hsw:'[E] Переключить рубильник '+(o.k+1)+' ('+(o.on?'ВКЛ':'ВЫКЛ')+')',hmon:'[E] Посмотреть на монитор щитка',hrelay:'[E] Реле: '+(o.on?'работает':S.relayH&&S.relayH.o===o?'держи…':'вставить предохранитель и удерживать'),hvend:'[E] Купить: '+(ITEM[o.it]||{}).n+' — '+o.price+' зол.',hsafe:'[E] Запертый шкаф (нужна отмычка)',hexit:'[E] Служебный выход',hfuse:'[E] Взять предохранитель-Г'}[o.t];return m||(_fh?_fh(o):'')};
// ---------- deterministic per-room rolls (co-op safe) ----------
const rh=(n,k)=>{let h=((SEED|0)^Math.imul(n+1,2654435761)^Math.imul(k+7,40503))>>>0;h=Math.imul(h^h>>>15,2246822507)>>>0;h^=h>>>13;h=Math.imul(h,3266489909)>>>0;return((h^h>>>16)>>>0)/4294967296};
// ---------- generation ----------
const POW=[20,40,60,80,100];
GEN.halls=function(){
 layout(N,n=>n===0?{t:'hstart',w:14,h:10,sub:'halls'}:n===N?{t:'hfinal',w:22,h:14,sub:'hallsf',dark:true}:n===66?{t:'hshop',w:16,h:10,sub:'hallsS'}:POW.includes(n)?{t:'hpower',w:16,h:11,sub:'hallsP'}:
  (()=>{const v=RNG();const dark=n>8&&RNG()<Math.min(.55,.12+n/260);
   if(v<.4)return{t:'normal',sub:'halls',w:ri(22,32),h:ri(5,7),vp:.25,dark,fx:{corr:1}};   // long corridor
   if(v<.7)return{t:'normal',sub:'halls',w:ri(13,18),h:ri(10,13),dark};                      // hall
   if(v<.85)return{t:'normal',sub:'hallsW',w:ri(16,22),h:ri(8,10),dark,fx:{ware:1}};          // storage bay
   return{t:'normal',sub:'hallsB',w:ri(12,15),h:ri(12,15),dark,fx:{pipes:1}}})());           // boiler room
 X_.locks(N,.1,n=>POW.includes(n)||POW.includes(n-1)||n===N);
 for(const r of rooms){const t=r.t;
  if(t==='hstart'){const q=R(r);for(let i=0;i<3;i++)q.safe('wardrobe',q.edges,{skin:'hlock'});q.safe('dresser',q.edges,{give:'battery'});q.safe('dresser',q.edges);q.lamps(2)}
  else if(t==='hpower'){const q=R(r);if(r.east){r.east.sealed=true}const code=[0,1,2,3].map(k=>rh(r.n,k)<.5?1:0);if(code.every(c=>!c))code[1]=1;r.code=code;
   put(r,'hmon',r.x0+2,r.y0+1,{});for(let k=0;k<4;k++)put(r,'hsw',r.x0+5+k*2,r.y0+r.h-2,{k,on:0});for(let i=0;i<2;i++)q.safe('wardrobe',q.edges,{skin:'hlock'});q.lamps(2)}
  else if(t==='hshop'){const its=[['battery',20],['vitamins',25],['lockpick',30],['tape',25],['bandage',20],['crucifix',90]];its.forEach((a,i)=>put(r,'hvend',r.x0+3+i*2,r.y0+2,{it:a[0],price:a[1]}));const q=R(r);q.safe('wardrobe',q.edges,{skin:'hlock'});q.lamps(3)}
  else if(t==='hfinal'){const q=R(r);for(let i=0;i<3;i++)put(r,'hrelay',r.x0+4+i*6,r.y0+2,{});put(r,'hexit',r.x0+r.w-3,r.y0+Math.floor(r.h/2),{});for(let i=0;i<4;i++)q.safe('wardrobe',q.edges,{skin:'hlock'});q.lamps(4)}
  else{const q=std(r,{skin:'hlock',hide:false});const nl=r.fx.corr?ri(2,4):ri(1,3);for(let i=0;i<nl;i++)q.safe('wardrobe',q.edges,{skin:'hlock'});
   if(r.fx.ware){for(let i=0;i<ri(2,4);i++)q.safe('crate',q.ints)}
   if(RNG()<.16)q.safe('hsafe',q.edges,{});
   if([30,55,90,110].includes(r.n)||(r.n>70&&RNG()<.05))q.safe('hfuse',q.ints,{})}}
 // relay fuses: guarantee 3 before the final
 const f=rooms.reduce((a,r)=>a+r.objs.filter(o=>o.t==='hfuse').length,0);for(let k=f;k<3;k++){const r=rooms[100+k*5+2];const q=R(r);q.safe('hfuse',q.ints,{})}};
// ---------- interaction ----------
const FI=window.FLXI=window.FLXI||{},FA=window.FLXA=window.FLXA||{};
function relayCheck(r){if(!r.code)return;const sw=r.objs.filter(o=>o.t==='hsw').sort((a,b)=>a.k-b.k);const ok=sw.every((o,i)=>!!o.on===!!r.code[i]);if(ok&&r.east&&r.east.sealed){r.east.sealed=false;r.east.open=true;SND.holy();msg('Щиток запитан — дверь открыта!',2.5);S.relays=(S.relays||0)+1;if(!S.relayErr&&S.relays>=5)A('fl_relay')}}
FA.hsw=(o,a)=>{o.on=a==='on'?1:0;relayCheck(rooms[o.r])};
FI.hsw=o=>{const r=rooms[o.r];o.on=o.on?0:1;tone(o.on?700:400,.06,'square',.05);fx(o,o.on?'on':'off');
 const sw=r.objs.filter(q=>q.t==='hsw');const wrong=sw.filter(q=>q.on&&!r.code[q.k]).length;if(wrong>=2){if(P.inv.includes('tape')){removeItem('tape');msg('Изолента спасла от разряда',2)}else{damage(12,'glitch');S.relayErr=1;msg('Разряд! Сверься с монитором',2)}for(const q of sw){q.on=0;fx(q,'off')}}relayCheck(r)};
FI.hmon=o=>{const r=rooms[o.r];msg('Монитор щитка: '+r.code.map((c,i)=>(i+1)+'-'+(c?'ВКЛ':'выкл')).join('  '),5);tone(900,.05,'sine',.05)};
FI.hvend=o=>{if(P.gold<o.price){SND.bad();msg('Тихоня Мирон: «'+o.price+' золотых, не меньше»',2);return}if(addItem(o.it)){P.gold-=o.price;o.sold=true;SND.gold();msg('Куплено: '+ITEM[o.it].n,2);fx(o,'sold')}};
FA.hvend=o=>{o.sold=true};
FI.hsafe=o=>{if(!P.inv.includes('lockpick')){SND.bad();msg('Заперто. Нужна отмычка',2);return}removeItem('lockpick');o.used=true;SND.lock();const g=ri(25,60);P.gold+=g;const it=pick(['battery','vitamins','crucifix','tape','bandage']);addItem(it);msg('+'+g+' золота и '+ITEM[it].n,2.5);fx(o,'')};
FA.hsafe=o=>{o.used=true};
FI.hfuse=o=>{if(addItem('relayk')){o.gone=true;SND.pick();msg('Предохранитель-Г ('+P.inv.filter(i=>i==='relayk').length+')',2);fx(o,'')}};
FA.hfuse=o=>{o.gone=true};
FI.hrelay=o=>{if(o.on)return;if(!o.fuse){if(!P.inv.includes('relayk')){SND.bad();msg('Нужен предохранитель-Г',2);return}removeItem('relayk');o.fuse=1;fx(o,'fuse')}S.relayH={o,t:2.2};msg('Держись рядом с реле…',1.5)};
FA.hrelay=(o,a)=>{if(a==='fuse')o.fuse=1;if(a==='on'){o.on=1;o.fuse=1}};
FI.hexit=o=>{const r=rooms[o.r],k=r.objs.filter(q=>q.t==='hrelay'&&q.on).length;if(k<3){SND.bad();msg('Выход обесточен: реле '+k+'/3',2);return}winFloor('Реле загудели, служебный выход открылся. Гулкие Залы позади.','')};
// ---------- per-room schedule & entities ----------
const _er=enterRoom;enterRoom=function(r){_er(r);if(FLR!=='halls'||!started)return;if(r._hv)return;r._hv=1;const n=r.n;
 if(r.t==='hpower')msg('Щитовая. Монитор покажет схему рубильников.',3);
 if(r.t==='hshop')msg('Тихоня Мирон шепчет из-за стойки: «Покупай, пока тихо»',3.5);
 if(r.t==='hfinal'){msg('Финальный зал: вставь 3 предохранителя-Г и удержи реле. Ревун не даст скучать!',5);S.hfin={t:6}}
 if(n>=6&&r.t==='normal'&&rh(n,1)<.2+Math.min(.12,n/1000))S.howl={room:n,ph:'warn',t:2.6+rh(n,2),pass:1+Math.floor(rh(n,3)*(n>60?3:2)),dir:rh(n,4)<.5?1:-1,x:0};
 if(n>=80&&r.t==='normal'&&!S.howl&&rh(n,5)<.16){const p=randomFloor(r);S.deep={room:n,x:p.x,y:p.y,t:0,gone:0};msg('Пол под ногами набухает тёмной водой…',2.5)}};
const _p=window.preUpdateX;window.preUpdateX=function(dt){_p&&_p(dt);if(FLR!=='halls'||!started||!S||S.dead||S.win||ELEV)return;
 // hide rule: no hotel «Теснота»; own air meter instead
 P.hideT=0;S.air=S.air==null?1:S.air;if(P.hidden){S.air-=dt/9;if(S.air<=0){S.air=.35;P.hidden=null;damage(15,'stuffy');msg('Духота! Пришлось вылезти',2)}else if(S.air<.3&&Math.random()<.02)msg('Воздуха мало…',1)}else S.air=Math.min(1,S.air+dt/6);
 const r=rooms[P.room];
 // Ревун
 const h=S.howl;if(h){const hr=rooms[h.room];h.t-=dt;
  if(h.ph==='warn'){if(Math.random()<.3)tone(80+Math.random()*900,.04,'sawtooth',.03);if(h.t<=0){h.ph='run';h.x=h.dir>0?hr.x0*T-200:(hr.x0+hr.w)*T+200;SND.ambush&&SND.ambush();S.shake=.4}}
  else if(h.ph==='run'){h.x+=h.dir*1100*dt;if(P.room===h.room&&!P.hidden&&Math.abs(h.x-P.x)<40){if(held('crucifix')){useCrucifix('Ревуна',h.x,P.y);S.howl=null}else die('howl')}
   if((h.dir>0&&h.x>(hr.x0+hr.w)*T+200)||(h.dir<0&&h.x<hr.x0*T-200)){h.pass--;S.howls=(S.howls||0)+1;if(S.howls>=6)A('fl_howl');if(h.pass<=0){S.howl=null;msg('Ревун ушёл…',1.5)}else{h.ph='gap';h.t=1.1+Math.random()*.8;h.dir*=-1}}}
  else if(h.ph==='gap'){if(h.t<=0){h.ph='run';h.x=h.dir>0?hr.x0*T-200:(hr.x0+hr.w)*T+200}}}
 // Помеха
 if(P.room>=15){S.gT=(S.gT==null?35+Math.random()*25:S.gT)-dt;if(S.gT<=0&&!S.glitch&&!S.howl){S.glitch={t:1.05};S.gT=32+Math.random()*30;tone(1800,.12,'square',.06);tone(90,.3,'sawtooth',.06)}}
 const gl=S.glitch;if(gl){gl.t-=dt;if(gl.t<=0){if(P.light&&!P.hidden){damage(40,'glitch');msg('ПОМЕХА!',1.5)}else{S.glitches=(S.glitches||0)+1;if(S.glitches>=4)A('fl_glitch')}S.glitch=null}}
 // Глубинник
 const d=S.deep;if(d&&d.room===P.room){d.t+=dt;const dx=P.x-d.x,dy=P.y-d.y,dd=Math.hypot(dx,dy)||1;const lit=P.light&&dd<320&&Math.abs(((Math.atan2(-dy,-dx)-P.face+9.42)%6.283)-3.14)<.5;
  if(P.hidden){d.gone+=dt;if(d.gone>4){S.deep=null;msg('Глубинник ушёл вглубь',2)}}else{const sp=lit?18:62;d.x+=dx/dd*sp*dt;d.y+=dy/dd*sp*dt;if(dd<26){damage(45,'deep');S.deep=null}}}
 else if(d&&d.room!==P.room&&Math.abs(d.room-P.room)>1)S.deep=null;
 // relay hold + final room pressure
 const rh_=S.relayH;if(rh_){if(Math.hypot(rh_.o.x*T+16-P.x,rh_.o.y*T+16-P.y)>64||P.hidden){S.relayH=null;msg('Реле сорвалось',1.2)}else{rh_.t-=dt;if(rh_.t<=0){rh_.o.on=1;fx(rh_.o,'on');S.relayH=null;SND.lock();const k=rooms[rh_.o.r].objs.filter(q=>q.t==='hrelay'&&q.on).length;msg('Реле '+k+'/3',2)}}}
 if(S.hfin&&r&&r.t==='hfinal'&&!S.howl){S.hfin.t-=dt;if(S.hfin.t<=0){S.hfin.t=11+Math.random()*5;S.howl={room:r.n,ph:'warn',t:2.6,pass:1,dir:Math.random()<.5?1:-1,x:0}}}};
// lights: red flicker on Ревун warning
const _lx=window.lightX;window.lightX=function(cx,cy){_lx&&_lx(cx,cy);if(FLR!=='halls')return;const h=S.howl;if(h&&h.room===P.room&&h.ph!=='warn')lamp(h.x-cx,P.y-cy,200,.9);const r=rooms[P.room];if(r)for(const o of r.objs)if((o.t==='hrelay'&&o.on)||o.t==='hmon'||o.t==='hexit')lamp(o.x*T+16-cx,o.y*T+16-cy,80,.6)};
// ---------- drawing ----------
Object.assign(PAL,{halls:{f:'#3a4048',w:'#1c2026',wp:'#2a3038',trim:'#5a6672'},hallsW:{f:'#3e3a34',w:'#1e1c18',wp:'#2c2924',trim:'#6a5e4a'},hallsB:{f:'#3a3030',w:'#1c1616',wp:'#2c2222',trim:'#7a4a3a'},hallsP:{f:'#30383a',w:'#161c1e',wp:'#222a2c',trim:'#4a7a6a'},hallsS:{f:'#4a4238',w:'#221e18',wp:'#302a22',trim:'#8a6a3a'},hallsf:{f:'#2a2e34',w:'#121418',wp:'#1e2226',trim:'#7a3030'}});
const _dox=window.drawObjX;window.drawObjX=function(o,px,py,t){const g=X,cx=px+16,cy=py+16;
 switch(o.t){
  case 'hsw':g.fillStyle='#2a2e34';g.fillRect(px+8,py+4,16,24);g.strokeStyle='#5a6672';g.strokeRect(px+8.5,py+4.5,15,23);g.fillStyle=o.on?'#6f6':'#a33';g.fillRect(px+13,o.on?py+7:py+17,6,8);g.fillStyle='#ddd';g.font='700 9px '+FU;g.textAlign='center';g.fillText(o.k+1,cx,py+31);break;
  case 'hmon':{const r=rooms[o.r];g.fillStyle='#111';g.fillRect(px+1,py+3,30,22);g.fillStyle='#0a2a1a';g.fillRect(px+3,py+5,26,18);if(r&&r.code)r.code.forEach((c,i)=>{g.fillStyle=c?'#5f8':'#1a4a2a';g.fillRect(px+5+i*6,py+9,4,10)});g.fillStyle='rgba(120,255,170,.15)';g.fillRect(px+3,py+5+((t*20)%18),26,1);g.fillStyle='#333';g.fillRect(px+13,py+25,6,5);break}
  case 'hrelay':g.fillStyle='#2a2a30';g.fillRect(px+3,py+2,26,28);g.fillStyle=o.on?'#7f6':o.fuse?'#fd4':'#622';g.beginPath();g.arc(cx,py+10,5,0,7);g.fill();if(o.on)glow(g,cx,py+10,22,'120,255,120',.4);g.fillStyle='#555';g.fillRect(px+8,py+18,16,8);if(S.relayH&&S.relayH.o===o){g.fillStyle='#fd4';g.fillRect(px+3,py-6,26*(1-S.relayH.t/2.2),4)}break;
  case 'hvend':if(!o.sold){g.fillStyle='#4a3a28';g.fillRect(px+2,py+14,28,16);g.save();g.translate(cx-8,py);try{drawIcon(g,o.it,0,0,16)}catch(e){}g.restore();g.fillStyle='#fd4';g.font='700 9px '+FU;g.textAlign='center';g.fillText(o.price,cx,py+27)}else{g.fillStyle='#3a2a18';g.fillRect(px+2,py+14,28,16)}break;
  case 'hsafe':g.fillStyle=o.used?'#3a3a40':'#4a5058';g.fillRect(px+4,py+2,24,28);g.fillStyle='#222';g.fillRect(px+15,py+4,1.5,24);g.fillStyle=o.used?'#555':'#e8c46a';g.beginPath();g.arc(px+20,cy,2.5,0,7);g.fill();break;
  case 'hexit':g.fillStyle='#1a1a1a';g.fillRect(px+4,py,24,32);g.fillStyle='#3f8';g.font='700 8px '+FU;g.textAlign='center';g.fillText('ВЫХОД',cx,py-2);{const k=rooms[o.r].objs.filter(q=>q.t==='hrelay'&&q.on).length;for(let i=0;i<3;i++){g.fillStyle=i<k?'#7f6':'#333';g.fillRect(px+7+i*7,py+4,5,5)}}break;
  case 'hfuse':g.fillStyle='#fa6';g.fillRect(px+10,py+11,12,10);g.fillStyle='#ccc';g.fillRect(px+7,py+13,3,6);g.fillRect(px+22,py+13,3,6);glow(g,cx,cy,14,'255,170,90',.25);break;
  default:_dox&&_dox(o,px,py,t)}};
const _do=drawObj;drawObj=function(o,px,py,t){if(o.t==='wardrobe'&&o.skin==='hlock'){const g=X;g.fillStyle='#56606a';g.fillRect(px+6,py+1,20,30);g.fillStyle='#3a424a';g.fillRect(px+6,py+1,20,3);g.fillStyle='#2a3038';for(let i=0;i<4;i++)g.fillRect(px+10,py+7+i*3,12,1.4);g.fillStyle='#9aa4ae';g.fillRect(px+22,py+15,2,5);if(P.hidden===o){g.fillStyle='rgba(255,255,255,.2)';g.fillRect(px+10,py+7,12,10)}return}return _do(o,px,py,t)};
const _dw=window.drawWorldX;window.drawWorldX=function(cx,cy,t){_dw&&_dw(cx,cy,t);if(FLR!=='halls')return;const g=X,r=rooms[P.room];if(!r)return;
 if(r.fx&&r.fx.pipes){g.strokeStyle='rgba(120,90,70,.7)';g.lineWidth=5;g.beginPath();g.moveTo(r.x0*T+20,(r.y0+1)*T+6);g.lineTo((r.x0+r.w)*T-20,(r.y0+1)*T+6);g.stroke();g.lineWidth=1;for(let x=r.x0*T+40;x<(r.x0+r.w)*T-20;x+=60){g.fillStyle='#6a4a3a';g.fillRect(x,(r.y0+1)*T+1,6,10)}}
 if(r.fx&&r.fx.corr){g.fillStyle='rgba(255,255,255,.03)';for(let x=r.x0*T+16;x<(r.x0+r.w)*T;x+=96)g.fillRect(x,r.y0*T+T,40,(r.h-2)*T)}
 const h=S.howl;if(h&&h.room===P.room){const hr=rooms[h.room];if(h.ph==='warn'){g.fillStyle='rgba(255,20,20,'+(Math.random()<.5?.18:.05)+')';g.fillRect(hr.x0*T,hr.y0*T,hr.w*T,hr.h*T)}else if(h.ph==='run'){const y0=hr.y0*T,hh=hr.h*T;glow(g,h.x,P.y,140,'255,40,40',.5);for(let i=0;i<14;i++){g.fillStyle='rgba(20,0,0,'+(.75-i*.05)+')';g.fillRect(h.x-h.dir*i*16-14,y0+((i*37+t*900)%hh)*0+((Math.sin(t*40+i)*.5+.5)*hh*.15),28,hh*.85)}g.fillStyle='#000';g.beginPath();g.ellipse(h.x,P.y,26,60,0,0,7);g.fill();g.fillStyle='#f22';g.fillRect(h.x-12,P.y-8,8,4);g.fillRect(h.x+4,P.y-8,8,4);g.strokeStyle='#f44';g.lineWidth=2;g.beginPath();for(let i=0;i<9;i++){g.lineTo(h.x-20+i*5,P.y+12+(i%2?6:-2))}g.stroke()}}
 const d=S.deep;if(d&&d.room===P.room){g.fillStyle='rgba(10,20,30,.7)';g.beginPath();g.ellipse(d.x,d.y+10,30+Math.sin(t*2)*3,14,0,0,7);g.fill();g.fillStyle='#0c141c';g.beginPath();g.ellipse(d.x,d.y-6,14,22,0,0,7);g.fill();g.fillStyle='#8cf';g.beginPath();g.arc(d.x-5,d.y-12,2,0,7);g.arc(d.x+5,d.y-12,2,0,7);g.fill();g.strokeStyle='rgba(140,200,255,.35)';for(let i=0;i<3;i++){g.beginPath();g.ellipse(d.x,d.y+10,30+i*10+((t*20)%10),14+i*4,0,0,7);g.stroke()}}};
const _hud=window.hudX;window.hudX=function(){_hud&&_hud();if(FLR!=='halls'||!started)return;
 if(P.hidden&&S.air!=null){X.fillStyle='rgba(0,0,0,.6)';X.fillRect(W/2-90,H-110,180,14);X.fillStyle=S.air<.3?'#f55':'#8cf';X.fillRect(W/2-88,H-108,176*S.air,10);X.fillStyle='#fff';X.font='600 11px '+FU;X.textAlign='center';X.fillText('Воздух',W/2,H-114)}
 if(S.glitch){const a=S.glitch.t;X.save();X.globalAlpha=.9;X.fillStyle='rgba(255,255,255,'+(Math.random()*.15)+')';X.fillRect(0,0,W,H);const gx=W*(.3+.4*((SEED+P.room)%7)/7),gy=H*.35;X.strokeStyle='#fff';X.lineWidth=4;X.beginPath();X.moveTo(gx-30,gy-30);X.lineTo(gx+30,gy+30);X.moveTo(gx+30,gy-30);X.lineTo(gx-30,gy+30);X.stroke();X.beginPath();X.arc(gx,gy,42,0,7);X.stroke();X.fillStyle='#fff';X.font='800 18px '+FU;X.textAlign='center';X.fillText('ПОМЕХА — ВЫКЛЮЧИ СВЕТ (F)',W/2,gy+80);X.restore()}
 if(S.howl&&S.howl.room===P.room&&S.howl.ph==='warn'){X.fillStyle='#f55';X.font='800 20px '+FU;X.textAlign='center';X.fillText('РЕВУН! В ШКАФЧИК!',W/2,90)}
 const r=rooms[P.room];X.textAlign='right';X.font='700 14px '+FU;let y=178;if(r&&r.t==='hfinal'){X.fillStyle='#fd4';X.fillText('Реле: '+r.objs.filter(q=>q.t==='hrelay'&&q.on).length+'/3',W-16,y)}y+=22;X.fillStyle='#fa6';const k=P.inv.filter(i=>i==='relayk').length;if(k){X.fillText('Предохранители-Г: '+k,W-16,y)}X.textAlign='left'};
MOOD.halls={root:58.3,sc:[0,1,5,6],wave:'square',bpm:64,col:'tick'};
const _rs=reset;reset=function(o){_rs(o);try{vendor()}catch(e){}if(FLR==='halls'){S.air=1;msg('Гулкие Залы. Прячься в шкафчики, но следи за воздухом. Щитовые откроют путь.',6)}};
// travelling vendor «Тихоня Мирон» on every other floor (one stall per run)
function vendor(){if(FLR==='halls')return;const M=rooms.length-1,want=Math.floor(M*.45);let r=null;for(let d=0;d<20&&!r;d++)for(const n of[want+d,want-d]){const q=rooms[n];if(q&&q.t==='normal'&&q.w>=9){r=q;break}}if(!r)return;const its=[['battery',20],['bandage',20],['lockpick',30],['vitamins',25]];let k=0;const fr=(x,y)=>tiles[idx(x,y)]===1&&!occ.has(idx(x,y))&&!nearDoor(r,x,y);for(let y=r.y0+1;y<r.y0+r.h-2&&k<its.length;y++){for(let x=r.x0+2;x<r.x0+r.w-2&&k<its.length;x++){if(!fr(x,y)||!fr(x,y+1)||!fr(x+1,y)||!fr(x-1,y))continue;const a=its[k];put(r,'hvend',x,y,{it:a[0],price:a[1]});k++;x+=1}if(k)break}r.vend=k>0};
const _e2=enterRoom;enterRoom=function(r){_e2(r);if(r&&r.vend&&!r._vm){r._vm=1;msg('Тихоня Мирон разложил товар у стены. Цены — на ценниках.',3.5)}};
window.__halls={rh,N,vendor};
})();
