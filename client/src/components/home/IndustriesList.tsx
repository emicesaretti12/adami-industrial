import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "wouter";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useFinePointer } from "@/hooks/useFinePointer";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";
import { Atom, Bottling, MineCart, PumpJack, Rocket, Silo, Turbofan, Wheel } from "./industries/pictos";

const CLD = "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto";

/** Los sectores y su adjetivo salen del texto del sitio. Minería y petróleo todavía no tienen foto: el escenario muestra solo el pictograma. */
const SECTORS = [
  { name: "Agroindustria", sector: "agroindustrial", img: `${CLD}/v1786727929/agro_ddxrha.jpg`, Picto: Silo },
  { name: "Alimenticia", sector: "alimenticio", img: `${CLD}/v1786727560/adami-industria-alimenticia-galeria-1-220x260_zyntht.jpg`, Picto: Bottling },
  { name: "Aeroespacial", sector: "aeroespacial", img: `${CLD}/v1786727559/adami-industria-aeroespacial-galeria-1-220x260_trzjn4.jpg`, Picto: Rocket },
  { name: "Aeronáutica", sector: "aeronáutico", img: `${CLD}/v1786727559/adami-industria-aeronautica-galeria-1-220x260_fswnsi.jpg`, Picto: Turbofan },
  { name: "Automotriz", sector: "automotriz", img: `${CLD}/v1786727560/adami-industria-automotriz-galeria-1-220x260_ksphlp.jpg`, Picto: Wheel },
  { name: "Nuclear", sector: "nuclear", img: `${CLD}/v1786727560/adami-industria-nuclear-galeria-1-220x260_onmrc7.jpg`, Picto: Atom },
  { name: "Minería", sector: "minero", img: "", Picto: MineCart },
  { name: "Petróleo", sector: "petrolero", img: "", Picto: PumpJack },
];
const blurb = (sector: string) => `Desarrollos para empresas del sector ${sector}.`;
const pad = (n: number) => String(n).padStart(2, "0");

const EASE = [0.77, 0, 0.175, 1] as const;
const OUT = [0.23, 1, 0.32, 1] as const;

function useMedia(query: string) {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const q = window.matchMedia(query);
    const on = () => setM(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, [query]);
  return m;
}

interface Active {
  i: number;
  dir: 1 | -1;
}
const activeReducer = (s: Active, n: number): Active => (n === s.i ? s : { i: n, dir: n > s.i ? 1 : -1 });

/**
 * Industrias: una lista tipográfica que gobierna un escenario.
 *   Escenario → cada sector se revela con un barrido cian (como un escáner): foto en duotono que se asienta
 *   y un pictograma técnico que se dibuja solo y tiene movimiento propio.
 *   Con mouse   → el sector activo lo marca el hover / el foco de teclado; el escenario se inclina apenas con el cursor.
 *   En touch    → el escenario queda fijo arriba y el sector activo lo marca el scroll (ScrollTrigger).
 * Todo el texto sale del sitio; no se inventan datos por sector.
 */
