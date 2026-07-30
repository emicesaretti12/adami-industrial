import { motion } from "framer-motion";
import { ChevronRight, Settings, Wrench, Ruler } from "lucide-react";
import { servicios } from "@/lib/adami-data";

const icons: Record<string, React.ElementType> = {
  innovacion: Settings,
  metalurgicos: Wrench,
  industriales: Ruler,
};

export default function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 border-t border-border">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent" />
            <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Servicios</span>
          </div>
          <h2 className="font-display text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Soluciones{" "}
            <span className="text-gradient">llave en mano</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
            Su empresa puede contar con nosotros. Todos los servicios se abordan inicialmente en nuestra unidad de innovación tecnológica.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="space-y-6">
          {servicios.categorias.map((cat, i) => {
            const Icon = icons[cat.id] || Settings;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-clean overflow-hidden"
              >
                <div className="p-7 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr,2.5fr] gap-8 lg:gap-12 items-start">
                    {/* Left — icon and title */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="text-accent" size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="font-sans text-[10px] font-medium text-muted-foreground/50 tracking-wider">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground tracking-tight mt-1">
                          {cat.nombre}
                        </h3>
                      </div>
                    </div>

                    {/* Right — content */}
                    <div>
                      <p className="text-sm text-muted-foreground leading-[1.7] mb-6">
                        {cat.descripcionExtendida}
                      </p>

                      {/* Service details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {cat.detalleServicios.map((srv, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2.5 py-2"
                          >
                            <div className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                            <span className="text-sm text-muted-foreground">{srv}</span>
                          </div>
                        ))}
                      </div>

                      {/* Infrastructure */}
                      {cat.infraestructura && (
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {cat.infraestructura.map((inf, j) => (
                            <div
                              key={j}
                              className="p-4 rounded bg-background/50 border border-border"
                            >
                              <div className="text-xs font-medium text-foreground mb-1">{inf.area}</div>
                              <div className="font-sans text-[11px] text-accent">{inf.superficie}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Metrology */}
                      {cat.metrologia && (
                        <div className="flex flex-wrap gap-2">
                          {cat.metrologia.equipos.map((eq, j) => (
                            <span
                              key={j}
                              className="px-3 py-1.5 rounded border border-border font-sans text-xs text-muted-foreground bg-background/50"
                            >
                              {eq}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
