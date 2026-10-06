/* chapter3.js — pétalos que caen + jardín de 15 rosas */
(function () {
  'use strict';

  /* Pétalos */
  function makePetals(box, n) {
    if (!box) return;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      const s = 8 + Math.random() * 12;
      p.style.cssText =
        `left:${Math.random() * 100}%;width:${s}px;height:${s * 1.3}px;` +
        `--dx:${(Math.random() * 160 - 80).toFixed(0)}px;--r:${(360 + Math.random() * 540).toFixed(0)}deg;` +
        `animation-duration:${(7 + Math.random() * 8).toFixed(1)}s;animation-delay:-${(Math.random() * 14).toFixed(1)}s;`;
      box.appendChild(p);
    }
  }
  makePetals(document.getElementById('petals'), 22);

  /* Rosa en SVG: 4 capas de pétalos + tallo y hoja */
  const layers = [
    { n: 7, r: 30, rx: 17, ry: 23, c: '#8e1240', off: 0 },
    { n: 6, r: 23, rx: 14, ry: 18, c: '#b3164a', off: 20 },
    { n: 5, r: 16, rx: 11, ry: 14, c: '#d6336c', off: 40 },
    { n: 4, r: 9,  rx: 8,  ry: 10, c: '#ee6a98', off: 10 }
  ];
  function roseSVG() {
    let g = '';
    layers.forEach((l, i) => {
      let petals = '';
      for (let k = 0; k < l.n; k++) {
        const a = l.off + (360 / l.n) * k;
        petals += `<ellipse cx="50" cy="${55 - l.r}" rx="${l.rx}" ry="${l.ry}" fill="${l.c}" stroke="rgba(0,0,0,.18)" stroke-width=".8" transform="rotate(${a} 50 55)"/>`;
      }
      g += `<g class="L L${i + 1}">${petals}</g>`;
    });
    return `<svg class="rose" viewBox="0 0 100 135" aria-hidden="true">
      <path d="M50 88 C49 105 52 118 50 134" stroke="#2f7a4d" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M51 112 C64 104 72 108 76 114 C66 120 57 119 51 112Z" fill="#3a9560"/>
      ${g}</svg>`;
  }

  /* Jardín */
  const reasons = [
    'Tu risa, incluso cuando te ríes de algo que ni tiene gracia.',
    'Cómo te emocionas con lo que te gusta.',
    'Tus manos de arquitecta, que ya construyen.',
    'Que me escuches aunque estés agotada.',
    'Tus audios y tus mensajes a medio dormir.',
    'Cómo me regañas con cariño.',
    'Nuestras llamadas en silencio, tan nuestras.',
    'Que me hagas sentir en casa a kilómetros de distancia.',
    'Que pelees por nosotros, nunca contra mí.',
    'Tus ganas de seguir, aunque el mes pese.',
    'Cada noche de juego, aunque a veces pierda.',
    'Nuestra serie nueva, capítulo a capítulo.',
    'Tu acento, que ya es mi sonido favorito.',
    'Que seas mi paz en mis días más ocupados.',
    'Que después de quince meses te elijo igual. O más.'
  ];
  const garden = document.getElementById('garden');
  const msg = document.getElementById('roseMsg');
  const count = document.getElementById('roseCount');
  const done = document.getElementById('gardenDone');
  if (!garden) return;
  const opened = new Set();

  reasons.forEach((text, i) => {
    const b = document.createElement('button');
    b.className = 'rose-btn';
    b.setAttribute('aria-label', `Rosa ${i + 1} de 15`);
    b.innerHTML = roseSVG();
    b.addEventListener('click', () => {
      b.querySelector('.rose').classList.add('open');
      garden.querySelectorAll('.rose-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      msg.textContent = `${i + 1}. ${text}`;
      opened.add(i);
      count.textContent = `${opened.size} de 15 rosas abiertas`;
      if (opened.size === reasons.length) {
        done.classList.add('show');
        makePetals(document.getElementById('petalsGarden'), 30);
      }
    });
    garden.appendChild(b);
  });
})();
