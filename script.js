/* ============================================================
   ElectroMart Pro – script.js
   Full e-commerce functionality with cart, search, filter, modal
   ============================================================ */

'use strict';

/* ---------- Product Data ---------- */
const PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'mobiles',
    price: 1199,
    rating: 4.9,
    reviews: 1283,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, USB-C, and an upgraded 5× optical zoom camera system.',
    features: ['A17 Pro Chip', '48MP Camera', 'USB-C', 'Titanium Frame', '5× Zoom']
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'mobiles',
    price: 1299,
    rating: 4.8,
    reviews: 943,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
    description: 'Galaxy AI comes to the S24 Ultra. Built-in S Pen, 200MP camera, and a Titanium frame that\'s tougher than ever.',
    features: ['Snapdragon 8 Gen 3', '200MP Camera', 'S Pen', 'Titanium Body', '5000mAh']
  },
  {
    id: 3,
    name: 'Google Pixel 8 Pro',
    category: 'mobiles',
    price: 899,
    rating: 4.7,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    description: 'Google\'s most sophisticated phone. AI-powered features, 7 years of OS updates, and a stunning 6.7-inch LTPO display.',
    features: ['Google Tensor G3', 'AI Photography', '7 Yrs Updates', '120Hz Display', '50MP Main']
  },
  {
    id: 4,
    name: 'OnePlus 12R',
    category: 'mobiles',
    price: 499,
    rating: 4.5,
    reviews: 421,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80',
    description: 'Flagship performance at a mid-range price. 120W fast charging and a smooth 120Hz AMOLED display.',
    features: ['Snapdragon 8 Gen 1', '120W Charging', '50MP Camera', '5000mAh', '120Hz AMOLED']
  },
  {
    id: 5,
    name: 'MacBook Pro 14" M3 Pro',
    category: 'laptops',
    price: 1999,
    rating: 4.9,
    reviews: 2104,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    description: 'M3 Pro chip with a 12-core CPU and 18-core GPU delivers unprecedented performance for creative professionals.',
    features: ['M3 Pro Chip', '18GB RAM', '512GB SSD', 'Liquid Retina XDR', '22hr Battery']
  },
  {
    id: 6,
    name: 'Dell XPS 15 OLED',
    category: 'laptops',
    price: 1799,
    rating: 4.7,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    description: 'A stunning 15.6-inch OLED display with Intel Core i9, NVIDIA GeForce RTX 4070, and a premium CNC aluminum chassis.',
    features: ['Intel Core i9', 'RTX 4070', '32GB DDR5', '1TB NVMe', 'OLED Touch']
  },
  {
    id: 7,
    name: 'ASUS ROG Zephyrus G14',
    category: 'laptops',
    price: 1549,
    rating: 4.6,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
    description: 'Ultra-compact 14-inch gaming powerhouse with Ryzen 9 and RX 7900S, wrapped in a stunning AniMe Matrix display.',
    features: ['Ryzen 9 7940HS', 'RX 7900S GPU', '16GB LPDDR5', '1TB SSD', 'AniMe Matrix']
  },
  {
    id: 8,
    name: 'LG Gram 16',
    category: 'laptops',
    price: 1299,
    rating: 4.5,
    reviews: 384,
    image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&q=80',
    description: 'Feather-light at just 1.19kg yet MIL-SPEC tough. Intel Core Ultra 7 with all-day battery life that actually lasts.',
    features: ['Core Ultra 7', '16GB RAM', '1TB SSD', 'MIL-STD-810H', '72Wh Battery']
  },
  {
    id: 9,
    name: 'Surface Laptop Studio 2',
    category: 'laptops',
    price: 1599,
    rating: 4.4,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=600&q=80',
    description: 'Versatile creator laptop with a unique pull-forward design. Intel Core i7, RTX 4060 GPU, and a stunning PixelSense display.',
    features: ['Core i7-13700H', 'RTX 4060', '32GB RAM', '1TB SSD', 'PixelSense Touch']
  },
  {
    id: 10,
    name: 'AirPods Pro 2nd Gen',
    category: 'accessories',
    price: 249,
    rating: 4.8,
    reviews: 5621,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80',
    description: 'Up to 2× more Active Noise Cancellation than before, plus Adaptive Audio that keeps you connected to your world.',
    features: ['Active Noise Cancel', 'Adaptive Audio', 'Personalized Volume', 'USB-C', '30hr Total']
  },
  {
    id: 11,
    name: 'Sony WH-1000XM5',
    category: 'accessories',
    price: 349,
    rating: 4.9,
    reviews: 3847,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
    description: 'Industry-leading noise cancellation powered by two processors and eight microphones. 30-hour battery, foldable design.',
    features: ['2 Processors', '8 Microphones', '30hr Battery', 'LDAC Audio', 'Quick Charge']
  },
  {
    id: 12,
    name: 'Apple Watch Ultra 2',
    category: 'accessories',
    price: 799,
    rating: 4.8,
    reviews: 1204,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    description: 'The most rugged and capable Apple Watch. Titanium case, Wayfinder watch face, and precision dual-frequency GPS.',
    features: ['Titanium Case', 'Dual GPS', '60hr Battery', 'Water 100m', 'S9 Chip']
  },
  {
    id: 13,
    name: 'Logitech MX Keys S',
    category: 'accessories',
    price: 109,
    rating: 4.6,
    reviews: 2891,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    description: 'Advanced illuminated wireless keyboard for designers and developers. Smart backlighting adapts to ambient lighting.',
    features: ['Wireless BT', 'Smart Backlit', '10-Day Battery', 'Multi-Device', 'USB-C']
  },
  {
    id: 14,
    name: 'Samsung 49" Odyssey G9',
    category: 'accessories',
    price: 1099,
    rating: 4.7,
    reviews: 721,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80',
    description: 'Super-ultra-wide 49-inch curved gaming monitor with DQHD resolution, 240Hz refresh rate, and 1ms response time.',
    features: ['DQHD 5120×1440', '240Hz', '1ms GtG', 'AMD FreeSync', 'USB-C 90W']
  },
  {
    id: 15,
    name: 'Anker 737 Power Bank',
    category: 'accessories',
    price: 149,
    rating: 4.7,
    reviews: 1834,
    image: 'https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=600&q=80',
    description: '24,000mAh capacity with 140W output, smart digital display showing battery status and wattage in real time.',
    features: ['24000mAh', '140W Output', 'Smart Display', '3 USB-C', '65W PD']
  },
  {
    id: 16,
    name: 'Xiaomi 14 Ultra',
    category: 'mobiles',
    price: 1099,
    rating: 4.8,
    reviews: 734,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
    description: 'Leica-tuned camera system with 1-inch Sony LYT-900 sensor, Snapdragon 8 Gen 3, and a 5300mAh silicon-carbon battery.',
    features: ['Snapdragon 8 Gen 3', '1-inch Sensor', 'Leica Optics', '5300mAh', '90W Wireless']
  }
];

