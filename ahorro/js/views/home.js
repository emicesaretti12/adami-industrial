import { currentMonth, daysLeftInMonth, monthName } from "../dates.js";
import { html, plural } from "../dom.js";
import { icon } from "../icons.js";
import { formatMoney, formatShort } from "../money.js";
import { isStorageOK } from "../state.js";
import {
  goalProgress,
  monthStats,
  sortTransactions,
  totals,
} from "../stats.js";
import { canPromptInstall, isIOS, isStandalone } from "../ui/install.js";
import { accountMap, emptyState, meter, topbar, txRow } from "./shared.js";

const DAY = 86400e3;

function heroClass(text) {
  const n = text.length;
  return n <= 9 ? "" : n <= 12 ? "is-md" : n <= 15 ? "is-sm" : "is-xs";
}

// Un solo aviso a la vez, el más importante primero.
function notice(s) {
  if (!isStorageOK()) {
    return html`<div class="notice notice--warn" role="alert">
      <span>Este navegador no permite guardar datos. Lo que anotes se perderá al cerrar.</span>
    </div>`;
  }
  if (s.meta.demo) {
    return html`<div class="notice">
      <span>Estás viendo datos de ejemplo.</span>
      <button type="button" class="btn btn-sm" data-act="exit-demo">
        Empezar con los míos
      </button>
    </div>`;
  }
  const moves = s.transactions.length;
  if (!isStandalone() && !s.meta.installDismissed && moves >= 2) {
    if (canPromptInstall()) {
      return html`<div class="notice">
        <span>Instala la app en tu teléfono para abrirla con un toque.</span>
        <button type="button" class="btn btn-sm" data-act="install-app">Instalar</button>
        <button type="button" class="icon-btn icon-btn--sm" data-act="dismiss-install" aria-label="Ocultar">${icon("x", 18)}</button>
      </div>`;
    }
    if (isIOS()) {
      return html`<div class="notice">
        <span>Para que tus datos estén seguros, toca <b>Compartir</b> y luego <b>Agregar a pantalla de inicio</b>.</span>
        <button type="button" class="icon-btn icon-btn--sm" data-act="dismiss-install" aria-label="Ocultar">${icon("x", 18)}</button>
      </div>`;
    }
  }
  if (moves >= 15 && Date.now() - s.meta.lastBackup > 30 * DAY) {
    return html`<div class="notice">
      <span>Guarda una copia de seguridad de tus datos.</span>
      <button type="button" class="btn btn-sm" data-act="backup-now">Guardar</button>
    </div>`;
  }
  return "";
}

