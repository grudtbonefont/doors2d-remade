// inv.js — original inventory bar + vector item icons
(function(){
const OL='#0d0907';
function P_(g,pts){g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.closePath()}
function lg(g,a,b,c,d,cs){const q=g.createLinearGradient(a,b,c,d);cs.forEach((c,i)=>q.addColorStop(i/(cs.length-1),c));return q}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
const ST=g=>{g.lineWidth=1.6;g.strokeStyle=OL;g.lineJoin='round';g.stroke()};
const IC={
 flashlight(g){g.rotate(-.6);rr(g,-12,-4,17,8,2);g.fillStyle=lg(g,0,-4,0,4,['#8a929a','#4a5058','#2a2e34']);g.fill();ST(g);P_(g,[5,-4,12,-7,12,7,5,4]);g.fillStyle=lg(g,0,-7,0,7,['#c0c6cc','#6a7078']);g.fill();ST(g);g.fillStyle='#fff6b0';g.fillRect(11,-5.5,2,11);g.fillStyle='#d04030';g.fillRect(-6,-5,3,2)},
 battery(g){rr(g,-6,-11,12,22,2);g.fillStyle=lg(g,-6,0,6,0,['#2a8a3a','#5fe070','#1a5a26']);g.fill();ST(g);g.fillStyle='#c0c6cc';g.fillRect(-3,-14,6,3);g.strokeStyle=OL;g.strokeRect(-3,-14,6,3);g.fillStyle='#101';g.fillRect(-6,3,12,8);g.fillStyle='#fe4';P_(g,[1,-8,-3,-1,0,-1,-1,5,3,-3,0,-3]);g.fill()},
 lockpick(g){g.rotate(.7);g.fillStyle='#bfc4c8';g.fillRect(-2,-13,2.4,20);g.strokeStyle=OL;g.lineWidth=1;g.strokeRect(-2,-13,2.4,20);g.fillStyle='#d0d4d8';P_(g,[0,-13,4,-15,4,-11,0,-10]);g.fill();rr(g,-5,5,8,8,2);g.fillStyle='#6a3a2a';g.fill();ST(g);g.rotate(-.5);g.fillStyle='#9aa0a6';g.fillRect(4,-12,1.8,16)},
 vitamins(g){rr(g,-8,-6,16,18,3);g.fillStyle=lg(g,-8,0,8,0,['#d06010','#ffa040','#b04a08']);g.fill();ST(g);rr(g,-9,-12,18,6,2);g.fillStyle='#f4f0e6';g.fill();ST(g);g.fillStyle='#fff';g.fillRect(-5,-1,10,8);g.fillStyle='#d03030';g.fillRect(-1,0,2,6);g.fillRect(-3,2,6,2)},
 crucifix(g){g.fillStyle=lg(g,-3,-14,3,14,['#fff','#c8ccd0','#8a9098']);P_(g,[-2.5,-14,2.5,-14,2.5,-6,9,-6,9,-1,2.5,-1,2.5,14,-2.5,14,-2.5,-1,-9,-1,-9,-6,-2.5,-6]);g.fill();ST(g);g.fillStyle='#e8c46a';g.beginPath();g.arc(0,-3.5,2,0,7);g.fill()},
 key(g){g.rotate(-.7);g.beginPath();g.arc(-7,0,6,0,7);g.arc(-7,0,2.6,0,7,true);g.fillStyle=lg(g,-13,0,0,0,['#ffe68a','#c8962a']);g.fill('evenodd');ST(g);rr(g,-2,-2,15,4,1);g.fill();ST(g);g.fillRect(8,2,2.5,4);g.fillRect(11,2,2,3)},
 skey(g){g.rotate(-.7);g.beginPath();g.arc(-7,0,7,0,7);g.fillStyle=lg(g,-14,0,0,0,['#ffe68a','#a87a20']);g.fill();ST(g);g.fillStyle=OL;g.beginPath();g.arc(-8.6,-1.5,1.6,0,7);g.arc(-5.4,-1.5,1.6,0,7);g.fill();g.fillRect(-9,2.2,5,1.3);g.fillStyle='#c8962a';rr(g,-1,-2,15,4,1);g.fill();ST(g);g.fillRect(9,2,2.5,5);g.fillRect(12,2,2,3)},
 lighter(g){rr(g,-7,-5,14,17,2);g.fillStyle=lg(g,-7,0,7,0,['#c84020','#ff7040','#902a10']);g.fill();ST(g);rr(g,-7,-10,14,5,1);g.fillStyle='#c0c6cc';g.fill();ST(g);g.fillStyle='#fd4';g.beginPath();g.moveTo(1,-11);g.quadraticCurveTo(6,-16,1,-20);g.quadraticCurveTo(-3,-15,1,-11);g.fill();g.fillStyle='#fff6c0';g.beginPath();g.arc(1,-13,1.4,0,7);g.fill()},
 candle(g){rr(g,-5,-6,10,18,2);g.fillStyle=lg(g,-5,0,5,0,['#e8dcb0','#fff6dc','#c8b888']);g.fill();ST(g);g.fillStyle=OL;g.fillRect(-.6,-9,1.2,3);g.fillStyle='#ffb030';g.beginPath();g.moveTo(0,-9);g.quadraticCurveTo(4,-13,0,-17);g.quadraticCurveTo(-4,-13,0,-9);g.fill();rr(g,-8,11,16,3,1);g.fillStyle='#8a6a3a';g.fill();ST(g)},
 bandage(g){g.beginPath();g.arc(-2,2,9,0,7);g.fillStyle=lg(g,-11,-7,7,11,['#fff','#e4ddd0','#b8b0a0']);g.fill();ST(g);g.beginPath();g.arc(-2,2,3,0,7);g.fillStyle='#8a8070';g.fill();rr(g,4,-11,9,6,1);g.fillStyle='#f4f0e6';g.fill();ST(g);g.fillStyle='#d03030';g.fillRect(-3,-4,2,3)},
 shears(g){g.rotate(.4);g.fillStyle=lg(g,0,-14,0,4,['#e8eef2','#8a9098']);P_(g,[-1,-14,2,-14,3,2,0,3]);g.fill();ST(g);P_(g,[-4,-12,-1,-13,1,2,-2,3]);g.fill();ST(g);for(const s of[-1,1]){g.beginPath();g.ellipse(s*5,9,4,5,0,0,7);g.strokeStyle='#2f7a2a';g.lineWidth=3;g.stroke()}g.fillStyle='#555';g.beginPath();g.arc(0,3,1.6,0,7);g.fill()},
 mfuse(g){g.fillStyle=lg(g,-4,0,4,0,['#ddd','#fff','#999']);rr(g,-4,-4,8,12,1);g.fill();ST(g);g.fillStyle='#8a6a3a';g.fillRect(-1.5,-13,3,9);g.strokeStyle=OL;g.lineWidth=1;g.strokeRect(-1.5,-13,3,9);g.fillStyle='#777';g.fillRect(-2.5,8,5,6);g.fillStyle='#fc6';g.beginPath();g.arc(0,-14,2,0,7);g.fill()},
 card(g){g.rotate(-.15);rr(g,-12,-8,24,16,2);g.fillStyle=lg(g,-12,-8,12,8,['#9ad8ff','#3a7ab8']);g.fill();ST(g);g.fillStyle='#e8c46a';g.fillRect(-9,-4,6,5);g.fillStyle='#fff';g.fillRect(-1,-4,10,1.5);g.fillRect(-1,-1,8,1.5);g.fillStyle='#123';g.fillRect(-12,3,24,2.5)},
 vial(g){g.beginPath();g.moveTo(-3,-12);g.lineTo(3,-12);g.lineTo(3,-5);g.quadraticCurveTo(9,0,7,8);g.quadraticCurveTo(0,14,-7,8);g.quadraticCurveTo(-9,0,-3,-5);g.closePath();g.fillStyle='rgba(200,230,255,.4)';g.fill();ST(g);g.fillStyle='#fd9';g.beginPath();g.moveTo(-7,4);g.quadraticCurveTo(0,0,7,4);g.quadraticCurveTo(0,13,-7,4);g.fill();rr(g,-4,-15,8,4,1);g.fillStyle='#8a5a2a';g.fill();ST(g)},
 lantern(g){g.fillStyle='rgba(255,240,170,.35)';g.beginPath();g.arc(0,2,13,0,7);g.fill();rr(g,-7,-6,14,16,2);g.fillStyle=lg(g,0,-6,0,10,['#fff8c0','#f0c050']);g.fill();ST(g);g.strokeStyle='#3a2a18';g.lineWidth=2;g.beginPath();g.moveTo(-7,0);g.lineTo(7,0);g.moveTo(0,-6);g.lineTo(0,10);g.stroke();g.beginPath();g.arc(0,-9,4,Math.PI,0);g.stroke()},
 shake(g){rr(g,-5,-12,10,22,3);g.fillStyle=lg(g,-5,0,5,0,['#4a8ad8','#9cf','#2a5a98']);g.fill();ST(g);g.fillStyle='#e8f8ff';for(let i=0;i<3;i++)g.fillRect(-3,-8+i*6,6,2);g.strokeStyle='#9cf';g.lineWidth=1.4;g.beginPath();g.arc(0,-1,12,-.6,.6);g.stroke();g.beginPath();g.arc(0,-1,12,Math.PI-.6,Math.PI+.6);g.stroke()},
 berries(g){g.fillStyle='#2f6a2a';P_(g,[0,-12,6,-8,0,-6]);g.fill();for(const[a,b]of[[-4,-1],[4,0],[0,6],[-6,7],[6,8]]){g.beginPath();g.arc(a,b,4.4,0,7);g.fillStyle=lg(g,a-4,b-4,a+4,b+4,['#b8a0ff','#5a3cd8']);g.fill();ST(g);g.fillStyle='rgba(255,255,255,.6)';g.fillRect(a-2,b-2,1.5,1.5)}},
 glowstick(g){g.rotate(.6);g.fillStyle='rgba(120,255,140,.3)';g.beginPath();g.ellipse(0,0,7,16,0,0,7);g.fill();rr(g,-3,-13,6,26,3);g.fillStyle=lg(g,-3,0,3,0,['#3f8','#cfc','#2c6']);g.fill();ST(g);g.fillStyle='#ddd';g.fillRect(-3,-15,6,3)},
 tape(g){g.beginPath();g.arc(0,0,11,0,7);g.arc(0,0,5,0,7,true);g.fillStyle=lg(g,-11,-11,11,11,['#9ab8d0','#4a6a88']);g.fill('evenodd');ST(g);g.beginPath();g.arc(0,0,5,0,7);g.strokeStyle='#c8b080';g.lineWidth=2;g.stroke();g.fillStyle='#6a8aa8';g.fillRect(8,4,7,4)},
 relayk(g){rr(g,-9,-6,18,12,2);g.fillStyle=lg(g,0,-6,0,6,['#ffb070','#d06a20']);g.fill();ST(g);g.fillStyle='#c0c6cc';for(const s of[-1,1]){g.fillRect(s*9-(s>0?0:4),-3,4,6);g.strokeStyle=OL;g.lineWidth=1;g.strokeRect(s*9-(s>0?0:4),-3,4,6)}g.fillStyle='#1a1a1a';g.font='800 8px Arial';g.textAlign='center';g.fillText('Г',0,3)},
 gold(g){for(const[a,b]of[[-4,4],[4,3],[0,-3]]){g.beginPath();g.ellipse(a,b,7,7,0,0,7);g.fillStyle=lg(g,a-7,b-7,a+7,b+7,['#fff2a0','#e0a820','#9a6a10']);g.fill();ST(g);g.strokeStyle='rgba(120,80,10,.7)';g.lineWidth=1;g.beginPath();g.arc(a,b,4.3,0,7);g.stroke()}}};
const _di=drawIcon;drawIcon=function(g,it,x,y,s){const f=IC[it];if(!f)return _di(g,it,x,y,s);g.save();g.translate(x,y);g.scale(s/32,s/32);try{f(g)}catch(e){}g.restore()};
window.d2icons=IC;
// durability
const DUR={flashlight:()=>P.bat/100,lighter:()=>P.fuel/100,shears:()=>Math.min(1,(P.shear||0)/6),skey:()=>Math.min(1,(P.skey||3)/3),candle:()=>P.fuel!=null?P.fuel/100:null};
// feedback tracking
let prev=null,fx=[],float=[];
function track(){if(!P||!P.inv)return;if(!prev){prev=P.inv.slice();return}for(let i=0;i<10;i++){const a=prev[i],b=P.inv[i];if(a!==b){if(b){fx.push({i,t:.6,c:'#7f7'});float.push({t:1.4,s:'+ '+(ITEM[b]||{n:b}).n,c:'#cfc'})}else if(a){fx.push({i,t:.6,c:'#f96'});float.push({t:1.2,s:'− '+(ITEM[a]||{n:a}).n,c:'#fca'})}}}prev=P.inv.slice()}
const pad=n=>String(n);
window.invDraw=function(){track();const n=10,sw=46,gap=4,tot=n*(sw+gap)-gap,x0=W/2-tot/2,y0=H-58,dt=1/60;const g=X;
 // backdrop
 g.save();rr(g,x0-10,y0-8,tot+20,sw+16,10);g.fillStyle='rgba(8,6,4,.72)';g.fill();g.strokeStyle='rgba(217,184,106,.35)';g.lineWidth=1;g.stroke();
 for(let i=0;i<n;i++){const sel=i===P.sel,x=x0+i*(sw+gap),y=y0-(sel?6:0),it=P.inv[i];
  rr(g,x,y,sw,50,6);g.fillStyle=sel?lg(g,0,y,0,y+50,['#4a3420','#20160c']):lg(g,0,y,0,y+50,['#2a2016','#120c08']);g.fill();
  g.strokeStyle=sel?'#ffd86a':'rgba(160,130,80,.55)';g.lineWidth=sel?2.5:1.2;g.stroke();
  if(sel){g.save();g.shadowColor='rgba(255,210,110,.8)';g.shadowBlur=12;g.stroke();g.restore()}
  g.fillStyle='rgba(255,255,255,.06)';g.fillRect(x+3,y+3,sw-6,2);
  const f=fx.find(q=>q.i===i);if(f){g.globalAlpha=f.t/.6;rr(g,x,y,sw,50,6);g.strokeStyle=f.c;g.lineWidth=3;g.stroke();g.globalAlpha=1}
  g.fillStyle=sel?'#ffe8a8':'#8a7a60';g.font='700 10px Arial';g.textAlign='left';g.fillText((i+1)%10,x+5,y+12);
  if(it){drawIcon(g,it,x+sw/2,y+24,30);const d=DUR[it]&&DUR[it]();if(d!=null&&!isNaN(d)){g.fillStyle='#111';g.fillRect(x+6,y+42,sw-12,4);g.fillStyle=d>.5?'#6d6':d>.2?'#ec4':'#e44';g.fillRect(x+6,y+42,(sw-12)*Math.max(0,Math.min(1,d)),4)}
   const cnt=P.inv.filter(q=>q===it).length;if(cnt>1&&P.inv.indexOf(it)===i){g.fillStyle='#fff';g.font='800 11px Arial';g.textAlign='right';g.fillText('×'+cnt,x+sw-4,y+13)}}}
 // selected name + tip
 const it=P.inv[P.sel];if(it){const nm=(ITEM[it]||{n:it}).n,tip=(window.TIPS&&TIPS[it])||'';g.font='700 14px Arial';const w=Math.max(g.measureText(nm).width,(g.font='12px Arial',g.measureText(tip).width))+24;const cx=x0+P.sel*(sw+gap)+sw/2,bx=Math.max(8,Math.min(W-w-8,cx-w/2)),by=y0-(tip?58:40);rr(g,bx,by,w,tip?42:26,6);g.fillStyle='rgba(16,10,6,.9)';g.fill();g.strokeStyle='#8a6a3a';g.lineWidth=1;g.stroke();g.textAlign='center';g.fillStyle='#ffe08a';g.font='700 14px Arial';g.fillText(nm,bx+w/2,by+17);if(tip){g.fillStyle='#bbb';g.font='12px Arial';g.fillText(tip,bx+w/2,by+34)}}
 // gold
 g.textAlign='left';drawIcon(g,'gold',x0-34,y0+18,26);g.fillStyle='#ffd86a';g.font='800 13px Arial';g.textAlign='center';g.fillText(P.gold,x0-34,y0+44);
 // floating
 let fy=y0-70;if(float.length>3)float=float.slice(-3);for(const q of float){g.globalAlpha=Math.min(1,q.t);g.fillStyle=q.c;g.font='700 14px Arial';g.textAlign='center';g.fillText(q.s,W/2,fy-(1.4-q.t)*20);fy-=18;g.globalAlpha=1}
 for(const q of fx)q.t-=dt;fx=fx.filter(q=>q.t>0);for(const q of float)q.t-=dt;float=float.filter(q=>q.t>0);g.restore();
 window.__invRect={x0,y0,sw,gap}};
// click to select (desktop)
C.addEventListener('mousedown',e=>{const R=window.__invRect;if(!R||!started)return;const b=C.getBoundingClientRect(),x=(e.clientX-b.left)*W/b.width,y=(e.clientY-b.top)*H/b.height;if(y<R.y0-8||y>R.y0+52)return;const i=Math.floor((x-R.x0)/(R.sw+R.gap));if(i>=0&&i<10){P.sel=i;try{tone(600,.03,'sine',.04)}catch(_){}}});
Object.assign(window.TIPS||{},{flashlight:'F — вкл/выкл. Тратит батарею',battery:'Используй (выбери и E/клик) — +батарея фонарика',lockpick:'Открывает запертые двери и шкафы',vitamins:'Ускорение и выносливость на время',crucifix:'Изгоняет сущность, если держать в руке',key:'Подходит к запертой двери этой комнаты',lighter:'Свет без батареи. Осторожно с газом!',candle:'Тусклый свет, отгоняет мелочь',skey:'Открывает двери с черепом (3 раза)',bandage:'Используй — +35 HP',glowstick:'Брось (G) — светит на месте',shake:'Встряхни — короткая вспышка света'});
})();
