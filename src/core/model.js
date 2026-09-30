(function(P){
'use strict';
const VERSION='0.8.0', MAX_AGE=14601, NOW_AGE=7301;
function hash(s){let h=2166136261;for(const c of s){h^=c.codePointAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function random(seed){let a=hash(seed);return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^a>>>15,1|a);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296;};}
function identity({seed='PETALS-001',ageDays=NOW_AGE,rendererVersion=VERSION,type='PETALS'}={}){if(type!=='PETALS'||rendererVersion!==VERSION)throw Error('Unsupported artwork type or renderer version.');if(typeof seed!=='string'||!seed.length||seed.length>80)throw Error('Seed must contain 1–80 characters.');if(!Number.isFinite(ageDays)||ageDays<1||ageDays>MAX_AGE)throw Error('Age must be between 1 and 14601 virtual days.');return Object.freeze({type,seed,ageDays:Math.round(ageDays*1e6)/1e6,rendererVersion});}
function genome(seed){const r=random(seed), spectral=r(), count=2+Math.floor(r()*2);const flowers=Array.from({length:count},(_,j)=>({x:(j%2?0.24:-0.17)+(r()-.5)*.26,y:0.48-j*.43+(r()-.5)*.12,size:.63+r()*.27,phase:r()*6.28,petals:Array.from({length:6+Math.floor(r()*4)},(_,i)=>({angle:i*2.399+r()*.4,length:.65+r()*.36,width:.38+r()*.25,curl:(r()-.5)*.6,tint:r(),phase:r()*6.28}))}));return Object.freeze({spectral,flowers,phase:r()*6.28});}
// Slow correlated life stages change proportions and material, not just scale.
function life(age,phase=0){
 const u=(age-1)/(MAX_AGE-1);
 const fullness=Math.pow(Math.sin(Math.PI*(.04+.88*u)),2);
 const elder=u*u*u;
 return {u,fullness,width:.38+1.04*fullness,length:1.16-.29*fullness+.10*elder,
  roundness:1.14-.83*fullness,curl:.48*(1-fullness)*Math.sin(phase+1.2)+.37*elder,
  fan:.32+.68*fullness,fold:.22*elder,opacity:.75+.25*fullness-.14*elder};
}
function state(g,age){const l=life(age,g.phase),t=l.u;return {t,growth:.79+.15*Math.sin(t*Math.PI),opening:l.fan,memory:.05+.52*t*t,drift:Math.sin(t*5.+g.phase)*.10};}
// Independent, continuous daily rhythms preserve DNA while changing its expression.
// No day reseeding and no wall-clock inputs: adjacent days have related contours.
function daily(phase, age) {
 const wave = (rate, offset=0) => Math.sin((age-1)*rate + phase + offset);
 return {
  arc: .31*wave(.115) + .15*wave(.287,1.7),
  spread: .20*wave(.089,2.1) + .09*wave(.213),
  curl: .32*wave(.137,.7) + .13*wave(.319,2.4),
  edge: .055 + .043*(.5+.5*wave(.193,1.1)),
  edgePhase: (age-1)*.24 + phase,
  contour: .17*wave(.157,2.8),
  fold: .14*wave(.231,.4),
  tip: .10*wave(.181,1.2)
 };
}
// Each flower and petal owns a continuous trajectory, independent of frame history.
// Scale is a separate 0.8–1.3 multiplier on the existing life-stage proportions.
function motion(phase,age){
 const u=(age-1)/(MAX_AGE-1),t=u*Math.PI*2;
 return {x:.18*Math.sin(t*.81+phase)+.055*Math.sin(t*1.7+phase*1.3),
  y:.26*Math.sin(t*.66+phase*1.7)+.09*Math.sin(t*1.45+phase),
  rotation:.58*Math.sin(t*.73+phase)+.22*Math.sin(t*1.3+phase*.7),
  scale:1.05+.25*Math.sin(t*.92+phase*1.2)};
}
// Stable ranks distribute stroke coverage over actual petals, not a random probability.
const strokeRankCache=new Map();
function strokeCoverage(seed,age){
 const phase=random(seed+' / stroke season')()*Math.PI*2;
 return .55+.20*Math.cos((age-1)/(MAX_AGE-1)*Math.PI*2+phase);
}
function strokeRanks(seed){
 if(strokeRankCache.has(seed))return strokeRankCache.get(seed);
 const petals=genome(seed).flowers.flatMap((f,j)=>f.petals.map((a,i)=>({key:j+'/'+i,score:hash(seed+' / rank / '+j+'/'+i)})));
 petals.sort((a,b)=>a.score-b.score||a.key.localeCompare(b.key));
 const ranks=new Map(petals.map((p,i)=>[p.key,i])),result={ranks,count:petals.length};
 if(strokeRankCache.size>=32)strokeRankCache.delete(strokeRankCache.keys().next().value);
 strokeRankCache.set(seed,result);return result;
}
function strokeConfig(seed,flower,petal,age){
 const r=random(seed+' / contour / '+flower+' / '+petal);r();
 const {ranks,count}=strokeRanks(seed),rank=ranks.get(flower+'/'+petal);
 const strength=rank===undefined?0:Math.max(0,Math.min(1,strokeCoverage(seed,age)*count-rank));
 return {enabled:strength>0,strength,cycles:2+Math.floor(r()*4),phase:r()*Math.PI*2+(age-1)*.009,width:.004+r()*.006};
}
// Future years progressively dissolve stroked membranes, including their history.
function strokeFill(age,strength){
 const x=Math.max(0,Math.min(1,(age-NOW_AGE)/(MAX_AGE-NOW_AGE))),t=x*x*(3-2*x);
 if(strength<=0)return 1;
 if(t===1)return 0;
 return (1-t)/(1-t+strength*t);
}
function strokeEnvelope(position,cycles,phase){
 const pulse=.5-.5*Math.cos(position*cycles*Math.PI*2+phase);
 return {opacity:.6*pulse,width:pulse};
}
function nextDay(age) { return Math.min(MAX_AGE, Math.floor(age)+1); }
function history(age){return [0,.04,.14,.32,.58,.82].reverse().map(lag=>Math.max(1,1+(age-1)*(1-lag)));}
// Calendar labels are a virtual calendar, independent of device timezone and clock.
function calendarMoment(birthday, birthTime, age) {
 if (!birthday || !birthTime) return null;
 if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday) || !/^\d{2}:\d{2}$/.test(birthTime)) throw Error('Enter a birthday and birth time.');
 const base = new Date(birthday+'T'+birthTime+':00Z');
 if (!Number.isFinite(base.getTime()) || base.toISOString().slice(0,16)!==birthday+'T'+birthTime) throw Error('Enter a valid birthday and birth time.');
 return new Date(base.getTime() + (age-1)*86400000).toISOString().slice(0,16).replace('T',' · ');
}
// The selected birthday/time is the fixed virtual Now anchor.
function ageFromPosition(p){return 1+Math.min(1,Math.max(0,p))*14600;}
function positionFromAge(age){return Math.min(1,Math.max(0,(age-1)/14600));}
function hueAtAge(age){return (age-NOW_AGE)/14600*2.35;}
function randomBirthday(words){
 const start=Date.UTC(1940,0,1),span=Date.UTC(2026,0,1)-start;
 const birthday=new Date(start+Math.floor(words[0]/4294967296*(span/86400000))*86400000).toISOString().slice(0,10);
 const minute=Math.floor(words[1]/4294967296*1440);
 return {birthday,birthTime:String(Math.floor(minute/60)).padStart(2,'0')+':'+String(minute%60).padStart(2,'0')};
}
// Petal palettes and ground materials have independent, take-specific sequences.
const COLOR_STORIES={
 Coral:{names:['Rose dawn','Apricot tide','Scarlet bloom','Mulberry dusk','Golden ember'],
 colors:[['ef7096','e3a241','b34991','f2c49e'],['f79832','d74f60','aa6586','e9b738'],['e64254','f18c29','a63073','edab89'],['9846a7','ce6088','e69759','623f99'],['d89830','b85345','d4ac6f','a56c86']],
 grounds:['f0dfc6','e8c6ab','efd5c7','dfbbab','ecd0ad']},
 Spectral:{names:['Cyan prism','Ultraviolet','Iris spectrum','Acid light','Electric dusk'],
 colors:[['25b9bd','3f65cc','b247ac','94c887'],['7561d4','c54da5','35a9c2','df82b7'],['ce348b','ed9140','3da8bc','765ac6'],['99b734','23a990','e0ba2c','4476b2'],['5669c4','a03caa','e26472','31bfa9']],
 grounds:['f0dcc0','e8c6b7','f1d9ad','dfba9f','ebcbc0']},
 Veil:{names:['Silver mist','Sage wash','Blue linen','Dust rose','Ochre memory'],
 colors:[['8c9dbb','b6a0bc','789b96','d1b49a'],['7caa93','b2b87e','66989b','c9af8b'],['6f92b9','9285ae','76b2b9','c4a6b0'],['bd7e91','9f82ad','c5a78b','739c9b'],['b79858','b77d68','829d96','a796b9']],
 grounds:['f3e6d2','e6d2b7','eedaca','e9c7b1','e6d7c1']}
};
const rgb=hex=>hex.match(/../g).map(v=>parseInt(v,16)/255);
const lerp=(a,b,t)=>a+(b-a)*t;
function takeName(seed){const found=seed.match(/ \/ (Coral|Spectral|Veil)$/);return found?found[1]:['Coral','Spectral','Veil'][hash(seed)%3];}
function colorState(seed,age){
 const take=takeName(seed),story=COLOR_STORIES[take],u=Math.max(0,Math.min(1,(age-1)/(MAX_AGE-1))),pos=u*4;
 const i=Math.min(3,Math.floor(pos)),f=pos-i,t=f*f*(3-2*f),r=random(seed+' / chromatic identity');
 const bias=[(r()-.5)*.055,(r()-.5)*.055,(r()-.5)*.055];
 const mixColor=(a,b)=>rgb(a).map((v,k)=>Math.max(.035,Math.min(.97,lerp(v,rgb(b)[k],t)+bias[k])));
 const pigments=story.colors[i].map((hex,k)=>mixColor(hex,story.colors[i+1][k]));
 // A shared small luminance bias keeps the ground warm for every seed.
 const ground=rgb(story.grounds[i]).map((v,k)=>Math.max(.035,Math.min(.98,lerp(v,rgb(story.grounds[i+1])[k],t)+bias[0]*.35)));
 return {take,pigments,paletteName:take+' / '+(f===0?story.names[i]:f===1?story.names[i+1]:story.names[i]+' → '+story.names[i+1]),
  background:{color:ground,name:'Smooth warm ground'}};
}
function colorCSS(c){return 'rgb('+c.map(v=>Math.round(v*255)).join(',')+')';}
// UI takes are deterministic children of a birth origin; they do not alter the renderer.
function originTakes(birthday,birthTime){
 if(!calendarMoment(birthday,birthTime,1))throw Error('Enter a birthday and birth time.');
 const origin=`PETALS-${birthday}T${birthTime}`;
 return ['Coral','Spectral','Veil'].map((name,i)=>({name,seed:origin+' / '+name,index:i}));
}
Object.assign(P,{VERSION,MAX_AGE,NOW_AGE,strokeFill,strokeCoverage,strokeConfig,strokeEnvelope,motion,colorState,colorCSS,takeName,originTakes,life,hueAtAge,randomBirthday,hash,random,identity,genome,state,history,ageFromPosition,positionFromAge,daily,nextDay,calendarMoment});
})(globalThis.Petals=globalThis.Petals||{});