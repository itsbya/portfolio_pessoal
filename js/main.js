
// Lógica principal: fetch da API do GitHub, renderização e formulário

const USUARIO = 'itsbya';
const ORGANIZACAO = 'CodeSeven-Turma-JavaScript-13';


document.addEventListener('DOMContentLoaded', () => {

  // Adiciona evento ao botão de tema
  const themeBtn = document.getElementById('alternador-tema');
  if (themeBtn && window.toggleTheme) {
    themeBtn.addEventListener('click', window.toggleTheme);
  }

  // 2. Menu Mobile
  const alternadorMenu = document.querySelector('.alternador-menu');
  const navegacaoCabecalho = document.querySelector('.cabecalho__navegacao');
  
  if (alternadorMenu) {
    alternadorMenu.addEventListener('click', () => {
      alternadorMenu.classList.toggle('aberto');
      navegacaoCabecalho.classList.toggle('aberto');
    });
  }

  document.querySelectorAll('.navegacao__link').forEach(link => {
    link.addEventListener('click', () => {
      if (alternadorMenu) alternadorMenu.classList.remove('aberto');
      if (navegacaoCabecalho) navegacaoCabecalho.classList.remove('aberto');
    });
  });

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
    const response = await fetch(`https://api.github.com/users/${USUARIO}`);
    if (!response.ok) throw new Error('Falha ao buscar dados do GitHub');

    const data = await response.json();

    // Preencher a Imagem 
    const aboutImage = document.getElementById('sobre-imagem');
    if (aboutImage) {
      aboutImage.src = data.avatar_url;
      aboutImage.alt = `Foto de ${data.name || githubUser}`;
    }

    // Preencher Stats
    const followersEl = document.getElementById('estat-seguidores');
    const reposEl = document.getElementById('estat-repos');

    if (followersEl) followersEl.textContent = data.followers;
    if (reposEl) reposEl.textContent = data.public_repos;

    // Atualizar Link do GitHub no botão
    const githubLink = document.getElementById('botao-github');
    if (githubLink) githubLink.href = `https://github.com/${USUARIO}`;

  } catch (error) {
    console.error('Erro na seção Sobre:', error);
  }
}

