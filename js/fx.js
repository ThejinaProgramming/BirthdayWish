/* =========================================================
   Visual FX (confetti, fireworks, sparkles) + music box
   ========================================================= */
const FX = (() => {
  const cv = document.getElementById('fx');
  const ctx = cv.getContext('2d');
  let W, H, parts = [], running = false;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const COLORS = ['#ff5c9d','#ff8fc0','#c95bd6','#b38cf5','#e9b872','#ffd9a0','#7ad3b0','#ffffff'];
  function resize(){ W = cv.width = innerWidth*DPR; H = cv.height = innerHeight*DPR; cv.style.width=innerWidth+'px'; cv.style.height=innerHeight+'px'; }
  addEventListener('resize', resize); resize();
  const rnd = (a,b) => a + Math.random()*(b-a);

  function loop(){
    ctx.clearRect(0,0,W,H);
    parts = parts.filter(p => p.life > 0);
    for (const p of parts){
      p.vx *= p.drag; p.vy = p.vy*p.drag + p.g;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      const a = Math.min(1, p.life/p.fade);
      ctx.save(); ctx.globalAlpha = a; ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      if (p.t === 'rect'){ ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2*Math.abs(Math.cos(p.rot*2))+1); }
      else if (p.t === 'heart'){ heart(p.s); }
      else if (p.t === 'star'){ star(p.s); }
      else { ctx.beginPath(); ctx.arc(0,0,p.s/2,0,7); ctx.fill(); }
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0,0,W,H); }
  }
  function heart(s){ ctx.beginPath(); ctx.moveTo(0,s*.3); ctx.bezierCurveTo(-s*.6,-s*.2,-s*.3,-s*.7,0,-s*.3); ctx.bezierCurveTo(s*.3,-s*.7,s*.6,-s*.2,0,s*.3); ctx.fill(); }
  function star(s){ ctx.beginPath(); for(let i=0;i<10;i++){ const r=i%2?s*.22:s*.55, a=i*Math.PI/5; ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);} ctx.fill(); }
  function add(p){ parts.push(p); if (!running){ running = true; requestAnimationFrame(loop); } }

  function confetti(n=160, x=innerWidth/2, y=innerHeight*0.35){
    for (let i=0;i<n;i++){
      const ang = rnd(0,Math.PI*2), sp = rnd(4,15)*DPR;
      add({x:x*DPR,y:y*DPR,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp-rnd(3,8)*DPR,g:.28*DPR,drag:.975,rot:rnd(0,6),vr:rnd(-.3,.3),
        s:rnd(7,13)*DPR,c:COLORS[i%COLORS.length],t:['rect','rect','circle','heart','star'][i%5],life:rnd(110,190)|0,fade:40});
    }
  }
  function rain(n=120){
    for (let i=0;i<n;i++) add({x:rnd(0,W),y:rnd(-H*.6,-10),vx:rnd(-1,1)*DPR,vy:rnd(2,5)*DPR,g:.05*DPR,drag:.995,rot:rnd(0,6),vr:rnd(-.2,.2),
      s:rnd(8,14)*DPR,c:COLORS[i%COLORS.length],t:['rect','heart','star','circle'][i%4],life:rnd(200,320)|0,fade:60});
  }
  function firework(x=rnd(.15,.85)*innerWidth, y=rnd(.12,.45)*innerHeight){
    const c1 = COLORS[(Math.random()*6)|0], n = 70;
    for (let i=0;i<n;i++){
      const a = i/n*Math.PI*2, sp = rnd(3,7)*DPR;
      add({x:x*DPR,y:y*DPR,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,g:.06*DPR,drag:.965,rot:0,vr:0,s:rnd(3,5)*DPR,c:i%3?c1:'#fff',t:'circle',life:rnd(60,90)|0,fade:30});
    }
  }
  function show(seconds=5){
    let t = 0; const id = setInterval(()=>{ firework(); if (Math.random()<.6) firework(); if ((t+=.45) > seconds) clearInterval(id); }, 450);
  }
  function sparkle(x,y){
    add({x:x*DPR,y:y*DPR,vx:rnd(-1,1)*DPR,vy:rnd(-1.5,.5)*DPR,g:.04*DPR,drag:.96,rot:rnd(0,6),vr:.1,s:rnd(6,11)*DPR,
      c:COLORS[(Math.random()*COLORS.length)|0],t:Math.random()<.5?'star':'heart',life:40,fade:30});
  }
  // sparkle trail
  let last = 0;
  addEventListener('pointermove', e => { const now = performance.now(); if (now-last > 40 && e.pointerType === 'mouse'){ last = now; sparkle(e.clientX, e.clientY); } });
  addEventListener('pointerdown', e => { for (let i=0;i<6;i++) sparkle(e.clientX, e.clientY); });

  return { confetti, rain, firework, show, sparkle };
})();

