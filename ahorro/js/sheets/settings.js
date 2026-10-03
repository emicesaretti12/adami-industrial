import { CURRENCIES } from "../data.js";
import { html } from "../dom.js";
import { icon } from "../icons.js";
import { formatMoney } from "../money.js";
import { getState, resetAll, setSettings, subscribe } from "../state.js";
import {
  canPromptInstall,
  isIOS,
  isStandalone,
  promptInstall,
} from "../ui/install.js";
import { confirmSheet, openSheet } from "../ui/sheet.js";
import { applyTheme } from "../ui/theme.js";
import { toast } from "../ui/toast.js";
import { openAmountSheet } from "./amount.js";
import { exportBackup, exportCsv, importBackup } from "./backup.js";
import { sheetTop } from "./parts.js";
import { openWelcomeSheet } from "./welcome.js";

const THEMES = [
  ["auto", "Automático"],
  ["light", "Claro"],
  ["dark", "Oscuro"],
];

export function openMonthGoalSheet() {
  const s = getState();
  openAmountSheet({
    title: "Meta de ahorro mensual",
    subtitle: "¿Cuánto quieres ahorrar cada mes?",
    initial: s.settings.monthlyGoal,
    allowZero: true,
    hint: () => "Ahorro = ingresos menos gastos del mes. Pon 0 para quitarla.",
    onSubmit: cents => {
      setSettings({ monthlyGoal: cents });
      toast(cents ? "Meta mensual guardada" : "Meta mensual quitada");
    },
  });
}

function lastBackupText(ts) {
  if (!ts) return "Nunca";
  const days = Math.floor((Date.now() - ts) / 86400e3);
  return days <= 0 ? "Hoy" : days === 1 ? "Ayer" : `Hace ${days} días`;
}

function installSection() {
  if (isStandalone()) return "";
  if (canPromptInstall()) {
    return html`
      <h3 class="section-title">Instalar</h3>
      <div class="card flat">
        <button type="button" class="setting" data-install>
          <span class="setting-k">Instalar en el teléfono</span>
          <span class="setting-v">${icon("download", 18)}</span>
        </button>
      </div>`;
  }
  return html`
    <h3 class="section-title">Instalar</h3>
    <p class="muted small">
      ${
        isIOS()
          ? "En Safari toca Compartir y elige “Agregar a pantalla de inicio”. Así la app abre a pantalla completa y tus datos quedan más seguros."
          : "Desde el menú del navegador elige “Instalar app” o “Agregar a pantalla de inicio”."
      }
    </p>`;
}

export function openSettingsSheet() {
  let unsubscribe = () => {};
  const sheet = openSheet({
    className: "sheet--tall",
    label: "Ajustes",
    onClosing: () => unsubscribe(),
    content: html`${sheetTop("Ajustes")}<div class="sheet-body" data-body></div>`,
  });
  const root = sheet.el;
  const bodyEl = root.querySelector("[data-body]");

  const body = () => {
    const s = getState();
    const cur = s.settings.currency;
    const currencyName = CURRENCIES.find(([code]) => code === cur)?.[1] ?? cur;
    return html`
      <h3 class="section-title">General</h3>
      <div class="card flat">
        <label class="setting">
          <span class="setting-k">Moneda</span>
          <span class="setting-v">${cur} · ${currencyName}${icon("chevronDown", 16)}</span>
          <select data-set="currency" aria-label="Moneda">
            ${CURRENCIES.map(
              ([code, label]) =>
                html`<option value="${code}" ${code === cur ? "selected" : ""}>${code} · ${label}</option>`
            )}
          </select>
        </label>
        <div class="setting setting--col">
          <span class="setting-k">Apariencia</span>
          <div class="seg" role="group" aria-label="Apariencia">
            ${THEMES.map(
              ([key, label]) =>
                html`<button type="button" data-theme="${key}" aria-pressed="${s.settings.theme === key}">${label}</button>`
            )}
          </div>
        </div>
        <button type="button" class="setting" data-month-goal>
          <span class="setting-k">Meta de ahorro mensual</span>
          <span class="setting-v">${s.settings.monthlyGoal ? formatMoney(s.settings.monthlyGoal, cur) : "Sin definir"}${icon("chevronRight", 16)}</span>
        </button>
      </div>
      <p class="hint">Cambiar la moneda solo cambia el símbolo; no convierte tus montos.</p>

      <h3 class="section-title">Tus datos</h3>
      <p class="muted small">
        Todo se guarda solo en este teléfono: no hay cuentas ni servidores. Guarda copias de seguridad por si cambias de teléfono o borras los datos del navegador.
      </p>
      <div class="card flat">
        <button type="button" class="setting" data-backup>
          <span class="setting-k">Guardar copia de seguridad</span>
          <span class="setting-v">${lastBackupText(s.meta.lastBackup)}${icon("share", 18)}</span>
        </button>
        <label class="setting">
          <span class="setting-k">Restaurar copia</span>
          <span class="setting-v">${icon("upload", 18)}</span>
          <input type="file" class="vh" accept=".json,application/json" data-restore />
        </label>
        <button type="button" class="setting" data-csv>
          <span class="setting-k">Exportar a Excel (CSV)</span>
          <span class="setting-v">${icon("download", 18)}</span>
        </button>
      </div>

      ${installSection()}

      <h3 class="section-title">Cuidado</h3>
      <div class="card flat">
        <button type="button" class="setting setting--danger" data-reset>
          <span class="setting-k">Borrar todos los datos</span>
          ${icon("trash", 18)}
        </button>
      </div>
      <p class="muted small center">Mi Ahorro · versión 1.0</p>
    `;
  };

  const render = () => {
    const y = bodyEl.scrollTop;
    bodyEl.innerHTML = String(body());
    bodyEl.scrollTop = y;
    if (!root.contains(document.activeElement))
      root.focus({ preventScroll: true });
  };
  unsubscribe = subscribe(render);
  render();

  root.addEventListener("click", async e => {
    if (e.target.closest("[data-close]")) return sheet.close();
    const theme = e.target.closest("button[data-theme]");
    if (theme) {
      setSettings({ theme: theme.dataset.theme });
      return applyTheme(theme.dataset.theme);
    }
    if (e.target.closest("[data-month-goal]")) return openMonthGoalSheet();
    if (e.target.closest("[data-backup]")) return exportBackup();
    if (e.target.closest("[data-csv]")) return exportCsv();
    if (e.target.closest("[data-install]")) {
      await promptInstall();
      return render();
    }
    if (e.target.closest("[data-reset]")) {
      const ok = await confirmSheet({
        title: "¿Borrar todos los datos?",
        message:
          "Se eliminarán tus cuentas, movimientos y metas de este teléfono. Si no tienes una copia de seguridad, no se pueden recuperar.",
        confirmLabel: "Borrar todo",
        danger: true,
      });
      if (!ok) return;
      resetAll();
      sheet.close();
      openWelcomeSheet();
    }
  });

  root.addEventListener("change", async e => {
    if (e.target.matches('[data-set="currency"]')) {
      setSettings({ currency: e.target.value });
    } else if (e.target.matches("[data-restore]")) {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (file && (await importBackup(file))) sheet.close();
    }
  });
}
