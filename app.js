// ===== THRIFTX APP.JS =====

// ===== STATE =====
const state = {
  user: null,
  cart: [],
  wishlist: [],
  products: [],
  filteredProducts: [],
  currentPage: 1,
  itemsPerPage: 12,
  activeFilters: { categories: [], crafts: [], sizes: [], colors: [], minPrice: 0, maxPrice: 5000, minRating: 0 },
  sortBy: 'featured',
  selectedPayment: 'upi',
  currentProduct: null,
  selectedRating: 0,
  selectedTags: [],
  promoApplied: null,
  tryOnImage: null,
  selectedOutfit: null,
  viewMode: 'grid',
  reviewingProduct: null
};

// ===== PRODUCT DATA =====
// Each product uses `img`: path under `img/` (jpg, jpeg, png, webp). Missing files show img/placeholder.svg.
const PRODUCTS = [
  { id:1, name:"Jaipur Block Print Kurta", category:"kurtas", craft:"block-print", region:"Rajasthan", price:899, original:2499, img:"img/Jaipuri.jpeg", colors:["#c0392b","#2980b9","#27ae60"], sizes:["S","M","L","XL"], rating:4.8, reviews:128, badge:"bestseller", tags:["block-print","rajasthan"] },
  { id:2, name:"Santhal Legacy Handloom Saree", category:"sarees", craft:"tribal-weave", region:"Jharkhand", price:2499, original:5500, img:"img/Santhal Legacy.jpeg", colors:["#c0392b","#f5f5f5"], sizes:["Free"], rating:4.8, reviews:89, badge:"new", tags:["santhal","handloom","jharkhand"] },
  { id:3, name:"Assam Golden Thread Saree", category:"sarees", craft:"muga-silk", region:"Assam", price:4599, original:12000, img:"img/Assam Golden Thread.jpeg", colors:["#d4a017","#f5f5f5"], sizes:["Free"], rating:4.9, reviews:203, badge:"bestseller", tags:["muga","assam","silk"] },
  { id:4, name:"Bengal Kantha Stitch Kurta", category:"kurtas", craft:"kantha", region:"West Bengal", price:1099, original:3200, img:"img/bengal.jpeg", colors:["#f39c12","#27ae60","#c0392b"], sizes:["XS","S","M","L","XL","XXL"], rating:4.6, reviews:67, tags:["kantha","bengal"] },
  { id:5, name:"Punjab Phulkari Dupatta", category:"dupattas", craft:"phulkari", region:"Punjab", price:749, original:2100, img:"img/Phulkari.jpeg", colors:["#e67e22","#c0392b","#8e44ad"], sizes:["Free"], rating:4.5, reviews:154, badge:"new", tags:["phulkari","punjab"] },
  { id:6, name:"Munda Chronicles Ethnic Set", category:"ethnic-sets", craft:"traditional-weave", region:"Jharkhand", price:3199, original:7200, img:"img/Munda Chronicles.jpeg", colors:["#2c3e50","#c45c2a"], sizes:["S","M","L","XL"], rating:4.8, reviews:91, badge:"bestseller", tags:["munda","tribal","jharkhand"] },
  { id:7, name:"Kalamkari Print Kurta", category:"kurtas", craft:"kalamkari", region:"Andhra Pradesh", price:799, original:2200, img:"img/Kalamkari.jpeg", colors:["#c45c2a","#2c3e50","#27ae60"], sizes:["S","M","L","XL","XXL"], rating:4.4, reviews:43, tags:["kalamkari","andhra"] },
  { id:8, name:"Ajrakh Block Print Shawl", category:"shawls", craft:"ajrakh", region:"Gujarat", price:1599, original:4800, img:"img/product-8.jpg", colors:["#2c3e50","#c0392b","#1abc9c"], sizes:["Free"], rating:4.7, reviews:112, badge:"new", tags:["ajrakh","gujarat"] },
  { id:9, name:"Brahmaputra Weave Kurta", category:"kurtas", craft:"handloom", region:"Assam", price:1899, original:4200, img:"img/Brahmaputra.jpeg", colors:["#c0392b","#f5f5f5"], sizes:["XS","S","M","L","XL"], rating:4.9, reviews:267, badge:"bestseller", tags:["handloom","northeast"] },
  { id:10, name:"Assamese Silk Tunic Shirt", category:"menswear", craft:"handloom", region:"Assam", price:1699, original:3800, img:"img/Assamese Tunic Shirt.jpeg", colors:["#d4a017","#c0392b"], sizes:["S","M","L","XL","XXL"], rating:4.7, reviews:78, badge:"new", tags:["menswear","assam","silk"] },
  { id:11, name:"Kerala Kasavu Set", category:"ethnic-sets", craft:"kasavu", region:"Kerala", price:2799, original:8000, img:"img/product-11.jpg", colors:["#f5f5f5","#d4a017"], sizes:["S","M","L","XL"], rating:4.8, reviews:143, badge:"new", tags:["kasavu","kerala"] },
  { id:12, name:"Madhubani Art Kurta", category:"kurtas", craft:"madhubani", region:"Bihar", price:699, original:1900, img:"img/product-12.jpg", colors:["#c0392b","#27ae60","#f39c12"], sizes:["S","M","L","XL","XXL"], rating:4.3, reviews:56, tags:["madhubani","bihar"] },
  { id:13, name:"Bandhani dupatta", category:"dupattas", craft:"bandhani", region:"Gujarat", price:599, original:1800, img:"img/Bandhani dupatta.png", colors:["#c0392b","#8e44ad","#e67e22"], sizes:["Free"], rating:4.5, reviews:88, tags:["bandhani","gujarat"] },
  { id:14, name:"Patola Silk Saree", category:"sarees", craft:"patola", region:"Gujarat", price:4999, original:18000, img:"img/product-14.jpg", colors:["#8e44ad","#c0392b","#2980b9"], sizes:["Free"], rating:4.9, reviews:34, badge:"bestseller", tags:["patola","silk"] },
  { id:15, name:"Rajasthani Bandhej Lehengha", category:"lehengas", craft:"bandhej", region:"Rajasthan", price:4299, original:13500, img:"img/product-15.jpg", colors:["#c0392b","#8e44ad","#f39c12"], sizes:["S","M","L","XL"], rating:4.7, reviews:61, tags:["bandhej","rajasthan"] },
  { id:16, name:"Jodhpuri Bandhgala Suit", category:"menswear", craft:"block-print", region:"Rajasthan", price:2499, original:7500, img:"img/product-16.jpg", colors:["#2c3e50","#333","#c45c2a"], sizes:["S","M","L","XL","XXL"], rating:4.8, reviews:93, badge:"new", tags:["menswear","rajasthan"] },
  { id:17, name:"Pahadi Woolen Shawl", category:"shawls", craft:"pahadi", region:"Himachal Pradesh", price:1199, original:3600, img:"img/product-17.jpg", colors:["#8e44ad","#c0392b","#2980b9"], sizes:["Free"], rating:4.6, reviews:109, tags:["pahadi","himachal"] },
  { id:18, name:"Warli Print Tote Bag", category:"accessories", craft:"warli", region:"Maharashtra", price:399, original:1100, img:"img/product-18.jpg", colors:["#f5f5f5","#c45c2a","#27ae60"], sizes:["Free"], rating:4.4, reviews:176, badge:"new", tags:["warli","maharashtra"] },
  { id:19, name:"Lambani Mirror Work Blouse", category:"accessories", craft:"lambani", region:"Karnataka", price:849, original:2400, img:"img/product-19.jpg", colors:["#c0392b","#8e44ad","#f39c12"], sizes:["XS","S","M","L","XL"], rating:4.7, reviews:52, tags:["lambani","karnataka"] },
  { id:20, name:"Manipuri Phanek Sarong", category:"sarees", craft:"manipuri", region:"Manipur", price:1499, original:4200, img:"img/product-20.jpg", colors:["#c0392b","#2980b9","#27ae60"], sizes:["Free"], rating:4.5, reviews:29, tags:["manipuri","northeast"] },
  { id:21, name:"Dabu Print Men's Kurta", category:"menswear", craft:"dabu", region:"Rajasthan", price:899, original:2600, img:"img/product-21.jpg", colors:["#2c3e50","#c45c2a","#27ae60"], sizes:["S","M","L","XL","XXL"], rating:4.6, reviews:71, tags:["dabu","menswear"] },
  { id:22, name:"Kashmiri Aari Embroidery Shawl", category:"shawls", craft:"aari", region:"Kashmir", price:2999, original:9500, img:"img/product-22.jpg", colors:["#c0392b","#8e44ad","#2c3e50"], sizes:["Free"], rating:4.9, reviews:187, badge:"bestseller", tags:["aari","kashmir"] },
  { id:23, name:"Jamdani Cotton Saree", category:"sarees", craft:"jamdani", region:"West Bengal", price:2599, original:8000, img:"img/product-23.jpg", colors:["#f5f5f5","#2980b9","#c0392b"], sizes:["Free"], rating:4.8, reviews:63, tags:["jamdani","bengal"] },
  { id:24, name:"Tribal Dhokra Necklace", category:"accessories", craft:"dhokra", region:"Chhattisgarh", price:549, original:1500, img:"img/Tribal.jpeg", colors:["#d4a017","#c45c2a"], sizes:["Free"], rating:4.5, reviews:141, badge:"new", tags:["dhokra","tribal"] }
];

