/*
  ============================================================
  EmailJS — Used ONLY for order emails (checkout page)
  ============================================================
*/

(function () {

  window.EMAILJS_PUBLIC_KEY       = 'H7BoCw853nLbLGZTi';
  window.EMAILJS_SERVICE_ID       = 'service_oz2vncr';
  window.EMAILJS_ORDER_TEMPLATE   = 'template_jnpgbyd';   // Order notification → store owner
  window.EMAILJS_CONFIRM_TEMPLATE = 'template_1mvszog';   // Customer confirmation → customer

  var ok =
    window.EMAILJS_PUBLIC_KEY       !== 'YOUR_PUBLIC_KEY' &&
    window.EMAILJS_SERVICE_ID       !== 'YOUR_SERVICE_ID' &&
    window.EMAILJS_ORDER_TEMPLATE   !== 'YOUR_ORDER_TEMPLATE_ID' &&
    window.EMAILJS_CONFIRM_TEMPLATE !== 'YOUR_CONFIRM_TEMPLATE_ID';

  window.EMAILJS_CONFIGURED = ok;

  if (!ok) {
    console.warn('EmailJS not configured yet.');
    return;
  }

  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = function () {
    emailjs.init(window.EMAILJS_PUBLIC_KEY);
    console.log('EmailJS ready');
  };
  document.head.appendChild(s);

})();
