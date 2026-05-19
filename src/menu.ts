import { renderNavbar, renderFooter, renderPageHero, initShared, initScrollAnimations } from '../src/shared';

interface MenuItem { name: string; desc: string; price: string; image: string; tag: string; category: string; badge?: string; veg?: boolean; }

const allItems: MenuItem[] = [
  { name: 'Grilled Herb Chicken', desc: 'Tender chicken with rosemary and thyme, served with seasonal vegetables.', price: '₹480', image: '/images/dish-chicken.png', tag: 'MAIN COURSE', category: 'Main Course', badge: 'SIGNATURE' },
  { name: 'Butter Chicken Masala', desc: 'Creamy tomato-based curry with tender boneless chicken, naan on the side.', price: '₹420', image: '/images/dish-chicken.png', tag: 'MAIN COURSE', category: 'Main Course' },
  { name: 'Chocolate Lava Cake', desc: 'Rich molten chocolate center with vanilla ice cream and berry compote.', price: '₹340', image: '/images/dish-dessert.png', tag: 'DESSERTS', category: 'Desserts', badge: 'SIGNATURE' },
  { name: 'Tiramisu Classic', desc: 'Layers of mascarpone cream and espresso-soaked ladyfingers dusted with cocoa.', price: '₹320', image: '/images/dish-dessert.png', tag: 'DESSERTS', category: 'Desserts' },
  { name: 'Ocean Harvest Platter', desc: 'Fresh grilled prawns and fish with lemon herb butter and sides.', price: '₹650', image: '/images/dish-seafood.png', tag: 'SEAFOOD', category: 'Seafood', badge: 'SIGNATURE' },
  { name: 'Garlic Butter Prawns', desc: 'Jumbo prawns sautéed in garlic butter with fresh herbs and crusty bread.', price: '₹550', image: '/images/dish-seafood.png', tag: 'SEAFOOD', category: 'Seafood' },
  { name: 'Truffle Cream Pasta', desc: 'House-made pasta in a creamy truffle sauce with parmesan shavings.', price: '₹420', image: '/images/dish-pasta.png', tag: 'PASTA', category: 'Pasta', badge: 'SIGNATURE', veg: true },
  { name: 'Aglio Olio Spaghetti', desc: 'Classic olive oil and garlic pasta with chili flakes and fresh basil.', price: '₹350', image: '/images/dish-pasta.png', tag: 'PASTA', category: 'Pasta', veg: true },
  { name: 'Golden Hour Cocktail', desc: 'Artisan craft cocktail with citrus and warm spices over crystal ice sphere.', price: '₹380', image: '/images/drink-cocktail.png', tag: 'BEVERAGES', category: 'Beverages' },
  { name: 'Lighthouse Sunset', desc: 'Mango and passion fruit blended with a hint of lime and sparkling soda.', price: '₹280', image: '/images/drink-cocktail.png', tag: 'BEVERAGES', category: 'Beverages' },
  { name: 'Garden Fresh Salad', desc: 'Mixed greens with roasted vegetables, goat cheese, and balsamic drizzle.', price: '₹290', image: '/images/dish-salad.png', tag: 'STARTERS', category: 'Starters', veg: true },
  { name: 'Bruschetta Trio', desc: 'Toasted sourdough topped with tomato basil, mushroom, and olive tapenade.', price: '₹320', image: '/images/dish-salad.png', tag: 'STARTERS', category: 'Starters', veg: true },
];

const categories = ['All', ...new Set(allItems.map(i => i.category))];
let activeCategory = 'All';
let searchQuery = '';

function renderCategories(): void {
  const el = document.getElementById('menuCategories');
  if (!el) return;
  el.innerHTML = categories.map(c =>
    `<button class="cat-btn${c === activeCategory ? ' active' : ''}" data-cat="${c}">${c.toUpperCase()}</button>`
  ).join('');
  el.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = (btn as HTMLElement).dataset.cat || 'All';
      renderCategories();
      renderMenu();
    });
  });
}

function renderMenu(): void {
  const grid = document.getElementById('menuGrid');
  const empty = document.getElementById('menuEmpty');
  if (!grid) return;
  const filtered = allItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery) || item.tag.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
  if (empty) empty.style.display = filtered.length === 0 ? 'block' : 'none';
  grid.innerHTML = filtered.map((item, i) => `
    <div class="menu-card" style="transition-delay:${i * 0.05}s">
      <div class="menu-card-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="menu-card-tag">${item.tag}</span>
      </div>
      <div class="menu-card-body">
        <h3 class="menu-card-name">${item.name}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${item.price}</span>
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
        </div>
      </div>
    </div>`).join('');
  // Re-observe for animations
  requestAnimationFrame(() => initScrollAnimations());
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  const heroEl = document.getElementById('pageHero');
  if (heroEl) heroEl.innerHTML = renderPageHero('OUR MENU', 'Crafted slowly, served with <em>love</em>', 'From farm-fresh starters to indulgent desserts — explore what makes our kitchen shine.');
  renderCategories();
  renderMenu();
  document.getElementById('menuSearch')?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
    renderMenu();
  });
  initShared();
});
