// DOORS 2D — графика и интерфейс (оригинальный стиль "Тёмное золото отеля").
// Все монстры — оригинальные дизайны. Шрифты: Cormorant Garamond и Rubik (SIL OFL, fonts/).
'use strict';
var SET=Object.assign({q:'high',music:.8,grain:true,shake:true,season:true,keys:{}},JSON.parse(localStorage.getItem('d2set')||'{}'));
function saveSet(){localStorage.setItem('d2set',JSON.stringify(SET))}
const HQ=()=>SET.q==='high';
const FS="'Cormorant Garamond',Georgia,serif",FU="Rubik,Arial,sans-serif";
const ENAME={rush:'Рой',ambush:'Звонарь',screech:'Шорох',eyes:'Люстра',halt:'Отлив',seek:'Ищейка',figure:'Слухач',jeff:'Портье',snare:'Терновник',dupe:'Двойник',hide:'Теснота'};
Object.assign(HINTS,{rush:'Это был Рой — облако моли вокруг фонаря. Когда лампы мерцают, сразу прячься в шкаф или под кровать!',ambush:'Это был Звонарь. Он звонит без предупреждения и возвращается 2–4 раза. Выходи, только когда стихнет последний звон.',screech:'Шорох прячется в тёмных комнатах. Услышишь шелест бумаги — быстро повернись к нему.',halt:'Это был Отлив. Он медленнее тебя: отходи, а на «РАЗВЕРНИСЬ!» иди в другую сторону.',seek:'Ищейка догнала тебя. Не останавливай бег, обходи завалы, огонь и лужи смолы.',figure:'Слухач слеп, но слышит бег. Ходи шагом, прячься и в укрытии жми ←/→ в такт сердцу.',eyes:'Это была Люстра. Не смотри на её огни — отвернись и проходи мимо.',dupe:'Это был Двойник. Сверяй номер: у фальшивой двери неправильная табличка.',hide:'Теснота не любит, когда прячутся без причины. Выходи из шкафа вовремя.',snare:'Терновник ловит тех, кто не смотрит под ноги в саду.'});
// ---- fonts ----
(()=>{const st=document.createElement('style');st.textContent=`@font-face{font-family:'Cormorant Garamond';src:url(fonts/cormorant.woff2) format('woff2');font-weight:300 700;font-display:swap}@font-face{font-family:Rubik;src:url(fonts/rubik.woff2) format('woff2');font-weight:300 900;font-display:swap}`;document.head.appendChild(st);
 if(document.fonts){document.fonts.load("600 20px 'Cormorant Garamond'");document.fonts.load('500 14px Rubik')}})();
// ---- utils ----
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,k)=>a+(b-a)*k;
function h01(a,b){return (hash(a*7+3,b*13+1)%10007)/10007}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function glow(g,x,y,r,c,a){const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,'rgba('+c+','+a+')');q.addColorStop(1,'rgba('+c+',0)');g.fillStyle=q;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>clamp(Math.round(k>0?v+(255-v)*k:v*(1+k)),0,255);return'rgb('+f(r)+','+f(g)+','+f(b)+')'}
const SUB=r=>r?(r.sub||r.t):'normal';
// ---- floor/wall painters (into chunk canvases) ----
const PAL={normal:{f:'#5a3b26',w:'#3b2a3a',wp:'#4b3346',trim:'#6b4426'},reception:{f:'#6a1e22',w:'#2f3a2e',wp:'#3c4a38',trim:'#7a5530'},library:{f:'#4a3220',w:'#2a2418',wp:'#38301f',trim:'#5a3d22'},shop:{f:'#d8cfb8',w:'#2c3a3a',wp:'#3a4a48',trim:'#6b4a2a'},electric:{f:'#3a3d42',w:'#24272b',wp:'#2e3236',trim:'#4a4e54'},halt:{f:'#1b2a48',w:'#141c30',wp:'#1d2a44',trim:'#2a3a5a'},chase:{f:'#4e3322',w:'#33231a',wp:'#41301f',trim:'#5a3b22'},greenhouse:{f:'#3a3f30',w:'#1f2a1c',wp:'#2a3824',trim:'#3a4a2a'},
 hall:{f:'#5e2430',w:'#3a2a24',wp:'#4a3a2c',trim:'#7a5530'},dining:{f:'#5c3d24',w:'#2e2a3e',wp:'#3a3550',trim:'#7a5530'},storage:{f:'#4a4640',w:'#2a2826',wp:'#34312c',trim:'#4a4038'},bath:{f:'#c9d4d6',w:'#2a3a40',wp:'#cfe0e0',trim:'#7a8a90'},courtyard:{f:'#55584e',w:'#1e2a1c',wp:'#2a3a26',trim:'#4a5040'},infirmary:{f:'#b8c2b8',w:'#334038',wp:'#d8e2d8',trim:'#8a9a8a'},study:{f:'#4a3220',w:'#2a2418',wp:'#38301f',trim:'#5a3d22'}};
function paintFloor(g,type,x,y,px,py){const p=PAL[type]||PAL.normal,f=p.f,h=h01(x,y);
 switch(type){
 case'reception':case'hall':case'halt':{g.fillStyle=f;g.fillRect(px,py,T,T);g.fillStyle=shade(f,-.25);for(let i=0;i<T;i+=2)if((i+x*3)%8<2)g.fillRect(px,py+i,T,1);
  g.strokeStyle=type==='halt'?'rgba(120,170,255,.18)':'rgba(220,170,80,.28)';g.lineWidth=1;g.beginPath();g.moveTo(px+16,py+4);g.lineTo(px+28,py+16);g.lineTo(px+16,py+28);g.lineTo(px+4,py+16);g.closePath();g.stroke();
  g.fillStyle=type==='halt'?'rgba(140,190,255,.22)':'rgba(230,180,90,.35)';g.fillRect(px+15,py+15,2,2);break}
 case'shop':case'bath':case'infirmary':{const a=(x+y)&1;g.fillStyle=type==='shop'?(a?'#1d1a18':'#d9cfb6'):a?shade(f,-.08):f;g.fillRect(px,py,T,T);g.fillStyle='rgba(255,255,255,.08)';g.fillRect(px+2,py+2,T-8,3);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(px,py+T-1,T,1);g.fillRect(px+T-1,py,1,T);break}
 case'electric':case'storage':{g.fillStyle=shade(f,(h-.5)*.12);g.fillRect(px,py,T,T);g.strokeStyle='rgba(0,0,0,.35)';g.strokeRect(px+.5,py+.5,T-1,T-1);g.fillStyle='rgba(255,255,255,.14)';[[3,3],[T-4,3],[3,T-4],[T-4,T-4]].forEach(([a,b])=>g.fillRect(px+a-1,py+b-1,2,2));
  if(type==='electric'){g.strokeStyle='rgba(255,255,255,.05)';for(let i=6;i<T;i+=6){g.beginPath();g.moveTo(px+i,py+6);g.lineTo(px+i-4,py+T-6);g.stroke()}}else if(h<.2){g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(px+16,py+16,8,5,h*9,0,7);g.fill()}break}
 case'library':case'study':{g.fillStyle=f;g.fillRect(px,py,T,T);for(let i=0;i<4;i++)for(let j=0;j<2;j++){const o=((i+j+x+y)&1);g.fillStyle=shade(f,(h01(x*4+i,y*2+j)-.5)*.3);if(o)g.fillRect(px+i*8,py+j*16,8,16);else g.fillRect(px+i*8,py+j*16,8,16);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(px+i*8,py+j*16,1,16);g.fillRect(px+i*8,py+j*16+(o?8:15),8,1)}break}
 case'greenhouse':case'courtyard':{g.fillStyle=shade(f,-.2);g.fillRect(px,py,T,T);const s=[[1,1,14,14],[17,1,14,9],[17,12,14,19],[1,17,14,14]];s.forEach((r,i)=>{g.fillStyle=shade(f,(h01(x*5+i,y)-.5)*.25);rr(g,px+r[0],py+r[1],r[2],r[3],3);g.fill()});
  if(h<.45){g.fillStyle=type==='greenhouse'?'rgba(70,120,40,.5)':'rgba(70,100,50,.35)';for(let i=0;i<5;i++)g.fillRect(px+h01(x+i,y)*30,py+h01(x,y+i)*30,3,2)}
  if(type==='courtyard'&&h>.8){g.fillStyle='rgba(120,150,180,.25)';g.beginPath();g.ellipse(px+16,py+18,10,4,0,0,7);g.fill()}break}
 default:{// planks
  for(let i=0;i<4;i++){const off=Math.floor(h01(y*4+i,7)*32),c=shade(f,(h01(x+(i*31),y*4+i)-.5)*.22);g.fillStyle=c;g.fillRect(px,py+i*8,T,8);
   g.fillStyle='rgba(0,0,0,.35)';g.fillRect(px,py+i*8+7,T,1);const sx=(off+x*32)%64;if(sx<32){g.fillRect(px+sx,py+i*8,1,7)}
   g.fillStyle='rgba(255,220,170,.06)';g.fillRect(px,py+i*8,T,1);g.strokeStyle='rgba(30,15,5,.18)';g.beginPath();g.moveTo(px,py+i*8+3+h01(x,i)*2);g.bezierCurveTo(px+10,py+i*8+2,px+20,py+i*8+5,px+T,py+i*8+3);g.stroke()}
  if(type==='dining'&&((x+y)%2)){g.fillStyle='rgba(120,20,30,.10)';g.fillRect(px,py,T,T)}}}}
function isFloor(x,y){if(x<0||y<0||x>=GW||y>=GH)return false;return tiles[idx(x,y)]!==0}
function paintWall(g,x,y,px,py){const r=rooms[rmap[idx(x,y)]],type=SUB(r),p=PAL[type]||PAL.normal;
 const below=isFloor(x,y+1);
 if(below){// front face (wall seen from above-south): wallpaper + wainscot
  const gr=g.createLinearGradient(0,py,0,py+T);gr.addColorStop(0,shade(p.wp,.08));gr.addColorStop(1,shade(p.wp,-.25));g.fillStyle=gr;g.fillRect(px,py,T,T);
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<T;i+=8)g.fillRect(px+i+3,py+2,2,18);
  if(type==='normal'||type==='hall'||type==='dining'){g.fillStyle='rgba(220,170,90,.12)';for(let i=4;i<T;i+=8){g.beginPath();g.arc(px+i,py+8+((x+i)%2)*6,1.4,0,7);g.fill()}}
  g.fillStyle=p.trim;g.fillRect(px,py+20,T,12);g.fillStyle=shade(p.trim,.25);g.fillRect(px,py+20,T,2);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(px,py+T-3,T,3);for(let i=0;i<T;i+=16)g.fillRect(px+i,py+23,1,7);
 }else{g.fillStyle=shade(p.w,-.35);g.fillRect(px,py,T,T);g.fillStyle='rgba(255,255,255,.035)';if((x+y)%3===0)g.fillRect(px+4,py+4,T-8,T-8)}
 // cap edges
 g.fillStyle=shade(p.w,.15);if(isFloor(x,y-1))g.fillRect(px,py,T,2);if(isFloor(x-1,y)&&!below)g.fillRect(px,py,2,T);if(isFloor(x+1,y)&&!below)g.fillRect(px+T-2,py,2,T);
 if(!below&&isFloor(x,y+1)===false&&isFloor(x,y-1)){g.fillStyle=shade(p.w,-.1);g.fillRect(px,py+2,T,4)}}
