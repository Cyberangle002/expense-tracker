/* transactions.js - handles transactions page */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof getTransactions === 'undefined') return;

  const form = document.getElementById('addForm');
  const tbody = document.getElementById('tranBody');

  /* ---------------- RENDER TABLE ---------------- */
  function renderTable() {
    const rows = getTransactions({});
    tbody.innerHTML = '';

    if (rows.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="small">No transactions yet</td>
        </tr>`;
      return;
    }

    rows.forEach(r => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${r.date}</td>
        <td class="${r.type === 'income' ? 'type-income' : 'type-expense'}">${r.type}</td>
        <td>${r.description}</td>
        <td>${r.category}</td>
        <td>₹${Number(r.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td><button class="btn delete-btn" data-id="${r.id}">Delete</button></td>
      `;

      tbody.appendChild(tr);
    });
  }

  /* ---------------- ADD TRANSACTION ---------------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      type: form.type.value,
      date: form.date.value || new Date().toISOString().slice(0, 10),
      description: form.description.value.trim(),
      category: form.category.value,
      amount: parseFloat(form.amount.value)
    };

    if (!data.description || !data.amount) {
      alert("Please enter valid values");
      return;
    }

    addTransactionObj(data);

    form.reset();
    renderTable();
  });

  /* ---------------- DELETE TRANSACTION ---------------- */
  tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;

      if (confirm("Delete this transaction?")) {
        deleteTransactionById(id);
        renderTable();
      }
    }
  });

  renderTable();
});
