import { useState } from "react";
import { Plus, Minus, Check, Ruler, Wrench, Settings } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { servicios } from "@/lib/adami-data";

const icons: Record<string, React.ElementType> = {
  innovacion: Settings,
  metalurgicos: Wrench,
  industriales: Ruler,
};

/**
 * Services section — three main service categories with expandable details.
 */
export default function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="servicios" className="relative py-24 lg:py-32 bg-card border-y border-border overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />

      <div className="container relative z-10">
        {/* Header */}
        <RevealSection className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              02 / Servicios
            </span>
          </div>
          <h2 className="font-display font-600 text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Soluciones <span className="text-amber-gradient">llave en mano</span> para la industria
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {servicios.descripcionGeneral}
          </p>
        </RevealSection>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {servicios.categorias.map((cat, i) => {
            const Icon = icons[cat.id] || Settings;
            const isOpen = expanded === cat.id;

            return (
              <RevealSection key={cat.id} delay={i * 100}>
                <div
                  className={`industrial-card bg-background border rounded-sm overflow-hidden h-full flex flex-col ${
                    isOpen ? "border-primary" : "border-border"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cat.imagen}
                      alt={cat.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <Icon className="text-primary" size={18} />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-600 text-xl text-foreground uppercase tracking-wide mb-3">
                      {cat.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {cat.descripcionCorta}
                    </p>

                    {/* Expandable details */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-out"
                      style={{
                        maxHeight: isOpen ? "600px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {cat.descripcionExtendida}
                        </p>

                        {/* Detail services list */}
                        <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                          Detalle de servicios
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {cat.detalleServicios.map((srv, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <Check className="text-primary shrink-0 mt-0.5" size={14} />
                              <span className="text-sm text-muted-foreground">{srv}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Infrastructure (if metalurgicos) */}
                        {cat.infraestructura && (
                          <div className="mt-4">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                              Infraestructura
                            </h4>
                            <div className="space-y-2">
                              {cat.infraestructura.map((inf, j) => (
                                <div key={j} className="p-3 bg-secondary/50 border border-border rounded-sm">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-foreground">{inf.area}</span>
                                    <span className="font-mono text-xs text-primary">{inf.superficie}</span>
                                  </div>
                                  {inf.detalle && (
                                    <p className="text-xs text-muted-foreground">{inf.detalle}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Metrology ( if industriales) */}
                        {cat.metrologia && (
                          <div className="mt-4">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                              Metrología
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              {cat.metrologia.descripcion}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {cat.metrologia.equipos.map((eq, j) => (
                                <span key={j} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm font-mono text-xs text-primary">
                                  {eq}
                                </span>
                              ))}
                              {cat.metrologia.software.map((sw, j) => (
                                <span key={j} className="px-3 py-1 bg-secondary border border-border rounded-sm font-mono text-xs text-muted-foreground">
                                  {sw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Toggle button */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : cat.id)}
                      className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {isOpen ? (
                        <>
                          <Minus size={16} /> Ver menos
                        </>
                      ) : (
                        <>
                          <Plus size={16} /> Ver más detalle
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
