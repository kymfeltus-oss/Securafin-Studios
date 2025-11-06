document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('revChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({length: 12}, (_, i) => `M${i+1}`),
      datasets: [{
        label: 'Revenue ($K)',
        data: Array.from({length: 12}, () => Math.random()*50 + 100),
        borderColor: '#00e5ff',
        backgroundColor: 'rgba(0,229,255,0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#c5d2e3' } } },
      scales: {
        x: { ticks: { color: '#c5d2e3' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        y: { ticks: { color: '#c5d2e3' }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    }
  });

  const simulate = document.getElementById('simulateBtn');
  simulate.addEventListener('click', () => {
    chart.data.datasets[0].data = chart.data.datasets[0].data.map(v => v + (Math.random()*20 - 10));
    chart.update();
    document.querySelectorAll('.kpi-value').forEach(el => {
      if (el.dataset.kpi === 'mrr') el.textContent = '$' + (42000 + Math.random()*2000).toFixed(0);
      if (el.dataset.kpi === 'users') el.textContent = (4000 + Math.random()*500).toFixed(0);
      if (el.dataset.kpi === 'conv') el.textContent = (7 + Math.random()).toFixed(1) + '%';
      if (el.dataset.kpi === 'nps') el.textContent = (70 + Math.random()*5).toFixed(0);
    });
  });

  const toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
  });
});
