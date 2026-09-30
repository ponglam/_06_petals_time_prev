(function(P){
const quad=`#version 300 es
precision highp float;
out vec2 uv;
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);uv=p;gl_Position=vec4(p*2.-1.,0,1);}`;
const petalVert=`#version 300 es
precision highp float;
uniform vec2 root;uniform vec2 scale;uniform float angle;out vec2 q;
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);q=vec2((p.x*2.-1.)*1.55,p.y*1.5-.2);vec2 v=q*scale;float c=cos(angle),s=sin(angle);vec2 w=root+mat2(c,s,-s,c)*v;gl_Position=vec4(w.x/0.75,w.y,0,1);}`;
const noise=`float hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}float fbm(vec2 p){return .57*noise(p)+.28*noise(p*2.13)+.15*noise(p*4.27);}`;
const petalFrag=`#version 300 es
precision highp float;
in vec2 q;out vec4 frag;
uniform float curl,phase,tint,age,ghost,weight,spectral,stem;
uniform float roundness,fillRetention;
uniform float strokeEnabled,strokeCycles,strokePhase,strokeWidth;
uniform vec3 pigment0,pigment1,pigment2,pigment3;
uniform float edgeWave,edgePhase,contour,fold,tip;
${noise}
void main(){
float y=stem>.5?q.y:q.y/(1.+tip);float n=fbm(vec2(q.x*6.+phase,y*8.));
if(stem>.5){float d=abs(q.x-.25*sin(y*3.+phase));float a=exp(-d*d*500.)*smoothstep(-.1,.06,y)*(1.-smoothstep(.8,1.1,y));frag=vec4(vec3(.11,.085,.09)*a*weight,a);return;}
float x=q.x-curl*sin(y*2.8)-.045*sin(y*13.+phase)-fold*sin(y*5.2)*y;
float width=pow(max(0.,sin(clamp(y,0.,1.)*3.14159)),roundness)*(.72+.19*y+contour*sin(y*4.6));
float scallop=edgeWave*(.64*sin(x*19.+edgePhase)+.36*sin(x*39.-edgePhase*.7+y*5.));
float sideWave=edgeWave*sin(y*22.+edgePhase+x*3.)*sin(clamp(y,0.,1.)*3.14159);
float dist=abs(x)-width-(n-.5)*.085-sideWave-scallop*smoothstep(.65,1.,y);
float soft=.012+.038*noise(vec2(y*8.,phase))+.065*ghost;
float mask=(1.-smoothstep(-soft,soft,dist))*smoothstep(-.015,.06,y)*(1.-smoothstep(.98+scallop,.98+scallop+soft,y));
float fan=x/(.13+width)+.07*sin(y*7.+phase);float freq=175.+phase*9.;
float f=sin(fan*freq+noise(vec2(fan*28.,y*3.))*3.);
float fibre=pow(.5+.5*f,12.)*(.4+.6*noise(vec2(fan*75.,y*13.)));
float veins=pow(.5+.5*sin(fan*36.+sin(y*5.+phase)),22.);
float textureNoise=clamp(.5+(n-.5)*1.15,0.,1.);
float density=(.23+.44*textureNoise+1.15*(.22*fibre+.12*veins))*(.6+.4*sin(y*3.));
density*=1.-.27*age*noise(q*16.+phase);
density*=1.15; // Fifteen percent stronger fill; stroke opacity stays separately capped.
// These same four source pigments drive the visible palette swatches.
vec3 source=mix(pigment0,pigment1,smoothstep(.08,.8,y+n*.2));
source=mix(source,pigment2,smoothstep(.38,.92,tint)*smoothstep(.25,1.,y));
source=mix(source,pigment3,(.15+.35*spectral)*smoothstep(.1,.9,n+tint*.3));
vec3 pigment=-log(max(source,vec3(.035)))/2.5;
// One closed contour, tapered by a periodic envelope rather than a dashed mask.
// Integer cycles make both the opacity and width seamless at the wrap point.
float contourPosition=(atan(x,y-.5)+3.14159265)/6.2831853;
float pulse=.5-.5*cos(contourPosition*strokeCycles*6.2831853+strokePhase);
float contourField=max(dist,max(.015-y,y-(.98+scallop)));
float aa=max(fwidth(contourField),.001);
float line=1.-smoothstep(strokeWidth*pulse,strokeWidth*pulse+aa,abs(contourField));
float strokeAlpha=strokeEnabled*.6*pulse*line*(1.-ghost*.65);
// Convert the 0–60% optical opacity envelope to absorption for our pigment compositor.
vec3 strokePigment=-log(max(mix(pigment2,pigment3,.25),vec3(.035)))/2.5;
float strokeDensity=-log(max(1.-strokeAlpha,.4));
frag=vec4(pigment*mask*density*weight*fillRetention+strokePigment*strokeDensity,
 mask*density*weight*fillRetention+strokeAlpha);

}`;
const accumulate=`#version 300 es
precision highp float;in vec2 uv;out vec4 frag;uniform sampler2D previous,layer;uniform vec2 pixel;uniform float amount;
void main(){vec4 p=texture(previous,uv);vec4 d=texture(previous,uv+vec2(pixel.x*.65,pixel.y*2.2))+texture(previous,uv-vec2(pixel.x*.65,pixel.y*2.2));frag=p*.72+d*.14+texture(layer,uv)*amount;}`;
const composite=`#version 300 es
precision highp float;in vec2 uv;out vec4 frag;uniform sampler2D image;uniform vec2 pixel;uniform float age,phase;
uniform vec3 ground;
${noise}
void main(){vec3 d=texture(image,uv).rgb;vec2 flow=vec2(sin(uv.y*8.+phase)*.4,1.);vec3 blur=vec3(0);for(int i=-4;i<=4;i++){blur+=texture(image,uv+flow*pixel*float(i)*3.).rgb/9.;}float local= .16+.24*noise(uv*7.+phase);d=mix(d,blur,local);d.r=mix(d.r,texture(image,uv+pixel*vec2(1.5,3.)*age).r,.2);d.b=mix(d.b,texture(image,uv-pixel*vec2(1.,2.)*age).b,.2);vec3 paper=ground;vec3 color=paper*exp(-d*2.5);color+=.04*(1.-exp(-blur*2.));frag=vec4(color,1);}`;
P.shaders={quad,petalVert,petalFrag,accumulate,composite};
})(globalThis.Petals);