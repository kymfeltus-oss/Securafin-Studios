document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const svg = document.getElementById('revChart');
  let data = Array.from({length: 24}, (_, i) => 300 + 80*Math.sin(i/2) + Math.random()*60);

  function draw() {
    if (!svg) return;
    const w = 600, h = 200, pad = 24;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const max = Math.max(...data) * 1.05, min = Math.min(...data) * 0.95;
    const pts = data.map((v, i) => {
      const x = pad + (i * (w - pad*2) / (data.length - 1));
      const y = h - pad - ((v - min) / (max - min)) * (h - pad*2);
      return [x, y];
    });
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    svg.innerHTML = `
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(0,229,255,0.9)"/>
          <stop offset="100%" stop-color="rgba(0,229,255,0.0)"/>
        </linearGradient>
      </defs>
      <path d="${d}" fill="none" stroke="rgba(0,229,255,0.9)" stroke-width="3" />
      <path d="${d} L ${w-pad} ${h-pad} L ${pad} ${h-pad} Z" fill="url(#g)" opacity="0.25" />
      <g fill="rgba(255,255,255,0.65)" font-size="10">
        <text x="${pad}" y="${h-8}">0</text>
        <text x="${w/2}" y="${h-8}">t</text>
        <text x="${w-pad-10}" y="${h-8}">now</text>
      </g>
    `;
  }
  draw();

  // Theme toggle (light/dark contrast)
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const root = document.documentElement;
      const dark = getComputedStyle(root).getPropertyValue('--bg').trim() === '#0b0f14';
      if (dark) {
        root.style.setProperty('--bg', '#f3f7ff');
        root.style.setProperty('--bg-elev', '#ffffff');
        root.style.setProperty('--card', '#ffffff');
        root.style.setProperty('--text', '#0b0f14');
        root.style.setProperty('--silver', '#334155');
      } else {
        root.style.setProperty('--bg', '#0b0f14');
        root.style.setProperty('--bg-elev', '#0e141b');
        root.style.setProperty('--card', '#121924');
        root.style.setProperty('--text', '#e6f1ff');
        root.style.setProperty('--silver', '#c5d2e3');
      }
    });
  }

  // Simulate data
  const simulate = document.getElementById('simulateBtn');
  if (simulate) {
    simulate.addEventListener('click', () => {
      data = data.map(v => v + (Math.random() - 0.48) * 30);
      draw();
      // Nudge KPIs
      const mrr = document.querySelector('[data-kpi="mrr"]');
      const churn = document.querySelector('[data-kpi="churn"]');
      const arpu = document.querySelector('[data-kpi="arpu"]');
      const nps = document.querySelector('[data-kpi="nps"]');
      const rnd = (min, max) => (Math.random()*(max-min)+min);
      if (mrr) mrr.textContent = `$${(42800 + rnd(-1200, 2400)).toFixed(0)}`;
      if (churn) churn.textContent = `${(2.1 + rnd(-0.5, 0.4)).toFixed(1)}%`;
      if (arpu) arpu.textContent = `$${(189 + rnd(-6, 8)).toFixed(0)}`;
      if (nps) nps.textContent = `${(72 + rnd(-3, 3)).toFixed(0)}`;
    });
  }
});
