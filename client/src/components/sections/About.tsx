import { Target, Eye, Award } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { empresa } from "@/lib/adami-data";

/**
 * Empresa section — about ADAMI with vision, mission, and quality policy.
 */
export default function About() {
  return (
    <section id="empresa" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />

      <div className="container relative z-10">
        {/* Section header */}
        <RevealSection className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              01 / Empresa
            </span>
          </div>
          <h2 className="font-display font-600 text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Una organización argentina <span className="text-amber-gradient">centrada en la integración</span> de tecnologías
          </h2>
        </RevealSection>

        {/* Main description */}
        <RevealSection delay={100} className="mb-20">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {empresa.quienesSomos}
          </p>
        </RevealSection>

        {/* Vision, Mission, Quality cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vision */}
          <RevealSection delay={0}>
            <div className="industrial-card bg-card border border-border p-8 h-full rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-primary" size={24} />
                <h3 className="font-display font-500 text-xl text-foreground uppercase tracking-wide">Visión</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {empresa.vision}
              </p>
            </div>
          </RevealSection>

          {/* Mission */}
          <RevealSection delay={100}>
            <div className="industrial-card bg-card border border-border p-8 h-full rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-primary" size={24} />
                <h3 className="font-display font-500 text-xl text-foreground uppercase tracking-wide">Misión</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {empresa.mision}
              </p>
            </div>
          </RevealSection>

          {/* Quality */}
          <RevealSection delay={200}>
            <div className="industrial-card bg-card border border-border p-8 h-full rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-primary" size={24} />
                <h3 className="font-display font-500 text-xl text-foreground uppercase tracking-wide">Calidad</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                {empresa.politicaCalidad.compromiso}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-sm">
                <span className="font-mono text-xs text-primary font-500">ISO 9001:2015</span>
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Quality pillars */}
        <RevealSection delay={300} className="mt-16">
          <div className="cut-line mb-12" />
          <h3 className="font-display font-500 text-2xl text-foreground mb-8 uppercase tracking-wide">
            Pilares de Calidad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {empresa.politicaCalidad.pilaresCalidad.map((pilar, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded-sm hover:border-primary/50 transition-colors duration-300"
              >
                <span className="font-mono text-xs text-primary mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted-foreground">{pilar}</span>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