/* ---------- Music box: "Happy Birthday" (public-domain melody) ---------- */
const MusicBox = (() => {
  let ac, master, playing = false, timer, nextT = 0, idx = 0;
  const N = { G4:392, A4:440, B4:493.88, C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99, C4:261.63, F3:174.61, G3:196, C3:130.81 };
  const B = 0.46;
  const MEL = [['G4',.75],['G4',.25],['A4',1],['G4',1],['C5',1],['B4',2],
               ['G4',.75],['G4',.25],['A4',1],['G4',1],['D5',1],['C5',2],
               ['G4',.75],['G4',.25],['G5',1],['E5',1],['C5',1],['B4',1],['A4',2],
               ['F5',.75],['F5',.25],['E5',1],['C5',1],['D5',1],['C5',3]];
  function tone(f,t,d,vol=.22,type='sine'){
    const o = ac.createOscillator(), g = ac.createGain(), o2 = ac.createOscillator(), g2 = ac.createGain();
    o.type = type; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f*2;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.01); g.gain.exponentialRampToValueAtTime(.001,t+d+.9);
    g2.gain.setValueAtTime(0,t); g2.gain.linearRampToValueAtTime(vol*.25,t+.01); g2.gain.exponentialRampToValueAtTime(.001,t+.5);
    o.connect(g).connect(master); o2.connect(g2).connect(master);
    o.start(t); o2.start(t); o.stop(t+d+1); o2.stop(t+.6);
  }
  function schedule(){
    while (nextT < ac.currentTime + 1.2){
      const [n,d] = MEL[idx];
      tone(N[n], nextT, d*B);
      nextT += d*B; idx++;
      if (idx >= MEL.length){ idx = 0; nextT += B*2; }
    }
  }
  function start(){
    if (!ac){ ac = new (window.AudioContext||window.webkitAudioContext)(); master = ac.createGain(); master.gain.value = .5;
      const comp = ac.createDynamicsCompressor(); master.connect(comp).connect(ac.destination); }
    ac.resume(); playing = true; nextT = ac.currentTime + .1; idx = 0;
    timer = setInterval(schedule, 200); schedule();
  }
  function stop(){ playing = false; clearInterval(timer); if (master){ master.gain.setTargetAtTime(0, ac.currentTime, .1); setTimeout(()=>{ if(!playing) master.gain.value=.5; }, 600);} }
  function chime(){ if (!ac) return; const t = ac.currentTime; [1046.5,1318.5,1568].forEach((f,i)=>tone(f,t+i*.08,.3,.12)); }
  function pop(){ if (!ac) return; const t=ac.currentTime, o=ac.createOscillator(), g=ac.createGain(); o.frequency.setValueAtTime(600,t); o.frequency.exponentialRampToValueAtTime(80,t+.12); g.gain.setValueAtTime(.3,t); g.gain.exponentialRampToValueAtTime(.001,t+.15); o.connect(g).connect(master); o.start(t); o.stop(t+.2); }
  function ensure(){ if (!ac){ ac = new (window.AudioContext||window.webkitAudioContext)(); master = ac.createGain(); master.gain.value=.5; master.connect(ac.destination);} ac.resume(); }
  return { start, stop, chime, pop, ensure, get playing(){ return playing; } };
})();