/* ---------- State ---------- */
let cart = [];
let activeCategory = 'all';
let maxPrice = 2000;
let searchQuery = '';
let sortOrder = 'default';
let currentModalProduct = null;

/* ---------- DOM References ---------- */
const els = {
  productGrid:    document.getElementById('productGrid'),
  skeletonGrid:   document.getElementById('skeletonGrid'),
  emptyState:     document.getElementById('emptyState'),
  searchInput:    document.getElementById('searchInput'),
  priceRange:     document.getElementById('priceRange'),
  priceDisplay:   document.getElementById('priceDisplay'),
  sortSelect:     document.getElementById('sortSelect'),
  cartCount:      document.getElementById('cartCount'),
  cartItems:      document.getElementById('cartItems'),
  cartEmpty:      document.getElementById('cartEmpty'),
  cartFooter:     document.getElementById('cartFooter'),
  totalPrice:     document.getElementById('totalPrice'),
  cartPanel:      document.getElementById('cartPanel'),
  cartOverlay:    document.getElementById('cartOverlay'),
  cartToggle:     document.getElementById('cartToggle'),
  cartClose:      document.getElementById('cartClose'),
  clearCart:      document.getElementById('clearCart'),
  categoryList:   document.getElementById('categoryList'),
  contentTitle:   document.getElementById('contentTitle'),
  productCount:   document.getElementById('productCount'),
  modalOverlay:   document.getElementById('modalOverlay'),
  modalClose:     document.getElementById('modalClose'),
  modalImage:     document.getElementById('modalImage'),
  modalCategory:  document.getElementById('modalCategory'),
  modalTitle:     document.getElementById('modalTitle'),
  modalRating:    document.getElementById('modalRating'),
  modalPrice:     document.getElementById('modalPrice'),
  modalDesc:      document.getElementById('modalDesc'),
  modalFeatures:  document.getElementById('modalFeatures'),
  modalAddToCart: document.getElementById('modalAddToCart'),
  themeToggle:    document.getElementById('themeToggle'),
  resetFilters:   document.getElementById('resetFilters'),
  mobileFilterToggle: document.getElementById('mobileFilterToggle'),
  sidebar:        document.getElementById('sidebar'),
  toastContainer: document.getElementById('toast-container'),
};

