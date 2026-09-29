import { useEffect, useRef, useState } from "react";
import type { ClosingGearsScene } from "./closing/createClosingGears";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

/**
 * Tren de engranajes 3D del cierre de página: decorativo, engrana de verdad y se acelera con el scroll.
 * - Se descarga y se crea recién cuando entra en pantalla; solo dibuja mientras se ve.
 * - Reduced motion: un cuadro estático. Sin WebGL: no se muestra nada (el cierre funciona igual).
 */
export default function ClosingGears() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasWebGL()) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: ClosingGearsScene | null = null;
    let loading = false;
    let cancelled = false;
    let visible = false;

    const io = new IntersectionObserver(
      async ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !scene && !loading) {
          loading = true;
          try {
            const { createClosingGears } = await import("./closing/createClosingGears");
            if (cancelled) return;
            const s = await createClosingGears(canvas, {
              coarse: window.matchMedia("(pointer: coarse)").matches,
              getScroll: () => window.scrollY / window.innerHeight,
            });
            if (cancelled) {
              s.dispose();
              return;
            }
            scene = s;
            setReady(true);
            if (reduce) s.renderStatic();
          } catch (err) {
            console.warn("Engranajes 3D del cierre no disponibles", err);
          }
        }
        if (scene && !reduce) (visible ? scene.start() : scene.stop());
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(canvas);

    return () => {
      cancelled = true;
      io.disconnect();
      scene?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 right-0 h-full w-full opacity-0 transition-opacity duration-1000 md:w-[58%] ${
        ready ? "opacity-30 md:opacity-100" : ""
      }`}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 34%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 34%)",
      }}
    />
  );
}