const IMG_PLACEHOLDER = 'img/placeholder.svg';

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function productImageSrc(p) {
  if (p && p.img) return p.img;
  if (p && p.id) return `img/product-${p.id}.jpg`;
  return IMG_PLACEHOLDER;
}

function productImgTag(p, className) {
  const src = escapeAttr(productImageSrc(p));
  const alt = escapeAttr(p.name || '');
  const cls = className || 'product-img-photo';
  return `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'">`;
}

function lineItemImageSrc(item) {
  if (item.img) return item.img;
  if (item.id) return `img/product-${item.id}.jpg`;
  return IMG_PLACEHOLDER;
}

const REVIEWS = {
  1: [
    { name:"Priya S", city:"Mumbai", date:"2 weeks ago", rating:5, title:"Absolutely love it!", body:"The block print quality is exceptional. Wore it to a family function and got so many compliments. The slight 'defect' they mention is barely visible.", tags:["Great quality","Beautiful design"] },
    { name:"Ananya R", city:"Delhi", date:"1 month ago", rating:5, title:"Gorgeous fabric", body:"Exactly as described. Sustainable fashion at its best. Will definitely order again!", tags:["Good value","Unique pattern"] },
    { name:"Meera K", city:"Bangalore", date:"3 weeks ago", rating:4, title:"Nice but runs small", body:"Beautiful print, great quality fabric. Size runs a bit small - order one up.", tags:["Beautiful design"] }
  ]
};

const TESTIMONIALS = [
  { name:"Sunita Mehta", city:"Jaipur", rating:5, text:"I've been buying from ThriftX for 6 months now. The quality is unreal for the price. Every piece feels like it was made for me." },
  { name:"Kavita Sharma", city:"Mumbai", rating:5, text:"The AI try-on feature is AMAZING. Saved me from returns. I tried 12 outfits in 5 minutes from my living room!" },
  { name:"Rajan Pillai", city:"Kochi", rating:5, text:"The Kerala Kasavu set I ordered was pristine. Can't believe it was considered 'defective'. Zero visible flaws." },
  { name:"Pooja Agarwal", city:"Delhi", rating:4, text:"Love the concept. The sarees are gorgeous and I feel good knowing I'm supporting artisans and reducing waste." },
  { name:"Aditya Nair", city:"Pune", rating:5, text:"The Jodhpuri suit fit perfectly. Wore it to a wedding and everyone asked where I got it. Will shop here exclusively now." },
  { name:"Lakshmi Venkat", city:"Chennai", rating:5, text:"Authentic craft traditions at prices I can actually afford. ThriftX is changing sustainable fashion in India." },
  { name:"Fatima Sheikh", city:"Hyderabad", rating:4, text:"Fast delivery, lovely packaging, and the phulkari dupatta is even more beautiful in person than online." },
  { name:"Arjun Kapoor", city:"Ahmedabad", rating:5, text:"My wife ordered the Patola saree. She was speechless. The slight imperfection is in the pallu and barely visible. Incredible value." }
];

