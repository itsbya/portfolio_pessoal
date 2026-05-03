// js/filters.js
// Lógica de filtragem dos projetos sem recarregar a página

function setupFilters(projects) {
  const filterContainer = document.getElementById('filtros-projetos');
  const projectsGrid = document.getElementById('grid-projetos');
  
  if (!filterContainer || !projectsGrid) return;
  
  // Extrair todas as linguagens únicas
  const languages = new Set();
  projects.forEach(p => {
    const lang = p.language || 'Outros';
    languages.add(lang);
  });
  
  // Limpar container e criar botão "Todos"
  filterContainer.innerHTML = '';
  
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn ativo';
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
      // Remover classe "active" de todos
      filterBtns.forEach(b => b.classList.remove('ativo'));
      // Adicionar no botão clicado
      btn.classList.add('ativo');
      
      const filterValue = btn.dataset.filter;
      
      // Filtrar categorias de projetos (carrosséis)
      const categories = projectsGrid.querySelectorAll('.categoria-projetos');
      categories.forEach(category => {
        if (filterValue === 'all') {
          category.style.display = 'block';
          setTimeout(() => { category.style.opacity = '1'; }, 50);
        } else {
          if (category.dataset.language === filterValue) {
            category.style.display = 'block';
            setTimeout(() => { category.style.opacity = '1'; }, 50);
          } else {
            category.style.opacity = '0';
            setTimeout(() => { category.style.display = 'none'; }, 300);
          }
        }
      });
    });
  });
}

window.setupFilters = setupFilters;
