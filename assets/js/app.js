 
const STORAGE_KEY = 'trackerpro_v1';
let transactions = []; // global loaded transactions

// ------------------ UID ------------------
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,7);
}

// ------------------ LOAD / SAVE ------------------
function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try { 
    transactions = raw ? JSON.parse(raw) : []; 
  } catch (e) { 
    transactions = []; 
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// ------------------ ADD TRANSACTION ------------------
function addTransactionObj(obj) {
  obj.id = obj.id || uid();

  // 🔥 Normalizing category key (cat → category)
  if(obj.cat && !obj.category){
    obj.category = obj.cat;
    delete obj.cat;
  }

  transactions.push(obj);
  saveToStorage();
}

// ------------------ DELETE ------------------
function deleteTransactionById(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveToStorage();
}

// ------------------ GET TRANSACTIONS ------------------
function getTransactions({type, category, limit} = {}) {

  let list = transactions.slice()
    .sort((a,b)=> new Date(b.date) - new Date(a.date));

  if(type && type !== 'all') 
    list = list.filter(t => t.type === type);

  if(category && category !== 'all') 
    list = list.filter(t => t.category === category);

  if(limit) 
    list = list.slice(0, limit);

  return list;
}

// ------------------ TOTALS ------------------
function getTotals() {
  let income = 0, expense = 0;

  for(const t of transactions){
    if(t.type === 'income') income += Number(t.amount);
    else expense += Number(t.amount);
  }

  return { 
    income, 
    expense, 
    net: income - expense 
  };
}

// ------------------ CATEGORY WISE EXPENSE ------------------
function expenseByCategory() {
  const map = {};

  for(const t of transactions){
    if(t.type === 'expense'){
      map[t.category] = (map[t.category] || 0) + Number(t.amount);
    }
  }
  return map;
}

// ------------------ MONTH-WISE EXPENSE TOTALS (NEW) ------------------
function monthlyTotals() {
  const map = {}; // example '2025-12' → 3200

  for(const t of transactions){
    if(t.type !== 'expense') continue;

    const m = t.date.slice(0,7);

    map[m] = (map[m] || 0) + Number(t.amount);
  }

  return map;
}

// ------------------ CLEAR ALL DATA (NEW) ------------------
function clearAllData() {
  transactions = [];
  saveToStorage();
}

// ------------------ INIT ------------------
loadFromStorage();
