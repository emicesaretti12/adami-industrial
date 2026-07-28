import { Car, Plane, Rocket, Atom, Wheat, Tractor, Fuel } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { industrias } from "@/lib/adami-data";

const iconMap: Record<string, React.ElementType> = {
  car: Car,
  plane: Plane,
  rocket: Rocket,
  atom: Atom,
  wheat: Wheat,
  tractor: Tractor,
  fuel: Fuel,
};

/**
 * Industries section — sectors served by ADAMI with animated cards.
 */
export default function Industries() {
  return (
    <section id="industrias" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />

      <div className="container relative z-10">
        {/* Header */}
        <RevealSection className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              03 / Industrias
            </span>
          </div>
          <h2 className="font-display font-600 text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Sectores que <span className="text-amber-gradient">confían en ADAMI</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {industrias.descripcionGeneral}
          </p>
        </RevealSection>

        {/* Sector cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industrias.sectores.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Atom;
            return (
              <RevealSection key={sector.nombre} delay={i * 80}>
                <div className="industrial-card group bg-card border border-border p-8 rounded-sm h-full flex flex-col items-center text-center justify-center min-h-[200px] relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />

                  {/* Icon */}
                  <div className="relative z-10 mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="text-primary" size={40} strokeWidth={1.5} />
                  </div>

                  {/* Name */}
                  <h3 className="relative z-10 font-display font-500 text-base text-foreground uppercase tracking-wide leading-tight">
                    {sector.nombre}
                  </h3>

                  {/* Number badge */}
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
