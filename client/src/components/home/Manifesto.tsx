import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

const TEXT =
  "Integramos tecnología a sus procesos productivos para mejorar la calidad de lo que fabrica y aumentar la rentabilidad de su negocio.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // Solo opacidad: barata de componer y no mueve el texto que la persona está leyendo
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.24em]">
      {children}
    </motion.span>
  );
}

/**
 * La frase se "enciende" palabra por palabra al ritmo del scroll.
 * No fija la sección (sin scroll-jacking): acompaña el scroll natural, también en touch.
 */
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const footRef = useReveal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = TEXT.split(" ");

  return (
    <section className="relative z-10 bg-white">
      <div className="container mx-auto px-6 py-24 md:py-36">
        <div>
          <p
            ref={ref}
            className="type-display-md text-[#1a2b3d] text-[clamp(1.9rem,5.2vw,4.1rem)] max-w-[24ch]"
          >
            {reduce
              ? TEXT
              : words.map((w, i) => (
                  <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                    {w}
                  </Word>
                ))}
          </p>
        </div>

        <div ref={footRef} className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-16">
          <div className="flex items-center gap-4">
            <span className="rv-rule block h-px w-16 bg-[#4e6e94]" />
            <p className="rv-up text-[#4e6e94] font-medium" style={{ "--d": "150ms" } as React.CSSProperties}>
              Nuestra ley de empuje
            </p>
          </div>
          <p
            className="rv-up text-[#5a6b7c] leading-relaxed max-w-[52ch]"
            style={{ "--d": "250ms" } as React.CSSProperties}
          >
            Antes de diseñar nada, conocemos a fondo su realidad técnica y productiva. Así cada desarrollo resuelve
            el problema real y se sostiene en el tiempo.
          </p>
        </div>
      </div>
    </section>
  );
}
