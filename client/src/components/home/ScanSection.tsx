import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";
import type { ScanScene } from "./scan/createScanScene";

const FALLBACK_IMG =
  "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto,c_limit,w_1400/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png";

const STAGES = [
  {
    name: "Diseño",
    text: "Modelamos cada pieza en 3D y CAD-CAM, y previsualizamos su funcionamiento y sus fallas posibles antes de fabricar.",
  },
  {
    name: "Fabricación",
    text: "Mecanizado de precisión con equipos de última tecnología y mesas rotativas de 4 y 5 ejes.",
  },
  {
    name: "Medición",
    text: "El Brazo FARO Platinum y el Laser Tracker FARO capturan la geometría real; PolyWorks la compara contra el diseño.",
  },
];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * La historia de una pieza en tres estados, contada con una escena 3D que avanza con el scroll.
 * - Three.js se descarga recién cuando la sección está por aparecer (chunk aparte).
 * - La escena solo dibuja mientras está en pantalla; fuera de pantalla no consume nada.
 * - La sección se sostiene con position: sticky (nativo, fluido en touch), no con pin de JS.
 * - Reduced motion: altura normal, un solo cuadro final y los tres pasos listados.
 * - Sin WebGL: foto real de medición láser.
 */
export default function ScanSection() {
  const outerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ScanScene | null>(null);
  const progressRef = useRef(0);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [webgl] = useState(hasWebGL);
  const [ready, setReady] = useState(false);

  // Carga diferida de Three.js y creación de la escena
  useEffect(() => {
    const outer = outerRef.current;
    const canvas = canvasRef.current;
    if (!outer || !canvas || !webgl) return;
    let cancelled = false;
    let visibilityIO: IntersectionObserver | null = null;

    const loadIO = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        loadIO.disconnect();
        const { createScanScene } = await import("./scan/createScanScene");
        if (cancelled) return;
        const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 640;
        let scene: ScanScene;
        try {
          scene = createScanScene(canvas, { lowPower });
        } catch {
          return;
        }
        sceneRef.current = scene;
        setReady(true);

        if (reduce) {
          scene.renderStatic(1);
          return;
        }
        // La escena puede terminar de cargar después del último scroll: arranca en el progreso actual
        scene.renderStatic(progressRef.current);
        visibilityIO = new IntersectionObserver(([e]) => (e.isIntersecting ? scene.start() : scene.stop()));
        visibilityIO.observe(canvas);
        ScrollTrigger.refresh();
      },
      { rootMargin: "100% 0px" },
    );
    loadIO.observe(outer);

    return () => {
      cancelled = true;
      loadIO.disconnect();
      visibilityIO?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [reduce, webgl]);

  // Progreso del scroll → escena + textos
  useGSAP(
    () => {
      if (reduce) return;
      const st = ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progressRef.current = self.progress;
          sceneRef.current?.setProgress(self.progress);
        },
        onRefresh: (self) => {
          progressRef.current = self.progress;
          sceneRef.current?.setProgress(self.progress);
        },
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.05 },
        scrollTrigger: { trigger: outerRef.current, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });
      tl.fromTo("[data-rail]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0)
        .to("[data-stage='0']", { autoAlpha: 0, y: -16 }, 0.27)
        .fromTo("[data-stage='1']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.31)
        .to("[data-stage='1']", { autoAlpha: 0, y: -16 }, 0.57)
        .fromTo("[data-stage='2']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.61)
        .fromTo("[data-legend]", { autoAlpha: 0 }, { autoAlpha: 1 }, 0.72)
        .to("[data-tick='0']", { color: "rgba(255,255,255,0.4)" }, 0.29)
        .fromTo("[data-tick='1']", { color: "rgba(255,255,255,0.4)" }, { color: "#ffffff" }, 0.29)
        .to("[data-tick='1']", { color: "rgba(255,255,255,0.4)" }, 0.59)
        .fromTo("[data-tick='2']", { color: "rgba(255,255,255,0.4)" }, { color: "#ffffff" }, 0.59);

      return () => st.kill();
    },
    { scope: outerRef, dependencies: [reduce] },
  );

  const showFallback = !webgl;

  return (
    <section
      ref={outerRef}
      className={`relative z-10 bg-[#0c1a29] text-white ${reduce ? "" : "h-[320svh]"}`}
      aria-label="Diseño, fabricación y medición de una pieza"
    >
      <div className={`${reduce ? "" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        {/* Retícula de fondo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #8fb0d4 1px, transparent 1px), linear-gradient(to bottom, #8fb0d4 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative container mx-auto px-6 h-full grid grid-rows-[auto_1fr_auto] lg:grid-rows-1 lg:grid-cols-12 gap-4 lg:gap-10 pt-20 pb-20 lg:py-0">
          {/* Texto */}
          <div className="row-start-1 lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:self-center">
            <SplitHeading
              lines={["Medimos lo", "que fabricamos."]}
              className="type-display text-white text-[clamp(2.1rem,5.4vw,4.75rem)]"
            />
          </div>

          {/* Canvas */}
          <div className="relative row-start-2 lg:col-start-6 lg:col-span-7 lg:row-start-1 lg:h-full min-h-0">
            {showFallback ? (
              <img src={FALLBACK_IMG} alt="Medición láser de precisión" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
            ) : (
              <canvas
                ref={canvasRef}
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
              />
            )}

            {/* Leyenda del mapa de desviación */}
            {!showFallback && (
              <div data-legend className={`absolute right-0 bottom-2 lg:bottom-16 w-40 sm:w-48 ${reduce ? "" : "invisible"}`}>
                <p className="text-[11px] text-white/60 mb-1.5">Desviación respecto del diseño</p>
                <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#2159f2,#1acce6,#33d95a,#fad933,#f24033)]" />
                <div className="mt-1 flex justify-between text-[11px] text-white/50 tabular">
                  <span>−</span>
                  <span>0</span>
                  <span>+</span>
                </div>
              </div>
            )}
          </div>

          {/* Pasos */}
          <div className="row-start-3 lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:self-end lg:pb-16">
            {reduce ? (
              <ol className="space-y-5">
                {STAGES.map((s) => (
                  <li key={s.name}>
                    <p className="font-semibold text-white">{s.name}</p>
                    <p className="text-white/65 text-[15px] leading-relaxed mt-1">{s.text}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <>
                <div className="relative min-h-[6.5rem] sm:min-h-[5.5rem]">
                  {STAGES.map((s, i) => (
                    <p
                      key={s.name}
                      data-stage={i}
                      className={`absolute inset-x-0 top-0 text-white/75 text-[15px] md:text-base leading-relaxed max-w-[44ch] ${
                        i === 0 ? "" : "invisible"
                      }`}
                    >
                      {s.text}
                    </p>
                  ))}
                </div>
                <div className="mt-5">
                  <div className="grid grid-cols-3 text-sm font-medium">
                    {STAGES.map((s, i) => (
                      <span key={s.name} data-tick={i} className={i === 0 ? "text-white" : "text-white/40"}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 h-px bg-white/15 overflow-hidden">
                    <div data-rail className="h-full bg-[#7fe0ff] origin-left scale-x-0" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
