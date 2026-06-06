/* ══════════════════════════════════════════
   script.js — JS compartido
   Usado por: index.html, chapter1.html, chapter2.html
══════════════════════════════════════════ */

/* ── Stars generator ───────────────────── */
function buildStars(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star-dot';
    const sz = Math.random() * 2.5 + 0.4;
    s.style.cssText = `
      width:${sz}px;
      height:${sz}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      --d:${(2 + Math.random() * 4).toFixed(2)}s;
      --delay:${(Math.random() * 5).toFixed(2)}s;
      --op:${(0.3 + Math.random() * 0.7).toFixed(2)};
    `;
    c.appendChild(s);
  }
}

// Llama con todos los IDs posibles; ignora los que no existan
['starsContainer', 'starsContainer2', 'starsHero', 'starsClose'].forEach(id => buildStars(id, 80));

/* ── Fade-in on scroll ─────────────────── */
function initFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initFadeIn);

/* ── Music button (solo en index) ─────── */
function initMusic() {
  const audio    = document.getElementById('bgMusic');
  const btn      = document.getElementById('musicBtn');
  const wrap     = document.getElementById('musicWrap');
  if (!audio || !btn) return;

  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      btn.textContent = '♪';
    } else {
      audio.play().catch(() => {});
      btn.classList.add('playing');
      btn.textContent = '■';
    }
    playing = !playing;
  });
}
document.addEventListener('DOMContentLoaded', initMusic);

/* ── Nav Dots (solo en index) ──────────── */
function initNavDots() {
  const nav = document.getElementById('navDots');
  if (!nav) return;

  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  sections.forEach((sec, i) => {
    const dot = document.createElement('button');
    dot.className = 'nav-dot';
    dot.title = sec.id;
    dot.addEventListener('click', () => sec.scrollIntoView({ behavior: 'smooth' }));
    nav.appendChild(dot);
  });

  const dots = nav.querySelectorAll('.nav-dot');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(sections).indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => obs.observe(sec));
}
document.addEventListener('DOMContentLoaded', initNavDots);