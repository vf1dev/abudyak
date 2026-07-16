const ICONS = {
  nfc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/><path d="M16.37 2a20.16 20.16 0 0 1 0 20"/></svg>`,
  qr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  paw: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  droplets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`,
  feather: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.332V18a1 1 0 0 0 1 1z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
  palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
};

const COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "Pink", hex: "#F48FB1" },
  { name: "Blue", hex: "#4FC3F7" },
  { name: "Green", hex: "#4CAF50" },
  { name: "Orange", hex: "#FF8A00" },
];

const FEATURES = [
  { icon: "nfc", title: "NFC Tap", desc: "Tap the tag with any NFC-enabled phone to instantly view pet info." },
  { icon: "qr", title: "QR Code", desc: "Anyone with a camera can scan the QR for instant access." },
  { icon: "user", title: "Owner Contact", desc: "Quick access to your phone, WhatsApp and email." },
  { icon: "paw", title: "Pet Profile", desc: "Name, breed, allergies, medical notes — all in one place." },
  { icon: "droplets", title: "Waterproof", desc: "Water and dust resistant. Built for every adventure." },
  { icon: "feather", title: "Lightweight", desc: "Feather-light and comfortable for pets of any size." },
];

const STEPS = [
  { n: "01", title: "Attach the tag", desc: "Clip Petty securely onto your pet's collar in seconds." },
  { n: "02", title: "Create their profile", desc: "Add name, photo, medical notes and your contact info." },
  { n: "03", title: "Anyone scans or taps", desc: "A stranger who finds your pet uses any modern phone." },
  { n: "04", title: "They see your details", desc: "You get contacted instantly. Reunited in minutes." },
];

const BENEFITS = [
  { icon: "droplets", label: "Waterproof" },
  { icon: "shield", label: "Durable" },
  { icon: "phone", label: "iOS & Android" },
  { icon: "layers", label: "3D Printed" },
  { icon: "palette", label: "Multiple Colors" },
  { icon: "lock", label: "Secure Attachment" },
];

const GALLERY = [
  { src: "assets/features.jpg", label: "Never Lose Your Best Friend", tall: true },
  { src: "assets/collar.jpg", label: "Made for real adventures" },
  { src: "assets/tag-colors.jpg", label: "Five colors, one promise" },
];

const REVIEWS = [
  {
    name: "Sarah & Milo",
    role: "Golden Retriever mom",
    text: "Milo slipped out of the yard last month. A neighbor tapped his Petty tag and called me in 5 minutes. Life saver.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
  },
  {
    name: "James & Luna",
    role: "Rescue cat parent",
    text: "Beautifully designed, super light, and Luna doesn't even notice it. The QR profile is genius.",
    img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&h=200&fit=crop",
  },
  {
    name: "Aya & Cooper",
    role: "Border Collie",
    text: "We hike every weekend — the tag survived rivers, mud and snow. Best purchase for peace of mind.",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop",
  },
];

const FAQS = [
  { q: "Does it require batteries?", a: "No. Petty uses passive NFC and printed QR — no batteries, no charging, ever." },
  { q: "Does it work on iPhone?", a: "Yes. Every iPhone from XS onward reads NFC automatically. Any phone with a camera can scan the QR." },
  { q: "Is it waterproof?", a: "Fully waterproof and dust-resistant. Rated for swimming, rain, and rough outdoor use." },
  { q: "Can I update my information?", a: "Absolutely. Log into your Petty profile anytime to update contact info, photos and medical notes." },
];

function renderColors() {
  const root = document.getElementById("color-swatches");
  const label = document.getElementById("selected-color");
  let active = 0;

  function paint() {
    root.innerHTML = COLORS.map(
      (c, i) => `
      <button type="button" class="swatch${i === active ? " active" : ""}" data-index="${i}" role="option" aria-selected="${i === active}">
        <span class="swatch-dot" style="background:${c.hex}"></span>
        <span>${c.name}</span>
      </button>`
    ).join("");
    label.textContent = COLORS[active].name;
  }

  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".swatch");
    if (!btn) return;
    active = Number(btn.dataset.index);
    paint();
  });

  paint();
}

