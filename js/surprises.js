/* =========================================================
   Surprises — 8 interactive gifts
   ========================================================= */
const Surprises = (() => {
  const opened = new Set();
  const GIFTS = [
    { ico:'🎂', title:'Make a Wish', sub:'Blow out the candles', grad:'linear-gradient(135deg,#ff6fa8,#ff9671)', fn:cake },
    { ico:'🪄', title:'Scratch & Reveal', sub:'A secret message', grad:'linear-gradient(135deg,#7b5cc9,#c95bd6)', fn:scratch },
    { ico:'🎈', title:'Pop the Balloons', sub:'Find the hidden words', grad:'linear-gradient(135deg,#4fa3d9,#9d7cf0)', fn:balloons },
    { ico:'🎫', title:'Your Next Trip', sub:'A boarding pass for you', grad:'linear-gradient(135deg,#e9a35a,#ff6fa8)', fn:ticket },
    { ico:'🥠', title:'Fortune Cookie', sub:'What 34 holds', grad:'linear-gradient(135deg,#c99a55,#e9c37a)', fn:fortune },
    { ico:'🎆', title:'Fireworks', sub:'Light up the sky', grad:'linear-gradient(135deg,#3a1240,#7a2e6a)', fn:fireworks },
    { ico:'🧠', title:'The Kia Quiz', sub:'How well do you know you?', grad:'linear-gradient(135deg,#43b98a,#4fa3d9)', fn:quiz },
    { ico:'💌', title:'A Letter', sub:'Read it last', grad:'linear-gradient(135deg,#d65db1,#ff5c9d)', fn:letter }
  ];
  const $ = id => document.getElementById(id);
  const body = () => $('modalBody');

  function build(){
    $('giftGrid').innerHTML = GIFTS.map((g,i)=>`<button class="sgift" data-i="${i}" style="background:${g.grad}"><span class="sg-num">0${i+1}</span><span class="sg-box">${g.ico}</span><b>${g.title}</b><small>${g.sub}</small></button>`).join('');
    $('giftGrid').addEventListener('click', e => { const b = e.target.closest('.sgift'); if (!b) return; const i = +b.dataset.i; openGift(i, b); });
    $('modalClose').onclick = close; $('modal').addEventListener('click', e => { if (e.target.id === 'modal') close(); });
  }
  function openGift(i, btn){
    MusicBox.ensure(); MusicBox.chime();
    const r = btn.getBoundingClientRect(); FX.confetti(60, r.left + r.width/2, r.top + r.height/2);
    opened.add(i); btn.classList.add('opened'); $('openedCount').textContent = opened.size;
    body().innerHTML = ''; GIFTS[i].fn();
    $('modal').classList.add('show'); document.body.classList.add('locked');
    if (opened.size === 8) setTimeout(()=>{ toast('🎉 You opened every surprise! Happy Birthday, Kia!'); FX.rain(160); }, 900);
  }
  function close(){ $('modal').classList.remove('show'); document.body.classList.remove('locked'); body().innerHTML=''; if (micStream){ micStream.getTracks().forEach(t=>t.stop()); micStream=null; } }

  /* 1. cake */
  let micStream = null;
  function cake(){
    body().innerHTML = `<h3>Make a wish, Kia 🎂</h3><p class="m-sub">Close your eyes, make a wish, then tap each candle (or blow into your mic!)</p>
      <div class="cake"><div class="plate"></div><div class="tier t1"><span class="cake-num">Kia · 34</span></div><div class="tier t2"></div>
      <div class="candles">${'<div class="candle"><div class="flame"></div></div>'.repeat(5)}</div></div>
      <button class="btn btn-ghost" id="micBtn">🎤 Blow with microphone</button><p id="wishMsg" class="m-sub" style="margin-top:14px"></p>`;
    const candles = [...body().querySelectorAll('.candle')];
    const check = () => { if (candles.every(c=>c.classList.contains('out'))){ $('wishMsg').innerHTML = '<b style="color:#ff5c9d;font-size:1.2rem">✨ Your wish is on its way to the universe! ✨</b>'; FX.confetti(200); FX.show(2); if (micStream){ micStream.getTracks().forEach(t=>t.stop()); micStream=null; } } };
    candles.forEach(c => c.onclick = () => { c.classList.add('out'); MusicBox.pop(); check(); });
    $('micBtn').onclick = async () => {
      try{
        micStream = await navigator.mediaDevices.getUserMedia({audio:true});
        const ac = new (window.AudioContext||window.webkitAudioContext)(), an = ac.createAnalyser(); an.fftSize = 512;
        ac.createMediaStreamSource(micStream).connect(an); const d = new Uint8Array(an.frequencyBinCount);
        $('micBtn').textContent = '🌬️ Blow now…';
        const tick = () => { if (!micStream) return; an.getByteFrequencyData(d); const v = d.reduce((a,b)=>a+b,0)/d.length;
          if (v > 55){ const lit = candles.find(c=>!c.classList.contains('out')); if (lit){ lit.classList.add('out'); check(); } }
          requestAnimationFrame(tick); }; tick();
      }catch(e){ $('micBtn').textContent = 'Mic not available, tap the candles instead 💨'; }
    };
  }

  /* 2. scratch */
  function scratch(){
    body().innerHTML = `<h3>Scratch to reveal 🪄</h3><p class="m-sub">Rub the golden card with your finger or mouse</p>
      <div class="scratch-wrap"><div class="scratch-under"><b>Kia, you are proof that a small-town girl from Kalutara can conquer the world. 🌍<br><span style="color:#ff5c9d">The best chapters are still unwritten.</span></b></div><canvas id="scr"></canvas></div>`;
    const cv = $('scr'), ctx = cv.getContext('2d'), r = cv.getBoundingClientRect();
    cv.width = r.width; cv.height = r.height;
    const g = ctx.createLinearGradient(0,0,cv.width,cv.height); g.addColorStop(0,'#e9b872'); g.addColorStop(.5,'#ffe2a8'); g.addColorStop(1,'#c99a55');
    ctx.fillStyle = g; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle = '#7a5520'; ctx.font = '600 22px Outfit'; ctx.textAlign = 'center'; ctx.fillText('✨ SCRATCH HERE ✨', cv.width/2, cv.height/2+8);
    ctx.globalCompositeOperation = 'destination-out';
    let down = false, done = false;
    const pos = e => { const b = cv.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return [p.clientX-b.left, p.clientY-b.top]; };
    const draw = e => { if (!down) return; e.preventDefault(); const [x,y] = pos(e); ctx.beginPath(); ctx.arc(x,y,24,0,7); ctx.fill();
      if (!done){ const px = ctx.getImageData(0,0,cv.width,cv.height).data; let c=0; for(let i=3;i<px.length;i+=64) if(px[i]===0) c++; if (c/(px.length/64) > .55){ done = true; cv.style.transition='opacity .6s'; cv.style.opacity=0; FX.confetti(120); } } };
    cv.addEventListener('pointerdown', e => { down = true; draw(e); }); addEventListener('pointerup', () => down = false); cv.addEventListener('pointermove', draw);
  }

  /* 3. balloons */
  function balloons(){
    const WORD = 'HAPPY BIRTHDAY KIA';
    body().innerHTML = `<h3>Pop the balloons 🎈</h3><p class="m-sub">Each balloon hides a letter. Pop them all!</p>
      <div class="letters" id="letters">${[...WORD].map(c=>c===' '?'<span class="sp"></span>':`<span>${c}</span>`).join('')}</div><div class="balloon-field" id="bf"></div>`;
    const slots = [...body().querySelectorAll('.letters span:not(.sp)')]; let n = 0;
    const cols = ['#ff5c9d','#b38cf5','#ffd27f','#7ad3b0','#7fb2e5','#ff9671'];
    const bf = $('bf');
    const spawn = () => { if (!document.body.contains(bf) || n >= slots.length) return;
      const b = document.createElement('div'); b.className='bal'; b.style.background = cols[(Math.random()*cols.length)|0];
      b.style.left = (5 + Math.random()*85) + '%'; b.style.animationDuration = (4 + Math.random()*3) + 's'; b.textContent = '?';
      b.onclick = () => { if (b.classList.contains('popped') || n >= slots.length) return; MusicBox.pop(); b.classList.add('popped'); slots[n].classList.add('on'); n++; const r=b.getBoundingClientRect(); FX.confetti(20, r.left+29, r.top+36); setTimeout(()=>b.remove(),300);
        if (n === slots.length){ setTimeout(()=>{ FX.rain(120); toast('🎉 HAPPY BIRTHDAY KIA! 🎉'); }, 300); } };
      b.addEventListener('animationend', () => b.remove()); bf.appendChild(b); setTimeout(spawn, 550); };
    for (let i=0;i<4;i++) setTimeout(spawn, i*300);
  }

  /* 4. ticket */
  const DESTS = [['MLE','Maldives','Sunset villas & turquoise water'],['HND','Tokyo','Cherry blossoms & neon nights'],['JTR','Santorini','Blue domes & golden sunsets'],['ZRH','Swiss Alps','Snowy peaks & hot chocolate'],['DPS','Bali','Rice terraces & temple sunrises'],['JFK','New York','Broadway lights & Central Park'],['KEF','Iceland','Northern lights over glaciers'],['DXB','Dubai','Desert dunes & skyline views'],['IST','Istanbul','Hot-air balloons & bazaars']];
  function ticket(){
    body().innerHTML = `<h3>Your next adventure 🎫</h3><p class="m-sub">Kia Airways has reserved a seat for you. Shuffle to pick your next dream trip!</p><div id="tk"></div><button class="btn btn-primary" id="shuffle" style="margin-top:18px">🔀 Shuffle destination</button>`;
    const render = () => { const [code,city,desc] = DESTS[(Math.random()*DESTS.length)|0];
      $('tk').innerHTML = `<div class="ticket"><div class="tk-main"><h4>KIA AIRWAYS · FIRST CLASS ✨</h4><div class="tk-route"><b>CMB</b><span style="font-size:1.6rem;color:#ff5c9d">✈</span><b>${code}</b></div><p style="color:#5d2468;font-weight:600">${city} — <span style="font-weight:400;color:#8a6390">${desc}</span></p><div class="tk-grid" style="margin-top:12px"><div>PASSENGER<b>KIA</b></div><div>DATE<b>Whenever you wish</b></div><div>SEAT<b>1A · Window</b></div></div></div><div class="tk-stub"><div><small>CLASS</small><b style="display:block;font-size:1.2rem">Dreamer</b></div><div class="barcode"></div><small>Valid for a lifetime</small></div></div>`; };
    render(); $('shuffle').onclick = () => { render(); MusicBox.chime(); };
  }

  /* 5. fortune */
  const FORTUNES = ['This year a door you’ve been knocking on will swing wide open. 🚪✨','Your passport is about to get very, very busy. ✈️🌍','Success follows those who chase their dreams. You run faster than most. 🏃‍♀️💨','A wonderful surprise is closer than you think. 🎁','At 34 you’ll shine brighter than ever before. Keep glowing! 🌟','Your hard work is about to pay off in a big way. 💼📈','Laughter, love and adventure will fill your year. 💖','Your next big idea will change everything. Write it down! 💡'];
  function fortune(){
    body().innerHTML = `<h3>Crack the fortune cookie 🥠</h3><p class="m-sub">Tap the cookie to read your fortune for age 34</p><span class="cookie" id="cookie">🥠</span><div class="fortune-paper" id="paper"></div><p><button class="btn btn-ghost" id="again" style="display:none;margin-top:10px">Another one 🥠</button></p>`;
    const crack = () => { $('cookie').textContent = '✨'; const p=$('paper'); p.style.display='block'; p.textContent = FORTUNES[(Math.random()*FORTUNES.length)|0]; $('again').style.display='inline-flex'; MusicBox.chime(); };
    $('cookie').onclick = crack; $('again').onclick = () => { $('paper').style.display='none'; setTimeout(crack, 150); };
  }

  /* 6. fireworks */
  function fireworks(){
    body().innerHTML = `<h3>Light up the sky 🎆</h3><p class="m-sub">Close this box and enjoy the show, or tap the button again for more!</p><button class="btn btn-primary" id="fwGo">🎆 Launch fireworks</button>`;
    const go = () => { close(); FX.show(7); setTimeout(()=>FX.confetti(180), 3500); if (!MusicBox.playing) document.getElementById('musicBtn').click(); };
    $('fwGo').onclick = go;
  }

  /* 7. quiz */
  const QUIZ = [
    ['Where was Kia born?', ['Colombo National Hospital','Teaching Hospital, Kalutara','Galle General Hospital'], 1],
    ['What did Kia study at the University of Kelaniya?', ['Statistics','Biology','Law'], 0],
    ['Which school did Kia attend?', ['Royal College','C.W.W. Kannangara Central College, Mathugama','Visakha Vidyalaya'], 1],
    ['Her Master’s in the UK was in…', ['Digital Marketing','Astrophysics','Architecture'], 0],
    ['Which famous monument did Kia visit in Rome?', ['Big Ben','The Colosseum','The Acropolis'], 1],
    ['How many trips around the sun has Kia completed today?', ['32','34','36'], 1]
  ];
  function quiz(){
    let q = 0, score = 0;
    const render = () => {
      if (q >= QUIZ.length){ body().innerHTML = `<h3>${score === QUIZ.length ? '🏆 Perfect score!' : '🎉 Well done!'}</h3><p class="m-sub">You scored <b>${score}/${QUIZ.length}</b>. ${score===QUIZ.length?'Nobody knows Kia like Kia!':'Still the most amazing Kia in the world!'}</p><button class="btn btn-primary" id="qAgain">Play again</button>`; $('qAgain').onclick = () => { q=0; score=0; render(); }; if (score===QUIZ.length) FX.confetti(200); return; }
      const [t,opts,ans] = QUIZ[q];
      body().innerHTML = `<h3>The Kia Quiz 🧠</h3><p class="m-sub">Question ${q+1} of ${QUIZ.length}</p><p class="quiz-q">${t}</p><div class="quiz-opts">${opts.map((o,i)=>`<button data-i="${i}">${o}</button>`).join('')}</div>`;
      body().querySelectorAll('.quiz-opts button').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; body().querySelectorAll('.quiz-opts button').forEach(x=>x.disabled=true);
        b.classList.add(i===ans?'right':'wrong'); body().querySelectorAll('.quiz-opts button')[ans].classList.add('right');
        if (i===ans){ score++; MusicBox.chime(); }
        setTimeout(()=>{ q++; render(); }, 900);
      });
    };
    render();
  }

  /* 8. letter */
  function letter(){
    body().innerHTML = `<h3>A letter for you 💌</h3><div class="letter-paper" id="lp"></div>`;
    const txt = `Dear Kia,\n\nHappy 34th birthday! 🎂\n\nFrom the little girl born in Kalutara to the woman who studied, worked and travelled across the world, you have grown into someone truly inspiring. Your kindness, intelligence and courage make everyone around you better.\n\nMay this year bring success in everything you do, new countries to explore, dreams that come true and happiness that never fades.\n\nNever stop being you. The world needs more of your light. ✨\n\nWith love and warm wishes,`;
    const lp = $('lp'); let i = 0;
    const t = setInterval(()=>{ if (!document.body.contains(lp)) return clearInterval(t); lp.innerHTML = txt.slice(0, ++i).replace(/\n/g,'<br>'); if (i >= txt.length){ clearInterval(t); lp.innerHTML += `<div class="sig">— ${CONFIG.fromName} 💖</div>`; } }, 18);
  }

  return { build };
})();

function toast(msg){ const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(()=>t.classList.remove('show'), 3200); }
