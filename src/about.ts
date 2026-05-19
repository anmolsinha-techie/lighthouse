import { renderNavbar, renderFooter, renderPageHero, initShared, initCountUp } from '../src/shared';

const promises = [
  { icon: '☕', title: 'Slow Cooking', text: 'Recipes we trust, techniques we\'ve perfected, dishes that take their time.' },
  { icon: '🥗', title: 'Honest Food', text: 'Real ingredients, generous portions, made the way we\'d make it at home.' },
  { icon: '🕯️', title: 'Warm Spaces', text: 'Warm lighting, soft music, room to think — never to rush.' },
  { icon: '❤️', title: 'Real People', text: 'Staff who remember you, regulars who feel like family.' },
];

const galleryImages = [
  { image: '/images/hero-bg.png', label: 'THE ATMOSPHERE', title: 'Warm & inviting' },
  { image: '/images/chef-cooking.png', label: 'THE KITCHEN', title: 'Where magic begins' },
  { image: '/images/restaurant-dining.png', label: 'THE EXPERIENCE', title: 'Memories in the making' },
];

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();

  const heroEl = document.getElementById('pageHero');
  if (heroEl) heroEl.innerHTML = renderPageHero('OUR STORY', 'A lighthouse, by people who needed <em>one too</em>', 'Every great meal has a story. Here\'s ours.');

  const grid = document.getElementById('promisesGrid');
  if (grid) grid.innerHTML = promises.map(p => `
    <div class="feature-card fade-in">
      <div class="feature-icon">${p.icon}</div>
      <h3 class="feature-title">${p.title}</h3>
      <p class="feature-text">${p.text}</p>
    </div>`).join('');

  const gallery = document.getElementById('aboutGallery');
  if (gallery) gallery.innerHTML = galleryImages.map(g => `
    <div class="gallery-card fade-in">
      <img src="${g.image}" alt="${g.title}" loading="lazy" />
      <div class="gallery-card-overlay">
        <span class="gallery-card-label">${g.label}</span>
        <span class="gallery-card-title">${g.title}</span>
      </div>
    </div>`).join('');

  initShared();
  initCountUp();
});
