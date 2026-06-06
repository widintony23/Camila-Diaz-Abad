/* ============================================================
   LIBRO DE AMOR — CAMILA DÍAZ ABAD
   script.js · Completo
   ============================================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────
     1. ESTRELLAS ANIMADAS
     Genera partículas en todos los contenedores .stars
  ───────────────────────────────────────────────────── */
  function buildStars(container, count) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'star-dot';
      const size = Math.random() * 2.4 + 0.4;
      el.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `top:${Math.random() * 100}%`,
        `left:${Math.random() * 100}%`,
        `--d:${(2 + Math.random() * 4).toFixed(2)}s`,
        `--delay:${(Math.random() * 6).toFixed(2)}s`,
        `--op:${(0.3 + Math.random() * 0.7).toFixed(2)}`
      ].join(';');
      container.appendChild(el);
    }
  }

  document.querySelectorAll('.stars').forEach(c => buildStars(c, 90));

  /* ─────────────────────────────────────────────────────
     2. MÚSICA DE FONDO
  ───────────────────────────────────────────────────── */
  const audio    = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');

  if (audio && musicBtn) {
    let playing = false;

    musicBtn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('aria-label', 'Reproducir música');
      } else {
        audio.play().catch(() => {});
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-label', 'Pausar música');
      }
      playing = !playing;
    });

    // Intentar autoplay silencioso (algunos browsers lo bloquean)
    window.addEventListener('click', function tryAutoplay() {
      if (!playing) {
        audio.volume = 0.4;
        audio.play().then(() => {
          playing = true;
          musicBtn.classList.add('playing');
        }).catch(() => {});
      }
      window.removeEventListener('click', tryAutoplay);
    }, { once: true });
  }

  /* ─────────────────────────────────────────────────────
     3. NAV DOTS (puntos de navegación laterales)
  ───────────────────────────────────────────────────── */
  const navContainer = document.getElementById('navDots');
  const sections     = Array.from(document.querySelectorAll('section[id]'));

  const sectionLabels = {
    s0: 'Portada',
    s1: 'Dos mundos',
    s2: 'El chat',
    s3: 'Diez meses',
    s4: 'La tormenta',
    s5: 'Promesas',
    s6: 'Lo que vimos',
    s7: 'Final'
  };

  if (navContainer && sections.length) {
    sections.forEach((sec, i) => {
      const dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.setAttribute('aria-label', sectionLabels[sec.id] || `Sección ${i + 1}`);
      dot.title = sectionLabels[sec.id] || '';
      dot.addEventListener('click', () => {
        sec.scrollIntoView({ behavior: 'smooth' });
      });
      navContainer.appendChild(dot);
    });

    // IntersectionObserver para resaltar el dot activo
    const dotEls = navContainer.querySelectorAll('.nav-dot');

    const ioNav = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target);
            dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(s => ioNav.observe(s));
  }

  /* ─────────────────────────────────────────────────────
     4. FADE-IN ON SCROLL
     Anima cualquier elemento con clase .fade-in
  ───────────────────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length) {
    const ioFade = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // pequeño delay escalonado si varios entran a la vez
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 80);
            ioFade.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => ioFade.observe(el));
  }

  /* ─────────────────────────────────────────────────────
     5. EFECTO PARALLAX SUAVE EN LA PORTADA
  ───────────────────────────────────────────────────── */
  const coverSection = document.getElementById('s0');

  if (coverSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const coverH  = coverSection.offsetHeight;
      if (scrollY < coverH * 1.2) {
        const deco = coverSection.querySelector('.cover-deco');
        if (deco) deco.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
        const starLayer = coverSection.querySelector('.stars');
        if (starLayer) starLayer.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────────
     6. HOVER: MONTH BUBBLES — tooltip de mes
  ───────────────────────────────────────────────────── */
  const monthNames = [
    'Primer mes', 'Segundo mes', 'Tercer mes', 'Cuarto mes',
    'Quinto mes', 'Sexto mes', 'Séptimo mes', 'Octavo mes',
    'Noveno mes', '¡Décimo mes! 🎉'
  ];

  document.querySelectorAll('.month-bubble').forEach((bubble, i) => {
    bubble.setAttribute('title', monthNames[i] || `Mes ${i + 1}`);
  });

  /* ─────────────────────────────────────────────────────
     7. SCROLL SUAVE CON TECLAS
  ───────────────────────────────────────────────────── */
  let currentSection = 0;

  document.addEventListener('keydown', e => {
    if (!sections.length) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      currentSection = Math.min(currentSection + 1, sections.length - 1);
      sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      currentSection = Math.max(currentSection - 1, 0);
      sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* sincroniza currentSection con el scroll real */
  const ioSync = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          if (idx !== -1) currentSection = idx;
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach(s => ioSync.observe(s));

  /* ─────────────────────────────────────────────────────
     8. SHOW CARDS — efecto tilt suave en desktop
  ───────────────────────────────────────────────────── */
  function tiltCard(card) {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-5px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }

  if (window.innerWidth > 700) {
    document.querySelectorAll('.show-card').forEach(tiltCard);
    document.querySelectorAll('.promise-card').forEach(tiltCard);
  }

  /* ─────────────────────────────────────────────────────
     9. CORAZÓN FINAL — explosión de partículas al clickear
  ───────────────────────────────────────────────────── */
  const finalHeart = document.querySelector('.final-heart');

  if (finalHeart) {
    finalHeart.style.cursor = 'pointer';
    finalHeart.addEventListener('click', () => {
      const colors = ['#c0445a', '#e8b96a', '#c9933a', '#fff', '#f0a0b0'];
      const rect = finalHeart.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;

      for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 22;
        const dist  = 60 + Math.random() * 80;
        p.style.cssText = `
          position:fixed;
          pointer-events:none;
          z-index:9999;
          width:${4 + Math.random() * 5}px;
          height:${4 + Math.random() * 5}px;
          border-radius:50%;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          left:${cx}px; top:${cy}px;
          transition: transform 0.7s ease-out, opacity 0.7s ease-out;
        `;
        document.body.appendChild(p);
        requestAnimationFrame(() => {
          p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
          p.style.opacity   = '0';
        });
        setTimeout(() => p.remove(), 800);
      }
    });
  }

})();