import { addMonths } from "./dates.js";

// Saldo de cada cuenta: saldo inicial + ingresos − gastos ± transferencias.
export function balances(s) {
  const map = new Map(s.accounts.map(a => [a.id, a.opening]));
  const add = (id, cents) => map.set(id, (map.get(id) ?? 0) + cents);
  for (const t of s.transactions) {
    if (t.type === "income") add(t.accountId, t.amount);
    else if (t.type === "expense") add(t.accountId, -t.amount);
    else {
      add(t.accountId, -t.amount);
      add(t.toAccountId, t.amount);
    }
  }
  return map;
}

export function goalSaved(goal) {
  const sum = goal.contributions.reduce((acc, c) => acc + c.amount, 0);
  return Math.max(0, sum);
}

export function goalProgress(goal) {
  const saved = goalSaved(goal);
  return {
    saved,
    pct: goal.target > 0 ? Math.min(1, saved / goal.target) : 0,
    remaining: Math.max(0, goal.target - saved),
    done: goal.target > 0 && saved >= goal.target,
  };
}

// Total = suma de cuentas. Lo reservado en metas no se gasta: disponible es
// lo que queda libre.
export function totals(s) {
  const byAccount = balances(s);
  let total = 0;
  for (const v of byAccount.values()) total += v;
  const reserved = s.goals.reduce((acc, g) => acc + goalSaved(g), 0);
  return { total, reserved, available: total - reserved, byAccount };
}

export function sortTransactions(list) {
  return [...list].sort((a, b) =>
    a.date === b.date ? b.createdAt - a.createdAt : a.date < b.date ? 1 : -1
  );
}

// Las transferencias entre cuentas no son ingresos ni gastos.
export function monthStats(s, ym) {
  let income = 0;
  let expense = 0;
  let count = 0;
  const byCategory = new Map();
  for (const t of s.transactions) {
    if (!t.date.startsWith(ym)) continue;
    count++;
    if (t.type === "income") income += t.amount;
    else if (t.type === "expense") {
      expense += t.amount;
      byCategory.set(
        t.categoryId,
        (byCategory.get(t.categoryId) ?? 0) + t.amount
      );
    }
  }
  const categories = [...byCategory]
    .map(([id, cents]) => ({ id, cents, share: expense ? cents / expense : 0 }))
    .sort((a, b) => b.cents - a.cents);
  return {
    income,
    expense,
    net: income - expense,
    count,
    categories,
    rate: income > 0 ? (income - expense) / income : null,
  };
}

export function lastMonths(s, endYm, n = 6) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const ym = addMonths(endYm, -i);
    out.push({ ym, ...monthStats(s, ym) });
  }
  return out;
}

export function earliestMonth(s) {
  let min = null;
  for (const t of s.transactions) if (!min || t.date < min) min = t.date;
  return min ? min.slice(0, 7) : null;
}
