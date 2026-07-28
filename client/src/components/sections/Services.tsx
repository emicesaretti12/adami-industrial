import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronRight, Settings, Wrench, Ruler } from "lucide-react";
import { servicios } from "@/lib/adami-data";

const icons: Record<string, React.ElementType> = {
  innovacion: Settings,
  metalurgicos: Wrench,
  industriales: Ruler,
};

const serviceColors = [
  "from-blue-500/10 to-purple-500/10",
  "from-emerald-500/10 to-teal-500/10",
  "from-amber-500/10 to-orange-500/10",
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="servicios" className="relative py-36 lg:py-48 overflow-hidden" ref={containerRef}>
      {/* Ambient glow */}
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[180px] -z-10"
        style={{ y }}
      />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="h-px bg-primary"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: "50px" }}
            />
            <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">02 / Servicios</span>
          </div>
          <h2 className="font-display font-700 text-foreground leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Soluciones
            <br />
            <span className="text-gradient">llave en mano</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-[1.7] font-light max-w-2xl">
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
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="group relative rounded-3xl border border-white/5 hover:border-white/15 transition-all duration-700 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${serviceColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 p-8 lg:p-14">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 lg:gap-14 items-start">
                    {/* Left — icon and number */}
                    <div className="flex items-start gap-5">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 8 }}
                        className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-500"
                      >
                        <Icon className="text-primary" size={28} strokeWidth={1.5} />
                      </motion.div>
                      <div>
                        <span className="font-mono text-xs font-medium text-muted-foreground/50 tracking-wider">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-2xl lg:text-3xl font-700 text-foreground tracking-tight mt-1">
                          {cat.nombre}
                        </h3>
                      </div>
                    </div>

                    {/* Right — content */}
                    <div>
                      <p className="text-base text-muted-foreground leading-[1.7] font-light mb-6">
                        {cat.descripcionExtendida}
                      </p>

                      {/* Service details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                        {cat.detalleServicios.map((srv, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + j * 0.06 }}
                            className="flex items-center gap-3 py-2.5"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                            <span className="text-sm text-muted-foreground font-light">{srv}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Infrastructure / Metrology info */}
                      {cat.infraestructura && (
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {cat.infraestructura.map((inf, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + j * 0.1 }}
                              className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                            >
                              <div className="text-sm font-medium text-foreground mb-1">{inf.area}</div>
                              <div className="font-mono text-xs text-primary">{inf.superficie}</div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {cat.metrologia && (
                        <div className="flex flex-wrap gap-2">
                          {cat.metrologia.equipos.map((eq, j) => (
                            <motion.span
                              key={j}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + j * 0.05 }}
                              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 font-sans text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300"
                            >
                              {eq}
                            </motion.span>
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
