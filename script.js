const categoryToggle = document.getElementById('categoryToggle');
const megaMenu = document.getElementById('megaMenu');
const navShell = document.getElementById('navShell');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const toast = document.getElementById('toast');
const cartButton = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');

const products = [
  { name: 'Án gian thờ chạm thủ công', type: 'Gia tiên', code: 'PG-AG01' },
  { name: 'Sập thờ chạm hoa văn truyền thống', type: 'Gia tiên', code: 'PG-ST02' },
  { name: 'Bộ đồ thờ gỗ hoàn thiện', type: 'Đồ thờ', code: 'PG-DT03' },
  { name: 'Tượng thờ chế tác theo mẫu', type: 'Tượng', code: 'PG-TT04' },
  { name: 'Bàn thờ đứng', type: 'Gia tiên', code: 'PG-BT05' },
  { name: 'Hoành phi và câu đối', type: 'Đồ thờ', code: 'PG-HP06' },
  { name: 'Tượng Quan Âm', type: 'Tượng', code: 'PG-TT07' }
];
let cart = [];
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2500);
}

function setMegaMenu(open) {
  megaMenu.classList.toggle('open', open);
  categoryToggle.setAttribute('aria-expanded', String(open));
}

categoryToggle.addEventListener('click', () => {
  setMegaMenu(!megaMenu.classList.contains('open'));
});

mobileMenuToggle.addEventListener('click', () => {
  const open = !navShell.classList.contains('mobile-open');
  navShell.classList.toggle('mobile-open', open);
  mobileMenuToggle.setAttribute('aria-expanded', String(open));
  mobileMenuToggle.setAttribute('aria-label', open ? 'Đóng danh mục' : 'Mở danh mục');
  if (!open) setMegaMenu(false);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-shell')) setMegaMenu(false);
  if (!event.target.closest('.search-wrap')) searchResults.classList.remove('show');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMegaMenu(false);
    closeCartDrawer();
    searchResults.classList.remove('show');
  }
});

function normalizeText(value) {
  return value.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function renderSearchResults(query) {
  const normalized = normalizeText(query.trim());
  if (!normalized) {
    searchResults.classList.remove('show');
    searchResults.innerHTML = '';
    return;
  }
  const matches = products.filter((product) => normalizeText(product.name + ' ' + product.type).includes(normalized));
  searchResults.innerHTML = matches.length
    ? matches.slice(0, 5).map((product) => `<a class="search-result" href="#featured"><span>${product.name}</span><small>${product.code}</small></a>`).join('')
    : '<div class="search-empty">Chưa tìm thấy sản phẩm phù hợp. Hãy thử từ khóa khác.</div>';
  searchResults.classList.add('show');
}

searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderSearchResults(searchInput.value);
  if (searchInput.value.trim()) {
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    showToast('Đang hiển thị các sản phẩm phù hợp với từ khóa của bạn.');
  }
});
searchResults.addEventListener('click', (event) => {
  if (event.target.closest('a')) searchResults.classList.remove('show');
});

// The category chips filter the sample product cards without reloading the page.
document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('hidden', !visible);
    });
  });
});

// Quick links in the category tiles move to the products and select a matching filter.
document.querySelectorAll('[data-category-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const name = link.dataset.categoryLink;
    let filter = 'all';
    if (name === 'Đồ thờ gia tiên') filter = 'Gia tiên';
    if (name === 'Tượng thờ') filter = 'Tượng';
    if (name === 'Đồ thờ Phật') filter = 'Tượng';
    if (name === 'Đồ thờ thủ công') filter = 'Đồ thờ';
    const chip = [...document.querySelectorAll('.filter-chip')].find((item) => item.dataset.filter === filter);
    if (chip) chip.click();
  });
});

function renderCart() {
  cartCount.textContent = String(cart.length);
  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty-cart"><span>✳</span><strong>Giỏ hàng đang trống</strong><p>Hãy thêm sản phẩm bạn quan tâm để tiện trao đổi cùng Phú Gia.</p></div>';
    return;
  }
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-line">
      <div><strong>${item}</strong><small>Vui lòng liên hệ để nhận tư vấn và báo giá</small></div>
      <button class="remove-item" data-remove="${index}" aria-label="Xóa ${item}">Xóa</button>
    </div>`).join('');
}

document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    cart.push(name);
    renderCart();
    showToast('Đã thêm sản phẩm vào danh sách quan tâm.');
  });
});

cartItems.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove]');
  if (!removeButton) return;
  cart.splice(Number(removeButton.dataset.remove), 1);
  renderCart();
});

function openCartDrawer() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('show');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('show');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
cartButton.addEventListener('click', openCartDrawer);
closeCart.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

renderCart();
