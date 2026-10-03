// Fechas locales como texto "AAAA-MM-DD". Nunca se usa new Date("AAAA-MM-DD"):
// eso se interpreta en UTC y corre el día en husos horarios negativos.

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const DAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

const pad = n => String(n).padStart(2, "0");
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

export const toISO = d =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayISO = () => toISO(new Date());

export function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isISO(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    toISO(parseISO(value)) === value
  );
}

export const monthKey = iso => iso.slice(0, 7);
export const currentMonth = () => monthKey(todayISO());

export function addMonths(ym, n) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

export const monthName = ym => cap(MONTHS[Number(ym.slice(5, 7)) - 1]);
export const monthLabel = ym => `${monthName(ym)} ${ym.slice(0, 4)}`;
export const monthShort = ym => MONTHS[Number(ym.slice(5, 7)) - 1].slice(0, 3);

export function dayLabel(iso, { weekday = true } = {}) {
  const d = parseISO(iso);
  const year =
    d.getFullYear() === new Date().getFullYear() ? "" : ` ${d.getFullYear()}`;
  const base = `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}${year}`;
  return weekday ? `${cap(DAYS[d.getDay()])} ${base}` : base;
}

export function relativeDay(iso) {
  const today = new Date();
  if (iso === toISO(today)) return "Hoy";
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  if (iso === toISO(yesterday)) return "Ayer";
  return dayLabel(iso);
}

// "Hoy", "Ayer" o "1 oct": para listas donde el lugar es poco.
export function shortDay(iso) {
  const rel = relativeDay(iso);
  return rel === "Hoy" || rel === "Ayer"
    ? rel
    : dayLabel(iso, { weekday: false });
}

export function daysLeftInMonth() {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return last - now.getDate();
}

// Meses que faltan hasta una fecha, redondeando hacia arriba (mínimo 1).
export function monthsUntil(iso) {
  const days = (parseISO(iso) - parseISO(todayISO())) / 86400000;
  return Math.max(1, Math.ceil(days / 30.44));
}
