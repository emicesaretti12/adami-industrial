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
        {/* Hero */}
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

        {/* Visual Showcase */}
        <section className="py-12 lg:py-16 border-t border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686345/WhatsApp_Image_2026-08-25_at_12.18.11_PM_xaxsdb.jpg", label: "Estructura y Capacidad" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.35_PM_v7otru.jpg", label: "Excelencia Integral" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.12_PM_wztmub.jpg", label: "Profesionales en Acción" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686342/WhatsApp_Image_2026-08-25_at_12.18.10_PM_wbo9z6.jpg", label: "Proyectos Realizados" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-lg aspect-[4/3]"
                >
                  <img 
                    src={item.src} 
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white text-sm font-medium">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About content */}
        <section className="py-20 lg:py-24 border-t border-border">
          <div className="container">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-20"
            >
              <p className="text-muted-foreground leading-[1.8]">
                {empresa.quienesSomos}
              </p>
            </motion.div>

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

            {/* Work Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-muted-foreground/30" />
                <h3 className="font-display text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">En Acción</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png", label: "Celda Robotizada" },
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png", label: "Medición Láser" },
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686354/WhatsApp_Image_2026-08-25_at_12.18.28_PM_dkoxnh.jpg", label: "Control de Procesos" },
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686344/WhatsApp_Image_2026-08-25_at_12.18.11_PM_1_uehk0n.jpg", label: "Modelado 3D" },
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670625/6cfdf9c1-a1e5-4d02-bc6c-83dd4a4792da.png", label: "Robot Industrial" },
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686364/WhatsApp_Image_2026-08-25_at_12.18.35_PM_1_asrkgp.jpg", label: "Maquinaria" },
                ].map((item, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-lg aspect-[4/3]">
                    <img 
                      src={item.src} 
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-white text-sm font-medium">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
