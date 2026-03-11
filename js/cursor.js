/* ==========================================================================
   CURSOR — Custom Cursor with Trailing Ring
   Only active on devices with a fine pointer (desktop).
   ========================================================================== */

let dotEl, ringEl;
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let isActive = false;

/**
 * Initialize the custom cursor.
 */
export function initCursor() {
  // Skip on touch devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  dotEl  = document.getElementById('cDot');
  ringEl = document.getElementById('cRing');

  if (!dotEl || !ringEl) return;

  isActive = true;

  // Track mouse position
  document.addEventListener('mousemove', onMouseMove, { passive: true });

  // Start animation loop for the trailing ring
  requestAnimationFrame(animateRing);

  // Bind hover expansion to interactive elements
  bindHoverTargets();
}

/**
 * Update mouse coordinates and move the dot instantly.
 */
function onMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dotEl.style.left = `${mouseX - 3}px`;
  dotEl.style.top  = `${mouseY - 3}px`;
}

/**
 * Smoothly animate the ring toward the cursor position.
 */
function animateRing() {
  if (!isActive) return;

  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;

  ringEl.style.left = `${ringX - 20}px`;
  ringEl.style.top  = `${ringY - 20}px`;

  requestAnimationFrame(animateRing);
}

/**
 * Add expand effect when hovering over interactive elements.
 */
function bindHoverTargets() {
  const selectors = 'a, button, .project-card, .bio-link, .social-icon, .theme-btn';
  const targets = document.querySelectorAll(selectors);

  targets.forEach(el => {
    el.addEventListener('mouseenter', () => ringEl.classList.add('expand'));
    el.addEventListener('mouseleave', () => ringEl.classList.remove('expand'));
  });
}
