import { ACCOUNT_ICONS } from "../data.js";
import { html } from "../dom.js";
import {
  centsToRaw,
  currencyDigits,
  displayFromRaw,
  parseAmount,
} from "../money.js";
import {
  countAccountMoves,
  getState,
  removeAccount,
  saveAccount,
} from "../state.js";
import { balances } from "../stats.js";
import { confirmSheet, openSheet } from "../ui/sheet.js";
import { toast } from "../ui/toast.js";
import { emojiGrid, invalid, selectEmoji, sheetTop } from "./parts.js";

export function openAccountSheet(id) {
  const s = getState();
  const acc = id ? s.accounts.find(a => a.id === id) : null;
  if (id && !acc) return;
  const digits = currencyDigits(s.settings.currency);
  const balance = acc ? (balances(s).get(id) ?? 0) : 0;
  let glyph = acc?.icon ?? ACCOUNT_ICONS[0];

  const balanceText = balance
    ? (balance < 0 ? "-" : "") + displayFromRaw(centsToRaw(balance, digits))
    : "";

  const sheet = openSheet({
    className: "sheet--form",
    label: acc ? "Editar cuenta" : "Nueva cuenta",
    content: html`
      ${sheetTop(acc ? "Editar cuenta" : "Nueva cuenta")}
      <div class="sheet-body">
        <div class="field">
          <span class="field-label">Icono</span>
          ${emojiGrid(ACCOUNT_ICONS, glyph)}
        </div>
        <label class="field">
          <span class="field-label">Nombre</span>
          <input class="input" name="name" maxlength="30" autocomplete="off" placeholder="Efectivo, Banco, Tarjeta…" value="${acc?.name ?? ""}" />
        </label>
        <label class="field">
          <span class="field-label">Saldo actual</span>
          <input class="input" name="balance" inputmode="decimal" autocomplete="off" placeholder="0" value="${balanceText}" />
        </label>
      </div>
      <div class="sheet-foot stack">
        <button type="button" class="btn btn-block" data-save>Guardar</button>
        ${
          acc
            ? html`<button type="button" class="btn btn-ghost btn-danger-text" data-delete>Eliminar cuenta</button>`
            : ""
        }
      </div>
    `,
  });
  const root = sheet.el;
  const nameInput = root.querySelector('[name="name"]');
  const balanceInput = root.querySelector('[name="balance"]');

  const save = () => {
    const name = nameInput.value.trim();
    if (!name) return invalid(nameInput);
    const cents = balanceInput.value.trim()
      ? parseAmount(balanceInput.value)
      : 0;
    if (cents === null) return invalid(balanceInput);
    saveAccount({ id, name, icon: glyph, balance: cents });
    sheet.close();
    toast(acc ? "Cuenta actualizada" : "Cuenta creada");
  };

  const remove = async () => {
    const moves = countAccountMoves(id);
    const ok = await confirmSheet({
      title: `¿Eliminar "${acc.name}"?`,
      message: moves
        ? `${moves === 1 ? "También se eliminará su único movimiento." : `También se eliminarán sus ${moves} movimientos.`} Podrás deshacerlo unos segundos.`
        : "Esta cuenta no tiene movimientos.",
      confirmLabel: "Eliminar",
      danger: true,
    });
    if (!ok) return;
    const undo = removeAccount(id);
    sheet.close();
    toast("Cuenta eliminada", { action: "Deshacer", onAction: undo });
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
  });
  root.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.matches("input")) {
      e.preventDefault();
      save();
    }
  });
}
