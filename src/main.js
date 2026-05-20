import './styles.css';

document.documentElement.classList.add('reveal-ready');

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('is-open');
  });
});

const caseStudyToggles = document.querySelectorAll('[data-case-study-toggle]');

caseStudyToggles.forEach((button) => {
  const targetId = button.getAttribute('aria-controls');
  const caseStudy = targetId ? document.getElementById(targetId) : null;
  const label = button.querySelector('[data-toggle-label]');

  if (!caseStudy || !label) {
    return;
  }

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    const nextState = !isOpen;

    button.setAttribute('aria-expanded', String(nextState));
    label.textContent = nextState ? 'Show less' : 'Read case study';
    caseStudy.hidden = !nextState;
  });
});

const revealItems = document.querySelectorAll('.section, .hero-stats, .project-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));
