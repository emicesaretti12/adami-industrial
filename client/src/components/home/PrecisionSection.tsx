import { useReveal } from "@/hooks/useReveal";

const IMG =
  "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto,c_limit,w_1400/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.35_PM_v7otru.jpg";

const EQUIPMENT = [
  { name: "Brazo FARO Platinum", kind: "Medición por contacto" },
  { name: "Laser Tracker FARO", kind: "Medición de gran volumen" },
  { name: "PolyWorks", kind: "Software de metrología" },
];

/** Regla graduada: 41 marcas, cada 5 una más larga, cada 10 la mayor */
function Ruler() {
  const ticks = Array.from({ length: 41 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 22" preserveAspectRatio="none" className="rv-rule w-full h-5 text-[#4e6e94]" aria-hidden="true">
      <line x1="0" y1="21.5" x2="400" y2="21.5" stroke="currentColor" strokeWidth="1" />
      {ticks.map((i) => {
        const h = i % 10 === 0 ? 20 : i % 5 === 0 ? 13 : 7;
        const x = i * 10;
        return <line key={i} x1={x} y1={22 - h} x2={x} y2={22} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />;
      })}
    </svg>
  );
}

export default function PrecisionSection() {
  const imgRef = useReveal<HTMLDivElement>();
  const textRef = useReveal<HTMLDivElement>();
  const certRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative z-10 bg-[#f5f7fa]">
      <div className="container mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Imagen */}
        <div ref={imgRef} className="lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] lg:min-h-0">
          <div className="rv-clip absolute inset-0 overflow-hidden rounded-xl">
            <img src={IMG} alt="Control de calidad en la planta de ADAMI" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* Contenido */}
        <div className="lg:col-span-7 flex flex-col">
          <div ref={textRef}>
            <h2 className="type-display text-[#1a2b3d] text-[clamp(2.4rem,6vw,5rem)]">
              <span className="rv-line"><span>Medimos lo</span></span>
              <span className="rv-line"><span style={{ "--d": "90ms" } as React.CSSProperties}>que fabricamos.</span></span>
            </h2>
            <p className="rv-up mt-6 text-[#5a6b7c] leading-relaxed max-w-[54ch]" style={{ "--d": "180ms" } as React.CSSProperties}>
              Dos dispositivos de medición inteligente y software de última generación nos permiten brindar metrología
              dimensional de primer orden, y verificar cada pieza antes de que llegue a su planta.
            </p>

            <div className="mt-10" style={{ "--d": "200ms" } as React.CSSProperties}>
              <Ruler />
            </div>

            <dl className="border-b border-[#dfe5ec]">
              {EQUIPMENT.map((e, i) => (
                <div
                  key={e.name}
                  className="rv-up flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-4 border-t border-[#dfe5ec] first:border-t-0"
                  style={{ "--d": `${320 + i * 80}ms` } as React.CSSProperties}
                >
                  <dt className="text-[#1a2b3d] font-semibold text-lg">{e.name}</dt>
                  <dd className="text-[#5a6b7c] text-sm">{e.kind}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div ref={certRef} className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="rv-up rounded-xl bg-[#0c1a29] text-white p-6 md:p-7">
              <p className="type-display text-[clamp(1.9rem,3.6vw,2.75rem)]">ISO 9001:2015</p>
              <p className="mt-2 text-white/60 text-sm">Sistema de gestión de calidad certificado por Bureau Veritas.</p>
            </div>
            <div className="rv-up rounded-xl bg-white border border-[#dfe5ec] p-6 md:p-7" style={{ "--d": "90ms" } as React.CSSProperties}>
              <p className="type-display text-[#1a2b3d] text-[clamp(1.9rem,3.6vw,2.75rem)]">HYS</p>
              <p className="mt-2 text-[#5a6b7c] text-sm">Higiene y Seguridad en cada proceso, dentro y fuera de planta.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
