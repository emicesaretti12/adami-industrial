import { reducedMotion } from "../dom.js";

const lastRoll = new Map();

// Cuando un total cambia entre dos pantallas, el número "rueda" hasta el nuevo
// valor en lugar de saltar. Solo ocurre al cambiar, nunca en la primera carga.
export function rollNumbers(root, format) {
  for (const el of root.querySelectorAll("[data-roll]")) {
    const key = el.dataset.roll;
    const to = Number(el.dataset.cents);
    const from = lastRoll.get(key);
    lastRoll.set(key, to);
    if (from === undefined || from === to || reducedMotion()) continue;

    const start = performance.now();
    const step = now => {
      if (!el.isConnected) return;
      const t = Math.min(1, (now - start) / 420);
      const eased = 1 - Math.pow(1 - t, 3);
      // Entre un valor y otro solo se muestran unidades enteras; el último
      // cuadro es el monto exacto.
      el.textContent = format(
        t === 1 ? to : Math.round((from + (to - from) * eased) / 100) * 100
      );
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

// Las barras nacen en 0 (`--p:0` en el HTML) y se llenan hasta `data-p`.
export function animateMeters(root) {
  const meters = [...root.querySelectorAll("[data-p]")];
  const fill = () =>
    meters.forEach(m => m.style.setProperty("--p", m.dataset.p));
  if (reducedMotion()) fill();
  else requestAnimationFrame(() => requestAnimationFrame(fill));
}

const COLORS = ["#22a876", "#eda100", "#e0643a", "#4a8df0", "#e87ba4"];

// Celebración breve al completar una meta (un evento poco frecuente).
export function confetti() {
  if (reducedMotion()) return;
  const layer = document.createElement("div");
  layer.className = "confetti";
  document.body.append(layer);
  for (let i = 0; i < 38; i++) {
    const piece = document.createElement("i");
    piece.style.background = COLORS[i % COLORS.length];
    layer.append(piece);
    const angle = ((-90 + (Math.random() - 0.5) * 110) * Math.PI) / 180;
    const dist = 200 + Math.random() * 280;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    const spin = Math.random() * 720 - 360;
    piece.animate(
      [
        { transform: "translate(-50%, 0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${spin * 0.6}deg)`,
          opacity: 1,
          offset: 0.65,
        },
        {
          transform: `translate(calc(-50% + ${x * 1.1}px), ${y + 160}px) rotate(${spin}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1300 + Math.random() * 700,
        easing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
        fill: "forwards",
      }
    );
  }
  setTimeout(() => layer.remove(), 2200);
}
