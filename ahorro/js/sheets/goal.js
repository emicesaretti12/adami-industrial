import { GOAL_ICONS } from "../data.js";
import { todayISO } from "../dates.js";
import { html } from "../dom.js";
import {
  centsToRaw,
  currencyDigits,
  displayFromRaw,
  formatMoney,
  parseAmount,
} from "../money.js";
import { addContribution, getState, removeGoal, saveGoal } from "../state.js";
import { goalProgress, totals } from "../stats.js";
import { confetti } from "../ui/fx.js";
import { confirmSheet, openSheet } from "../ui/sheet.js";
import { toast } from "../ui/toast.js";
import { openAmountSheet } from "./amount.js";
import { emojiGrid, invalid, selectEmoji, sheetTop } from "./parts.js";

export function openGoalSheet(id) {
  const s = getState();
  const goal = id ? s.goals.find(g => g.id === id) : null;
  if (id && !goal) return;
  const digits = currencyDigits(s.settings.currency);
  let glyph = goal?.icon ?? GOAL_ICONS[0];
  let deadline = goal?.deadline ?? "";

  const sheet = openSheet({
    className: "sheet--form",
    label: goal ? "Editar meta" : "Nueva meta",
    content: html`
      ${sheetTop(goal ? "Editar meta" : "Nueva meta")}
      <div class="sheet-body">
        <div class="field">
          <span class="field-label">Icono</span>
          ${emojiGrid(GOAL_ICONS, glyph)}
        </div>
        <label class="field">
          <span class="field-label">¿Para qué ahorras?</span>
          <input class="input" name="name" maxlength="40" autocomplete="off" placeholder="Vacaciones, notebook, fondo de emergencia…" value="${goal?.name ?? ""}" />
        </label>
        <label class="field">
          <span class="field-label">¿Cuánto necesitas?</span>
          <input class="input" name="target" inputmode="decimal" autocomplete="off" placeholder="0" value="${goal ? displayFromRaw(centsToRaw(goal.target, digits)) : ""}" />
        </label>
        <div class="field">
          <span class="field-label field-label--row">
            <span>Fecha límite (opcional)</span>
            <button type="button" class="link" data-clear-date ${deadline ? "" : "hidden"}>Quitar</button>
          </span>
          <input class="input" type="date" name="deadline" min="${todayISO()}" value="${deadline}" />
        </div>
      </div>
      <div class="sheet-foot stack">
        <button type="button" class="btn btn-block" data-save>Guardar</button>
        ${
          goal
            ? html`<button type="button" class="btn btn-ghost btn-danger-text" data-delete>Eliminar meta</button>`
            : ""
        }
      </div>
    `,
  });
  const root = sheet.el;
  const nameInput = root.querySelector('[name="name"]');
  const targetInput = root.querySelector('[name="target"]');
  const dateInput = root.querySelector('[name="deadline"]');
  const clearBtn = root.querySelector("[data-clear-date]");

  const save = () => {
    const name = nameInput.value.trim();
    if (!name) return invalid(nameInput);
    const target = parseAmount(targetInput.value);
    if (!target || target <= 0) return invalid(targetInput);
    saveGoal({ id, name, icon: glyph, target, deadline: deadline || null });
    sheet.close();
    toast(goal ? "Meta actualizada" : "Meta creada");
  };

  const remove = async () => {
    const saved = goalProgress(goal).saved;
    const ok = await confirmSheet({
      title: `¿Eliminar "${goal.name}"?`,
      message: saved
        ? `Los ${formatMoney(saved, s.settings.currency)} reservados vuelven a tu dinero disponible.`
        : "",
      confirmLabel: "Eliminar",
      danger: true,
    });
    if (!ok) return;
    const undo = removeGoal(id);
    sheet.close();
    toast("Meta eliminada", { action: "Deshacer", onAction: undo });
  };

  root.addEventListener("click", e => {
    const emoji = e.target.closest("[data-emoji]");
    if (emoji) {
      glyph = emoji.dataset.emoji;
      return selectEmoji(root, glyph);
    }
    if (e.target.closest("[data-close]")) return sheet.close();
    if (e.target.closest("[data-save]")) return save();
    if (e.target.closest("[data-delete]")) return remove();
    if (e.target.closest("[data-clear-date]")) {
      dateInput.value = "";
      deadline = "";
      clearBtn.hidden = true;
    }
  });
  dateInput.addEventListener("input", () => {
    deadline = dateInput.value;
    clearBtn.hidden = !deadline;
  });
  root.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.matches("input")) {
      e.preventDefault();
      save();
    }
  });
}

// Aportar a una meta (o retirar). Es un reparto interno: el dinero sigue en tus
// cuentas, pero deja de contar como disponible.
export function openContributeSheet(goalId) {
  const s = getState();
  const goal = s.goals.find(g => g.id === goalId);
  if (!goal) return;
  const cur = s.settings.currency;

  openAmountSheet({
    title: `${goal.icon} ${goal.name}`,
    subtitle: `Llevas ${formatMoney(goalProgress(goal).saved, cur)} de ${formatMoney(goal.target, cur)}`,
    segments: [
      ["add", "Aportar"],
      ["take", "Retirar"],
    ],
    confirmLabel: "Listo",
    hint: segment => {
      const now = getState();
      const g = now.goals.find(x => x.id === goalId);
      return segment === "add"
        ? `Disponible para apartar: ${formatMoney(totals(now).available, cur)}`
        : `Guardado en la meta: ${formatMoney(goalProgress(g).saved, cur)}`;
    },
    validate: (cents, segment) => {
      const now = getState();
      const g = now.goals.find(x => x.id === goalId);
      if (segment === "add" && cents > totals(now).available) {
        return "No tienes tanto disponible";
      }
      if (segment === "take" && cents > goalProgress(g).saved) {
        return "La meta no tiene tanto guardado";
      }
      return null;
    },
    onSubmit: (cents, segment) => {
      const before = goalProgress(goal);
      const undo = addContribution(goalId, segment === "add" ? cents : -cents);
      const after = goalProgress(getState().goals.find(g => g.id === goalId));
      if (!before.done && after.done) {
        confetti();
        toast(`¡Meta lograda! ${goal.icon}`, {
          action: "Deshacer",
          onAction: undo,
        });
      } else {
        toast(segment === "add" ? "Aporte guardado" : "Retiro guardado", {
          action: "Deshacer",
          onAction: undo,
        });
      }
    },
  });
}
