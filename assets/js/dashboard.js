/* dashboard.js - updates dashboard metrics, charts & recent transactions */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof getTotals === 'undefined') return;

  const incomeEl = document.getElementById('dash-income');
  const expenseEl = document.getElementById('dash-expense');
  const netEl = document.getElementById('dash-net');

  const recentList = document.getElementById('recent-list'); // NEW
  const ctx = document.getElementById('dashChart');

  function renderTotals() {
    const { income, expense, net } = getTotals();

    incomeEl.textContent = '₹' + income.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    expenseEl.textContent = '₹' + expense.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    netEl.textContent = '₹' + net.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  }

  function renderChart() {
    if (!ctx) return;

    const catData = expenseByCategory();
    const labels = Object.keys(catData);
    const values = labels.map(c => catData[c]);

    const chartCtx = ctx.getContext('2d');

    if (window.dashChart) {
      window.dashChart.data.labels = labels.length ? labels : ['No Data'];
      window.dashChart.data.datasets[0].data = values.length ? values : [1];
      window.dashChart.update();
      return;
    }

    window.dashChart = new Chart(chartCtx, {
      type: 'doughnut',
      data: {
        labels: labels.length ? labels : ['No data'],
        datasets: [{
          data: values.length ? values : [1],
          backgroundColor: [
            '#FF6384','#36A2EB','#FFCE56',
            '#9C27B0','#8BC34A','#FF9800','#607D8B'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  function renderRecentTransactions() {
    if (!recentList) return;

    const rows = getTransactions({ limit: 5 });

    if (rows.length === 0) {
      recentList.innerHTML = `<p class="empty">No recent transactions</p>`;
      return;
    }

    recentList.innerHTML = rows.map(t => `
      <div class="recent-item ${t.type}">
        <span>${t.date} - ${t.description || t.desc}</span>
        <strong>₹${t.amount}</strong>
      </div>
    `).join('');
  }

  function renderAll() {
    renderTotals();
    renderChart();
    renderRecentTransactions();
  }

  renderAll();
});
