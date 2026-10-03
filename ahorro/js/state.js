import { CATEGORY, CURRENCIES } from "./data.js";
import { isISO, todayISO } from "./dates.js";
import { uid } from "./dom.js";
import { detectCurrency } from "./money.js";
import { balances } from "./stats.js";

const KEY = "mi-ahorro:v1";
const LIMIT = 1e13; // centavos: sobra de margen sin perder precisión

let state = emptyState();
let storageOK = true;
const listeners = new Set();

export function emptyState() {
  return {
    v: 1,
    onboarded: false,
    settings: { currency: detectCurrency(), theme: "auto", monthlyGoal: 0 },
    accounts: [],
    transactions: [],
    goals: [],
    meta: { createdAt: Date.now(), lastBackup: 0, installDismissed: false },
  };
}

export const getState = () => state;
export const isStorageOK = () => storageOK;
export const STORAGE_KEY = KEY;

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const emit = () => listeners.forEach(fn => fn(state));

// Si la app está abierta en dos pestañas, la que no guardó se actualiza sola.
window.addEventListener("storage", e => {
  if (e.key !== KEY || !e.newValue) return;
  try {
    const next = sanitize(JSON.parse(e.newValue));
    if (next) {
      state = next;
      emit();
    }
  } catch {
    // dato ilegible: se conserva lo que hay en pantalla
  }
});

// --- Validación: se usa al leer el disco y al importar una copia ------------

const int = v => (Number.isFinite(v) ? Math.round(v) : 0);
const money = v => Math.max(-LIMIT, Math.min(LIMIT, int(v)));
const text = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = v => (Array.isArray(v) ? v : []);

export function sanitize(input) {
  if (!input || typeof input !== "object") return null;
  const out = emptyState();

  const settings = input.settings ?? {};
  if (CURRENCIES.some(([code]) => code === settings.currency)) {
    out.settings.currency = settings.currency;
  }
  if (["auto", "light", "dark"].includes(settings.theme)) {
    out.settings.theme = settings.theme;
  }
  out.settings.monthlyGoal = Math.max(0, money(settings.monthlyGoal));
  out.onboarded = input.onboarded === true;

  const meta = input.meta ?? {};
  out.meta.createdAt = int(meta.createdAt) || out.meta.createdAt;
  out.meta.lastBackup = Math.max(0, int(meta.lastBackup));
  out.meta.installDismissed = meta.installDismissed === true;

  const accountIds = new Set();
  for (const a of list(input.accounts).slice(0, 100)) {
    const id = text(a?.id, 64);
    if (!id || accountIds.has(id)) continue;
    accountIds.add(id);
    out.accounts.push({
      id,
      name: text(a.name, 40) || "Cuenta",
      icon: text(a.icon, 8) || "💵",
      opening: money(a.opening),
    });
  }

  const txIds = new Set();
  for (const t of list(input.transactions).slice(0, 100000)) {
    if (!t || typeof t !== "object") continue;
    if (!["expense", "income", "transfer"].includes(t.type)) continue;
    const amount = Math.abs(money(t.amount));
    const accountId = text(t.accountId, 64);
    if (amount < 1 || !accountIds.has(accountId) || !isISO(t.date)) continue;

    const tx = {
      id: text(t.id, 64),
      type: t.type,
      amount,
      accountId,
      note: text(t.note, 80),
      date: t.date,
      createdAt: int(t.createdAt),
    };
    if (!tx.id || txIds.has(tx.id)) tx.id = uid();
    txIds.add(tx.id);

    if (t.type === "transfer") {
      const to = text(t.toAccountId, 64);
      if (!accountIds.has(to) || to === accountId) continue;
      tx.toAccountId = to;
    } else {
      const cat = CATEGORY.get(t.categoryId);
      tx.categoryId =
        cat?.type === t.type
          ? cat.id
          : t.type === "expense"
            ? "otros-g"
            : "otros-i";
    }
    out.transactions.push(tx);
  }

  const goalIds = new Set();
  for (const g of list(input.goals).slice(0, 100)) {
    const id = text(g?.id, 64);
    const target = Math.abs(money(g?.target));
    if (!id || goalIds.has(id) || target < 1) continue;
    goalIds.add(id);
    out.goals.push({
      id,
      name: text(g.name, 40) || "Meta",
      icon: text(g.icon, 8) || "🎯",
      target,
      deadline: isISO(g.deadline) ? g.deadline : null,
      createdAt: int(g.createdAt),
      contributions: list(g.contributions)
        .slice(0, 5000)
        .filter(c => c && int(c.amount) !== 0 && isISO(c.date))
        .map(c => ({
          id: text(c.id, 64) || uid(),
          amount: money(c.amount),
          date: c.date,
        })),
    });
  }
  return out;
}

