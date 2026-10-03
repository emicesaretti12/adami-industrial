import { addMonths, currentMonth } from "./dates.js";
import { icon } from "./icons.js";
import { formatMoney } from "./money.js";
import { openAccountSheet } from "./sheets/account.js";
import { exportBackup } from "./sheets/backup.js";
import { openContributeSheet, openGoalSheet } from "./sheets/goal.js";
import { openMovementSheet } from "./sheets/movement.js";
import { openMonthGoalSheet, openSettingsSheet } from "./sheets/settings.js";
import { openWelcomeSheet } from "./sheets/welcome.js";
import { getState, load, resetAll, setMeta, subscribe } from "./state.js";
import { bindActions, onChange, onClick } from "./ui/actions.js";
import { confirmSheet } from "./ui/sheet.js";
import { animateMeters, rollNumbers } from "./ui/fx.js";
import { initInstall, isStandalone, promptInstall } from "./ui/install.js";
import { applyTheme } from "./ui/theme.js";
import { goalsView } from "./views/goals.js";
import { homeView } from "./views/home.js";
import { movesView } from "./views/moves.js";
import { summaryView } from "./views/summary.js";

const views = {
  home: homeView,
  moves: movesView,
  goals: goalsView,
  summary: summaryView,
};

const TABS = [
  ["home", "Inicio", "home"],
  ["moves", "Movimientos", "list"],
  null, // el botón + va en el centro
  ["goals", "Metas", "target"],
  ["summary", "Resumen", "chart"],
];

const ui = {
  tab: "home",
  month: currentMonth(),
  filter: "all",
  account: "all",
};
const scroll = {};
const view = document.getElementById("view");
const tabbar = document.getElementById("tabbar");
let firstRender = true;

tabbar.innerHTML = TABS.map(tab =>
  tab
    ? `<button type="button" class="tab" data-act="go-tab" data-tab="${tab[0]}">${icon(tab[2], 24)}<span>${tab[1]}</span></button>`
    : `<button type="button" class="fab" data-act="new-move" aria-label="Agregar movimiento">${icon("plus", 28)}</button>`
).join("");

function render() {
  const s = getState();
  if (ui.month > currentMonth()) ui.month = currentMonth();
  const top = view.scrollTop;
  view.innerHTML = String(views[ui.tab](s, ui));
  view.scrollTop = top;

  if (firstRender) {
    firstRender = false;
    view.classList.add("enter");
    setTimeout(() => view.classList.remove("enter"), 900);
  }
  for (const tab of tabbar.querySelectorAll(".tab")) {
    if (tab.dataset.tab === ui.tab) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  }
  rollNumbers(view, cents => formatMoney(cents, s.settings.currency));
  animateMeters(view);
}

function goTab(tab) {
  if (tab === ui.tab) {
    view.scrollTo({ top: 0, behavior: "smooth" }); // tocar la pestaña activa sube al inicio
    return;
  }
  scroll[ui.tab] = view.scrollTop;
  ui.tab = tab;
  render();
  view.scrollTop = scroll[tab] ?? 0;
  view.focus({ preventScroll: true });
}

onClick("go-tab", el => goTab(el.dataset.tab));
onClick("new-move", () => openMovementSheet());
onClick("edit-move", el => openMovementSheet({ id: el.dataset.id }));
onClick("open-settings", () => openSettingsSheet());
onClick("add-account", () => openAccountSheet());
onClick("edit-account", el => openAccountSheet(el.dataset.id));
onClick("add-goal", () => openGoalSheet());
onClick("edit-goal", el => openGoalSheet(el.dataset.id));
onClick("contribute", el => openContributeSheet(el.dataset.id));
onClick("set-month-goal", () => openMonthGoalSheet());
onClick("month-prev", () => {
  ui.month = addMonths(ui.month, -1);
  render();
});
onClick("month-next", () => {
  if (ui.month >= currentMonth()) return;
  ui.month = addMonths(ui.month, 1);
  render();
});
onClick("pick-month", el => {
  ui.month = el.dataset.ym;
  render();
});
onClick("filter", el => {
  ui.filter = el.dataset.v;
  render();
});
onChange("filter-account", el => {
  ui.account = el.value;
  render();
});
onClick("dismiss-install", () => setMeta({ installDismissed: true }));
onClick("install-app", async () => {
  await promptInstall();
  render();
});
onClick("backup-now", () => exportBackup());
onClick("exit-demo", async () => {
  const ok = await confirmSheet({
    title: "¿Borrar los datos de ejemplo?",
    message:
      "Se eliminan las cuentas, movimientos y metas de ejemplo y empiezas desde cero con tus propios datos.",
    confirmLabel: "Borrar y empezar",
    danger: true,
  });
  if (!ok) return;
  resetAll();
  openWelcomeSheet();
});

// Atajos de la pantalla de inicio de Android: ./?new=expense | ./?new=income
function launchShortcut() {
  const type = new URLSearchParams(location.search).get("new");
  if (type === "expense" || type === "income") {
    history.replaceState(null, "", location.pathname);
    openMovementSheet({ type });
  }
}

const state = load();
applyTheme(state.settings.theme);
bindActions();
initInstall(render);
subscribe(render);
render();

if (!state.onboarded) openWelcomeSheet();
else launchShortcut();

// Al volver a la app (por ejemplo al día siguiente) se refresca lo que se ve.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render();
});

// Pide que el navegador no borre los datos solos (solo si ya está instalada).
if (isStandalone()) navigator.storage?.persist?.().catch(() => {});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
