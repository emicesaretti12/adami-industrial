import { useEffect } from "react";
import { useLocation } from "wouter";

/** Vuelve arriba al cambiar de página (el router SPA no lo hace solo). */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  return null;
}
