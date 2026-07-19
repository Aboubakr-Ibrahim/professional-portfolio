const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 25);
}, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    menuButton.focus();
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const filterButtons = document.querySelectorAll('.filter-button');
const credentials = document.querySelectorAll('.credential-card');

filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  credentials.forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

const modal = document.querySelector('#credential-modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');

credentials.forEach(card => card.addEventListener('click', () => {
  modalImage.src = card.dataset.image;
  modalImage.alt = card.dataset.title;
  modalTitle.textContent = card.dataset.title;
  modal.showModal();
}));

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const bounds = modal.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) modal.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();
