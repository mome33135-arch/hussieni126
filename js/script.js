/**
 * MOHAMED ELHUSSIENI - MATHEMATICS TEACHER PORTFOLIO
 * Pure Vanilla JavaScript Logic
 * - Theme Switcher (Dark/Light Mode with localStorage)
 * - Language Toggle (EN / AR with Direction Support)
 * - Mobile Navigation Menu & Scroll Spy
 * - Animated Counters on Viewport Entry
 * - Interactive Mathematical Particle Canvas
 * - Alhussieni Series Book Lightbox Modal
 * - Contact Form Handler & Toast Notification
 * - Smooth Scroll & Back to Top
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Management (Dark Mode Default)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check persisted theme or default to dark
  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('site-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        themeIcon.className = 'fas fa-moon';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. Language & Direction Toggle (EN / AR)
  // --------------------------------------------------------------------------
  const langToggleBtn = document.getElementById('lang-toggle');
  const savedLang = localStorage.getItem('site-lang') || 'en';
  applyLanguage(savedLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(newLang);
      localStorage.setItem('site-lang', newLang);
    });
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    if (lang === 'ar') {
      document.body.classList.add('lang-ar');
      document.documentElement.setAttribute('dir', 'rtl');
      if (langToggleBtn) langToggleBtn.textContent = 'English';
    } else {
      document.body.classList.remove('lang-ar');
      document.documentElement.setAttribute('dir', 'ltr');
      if (langToggleBtn) langToggleBtn.textContent = 'عربي';
    }
  }

  // --------------------------------------------------------------------------
  // 3. Navigation Bar & Mobile Drawer
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when clicking any nav link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Scroll Spy (Active Navigation Link Highlighting)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], header[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinksItems.forEach(link => link.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --------------------------------------------------------------------------
  // 6. Animated Statistics / Counters
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function runCounters() {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1800;
      const start = 0;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad easing
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.floor(start + (target - start) * easeProgress);

        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const statsSection = document.getElementById('highlights');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  } else {
    runCounters();
  }

  // --------------------------------------------------------------------------
  // 7. Lightbox Modal for Alhussieni Series Covers
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSubtitle = document.getElementById('lightbox-subtitle');
  const lightboxClose = document.getElementById('lightbox-close');
  const bookCards = document.querySelectorAll('.book-card');

  if (lightboxModal && bookCards.length > 0) {
    bookCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.book-cover-img');
        const titleEn = card.querySelector('.book-title-en');
        const titleAr = card.querySelector('.book-title-ar');

        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (titleEn && lightboxTitle) lightboxTitle.textContent = titleEn.textContent;
          if (titleAr && lightboxSubtitle) lightboxSubtitle.textContent = titleAr.textContent;

          lightboxModal.classList.add('active');
          lightboxModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Contact Form Handling & Notification Toast
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const toastMsg = document.getElementById('toast-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Show success toast
      const isArabic = document.documentElement.getAttribute('lang') === 'ar';
      const msg = isArabic 
        ? 'شكرًا لتواصلك مع أ. محمد الحسيني، سيتم الرد عليك قريبًا.' 
        : 'Thank you for reaching out to Mohamed Elhussieni. Your message has been sent successfully.';

      showToast(msg, 'success');
      contactForm.reset();
    });
  }

  function showToast(message, type = 'success') {
    if (!toastMsg) return;
    
    toastMsg.textContent = message;
    toastMsg.className = `toast-msg show ${type}`;
    
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 4500);
  }

  // --------------------------------------------------------------------------
  // 9. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Interactive Mathematical Canvas Animation
  // --------------------------------------------------------------------------
  initMathCanvas();

  function initMathCanvas() {
    const canvas = document.getElementById('math-canvas');
    if (!canvas) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Mathematical symbols pool
    const mathSymbols = ['∫', 'Σ', 'π', 'f(x)', 'θ', 'x²', '√Δ', 'lim', 'α', 'β', 'dy/dx', 'λ'];

    class MathParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = 12 + Math.random() * 12;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        this.opacity = 0.05 + Math.random() * 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -30 || this.x > width + 30 || this.y < -30 || this.y > height + 30) {
          this.reset();
        }
      }

      draw() {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const fill = theme === 'dark' ? `rgba(242, 140, 24, ${this.opacity})` : `rgba(7, 27, 54, ${this.opacity * 0.7})`;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `600 ${this.size}px 'Cambria Math', 'Times New Roman', serif`;
        ctx.fillStyle = fill;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    const particleCount = Math.min(Math.floor(width / 35), 36);
    const particles = Array.from({ length: particleCount }, () => new MathParticle());

    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Subtle coordinate grid dots
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      const gridColor = theme === 'dark' ? 'rgba(242, 140, 24, 0.03)' : 'rgba(7, 27, 54, 0.02)';
      const step = 80;

      ctx.fillStyle = gridColor;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw and update math symbols
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Pause animation when page is hidden to preserve battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });
  }

});
