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
    "Hi! 👋 Welcome to Sippy! I'm your AI assistant. Ask me anything about our smart kettle!",
    "Hello! 😊 Great to have you here! How can I help you with Sippy today?",
    "Hey there! 👋 I'm Sippy's assistant. What would you like to know?"
  ],
  price: [
    "Sippy is originally priced at ₹7,999 but with promo code **SIPPY25** you get 25% OFF — bringing it to just ₹5,999! 🎉

✅ All taxes included
✅ FREE shipping all India
✅ No hidden charges

Just enter SIPPY25 at checkout!",
    "Great news! Use promo code **SIPPY25** at checkout for 25% off! 🏷️

Original: ~~₹7,999~~ → You pay: ₹5,999

FREE shipping included!"
  ],
  promo: [
    "Your promo code is **SIPPY25** 🎉

Enter it at checkout to get 25% OFF!

₹7,999 → ₹5,999 (save ₹2,000!)

Don't miss it — limited time offer! 🔥"
  ],
  product: [
    "Sippy is India's smartest rechargeable portable kettle! 🫖

⚡ 100% wireless — no socket needed
🌡️ 45°C to 100°C temperature control
📱 LED live temperature display
🛡️ 316 Medical-Grade Stainless Steel
💧 300mL — perfect cup every time

Perfect for travel, office, home & outdoors!",
  ],
  material: [
    "Sippy is built with 3 premium layers 🛡️

🔩 Inner: 316 Medical-Grade Stainless Steel (same as surgical instruments!)
🌡️ Middle: Thermal insulation layer
🏠 Outer: Cool-touch ABS shell

Your water NEVER touches plastic. 100% food safe!"
  ],
  temperature: [
    "Sippy heats from 45°C to 100°C 🌡️

Perfect for:
☕ Coffee/Espresso: 95°C
🍵 Green tea: 70°C
🍼 Baby formula: 60°C
🍜 Instant noodles: 100°C

LED display shows live temperature in real time!"
  ],
  shipping: [
    "Shipping is completely FREE all across India! 🚚

📦 Dispatched: 1-2 business days
🏠 Delivered: 4-7 working days
📱 SMS tracking after dispatch
🇮🇳 Available pan-India

No extra charges — included in ₹5,999!"
  ],
  order: [
    "Ordering Sippy is super easy! 🛒

1️⃣ Click 'Add to Cart'
2️⃣ Go to Cart & review
3️⃣ Click 'Proceed to Checkout'
4️⃣ Fill delivery details
5️⃣ Enter code **SIPPY25** for 25% off!
6️⃣ Pay securely via Razorpay

Done in under 2 minutes! ⚡"
  ],
  payment: [
    "We accept all major payment methods via Razorpay 💳

• UPI (PhonePe, GPay, Paytm)
• Credit & Debit Cards
• Net Banking
• Wallets
• EMI options

100% secure & encrypted. PCI DSS compliant! 🔒"
  ],
  returns: [
    "We stand behind Sippy 100%! 💯

🔄 30-day satisfaction guarantee
💰 Full refund, no questions asked
📦 Contact us within 30 days
🔧 Manufacturing defects covered

We want you to love your Sippy — if not, we'll make it right!"
  ],
  contact: [
    "Our support team is always happy to help! 😊

📧 smartkettlestore@gmail.com
📞 +91 89856 56181
💬 WhatsApp: wa.me/918985656181

🕐 Mon-Sat, 9am-7pm IST
⚡ Reply within 4-6 hours"
  ],
  cleaning: [
    "Cleaning Sippy is super easy! 🧼

✅ Rinse with warm water after use
✅ Wide-mouth design for easy access
✅ 316 steel resists stains & odours
✅ Monthly: water + white vinegar for descaling

⚠️ Don't submerge the base electronics!"
  ],
  battery: [
    "Sippy charges just like your phone! ⚡

🔌 Charges via USB cable
🔋 Full charge in a few hours
💧 Heats 300mL multiple times per charge

Completely wireless — no socket needed anywhere!"
  ],
  compare: [
    "Sippy stands out from regular kettles! 🏆

✅ 100% wireless (no socket!)
✅ 316 medical-grade steel
✅ Precise temperature control
✅ Compact & portable
✅ LED live display

Most kettles need a socket and give you no temperature control. Sippy gives you full freedom!"
  ],
  thanks: [
    "You're welcome! 😊 Happy to help. Is there anything else you'd like to know about Sippy? 🫖",
    "My pleasure! 🎉 Feel free to ask anything else!",
    "Anytime! 😊 Let me know if you have more questions!"
  ],
  default: [
    "I'm not sure about that, but our support team can help! 😊\n\n📧 smartkettlestore@gmail.com\n📞 +91 89856 56181\n💬 WhatsApp: wa.me/918985656181\n\n🕐 Mon-Sat, 9am-7pm IST\n\nOr ask me about pricing, features, shipping or offers!",
    "That's beyond what I can answer right now! 🙏 Please reach out to our team:\n\n📧 smartkettlestore@gmail.com\n📞 +91 89856 56181\n💬 WhatsApp: wa.me/918985656181\n\nWe reply within 4-6 hours! ⚡",
  ]
};