function paintAO(g,x,y,px,py){// shadows cast by walls onto floor (light from above)
 const n=!isFloor(x,y-1),w=!isFloor(x-1,y),e=!isFloor(x+1,y);
 if(n){const q=g.createLinearGradient(0,py,0,py+14);q.addColorStop(0,'rgba(0,0,0,.55)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px,py,T,14)}
 if(w){const q=g.createLinearGradient(px,0,px+9,0);q.addColorStop(0,'rgba(0,0,0,.4)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px,py,9,T)}
 if(e){const q=g.createLinearGradient(px+T,0,px+T-7,0);q.addColorStop(0,'rgba(0,0,0,.3)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px+T-7,py,7,T)}
 if(!isFloor(x,y+1)){g.fillStyle='rgba(0,0,0,.18)';g.fillRect(px,py+T-3,T,3)}}
const CH=8,CPX=CH*T;let CHUNKS=new Map(),CHT=null;
function chunk(cx,cy){if(CHT!==tiles){CHUNKS=new Map();CHT=tiles}const k=cx+','+cy;let c=CHUNKS.get(k);if(c){c.u=frames;return c.c}
 const cv=document.createElement('canvas');cv.width=cv.height=CPX;const g=cv.getContext('2d');
 for(let ty=0;ty<CH;ty++)for(let tx=0;tx<CH;tx++){const x=cx*CH+tx,y=cy*CH+ty;if(x>=GW||y>=GH)continue;const t=tiles[idx(x,y)],px=tx*T,py=ty*T;
  if(t===0){let nb=false;for(let dy=-1;dy<=1&&!nb;dy++)for(let dx=-1;dx<=1;dx++)if(isFloor(x+dx,y+dy)){nb=true;break}if(nb)paintWall(g,x,y,px,py);continue}
  let r=rooms[rmap[idx(x,y)]];if(t===2){const d=doorAt.get(idx(x,y));if(d)r=rooms[d.room]}paintFloor(g,SUB(r),x,y,px,py);paintAO(g,x,y,px,py)}
 CHUNKS.set(k,{c:cv,u:frames});if(CHUNKS.size>90){let o=null,ou=1e18;for(const[kk,v]of CHUNKS)if(v.u<ou){ou=v.u;o=kk}CHUNKS.delete(o)}return cv}
// ---- doors ----
drawDoor=function(px,py,num,state){const g=X;
 g.fillStyle='#1c120a';g.fillRect(px,py,T,T);g.fillStyle='#6b4a22';g.fillRect(px,py,3,T);g.fillRect(px+T-3,py,3,T);g.fillStyle='#8a6230';g.fillRect(px,py,T,3);
 if(state==='open'){g.fillStyle='#070403';g.fillRect(px+3,py+3,T-6,T-3);const q=g.createLinearGradient(px,0,px+T,0);q.addColorStop(0,'rgba(255,200,120,.08)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px+3,py+3,T-6,T-3);
  g.fillStyle='#5a3418';g.beginPath();g.moveTo(px+T-3,py+3);g.lineTo(px+T+5,py-4);g.lineTo(px+T+5,py+T-6);g.lineTo(px+T-3,py+T);g.fill();g.fillStyle='#d9b86a';g.fillRect(px+T+1,py+12,2,3)}
 else{const q=g.createLinearGradient(px,py,px+T,py+T);q.addColorStop(0,'#8a5a2c');q.addColorStop(1,'#5a3418');g.fillStyle=q;g.fillRect(px+3,py+3,T-6,T-3);
  g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=1;g.strokeRect(px+6.5,py+6.5,T-13,9);g.strokeRect(px+6.5,py+18.5,T-13,10);g.strokeStyle='rgba(255,220,160,.18)';g.strokeRect(px+7.5,py+7.5,T-15,7);
  g.fillStyle='#e8c46a';g.beginPath();g.arc(px+T-8,py+17,2.2,0,7);g.fill();g.fillStyle='rgba(255,255,220,.8)';g.fillRect(px+T-9,py+16,1,1)}
 if(num!==null){g.fillStyle='#1a1208';rr(g,px+3,py-15,T-6,13,3);g.fill();const q=g.createLinearGradient(0,py-14,0,py-3);q.addColorStop(0,'#f0d48a');q.addColorStop(1,'#a07a32');g.fillStyle=q;rr(g,px+4,py-14,T-8,11,2.5);g.fill();
  g.fillStyle='#2a1a08';g.font='700 10px '+FU;g.textAlign='center';g.fillText(pad(num),px+16,py-5.5)}
 if(state==='locked'){g.fillStyle='#bfc3c8';rr(g,px+10,py+13,12,10,2);g.fill();g.strokeStyle='#bfc3c8';g.lineWidth=2;g.beginPath();g.arc(px+16,py+13,4,Math.PI,0);g.stroke();g.fillStyle='#333';g.fillRect(px+15,py+16,2,4)}
 if(state==='code'){g.fillStyle='#2a2a2a';rr(g,px+6,py+9,20,15,2);g.fill();g.fillStyle='#7f7';g.font='8px monospace';g.textAlign='center';g.fillText('• • • •',px+16,py+19);g.fillStyle='#d9b86a';g.fillRect(px+6,py+9,20,1)}};
// ---- objects ----
function shadowRect(x,y,w,h){X.fillStyle='rgba(0,0,0,.35)';rr(X,x+3,y+4,w,h,4);X.fill()}
function wood(x,y,w,h,c,r){const q=X.createLinearGradient(x,y,x,y+h);q.addColorStop(0,shade(c,.18));q.addColorStop(1,shade(c,-.2));X.fillStyle=q;rr(X,x,y,w,h,r||3);X.fill();X.fillStyle='rgba(255,230,180,.12)';X.fillRect(x+2,y+1,w-4,1)}
drawObj=function(o,px,py,t){const g=X;switch(o.t){
 case'dresser':shadowRect(px+2,py+5,28,23);wood(px+2,py+4,28,24,'#7a4e28');g.fillStyle=o.used?'#1a0f07':'#94633a';g.fillRect(px+5,py+8,22,7);g.fillStyle='#94633a';g.fillRect(px+5,py+18,22,7);
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(px+5,py+14,22,1);g.fillRect(px+5,py+24,22,1);g.fillStyle='#e8c46a';g.fillRect(px+14,py+10,4,2);g.fillRect(px+14,py+20,4,2);
  if(o.rich){g.fillStyle='#e8c46a';g.fillRect(px+2,py+4,28,1)}if(!o.used&&HQ()&&((hash(o.x,o.y)%3)===0)){g.fillStyle='#d9b86a';g.beginPath();g.arc(px+8,py+5,2.5,0,7);g.fill();glow(g,px+8,py+2,8,'255,210,120',.3)}break;
 case'wardrobe':shadowRect(px+1,py+2,30,29);wood(px+1,py+1,30,30,'#4a2e18',2);wood(px+3,py+3,12,26,'#6a4424',1);wood(px+17,py+3,12,26,'#6a4424',1);g.fillStyle='#120a05';g.fillRect(px+15,py+3,2,26);
  g.fillStyle='#e8c46a';g.fillRect(px+12,py+14,2,4);g.fillRect(px+18,py+14,2,4);g.strokeStyle='rgba(0,0,0,.3)';g.strokeRect(px+5.5,py+6.5,8,8);g.strokeRect(px+18.5,py+6.5,8,8);
  if(P.hidden===o){g.fillStyle='rgba(255,230,150,.25)';g.fillRect(px+15,py+5,2,22)}if(P.hidden===o&&P.hideT>6)ED.hideEyes(px,py,S.t,(P.hideT-6)/4);break;
 case'bed':shadowRect(px,py+2,32,28);wood(px,py+1,32,30,'#5a3a1e');const bq=g.createLinearGradient(px,py+10,px,py+29);bq.addColorStop(0,'#9a2a30');bq.addColorStop(1,'#5a141a');g.fillStyle=bq;rr(g,px+2,py+10,28,19,3);g.fill();
  g.strokeStyle='rgba(255,200,150,.15)';g.beginPath();g.moveTo(px+4,py+16);g.quadraticCurveTo(px+16,py+20,px+28,py+15);g.stroke();g.fillStyle='#e8e2d6';rr(g,px+4,py+3,11,7,3);g.fill();rr(g,px+17,py+3,11,7,3);g.fill();g.fillStyle='#d9b86a';g.fillRect(px+2,py+10,28,1);break;
 case'desk':shadowRect(px,py+4,32,24);wood(px,py+4,32,22,'#8a6236');g.fillStyle='#5a3d22';g.fillRect(px+2,py+25,4,6);g.fillRect(px+26,py+25,4,6);g.fillStyle='#e8e0cc';g.save();g.translate(px+22,py+12);g.rotate(.2);g.fillRect(-4,-3,8,6);g.restore();
  if(o.hasKey){g.fillStyle='#fd4';g.beginPath();g.arc(px+10,py+15,3.5,0,7);g.fill();g.fillRect(px+13,py+14,9,2);g.fillRect(px+19,py+14,2,4);glow(g,px+12,py+15,14,'255,220,90',.35)}break;
 case'shelf':shadowRect(px,py+2,32,28);wood(px,py+2,32,28,'#3a2412',2);for(let r2=0;r2<2;r2++){let xx=px+3;let i=0;while(xx<px+29){const bw=3+hash(o.x*3+i,o.y+r2)%3,bh=8+hash(o.x+i,o.y*5+r2)%4;g.fillStyle=['#8a2a2a','#2a4a7a','#3a6a2a','#8a7a3a','#5a2a5a','#7a4a2a'][(hash(o.x,o.y)+i+r2)%6];g.fillRect(xx,py+4+r2*13+(12-bh),bw,bh);g.fillStyle='rgba(255,220,150,.25)';g.fillRect(xx,py+6+r2*13+(12-bh),bw,1);xx+=bw+1;i++}g.fillStyle='#2a1808';g.fillRect(px+2,py+15+r2*13,28,2)}break;
 case'book':{const b=Math.sin(t*3)*2;glow(g,px+16,py+16,22,'255,220,120',.25+.1*Math.sin(t*4));g.fillStyle='#8a1a1a';rr(g,px+9,py+9+b,14,16,2);g.fill();g.fillStyle='#e8d6a8';g.fillRect(px+21,py+10+b,2,14);g.fillStyle='#e8c46a';g.font='700 9px '+FS;g.textAlign='center';g.fillText('✦',px+15,py+20+b);break}
 case'counter':{shadowRect(px,py+8,32,22);wood(px,py+8,32,22,'#6b4a2a');g.fillStyle='#d9b86a';g.fillRect(px,py+8,32,2);const it=SHOP[o.item][0];glow(g,px+16,py+15,14,'255,230,160',.3);drawIcon(g,it,px+16,py+15,18);g.fillStyle='#1a1208';rr(g,px+7,py+22,18,8,2);g.fill();g.fillStyle='#f0d48a';g.font='600 8px '+FU;g.textAlign='center';g.fillText(shopPrice(o.item)+'з',px+16,py+28.5);break}
 case'rubble':shadowRect(px+1,py+1,30,30);[[2,6,14,12,'#5a5048'],[14,2,16,14,'#6a6058'],[8,16,20,14,'#4a4038'],[3,20,9,9,'#776a5c']].forEach(([a,b,w,h,c])=>{const q=g.createLinearGradient(px+a,py+b,px+a,py+b+h);q.addColorStop(0,shade(c,.2));q.addColorStop(1,shade(c,-.3));g.fillStyle=q;g.beginPath();g.moveTo(px+a+2,py+b);g.lineTo(px+a+w,py+b+2);g.lineTo(px+a+w-2,py+b+h);g.lineTo(px+a,py+b+h-1);g.fill()});g.strokeStyle='#3a2a1a';g.lineWidth=2;g.beginPath();g.moveTo(px+4,py+28);g.lineTo(px+28,py+8);g.stroke();break;
 case'fire':{glow(g,px+16,py+20,34,'255,120,30',.35);g.fillStyle='#2a1a0a';g.fillRect(px+6,py+26,20,3);for(let i=0;i<4;i++){const h=16-i*3+Math.sin(t*14+i*2)*3,wv=Math.sin(t*9+i)*2;g.fillStyle=['#a21','#f40','#f90','#ffd860'][i];g.beginPath();g.moveTo(px+5+i*2.5,py+27);g.quadraticCurveTo(px+8+wv,py+18-h*.3,px+16+wv,py+27-h-6);g.quadraticCurveTo(px+24+wv,py+18-h*.3,px+27-i*2.5,py+27);g.fill()}break}
 case'plant':{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(px+18,py+20,14,10,0,0,7);g.fill();g.fillStyle='#5a3a22';g.beginPath();g.arc(px+16,py+16,8,0,7);g.fill();const sw=Math.sin(t*1.5+o.x)*.08;for(let i=0;i<9;i++){const a=i/9*6.283+sw+o.y,l=12+hash(o.x+i,o.y)%5;g.fillStyle=i%2?'#2f6a24':'#3f8a2c';g.save();g.translate(px+16,py+16);g.rotate(a);g.beginPath();g.ellipse(l*.55,0,l*.55,3.5,0,0,7);g.fill();g.fillStyle='rgba(200,255,150,.15)';g.fillRect(2,-.5,l-3,1);g.restore()}break}
 case'snare':ED.snare(px,py,o.used,S.t);break;
 case'crate':shadowRect(px+1,py+1,30,30);wood(px+1,py+1,30,30,o.wood?'#7a5a34':'#565b62',2);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.beginPath();g.moveTo(px+3,py+3);g.lineTo(px+29,py+29);g.moveTo(px+29,py+3);g.lineTo(px+3,py+29);g.stroke();g.strokeRect(px+3,py+3,26,26);if(!o.wood){g.fillStyle='#e8c040';g.fillRect(px+3,py+3,8,3);g.fillStyle=Math.sin(t*4+o.x)>0?'#f33':'#622';g.fillRect(px+24,py+12,3,3)}break;
 case'breaker':{shadowRect(px+2,py,28,32);wood(px+2,py,28,32,'#7a7e84',2);g.fillStyle='#16181b';g.fillRect(px+6,py+4,20,24);for(let i=0;i<10;i++){g.fillStyle=i<S.fuses?'#e8c040':'#333';g.fillRect(px+8+(i%5)*3.5,py+6+Math.floor(i/5)*5,2.5,4)}const on=S.fuses>=10;g.fillStyle=on?'#3f3':'#f33';g.fillRect(px+12,py+17,8,4);if(HQ())glow(g,px+16,py+19,10,on?'80,255,80':'255,60,60',.4);g.fillStyle='#aaa';g.fillRect(px+14,py+22,4,5);break}
 case'fuse':{const b=Math.sin(t*3+o.x)*1.5;glow(g,px+16,py+16,14,'255,220,90',.25);g.fillStyle='#e8c040';rr(g,px+10,py+12+b,12,8,2);g.fill();g.fillStyle='#c0c4c8';g.fillRect(px+7,py+13+b,3,6);g.fillRect(px+22,py+13+b,3,6);g.fillStyle='#7a5a10';g.fillRect(px+13,py+15+b,6,2);break}
 case'fake':drawDoor(px,py,o.num,'closed');{const dd=Math.hypot(P.x-px-16,P.y-py-16);if(dd<90)ED.dupeMouth(px,py,S.t,(90-dd)/50)}break;
 case'clue':g.fillStyle='#eee8d0';g.save();g.translate(px+16,py+16);g.rotate(-.08);g.fillRect(-10,-8,20,16);g.restore();g.fillStyle='#222';g.font='700 9px '+FU;g.textAlign='center';g.fillText(pad(o.num),px+16,py+20);g.fillStyle='#d9b86a';g.font='italic 600 11px '+FS;g.fillText('Следующая дверь',px+16,py+4);break;
 default:if(window.drawObjX)drawObjX(o,px,py,t)}};
// ---- player ----
function drawChar(x,y,face,ph,mv,col,o){o=o||{};const g=X;g.save();g.translate(x,y);
 g.fillStyle='rgba(0,0,0,.38)';g.beginPath();g.ellipse(2,4,13,9,0,0,7);g.fill();
 if(o.crouch)g.scale(.8,.8);g.rotate(face);const sw=mv?Math.sin(ph):0;
 g.fillStyle='#2a2118';g.beginPath();g.ellipse(sw*6,-5,5,3.4,0,0,7);g.ellipse(-sw*6,5,5,3.4,0,0,7);g.fill();// feet
 const coat=o.hurt?'#a33':col||'#3a4a6a';g.fillStyle=coat;g.beginPath();g.ellipse(-1,0,8,11.5,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,.1)';g.beginPath();g.ellipse(1,-3,5,6,0,0,7);g.fill();
 g.fillStyle=shade(o.hurt?'#aa3333':(col||'#3a4a6a'),-.25);g.beginPath();g.ellipse(-sw*3+3,-10,3.6,3.2,0,0,7);g.fill();// left arm
 const hx=8+sw*-2,hy=8;g.beginPath();g.ellipse(hx-2,hy,3.6,3.2,0,0,7);g.fill();g.fillStyle='#e8c8a0';g.beginPath();g.arc(hx+2,hy,2.6,0,7);g.arc(-sw*3+6,-10,2.4,0,7);g.fill();
 g.fillStyle='#e8c8a0';g.beginPath();g.arc(1,0,6.4,0,7);g.fill();g.fillStyle=o.hair||'#3a2416';g.beginPath();g.arc(-.5,0,6.6,Math.PI*.55,Math.PI*1.45);g.fill();g.beginPath();g.ellipse(-1.5,0,5,6.4,0,0,7);g.fill();
 g.fillStyle='#1a1008';g.fillRect(5,-2.6,1.6,1.6);g.fillRect(5,1.2,1.6,1.6);
 if(o.item){g.save();g.translate(hx+5,hy+1);g.rotate(Math.PI/2);drawIcon(g,o.item,0,0,13);g.restore()}
 g.restore()}
var shopPrice=i=>SHOP[i][1];
// ---- ORIGINAL ENTITIES ----
Object.assign(ED,{
rush(x,y,t,amb,dir){if(amb)return ED.bell(x,y,t,dir);const g=X;dir=dir||1;
 glow(g,x,y,120,'255,170,60',.32);for(let k=1;k<7;k++){g.globalAlpha=.10*(7-k)/6;g.fillStyle='#120c08';g.beginPath();g.arc(x-dir*k*20,y+Math.sin(t*7+k)*7,28-k*2.5,0,7);g.fill()}g.globalAlpha=1;
 // moths
 for(let i=0;i<54;i++){const a=i*2.399+t*(2.2+(i%5)*.35)*(i%2?1:-1),r=14+(i*7)%34+6*Math.sin(t*3+i),tr=-dir*((i%9)*4);const mx=x+Math.cos(a)*r+tr,my=y+Math.sin(a)*r*.8,fl=.35+.65*Math.abs(Math.sin(t*28+i*1.7)),hd=a+Math.PI/2*(i%2?1:-1);
  g.save();g.translate(mx,my);g.rotate(hd);g.fillStyle=i%4?'#2b221c':'#5a4a38';g.beginPath();g.ellipse(-2,-3.5*fl,4.5,3*fl+.4,-.5,0,7);g.ellipse(-2,3.5*fl,4.5,3*fl+.4,.5,0,7);g.fill();g.fillStyle='#120c08';g.fillRect(-4,-.8,6,1.6);g.restore()}
 // lantern core
 const fl=.85+.15*Math.sin(t*23);glow(g,x,y,34,'255,220,140',.7*fl);g.fillStyle='#2a1a0a';g.beginPath();for(let i=0;i<6;i++){const a=i/6*6.283+t*.6;g.lineTo(x+Math.cos(a)*13,y+Math.sin(a)*13)}g.closePath();g.fill();
 const q=g.createRadialGradient(x,y,1,x,y,11);q.addColorStop(0,'#fffbe0');q.addColorStop(.5,'#ffc060');q.addColorStop(1,'#a04010');g.fillStyle=q;g.beginPath();g.arc(x,y,10*fl,0,7);g.fill();
 g.strokeStyle='#5a3a14';g.lineWidth=2;for(let i=0;i<6;i++){const a=i/6*6.283+t*.6;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*13,y+Math.sin(a)*13);g.stroke()}g.fillStyle='#3a2208';g.beginPath();g.arc(x,y,3,0,7);g.fill()},
bell(x,y,t,dir){const g=X,sw=Math.sin(t*7)*.35;glow(g,x,y,110,'80,255,140',.3);g.save();g.translate(x,y);
 g.strokeStyle='#3a3a30';g.lineWidth=2;g.beginPath();g.moveTo(-6,-26);g.lineTo(-10,-60);g.moveTo(6,-26);g.lineTo(10,-60);g.stroke();g.rotate(sw);
 const q=g.createLinearGradient(-26,0,26,0);q.addColorStop(0,'#3a2412');q.addColorStop(.45,'#9a6a34');q.addColorStop(1,'#2a180a');g.fillStyle=q;g.beginPath();g.moveTo(-10,-26);g.quadraticCurveTo(-14,-6,-28,16);g.quadraticCurveTo(0,26,28,16);g.quadraticCurveTo(14,-6,10,-26);g.closePath();g.fill();
 g.fillStyle='rgba(80,160,120,.55)';g.beginPath();g.ellipse(-8,-4,5,8,.3,0,7);g.ellipse(10,6,4,6,-.4,0,7);g.fill();g.fillStyle='#d9b86a';g.fillRect(-12,-24,24,3);
 g.fillStyle='#030503';g.beginPath();g.ellipse(0,17,26,8,0,0,7);g.fill();const e=.6+.4*Math.sin(t*13);g.fillStyle='rgba(120,255,160,'+e+')';g.beginPath();g.ellipse(-8,16,4,2,0,0,7);g.ellipse(8,16,4,2,0,0,7);g.fill();
 g.fillStyle='#4a3a24';g.beginPath();g.arc(Math.sin(t*9)*8,24,5,0,7);g.fill();g.restore();
 g.strokeStyle='rgba(140,255,170,.75)';g.lineWidth=1.5;for(let k=0;k<3;k++){if(Math.random()<.5)continue;let a=Math.random()*6.283,px=x+Math.cos(a)*24,py=y+Math.sin(a)*24;g.beginPath();g.moveTo(px,py);for(let s=0;s<5;s++){px+=Math.cos(a)*9+ri(-6,6);py+=Math.sin(a)*9+ri(-6,6);g.lineTo(px,py)}g.stroke()}},
screech(x,y,t,open){const g=X,fl=1+Math.sin(t*16)*.06;g.save();g.translate(x,y);g.scale(fl,1/fl);g.rotate(Math.sin(t*3)*.2);
 g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(3,5,20,14,0,0,7);g.fill();g.beginPath();for(let i=0;i<11;i++){const a=i/11*6.283,r=15+((i*5)%4)*2+Math.sin(t*9+i)*1.5;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fillStyle='#7a6444';g.fill();
 g.save();g.clip();g.strokeStyle='rgba(60,40,24,.55)';g.lineWidth=2;for(let i=-20;i<20;i+=5){g.beginPath();g.moveTo(i,-20);g.lineTo(i+6,20);g.stroke()}g.fillStyle='rgba(220,190,120,.25)';for(let i=0;i<6;i++){g.beginPath();g.arc(-12+i*5,-6+(i%2)*10,1.5,0,7);g.fill()}g.restore();
 g.strokeStyle='#c8b088';g.lineWidth=1;g.stroke();g.strokeStyle='rgba(0,0,0,.35)';g.beginPath();g.moveTo(-14,-2);g.lineTo(-4,4);g.lineTo(6,-6);g.lineTo(14,2);g.stroke();
 const m=open?9:2;g.fillStyle='#1a0505';g.beginPath();g.ellipse(0,2,m*.55+1,7+m*.4,0,0,7);g.fill();if(open){g.fillStyle='#f2ead8';for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(-m*.55,2+i*2.4);g.lineTo(-1,2+i*2.4+1);g.lineTo(-m*.55,2+i*2.4+1.6);g.fill();g.beginPath();g.moveTo(m*.55,2+i*2.4);g.lineTo(1,2+i*2.4+1);g.lineTo(m*.55,2+i*2.4+1.6);g.fill()}}
 g.fillStyle='#fff';g.beginPath();g.arc(-5,-8,1.4,0,7);g.arc(5,-8,1.4,0,7);g.fill();g.restore()},
eyes(x,y,t){const g=X;glow(g,x,y,90,'160,230,255',.35);g.strokeStyle='#2a2418';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-60);g.stroke();g.save();g.translate(x,y);g.rotate(t*.25);
 g.strokeStyle='#a8843a';g.lineWidth=4;g.beginPath();g.ellipse(0,0,25,25,0,0,7);g.stroke();g.strokeStyle='#e8c46a';g.lineWidth=1;g.stroke();
 for(let i=0;i<10;i++){const a=i/10*6.283;g.fillStyle='rgba(200,230,255,.6)';g.beginPath();g.moveTo(Math.cos(a)*14,Math.sin(a)*14-2);g.lineTo(Math.cos(a)*16+2,Math.sin(a)*16);g.lineTo(Math.cos(a)*14,Math.sin(a)*14+3);g.lineTo(Math.cos(a)*12-2,Math.sin(a)*12);g.fill()}
 g.restore();const ang=Math.atan2(P.y-y,P.x-x);for(let i=0;i<7;i++){const a=i/7*6.283+t*.25,cx2=x+Math.cos(a)*25,cy2=y+Math.sin(a)*25,bl=Math.sin(t*1.7+i*2.3)>.94?.15:1,f=1+.15*Math.sin(t*12+i);
  g.fillStyle='#e8e0cc';g.fillRect(cx2-2.5,cy2,5,6);glow(g,cx2,cy2-4,12,'170,240,255',.5);g.fillStyle='#d8f6ff';g.beginPath();g.moveTo(cx2,cy2-14*f);g.quadraticCurveTo(cx2+6,cy2-4,cx2,cy2);g.quadraticCurveTo(cx2-6,cy2-4,cx2,cy2-14*f);g.fill();
  g.fillStyle='#fff';g.beginPath();g.ellipse(cx2,cy2-5,3.4,2.6*bl,0,0,7);g.fill();g.fillStyle='#08303a';g.beginPath();g.arc(cx2+Math.cos(ang)*1.4,cy2-5+Math.sin(ang)*.9,1.5*bl,0,7);g.fill()}
 g.fillStyle='#e8c46a';g.beginPath();g.arc(x,y,5,0,7);g.fill()},
halt(x,y,t,a){const g=X;g.globalAlpha=a;glow(g,x,y,80,'60,200,220',.45);g.strokeStyle='rgba(120,230,255,.5)';g.lineWidth=1.5;for(let i=0;i<4;i++){const r=((t*30+i*18)%72);g.globalAlpha=a*(1-r/72);g.beginPath();g.ellipse(x,y+14,r,r*.35,0,0,7);g.stroke()}g.globalAlpha=a;
 g.fillStyle='#03080c';g.beginPath();for(let i=0;i<16;i++){const an=i/16*6.283,r=22+Math.sin(t*4+i*1.3)*4;g.lineTo(x+Math.cos(an)*r,y+14+Math.sin(an)*r*.4)}g.closePath();g.fill();
 g.beginPath();g.moveTo(x-11,y+14);g.bezierCurveTo(x-14,y-4,x-8,y-26,x,y-30);g.bezierCurveTo(x+8,y-26,x+14,y-4,x+11,y+14);g.closePath();g.fill();g.strokeStyle='rgba(90,220,240,.35)';g.stroke();
 g.fillStyle='#c8ffff';g.beginPath();g.ellipse(x-4,y-17,2.2,3.2,0,0,7);g.ellipse(x+4,y-17,2.2,3.2,0,0,7);g.fill();
 for(let i=0;i<5;i++){const dy=(t*40+i*13)%30;g.fillStyle='rgba(10,20,30,'+(1-dy/30)+')';g.beginPath();g.arc(x-10+i*5,y-8+dy,1.6,0,7);g.fill()}g.globalAlpha=1},
seek(x,y,t,trail){const g=X;if(trail)for(let i=0;i<trail.length;i+=2){const p=trail[i];g.fillStyle='rgba(8,6,4,.85)';g.beginPath();g.ellipse(p.x,p.y,10,6.5,i,0,7);g.fill();g.fillStyle='rgba(255,200,120,.12)';g.beginPath();g.ellipse(p.x-3,p.y-2,3,1.5,i,0,7);g.fill()}
 const a=Math.atan2(P.y-y,P.x-x),gt=t*12;g.save();g.translate(x,y);g.rotate(a);g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(2,4,30,13,0,0,7);g.fill();
 g.strokeStyle='#060504';g.lineWidth=5;g.lineCap='round';for(let i=0;i<4;i++){const lx=i<2?12:-12,s=i%2?1:-1,ph=Math.sin(gt+i*1.6)*7;g.beginPath();g.moveTo(lx,s*6);g.lineTo(lx+ph,s*17);g.stroke()}
 g.fillStyle='#070605';g.beginPath();g.ellipse(-2,0,24,10,0,0,7);g.fill();g.beginPath();g.ellipse(22,0,10,8,0,0,7);g.fill();g.beginPath();g.moveTo(-24,0);g.quadraticCurveTo(-36,Math.sin(t*6)*8,-42,Math.sin(t*6+1)*10);g.lineWidth=3;g.stroke();
 g.fillStyle='rgba(255,230,190,.14)';g.beginPath();g.ellipse(-2,-5,16,2.4,0,0,7);g.fill();
 g.fillStyle='#ffb020';glow(g,26,0,12,'255,170,40',.6);g.fillStyle='#ffc040';g.beginPath();g.ellipse(26,0,4.5,3.5,0,0,7);g.fill();g.fillStyle='#000';g.fillRect(25.4,-3,1.2,6);g.restore();g.lineCap='butt';
 for(let i=0;i<3;i++){const d=(t*50+i*20)%26;g.fillStyle='rgba(5,4,3,'+(1-d/26)+')';g.beginPath();g.arc(x-8+i*8,y+8+d,2,0,7);g.fill()}},
figure(x,y,t,alert,face){const g=X;g.save();g.translate(x,y);g.rotate(face||0);const b=Math.sin(t*(alert?10:3.5));
 g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(3,4,28,22,0,0,7);g.fill();
 const arm=(s)=>{g.strokeStyle='#d8d0c0';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(0,s*15);g.lineTo(18+b*4*s,s*27);g.lineTo(38+b*6,s*20);g.stroke();g.fillStyle='#bdb3a2';g.beginPath();g.arc(18+b*4*s,s*27,3,0,7);g.fill();
  g.strokeStyle='#d8d0c0';g.lineWidth=1.5;for(let f=-1;f<=1;f++){g.beginPath();g.moveTo(38+b*6,s*20);g.lineTo(45+b*6,s*20+f*3);g.stroke()}};arm(1);arm(-1);
 const q=g.createRadialGradient(-4,-4,2,0,0,22);q.addColorStop(0,'#f6f2ea');q.addColorStop(1,'#b0a692');g.fillStyle=q;g.beginPath();g.ellipse(-3,0,18,20,0,0,7);g.fill();
 g.strokeStyle=alert?'#ff5a2a':'#e8b84a';g.lineWidth=1.6;g.shadowColor=alert?'#f40':'#fc6';g.shadowBlur=HQ()?6:0;g.beginPath();g.moveTo(-16,-6);g.lineTo(-8,-2);g.lineTo(-10,6);g.lineTo(-2,12);g.moveTo(-4,-18);g.lineTo(0,-9);g.lineTo(6,-12);g.moveTo(4,16);g.lineTo(8,8);g.stroke();g.shadowBlur=0;
 g.fillStyle='#ece6da';g.beginPath();g.ellipse(17,0,12,13,0,0,7);g.fill();
 [[-6,-1],[6,1],[0,-.2]].forEach(([oy,r],i)=>{const ex=i===2?22:15,ey=i===2?0:oy;g.fillStyle='#3a2a20';g.beginPath();g.ellipse(ex,ey,i===2?4:3.2,i===2?5:3.8,r,0,7);g.fill();g.strokeStyle='#8a6a52';g.lineWidth=1;g.beginPath();g.arc(ex,ey,1.8,0,4.5);g.stroke()});
 g.strokeStyle=alert?'#ff5a2a':'#e8b84a';g.lineWidth=1.2;g.beginPath();g.moveTo(10,-10);g.lineTo(16,-4);g.lineTo(13,4);g.stroke();g.restore();g.lineCap='butt';if(alert)glow(g,x,y,40,'255,60,20',.25)},
jeff(x,y,t){const g=X,f=.85+.15*Math.sin(t*17);g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(x,y+15,15,5,0,0,7);g.fill();
 g.fillStyle='#1e3a2a';rr(g,x-10,y-6,20,22,4);g.fill();g.fillStyle='#e8c46a';g.fillRect(x-1,y-4,2,18);[0,5,10].forEach(o=>{g.beginPath();g.arc(x+4,y-1+o,1.2,0,7);g.fill()});g.fillStyle='#f2ece0';g.beginPath();g.arc(x-13,y+8,3,0,7);g.arc(x+13,y+8,3,0,7);g.fill();g.fillStyle='#1e3a2a';g.fillRect(x-15,y-4,5,11);g.fillRect(x+10,y-4,5,11);
 g.fillStyle='#8a1a1a';g.beginPath();g.moveTo(x-5,y-8);g.lineTo(x,y-6);g.lineTo(x+5,y-8);g.lineTo(x+5,y-4);g.lineTo(x,y-6);g.lineTo(x-5,y-4);g.fill();
 g.fillStyle='#a07a32';g.fillRect(x-6,y-12,12,4);glow(g,x,y-20,26,'255,200,110',.55*f);g.fillStyle='rgba(255,240,200,.35)';g.beginPath();g.arc(x,y-20,8,0,7);g.fill();g.strokeStyle='#c8a04a';g.lineWidth=1.2;g.stroke();
 g.fillStyle='#ffd870';g.beginPath();g.moveTo(x,y-27*f);g.quadraticCurveTo(x+4,y-20,x,y-16);g.quadraticCurveTo(x-4,y-20,x,y-27*f);g.fill();g.fillStyle='#a07a32';g.fillRect(x-4,y-30,8,2)},
snare(px,py,used,t){const g=X,cx=px+16,cy=py+16;for(let i=0;i<7;i++){const a=i/7*6.283+(hash(px,py)%10)*.1;g.strokeStyle=used?'#3a3530':'#4a3020';g.lineWidth=3;g.beginPath();g.moveTo(cx+Math.cos(a)*4,cy+Math.sin(a)*4);g.quadraticCurveTo(cx+Math.cos(a+.6)*11,cy+Math.sin(a+.6)*11,cx+Math.cos(a)*(used?12:16),cy+Math.sin(a)*(used?12:16));g.stroke();
  g.fillStyle=used?'#555':'#a89a80';const tx=cx+Math.cos(a+.3)*10,ty=cy+Math.sin(a+.3)*10;g.beginPath();g.moveTo(tx,ty);g.lineTo(tx+Math.cos(a+1.6)*4,ty+Math.sin(a+1.6)*4);g.lineTo(tx+Math.cos(a)*2,ty+Math.sin(a)*2);g.fill()}
 if(!used){const p=.7+.3*Math.sin(t*3);g.fillStyle='#8a1a2a';g.beginPath();g.arc(cx,cy,4*p+1,0,7);g.fill();g.fillStyle='#e85a6a';g.beginPath();g.arc(cx-1,cy-1,1.5,0,7);g.fill()}},
dupeMouth(px,py,t,k){const g=X;g.globalAlpha=clamp(k,0,1);g.strokeStyle='#1a0a08';g.lineWidth=1;for(let i=0;i<5;i++){g.beginPath();g.moveTo(px+6+i*5,py+4);g.lineTo(px+8+i*5,py+9);g.stroke()}
 g.fillStyle='#0a0302';g.beginPath();g.moveTo(px+5,py+19);g.quadraticCurveTo(px+16,py+26+3*Math.sin(t*5),px+27,py+19);g.quadraticCurveTo(px+16,py+22,px+5,py+19);g.fill();g.fillStyle='#e8e0cc';for(let i=0;i<6;i++){g.beginPath();g.moveTo(px+8+i*3.4,py+20);g.lineTo(px+9.5+i*3.4,py+23);g.lineTo(px+11+i*3.4,py+20.5);g.fill()}
 g.fillStyle='#fff';g.beginPath();g.ellipse(px+T-8,py+15,3,2.2,0,0,7);g.fill();g.fillStyle='#a01010';g.beginPath();g.arc(px+T-8+Math.cos(Math.atan2(P.y-py,P.x-px)),py+15,1.3,0,7);g.fill();g.globalAlpha=1},
hideEyes(px,py,t,k){const g=X;g.globalAlpha=Math.min(1,k);g.fillStyle='#050302';g.fillRect(px+14,py+4,4,24);const n=Math.min(5,1+k*4|0);for(let i=0;i<n;i++){const ey=py+7+i*4.5,s=1+Math.sin(t*3+i)*.2;g.fillStyle='#c8a050';g.beginPath();g.ellipse(px+16,ey,3*s,2*s,0,0,7);g.fill();g.fillStyle='#1a0a02';g.beginPath();g.arc(px+16,ey,1.1,0,7);g.fill()}g.globalAlpha=1}});
// ---- lighting helpers ----
function opaque(tx,ty){if(tx<0||ty<0||tx>=GW||ty>=GH)return true;const t=tiles[idx(tx,ty)];if(t===0)return true;if(t===2){const d=doorAt.get(idx(tx,ty));return d&&!d.open}return false}
function visPoly(wx,wy,R,N){const pts=[];for(let i=0;i<N;i++){const a=i/N*6.2832,ca=Math.cos(a),sa=Math.sin(a);let d=4;while(d<R){if(opaque(Math.floor((wx+ca*d)/T),Math.floor((wy+sa*d)/T)))break;d+=6}d=Math.min(R,d+10);pts.push(wx+ca*d,wy+sa*d)}return pts}
function clipPoly(g,pts,ox,oy){g.beginPath();for(let i=0;i<pts.length;i+=2)g.lineTo(pts[i]-ox,pts[i+1]-oy);g.closePath();g.clip()}
const lamp=(x,y,r,s)=>{const g=LX.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(0,0,0,'+s+')');g.addColorStop(.55,'rgba(0,0,0,'+s*.55+')');g.addColorStop(1,'rgba(0,0,0,0)');LX.fillStyle=g;LX.beginPath();LX.arc(x,y,r,0,7);LX.fill()};
// ---- particles ----
const PT=[],DUST=[];function puff(x,y,vx,vy,life,sz,col,k){if(PT.length>(HQ()?380:120))return;PT.push({x,y,vx,vy,life,l0:life,sz,col,k:k||0})}
function stepParticles(dt,cx,cy){for(let i=PT.length-1;i>=0;i--){const p=PT[i];p.life-=dt;if(p.life<=0){PT.splice(i,1);continue}p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.k===1){p.vx*=.98;p.sz+=dt*8}}
 const want=HQ()?80:25;while(DUST.length<want)DUST.push({x:cx+Math.random()*W,y:cy+Math.random()*H,p:Math.random()*7,s:.6+Math.random()*1.4});
 for(const d of DUST){d.x+=Math.sin(S.t*.4+d.p)*6*dt+3*dt;d.y+=Math.cos(S.t*.3+d.p*1.3)*5*dt+1.5*dt;if(d.x<cx-20)d.x+=W+40;if(d.x>cx+W+20)d.x-=W+40;if(d.y<cy-20)d.y+=H+40;if(d.y>cy+H+20)d.y-=H+40}}
let lastPX=0,lastPY=0,walkPh=0,flashT=0,grainC=null,tmpC=null;
function season(){if(!SET.season)return null;const d=new Date(),m=d.getMonth()+1,day=d.getDate();if((m===10&&day>=15)||(m===11&&day<=10))return'halloween';if(m===12||(m===1&&day<=14))return'winter';return null}
function mkGrain(){grainC=[];for(let k=0;k<4;k++){const c=document.createElement('canvas');c.width=c.height=160;const g=c.getContext('2d'),im=g.createImageData(160,160);for(let i=0;i<im.data.length;i+=4){const v=Math.random()*255|0;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=26}g.putImageData(im,0,0);grainC.push(c)}}
function isOutdoor(r){const s=SUB(r);return s==='courtyard'||s==='greenhouse'}
render=function(){
 const t=S.t,room=rooms[P.room],hq=HQ();let cx=Math.round(P.x-W/2),cy=Math.round(P.y-H/2);if(S.shake>0&&SET.shake){cx+=ri(-5,5);cy+=ri(-5,5)}
 const dt=1/60;const mvd=Math.hypot(P.x-lastPX,P.y-lastPY);const moving=mvd>.3&&mvd<30;if(moving)walkPh+=mvd*.16;if(moving&&P.run&&!P.crouch&&Math.random()<.25)puff(P.x+ri(-4,4),P.y+8,ri(-10,10),ri(-12,-2),.6,2,'200,180,150',1);lastPX=P.x;lastPY=P.y;
 stepParticles(dt,cx,cy);
 X.fillStyle='#050403';X.fillRect(0,0,W,H);X.save();X.translate(-cx,-cy);
 const c0=Math.max(0,Math.floor(cx/CPX)),c1=Math.floor((cx+W)/CPX),r0=Math.max(0,Math.floor(cy/CPX)),r1=Math.floor((cy+H)/CPX);
 for(let yy=r0;yy<=r1;yy++)for(let xx=c0;xx<=c1;xx++){if(xx*CH>=GW||yy*CH>=GH)continue;X.drawImage(chunk(xx,yy),xx*CPX,yy*CPX)}
 const x0=Math.max(0,Math.floor(cx/T)),x1=Math.min(GW-1,Math.ceil((cx+W)/T)),y0=Math.max(0,Math.floor(cy/T)),y1=Math.min(GH-1,Math.ceil((cy+H)/T));
 // dynamic wall details: windows w/ rain, eye walls
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){if(tiles[idx(x,y)]!==0||!isFloor(x,y+1))continue;const rr2=rooms[rmap[idx(x,y)]];if(!rr2)continue;const px=x*T,py=y*T,sb=SUB(rr2);
  if(rr2.eyesWall&&(hash(x,y)%7)<(rr2.n>=78?rr2.n-77:rr2.n-29)){X.fillStyle='#e8e2d6';X.beginPath();X.ellipse(px+16,py+12,8,4.5,0,0,7);X.fill();X.fillStyle='#3a1020';X.beginPath();X.arc(px+16+Math.cos(Math.atan2(P.y-py,P.x-px))*3.5,py+12,2.6,0,7);X.fill();X.strokeStyle='#3a2a30';X.stroke();continue}
  if((sb==='normal'||sb==='hall'||sb==='dining'||sb==='courtyard')&&hash(x,y)%9===0&&!isFloor(x-1,y+0)&&!rr2.dark){const q=X.createLinearGradient(0,py+3,0,py+19);q.addColorStop(0,flashT>0?'#cfe0ff':'#1a2a44');q.addColorStop(1,flashT>0?'#8aa0d0':'#0a121e');X.fillStyle=q;X.fillRect(px+5,py+3,22,16);
   X.strokeStyle='rgba(180,210,255,.35)';X.lineWidth=1;for(let i=0;i<4;i++){const ry=(t*60+i*13+x*7)%16;X.beginPath();X.moveTo(px+7+i*5,py+3+ry);X.lineTo(px+6+i*5,py+3+Math.min(16,ry+4));X.stroke()}X.strokeStyle='#6b4426';X.lineWidth=2;X.strokeRect(px+5,py+3,22,16);X.beginPath();X.moveTo(px+16,py+3);X.lineTo(px+16,py+19);X.moveTo(px+5,py+11);X.lineTo(px+27,py+11);X.stroke()}}
 for(const d of allDoors){if(d.x<x0-1||d.x>x1+1||d.y<y0-1||d.y>y1+1)continue;drawDoor(d.x*T,d.y*T,d.closet?null:d.n,d.open?'open':d.code?'code':d.locked?'locked':'closed');if(!d.closet&&!d.open&&d.n===P.room+1&&hq){glow(X,d.x*T+16,d.y*T-8,18,'255,210,120',.25)}}
 const nr0=Math.max(0,P.room-2),nr1=Math.min(rooms.length-1,P.room+2);
 for(let n=nr0;n<=nr1;n++){const r=rooms[n];for(const l of r.lamps){const on=!(S.flick>0&&Math.random()<.5);X.fillStyle='#3a2a14';X.fillRect(l.x-5,l.y-10,10,3);X.fillStyle=on?'#ffe9b0':'#5a4a30';X.beginPath();X.arc(l.x,l.y-4,4.5,0,7);X.fill();X.fillStyle='#c8a04a';X.beginPath();X.moveTo(l.x-6,l.y-7);X.lineTo(l.x+6,l.y-7);X.lineTo(l.x+4,l.y-2);X.lineTo(l.x-4,l.y-2);X.fill()}
  for(const o of r.objs)if(!o.gone){const px=o.x*T,py=o.y*T;if(px>cx-64&&px<cx+W+32&&py>cy-64&&py<cy+H+32)drawObj(o,px,py,t);if(o.t==='fire'&&Math.random()<(hq?.3:.08))puff(px+16+ri(-5,5),py+8,ri(-6,6),-ri(18,30),2,4,'60,55,50',1)}
  if(r.t==='shop'){const jx=(r.x0+6)*T,jy=(r.y0+2)*T+16;ED.jeff(jx,jy,t);label(ENAME.jeff,jx,jy-36,'#f0d48a')}
  if(r.t==='reception')label('РЕСЕПШЕН',(r.x0+8)*T+16,(r.y0+1)*T+8,'#f0d48a',16);
  if(r.t==='library')label('БИБЛИОТЕКА',(r.x0+r.w/2)*T,(r.y0+1)*T+8,'#f0d48a',16);
  if(r.sub&&r.label)label(r.label,(r.x0+r.w/2)*T,(r.y0+1)*T+8,'#d9b86a',13)}
 for(const d of S.drops)if(Math.abs(d.room-P.room)<=2){const b=Math.sin(t*3+d.x)*1.5;X.fillStyle='rgba(0,0,0,.35)';X.beginPath();X.ellipse(d.x,d.y+9,9,3,0,0,7);X.fill();if(hq)glow(X,d.x,d.y+b,16,'255,230,160',.18);drawIcon(X,d.it,d.x,d.y+b,20)}
 drawOthers();
 if(S.chain){const c=S.chain,a=Math.min(1,c.t);X.save();X.globalAlpha=a;glow(X,c.x,c.y,70,'255,248,210',.4);X.strokeStyle='#e8d8a0';X.lineWidth=2.5;for(let i=0;i<3;i++){X.beginPath();X.ellipse(c.x,c.y,28+i*7,11+i*3,S.t*3+i*1.2,0,7);X.stroke()}X.restore()}
 if(!P.hidden){if(P.iv>0&&Math.floor(S.t*10)%2)X.globalAlpha=.45;drawChar(P.x,P.y,P.face,walkPh,moving,'#3a4a6a',{crouch:P.crouch,hurt:P.hurtT>0,item:P.inv[P.sel]});X.globalAlpha=1}
 for(const p of PT)if(p.k===1){X.fillStyle='rgba('+p.col+','+(p.life/p.l0)*.35+')';X.beginPath();X.arc(p.x,p.y,p.sz,0,7);X.fill()}
 const f=S.figure;if(f&&Math.abs(f.room-P.room)<=1)ED.figure(f.x,f.y,t,f.alert,f.face!=null?f.face:Math.atan2(P.y-f.y,P.x-f.x));
 if(S.halt&&S.halt.phase!=='idle'&&S.halt.phase!=='banished'){const h=S.halt;ED.halt(h.x,P.y,t,h.phase==='chase'?.8+.2*Math.sin(t*6):.35+.15*Math.sin(t*20))}
 if(S.seek){const k=S.seek;ED.seek(k.x,k.y,t,S.trail)}
 if(window.drawWorldX)drawWorldX(cx,cy,t);
 X.restore();
 // ---- lighting ----
 let dk=room.dark?0.965:room.t==='halt'?0.74:room.t==='library'||room.t==='electric'?0.84:isOutdoor(room)?0.8:0.66;if(S.fog)dk=Math.min(.98,dk+.12);if(S.flick>0&&Math.random()<.45)dk=0.975;
 LX.globalCompositeOperation='source-over';LX.clearRect(0,0,W,H);LX.fillStyle='rgba(4,2,8,'+dk+')';LX.fillRect(0,0,W,H);LX.globalCompositeOperation='destination-out';
 const sx=P.x-cx,sy=P.y-cy,fogK=S.fog?.65:1,lampsOn=!(S.flick>0&&Math.random()<.5);
 if(lampsOn)for(let n=nr0;n<=nr1;n++){const r=rooms[n];if(!r.lamps.length)continue;LX.save();LX.beginPath();LX.rect(r.x0*T-cx,r.y0*T-cy-8,r.w*T,r.h*T+8);LX.clip();for(const l of r.lamps){const fl=1-.06*Math.max(0,Math.sin(t*7.3+l.x)*Math.sin(t*3.1+l.y));lamp(l.x-cx,l.y-cy+22,230*fogK*fl,.85)}LX.restore()}
 LX.save();if(hq&&!P.hidden){const pts=visPoly(P.x,P.y,P.light?340:170,P.light?200:120);clipPoly(LX,pts,cx,cy)}
 lamp(sx,sy,(room.dark?80:120)*fogK,.85);
 if(!P.hidden&&(held('lighter')||held('candle'))){lamp(sx,sy,(held('lighter')?160:130+Math.sin(t*9)*5)*fogK,1)}
 if(P.light&&!P.hidden){const R=330*fogK,g=LX.createRadialGradient(sx,sy,10,sx,sy,R);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.7,'rgba(0,0,0,.7)');g.addColorStop(1,'rgba(0,0,0,0)');LX.fillStyle=g;LX.beginPath();LX.moveTo(sx,sy);LX.arc(sx,sy,R,P.face-.45,P.face+.45);LX.closePath();LX.fill()}
 LX.restore();
 if(S.eyes)lamp(S.eyes.x-cx,S.eyes.y-cy,170,.65);for(const e of S.ents)if(e.state==='go')lamp(e.x-cx,e.y-cy,270,.95);
 for(const o of room.objs)if(!o.gone&&(o.t==='fire'||o.t==='book'||o.t==='fuse'))lamp(o.x*T+16-cx,o.y*T+16-cy,o.t==='fire'?110+Math.sin(t*13)*6:44,.7);
 for(const d of S.drops)if(d.it==='glowstick'&&Math.abs(d.room-P.room)<=1)lamp(d.x-cx,d.y-cy,150,.9);
 if(window.lightX)lightX(cx,cy);
 LX.globalCompositeOperation='source-over';X.drawImage(L,0,0);
 // additive warm glow
 if(hq){X.save();X.globalCompositeOperation='lighter';if(lampsOn)for(let n=nr0;n<=nr1;n++)for(const l of rooms[n].lamps)glow(X,l.x-cx,l.y-cy+6,150*fogK,'255,170,80',.08);
  if(!P.hidden&&(held('lighter')||held('candle')))glow(X,sx,sy,110,'255,150,60',.12);for(const o of room.objs)if(!o.gone&&o.t==='fire')glow(X,o.x*T+16-cx,o.y*T+16-cy,90,'255,110,30',.14);
  for(const d of S.drops)if(d.it==='glowstick'&&Math.abs(d.room-P.room)<=1)glow(X,d.x-cx,d.y-cy,90,'90,255,140',.18);X.restore()}
 if(room.t==='halt'){X.fillStyle='rgba(30,70,180,.14)';X.fillRect(0,0,W,H)}
 if(S.eyes&&S.eyes.room===P.room){X.fillStyle='rgba(60,140,200,.1)';X.fillRect(0,0,W,H)}
 // dust motes in light
 X.save();X.globalCompositeOperation='lighter';for(const d of DUST){const dx=d.x-cx,dy=d.y-cy;let b=Math.max(0,1-Math.hypot(dx-sx,dy-sy)/(P.light?260:130))*.7;if(lampsOn)for(const l of room.lamps)b=Math.max(b,1-Math.hypot(d.x-l.x,d.y-l.y-20)/200);if(b<=0)continue;X.fillStyle='rgba(255,230,190,'+(b*.45*(.6+.4*Math.sin(t*2+d.p)))+')';X.fillRect(dx,dy,d.s,d.s)}X.restore();
 // glowing entities above darkness
 X.save();X.translate(-cx,-cy);
 if(S.eyes&&Math.abs(S.eyes.room-P.room)<=1){const e=S.eyes;ED.eyes(e.x,e.y,t)}
 for(const e of S.ents){if(e.state!=='go')continue;ED.rush(e.x,e.y,t,e.type==='ambush',e.vx!=null?Math.sign(e.vx)||1:(e.x<P.x?1:-1));if(hq&&Math.random()<.5)puff(e.x+ri(-20,20),e.y+ri(-20,20),ri(-20,20),ri(-20,20),.8,2,e.type==='ambush'?'120,255,150':'255,190,90',2)}
 if(S.screech){const s=S.screech,x=P.x+Math.cos(s.ang)*70,y=P.y+Math.sin(s.ang)*70;ED.screech(x,y,t,s.t!=null&&s.t<.6)}
 if(f&&f.room===P.room&&f.alert)glow(X,f.x,f.y,40,'255,40,0',.25);
 for(const p of PT)if(p.k===2){X.fillStyle='rgba('+p.col+','+p.life/p.l0+')';X.fillRect(p.x,p.y,p.sz,p.sz)}
 X.restore();
 // rain / snow overlay
 if(isOutdoor(room)){X.strokeStyle='rgba(170,200,255,.28)';X.lineWidth=1;X.beginPath();for(let i=0;i<(hq?140:50);i++){const rx=(i*97+t*90)%(W+40)-20,ry=(i*53+t*620)%(H+40)-20;X.moveTo(rx,ry);X.lineTo(rx-3,ry+12)}X.stroke()}
 const se=season();if(se==='winter'&&isOutdoor(room)){X.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<60;i++){X.fillRect((i*131+Math.sin(t+i)*20)%W,(i*71+t*40)%H,2,2)}}
 if(--thunderVis<=0&&isOutdoor(room)&&Math.random()<.002){flashT=.25;thunderVis=200}if(flashT>0){flashT-=dt;X.fillStyle='rgba(200,220,255,'+flashT*1.2+')';X.fillRect(0,0,W,H)}
 // danger vignette
 {let v=.38,c='0,0,0';const nr=S.ents.some(e=>e.state==='go'&&Math.abs(e.x-P.x)<500);if(nr){v=.65;c=S.ents.some(e=>e.type==='ambush'&&e.state==='go')?'0,60,20':'20,10,0'}
 if(S.screech)v=Math.max(v,.5);if(S.seek){v=Math.max(v,.6);c='10,0,0'}if(S.halt&&S.halt.phase==='chase'){v=Math.max(v,.5);c='0,50,90'}if(S.eyes&&S.eyes.room===P.room){v=Math.max(v,.4);c='0,40,70'}if(f&&f.room===P.room&&f.alert){v=Math.max(v,.62);c='110,0,0'}if(P.hp<35){v=Math.max(v,.45+.1*Math.sin(t*5));c='90,0,0'}
 if(v>.6&&!(S.shake>0))S.shake=.06;vignette(v,c)}
 if(se==='halloween'){X.fillStyle='rgba(255,110,20,.035)';X.fillRect(0,0,W,H)}
 drawHUD()};
let thunderVis=0;
function label(s,x,y,c,sz){X.font='700 '+(sz||12)+'px '+FS;X.textAlign='center';X.fillStyle='rgba(0,0,0,.7)';X.fillText(s,x+1,y+1);X.fillStyle=c;X.fillText(s,x,y)}
// ---- typography upgrade: route every Arial text through hotel fonts ----
(function(){const d=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'font');Object.defineProperty(CanvasRenderingContext2D.prototype,'font',{get(){return d.get.call(this)},set(v){d.set.call(this,typeof v==='string'&&v.indexOf('Arial')>=0?v.replace(/Arial/g,FU).replace(/Georgia/g,FS):v)},configurable:true})})();
box=function(x,y,w,h){const g=X.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'rgba(22,14,8,.82)');g.addColorStop(1,'rgba(6,4,2,.88)');X.fillStyle=g;rr(X,x,y,w,h,8);X.fill();X.strokeStyle='rgba(217,184,106,.55)';X.lineWidth=1.5;X.stroke();X.strokeStyle='rgba(255,230,170,.08)';rr(X,x+3,y+3,w-6,h-6,6);X.stroke()};
(function(){const o=setLoop;setLoop=function(sl,n,v,f){if(sl==='music'&&v!=null)v*=SET.music;return o(sl,n,v,f)}})();
// ---- post effects ----
let hurtFx=0,lastHp=100;
function postFX(){const hq=HQ();if(P.hp<lastHp-1)hurtFx=1;lastHp=P.hp;
 if(hurtFx>0&&started){hurtFx=Math.max(0,hurtFx-.035);if(hq){if(!tmpC){tmpC=document.createElement('canvas');tmpC.width=W;tmpC.height=H}const g=tmpC.getContext('2d');g.clearRect(0,0,W,H);g.drawImage(C,0,0);const o=6*hurtFx;X.save();X.globalCompositeOperation='lighter';X.globalAlpha=.35*hurtFx;X.drawImage(tmpC,-o,0);X.globalCompositeOperation='multiply';X.fillStyle='rgba(255,60,60,'+.5*hurtFx+')';X.fillRect(0,0,W,H);X.restore();X.save();X.globalAlpha=.3*hurtFx;X.globalCompositeOperation='screen';X.drawImage(tmpC,o,0);X.restore()}else{X.fillStyle='rgba(160,0,0,'+.3*hurtFx+')';X.fillRect(0,0,W,H)}}
 if(hq&&SET.grain){if(!grainC)mkGrain();const c=grainC[frames%4],ox=(frames*37)%160,oy=(frames*71)%160;X.save();X.globalCompositeOperation='overlay';X.fillStyle=X.createPattern(c,'repeat');X.translate(-ox,-oy);X.fillRect(0,0,W+160,H+160);X.restore()}
 const g=X.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.95);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.55)');X.fillStyle=g;X.fillRect(0,0,W,H)}
