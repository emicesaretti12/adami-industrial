// Los montos se guardan como enteros en centavos (1250 = 12,50) para no
// arrastrar errores de coma flotante al sumar.

const REGION_CURRENCY = {
  AR: "ARS",
  BO: "BOB",
  BR: "BRL",
  CL: "CLP",
  CO: "COP",
  CR: "CRC",
  DO: "DOP",
  EC: "USD",
  ES: "EUR",
  GT: "GTQ",
  MX: "MXN",
  PA: "USD",
  PE: "PEN",
  PY: "PYG",
  SV: "USD",
  US: "USD",
  UY: "UYU",
};

const ZONE_CURRENCY = [
  ["America/Argentina", "ARS"],
  ["America/Buenos_Aires", "ARS"],
  ["America/La_Paz", "BOB"],
  ["America/Sao_Paulo", "BRL"],
  ["America/Santiago", "CLP"],
  ["America/Bogota", "COP"],
  ["America/Costa_Rica", "CRC"],
  ["America/Santo_Domingo", "DOP"],
  ["Europe/", "EUR"],
  ["America/Guatemala", "GTQ"],
  ["America/Mexico_City", "MXN"],
  ["America/Lima", "PEN"],
  ["America/Asuncion", "PYG"],
  ["America/Montevideo", "UYU"],
];

function languages() {
  const list = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  return list.filter(Boolean);
}

// La app está en español: los números siguen las reglas del español del
// dispositivo (coma o punto decimal) y, si no hay, las del español general.
export const LOCALE = languages().find(l => /^es/i.test(l)) ?? "es";

const sample = new Intl.NumberFormat(LOCALE).formatToParts(1234567.5);
export const GROUP = sample.find(p => p.type === "group")?.value ?? ".";
export const DECIMAL = sample.find(p => p.type === "decimal")?.value ?? ",";

export function detectCurrency() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const byZone = ZONE_CURRENCY.find(([prefix]) => zone.startsWith(prefix));
    if (byZone) return byZone[1];
  } catch {
    // sin información de huso horario
  }
  for (const lang of languages()) {
    const region = lang.split("-")[1]?.toUpperCase();
    if (REGION_CURRENCY[region]) return REGION_CURRENCY[region];
  }
  return "USD";
}

const formatters = new Map();

function formatter(currency, options) {
  const key = currency + JSON.stringify(options);
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat(LOCALE, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      ...options,
    });
    formatters.set(key, f);
  }
  return f;
}

// Decimales que se escriben con el teclado: 0 para monedas sin centavos.
export function currencyDigits(currency) {
  try {
    return formatter(currency, {}).resolvedOptions().maximumFractionDigits === 0
      ? 0
      : 2;
  } catch {
    return 2;
  }
}

export function currencySymbol(currency) {
  const part = formatter(currency, {})
    .formatToParts(0)
    .find(p => p.type === "currency");
  return part?.value ?? currency;
}

export function formatMoney(
  cents,
  currency,
  { sign = false, compact = false } = {}
) {
  const abs = Math.abs(cents);
  let text;
  if (compact) {
    text = formatter(currency, {
      notation: "compact",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(abs / 100);
  } else {
    const digits = abs % 100 === 0 ? 0 : 2;
    text = formatter(currency, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(abs / 100);
  }
  const prefix = cents < 0 ? "−" : sign && cents > 0 ? "+" : "";
  return prefix + text;
}

// Versión que pasa a formato compacto ("$1,2 M") si el monto completo no entra
// en `limit` caracteres (por ejemplo, en una tarjeta angosta).
export function formatShort(cents, currency, options = {}, limit = 11) {
  const full = formatMoney(cents, currency, options);
  return full.length <= limit
    ? full
    : formatMoney(cents, currency, { ...options, compact: true });
}

// --- Teclado numérico: el valor en edición es un texto como "1234.5" -------

export function displayFromRaw(value) {
  const [int = "", dec] = value.split(".");
  const grouped = (int || "0").replace(/\B(?=(\d{3})+(?!\d))/g, GROUP);
  return dec === undefined ? grouped : grouped + DECIMAL + dec;
}

export function rawToCents(value) {
  if (!value) return 0;
  const [int, dec = ""] = value.split(".");
  return Number(int || "0") * 100 + Number((dec + "00").slice(0, 2));
}

export function centsToRaw(cents, digits = 2) {
  const abs = Math.abs(cents);
  if (abs === 0) return "";
  const int = Math.floor(abs / 100);
  const dec = String(abs % 100)
    .padStart(2, "0")
    .replace(/0+$/, "");
  return digits > 0 && dec ? `${int}.${dec}` : String(int);
}

// --- Campos de texto: acepta "1.234,56", "1,234.56", "$ 1200", "12,5" -------
// Si el último separador tiene 1 o 2 dígitos detrás es decimal; si tiene 3 o
// más (o ninguno) es de miles. Devuelve centavos o null si no es un número.
export function parseAmount(text) {
  if (text == null) return null;
  let s = String(text)
    .trim()
    .replace(/[^\d.,-]/g, "");
  if (!/\d/.test(s)) return null;
  const negative = s.startsWith("-");
  s = s.replace(/-/g, "");
  const last = Math.max(s.lastIndexOf("."), s.lastIndexOf(","));
  let int = s;
  let dec = "";
  if (last >= 0) {
    const after = s.length - last - 1;
    if (after >= 1 && after <= 2) {
      int = s.slice(0, last);
      dec = s.slice(last + 1);
    }
  }
  int = int.replace(/[.,]/g, "");
  if (int.length > 11) return null;
  const cents = Number(int || "0") * 100 + Number((dec + "00").slice(0, 2));
  return negative ? -cents : cents;
}
