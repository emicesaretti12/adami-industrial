import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const CLD = "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto,c_limit,w_1400";

type Tile = { src: string; alt: string; title: string; tag?: string; span: string; delay: number };

const TILES: Tile[] = [
  {
    src: `${CLD}/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png`,
    alt: "Celda de soldadura robotizada",
    title: "Celda de soldadura robotizada",
    tag: "Robótica",
    span: "col-span-6 md:col-span-7 row-span-2",
    delay: 0,
  },
  {
    src: `${CLD}/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png`,
    alt: "Medición láser de precisión",
    title: "Medición láser",
    span: "col-span-3 md:col-span-5",
    delay: 120,
  },
  {
    src: `${CLD}/v1787670625/6cfdf9c1-a1e5-4d02-bc6c-83dd4a4792da.png`,
    alt: "Robot industrial",
    title: "Robot industrial",
    span: "col-span-3 md:col-span-5",
    delay: 200,
  },
  {
    src: `${CLD}/v1787670470/3a2c97e8-f291-4cd6-91e1-fb81cc012387.png`,
    alt: "Celda robotizada en operación",
    title: "Celda robotizada en operación",
    span: "col-span-6 md:col-span-7",
    delay: 80,
  },
];

function ProjectTile({ tile }: { tile: Tile }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${tile.span} relative`}>
      <div
        className="rv-clip group absolute inset-0 overflow-hidden rounded-xl bg-[#13263a]"
        style={{ "--d": `${tile.delay}ms` } as React.CSSProperties}
      >
        <img
          src={tile.src}
          alt={tile.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
          {tile.tag && <span className="text-xs text-[#8fb0d4]">{tile.tag}</span>}
          <h3 className="text-white font-semibold text-sm md:text-lg leading-tight mt-0.5">{tile.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const headRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative z-10 bg-[#0c1a29] text-white overflow-hidden">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div ref={headRef} className="mb-12 md:mb-16 grid md:grid-cols-12 gap-6 items-end">
          <h2 className="md:col-span-8 type-display text-white text-[clamp(2.4rem,6.5vw,5.5rem)]">
            <span className="rv-line"><span>Ingeniería</span></span>
            <span className="rv-line"><span style={{ "--d": "90ms" } as React.CSSProperties}>en acción.</span></span>
          </h2>
          <p className="rv-up md:col-span-4 text-white/60 leading-relaxed" style={{ "--d": "200ms" } as React.CSSProperties}>
            Desde piezas simples hasta grandes dispositivos de producción y desarrollos tecnológicos complejos.
          </p>
        </div>

        <div className="grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[150px] sm:auto-rows-[190px] md:auto-rows-[230px]">
          {TILES.map((t) => (
            <ProjectTile key={t.src} tile={t} />
          ))}

          {/* Cierre del bloque: invita a consultar */}
          <div
            ref={ctaRef}
            className="col-span-6 md:col-span-5 rounded-xl border border-white/12 p-6 md:p-8 flex flex-col justify-between"
          >
            <p className="rv-up type-display-md text-white text-[clamp(1.4rem,2.4vw,2rem)]">
              ¿Tiene un desafío técnico parecido?
            </p>
            <div className="rv-up self-start mt-6" style={{ "--d": "120ms" } as React.CSSProperties}>
              <Link
                href="/contacto"
                className="press group inline-flex items-center gap-2 rounded-full bg-white text-[#0c1a29] font-medium text-sm px-5 py-3 hover:bg-[#e8eef5]"
              >
                Consultar por su proyecto
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