export default function IndustriesList() {
  const reduce = useReducedMotion();
  const tiltOK = useFinePointer();
  const canHover = useMedia("(hover: hover) and (pointer: fine)");
  const sectionRef = useRef<HTMLElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headRef = useReveal<HTMLDivElement>();
  const rowsRef = useReveal<HTMLUListElement>("0px 0px -8% 0px");
  const [{ i: active, dir }, setActive] = useReducer(activeReducer, { i: 0, dir: 1 });
  const [hovering, setHovering] = useState(false);
  const focusMode = canHover ? hovering : true;

  // Inclinación del escenario con el cursor
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [-5, 5]);
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);
  const onMove = (e: React.MouseEvent) => {
    if (!tiltOK) return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set(Math.max(-1.4, Math.min(1.4, ((e.clientX - r.left) / r.width - 0.5) * 2)));
    py.set(Math.max(-1.4, Math.min(1.4, ((e.clientY - r.top) / r.height - 0.5) * 2)));
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    setHovering(false);
  };

  // Precarga de las fotos: al pasar de un sector a otro ya están en caché
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        SECTORS.filter((s) => s.img).forEach((s) => {
          const im = new Image();
          im.decoding = "async";
          im.src = s.img;
        });
        io.disconnect();
      },
      { rootMargin: "700px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // En touch, el sector activo lo decide el scroll: cada fila se activa al cruzar una línea bajo el escenario fijo
  useGSAP(
    () => {
      if (canHover) return;
      const rows = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>("[data-row]") ?? []);
      const line = () => {
        if (window.matchMedia("(min-width: 1024px)").matches) return window.innerHeight * 0.5;
        const wrap = stageWrapRef.current;
        if (!wrap) return window.innerHeight * 0.55;
        const bottom = (parseFloat(getComputedStyle(wrap).top) || 0) + wrap.offsetHeight;
        return bottom + (window.innerHeight - bottom) * 0.3;
      };
      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: () => `top ${Math.round(line())}`,
          end: () => `bottom ${Math.round(line())}`,
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [canHover] },
  );

  const layer: Variants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        enter: (d: number) => ({ clipPath: d >= 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }),
        center: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease: EASE } },
        // la capa saliente se queda debajo hasta que la nueva la termina de tapar
        exit: { opacity: 0.999, transition: { duration: 0.9 } },
      };
  const swap: Variants = {
    enter: (d: number) => ({ y: reduce ? 0 : d * 14, opacity: 0 }),
    center: { y: 0, opacity: 1, transition: { duration: 0.5, ease: OUT } },
    exit: (d: number) => ({ y: reduce ? 0 : -d * 14, opacity: 0, transition: { duration: 0.25 } }),
  };

  const cur = SECTORS[active];

  return (
    <section ref={sectionRef} className="relative z-10 bg-white">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div ref={headRef} className="mb-10 md:mb-14 grid md:grid-cols-12 gap-6 items-end">
          <SplitHeading lines={["Industrias", "que proveemos."]} className="md:col-span-7 type-display text-[#1a2b3d] text-[clamp(2.4rem,6.5vw,5.5rem)]" />
          <p className="rv-up md:col-span-5 text-[#5a6b7c] leading-relaxed max-w-[44ch]" style={{ "--d": "200ms" } as React.CSSProperties}>
            Medianos y grandes desarrollos para sectores donde la precisión y la trazabilidad no son negociables.
          </p>
        </div>

        <div onMouseMove={onMove} onMouseLeave={onLeave} className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* ── Escenario ─────────────────────────────────────────────── */}
          <div
            ref={stageWrapRef}
            className="sticky top-[4.25rem] z-20 -mx-6 bg-white px-6 pb-3 pt-1 lg:top-24 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0"
          >
            <motion.div
              ref={stageRef}
              aria-hidden="true"
              style={tiltOK ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
              className="relative h-[34svh] min-h-[220px] max-h-[340px] overflow-hidden rounded-2xl bg-[#0a1522] text-white lg:h-[min(35rem,calc(100svh-8rem))] lg:max-h-none"
            >
              <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_18%,#1d4368_0%,#0f2238_48%,#0a1522_100%)]" />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right,#8fb0d4 1px,transparent 1px),linear-gradient(to bottom,#8fb0d4 1px,transparent 1px)",
                  backgroundSize: "28px 28px",
                  maskImage: "radial-gradient(ellipse at 50% 45%, black 25%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 25%, transparent 75%)",
                }}
              />

              <AnimatePresence initial={false} custom={dir}>
                <motion.div key={active} custom={dir} variants={layer} initial="enter" animate="center" exit="exit" className="absolute inset-0">
                  {cur.img && (
                  <motion.img
                    src={cur.img}
                    alt=""
                    decoding="async"
                    initial={{ scale: reduce ? 1 : 1.22 }}
                    animate={{ scale: 1, transition: { duration: 1.8, ease: OUT } }}
                    className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale"
                  />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1522] via-[#0a1522]/45 to-[#0a1522]/20" />
                  <div className="absolute left-1/2 top-[46%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(127,224,255,0.16),transparent)]" />
                  <div className="absolute inset-0 flex items-center justify-center p-[9%] pb-[17%] text-[#7fe0ff]">
                    <cur.Picto />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Barrido de escáner que acompaña al cambio de sector */}
              {!reduce && (
                <motion.div
                  key={`scan-${active}`}
                  className="pointer-events-none absolute inset-x-0 z-10 h-px bg-[#7fe0ff] shadow-[0_0_14px_2px_rgba(127,224,255,0.75)]"
                  initial={{ top: dir >= 0 ? "100%" : "0%", opacity: 1 }}
                  animate={{ top: dir >= 0 ? "0%" : "100%", opacity: [1, 1, 0], transition: { duration: 0.9, ease: EASE, opacity: { duration: 0.9, times: [0, 0.8, 1] } } }}
                />
              )}

              {/* Datos del escenario */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 lg:p-6">
                <div className="tabular flex items-baseline gap-1.5 text-sm">
                  <span className="relative inline-block h-[1.2em] w-[1.4em] overflow-hidden text-left text-white">
                    <AnimatePresence initial={false} custom={dir} mode="popLayout">
                      <motion.span key={active} custom={dir} variants={swap} initial="enter" animate="center" exit="exit" className="absolute inset-0 block">
                        {pad(active + 1)}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-white/40">/ {pad(SECTORS.length)}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1.5" aria-hidden="true">
                  {SECTORS.map((s, i) => (
                    <span
                      key={s.name}
                      className={`h-[3px] rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        i === active ? "w-8 bg-[#7fe0ff]" : "w-3 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 lg:p-6">
                <AnimatePresence initial={false} custom={dir} mode="wait">
                  <motion.div key={active} custom={dir} variants={swap} initial="enter" animate="center" exit="exit">
                    <p className="text-lg font-medium text-white lg:text-2xl">{cur.name}</p>
                    <p className="mt-1 hidden max-w-[34ch] text-sm leading-snug text-white/60 lg:block">{blurb(cur.sector)}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Lista ─────────────────────────────────────────────────── */}
          <ul ref={rowsRef} className="relative border-b border-[#e2e8f0] lg:col-span-7 lg:col-start-1 lg:row-start-1">
            {SECTORS.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.name}
                  data-row
                  className={`border-t border-[#e2e8f0] transition-opacity duration-500 ${focusMode && !on ? "opacity-[0.45]" : "opacity-100"}`}
                >
                  <Link
                    href="/industrias"
                    onMouseEnter={() => {
                      if (canHover) {
                        setHovering(true);
                        setActive(i);
                      }
                    }}
                    onFocus={() => setActive(i)}
                    className="press group relative flex min-h-[21svh] items-center gap-4 py-5 lg:min-h-0 lg:gap-6 lg:py-7"
                  >
                    <span className={`tabular w-7 flex-none text-xs transition-colors duration-500 ${on ? "text-[#4e6e94]" : "text-[#9aabbd]"}`}>
                      {pad(i + 1)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="rv-line block">
                        <span style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                          <span
                            className={`block type-display-md text-[#1a2b3d] text-[clamp(1.9rem,6vw,3.75rem)] transition-[translate] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                              on ? "translate-x-2 lg:translate-x-4" : ""
                            }`}
                          >
                            {s.name}
                          </span>
                        </span>
                      </span>
                      <span className="mt-2 block max-w-[36ch] text-[13px] leading-snug text-[#5a6b7c] lg:hidden">{blurb(s.sector)}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={`h-6 w-6 flex-none transition-[color,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:h-8 lg:w-8 ${
                        on ? "rotate-45 text-[#4e6e94]" : "text-[#9aabbd]"
                      }`}
                    />
                    {/* Subrayado que se dibuja en la fila activa */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#1a2b3d] transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
                        on ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
