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

// ===== AI CHATBOT =====
const SIPPY_CONTEXT = `You are Sippy Assistant, a friendly and helpful customer support AI for Sippy — India's smartest rechargeable portable kettle.

PRODUCT INFO:
- Name: Sippy Smart Portable Kettle
- Price: ₹7,999 (original) → ₹5,999 with promo code SIPPY25 (25% OFF)
- Promo code: SIPPY25 — enter at checkout for 25% off
- Capacity: 300mL
- Temperature range: 45°C to 100°C
- Display: LED temperature display (live reading)
- Material: 316 Medical-Grade Stainless Steel interior, thermal insulation middle layer, ABS cool-touch outer shell
- Charging: Wireless rechargeable via USB (like a phone)
- No power socket needed — fully portable

SHIPPING & DELIVERY:
- FREE shipping all across India
- Dispatched within 1-2 business days
- Delivered in 4-7 working days
- SMS tracking after dispatch

PAYMENT:
- Powered by Razorpay
- Accepts UPI (PhonePe, GPay, Paytm), Credit/Debit Cards, Net Banking, Wallets, EMI

RETURNS & WARRANTY:
- 30-day satisfaction guarantee
- Full refund if not happy, no questions asked
- Manufacturing defects covered

CONTACT:
- Email: smartkettlestore@gmail.com
- Phone/WhatsApp: +91 89856 56181
- Hours: Mon-Sat, 9am-7pm IST

HOW TO ORDER:
1. Click Add to Cart
2. Go to Cart
3. Proceed to Checkout
4. Fill delivery details
5. Enter promo code SIPPY25 for 25% off
6. Pay securely

PERSONALITY:
- Friendly, warm, helpful
- Use emojis occasionally
- Keep responses concise (2-4 sentences max)
- Always mention promo code SIPPY25 when price is discussed
- If you don't know something specific, direct them to contact support`;

let chatHistory = [];

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
      <div><div class="chat-name">Sippy AI Assistant</div><div class="chat-online">● Powered by AI</div></div>
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
  chatHistory = [];
  setTimeout(() => {
    addBotMsg('Hi! 👋 I\'m Sippy\'s AI Assistant. Ask me anything about Sippy — pricing, features, shipping, or anything else! 🫖');
  }, 200);
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

function addTypingIndicator() {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  const d = document.createElement('div');
  d.className = 'bot-msg typing-indicator';
  d.id = 'typingIndicator';
  d.textContent = '● ● ●';
  d.style.cssText = 'opacity:0.5;font-size:18px;letter-spacing:4px;';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTypingIndicator() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

async function sendChat() {
  const inp = document.getElementById('chatIn');
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  inp.disabled = true;
  document.getElementById('chatSend').disabled = true;

  addUserMsg(txt);
  chatHistory.push({ role: 'user', content: txt });
  addTypingIndicator();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: SIPPY_CONTEXT,
        messages: chatHistory
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again!';
    
    removeTypingIndicator();
    addBotMsg(reply);
    chatHistory.push({ role: 'assistant', content: reply });

    // Keep history to last 10 messages to avoid token limits
    if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

  } catch (err) {
    removeTypingIndicator();
    addBotMsg('Sorry, something went wrong! Please contact us at smartkettlestore@gmail.com or WhatsApp +91 89856 56181 😊');
  }

  inp.disabled = false;
  document.getElementById('chatSend').disabled = false;
  inp.focus();
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
