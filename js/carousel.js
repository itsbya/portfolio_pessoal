// js/carousel.js
// Lógica do Carrossel Horizontal com drag, snap, setas, dots e teclado

function setupCarousels() {
  const carousels = document.querySelectorAll('.carousel-wrapper');
  
  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const btnPrev = wrapper.querySelector('.carousel-btn--prev');
    const btnNext = wrapper.querySelector('.carousel-btn--next');
    const dotsContainer = wrapper.querySelector('.carousel-dots');
    
    if (!track) return;

    // Adiciona tabindex para navegação por teclado
    track.setAttribute('tabindex', '0');

    // Configura os Dots
    const cards = Array.from(track.children);
    let dots = [];
    
    if (dotsContainer && cards.length > 0) {
      dotsContainer.innerHTML = '';
      cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
        dotsContainer.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
          // Calcula a posição do card e rola a track até ele
          const cardLeft = cards[index].offsetLeft;
          track.scrollTo({ left: cardLeft - track.offsetLeft, behavior: 'smooth' });
        });
      });
    }

    // Atualiza o estado dos botões e dos dots baseado no scroll atual
    const updateState = () => {
      const scrollLeft = Math.ceil(track.scrollLeft);
      const maxScroll = Math.floor(track.scrollWidth - track.clientWidth);
      
      // Atualiza setas
      if (btnPrev) btnPrev.disabled = scrollLeft <= 0;
      if (btnNext) btnNext.disabled = scrollLeft >= maxScroll - 5;

      // Atualiza dots baseado no scroll
      if (dots.length > 0) {
        // Encontra qual card está mais visível
        let activeIndex = 0;
        let minDistance = Infinity;
        
        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2 - track.offsetLeft;
          const trackCenter = track.scrollLeft + track.clientWidth / 2;
          const distance = Math.abs(cardCenter - trackCenter);
          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        });

        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeIndex);
        });
      }
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

    // Navegação por teclado
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        track.scrollBy({ left: -track.clientWidth / 2, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        track.scrollBy({ left: track.clientWidth / 2, behavior: 'smooth' });
      }
    });

    track.addEventListener('scroll', updateState);
    // Iniciar estado com um pequeno timeout para garantir a renderização
    setTimeout(updateState, 100);

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
