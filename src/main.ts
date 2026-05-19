import { renderNavbar, renderFooter, initShared, initCountUp } from './shared';

// ===== Data =====
interface MenuItem { name: string; desc: string; price: string; image: string; tag: string; badge?: string; }
interface Testimonial { quote: string; author: string; role: string; }
interface Feature { icon: string; title: string; text: string; }

const menuItems: MenuItem[] = [
  { name: 'Grilled Herb Chicken', desc: 'Tender chicken with rosemary and thyme, served with seasonal vegetables.', price: '₹480', image: '/images/dish-chicken.png', tag: 'MAIN COURSE', badge: 'SIGNATURE' },
  { name: 'Chocolate Lava Cake', desc: 'Rich molten chocolate center with vanilla ice cream and berry compote.', price: '₹340', image: '/images/dish-dessert.png', tag: 'DESSERTS', badge: 'SIGNATURE' },
  { name: 'Ocean Harvest Platter', desc: 'Fresh grilled prawns and fish with lemon herb butter and sides.', price: '₹650', image: '/images/dish-seafood.png', tag: 'SEAFOOD' },
  { name: 'Truffle Cream Pasta', desc: 'House-made pasta in a creamy truffle sauce with parmesan shavings.', price: '₹420', image: '/images/dish-pasta.png', tag: 'PASTA' },
  { name: 'Golden Hour Cocktail', desc: 'Artisan craft cocktail with citrus and warm spices over crystal ice.', price: '₹380', image: '/images/drink-cocktail.png', tag: 'BEVERAGES' },
  { name: 'Garden Fresh Salad', desc: 'Mixed greens with roasted vegetables, goat cheese, and balsamic drizzle.', price: '₹290', image: '/images/dish-salad.png', tag: 'STARTERS' },
];

const testimonials: Testimonial[] = [
  { quote: 'The most memorable dining experience in the city. The ambiance, the flavors, the service — everything is extraordinary.', author: 'Priya Sharma', role: 'Food Blogger' },
  { quote: 'Lighthouse Restaurant is our go-to for celebrations. The chef\'s attention to detail makes every visit special.', author: 'Rahul Kapoor', role: 'Regular Guest' },
  { quote: 'From the truffle pasta to the chocolate lava cake, every dish tells a story. A true hidden gem.', author: 'Ananya Gupta', role: 'Travel & Food Writer' },
  { quote: 'The seafood platter is absolutely divine. Freshness and presentation rival any five-star restaurant.', author: 'Vikram Singh', role: 'Business Executive' },
];

const features: Feature[] = [
  { icon: '🍽️', title: 'Artisan Cuisine', text: 'Every dish is crafted with passion using the finest locally sourced ingredients.' },
  { icon: '🎵', title: 'Live Ambiance', text: 'Soft jazz evenings, warm lighting, and an atmosphere that soothes the soul.' },
  { icon: '🛋️', title: 'Intimate Spaces', text: 'Cozy private corners, elegant booths, and a rooftop with panoramic views.' },
  { icon: '📸', title: 'Picture Perfect', text: 'Every corner is designed for memories — your Instagram will thank you.' },
];

const tickerText = 'WARM LIGHTS • CRAFTED DISHES • SOULFUL AMBIANCE • OCEAN VIEWS • PREMIUM DINING • MEMORABLE EVENINGS';

// ===== Renderers =====
function renderTicker(): void {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  track.innerHTML = Array(4).fill(tickerText).map(t => `<span>${t}</span>`).join('');
}

function renderMenu(): void {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  grid.innerHTML = menuItems.map((item, i) => `
    <div class="menu-card" style="transition-delay:${i * 0.1}s">
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
}

function renderFeatures(): void {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;
  grid.innerHTML = features.map(f => `
    <div class="feature-card fade-in">
      <div class="feature-icon">${f.icon}</div>
      <h3 class="feature-title">${f.title}</h3>
      <p class="feature-text">${f.text}</p>
    </div>`).join('');
}

function renderTestimonials(): void {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-slide">
      <p class="testimonial-quote">${t.quote}</p>
      <p class="testimonial-author">${t.author}</p>
      <p class="testimonial-role">${t.role}</p>
    </div>`).join('');
}

function initTestimonialSlider(): void {
  const track = document.getElementById('testimonialTrack') as HTMLElement;
  const prev = document.getElementById('prevTestimonial');
  const next = document.getElementById('nextTestimonial');
  let current = 0;
  const total = testimonials.length;
  const slideTo = (i: number) => { current = (i + total) % total; track.style.transform = `translateX(-${current * 100}%)`; };
  prev?.addEventListener('click', () => slideTo(current - 1));
  next?.addEventListener('click', () => slideTo(current + 1));
  setInterval(() => slideTo(current + 1), 6000);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  renderTicker();
  renderMenu();
  renderFeatures();
  renderTestimonials();
  initShared();
  initTestimonialSlider();
  initCountUp();
});
