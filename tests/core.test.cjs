const {test}=require('node:test');const assert=require('node:assert/strict');require('../src/core/model.js');const P=globalThis.Petals;
test('seed identity and genome persist',()=>{assert.deepEqual(P.genome('a'),P.genome('a'));assert.notDeepEqual(P.genome('a'),P.genome('b'));});
test('milestones round trip through perceptual timeline',()=>{for(const d of[1,10,100,365,3650,7300])assert.ok(Math.abs(P.ageFromPosition(P.positionFromAge(d))-d)<1e-8);});
test('virtual history is ordered and bounded',()=>{for(const d of[1,10,100,365,3650,7300]){const h=P.history(d);assert.equal(h.at(-1),d);assert.ok(h.every((v,i)=>v>=1&&v<=d&&(!i||v>=h[i-1])));}});
test('continuous morphology at day boundaries',()=>{const g=P.genome('a');for(const d of[10,100,365,3650]){const a=P.state(g,d-1e-5),b=P.state(g,d+1e-5);for(const k of Object.keys(a))assert.ok(Math.abs(a[k]-b[k])<1e-5);}});
test('identity validates inputs and version',()=>{for(const ageDays of[NaN,Infinity,0,14602])assert.throws(()=>P.identity({ageDays}));assert.throws(()=>P.identity({rendererVersion:'2'}));assert.throws(()=>P.identity({seed:''}));assert.equal(P.identity({ageDays:1.12345678}).ageDays,1.123457);});
test('daily contour changes independently of overall growth',()=>{for(const day of [1,10,100,365,3650,7299]){const a=P.daily(1.2,day),b=P.daily(1.2,day+1);assert.ok(Math.abs(a.arc-b.arc)+Math.abs(a.curl-b.curl)+Math.abs(a.contour-b.contour)>.01);assert.deepEqual(a,P.daily(1.2,day));}});
test('daily morphology is continuous at integer days',()=>{for(const day of[10,365,3650]){const a=P.daily(.7,day-1e-6),b=P.daily(.7,day+1e-6);for(const k of Object.keys(a))assert.ok(Math.abs(a[k]-b[k])<1e-5);}});
test('one animation step advances exactly one day and stops at twenty years',()=>{assert.equal(P.nextDay(365),366);assert.equal(P.nextDay(805.272493),806);assert.equal(P.nextDay(14601),14601);});

test('birthday calendar preserves time and handles leap dates',()=>{assert.equal(P.calendarMoment('2000-02-28','13:45',1),'2000-02-28 · 13:45');assert.equal(P.calendarMoment('2000-02-28','13:45',2),'2000-02-29 · 13:45');assert.equal(P.calendarMoment('2000-02-28','13:45',3),'2000-03-01 · 13:45');assert.equal(P.calendarMoment('2000-02-28','13:45',1.5),'2000-02-29 · 01:45');assert.equal(P.calendarMoment('','',1),null);assert.throws(()=>P.calendarMoment('2001-02-29','12:00',1));});

test('symmetric timeline has exact Now and endpoints',()=>{assert.equal(P.ageFromPosition(0),1);assert.equal(P.ageFromPosition(.5),P.NOW_AGE);assert.equal(P.ageFromPosition(1),14601);assert.equal(P.positionFromAge(P.NOW_AGE),.5);assert.equal(P.hueAtAge(P.NOW_AGE),0);assert.ok(P.hueAtAge(1)<-1);assert.ok(P.hueAtAge(14601)>1);});
test('random birthday mapping returns valid dates and times at bounds',()=>{for(const words of [[0,0],[4294967295,4294967295],[123456789,3141592653]]){const b=P.randomBirthday(words);assert.ok(P.calendarMoment(b.birthday,b.birthTime,1));assert.deepEqual(b,P.randomBirthday(words));}});

test('life stages change proportions and roundness continuously',()=>{const young=P.life(1),mid=P.life(P.NOW_AGE),old=P.life(P.MAX_AGE);assert.ok(mid.width>young.width*2);assert.ok(mid.roundness<young.roundness*.5);assert.ok(old.fold>mid.fold);for(const d of[3651,7301,10951]){const a=P.life(d-1e-5),b=P.life(d+1e-5);for(const k of Object.keys(a))assert.ok(Math.abs(a[k]-b[k])<1e-5);}});

test('birth origin determines all three takes',()=>{const a=P.originTakes('1990-08-23','14:37');assert.deepEqual(a,P.originTakes('1990-08-23','14:37'));assert.equal(new Set(a.map(t=>t.seed)).size,3);assert.notDeepEqual(a,P.originTakes('1990-08-23','14:38'));assert.deepEqual(a.map(t=>t.name),['Coral','Spectral','Veil']);assert.throws(()=>P.originTakes('',''));});
test('every take has five distinct pigment and background states',()=>{
 const all=[];
 for(const take of P.originTakes('1990-08-23','14:37')){
  const states=[1,3651,7301,10951,14601].map(day=>P.colorState(take.seed,day));
  assert.equal(new Set(states.map(s=>JSON.stringify(s.pigments))).size,5);
  assert.equal(new Set(states.map(s=>JSON.stringify(s.background.color))).size,5);
  assert.ok(states.every(s=>Object.keys(s.background).sort().join(',')==='color,name'));
  for(const s of states){assert.equal(s.pigments.length,4);assert.ok(s.pigments.every(c=>c.length===3&&c.every(v=>v>0&&v<1)));assert.ok(!s.pigments.some(c=>JSON.stringify(c)===JSON.stringify(s.background.color)));all.push(JSON.stringify(s.pigments));}
 }
 assert.equal(new Set(all).size,15);
});
test('colour and texture interpolate continuously and reproduce out of order',()=>{
 for(const take of P.originTakes('1990-08-23','14:37'))for(const day of [3651,7301,10951]){
  const saved=P.colorState(take.seed,day),a=P.colorState(take.seed,day-.001),b=P.colorState(take.seed,day+.001);
  a.pigments.flat().forEach((v,i)=>assert.ok(Math.abs(v-b.pigments.flat()[i])<.00001));
  a.background.color.forEach((v,i)=>assert.ok(Math.abs(v-b.background.color[i])<.00001));
  P.colorState(take.seed,1);assert.deepEqual(saved,P.colorState(take.seed,day));
 }
});
test('origin changes palette identity without mixing backgrounds into pigments',()=>{const a=P.colorState('PETALS-1990-08-23T14:37 / Coral',7301),b=P.colorState('PETALS-1990-08-23T14:38 / Coral',7301);assert.notDeepEqual(a.pigments,b.pigments);assert.notDeepEqual(a.background,b.background);});

