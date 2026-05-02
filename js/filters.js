// js/filters.js
// Lógica de filtragem dos projetos sem recarregar a página

function setupFilters(projects) {
  const filterContainer = document.getElementById('projects-filters');
  const projectsGrid = document.getElementById('projects-grid');
  
  if (!filterContainer || !projectsGrid) return;
  
  // Extrair todas as linguagens únicas
  const languages = new Set();
  projects.forEach(p => {
    if (p.language) {
      languages.add(p.language);
    }
  });
  
  // Limpar container e criar botão "Todos"
  filterContainer.innerHTML = '';
  
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'Todos';
  allBtn.dataset.filter = 'all';
  filterContainer.appendChild(allBtn);
  
  // Criar botões para cada linguagem (até 5 mais frequentes, por exemplo, ou todas)
  const langsArray = Array.from(languages).slice(0, 6);
  langsArray.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = lang;
    btn.dataset.filter = lang;
    filterContainer.appendChild(btn);
  });
  
  // Adicionar eventos de clique
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover classe active de todos
      filterBtns.forEach(b => b.classList.remove('active'));
      // Adicionar no clicado
      btn.classList.add('active');
      
      const filterValue = btn.dataset.filter;
      
      // Filtrar projetos
      const cards = projectsGrid.querySelectorAll('.project-card');
      cards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          if (card.dataset.language === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => { card.style.opacity = '1'; }, 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        }
      });
    });
  });
}

window.setupFilters = setupFilters;