// --- Persistencia ------------------------------------------------------------

function probe() {
  try {
    localStorage.setItem(`${KEY}:probe`, "1");
    localStorage.removeItem(`${KEY}:probe`);
    return true;
  } catch {
    return false;
  }
}

export function load() {
  let stored = null;
  try {
    stored = localStorage.getItem(KEY);
    const parsed = stored ? sanitize(JSON.parse(stored)) : null;
    if (parsed) state = parsed;
  } catch {
    // Datos ilegibles: se guarda una copia aparte antes de empezar de cero.
    try {
      if (stored) localStorage.setItem(`${KEY}:corrupt`, stored);
    } catch {
      // sin espacio o bloqueado
    }
  }
  storageOK = probe();
  return state;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    storageOK = true;
  } catch {
    storageOK = false;
  }
}

// Aplica un cambio, lo guarda y avisa a la pantalla. Devuelve una función que
// lo deshace (para el botón "Deshacer" de los avisos).
export function update(mutator) {
  const before = JSON.stringify(state);
  mutator(state);
  persist();
  emit();
  return () => restore(before);
}

export function restore(json) {
  const next = sanitize(JSON.parse(json));
  if (!next) return;
  state = next;
  persist();
  emit();
}

export function replaceAll(next) {
  state = next;
  persist();
  emit();
}

// --- Operaciones -------------------------------------------------------------

export function saveAccount({ id, name, icon, balance }) {
  return update(s => {
    const acc = id ? s.accounts.find(a => a.id === id) : null;
    if (acc) {
      const current = balances(s).get(id) ?? 0;
      acc.name = name;
      acc.icon = icon;
      acc.opening += balance - current; // el saldo mostrado pasa a ser `balance`
    } else {
      s.accounts.push({ id: uid(), name, icon, opening: balance });
    }
  });
}

export function countAccountMoves(id) {
  return state.transactions.filter(
    t => t.accountId === id || t.toAccountId === id
  ).length;
}

export function removeAccount(id) {
  return update(s => {
    s.accounts = s.accounts.filter(a => a.id !== id);
    s.transactions = s.transactions.filter(
      t => t.accountId !== id && t.toAccountId !== id
    );
  });
}

export function saveTransaction(tx) {
  return update(s => {
    const i = tx.id ? s.transactions.findIndex(t => t.id === tx.id) : -1;
    if (i >= 0) {
      const old = s.transactions[i];
      s.transactions[i] = { ...tx, id: old.id, createdAt: old.createdAt };
    } else {
      s.transactions.push({ ...tx, id: uid(), createdAt: Date.now() });
    }
  });
}

export function removeTransaction(id) {
  return update(s => {
    s.transactions = s.transactions.filter(t => t.id !== id);
  });
}

export function saveGoal({ id, name, icon, target, deadline }) {
  return update(s => {
    const goal = id ? s.goals.find(g => g.id === id) : null;
    if (goal) Object.assign(goal, { name, icon, target, deadline });
    else {
      s.goals.push({
        id: uid(),
        name,
        icon,
        target,
        deadline,
        createdAt: Date.now(),
        contributions: [],
      });
    }
  });
}

export function removeGoal(id) {
  return update(s => {
    s.goals = s.goals.filter(g => g.id !== id);
  });
}

// `cents` > 0 aporta a la meta; < 0 retira.
export function addContribution(goalId, cents) {
  return update(s => {
    const goal = s.goals.find(g => g.id === goalId);
    goal?.contributions.push({ id: uid(), amount: cents, date: todayISO() });
  });
}

export function setSettings(patch) {
  return update(s => Object.assign(s.settings, patch));
}

export function setMeta(patch) {
  return update(s => Object.assign(s.meta, patch));
}

export function finishOnboarding({ currency, name, icon, balance }) {
  return update(s => {
    s.settings.currency = currency;
    s.onboarded = true;
    s.accounts.push({ id: uid(), name, icon, opening: balance });
  });
}

// "Borrar todo": conserva moneda y apariencia, vuelve a mostrar la bienvenida.
export function resetAll() {
  const next = emptyState();
  next.settings.currency = state.settings.currency;
  next.settings.theme = state.settings.theme;
  replaceAll(next);
}
