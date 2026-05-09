// =============================================
// VELOUR STUDIO — generic.js
// Our Standards page interactions: mobile nav, fade-in, book buttons, smooth scroll
// =============================================

(function () {
  'use strict';

  // --- Mobile Navigation ---
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

  // --- Book buttons (simulate booking) ---
  const bookButtons = document.querySelectorAll('.book-btn, .btn-primary, .fab-book, .btn-book:not(.site-nav .btn-book), .mobile-book');
  bookButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      // avoid double interception; but allow for actual links
      const href = this.getAttribute('href');
      if (href && href.startsWith('https://your-booking-link.com')) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener');
        console.log('Booking redirect to:', href);
        return;
      }
      if (!href || href === '#' || href.includes('your-booking-link')) {
        e.preventDefault();
        alert('✨ Secure booking portal opens in new tab. Thank you for trusting Velour Studio.');
        // simulate open dummy booking
        window.open('https://your-booking-link.com', '_blank');
      }
    });
  });

  // --- Intersection Observer for staggered fade-in cards (pillars, faq, policy) ---
  const fadeElements = document.querySelectorAll('.pillar-card, .faq-item, .policy-text, .hardwax-content, .license-text, .license-badge');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          const el = entry.target;
          // add delay for cascade
          const delay = Math.min(Array.from(el.parentElement?.children || []).indexOf(el) * 80, 400);
          el.style.transitionDelay = delay + 'ms';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

    fadeElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.5s ease';
      observer.observe(el);
    });
  } else {
    // fallback: show all
    fadeElements.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

  // --- Smooth scroll for anchor links that need offset (if any internal anchor)---
  const headerHeight = document.getElementById('site-header')?.offsetHeight || 70;
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const offsetTop = targetElem.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // Simple header shadow on scroll
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 8px 28px rgba(28,28,28,0.1)';
      } else {
        header.style.boxShadow = '0 2px 20px rgba(28,28,28,0.06)';
      }
    });
  }

  console.log('Velour Studio | Standards page ready — hygiene first');
})();