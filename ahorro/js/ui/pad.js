import { html } from "../dom.js";
import { icon } from "../icons.js";
import { DECIMAL } from "../money.js";

const MAX_INTEGER_DIGITS = 10;

// Teclado numérico propio: 4 columnas, "Guardar" ocupa 3 filas a la derecha
// (alcance cómodo con el pulgar) y hay tecla "00" para montos grandes.
export function padMarkup({ digits, saveLabel = "Guardar" }) {
  const key = (k, label, extra = "") =>
    html`<button type="button" class="key ${extra}" data-key="${k}">${label}</button>`;
  return html`<div class="pad" role="group" aria-label="Teclado numérico">
    ${["1", "2", "3"].map(k => key(k, k))}
    <button type="button" class="key key-fn" data-key="back" aria-label="Borrar">
      ${icon("backspace", 24)}
    </button>
    ${["4", "5", "6"].map(k => key(k, k))}
    <button type="button" class="key key-save" data-key="save" aria-disabled="true">
      ${icon("check", 26)}<span>${saveLabel}</span>
    </button>
    ${["7", "8", "9"].map(k => key(k, k))}
    ${
      digits > 0
        ? html`<button type="button" class="key key-fn" data-key="sep" aria-label="Coma decimal">${DECIMAL}</button>`
        : key("00", "00")
    }
    ${key("0", "0")}
    ${digits > 0 ? key("00", "00") : key("000", "000")}
  </div>`;
}

// Conecta el teclado dentro de `root`. El valor es un texto tipo "1234.5".
export function attachPad(root, { digits, initial = "", onChange, onSubmit }) {
  let value = initial;

  const apply = next => {
    if (next === value) return;
    value = next;
    onChange(value);
  };

  const press = k => {
    if (k === "back") return apply(value.slice(0, -1));
    if (k === "sep") {
      if (digits === 0 || value.includes(".")) return;
      return apply((value || "0") + ".");
    }
    let next = value;
    for (const ch of k) {
      const [int, dec] = next.split(".");
      if (dec !== undefined) {
        if (dec.length >= digits) break;
        next += ch;
      } else {
        if (int.length >= MAX_INTEGER_DIGITS) break;
        next = int === "0" || int === "" ? ch : next + ch;
      }
    }
    apply(next);
  };

  // Mantener "borrar" apretado repite el borrado.
  let hold = null;
  const stopHold = () => {
    if (!hold) return;
    clearTimeout(hold.start);
    clearInterval(hold.repeat);
    hold = null;
  };

  // Las teclas reaccionan al apoyar el dedo (no al soltarlo) para que escribir
  // rápido no pierda toques. "Guardar" sí espera al click, que es más seguro.
  root.addEventListener("pointerdown", e => {
    const el = e.target.closest("[data-key]");
    if (!el || !root.contains(el)) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const k = el.dataset.key;
    if (k === "save") return;
    e.preventDefault();
    press(k);
    if (k === "back") {
      stopHold();
      hold = {
        start: setTimeout(() => {
          hold.repeat = setInterval(() => press("back"), 60);
        }, 420),
      };
    }
  });
  for (const type of ["pointerup", "pointercancel", "pointerleave"]) {
    root.addEventListener(type, stopHold);
  }

  root.addEventListener("click", e => {
    const el = e.target.closest("[data-key]");
    if (!el || !root.contains(el)) return;
    const k = el.dataset.key;
    if (k === "save") onSubmit();
    else if (e.detail === 0) press(k); // teclado físico o lector de pantalla
  });

  return {
    press,
    get value() {
      return value;
    },
    set value(next) {
      value = next;
      onChange(value);
    },
  };
}
