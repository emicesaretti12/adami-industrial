import { useEffect, useState } from "react";

/**
 * true solo con mouse/trackpad y sin "reducir movimiento".
 * Los efectos que siguen al cursor no tienen sentido en touch
 * y no deberían correr si la persona pidió menos animación.
 */
export function useFinePointer() {
  const query = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return matches;
}
