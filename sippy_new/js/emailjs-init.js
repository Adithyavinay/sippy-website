/*
  ============================================================
  EmailJS — Used ONLY for order emails (checkout page)
  Contact form uses Formspree — no setup needed here for that.

  SETUP (2 templates only):
  ─────────────────────────
  1. Go to https://emailjs.com → sign up free
  2. Connect Gmail (smartkettlestore@gmail.com)
     → Email Services → Add New Service → Gmail
  3. Create 2 templates at dashboard.emailjs.com/admin/templates
     (copy HTML from email-templates/ folder)
  4. Paste your IDs below
  ============================================================
*/

(function () {

  // ✏️ REPLACE THESE 4 VALUES:
  window.EMAILJS_PUBLIC_KEY     = 'YOUR_PUBLIC_KEY';       // account page → API Keys
  window.EMAILJS_SERVICE_ID     = 'YOUR_SERVICE_ID';       // e.g. service_abc123
  window.EMAILJS_ORDER_TEMPLATE = 'YOUR_ORDER_TEMPLATE_ID'; // template for store owner
  window.EMAILJS_CONFIRM_TEMPLATE = 'YOUR_CONFIRM_TEMPLATE_ID'; // template for customer

  var ok =
    window.EMAILJS_PUBLIC_KEY       !== 'YOUR_PUBLIC_KEY' &&
    window.EMAILJS_SERVICE_ID       !== 'YOUR_SERVICE_ID' &&
    window.EMAILJS_ORDER_TEMPLATE   !== 'YOUR_ORDER_TEMPLATE_ID' &&
    window.EMAILJS_CONFIRM_TEMPLATE !== 'YOUR_CONFIRM_TEMPLATE_ID';

  window.EMAILJS_CONFIGURED = ok;

  if (!ok) {
    console.warn('⚠️ EmailJS not configured yet. Open js/emailjs-init.js and paste your IDs.');
    return;
  }

  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = function () {
    emailjs.init(window.EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS ready');
  };
  document.head.appendChild(s);

})();
