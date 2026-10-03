import { esc } from "../dom.js";

let timer = 0;

const el = () => document.getElementById("toast");

export function hideToast() {
  clearTimeout(timer);
  el().dataset.state = "closed";
}

// Un aviso mostrado arriba (mientras había una hoja abierta) no debe quedarse
// flotando cuando la última hoja se cerró: si es solo un mensaje se oculta; si
// tiene "Deshacer" baja a su lugar de siempre para que se pueda usar.
export function settleToast() {
  const node = el();
  if (node.dataset.pos !== "top" || node.dataset.state !== "open") return;
  if (node.querySelector("button")) node.dataset.pos = "bottom";
  else hideToast();
}

// Aviso breve, con acción opcional ("Deshacer"). Si hay una hoja abierta
// aparece arriba para no tapar el teclado numérico.
export function toast(message, { action, onAction, duration } = {}) {
  const node = el();
  clearTimeout(timer);
  const sheetOpen = document.querySelector(
    '.sheet-layer:not([data-state="closing"])'
  );
  node.dataset.pos = sheetOpen ? "top" : "bottom";
  const ms = duration ?? (sheetOpen && !action ? 2600 : 5000);
  node.innerHTML = `<span class="toast-msg">${esc(message)}</span>${
    action
      ? `<button type="button" class="toast-action">${esc(action)}</button>`
      : ""
  }`;
  if (action) {
    node.querySelector("button").addEventListener(
      "click",
      () => {
        hideToast();
        onAction?.();
      },
      { once: true }
    );
  }
  if (node.dataset.state !== "open") {
    node.dataset.state = "closed";
    void node.offsetHeight;
  }
  node.dataset.state = "open";
  timer = setTimeout(hideToast, ms);
}
