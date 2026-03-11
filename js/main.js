/* ==========================================================================
   MAIN — Application Entry Point
   Imports all modules and initializes them when the DOM is ready.
   ========================================================================== */

import { initTheme, bindThemeButtons } from './theme.js';
import { initNavigation, closeMobileMenu } from './navigation.js';
import { initCursor } from './cursor.js';
import { initScrollReveal } from './scroll.js';

/**
 * Boot the application.
 */
function init() {
  // 1. Theme: restore saved preference, bind toggle buttons
  initTheme();
  bindThemeButtons(['themeBtn', 'mobileThemeBtn']);

  // 2. Navigation: sticky nav, active links, hamburger menu
  initNavigation();

  // 3. Custom cursor (desktop only)
  initCursor();

  // 4. Scroll reveal animations
  initScrollReveal();
}

// Expose closeMobileMenu globally for inline onclick handlers
window.closeMobileMenu = closeMobileMenu;

// Run when DOM is fully parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
