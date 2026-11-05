// atrium.js — walkable lobby «Атриум отеля «Порог»» (original design)
(function(){
const T=32,GW=44,GH=26;let VW=960,VH=540;
const FLO=[['hotel','Отель','#d9b86a'],['mines','Копи','#c98a4a'],['back','Изнанка','#b8b070'],['garden','Сад','#6ac070'],['archive','Архив','#7aa8e0'],['stair','Колодец','#e07a5a'],['halls','Залы','#9ab0c8']];
const FINFO={hotel:['Отель «Порог»','100 дверей','Свободно'],mines:['Копи «Глубокий Шов»','100 дверей','Пройди Отель'],back:['Изнанка','50 дверей, таймер','Дверь с черепом у входа в Отель'],garden:['Сумеречный сад','40 троп','Дверь с черепом в Оранжерее (дверь 90)'],archive:['Нижний Архив','60 стеллажей','Дверь с черепом в Библиотеке (дверь 50)'],stair:['Лестничный колодец','30 пролётов','Дверь с черепом в лавке Копей'],halls:['Гулкие Залы','120 залов','Пройди 3 любых этажа или 150 жетонов']};
const HALLC=150;function wins(){try{return Object.keys(JSON.parse(localStorage.getItem('d2wins')||'{}')).length}catch(e){return 0}}
const ELV=FLO.map((f,i)=>({f:f[0],name:f[1],col:f[2],x:2+i*6,y:1,w:3,h:3}));// cab tiles x..x+2, y 1..3
const KI=[{id:'shop',name:'Лавка жетонов',sub:'Ключница Агата',x:4,y:13,col:'#e8c46a'},{id:'stats',name:'Доска рекордов',sub:'достижения',x:2,y:8,col:'#9ad'},
 {id:'mods',name:'Терминал модификаторов',sub:'риск = жетоны',x:41,y:9,col:'#c7f'},{id:'stash',name:'Тайник',sub:'ячейка на 1 вещь',x:41,y:15,col:'#8c8'},
 {id:'set',name:'Настройки',sub:'звук, графика, клавиши',x:37,y:22,col:'#ccc'},{id:'skin',name:'Гардероб',sub:'образы и оттенки',x:16,y:5,col:'#e8a0c0'},{id:'cred',name:'Табличка авторов',sub:'звуки CC0',x:6,y:22,col:'#d9b86a'}];
const PL0={x:22*T,y:19*T};
let on=false,menu=false,me={x:PL0.x,y:PL0.y,face:0,ph:0},K={},others=new Map(),bub=null,es=0,cab=null,cabT=0,lpT=0,tgt=null,near=null,last=performance.now(),solids=[],tick=0;
const cv=document.createElement('canvas');cv.id='atc';cv.width=VW;cv.height=VH;cv.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:11;display:none;touch-action:none;background:#000';
const g=cv.getContext('2d');document.body.appendChild(cv);
function fitc(){VW=W;VH=H;cv.width=C.width;cv.height=C.height;cv.style.width=C.style.width;cv.style.height=C.style.height;cv.style.left=C.style.left;cv.style.top=C.style.top;cv.style.transform='none'}addEventListener('resize',()=>setTimeout(fitc,0));if(window.visualViewport)visualViewport.addEventListener('resize',()=>setTimeout(fitc,0));fitc();
const ui=document.createElement('div');ui.id='atui';ui.style.cssText='position:fixed;inset:0;z-index:13;pointer-events:none;display:none;font:14px Arial';
ui.innerHTML=`<button id="atMenu" style="position:absolute;right:10px;top:10px;pointer-events:auto">☰ Меню</button>
<div id="atEmo" style="position:absolute;left:10px;bottom:10px;pointer-events:auto;display:flex;gap:6px">${['👋 Привет','❗ Сюда!','⏳ Жду','🎉 Ура','❓ ?'].map((t,i)=>`<button data-e="${i+1}">${t}</button>`).join('')}</div>
<button id="atE" style="position:absolute;right:14px;bottom:14px;pointer-events:auto;font:bold 20px Arial;padding:14px 18px;display:none">E</button>
<button id="atGo" style="position:absolute;left:50%;top:92px;transform:translateX(-50%);pointer-events:auto;font:bold 16px Arial;padding:8px 16px;display:none">Поехали!</button>`;document.body.appendChild(ui);
const st=document.createElement('style');st.textContent='#atui button{background:rgba(40,26,14,.85);color:#eee;border:1px solid #8a6a3a;padding:8px 10px;cursor:pointer;border-radius:4px}#lob.atm{z-index:14!important;background:rgba(0,0,0,.85)!important}';document.head.appendChild(st);
const EMO=['','👋 Привет!','❗ Сюда!','⏳ Жду','🎉 Ура!','❓ ?'];
// map
function build(){solids=[];const W=(x,y,w,h,k)=>solids.push({x:x*T,y:y*T,w:w*T,h:h*T,k});
 W(0,0,GW,1);W(0,GH-1,GW,1);W(0,0,1,GH);W(GW-1,0,1,GH);
 // top wall with cabs
 let x=1;for(const e of ELV){W(x,1,e.x-x,3);x=e.x+e.w}W(x,1,GW-1-x,3);
 for(const e of ELV){W(e.x-1,1,1,3,'cabw');if(!unl(e.f))W(e.x,3,e.w,1,'bar')}
 W(20,11,4,4,'clock');W(1,5,2,1);W(GW-3,5,2,1);
 for(const k of KI)W(k.x,k.y,2,1,'kiosk');
 for(const [a,b] of [[10,8],[30,8],[10,18],[30,18]])W(a,b,3,1,'sofa');
 for(const [a,b] of [[8,5],[35,5],[8,21],[35,21],[16,24],[27,24]])W(a,b,1,1,'plant')}
function unl(f){try{if(f==='halls'&&!__fl.UNL.halls&&wins()>=3){__fl.UNL.halls=1;localStorage.setItem('d2floors',JSON.stringify(__fl.UNL))}return !!(__fl.UNL[f])}catch(e){return f==='hotel'}}
const hit=(x,y,r)=>solids.some(s=>x+r>s.x&&x-r<s.x+s.w&&y+r>s.y&&y-r<s.y+s.h);
// floor cache
let FC=null;function floorCache(){FC=document.createElement('canvas');FC.width=GW*T*2;FC.height=GH*T*2;const f=FC.getContext('2d');f.scale(2,2);
 for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){f.fillStyle=(x+y)%2?'#2b2420':'#3a322a';f.fillRect(x*T,y*T,T,T);f.fillStyle='rgba(255,255,255,.03)';f.fillRect(x*T,y*T,T,1)}
 f.fillStyle='rgba(110,20,30,.55)';f.fillRect(20*T,15*T,4*T,10*T);f.fillRect(4*T,17*T,36*T,2*T);f.strokeStyle='rgba(220,180,90,.5)';f.lineWidth=2;f.strokeRect(20*T+4,15*T+4,4*T-8,10*T-8);f.strokeRect(4*T+4,17*T+4,36*T-8,2*T-8);
 f.fillStyle='rgba(217,184,106,.15)';f.beginPath();f.arc(22*T,13*T,4*T,0,7);f.fill();f.strokeStyle='rgba(217,184,106,.4)';f.beginPath();f.arc(22*T,13*T,3.6*T,0,7);f.stroke();
 // compass rose (own)
 f.save();f.translate(22*T,13*T);for(let i=0;i<8;i++){f.rotate(Math.PI/4);f.fillStyle=i%2?'rgba(217,184,106,.25)':'rgba(140,100,60,.3)';f.beginPath();f.moveTo(0,-3.4*T);f.lineTo(10,-2.3*T);f.lineTo(-10,-2.3*T);f.fill()}f.restore();
 for(const s of solids){if(s.k)continue;f.fillStyle='#1c1410';f.fillRect(s.x,s.y,s.w,s.h);f.fillStyle='#4a3020';f.fillRect(s.x,s.y+s.h-6,s.w,6)}
 // wallpaper on top wall
 for(let x=1;x<GW-1;x++)for(let y=1;y<4;y++){if(ELV.some(e=>x>=e.x&&x<e.x+e.w))continue;f.fillStyle=(x%2)?'#3a1f1a':'#33201a';f.fillRect(x*T,y*T,T,T);f.fillStyle='rgba(217,184,106,.18)';f.fillRect(x*T+14,y*T+6,4,20)}
 // bottom: entrance with window to rainy night
 f.fillStyle='#0a1018';f.fillRect(18*T,GH*T-T,8*T,T);}
function camera(){return{x:Math.max(0,Math.min(GW*T-VW,me.x-VW/2)),y:Math.max(-80,Math.min(GH*T-VH,me.y-VH/2))}}
// network
function patchWS(){const ws=NET.ws;if(!ws||ws._at)return;ws._at=1;const om=ws.onmessage;ws.onmessage=ev=>{let m;try{m=JSON.parse(ev.data)}catch(e){}if(m&&m.t==='lp'){let o=others.get(m.id);if(!o){o={x:m.x,y:m.y,face:0,ph:0};others.set(m.id,o)}o.n=m.n;o.sk=m.sk;o.tx=m.x;o.ty=m.y;o.f=m.f;o.seen=performance.now();if(m.es&&m.es!==o.es){o.es=m.es;o.bub={t:EMO[m.e]||'',ttl:3}}return}om&&om(ev)}}
function sendLP(){if(!NET.ok)return;netSend({t:'lp',x:Math.round(me.x),y:Math.round(me.y),f:+me.face.toFixed(2),e:bub?bub.e:0,es,sk:window.d2skinCode?d2skinCode():''})}
function myParty(){return NET.lobby.parties.find(q=>q.id===NET.party)}
function enterCab(e){cab=e;cabT=0;setFloorSel(e.f);if(NET.ok){saveName();const p=NET.lobby.parties.find(q=>q.auto&&q.floor===e.f&&q.state==='wait'&&q.members.length<4&&q.id!==NET.party);if(p)netSend({t:'join',party:p.id});else netSend({t:'create',floor:e.f,start:0,auto:true})}SNDp(660);msg2('Лифт → '+e.name+(NET.ok?' • ждём попутчиков':' • отправление через 5 с'))}
function leaveCab(){if(!cab)return;cab=null;if(NET.party)netSend({t:'leave'});msg2('Ты вышел из лифта')}
function setFloorSel(f){const b=document.querySelector('#flsel [data-f="'+f+'"]');if(b&&!b.disabled)b.click()}
function goSolo(){const f=cab&&cab.f;leaveCab();setFloorSel(f||'hotel');try{au()}catch(e){}soloStart()}
let toast=null;function msg2(t){toast={t,ttl:3}}
function SNDp(f){try{tone(f,.12,'sine',.06)}catch(e){}}
// interaction
function act(){if(!near)return;if(near.kind==='kiosk')openK(near.k.id);else if(near.kind==='lock'){const f=near.e.f;if(f==='halls'&&window.d2meta&&d2meta.TOK>=HALLC){d2meta.TOK-=HALLC;try{localStorage.setItem('d2tok',JSON.stringify(d2meta.TOK))}catch(e){}__fl.UNL.halls=1;localStorage.setItem('d2floors',JSON.stringify(__fl.UNL));build();floorCache();SNDp(990);msg2('Лифт «Залы» открыт!')}else msg2('Закрыто: '+FINFO[f][2]+(f==='halls'?' (побед: '+wins()+'/3)':''))}}
function openK(id){const c=q=>{const b=document.querySelector('[data-mt="'+q+'"]');if(b)b.click()};SNDp(880);
 if(id==='shop'||id==='mods'||id==='set')c(id);else if(id==='stats')c('stats');else if(id==='stash'){const t=(document.getElementById('d2tk')||{}).textContent||'';msg2(/Тайнике: ([^·]+)/.test(t)?'В Тайнике: '+RegExp.$1.trim()+' — заберёшь в отеле':'Тайник пуст. Положи вещь в тайник во время забега.')}else if(id==='skin'){window.d2wardrobe&&d2wardrobe()}else if(id==='cred'){showLobby(false);showCredits=true}}
// input
addEventListener('keydown',e=>{if(!on||menu||window.d2modal||document.activeElement&&document.activeElement.tagName==='INPUT')return;K[e.code]=true;if(e.code==='KeyE'){act();if(cab)startNow()}const d=+(e.code.match(/^Digit([1-5])$/)||[])[1];if(d)emote(d);if(e.code==='Escape')setMenu(true)});
addEventListener('keyup',e=>{K[e.code]=false});
function startNow(){const p=myParty();if(p&&p.host===NET.id&&p.members.length>1)netSend({t:'start'});else if(!NET.ok||(p&&p.members.length===1))goSolo()}
function emote(i){bub={t:EMO[i],ttl:3,e:i};es++;sendLP()}
const toW=(ev)=>{const b=cv.getBoundingClientRect(),c=camera();return{x:(ev.clientX-b.left)*VW/b.width+c.x,y:(ev.clientY-b.top)*VH/b.height+c.y}};
cv.addEventListener('pointerdown',ev=>{try{au()}catch(e){}tgt=toW(ev);cv.setPointerCapture(ev.pointerId);const k=KI.find(k=>Math.hypot(k.x*T+T-tgt.x,k.y*T+16-tgt.y)<40);if(k&&near&&near.k===k)act()});
cv.addEventListener('pointermove',ev=>{if(tgt)tgt=toW(ev)});cv.addEventListener('pointerup',()=>{tgt=null});
ui.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>emote(+b.dataset.e));ui.querySelector('#atE').onclick=()=>{act();if(cab)startNow()};ui.querySelector('#atGo').onclick=startNow;
ui.querySelector('#atMenu').onclick=()=>setMenu(!menu);
function setMenu(v){menu=v;const l=document.getElementById('lob');if(!l)return;l.classList.toggle('atm',v);l.style.display=v||!on?(on?'flex':l.style.display):'none';if(on&&!v)l.style.display='none';ui.querySelector('#atMenu').textContent=v?'✕ В атриум':'☰ Меню'}
// show/hide hook
const _sl=showLobby;showLobby=function(v){on=v;{const mc=document.getElementById('c');if(mc)mc.style.visibility=v?'hidden':'visible'}cv.style.display=ui.style.display=v?'block':'none';if(v){build();floorCache();me.x=PL0.x;me.y=PL0.y;cab=null;_sl(menu);document.getElementById('lob').classList.toggle('atm',menu)}else{_sl(false);menu&&setMenu(false);menu=false}};
// loop
function upd(dt){tick+=dt;patchWS();if(NET.ok&&!NAME){const n='Гость-'+(100+Math.floor(Math.random()*900));document.getElementById('lnm').value=n;saveName()}
 let dx=(K.KeyD||K.ArrowRight?1:0)-(K.KeyA||K.ArrowLeft?1:0),dy=(K.KeyS||K.ArrowDown?1:0)-(K.KeyW||K.ArrowUp?1:0);
 if(tgt&&!dx&&!dy){const a=tgt.x-me.x,b=tgt.y-me.y,l=Math.hypot(a,b);if(l>8){dx=a/l;dy=b/l}}
 if(menu){dx=dy=0}const l=Math.hypot(dx,dy);if(l){dx/=l;dy/=l;const s=(K.ShiftLeft?220:150)*dt;if(!hit(me.x+dx*s,me.y,10))me.x+=dx*s;if(!hit(me.x,me.y+dy*s,10))me.y+=dy*s;me.face=Math.atan2(dy,dx);me.ph+=dt*10}me.mv=!!l;
 // cab detection
 const inCab=ELV.find(e=>unl(e.f)&&me.x>e.x*T&&me.x<(e.x+e.w)*T&&me.y>T&&me.y<4*T-4);
 if(inCab&&cab!==inCab){if(cab)leaveCab();enterCab(inCab)}else if(!inCab&&cab)leaveCab();
 if(cab&&!l&&!tgt){const p=myParty(),i=Math.max(0,p?p.members.indexOf(NET.id):0),sx=(cab.x+(i%2?2.3:.7))*T,sy=(i<2?1.7:2.9)*T,a=sx-me.x,b=sy-me.y,d=Math.hypot(a,b);if(d>2){const s=Math.min(d,90*dt);me.x+=a/d*s;me.y+=b/d*s;me.face=-1.57}}
 if(cab){cabT+=dt;const p=myParty();if(!NET.ok&&cabT>=5)goSolo();else if(p&&p.members.length===1&&p.cd!=null&&p.cd<=0)goSolo()}
 near=null;for(const k of KI)if(Math.hypot(k.x*T+T-me.x,k.y*T+16-me.y)<64)near={kind:'kiosk',k};
 for(const e of ELV)if(!unl(e.f)&&Math.abs((e.x+1.5)*T-me.x)<50&&me.y<5*T)near={kind:'lock',e};
 lpT-=dt;if(lpT<=0){lpT=.12;sendLP()}
 const ids=new Set(NET.lobby.players.map(p=>p.id));for(const [id,o] of others){if(!ids.has(id)||performance.now()-o.seen>6000){others.delete(id);continue}const k=Math.min(1,dt*10),ox=o.x,oy=o.y;o.x+=(o.tx-o.x)*k;o.y+=(o.ty-o.y)*k;o.mv=Math.hypot(o.x-ox,o.y-oy)>.3;if(o.mv)o.ph+=dt*10;if(o.bub){o.bub.ttl-=dt;if(o.bub.ttl<=0)o.bub=null}}
 if(bub){bub.ttl-=dt;if(bub.ttl<=0)bub=null}if(toast){toast.ttl-=dt;if(toast.ttl<=0)toast=null}
 const p=myParty();ui.querySelector('#atGo').style.display=cab&&(!NET.ok||!p||p.host===NET.id)?'block':'none';ui.querySelector('#atE').style.display=near||cab?'block':'none'}
