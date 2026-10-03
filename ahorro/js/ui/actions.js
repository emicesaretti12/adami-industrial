// Delegación de eventos: los elementos declaran `data-act="nombre"` y la app
// registra una función por nombre. Así sirve igual para la pantalla y las hojas.

const clicks = new Map();
const changes = new Map();

export const onClick = (name, fn) => clicks.set(name, fn);
export const onChange = (name, fn) => changes.set(name, fn);

export function bindActions() {
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-act]");
    if (!el || el.disabled) return;
    clicks.get(el.dataset.act)?.(el, e);
  });
  document.addEventListener("change", e => {
    const el = e.target.closest("[data-change]");
    if (el) changes.get(el.dataset.change)?.(el, e);
  });
}
