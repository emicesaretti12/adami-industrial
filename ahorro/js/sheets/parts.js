import { html } from "../dom.js";
import { icon } from "../icons.js";

// Cabecera común: asa para arrastrar + título + botón de cerrar. Todo el bloque
// es la zona de arrastre (los botones siguen funcionando).
export function sheetTop(title) {
  return html`<div class="sheet-top" data-drag>
    <span class="grabber"></span>
    <header class="sheet-head">
      <span class="icon-spacer"></span>
      <h2 class="sheet-title">${title}</h2>
      <button type="button" class="icon-btn" data-close aria-label="Cerrar">${icon("x", 22)}</button>
    </header>
  </div>`;
}

export function emojiGrid(list, selected) {
  return html`<div class="emoji-grid" role="radiogroup" aria-label="Icono">
    ${list.map(
      e =>
        html`<button type="button" role="radio" aria-checked="${e === selected}" data-emoji="${e}">${e}</button>`
    )}
  </div>`;
}

export function selectEmoji(root, value) {
  for (const b of root.querySelectorAll("[data-emoji]")) {
    b.setAttribute("aria-checked", String(b.dataset.emoji === value));
  }
}

// Marca un campo como inválido y le pone el foco.
export function invalid(input) {
  input.setAttribute("aria-invalid", "true");
  input.focus();
  input.addEventListener("input", () => input.removeAttribute("aria-invalid"), {
    once: true,
  });
}

export function pulse(el, className) {
  if (!el) return;
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
  el.addEventListener("animationend", () => el.classList.remove(className), {
    once: true,
  });
}