test('warm grounds are texture-free across takes, seeds and years',()=>{
 for(const birthday of ['1990-08-23','1957-07-19'])for(const take of P.originTakes(birthday,'04:50'))for(let day=1;day<=P.MAX_AGE;day+=100){const b=P.colorState(take.seed,day).background;assert.deepEqual(Object.keys(b).sort(),['color','name']);assert.ok(b.color[0]>b.color[1]&&b.color[1]>b.color[2]);}
});
test('independent motion is continuous, bounded and reproducible',()=>{
 for(const phase of [.2,1.4,3.7,5.8]){let min=2,max=0;for(let day=1;day<=P.MAX_AGE;day+=17){const m=P.motion(phase,day);assert.ok(m.scale>=.8&&m.scale<=1.3);assert.ok(Math.abs(m.x)<=.235&&Math.abs(m.y)<=.35);min=Math.min(min,m.scale);max=Math.max(max,m.scale);}assert.ok(max-min>.35);const a=P.motion(phase,7301-.001),b=P.motion(phase,7301+.001);for(const k of Object.keys(a))assert.ok(Math.abs(a[k]-b[k])<1e-5);assert.deepEqual(P.motion(phase,500),P.motion(phase,500));}
 assert.notDeepEqual(P.motion(.2,7301),P.motion(3.7,7301));
});

test('selected petal strokes have stable two-to-five-cycle identities',()=>{
 const configs=[];for(let f=0;f<3;f++)for(let p=0;p<10;p++){const a=P.strokeConfig('test-origin',f,p,1),b=P.strokeConfig('test-origin',f,p,7301);assert.equal(a.cycles,b.cycles);assert.equal(a.width,b.width);assert.ok(Number.isInteger(a.cycles)&&a.cycles>=2&&a.cycles<=5);configs.push(a);}
 assert.ok(configs.some(c=>c.enabled)&&configs.some(c=>!c.enabled));
});
test('stroke width and opacity loop smoothly from zero to sixty percent',()=>{
 for(let n=2;n<=5;n++){assert.equal(P.strokeEnvelope(0,n,0).opacity,0);assert.ok(Math.abs(P.strokeEnvelope(.5/n,n,0).opacity-.6)<1e-12);for(let i=0;i<=1000;i++){const v=P.strokeEnvelope(i/1000,n,.731);assert.ok(v.opacity>=0&&v.opacity<=.6&&v.width>=0&&v.width<=1);}const a=P.strokeEnvelope(0,n,.731),b=P.strokeEnvelope(1,n,.731);assert.ok(Math.abs(a.opacity-b.opacity)<1e-12&&Math.abs(a.width-b.width)<1e-12);}
});

test('effective stroke coverage tracks 35–75 percent across actual petals',()=>{
 for(const seed of ['PETALS-001','PETALS-1957-07-19T04:50 / Coral','IRIS-024']){
  const g=P.genome(seed);let lo=1,hi=0;
  for(let day=1;day<=P.MAX_AGE;day+=73){let total=0,count=0;g.flowers.forEach((f,j)=>f.petals.forEach((p,i)=>{const c=P.strokeConfig(seed,j,i,day);assert.ok(c.strength>=0&&c.strength<=1);total+=c.strength;count++;}));const target=P.strokeCoverage(seed,day);assert.ok(target>=.35-1e-12&&target<=.75+1e-12);assert.ok(Math.abs(total/count-target)<1e-12);lo=Math.min(lo,target);hi=Math.max(hi,target);}
  assert.ok(lo<.351&&hi>.749);
  g.flowers.forEach((f,j)=>f.petals.forEach((p,i)=>{const a=P.strokeConfig(seed,j,i,5000-.001),b=P.strokeConfig(seed,j,i,5000+.001);assert.ok(Math.abs(a.strength-b.strength)<.0001);}));
 }
});

test('stroke base widths use the reduced 0.004–0.010 range',()=>{for(let i=0;i<50;i++){const s=P.strokeConfig('width-test',0,i,7301);assert.ok(s.width>=.004&&s.width<.010);}});

test('stroked petal fills fade after Now and reach zero at +20 years',()=>{
 for(const strength of [.001,.25,1]){assert.equal(P.strokeFill(1,strength),1);assert.equal(P.strokeFill(P.NOW_AGE,strength),1);assert.equal(P.strokeFill(P.MAX_AGE,strength),0);let previous=1;for(let day=P.NOW_AGE;day<=P.MAX_AGE;day+=10){const fill=P.strokeFill(day,strength);assert.ok(fill<=previous&&fill>=0);previous=fill;}}
 for(const day of [1,7301,10000,14601])assert.equal(P.strokeFill(day,0),1);
 assert.equal(P.strokeFill(10951,1),.5);
});
