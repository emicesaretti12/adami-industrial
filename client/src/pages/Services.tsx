import { motion } from "framer-motion";
import { useEffect } from "react";
import { Settings, Wrench, Ruler, ArrowRight } from "lucide-react";
import { servicios } from "@/lib/adami-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const icons: Record<string, React.ElementType> = {
  innovacion: Settings,
  metalurgicos: Wrench,
  industriales: Ruler,
};

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Nuestros Servicios</span>
              </div>
              <h1 className="font-display font-semibold text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}>
                Soluciones{" "}
                <span className="text-gradient">llave en mano</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
                Más de 30 años de experiencia transformando desafíos productivos en soluciones tecnológicas de precisión.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 lg:py-24 border-t border-border">
          <div className="container">
            <div className="space-y-6">
              {servicios.categorias.map((cat, i) => {
                const Icon = icons[cat.id] || Settings;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="card-clean overflow-hidden"
                  >
                    <div className="p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-10 lg:gap-14 items-start">
                        {/* Left */}
                        <div className="flex flex-col items-start gap-5">
                          <div className="w-14 h-14 rounded bg-accent/10 flex items-center justify-center shrink-0">
                            <Icon className="text-accent" size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                            <span className="font-sans text-[10px] font-medium text-muted-foreground/50 tracking-wider uppercase">
                              Servicio {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foreground tracking-tight mt-2">
                              {cat.nombre}
                            </h3>
                          </div>
                        </div>

                        {/* Right */}
                        <div>
                          <p className="text-muted-foreground leading-[1.7] mb-8">
                            {cat.descripcionExtendida}
                          </p>

                          {/* Capabilities */}
                          <div className="mb-8">
                            <h4 className="font-display text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">Capacidades</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {cat.detalleServicios.map((srv, j) => (
                                <div key={j} className="flex items-center gap-2.5 py-2.5 px-3 rounded border border-border bg-background/50">
                                  <div className="w-1 h-1 rounded-full bg-accent shrink-0" />
                                  <span className="text-sm text-muted-foreground">{srv}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Infrastructure */}
                          {cat.infraestructura && (
                            <div className="mb-8">
                              <h4 className="font-display text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">Infraestructura</h4>
                              <div className="grid grid-cols-3 gap-3">
                                {cat.infraestructura.map((inf, j) => (
                                  <div key={j} className="p-4 rounded border border-border bg-background/50">
                                    <div className="text-[11px] font-medium text-accent uppercase tracking-wider mb-1">{inf.area}</div>
                                    <div className="text-sm text-foreground">{inf.superficie}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Metrology */}
                          {cat.metrologia && (
                            <div>
                              <h4 className="font-display text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">Equipamiento de Medición</h4>
                              <div className="flex flex-wrap gap-2">
                                {cat.metrologia.equipos.map((eq, j) => (
                                  <span key={j} className="px-3 py-1.5 rounded border border-border font-sans text-xs text-muted-foreground bg-background/50">
                                    {eq}
                                  </span>
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

        {/* CTA */}
        <section className="py-20 lg:py-24 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-5 tracking-tight">
                ¿Listo para transformar su proceso productivo?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nuestro equipo de expertos está disponible para analizar su situación y proponer la solución más eficiente.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-background font-sans text-sm font-medium hover:opacity-90 transition-opacity duration-200"
              >
                Solicitar Consultoría
                <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
