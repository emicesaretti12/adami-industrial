import { useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import SplitHeading from "@/components/motion/SplitHeading";

const CLD = "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto,c_limit,w_1600";

/** Es una secuencia real: todo proyecto pasa por las tres unidades en este orden. */
const STEPS = [
  {
    verb: "Diseñamos",
    unit: "Innovación Tecnológica",
    desc: "Analizamos su realidad productiva y proyectamos soluciones a medida, con previsualización del funcionamiento y de las fallas posibles antes de fabricar.",
    items: ["Diseño industrial 3D y CAD-CAM", "Ingeniería de procesos", "Gestión de proyectos industriales", "Medición con PolyWorks"],
    img: `${CLD}/v1787670957/71fcdcab-4994-41a1-a357-84bc06c4a0fa.png`,
    alt: "Proyecto industrial desarrollado por ADAMI",
  },
  {
    verb: "Fabricamos",
    unit: "Desarrollos Metalúrgicos",
    desc: "Mecanizado de precisión y fabricación bajo estrictas condiciones de calidad, con seguimiento desde el inicio del proyecto hasta el fin de la producción.",
    items: ["Fabricaciones especiales a medida", "Máquinas, equipos y dispositivos", "Matricería y moldes especiales", "Mesas rotativas de 4 y 5 ejes"],
    img: `${CLD}/v1787686345/WhatsApp_Image_2026-08-25_at_12.18.11_PM_xaxsdb.jpg`,
    alt: "Planta industrial de ADAMI",
  },
  {
    verb: "Instalamos y medimos",
    unit: "Servicios Industriales",
    desc: "Instalación llave en mano, automatización y medición inteligente para garantizar que los resultados se sostengan en el tiempo.",
    items: ["Instalaciones llave en mano", "Automatización industrial", "Montaje de líneas y robots", "Medición inteligente y post-venta"],
    img: `${CLD}/v1787670549/6cfdf6d7-b576-454e-9217-ee63a100ffd0.png`,
    alt: "Servicio de medición inteligente",
  },
];

function StepCard({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  // Cuando la siguiente tarjeta la tapa, esta retrocede apenas: da profundidad a la pila
  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  // Además de achicarse, se inclina hacia atrás (pivotea sobre su borde superior) con perspectiva real
  const tilt = useTransform(progress, [start, 1], [0, -(total - 1 - index) * 2.2]);
  const transform = useTransform(
    [scale, tilt],
    ([s, r]: number[]) => `perspective(1400px) rotateX(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`,
  );
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - index) * 0.18]);

  return (
    <div
      className="sticky"
      style={{ top: `calc(5.25rem + ${index * 14}px)` }}
    >
      <motion.article
        style={reduce ? undefined : { transform }}
        className="relative origin-top overflow-hidden rounded-2xl bg-[#0c1a29] text-white shadow-[0_-8px_40px_rgba(12,26,41,0.18)] h-[calc(100svh-7rem)] max-h-[720px] min-h-[480px] flex flex-col md:flex-row"
      >
        {/* Texto */}
        <div className="relative z-10 order-2 md:order-1 md:w-[46%] flex flex-col p-6 sm:p-8 md:p-12 lg:p-14">
          <div className="flex items-baseline justify-between gap-4">
            <span className="tabular text-sm text-white/45">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="text-sm text-[#8fb0d4]">{step.unit}</span>
          </div>

          <h3 className="type-display text-white mt-4 md:mt-auto text-[clamp(2.1rem,5.4vw,4.6rem)]">
            {step.verb}
          </h3>
          <p className="mt-3 md:mt-5 text-white/70 text-[15px] md:text-base leading-relaxed max-w-[46ch] line-clamp-3 md:line-clamp-none">
            {step.desc}
          </p>

          <ul className="mt-5 md:mt-8 grid grid-cols-2 md:grid-cols-1 gap-x-4 border-t border-white/10">
            {step.items.map((it) => (
              <li key={it} className="py-2.5 md:py-3 border-b border-white/10 text-[13px] md:text-[15px] text-white/85 leading-snug">
                {it}
              </li>
            ))}
          </ul>
        </div>

        {/* Imagen */}
        <div className="relative order-1 md:order-2 flex-1 min-h-[28%] md:min-h-0">
          <img
            src={step.img}
            alt={step.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0c1a29] via-[#0c1a29]/10 to-transparent" />
        </div>

        {/* Oscurece la tarjeta que queda atrás en la pila */}
        {!reduce && (
          <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-[#0c1a29]" />
        )}
      </motion.article>
    </div>
  );
}

export default function ProcessStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const headRef = useReveal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section className="relative z-10 bg-[#f5f7fa]">
      <div className="container mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16 md:pb-24">
        <div ref={headRef} className="px-2 sm:px-0 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SplitHeading lines={["Del plano", "a la planta."]} className="type-display text-[#1a2b3d] text-[clamp(2.4rem,6.5vw,5.5rem)]" />
          <div className="rv-up max-w-[40ch]" style={{ "--d": "200ms" } as React.CSSProperties}>
            <p className="text-[#5a6b7c] leading-relaxed">
              Cada proyecto recorre nuestras tres unidades de negocio. Un solo equipo responsable desde el análisis
              hasta la entrega llave en mano.
            </p>
            <Link
              href="/servicios"
              className="press group mt-5 inline-flex items-center gap-2 text-[#1a2b3d] font-medium border-b border-[#1a2b3d]/30 hover:border-[#1a2b3d] pb-1"
            >
              Ver todos los servicios
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div ref={stackRef} className="relative flex flex-col gap-[12vh]">
          {STEPS.map((step, i) => (
            <StepCard key={step.verb} step={step} index={i} total={STEPS.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
