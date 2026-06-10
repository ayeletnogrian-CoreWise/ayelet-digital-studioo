/* Ayelet Digital Studio — script.js */

/* ── Header scroll state ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ── Mobile menu ── */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!header.contains(e.target)) {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});


/* ── Scroll-to-top button ── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── Fade-up on scroll (Intersection Observer) ── */
const fadeTargets = document.querySelectorAll(
  '.service-card, .project-card, .process-step, .pricing-card, .about-inner, .contact-inner'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeTargets.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});


/* ── Lightbox ── */
(function () {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');

  // Build gallery map: { galleryKey: [ { src, alt }, ... ] sorted by index }
  const galleries = {};

  document.querySelectorAll('[data-gallery]').forEach(img => {
    const key = img.dataset.gallery;
    const idx = parseInt(img.dataset.index, 10);
    if (!galleries[key]) galleries[key] = [];
    galleries[key].push({ src: img.src, alt: img.alt, idx });
  });

  // Sort each gallery by index
  Object.keys(galleries).forEach(key => {
    galleries[key].sort((a, b) => a.idx - b.idx);
  });

  let currentGallery = null;
  let currentIndex   = 0;

  function open(galleryKey, index) {
    currentGallery = galleryKey;
    currentIndex   = index;
    show();
    lightbox.classList.add('is-open');
    lightbox.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function show() {
    const items = galleries[currentGallery];
    if (!items) return;
    lbImg.style.opacity = '0';
    lbImg.src = items[currentIndex].src;
    lbImg.alt = items[currentIndex].alt;
    lbImg.onload = () => { lbImg.style.opacity = '1'; };
    lbCounter.textContent = `${currentIndex + 1} / ${items.length}`;

    lbPrev.style.display = items.length > 1 ? 'flex' : 'none';
    lbNext.style.display = items.length > 1 ? 'flex' : 'none';
  }

  function prev() {
    const items = galleries[currentGallery];
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    show();
  }

  function next() {
    const items = galleries[currentGallery];
    currentIndex = (currentIndex + 1) % items.length;
    show();
  }

  // Attach click handlers to all trigger images
  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
      open(img.dataset.gallery, parseInt(img.dataset.index, 10));
    });
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // Click outside image to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target === lbImg.parentElement) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowRight')  prev();  // RTL: right = previous
    if (e.key === 'ArrowLeft')   next();  // RTL: left = next
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? prev() : next();
    }
  });
})();


/* ── Contact form (static placeholder) ── */
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name    = contactForm.name.value.trim();
  const phone   = contactForm.phone.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !phone || !message) return;

  // Replace this block with your actual form endpoint (Formspree, Netlify Forms, etc.)
  contactForm.querySelector('button[type="submit"]').disabled = true;
  formSuccess.classList.add('visible');
  contactForm.reset();
});
