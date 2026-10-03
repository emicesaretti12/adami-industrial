import { CURRENCIES } from "../data.js";
import { html } from "../dom.js";
import { icon } from "../icons.js";
import { parseAmount } from "../money.js";
import { buildDemo } from "../demo.js";
import { finishOnboarding, getState, replaceAll } from "../state.js";
import { openSheet } from "../ui/sheet.js";
import { toast } from "../ui/toast.js";
import { invalid } from "./parts.js";

const label = code => {
  const name = CURRENCIES.find(([c]) => c === code)?.[1] ?? "";
  return `${code} · ${name}`;
};

// Primera vez: moneda y primera cuenta. No se cierra sin completarla.
export function openWelcomeSheet() {
  let currency = getState().settings.currency;

  const sheet = openSheet({
    className: "sheet--form",
    label: "Bienvenida",
    dismissible: false,
    content: html`
      <div class="sheet-top"><span class="grabber"></span></div>
      <div class="sheet-body welcome">
        <div class="welcome-emoji" aria-hidden="true">🌱</div>
        <h2 class="sheet-title sheet-title--lg">Bienvenido a Mi Ahorro</h2>
        <p class="muted center">
          Anota lo que entra y lo que sale, mira cuánto te queda y aparta dinero para tus metas. Todo queda guardado solo en este teléfono.
        </p>
        <div class="field">
          <span class="field-label">Moneda</span>
          <label class="input select-field">
            <span data-currency-label>${label(currency)}</span>${icon("chevronDown", 18)}
            <select data-currency aria-label="Moneda">
              ${CURRENCIES.map(
                ([code]) =>
                  html`<option value="${code}" ${code === currency ? "selected" : ""}>${label(code)}</option>`
              )}
            </select>
          </label>
        </div>
        <label class="field">
          <span class="field-label">Tu primera cuenta</span>
          <input class="input" name="name" maxlength="30" autocomplete="off" value="Efectivo" />
        </label>
        <label class="field">
          <span class="field-label">¿Cuánto dinero hay en ella ahora?</span>
          <input class="input" name="balance" inputmode="decimal" autocomplete="off" placeholder="0" />
        </label>
      </div>
      <div class="sheet-foot stack">
        <button type="button" class="btn btn-block" data-start>Empezar</button>
        <button type="button" class="btn btn-ghost" data-demo>Probar con datos de ejemplo</button>
      </div>
    `,
  });
  const root = sheet.el;
  const nameInput = root.querySelector('[name="name"]');
  const balanceInput = root.querySelector('[name="balance"]');

  const start = () => {
    const name = nameInput.value.trim();
    if (!name) return invalid(nameInput);
    const balance = balanceInput.value.trim()
      ? parseAmount(balanceInput.value)
      : 0;
    if (balance === null) return invalid(balanceInput);
    finishOnboarding({ currency, name, icon: "💵", balance });
    sheet.close();
    toast("Listo. Anota tu primer gasto con el botón +");
  };

  root.addEventListener("change", e => {
    if (!e.target.matches("[data-currency]")) return;
    currency = e.target.value;
    root.querySelector("[data-currency-label]").textContent = label(currency);
  });
  root.addEventListener("click", e => {
    if (e.target.closest("[data-start]")) return start();
    if (e.target.closest("[data-demo]")) {
      replaceAll(buildDemo(currency));
      sheet.close();
      toast("Datos de ejemplo cargados. Bórralos en Ajustes cuando quieras.");
    }
  });
  root.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.matches("input")) {
      e.preventDefault();
      start();
    }
  });
}
