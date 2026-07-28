import { Handshake } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { clientes } from "@/lib/adami-data";

/**
 * Clients section — featured clients in a marquee, strategic alliances,
 * and a full client list.
 */
export default function Clients() {
  // Duplicate for seamless marquee
  const marqueeClients = [...clientes.destacados, ...clientes.destacados];

  return (
    <section id="clientes" className="relative py-24 lg:py-32 bg-card border-y border-border overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />

      <div className="container relative z-10">
        {/* Header */}
        <RevealSection className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              04 / Clientes
            </span>
          </div>
          <h2 className="font-display font-600 text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            La industria nos <span className="text-amber-gradient">respalda</span>
          </h2>
        </RevealSection>

        {/* Strategic alliances */}
        <RevealSection delay={100} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Handshake className="text-primary" size={20} />
            <h3 className="font-display font-500 text-lg text-foreground uppercase tracking-wide">
              Alianzas Estratégicas
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {clientes.alianzasEstrategicas.map((aliado, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-sm font-display font-600 text-lg text-primary uppercase tracking-wide"
              >
                {aliado}
              </div>
            ))}
          </div>
        </RevealSection>
      </div>

      {/* Marquee — full width */}
      <RevealSection delay={200} className="mb-16">
        <div className="relative overflow-hidden py-8 border-y border-border bg-background">
          <div className="flex animate-marquee whitespace-nowrap">
            {marqueeClients.map((client, i) => (
              <span
                key={i}
                className="inline-flex items-center mx-8 font-display font-500 text-2xl text-muted-foreground/40 hover:text-primary transition-colors duration-300"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Full client list */}
      <div className="container relative z-10">
        <RevealSection delay={100}>
          <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
            Clientes destacados
          </h3>
        </RevealSection>
        <RevealSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            {clientes.destacados.map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-2 border-b border-border/50 hover:border-primary/30 transition-colors"
              >
                <span className="font-mono text-[10px] text-primary/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted-foreground">{client}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Other clients */}
        <RevealSection delay={300} className="mt-12">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              <span className="inline-block w-4 h-4 border border-current rounded-sm group-open:rotate-45 transition-transform duration-200 flex items-center justify-center text-xs leading-none">+</span>
              Ver listado completo de clientes ({clientes.otros.length})
            </summary>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {clientes.otros.map((client, i) => (
                <div key={i} className="text-sm text-muted-foreground/70 py-1">
                  {client}
                </div>
              ))}
            </div>
          </details>
        </RevealSection>
      </div>
    </section>
  );
}
