/* ==========================================================================
   THEME — Dark / Light Mode Toggle
   Handles theme switching and persists preference in localStorage.
   ========================================================================== */

const STORAGE_KEY = 'kazz-theme';

/**
 * Initialize theme from saved preference.
 */
export function initTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      document.documentElement.dataset.theme = saved;
    }
  } catch (e) {
    // localStorage unavailable — use default (dark)
  }
}

/**
 * Toggle between dark and light themes.
 */
export function toggleTheme() {
  const html = document.documentElement;
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch (e) {
    // Silently fail if storage unavailable
  }
}

/**
 * Bind click events to theme toggle buttons.
 * @param {string[]} buttonIds — Array of element IDs for toggle buttons.
 */
export function bindThemeButtons(buttonIds = []) {
  buttonIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
  });
}