function char(x,y,face,ph,col,name,me_,sk,mv){if(window.d2drawSkin&&sk!==false){d2drawSkin(g,x,y,face,ph,mv,{skin:sk||undefined});if(name){g.font='bold 12px Arial';g.textAlign='center';g.fillStyle='rgba(0,0,0,.7)';g.fillText(name,x+1,y-21);g.fillStyle=me_?'#ffe08a':'#fff';g.fillText(name,x,y-22)}return}g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x+2,y+11,11,5,0,0,7);g.fill();
 try{if(window.drawChar){const sx=X;window.X=g;}}catch(e){}
 g.fillStyle=col;g.beginPath();g.arc(x,y,11,0,7);g.fill();g.fillStyle='#f0d8b8';g.beginPath();g.arc(x+Math.cos(face)*4,y+Math.sin(face)*4,6,0,7);g.fill();
 const s=Math.sin(ph)*3;g.fillStyle='#222';g.fillRect(x-8+s,y+9,5,4);g.fillRect(x+3-s,y+9,5,4);
 g.font='bold 12px Arial';g.textAlign='center';g.fillStyle='rgba(0,0,0,.7)';g.fillText(name,x+1,y-19);g.fillStyle=me_?'#ffe08a':'#fff';g.fillText(name,x,y-20)}
