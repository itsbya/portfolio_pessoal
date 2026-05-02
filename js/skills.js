// js/skills.js
// Lógica para animar as barras de progresso ao dar scroll na página

document.addEventListener('DOMContentLoaded', () => {
  const skillBars = document.querySelectorAll('.skill-item__bar-fill');
  
  if (skillBars.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Ativa quando 10% do elemento estiver visível
  };

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.getAttribute('data-progress');
        // Adiciona um pequeno atraso para efeito visual em cascata
        setTimeout(() => {
          bar.style.width = `${progress}%`;
        }, 100);
        // Opcional: parar de observar depois de animar
        observer.unobserve(bar);
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => {
    // Inicializa largura zerada e passa para o observer
    bar.style.width = '0%';
    skillsObserver.observe(bar);
  });
});