const OUTFITS = [
  { img: 'img/Jaipuri.jpeg', name: 'Block Print Kurta', id: 'kurta1' },
  { img: 'img/Assam Golden Thread.jpeg', name: 'Muga Silk Saree', id: 'saree1' }, 
  { img: 'img/product-6.jpg', name: 'Chanderi Lehenga', id: 'lehenga1' },
  { img: 'img/product-16.jpg', name: 'Bandhgala Suit', id: 'suit1' },
  { img: 'img/Kalamkari.jpeg', name: 'Kurta Set', id: 'kurtaset7' },
  { img: 'img/product-19.jpg', name: 'Mirror Work Blouse', id: 'blouse1' }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  state.products = [...PRODUCTS];
  state.filteredProducts = [...PRODUCTS];

  loadFromStorage();
  renderProducts();
  renderTestimonials();
  renderLookbook();
  renderTryOnOutfits();
  updateCartBadge();
  updateWishlistBadge();

  // Sticky nav scroll
  window.addEventListener('scroll', handleScroll);
}
function handleScroll() {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.6)';
  else nav.style.boxShadow = 'none';
}

// ===== LOCAL STORAGE =====
function saveToStorage() {
  localStorage.setItem('thriftx_cart', JSON.stringify(state.cart));
  localStorage.setItem('thriftx_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('thriftx_user', JSON.stringify(state.user));
}

function loadFromStorage() {
  try {
    state.cart = JSON.parse(localStorage.getItem('thriftx_cart')) || [];
    state.wishlist = JSON.parse(localStorage.getItem('thriftx_wishlist')) || [];
    state.user = JSON.parse(localStorage.getItem('thriftx_user')) || null;
    if (state.user) updateAuthUI();
  } catch(e) { console.error(e); }
}

// ===== TOAST =====
function showToast(msg, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100px)'; setTimeout(() => toast.remove(), 300); }, duration);
}

// ===== AUTH =====
function handleAuthClick() {
  if (state.user) showUserMenu();
  else openModal('auth-modal');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
  document.getElementById(`${tab}-form`).classList.add('active');
}

function handleLogin() {
  const email = document.getElementById('login-email').value;
  const pwd = document.getElementById('login-password').value;
  if (!email || !pwd) { showToast('Please fill in all fields', 'error'); return; }
  // Simulate login
  state.user = { name: email.split('@')[0], email, avatar: email.charAt(0).toUpperCase() };
  updateAuthUI();
  saveToStorage();
  closeAllModals();
  showToast(`Welcome back, ${state.user.name}! 👋`, 'success');
}

function handleRegister() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const pwd = document.getElementById('reg-password').value;
  if (!name || !email || !pwd) { showToast('Please fill in all required fields', 'error'); return; }
  state.user = { name, email, avatar: name.charAt(0).toUpperCase() };
  updateAuthUI();
  saveToStorage();
  closeAllModals();
  showToast(`Welcome to ThriftX, ${name}! 🎉 Enjoy 15% off your first order.`, 'success');
}

function handleGoogleAuth() {
  state.user = { name: "Google User", email: "user@gmail.com", avatar: "G" };
  updateAuthUI();
  saveToStorage();
  closeAllModals();
  showToast('Signed in with Google! 🎉', 'success');
}

function updateAuthUI() {
  const btn = document.getElementById('auth-btn');
  const label = document.getElementById('auth-label');
  if (state.user) {
    label.textContent = state.user.name.split(' ')[0];
  } else {
    label.textContent = 'Login';
  }
}

function requireAuth(callback) {
  if (!state.user) { openModal('auth-modal'); return; }
  callback();
}

function showUserMenu() {
  // Simple dropdown-style toast for now
  const actions = ['Profile', 'My Orders', 'Wishlist', 'Logout'];
  showToast(`Logged in as ${state.user.name}. Use the Wishlist & Cart buttons above.`, 'info', 4000);
}

function showForgotPassword() {
  showToast('Password reset link sent to your email!', 'success');
}

// ===== MODAL MANAGEMENT =====
function openModal(id) {
  closeAllModals(true);
  document.getElementById(id).classList.add('active');
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAllModals(silent) {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  if (!silent) {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== CART =====
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const wishlist = document.getElementById('wishlist-sidebar');
  wishlist.classList.remove('open');
  sidebar.classList.toggle('open');
  if (sidebar.classList.contains('open')) {
    renderCartItems();
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addToCart(productId, size, color) {
  if (!state.user) { openModal('auth-modal'); return; }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const sz = size || product.sizes[0];
  const existing = state.cart.find(i => i.id === productId && i.size === sz);
  if (existing) existing.qty++;
  else state.cart.push({ ...product, qty: 1, size: sz, color: color || product.colors[0] });
  saveToStorage();
  updateCartBadge();
  showToast(`${product.name} added to cart! 🛒`, 'success');
}

function removeFromCart(idx) {
  state.cart.splice(idx, 1);
  saveToStorage();
  updateCartBadge();
  renderCartItems();
}

function updateQty(idx, delta) {
  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
  saveToStorage();
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-badge').textContent = total;
}

function renderCartItems() {
  const el = document.getElementById('cart-items');
  if (state.cart.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text3)"><div style="font-size:3rem;margin-bottom:16px">🛒</div><p>Your cart is empty</p><p style="font-size:0.85rem;margin-top:8px">Explore our collections and find something you love!</p></div>';
    updateCartTotals();
    return;
  }
  el.innerHTML = state.cart.map((item, i) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${escapeAttr(lineItemImageSrc(item))}" alt="${escapeAttr(item.name)}" loading="lazy" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size} · ${item.craft}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${i}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${i}, 1)">+</button>
          <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</span>
          <span class="remove-btn" onclick="removeFromCart(${i})">✕ Remove</span>
        </div>
      </div>
    </div>
  `).join('');
  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  let discount = 0;
  if (state.promoApplied === 'THRIFT20') discount = Math.round(subtotal * 0.2);
  const shipping = subtotal >= 999 ? 0 : 79;
  const total = subtotal - discount + shipping;
  document.getElementById('cart-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('cart-discount').textContent = `-₹${discount.toLocaleString()}`;
  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('cart-total').textContent = `₹${total.toLocaleString()}`;
  if (discount > 0) document.getElementById('discount-row').classList.remove('hidden');
  else document.getElementById('discount-row').classList.add('hidden');
}

function applyPromo() {
  const code = document.getElementById('promo-input').value.trim().toUpperCase();
  if (code === 'THRIFT20') { state.promoApplied = code; updateCartTotals(); showToast('Promo applied! 20% off 🎉', 'success'); }
  else if (code === 'FREESHIP') { showToast('Free shipping applied!', 'success'); }
  else showToast('Invalid promo code', 'error');
}

// ===== WISHLIST =====
function toggleWishlist() {
  const sidebar = document.getElementById('wishlist-sidebar');
  const cart = document.getElementById('cart-sidebar');
  cart.classList.remove('open');
  sidebar.classList.toggle('open');
  if (sidebar.classList.contains('open')) {
    renderWishlistItems();
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleWishlistProduct(productId) {
  const idx = state.wishlist.findIndex(id => id === productId);
  const product = PRODUCTS.find(p => p.id === productId);
  if (idx === -1) {
    state.wishlist.push(productId);
    showToast(`${product.name} added to wishlist ♡`, 'success');
  } else {
    state.wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`);
  }
  saveToStorage();
  updateWishlistBadge();
  document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', state.wishlist.includes(productId));
    btn.textContent = state.wishlist.includes(productId) ? '♥' : '♡';
  });
}

