import { useEffect, useRef } from "react";

/**
 * Marca el elemento con data-visible la primera vez que entra en pantalla.
 * Sin re-render: escribe el atributo directo en el DOM y la animación la hace CSS
 * (.rv-up, .rv-line, .rv-clip, .rv-rule en index.css).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -12% 0px",
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-visible", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "");
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
