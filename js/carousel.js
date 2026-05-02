// js/carousel.js
// Lógica do Carrossel Horizontal com drag, snap e navegação por setas

function setupCarousels() {
  const carousels = document.querySelectorAll('.carousel-wrapper');
  
  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const btnPrev = wrapper.querySelector('.carousel-btn--prev');
    const btnNext = wrapper.querySelector('.carousel-btn--next');
    
    if (!track) return;

    // Atualizar estado dos botões baseado no scroll
    const updateButtons = () => {
      if (!btnPrev || !btnNext) return;
      // Usar Math.ceil/floor para evitar bugs de subpixel
      btnPrev.disabled = Math.ceil(track.scrollLeft) <= 0;
      btnNext.disabled = Math.ceil(track.scrollLeft) >= Math.floor(track.scrollWidth - track.clientWidth) - 5;
    };

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -track.clientWidth + 50, behavior: 'smooth' });
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        track.scrollBy({ left: track.clientWidth - 50, behavior: 'smooth' });
      });
    }

    track.addEventListener('scroll', updateButtons);
    // Iniciar estado com um pequeno timeout para garantir a renderização
    setTimeout(updateButtons, 100);

    // Lógica de Drag/Swipe (Mouse)
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('grabbing');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2; // Multiplicador de velocidade do drag
      track.scrollLeft = scrollLeft - walk;
    });
  });
}

// Expõe a função globalmente para ser chamada após o carregamento da API
window.setupCarousels = setupCarousels;