function renderFeatures() {
  const root = document.getElementById("features-grid");
  root.innerHTML = FEATURES.map(
    (f, i) => `
    <div class="reveal feature-card" style="transition-delay:${i * 60}ms">
      <div class="feature-icon">${ICONS[f.icon]}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>`
  ).join("");
}

function renderSteps() {
  const root = document.getElementById("steps-grid");
  root.innerHTML = STEPS.map(
    (s, i) => `
    <div class="reveal step-card" style="transition-delay:${i * 80}ms">
      <div class="step-n">${s.n}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>`
  ).join("");
}

function renderBenefits() {
  const root = document.getElementById("benefits-list");
  root.innerHTML = BENEFITS.map(
    (b) => `
    <div class="benefit-item">
      <div class="benefit-icon">${ICONS[b.icon]}</div>
      <span>${b.label}</span>
    </div>`
  ).join("");
}

function renderGallery() {
  const root = document.getElementById("gallery-grid");
  root.innerHTML = GALLERY.map(
    (it) => `
    <div class="reveal gallery-item${it.tall ? " tall" : ""}">
      <img src="${it.src}" alt="${it.label}" />
      <div class="gallery-caption"><p>${it.label}</p></div>
    </div>`
  ).join("");
}

function renderReviews() {
  const root = document.getElementById("reviews-grid");
  const stars = Array.from({ length: 5 }, () => ICONS.star).join("");
  root.innerHTML = REVIEWS.map(
    (r, i) => `
    <div class="reveal review-card" style="transition-delay:${i * 80}ms">
      <div class="stars">${stars}</div>
      <p>"${r.text}"</p>
      <div class="reviewer">
        <img src="${r.img}" alt="${r.name}" />
        <div>
          <strong>${r.name}</strong>
          <span>${r.role}</span>
        </div>
      </div>
    </div>`
  ).join("");
}

function renderFaq() {
  const root = document.getElementById("faq-list");
  let open = 0;

  function paint() {
    root.innerHTML = FAQS.map(
      (f, i) => `
      <div class="reveal faq-item${i === open ? " open" : ""}">
        <button type="button" class="faq-trigger" data-index="${i}" aria-expanded="${i === open}">
          <span>${f.q}</span>
          ${ICONS.chevron}
        </button>
        <div class="faq-panel">
          <div class="faq-panel-inner">
            <p>${f.a}</p>
          </div>
        </div>
      </div>`
    ).join("");
  }

  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-trigger");
    if (!btn) return;
    const i = Number(btn.dataset.index);
    open = open === i ? null : i;
    paint();
    setupReveal();
  });

  paint();
}

function setupNavScroll() {
  const header = document.getElementById("site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupReveal() {
  const els = document.querySelectorAll(".reveal:not(.in)");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

function setupCopyright() {
  const el = document.getElementById("copyright");
  if (el) el.textContent = `© ${new Date().getFullYear()} Petty. All rights reserved.`;
}

function setupAdminQr() {
  const input = document.getElementById("qr-text");
  const generateBtn = document.getElementById("generate-btn");
  const preview = document.getElementById("qr-preview");
  const image = document.getElementById("qr-image");
  const downloadBtn = document.getElementById("download-btn");
  const errorEl = document.getElementById("qr-error");
  if (!input || !generateBtn) return;

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = !msg;
  }

  function generateQr() {
    const text = input.value.trim();
    if (!text) {
      showError("اكتب نصاً أو رابطاً أولاً");
      input.focus();
      return;
    }

    showError("");

    const url =
      "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
      encodeURIComponent(text);

    image.onload = () => {
      preview.hidden = false;
      downloadBtn.href = url;
    };

    image.onerror = () => {
      showError("تعذر إنشاء الـ QR. تحقق من الاتصال بالإنترنت.");
      preview.hidden = true;
    };

    image.src = url;
  }

  generateBtn.addEventListener("click", generateQr);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") generateQr();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isAdmin = Boolean(document.getElementById("qr-text"));

  if (isAdmin) {
    setupAdminQr();
    setupNavScroll();
    return;
  }

  renderColors();
  renderFeatures();
  renderSteps();
  renderBenefits();
  renderGallery();
  renderReviews();
  renderFaq();
  setupNavScroll();
  setupCopyright();
  setupReveal();
});
