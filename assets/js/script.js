// Seção About

const about = document.querySelector("#about")

// Seção Projects

const swiperWrapper = document.querySelector(".swiper-wrapper")

// Formulário

const formulario = document.querySelector("#formulario")


// Expressão Regular de valida
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


// Função de preenchimento da seção About

async function getAboutGitHub() {

    try {

        // Requisição do tipo GET para a API do GitHub
        const resposta =  await fetch('https://api.github.com/users/itsbya');

        // Converter resposta pra JSON
        const perfil = await resposta.json()

        about.innerHTML = '';

        about.innerHTML = `
          <!-- Imagem da Seção About -->
      <figure class="about-image">
        <img src="${perfil.avatar_url}"
             alt="${perfil.name}"
              class="float-animation"
        >
      </figure>

      <!-- Conteúdo da Seção About -->
      <article class="about-content">

        <h2>Sobre mim</h2>
        <p><span style="color: #3EC6D3;">DESENVOLVEDORA FULL STACK </span> com foco em aplicações web modernas e escaláveis. 
        Tenho experiência prática com <span style="color: #3EC6D3;">JavaScript</span>, <span style="color: #3EC6D3;"> TypeScript</span>,
        <span style="color: #3EC6D3;"> Node.js</span>, <span style="color: #3EC6D3;"> Nest.JS</span>, <span style="color: #3EC6D3;"> 
         React</span> e <span style="color: #3EC6D3;"> MySQL</span>, desenvolvendo APIs e aplicando boas práticas como SOLID e Clean Code.</p>

        <p>Em formação em Engenharia de Software e pela Generation Brasil, busco uma oportunidade de <span style="color: #3EC6D3;"> ESTÁGIO </span> 
        para crescer rapidamente e gerar impacto real.</p>



        <!-- Links (GitHub + Curriculo) e Dados do GitHub -->
        <div class="about-buttons-data">

          <!-- Links -->
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="${"https://drive.google.com/file/d/1CPqjXyPpQRhi2z3nw2AUQF9sYKmwz53d/view?usp=sharing"} target="_blank" class="botao-outline">Currículo</a>
          </div>

          <!-- Dados - GitHub -->
          <div class="data-container">

            <!-- Nº de Seguidores -->
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>

            <!-- Nº de Repositórios Públicos -->
            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>

          </div>

        </div>
      </article>
        `
        
    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }
}



// Função buscar dados dos projetos

async function getProjectsGitHub() {

    try {

        // Requisição do tipo GET para a API do GitHub
        const resposta =  await fetch('https://api.github.com/users/itsbya/repos?sort=updated&per_page=6');

        // Converter resposta pra JSON
        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = '';

        // Cores e ícones das linguagens
        const linguagens = {
            'JavaScript': { icone: 'javascript' },
            'TypeScript': { icone: 'typescript' },
            'Python': { icone: 'python' },
            'Java': { icone: 'java' },
            'HTML': { icone: 'html' },
            'CSS': { icone: 'css' },
            'PHP': { icone: 'php' },
            'C#': { icone: 'csharp' },
            'Go': { icone: 'go' },
            'Kotlin': { icone: 'kotlin' },
            'Swift': { icone: 'swift' },
            'GitHub': { icone: 'github' },
        };

       
        repositorios.forEach(repositorio => {

            // Identificar a Linguagem padrão do Repositório
            const linguagem =  repositorio.language || 'GitHub';

            // Selecionar o ícone da Linguagem padrão
            const config = linguagens[linguagem] || linguagens['GitHub'];

            // Montar a URL que aponta para o ícone da Linguagem padrão
            const urlIcone = `./assets/icons/languages/${config.icone}.svg`;

            // Formatar o nome do repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
                .toUpperCase(); // Converte a string em letras maiúsculas


                const descricao = repositorio.description ? 
                (repositorio.description.length > 100 ? repositorio.description.substring(0, 97) + '...'
                : repositorio.description)
                : 'Projeto desenvolvido no GitHub' 


        // Tags do Repositório 
        const tags =  repositorio.topics ?. length > 0
        ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
        : `<span class="tag">${linguagem}</span>`;


        // Botões de ação (Renderização condicional do botão deploy)

        const botoesAcao = `
          <!-- Links do Projeto -->
                <div class="project-buttons">
                  <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                    GitHub
                  </a>
                  ${repositorio.homepage ? 
                  `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
                    Deploy
                  </a>` : ''}

                </div>
        `
        
        // Construir o Card
        swiperWrapper.innerHTML += `
         <div class="swiper-slide">

            <article class="project-card">

              <!-- Ícone da Tecnologia padrão do projeto -->
              <figure class="project-image">
                <img src="${urlIcone}"
                     alt="Ícone ${linguagem}"
                >
              </figure>

              <!-- Conteúdo do Projeto -->
              <div class="project-content">

                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>

                <!-- Tags do Projeto -->
                <div class="project-tags">
                  <span class="tag">${tags}</span>
                </div>

                ${botoesAcao}

              </div>

            </article>

          </div>

        `


        })

iniciarSwiper();

} catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }

}


function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
    });
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('form span').forEach(span => span.innerHTML = '');

    let isValid = true;

    // Validação Nome
    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome')

    if(nome.value.trim(). length < 3) {
        erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
        if(isValid) nome.focus();
        isValid = false;
    }

    // Validação Email
    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email')

    if(!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um endereço de e-mail valido '
        if(isValid) email.focus();
        isValid = false;
    }

    // Validação Assunto
    const assunto = document.querySelector('#assunto');
    const erroassunto = document.querySelector('#erro-email')

    if(assunto.value.trim().length < 5) {
        erroassunto.innerHTML = 'O assunto deve ter no mínimo 5 caracteres '
        if(isValid) assunto.focus();
        isValid = false;
    }


    // Validação Mensagem
    const mensagem = document.querySelector('#mensagem');
    const erromensagem = document.querySelector('#erro-mensagem')

    if(mensagem.value.trim().length < 5) {
        erromensagem.innerHTML = 'A mensagem não pode ser vazia'
        if(isValid) mensagem.focus();
        isValid = false;
    }

    if(isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviado...';

        formulario.submit();
    }


})

// Executar a função getAbouGitHub

getAboutGitHub();


// Executar a função getProjectsGitHub

getProjectsGitHub();


