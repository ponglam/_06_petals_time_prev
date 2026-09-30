import './music.js';
import {setHomeTakes} from './home-scenes.js';
import {setInterpretationText,getInterpretation,restoreInterpretation,exportWithInterpretation} from './interpretation.js';
const $=id=>document.getElementById(id),P=window.Petals,app=window.petalsApp;
const moments=[1,3651,7301,10951,14601],labels=['−20 YEARS','−10 YEARS','NOW','+10 YEARS','+20 YEARS'];
const status=text=>$('status').textContent=text;
const phrases=['A life, unfolding.','What softens can still hold its shape.','Every petal remembers another season.','Some changes arrive like light through a membrane.','Between what was and what becomes, a moment opens.'];
let phraseIndex=0,thumbnailRenderer,lastSeed,lastOrigin,thumbnails=[];
function download(blob,name){if(!blob)throw Error('The image could not be saved.');const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
function birth(){return {birthday:$('birthday').value,birthTime:$('birth-time').value};}
function update(id){
 const life=P.life(id.ageDays),offset=id.ageDays-P.NOW_AGE;
 $('seed-label').textContent=P.hash(id.seed).toString(16).toUpperCase().padStart(8,'0');
 const chroma=P.colorState(id.seed,id.ageDays);
 $('palette-name').textContent=chroma.paletteName;
 $('ground-name').textContent=chroma.background.name;
 $('ground-swatch').style.background=P.colorCSS(chroma.background.color);
 $('chapter-state').textContent=life.u<.25?'Slender / curved · beginning to unfold':life.u<.65?'Full / rounded · opening outward':'Folded / softened · carrying memory';
 $('art-label').textContent='BOTANICAL PORTRAIT';
 $('time').setAttribute('aria-valuetext',offset===0?'Now':`${offset<0?'Minus':'Plus'} ${Math.abs(offset/365).toFixed(2)} years`);
 $('swatches').replaceChildren(...chroma.pigments.map(c=>{const s=document.createElement('span');s.style.background=P.colorCSS(c);s.title=P.colorCSS(c);return s;}));
 document.querySelectorAll('.moment').forEach((b,i)=>b.setAttribute('aria-pressed',String(id.ageDays===moments[i])));
 $('construction-note').textContent='The same botanical identity changes through forty virtual years. Shape, pigment and memory evolve continuously.';
 const originKey=$('birthday').value+'T'+$('birth-time').value;
 if(id.seed!==lastSeed||originKey!==lastOrigin){lastSeed=id.seed;lastOrigin=originKey;phraseIndex=0;buildPreviews(id);}
}
function buildPreviews(id){
 if(!thumbnailRenderer)thumbnailRenderer=new P.Renderer(document.createElement('canvas'),{width:225,height:300});
 thumbnails=moments.map((ageDays,i)=>{thumbnailRenderer.render({...id,ageDays});return {src:thumbnailRenderer.canvas.toDataURL('image/png'),label:labels[i],name:'PETALS botanical memory'};});
 $('passage-grid').replaceChildren(...thumbnails.map((take,i)=>{const b=document.createElement('button');b.type='button';b.className='moment';b.setAttribute('aria-label',`Visit ${labels[i]}`);b.setAttribute('aria-pressed',String(id.ageDays===moments[i]));const img=new Image();img.src=take.src;img.alt='';const label=document.createElement('span');label.textContent=take.label;b.append(img,label);b.onclick=()=>{app.setState({...app.identity,ageDays:moments[i]});status(`Viewing ${labels[i].toLowerCase()}.`);};return b;}));
 setHomeTakes(thumbnails);
 const b=birth();
 const takes=b.birthday&&b.birthTime?P.originTakes(b.birthday,b.birthTime):['Coral','Spectral','Veil'].map((name,index)=>({name,seed:id.seed.replace(/ \/ (Coral|Spectral|Veil)$/,'')+' / '+name,index}));
 $('study-grid').replaceChildren(...takes.map(({seed,name},i)=>{thumbnailRenderer.render({...id,seed,ageDays:P.NOW_AGE});const b=document.createElement('button');b.className='study';b.type='button';b.setAttribute('aria-label',`Explore ${name}`);b.setAttribute('aria-pressed',String(id.seed===seed));const img=new Image();img.src=thumbnailRenderer.canvas.toDataURL();img.alt='';const text=document.createElement('span');text.textContent=`0${i+1} / ${name}`;b.append(img,text);b.onclick=()=>{app.setState({...app.identity,seed});status('A different botanical identity, at the same moment.');};return b;}));
}
if(app){
 document.addEventListener('petals:render',e=>update(e.detail));
 $('birth-form').addEventListener('submit',e=>{e.preventDefault();try{const b=birth();if(!P.calendarMoment(b.birthday,b.birthTime,1))throw Error('Enter a birthday and birth time.');app.setState({seed:P.originTakes(b.birthday,b.birthTime)[0].seed,ageDays:P.NOW_AGE,rendererVersion:P.VERSION});status('Your botanical portrait is ready. Play its passage or explore a moment.');}catch(e){status(e.message);}});
 $('reset').onclick=()=>{app.setState({...app.identity,ageDays:P.NOW_AGE});status('Returned to now.');};
 $('inspire-me').onclick=()=>{setInterpretationText(phrases[(P.hash(lastOrigin+'|'+Math.round(app.identity.ageDays))+phraseIndex++)%phrases.length]);status('A few words for this moment. Make them your own.');};
 $('export').onclick=async()=>{app.pause();$('export').disabled=true;const id={...app.identity},renderer=app.renderer;try{status('Preparing your 2400 × 3200 impression…');await document.fonts.load('400 96px "Cormorant Garamond"');renderer.resize(2400,3200);renderer.render(id);const canvas=exportWithInterpretation(renderer.canvas);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));download(blob,`petals-${P.hash(id.seed).toString(16)}-${id.ageDays}-v${id.rendererVersion}.png`);status('Impression saved · 2400 × 3200 PNG.');}catch(e){status(e.message);}finally{renderer.resize(900,1200);renderer.render(app.identity);$('export').disabled=false;}};
 $('save-recipe').onclick=()=>{app.pause();download(new Blob([JSON.stringify({schemaVersion:1,...app.identity,...birth(),interpretation:getInterpretation()},null,2)],{type:'application/json'}),'petals-recipe.json');status('Recipe saved, including your selected moment and interpretation.');};
 $('load-recipe').onclick=()=>$('recipe-file').click();
 $('recipe-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>100000)throw Error('Recipe file is too large.');const saved=JSON.parse(await file.text()),id=P.identity(saved);if(saved.birthday||saved.birthTime){if(!P.calendarMoment(saved.birthday,saved.birthTime,1))throw Error('Invalid origin fields.');}app.pause();$('birthday').value=saved.birthday||'';$('birth-time').value=saved.birthTime||'';restoreInterpretation(saved.interpretation);app.setState(id);status('Recipe restored.');}catch(e){status(e.message);}finally{e.target.value='';}};
 $('construction-steps').replaceChildren(...['A seed defines persistent flower anchors and petal proportions.','Slow life stages change contours, roundness, curvature and folds.','Each animated frame advances one virtual day.','Historical states blend through pigment, fibres and selective softness.','The birthday and time label the virtual centre; the wall clock does not drive the artwork.'].map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 update(app.identity);
}