function getAIResponse(text) {
  const t = text.toLowerCase();
  
  // Greetings
  if (/^(hi|hello|hey|hii|helo|good morning|good afternoon|good evening|namaste|sup|what'?s up)/i.test(t.trim())) {
    return rand(SIPPY_AI.greet);
  }
  // Thanks
  if (t.includes('thank') || t.includes('thanks') || t.includes('thx') || t.includes('ty ')) {
    return rand(SIPPY_AI.thanks);
  }
  // Promo code
  if (t.includes('promo') || t.includes('coupon') || t.includes('discount') || t.includes('code') || t.includes('offer') || t.includes('sippy25')) {
    return rand(SIPPY_AI.promo);
  }
  // Price
  if (t.includes('price') || t.includes('cost') || t.includes('₹') || t.includes('rs') || t.includes('rupee') || t.includes('how much') || t.includes('costly') || t.includes('cheap') || t.includes('expensive')) {
    return rand(SIPPY_AI.price);
  }
  // Battery/charging
  if (t.includes('battery') || t.includes('charg') || t.includes('usb') || t.includes('power') || t.includes('electric')) {
    return rand(SIPPY_AI.battery);
  }
  // Temperature
  if (t.includes('temp') || t.includes('heat') || t.includes('degree') || t.includes('celsius') || t.includes('hot') || t.includes('boil') || t.includes('warm')) {
    return rand(SIPPY_AI.temperature);
  }
  // Material/safety
  if (t.includes('material') || t.includes('steel') || t.includes('safe') || t.includes('bpa') || t.includes('plastic') || t.includes('build') || t.includes('made of') || t.includes('quality')) {
    return rand(SIPPY_AI.material);
  }
  // Shipping
  if (t.includes('ship') || t.includes('deliver') || t.includes('dispatch') || t.includes('track') || t.includes('days') || t.includes('arrive') || t.includes('reach')) {
    return rand(SIPPY_AI.shipping);
  }
  // Payment
  if (t.includes('pay') || t.includes('upi') || t.includes('card') || t.includes('razorpay') || t.includes('gpay') || t.includes('phonepe') || t.includes('emi') || t.includes('net banking')) {
    return rand(SIPPY_AI.payment);
  }
  // Order
  if (t.includes('order') || t.includes('buy') || t.includes('purchase') || t.includes('cart') || t.includes('checkout') || t.includes('how to get')) {
    return rand(SIPPY_AI.order);
  }
  // Returns
  if (t.includes('return') || t.includes('refund') || t.includes('warranty') || t.includes('guarantee') || t.includes('replace') || t.includes('broken') || t.includes('damage')) {
    return rand(SIPPY_AI.returns);
  }
  // Cleaning
  if (t.includes('clean') || t.includes('wash') || t.includes('maintain') || t.includes('care')) {
    return rand(SIPPY_AI.cleaning);
  }
  // Contact
  if (t.includes('contact') || t.includes('support') || t.includes('help') || t.includes('phone') || t.includes('email') || t.includes('whatsapp') || t.includes('call')) {
    return rand(SIPPY_AI.contact);
  }
  // Compare
  if (t.includes('compar') || t.includes('better') || t.includes('vs') || t.includes('difference') || t.includes('why') || t.includes('worth')) {
    return rand(SIPPY_AI.compare);
  }
  // Product info
  if (t.includes('sippy') || t.includes('kettle') || t.includes('product') || t.includes('what is') || t.includes('tell me') || t.includes('about') || t.includes('feature') || t.includes('wireless')) {
    return rand(SIPPY_AI.product);
  }
  
  return rand(SIPPY_AI.default);
}

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
