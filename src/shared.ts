import './style.css';

/** Determine current page from pathname */
export function getCurrentPage(): string {
  const path = window.location.pathname;
  if (path.includes('/about')) return 'about';
  if (path.includes('/menu')) return 'menu';
  if (path.includes('/reservation')) return 'reservation';
  if (path.includes('/gallery')) return 'gallery';
  if (path.includes('/contact')) return 'contact';
  return 'home';
}

/** Build navigation link with correct path based on current depth */
function navHref(page: string): string {
  const current = getCurrentPage();
  const isSubpage = current !== 'home';
  if (page === 'home') return isSubpage ? '/' : '/';
  return isSubpage ? `/${page}/` : `/${page}/`;
}

/** Generate shared navbar HTML */
export function renderNavbar(): void {
  const page = getCurrentPage();
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const links = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'menu', label: 'MENU' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'reservation', label: 'RESERVATION' },
    { id: 'contact', label: 'CONTACT' },
  ];

  nav.innerHTML = `
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <div class="logo-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L16 8H22L17 12L19 18L14 14L9 18L11 12L6 8H12L14 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <line x1="14" y1="18" x2="14" y2="26" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="14" cy="6" r="2" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">LIGHTHOUSE</span>
          <span class="logo-sub">RESTAURANT</span>
        </div>
      </a>
      <ul class="nav-links" id="navLinks">
        ${links.map(l => `<li><a href="${navHref(l.id)}" class="nav-link${page === l.id ? ' active' : ''}">${l.label}</a></li>`).join('')}
      </ul>
      <div class="nav-right">
        <a href="${navHref('reservation')}" class="btn btn-accent nav-cta">BOOK A TABLE</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`;
}

/** Generate shared footer HTML */
export function renderFooter(): void {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3 class="footer-logo">LIGHTHOUSE RESTAURANT</h3>
          <p class="footer-desc">A beacon of flavor on the shore. Premium dining, crafted dishes, and unforgettable ambiance — right in the heart of the city.</p>
          <div class="footer-socials">
            <a href="#" class="social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
            </a>
            <a href="#" class="social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">EXPLORE</h4>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/menu/">Menu</a></li>
            <li><a href="/reservation/">Reservation</a></li>
            <li><a href="/gallery/">Gallery</a></li>
            <li><a href="/contact/">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">VISIT US</h4>
          <ul class="footer-links footer-contact-list">
            <li>📍 123 Harbor Road, Waterfront District</li>
            <li>🕐 12:00 PM – 11:00 PM</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@lighthouserestaurant.in</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">STAY IN THE LOOP</h4>
          <p class="footer-newsletter-text">New menus, seasonal specials, and exclusive offers — straight to your inbox.</p>
          <form class="newsletter-form" id="newsletterForm">
            <input type="email" placeholder="your@email.com" required />
            <button type="submit" class="btn btn-accent btn-sm">Join</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 LIGHTHOUSE RESTAURANT · CRAFTED WITH 🔥 &amp; LOVE</p>
        <p class="footer-legal">PRIVACY · TERMS · PRESS</p>
      </div>
    </div>`;
}

/** Initialize shared behaviors: sticky nav, hamburger, forms, scroll animations */
export function initShared(): void {
  // Sticky nav
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  });
  // Fire once on load
  navbar?.classList.toggle('scrolled', window.scrollY > 50);

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });

  // Newsletter
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✉️ Welcome aboard! Check your inbox soon.');
    (e.target as HTMLFormElement).reset();
  });

  // Scroll animations
  initScrollAnimations();
}

/** Show a toast notification */
export function showToast(msg: string): void {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/** Fade-in on scroll observer */
export function initScrollAnimations(): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .menu-card').forEach(el => observer.observe(el));
}

/** Count-up animation for stat numbers */
export function initCountUp(): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.target || '0', 10);
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

function animateCount(el: HTMLElement, target: number): void {
  const duration = 2000;
  const start = performance.now();
  const format = (n: number): string => {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K+';
    return n.toString() + '+';
  };
  function step(timestamp: number): void {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = format(Math.floor(eased * target));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/** Generate a page hero banner */
export function renderPageHero(tag: string, title: string, subtitle?: string): string {
  return `
    <section class="page-hero">
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <span class="section-tag">${tag}</span>
        <h1 class="page-hero-title">${title}</h1>
        ${subtitle ? `<p class="page-hero-subtitle">${subtitle}</p>` : ''}
      </div>
    </section>`;
}