export function homeView(s) {
  const cur = s.settings.currency;
  const { total, reserved, available, byAccount } = totals(s);
  const ym = currentMonth();
  const ms = monthStats(s, ym);
  const accounts = accountMap(s);
  const recent = sortTransactions(s.transactions).slice(0, 5);
  const totalText = formatMoney(total, cur);
  const goal = s.settings.monthlyGoal;
  const saved = Math.max(0, ms.net);
  const netTone = ms.net > 0 ? "income" : ms.net < 0 ? "expense" : "";

  const monthGoal =
    goal > 0
      ? html`<div class="goal-line">
          <div class="goal-line-top">
            <span class="label">Meta de ahorro del mes</span>
            <b class="amt">${Math.round(Math.min(1, saved / goal) * 100)}%</b>
          </div>
          ${meter(saved / goal)}
          <p class="muted small">
            ${formatShort(saved, cur)} de ${formatShort(goal, cur)} ·
            ${
              saved >= goal
                ? "¡meta lograda! 🎉"
                : `quedan ${plural(daysLeftInMonth(), "día", "días")}`
            }
          </p>
        </div>`
      : html`<button type="button" class="dashed" data-act="set-month-goal">
          ${icon("target", 20)}<span>Definir meta mensual</span>
        </button>`;

  return html`
    ${topbar({ title: "Mi dinero", eyebrow: monthName(ym), settings: true })}
    ${notice(s)}

    <section class="hero" aria-label="Dinero total">
      <p class="hero-label">Dinero total</p>
      <p class="hero-amount ${heroClass(totalText)}" data-roll="total" data-cents="${total}">${totalText}</p>
      ${
        reserved > 0
          ? html`<div class="pills">
            <span class="pill">Disponible <b>${formatShort(available, cur)}</b></span>
            <span class="pill">🎯 En metas <b>${formatShort(reserved, cur)}</b></span>
          </div>`
          : html`<p class="hero-note">Suma de todas tus cuentas</p>`
      }
    </section>

    <section class="card">
      <div class="card-head"><h2>Este mes</h2></div>
      <div class="tiles">
        <div class="tile">
          <span class="label">Ingresos</span>
          <b class="amt income">${formatShort(ms.income, cur, { sign: true }, 9)}</b>
        </div>
        <div class="tile">
          <span class="label">Gastos</span>
          <b class="amt expense">${formatShort(-ms.expense, cur, { sign: ms.expense > 0 }, 9)}</b>
        </div>
        <div class="tile">
          <span class="label">Ahorro</span>
          <b class="amt ${netTone}">${formatShort(ms.net, cur, { sign: true }, 9)}</b>
        </div>
      </div>
      ${monthGoal}
    </section>

    ${
      s.goals.length
        ? html`<section class="card">
          <div class="card-head">
            <h2>Metas</h2>
            <button type="button" class="link" data-act="go-tab" data-tab="goals">Ver todas</button>
          </div>
          <ul class="list">
            ${s.goals.slice(0, 2).map(g => {
              const p = goalProgress(g);
              return html`<li>
                <button type="button" class="row" data-act="go-tab" data-tab="goals">
                  <span class="avatar" aria-hidden="true">${g.icon}</span>
                  <span class="grow">
                    <span class="row-title">${g.name}</span>
                    ${meter(p.pct)}
                  </span>
                  <span class="amt">${Math.round(p.pct * 100)}%</span>
                </button>
              </li>`;
            })}
          </ul>
        </section>`
        : ""
    }

    <section class="card">
      <div class="card-head">
        <h2>Cuentas</h2>
        <button type="button" class="link" data-act="add-account">+ Agregar</button>
      </div>
      ${
        s.accounts.length
          ? html`<ul class="list">
            ${s.accounts.map(
              a => html`<li>
                <button type="button" class="row" data-act="edit-account" data-id="${a.id}">
                  <span class="avatar" aria-hidden="true">${a.icon}</span>
                  <span class="grow"><span class="row-title">${a.name}</span></span>
                  <span class="amt ${(byAccount.get(a.id) ?? 0) < 0 ? "expense" : ""}">${formatMoney(byAccount.get(a.id) ?? 0, cur)}</span>
                  <span class="chev" aria-hidden="true">${icon("chevronRight", 18)}</span>
                </button>
              </li>`
            )}
          </ul>`
          : emptyState({
              emoji: "🏦",
              title: "Aún no tienes cuentas",
              text: "Agrega tu efectivo, tu banco o lo que uses.",
              label: "Agregar cuenta",
              act: "add-account",
            })
      }
    </section>

    <section class="card">
      <div class="card-head">
        <h2>Últimos movimientos</h2>
        ${
          recent.length
            ? html`<button type="button" class="link" data-act="go-tab" data-tab="moves">Ver todo</button>`
            : ""
        }
      </div>
      ${
        recent.length
          ? html`<ul class="list">${recent.map(t => txRow(t, s, accounts, { showDate: true }))}</ul>`
          : emptyState({
              emoji: "🌱",
              title: "Aquí aparecerán tus movimientos",
              text: "Anota tu primer gasto o ingreso con el botón +.",
              label: "Agregar el primero",
              act: "new-move",
            })
      }
    </section>
  `;
}
