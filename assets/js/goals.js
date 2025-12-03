/* goals.js - Savings Goals Manager */

const GOALS_KEY = "trackerpro_goals_v1";
let goals = [];

/* ---------------- Load Goals ---------------- */
(function loadGoals() {
  const raw = localStorage.getItem(GOALS_KEY);
  goals = raw ? JSON.parse(raw) : [];
  renderGoals();
})();

/* ---------------- Save Goals ---------------- */
function saveGoals() {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

/* ---------------- Add Goal ---------------- */
function addGoal() {
  const name = document.getElementById("goalName").value.trim();
  const amount = Number(document.getElementById("goalAmount").value);
  const saved = Number(document.getElementById("goalSaved").value);

  if (!name || amount <= 0) {
    alert("Please enter valid data.");
    return;
  }

  goals.push({
    id: Date.now(),
    name,
    amount,
    saved
  });

  saveGoals();
  renderGoals();

  document.getElementById("goalName").value = "";
  document.getElementById("goalAmount").value = "";
  document.getElementById("goalSaved").value = "";
}

/* ---------------- Delete Goal ---------------- */
function deleteGoal(id) {
  goals = goals.filter(g => g.id !== id);
  saveGoals();
  renderGoals();
}

/* ---------------- Render Goal Cards ---------------- */
function renderGoals() {
  const box = document.getElementById("goalsList");
  box.innerHTML = "";

  if (goals.length === 0) {
    box.innerHTML = `<p class="small">No goals added yet</p>`;
    return;
  }

  goals.forEach(g => {
    const percent = Math.min((g.saved / g.amount) * 100, 100).toFixed(0);

    const div = document.createElement("div");
    div.className = "goal-card glass";

    div.innerHTML = `
      <h3>${g.name}</h3>
      <p>Target: ₹${g.amount}</p>
      <p>Saved: ₹${g.saved}</p>

      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%;"></div>
      </div>

      <p class="percent-text">${percent}% Completed</p>

      <button class="btn danger-btn" onclick="deleteGoal(${g.id})">Delete</button>
    `;

    box.appendChild(div);
  });
}
