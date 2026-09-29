import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import SplitHeading from "@/components/motion/SplitHeading";
import { useFinePointer } from "@/hooks/useFinePointer";

const CLD = "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto";

const SECTORS = [
  { name: "Agroindustria", img: `${CLD}/v1786727929/agro_ddxrha.jpg` },
  { name: "Alimenticia", img: `${CLD}/v1786727560/adami-industria-alimenticia-galeria-1-220x260_zyntht.jpg` },
  { name: "Aeroespacial", img: `${CLD}/v1786727559/adami-industria-aeroespacial-galeria-1-220x260_trzjn4.jpg` },
  { name: "Aeronáutica", img: `${CLD}/v1786727559/adami-industria-aeronautica-galeria-1-220x260_fswnsi.jpg` },
  { name: "Automotriz", img: `${CLD}/v1786727560/adami-industria-automotriz-galeria-1-220x260_ksphlp.jpg` },
  { name: "Nuclear", img: `${CLD}/v1786727560/adami-industria-nuclear-galeria-1-220x260_onmrc7.jpg` },
];

/**
 * Lista tipográfica de industrias.
 * Con mouse: una imagen flotante sigue al cursor con un resorte (decorativo, sitio de marketing).
 * En touch: cada fila muestra su miniatura; no hay nada que dependa del hover.
 */
export default function IndustriesList() {
  const fine = useFinePointer();
  const listRef = useRef<HTMLUListElement>(null);
  const headRef = useReveal<HTMLDivElement>();
  const rowsRef = useReveal<HTMLUListElement>("0px 0px -8% 0px");
  const [active, setActive] = useState<number | null>(null);

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section className="relative z-10 bg-white">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div ref={headRef} className="mb-10 md:mb-14 grid md:grid-cols-12 gap-6 items-end">
          <SplitHeading lines={["Industrias", "que proveemos."]} className="md:col-span-7 type-display text-[#1a2b3d] text-[clamp(2.4rem,6.5vw,5.5rem)]" />
          <p className="rv-up md:col-span-5 text-[#5a6b7c] leading-relaxed max-w-[44ch]" style={{ "--d": "200ms" } as React.CSSProperties}>
            Medianos y grandes desarrollos para sectores donde la precisión y la trazabilidad no son negociables.
          </p>
        </div>

        <ul
          ref={(el) => {
            (listRef as React.MutableRefObject<HTMLUListElement | null>).current = el;
            (rowsRef as React.MutableRefObject<HTMLUListElement | null>).current = el;
          }}
          onMouseMove={fine ? onMove : undefined}
          onMouseLeave={() => setActive(null)}
          className="relative border-b border-[#e2e8f0]"
        >
          {SECTORS.map((s, i) => (
            <li key={s.name} className="border-t border-[#e2e8f0]">
              <Link
                href="/industrias"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="press group flex items-center gap-4 py-4 md:py-6"
              >
                <img
                  src={s.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="md:hidden w-14 h-16 rounded-md object-cover flex-none"
                />
                <span className="rv-line flex-1">
                  <span style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                    <span className="block type-display-md text-[#1a2b3d] text-[clamp(1.75rem,6vw,4.25rem)] transition-[color,translate] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:group-hover:translate-x-4 group-hover:text-[#4e6e94]">
                      {s.name}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-6 h-6 md:w-8 md:h-8 flex-none text-[#9aabbd] transition-[color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-[#4e6e94] md:group-hover:rotate-45"
                />
              </Link>
            </li>
          ))}

          {/* Preview flotante (solo con mouse) */}
          {fine && (
            <motion.div
              aria-hidden="true"
              style={{ x, y }}
              className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
            >
              <AnimatePresence>
                {active !== null && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                    className="relative -translate-x-1/2 -translate-y-1/2 w-[220px] h-[260px] overflow-hidden rounded-lg shadow-2xl shadow-[#0c1a29]/25"
                    style={{ rotate: -3 }}
                  >
                    {SECTORS.map((s, i) => (
                      <img
                        key={s.name}
                        src={s.img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                        style={{ opacity: active === i ? 1 : 0 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </ul>
      </div>
    </section>
  );
}
