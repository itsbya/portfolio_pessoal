// js/animations.js
// Observadores de intersecção e eventos de scroll

document.addEventListener('DOMContentLoaded', () => {
  // 1. ProgressBar e Header Scrolled
  const progressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    // Progresso de Leitura
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
    
    // Header Glassmorphism e Shrink
    if (winScroll > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });

  // 2. Menu Mobile e Ativação de Links
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navList.classList.toggle('open');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navList.classList.remove('open');
      });
    });
  }

  // 3. Animações On-Scroll (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Opcional: parar de observar depois de animar uma vez
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => scrollObserver.observe(el));
});
