import { motion } from "framer-motion";
import { Settings, Wrench, Ruler } from "lucide-react";
import { servicios } from "@/lib/adami-data";

const icons: Record<string, React.ElementType> = {
  innovacion: Settings,
  metalurgicos: Wrench,
  industriales: Ruler,
};

export default function Services() {
  return (
    <section id="servicios" className="py-20 lg:py-28 bg-white border-t border-gray-200">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-red-500" />
            <span className="font-sans text-xs font-bold tracking-widest text-red-600 uppercase">Servicios</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Soluciones llave en mano
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-clean overflow-hidden"
              >
                <div className="p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 lg:gap-12 items-start">
                    {/* Left — icon and title */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon className="text-accent" size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="font-sans text-xs font-bold text-muted-foreground tracking-widest uppercase">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
                          {cat.nombre}
                        </h3>
                      </div>
                    </div>

                    {/* Right — content */}
                    <div>
                      <p className="text-base text-muted-foreground leading-relaxed mb-6">
                        {cat.descripcionExtendida}
                      </p>

                      {/* Service details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {cat.detalleServicios.map((srv, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-3"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                            <span className="text-sm text-muted-foreground">{srv}</span>
                          </div>
                        ))}
                      </div>

                      {/* Infrastructure */}
                      {cat.infraestructura && (
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {cat.infraestructura.map((inf, j) => (
                            <div
                              key={j}
                              className="p-4 bg-gray-50 border border-gray-200 rounded"
                            >
                              <div className="text-xs font-bold text-foreground mb-1">{inf.area}</div>
                              <div className="font-sans text-xs text-accent font-bold">{inf.superficie}</div>
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
                              className="px-3 py-1.5 rounded border border-gray-300 font-sans text-xs text-muted-foreground bg-white"
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
