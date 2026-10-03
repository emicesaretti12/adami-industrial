// Plantillas HTML con escape automático: todo lo que se interpola se escapa,
// salvo el resultado de otra plantilla html`` o de raw().

class Safe {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const esc = value =>
  String(value ?? "").replace(/[&<>"']/g, c => ENTITIES[c]);

export const raw = value => new Safe(String(value));

function part(value) {
  if (value instanceof Safe) return value.value;
  if (Array.isArray(value)) return value.map(part).join("");
  if (value === false || value == null) return "";
  return esc(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) {
    out += part(values[i]) + strings[i + 1];
  }
  return new Safe(out);
}

export const $ = (selector, root = document) => root.querySelector(selector);

export const $$ = (selector, root = document) => [
  ...root.querySelectorAll(selector),
];

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
