import { CATEGORY } from "../data.js";
import { currentMonth, monthName, monthShort } from "../dates.js";
import { html } from "../dom.js";
import { formatMoney, formatShort } from "../money.js";
import { earliestMonth, lastMonths, monthStats } from "../stats.js";
import { emptyState, meter, monthSwitcher, topbar } from "./shared.js";

// Geometría de las columnas (px): espacio arriba para la etiqueta del valor,
// zona de dibujo y espacio abajo por si el mes terminó en negativo.
const TOP = 26;
const DRAW = 96;
const BOTTOM = 24; // solo si algún mes quedó en negativo

function trend(s, ui) {
  const cur = s.settings.currency;
  const months = lastMonths(s, currentMonth(), 6);
  const maxPos = Math.max(0, ...months.map(m => m.net));
  const maxNeg = Math.max(0, ...months.map(m => -m.net));
  const span = maxPos + maxNeg || 1;
  const zero = TOP + DRAW * (maxPos / span);
  const bottom = maxNeg > 0 ? BOTTOM : 6;

  return html`<div class="trend" role="group" aria-label="Ahorro de los últimos 6 meses">
    <div class="trend-plot">
      <span class="trend-zero" style="top:${zero}px"></span>
      ${months.map((m, i) => {
        const h =
          m.net === 0 ? 0 : Math.max(3, (Math.abs(m.net) / span) * DRAW);
        const positive = m.net >= 0;
        const picked = m.ym === ui.month;
        const label = `${monthName(m.ym)}: ${m.net >= 0 ? "ahorraste" : "gastaste de más"} ${formatMoney(Math.abs(m.net), cur)}`;
        return html`<button type="button" class="col ${picked ? "is-picked" : ""}" data-act="pick-month" data-ym="${m.ym}" aria-pressed="${picked}" aria-label="${label}">
          <span class="col-plot" style="height:${TOP + DRAW + bottom}px">
            ${
              h
                ? html`<i class="col-bar ${positive ? "pos" : "neg"}" style="top:${positive ? zero - h : zero}px;height:${h}px"></i>`
                : ""
            }
            ${
              picked && m.net !== 0
                ? html`<span class="col-cap ${i === 0 ? "is-first" : i === months.length - 1 ? "is-last" : ""}" style="top:${positive ? Math.max(0, zero - h - 20) : zero + h + 4}px">${formatShort(m.net, cur, { sign: true, compact: true })}</span>`
                : ""
            }
          </span>
          <span class="col-month">${monthShort(m.ym)}</span>
        </button>`;
      })}
    </div>
    <p class="legend">
      <span><i class="key-dot pos"></i>Ahorraste</span>
      <span><i class="key-dot neg"></i>Gastaste de más</span>
    </p>
  </div>`;
}

export function summaryView(s, ui) {
  const cur = s.settings.currency;
  const nowYm = currentMonth();
  const minYm = earliestMonth(s) ?? nowYm;
  const ym = ui.month;
  const ms = monthStats(s, ym);
  const top = ms.categories[0]?.cents ?? 0;
  const tone = ms.net > 0 ? "income" : ms.net < 0 ? "expense" : "";
  const netText = formatMoney(ms.net, cur);

  return html`
    ${topbar({ title: "Resumen" })}
    ${monthSwitcher(ym, minYm, nowYm)}

    <section class="card summary-hero">
      <p class="label">${ms.net >= 0 ? "Ahorro del mes" : "Gastaste de más este mes"}</p>
      <p class="big-amount amt ${tone}">${ms.net >= 0 ? netText : formatMoney(-ms.net, cur)}</p>
      <div class="tiles">
        <div class="tile"><span class="label">Ingresos</span><b class="amt income">${formatShort(ms.income, cur, {}, 9)}</b></div>
        <div class="tile"><span class="label">Gastos</span><b class="amt expense">${formatShort(ms.expense, cur, {}, 9)}</b></div>
        <div class="tile">
          <span class="label">% ahorrado</span>
          <b class="amt">${ms.rate === null ? "—" : `${Math.round(ms.rate * 100)}%`}</b>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-head"><h2>Gastos por categoría</h2></div>
      ${
        ms.categories.length
          ? html`<ul class="bars">
            ${ms.categories.map(c => {
              const cat = CATEGORY.get(c.id);
              return html`<li class="bar-row">
                <div class="bar-top">
                  <span class="bar-name"><span aria-hidden="true">${cat?.icon ?? "✨"}</span>${cat?.name ?? "Otros"}</span>
                  <span class="bar-val"><b class="amt">${formatShort(c.cents, cur)}</b><span class="muted">${Math.round(c.share * 100)}%</span></span>
                </div>
                ${meter(c.cents / top, { bar: true, tone: "is-expense" })}
              </li>`;
            })}
          </ul>`
          : emptyState({
              emoji: "📊",
              title: "Sin gastos este mes",
              text: "Cuando anotes gastos verás aquí en qué se va tu dinero.",
            })
      }
    </section>

    <section class="card">
      <div class="card-head"><h2>Últimos 6 meses</h2><span class="muted small">Toca un mes</span></div>
      ${trend(s, ui)}
    </section>
  `;
}
