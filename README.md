# Projeto Portfólio Pessoal
 
---
 
<div align="center"> 
<img src="https://ik.imagekit.io/o02kjfcyy/img-portifolio-light%202026-05-02%20154337.png" alt="Imagem-Home" /> 

<br />

<img src="https://img.shields.io/badge/HTML-5-orange?style=for-the-badge&logo=html5" alt="HTML Badge" /> 
<img src="https://img.shields.io/badge/CSS-3-purple?style=for-the-badge&logo=css&logoColor=purple" alt="CSS Badge" /> 
<img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=yellow%22" alt="JavaScript Badge" /> 
</div>
 
<br />
 
O **Projeto Portfólio Pessoal** é um **site profissional e minimalista**, desenhado com foco em usabilidade, performance e estética (inspirado em designs como Vercel e Linear). Ele foi inteiramente construído utilizando tecnologias nativas (**Vanilla Stack**: HTML5, CSS3 e JavaScript ES6+), sem dependências pesadas de bibliotecas externas.

O projeto consome dados dinâmicos da **API do GitHub**, preenchendo as informações de perfil e agrupando automaticamente os repositórios em formato de carrossel.
 
------
 
## ✨ Novidades do Redesign
 
- **Dark & Light Mode:** Suporte completo a temas dinâmicos via CSS Custom Properties com persistência no `localStorage`.
- **Carrossel Nativo:** Remoção de bibliotecas de terceiros (como Swiper.js). A nova lógica foi recriada 100% em JS nativo suportando navegação por setas, arrasto de mouse/touch (drag/swipe) e navegação por teclado para acessibilidade.
- **Gráficos de Habilidades:** Seção de *skills* redesenhada com barras de progresso que são preenchidas com animações suaves apenas quando rolam para dentro da tela (usando `IntersectionObserver`).
- **Arquitetura Modular:** Separação do código JavaScript e CSS em módulos lógicos (`theme.js`, `main.js`, `carousel.js`, `filters.js`, etc) seguindo a metodologia BEM no CSS.
- **Micro-interações:** Hover dinâmico nos cards de projetos, com suporte a placeholder de imagens para pre-visualizações elegantes.
 
------
 
## ⚙️ Estrutura do Projeto
 
```
portfolio/
│
├── index.html        # Página principal do portfólio
├── success.html      # Página de confirmação de envio do formulário
│
├── css/
│   ├── reset.css     # Limpeza de estilos padrão
│   ├── variables.css # Design System: Cores (Dark/Light), Espaçamentos, Tipografia
│   └── style.css     # Estilos principais organizados via Metodologia BEM
│
├── js/
│   ├── theme.js      # Lógica de controle Dark/Light Mode
│   ├── main.js       # Fetch da GitHub API e validações de formulário
│   ├── carousel.js   # Lógica do carrossel horizontal em Vanilla JS
│   ├── skills.js     # IntersectionObserver para a animação das barras de progresso
│   ├── filters.js    # Filtragem dinâmica do carrossel por linguagem
│   └── animations.js # Efeitos On-Scroll, Scroll Progress Bar e Header dinâmico
│
└── README.md
```
 
------
 
## 💻 Tecnologias Utilizadas
 
- **HTML5 Semântico**: Focado em acessibilidade (`aria-labels`, `roles`, navegação estruturada).
- **CSS3 Moderno**: Layout via Grid e Flexbox, tipografia fluida, animações e Glassmorphism.
- **JavaScript (ES6+)**: Interatividade dom DOM, Promises/Async Await, IntersectionObservers e Event Listeners.
- **GitHub REST API**: Fonte assíncrona de dados do perfil e organização inteligente de repositórios.
 
------
 
## 🚀 Executando Localmente
 
Para executar o projeto em ambiente local e visualizar a API do GitHub sendo populada:
 
1. Clone o repositório:
 
   ```bash
   git clone https://github.com/itsbya/portfolio_pessoal.git
   ```
 
2. Acesse a pasta do projeto:
 
   ```bash
   cd portfolio_pessoal
   ```
 
3. Abra o projeto no Visual Studio Code (ou editor preferido):
 
   ```bash
   code .
   ```
 
4. Devido às requisições fetch, recomenda-se abrir o `index.html` utilizando a extensão **Live Server** (do VS Code) para evitar bloqueios de CORS por protocolo local (`file://`).
 
------
 
## 🌎 Deploy
 
O site é servido diretamente através do **GitHub Pages** e as rotas são construídas para funcionar perfeitamente em modo estático. Você pode acessá-lo clicando no link abaixo:
 
🔗 **[Visualizar Portfólio](https://itsbya.github.io/portfolio_pessoal)**
 
------
 
## 🤝 Contribuições
 
Sinta-se livre para abrir *issues* e *pull requests* caso queira utilizar esta estrutura para o seu próprio portfólio, ou sugerir alguma melhoria no design/arquitetura.
