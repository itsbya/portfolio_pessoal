// js/animations.js
// Observadores de intersecção (Intersection Observer) e eventos de rolagem (scroll)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Barra de Progresso e Cabeçalho Fixado
  const progressBar = document.getElementById('progresso-rolagem');
  const header = document.querySelector('.cabecalho');
  
  window.addEventListener('scroll', () => {
    // Progresso de Leitura
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
    
    // Efeito de Vidro (Glassmorphism) e Encolhimento do Cabeçalho
    if (winScroll > 50) {
      header.classList.add('cabecalho--rolagem');
    } else {
      header.classList.remove('cabecalho--rolagem');
    }
  });


  // 3. Animações On-Scroll (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ativo');
        // Opcional: parar de observar depois de animar uma vez
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementosRevelar = document.querySelectorAll('.revelar');
  elementosRevelar.forEach(el => scrollObserver.observe(el));
});
