const $=id=>document.getElementById(id),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const defaults=()=>({visible:false,text:'A life, unfolding.',x:.1,y:.80,w:.4,h:.08,fontSize:.048,font:'serif',color:'black'});
let state=defaults();
const box=$('interpretation-box'),input=$('interpretation-text'),paper=$('artwork');
const meter=document.createElement('canvas').getContext('2d');
const fontFamily=()=>state.font==='serif'?'"Cormorant Garamond", Georgia, serif':'Arial, Helvetica, sans-serif';
function wrap(text,width,ctx){const lines=[];for(const paragraph of text.split('\n')){let line='';for(const token of paragraph.match(/\S+|\s+/g)||[]){if(line&&ctx.measureText(line+token).width>width){lines.push(line.trimEnd());line='';if(/^\s+$/.test(token))continue;}for(const c of token){if(line&&ctx.measureText(line+c).width>width){lines.push(line);line='';}line+=c;}}lines.push(line);}return lines;}
function layout(W,H){const pad=W*.014,size=W*state.fontSize;meter.font=`normal 400 ${size}px ${fontFamily()}`;
 const maxW=W*(1-state.x),maxH=H*(1-state.y);
 const natural=Math.max(size*3,...state.text.split('\n').map(t=>meter.measureText(t||' ').width));
 const width=Math.min(maxW,natural+pad*2+2),lines=wrap(state.text,Math.max(1,width-pad*2-2),meter),height=Math.min(maxH,lines.length*size*1.3+pad*2+2);
 return {pad,size,width,height,lines,lineHeight:size*1.3};
}
function update(){const W=paper.clientWidth,H=paper.clientHeight;if(!W||!H)return;
 const l=layout(W,H);state.w=l.width/W;state.h=l.height/H;
 box.hidden=!state.visible;$('interpretation-toggle').textContent=state.visible?'Hide interpretation text':'Add your own interpretation text';$('interpretation-toggle').setAttribute('aria-expanded',String(state.visible));
 Object.assign(box.style,{left:`${state.x*100}%`,top:`${state.y*100}%`,width:`${state.w*100}%`,height:`${state.h*100}%`});
 Object.assign(input.style,{fontFamily:fontFamily(),color:state.color,fontSize:`${l.size}px`,lineHeight:'1.3',padding:`${l.pad}px`});
 $('interpretation-font').value=state.font;$('interpretation-color').value=state.color;
}
$('interpretation-toggle').addEventListener('click',()=>{state.visible=!state.visible;update();if(state.visible)input.focus({preventScroll:true});});
input.addEventListener('input',()=>{state.text=input.value;update();});
$('interpretation-font').addEventListener('change',e=>{state.font=e.target.value;update();});$('interpretation-color').addEventListener('change',e=>{state.color=e.target.value;update();});
function handle(id,resize){const el=$(id);let drag;
 el.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();const r=paper.getBoundingClientRect();drag={px:e.clientX,py:e.clientY,start:{...state},W:r.width,H:r.height};el.setPointerCapture(e.pointerId);});
 el.addEventListener('pointermove',e=>{if(!drag)return;const dx=(e.clientX-drag.px)/drag.W,dy=(e.clientY-drag.py)/drag.H;
 if(resize){state.fontSize=clamp(drag.start.fontSize*Math.exp((dx+dy)*2.5),.018,.2);}else{state.x=clamp(drag.start.x+dx,0,.92);state.y=clamp(drag.start.y+dy,.065,.94);}update();});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(event,()=>drag=null);
 el.addEventListener('keydown',e=>{const keys={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(!keys[e.key])return;e.preventDefault();const [x,y]=keys[e.key],step=e.shiftKey?.025:.005;
 if(resize)state.fontSize=clamp(state.fontSize+(x+y)*step,.018,.2);else{state.x=clamp(state.x+x*step,0,.92);state.y=clamp(state.y+y*step,.065,.94);}update();});
}
handle('interpretation-move',false);handle('interpretation-resize',true);
input.value=state.text;new ResizeObserver(update).observe(paper);document.fonts.ready.then(update);update();
export function getInterpretation(){return {...state};}
export function restoreInterpretation(value){state=defaults();if(value&&typeof value==='object'){
 for(const k of ['x','y','fontSize'])if(typeof value[k]==='number'&&Number.isFinite(value[k]))state[k]=value[k];
 state.x=clamp(state.x,0,.92);state.y=clamp(state.y,.065,.94);state.fontSize=clamp(state.fontSize,.018,.2);
 state.visible=value.visible===true;state.text=typeof value.text==='string'?value.text.slice(0,10000):'';state.font=value.font==='sans'?'sans':'serif';state.color=value.color==='white'?'white':'black';
 }input.value=state.text;update();}
export function exportWithInterpretation(artwork){if(!state.visible||!state.text)return artwork;
 const output=document.createElement('canvas');output.width=artwork.width;output.height=artwork.height;const ctx=output.getContext('2d');ctx.drawImage(artwork,0,0);
 const W=output.width,H=output.height,l=layout(W,H),x=state.x*W,y=state.y*H;
 ctx.save();ctx.beginPath();ctx.rect(x,y,l.width,l.height);ctx.clip();ctx.font=`normal 400 ${l.size}px ${fontFamily()}`;ctx.fillStyle=state.color;ctx.textBaseline='top';
 l.lines.forEach((line,i)=>ctx.fillText(line,x+l.pad,y+l.pad+i*l.lineHeight));ctx.restore();return output;
}

function fitInspiredText(){
 const W=paper.clientWidth,H=paper.clientHeight;if(!W||!H)return;
 update();
 // Include the browser's actual wrapping and both holder borders.
 const l=layout(W,H),needed=Math.max(input.scrollHeight+2,l.lines.length*l.lineHeight+2*l.pad+4);
 const height=Math.min(needed,H*(1-.065));
 state.y=Math.max(.065,Math.min(state.y,1-height/H));
 update();
 state.h=height/H;box.style.height=`${state.h*100}%`;
 input.scrollTop=0;input.scrollLeft=0;
}
export function setInterpretationText(text){
 state.text=text;state.visible=true;input.value=text;fitInspiredText();
 document.fonts.ready.then(()=>{if(state.text===text)fitInspiredText();});
}
