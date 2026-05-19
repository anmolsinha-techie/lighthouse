import { renderNavbar, renderFooter, renderPageHero, initShared, showToast } from '../src/shared';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  const heroEl = document.getElementById('pageHero');
  if (heroEl) heroEl.innerHTML = renderPageHero('GET IN TOUCH', 'We\'d love to <em>hear</em> from you', 'Bookings, events, questions, compliments — drop us a message or just walk in.');

  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('📨 Message sent! We\'ll get back to you soon.');
    (e.target as HTMLFormElement).reset();
  });

  initShared();
});
