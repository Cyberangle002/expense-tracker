/* notifications.js – manages notifications settings */

document.addEventListener("DOMContentLoaded", () => {

    const STORE_KEY = "trackerpro_notify_v1";

    const switches = {
        income: document.getElementById("ntIncome"),
        expense: document.getElementById("ntExpense"),
        monthly: document.getElementById("ntMonthly"),
        goal: document.getElementById("ntGoal")
    };

    const saveBtn = document.getElementById("saveNotify");
    const status = document.getElementById("notifyStatus");

    /* --------------------------------------------------------
       Load Settings
    -------------------------------------------------------- */
    function loadSettings() {
        const data = JSON.parse(localStorage.getItem(STORE_KEY)) || {};

        switches.income.checked = data.income ?? true;
        switches.expense.checked = data.expense ?? true;
        switches.monthly.checked = data.monthly ?? false;
        switches.goal.checked = data.goal ?? true;
    }

    /* --------------------------------------------------------
       Save Settings
    -------------------------------------------------------- */
    function saveSettings() {
        const settings = {
            income: switches.income.checked,
            expense: switches.expense.checked,
            monthly: switches.monthly.checked,
            goal: switches.goal.checked,
        };

        localStorage.setItem(STORE_KEY, JSON.stringify(settings));

        status.textContent = "✔ Saved Successfully";
        status.classList.add("show");

        setTimeout(() => status.classList.remove("show"), 1500);
    }

    saveBtn.addEventListener("click", saveSettings);

    loadSettings();
});
