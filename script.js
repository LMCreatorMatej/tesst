// ============================================================
// IRONFIT GYM — script.js
// Mobilni izbornik, sticky nav, scroll-reveal, brojači, forma
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav pri skrolanju ---------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobilni izbornik (burger) ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    burger.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll-reveal animacije (IntersectionObserver) ---------- */
  const revealItems = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealItems.forEach(item => revealObserver.observe(item));

  /* ---------- Animirani brojači u hero sekciji ---------- */
  const counters = document.querySelectorAll('.stat__num');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Kontakt forma (demo slanje) ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Ovdje po potrebi spoji stvarni backend / email servis (npr. Formspree, EmailJS).
    formNote.textContent = 'Hvala! Tvoja poruka je zaprimljena — javit ćemo se uskoro.';
    formNote.style.color = '#4ade80';
    form.reset();
    setTimeout(() => { formNote.textContent = ''; }, 5000);
  });

  /* ---------- Godina u footeru ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
