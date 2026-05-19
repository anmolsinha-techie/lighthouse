import { renderNavbar, renderFooter, renderPageHero, initShared, showToast } from '../src/shared';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  const heroEl = document.getElementById('pageHero');
  if (heroEl) heroEl.innerHTML = renderPageHero('RESERVE A TABLE', 'Save your <em>perfect evening</em>', 'Walk-ins welcome — but reservations guarantee the best seats. Weekends fill up fast!');

  // Set minimum date to today
  const dateInput = document.getElementById('resDate') as HTMLInputElement;
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  document.getElementById('reservationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('🎉 Reservation confirmed! We look forward to hosting you.');
    (e.target as HTMLFormElement).reset();
  });

  initShared();
});
