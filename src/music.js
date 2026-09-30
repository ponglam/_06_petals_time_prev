const audio=document.getElementById('music-audio'),play=document.getElementById('music-play'),next=document.getElementById('music-next'),name=document.getElementById('music-name');
let tracks=[],index=0,awaitingGesture=false,userPaused=false,attempt=0;
function sync(){const playing=!audio.paused;play.textContent=playing?'Ⅱ':'▷';play.setAttribute('aria-label',playing?'Pause music':'Play music');play.title=playing?'Pause music':'Play music';}
function pick(){const word=crypto.getRandomValues(new Uint32Array(1))[0];index=tracks.length<2?0:(index+1+Math.floor(word/4294967296*(tracks.length-1)))%tracks.length;}
function select(){audio.src=tracks[index].src;name.textContent=tracks[index].name;name.title=tracks[index].name;}
async function start(){if(!tracks.length||userPaused)return;const token=++attempt;try{await audio.play();if(token!==attempt||userPaused)return;awaitingGesture=false;name.textContent=tracks[index].name;sync();}catch(error){if(token!==attempt||userPaused)return;awaitingGesture=error.name==='NotAllowedError';name.textContent=tracks[index].name+(awaitingGesture?' · tap anywhere to listen':' · tap play to retry');sync();}}
play.addEventListener('click',()=>{if(!tracks.length)return;if(audio.paused){userPaused=false;start();}else{userPaused=true;awaitingGesture=false;attempt++;audio.pause();}});
next.addEventListener('click',()=>{if(!tracks.length)return;userPaused=false;pick();select();start();});
audio.addEventListener('ended',()=>{if(userPaused)return;pick();select();start();});
function unlock(event){if(!awaitingGesture||userPaused||event.isTrusted===false||event.target?.closest?.('.music-player'))return;awaitingGesture=false;start();}
document.addEventListener('pointerdown',unlock);
document.addEventListener('keydown',unlock);
for(const event of ['play','pause','emptied'])audio.addEventListener(event,sync);
audio.addEventListener('error',()=>{awaitingGesture=false;name.textContent=(tracks[index]?.name||'Music')+' · unavailable';sync();});
play.disabled=next.disabled=true;
fetch('music/playlist.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(list=>{tracks=list;if(!tracks.length)throw Error();index=Math.floor(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296*tracks.length);select();play.disabled=false;next.disabled=tracks.length<2;start();}).catch(()=>{name.textContent='No music available';});
