/* ===== Premium shared interactions ===== */
(function(){
  // Loader with % count
  const l=document.querySelector('.loader');
  const pct=document.querySelector('.lpct');
  if(pct){let p=0;const t=setInterval(()=>{p+=Math.random()*18;if(p>=100){p=100;clearInterval(t);}pct.textContent=Math.floor(p)+'%';},120);}
  window.addEventListener('load',()=>{if(l)setTimeout(()=>l.classList.add('done'),1800);});

  // Custom cursor + view label
  const dot=document.querySelector('.cursor'), ring=document.querySelector('.cursor-ring');
  if(dot&&ring){
    let mx=0,my=0,rx=0,ry=0;
    window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
    (function loop(){rx+=(mx-rx)*.2;ry+=(my-ry)*.2;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
    const hov=()=>{dot.classList.add('hover');ring.classList.add('hover');};
    const off=()=>{dot.classList.remove('hover');ring.classList.remove('hover');ring.classList.remove('view');};
    document.querySelectorAll('a,button,.hoverable').forEach(el=>{el.addEventListener('mouseenter',hov);el.addEventListener('mouseleave',off);});
  }

  // Nav scroll
  const nav=document.querySelector('.nav');
  const prog=document.querySelector('.scroll-prog');
  window.addEventListener('scroll',()=>{
    if(nav)nav.classList.toggle('scrolled',window.scrollY>40);
    if(prog){const h=document.documentElement.scrollHeight-innerHeight;prog.style.width=(window.scrollY/h*100)+'%';}
  });

  // Mobile menu
  const mb=document.querySelector('.menu-btn'), nl=document.querySelector('.nav-links');
  if(mb&&nl){mb.addEventListener('click',()=>{const o=nl.classList.toggle('open');mb.textContent=o?'CLOSE':'MENU';});
    nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nl.classList.remove('open');mb.textContent='MENU';}));}

  // Reveal on scroll
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal,.line-mask').forEach(el=>io.observe(el));

  // Magnetic buttons
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=e.clientX-r.left-r.width/2;const y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x*0.25}px,${y*0.35}px)`;});
    btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
  });
})();
