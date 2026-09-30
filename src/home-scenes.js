const rooms=[
 ['01-reading','A quiet page',[[879,151],[1195,128],[1195,549],[879,550]]],
 ['02-dining','Together at the table',[[618,104],[932,95],[931,535],[617,535]]],
 ['03-drawing','Making something together',[[577,49],[895,38],[895,483],[577,488]]],
 ['05-studio','A moment between things',[[661,137],[1002,126],[1002,597],[661,597]]],
 ['04-growing','Room to grow',[[901,184],[1138,173],[1138,493],[901,493]]]
];
// Map a square to the four corners of the photographed paper, preserving perspective.
function transform(points,scale){const rows=[];[[0,0],[100,0],[100,100],[0,100]].forEach(([x,y],i)=>{const [u,v]=points[i].map(n=>n*scale);rows.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);});for(let i=0;i<8;i++){let p=i;for(let j=i+1;j<8;j++)if(Math.abs(rows[j][i])>Math.abs(rows[p][i]))p=j;[rows[i],rows[p]]=[rows[p],rows[i]];const d=rows[i][i];rows[i]=rows[i].map(n=>n/d);for(let j=0;j<8;j++)if(j!==i){const f=rows[j][i];rows[j]=rows[j].map((n,k)=>n-f*rows[i][k]);}}const h=rows.map(r=>r[8]);return `matrix3d(${[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,1].join(',')})`;}
const cards=rooms.map(([file,title,corners])=>{const card=document.createElement('figure'),photo=document.createElement('div'),room=document.createElement('img'),print=document.createElement('img'),caption=document.createElement('figcaption');card.className='home-card';photo.className='home-photo';room.className='home-room';room.src=`assets/interiors/${file}.png`;room.alt=title;room.loading='lazy';print.className='home-print';print.alt='';photo.append(room,print);card.append(photo,caption);document.getElementById('home-strip').append(card);new ResizeObserver(()=>{print.style.transform=transform(corners,photo.clientWidth/1448);}).observe(photo);return {print,caption,title};});
export function setHomeTakes(takes){cards.forEach((card,i)=>{const take=takes[i];card.print.src=take.src;card.print.alt=`${take.label}: ${take.name}`;card.caption.textContent=`${take.label} · ${card.title}`;});}
