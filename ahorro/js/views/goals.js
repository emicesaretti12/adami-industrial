import { dayLabel, monthsUntil, todayISO } from "../dates.js";
import { html } from "../dom.js";
import { icon } from "../icons.js";
import { formatMoney } from "../money.js";
import { goalProgress, totals } from "../stats.js";
import { emptyState, meter, topbar } from "./shared.js";

export function goalsView(s) {
  const cur = s.settings.currency;
  const { reserved, available } = totals(s);

  const card = g => {
    const p = goalProgress(g);
    const late = g.deadline && g.deadline < todayISO() && !p.done;
    const perMonth =
      g.deadline && !p.done && !late
        ? Math.ceil(p.remaining / monthsUntil(g.deadline))
        : 0;

    return html`<article class="card goal ${p.done ? "is-done" : ""}">
      <button type="button" class="goal-main" data-act="edit-goal" data-id="${g.id}">
        <span class="avatar avatar--lg" aria-hidden="true">${g.icon}</span>
        <span class="grow">
          <span class="row-title">${g.name}</span>
          <span class="row-sub">
            ${
              p.done
                ? "¡Meta lograda! 🎉"
                : `Faltan ${formatMoney(p.remaining, cur)}`
            }${g.deadline ? ` · ${late ? "venció el" : "para el"} ${dayLabel(g.deadline, { weekday: false })}` : ""}
          </span>
        </span>
        <b class="goal-pct">${Math.round(p.pct * 100)}%</b>
      </button>
      ${meter(p.pct, { tone: p.done ? "is-done" : "" })}
      <div class="goal-foot">
        <span class="muted small">
          <b class="amt">${formatMoney(p.saved, cur)}</b> de ${formatMoney(g.target, cur)}
        </span>
        <button type="button" class="btn btn-soft btn-sm" data-act="contribute" data-id="${g.id}">
          ${icon("plus", 18)}Aportar
        </button>
      </div>
      ${
        perMonth > 0
          ? html`<p class="hint">💡 Ahorrando ${formatMoney(perMonth, cur)} al mes llegas a tiempo.</p>`
          : ""
      }
    </article>`;
  };

  return html`
    ${topbar({ title: "Metas de ahorro" })}
    ${
      s.goals.length
        ? html`
          <p class="summary-line">
            <span><span class="label">Reservado</span> <b class="amt">${formatMoney(reserved, cur)}</b></span>
            <span><span class="label">Disponible</span> <b class="amt">${formatMoney(available, cur)}</b></span>
          </p>
          ${s.goals.map(card)}
          <button type="button" class="dashed" data-act="add-goal">
            ${icon("plus", 20)}<span>Nueva meta</span>
          </button>
        `
        : emptyState({
            emoji: "🎯",
            title: "Ponle nombre a lo que quieres lograr",
            text: "Un viaje, un fondo de emergencia, algo para ti. Ve apartando dinero y mira cómo avanza.",
            label: "Crear mi primera meta",
            act: "add-goal",
          })
    }
  `;
}