// ==========================================
// SEÇÃO PROJETOS: GitHub API
// ==========================================
async function fetchProjectsData() {
  const projectsGrid = document.getElementById('grid-projetos');
  if (!projectsGrid) return;

  // Mostra um loading
  projectsGrid.innerHTML = '<p style="text-align:center; width:100%;">Carregando projetos brilhantes...</p>';

  try {
    // Busca repositórios do usuário e da organização em paralelo
    const [userReposRes, orgReposRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${USUARIO}/repos?sort=updated&per_page=100`),
      fetch(`https://api.github.com/orgs/${ORGANIZACAO}/repos?sort=updated&per_page=100`)
    ]);

    let allRepos = [];

    // Processa repositórios do usuário
    if (userReposRes.status === 'fulfilled' && userReposRes.value.ok) {
      const userRepos = await userReposRes.value.json();
      allRepos = [...allRepos, ...userRepos];
    }

    // Processa repositórios da organização
    if (orgReposRes.status === 'fulfilled' && orgReposRes.value.ok) {
      const orgRepos = await orgReposRes.value.json();
      allRepos = [...allRepos, ...orgRepos];
    }

    if (allRepos.length === 0) throw new Error('Nenhum repositório encontrado.');

    // Remove duplicatas por nome
    const uniqueReposMap = new Map();
    allRepos.forEach(repo => {
      uniqueReposMap.set(repo.name.toLowerCase(), repo);
    });
    
    let repos = Array.from(uniqueReposMap.values());

    projectsGrid.innerHTML = ''; // Limpa o loading

    // Whitelist de projetos permitidos (Pessoais e da Organização)
    const projetosPermitidos = [
      'connectelas_react',
      'projeto_7health_react',
      '7fit-react',
      'patinhas_e_cia',
      'farmacia_generation_react',
      'blogpessoal_react',
      'portfolio_pessoal',
      'skycast',
      'todolist-react',
    ];

    // Filtrar apenas os projetos escolhidos
    repos = repos.filter(repo => projetosPermitidos.includes(repo.name.toLowerCase()));

    // Ordenar os repositórios seguindo exatamente a ordem definida na whitelist (projetosPermitidos)
    repos.sort((a, b) => {
      return projetosPermitidos.indexOf(a.name.toLowerCase()) - projetosPermitidos.indexOf(b.name.toLowerCase());
    });

    // Agrupar repositórios por linguagem mantendo a ordem global definida na whitelist
    const reposByLang = {};
    const ordemLinguagens = []; // Para garantir que as categorias sigam a ordem dos projetos

    repos.forEach(repo => {
      const language = repo.language || 'Outros';
      if (!reposByLang[language]) {
        reposByLang[language] = [];
        ordemLinguagens.push(language);
      }
      reposByLang[language].push(repo);
    });

    // Mapeamento de Imagens
    const imageMap = {
      'connectelas_react': 'img-connectElas2026-05-14 012701.png',
      'farmacia_generation_react': 'img-farmacia-react 2026-05-05 022621.png',
      '7fit': 'img-7fit.webp',
      'patinhas_e_cia': 'img-patinhas&cia 2026-05-14 201250.png',
      'blogpessoal_react': 'img-blogpessoal.png',
      '7health': 'img-7health 2026-04-24 213511.png',
      'portfolio_pessoal': 'img-portifolio-dark 2026-05-02 154337.png',
      'skycast': 'img-skycast-dark 2026-04-10 225114.png',
      'todolist-react': 'img-todolist 2026-04-15 202903.png'
    };

    // Mapeamento de Ícones
    const iconMap = {
      'html': 'html.svg',
      'css': 'css.svg',
      'javascript': 'javascript.svg',
      'typescript': 'typescript.svg',
      'java': 'java.svg',
      'kotlin': 'kotlin.svg',
      'python': 'python.svg',
      'php': 'php.svg',
      'go': 'go.svg',
      'swift': 'swift.svg',
      'c#': 'csharp.svg',
      'github': 'github.svg'
    };

    // Renderizar categorias e seus carrosséis seguindo a ordem definida
    ordemLinguagens.forEach(lang => {
      const langRepos = reposByLang[lang];

      const categoryHTML = `
        <div class="categoria-projetos revelar" data-language="${lang}">
          <h3 class="categoria-projetos__titulo">Projetos em ${lang}</h3>
          
          <div class="carrossel-wrapper">
            <button class="carrossel-botao carrossel-botao--anterior" aria-label="Anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            
            <div class="carrossel-trilha">
              ${langRepos.map(repo => {
        const initial = lang.substring(0, 2).toUpperCase();
        const desc = repo.description
          ? repo.description
          : 'Projeto desenvolvido no GitHub. Acesse o código para mais detalhes.';

        const repoNameLower = repo.name.toLowerCase();
        const langLower = lang.toLowerCase();

        // Tratar a imagem
        let imgHTML = '';
        let matchImage = null;
        Object.keys(imageMap).forEach(key => {
          if (repoNameLower.includes(key)) {
            matchImage = imageMap[key];
          }
        });

        if (matchImage) {
          imgHTML = `<img src="assets/img-projetos/${matchImage}" alt="Captura de tela do projeto ${repo.name}" loading="lazy" />`;
        } else {
          imgHTML = `
                    <svg viewBox="0 0 24 24" fill="currentColor" class="card-projeto__placeholder">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  `;
        }

        // Ícone do cabeçalho (Linguagem principal)
        const headerIconHTML = iconMap[langLower]
          ? `<img src="assets/icons/languages/${iconMap[langLower]}" alt="${lang}" class="icone-tecnologia" style="height: 24px;" />`
          : initial;

        // Tratar os tópicos para as tags (Removendo a linguagem principal já que ela está no topo)
        let techs = [];
        if (repo.topics) {
          repo.topics.forEach(t => {
            if (t.toLowerCase() !== langLower) techs.push(t.toLowerCase());
          });
        }
        techs = [...new Set(techs)];

        const topicsHTML = `<div class="card-projeto__tecnologias">` + techs.slice(0, 5).map(t => {
          return `<span class="tag">${t}</span>`;
        }).join('') + `</div>`;

        const hasDeploy = repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="card-projeto__link">Acessar Projeto ↗</a>` : '';

        return `
                  <article class="card-projeto">
                    <div class="card-projeto__imagem">
                      ${imgHTML}
                    </div>
                    <div class="card-projeto__conteudo">
                      <div class="card-projeto__cabecalho">
                        <div class="card-projeto__icone">${headerIconHTML}</div>
                        <div class="card-projeto__links">
                          ${hasDeploy}
                          <a href="${repo.html_url}" target="_blank" class="card-projeto__link">Ver Código ↗</a>
                        </div>
                      </div>
                      <h3 class="card-projeto__titulo">${formatarNomeProjeto(repo.name)}</h3>
                      ${topicsHTML}
                      <p class="card-projeto__descricao">${desc}</p>
                    </div>
                  </article>
                `;
      }).join('')}
            </div>

            <button class="carrossel-botao carrossel-botao--proximo" aria-label="Próximo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div class="carrossel-pontos"></div>
          </div>
        </div>
      `;

      projectsGrid.insertAdjacentHTML('beforeend', categoryHTML);
    });

    // Se a função setupFilters existir (carregada do filters.js), inicializa
    if (window.setupFilters) {
      window.setupFilters(repos);
    }

    // Inicializa a lógica de carrossel após adicionar ao DOM
    if (window.setupCarousels) {
      window.setupCarousels();
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

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    // Limpa erros anteriores
    document.querySelectorAll('.form__erro').forEach(el => el.textContent = '');

    // Valida Nome
    const nome = document.getElementById('nome');
    if (nome.value.trim().length < 3) {
      const erroNome = document.getElementById('erro-nome');
      if (erroNome) erroNome.textContent = 'O nome deve ter no mínimo 3 caracteres.';
      isValid = false;
    }

    // Valida Email
    const email = document.getElementById('email');
    if (!emailRegex.test(email.value.trim())) {
      const erroEmail = document.getElementById('erro-email');
      if (erroEmail) erroEmail.textContent = 'Digite um e-mail válido.';
      isValid = false;
    }

    // Valida Assunto
    const assunto = document.getElementById('assunto');
    if (assunto.value.trim().length < 5) {
      const erroAssunto = document.getElementById('erro-assunto');
      if (erroAssunto) erroAssunto.textContent = 'O assunto deve ter no mínimo 5 caracteres.';
      isValid = false;
    }

    // Valida Mensagem
    const mensagem = document.getElementById('mensagem');
    if (mensagem.value.trim().length < 5) {
      const erroMensagem = document.getElementById('erro-mensagem');
      if (erroMensagem) erroMensagem.textContent = 'A mensagem não pode estar vazia.';
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

/**
 * Transforma nomes técnicos de repositórios em títulos amigáveis e profissionais.
 */
function formatarNomeProjeto(nomeRepo) {
  let nome = nomeRepo;
  
  // Lista de sufixos técnicos a remover
  const sufixos = [
    '_react', '_node', '_nodejs', '_js', '_javascript', 
    '_api', '_frontend', '_backend', '_fullstack', '_final',
    '-react', '-node', '-nodejs', '-js', '-javascript',
    '-api', '-frontend', '-backend', '-fullstack', '-final'
  ];
  
  // Remove os sufixos de forma insensível a maiúsculas
  sufixos.forEach(sufixo => {
    const regex = new RegExp(sufixo + '$', 'i');
    nome = nome.replace(regex, '');
  });

  // Substitui hífens e underscores por espaços
  nome = nome.replace(/[-_]/g, ' ');

  // Se o nome resultante estiver todo em minúsculo, capitaliza cada palavra
  if (nome === nome.toLowerCase()) {
    return nome
      .split(' ')
      .filter(p => p.length > 0)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ')
      .trim();
  }
  
  // Caso contrário, apenas remove espaços extras e mantém o casing original (ex: connectElas)
  return nome.trim();
}
