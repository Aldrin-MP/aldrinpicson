const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const navigationLinks = document.querySelectorAll('[data-navigation] a');
const year = document.querySelector('[data-year]');
const revealItems = document.querySelectorAll('.reveal');
const resumeDialog = document.querySelector('#resume-viewer');
const resumeOpeners = document.querySelectorAll('[data-resume-open]');
const resumeCloser = document.querySelector('[data-resume-close]');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (resumeDialog) {
  resumeOpeners.forEach((opener) => {
    opener.addEventListener('click', (event) => {
      event.preventDefault();
      resumeDialog.showModal();
    });
  });

  resumeCloser?.addEventListener('click', () => resumeDialog.close());
  resumeDialog.addEventListener('click', (event) => {
    if (event.target === resumeDialog) resumeDialog.close();
  });
}

const closeMenu = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
};

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));
}

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
