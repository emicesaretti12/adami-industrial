import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { ChevronRight, Settings, Wrench, Ruler, ArrowRight } from "lucide-react";
import { servicios } from "@/lib/adami-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const icons: Record<string, React.ElementType> = {
  innovacion: Settings,
  metalurgicos: Wrench,
  industriales: Ruler,
};

const serviceColors = [
  "from-amber-500/5 to-orange-500/5",
  "from-amber-400/5 to-yellow-500/5",
  "from-orange-500/5 to-red-500/5",
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24">
          {/* Animated background glow */}
          <motion.div
            className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[200px] -z-10"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[180px] -z-10"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ width: "60px" }}
                />
                <span className="font-mono text-xs font-semibold tracking-[0.3em] text-accent uppercase">Nuestros Servicios</span>
              </div>
              <h1 className="font-display font-700 text-foreground leading-[0.92] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                Soluciones
                <br />
                <span className="text-gradient">llave en mano</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-[1.8] font-light max-w-3xl">
                Más de 30 años de experiencia transformando desafíos productivos en soluciones tecnológicas de precisión. Cada proyecto es diseñado, desarrollado e implementado con rigor ingenieril.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={containerRef} className="relative py-48 overflow-hidden">
          {/* Ambient glow */}
          <motion.div
            className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-accent/4 blur-[200px] -z-10"
            style={{ y }}
          />

          <div className="container">
            <div className="space-y-8">
              {servicios.categorias.map((cat, i) => {
                const Icon = icons[cat.id] || Settings;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: i * 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="group relative rounded-2xl border border-accent/10 hover:border-accent/30 transition-all duration-700 overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${serviceColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"
                    />

                    <div className="relative z-10 p-10 lg:p-16">
                      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-12 lg:gap-16 items-start">
                        {/* Left — icon and number */}
                        <div className="flex flex-col items-start gap-6">
                          <motion.div
                            whileHover={{ scale: 1.15, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-20 h-20 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all duration-500 border border-accent/20 group-hover:border-accent/40"
                          >
                            <Icon className="text-accent" size={32} strokeWidth={1.5} />
                          </motion.div>
                          <div>
                            <span className="font-mono text-sm font-medium text-accent/60 tracking-wider">
                              SERVICIO {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-display text-3xl lg:text-4xl font-700 text-foreground tracking-tight mt-3 leading-tight">
                              {cat.nombre}
                            </h3>
                          </div>
                        </div>

                        {/* Right — content */}
                        <div>
                          <p className="text-lg text-muted-foreground leading-[1.8] font-light mb-8">
                            {cat.descripcionExtendida}
                          </p>

                          {/* Service details */}
                          <div className="mb-10">
                            <h4 className="font-display text-sm font-600 text-accent uppercase tracking-wider mb-4">Capacidades</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {cat.detalleServicios.map((srv, j) => (
                                <motion.div
                                  key={j}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.3 + j * 0.08 }}
                                  className="flex items-center gap-3 py-3 px-4 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/30 hover:bg-accent/10 transition-all duration-300"
                                >
                                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                                  <span className="text-sm text-foreground font-light">{srv}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Infrastructure / Metrology info */}
                          {cat.infraestructura && (
                            <div className="mb-10">
                              <h4 className="font-display text-sm font-600 text-accent uppercase tracking-wider mb-4">Infraestructura</h4>
                              <div className="grid grid-cols-3 gap-4">
                                {cat.infraestructura.map((inf, j) => (
                                  <motion.div
                                    key={j}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + j * 0.1 }}
                                    className="p-5 rounded-xl bg-accent/5 border border-accent/10 hover:border-accent/30 hover:bg-accent/10 transition-all duration-300"
                                  >
                                    <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{inf.area}</div>
                                    <div className="font-mono text-sm text-foreground font-medium">{inf.superficie}</div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {cat.metrologia && (
                            <div>
                              <h4 className="font-display text-sm font-600 text-accent uppercase tracking-wider mb-4">Equipamiento de Medición</h4>
                              <div className="flex flex-wrap gap-3">
                                {cat.metrologia.equipos.map((eq, j) => (
                                  <motion.span
                                    key={j}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + j * 0.06 }}
                                    className="px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 font-mono text-xs text-accent font-medium hover:border-accent/50 hover:bg-accent/20 transition-all duration-300 cursor-default"
                                  >
                                    {eq}
                                  </motion.span>
                                ))}
                              </div>
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

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-display text-4xl lg:text-5xl font-700 text-foreground mb-6">
                ¿Listo para transformar tu proceso productivo?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Nuestro equipo de expertos está disponible para analizar tu situación y proponer la solución más eficiente.
              </p>
              <motion.a
                href="/contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
              >
                Solicitar Consultoría
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
