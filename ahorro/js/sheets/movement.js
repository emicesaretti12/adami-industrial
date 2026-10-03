import { CATEGORY, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../data.js";
import { relativeDay, todayISO } from "../dates.js";
import { html } from "../dom.js";
import { icon } from "../icons.js";
import {
  centsToRaw,
  currencyDigits,
  currencySymbol,
  displayFromRaw,
  rawToCents,
} from "../money.js";
import { getState, removeTransaction, saveTransaction } from "../state.js";
import { attachPad, padMarkup } from "../ui/pad.js";
import { openSheet } from "../ui/sheet.js";
import { toast } from "../ui/toast.js";
import { openAccountSheet } from "./account.js";
import { pulse } from "./parts.js";

const TYPES = [
  ["expense", "Gasto"],
  ["income", "Ingreso"],
  ["transfer", "Transferir"],
];

const SAVED = {
  expense: "Gasto guardado",
  income: "Ingreso guardado",
  transfer: "Transferencia guardada",
};

const amountSize = len =>
  len <= 7 ? 56 : len <= 10 ? 46 : len <= 13 ? 38 : 30;

// Hoja para anotar (o editar) un gasto, ingreso o transferencia. El monto se
// escribe primero, con el teclado propio; después se elige categoría y listo.
export function openMovementSheet({ id, type = "expense" } = {}) {
  const s = getState();
  if (!s.accounts.length) {
    openAccountSheet();
    toast("Primero crea una cuenta");
    return;
  }
  const editing = id ? s.transactions.find(t => t.id === id) : null;
  if (id && !editing) return;

  const cur = s.settings.currency;
  const digits = currencyDigits(cur);
  const otherThan = accountId =>
    s.accounts.find(a => a.id !== accountId)?.id ?? null;

  const lastUsed = [...s.transactions].sort(
    (a, b) => b.createdAt - a.createdAt
  )[0];
  const first =
    s.accounts.find(a => a.id === lastUsed?.accountId) ?? s.accounts[0];
  const model = editing
    ? { note: "", ...editing }
    : {
        type: type === "transfer" && s.accounts.length < 2 ? "expense" : type,
        accountId: first.id,
        toAccountId: otherThan(first.id),
        categoryId: null,
        note: "",
        date: todayISO(),
      };
  let value = editing ? centsToRaw(editing.amount, digits) : "";

  const accountLabel = accountId => {
    const a = s.accounts.find(x => x.id === accountId);
    return a ? `${a.icon} ${a.name}` : "—";
  };
  const options = selected =>
    s.accounts.map(
      a =>
        html`<option value="${a.id}" ${a.id === selected ? "selected" : ""}>${a.icon} ${a.name}</option>`
    );

  const accountChip = (
    field,
    label,
    selected
  ) => html`<label class="chip-select">
    ${label ? html`<span class="chip-k">${label}</span>` : ""}
    <span>${accountLabel(selected)}</span>${icon("chevronDown", 16)}
    <select data-field="${field}" aria-label="${label || "Cuenta"}">${options(selected)}</select>
  </label>`;

  const dateChip = () => html`<label class="chip-select">
    ${icon("calendar", 16)}<span>${relativeDay(model.date)}</span>
    <input type="date" data-field="date" value="${model.date}" max="${todayISO()}" aria-label="Fecha" />
  </label>`;

  const noteInput = () =>
    html`<input class="note-input" type="text" maxlength="80" value="${model.note}" placeholder="Nota (opcional)" enterkeyhint="done" autocomplete="off" aria-label="Nota" />`;

  const categories = () => {
    const list =
      model.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return html`<div class="cat-grid" role="radiogroup" aria-label="Categoría">
      ${list.map(
        c => html`<button type="button" class="cat" role="radio" aria-checked="${model.categoryId === c.id}" data-cat="${c.id}">
          <span class="cat-icon" aria-hidden="true">${c.icon}</span>
          <span class="cat-name">${c.name}</span>
        </button>`
      )}
    </div>`;
  };

  const bodyMarkup = () =>
    model.type === "transfer"
      ? html`
          <div class="xfer">
            ${accountChip("accountId", "Desde", model.accountId)}
            ${accountChip("toAccountId", "Hacia", model.toAccountId)}
            <button type="button" class="icon-btn" data-swap aria-label="Invertir cuentas">${icon("swapV", 20)}</button>
          </div>
          <div class="mv-row">${dateChip()}${noteInput()}</div>
        `
      : html`
          <div class="mv-row">${accountChip("accountId", "", model.accountId)}${dateChip()}</div>
          ${noteInput()}
          ${categories()}
        `;

  const headMarkup = () => html`
    <button type="button" class="icon-btn" data-close aria-label="Cerrar">${icon("x", 22)}</button>
    <div class="seg" role="group" aria-label="Tipo de movimiento">
      ${TYPES.map(
        ([key, label]) =>
          html`<button type="button" data-type="${key}" aria-pressed="${model.type === key}">${label}</button>`
      )}
    </div>
    ${
      editing
        ? html`<button type="button" class="icon-btn icon-btn--danger" data-delete aria-label="Eliminar movimiento">${icon("trash", 22)}</button>`
        : html`<span class="icon-spacer"></span>`
    }
  `;

  const sheet = openSheet({
    className: "sheet--tall mv",
    label: editing ? "Editar movimiento" : "Nuevo movimiento",
    onClosing: () => document.removeEventListener("keydown", onKey),
    content: html`
      <div class="sheet-top" data-drag>
        <span class="grabber"></span>
        <header class="sheet-head"></header>
      </div>
      <div class="mv-amount" data-type="${model.type}">
        <span class="mv-sign" aria-hidden="true"></span>
        <span class="mv-cur">${currencySymbol(cur)}</span>
        <span class="mv-value" aria-live="polite">0</span>
      </div>
      <div class="sheet-body mv-body"></div>
      <footer class="mv-foot">${padMarkup({ digits })}</footer>
    `,
  });
  const root = sheet.el;
  const $ = selector => root.querySelector(selector);

  const canSave = () =>
    rawToCents(value) > 0 &&
    (model.type === "transfer"
      ? !!model.toAccountId && model.toAccountId !== model.accountId
      : !!model.categoryId);

  const syncSave = () =>
    $('[data-key="save"]').setAttribute("aria-disabled", String(!canSave()));

  const syncAmount = () => {
    const box = $(".mv-amount");
    const display = displayFromRaw(value);
    root.dataset.type = model.type;
    box.dataset.type = model.type;
    box.classList.toggle("is-empty", !value);
    box.style.setProperty("--fs", `${amountSize(display.length)}px`);
    $(".mv-value").textContent = display;
    syncSave();
  };

  const renderHead = () => {
    $(".sheet-head").innerHTML = String(headMarkup());
  };
  const renderBody = () => {
    $(".mv-body").innerHTML = String(bodyMarkup());
    if (!root.contains(document.activeElement))
      root.focus({ preventScroll: true });
  };

  const setType = next => {
    if (next === model.type) return;
    if (next === "transfer" && s.accounts.length < 2) {
      toast("Crea otra cuenta para poder transferir");
      return;
    }
    model.type = next;
    if (next === "transfer") {
      model.categoryId = null;
      if (!model.toAccountId || model.toAccountId === model.accountId) {
        model.toAccountId = otherThan(model.accountId);
      }
    } else if (CATEGORY.get(model.categoryId)?.type !== next) {
      model.categoryId = null;
    }
    renderHead();
    renderBody();
    syncAmount();
  };

  const save = () => {
    const cents = rawToCents(value);
    if (cents <= 0) {
      pulse($(".mv-amount"), "shake");
      return;
    }
    if (model.type !== "transfer" && !model.categoryId) {
      pulse($(".cat-grid"), "nudge");
      toast("Elige una categoría");
      return;
    }
    if (model.type === "transfer" && !canSave()) {
      toast("Elige dos cuentas distintas");
      return;
    }
    const tx = {
      id: editing?.id,
      type: model.type,
      amount: cents,
      accountId: model.accountId,
      note: model.note.trim(),
      date: model.date,
    };
    if (model.type === "transfer") tx.toAccountId = model.toAccountId;
    else tx.categoryId = model.categoryId;

    const undo = saveTransaction(tx);
    navigator.vibrate?.(8);
    sheet.close();
    toast(editing ? "Movimiento actualizado" : SAVED[model.type], {
      action: "Deshacer",
      onAction: undo,
    });
  };

  const remove = () => {
    const undo = removeTransaction(editing.id);
    sheet.close();
    toast("Movimiento eliminado", { action: "Deshacer", onAction: undo });
  };

  const pad = attachPad(root, {
    digits,
    initial: value,
    onChange: v => {
      value = v;
      syncAmount();
    },
    onSubmit: save,
  });

  root.addEventListener("click", e => {
    if (e.target.matches('input[type="date"]')) {
      try {
        e.target.showPicker?.(); // en computadora el selector no abre solo
      } catch {
        // el navegador ya lo mostró
      }
      return;
    }
    const typeBtn = e.target.closest("button[data-type]");
    if (typeBtn) return setType(typeBtn.dataset.type);
    const cat = e.target.closest("[data-cat]");
    if (cat) {
      $(".note-input")?.blur(); // vuelve el teclado numérico si se estaba escribiendo la nota
      model.categoryId = cat.dataset.cat;
      for (const b of root.querySelectorAll("[data-cat]")) {
        b.setAttribute("aria-checked", String(b === cat));
      }
      return syncSave();
    }
    if (e.target.closest("[data-swap]")) {
      [model.accountId, model.toAccountId] = [
        model.toAccountId,
        model.accountId,
      ];
      renderBody();
      return syncSave();
    }
    if (e.target.closest("[data-close]")) return sheet.close();
    if (e.target.closest("[data-delete]")) return remove();
    if (e.target.closest(".mv-amount")) $(".note-input")?.blur();
  });

  root.addEventListener("change", e => {
    const field = e.target.dataset.field;
    if (!field) return;
    if (field === "date") {
      if (!e.target.value) return;
      model.date = e.target.value > todayISO() ? todayISO() : e.target.value;
    } else {
      model[field] = e.target.value;
      if (model.type === "transfer" && model.accountId === model.toAccountId) {
        // Si eligió la misma cuenta en los dos lados, la otra se corre.
        const other = otherThan(model[field]);
        if (field === "accountId") model.toAccountId = other;
        else model.accountId = other;
      }
    }
    renderBody();
    syncSave();
  });

  root.addEventListener("input", e => {
    if (e.target.matches(".note-input")) model.note = e.target.value;
  });
  // Mientras se escribe la nota el teclado del sistema reemplaza al propio.
  root.addEventListener("focusin", e => {
    if (e.target.matches(".note-input")) root.classList.add("is-typing");
  });
  root.addEventListener("focusout", e => {
    if (e.target.matches(".note-input")) root.classList.remove("is-typing");
  });
  root.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.matches(".note-input")) {
      e.preventDefault();
      e.target.blur();
    }
  });

  // Con teclado físico también se puede escribir el monto.
  function onKey(e) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest?.("input, select, textarea, button")) return;
    if (/^\d$/.test(e.key)) pad.press(e.key);
    else if (e.key === "," || e.key === ".") pad.press("sep");
    else if (e.key === "Backspace") pad.press("back");
    else if (e.key === "Enter") save();
    else return;
    e.preventDefault();
  }
  document.addEventListener("keydown", onKey);

  renderHead();
  renderBody();
  syncAmount();
}
