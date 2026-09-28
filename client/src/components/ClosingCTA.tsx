import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { CONTACT } from "@/lib/contact";

/**
 * Cierre de página con la oferta de entrada: presupuesto y cotización sin cargo.
 * Si VITE_WHATSAPP_NUMBER está configurado, suma el acceso directo a WhatsApp.
 */
export default function ClosingCTA() {
  const ref = useReveal<HTMLDivElement>();
  const wa = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hola ADAMI, quiero pedir un presupuesto.")}`
    : null;

  return (
    <section className="relative z-10 bg-[#0c1a29] text-white overflow-hidden">
      {/* Retícula técnica muy tenue, como papel de plano */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #8fb0d4 1px, transparent 1px), linear-gradient(to bottom, #8fb0d4 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)",
        }}
      />

      <div ref={ref} className="relative container mx-auto px-6 py-24 md:py-36">
        <h2 className="type-display text-white text-[clamp(2.6rem,7.5vw,6.5rem)] max-w-[14ch]">
          <span className="rv-line"><span>Cuéntenos qué</span></span>
          <span className="rv-line"><span style={{ "--d": "90ms" } as React.CSSProperties}>necesita su planta.</span></span>
        </h2>

        <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
          <p className="rv-up md:col-span-6 text-white/70 text-lg leading-relaxed max-w-[46ch]" style={{ "--d": "200ms" } as React.CSSProperties}>
            Analizamos su proyecto y le enviamos <span className="text-white font-medium">presupuesto y cotización sin cargo</span>.
          </p>
          <div className="rv-up md:col-span-6 flex flex-col sm:flex-row md:justify-end gap-3" style={{ "--d": "280ms" } as React.CSSProperties}>
            <Link
              href="/contacto"
              className="press group inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0c1a29] font-semibold px-7 py-4 hover:bg-[#e8eef5]"
            >
              Solicitar presupuesto
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white font-medium px-7 py-4 hover:bg-white/10 hover:border-white/50"
              >
                Escribir por WhatsApp
              </a>
            ) : (
              <a
                href={CONTACT.phoneHref}
                className="press inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white font-medium px-7 py-4 hover:bg-white/10 hover:border-white/50"
              >
                Llamar al {CONTACT.phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