function updateWishlistBadge() {
  document.getElementById('wishlist-badge').textContent = state.wishlist.length;
}

function renderWishlistItems() {
  const el = document.getElementById('wishlist-items');
  const items = PRODUCTS.filter(p => state.wishlist.includes(p.id));
  if (items.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text3)"><div style="font-size:3rem;margin-bottom:16px">♡</div><p>Your wishlist is empty</p></div>';
    return;
  }
  el.innerHTML = items.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${escapeAttr(productImageSrc(item))}" alt="${escapeAttr(item.name)}" loading="lazy" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.craft} · ${item.region}</div>
        <div class="cart-item-controls">
          <span class="cart-item-price">₹${item.price.toLocaleString()}</span>
          <button class="qty-btn" onclick="addToCart(${item.id}); toggleWishlist()" style="width:auto;padding:0 10px;border-radius:6px">Add to Cart</button>
          <span class="remove-btn" onclick="toggleWishlistProduct(${item.id}); renderWishlistItems()">✕</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== SEARCH =====
function handleSearch(query) {
  const sugg = document.getElementById('search-suggestions');
  if (!query || query.length < 2) { sugg.classList.add('hidden'); return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.craft.toLowerCase().includes(query.toLowerCase()) ||
    p.region.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);
  if (results.length === 0) { sugg.classList.add('hidden'); return; }
  sugg.innerHTML = results.map(r => `<div class="search-suggestion" onclick="openProductModal(${r.id}); clearSearch()">${productImgTag(r, 'search-suggestion-img')}<span class="search-suggestion-text">${escapeAttr(r.name)} <span style="color:var(--text3);font-size:0.8rem">— ${escapeAttr(r.region)}</span></span></div>`).join('');
  sugg.classList.remove('hidden');
}

function performSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;
  state.filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.craft.toLowerCase().includes(query.toLowerCase()) ||
    p.region.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
  clearSearch();
  state.currentPage = 1;
  renderProducts();
  smoothScroll('products-section');
  document.getElementById('product-count').textContent = `Found ${state.filteredProducts.length} results for "${query}"`;
}

function clearSearch() {
  document.getElementById('search-suggestions').classList.add('hidden');
}

// ===== FILTERS =====
function filterByCategory(cat) {
  document.querySelectorAll('.cat-link').forEach(l => l.classList.remove('active'));
  document.querySelector(`[data-cat="${cat}"]`)?.classList.add('active');
  if (cat === 'all') {
    state.filteredProducts = [...PRODUCTS];
  } else {
    state.filteredProducts = PRODUCTS.filter(p => p.category === cat);
  }
  state.currentPage = 1;
  applySort(state.sortBy);
  renderProducts();
  smoothScroll('products-section');
}

function filterByTag(tag) {
  state.filteredProducts = PRODUCTS.filter(p => p.tags?.includes(tag) || p.craft === tag);
  state.currentPage = 1;
  renderProducts();
  smoothScroll('products-section');
}

function applyFilters() {
  const checkedCats = [...document.querySelectorAll('.filter-group input[type=checkbox]:checked')].filter(i => ['kurtas','sarees','lehengas','dupattas','shawls','ethnic-sets','menswear','accessories'].includes(i.value)).map(i => i.value);
  const checkedCrafts = [...document.querySelectorAll('.filter-group input[type=checkbox]:checked')].filter(i => ['block-print','banarasi','ikat','kantha','phulkari','chandheri','kalamkari','ajrakh'].includes(i.value)).map(i => i.value);
  const minRating = [...document.querySelectorAll('.filter-group input[type=checkbox]:checked')].filter(i => ['3','4'].includes(i.value)).map(i => parseFloat(i.value)).reduce((max, v) => Math.max(max, v), 0);

  state.filteredProducts = PRODUCTS.filter(p => {
    if (checkedCats.length && !checkedCats.includes(p.category)) return false;
    if (checkedCrafts.length && !checkedCrafts.includes(p.craft)) return false;
    if (state.activeFilters.sizes.length && !p.sizes.some(s => state.activeFilters.sizes.includes(s))) return false;
    if (p.price < state.activeFilters.minPrice || p.price > state.activeFilters.maxPrice) return false;
    if (p.rating < minRating) return false;
    return true;
  });
  state.currentPage = 1;
  applySort(state.sortBy);
  renderProducts();
}

function updatePriceFilter() {
  const min = parseInt(document.getElementById('price-min').value);
  const max = parseInt(document.getElementById('price-max').value);
  state.activeFilters.minPrice = Math.min(min, max);
  state.activeFilters.maxPrice = Math.max(min, max);
  document.getElementById('price-min-val').textContent = state.activeFilters.minPrice;
  document.getElementById('price-max-val').textContent = state.activeFilters.maxPrice;
  applyFilters();
}

function toggleSize(el) {
  el.classList.toggle('active');
  const size = el.textContent;
  const idx = state.activeFilters.sizes.indexOf(size);
  if (idx === -1) state.activeFilters.sizes.push(size);
  else state.activeFilters.sizes.splice(idx, 1);
  applyFilters();
}

function toggleColor(el, color) {
  el.classList.toggle('active');
  const idx = state.activeFilters.colors.indexOf(color);
  if (idx === -1) state.activeFilters.colors.push(color);
  else state.activeFilters.colors.splice(idx, 1);
  applyFilters();
}

