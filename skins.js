// skins.js — original top-down characters + wardrobe
(function(){
const SK=[
 {id:'bell',name:'Посыльный',coat:'#8a2430',trim:'#d9b86a',pants:'#2a1a1a',hat:'pill',hatc:'#8a2430',hair:'#3a2416',skin:'#e8c8a0',cost:0},
 {id:'expl',name:'Путешественница',coat:'#7a6a3a',trim:'#4a3a1a',pants:'#3a3020',hat:'pith',hatc:'#d8caa0',hair:'#a0602a',skin:'#f0d0b0',pack:'#5a4020',cost:0},
 {id:'det',name:'Сыщик',coat:'#5a4a3a',trim:'#2a2018',pants:'#2a2420',hat:'fedora',hatc:'#3a3028',hair:'#1a1410',skin:'#d8b088',coatTail:1,cost:30},
 {id:'mine',name:'Шахтёр',coat:'#3a4a5a',trim:'#e0a020',pants:'#2a2a30',hat:'helm',hatc:'#d8a020',hair:'#2a1a10',skin:'#c89870',cost:40},
 {id:'gard',name:'Садовница',coat:'#4a6a3a',trim:'#d8c890',pants:'#4a3a2a',hat:'straw',hatc:'#d8c070',hair:'#6a3a1a',skin:'#f0c8a0',cost:0,ach:'first'},
 {id:'arch',name:'Архивариус',coat:'#4a3a5a',trim:'#c0b090',pants:'#2a2430',hat:'bun',hatc:'#5a3a2a',hair:'#5a3a2a',skin:'#e8c0a0',glasses:1,cost:60},
 {id:'rain',name:'Дождевичок',coat:'#e0c020',trim:'#a08010',pants:'#3a4a6a',hat:'hood',hatc:'#e0c020',hair:'#3a2a1a',skin:'#f4d4b4',cost:50},
 {id:'guard',name:'Ночной сторож',coat:'#2a3448',trim:'#9aa4b0',pants:'#1a1e28',hat:'cap',hatc:'#1e2638',hair:'#4a4a4a',skin:'#b88a68',cost:80},
 {id:'cook',name:'Повар',coat:'#e8e4dc',trim:'#a03030',pants:'#2a2a2a',hat:'toque',hatc:'#f4f0e8',hair:'#3a2a1a',skin:'#d8a880',cost:70},
 {id:'ghost',name:'Постоялец-призрак',coat:'#8ab0c0',trim:'#d0f0ff',pants:'#6a90a0',hat:'none',hatc:'#000',hair:'#c0d8e0',skin:'#d8e8f0',ach:'win_any',alpha:.8,cost:0}];
const TINT=[null,'#8a2430','#2a5a8a','#3a6a3a','#6a3a7a','#2a2a2a','#c06a20','#d0d0d0'];
const LS=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}};
let OWN=LS('d2skins',['bell','expl']),CUR=LS('d2skin',{id:'bell',tint:0});
function save(){localStorage.setItem('d2skins',JSON.stringify(OWN));localStorage.setItem('d2skin',JSON.stringify(CUR))}
function achs(){return LS('d2ach',{})}
function avail(s){if(OWN.includes(s.id))return true;if(s.ach){const a=achs();if(s.ach==='win_any'?Object.keys(a).some(k=>/win/.test(k)):a[s.ach]||Object.keys(a).length>0){OWN.push(s.id);save();return true}}return !s.cost&&!s.ach}
const code=()=>CUR.id+':'+CUR.tint;window.d2skinCode=code;
function parse(c){c=c||'bell:0';const[a,b]=String(c).split(':');return{s:SK.find(q=>q.id===a)||SK[0],t:TINT[+b|0]}}
function sh(c,f){const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const k=f<0?1+f:1-f,m=f<0?0:255*f;r=r*k+m;g=g*k+m;b=b*k+m;return'rgb('+(r|0)+','+(g|0)+','+(b|0)+')'}
function grad(g,c,R){const q=g.createRadialGradient(-R*.35,-R*.45,R*.1,0,0,R*1.1);q.addColorStop(0,sh(c,.25));q.addColorStop(.6,c);q.addColorStop(1,sh(c,-.45));return q}
// main renderer: frame facing +x
function draw(x,y,face,ph,mv,col,o){o=o||{};const g=o.ctx||X,P_=parse(o.skin||code()),s=P_.s,coat=P_.t||s.coat;g.save();g.translate(x,y);
 if(o.hurt)g.translate(Math.sin(performance.now()/25)*1.5,0);
 if(o.dead){g.fillStyle='rgba(120,0,0,.35)';g.beginPath();g.ellipse(4,4,18,10,.3,0,7);g.fill();g.rotate(face);g.scale(1.15,.9);g.globalAlpha*=.85}else g.rotate(face);
 const run=o.run||mv&&o.fast,amp=o.dead?0:mv?(run?9:6):0,sw=Math.sin(ph)*amp/6,cr=o.crouch?.82:1;g.scale(cr,cr);if(s.alpha)g.globalAlpha*=s.alpha;
 // shadow
 g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(2,2,11,13,0,0,7);g.fill();
 // feet
 g.fillStyle='#1a1410';g.beginPath();g.ellipse(sw*7+(o.crouch?-3:0),-5,5.2,3.2,0,0,7);g.ellipse(-sw*7+(o.crouch?-3:0),5,5.2,3.2,0,0,7);g.fill();
 g.fillStyle=s.pants;g.beginPath();g.ellipse(sw*3,-4.5,4,3.4,0,0,7);g.ellipse(-sw*3,4.5,4,3.4,0,0,7);g.fill();
 // backpack / coat tail
 if(s.pack){g.fillStyle=s.pack;g.beginPath();g.roundRect?g.roundRect(-13,-7,7,14,3):g.rect(-13,-7,7,14);g.fill();g.fillStyle='#2a1a08';g.fillRect(-12,-1,5,2)}
 if(s.coatTail){g.fillStyle=sh(coat,-.2);g.beginPath();g.moveTo(-4,-9);g.quadraticCurveTo(-15-sw*2,0,-4,9);g.fill()}
 // torso
 const bob=mv?Math.abs(Math.sin(ph))*.6:0;g.fillStyle=grad(g,coat,11);g.beginPath();g.ellipse(-1,0,7.8+bob,11.2,0,0,7);g.fill();
 g.strokeStyle=sh(coat,-.5);g.lineWidth=1;g.stroke();
 g.fillStyle=s.trim;g.fillRect(2,-1,2.4,2);g.fillRect(-3,-1,2.4,2);g.fillStyle=sh(s.trim,-.2);g.fillRect(-6,-9,1.6,18);// belt/strap
 g.fillStyle=s.trim;g.beginPath();g.ellipse(-1,-10.5,3,1.4,0,0,7);g.ellipse(-1,10.5,3,1.4,0,0,7);g.fill();// epaulettes
 // arms
 const arm=(side,swing,hold)=>{const ax=2+swing*5+(hold?5:0),ay=side*11.5+(hold?-side*2:0);g.fillStyle=sh(coat,-.18);g.beginPath();g.ellipse(ax-2,ay,5,3.4,0,0,7);g.fill();g.fillStyle=sh(coat,.12);g.beginPath();g.ellipse(ax-2.5,ay-side*.8,3.4,1.6,0,0,7);g.fill();g.fillStyle=s.skin;g.beginPath();g.arc(ax+3,ay,2.6,0,7);g.fill()};
 arm(-1,-sw,false);arm(1,o.item?0:sw,!!o.item);
 if(o.item){g.save();g.translate(12,10);g.rotate(Math.PI/2);try{drawIcon(g,o.item,0,0,13)}catch(e){}g.restore();if(o.item==='flashlight'){g.fillStyle='rgba(255,240,180,.5)';g.beginPath();g.arc(19,10,2,0,7);g.fill()}}
 // head
 g.save();g.translate(1.5+(mv?Math.sin(ph*2)*.4:0),0);g.fillStyle=grad(g,s.skin,6.5);g.beginPath();g.arc(0,0,6.4,0,7);g.fill();
 g.fillStyle=sh(s.skin,-.15);g.beginPath();g.arc(6.2,0,1.6,0,7);g.fill();// nose
 if(o.dead){g.strokeStyle='#300';g.lineWidth=1.2;for(const yy of[-2.4,2.4]){g.beginPath();g.moveTo(3,yy-1.2);g.lineTo(5.4,yy+1.2);g.moveTo(5.4,yy-1.2);g.lineTo(3,yy+1.2);g.stroke()}}
 else{g.fillStyle='#120a04';g.fillRect(3.8,-3,1.7,1.7);g.fillRect(3.8,1.3,1.7,1.7)}
 if(s.glasses){g.strokeStyle='#d0c080';g.lineWidth=.9;g.beginPath();g.arc(4.6,-2.2,1.8,0,7);g.arc(4.6,2.2,1.8,0,7);g.stroke()}
 // hair back
 g.fillStyle=grad(g,s.hair,6);g.beginPath();g.arc(-1,0,6.6,Math.PI*.5,Math.PI*1.5);g.ellipse(-.5,0,4.6,6.5,0,0,7);g.fill();
 g.strokeStyle=sh(s.hair,.2);g.lineWidth=.7;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(-5,i*2.2);g.quadraticCurveTo(-1,i*2.6,2,i*2);g.stroke()}
 const hc=P_.t&&s.hat==='hood'?P_.t:s.hatc;
 switch(s.hat){
  case'pill':g.fillStyle=grad(g,hc,5);g.beginPath();g.ellipse(-1,0,4.2,4.6,0,0,7);g.fill();g.fillStyle=s.trim;g.fillRect(-5,-.6,8,1.2);g.fillStyle='#d9b86a';g.beginPath();g.arc(-1,0,1.2,0,7);g.fill();break;
  case'pith':g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(0,0,9.6,9,0,0,7);g.fill();g.fillStyle=grad(g,hc,9);g.beginPath();g.ellipse(-.5,0,9,8.4,0,0,7);g.fill();g.fillStyle=sh(hc,-.1);g.beginPath();g.ellipse(-1,0,5.6,5.4,0,0,7);g.fill();g.fillStyle='#6a4a2a';g.beginPath();g.ellipse(-1,0,5.8,5.6,0,0,7);g.lineWidth=1.2;g.strokeStyle='#6a4a2a';g.stroke();break;
  case'fedora':g.fillStyle=grad(g,hc,9);g.beginPath();g.ellipse(0,0,9.4,8.6,0,0,7);g.fill();g.fillStyle=sh(hc,-.2);g.beginPath();g.ellipse(-1,0,5.4,5,0,0,7);g.fill();g.strokeStyle='#120c08';g.lineWidth=1.4;g.beginPath();g.ellipse(-1,0,5.6,5.2,0,0,7);g.stroke();g.strokeStyle=sh(hc,-.4);g.lineWidth=.8;g.beginPath();g.moveTo(-5,0);g.lineTo(3,0);g.stroke();break;
  case'helm':g.fillStyle=grad(g,hc,8);g.beginPath();g.ellipse(-.5,0,7.6,7.2,0,0,7);g.fill();g.strokeStyle=sh(hc,-.4);g.lineWidth=1;g.beginPath();g.moveTo(-7,0);g.lineTo(6,0);g.stroke();g.fillStyle='#ccc';g.fillRect(5,-1.8,3,3.6);g.fillStyle='#fff6c0';g.beginPath();g.arc(8,0,1.6,0,7);g.fill();break;
  case'straw':g.fillStyle=grad(g,hc,10);g.beginPath();g.arc(0,0,10.5,0,7);g.fill();g.strokeStyle=sh(hc,-.3);g.lineWidth=.5;for(let r=4;r<10.5;r+=2){g.beginPath();g.arc(0,0,r,0,7);g.stroke()}g.fillStyle='#8a3030';g.beginPath();g.arc(0,0,4.6,0,7);g.lineWidth=1.4;g.strokeStyle='#8a3030';g.stroke();break;
  case'bun':g.fillStyle=grad(g,s.hair,4);g.beginPath();g.arc(-6.5,0,3.4,0,7);g.fill();g.strokeStyle='#d0c080';g.lineWidth=.8;g.beginPath();g.moveTo(-9,-3);g.lineTo(-4,3);g.stroke();break;
  case'hood':g.fillStyle=grad(g,hc,8);g.beginPath();g.arc(-.5,0,7.8,Math.PI*.35,Math.PI*1.65);g.lineTo(2,0);g.fill();g.strokeStyle=sh(hc,-.35);g.lineWidth=1;g.stroke();break;
  case'cap':g.fillStyle=grad(g,hc,7);g.beginPath();g.ellipse(-1,0,6.8,6.8,0,0,7);g.fill();g.fillStyle=sh(hc,-.3);g.beginPath();g.ellipse(6,0,3.4,5.4,0,-Math.PI/2,Math.PI/2);g.fill();g.fillStyle='#c0c8d0';g.fillRect(-2,-1.4,2.6,2.8);break;
  case'toque':g.fillStyle=grad(g,hc,8);for(const[a,b]of[[-2,-3],[-2,3],[-5,0],[1,0]]){g.beginPath();g.arc(a,b,4.2,0,7);g.fill()}break;
 }
 g.restore();
 if(o.hurt){g.globalCompositeOperation='source-atop';g.fillStyle='rgba(255,40,40,.3)';g.beginPath();g.arc(0,0,13,0,7);g.fill();g.globalCompositeOperation='source-over'}
 g.restore()}
