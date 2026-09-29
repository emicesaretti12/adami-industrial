import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";

const CLD = "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto,c_limit,w_1400";

const PROJECTS = [
  { src: `${CLD}/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png`, title: "Celda de soldadura robotizada", tag: "Robótica" },
  { src: `${CLD}/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png`, title: "Medición láser de precisión", tag: "Metrología" },
  { src: `${CLD}/v1787670625/6cfdf9c1-a1e5-4d02-bc6c-83dd4a4792da.png`, title: "Robot industrial", tag: "Automatización" },
  { src: `${CLD}/v1787670470/3a2c97e8-f291-4cd6-91e1-fb81cc012387.png`, title: "Celda robotizada en operación", tag: "Montaje de líneas" },
];

/**
 * Desktop (≥1024px, sin reduced-motion): la sección se fija y el scroll vertical desplaza
 * la tira de proyectos en horizontal; cada foto tiene parallax propio dentro de su marco.
 * Celular/tablet: carrusel nativo con scroll-snap (momentum del sistema, sin JS).
 */
export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - track.clientWidth;

        // La tira arranca alineada con el titular y termina con el mismo margen a la derecha
        const alignTrack = () => {
          const head = headRef.current!;
          const left = head.getBoundingClientRect().left + parseFloat(getComputedStyle(head).paddingLeft);
          track.style.paddingLeft = `${left}px`;
          track.style.paddingRight = `${left}px`;
        };
        alignTrack();
        ScrollTrigger.addEventListener("refreshInit", alignTrack);

        const scrollTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none", // obligatorio: mapeo 1:1 entre scroll vertical y posición horizontal
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.6 },
          },
        );

        // Parallax interno: la foto se desplaza más lento que su marco
        gsap.utils.toArray<HTMLElement>("[data-parallax]", track).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", alignTrack);
          track.style.paddingLeft = "";
          track.style.paddingRight = "";
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative z-10 bg-[#0c1a29] text-white overflow-hidden lg:h-[100svh] lg:flex lg:flex-col lg:justify-center">
      <div ref={headRef} className="container mx-auto px-6 pt-24 pb-10 lg:pt-28 lg:pb-10 grid lg:grid-cols-12 gap-6 items-end">
        <SplitHeading lines={["Ingeniería", "en acción."]} className="lg:col-span-8 type-display text-white text-[clamp(2.4rem,6vw,5.25rem)]" />
        <p className="lg:col-span-4 text-white/60 leading-relaxed">
          Desde piezas simples hasta grandes dispositivos de producción y desarrollos tecnológicos complejos.
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 lg:gap-6 px-6 scroll-px-6 pb-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-x pan-y" }}
      >
        {PROJECTS.map((p) => (
          <figure key={p.src} className="snap-start flex-none w-[82vw] sm:w-[58vw] lg:w-[38vw] max-w-[640px]">
            <div className="relative overflow-hidden rounded-xl bg-[#13263a] aspect-[4/3] lg:aspect-auto lg:h-[52svh]">
              <img
                data-parallax
                src={p.src}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-y-0 -inset-x-[10%] w-[120%] h-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="font-medium text-white text-base md:text-lg">{p.title}</span>
              <span className="text-sm text-[#8fb0d4] whitespace-nowrap">{p.tag}</span>
            </figcaption>
          </figure>
        ))}

        {/* Cierre de la tira */}
        <div className="snap-start flex-none w-[82vw] sm:w-[58vw] lg:w-[30vw] max-w-[520px] rounded-xl border border-white/12 p-7 lg:p-10 flex flex-col justify-between aspect-[4/3] lg:aspect-auto lg:h-[52svh]">
          <p className="type-display-md text-white text-[clamp(1.6rem,2.6vw,2.4rem)]">¿Tiene un desafío técnico parecido?</p>
          <Link
            href="/contacto"
            className="press group self-start inline-flex items-center gap-2 rounded-full bg-white text-[#0c1a29] font-medium text-sm px-5 py-3 hover:bg-[#e8eef5]"
          >
            Consultar por su proyecto
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Progreso de la tira (solo desktop, donde el scroll es horizontal) */}
      <div className="hidden lg:block container mx-auto px-6 pb-10">
        <div className="h-px bg-white/15 overflow-hidden">
          <div ref={barRef} className="h-full bg-[#8fb0d4] origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
}
