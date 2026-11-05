const FLS=['hotel','mines','back','garden','archive','stair'];
'use strict';
const express=require('express'),http=require('http'),path=require('path'),{WebSocketServer}=require('ws');
const app=express();
app.get('/healthz',(q,r)=>r.send('ok'));
app.get(['/server.js','/package.json','/package-lock.json'],(q,r)=>r.status(404).end());
app.use(express.static(__dirname,{index:'index.html',dotfiles:'ignore'}));
const srv=http.createServer(app);
const wss=new WebSocketServer({server:srv,path:'/ws',maxPayload:8192});
let nid=1,pid=1;const PL=new Map(),PA=new Map();
const send=(ws,o)=>{if(ws.readyState===1)ws.send(JSON.stringify(o))};
function lobby(){const s=JSON.stringify({t:'lobby',players:[...PL.values()].filter(p=>p.name).map(p=>({id:p.id,name:p.name,party:p.party})),parties:[...PA.values()].map(q=>({id:q.id,host:q.host,members:q.members,floor:q.floor,start:q.start,state:q.state,auto:q.auto,cd:q.auto?Math.max(0,q.ready-Date.now()):null}))});for(const p of PL.values())if(p.ws.readyState===1)p.ws.send(s)}
function startP(q){q.state='play';q.seed=(Math.random()*2147483647)|0;const members=q.members.map(i=>({id:i,name:PL.get(i).name}));for(const i of q.members)send(PL.get(i).ws,{t:'go',seed:q.seed,start:q.start,floor:q.floor,members});lobby()}
setInterval(()=>{let ch=false;for(const q of PA.values())if(q.auto&&q.state==='wait'){if(Date.now()>=q.ready&&q.members.length>1){startP(q)}else ch=true}if(ch)lobby()},1000);
function leave(p){const q=PA.get(p.party);p.party=null;if(!q)return;q.members=q.members.filter(i=>i!==p.id);for(const i of q.members){const o=PL.get(i);if(o)send(o.ws,{t:'left',id:p.id})}if(!q.members.length)PA.delete(q.id);else if(q.host===p.id)q.host=q.members[0]}
wss.on('connection',ws=>{const p={id:nid++,ws,name:null,party:null,alive:true,rate:0,rt:Date.now()};PL.set(p.id,p);send(ws,{t:'welcome',id:p.id});
 ws.on('pong',()=>p.alive=true);
 ws.on('message',buf=>{const now=Date.now();if(now-p.rt>1000){p.rt=now;p.rate=0}if(++p.rate>60)return;let m;try{m=JSON.parse(buf)}catch(e){return}if(!m||typeof m.t!=='string')return;
  if(m.t==='hello'){p.name=String(m.name||'Игрок').replace(/[<>&"]/g,'').trim().slice(0,16)||'Игрок';lobby();return}
  if(!p.name)return;const q=PA.get(p.party);
  switch(m.t){
   case 'create':{leave(p);const id=pid++;PA.set(id,{id,host:p.id,members:[p.id],floor:FLS.includes(m.floor)?m.floor:'hotel',start:[0,50,90].includes(m.start)?m.start:0,state:'wait',auto:!!m.auto,ready:Date.now()+10000});p.party=id;lobby();break}
   case 'join':{const r=PA.get(m.party);if(!r||r.state!=='wait'||r.members.length>=4||r.id===p.party){send(ws,{t:'err',msg:'Нельзя войти в этот лифт'});break}leave(p);r.members.push(p.id);p.party=r.id;if(r.auto)r.ready=Math.max(r.ready,Date.now()+5000);lobby();break}
   case 'leave':leave(p);lobby();break;
   case 'lp':{if(q&&q.state==='play')break;const o={t:'lp',id:p.id,n:p.name,x:+m.x||0,y:+m.y||0,f:+m.f||0,e:m.e|0,es:m.es|0,sk:String(m.sk||'').slice(0,12)};const s=JSON.stringify(o);for(const r of PL.values()){if(r===p||!r.name||r.ws.readyState!==1)continue;const rq=PA.get(r.party);if(rq&&rq.state==='play')continue;r.ws.send(s)}break}
   case 'cfg':if(q&&q.host===p.id&&q.state==='wait'){if([0,50,90].includes(m.start))q.start=m.start;if(FLS.includes(m.floor))q.floor=m.floor;lobby()}break;
   case 'start':if(q&&q.host===p.id&&q.state==='wait')startP(q);break;
   case 'st':case 'ev':if(q){m.id=p.id;const s=JSON.stringify(m);if(s.length>600)break;for(const i of q.members)if(i!==p.id){const o=PL.get(i);if(o&&o.ws.readyState===1)o.ws.send(s)}}break;
  }});
 ws.on('close',()=>{leave(p);PL.delete(p.id);lobby()});ws.on('error',()=>{});
});
setInterval(()=>{for(const p of PL.values()){if(!p.alive){p.ws.terminate();continue}p.alive=false;try{p.ws.ping()}catch(e){}}},30000);
const PORT=process.env.PORT||3000;srv.listen(PORT,()=>console.log('doors2d online on',PORT));
