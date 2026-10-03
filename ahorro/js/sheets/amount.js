import { html } from "../dom.js";
import {
  centsToRaw,
  currencyDigits,
  currencySymbol,
  displayFromRaw,
  rawToCents,
} from "../money.js";
import { getState } from "../state.js";
import { attachPad, padMarkup } from "../ui/pad.js";
import { openSheet } from "../ui/sheet.js";
import { toast } from "../ui/toast.js";
import { pulse, sheetTop } from "./parts.js";

const amountSize = len =>
  len <= 7 ? 56 : len <= 10 ? 46 : len <= 13 ? 38 : 30;

// Hoja compacta para pedir un monto con el teclado propio. Sirve para la meta
// mensual y para aportar a (o retirar de) una meta de ahorro.
//  - segments: [[clave, etiqueta], ...] muestra un selector arriba del monto.
//  - validate(cents, segment) devuelve un texto de error o null.
//  - hint(segment) devuelve el texto de ayuda bajo el monto.
export function openAmountSheet({
  title,
  subtitle = "",
  initial = 0,
  segments = null,
  confirmLabel = "Guardar",
  allowZero = false,
  hint = () => "",
  validate = () => null,
  onSubmit,
}) {
  const cur = getState().settings.currency;
  const digits = currencyDigits(cur);
  let value = centsToRaw(initial, digits);
  let segment = segments?.[0][0] ?? null;

  const sheet = openSheet({
    className: "sheet--amount",
    label: title,
    content: html`
      ${sheetTop(title)}
      <div class="sheet-body amount-body">
        ${subtitle ? html`<p class="muted center">${subtitle}</p>` : ""}
        ${
          segments
            ? html`<div class="seg" role="group" aria-label="Acción">
              ${segments.map(
                ([key, label]) =>
                  html`<button type="button" data-seg="${key}" aria-pressed="${key === segment}">${label}</button>`
              )}
            </div>`
            : ""
        }
        <div class="mv-amount" data-type="neutral">
          <span class="mv-cur">${currencySymbol(cur)}</span>
          <span class="mv-value" aria-live="polite">0</span>
        </div>
        <p class="hint center" data-hint></p>
      </div>
      <footer class="mv-foot">${padMarkup({ digits, saveLabel: confirmLabel })}</footer>
    `,
  });
  const root = sheet.el;
  const $ = selector => root.querySelector(selector);

  const sync = () => {
    const box = $(".mv-amount");
    const display = displayFromRaw(value);
    box.classList.toggle("is-empty", !value);
    box.style.setProperty("--fs", `${amountSize(display.length)}px`);
    $(".mv-value").textContent = display;
    $("[data-hint]").textContent = hint(segment);
    const ready = allowZero || rawToCents(value) > 0;
    $('[data-key="save"]').setAttribute("aria-disabled", String(!ready));
  };

  const submit = () => {
    const cents = rawToCents(value);
    if (cents <= 0 && !allowZero) {
      pulse($(".mv-amount"), "shake");
      return;
    }
    const error = validate(cents, segment);
    if (error) {
      pulse($(".mv-amount"), "shake");
      toast(error);
      return;
    }
    navigator.vibrate?.(8);
    sheet.close();
    onSubmit(cents, segment);
  };

  attachPad(root, {
    digits,
    initial: value,
    onChange: v => {
      value = v;
      sync();
    },
    onSubmit: submit,
  });

  root.addEventListener("click", e => {
    if (e.target.closest("[data-close]")) return sheet.close();
    const seg = e.target.closest("[data-seg]");
    if (seg) {
      segment = seg.dataset.seg;
      for (const b of root.querySelectorAll("[data-seg]")) {
        b.setAttribute("aria-pressed", String(b === seg));
      }
      sync();
    }
  });

  sync();
}
