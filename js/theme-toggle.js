// js/theme-toggle.js
// Toggle de tema oscuro/claro con persistencia en localStorage y detección de preferencia del sistema
(function () {
  const STORAGE_KEY = 'preferred-theme'; // 'dark' | 'light'
  const root = document.documentElement; // <html>
  const btn = document.getElementById('theme-toggle');

  function applyTheme(mode) {
    if (mode === 'dark') {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function storeTheme(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (_) {
      // ignore
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Inicializar tema lo antes posible
  const saved = getStoredTheme();
  const initial = saved || (systemPrefersDark() ? 'dark' : 'light');
  applyTheme(initial);

  if (btn) {
    btn.addEventListener('click', function () {
      const isDark = root.classList.contains('dark-mode');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  // Escuchar cambios del sistema si el usuario no ha elegido manualmente
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (!saved && media && media.addEventListener) {
    media.addEventListener('change', (e) => {
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }
})();
