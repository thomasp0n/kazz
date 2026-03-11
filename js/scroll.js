/* ==========================================================================
   SCROLL — Scroll Reveal via IntersectionObserver
   Elements with class `.reveal` fade in when entering the viewport.
   Stagger with `.d1` – `.d6` delay classes defined in animations.css.
   ========================================================================== */

let observer;

/**
 * Initialize scroll reveal on all `.reveal` elements.
 */
export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('vis'));
    return;
  }

  observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * Callback: add `.vis` class when element is intersecting.
 */
function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      // Stop observing after reveal (one-time animation)
      observer.unobserve(entry.target);
    }
  });
}
