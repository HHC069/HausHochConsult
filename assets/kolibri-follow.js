/** HausHoch Consult – drop-in Kolibri cursor tracking v2 */
(()=>{const reduce=matchMedia('(prefers-reduced-motion:reduce)'),coarse=matchMedia('(pointer:coarse)');if(reduce.matches||coarse.matches)return;
const m=[...document.querySelectorAll('video,img')].find(el=>/kolibri|hummingbird/i.test([el.currentSrc,el.src,el.poster,el.alt].filter(Boolean).join(' ')));if(!m)return;
const s=m.closest('section')||m.parentElement,b=m.parentElement;if(!s||!b||b.dataset.kolibriTracking==='2')return;
b.dataset.kolibriTracking='2';b.style.willChange='transform,filter';b.style.transformStyle='preserve-3d';b.style.transformOrigin='54% 52%';
const eye=b.querySelector?.('.eye'),t={x:0,y:0,a:0},body={x:0,y:0,a:0},look={x:0,y:0,a:0};let raf=0;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v)),kick=()=>{if(!raf)raf=requestAnimationFrame(tick)};
function point(ev){const r=b.getBoundingClientRect(),cx=r.left+r.width*.54,cy=r.top+r.height*.5,sx=Math.max(innerWidth*.42,r.width*.72),sy=Math.max(innerHeight*.42,r.height*.9);t.x=clamp((ev.clientX-cx)/sx,-1,1);t.y=clamp((ev.clientY-cy)/sy,-1,1);t.a=1;kick()}
function reset(){t.x=t.y=t.a=0;kick()}
function tick(){raf=0;const follow=t.a?.075:.055,focus=t.a?.22:.13;body.x+=(t.x-body.x)*follow;body.y+=(t.y-body.y)*follow;body.a+=(t.a-body.a)*.075;look.x+=(t.x-look.x)*focus;look.y+=(t.y-look.y)*focus;look.a+=(t.a-look.a)*.18;
const x=body.x*body.a,y=body.y*body.a,gx=look.x*look.a,gy=look.y*look.a;
b.style.transform=`translate3d(${(x*12).toFixed(2)}px,${(y*7).toFixed(2)}px,${(body.a*8).toFixed(2)}px) rotateX(${(-y*5.7).toFixed(3)}deg) rotateY(${(x*8.6).toFixed(3)}deg) rotateZ(${((-x*.55)-(x*y*.9)).toFixed(3)}deg) scale(${(1+body.a*.009).toFixed(4)})`;
b.style.filter=`drop-shadow(${(-x*12).toFixed(2)}px ${(22-y*5).toFixed(2)}px ${(28+body.a*4).toFixed(2)}px rgba(28,20,16,.20))`;
if(eye){eye.style.setProperty('--ex',(gx*4.6).toFixed(2)+'px');eye.style.setProperty('--ey',(gy*3.0).toFixed(2)+'px')}
if(Math.abs(t.x-body.x)>.001||Math.abs(t.y-body.y)>.001||Math.abs(t.a-body.a)>.001||Math.abs(t.x-look.x)>.001||Math.abs(t.y-look.y)>.001)kick()}
s.addEventListener('pointermove',point,{passive:true});s.addEventListener('pointerenter',point,{passive:true});s.addEventListener('pointerleave',reset,{passive:true});addEventListener('blur',reset,{passive:true})
})();