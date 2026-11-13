/* =========================================================
   Main — intro, routing with flight transition, pages
   ========================================================= */
(() => {
  const $ = id => document.getElementById(id);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 'home', flying = false;

  /* ---------- intro ---------- */
  document.body.classList.add('locked');
  $('giftBtn').addEventListener('click', () => {
    $('giftBtn').classList.add('open');
    MusicBox.start(); $('musicBtn').classList.add('playing');
    setTimeout(() => { $('intro').classList.add('gone'); document.body.classList.remove('locked'); FX.confetti(220); setTimeout(()=>FX.show(3), 600); startHome(); }, 700);
  });

  /* ---------- music ---------- */
  $('musicBtn').addEventListener('click', () => {
    if (MusicBox.playing){ MusicBox.stop(); $('musicBtn').classList.remove('playing'); }
    else { MusicBox.start(); $('musicBtn').classList.add('playing'); }
  });

  /* ---------- routing ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-tab]'); if (!a) return;
    e.preventDefault(); $('tabs').classList.remove('open');
    navigate(a.dataset.tab);
  });
  $('menuBtn').addEventListener('click', () => $('tabs').classList.toggle('open'));
  addEventListener('hashchange', () => { const t = location.hash.slice(1); if (ROUTES[t] && t !== current) navigate(t, true); });

  function navigate(tab, fromHash){
    if (!ROUTES[tab] || flying) return;
    if (tab === current){ scrollTo({top:0,behavior:'smooth'}); return; }
    const from = ROUTES[current], to = ROUTES[tab];
    if (!fromHash) history.pushState(null, '', '#'+tab);
    if (reduce) return show(tab);
    fly(from, to, () => show(tab));
  }
  function show(tab){
    if (current === 'journey') Journey.leave();
    document.querySelectorAll('.tab-page').forEach(p => p.classList.toggle('active', p.id === tab));
    document.querySelectorAll('.tabs a').forEach(a => a.classList.toggle('active', a.dataset.tab === tab));
    current = tab; scrollTo(0,0);
    if (tab === 'journey'){ Journey.enter(); setTimeout(()=>{ const st=$('story'); scrollTo({top: st.getBoundingClientRect().top + scrollY - 96, behavior:'smooth'}); }, 700); }
    if (tab === 'gallery') revealArt();
    if (tab === 'surprises' || tab === 'wishes') FX.confetti(70, innerWidth/2, 140);
  }

  /* ---------- flight transition ---------- */
  let skipFn = null;
  function fly(from, to, done){
    flying = true;
    const f = $('flight');
    $('fFromCode').textContent = from.code; $('fFromCity').textContent = from.city;
    $('fToCode').textContent = to.code; $('fToCity').textContent = to.city;
    $('pinA').textContent = from.country; $('pinB').textContent = to.country;
    $('fDest').textContent = to.label; $('fNo').textContent = 'KA' + (1300 + Math.floor(Math.random()*99));
    f.classList.remove('show'); void f.offsetWidth; f.classList.add('show');
    const path = $('fPath'), svg = path.ownerSVGElement, len = path.getTotalLength(), plane = $('plane');
    const T = 2300, t0 = performance.now(); let raf, finished = false;
    const step = now => {
      const k = Math.min(1, (now - t0)/T), e = k<.5 ? 2*k*k : 1 - Math.pow(-2*k+2,2)/2;
      const r = svg.getBoundingClientRect(), p = path.getPointAtLength(e*len), p2 = path.getPointAtLength(Math.min(len, e*len+2));
      const x = r.left + p.x/1000*r.width, y = r.top + p.y/400*r.height;
      const x2 = r.left + p2.x/1000*r.width, y2 = r.top + p2.y/400*r.height;
      const ang = Math.atan2(y2-y, x2-x) * 180/Math.PI, sc = 1 + Math.sin(e*Math.PI)*.5;
      plane.style.transform = `translate(${x-55}px,${y-27}px) rotate(${ang}deg) scale(${sc})`;
      if (k < 1) raf = requestAnimationFrame(step); else finish();
    };
    const finish = () => { if (finished) return; finished = true; cancelAnimationFrame(raf); done(); setTimeout(()=>{ f.classList.remove('show'); flying = false; }, 150); };
    skipFn = finish; raf = requestAnimationFrame(step);
  }
  $('flightSkip').addEventListener('click', () => skipFn && skipFn());

  /* ---------- home ---------- */
  $('marquee').innerHTML = [...MARQUEE, ...MARQUEE].map(t => `<span>✦ ${t}</span>`).join('');
  function startHome(){
    const el = $('yrTo'), t0 = performance.now(), D = 2600;
    document.querySelector('.yr-line i').style.width = '100%';
    const tick = now => { const k = Math.min(1,(now-t0)/D), e = 1-Math.pow(1-k,3); el.textContent = Math.round(1992 + 34*e); if (k<1) requestAnimationFrame(tick); else el.textContent = '2026'; };
    requestAnimationFrame(tick);
  }
  const pad = n => String(n).padStart(2,'0');
  function clock(el, target, endText){
    const ms = target - Date.now();
    if (ms <= 0){ el.innerHTML = `<div style="flex:1"><b style="font-size:1.4rem">${endText}</b></div>`; return; }
    const d = Math.floor(ms/864e5), h = Math.floor(ms/36e5)%24, m = Math.floor(ms/6e4)%60, s = Math.floor(ms/1e3)%60;
    el.innerHTML = (d>0?`<div><b>${d}</b><small>days</small></div>`:'') + `<div><b>${pad(h)}</b><small>hrs</small></div><div><b>${pad(m)}</b><small>min</small></div><div><b>${pad(s)}</b><small>sec</small></div>`;
  }
  const endToday = new Date('2026-11-14T00:00:00+05:30'), t35 = new Date('2027-11-13T00:00:00+05:30');
  const fmt = n => n.toLocaleString('en-US');
  function tickAll(){
    clock($('cdToday'), endToday, 'The celebration never ends 🎉');
    clock($('cd35'), t35, 'Happy 35th! 🎉');
    const lived = Date.now() - CONFIG.birth.getTime();
    $('sDays').textContent = fmt(Math.floor(lived/864e5));
    $('sHours').textContent = fmt(Math.floor(lived/36e5));
    $('sBeats').textContent = fmt(Math.floor(lived/6e4*80));
    const now = new Date(); let yrs = now.getFullYear() - 1992; if (now < new Date(now.getFullYear()+'-11-13T00:00:00+05:30')) yrs--;
    $('sSuns').textContent = yrs; $('ageWord').textContent = yrs;
  }
  tickAll(); setInterval(tickAll, 1000);

  // hero parallax
  const hero = document.querySelector('.hero-visual');
  addEventListener('pointermove', e => { if (current !== 'home') return; const x = (e.clientX/innerWidth - .5), y = (e.clientY/innerHeight - .5);
    $('heroKia').style.translate = `${x*-14}px ${y*-8}px`; hero.querySelectorAll('.float-badge').forEach((b,i)=> b.style.translate = `${x*(20+i*10)}px ${y*(14+i*6)}px`); });

  /* ---------- gallery ---------- */
  $('museum').innerHTML = GALLERY.map((g,i)=>`<figure class="art" data-cat="${g.cat}" data-i="${i}"><div class="frame ${g.frame}"><div class="frame-in"><img src="assets/art/${g.src}.webp" alt="${g.title}" loading="lazy"></div></div><figcaption class="plaque"><b>${g.title}</b><small>${g.note.split('·')[0].trim().toUpperCase()}</small></figcaption></figure>`).join('');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.1});
  function revealArt(){ document.querySelectorAll('.art:not(.in)').forEach((a,i) => { a.style.transitionDelay = (i%4)*80+'ms'; io.observe(a); }); }
  $('gFilters').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
    $('gFilters').querySelectorAll('button').forEach(x=>x.classList.toggle('active', x===b));
    document.querySelectorAll('.art').forEach(a => a.classList.toggle('hide', b.dataset.f !== 'all' && a.dataset.cat !== b.dataset.f)); });
  document.querySelectorAll('.art').forEach(a => {
    a.addEventListener('pointermove', e => { const r = a.getBoundingClientRect(); a.style.setProperty('--ry', ((e.clientX-r.left)/r.width-.5)*14+'deg'); a.style.setProperty('--rx', -((e.clientY-r.top)/r.height-.5)*14+'deg'); });
    a.addEventListener('click', () => openLb(+a.dataset.i));
  });
  let lbI = 0;
  function visible(){ return [...document.querySelectorAll('.art:not(.hide)')].map(a=>+a.dataset.i); }
  function openLb(i){ lbI = i; const g = GALLERY[i]; $('lbImg').src = `assets/art/${g.src}.webp`; $('lbImg').alt = g.title; $('lbTitle').textContent = g.title; $('lbNote').textContent = g.note; $('lightbox').classList.add('show'); document.body.classList.add('locked'); }
  function stepLb(d){ const v = visible(); const k = v.indexOf(lbI); openLb(v[(k+d+v.length)%v.length]); }
  $('lbClose').onclick = () => { $('lightbox').classList.remove('show'); document.body.classList.remove('locked'); };
  $('lbPrev').onclick = () => stepLb(-1); $('lbNext').onclick = () => stepLb(1);
  $('lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox') $('lbClose').click(); });
  addEventListener('keydown', e => { if (!$('lightbox').classList.contains('show')) return; if (e.key==='Escape') $('lbClose').click(); if (e.key==='ArrowRight') stepLb(1); if (e.key==='ArrowLeft') stepLb(-1); });

  /* ---------- wishes ---------- */
  $('wishGrid').innerHTML = WISHES.map(w => `<div class="wish" tabindex="0"><div class="wish-in"><div class="wish-face wish-front" style="background:${w.grad}"><span class="w-ico">${w.ico}</span><h3>${w.title}</h3><small>${w.sub} · tap to open</small></div><div class="wish-face wish-back"><p>${w.text}</p><div class="sig">for Kia ♡</div></div></div></div>`).join('');
  $('wishGrid').addEventListener('click', e => { const w = e.target.closest('.wish'); if (!w) return; w.classList.toggle('flipped'); if (w.classList.contains('flipped')){ const r = w.getBoundingClientRect(); FX.confetti(30, r.left+r.width/2, r.top+40); MusicBox.chime(); } });
  $('lanternForm').addEventListener('submit', e => { e.preventDefault(); const v = $('lanternInput').value.trim() || 'Happy Birthday Kia ✨'; releaseLantern(v); $('lanternInput').value=''; });
  function releaseLantern(text){
    const l = document.createElement('div'); l.className = 'lantern'; l.style.left = (10 + Math.random()*75) + '%';
    l.innerHTML = `<i></i><span></span>`; l.querySelector('span').textContent = text;
    $('lanternSky').appendChild(l); l.addEventListener('animationend', () => l.remove()); MusicBox.chime();
  }
  ['Endless success 🌟','More adventures ✈️','Happiness always 💖'].forEach((t,i)=>setTimeout(()=>releaseLantern(t), 1200 + i*2500));

  /* ---------- thanks → Viber ---------- */
  const msg = $('thanksMsg');
  const sync = () => { $('charCount').textContent = `${msg.value.length} / 1000`; $('letterPreview').textContent = msg.value || 'Your message will appear here…'; };
  msg.addEventListener('input', sync);
  $('vibeChips').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $('vibeChips').querySelectorAll('button').forEach(x=>x.classList.toggle('on', x===b)); msg.value = b.dataset.t; sync(); $('envelope').classList.add('open'); });
  msg.addEventListener('focus', () => $('envelope').classList.add('open'));
  async function copy(text){ try{ await navigator.clipboard.writeText(text); return true; }catch(e){ const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok; } }
  const fullMsg = () => `💌 Thank-you from Kia\n\n${msg.value.trim()}\n\n— sent from my birthday website 🎂`;
  $('copyMsg').onclick = async () => { if (!msg.value.trim()) return toast('Write a little message first 💭'); await copy(fullMsg()); toast('Copied! 📋 Paste it into Viber'); };
  $('thanksForm').addEventListener('submit', async e => {
    e.preventDefault();
    if (!msg.value.trim()){ toast('Write a little message first 💭'); msg.focus(); return; }
    const text = fullMsg(); await copy(text);
    const env = $('envelope'); env.classList.add('open'); setTimeout(()=>env.classList.add('fly'), 500);
    FX.confetti(160); MusicBox.chime();
    const num = encodeURIComponent(CONFIG.viberNumber);
    const link = `viber://chat?number=${num}&draft=${encodeURIComponent(text)}`;
    setTimeout(() => { window.location.href = link; }, 900);
    toast('Opening Viber… your message is also copied 💜');
    setTimeout(()=>{ env.classList.remove('fly','open'); }, 3200);
  });

  /* ---------- initial tab from URL ---------- */
  const start = location.hash.slice(1);
  if (ROUTES[start] && start !== 'home') show(start);

  Surprises.build();
})();
