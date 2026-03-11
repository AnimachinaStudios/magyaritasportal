// ========== CURSOR ==========
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
(function animRing(){
  rx += (mx-rx)*.12; ry += (my-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();

// ========== HERO PARTICLE CANVAS ==========
(function(){
  const c = document.getElementById('hero-canvas');
  const ctx = c.getContext('2d');
  let w,h;
  function resize(){ w=c.width=c.offsetWidth; h=c.height=c.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  const PARTICLES = 120;
  let pts = [];
  for(let i=0;i<PARTICLES;i++) pts.push({
    x:Math.random()*1920, y:Math.random()*1080,
    vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
    r:Math.random()*1.5+.5
  });
  let mouseX=-9999, mouseY=-9999;
  c.addEventListener('mousemove', e=>{
    const r=c.getBoundingClientRect();
    mouseX=e.clientX-r.left; mouseY=e.clientY-r.top;
  });
  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='rgba(4,10,15,0.25)';
    ctx.fillRect(0,0,w,h);
    // grid
    ctx.strokeStyle='rgba(0,255,136,0.04)';
    ctx.lineWidth=1;
    for(let x=0;x<w;x+=60){ ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke(); }
    for(let y=0;y<h;y+=60){ ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke(); }
    // lines between pts
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<160){
          ctx.strokeStyle=`rgba(0,255,136,${.18*(1-d/160)})`;
          ctx.lineWidth=.6;
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke();
        }
      }
    }
    // mouse connections
    for(let p of pts){
      const dx=p.x-mouseX, dy=p.y-mouseY;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<200){
        ctx.strokeStyle=`rgba(0,212,255,${.4*(1-d/200)})`;
        ctx.lineWidth=.8;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouseX,mouseY); ctx.stroke();
      }
    }
    // dots
    for(let p of pts){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=w; if(p.x>w)p.x=0;
      if(p.y<0)p.y=h; if(p.y>h)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(0,255,136,0.7)'; ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ========== SPIDER WEB CANVAS ==========
(function(){
  const c = document.getElementById('web-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w,h;
  function resize(){ w=c.width=c.offsetWidth; h=c.height=c.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  // Spiderweb nodes
  const NODES = 70;
  let nodes = [];
  for(let i=0;i<NODES;i++) nodes.push({
    x:Math.random()*1920, y:Math.random()*900,
    vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25
  });
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<140){
          ctx.strokeStyle=`rgba(0,255,136,${.6*(1-d/140)})`;
          ctx.lineWidth=.5;
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke();
        }
      }
    }
    for(let n of nodes){
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0)n.x=w; if(n.x>w)n.x=0;
      if(n.y<0)n.y=h; if(n.y>h)n.y=0;
      ctx.beginPath(); ctx.arc(n.x,n.y,1.2,0,Math.PI*2);
      ctx.fillStyle='rgba(0,255,136,0.8)'; ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ========== MATRIX CANVAS ==========
(function(){
  const c = document.getElementById('matrix-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w,h;
  function resize(){ w=c.width=c.offsetWidth; h=c.height=c.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  const COLS = Math.floor(window.innerWidth/18);
  let drops = Array(COLS).fill(1);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01ABCDEFGH';
  function drawMatrix(){
    ctx.fillStyle='rgba(4,10,15,0.08)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle='#00ff88';
    ctx.font='14px monospace';
    for(let i=0;i<drops.length;i++){
      const ch=chars[Math.floor(Math.random()*chars.length)];
      ctx.fillStyle=`rgba(0,255,136,${Math.random()*.8+.2})`;
      ctx.fillText(ch, i*18, drops[i]*18);
      if(drops[i]*18>h && Math.random()>.975) drops[i]=0;
      drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
  }
  drawMatrix();
})();

// ========== 3D CARD SHOWCASE ==========
(function(){
  const card    = document.getElementById('ss3d');
  const glare   = document.getElementById('card-glare');
  const shadow  = document.getElementById('card-shadow');
  if(!card) return;

  // ---- physics state ----
  let targetX = -6, targetY = 12;   // desired tilt (deg)
  let currentX = -6, currentY = 12; // smoothed tilt
  let velX = 0, velY = 0;           // spring velocity

  // ---- interaction state ----
  let isDragging = false;
  let lastMX = 0, lastMY = 0;
  let dragVX = 0, dragVY = 0;
  let isHovering = false;

  // ---- auto-rotation ----
  let autoAngle = 0;         // drives the gentle idle Y sweep
  const AUTO_SPEED = 0.28;   // deg per frame
  const AUTO_RANGE = 22;     // ± degrees of Y sweep
  const AUTO_TILT_X = -5;    // constant slight X lean

  // ---- spring constants ----
  const STIFFNESS = 0.10;
  const DAMPING   = 0.72;

  function lerp(a,b,t){ return a+(b-a)*t; }

  function applyTransform(){
    card.style.transform =
      `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;

    // glare follows the tilt angle
    const gx = 50 + currentY * 1.2;
    const gy = 50 - currentX * 1.5;
    const bright = 0.04 + Math.abs(currentY)/180 * 0.14;
    glare.style.background =
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${bright.toFixed(3)}) 0%, transparent 65%)`;

    // shadow stretches with tilt
    const scaleX = 0.85 + Math.abs(currentY)/90 * 0.15;
    const skewY  = currentY * 0.18;
    if(shadow) shadow.style.transform =
      `rotateX(85deg) scaleX(${scaleX.toFixed(3)}) skewX(${skewY.toFixed(2)}deg)`;
  }

  function tick(){
    if(isDragging){
      // while dragging: snap directly (no spring) + accumulate drag velocity
      currentX += (targetX - currentX) * 0.55;
      currentY += (targetY - currentY) * 0.55;
    } else {
      // spring toward target
      const ax = (targetX - currentX) * STIFFNESS;
      const ay = (targetY - currentY) * STIFFNESS;
      velX = (velX + ax) * DAMPING;
      velY = (velY + ay) * DAMPING;
      currentX += velX;
      currentY += velY;

      // idle auto-rotation – only when not hovering
      if(!isHovering){
        autoAngle += AUTO_SPEED;
        targetX = AUTO_TILT_X;
        targetY = Math.sin(autoAngle * Math.PI / 180) * AUTO_RANGE;
      }
    }
    applyTransform();
    requestAnimationFrame(tick);
  }
  tick();

  // ---- Mouse drag ----
  card.addEventListener('mousedown', e=>{
    isDragging = true;
    card.style.transition = 'box-shadow .3s';
    lastMX = e.clientX; lastMY = e.clientY;
    dragVX = 0; dragVY = 0;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e=>{
    if(isDragging){
      const dx = e.clientX - lastMX;
      const dy = e.clientY - lastMY;
      dragVX = dx * 0.5;
      dragVY = dy * 0.5;
      targetY += dx * 0.45;
      targetX -= dy * 0.45;
      targetX = Math.max(-35, Math.min(35, targetX));
      targetY = Math.max(-55, Math.min(55, targetY));
      lastMX = e.clientX; lastMY = e.clientY;
    }
  });

  document.addEventListener('mouseup', ()=>{
    if(!isDragging) return;
    isDragging = false;
    // throw: apply drag velocity as spring impulse
    velY += dragVY * 0.6;
    velX += dragVX * 0.3;
    // gradually return to auto-rotation when released and not hovering
    setTimeout(()=>{ if(!isHovering && !isDragging){ autoAngle = Math.asin(currentY/AUTO_RANGE) * 180/Math.PI; }}, 800);
  });

  // ---- Hover parallax ----
  card.addEventListener('mouseenter', ()=>{ isHovering = true; });
  card.addEventListener('mouseleave', ()=>{
    isHovering = false;
    // gentle return to auto-rotate
    setTimeout(()=>{ if(!isDragging) autoAngle = 0; }, 600);
  });

  card.addEventListener('mousemove', e=>{
    if(isDragging || !isHovering) return;
    const rect  = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5..0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    targetY =  nx * 28;
    targetX = -ny * 18;
  });

  // ---- Touch ----
  let touchStartX=0, touchStartY=0;
  card.addEventListener('touchstart', e=>{
    isDragging=true; isHovering=true;
    touchStartX=e.touches[0].clientX;
    touchStartY=e.touches[0].clientY;
    lastMX=touchStartX; lastMY=touchStartY;
  },{passive:true});

  document.addEventListener('touchmove', e=>{
    if(!isDragging) return;
    const dx=e.touches[0].clientX-lastMX;
    const dy=e.touches[0].clientY-lastMY;
    targetY += dx*0.5; targetX -= dy*0.5;
    targetX=Math.max(-35,Math.min(35,targetX));
    targetY=Math.max(-55,Math.min(55,targetY));
    lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY;
  },{passive:true});

  document.addEventListener('touchend', ()=>{
    isDragging=false; isHovering=false;
    autoAngle=0;
  });

  // ---- Hint text update ----
  const hintIcon = document.getElementById('hint-icon');
  card.addEventListener('mousedown', ()=>{ if(hintIcon) hintIcon.style.animationPlayState='paused'; });
  document.addEventListener('mouseup', ()=>{ if(hintIcon) hintIcon.style.animationPlayState='running'; });
})();

// ========== SCROLL REVEAL ==========
const revEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.12});
revEls.forEach(el=>obs.observe(el));

// ========== PARALLAX ==========
(function(){
  const bg = document.getElementById('parallax-bg');
  if(!bg) return;
  window.addEventListener('scroll', ()=>{
    const banner = document.getElementById('parallax-banner');
    if(!banner) return;
    const rect=banner.getBoundingClientRect();
    const offset=rect.top * .35;
    bg.style.transform=`translateY(${offset}px)`;
  });
})();

// ========== COUNTER ANIMATION ==========
function animCount(el, target, duration=1800){
  const start=Date.now();
  const t=typeof target==='number'?target:parseInt(target);
  function update(){
    const elapsed=Date.now()-start;
    const progress=Math.min(elapsed/duration,1);
    const eased=1-Math.pow(1-progress,3);
    const val=Math.floor(eased*t);
    el.textContent=val.toLocaleString('hu');
    if(progress<1) requestAnimationFrame(update);
    else el.textContent=t.toLocaleString('hu');
  }
  update();
}
const countObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const target=e.target.dataset.count;
      if(target) animCount(e.target, parseInt(target));
      countObs.unobserve(e.target);
    }
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>countObs.observe(el));

// ========== INTERACTIVE INSTALLER ==========
(function(){
  // ---- State ----
  let selGame = 'Poppy Playtime';
  let selChapter = 1;
  let backupLocal = true;
  let backupCloud = false;
  let autoUpdate = true;

  const GAMES = {
    'Poppy Playtime': {
      chapters: [
        { num:1, label:'Chapter 1', status:'kész',     avail:true  },
        { num:2, label:'Chapter 2', status:'kész',     avail:true  },
        { num:3, label:'Chapter 3', status:'kész',     avail:true  },
        { num:4, label:'Chapter 4', status:'folyamatban', avail:true  },
        { num:5, label:'Chapter 5', status:'hamarosan', avail:false },
      ]
    },
    'Hello Neighbor':               { chapters:[{ num:1, label:'Teljes játék', status:'kész', avail:true }] },
    'Bendy and the Ink Machine':    { chapters:[{ num:1, label:'Teljes játék', status:'kész', avail:true }] },
    'Dredge':                       { chapters:[{ num:1, label:'Teljes játék', status:'hamarosan', avail:false }] },
  };

  function statusColor(s){ return s==='kész'?'var(--green)':s==='folyamatban'?'#ffaa00':'#666'; }

  // ---- DOM refs ----
  const panels   = { 1:id('panel-1'), 2:id('panel-2'), 3:id('panel-3'), 4:id('panel-4') };
  const tabs     = { 1:id('stab-1'), 2:id('stab-2'), 3:id('stab-3'), 4:id('stab-4') };
  const termBody = id('term-body');
  function id(x){ return document.getElementById(x); }

  function showPanel(n){
    Object.values(panels).forEach((p,i)=>{ if(p){ p.classList.toggle('hidden', i+1!==n); } });
    Object.entries(tabs).forEach(([k,t])=>{
      t.classList.remove('active','done');
      if(+k===n) t.classList.add('active');
      if(+k<n)   t.classList.add('done');
    });
  }

  // ---- Game selection ----
  document.querySelectorAll('.inst-game-item:not(.disabled)').forEach(el=>{
    el.addEventListener('click', ()=>{
      document.querySelectorAll('.inst-game-item').forEach(e=>e.classList.remove('selected'));
      el.classList.add('selected');
      selGame = el.dataset.game;
      selChapter = 1;
    });
  });

  // ---- Chapter panel build ----
  function buildChapters(){
    const grid = id('chapter-grid');
    grid.innerHTML = '';
    const chapters = GAMES[selGame]?.chapters || [];
    chapters.forEach(ch=>{
      const btn = document.createElement('div');
      btn.className = 'inst-chapter-btn' + (ch.avail?'':' disabled') + (ch.num===selChapter?' selected':'');
      btn.innerHTML = `<div class="icb-num">${ch.num}</div><div class="icb-label">${ch.label}</div><div class="icb-status" style="color:${statusColor(ch.status)}">${ch.status.toUpperCase()}</div>`;
      if(ch.avail){
        btn.addEventListener('click',()=>{
          document.querySelectorAll('.inst-chapter-btn').forEach(b=>b.classList.remove('selected'));
          btn.classList.add('selected');
          selChapter = ch.num;
        });
      }
      grid.appendChild(btn);
    });
  }

  // ---- Toggle logic ----
  function bindToggle(togId, onSet, initial){
    let state = initial;
    const tog = id(togId);
    if(!tog) return;
    tog.dataset.state = state ? 'on' : 'off';
    tog.parentElement.addEventListener('click',()=>{
      state = !state;
      tog.dataset.state = state ? 'on' : 'off';
      onSet(state);
    });
  }
  bindToggle('tog-local',   v=>{ backupLocal=v; }, true);
  bindToggle('tog-cloud',   v=>{ backupCloud=v; }, false);
  bindToggle('tog-autoupd', v=>{ autoUpdate=v;  }, true);

  // ---- Nav buttons ----
  id('btn-to-2').addEventListener('click',()=>{ buildChapters(); showPanel(2); });
  id('btn-back-1').addEventListener('click',()=>{ showPanel(1); });
  id('btn-to-3').addEventListener('click',()=>{ showPanel(3); });
  id('btn-back-2').addEventListener('click',()=>{ showPanel(2); });
  id('btn-to-4').addEventListener('click',()=>{ showPanel(4); startInstall(); });

  // ---- Terminal animation ----
  let abortFlag = false;
  let running   = false;

  async function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

  function cs(color,text){ const s=document.createElement('span'); s.style.color=color; s.textContent=text; return s; }
  function nl(){ return document.createElement('div'); }

  async function typeInto(el, text, speed=30){
    for(let i=0;i<text.length;i++){
      if(abortFlag) return;
      el.textContent += text[i];
      termBody.scrollTop = termBody.scrollHeight;
      await sleep(speed + Math.random()*speed*.4);
    }
  }

  async function addLine(type, text, speed=28){
    if(abortFlag) return;
    const line = nl(); termBody.appendChild(line);
    const configs = {
      prompt:  ['var(--green)',  'C:\\HPH> ',    '#c8e6d4'],
      info:    ['#00d4ff',       '[ INFO ] ',    null      ],
      ok:      ['var(--green)',  '[  OK  ] ',    null      ],
      warn:    ['#ffaa00',       '[ WARN ] ',    null      ],
      success: ['var(--green)',  '[ KÉSZ ] ',    '#ffffff' ],
      hint:    ['#ffaa00',       '[ HINT ] ',    null      ],
      backup:  ['#00d4ff',       '[ BACKUP ] ',  null      ],
      cloud:   ['#a78bfa',       '[ CLOUD ] ',   null      ],
      update:  ['#00d4ff',       '[  UPD  ] ',   null      ],
    };
    const [tagColor, tagText, txtColor] = configs[type] || configs.info;
    const tag = cs(tagColor, tagText);
    const txt = document.createElement('span');
    if(txtColor) txt.style.color = txtColor;
    line.append(tag, txt);
    const cur = cs('var(--green)', '▌');
    cur.style.cssText = 'animation:pulse .9s infinite;display:inline-block;';
    line.appendChild(cur);
    await typeInto(txt, text, speed);
    line.removeChild(cur);
  }

  async function animBar(label, color='var(--green)'){
    if(abortFlag) return;
    const line = nl();
    line.style.cssText = 'background:rgba(0,255,136,0.05);padding:4px 8px;margin:2px 0;display:flex;align-items:center;gap:8px;font-family:"Share Tech Mono",monospace;font-size:.7rem;';
    const lbl = cs('#4a7a60', label+' ');
    const bar = cs(color, '');
    const br2 = cs('#4a7a60', ' ');
    const pct = document.createElement('span');
    pct.style.cssText = `color:${color};min-width:36px;`;
    pct.textContent = '0%';
    line.append(lbl, cs('#4a7a60','['), bar, cs('#4a7a60',']'), pct);
    termBody.appendChild(line);
    const N = 18;
    for(let i=0;i<=N;i++){
      if(abortFlag) return;
      bar.textContent = '█'.repeat(i)+'░'.repeat(N-i);
      pct.textContent = Math.round(i/N*100)+'%';
      termBody.scrollTop = termBody.scrollHeight;
      await sleep(55+Math.random()*25);
    }
  }

  async function startInstall(){
    if(running){ abortFlag=true; await sleep(100); }
    abortFlag=false; running=true;
    termBody.innerHTML='';

    const chData = GAMES[selGame]?.chapters.find(c=>c.num===selChapter);
    const chName = chData?.label || `Chapter ${selChapter}`;
    const gameName = selGame.replace(/ /g,'_');

    await addLine('prompt', `hph-install.exe --game "${gameName}" --chapter ${selChapter}`, 36);
    await sleep(250);
    await addLine('info',   'Kapcsolódás a HPH szerverhez...');
    await sleep(400);
    await addLine('ok',     'Szerver elérve – ping 24ms');
    await sleep(200);
    await addLine('info',   `Játék: ${selGame} / ${chName}`);
    await sleep(300);
    await addLine('info',   'Patch verzió ellenőrzése...');
    await sleep(500);
    await addLine('ok',     'Legfrissebb verzió: v3.1.2');
    await sleep(200);

    // Backup
    if(backupLocal){
      await addLine('backup','Lokális backup indítása...');
      await sleep(200);
      await animBar('BACKUP', 'var(--green)');
      await sleep(100);
      await addLine('ok',    'Backup elmentve → C:\\HPH\\backup\\');
    }
    if(backupCloud){
      await addLine('cloud', 'Felhő backup feltöltése...');
      await sleep(200);
      await animBar('CLOUD ', '#a78bfa');
      await sleep(100);
      await addLine('ok',    'Felhő backup szinkronizálva ✓');
    }
    if(!backupLocal && !backupCloud){
      await addLine('warn',  'Backup kikapcsolva – kihagyás...');
      await sleep(300);
    }

    await sleep(200);
    await addLine('info',   `Patch fájl letöltése (48.2 MB)...`);
    await animBar('LETÖLTÉS');
    await sleep(150);
    await addLine('info',   'Fájlok kicsomagolása...');
    await sleep(350);
    await addLine('info',   'Szövegfájlok cseréje...');
    await animBar('SZÖVEG  ');
    await sleep(200);
    await addLine('info',   'Hanganyag lokalizálása...');
    await animBar('HANGANYAG');
    await sleep(200);
    await addLine('info',   'Konfiguráció írása...');
    await sleep(300);

    if(autoUpdate){
      await addLine('update', 'Automatikus frissítés: BEKAPCSOLVA');
      await sleep(200);
    }

    await sleep(200);
    await addLine('success', `${selGame} – ${chName} sikeresen telepítve! 🇭🇺`, 30);
    await sleep(200);
    await addLine('hint',    'Indítsd újra a játékot a változásokhoz.', 26);
    await sleep(300);

    // final prompt
    const fl = nl(); termBody.appendChild(fl);
    fl.append(cs('var(--green)','C:\\HPH> '));
    const fcur = cs('var(--green)','▌');
    fcur.style.cssText = 'animation:pulse .9s infinite;display:inline-block;';
    fl.appendChild(fcur);
    termBody.scrollTop = termBody.scrollHeight;
    running = false;
  }

  // Replay button resets to panel 1
  const replayBtn = id('term-replay');
  if(replayBtn) replayBtn.addEventListener('click',()=>{
    showPanel(1);
    document.querySelectorAll('.inst-game-item').forEach(e=>e.classList.remove('selected'));
    document.querySelector('[data-game="Poppy Playtime"]')?.classList.add('selected');
    selGame='Poppy Playtime'; selChapter=1;
  });

  showPanel(1);
})();

// ========== NAVBAR SCROLL ==========
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  if(window.scrollY>60) nav.style.background='rgba(2,5,8,0.97)';
  else nav.style.background='rgba(4,10,15,0.85)';
});