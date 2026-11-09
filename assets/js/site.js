const siteServices = [
  {
    title: 'Braids & Protective Styles',
    image: '../assets/images/hair getting braided.webp',
    description: 'Knotless braids, box braids, and tailored protective styling for natural hair growth.'
  },
  {
    title: 'Custom Wig Installs',
    image: '../assets/images/installing wig.webp',
    description: 'Flawless lace melts, custom fitting, and long-lasting wig customization.'
  },
  {
    title: 'Wash & Restorative Care',
    image: '../assets/images/hair getting washed.jpg',
    description: 'Deep conditioning treatments, scalp care, and blowouts using premium hair essentials.'
  }
];

const siteGallery = [
  { src: '../assets/images/image of the salon.jpg', alt: 'Salon interior and styling area' },
  { src: '../assets/images/hair getting braided.webp', alt: 'Braided hair styling' },
  { src: '../assets/images/installing wig.webp', alt: 'Custom wig installation process' },
  { src: '../assets/images/hair getting washed.jpg', alt: 'Hair washing and scalp care' },
  { src: '../assets/images/hair getting blow dried.jpg', alt: 'Blow dry finishing styled hair' },
  { src: '../assets/images/styling wig image.jpg', alt: 'Wig styling and finish' }
];

const siteFaqs = [
  {
    question: 'How do I book a styling appointment?',
    answer: 'Visit the Bookings page, complete the form, and include your preferred service and any reference photos. We will confirm your slot by email or phone.'
  },
  {
    question: 'Do you take custom styling requests?',
    answer: 'Yes. We welcome custom looks, protective style requests, and wig installations tailored to your hair goals and lifestyle.'
  },
  {
    question: 'Can I order products online?',
    answer: 'Yes. The Shop page lets you add products to your cart and calculate your total before completing a checkout-style order flow.'
  }
];

const siteProducts = [
  { id: 1, name: 'Shampoo', category: 'care', price: 200, image: '../assets/images/shampooimage.png' },
  { id: 2, name: 'Conditioner', category: 'care', price: 180, image: '../assets/images/conditionerimage.png' },
  { id: 3, name: 'Hair Spray', category: 'styling', price: 120, image: '../assets/images/hairsprayimage.png' },
  { id: 4, name: 'Hair Oil', category: 'nourish', price: 150, image: '../assets/images/hairoilimage.png' },
  { id: 5, name: 'Hair Butter', category: 'nourish', price: 160, image: '../assets/images/hairbutterimage.png' },
  { id: 6, name: 'Hair Gel', category: 'styling', price: 110, image: '../assets/images/hairgelimage.png' },
  { id: 7, name: 'Hair Mist', category: 'care', price: 130, image: '../assets/images/hairmistimage.png' },
  { id: 8, name: 'Edge Control', category: 'styling', price: 95, image: '../assets/images/edgecontrolimage.png' }
];

function formatPrice(value) {
  return `R${Number(value).toFixed(2)}`;
}

function setUpToast() {
  if (document.getElementById('siteToast')) return;

  const toast = document.createElement('div');
  toast.id = 'siteToast';
  toast.className = 'site-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
}

function showToast(message) {
  setUpToast();
  const toast = document.getElementById('siteToast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

window.addToCart = function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: productName, price: Number(price) });
  localStorage.setItem('cart', JSON.stringify(cart));
  showToast(`${productName} added to cart`);
};

function renderHomeServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  grid.innerHTML = siteServices.map((service) => `
    <article class="service-card reveal-card">
      <img src="${service.image}" alt="${service.title}">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </article>
  `).join('');
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = siteGallery.map((item, index) => `
    <button type="button" class="gallery-item reveal-card" data-lightbox="${index}" aria-label="Open image ${index + 1}">
      <img src="${item.src}" alt="${item.alt}">
    </button>
  `).join('');

  const modal = document.getElementById('lightboxModal');
  if (!modal) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightboxModal';
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button type="button" class="lightbox-close" aria-label="Close image view">&times;</button>
        <img id="lightboxImage" src="" alt="Expanded gallery item">
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-lightbox]');
    if (!trigger) return;

    const index = Number(trigger.dataset.lightbox);
    const selected = siteGallery[index];
    const modalEl = document.getElementById('lightboxModal');
    const image = document.getElementById('lightboxImage');
    if (!selected || !modalEl || !image) return;

    image.src = selected.src;
    image.alt = selected.alt;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.lightbox-close') || event.target.id === 'lightboxModal') {
      const modalEl = document.getElementById('lightboxModal');
      if (modalEl) {
        modalEl.classList.remove('open');
        modalEl.setAttribute('aria-hidden', 'true');
      }
    }
  });
}

function renderFaq() {
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  accordion.innerHTML = siteFaqs.map((item, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button type="button" class="faq-question" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span>${item.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" style="${index === 0 ? 'display:block' : 'display:none'}">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.faq-question');
    if (!button) return;

    const item = button.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach((faqItem) => {
      faqItem.classList.remove('active');
      const question = faqItem.querySelector('.faq-question');
      const answerBox = faqItem.querySelector('.faq-answer');
      if (question) question.setAttribute('aria-expanded', 'false');
      if (answerBox) answerBox.style.display = 'none';
    });

    if (!isOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      answer.style.display = 'block';
    }
  });
}

function renderProducts() {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;

  const searchInput = document.getElementById('productSearch');
  const categoryInput = document.getElementById('productFilter');
  const sortInput = document.getElementById('productSort');

  const searchTerm = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const categoryTerm = categoryInput ? categoryInput.value : 'all';
  const sortTerm = sortInput ? sortInput.value : 'name-asc';

  let filteredProducts = siteProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = categoryTerm === 'all' || product.category === categoryTerm;
    return matchesSearch && matchesCategory;
  });

  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sortTerm) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (!filteredProducts.length) {
    grid.innerHTML = '<div class="empty-state">No products match your current search.</div>';
    return;
  }

  grid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card reveal-card">
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p class="price">${formatPrice(product.price)}</p>
      <button type="button" class="btn btn-primary" data-add-cart data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
    </article>
  `).join('');
}

function bindProductControls() {
  const searchInput = document.getElementById('productSearch');
  const categoryInput = document.getElementById('productFilter');
  const sortInput = document.getElementById('productSort');

  searchInput?.addEventListener('input', renderProducts);
  categoryInput?.addEventListener('change', renderProducts);
  sortInput?.addEventListener('change', renderProducts);

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-cart]');
    if (!addButton) return;

    const name = addButton.dataset.name;
    const price = Number(addButton.dataset.price);
    if (name && Number.isFinite(price)) {
      addToCart(name, price);
    }
  });
}

function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer || typeof L === 'undefined') return;

  const map = L.map('map', { scrollWheelZoom: false }).setView([-26.2041, 28.0473], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([-26.2041, 28.0473]).addTo(map)
    .bindPopup('Mhlaba Hair Studio<br>Johannesburg, South Africa');
}

document.addEventListener('DOMContentLoaded', () => {
  setUpToast();
  renderHomeServices();
  renderGallery();
  renderFaq();
  bindProductControls();
  renderProducts();
  initMap();
});
