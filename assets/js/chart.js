// Ensure the page includes:
// <canvas id="myChart"></canvas>
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{
        label: 'Visitors',
        data: [12, 19, 3, 17, 28, 24, 7],
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        borderColor: '#ffb7ff',
        backgroundColor: 'rgba(186,104,200,0.25)',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,   // prevents jumping
      plugins: {
        legend: { labels: { color: "#fff" } }
      },
      scales: {
        x: { ticks: { color: "#fff" } },
        y: { ticks: { color: "#fff" } }
      }
    }
  });
});
