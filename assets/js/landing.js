// =============================================
// VELOUR STUDIO — landing.js
// Services Page Interactions
// =============================================

(function () {
  'use strict';

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // --- Book Buttons ---
  const bookButtons = document.querySelectorAll('.book-btn');

  bookButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const service = this.getAttribute('data-service');
      if (service) {
        // Build a specific booking URL per service if your platform supports it
        // e.g. Vagaro, MindBody, Square Appointments
        const bookingBase = 'https://your-booking-link.com';
        const url = bookingBase + '?service=' + encodeURIComponent(service);
        // window.open(url, '_blank', 'noopener');
        console.log('Booking:', service, '→', url);
        alert('Redirecting to book: ' + service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      }
    });
  });

  // --- Category Nav: Active Pill on Scroll ---
  const categories = document.querySelectorAll('.service-category[id]');
  const catPills   = document.querySelectorAll('.cat-pill');
  const siteHeaderH = document.getElementById('site-header')?.offsetHeight || 72;
  const catNavH     = document.querySelector('.category-nav')?.offsetHeight || 56;
  const offset      = siteHeaderH + catNavH + 40;

  function updateActivePill() {
    let current = '';
    categories.forEach(function (section) {
      if (window.scrollY + offset >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    catPills.forEach(function (pill) {
      const href = pill.getAttribute('href');
      pill.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActivePill, { passive: true });
  updateActivePill();

  // --- Smooth scroll for anchor links (account for sticky headers) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (siteHeaderH + catNavH + 20);
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Staggered entrance for service items ---
  if ('IntersectionObserver' in window) {
    const items = document.querySelectorAll('.service-item, .bundle-card, .service-category .category-title-block');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = Array.from(el.parentElement.children);
          const delay = Math.min(siblings.indexOf(el) * 60, 300);
          el.style.transitionDelay = delay + 'ms';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    items.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(item);
    });
  }

})();
