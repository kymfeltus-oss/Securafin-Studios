// Simple sparkle chart + animated counters + contact form mock
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Sparkline
  const spark = document.getElementById('sparkline');
  if (spark) {
    const points = Array.from({length: 24}, (_, i) => (Math.sin(i/2) + 1) * 40 + Math.random()*16);
    points.forEach((h, i) => {
      const bar = document.createElement('span');
      bar.style.position = 'absolute';
      bar.style.bottom = '0';
      bar.style.left = (i * (100/points.length)) + '%';
      bar.style.width = (100/points.length - 1) + '%';
      bar.style.height = h + 'px';
      bar.style.background = 'linear-gradient(180deg, rgba(0,229,255,.8), rgba(0,229,255,0))';
      bar.style.borderRadius = '6px 6px 0 0';
      spark.appendChild(bar);
    });
  }

  // Counters
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = '$' + current.toLocaleString();
    }, 18);
  });

  // Mock contact form
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name');
      formStatus.textContent = `Thanks, ${name}! Your inquiry has been logged.`;
      contactForm.reset();
    });
  }
});