// ---- HUD extras: tooltip on hovered slot, compact top chips ----
const _hud=drawHUD;drawHUD=function(){_hud();if(!started)return;
 const mx=mouse?mouse.x:-1,my=mouse?mouse.y:-1;for(let i=0;i<10;i++){const x=W/2-250+i*50,y=H-58;if(mx>=x&&mx<x+46&&my>=y&&my<y+50&&P.inv[i]){const it=ITEM[P.inv[i]],tip=(window.TIPS&&TIPS[P.inv[i]])||'';X.font='600 13px '+FU;const w=Math.max(X.measureText(it.n).width,X.measureText(tip).width)+20;box(x+23-w/2,y-64,w,tip?46:28);X.textAlign='center';X.fillStyle='#f0d48a';X.fillText(it.n,x+23,y-45);if(tip){X.fillStyle='#bbb';X.font='12px '+FU;X.fillText(tip,x+23,y-27)}}}
 if(window.hudX)hudX();X.textAlign='left'};
// ---- pause / settings overlay ----
const css=document.createElement('style');css.textContent=`
.d2ov{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(5,3,2,.72);backdrop-filter:blur(3px);z-index:40;font-family:${FU};color:#ddd;animation:d2f .25s}
@keyframes d2f{from{opacity:0}to{opacity:1}}@keyframes d2u{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}
.d2pn{background:linear-gradient(#1d130b,#0b0705);border:1px solid #8a6a3a;border-radius:14px;padding:26px 30px;min-width:min(380px,90vw);max-width:94vw;max-height:88vh;overflow:auto;box-shadow:0 20px 60px #000,inset 0 0 0 4px rgba(217,184,106,.07);animation:d2u .3s}
.d2pn h2{font-family:${FS};color:#f0d48a;font-size:32px;margin:0 0 16px;text-align:center;letter-spacing:2px;font-weight:700}
.d2b{display:block;width:100%;margin:8px 0;padding:11px;background:linear-gradient(#3a2614,#22160c);color:#f0d48a;border:1px solid #8a6a3a;border-radius:8px;font:600 16px ${FU};cursor:pointer;transition:.15s}
.d2b:hover{background:linear-gradient(#5a3a1c,#2e1d0e);transform:translateY(-1px);box-shadow:0 0 14px rgba(240,200,110,.25)}
.d2r{display:flex;justify-content:space-between;align-items:center;gap:14px;margin:9px 0;font-size:14px}.d2r input[type=range]{width:150px;accent-color:#d9b86a}.d2r select{background:#1a110a;color:#f0d48a;border:1px solid #8a6a3a;border-radius:6px;padding:4px}
.d2k{min-width:90px;padding:4px 8px;background:#140d07;color:#f0d48a;border:1px solid #6a4a2a;border-radius:6px;font:13px ${FU};cursor:pointer}.d2k.w{border-color:#fd4;color:#fff}
#d2pbtn{position:fixed;right:10px;top:10px;z-index:30;width:40px;height:40px;border-radius:50%;border:1px solid #8a6a3a;background:rgba(20,12,6,.8);color:#f0d48a;font-size:18px;display:none}
@media (pointer:coarse){#d2pbtn{display:block}}`;document.head.appendChild(css);
const BINDS=[['KeyW','Вверх'],['KeyS','Вниз'],['KeyA','Влево'],['KeyD','Вправо'],['KeyE','Взаимодействие'],['KeyF','Фонарь'],['ShiftLeft','Бег'],['KeyC','Присесть'],['KeyQ','Выбросить'],['KeyG','Использовать']];
function el(h){const d=document.createElement('div');d.innerHTML=h;return d.firstElementChild}
const PAUSE=el(`<div class="d2ov" id="d2pause"><div class="d2pn"><h2>ПАУЗА</h2><button class="d2b" id="d2res">Продолжить</button><button class="d2b" id="d2set">Настройки</button><button class="d2b" id="d2stat">Статистика и достижения</button><button class="d2b" id="d2menu">В главное меню</button></div></div>`);
const SETP=el(`<div class="d2ov" id="d2setp"><div class="d2pn"><h2>НАСТРОЙКИ</h2>
<div class="d2r">Общая громкость<input type="range" id="sv" min="0" max="1" step=".05"></div>
<div class="d2r">Музыка<input type="range" id="sm" min="0" max="1" step=".05"></div>
<div class="d2r">Графика<select id="sq"><option value="high">Высокая</option><option value="low">Низкая (быстрее)</option></select></div>
<div class="d2r">Плёночное зерно<input type="checkbox" id="sg"></div><div class="d2r">Тряска камеры<input type="checkbox" id="ss"></div><div class="d2r">Сезонные события<input type="checkbox" id="se"></div>
<h2 style="font-size:20px;margin-top:16px">Управление</h2><div id="skb"></div><button class="d2b" id="skr">Сбросить клавиши</button><button class="d2b" id="sok">Готово</button></div></div>`);
document.body.append(PAUSE,SETP);const pb=el('<button id="d2pbtn">❚❚</button>');document.body.appendChild(pb);
let paused=false,waitKey=null;
function setPause(v){paused=v;PAUSE.style.display=v?'flex':'none';if(!v)SETP.style.display='none';try{if(AC)v?AC.suspend():AC.resume()}catch(e){}}
window.d2pause=setPause;
function keyName(c){return c.replace(/^Key/,'').replace(/^Digit/,'').replace('ShiftLeft','Shift').replace('ShiftRight','Shift П').replace('ControlLeft','Ctrl').replace('Space','Пробел').replace(/^Arrow/,'⇧')}
function buildKB(){const k=SETP.querySelector('#skb');k.innerHTML='';const inv={};for(const c in SET.keys)inv[SET.keys[c]]=c;for(const [c,n] of BINDS){const r=el(`<div class="d2r">${n}<button class="d2k">${keyName(inv[c]||c)}</button></div>`);const b=r.querySelector('button');b.onclick=()=>{waitKey=c;b.textContent='…нажми';b.classList.add('w')};k.appendChild(r)}}
function openSet(){const q=s=>SETP.querySelector(s);q('#sv').value=VOL;q('#sm').value=SET.music;q('#sq').value=SET.q;q('#sg').checked=SET.grain;q('#ss').checked=SET.shake;q('#se').checked=SET.season;buildKB();SETP.style.display='flex'}
SETP.querySelector('#sv').oninput=e=>{VOL=+e.target.value;setVol()};SETP.querySelector('#sm').oninput=e=>{SET.music=+e.target.value;saveSet();try{if(LOOPS.music)LOOPS.music.g.gain.setTargetAtTime(.5*SET.music,AC.currentTime,.2)}catch(_){}};
SETP.querySelector('#sq').onchange=e=>{SET.q=e.target.value;saveSet();CHUNKS=new Map()};['sg:grain','ss:shake','se:season'].forEach(p=>{const [i,k]=p.split(':');SETP.querySelector('#'+i).onchange=e=>{SET[k]=e.target.checked;saveSet()}});
SETP.querySelector('#skr').onclick=()=>{SET.keys={};saveSet();buildKB()};SETP.querySelector('#sok').onclick=()=>{SETP.style.display='none'};
PAUSE.querySelector('#d2res').onclick=()=>setPause(false);PAUSE.querySelector('#d2set').onclick=openSet;PAUSE.querySelector('#d2menu').onclick=()=>location.reload();PAUSE.querySelector('#d2stat').onclick=()=>{if(window.openStats)openStats()};pb.onclick=()=>setPause(!paused);
window.openSettings=openSet;
// keybind remap (capture phase)
function remap(e){if(e.__d2)return;
 if(waitKey&&e.type==='keydown'){e.preventDefault();e.stopImmediatePropagation();if(e.code!=='Escape'){for(const c in SET.keys)if(SET.keys[c]===waitKey)delete SET.keys[c];if(e.code!==waitKey)SET.keys[e.code]=waitKey;saveSet()}waitKey=null;buildKB();return}
 if(e.code==='Escape'&&e.type==='keydown'&&started&&!S.dead&&S.codeInput===null&&!S.shop&&!window.d2modal){e.preventDefault();e.stopImmediatePropagation();if(SETP.style.display==='flex')SETP.style.display='none';else setPause(!paused);return}
 if(paused){e.stopImmediatePropagation();return}
 const tg=e.target;if(tg&&(tg.tagName==='INPUT'||tg.tagName==='TEXTAREA'))return;
 const m=SET.keys[e.code];if(m){e.stopImmediatePropagation();e.preventDefault();const n=new KeyboardEvent(e.type,{code:m,key:m.replace('Key','').toLowerCase(),bubbles:true,cancelable:true,shiftKey:e.shiftKey});n.__d2=1;(tg||window).dispatchEvent(n)}}