const _dc=drawChar;drawChar=function(x,y,face,ph,mv,col,o){o=o||{};if(o.skin===undefined&&typeof P!=='undefined'&&x===P.x&&y===P.y){o.skin=code();o.dead=o.dead||!!(typeof S!=='undefined'&&S.dead);o.fast=typeof P.run!=='undefined'?P.run:(K&&K.ShiftLeft)}try{draw(x,y,face,ph,mv,col,o)}catch(e){_dc(x,y,face,ph,mv,col,o)}};
// others in co-op
drawOthers=function(){if(!NET.coop)return;for(const[id,o]of NET.others){if(o.gone||!o.seen||o.hid)continue;const mv=o.lx!=null&&Math.hypot(o.x-o.lx,o.y-o.ly)>.25;o.lx=o.x;o.ly=o.y;if(mv)o.wph=(o.wph||0)+.25;drawChar(o.x,o.y,o.face||0,o.wph||0,mv,null,{skin:o.sk||'bell:0',dead:o.dead,item:o.it||null});X.fillStyle='#000';X.font='bold 12px Arial';X.textAlign='center';X.fillText((o.dead?'☠ ':'')+o.name,o.x+1,o.y-21);X.fillStyle='#fff';X.fillText((o.dead?'☠ ':'')+o.name,o.x,o.y-22)}X.globalAlpha=1};
// wardrobe UI
const box=document.createElement('div');box.id='skbox';box.style.cssText='position:fixed;inset:0;z-index:20;display:none;background:rgba(0,0,0,.8);color:#eee;font:14px Arial;align-items:center;justify-content:center';document.body.appendChild(box);
const pv=document.createElement('canvas');pv.width=pv.height=96;
function prev(c,face,ph,mv,o){const q=pv.getContext('2d');q.setTransform(1,0,0,1,0,0);q.clearRect(0,0,96,96);q.setTransform(2.6,0,0,2.6,48,50);draw(0,0,face,ph,mv,null,Object.assign({skin:c,ctx:q},o||{}));q.setTransform(1,0,0,1,0,0);return pv.toDataURL()}
window.d2drawSkin=(ctx,x,y,face,ph,mv,o)=>draw(x,y,face,ph,mv,null,Object.assign({ctx},o||{}));
window.d2skinPrev=prev;
function render(){const tok=window.d2meta?d2meta.TOK:0;box.innerHTML=`<div style="background:#1a120c;border:1px solid #8a6a3a;padding:16px;max-width:860px;border-radius:6px"><div style="display:flex;justify-content:space-between"><b style="font:bold 20px Georgia;color:#d9b86a">Гардероб</b><span>Жетоны: ${tok} <button id="skx">✕</button></span></div>
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:10px 0">${SK.map(s=>{const a=avail(s),c=s.id===CUR.id;return`<div data-sk="${s.id}" style="cursor:pointer;text-align:center;padding:6px;border:2px solid ${c?'#ffe08a':'#3a2a1a'};background:#241810;opacity:${a?1:.7}"><img src="${prev(s.id+':0',-1.2,0,false,{item:'flashlight'})}" width="96"><div>${s.name}</div><small style="color:#aaa">${a?(c?'надето':'есть'):s.ach?'🔒 за достижение':'🔒 '+s.cost+' жет.'}</small></div>`}).join('')}</div>
<div>Оттенок: ${TINT.map((t,i)=>`<button data-ti="${i}" style="width:28px;height:28px;background:${t||'linear-gradient(45deg,#888,#444)'};border:2px solid ${i==CUR.tint?'#ffe08a':'#555'}"></button>`).join(' ')}</div></div>`;
 box.querySelector('#skx').onclick=()=>{box.style.display='none';window.d2modal=false};
 box.querySelectorAll('[data-sk]').forEach(d=>d.onclick=()=>{const s=SK.find(q=>q.id===d.dataset.sk);if(!avail(s)){if(s.cost&&window.d2meta&&d2meta.TOK>=s.cost){d2meta.TOK-=s.cost;OWN.push(s.id);try{localStorage.setItem('d2tok',JSON.stringify(d2meta.TOK))}catch(e){}}else return}CUR.id=s.id;save();render()});
 box.querySelectorAll('[data-ti]').forEach(d=>d.onclick=()=>{CUR.tint=+d.dataset.ti;save();render()})}
window.d2wardrobe=function(){render();box.style.display='flex';window.d2modal=true};
window.__sk={SK,TINT,get cur(){return code()},set(id,t){CUR={id,tint:t|0};save()},own(){OWN=SK.map(s=>s.id);save()}};
})();
