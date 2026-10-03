import { CATEGORY, TRANSFER_ICON } from "../data.js";
import { monthLabel, shortDay } from "../dates.js";
import { html } from "../dom.js";
import { icon } from "../icons.js";
import { formatMoney } from "../money.js";

export const accountMap = s => new Map(s.accounts.map(a => [a.id, a]));

export function topbar({ title, eyebrow = "", settings = false }) {
  return html`<header class="topbar">
    <div>
      ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ""}
      <h1 class="title">${title}</h1>
    </div>
    ${
      settings
        ? html`<button type="button" class="icon-btn" data-act="open-settings" aria-label="Ajustes">${icon("gear", 24)}</button>`
        : ""
    }
  </header>`;
}

export function txRow(t, s, accounts, { showDate = false } = {}) {
  const cur = s.settings.currency;
  const from = accounts.get(t.accountId);
  let glyph;
  let title;
  let sub;
  let amount;
  let tone = "";

  if (t.type === "transfer") {
    const to = accounts.get(t.toAccountId);
    glyph = TRANSFER_ICON;
    title = "Transferencia";
    sub = `${from?.name ?? "?"} → ${to?.name ?? "?"}`;
    amount = formatMoney(t.amount, cur);
  } else {
    const cat = CATEGORY.get(t.categoryId);
    glyph = cat?.icon ?? "✨";
    title = cat?.name ?? "Otros";
    sub = [t.note, from?.name].filter(Boolean).join(" · ");
    amount = formatMoney(t.type === "expense" ? -t.amount : t.amount, cur, {
      sign: true,
    });
    tone = t.type;
  }
  if (showDate) sub = `${shortDay(t.date)} · ${sub}`;

  return html`<li>
    <button type="button" class="row" data-act="edit-move" data-id="${t.id}">
      <span class="avatar" aria-hidden="true">${glyph}</span>
      <span class="grow">
        <span class="row-title">${title}</span>
        <span class="row-sub">${sub}</span>
      </span>
      <span class="amt ${tone}">${amount}</span>
    </button>
  </li>`;
}

// Barra de progreso. Nace en 0 y `animateMeters` la llena hasta `data-p`.
export function meter(p, { bar = false, tone = "" } = {}) {
  const v = Math.max(0, Math.min(1, p));
  return html`<div class="meter ${bar ? "meter--bar" : ""} ${tone}" role="presentation">
    <i style="--p:0" data-p="${v.toFixed(4)}"></i>
  </div>`;
}

export function monthSwitcher(ym, minYm, maxYm) {
  return html`<div class="month-switch">
    <button type="button" class="icon-btn" data-act="month-prev" aria-label="Mes anterior" ${ym <= minYm ? "disabled" : ""}>
      ${icon("chevronLeft")}
    </button>
    <h2 class="month-label">${monthLabel(ym)}</h2>
    <button type="button" class="icon-btn" data-act="month-next" aria-label="Mes siguiente" ${ym >= maxYm ? "disabled" : ""}>
      ${icon("chevronRight")}
    </button>
  </div>`;
}

export function emptyState({ emoji, title, text, label, act }) {
  return html`<div class="empty">
    <div class="empty-emoji" aria-hidden="true">${emoji}</div>
    <h3>${title}</h3>
    <p class="muted">${text}</p>
    ${
      label
        ? html`<button type="button" class="btn" data-act="${act}">${label}</button>`
        : ""
    }
  </div>`;
}