function clearAllFilters() {
  document.querySelectorAll('.filter-group input[type=checkbox]').forEach(i => i.checked = false);
  document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
  document.getElementById('price-min').value = 0;
  document.getElementById('price-max').value = 5000;
  state.activeFilters = { categories: [], crafts: [], sizes: [], colors: [], minPrice: 0, maxPrice: 5000, minRating: 0 };
  document.getElementById('price-min-val').textContent = '0';
  document.getElementById('price-max-val').textContent = '5000';
  state.filteredProducts = [...PRODUCTS];
  state.currentPage = 1;
  renderProducts();
}

function applySort(val) {
  state.sortBy = val;
  const arr = [...state.filteredProducts];
  switch(val) {
    case 'price-low': arr.sort((a,b) => a.price - b.price); break;
    case 'price-high': arr.sort((a,b) => b.price - a.price); break;
    case 'rating': arr.sort((a,b) => b.rating - a.rating); break;
    case 'popular': arr.sort((a,b) => b.reviews - a.reviews); break;
    case 'newest': arr.sort((a,b) => b.id - a.id); break;
    default: break;
  }
  state.filteredProducts = arr;
  renderProducts();
}

function toggleFiltersMobile() {
  const panel = document.getElementById('filters-panel');
  panel.classList.toggle('mobile-open');
}

// ===== PRODUCTS RENDER =====
function setView(mode) {
  state.viewMode = mode;
  const grid = document.getElementById('products-grid');
  grid.className = `products-grid ${mode}-view`;
  document.getElementById('grid-view-btn').classList.toggle('active', mode === 'grid');
  document.getElementById('list-view-btn').classList.toggle('active', mode === 'list');
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const start = (state.currentPage - 1) * state.itemsPerPage;
  const pageProducts = state.filteredProducts.slice(start, start + state.itemsPerPage);

  document.getElementById('product-count').textContent = `Showing ${pageProducts.length} of ${state.filteredProducts.length} products`;

  if (pageProducts.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--text3)"><div style="font-size:3rem;margin-bottom:16px">🔍</div><p>No products match your filters.</p><button class="btn-ghost" onclick="clearAllFilters()" style="margin-top:16px">Clear Filters</button></div>';
    return;
  }

  grid.innerHTML = pageProducts.map(p => createProductCard(p)).join('');
  renderPagination();
}

