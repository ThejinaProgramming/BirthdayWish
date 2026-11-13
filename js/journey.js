/* =========================================================
   Her Story — animated life journey (SVG illustrated scenes)
   viewBox 1600 x 900, focus area x≈700–1300 so it works on mobile & desktop
   ========================================================= */
const Journey = (() => {
  const SKIN = '#b9805a', SKIN2 = '#a8704d', HAIR = '#1d1220';

  /* ---------- tiny drawing helpers ---------- */
  const rnd = (a,b) => a + Math.random()*(b-a);
  const stars = (n, h=500, cls='twinkle') => Array.from({length:n}, (_,i) =>
    `<circle class="${cls}" style="animation-delay:${(i%7)*.3}s" cx="${rnd(0,1600)|0}" cy="${rnd(0,h)|0}" r="${rnd(1,3).toFixed(1)}" fill="#fff"/>`).join('');
  const cloud = (x,y,s=1,o=.9) => `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}" fill="#fff"><ellipse cx="0" cy="0" rx="80" ry="34"/><circle cx="-30" cy="-20" r="36"/><circle cx="25" cy="-28" r="44"/><circle cx="62" cy="-6" r="28"/></g>`;
  const sky = (id,a,b,c) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c||b}"/></linearGradient></defs><rect width="1600" height="900" fill="url(#${id})"/>`;
  const hearts = (x,y,n=6) => Array.from({length:n},(_,i)=>`<text class="rise" style="animation-delay:${1+i*.5}s" x="${x+rnd(-80,80)|0}" y="${y-i*50}" font-size="${rnd(26,44)|0}">${['💗','💖','💕','✨'][i%4]}</text>`).join('');
  const butterfly = (x,y,c='#ff8fc0',d=0) => `<g class="bob" style="animation-delay:${d}s" transform="translate(${x},${y})"><ellipse cx="-9" cy="0" rx="10" ry="14" fill="${c}"/><ellipse cx="9" cy="0" rx="10" ry="14" fill="${c}"/><rect x="-1.5" y="-10" width="3" height="20" rx="1.5" fill="#3a1240"/></g>`;

  /* person: origin at feet centre. opts: s scale, dress/shirt colours, hair style */
  function person(x,y,o={}){
    const s=o.s||1, skin=o.skin||SKIN, top=o.top||'#ff8fc0', bottom=o.bottom||top, hair=o.hair||'long', cls=o.cls||'';
    const legs = o.male
      ? `<rect x="-22" y="-100" width="19" height="100" rx="6" fill="${bottom}"/><rect x="3" y="-100" width="19" height="100" rx="6" fill="${bottom}"/>`
      : `<rect x="-16" y="-70" width="12" height="70" rx="5" fill="${skin}"/><rect x="4" y="-70" width="12" height="70" rx="5" fill="${skin}"/>`;
    const shoes = `<ellipse cx="-13" cy="0" rx="15" ry="7" fill="${o.shoe||'#5d2468'}"/><ellipse cx="13" cy="0" rx="15" ry="7" fill="${o.shoe||'#5d2468'}"/>`;
    const body = o.male
      ? `<path d="M-38 -185 Q0 -195 38 -185 L34 -95 L-34 -95 Z" fill="${top}"/><path d="M-8 -188 L0 -170 L8 -188" fill="#fff"/>`
      : o.saree
        ? `<path d="M-34 -185 Q0 -195 34 -185 L56 -12 Q0 4 -56 -12 Z" fill="${top}"/><path d="M-30 -184 L36 -60 L56 -12 L44 -10 L-34 -150 Z" fill="${o.drape||'#ffd27f'}" opacity=".9"/>`
        : `<path d="M-32 -185 Q0 -195 32 -185 L52 -66 Q0 -56 -52 -66 Z" fill="${top}"/>`;
    const armL = o.armL || 'M-34 -178 Q-56 -130 -50 -92';
    const armR = o.armR || 'M34 -178 Q56 -130 50 -92';
    const arms = `<path d="${armL}" stroke="${o.sleeve||skin}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="${armR}" stroke="${o.sleeve||skin}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
    const hairBack = {
      long:`<path d="M-36 -230 Q-48 -150 -30 -130 L30 -130 Q48 -150 36 -230 Z" fill="${HAIR}"/>`,
      bun:`<circle cx="0" cy="-262" r="16" fill="${HAIR}"/>`,
      plaits:`<path d="M-30 -215 Q-44 -170 -38 -140" stroke="${HAIR}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M30 -215 Q44 -170 38 -140" stroke="${HAIR}" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="-38" cy="-138" r="6" fill="#fff"/><circle cx="38" cy="-138" r="6" fill="#fff"/>`,
      pig:`<circle cx="-36" cy="-232" r="14" fill="${HAIR}"/><circle cx="36" cy="-232" r="14" fill="${HAIR}"/><circle cx="-26" cy="-240" r="5" fill="#ff5c9d"/><circle cx="26" cy="-240" r="5" fill="#ff5c9d"/>`,
      short:'', grad:''
    }[hair] || '';
    const hairFront = hair==='short'
      ? `<path d="M-31 -222 Q-30 -258 0 -258 Q30 -258 31 -222 Q20 -240 0 -238 Q-20 -240 -31 -222Z" fill="${HAIR}"/>`
      : `<path d="M-32 -218 Q-34 -262 0 -262 Q34 -262 32 -218 Q22 -246 4 -240 Q-14 -250 -32 -218Z" fill="${HAIR}"/>`;
    const face = `<circle cx="-11" cy="-222" r="3.4" fill="#2a1424"/><circle cx="11" cy="-222" r="3.4" fill="#2a1424"/><path d="M-9 -208 Q0 -200 9 -208" stroke="#7a2a3a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-19" cy="-210" r="5" fill="#ff7a9a" opacity=".45"/><circle cx="19" cy="-210" r="5" fill="#ff7a9a" opacity=".45"/>${o.mustache?'<path d="M-10 -212 Q0 -206 10 -212" stroke="#1d1220" stroke-width="4" fill="none" stroke-linecap="round"/>':''}${o.glasses?'<circle cx="-11" cy="-222" r="9" stroke="#2a1424" stroke-width="2.5" fill="none"/><circle cx="11" cy="-222" r="9" stroke="#2a1424" stroke-width="2.5" fill="none"/><path d="M-2 -222h4" stroke="#2a1424" stroke-width="2.5"/>':''}`;
    const extra = o.extra || '';
    return `<g class="${cls}" style="${o.style||''}"><g transform="translate(${x},${y}) scale(${s})">${hairBack}${legs}${shoes}${body}${arms}<rect x="-8" y="-198" width="16" height="16" fill="${skin}"/><circle cx="0" cy="-222" r="31" fill="${skin}"/>${hairFront}${face}${extra}</g></g>`;
  }
  const baby = (x,y,s=1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="46" ry="26" fill="#fff3f8"/><path d="M-46 0 Q0 30 46 0 Q30 -10 0 -6 Q-30 -10 -46 0Z" fill="#ffc2dc"/><circle cx="-34" cy="-8" r="20" fill="${SKIN}"/><path d="M-52 -14 Q-34 -40 -16 -14 Q-34 -24 -52 -14Z" fill="#ff8fc0"/><circle cx="-40" cy="-9" r="2" fill="#2a1424"/><circle cx="-29" cy="-9" r="2" fill="#2a1424"/><path d="M-38 -1 Q-34 2 -30 -1" stroke="#7a2a3a" stroke-width="2" fill="none"/></g>`;

  /* landmarks */
  const eiffel = (x,y,s=1) => `<g transform="translate(${x},${y}) scale(${s})" fill="none" stroke="#6b4a3a" stroke-width="5" stroke-linejoin="round">
    <path d="M-150 0 Q-60 -150 -22 -420 L-10 -640 L0 -700 L10 -640 L22 -420 Q60 -150 150 0" fill="#8a6150" fill-opacity=".18"/>
    <path d="M-95 0 Q0 -120 95 0" /><path d="M-118 -60 H118"/><path d="M-60 -250 H60" /><path d="M-26 -430 H26"/>
    <path d="M-118 -60 L-60 -250 M118 -60 L60 -250 M-110 -60 L0 -250 L110 -60 M-60 -250 L0 -430 L60 -250 M-26 -430 L0 -560 L26 -430"/>
    <rect x="-130" y="-74" width="260" height="16" fill="#6b4a3a" stroke="none"/><rect x="-70" y="-262" width="140" height="14" fill="#6b4a3a" stroke="none"/><rect x="-32" y="-440" width="64" height="12" fill="#6b4a3a" stroke="none"/>
    <path d="M0 -700 V-740" stroke-width="4"/></g>`;
  const colosseum = (x,y) => { let a=''; for(let r=0;r<3;r++){ for(let i=0;i<11;i++){ const ax=x-520+i*95+(r%2?18:0), ay=y-80-r*115; a+=`<path d="M${ax} ${ay} v-60 a26 26 0 0 1 52 0 v60z" fill="#7a4f2a" opacity=".55"/>`; } }
    return `<path d="M${x-560} ${y} L${x-560} ${y-380} Q${x} ${y-430} ${x+560} ${y-380} L${x+560} ${y} Z" fill="#e2b77f"/><path d="M${x+300} ${y-395} L${x+560} ${y-380} L${x+560} ${y-300} L${x+300} ${y-310}Z" fill="#c99a5f"/>${a}<path d="M${x-560} ${y-30} H${x+560} M${x-560} ${y-145} H${x+560} M${x-560} ${y-260} H${x+560}" stroke="#b9895a" stroke-width="8"/>`; };
  const castle = (x,y) => {
    const tower = (tx,ty,w,h,c='#ffd1e6',roof='#b38cf5') => `<rect x="${tx-w/2}" y="${ty-h}" width="${w}" height="${h}" fill="${c}"/><path d="M${tx-w/2-10} ${ty-h} L${tx} ${ty-h-w*1.6} L${tx+w/2+10} ${ty-h}Z" fill="${roof}"/><path d="M${tx} ${ty-h-w*1.6} v-30" stroke="#e9b872" stroke-width="3"/><path d="M${tx} ${ty-h-w*1.6-30} l22 8 l-22 8z" fill="#ff5c9d"/><rect x="${tx-7}" y="${ty-h+30}" width="14" height="24" rx="7" fill="#7a4b9a"/>`;
    return `<g>${tower(x-260,y,70,260)}${tower(x+260,y,70,260)}${tower(x-140,y,80,360,'#ffe3f0')}${tower(x+140,y,80,360,'#ffe3f0')}${tower(x,y,110,470,'#fff0f7','#c95bd6')}
      <rect x="${x-300}" y="${y-180}" width="600" height="180" fill="#ffc2dc"/><path d="M${x-300} ${y-180} ${Array.from({length:16},(_,i)=>`h20 v-20 h20 v20`).join(' ')}" fill="#ffc2dc"/>
      <path d="M${x-50} ${y} v-90 a50 50 0 0 1 100 0 v90z" fill="#7a4b9a"/></g>`; };
  const bigben = (x,y) => `<g fill="#4a3a5a"><rect x="${x-30}" y="${y-380}" width="60" height="380"/><rect x="${x-38}" y="${y-300}" width="76" height="70"/><circle cx="${x}" cy="${y-265}" r="26" fill="#ffe9b0"/><path d="M${x-34} ${y-380} L${x} ${y-470} L${x+34} ${y-380}Z"/></g><g fill="#4a3a5a"><circle cx="${x+300}" cy="${y-170}" r="160" fill="none" stroke="#4a3a5a" stroke-width="8"/>${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<path d="M${x+300} ${y-170} L${x+300+Math.cos(a)*160} ${y-170+Math.sin(a)*160}" stroke="#4a3a5a" stroke-width="3"/><circle cx="${x+300+Math.cos(a)*160}" cy="${y-170+Math.sin(a)*160}" r="10" fill="#ff8fc0"/>`}).join('')}<path d="M${x+300} ${y-170} L${x+250} ${y} M${x+300} ${y-170} L${x+350} ${y}" stroke="#4a3a5a" stroke-width="8"/></g>`;
  const firework = (x,y,c,d) => `<g class="firework" style="animation-delay:${d}s" transform="translate(${x},${y})">${Array.from({length:14},(_,i)=>{const a=i*Math.PI/7;return `<line x1="${Math.cos(a)*14}" y1="${Math.sin(a)*14}" x2="${Math.cos(a)*70}" y2="${Math.sin(a)*70}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`}).join('')}</g>`;
  const balloon = (x,y,c,d=0) => `<g class="bob" style="animation-delay:${d}s"><ellipse cx="${x}" cy="${y}" rx="30" ry="38" fill="${c}"/><path d="M${x} ${y+38} q-8 40 6 90" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/><ellipse cx="${x-10}" cy="${y-12}" rx="7" ry="11" fill="#fff" opacity=".4"/></g>`;
  const leaves = (n) => Array.from({length:n},(_,i)=>`<text style="animation:leafFall ${rnd(5,9).toFixed(1)}s ${(-rnd(0,8)).toFixed(1)}s linear infinite" x="${rnd(500,1600)|0}" y="-40" font-size="${rnd(22,36)|0}">${['🍂','🍁'][i%2]}</text>`).join('');

  /* ---------- the chapters ---------- */
  const CH = [
    { year:'13 · 11 · 1992', short:'1992', title:'A star is born', tag:'🏥 Teaching Hospital, Kalutara',
      text:'One special night at the Teaching Hospital in Kalutara, between a proud father and a smiling mother, a tiny miracle opened her eyes. They named her Kia.',
      svg:()=>`${sky('s1','#1b0b3a','#4a1f6b','#7a3a7a')}${stars(90,520)}
        <circle cx="1350" cy="140" r="60" fill="#fff7d6"/><circle cx="1375" cy="125" r="55" fill="#4a1f6b" opacity=".0"/>
        <g class="pop" style="animation-delay:.3s"><path d="M1000 120 l14 30 32 4 -24 22 7 32 -29 -16 -29 16 7 -32 -24 -22 32 -4z" fill="#ffe08a"/><circle cx="1000" cy="170" r="70" fill="#ffe08a" opacity=".15"/></g>
        <g opacity=".95"><rect x="120" y="300" width="560" height="460" fill="#efe3f5"/><rect x="120" y="280" width="560" height="30" fill="#d8c3e8"/>
        ${Array.from({length:12},(_,i)=>`<rect x="${160+(i%4)*130}" y="${340+((i/4)|0)*110}" width="80" height="60" rx="6" fill="${i%3?'#ffe9a8':'#bfa7d6'}"/>`).join('')}
        <rect x="330" y="640" width="140" height="120" fill="#bfa7d6"/><rect x="340" y="200" width="120" height="80" rx="10" fill="#fff"/><path d="M400 210 v60 M370 240 h60" stroke="#ff4d6d" stroke-width="16"/>
        <text x="400" y="330" text-anchor="middle" font-family="Outfit" font-size="26" font-weight="700" fill="#5d2468">TEACHING HOSPITAL · KALUTARA</text></g>
        <rect y="760" width="1600" height="140" fill="#2f1240"/>
        ${person(800,800,{s:1.05,top:'#ff6fa8',saree:true,drape:'#ffd27f',hair:'bun',armR:'M34 -178 Q70 -150 92 -120',cls:'rise',style:'animation-delay:.4s'})}
        ${person(1160,800,{s:1.12,male:true,top:'#7fb2e5',bottom:'#2f3d6b',hair:'short',mustache:true,armL:'M-38 -178 Q-70 -150 -92 -120',cls:'rise',style:'animation-delay:.6s'})}
        <g class="pop" style="animation-delay:1.2s"><path d="M900 700 q80 60 160 0" stroke="#e9b872" stroke-width="10" fill="none"/><path d="M890 640 h180 l-20 70 h-140z" fill="#fff0f7" stroke="#e9b872" stroke-width="6"/></g>
        <g class="pop rock" style="animation-delay:1.5s">${baby(990,640,1.15)}</g>
        ${hearts(980,560,6)}`},
    { year:'1993 – 1995', short:'1994', title:'Little explorer', tag:'🌼 First steps & giggles',
      text:'Tiny feet, big curiosity. Kia filled the house with laughter, chasing butterflies, swinging high and discovering a world that was just beginning.',
      svg:()=>`${sky('s2','#bfe6ff','#fff1f7','#ffe3ef')}
        <circle cx="1400" cy="140" r="70" fill="#ffe08a" class="pop"/>${cloud(300,160,1.1)}${cloud(900,110,.8)}${cloud(1200,230,.6,.7)}
        <path d="M0 700 Q400 600 800 680 T1600 650 V900 H0Z" fill="#9edc9a"/><path d="M0 760 Q500 700 1000 760 T1600 740 V900 H0Z" fill="#7ccb7f"/>
        <g><rect x="840" y="330" width="16" height="420" fill="#a0683a"/><rect x="1180" y="330" width="16" height="420" fill="#a0683a"/><rect x="830" y="320" width="376" height="20" rx="8" fill="#c58b55"/></g>
        <g class="sway" style="transform-origin:1020px 340px"><path d="M960 340 V610 M1080 340 V610" stroke="#7a4f2a" stroke-width="5"/><rect x="940" y="606" width="160" height="16" rx="6" fill="#ff8fc0"/>
          ${person(1020,612,{s:.62,top:'#ffd27f',hair:'pig',armL:'M-34 -178 Q-56 -230 -60 -270',armR:'M34 -178 Q56 -230 60 -270'})}</g>
        <g class="bounce"><circle cx="1290" cy="770" r="34" fill="#ff5c9d"/><path d="M1256 770 h68 M1290 736 v68" stroke="#fff" stroke-width="6"/></g>
        ${butterfly(760,400,'#ff8fc0',0)}${butterfly(1350,330,'#b38cf5',.8)}${butterfly(1150,250,'#ffd27f',1.6)}
        ${Array.from({length:14},(_,i)=>`<g transform="translate(${80+i*110},${800+(i%3)*20})"><circle r="9" fill="${['#fff','#ffd27f','#ff8fc0'][i%3]}"/><circle r="4" fill="#ffb347"/></g>`).join('')}`},
    { year:'1996 – 1997', short:'1996', title:'Montessori days', tag:'🎨 ABCs, crayons & first friends',
      text:'With a tiny schoolbag and a big smile, Kia walked into Montessori: alphabet blocks, finger paints, nursery rhymes and her very first best friends.',
      svg:()=>`${sky('s3','#fff3d6','#ffe1ee')}
        <rect x="0" y="720" width="1600" height="180" fill="#e9b872"/><rect x="0" y="710" width="1600" height="14" fill="#c99a55"/>
        <rect x="700" y="120" width="760" height="380" rx="16" fill="#2f5a4a" stroke="#a0683a" stroke-width="18"/>
        <text x="760" y="250" font-family="Great Vibes" font-size="110" fill="#fff" class="rise" style="animation-delay:.6s">A b c</text>
        <text x="1110" y="250" font-family="Outfit" font-size="80" fill="#ffe08a" class="rise" style="animation-delay:1s">1 2 3</text>
        <path d="M780 330 q60 -60 120 0 t120 0 t120 0" stroke="#ff8fc0" stroke-width="8" fill="none" class="draw"/>
        <circle cx="1330" cy="400" r="40" fill="#ffe08a" class="pop" style="animation-delay:1.4s"/>${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<line class="pop" style="animation-delay:1.4s" x1="${1330+Math.cos(a)*50}" y1="${400+Math.sin(a)*50}" x2="${1330+Math.cos(a)*70}" y2="${400+Math.sin(a)*70}" stroke="#ffe08a" stroke-width="6" stroke-linecap="round"/>`}).join('')}
        ${['A','B','C','K','I','A'].map((l,i)=>`<g class="pop" style="animation-delay:${1+i*.2}s"><rect x="${1150+(i%3)*90}" y="${560+((i/3)|0)*-90+60}" width="80" height="80" rx="10" fill="${['#ff5c9d','#b38cf5','#7ad3b0','#ffd27f','#7fb2e5','#ff8fc0'][i]}"/><text x="${1190+(i%3)*90}" y="${560+((i/3)|0)*-90+60+58}" font-family="Outfit" font-weight="700" font-size="50" fill="#fff" text-anchor="middle">${l}</text></g>`).join('')}
        ${person(930,760,{s:.75,top:'#7fb2e5',hair:'pig',extra:'<rect x="24" y="-180" width="40" height="70" rx="12" fill="#ff5c9d"/><path d="M28 -178 Q0 -160 -20 -180" stroke="#c2368a" stroke-width="6" fill="none"/>',cls:'rise bob',style:'animation-delay:.5s'})}
        ${Array.from({length:5},(_,i)=>`<rect x="${740+i*36}" y="660" width="20" height="56" rx="6" fill="${['#ff5c9d','#ffd27f','#7ad3b0','#b38cf5','#7fb2e5'][i]}" class="pop" style="animation-delay:${1.6+i*.15}s"/>`).join('')}`},
    { year:'1998 – 2010', short:'School', title:'Growing up at Kannangara', tag:'🏫 C.W.W. Kannangara Central College, Mathugama',
      text:'In crisp white uniforms at C.W.W. Kannangara Central College, Mathugama, Kia grew year by year: exams and friendships, sports days and a sharp mind for numbers.',
      svg:()=>`${sky('s4','#9fd3ff','#e8f6ff','#fff')}${cloud(250,140)}${cloud(1300,120,.9)}
        <rect y="720" width="1600" height="180" fill="#c7a46b"/><path d="M0 720 H1600" stroke="#a7844b" stroke-width="10"/>
        <g><rect x="80" y="300" width="1440" height="420" fill="#fff6e8"/><path d="M60 300 L800 170 L1540 300Z" fill="#b8326e"/>
          ${Array.from({length:10},(_,i)=>`<rect x="${130+i*140}" y="${360}" width="80" height="90" rx="4" fill="#7fb2e5"/><rect x="${130+i*140}" y="${520}" width="80" height="90" rx="4" fill="#7fb2e5"/>`).join('')}
          <rect x="560" y="236" width="480" height="56" rx="10" fill="#fff"/><text x="800" y="274" text-anchor="middle" font-family="Outfit" font-weight="700" font-size="24" fill="#b8326e">C.W.W. KANNANGARA CENTRAL COLLEGE</text>
          <text x="800" y="160" text-anchor="middle" font-family="Outfit" font-size="22" fill="#5d2468" font-weight="600">MATHUGAMA</text></g>
        <g class="grow" style="animation-delay:.3s">${person(760,800,{s:.7,top:'#fff',hair:'plaits',extra:'<path d="M-6 -186 L0 -150 L6 -186Z" fill="#b8326e"/>'})}</g>
        <g class="grow" style="animation-delay:1.4s">${person(940,800,{s:.88,top:'#fff',hair:'plaits',extra:'<path d="M-6 -186 L0 -150 L6 -186Z" fill="#b8326e"/><rect x="40" y="-150" width="40" height="52" rx="4" fill="#7a4b9a"/>'})}</g>
        <g class="grow" style="animation-delay:2.5s">${person(1150,800,{s:1.05,top:'#fff',hair:'plaits',extra:'<path d="M-6 -186 L0 -150 L6 -186Z" fill="#b8326e"/><rect x="40" y="-150" width="44" height="56" rx="4" fill="#ff5c9d"/><rect x="44" y="-146" width="36" height="6" fill="#fff"/>'})}</g>
        <path d="M720 870 Q940 830 1200 870" stroke="#5d2468" stroke-width="3" stroke-dasharray="8 8" fill="none"/>
        <text x="1240" y="880" font-family="Outfit" font-size="28" fill="#5d2468" font-weight="600" class="rise" style="animation-delay:3s">growing ✨</text>`},
    { year:'University of Kelaniya', short:'Degree', title:'The statistician', tag:'📊 BSc Statistics, University of Kelaniya',
      text:'At the University of Kelaniya, Kia turned her love of numbers into a Statistics degree. Means, models, data and dreams, and then her graduation day.',
      cut:{src:'k05', left:'55%', h:'82%', cap:true},
      svg:()=>`${sky('s5','#3a1240','#7a2e6a','#c95bd6')}${stars(40,400)}
        <g opacity=".35" fill="#fff"><rect x="120" y="420" width="560" height="340"/>${Array.from({length:7},(_,i)=>`<rect x="${140+i*76}" y="440" width="36" height="320"/>`).join('')}<path d="M100 420 L400 300 L700 420Z"/></g>
        <text x="400" y="290" text-anchor="middle" font-family="Outfit" font-size="24" fill="#fff" opacity=".8" font-weight="600">UNIVERSITY OF KELANIYA</text>
        <path class="draw" d="M700 640 C820 640 860 260 1000 260 S1180 640 1300 640" stroke="#ffd27f" stroke-width="8" fill="none"/>
        ${Array.from({length:7},(_,i)=>`<rect class="grow" style="animation-delay:${1+i*.15}s" x="${1320+i*36}" y="${700-[60,110,170,230,170,110,60][i]}" width="26" height="${[60,110,170,230,170,110,60][i]}" rx="4" fill="${i%2?'#ff8fc0':'#b38cf5'}"/>`).join('')}
        ${['μ','σ','Σ','x̄','∫','π','ρ','β'].map((t,i)=>`<text class="bob" style="animation-delay:${i*.4}s" x="${720+i*110}" y="${160+(i%3)*70}" font-family="Cormorant Garamond" font-size="${60+(i%3)*14}" fill="#fff" opacity=".7">${t}</text>`).join('')}
        ${[[760,330],[1450,280],[900,520]].map(([x,y],i)=>`<g class="toss" style="animation-delay:${i*.5}s"><path d="M${x-40} ${y} L${x} ${y-18} L${x+40} ${y} L${x} ${y+18}Z" fill="#1d1220"/><rect x="${x-18}" y="${y+6}" width="36" height="14" fill="#1d1220"/><path d="M${x} ${y} l26 22" stroke="#ffd27f" stroke-width="3"/></g>`).join('')}
        <g class="pop" style="animation-delay:2s" transform="translate(1250,720) rotate(-12)"><rect x="-90" y="-26" width="180" height="52" rx="26" fill="#fff8e8"/><rect x="-20" y="-28" width="40" height="56" fill="#ff5c9d"/><circle cx="0" cy="0" r="14" fill="#e9b872"/></g>`},
    { year:'Career begins', short:'Career', title:'The professional', tag:'💼 Building her career',
      text:'Degree in hand, Kia stepped into the working world. Smart, dedicated and always growing, she turned data into decisions and targets into wins.',
      cut:{src:'k19', left:'54%', h:'70%'},
      svg:()=>`${sky('s6','#dfe9ff','#f4efff')}
        <rect x="80" y="80" width="560" height="460" rx="12" fill="#9fc6f0"/><g fill="#5f7fb8" opacity=".7">${Array.from({length:9},(_,i)=>`<rect x="${110+i*58}" y="${260+(i%4)*30}" width="44" height="${280-(i%4)*30}"/>`).join('')}</g><path d="M360 80 V540 M80 310 H640" stroke="#fff" stroke-width="12"/>
        <rect y="760" width="1600" height="140" fill="#3a4a7a"/><rect y="750" width="1600" height="14" fill="#2a3560"/>
        <rect x="1180" y="560" width="380" height="24" rx="6" fill="#c58b55"/><rect x="1200" y="584" width="20" height="176" fill="#a0683a"/><rect x="1520" y="584" width="20" height="176" fill="#a0683a"/>
        <rect x="1260" y="420" width="220" height="140" rx="10" fill="#2a2140"/><rect x="1270" y="430" width="200" height="110" rx="4" fill="#fff"/>
        <path class="draw" d="M1285 520 L1320 500 L1350 510 L1390 470 L1420 480 L1455 445" stroke="#ff5c9d" stroke-width="6" fill="none"/>
        <rect x="1350" y="560" width="40" height="8" fill="#2a2140"/>
        <g transform="translate(1200,530)"><rect x="0" y="0" width="34" height="32" rx="6" fill="#fff"/><path d="M34 8 q14 0 14 10 t-14 10" stroke="#fff" stroke-width="5" fill="none"/><path class="bob" d="M10 -8 q-8 -12 0 -24 M22 -8 q-8 -12 0 -24" stroke="#bbb" stroke-width="3" fill="none"/></g>
        ${[['✅ Target achieved',700,180],['📈 +32% growth',1060,120],['🏆 Star performer',820,330]].map(([t,x,y],i)=>`<g class="pop bob" style="animation-delay:${1+i*.6}s"><rect x="${x}" y="${y}" width="${t.length*14+30}" height="56" rx="28" fill="#fff" stroke="#ffd1e6" stroke-width="3"/><text x="${x+18}" y="${y+37}" font-family="Outfit" font-size="24" font-weight="600" fill="#5d2468">${t}</text></g>`).join('')}`},
    { year:'Off to the UK', short:'UK ✈', title:'Flying to the United Kingdom', tag:'✈ Sri Lanka → United Kingdom · Master’s in Digital Marketing',
      text:'With a suitcase full of dreams, Kia flew from Sri Lanka to the United Kingdom for her Master’s in Digital Marketing, mixing data with creativity.',
      cut:{src:'k10', left:'56%', h:'74%'},
      svg:()=>`${sky('s7','#7b5cc9','#d980c7','#ffcfb0')}${cloud(200,200,1.2,.8)}${cloud(1450,160,.9,.7)}${cloud(700,120,.7,.6)}
        <g opacity=".55">${bigben(250,780)}</g>
        <rect y="760" width="1600" height="140" fill="#3a2a5a" opacity=".85"/>
        <path id="ukpath" d="M1500 640 Q1100 80 600 300" stroke="#fff" stroke-width="4" stroke-dasharray="12 12" fill="none" class="draw"/>
        <g class="pop" style="animation-delay:.4s"><circle cx="1500" cy="640" r="14" fill="#fff"/><text x="1500" y="690" text-anchor="middle" font-family="Outfit" font-weight="700" font-size="26" fill="#fff">🇱🇰 Sri Lanka</text></g>
        <g class="pop" style="animation-delay:2.4s"><circle cx="600" cy="300" r="14" fill="#fff"/><text x="600" y="270" text-anchor="middle" font-family="Outfit" font-weight="700" font-size="26" fill="#fff">🇬🇧 United Kingdom</text></g>
        <g><g style="offset-path:path('M1500 640 Q1100 80 600 300');offset-rotate:auto reverse;animation:planeGo 3s .6s ease-in-out forwards;offset-distance:0%"><text font-size="64" x="-32" y="22" transform="scale(-1,1)">✈</text></g></g>
        ${['❤ 12.4k','#Marketing','📈 ROI','@kia','SEO ✓','👍 Likes'].map((t,i)=>`<g class="pop bob" style="animation-delay:${2.6+i*.25}s"><rect x="${1150+(i%2)*200}" y="${180+((i/2)|0)*110}" width="180" height="60" rx="30" fill="rgba(255,255,255,.9)"/><text x="${1240+(i%2)*200}" y="${220+((i/2)|0)*110}" text-anchor="middle" font-family="Outfit" font-weight="700" font-size="24" fill="#c2368a">${t}</text></g>`).join('')}`},
    { year:'Life in England', short:'England', title:'Exploring England', tag:'🏞 Liverpool · Lake District · Peak District',
      text:'From the Liverpool waterfront to the lakes of Cumbria and the Heights of Abraham, Kia explored England with that fearless, happy spirit.',
      cut:{src:'k25', left:'44%', h:'72%'},
      svg:()=>`${sky('s8','#a9d8ff','#e6f4ff')}${cloud(300,150)}${cloud(1200,110,.8)}
        <path d="M0 520 Q300 380 600 500 T1200 460 T1600 480 V900 H0Z" fill="#7aa6c7" opacity=".6"/>
        <path d="M0 600 Q400 520 900 600 T1600 580 V900H0Z" fill="#6fbf8a"/>
        <ellipse cx="400" cy="680" rx="420" ry="60" fill="#79b8e0"/>
        <g fill="#8a7a9a" opacity=".85"><rect x="1180" y="400" width="320" height="260"/>${[1210,1470].map(x=>`<rect x="${x-30}" y="250" width="60" height="150"/><rect x="${x-38}" y="300" width="76" height="40"/><circle cx="${x}" cy="320" r="15" fill="#fff3d6"/><path d="M${x-30} 250 Q${x} 180 ${x+30} 250Z"/><path d="M${x} 190 v-24" stroke="#8a7a9a" stroke-width="5"/>`).join('')}${Array.from({length:12},(_,i)=>`<rect x="${1200+(i%6)*50}" y="${430+((i/6)|0)*80}" width="26" height="44" rx="4" fill="#d9d0e6"/>`).join('')}<text x="1196" y="170" font-size="34">🐦</text><text x="1456" y="170" font-size="34">🐦</text></g>
        <path d="M0 720 Q800 660 1600 720 V900 H0Z" fill="#58a874"/>
        ${butterfly(820,300,'#ff8fc0',0)}${butterfly(1500,620,'#ffd27f',.6)}
        ${Array.from({length:10},(_,i)=>`<text x="${60+i*160}" y="${800+(i%2)*40}" font-size="34">${['🌼','🌷','🌸'][i%3]}</text>`).join('')}`},
    { year:'Bonjour Paris', short:'France', title:'Autumn in Paris', tag:'🇫🇷 Paris, France',
      text:'Golden leaves on the Seine, croissants in the morning and the Eiffel Tower glowing at dusk. Paris fell in love with Kia, and she with it.',
      cut:{src:'k37', left:'58%', h:'72%'},
      svg:()=>`${sky('s9','#c9d6ef','#f7e6ef','#ffe2c6')}${cloud(260,160,.9,.8)}${cloud(1400,120,.7,.7)}
        <g class="rise" style="animation-delay:.3s">${eiffel(1050,780,1)}</g>
        <rect y="760" width="1600" height="140" fill="#9aa9c2"/><path d="M0 780 H1600" stroke="#c9d3e3" stroke-width="6"/>
        <g fill="#d9884a">${Array.from({length:5},(_,i)=>`<circle cx="${120+i*120}" cy="${560+(i%2)*30}" r="${90-(i%2)*15}" opacity=".85"/>`).join('')}</g>
        ${Array.from({length:5},(_,i)=>`<rect x="${117+i*120}" y="600" width="8" height="170" fill="#6b4a3a"/>`).join('')}
        <text x="640" y="230" text-anchor="middle" font-family="Great Vibes" font-size="96" fill="#c2368a" class="rise" style="animation-delay:1.4s">Bonjour Paris!</text>
        ${leaves(14)}`},
    { year:'Ciao Roma', short:'Italy', title:'Roman holiday', tag:'🇮🇹 Rome, Italy',
      text:'Sun-kissed stones, gelato and two thousand years of history. Kia walked past the Colosseum like the leading lady of a classic film.',
      cut:{src:'k31', left:'54%', h:'76%'},
      svg:()=>`${sky('s10','#7fc4ff','#d7ecff','#fff3e0')}${cloud(220,140,.8)}
        <circle cx="1450" cy="130" r="70" fill="#ffe08a" class="pop"/>
        <g class="rise" style="animation-delay:.3s">${colosseum(800,770)}</g>
        ${[200,320,1420,1520].map((x,i)=>`<path d="M${x} 780 Q${x-30} 600 ${x} 420 Q${x+30} 600 ${x} 780Z" fill="#2f6a46"/>`).join('')}
        <rect y="770" width="1600" height="130" fill="#d9c3a0"/>${Array.from({length:40},(_,i)=>`<ellipse cx="${(i*41)%1600}" cy="${800+(i%4)*24}" rx="18" ry="8" fill="#c4ab84"/>`).join('')}
        <text x="800" y="220" text-anchor="middle" font-family="Great Vibes" font-size="100" fill="#b8326e" class="rise" style="animation-delay:1.4s">Ciao Roma!</text>
        <text x="1450" y="700" font-size="70" class="pop bob" style="animation-delay:1.8s">🍦</text>`},
    { year:'Right now', short:'Disneyland', title:'Living the fairytale', tag:'🏰 Disneyland Paris',
      text:'And today? Kia is at Disneyland Paris: fireworks over a fairytale castle, rides, laughter and the joy of a girl who never stopped dreaming.',
      cut:{src:'k33', left:'60%', h:'68%'},
      svg:()=>`${sky('s11','#1b0b3a','#5d2468','#c95bd6')}${stars(70,500)}
        ${firework(400,180,'#ff8fc0',0)}${firework(1300,160,'#ffd27f',.7)}${firework(800,120,'#b38cf5',1.4)}${firework(1500,330,'#7ad3b0',.4)}${firework(200,360,'#fff',1.1)}
        <g class="rise" style="animation-delay:.3s">${castle(800,780)}</g>
        <rect y="770" width="1600" height="130" fill="#3a1240"/>
        ${balloon(1180,520,'#ff5c9d',0)}${balloon(1240,470,'#ffd27f',.4)}${balloon(1300,540,'#b38cf5',.8)}${balloon(250,560,'#7ad3b0',.3)}
        ${Array.from({length:30},(_,i)=>`<circle class="twinkle" style="animation-delay:${i*.13}s" cx="${500+((i*97)%700)}" cy="${300+((i*53)%400)}" r="3" fill="#ffe9b0"/>`).join('')}`},
    { year:'13 · 11 · 2026', short:'2026', title:'Queen of her story', tag:'👑 Happy 34th Birthday',
      text:'From 1992 to 2026: thirty-four years of grace, grit and adventure. Today we celebrate you, Kia, the queen of your own beautiful story. Happy Birthday! 🎂',
      cut:{src:'k02', left:'54%', h:'88%'},
      svg:()=>`<defs><radialGradient id="s12" cx=".6" cy=".4" r=".8"><stop offset="0" stop-color="#ffe9c4"/><stop offset=".5" stop-color="#ff9fc8"/><stop offset="1" stop-color="#5d2468"/></radialGradient></defs><rect width="1600" height="900" fill="url(#s12)"/>
        <g class="spin" style="transform-origin:1000px 420px" opacity=".35">${Array.from({length:24},(_,i)=>{const a=i*Math.PI/12;return `<path d="M1000 420 L${1000+Math.cos(a)*1200} ${420+Math.sin(a)*1200} L${1000+Math.cos(a+.08)*1200} ${420+Math.sin(a+.08)*1200}Z" fill="#fff"/>`}).join('')}</g>
        <text x="1000" y="560" text-anchor="middle" font-family="Cormorant Garamond" font-weight="700" font-size="560" fill="#fff" opacity=".35" class="pop" style="animation-delay:.2s">34</text>
        ${firework(500,200,'#fff',0)}${firework(1450,180,'#ffd27f',.6)}${firework(1350,520,'#ff5c9d',1.2)}
        <text x="440" y="190" text-anchor="middle" font-family="Great Vibes" font-size="104" fill="#fff" class="rise" style="animation-delay:1.2s">Happy Birthday</text>
        <text x="440" y="320" text-anchor="middle" font-family="Great Vibes" font-size="150" fill="#5d2468" class="rise" style="animation-delay:1.6s">Kia</text>
        <text x="440" y="390" text-anchor="middle" font-family="Outfit" font-weight="700" letter-spacing="8" font-size="30" fill="#5d2468" class="rise" style="animation-delay:2s">1992 → 2026</text>`}
  ];

  let cur = 0, timer = null, playing = true, built = false, typer = null;
  const DUR = 8000;
  const $ = id => document.getElementById(id);

  function build(){
    if (built) return; built = true;
    const stage = $('stage');
    stage.innerHTML = CH.map((c,i)=>`<div class="scene" data-i="${i}">
        <svg class="bg kz" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${c.svg()}</svg>
        ${c.cut ? `<div class="cut-wrap" style="--l:${c.cut.left};--h:${c.cut.h}"><img class="cut ${c.cut.cap?'':'walk'}" src="assets/cut/${c.cut.src}.webp" alt="Kia" loading="lazy">${c.cut.cap?'<svg class="gradcap" viewBox="0 0 120 70"><path d="M0 22 L60 0 L120 22 L60 44Z" fill="#1d1220"/><path d="M30 34 v18 q30 16 60 0 v-18 L60 44Z" fill="#2a1a30"/><path d="M100 26 v26" stroke="#ffd27f" stroke-width="3"/><circle cx="100" cy="54" r="4" fill="#ffd27f"/></svg>':''}</div>`:''}
        <div class="scene-tag">${c.tag}</div>
      </div>`).join('');
    $('scDots').innerHTML = CH.map((c,i)=>`<button aria-label="Chapter ${i+1}" data-i="${i}"><i></i></button>`).join('');
    $('timeline').innerHTML = CH.map((c,i)=>`<button class="tl-item" data-i="${i}"><b>${c.short}</b><span>${c.title}</span></button>`).join('');
    $('scDots').addEventListener('click', e => { const b = e.target.closest('button'); if (b) go(+b.dataset.i); });
    $('timeline').addEventListener('click', e => { const b = e.target.closest('button'); if (b){ go(+b.dataset.i); $('story').scrollIntoView({behavior:'smooth',block:'center'}); } });
    $('scPrev').onclick = () => go((cur-1+CH.length)%CH.length);
    $('scNext').onclick = () => go((cur+1)%CH.length);
    $('scPlay').onclick = () => { playing ? pause() : play(); };
    // swipe
    let sx = null; const st = $('story');
    st.addEventListener('touchstart', e => sx = e.touches[0].clientX, {passive:true});
    st.addEventListener('touchend', e => { if (sx===null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go((cur + (dx<0?1:-1) + CH.length) % CH.length); sx = null; });
  }

  function type(text){
    clearInterval(typer); const p = $('scText'); p.textContent = ''; let i = 0;
    typer = setInterval(()=>{ p.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(typer); }, 22);
  }

  function go(i){
    cur = i; const c = CH[i];
    document.querySelectorAll('.scene').forEach(s => {
      const on = +s.dataset.i === i;
      if (on){ // restart CSS animations
        s.classList.remove('active'); void s.offsetWidth; s.classList.add('active');
      } else s.classList.remove('active');
    });
    $('scYear').textContent = c.year; $('scTitle').textContent = c.title; type(c.text);
    document.querySelectorAll('#scDots button').forEach((b,k)=>{ b.classList.toggle('done', k<i); b.classList.remove('on'); });
    const dot = document.querySelectorAll('#scDots button')[i]; void dot.offsetWidth; dot.style.setProperty('--dur', DUR+'ms'); dot.classList.add('on');
    document.querySelectorAll('.tl-item').forEach((b,k)=>b.classList.toggle('on', k===i));
    if (i === CH.length-1){ setTimeout(()=>{ if (document.getElementById('journey').classList.contains('active')) { FX.show(3); FX.confetti(120); } }, 1800); }
    schedule();
  }
  function schedule(){ clearTimeout(timer); if (playing) timer = setTimeout(()=> go((cur+1)%CH.length), DUR); }
  function play(){ playing = true; $('story').classList.remove('paused'); $('scPlay').textContent = '❚❚'; go(cur); }
  function pause(){ playing = false; clearTimeout(timer); $('story').classList.add('paused'); $('scPlay').textContent = '▶'; }

  function enter(){ build(); playing = true; $('story').classList.remove('paused'); $('scPlay').textContent='❚❚'; go(0); }
  function leave(){ clearTimeout(timer); clearInterval(typer); }
  return { enter, leave };
})();

/* extra keyframes used by inline styles */
(() => { const s = document.createElement('style'); s.textContent = `
@keyframes planeGo{from{offset-distance:0%}to{offset-distance:100%}}
@keyframes leafFall{from{transform:translate(0,0) rotate(0)}to{transform:translate(-260px,980px) rotate(540deg)}}
.cut-wrap{position:absolute;left:var(--l);bottom:0;height:var(--h);display:flex;align-items:flex-end}
.cut-wrap .cut{position:relative;height:100%;bottom:auto}
.gradcap{position:absolute;width:34%;left:33%;top:-6%;opacity:0;transform:translateY(-120px) rotate(-20deg)}
.scene.active .gradcap{animation:capOn 1s 1.6s cubic-bezier(.2,.8,.2,1.2) forwards}
@keyframes capOn{to{opacity:1;transform:rotate(-8deg)}}
@media (max-width:920px){.cut-wrap{left:50%!important;translate:-50% 0;height:calc(var(--h)*.92)}}
`; document.head.appendChild(s); })();
