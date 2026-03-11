/* ==========================================================================
   NAVIGATION — Sticky Nav, Active Links, Mobile Menu
   ========================================================================== */

let navEl, hamburgerEl, mobileMenuEl, sections, navLinks;

/**
 * Initialize navigation functionality.
 */
export function initNavigation() {
  navEl        = document.getElementById('nav');
  hamburgerEl  = document.getElementById('hamburger');
  mobileMenuEl = document.getElementById('mobileMenu');
  sections     = document.querySelectorAll('section[id]');
  navLinks     = document.querySelectorAll('.nav-links a');

  // Hamburger toggle
  if (hamburgerEl) {
    hamburgerEl.addEventListener('click', toggleMobileMenu);
  }

  // Scroll listener for shrink + active link
  window.addEventListener('scroll', onScroll, { passive: true });

  // Logo click → scroll to top
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Toggle the mobile menu open / closed.
 */
function toggleMobileMenu() {
  hamburgerEl.classList.toggle('open');
  mobileMenuEl.classList.toggle('open');
  document.body.style.overflow = mobileMenuEl.classList.contains('open') ? 'hidden' : '';
}

/**
 * Close the mobile menu. Call from inline onclick on menu links.
 */
export function closeMobileMenu() {
  if (!hamburgerEl || !mobileMenuEl) return;
  hamburgerEl.classList.remove('open');
  mobileMenuEl.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Scroll handler: shrink nav + highlight active section link.
 */
function onScroll() {
  // Shrink nav on scroll
  if (navEl) {
    navEl.classList.toggle('shrink', window.scrollY > 60);
  }

  // Update active nav link
  const scrollPos = window.scrollY + 140;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    }
  });
}
