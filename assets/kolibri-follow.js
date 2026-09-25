/** HausHoch Consult – drop-in Kolibri cursor tracking v2 */
(()=>{const reduce=matchMedia('(prefers-reduced-motion:reduce)'),coarse=matchMedia('(pointer:coarse)');if(reduce.matches||coarse.matches)return;
const m=[...document.querySelectorAll('video,img')].find(el=>/kolibri|hummingbird/i.test([el.currentSrc,el.src,el.poster,el.alt].filter(Boolean).join(' ')));if(!m)return;
const s=m.closest('section')||m.parentElement,b=m.parentElement;if(!s||!b||b.dataset.kolibriTracking==='2')return;
b.dataset.kolibriTracking='2';b.style.willChange='transform,filter';b.style.transformStyle='preserve-3d';b.style.transformOrigin='54% 52%';
const eye=b.querySelector?.('.eye');const t={x:0,y:0,a:0},c={x:0,y:0,a:0},g={x:0,y:0,a:0};let f=0;
const cl=(v,a,z)=>Math.max(a,Math.min(z,v)),kick=()=>{if(!f)f=requestAnimationFrame(k)};
function p(ev){const r=b.getBoundingClientRect(),cx=r.left+r.width*.54,cy=r.top+r.height*.5,sx=Math.max(innerWidth*.42,r.width*.72),sy=Math.max(innerHeight*.42,r.height*.9);t.x=cl((ev.clientX-cx)/sx,-1,1);t.y=cl((ev.clientY-cy)/sy,-1,1);t.a=1;kick()}
function l(){t.x=t.y=t.a=0;kick()}
function k(){f=0;const qb=t.a?.075:.055,qg=t.a?.22:.13;c.x+=(t.x-c.x)*qb;c.y+=(t.y-c.y)*qb;c.a+=(t.a-c.a)*.075;g.x+=(t.x-g.x)*qg;g.y+=(t.y-g.y)*qg;g.a+=(t.a-g.a)*.18;
const x=c.x*c.a,y=c.y*c.a,gx=g.x*g.a,gy=g.y*g.a;
b.style.transform=`translate3d(${(x*12).toFixed(2)}px,${(y*7).toFixed(2)}px,${(c.a*8).toFixed(2)}px) rotateX(${(-y*5.7).toFixed(3)}deg) rotateY(${(x*8.6).toFixed(3)}deg) rotateZ(${((-x*.55)-(x*y*.9)).toFixed(3)}deg) scale(${(1+c.a*.009).toFixed(4)})`;
b.style.filter=`drop-shadow(${(-x*12).toFixed(2)}px ${(22-y*5).toFixed(2)}px ${(28+c.a*4).toFixed(2)}px rgba(28,20,16,.20))`;
if(eye){eye.style.setProperty('--ex',(gx*4.6).toFixed(2)+'px');eye.style.setProperty('--ey',(gy*3).toFixed(2)+'px')}
if(Math.abs(t.x-c.x)>.001||Math.abs(t.y-c.y)>.001||Math.abs(t.a-c.a)>.001||Math.abs(t.x-g.x)>.001||Math.abs(t.y-g.y)>.001)kick()}
s.addEventListener('pointermove',p,{passive:true});s.addEventListener('pointerenter',p,{passive:true});s.addEventListener('pointerleave',l,{passive:true});addEventListener('blur',l,{passive:true})
})();