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
const PRODUCTS = [
  { id:1, name:"Jaipur Block Print Kurta", category:"kurtas", craft:"block-print", region:"Rajasthan", price:899, original:2499, emoji:"👘", colors:["#c0392b","#2980b9","#27ae60"], sizes:["S","M","L","XL"], rating:4.8, reviews:128, badge:"bestseller", tags:["block-print","rajasthan"] },
  { id:2, name:"Banarasi Silk Dupatta", category:"dupattas", craft:"banarasi", region:"Varanasi", price:1299, original:4500, emoji:"🧣", colors:["#8e44ad","#c0392b","#f39c12"], sizes:["Free"], rating:4.7, reviews:89, badge:"new", tags:["banarasi","silk"] },
  { id:3, name:"Odisha Ikat Saree", category:"sarees", craft:"ikat", region:"Odisha", price:2199, original:6999, emoji:"🥻", colors:["#2980b9","#8e44ad","#1abc9c"], sizes:["Free"], rating:4.9, reviews:203, badge:"bestseller", tags:["ikat","odisha"] },
  { id:4, name:"Bengal Kantha Stitch Kurta", category:"kurtas", craft:"kantha", region:"West Bengal", price:1099, original:3200, emoji:"👘", colors:["#f39c12","#27ae60","#c0392b"], sizes:["XS","S","M","L","XL","XXL"], rating:4.6, reviews:67, tags:["kantha","bengal"] },
  { id:5, name:"Punjab Phulkari Dupatta", category:"dupattas", craft:"phulkari", region:"Punjab", price:749, original:2100, emoji:"🧣", colors:["#e67e22","#c0392b","#8e44ad"], sizes:["Free"], rating:4.5, reviews:154, badge:"new", tags:["phulkari","punjab"] },
  { id:6, name:"Chanderi Cotton Lehengha", category:"lehengas", craft:"chandheri", region:"MP", price:3499, original:11000, emoji:"👗", colors:["#c0392b","#8e44ad","#2c3e50"], sizes:["S","M","L","XL"], rating:4.8, reviews:91, badge:"bestseller", tags:["chandheri","mp"] },
  { id:7, name:"Kalamkari Print Kurta", category:"kurtas", craft:"kalamkari", region:"Andhra Pradesh", price:799, original:2200, emoji:"👘", colors:["#c45c2a","#2c3e50","#27ae60"], sizes:["S","M","L","XL","XXL"], rating:4.4, reviews:43, tags:["kalamkari","andhra"] },
  { id:8, name:"Ajrakh Block Print Shawl", category:"shawls", craft:"ajrakh", region:"Gujarat", price:1599, original:4800, emoji:"🧤", colors:["#2c3e50","#c0392b","#1abc9c"], sizes:["Free"], rating:4.7, reviews:112, badge:"new", tags:["ajrakh","gujarat"] },
  { id:9, name:"Lucknowi Chikankari Kurta", category:"kurtas", craft:"chikankari", region:"Lucknow", price:1299, original:3800, emoji:"👘", colors:["#f5f5f5","#c0392b","#2980b9"], sizes:["XS","S","M","L","XL"], rating:4.9, reviews:267, badge:"bestseller", tags:["chikankari","up"] },
  { id:10, name:"Pochampally Ikat Saree", category:"sarees", craft:"ikat", region:"Telangana", price:1899, original:5500, emoji:"🥻", colors:["#c0392b","#f39c12","#2c3e50"], sizes:["Free"], rating:4.6, reviews:78, tags:["ikat","telangana"] },
  { id:11, name:"Kerala Kasavu Set", category:"ethnic-sets", craft:"kasavu", region:"Kerala", price:2799, original:8000, emoji:"👗", colors:["#f5f5f5","#d4a017"], sizes:["S","M","L","XL"], rating:4.8, reviews:143, badge:"new", tags:["kasavu","kerala"] },
  { id:12, name:"Madhubani Art Kurta", category:"kurtas", craft:"madhubani", region:"Bihar", price:699, original:1900, emoji:"👘", colors:["#c0392b","#27ae60","#f39c12"], sizes:["S","M","L","XL","XXL"], rating:4.3, reviews:56, tags:["madhubani","bihar"] },
  { id:13, name:"Bandhani Tie-Dye Dupatta", category:"dupattas", craft:"bandhani", region:"Gujarat", price:599, original:1800, emoji:"🧣", colors:["#c0392b","#8e44ad","#e67e22"], sizes:["Free"], rating:4.5, reviews:88, tags:["bandhani","gujarat"] },
  { id:14, name:"Patola Silk Saree", category:"sarees", craft:"patola", region:"Gujarat", price:4999, original:18000, emoji:"🥻", colors:["#8e44ad","#c0392b","#2980b9"], sizes:["Free"], rating:4.9, reviews:34, badge:"bestseller", tags:["patola","silk"] },
  { id:15, name:"Rajasthani Bandhej Lehengha", category:"lehengas", craft:"bandhej", region:"Rajasthan", price:4299, original:13500, emoji:"👗", colors:["#c0392b","#8e44ad","#f39c12"], sizes:["S","M","L","XL"], rating:4.7, reviews:61, tags:["bandhej","rajasthan"] },
  { id:16, name:"Jodhpuri Bandhgala Suit", category:"menswear", craft:"block-print", region:"Rajasthan", price:2499, original:7500, emoji:"🧥", colors:["#2c3e50","#333","#c45c2a"], sizes:["S","M","L","XL","XXL"], rating:4.8, reviews:93, badge:"new", tags:["menswear","rajasthan"] },
  { id:17, name:"Pahadi Woolen Shawl", category:"shawls", craft:"pahadi", region:"Himachal Pradesh", price:1199, original:3600, emoji:"🧤", colors:["#8e44ad","#c0392b","#2980b9"], sizes:["Free"], rating:4.6, reviews:109, tags:["pahadi","himachal"] },
  { id:18, name:"Warli Print Tote Bag", category:"accessories", craft:"warli", region:"Maharashtra", price:399, original:1100, emoji:"👜", colors:["#f5f5f5","#c45c2a","#27ae60"], sizes:["Free"], rating:4.4, reviews:176, badge:"new", tags:["warli","maharashtra"] },
  { id:19, name:"Lambani Mirror Work Blouse", category:"accessories", craft:"lambani", region:"Karnataka", price:849, original:2400, emoji:"✨", colors:["#c0392b","#8e44ad","#f39c12"], sizes:["XS","S","M","L","XL"], rating:4.7, reviews:52, tags:["lambani","karnataka"] },
  { id:20, name:"Manipuri Phanek Sarong", category:"sarees", craft:"manipuri", region:"Manipur", price:1499, original:4200, emoji:"🥻", colors:["#c0392b","#2980b9","#27ae60"], sizes:["Free"], rating:4.5, reviews:29, tags:["manipuri","northeast"] },
  { id:21, name:"Dabu Print Men's Kurta", category:"menswear", craft:"dabu", region:"Rajasthan", price:899, original:2600, emoji:"👘", colors:["#2c3e50","#c45c2a","#27ae60"], sizes:["S","M","L","XL","XXL"], rating:4.6, reviews:71, tags:["dabu","menswear"] },
  { id:22, name:"Kashmiri Aari Embroidery Shawl", category:"shawls", craft:"aari", region:"Kashmir", price:2999, original:9500, emoji:"🧤", colors:["#c0392b","#8e44ad","#2c3e50"], sizes:["Free"], rating:4.9, reviews:187, badge:"bestseller", tags:["aari","kashmir"] },
  { id:23, name:"Jamdani Cotton Saree", category:"sarees", craft:"jamdani", region:"West Bengal", price:2599, original:8000, emoji:"🥻", colors:["#f5f5f5","#2980b9","#c0392b"], sizes:["Free"], rating:4.8, reviews:63, tags:["jamdani","bengal"] },
  { id:24, name:"Tribal Dhokra Necklace", category:"accessories", craft:"dhokra", region:"Chhattisgarh", price:549, original:1500, emoji:"📿", colors:["#d4a017","#c45c2a"], sizes:["Free"], rating:4.5, reviews:141, badge:"new", tags:["dhokra","tribal"] }
];

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
  { emoji:"👘", name:"Block Print Kurta", id:"kurta1" },
  { emoji:"🥻", name:"Ikat Saree", id:"saree1" },
  { emoji:"👗", name:"Chanderi Lehenga", id:"lehenga1" },
  { emoji:"🧥", name:"Bandhgala Suit", id:"suit1" },
  { emoji:"👔", name:"Kurta Set", id:"kurtaset1" },
  { emoji:"✨", name:"Mirror Work Blouse", id:"blouse1" }
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

  // Preloader
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2200);

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
      <div class="cart-item-img">${item.emoji}</div>
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
      <div class="cart-item-img">${item.emoji}</div>
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
  sugg.innerHTML = results.map(r => `<div class="search-suggestion" onclick="openProductModal(${r.id}); clearSearch()">${r.emoji} ${r.name} <span style="color:var(--text3);font-size:0.8rem">— ${r.region}</span></div>`).join('');
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
        <div class="product-img-inner" style="background:linear-gradient(135deg,${p.colors[0]}22,${p.colors[1]||p.colors[0]}11)">${p.emoji}</div>
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
        <div class="pm-main-img" style="background:linear-gradient(135deg,${p.colors[0]}22,${p.colors[1]||p.colors[0]}11)">${p.emoji}</div>
        <div class="pm-thumbs">
          ${p.colors.map((c,i) => `<div class="pm-thumb ${i===0?'active':''}" style="background:${c}22;border-color:${c}" onclick="selectThumb(this)">${p.emoji}</div>`).join('')}
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
      <span>${item.emoji} ${item.name} × ${item.qty}</span>
      <span>₹${(item.price * item.qty).toLocaleString()}</span>
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
function toggleTryOn() {
  openModal('tryon-modal');
}

