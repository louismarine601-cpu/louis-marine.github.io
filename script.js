/* ─── Navigation mobile ─── */

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

/* ─── Carrousels ─── */

document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track ? track.children : []);
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const counter = carousel.querySelector('.carousel-counter');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let current = 0;

  const go = (index) => {
    current = (index + slides.length) % slides.length;
    const w = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${w * current}px)`;
    slides.forEach((s, i) => s.classList.toggle('current-slide', i === current));
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  prevBtn.addEventListener('click', () => go(current - 1));
  nextBtn.addEventListener('click', () => go(current + 1));

  /* Keyboard navigation when carousel is focused */
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
  });

  /* Touch / swipe support */
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener('resize', () => go(current));
  go(0);
});

/* ─── Blobs : fondu au scroll ─── */

const pageBlobs = document.querySelector('.page-blobs');

if (pageBlobs) {
  function updateBlobOpacity() {
    const scrolled = window.scrollY;
    const pageHeight = document.body.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0 ? scrolled / pageHeight : 0;
    // Pleine opacité jusqu'à 10% de scroll, puis fondu jusqu'à disparaître à 85%
    const opacity = 1 - Math.min(1, Math.max(0, (progress - 0.1) / 0.75));
    pageBlobs.style.opacity = opacity;
  }

  window.addEventListener('scroll', updateBlobOpacity, { passive: true });
  updateBlobOpacity();
}
