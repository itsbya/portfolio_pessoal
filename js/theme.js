// js/theme.js
// Lógica para controle do tema Claro/Escuro com persistência no Armazenamento Local (LocalStorage)

const THEME_KEY = 'portfolio-theme-preference';

// Recupera a preferência salva ou a preferência do sistema
function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Aplica o tema na raiz do documento
function applyTheme(theme) {
  const root = document.documentElement;
  const themeIcon = document.querySelector('#icone-tema');
  
  if (theme === 'light') {
    root.classList.add('modo-claro');
    if (themeIcon) {
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      `; // Ícone de lua para mudar para escuro
    }
  } else {
    root.classList.remove('modo-claro');
    if (themeIcon) {
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      `; // Ícone de sol para mudar para claro
    }
  }
}

// Alterna o tema
function toggleTheme() {
  const currentTheme = getPreferredTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
}

// Inicializa o tema o mais cedo possível
const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

// Listener será adicionado no main.js quando o DOM estiver pronto
window.toggleTheme = toggleTheme;
