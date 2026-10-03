import { esc, html, reducedMotion } from "../dom.js";
import { hideToast, settleToast } from "./toast.js";

// Hojas inferiores (bottom sheets). Cada una agrega una entrada al historial
// para que el botón "atrás" de Android las cierre en lugar de salir de la app.

const stack = [];
let seq = 0;

// Las operaciones sobre el historial (agregar la entrada de una hoja, quitarla
// con "atrás") se hacen de a una y en orden. history.back() es asíncrono: si
// una hoja nueva agregara su entrada antes de que termine, se la "comería" y
// el botón "atrás" saldría de la app.
const ops = [];
let inFlight = null; // espera del popstate que provoca nuestro propio back()

function pump() {
  if (inFlight) return;
  const op = ops.shift();
  if (!op) return;
  if (op.push) {
    try {
      history.pushState({ sheet: op.push.id }, "");
      op.push.pushed = true;
    } catch {
      // Sin acceso al historial (iframe, navegador restringido): la hoja
      // funciona igual, solo que "atrás" no la cierra.
    }
    pump();
    return;
  }
  if (!op.back.pushed) {
    pump(); // su entrada nunca se agregó: no hay nada que quitar
    return;
  }
  op.back.pushed = false;
  inFlight = setTimeout(() => {
    inFlight = null; // por si el navegador no avisa
    pump();
  }, 1500);
  try {
    history.back();
  } catch {
    clearTimeout(inFlight);
    inFlight = null;
    pump();
  }
}

const pushEntry = entry => {
  ops.push({ push: entry });
  pump();
};
const popEntry = entry => {
  ops.push({ back: entry });
  pump();
};

const topOpen = () => [...stack].reverse().find(e => !e.closing);

function updateInert() {
  const open = stack.filter(e => !e.closing);
  document.getElementById("app").inert = open.length > 0;
  const top = open[open.length - 1];
  for (const e of stack) e.layer.inert = e !== top;
}

export function hasOpenSheet() {
  return stack.some(e => !e.closing);
}

export function openSheet({
  content,
  className = "",
  label = "",
  dismissible = true,
  onClosing,
  onClose,
} = {}) {
  const layer = document.createElement("div");
  layer.className = "sheet-layer";
  layer.dataset.state = "closed";
  layer.innerHTML = `<div class="scrim"></div><section class="sheet ${esc(className)}" role="dialog" aria-modal="true" aria-label="${esc(label)}" tabindex="-1">${content}</section>`;

  const entry = {
    id: ++seq,
    layer,
    sheet: layer.querySelector(".sheet"),
    scrim: layer.querySelector(".scrim"),
    dismissible,
    onClosing,
    onClose,
    opener: document.activeElement,
    closing: false,
  };
  stack.push(entry);
  hideToast(); // un "Deshacer" viejo no debe quedar activo debajo de la hoja
  document.getElementById("sheets").append(layer);
  pushEntry(entry);
  updateInert();

  void layer.offsetHeight; // fija el estado inicial antes de animar la entrada
  layer.dataset.state = "open";
  entry.sheet.focus({ preventScroll: true });

  if (dismissible) {
    entry.scrim.addEventListener("click", () => close(entry));
    wireDrag(entry);
  }

  return {
    el: entry.sheet,
    close: () => close(entry),
    get closing() {
      return entry.closing;
    },
  };
}

function close(entry) {
  if (entry.closing) return;
  popEntry(entry);
  finish(entry);
}

function finish(entry) {
  if (entry.closing) return;
  entry.closing = true;
  entry.onClosing?.();
  entry.layer.dataset.state = "closing";
  updateInert();
  setTimeout(
    () => {
      entry.layer.remove();
      const i = stack.indexOf(entry);
      if (i >= 0) stack.splice(i, 1);
      updateInert();
      if (!hasOpenSheet()) settleToast();
      if (entry.opener?.isConnected)
        entry.opener.focus?.({ preventScroll: true });
      entry.onClose?.();
    },
    reducedMotion() ? 140 : 300
  );
}

// Escape cierra la hoja de arriba, esté donde esté el foco.
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  const top = topOpen();
  if (top?.dismissible) {
    e.preventDefault();
    close(top);
  }
});

window.addEventListener("popstate", () => {
  if (inFlight) {
    // Es la respuesta a nuestro propio history.back().
    clearTimeout(inFlight);
    inFlight = null;
    pump();
    return;
  }
  const top = topOpen();
  if (!top) return;
  if (!top.dismissible) {
    pushEntry(top); // la bienvenida no se cierra con "atrás"
    return;
  }
  top.pushed = false; // el usuario ya quitó su entrada con "atrás"
  finish(top);
});

// Arrastrar la cabecera hacia abajo cierra la hoja. Se cierra por distancia o
// por velocidad: un gesto rápido corto alcanza. Hacia arriba hay fricción.
function wireDrag(entry) {
  const { sheet, scrim } = entry;
  const handle = sheet.querySelector("[data-drag]");
  if (!handle) return;
  let pointer = null;
  let startY = 0;
  let startT = 0;
  let dy = 0;

  handle.addEventListener("pointerdown", e => {
    if (pointer !== null || (e.pointerType === "mouse" && e.button !== 0))
      return;
    if (e.target.closest("button, a, input, select, textarea, label")) return;
    pointer = e.pointerId;
    startY = e.clientY;
    startT = performance.now();
    dy = 0;
    handle.setPointerCapture(pointer);
    sheet.style.transition = "none";
    scrim.style.transition = "none";
  });

  handle.addEventListener("pointermove", e => {
    if (e.pointerId !== pointer) return;
    const delta = e.clientY - startY;
    dy = delta < 0 ? -Math.pow(-delta, 0.6) : delta;
    sheet.style.transform = `translateY(${dy}px)`;
    scrim.style.opacity = String(
      Math.max(0, 1 - Math.max(0, dy) / sheet.offsetHeight)
    );
  });

  const end = e => {
    if (e.pointerId !== pointer) return;
    pointer = null;
    const velocity = dy / Math.max(1, performance.now() - startT);
    const dismiss =
      dy > sheet.offsetHeight * 0.35 || (dy > 24 && velocity > 0.11);
    sheet.style.transition = "";
    scrim.style.transition = "";
    sheet.style.transform = "";
    scrim.style.opacity = "";
    if (dismiss) close(entry);
  };
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
}

// Diálogo de confirmación como hoja compacta. Devuelve una promesa booleana.
export function confirmSheet({
  title,
  message = "",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = false,
}) {
  return new Promise(resolve => {
    const sheet = openSheet({
      className: "sheet--compact",
      label: title,
      onClose: () => resolve(false),
      content: html`
        <div class="sheet-top" data-drag><span class="grabber"></span></div>
        <div class="sheet-body">
          <h2 class="sheet-title">${title}</h2>
          ${message ? html`<p class="muted">${message}</p>` : ""}
        </div>
        <div class="sheet-foot stack">
          <button type="button" class="btn ${danger ? "btn-danger" : ""}" data-yes>
            ${confirmLabel}
          </button>
          <button type="button" class="btn btn-ghost" data-no>${cancelLabel}</button>
        </div>
      `,
    });
    sheet.el.querySelector("[data-yes]").addEventListener("click", () => {
      resolve(true);
      sheet.close();
    });
    sheet.el.querySelector("[data-no]").addEventListener("click", () => {
      sheet.close();
    });
  });
}
