╔══════════════════════════════════════════════════════════════╗
║            SIPPY — EMAIL SETUP (COMPLETE GUIDE)            ║
╚══════════════════════════════════════════════════════════════╝

HOW EMAILS WORK ON YOUR WEBSITE:
─────────────────────────────────────────────────────────────

  CONTACT FORM  →  Web3Forms  (web3forms.com)
  ├── Email to YOU        : Customer name, email, phone, message
  └── Email to CUSTOMER  : Auto-reply "We received your message"

  ORDER PLACED  →  EmailJS  (emailjs.com)
  ├── Email to YOU        : Full order details, address, payment ID
  └── Email to CUSTOMER  : "Your order is confirmed" with delivery info

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART A — WEB3FORMS SETUP  (Contact Form)
──────────────────────────────────────────
⏱  Takes 1 minute. FREE: 250 submissions/month. NO templates needed.

1. Go to  https://web3forms.com
2. Type   smartkettlestore@gmail.com  in the box → click "Create Access Key"
3. Check your Gmail inbox — Web3Forms sends you an Access Key
   It looks like:  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
4. Open  pages/contact.html  in Notepad or VS Code
5. Find this line near the bottom:
        var WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
   Replace with your real key:
        var WEB3FORMS_KEY = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
6. Save the file.  Done! ✅

Result:
  → Customer fills form and clicks Send
  → YOU receive alert email at smartkettlestore@gmail.com
  → CUSTOMER receives auto-reply "We received your message" email

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART B — EMAILJS SETUP  (Order Emails)
────────────────────────────────────────
⏱  Takes 5–8 minutes. FREE: 200 emails/month.

TWO HTML TEMPLATES ARE PROVIDED:
  TEMPLATE-1-order-alert-to-store.html        ← paste into EmailJS Template 1
  TEMPLATE-2-order-confirmation-to-customer.html  ← paste into EmailJS Template 2

─────────────────────────────────────────────
STEP 1 — Create EmailJS Account
─────────────────────────────────────────────
  Go to:  https://emailjs.com
  Sign up FREE using  smartkettlestore@gmail.com

─────────────────────────────────────────────
STEP 2 — Connect your Gmail
─────────────────────────────────────────────
  Dashboard → Email Services → Add New Service → Gmail
  → Connect smartkettlestore@gmail.com
  → Note the Service ID  (looks like: service_abc1234)

─────────────────────────────────────────────
STEP 3 — Create Template 1  (Order Alert to YOU)
─────────────────────────────────────────────
  Dashboard → Email Templates → Create New Template

  Fill in these fields:
  ┌─────────────────┬──────────────────────────────────────┐
  │ Template Name   │ Order Alert                          │
  │ To Email        │ smartkettlestore@gmail.com           │
  │ Subject         │ {{subject}}                          │
  │ Body (HTML)     │ see instructions below ↓             │
  └─────────────────┴──────────────────────────────────────┘

  For the Body:
  a) Open  TEMPLATE-1-order-alert-to-store.html  in your browser
  b) Press Ctrl+U (or right-click → View Page Source)
  c) Press Ctrl+A to select all → Ctrl+C to copy
  d) In EmailJS template editor → click the "<>" (HTML) button
  e) Press Ctrl+A to clear → Ctrl+V to paste
  f) Click Save → note the Template ID (e.g. template_abc123)

─────────────────────────────────────────────
STEP 4 — Create Template 2  (Confirmation to CUSTOMER)
─────────────────────────────────────────────
  Dashboard → Email Templates → Create New Template

  Fill in these fields:
  ┌─────────────────┬──────────────────────────────────────┐
  │ Template Name   │ Order Confirmation                   │
  │ To Email        │ {{to_email}}   ← MUST be {{to_email}}│
  │ Subject         │ {{subject}}                          │
  │ Body (HTML)     │ see instructions below ↓             │
  └─────────────────┴──────────────────────────────────────┘

  For the Body:
  a) Open  TEMPLATE-2-order-confirmation-to-customer.html  in your browser
  b) Press Ctrl+U → Ctrl+A → Ctrl+C
  c) In EmailJS editor → click "<>" → Ctrl+A → Ctrl+V
  d) Click Save → note the Template ID (e.g. template_xyz456)

─────────────────────────────────────────────
STEP 5 — Get your Public Key
─────────────────────────────────────────────
  EmailJS Dashboard → top-right Account icon → API Keys
  Copy the "Public Key"  (e.g. aBcDeFgHiJkLmNoPq)

─────────────────────────────────────────────
STEP 6 — Paste all 4 IDs into emailjs-init.js
─────────────────────────────────────────────
  Open  js/emailjs-init.js  in Notepad / VS Code
  Find and replace these 4 lines:

    window.EMAILJS_PUBLIC_KEY       = 'YOUR_PUBLIC_KEY';
    window.EMAILJS_SERVICE_ID       = 'YOUR_SERVICE_ID';
    window.EMAILJS_ORDER_TEMPLATE   = 'YOUR_ORDER_TEMPLATE_ID';
    window.EMAILJS_CONFIRM_TEMPLATE = 'YOUR_CONFIRM_TEMPLATE_ID';

  Example after filling in:
    window.EMAILJS_PUBLIC_KEY       = 'aBcDeFgHiJkLmNoPq';
    window.EMAILJS_SERVICE_ID       = 'service_abc1234';
    window.EMAILJS_ORDER_TEMPLATE   = 'template_abc123';
    window.EMAILJS_CONFIRM_TEMPLATE = 'template_xyz456';

  Save the file. ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART C — RAZORPAY SETUP  (Payments)
─────────────────────────────────────
  Open  pages/checkout.html
  Find this line:
    const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID';
  Replace with your key from razorpay.com dashboard.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY — ONLY 3 FILES TO EDIT:

  pages/contact.html     → paste Web3Forms Access Key  (1 line)
  js/emailjs-init.js     → paste 4 EmailJS IDs         (4 lines)
  pages/checkout.html    → paste Razorpay Key ID        (1 line)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
