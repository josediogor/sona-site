/* sona landing — interactions */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SHOT = /[?&]shot/.test(location.search); // screenshot/QA mode: reveal everything

  /* ---- shared refs + single rAF-throttled scroll handler ---- */
  const nav = document.getElementById('nav');
  const heroEl = document.querySelector('.hero');
  const finalEl = document.querySelector('.final');
  const bar = document.getElementById('mobilebar');
  let vh = window.innerHeight;

  const onFrame = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
    if (bar && heroEl) {
      const heroOut = heroEl.getBoundingClientRect().bottom < 8;
      const finalIn = finalEl ? finalEl.getBoundingClientRect().top < vh * 0.92 : false;
      bar.classList.toggle('show', heroOut && !finalIn);
    }
  };
  let sraf = null;
  const onScroll = () => { if (sraf) return; sraf = requestAnimationFrame(() => { onFrame(); sraf = null; }); };
  onFrame();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { vh = window.innerHeight; onFrame(); }, { passive: true });

  /* ---- scroll reveals ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (SHOT) {
    reveals.forEach((el) => { el.style.transition = 'none'; el.classList.add('in'); });
  } else if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---- starfields ---- */
  const seedStars = (container, count, opts = {}) => {
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      const size = (opts.min || 1.5) + Math.random() * (opts.max || 2.5);
      s.style.width = s.style.height = size.toFixed(1) + 'px';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      s.style.setProperty('--tw', (3 + Math.random() * 4).toFixed(1) + 's');
      s.style.setProperty('--td', (Math.random() * 5).toFixed(1) + 's');
      frag.appendChild(s);
    }
    container.appendChild(frag);
  };
  document.querySelectorAll('.hero .stars, .final .stars').forEach((c) => seedStars(c, 22));
  seedStars(document.querySelector('.night__stars'), 60, { min: 1, max: 2.6 });

  /* ---- gentle hero parallax (scoped to hero only) ---- */
  if (!reduce && heroEl && window.matchMedia('(pointer:fine)').matches) {
    const items = heroEl.querySelectorAll('[data-parallax]');
    if (items.length) {
      let raf = null;
      heroEl.addEventListener('mousemove', (ev) => {
        const r = heroEl.getBoundingClientRect();
        const dx = (ev.clientX - r.left) / r.width - 0.5;
        const dy = (ev.clientY - r.top) / r.height - 0.5;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          items.forEach((el) => {
            const f = parseFloat(el.dataset.parallax) * 60;
            const base = el.classList.contains('phone--front') ? -3 : (el.classList.contains('phone--back') ? 5 : 0);
            el.style.transform = `translate(${(-dx * f).toFixed(1)}px, ${(-dy * f).toFixed(1)}px) rotate(${base}deg)`;
          });
          raf = null;
        });
      });
      heroEl.addEventListener('mouseleave', () => {
        items.forEach((el) => { el.style.transform = ''; });
      });
    }
  }

  /* ---- smooth anchor offset for fixed nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
