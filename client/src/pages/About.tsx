import { motion } from "framer-motion";
import { useEffect } from "react";
import { empresa } from "@/lib/adami-data";
import { Award, Eye, Target, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cards = [
  { icon: Eye, title: "Visión", description: empresa.vision },
  { icon: Target, title: "Misión", description: empresa.mision },
  { icon: Award, title: "Calidad", description: empresa.politicaCalidad.compromiso },
];

export default function AboutPage() {
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
        {/* Hero with background image */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          {/* Background image — subtle, professional */}
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.12_PM_wztmub.jpg"
              alt="Profesionales ADAMI en planta"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Acerca de ADAMI</span>
              </div>
              <h1 className="font-display font-semibold text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}>
                Más de tres décadas de{" "}
                <span className="text-gradient">excelencia industrial</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
                Transformando desafíos productivos en soluciones tecnológicas de precisión. ADAMI es el motor industrial de Argentina.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About content */}
        <section className="py-20 lg:py-24 border-t border-border">
          <div className="container">
            {/* Description + side image */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-3/5"
              >
                <p className="text-muted-foreground leading-[1.8] text-lg">
                  {empresa.quienesSomos}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:w-2/5 relative rounded-lg overflow-hidden min-h-[240px]"
              >
                <img
                  src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686345/WhatsApp_Image_2026-08-25_at_12.18.11_PM_xaxsdb.jpg"
                  alt="Estructura y capacidad ADAMI"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="card-clean p-8"
                  >
                    <div className="w-11 h-11 rounded bg-accent/10 flex items-center justify-center mb-6">
                      <Icon className="text-accent" size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3 tracking-tight">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-[1.7]">{card.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quality Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-muted-foreground/30" />
                <h3 className="font-display text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">Estándares Corporativos</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {empresa.politicaCalidad.pilaresCalidad.map((pillar, i) => (
                  <div key={i} className="p-5 card-clean flex items-start gap-3">
                    <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-muted-foreground leading-relaxed">{pillar}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-20 p-8 lg:p-10 rounded border border-border bg-background/50"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 tracking-tight">Certificaciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {empresa.politicaCalidad.certificaciones.map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded border border-border bg-background/50">
                    <Award className="text-accent shrink-0" size={24} />
                    <div>
                      <div className="font-display font-medium text-foreground">{cert.nombre}</div>
                      <div className="text-sm text-muted-foreground">{cert.entidad}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full-bleed Work showcase — editorial strip */}
        <section className="relative overflow-hidden">
          <div className="flex flex-col md:flex-row h-auto md:h-[420px]">
            {/* Left — large feature image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 relative min-h-[280px]"
            >
              <img
                src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686342/WhatsApp_Image_2026-08-25_at_12.18.10_PM_wbo9z6.jpg"
                alt="Proyecto industrial ADAMI"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="text-[10px] font-semibold text-white/70 tracking-[0.2em] uppercase">Proyectos</span>
                <h3 className="text-white font-semibold text-xl mt-1">Trabajos Realizados</h3>
              </div>
            </motion.div>

            {/* Right — 2×2 grid */}
            <div className="md:w-1/2 grid grid-cols-2">
              {[
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png", label: "Celda Robotizada" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686354/WhatsApp_Image_2026-08-25_at_12.18.28_PM_dkoxnh.jpg", label: "Control de Procesos" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686344/WhatsApp_Image_2026-08-25_at_12.18.11_PM_1_uehk0n.jpg", label: "Modelado 3D" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686364/WhatsApp_Image_2026-08-25_at_12.18.35_PM_1_asrkgp.jpg", label: "Maquinaria" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative group overflow-hidden min-h-[140px]"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <span className="text-white text-xs font-medium">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
