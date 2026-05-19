import { renderNavbar, renderFooter, renderPageHero, initShared, initScrollAnimations } from '../src/shared';

interface GalleryImage { src: string; caption: string; category: string; tall?: boolean; }

const images: GalleryImage[] = [
  { src: '/images/hero-bg.png', caption: 'The Lighthouse Ambiance', category: 'Ambiance', tall: true },
  { src: '/images/dish-chicken.png', caption: 'Grilled Herb Chicken', category: 'Food' },
  { src: '/images/gallery-rooftop.png', caption: 'Rooftop Dining Under the Stars', category: 'Ambiance', tall: true },
  { src: '/images/dish-dessert.png', caption: 'Chocolate Lava Cake', category: 'Food' },
  { src: '/images/gallery-bar.png', caption: 'The Lighthouse Bar', category: 'Ambiance' },
  { src: '/images/dish-seafood.png', caption: 'Ocean Harvest Platter', category: 'Food' },
  { src: '/images/chef-cooking.png', caption: 'Our Chef in Action', category: 'Kitchen', tall: true },
  { src: '/images/drink-cocktail.png', caption: 'Golden Hour Cocktail', category: 'Food' },
  { src: '/images/restaurant-dining.png', caption: 'A Perfect Evening', category: 'Ambiance' },
  { src: '/images/dish-pasta.png', caption: 'Truffle Cream Pasta', category: 'Food', tall: true },
  { src: '/images/gallery-table.png', caption: 'Elegant Table Settings', category: 'Ambiance' },
  { src: '/images/lighthouse.png', caption: 'Our Guiding Light', category: 'Ambiance' },
];

const categories = ['All', ...new Set(images.map(i => i.category))];
let activeCat = 'All';
let lightboxIndex = 0;
let filteredImages: GalleryImage[] = [...images];

function renderGalleryCats(): void {
  const el = document.getElementById('galleryCats');
  if (!el) return;
  el.innerHTML = categories.map(c =>
    `<button class="cat-btn${c === activeCat ? ' active' : ''}" data-cat="${c}">${c.toUpperCase()}</button>`
  ).join('');
  el.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCat = (btn as HTMLElement).dataset.cat || 'All';
      renderGalleryCats();
      renderGallery();
    });
  });
}

function renderGallery(): void {
  const grid = document.getElementById('galleryMasonry');
  if (!grid) return;
  filteredImages = activeCat === 'All' ? [...images] : images.filter(i => i.category === activeCat);
  grid.innerHTML = filteredImages.map((img, i) => `
    <div class="masonry-item${img.tall ? ' tall' : ''} fade-in" data-index="${i}">
      <img src="${img.src}" alt="${img.caption}" loading="lazy" />
      <div class="masonry-overlay">
        <span class="masonry-caption">${img.caption}</span>
      </div>
    </div>`).join('');

  grid.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxIndex = parseInt((item as HTMLElement).dataset.index || '0');
      openLightbox();
    });
  });
  requestAnimationFrame(() => initScrollAnimations());
}

function openLightbox(): void {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg') as HTMLImageElement;
  const cap = document.getElementById('lightboxCaption');
  if (!lb || !img || !cap) return;
  const item = filteredImages[lightboxIndex];
  img.src = item.src;
  img.alt = item.caption;
  cap.textContent = item.caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(): void {
  document.getElementById('lightbox')?.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  const heroEl = document.getElementById('pageHero');
  if (heroEl) heroEl.innerHTML = renderPageHero('GALLERY', 'Moments at the <em>Lighthouse</em>', 'Sneak a peek inside your next favorite spot.');
  renderGalleryCats();
  renderGallery();

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.getElementById('lightboxPrev')?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    openLightbox();
  });
  document.getElementById('lightboxNext')?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % filteredImages.length;
    openLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox')?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length; openLightbox(); }
    if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % filteredImages.length; openLightbox(); }
  });

  initShared();
});
