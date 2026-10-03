import { currentMonth, monthName, relativeDay } from "../dates.js";
import { html } from "../dom.js";
import { icon } from "../icons.js";
import { formatShort } from "../money.js";
import { earliestMonth, monthStats, sortTransactions } from "../stats.js";
import {
  accountMap,
  emptyState,
  monthSwitcher,
  topbar,
  txRow,
} from "./shared.js";

const FILTERS = [
  ["all", "Todo"],
  ["expense", "Gastos"],
  ["income", "Ingresos"],
  ["transfer", "Transferencias"],
];

export function movesView(s, ui) {
  const cur = s.settings.currency;
  const nowYm = currentMonth();
  const minYm = earliestMonth(s) ?? nowYm;
  const ym = ui.month;
  const accounts = accountMap(s);
  const stats = monthStats(s, ym);
  const accountFilter = accounts.has(ui.account) ? ui.account : "all";

  let list = sortTransactions(
    s.transactions.filter(t => t.date.startsWith(ym))
  );
  if (ui.filter !== "all") list = list.filter(t => t.type === ui.filter);
  if (accountFilter !== "all") {
    list = list.filter(
      t => t.accountId === accountFilter || t.toAccountId === accountFilter
    );
  }

  const groups = [];
  for (const t of list) {
    const last = groups[groups.length - 1];
    if (last?.date === t.date) last.items.push(t);
    else groups.push({ date: t.date, items: [t] });
  }

  const net = items =>
    items.reduce(
      (sum, t) =>
        t.type === "income"
          ? sum + t.amount
          : t.type === "expense"
            ? sum - t.amount
            : sum,
      0
    );

  return html`
    ${topbar({ title: "Movimientos" })}
    ${monthSwitcher(ym, minYm, nowYm)}

    <p class="summary-line">
      <span><span class="label">Ingresos</span> <b class="amt income">${formatShort(stats.income, cur, { sign: stats.income > 0 })}</b></span>
      <span><span class="label">Gastos</span> <b class="amt expense">${formatShort(-stats.expense, cur, { sign: stats.expense > 0 })}</b></span>
    </p>

    <div class="chips" role="group" aria-label="Filtrar">
      ${FILTERS.map(
        ([value, label]) =>
          html`<button type="button" class="chip" data-act="filter" data-v="${value}" aria-pressed="${ui.filter === value}">${label}</button>`
      )}
      ${
        s.accounts.length > 1
          ? html`<label class="chip chip-select ${accountFilter !== "all" ? "is-active" : ""}">
            <span>${accountFilter === "all" ? "Todas las cuentas" : accounts.get(accountFilter).name}</span>
            ${icon("chevronDown", 16)}
            <select data-change="filter-account" aria-label="Filtrar por cuenta">
              <option value="all" ${accountFilter === "all" ? "selected" : ""}>Todas las cuentas</option>
              ${s.accounts.map(
                a =>
                  html`<option value="${a.id}" ${a.id === accountFilter ? "selected" : ""}>${a.icon} ${a.name}</option>`
              )}
            </select>
          </label>`
          : ""
      }
    </div>

    ${
      groups.length
        ? groups.map(g => {
            const dayNet = net(g.items);
            return html`<section class="group">
            <h3 class="group-head">
              <span>${relativeDay(g.date)}</span>
              ${
                dayNet !== 0
                  ? html`<span class="amt ${dayNet > 0 ? "income" : "expense"}">${formatShort(dayNet, cur, { sign: true })}</span>`
                  : ""
              }
            </h3>
            <ul class="list card">${g.items.map(t => txRow(t, s, accounts))}</ul>
          </section>`;
          })
        : emptyState({
            emoji: "🗒️",
            title:
              stats.count === 0
                ? `Sin movimientos en ${monthName(ym)}`
                : "Nada con ese filtro",
            text:
              stats.count === 0
                ? "Cuando anotes gastos o ingresos aparecerán aquí."
                : "Prueba con otro filtro o con otra cuenta.",
            label:
              ym === nowYm && stats.count === 0 ? "Agregar movimiento" : "",
            act: "new-move",
          })
    }
  `;
}