function renderTryOnOutfits() {
  const grid = document.getElementById('tryon-outfit-grid');
  grid.innerHTML = OUTFITS.map(o => `
    <div class="outfit-option" onclick="selectOutfit(this,'${o.id}')">
      <div class="outfit-emoji">${o.emoji}</div>
      <div class="outfit-name">${o.name}</div>
    </div>
  `).join('');
}

function selectOutfit(el, id) {
  document.querySelectorAll('.outfit-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedOutfit = id;
}

function loadTryOnImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  state.tryOnImage = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const placeholder = document.getElementById('tryon-placeholder');
    const canvas = document.getElementById('tryon-canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      placeholder.classList.add('hidden');
      canvas.classList.remove('hidden');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  showToast('Photo loaded! Now select an outfit and click Generate.', 'success');
}

function generateTryOn() {
  if (!state.tryOnImage) { showToast('Please upload your photo first', 'error'); return; }
  if (!state.selectedOutfit) { showToast('Please select an outfit', 'error'); return; }
  showToast('✨ AI is generating your virtual try-on...', 'info', 2500);
  const canvas = document.getElementById('tryon-canvas');
  const ctx = canvas.getContext('2d');
  // Simulate overlay effect
  setTimeout(() => {
    ctx.save();
    const outfit = OUTFITS.find(o => o.id === state.selectedOutfit);
    ctx.fillStyle = 'rgba(212, 160, 23, 0.15)';
    ctx.fillRect(0, canvas.height * 0.2, canvas.width, canvas.height * 0.7);
    ctx.font = `${canvas.width * 0.15}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(outfit?.emoji || '👗', canvas.width/2, canvas.height * 0.55);
    ctx.restore();
    showToast('Try-on generated! This is a demo — full AR try-on integrates with AR SDK.', 'success', 4000);
  }, 2000);
}

function analyzeStyle() {
  if (!state.tryOnImage) { showToast('Please upload your photo first', 'error'); return; }
  showToast('Analyzing your style...', 'info', 1500);
  setTimeout(() => {
    const analysis = document.getElementById('tryon-analysis');
    const recs = document.getElementById('ai-recommendations');
    analysis.classList.remove('hidden');
    recs.innerHTML = [
      '🎨 Earth tones and warm colors suit your complexion beautifully',
      '📐 A-line and straight-cut silhouettes will be most flattering',
      '✨ Block prints and geometric patterns will complement your style',
      '🌿 Lightweight fabrics like cotton and linen are recommended',
      '💡 Try the Jaipur Block Print Kurta or Kerala Kasavu Set'
    ].map(r => `<div class="ai-rec-item">${r}</div>`).join('');
  }, 2000);
}

// ===== REVIEWS =====
function openReviewModal(productId) {
  state.reviewingProduct = productId;
  const p = PRODUCTS.find(pr => pr.id === productId);
  document.getElementById('review-product-info').innerHTML = `<p style="color:var(--text2);font-size:0.9rem;padding:10px;background:var(--surface2);border-radius:8px">${p.emoji} <strong>${p.name}</strong></p>`;
  state.selectedRating = 0;
  state.selectedTags = [];
  document.querySelectorAll('#rating-stars span').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.review-tag').forEach(t => t.classList.remove('active'));
  closeAllModals(true);
  openModal('review-modal');
}

function setRating(n) {
  state.selectedRating = n;
  document.querySelectorAll('#rating-stars span').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}

function toggleTag(el) {
  el.classList.toggle('active');
  const tag = el.textContent;
  const idx = state.selectedTags.indexOf(tag);
  if (idx === -1) state.selectedTags.push(tag);
  else state.selectedTags.splice(idx, 1);
}

function submitReview() {
  if (!state.user) { openModal('auth-modal'); return; }
  if (state.selectedRating === 0) { showToast('Please select a rating', 'error'); return; }
  const title = document.getElementById('review-title').value;
  const body = document.getElementById('review-body').value;
  if (!title || !body) { showToast('Please fill in the review title and body', 'error'); return; }
  const productId = state.reviewingProduct;
  if (!REVIEWS[productId]) REVIEWS[productId] = [];
  REVIEWS[productId].unshift({
    name: state.user.name,
    city: "India",
    date: "Just now",
    rating: state.selectedRating,
    title, body,
    tags: state.selectedTags
  });
  closeAllModals();
  showToast('Review submitted! Thank you 🙏', 'success');
}

// ===== TESTIMONIALS =====
function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  const all = [...TESTIMONIALS, ...TESTIMONIALS]; // Duplicate for infinite scroll
  track.innerHTML = all.map(t => `
    <div class="testimonial-card">
      <div class="t-stars">${'★'.repeat(t.rating)}</div>
      <div class="t-text">"${t.text}"</div>
      <div class="t-author">
        <div class="t-avatar">${t.name.charAt(0)}</div>
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-location">${t.city}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== LOOKBOOK =====
function renderLookbook() {
  const grid = document.getElementById('lookbook-grid');
  const looks = [
    { bg: 'linear-gradient(135deg,#c45c2a33,#d4a01744)', emoji: '👘' },
    { bg: 'linear-gradient(135deg,#2980b933,#8e44ad22)', emoji: '🥻' },
    { bg: 'linear-gradient(135deg,#27ae6033,#d4a01722)', emoji: '👗' },
    { bg: 'linear-gradient(135deg,#f39c1233,#c0392b22)', emoji: '🧣' },
    { bg: 'linear-gradient(135deg,#8e44ad33,#2980b922)', emoji: '🧥' },
    { bg: 'linear-gradient(135deg,#1abc9c33,#d4a01722)', emoji: '👜' },
    { bg: 'linear-gradient(135deg,#e67e2233,#c45c2a44)', emoji: '✨' },
    { bg: 'linear-gradient(135deg,#2c3e5033,#d4a01733)', emoji: '📿' }
  ];
  grid.innerHTML = looks.map(l => `
    <div class="lookbook-item">
      <div class="lookbook-bg" style="background:${l.bg}">${l.emoji}</div>
      <div class="lookbook-overlay">👁</div>
    </div>
  `).join('');
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const input = document.querySelector('.newsletter-input');
  if (!input.value || !input.value.includes('@')) { showToast('Please enter a valid email', 'error'); return; }
  showToast('Subscribed! Check your email for 15% off 🎁', 'success');
  input.value = '';
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const ham = document.getElementById('hamburger');
  menu.classList.toggle('hidden');
  ham.classList.toggle('open');
}

// ===== UTILS =====
function smoothScroll(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${id}`)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close sidebars when clicking overlay
document.getElementById('modal-overlay').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('wishlist-sidebar').classList.remove('open');
});

// Close search suggestions on click outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-bar')) {
    document.getElementById('search-suggestions')?.classList.add('hidden');
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('wishlist-sidebar').classList.remove('open');
    document.body.style.overflow = '';
  }
});
