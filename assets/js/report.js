/* reports.js - Enhanced Report System + Safe CSV Export */

/* ---------------------- SHOW MONTHLY SUMMARY ---------------------- */
function buildMonthlySummary() {
  if (typeof monthlyTotals === 'undefined') return {};

  const months = monthlyTotals(); // uses app.js function
  return months; // { '2025-01': 1200, '2025-02': 900, ... }
}

/* ---------------------- SHOW CATEGORY SUMMARY ---------------------- */
function buildCategorySummary() {
  if (typeof expenseByCategory === 'undefined') return {};

  const cat = expenseByCategory(); // uses app.js
  return cat; // { Food: 1200, Shopping: 800, Travel: 450, ... }
}

/* ---------------------- CSV EXPORT ---------------------- */
function downloadReport() {

  if (typeof getTransactions === 'undefined')
    return alert('No data library loaded');

  const rows = getTransactions({});  
  if (rows.length === 0) return alert('No transactions to export');

  // Header Row
  const csv = [];
  csv.push(['id','date','type','description','category','amount'].join(','));

  for (const r of rows) {

    // normalize description key (desc → description)
    const description = r.description || r.desc || "";

    csv.push([
      r.id,
      r.date,
      r.type,
      `"${description.replace(/"/g, '""')}"`,   // safe CSV escape
      r.category,
      r.amount
    ].join(','));
  }

  const csvStr = csv.join('\n');
  const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'expense_report.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

/* ---------------------- RENDER REPORT SUMMARY ON PAGE (OPTIONAL) ---------------------- */
document.addEventListener("DOMContentLoaded", () => {

  // These IDs are optional. Only render if HTML contains them.
  const monthBox = document.getElementById("monthly-summary");
  const catBox = document.getElementById("category-summary");

  if (monthBox) {
    const data = buildMonthlySummary();
    monthBox.innerHTML = Object.keys(data).length
      ? Object.entries(data)
          .map(([m, v]) => `<p><strong>${m}</strong>: ₹${v}</p>`)
          .join('')
      : "<p>No data available</p>";
  }

  if (catBox) {
    const data = buildCategorySummary();
    catBox.innerHTML = Object.keys(data).length
      ? Object.entries(data)
          .map(([c, v]) => `<p><strong>${c}</strong>: ₹${v}</p>`)
          .join('')
      : "<p>No data available</p>";
  }
});
