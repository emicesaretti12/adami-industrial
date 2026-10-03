import { addMonths, currentMonth, parseISO, toISO, todayISO } from "./dates.js";
import { uid } from "./dom.js";
import { emptyState } from "./state.js";

// Equivalencia aproximada con el dólar, solo para que los datos de ejemplo
// tengan órdenes de magnitud creíbles en cada moneda.
const SCALE = {
  ARS: 900,
  BOB: 7,
  BRL: 5,
  CLP: 900,
  COP: 4000,
  CRC: 500,
  DOP: 58,
  GTQ: 8,
  MXN: 18,
  PEN: 4,
  PYG: 7500,
  UYU: 40,
};

export function buildDemo(currency) {
  const s = emptyState();
  s.settings.currency = currency;
  s.onboarded = true;
  const k = SCALE[currency] ?? 1;

  // Redondea a 2 cifras significativas y devuelve centavos.
  const c = units => {
    const v = units * k;
    const step = 10 ** Math.max(0, Math.floor(Math.log10(Math.max(v, 1))) - 1);
    return Math.round(v / step) * step * 100;
  };

  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const between = (a, b) => a + rnd() * (b - a);
  const pick = list => list[Math.floor(rnd() * list.length)];

  const cash = { id: uid(), name: "Efectivo", icon: "💵", opening: c(120) };
  const bank = { id: uid(), name: "Banco", icon: "🏦", opening: c(900) };
  const savings = { id: uid(), name: "Ahorros", icon: "🐷", opening: c(1500) };
  s.accounts.push(cash, bank, savings);

  const today = todayISO();
  const now = Date.now();
  let n = 0;
  const add = (type, date, amount, accountId, extra = {}) => {
    if (date > today) return;
    s.transactions.push({
      id: uid(),
      type,
      amount,
      accountId,
      date,
      note: "",
      createdAt: now - 1e6 + n++,
      ...extra,
    });
  };

  for (let back = 2; back >= 0; back--) {
    const ym = addMonths(currentMonth(), -back);
    const lastDay = new Date(+ym.slice(0, 4), +ym.slice(5, 7), 0).getDate();
    const day = d => `${ym}-${String(d).padStart(2, "0")}`;

    add("income", day(1), c(1400), bank.id, {
      categoryId: "sueldo",
      note: "Sueldo",
    });
    add("transfer", day(2), c(170), bank.id, { toAccountId: cash.id });
    add("transfer", day(3), c(250), bank.id, { toAccountId: savings.id });
    add("transfer", day(17), c(170), bank.id, { toAccountId: cash.id });
    add("expense", day(5), c(380), bank.id, {
      categoryId: "casa",
      note: "Alquiler",
    });
    add("expense", day(8), c(60), bank.id, {
      categoryId: "servicios",
      note: "Luz e internet",
    });
    if (back !== 1) {
      add("income", day(16), c(Math.round(between(120, 260))), bank.id, {
        categoryId: "extra",
        note: "Trabajo extra",
      });
    }

    for (let d = 1; d <= lastDay; d++) {
      if (rnd() < 0.55) {
        add("expense", day(d), c(between(4, 18)), cash.id, {
          categoryId: "comida",
          note: pick(["Almuerzo", "Café", "Panadería", "Cena", ""]),
        });
      }
      if (rnd() < 0.25) {
        add("expense", day(d), c(between(20, 60)), bank.id, {
          categoryId: "super",
        });
      }
      if (rnd() < 0.3) {
        add("expense", day(d), c(between(2, 8)), cash.id, {
          categoryId: "transporte",
          note: pick(["Colectivo", "Taxi", "Nafta", ""]),
        });
      }
      if (rnd() < 0.1) {
        add("expense", day(d), c(between(10, 30)), cash.id, {
          categoryId: "ocio",
          note: pick(["Cine", "Salida", "Libro", ""]),
        });
      }
      if (rnd() < 0.04) {
        add("expense", day(d), c(between(15, 40)), bank.id, {
          categoryId: "salud",
        });
      }
    }
  }

  const inMonths = n => {
    const d = parseISO(today);
    d.setMonth(d.getMonth() + n);
    return toISO(d);
  };
  const contribution = (monthsAgo, units) => {
    const d = parseISO(today);
    d.setMonth(d.getMonth() - monthsAgo);
    return { id: uid(), amount: c(units), date: toISO(d) };
  };

  s.goals.push(
    {
      id: uid(),
      name: "Vacaciones",
      icon: "✈️",
      target: c(1800),
      deadline: inMonths(5),
      createdAt: now - 3e6,
      contributions: [
        contribution(2, 300),
        contribution(1, 250),
        contribution(0, 200),
      ],
    },
    {
      id: uid(),
      name: "Fondo de emergencia",
      icon: "🛡️",
      target: c(3000),
      deadline: null,
      createdAt: now - 2e6,
      contributions: [contribution(2, 500), contribution(1, 400)],
    }
  );
  s.settings.monthlyGoal = c(300);
  return s;
}
