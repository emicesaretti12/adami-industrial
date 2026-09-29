import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// En iOS/Android la barra del navegador cambia el alto del viewport al scrollear.
// Sin esto, ScrollTrigger recalcula todo en cada cambio y los pins "saltan".
ScrollTrigger.config({ ignoreMobileResize: true });

// Las posiciones cambian cuando terminan de cargar las fuentes (Archivo es más ancha que el fallback)
if (typeof document !== "undefined" && "fonts" in document) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export const EASE_OUT = "expo.out";
export const REDUCED = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
