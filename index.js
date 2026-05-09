// =============================================
// VELOUR STUDIO — index.js
// Homepage Interactions
// =============================================

(function () {
  'use strict';

  // --- Sticky Header Shadow ---
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // --- Scroll-Reveal for Cards ---
  const revealCards = document.querySelectorAll('.reveal-card');

  if (revealCards.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // Stagger by index within parent
          const siblings = Array.from(entry.target.parentElement.children);
          const delay = siblings.indexOf(entry.target) * 120;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealCards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    // Fallback: show all immediately
    revealCards.forEach(function (card) {
      card.classList.add('visible');
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('site-header').offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes('#' + current)) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // --- Preload class removal (prevents flash of unstyled content) ---
  window.addEventListener('load', function () {
    document.body.classList.remove('is-preload');
  });

})();
