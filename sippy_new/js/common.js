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
  // Inject promo banner FIRST, then nav below it
  const promoBanner = document.createElement('div');
  promoBanner.id = 'promoBanner';
  promoBanner.style.cssText = 'background:linear-gradient(90deg,#1C1410,#3a2510,#1C1410);color:#fff;text-align:center;padding:10px 16px;font-size:13px;font-weight:600;letter-spacing:0.5px;z-index:9999;width:100%;box-sizing:border-box;';
  promoBanner.innerHTML = '🎉 LIMITED OFFER &nbsp;|&nbsp; Use code <span style="background:#C9923A;color:#fff;padding:2px 10px;border-radius:4px;font-weight:800;letter-spacing:1px;margin:0 4px;">SIPPY25</span> for <strong style="color:#C9923A;">25% OFF</strong> &nbsp;|&nbsp; Original Price <s style="opacity:0.7;">₹7,999</s> → Now only <strong style="color:#C9923A;">₹5,999</strong> 🔥';
  document.body.prepend(nav);
  document.body.prepend(promoBanner);
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

// ===== SMART CHATBOT =====
let chatHistory = [];

const SIPPY_AI = {
  greet: [
    "Hi! 👋 Welcome to Sippy! I'm your assistant. Ask me anything about our smart kettle!",
    "Hello! 😊 Great to have you here! How can I help you with Sippy today?",
    "Hey there! 👋 I'm Sippy's assistant. What would you like to know?"
  ],
  price: [
    "Sippy is originally ₹7,999 but use promo code SIPPY25 for 25% OFF — just ₹5,999! 🎉\n\n✅ All taxes included\n✅ FREE shipping all India\n✅ No hidden charges\n\nEnter SIPPY25 at checkout!",
    "Use promo code SIPPY25 at checkout for 25% off! 🏷️\n\nOriginal: ₹7,999 → You pay: ₹5,999 (save ₹2,000!)\n\nFREE shipping included!"
  ],
  promo: [
    "Your promo code is SIPPY25 🎉\n\nEnter it at checkout to get 25% OFF!\n\n₹7,999 → ₹5,999 (save ₹2,000!)\n\nLimited time offer — don't miss it! 🔥"
  ],
  product: [
    "Sippy is India's smartest rechargeable portable kettle! 🫖\n\n⚡ 100% wireless — no socket needed\n🌡️ 45°C to 100°C temperature control\n📱 LED live temperature display\n🛡️ 316 Medical-Grade Stainless Steel\n💧 300mL — perfect cup every time\n\nPerfect for travel, office, home & outdoors!"
  ],
  material: [
    "Sippy is built with 3 premium layers 🛡️\n\n🔩 Inner: 316 Medical-Grade Stainless Steel\n🌡️ Middle: Thermal insulation layer\n🏠 Outer: Cool-touch ABS shell\n\nYour water NEVER touches plastic. 100% food safe!"
  ],
  temperature: [
    "Sippy heats from 45°C to 100°C 🌡️\n\nPerfect for:\n☕ Coffee/Espresso: 95°C\n🍵 Green tea: 70°C\n🍼 Baby formula: 60°C\n🍜 Instant noodles: 100°C\n\nLED display shows live temperature in real time!"
  ],
  shipping: [
    "Shipping is completely FREE all across India! 🚚\n\n📦 Dispatched: 1-2 business days\n🏠 Delivered: 4-7 working days\n📱 SMS tracking after dispatch\n\nNo extra charges — included in ₹5,999!"
  ],
  order: [
    "Ordering Sippy is super easy! 🛒\n\n1️⃣ Click Add to Cart\n2️⃣ Go to Cart & review\n3️⃣ Click Proceed to Checkout\n4️⃣ Fill delivery details\n5️⃣ Enter code SIPPY25 for 25% off!\n6️⃣ Pay securely via Razorpay\n\nDone in under 2 minutes! ⚡"
  ],
  payment: [
    "We accept all major payment methods via Razorpay 💳\n\n• UPI (PhonePe, GPay, Paytm)\n• Credit & Debit Cards\n• Net Banking\n• Wallets\n• EMI options\n\n100% secure & encrypted! 🔒"
  ],
  returns: [
    "We stand behind Sippy 100%! 💯\n\n🔄 30-day satisfaction guarantee\n💰 Full refund, no questions asked\n📦 Contact us within 30 days\n\nWe want you to love your Sippy — if not, we'll make it right!"
  ],
  contact: [
    "Our support team is always happy to help! 😊\n\n📧 smartkettlestore@gmail.com\n📞 +91 89856 56181\n💬 WhatsApp: wa.me/918985656181\n\n🕐 Mon-Sat, 9am-7pm IST\n⚡ Reply within 4-6 hours"
  ],
  cleaning: [
    "Cleaning Sippy is super easy! 🧼\n\n✅ Rinse with warm water after use\n✅ Wide-mouth design for easy access\n✅ 316 steel resists stains & odours\n✅ Monthly: water + white vinegar for descaling\n\n⚠️ Don't submerge the base electronics!"
  ],
  battery: [
    "Sippy charges just like your phone! ⚡\n\n🔌 Charges via USB cable\n🔋 Full charge in a few hours\n💧 Heats 300mL multiple times per charge\n\nCompletely wireless — no socket needed anywhere!"
  ],
  compare: [
    "Sippy stands out from regular kettles! 🏆\n\n✅ 100% wireless (no socket!)\n✅ 316 medical-grade steel\n✅ Precise temperature control\n✅ Compact & portable\n✅ LED live display\n\nMost kettles need a socket and give no temperature control. Sippy gives you full freedom!"
  ],
  thanks: [
    "You're welcome! 😊 Is there anything else you'd like to know about Sippy? 🫖",
    "My pleasure! 🎉 Feel free to ask anything else!",
    "Anytime! 😊 Let me know if you have more questions!"
  ],
  default: [
    "I'm not sure about that, but our support team can help! 😊\n\n📧 smartkettlestore@gmail.com\n📞 +91 89856 56181\n💬 WhatsApp: wa.me/918985656181\n\n🕐 Mon-Sat, 9am-7pm IST",
    "That's beyond what I can answer! 🙏 Please reach out to our team:\n\n📧 smartkettlestore@gmail.com\n📞 +91 89856 56181\n💬 WhatsApp: wa.me/918985656181\n\nWe reply within 4-6 hours! ⚡"
  ]
};

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
      <div><div class="chat-name">Sippy AI Assistant</div><div class="chat-online">● Online now</div></div>
      <button class="chat-close" id="chatClose">✕</button>
    </div>
    <div class="chat-msgs" id="chatMsgs"></div>
    <div class="chat-input-row">
      <input type="text" id="chatIn" placeholder="Ask me anything about Sippy…" />
      <button class="chat-send" id="chatSend">➤</button>
    </div>
  `;
  document.body.appendChild(win);

  fab.addEventListener('click', () => {
    const isOpen = win.classList.contains('open');
    if (!isOpen) { resetChat(); win.classList.add('open'); }
    else { win.classList.remove('open'); }
  });
  document.getElementById('chatClose').addEventListener('click', () => win.classList.remove('open'));
  document.getElementById('chatSend').addEventListener('click', sendChat);
  document.getElementById('chatIn').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
}

function resetChat() {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  msgs.innerHTML = '';
  setTimeout(() => addBotMsg("Hi! 👋 I\'m Sippy\'s AI Assistant. Ask me anything about our smart kettle — price, features, shipping, offers, or anything else! 🫖"), 200);
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

function sendChat() {
  const inp = document.getElementById('chatIn');
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  addUserMsg(txt);
  
  // Simulate typing delay for natural feel
  setTimeout(() => {
    const response = getAIResponse(txt);
    addBotMsg(response);
  }, 600 + Math.random() * 400);
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
