// Replace the original damaged image assets with clean web-optimized copies.
document.querySelectorAll('img').forEach(img => {
  const src = img.getAttribute('src') || '';
  if (src.endsWith('assets/clinic-dental.jpg')) {
    img.setAttribute('src', 'assets/clinic-dental.webp');
  } else if (src.endsWith('assets/clinic-doctor.jpg')) {
    img.setAttribute('src', 'assets/clinic-doctor.webp');
  }
});

// Keep the clinic contact details consistent across the whole site.
const PHONE_DISPLAY_OLD = '+91 76290 25611';
const PHONE_DISPLAY_NEW = '+91 87873 07435';
const PHONE_DIGITS_OLD = '917629025611';
const PHONE_DIGITS_NEW = '918787307435';

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.includes(PHONE_DIGITS_OLD)) {
    link.setAttribute('href', href.replaceAll(PHONE_DIGITS_OLD, PHONE_DIGITS_NEW));
  }
});

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let textNode;
while ((textNode = walker.nextNode())) {
  if (textNode.nodeValue?.includes(PHONE_DISPLAY_OLD)) {
    textNode.nodeValue = textNode.nodeValue.replaceAll(PHONE_DISPLAY_OLD, PHONE_DISPLAY_NEW);
  }
}

document.querySelectorAll('script[type="application/ld+json"]').forEach(schema => {
  if (schema.textContent.includes('+91-76290-25611')) {
    schema.textContent = schema.textContent.replaceAll('+91-76290-25611', '+91-87873-07435');
  }
});

// Correct OPD timings to match the clinic's latest published schedule.
const medicinePanel = document.getElementById('medicine');
if (medicinePanel) {
  const rows = medicinePanel.querySelectorAll('.schedule-row');
  rows.forEach(row => {
    const day = row.querySelector('span')?.textContent.trim();
    const time = row.querySelector('strong');
    if (!time) return;
    if (day === 'Thursday') time.textContent = '2:00 PM onwards';
    if (day === 'Sunday') time.textContent = '9:00 AM onwards';
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

const tabs = [...document.querySelectorAll('.tab')];
const panels = [...document.querySelectorAll('.schedule-content')];
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  tab.classList.add('active');
  document.getElementById(tab.dataset.target)?.classList.add('active');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
