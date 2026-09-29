import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";
import type { GearboxScene } from "./gearbox/createGearboxScene";

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

/** Etiquetas de un informe de metrología. Los valores son ilustrativos y coherentes con el modelo (96 mm de diámetro exterior). */
const TAGS = [
  { title: "Ø exterior 96,00 mm", value: "+0,011", tone: "text-[#ffd84d]", hideOnMobile: false },
  { title: "Diente · Ø 32,70 mm", value: "−0,008", tone: "text-[#5cf0a0]", hideOnMobile: true },
  { title: "Eje · Ø 6,10 mm", value: "+0,004", tone: "text-[#5cf0a0]", hideOnMobile: true },
  { title: "Concentricidad", value: "0,006", tone: "text-[#7fe0ff]", hideOnMobile: false },
];

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
 * Historia de una pieza en tres estados contada con un reductor planetario 3D que avanza con el scroll:
 *   Diseño      → plano CAD en líneas, piezas explosionadas sobre un eje común
 *   Fabricación → el metal se materializa, las piezas vuelan a su lugar y encajan con chispas; el reductor arranca
 *   Medición    → un láser barre el conjunto, deja una nube de puntos y el mapa de desviación, con cotas ancladas en 3D
 *
 * - Three.js y toda la escena se descargan recién cuando la sección está cerca (chunk aparte).
 * - La escena dibuja solo mientras se ve; la calidad baja sola si los cuadros por segundo caen.
 * - La sección se sostiene con position: sticky (nativo, fluido en touch).
 * - Reduced motion: un solo cuadro final y los tres pasos listados. Sin WebGL: foto real.
 */
export default function ScanSection() {
  const outerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<GearboxScene | null>(null);
  const progressRef = useRef(0);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [webgl] = useState(hasWebGL);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

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
        try {
          const { createGearboxScene } = await import("./gearbox/createGearboxScene");
          if (cancelled) return;
          const scene = await createGearboxScene(canvas, {
            coarse: window.matchMedia("(pointer: coarse)").matches,
            cores: navigator.hardwareConcurrency ?? 8,
            labels: tagRefs.current.filter(Boolean) as HTMLElement[],
            onContextLost: () => setFailed(true),
          });
          if (cancelled) {
            scene.dispose();
            return;
          }
          sceneRef.current = scene;
          setReady(true);

          if (reduce) {
            scene.renderStatic(1);
            return;
          }
          // La escena puede terminar de cargar después del último scroll: arranca en el progreso actual
          scene.jump(progressRef.current);
          visibilityIO = new IntersectionObserver(([e]) => (e.isIntersecting ? scene.start() : scene.stop()));
          visibilityIO.observe(canvas);
          ScrollTrigger.refresh();
        } catch (err) {
          console.warn("Escena 3D no disponible, se muestra la foto", err);
          if (!cancelled) setFailed(true);
        }
      },
      { rootMargin: "200% 0px" },
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
        .to("[data-stage='1']", { autoAlpha: 0, y: -16 }, 0.6)
        .fromTo("[data-stage='2']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.64)
        .fromTo("[data-legend]", { autoAlpha: 0 }, { autoAlpha: 1 }, 0.74)
        .to("[data-tick='0']", { color: "rgba(255,255,255,0.4)" }, 0.29)
        .fromTo("[data-tick='1']", { color: "rgba(255,255,255,0.4)" }, { color: "#ffffff" }, 0.29)
        .to("[data-tick='1']", { color: "rgba(255,255,255,0.4)" }, 0.62)
        .fromTo("[data-tick='2']", { color: "rgba(255,255,255,0.4)" }, { color: "#ffffff" }, 0.62);

      return () => st.kill();
    },
    { scope: outerRef, dependencies: [reduce] },
  );

  const showFallback = !webgl || failed;

  return (
    <section
      ref={outerRef}
      className={`relative z-10 bg-[#0c1a29] text-white ${reduce ? "" : "h-[430svh]"}`}
      aria-label="Diseño, fabricación y medición de una pieza"
    >
      <div className={`${reduce ? "relative min-h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        {/* Escena 3D a pantalla completa */}
        {showFallback ? (
          <img src={FALLBACK_IMG} alt="Medición láser de precisión" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Legibilidad del texto sobre la escena */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0c1a29]/80 via-transparent to-[#0c1a29]/85 lg:bg-gradient-to-r lg:from-[#0c1a29]/85 lg:via-[#0c1a29]/25 lg:to-transparent"
        />

        {/* Cotas de metrología ancladas a la pieza (las posiciona la escena en cada cuadro) */}
        {!showFallback && !reduce && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
            {TAGS.map((t, i) => (
              <div
                key={t.title}
                ref={(el) => {
                  tagRefs.current[i] = el;
                }}
                className={`absolute left-0 top-0 opacity-0 will-change-transform ${t.hideOnMobile ? "hidden sm:block" : ""}`}
              >
                <div className="[transform:scaleX(var(--fx,1))]">
                  <span className="absolute -left-[3px] -top-[3px] block h-[7px] w-[7px] rounded-full bg-[#7fe0ff] shadow-[0_0_0_5px_rgba(127,224,255,0.18)]" />
                  <span className="absolute left-0 top-0 block h-px w-9 origin-left -rotate-[38deg] bg-[#7fe0ff]/70" />
                  <div
                    data-pill
                    className="absolute left-[29px] top-[-22px] -translate-y-1/2 whitespace-nowrap rounded-md border border-[#7fe0ff]/30 bg-[#0c1a29]/80 px-2 py-1 text-[11px] leading-tight sm:backdrop-blur-sm"
                  >
                    <div className="[transform:scaleX(var(--fx,1))]">
                      <span className="block text-white/60">{t.title}</span>
                      <span className={`tabular block font-medium ${t.tone}`}>{t.value} mm</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`container relative z-20 mx-auto grid ${reduce ? "min-h-[100svh]" : "h-full"} grid-rows-[auto_1fr_auto] gap-4 px-6 pb-20 pt-24 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10 lg:py-0`}
        >
          {/* Titular */}
          <div className="row-start-1 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-center">
            <SplitHeading
              lines={["Medimos lo", "que fabricamos."]}
              className="type-display text-[clamp(2.1rem,5.4vw,4.75rem)] text-white"
            />
          </div>

          {/* Pasos */}
          <div className="row-start-3 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-16">
            {reduce ? (
              <ol className="space-y-5">
                {STAGES.map((s) => (
                  <li key={s.name}>
                    <p className="font-semibold text-white">{s.name}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-white/70">{s.text}</p>
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
                      className={`absolute inset-x-0 top-0 max-w-[44ch] text-[15px] leading-relaxed text-white/80 md:text-base ${
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
                  <div className="mt-3 h-px overflow-hidden bg-white/15">
                    <div data-rail className="h-full origin-left scale-x-0 bg-[#7fe0ff]" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Leyenda del mapa de desviación */}
          {!showFallback && (
            <div
              data-legend
              className={`absolute right-6 top-[5.25rem] w-36 sm:w-48 lg:bottom-16 lg:top-auto lg:right-[max(3rem,calc((100vw-1440px)/2+3rem))] ${reduce ? "" : "invisible"}`}
            >
              <p className="mb-1.5 text-[11px] text-white/65">Desviación respecto del diseño</p>
              <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#1a47f2,#0fc7eb,#29d957,#fad629,#f53829)]" />
              <div className="tabular mt-1 flex justify-between text-[11px] text-white/55">
                <span>−</span>
                <span>0</span>
                <span>+</span>
              </div>
              <p className="mt-2 text-[10px] leading-snug text-white/40">Ilustración de un informe de metrología.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
