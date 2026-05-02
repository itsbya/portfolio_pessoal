// js/main.js
// Lógica principal: fetch da API do GitHub, renderização e formulário

const githubUser = 'itsbya';

document.addEventListener('DOMContentLoaded', () => {
  
  // Adiciona evento ao botão de tema
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn && window.toggleTheme) {
    themeBtn.addEventListener('click', window.toggleTheme);
  }

  // Busca e preenche os dados do Sobre
  fetchAboutData();
  
  // Busca e preenche os Projetos
  fetchProjectsData();
  
  // Validação do Formulário
  setupFormValidation();
});

// ==========================================
// SEÇÃO SOBRE: GitHub API
// ==========================================
async function fetchAboutData() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}`);
    if (!response.ok) throw new Error('Falha ao buscar dados do GitHub');
    
    const data = await response.json();
    
    // Preencher a Imagem (usando element ID pra facilitar se quisesse, mas vamos buscar e alterar)
    const aboutImage = document.getElementById('about-image');
    if (aboutImage) {
      aboutImage.src = data.avatar_url;
      aboutImage.alt = `Foto de ${data.name || githubUser}`;
    }
    
    // Preencher Stats
    const followersEl = document.getElementById('stat-followers');
    const reposEl = document.getElementById('stat-repos');
    
    if (followersEl) followersEl.textContent = data.followers;
    if (reposEl) reposEl.textContent = data.public_repos;
    
    // Atualizar Link do GitHub no botão
    const githubLink = document.getElementById('btn-github');
    if (githubLink) githubLink.href = data.html_url;

  } catch (error) {
    console.error('Erro na seção Sobre:', error);
  }
}

// ==========================================
// SEÇÃO PROJETOS: GitHub API
// ==========================================
async function fetchProjectsData() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  // Mostra um loading
  projectsGrid.innerHTML = '<p style="text-align:center; width:100%;">Carregando projetos brilhantes...</p>';

  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('Falha ao buscar repositórios');
    
    const repos = await response.json();
    projectsGrid.innerHTML = ''; // Limpa o loading

    // Lista de ícones para tecnologias (usando SVG simples inline ou icones do devicon no HTML)
    // Para simplificar no Vanilla sem dependencias complexas, usamos as letras iniciais
    
    repos.forEach(repo => {
      const language = repo.language || 'GitHub';
      const initial = language.substring(0, 2).toUpperCase();
      
      const desc = repo.description 
        ? (repo.description.length > 100 ? repo.description.substring(0, 97) + '...' : repo.description)
        : 'Projeto desenvolvido no GitHub. Acesse o código para mais detalhes.';

      const topicsHTML = repo.topics && repo.topics.length > 0 
        ? repo.topics.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')
        : `<span class="tag">${language}</span>`;

      const hasDeploy = repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-card__link">Deploy ↗</a>` : '';

      const cardHTML = `
        <article class="project-card reveal" data-language="${language}" style="transition: opacity 0.3s ease;">
          <div class="project-card__header">
            <div class="project-card__icon">${initial}</div>
            <div class="project-card__links">
              ${hasDeploy}
              <a href="${repo.html_url}" target="_blank" class="project-card__link">Code ↗</a>
            </div>
          </div>
          <h3 class="project-card__title">${repo.name.replace(/[-_]/g, ' ').toUpperCase()}</h3>
          <p class="project-card__desc">${desc}</p>
          <div class="project-card__tags">
            ${topicsHTML}
          </div>
        </article>
      `;
      
      projectsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Se a função setupFilters existir (carregada do filters.js), inicializa
    if (window.setupFilters) {
      window.setupFilters(repos);
    }

  } catch (error) {
    console.error('Erro na seção Projetos:', error);
    projectsGrid.innerHTML = '<p style="text-align:center; width:100%; color: var(--error);">Não foi possível carregar os projetos no momento.</p>';
  }
}

// ==========================================
// FORMULÁRIO DE CONTATO E VALIDAÇÃO
// ==========================================
function setupFormValidation() {
  const form = document.getElementById('formulario');
  if (!form) return;

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Limpa erros anteriores
    document.querySelectorAll('.form__error').forEach(el => el.textContent = '');

    // Valida Nome
    const nome = document.getElementById('nome');
    if (nome.value.trim().length < 3) {
      document.getElementById('erro-nome').textContent = 'O nome deve ter no mínimo 3 caracteres.';
      isValid = false;
    }

    // Valida Email
    const email = document.getElementById('email');
    if (!emailRegex.test(email.value.trim())) {
      document.getElementById('erro-email').textContent = 'Digite um e-mail válido.';
      isValid = false;
    }

    // Valida Assunto
    const assunto = document.getElementById('assunto');
    if (assunto.value.trim().length < 5) {
      document.getElementById('erro-assunto').textContent = 'O assunto deve ter no mínimo 5 caracteres.';
      isValid = false;
    }

    // Valida Mensagem
    const mensagem = document.getElementById('mensagem');
    if (mensagem.value.trim().length < 5) {
      document.getElementById('erro-mensagem').textContent = 'A mensagem não pode estar vazia.';
      isValid = false;
    }

    if (isValid) {
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      
      // Envio real do form
      form.submit();
    }
  });
}
