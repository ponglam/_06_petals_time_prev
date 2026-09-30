(() => {
 'use strict';
 const $ = id => document.getElementById(id), P = Petals;
 const params = new URLSearchParams(location.hash.slice(1));
 let renderer, id, playing = false, frameRequest = 0, lastFrame = null;
 let pace = 12, renderedFrames = 0;
 $('birthday').value = params.get('birthday') || '';
 $('birth-time').value = params.get('birthTime') || '';
 function birthData(){return {birthday:$('birthday').value,birthTime:$('birth-time').value};}
 function calendar(){try{$('calendar').textContent=P.calendarMoment($('birthday').value,$('birth-time').value,id.ageDays-P.NOW_AGE+1)||'Enter a birthday and time';}catch(e){$('calendar').textContent=e.message;}}
 function fail(e) { pause(); $('error').hidden = false; $('error').textContent = e.message; }
 function show() {
  try {
   id = P.identity(id);
   renderer.render(id);
   calendar();
   renderedFrames++;
   $('error').hidden = true;
   $('identity').textContent = id.seed + ' / PETALS';
   const offset=id.ageDays-P.NOW_AGE;
   $('days').textContent=offset===0?'Now':(offset>0?'+':'−')+Math.abs(offset).toLocaleString('en',{maximumFractionDigits:2})+' days';
   $('age-label').textContent=offset===0?'Now':(offset>0?'+':'−')+Number((Math.abs(offset)/365).toFixed(2))+' years';
   const life=P.life(id.ageDays);
   $('phase').textContent=life.u<.25?'Slender, searching, unfolding.':life.u<.65?'Fuller, rounder, opening outward.':'Folding, softening, carrying traces.';
   $('time').value = P.positionFromAge(id.ageDays);
   document.querySelectorAll('[data-day]').forEach(b => b.classList.toggle('active', +b.dataset.day === id.ageDays));
   history.replaceState(null,'','#'+new URLSearchParams({...id,...birthData()}));
   document.dispatchEvent(new CustomEvent('petals:render',{detail:id}));
   return true;
  } catch (e) { fail(e); return false; }
 }
 function playbackUI() {
  $('play').textContent = playing ? 'Ⅱ  Stop passage' : id?.ageDays >= P.MAX_AGE ? '↺ Replay passage' : '▷  Play passage';
  $('play').setAttribute('aria-pressed',String(playing));
  $('play').setAttribute('aria-label',playing ? 'Stop animation' : 'Play animation');
  $('play-status').textContent = playing ? 'One frame · one day' : id?.ageDays >= P.MAX_AGE ? '+20 years · complete' : 'Stopped · drag backward or forward';
 }
 function pause() {
  playing = false; cancelAnimationFrame(frameRequest); frameRequest = 0; lastFrame = null; playbackUI();
 }
 // Browser timestamps only pace presentation. Never multiply elapsed time into age,
 // catch up dropped frames, or use them in morphology: each rendered step is one day.
 function tick(timestamp) {
  if (!playing) return;
  if (document.hidden) { lastFrame = null; frameRequest = requestAnimationFrame(tick); return; }
  if (lastFrame === null) lastFrame = timestamp;
  if (timestamp-lastFrame >= 1000/pace) {
   lastFrame = timestamp;
   id = {...id, ageDays:P.nextDay(id.ageDays)};
   if (!show()) return;
   if (id.ageDays === P.MAX_AGE) { pause(); return; }
  }
  frameRequest = requestAnimationFrame(tick);
 }
 function play() {
  if (playing) return;
  if (id.ageDays >= P.MAX_AGE) { id = {...id,ageDays:P.NOW_AGE}; if (!show()) return; }
  playing = true; lastFrame = null; playbackUI(); frameRequest = requestAnimationFrame(tick);
 }
 function selectAge(ageDays) { pause(); id = {...id,ageDays}; show(); playbackUI(); }
 function selectSeed() {
  pause();
  try { id = P.identity({...id,seed:$('seed').value}); if (show()) play(); }
  catch (e) { fail(e); }
 }
 function download(blob,name) {
  const a = document.createElement('a'), url = URL.createObjectURL(blob);
  a.href = url; a.download = name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 try {
  // Older renderer identities remain available at versions/0.1.0/index.html.
  id = P.identity({seed:params.get('seed')||'PETALS-001',ageDays:params.has('ageDays')?Number(params.get('ageDays')):P.NOW_AGE,rendererVersion:params.get('rendererVersion')||P.VERSION,type:params.get('type')||'PETALS'});
  $('seed').value = id.seed;
  renderer = new P.Renderer($('artwork'));
  if (!show()) return;
  window.petalsApp = {renderer,get identity(){return id;},get playing(){return playing;},get renderedFrames(){return renderedFrames;},play,pause,setState(next){pause();id=P.identity(next);$('seed').value=id.seed;show();}};
 } catch(e) { fail(e); return; }
 for(const field of [$('birthday'),$('birth-time')]){field.addEventListener('focus',pause);field.addEventListener('change',()=>{calendar();history.replaceState(null,'','#'+new URLSearchParams({...id,...birthData()}));});}
 $('random-birth').onclick=()=>{pause();const words=crypto.getRandomValues(new Uint32Array(2)),birth=P.randomBirthday(words);$('birthday').value=birth.birthday;$('birth-time').value=birth.birthTime;id={...id,ageDays:P.NOW_AGE};$('birth-form').requestSubmit();};
 $('play').onclick = () => playing ? pause() : play();
 $('step').onclick = () => selectAge(P.nextDay(id.ageDays));
 $('speed').onchange = e => { pace = Number(e.target.value); lastFrame = null; };
 $('seed').addEventListener('focus',pause);
 $('seed-form').addEventListener('submit',e=>{e.preventDefault();selectSeed();});
 $('time').addEventListener('input',e=>selectAge(P.ageFromPosition(+e.target.value)));
 document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>selectAge(+b.dataset.day));
 document.querySelectorAll('[data-seed]').forEach(b=>b.onclick=()=>{$('seed').value=b.dataset.seed;selectSeed();});
 $('export').onclick=()=>{pause();const snapshot=id;$('artwork').toBlob(blob=>{if(blob)download(blob,`PETALS-${P.hash(snapshot.seed).toString(16)}-day-${snapshot.ageDays}-v${snapshot.rendererVersion}.png`);});};
 $('metadata').onclick=()=>{pause();download(new Blob([JSON.stringify({...id,...birthData(),resolution:[900,1200]},null,2)],{type:'application/json'}),'PETALS-identity.json');};
 $('artwork').addEventListener('webglcontextlost',e=>{e.preventDefault();fail(Error('Graphics context interrupted. Restoring this moment…'));});
 $('artwork').addEventListener('webglcontextrestored',()=>{renderer=new P.Renderer($('artwork'));window.petalsApp.renderer=renderer;show();});
 playbackUI();
})();