window.addEventListener('keydown',remap,true);window.addEventListener('keyup',remap,true);
// ---- loop with pause & post FX ----
let fpsA=60,fpsT=performance.now();window.__fps=()=>fpsA;
loop=function(now){const dt=Math.min(.05,(now-last)/1000);last=now;fpsA=fpsA*.95+(dt>0?1/dt:60)*.05;
 if(paused){requestAnimationFrame(loop);return}
 if(ELEV){ELEV.t+=dt;audioTick(dt);netTick(dt);if(ELEV.t>=ELEV.dur){ELEV=null;S.shake=.3}}else update(dt);
 if(window.preUpdateX)preUpdateX(dt);render();if(ELEV)drawElev();X.globalAlpha=1;if(!ELEV)drawPartyHud();if(started&&!ELEV)postFX();drawCredits();if(window.overlayX)overlayX(dt);requestAnimationFrame(loop)};
// ---- animated menu background ----
const MBG=document.createElement('canvas');MBG.id='mbg';MBG.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:9;pointer-events:none';document.body.appendChild(MBG);
const mcss=document.createElement('style');mcss.textContent=`#lob{background:transparent!important;font-family:${FU}!important}#lob .lb{background:linear-gradient(rgba(28,18,10,.88),rgba(8,5,3,.92))!important;border:1px solid #8a6a3a!important;border-radius:16px!important;box-shadow:0 30px 80px #000,inset 0 0 0 5px rgba(217,184,106,.06)!important;animation:d2u .5s}
#lob h1,#lob h2{font-family:${FS}!important;color:#f0d48a!important;letter-spacing:3px;text-shadow:0 0 18px rgba(240,190,90,.35)}
#lob button{font-family:${FU}!important;border-radius:8px!important;transition:.15s;border:1px solid #8a6a3a!important;background:linear-gradient(#3a2614,#1e140a)!important;color:#f0d48a!important}#lob button:hover{transform:translateY(-1px);box-shadow:0 0 14px rgba(240,200,110,.3)}
#lob input{background:#120c07!important;color:#f0d48a!important;border:1px solid #6a4a2a!important;border-radius:6px!important}
@media (max-width:640px){#lob .lb{padding:12px!important}#lob h1{font-size:30px!important}}`;document.head.appendChild(mcss);
(function mb(){const lob=document.getElementById('lob'),vis=lob&&lob.style.display!=='none';MBG.style.display=vis?'block':'none';if(vis){const w=MBG.width=innerWidth,h=MBG.height=innerHeight,g=MBG.getContext('2d'),t=performance.now()/1000;
 const bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#0c0805');bg.addColorStop(1,'#020101');g.fillStyle=bg;g.fillRect(0,0,w,h);
 // receding corridor of doors
 const vx=w/2,vy=h*.48;for(let i=9;i>=0;i--){const z=((i+(t*.25)%1));const s=1/(z*.55+.35),dw=w*.5*s,dh=h*.55*s,a=Math.min(1,s*.6);g.strokeStyle='rgba(217,184,106,'+a*.35+')';g.lineWidth=1.5*s;g.strokeRect(vx-dw/2,vy-dh/2,dw,dh);
  g.fillStyle='rgba(60,36,18,'+a*.5+')';g.fillRect(vx-dw*.16,vy-dh*.38,dw*.32,dh*.76);g.fillStyle='rgba(240,212,138,'+a*.7+')';g.fillRect(vx+dw*.1,vy,3*s,3*s);g.font='600 '+(14*s|0)+'px '+FU;g.textAlign='center';g.fillText(pad(i+1+Math.floor(t*.25)),vx,vy-dh*.42)}
 const fl=.85+.15*Math.sin(t*9)*Math.sin(t*2.3);const lg=g.createRadialGradient(vx,vy,10,vx,vy,h*.7);lg.addColorStop(0,'rgba(255,180,90,'+.18*fl+')');lg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=lg;g.fillRect(0,0,w,h);
 for(let i=0;i<50;i++){g.fillStyle='rgba(255,220,170,'+(.15+.15*Math.sin(t+i))+')';g.fillRect((i*137+t*8*(1+i%3))%w,(i*89+Math.sin(t*.5+i)*30)%h,2,2)}
 const vg=g.createRadialGradient(w/2,h/2,h*.3,w/2,h/2,h);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.85)');g.fillStyle=vg;g.fillRect(0,0,w,h)}
 setTimeout(()=>requestAnimationFrame(mb),vis?0:400)})();
// entity sheet for screenshots
window.drawEntitySheet=function(){X.fillStyle='#0b0806';X.fillRect(0,0,W,H);const L2=[['rush',(x,y,t)=>ED.rush(x,y,t,false,1)],['ambush',(x,y,t)=>ED.rush(x,y,t,true,1)],['screech',(x,y,t)=>ED.screech(x,y,t,true)],['eyes',(x,y,t)=>ED.eyes(x,y,t)],['halt',(x,y,t)=>ED.halt(x,y,t,1)],['seek',(x,y,t)=>ED.seek(x,y,t,null)],['figure',(x,y,t)=>ED.figure(x,y,t,true,0)],['jeff',(x,y,t)=>ED.jeff(x,y,t)],['snare',(x,y,t)=>ED.snare(x-16,y-16,false,t)],['dupe',(x,y,t)=>ED.dupeMouth(x-16,y-16,t,1)],['hide',(x,y,t)=>ED.hideEyes(x-16,y-16,t,1)]];
 L2.forEach(([k,f],i)=>{const x=110+(i%4)*240,y=110+Math.floor(i/4)*190;f(x,y,S.t||1.3);label(ENAME[k]||k,x,y+80,'#f0d48a',18)})};
