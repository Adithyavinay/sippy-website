/* js/common.js — Navbar, Footer, Chatbot, Scroll Reveal, Toast */

// ===== GLOBAL BASE PATH (used by navbar, footer, chatbot) =====
const BASE_PATH = document.querySelector('meta[name="base"]')?.content || '';

// ===== CART UTILITIES =====
function getCart() {
  try { return JSON.parse(localStorage.getItem('sippy_cart') || '{"qty":0}'); }
  catch(e) { return {qty:0}; }
}
function saveCart(cart) {
  localStorage.setItem('sippy_cart', JSON.stringify(cart));
  updateNavCartBadge();
}
function addToCart(qty) {
  qty = qty || 1;
  const cart = getCart();
  cart.qty = (cart.qty || 0) + qty;
  cart.total = 5999 * cart.qty;
  saveCart(cart);
  showToast('Added to cart! 🛒 Go to cart to checkout.', 'success');
  updateNavCartBadge();
}
function updateNavCartBadge() {
  const cart = getCart();
  const badge = document.getElementById('navCartBadge');
  if (badge) badge.textContent = cart.qty > 0 ? cart.qty : '';
}

// ===== INJECT NAVBAR =====
function injectNav(activePage) {
  const base = BASE_PATH;
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = `
    <div class="nav-wrap">
      <a href="${base}index.html" class="nav-logo">
        <img src="${base}images/sippy-logo.png" alt="Sippy" class="nav-logo-img" />
        Sippy<span>.</span>
      </a>
      <ul class="nav-links">
        <li><a href="${base}index.html" class="${activePage==='home'?'active':''}">Home</a></li>
        <li><a href="${base}pages/product.html" class="${activePage==='product'?'active':''}">Product</a></li>
        <li><a href="${base}pages/gallery.html" class="${activePage==='gallery'?'active':''}">Gallery</a></li>
        <li><a href="${base}pages/contact.html" class="${activePage==='contact'?'active':''}">Contact</a></li>
      </ul>
      <a href="${base}pages/cart.html" class="btn btn-primary btn-sm nav-cta" style="position:relative;">
        🛒 Cart <span id="navCartBadge" style="background:var(--gold);color:#fff;font-size:11px;font-weight:800;border-radius:50%;width:18px;height:18px;display:inline-flex;align-items:center;justify-content:center;position:absolute;top:-8px;right:-8px;"></span>
      </a>
      <button class="nav-burger" id="navBurger">☰</button>
    </div>
    <div class="nav-mobile" id="navMobile">
      <a href="${base}index.html">Home</a>
      <a href="${base}pages/product.html">Product</a>
      <a href="${base}pages/gallery.html">Gallery</a>
      <a href="${base}pages/contact.html">Contact</a>
      <a href="${base}pages/cart.html" style="color:var(--gold);font-weight:700;">🛒 View Cart</a>
    </div>
  `;
  document.body.prepend(nav);
  document.getElementById('navBurger').addEventListener('click', () => {
    document.getElementById('navMobile').classList.toggle('open');
  });
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ===== INJECT FOOTER =====
function injectFooter() {
  const base = BASE_PATH;
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <img src="${base}images/sippy-logo.png" alt="Sippy" class="footer-logo-img" />
            Sippy<span>.</span>
          </div>
          <p class="footer-tagline">The smart rechargeable portable kettle. Hot water wherever you are.</p>
          <div class="footer-social">
            <a href="https://wa.me/918985656181" target="_blank" title="WhatsApp">💬</a>
            <a href="mailto:smartkettlestore@gmail.com" title="Email">📧</a>
            <a href="tel:+918985656181" title="Call">📞</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><a href="${base}index.html">Home</a></li>
            <li><a href="${base}pages/product.html">Product</a></li>
            <li><a href="${base}pages/gallery.html">Gallery</a></li>
            <li><a href="${base}pages/checkout.html">Order Now</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="${base}pages/contact.html">Contact Us</a></li>
            <li><a href="${base}pages/faq.html">FAQ</a></li>
            <li><a href="https://wa.me/918985656181" target="_blank">WhatsApp</a></li>
            <li><a href="mailto:smartkettlestore@gmail.com">Email Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:smartkettlestore@gmail.com">smartkettlestore@gmail.com</a></li>
            <li><a href="tel:+918985656181">+91 89856 56181</a></li>
            <li><a href="https://wa.me/918985656181" target="_blank">WhatsApp Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2025 Sippy. All rights reserved. Made with ❤️ in India.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Shipping Policy</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

// ===== INJECT CHATBOT =====
// ===== CHATBOT =====
const CHAT_FLOWS = {
  main: {
    msg: 'Hi! 👋 Welcome to Sippy. What would you like to know?',
    options: [
      { label: '🫖 What is Sippy?', next: 'about' },
      { label: '💰 Price & Offers', next: 'price' },
      { label: '🛒 How to Order', next: 'order' },
      { label: '🚚 Shipping & Delivery', next: 'shipping' },
      { label: '🔬 Materials & Build', next: 'material' },
      { label: '🌡️ Temperature & Features', next: 'features' },
      { label: '↩️ Returns & Warranty', next: 'returns' },
      { label: '📞 Contact Support', next: 'contact' },
    ]
  },
  about: {
    msg: 'Sippy is India\'s smartest rechargeable portable kettle 🫖\n\nIt heats 300mL of water wirelessly — no power socket needed! Made with 316 medical-grade stainless steel, LED temperature control from 45°C to 100°C, and a cool-touch ABS outer shell.\n\nPerfect for travel, office, home & outdoors.',
    options: [
      { label: '💰 What\'s the price?', next: 'price' },
      { label: '🔬 What\'s it made of?', next: 'material' },
      { label: '🌡️ Temperature features', next: 'features' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  price: {
    msg: 'Sippy is priced at just ₹5,999 🎉\n\n✅ All taxes included\n✅ FREE shipping all across India\n✅ No hidden charges\n✅ 30-day satisfaction guarantee\n\nOne flat price — what you see is what you pay.',
    options: [
      { label: '🛒 How do I order?', next: 'order' },
      { label: '💳 Payment options?', next: 'payment' },
      { label: '↩️ Returns policy?', next: 'returns' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  order: {
    msg: 'Ordering Sippy is super easy! 🛒\n\n1️⃣ Click "Add to Cart" on any page\n2️⃣ Go to your Cart and review your order\n3️⃣ Click "Proceed to Checkout"\n4️⃣ Fill in your delivery details\n5️⃣ Pay securely via Razorpay\n\nTakes under 2 minutes — and it\'s on its way!',
    options: [
      { label: '💳 Payment options?', next: 'payment' },
      { label: '🚚 Shipping info?', next: 'shipping' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  payment: {
    msg: 'We accept all major payment methods via Razorpay 💳\n\n• UPI (PhonePe, GPay, Paytm)\n• Credit & Debit Cards\n• Net Banking\n• Wallets\n• EMI options\n\nAll payments are 100% secure and encrypted. PCI DSS compliant.',
    options: [
      { label: '🚚 Shipping details?', next: 'shipping' },
      { label: '↩️ Return policy?', next: 'returns' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  shipping: {
    msg: 'FREE shipping pan-India! 🚚\n\n📦 Dispatched within 1–2 business days\n🏠 Delivered in 4–7 working days\n📱 SMS tracking after dispatch\n🇮🇳 Available all across India\n\nNo extra charges. Free delivery is included in ₹5,999.',
    options: [
      { label: '📍 Can you track order?', next: 'tracking' },
      { label: '↩️ Returns & warranty?', next: 'returns' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  tracking: {
    msg: 'Once your order is dispatched (1–2 business days), you\'ll receive an SMS with your tracking link 📦\n\nYou can also reach out to us anytime for a quick update on your order status.',
    options: [
      { label: '📞 Get order update', next: 'contact' },
      { label: '↩️ Returns policy?', next: 'returns' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  material: {
    msg: 'Sippy is built with 3 premium layers 🛡️\n\n🔩 Inner: 316 Medical-Grade Stainless Steel\n   — same grade used in surgical instruments. Zero rust, zero leaching.\n\n🌡️ Middle: Thermal insulation layer\n   — keeps water hot longer, outer cool to touch.\n\n🏠 Outer: Food-safe ABS plastic shell\n   — cool-touch even at 100°C inside.\n\nYour water NEVER touches plastic.',
    options: [
      { label: '🌡️ Temperature range?', next: 'features' },
      { label: '🧼 How to clean it?', next: 'cleaning' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  features: {
    msg: 'Sippy heats from 45°C to 100°C (full boil) 🌡️\n\nLED display shows live temperature in real time. Perfect for:\n• Green tea: 70°C\n• Coffee / Espresso: 95°C\n• Baby formula: 60°C\n• Instant noodles: 100°C\n\n⚡ 100% wireless & rechargeable\n📱 Charges via USB — like your phone\n🏷️ 300mL — perfect cup every time',
    options: [
      { label: '🔬 What\'s it made of?', next: 'material' },
      { label: '💰 How much does it cost?', next: 'price' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  cleaning: {
    msg: 'Cleaning Sippy is effortless 🧼\n\n✅ Rinse with warm water after each use\n✅ Wide-mouth design for easy access\n✅ Polished 316 steel resists stains & odours\n✅ For descaling: water + white vinegar monthly\n\n⚠️ Do NOT submerge the base electronics unit.',
    options: [
      { label: '↩️ Return policy?', next: 'returns' },
      { label: '📞 Need more help?', next: 'contact' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  returns: {
    msg: 'We stand behind Sippy 100% 💯\n\n🔄 30-day satisfaction guarantee\n📦 Not happy? Contact us within 30 days\n💰 Full refund, no questions asked\n🔧 Manufacturing defects covered\n\nWe want you to love your Sippy — if not, we\'ll make it right.',
    options: [
      { label: '🛒 Ready to order!', next: 'order' },
      { label: '📞 Contact for return', next: 'contact' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  },
  contact: {
    msg: 'Our support team is always happy to help! 😊\n\n📧 smartkettlestore@gmail.com\n📞 +91 89856 56181\n💬 WhatsApp: wa.me/918985656181\n\n🕐 Available Mon–Sat, 9am–7pm IST\n⚡ We reply within 4–6 hours',
    options: [
      { label: '🛒 Place an order', next: 'order' },
      { label: '🏠 Back to main menu', next: 'main' },
    ]
  }
};

function injectChatbot() {
  const base = BASE_PATH;
  const fab = document.createElement('button');
  fab.className = 'chat-fab'; fab.id = 'chatFab'; fab.innerHTML = '💬'; fab.title = 'Chat with us';
  document.body.appendChild(fab);

  const win = document.createElement('div');
  win.className = 'chat-window'; win.id = 'chatWin';
  win.innerHTML = `
    <div class="chat-head">
      <div class="chat-av"><img src="${base}images/sippy-logo.png" alt="Sippy" style="width:32px;height:32px;object-fit:contain;border-radius:50%;" /></div>
      <div><div class="chat-name">Sippy Assistant</div><div class="chat-online">● Online now</div></div>
      <button class="chat-close" id="chatClose">✕</button>
    </div>
    <div class="chat-msgs" id="chatMsgs"></div>
    <div class="chat-input-row">
      <input type="text" id="chatIn" placeholder="Type a message…" />
      <button class="chat-send" id="chatSend">➤</button>
    </div>
  `;
  document.body.appendChild(win);

  // Toggle: always reset on open
  fab.addEventListener('click', () => {
    const isOpen = win.classList.contains('open');
    if (!isOpen) {
      resetChat();
      win.classList.add('open');
    } else {
      win.classList.remove('open');
    }
  });
  document.getElementById('chatClose').addEventListener('click', () => win.classList.remove('open'));
  document.getElementById('chatSend').addEventListener('click', sendChat);
  document.getElementById('chatIn').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
}

function resetChat() {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  msgs.innerHTML = '';
  setTimeout(() => showChatFlow('main'), 200);
}

function showChatFlow(key) {
  const flow = CHAT_FLOWS[key];
  if (!flow) return;
  addBotMsg(flow.msg);
  setTimeout(() => addMenuButtons(flow.options), 400);
}

function addBotMsg(text) {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  const d = document.createElement('div');
  d.className = 'bot-msg';
  d.style.whiteSpace = 'pre-line';
  d.textContent = text;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMsg(text) {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  const d = document.createElement('div');
  d.className = 'user-msg';
  d.textContent = text;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function addMenuButtons(options) {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  const wrap = document.createElement('div');
  wrap.className = 'qr-wrap';
  wrap.id = 'currentMenu';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'qr-btn';
    btn.textContent = opt.label;
    btn.addEventListener('click', () => {
      wrap.remove();
      addUserMsg(opt.label);
      setTimeout(() => showChatFlow(opt.next), 350);
    });
    wrap.appendChild(btn);
  });
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function addMsg(text, who) {
  if (who === 'user') addUserMsg(text);
  else addBotMsg(text);
}

function sendChat() {
  const inp = document.getElementById('chatIn');
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  // Remove current menu
  const menu = document.getElementById('currentMenu');
  if (menu) menu.remove();
  addUserMsg(txt);
  // Simple keyword match
  const low = txt.toLowerCase();
  let matched = null;
  if (low.includes('price') || low.includes('cost') || low.includes('much') || low.includes('₹')) matched = 'price';
  else if (low.includes('order') || low.includes('buy') || low.includes('cart') || low.includes('purchase')) matched = 'order';
  else if (low.includes('ship') || low.includes('deliver') || low.includes('dispatch')) matched = 'shipping';
  else if (low.includes('material') || low.includes('steel') || low.includes('safe') || low.includes('build')) matched = 'material';
  else if (low.includes('temp') || low.includes('heat') || low.includes('wireless') || low.includes('feature') || low.includes('battery')) matched = 'features';
  else if (low.includes('return') || low.includes('refund') || low.includes('warrant') || low.includes('guarantee')) matched = 'returns';
  else if (low.includes('contact') || low.includes('support') || low.includes('help') || low.includes('phone') || low.includes('email') || low.includes('whatsapp')) matched = 'contact';
  else if (low.includes('clean') || low.includes('wash')) matched = 'cleaning';
  else if (low.includes('track') || low.includes('status') || low.includes('where')) matched = 'tracking';
  else if (low.includes('payment') || low.includes('upi') || low.includes('card') || low.includes('razorpay')) matched = 'payment';
  else if (low.includes('what is') || low.includes('about') || low.includes('sippy')) matched = 'about';
  else matched = 'main';
  setTimeout(() => showChatFlow(matched), 350);
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) : 0;
        setTimeout(() => e.target.classList.add('in'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._to);
  t._to = setTimeout(() => { t.classList.remove('show'); }, 3500);
}

// ===== MARQUEE INJECT =====
function injectMarquee(items) {
  const bar = document.createElement('div');
  bar.className = 'marquee-bar';
  const dbl = [...items, ...items].map((t, i) => `<span>${t}</span>${i % items.length !== items.length - 1 ? '<span class="dot">✦</span>' : ''}`).join('');
  bar.innerHTML = `<div class="marquee-track">${dbl}${dbl}</div>`;
  return bar;
}

// ===== AUTO-INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  injectChatbot();
  injectFooter();
  updateNavCartBadge();
});