function createProductCard(p) {
  const inWishlist = state.wishlist.includes(p.id);
  const savings = Math.round((1 - p.price / p.original) * 100);
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  return `
    <div class="product-card" onclick="openProductModal(${p.id})">
      ${p.badge ? `<div class="product-badge ${p.badge}">${p.badge}</div>` : ''}
      <div class="wishlist-btn ${inWishlist ? 'active' : ''}" data-id="${p.id}" onclick="event.stopPropagation(); toggleWishlistProduct(${p.id})">${inWishlist ? '♥' : '♡'}</div>
      <div class="product-img">
        <div class="product-img-inner" style="background:linear-gradient(135deg,${p.colors[0]}22,${p.colors[1]||p.colors[0]}11)">${productImgTag(p)}</div>
      </div>
      <div class="product-info">
        <div class="product-craft">${p.craft} · ${p.region}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span style="color:var(--text2);font-size:0.8rem">${p.rating}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">₹${p.price.toLocaleString()}</span>
          <span class="price-original">₹${p.original.toLocaleString()}</span>
          <span class="price-off">${savings}% off</span>
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

function renderPagination() {
  const total = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
  const el = document.getElementById('pagination');
  if (total <= 1) { el.innerHTML = ''; return; }
  let html = '';
  if (state.currentPage > 1) html += `<button class="page-btn" onclick="goToPage(${state.currentPage - 1})">←</button>`;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - state.currentPage) <= 1) {
      html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    } else if (Math.abs(i - state.currentPage) === 2) {
      html += `<button class="page-btn" disabled>...</button>`;
    }
  }
  if (state.currentPage < total) html += `<button class="page-btn" onclick="goToPage(${state.currentPage + 1})">→</button>`;
  el.innerHTML = html;
}

function goToPage(n) {
  state.currentPage = n;
  renderProducts();
  smoothScroll('products-section');
}

// ===== PRODUCT MODAL =====
function openProductModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;
  state.currentProduct = p;
  const savings = Math.round((1 - p.price / p.original) * 100);
  const reviews = REVIEWS[id] || generateFakeReviews(p);
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const stars = '★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating));
  const ratingDist = [5,4,3,2,1].map(n => ({
    n, count: reviews.filter(r => r.rating === n).length, pct: Math.round(reviews.filter(r => r.rating === n).length / reviews.length * 100)
  }));

  document.getElementById('product-modal-content').innerHTML = `
    <div class="pm-inner">
      <div class="pm-gallery">
        <div class="pm-main-img" style="background:linear-gradient(135deg,${p.colors[0]}22,${p.colors[1]||p.colors[0]}11)">${productImgTag(p, 'pm-main-photo')}</div>
        <div class="pm-thumbs">
          ${p.colors.map((c,i) => `<div class="pm-thumb ${i===0?'active':''}" style="background:${c}22;border-color:${c}" onclick="selectThumb(this)"><img src="${escapeAttr(productImageSrc(p))}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'"></div>`).join('')}
        </div>
      </div>
      <div class="pm-info">
        <div class="pm-craft">${p.craft} · ${p.region}</div>
        <h2 class="pm-name">${p.name}</h2>
        <div class="pm-rating">
          <span class="stars">${stars}</span>
          <span style="color:var(--text2);font-size:0.9rem">${avgRating.toFixed(1)} (${p.reviews} reviews)</span>
        </div>
        <div class="pm-price">
          <span class="pm-price-current">₹${p.price.toLocaleString()}</span>
          <span class="pm-price-original">₹${p.original.toLocaleString()}</span>
          <span class="pm-price-off">${savings}% off</span>
        </div>
        <p class="pm-description">A stunning piece from the ${p.region} region, crafted using traditional ${p.craft} techniques passed down through generations. Each piece is unique, procured from master artisans and given new life. The minor manufacturing variation that gives this piece its ThriftX status adds to its authentic, one-of-a-kind character.</p>
        
        <div class="pm-section-label">Select Size</div>
        <div class="pm-sizes" id="pm-sizes">
          ${p.sizes.map(s => `<div class="pm-size" onclick="selectPmSize(this,'${s}')">${s}</div>`).join('')}
        </div>
        
        <div class="pm-section-label">Color</div>
        <div class="pm-colors" id="pm-colors">
          ${p.colors.map((c,i) => `<div class="pm-color ${i===0?'selected':''}" style="background:${c}" onclick="selectPmColor(this)" data-color="${c}"></div>`).join('')}
        </div>
        
        <div class="pm-actions">
          <div class="pm-qty">
            <button class="qty-btn" onclick="changePmQty(-1)">−</button>
            <span class="qty-val" id="pm-qty">1</span>
            <button class="qty-btn" onclick="changePmQty(1)">+</button>
          </div>
          <button class="btn-primary" onclick="addCurrentToCart()" style="flex:1">Add to Cart 🛒</button>
          <button class="wishlist-btn" style="position:static;width:44px;height:44px;border-radius:8px" onclick="toggleWishlistProduct(${p.id})">${state.wishlist.includes(p.id) ? '♥' : '♡'}</button>
        </div>

        <div class="pm-features">
          <div class="pm-feature">✅ QC certified — imperfection documented</div>
          <div class="pm-feature">🚚 Free shipping on orders above ₹999</div>
          <div class="pm-feature">↩️ 15-day easy returns</div>
          <div class="pm-feature">✨ Try virtually using AI Try-On</div>
        </div>

        <!-- REVIEWS -->
        <div class="pm-reviews">
          <h3 style="font-family:'Playfair Display',serif;margin-bottom:16px">Customer Reviews</h3>
          <div class="reviews-summary">
            <div class="rating-big">${avgRating.toFixed(1)}</div>
            <div class="rating-bars">
              ${ratingDist.map(r => `
                <div class="rating-bar-row">
                  <span>${r.n}★</span>
                  <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${r.pct}%"></div></div>
                  <span>${r.count}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <button class="btn-ghost small write-review-btn" onclick="openReviewModal(${p.id})">✍️ Write a Review</button>
          <div style="margin-top:16px">
            ${reviews.map(r => `
              <div class="review-item">
                <div class="review-header">
                  <div class="review-avatar">${r.name.charAt(0)}</div>
                  <div>
                    <div class="review-name">${r.name}</div>
                    <div class="review-date">${r.city} · ${r.date}</div>
                  </div>
                  <div class="review-stars" style="margin-left:auto">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
                </div>
                <div class="review-title">${r.title}</div>
                <div class="review-body">${r.body}</div>
                ${r.tags ? `<div class="review-tags-display">${r.tags.map(t => `<span class="review-tag-chip">${t}</span>`).join('')}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  openModal('product-modal');

  // Set first size selected
  const firstSize = document.querySelector('#pm-sizes .pm-size');
  if (firstSize) firstSize.classList.add('selected');
}

function generateFakeReviews(p) {
  return [
    { name: "Anjali M", city: "Bangalore", date: "1 week ago", rating: 5, title: "Exceeded expectations!", body: `The ${p.name} is absolutely beautiful. Arrived well-packaged and the quality is impeccable.`, tags: ["Great quality", "Fast shipping"] },
    { name: "Sanjay P", city: "Mumbai", date: "3 weeks ago", rating: 4, title: "Great value for money", body: `Ordered for my wife and she loved it. Very authentic ${p.craft} work from ${p.region}.`, tags: ["Good value", "Unique pattern"] },
    { name: "Rekha V", city: "Delhi", date: "2 months ago", rating: 5, title: "Stunning craftsmanship", body: `The artisanship is remarkable. This is sustainable fashion done right.`, tags: ["Beautiful design"] }
  ];
}

let pmQty = 1;
let pmSize = null;
let pmColor = null;

function selectPmSize(el, size) {
  document.querySelectorAll('.pm-size').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  pmSize = size;
}

function selectPmColor(el) {
  document.querySelectorAll('.pm-color').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  pmColor = el.dataset.color;
}

function selectThumb(el) {
  document.querySelectorAll('.pm-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const thumbImg = el.querySelector('img');
  const main = document.querySelector('.pm-main-photo');
  if (thumbImg && main && thumbImg.src) main.src = thumbImg.src;
}

function changePmQty(delta) {
  pmQty = Math.max(1, pmQty + delta);
  document.getElementById('pm-qty').textContent = pmQty;
}

function addCurrentToCart() {
  if (!state.currentProduct) return;
  const size = pmSize || state.currentProduct.sizes[0];
  const color = pmColor || state.currentProduct.colors[0];
  for (let i = 0; i < pmQty; i++) addToCart(state.currentProduct.id, size, color);
  pmQty = 1;
  closeAllModals();
  setTimeout(() => requireAuth(toggleCart), 200);
}

// ===== CHECKOUT =====
function proceedToCheckout() {
  if (!state.user) { openModal('auth-modal'); return; }
  if (state.cart.length === 0) { showToast('Your cart is empty', 'error'); return; }
  toggleCart();
  setTimeout(() => { openModal('checkout-modal'); goToStep(1); }, 300);
}

function goToStep(n) {
  document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(`checkout-step-${n}`).classList.add('active');
  document.getElementById(`step-${n}-tab`).classList.add('active');
  for (let i = 1; i < n; i++) document.getElementById(`step-${i}-tab`).classList.add('done');
  if (n === 3) populateOrderSummary();
}

function selectPayment(method) {
  state.selectedPayment = method;
  document.querySelectorAll('.payment-detail-form').forEach(f => f.classList.add('hidden'));
  document.getElementById(`payment-details-${method}`)?.classList.remove('hidden');
}

function populateOrderSummary() {
  const el = document.getElementById('order-summary-items');
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  let discount = state.promoApplied === 'THRIFT20' ? Math.round(subtotal * 0.2) : 0;
  el.innerHTML = state.cart.map(item => `
    <div class="order-summary-item">
      <img class="osi-img" src="${escapeAttr(lineItemImageSrc(item))}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'">
      <span class="osi-line">${escapeAttr(item.name)} × ${item.qty}</span>
      <span class="osi-price">₹${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join('');
  document.getElementById('os-subtotal').textContent = `₹${(subtotal - discount).toLocaleString()}`;
  document.getElementById('os-total').textContent = `₹${(subtotal - discount).toLocaleString()}`;
}

function placeOrder() {
  const orderId = 'TFX' + Math.random().toString(36).substr(2,8).toUpperCase();
  state.cart = [];
  state.promoApplied = null;
  saveToStorage();
  updateCartBadge();
  closeAllModals();
  setTimeout(() => {
    document.getElementById('success-order-id').textContent = `Order ID: ${orderId}`;
    openModal('success-modal');
  }, 300);
  showToast('Order placed successfully! 🎉', 'success');
}

// ===== TRY-ON =====
let _tryOnInitialised = false;

async function _ensureTryOnReady() {
  if (!_tryOnInitialised) {
    _tryOnInitialised = true;
    await TryOnEngine.init();
  }
}

function toggleTryOn() {
  openModal('tryon-modal');
  _ensureTryOnReady();
}

function closeTryOn() {
  TryOnEngine.stopCamera();
  closeAllModals();
}

function switchTryOnTab(tab) {
  const uploadPanel = document.getElementById('tryon-upload-panel');
  const cameraPanel = document.getElementById('tryon-camera-panel');
  document.getElementById('tab-upload').classList.toggle('active', tab === 'upload');
  document.getElementById('tab-camera').classList.toggle('active', tab === 'camera');
  if (tab === 'upload') {
    uploadPanel.classList.remove('hidden');
    cameraPanel.classList.add('hidden');
    TryOnEngine.stopCamera();
    document.getElementById('camera-start-btn').classList.remove('hidden');
    document.getElementById('camera-capture-btn').classList.add('hidden');
    document.getElementById('camera-stop-btn').classList.add('hidden');
  } else {
    uploadPanel.classList.add('hidden');
    cameraPanel.classList.remove('hidden');
  }
}

async function startTryOnCamera() {
  await _ensureTryOnReady();
  const videoEl = document.getElementById('tryon-video');
  const camCanvas = document.getElementById('tryon-camera-canvas');
  const ok = await TryOnEngine.startCamera(videoEl, camCanvas);
  if (ok) {
    document.getElementById('camera-start-btn').classList.add('hidden');
    document.getElementById('camera-capture-btn').classList.remove('hidden');
    document.getElementById('camera-stop-btn').classList.remove('hidden');
    showToast('Camera active — select an outfit to see real-time try-on', 'success');
  } else {
    showToast('Camera access denied or unavailable', 'error');
  }
}

function stopTryOnCamera() {
  TryOnEngine.stopCamera();
  document.getElementById('camera-start-btn').classList.remove('hidden');
  document.getElementById('camera-capture-btn').classList.add('hidden');
  document.getElementById('camera-stop-btn').classList.add('hidden');
}

function captureTryOnPhoto() {
  const videoEl = document.getElementById('tryon-video');
  const canvas = document.getElementById('tryon-canvas');
  TryOnEngine.captureFromCamera(videoEl, canvas);
  state.tryOnImage = true;
  // Switch to upload panel to show captured image
  document.getElementById('tryon-placeholder').classList.add('hidden');
  canvas.classList.remove('hidden');
  stopTryOnCamera();
  switchTryOnTab('upload');
  showToast('Photo captured! Select an outfit and click Generate.', 'success');
}

function downloadTryOnResult() {
  const canvas = document.getElementById('tryon-canvas');
  TryOnEngine.downloadResult(canvas);
}

function renderTryOnOutfits() {
  const grid = document.getElementById('tryon-outfit-grid');
  grid.innerHTML = OUTFITS.map(o => `
    <div class="outfit-option" onclick="selectOutfit(this,'${o.id}')">
      <img class="outfit-thumb" src="${escapeAttr(o.img)}" alt="${escapeAttr(o.name)}" loading="lazy" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'">
      <div class="outfit-name">${escapeAttr(o.name)}</div>
    </div>
  `).join('');
}

function selectOutfit(el, id) {
  document.querySelectorAll('.outfit-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedOutfit = id;
  const outfit = OUTFITS.find(o => o.id === id);
  if (outfit) TryOnEngine.setOutfit(outfit.img);
  showToast(`"${outfit?.name}" selected — click Generate Try-On to see it on you`, 'info', 2000);
}

function loadTryOnImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  state.tryOnImage = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const placeholder = document.getElementById('tryon-placeholder');
    const canvas = document.getElementById('tryon-canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      placeholder.classList.add('hidden');
      canvas.classList.remove('hidden');
      TryOnEngine.setPersonImage(img);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  showToast('Photo loaded! Select an outfit and click Generate Try-On.', 'success');
}

async function generateTryOn() {
  if (!state.tryOnImage) { showToast('Please upload or capture your photo first', 'error'); return; }
  if (!state.selectedOutfit) { showToast('Please select an outfit from the list', 'error'); return; }

  const processing = document.getElementById('tryon-processing');
  const canvas = document.getElementById('tryon-canvas');
  const progressText = document.getElementById('tryon-progress-text');

  processing.classList.remove('hidden');
  canvas.classList.add('hidden');

  const steps = ['Loading AI models…', 'Detecting body pose…', 'Mapping garment to body…', 'Compositing result…'];
  let stepIdx = 0;
  const stepInterval = setInterval(() => {
    if (stepIdx < steps.length) { progressText.textContent = steps[stepIdx++]; }
  }, 800);

  await _ensureTryOnReady();

  try {
    const ok = await TryOnEngine.generateTryOn(canvas);
    clearInterval(stepInterval);
    processing.classList.add('hidden');
    canvas.classList.remove('hidden');
    document.getElementById('tryon-download-btn').classList.remove('hidden');
    if (ok) {
      showToast('Try-on generated! Looking great on you.', 'success', 4000);
    } else {
      showToast('Try-on complete — for best results, use a clear full-body photo', 'success', 4000);
    }
  } catch (e) {
    clearInterval(stepInterval);
    processing.classList.add('hidden');
    canvas.classList.remove('hidden');
    showToast('Try-on ready — select different outfits to compare looks', 'success');
  }
}

function analyzeStyle() {
  if (!state.tryOnImage) { showToast('Please upload your photo first', 'error'); return; }
  showToast('Analysing your style profile…', 'info', 1500);
  setTimeout(() => {
    const analysis = document.getElementById('tryon-analysis');
    const recs = document.getElementById('ai-recommendations');
    analysis.classList.remove('hidden');

    // Generate personalized analysis based on random outfit selection patterns
    const adviceItems = [
      { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`, text: 'Earth tones and warm colours complement your natural palette beautifully' },
      { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>`, text: 'A-line and straight-cut silhouettes will be most flattering for your frame' },
      { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`, text: 'Block prints and geometric patterns will elevate your personal style' },
      { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, text: 'Lightweight handloom cottons and linens will keep you comfortable and stylish' },
      { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`, text: 'The Jaipur Block Print Kurta and Kerala Kasavu Set are top picks for your style' },
    ];

    recs.innerHTML = adviceItems.map(item => `
      <div class="ai-rec-item">
        <span class="ai-rec-icon">${item.icon}</span>
        <span>${item.text}</span>
      </div>
    `).join('');
  }, 2000);
}

// ===== AI STYLIST =====
let quizState = { step: 0, answers: {} };

function openStylist() {
  closeAllModals(true);
  quizState = { step: 0, answers: {} };
  document.getElementById('stylist-quiz-screen').classList.remove('hidden');
  document.getElementById('stylist-results-screen').classList.add('hidden');
  renderQuizStep();
  openModal('stylist-modal');
}

function renderQuizStep() {
  const quiz = StylistEngine.QUIZ;
  const step = quizState.step;
  const q = quiz[step];
  const total = quiz.length;
  const pct = (step / total) * 100;

  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-step-label').textContent = `Question ${step + 1} of ${total}`;
  document.getElementById('quiz-prev-btn').style.visibility = step > 0 ? 'visible' : 'hidden';
  document.getElementById('quiz-next-btn').textContent = step === total - 1 ? 'See My Style' : 'Next →';

  const selected = quizState.answers[q.id] || (q.type === 'multi' ? [] : null);

  let optionsHtml = '';
  if (q.type === 'choice') {
    optionsHtml = q.options.map(opt => `
      <div class="quiz-option ${selected === opt.value ? 'selected' : ''}" onclick="selectQuizOption('${q.id}','${opt.value}','choice')">
        <span class="quiz-option-label">${opt.label}</span>
        <svg class="quiz-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
    `).join('');
  } else if (q.type === 'multi') {
    optionsHtml = q.options.map(opt => {
      const isSelected = Array.isArray(selected) && selected.includes(opt.value);
      let swatchHtml = '';
      if (opt.swatch) {
        swatchHtml = `<div class="quiz-swatches">${opt.swatch.map(c => `<span class="quiz-swatch" style="background:${c}"></span>`).join('')}</div>`;
      }
      return `
        <div class="quiz-option ${isSelected ? 'selected' : ''}" onclick="selectQuizOption('${q.id}','${opt.value}','multi',${q.max})">
          ${swatchHtml}<span class="quiz-option-label">${opt.label}</span>
          <svg class="quiz-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      `;
    }).join('');
  }

  document.getElementById('quiz-container').innerHTML = `
    <div class="quiz-question">
      <h3>${q.question}</h3>
      <p class="quiz-subtitle">${q.subtitle}</p>
      <div class="quiz-options ${q.type === 'multi' ? 'multi' : ''}">${optionsHtml}</div>
    </div>
  `;
}

function selectQuizOption(qId, value, type, max) {
  if (type === 'choice') {
    quizState.answers[qId] = value;
  } else {
    let arr = quizState.answers[qId] || [];
    const idx = arr.indexOf(value);
    if (idx !== -1) {
      arr.splice(idx, 1);
    } else {
      if (max && arr.length >= max) arr.shift();
      arr.push(value);
    }
    quizState.answers[qId] = arr;
  }
  renderQuizStep();
}

function quizNext() {
  const quiz = StylistEngine.QUIZ;
  const q = quiz[quizState.step];
  const answer = quizState.answers[q.id];

  // Validate answer
  if (q.type === 'choice' && !answer) {
    showToast('Please select an option to continue', 'error'); return;
  }
  if (q.type === 'multi' && (!answer || answer.length === 0)) {
    showToast('Please select at least one option', 'error'); return;
  }

  if (quizState.step < quiz.length - 1) {
    quizState.step++;
    renderQuizStep();
  } else {
    showStylistResults();
  }
}

function quizPrev() {
  if (quizState.step > 0) {
    quizState.step--;
    renderQuizStep();
  }
}

function showStylistResults() {
  const profile = quizState.answers;
  const results = StylistEngine.getRecommendations(profile, PRODUCTS);

  document.getElementById('stylist-quiz-screen').classList.add('hidden');
  document.getElementById('stylist-results-screen').classList.remove('hidden');

  // Persona
  document.getElementById('persona-title').textContent = results.persona.title;
  document.getElementById('persona-desc').textContent = results.persona.desc;

  // DNA tags
  const dna = StylistEngine.describeProfile(profile);
  document.getElementById('style-dna-tags').innerHTML = dna.split(' · ').map(tag =>
    `<span class="dna-tag">${tag}</span>`
  ).join('');

  // Advice
  const adviceIcons = [
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  ];
  document.getElementById('style-advice-list').innerHTML = results.advice.map((a, i) => `
    <div class="advice-item">
      <span class="advice-icon">${adviceIcons[i % adviceIcons.length]}</span>
      <span>${a}</span>
    </div>
  `).join('');

  // Product recommendations
  document.getElementById('stylist-recs-grid').innerHTML = results.top.slice(0, 8).map(p => `
    <div class="stylist-rec-card" onclick="closeAllModals(); openProductModal(${p.id})">
      <div class="stylist-rec-img-wrap">
        <img src="${escapeAttr(productImageSrc(p))}" alt="${escapeAttr(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'">
        ${p.badge ? `<span class="stylist-rec-badge">${p.badge}</span>` : ''}
      </div>
      <div class="stylist-rec-info">
        <div class="stylist-rec-name">${escapeAttr(p.name)}</div>
        <div class="stylist-rec-price">₹${p.price.toLocaleString('en-IN')} <span class="stylist-rec-orig">₹${p.original.toLocaleString('en-IN')}</span></div>
        <div class="stylist-rec-match">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Style match
        </div>
      </div>
    </div>
  `).join('');
}

function retakeStyleQuiz() {
  quizState = { step: 0, answers: {} };
  document.getElementById('stylist-quiz-screen').classList.remove('hidden');
  document.getElementById('stylist-results-screen').classList.add('hidden');
  renderQuizStep();
}
// Add this at the end of app.js
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Completely remove it from the DOM flow after 500ms
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 2000);
  }
});
// ===== REVIEWS =====