/* ============================================================
   CART FUNCTIONS
   ============================================================ */

function loadCart() {
  try {
    const stored = localStorage.getItem('em_cart');
    cart = stored ? JSON.parse(stored) : [];
  } catch { cart = []; }
}

function saveCart() {
  localStorage.setItem('em_cart', JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart();
  renderCart();
  updateCartCount();
  showToast(`${product.name} added to cart`, 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartCount();
}

function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity = Math.max(1, item.quantity + delta);
  if (item.quantity === 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
  updateCartCount();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
  showToast('Cart cleared', 'info');
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  els.cartCount.textContent = total;
  els.cartCount.classList.toggle('visible', total > 0);
}

function renderCart() {
  const hasItems = cart.length > 0;
  els.cartEmpty.style.display  = hasItems ? 'none'  : 'flex';
  els.cartFooter.style.display = hasItems ? 'flex'  : 'none';

  if (!hasItems) {
    els.cartItems.innerHTML = '';
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  els.totalPrice.textContent = `$${total.toFixed(2)}`;

  els.cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-action="remove" data-id="${item.id}" aria-label="Remove from cart">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  `).join('');
}

/* ============================================================
   PRODUCT RENDERING
   ============================================================ */

function getFilteredProducts() {
  let filtered = [...PRODUCTS];

  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  filtered = filtered.filter(p => p.price <= maxPrice);

  switch (sortOrder) {
    case 'price-asc':  filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'name-asc':   filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc':  filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
  }

  return filtered;
}

function renderStars(rating) {
  const full    = Math.floor(rating);
  const half    = rating % 1 >= 0.5 ? 1 : 0;
  const empty   = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderProducts() {
  const products = getFilteredProducts();

  const categoryLabel = activeCategory === 'all' ? 'All Products' :
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
  els.contentTitle.textContent = categoryLabel;
  els.productCount.textContent = `${products.length} item${products.length !== 1 ? 's' : ''}`;

  els.emptyState.style.display   = products.length === 0 ? 'flex' : 'none';
  els.productGrid.style.display  = products.length  > 0  ? 'grid' : 'none';

  if (products.length === 0) return;

  els.productGrid.innerHTML = products.map(p => `
    <article class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.name}">
      <div class="card-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" />
        <span class="card-badge badge-${p.category}">${p.category}</span>
      </div>
      <div class="card-body">
        <h2 class="card-title">${p.name}</h2>
        <div class="card-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <p class="card-price">$${p.price.toLocaleString()}</p>
      </div>
      <div class="card-footer">
        <button class="btn-add-cart" data-action="add-to-cart" data-id="${p.id}" aria-label="Add ${p.name} to cart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
            <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" stroke-width="2"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  `).join('');
}

/* ============================================================
   PRODUCT MODAL
   ============================================================ */

function openModal(productId) {
  const p = PRODUCTS.find(pr => pr.id === productId);
  if (!p) return;

  currentModalProduct = p;

  els.modalImage.src            = p.image;
  els.modalImage.alt            = p.name;
  els.modalCategory.textContent = p.category;
  els.modalCategory.className   = `modal-badge badge-${p.category}`;
  els.modalTitle.textContent    = p.name;
  els.modalRating.innerHTML     = `
    <span class="stars">${renderStars(p.rating)}</span>
    <span>${p.rating} · ${p.reviews.toLocaleString()} reviews</span>
  `;
  els.modalPrice.textContent    = `$${p.price.toLocaleString()}`;
  els.modalDesc.textContent     = p.description;
  els.modalFeatures.innerHTML   = p.features.map(f =>
    `<span class="feature-tag">${f}</span>`
  ).join('');

  els.modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  els.modalClose.focus();
}

function closeModal() {
  els.modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

/* ============================================================
   CART PANEL
   ============================================================ */

function openCart() {
  els.cartPanel.classList.add('open');
  els.cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartPanel() {
  els.cartPanel.classList.remove('open');
  els.cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */

function showToast(message, type = 'success') {
  const icons = {
    success: `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    error:   `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    info:    `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span><div class="toast-bar"></div>`;

  els.toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 3200);
}

/* ============================================================
   THEME
   ============================================================ */

function initTheme() {
  const saved = localStorage.getItem('em_theme') || 'dark';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('em_theme', theme);

  const sunIcon  = els.themeToggle.querySelector('.icon-sun');
  const moonIcon = els.themeToggle.querySelector('.icon-moon');

  if (theme === 'dark') {
    sunIcon.style.display  = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display  = 'none';
    moonIcon.style.display = 'block';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ============================================================
   SIDEBAR / MOBILE
   ============================================================ */

let sidebarOpen = false;

function toggleMobileSidebar() {
  sidebarOpen = !sidebarOpen;
  els.sidebar.classList.toggle('mobile-open', sidebarOpen);
}

function closeMobileSidebar() {
  sidebarOpen = false;
  els.sidebar.classList.remove('mobile-open');
}

/* ============================================================
   PRICE SLIDER
   ============================================================ */

function updateSliderStyle(value) {
  const pct = ((value - 0) / (2000 - 0)) * 100;
  els.priceRange.style.setProperty('--slider-pct', pct + '%');
}

/* ============================================================
   EVENT DELEGATION
   ============================================================ */

function setupEventListeners() {
  /* Search */
  els.searchInput.addEventListener('input', debounce(e => {
    searchQuery = e.target.value;
    renderProducts();
  }, 280));

  /* Price range */
  els.priceRange.addEventListener('input', e => {
    maxPrice = Number(e.target.value);
    els.priceDisplay.textContent = `$${maxPrice.toLocaleString()}`;
    updateSliderStyle(maxPrice);
    renderProducts();
  });

  /* Sort */
  els.sortSelect.addEventListener('change', e => {
    sortOrder = e.target.value;
    renderProducts();
  });

  /* Category list (event delegation) */
  els.categoryList.addEventListener('click', e => {
    const item = e.target.closest('.category-item');
    if (!item) return;
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    activeCategory = item.dataset.category;
    renderProducts();
    if (window.innerWidth <= 768) closeMobileSidebar();
  });

  /* Product grid (event delegation) */
  els.productGrid.addEventListener('click', e => {
    const addBtn = e.target.closest('[data-action="add-to-cart"]');
    if (addBtn) {
      e.stopPropagation();
      addToCart(Number(addBtn.dataset.id));
      return;
    }
    const card = e.target.closest('.product-card');
    if (card) openModal(Number(card.dataset.id));
  });

  /* Keyboard nav for product cards */
  els.productGrid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.product-card');
      if (card) {
        e.preventDefault();
        openModal(Number(card.dataset.id));
      }
    }
  });

  /* Cart toggle */
  els.cartToggle.addEventListener('click', openCart);
  els.cartClose.addEventListener('click', closeCartPanel);
  els.cartOverlay.addEventListener('click', closeCartPanel);

  /* Cart items (event delegation) */
  els.cartItems.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (btn.dataset.action === 'remove')   removeFromCart(id);
    if (btn.dataset.action === 'increase') changeQuantity(id, 1);
    if (btn.dataset.action === 'decrease') changeQuantity(id, -1);
  });

  /* Clear cart */
  els.clearCart.addEventListener('click', clearCart);

  /* Modal */
  els.modalClose.addEventListener('click', closeModal);
  els.modalOverlay.addEventListener('click', e => {
    if (e.target === els.modalOverlay) closeModal();
  });

  /* Modal add to cart */
  els.modalAddToCart.addEventListener('click', () => {
    if (currentModalProduct) {
      addToCart(currentModalProduct.id);
      closeModal();
    }
  });

  /* Theme toggle */
  els.themeToggle.addEventListener('click', toggleTheme);

  /* Reset filters */
  els.resetFilters.addEventListener('click', resetAllFilters);

  /* Mobile sidebar toggle */
  els.mobileFilterToggle.addEventListener('click', toggleMobileSidebar);

  /* Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (els.modalOverlay.classList.contains('open'))  closeModal();
      else if (els.cartPanel.classList.contains('open')) closeCartPanel();
      else if (sidebarOpen) closeMobileSidebar();
    }
  });
}

function resetAllFilters() {
  searchQuery   = '';
  activeCategory = 'all';
  maxPrice      = 2000;
  sortOrder     = 'default';

  els.searchInput.value  = '';
  els.priceRange.value   = '2000';
  els.priceDisplay.textContent = '$2,000';
  els.sortSelect.value   = 'default';
  updateSliderStyle(2000);

  document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
  document.querySelector('[data-category="all"]').classList.add('active');

  renderProducts();
}

/* ---------- Debounce utility ---------- */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ============================================================
   INIT
   ============================================================ */

function init() {
  initTheme();
  loadCart();

  /* Show skeleton, then products after simulated load */
  setTimeout(() => {
    els.skeletonGrid.style.display = 'none';
    renderProducts();
    renderCart();
    updateCartCount();
    updateSliderStyle(2000);
  }, 900);

  setupEventListeners();
}

/* Service Worker Registration */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('[SW] Registered:', reg.scope))
      .catch(err => console.warn('[SW] Registration failed:', err));
  });
}

document.addEventListener('DOMContentLoaded', init);