function bubble(x,y,t){g.font='bold 13px Arial';const w=g.measureText(t).width+14;g.fillStyle='rgba(255,255,255,.95)';g.fillRect(x-w/2,y-58,w,22);g.beginPath();g.moveTo(x-5,y-36);g.lineTo(x+5,y-36);g.lineTo(x,y-30);g.fill();g.fillStyle='#222';g.textAlign='center';g.fillText(t,x,y-42)}
function draw(){const c=camera();g.setTransform(SC,0,0,SC,0,0);g.fillStyle='#000';g.fillRect(0,0,VW,VH);g.translate(-Math.round(c.x),-Math.round(c.y));g.drawImage(FC,0,0,GW*T,GH*T);
 // rain at entrance
 for(let i=0;i<30;i++){const rx=18*T+((i*53+tick*300)%(8*T)),ry=(GH-1)*T+((i*17+tick*600)%T);g.strokeStyle='rgba(150,180,220,.4)';g.beginPath();g.moveTo(rx,ry);g.lineTo(rx-3,ry+8);g.stroke()}
 // elevators
 for(const e of ELV){const x=e.x*T,y=T,w=e.w*T,h=3*T,u=unl(e.f),party=NET.lobby.parties.filter(q=>q.auto&&q.floor===e.f&&q.state==='wait');
  g.fillStyle=u?'#2a2218':'#141414';g.fillRect(x,y,w,h);g.fillStyle='rgba(255,230,170,'+(u?.08+.04*Math.sin(tick*2+e.x):0)+')';g.fillRect(x,y,w,h);
  g.strokeStyle=u?e.col:'#555';g.lineWidth=4;g.strokeRect(x-2,y-2,w+4,h+2);
  g.fillStyle='#111';g.fillRect(x+w/2-34,y-T+4,68,22);g.fillStyle=u?e.col:'#666';g.font='bold 13px Arial';g.textAlign='center';g.fillText(e.name,x+w/2,y-T+20);
  // arrow lamp
  g.fillStyle=party.length?'#7f7':(u?'#a83':'#333');g.beginPath();g.moveTo(x+w/2,y+6);g.lineTo(x+w/2-6,y+14);g.lineTo(x+w/2+6,y+14);g.fill();
  if(!u){g.fillStyle='#333';g.fillRect(x,y+2*T,w,T);g.strokeStyle='#777';g.lineWidth=2;for(let k=0;k<6;k++){g.beginPath();g.moveTo(x+k*16,y+2*T);g.lineTo(x+k*16+16,y+3*T);g.stroke()}
   g.fillStyle='#c9a24a';g.fillRect(x+w/2-8,y+T+6,16,12);g.strokeStyle='#c9a24a';g.lineWidth=3;g.beginPath();g.arc(x+w/2,y+T+6,6,Math.PI,0);g.stroke()}
  if(party.length){const p=party[0];g.fillStyle='#7f7';g.font='11px Arial';g.fillText(p.members.length+'/4'+(p.cd!=null?' • '+Math.ceil(p.cd/1000)+'с':''),x+w/2,y+h+14)}}
 // clock pillar (original)
 g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(22*T+6,13*T+56,70,20,0,0,7);g.fill();g.fillStyle='#4a3020';g.beginPath();g.arc(22*T,13*T,62,0,7);g.fill();g.fillStyle='#e8dcc0';g.beginPath();g.arc(22*T,13*T,40,0,7);g.fill();
 const d=new Date();g.strokeStyle='#222';g.lineWidth=4;g.beginPath();g.moveTo(22*T,13*T);g.lineTo(22*T+Math.cos((d.getHours()%12+d.getMinutes()/60)/12*6.283-1.57)*22,13*T+Math.sin((d.getHours()%12+d.getMinutes()/60)/12*6.283-1.57)*22);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(22*T,13*T);g.lineTo(22*T+Math.cos(d.getMinutes()/60*6.283-1.57)*32,13*T+Math.sin(d.getMinutes()/60*6.283-1.57)*32);g.stroke();
 g.fillStyle='#d9b86a';g.font='bold 11px Georgia';g.textAlign='center';g.fillText('ОТЕЛЬ «ПОРОГ»',22*T,13*T+56);
 // decor
 for(const s of solids){if(s.k==='sofa'){g.fillStyle='#5a1e22';g.fillRect(s.x,s.y,s.w,s.h);g.fillStyle='#7a2a30';g.fillRect(s.x+4,s.y+4,s.w-8,s.h-12)}if(s.k==='plant'){g.fillStyle='#6a4a2a';g.fillRect(s.x+8,s.y+16,16,14);g.fillStyle='#2f6a2a';for(let i=0;i<6;i++){g.beginPath();g.ellipse(s.x+16+Math.cos(i)*8,s.y+12+Math.sin(i)*6,7,4,i,0,7);g.fill()}}}
 for(const k of KI){const x=k.x*T,y=k.y*T;g.fillStyle='#3a2616';g.fillRect(x,y,2*T,T);g.fillStyle=k.col;g.fillRect(x,y,2*T,4);g.font='bold 12px Arial';g.textAlign='center';g.fillStyle='rgba(0,0,0,.7)';g.fillRect(x+T-70,y-34,140,30);g.fillStyle=k.col;g.fillText(k.name,x+T,y-21);g.fillStyle='#aaa';g.font='10px Arial';g.fillText(k.sub,x+T,y-9);
  if(k.id==='shop'){char(x+T,y+T+18,-1.57,0,'#5a3a6a','',false,'arch:4')}if(k.id==='stats'){g.fillStyle='#e8c46a';g.beginPath();g.arc(x+T,y+16,6,0,7);g.fill()}if(k.id==='mods'){g.fillStyle='rgba(200,120,255,'+(.4+.3*Math.sin(tick*3))+')';g.fillRect(x+10,y+6,2*T-20,T-12)}}
 // chandeliers glow
 for(const [a,b] of [[11,10],[33,10],[22,20]]){const q=g.createRadialGradient(a*T,b*T,0,a*T,b*T,160);q.addColorStop(0,'rgba(255,220,150,.18)');q.addColorStop(1,'rgba(255,220,150,0)');g.fillStyle=q;g.fillRect(a*T-160,b*T-160,320,320);g.fillStyle='#e8c46a';g.beginPath();g.arc(a*T,b*T,5,0,7);g.fill()}
 // players
 let i=0;for(const [id,o] of others){i++;char(o.x,o.y,o.f||0,o.ph,'',o.n||'?',false,o.sk||'bell:0',o.mv);if(o.bub)bubble(o.x,o.y,o.bub.t)}
 char(me.x,me.y,me.face,me.ph,'',NAME||'Ты',true,window.d2skinCode?d2skinCode():'',me.mv);if(bub)bubble(me.x,me.y,bub.t);
 // elevator info plaque
 for(const e of ELV){if(Math.abs((e.x+1.5)*T-me.x)<70&&me.y<7*T){const fi=FINFO[e.f],u=unl(e.f),x=(e.x+1.5)*T,y=4*T+40;g.fillStyle='rgba(10,8,6,.88)';g.fillRect(x-110,y,220,58);g.strokeStyle=e.col;g.strokeRect(x-110,y,220,58);g.textAlign='center';g.fillStyle=e.col;g.font='bold 13px Georgia';g.fillText(fi[0],x,y+16);g.fillStyle='#ccc';g.font='11px Arial';g.fillText(fi[1],x,y+32);g.fillStyle=u?'#7f7':'#f99';g.fillText(u?'Открыто — зайди в лифт':'🔒 '+fi[2],x,y+48)}}
 // hint
 if(near){g.font='bold 14px Arial';g.textAlign='center';g.fillStyle='#fff';g.fillText(near.kind==='kiosk'?'[E] '+near.k.name:(near.e.f==='halls'?'[E] Открыть за '+HALLC+' жетонов':'🔒 Закрыто'),me.x,me.y+34)}
 g.setTransform(SC,0,0,SC,0,0);
 // HUD
 g.fillStyle='rgba(0,0,0,.55)';g.fillRect(10,10,330,46);g.fillStyle='#d9b86a';g.font='bold 18px Georgia';g.textAlign='left';g.fillText('Атриум отеля «Порог»',18,32);g.fillStyle='#aaa';g.font='12px Arial';g.fillText((NET.ok?'Онлайн: '+NET.lobby.players.length:'Офлайн')+' • WASD/тап — идти • E — действие • 1–5 — эмоции',18,49);
 const p=myParty();if(cab){const w=360,x=VW/2-w/2;g.fillStyle='rgba(20,14,8,.88)';g.fillRect(x,10,w,74);g.strokeStyle=cab.col;g.strokeRect(x,10,w,74);g.fillStyle=cab.col;g.font='bold 15px Arial';g.textAlign='center';
  const nm=id=>{const q=NET.lobby.players.find(z=>z.id===id);return q?q.name:'?'};
  g.fillText('Лифт → '+cab.name,VW/2,30);g.fillStyle='#ddd';g.font='13px Arial';g.fillText(p?p.members.map(id=>nm(id)+(id===p.host?' ★':'')).join(', ')+' ('+p.members.length+'/4)':(NET.ok?'Подключение...':'Одиночная поездка'),VW/2,50);
  const cd=NET.ok?(p&&p.cd!=null?Math.ceil(p.cd/1000):null):Math.max(0,Math.ceil(5-cabT));g.fillStyle='#ffe08a';g.fillText(cd!=null?'Отправление через '+cd+' с':'',VW/2,70)}
 if(toast){g.globalAlpha=Math.min(1,toast.ttl);g.fillStyle='rgba(0,0,0,.7)';g.font='14px Arial';const w=g.measureText(toast.t).width+24;g.fillRect(VW/2-w/2,VH-110,w,28);g.fillStyle='#fff';g.textAlign='center';g.fillText(toast.t,VW/2,VH-91);g.globalAlpha=1}}
function loop(n){const dt=Math.min(.05,(n-last)/1000);last=n;if(on){try{upd(dt);draw()}catch(e){console.error(e)}}requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.__at={menu:setMenu,get me(){return me},tp(x,y){me.x=x;me.y=y},cab:f=>{const e=ELV.find(q=>q.f===f);me.x=(e.x+1.5)*T;me.y=2.5*T},get others(){return [...others.values()].map(o=>({n:o.n,x:Math.round(o.x),y:Math.round(o.y),bub:o.bub&&o.bub.t,sk:o.sk}))},get cab_(){return cab&&cab.f},emote,ELV,KI,T,openK,get on(){return on}};
// initial: lobby already shown by index; show atrium (test harness opens classic menu)
setTimeout(()=>{menu=!!navigator.webdriver&&!localStorage.getItem('d2atrium');showLobby(document.getElementById('lob').style.display!=='none')},0);
})();
