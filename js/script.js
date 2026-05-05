// ===================== STARS =====================
function makeStars(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    for (let i = 0; i < 80; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 4}s;opacity:${0.2 + Math.random() * 0.8}`;
        c.appendChild(s);
    }
}

makeStars('starsContainer');
makeStars('starsContainer2');

// ===================== NAV DOTS =====================
const sections = document.querySelectorAll('section[id]');
const nav      = document.getElementById('navDots');
const labels   = ['Portada', 'Cap. 1', 'Cap. 2', 'Cap. 3', 'Cap. 4', 'Cap. 5', 'Cap. 6', 'Final'];

sections.forEach((sec, i) => {
    const d = document.createElement('button');
    d.className = 'nav-dot' + (i === 0 ? ' active' : '');
    d.title = labels[i] || '';
    d.setAttribute('aria-label', labels[i] || 'Sección ' + (i + 1));
    d.onclick = () => sec.scrollIntoView({ behavior: 'smooth' });
    nav.appendChild(d);
});

const dots     = nav.querySelectorAll('.nav-dot');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const idx = [...sections].indexOf(e.target);
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===================== MUSIC =====================
const audio = document.getElementById('bgMusic');
const btn   = document.getElementById('musicBtn');

function setPlaying(on) {
    btn.textContent = on ? '❚❚' : '♪';
    btn.classList.toggle('playing', on);
}

window.addEventListener('load', () => {
    audio.volume = 0.5;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
});

btn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => setPlaying(true));
    } else {
        audio.pause();
        setPlaying(false);
    }
});
