import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { empresa } from "@/lib/adami-data";
import { Award, Eye, Target, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cards = [
  { icon: Eye, title: "Visión", description: empresa.vision, color: "from-amber-500/8 to-orange-500/5" },
  { icon: Target, title: "Misión", description: empresa.mision, color: "from-orange-500/8 to-red-500/5" },
  { icon: Award, title: "Calidad", description: empresa.politicaCalidad.compromiso, color: "from-amber-400/8 to-yellow-500/5" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

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
                <span className="font-mono text-xs font-semibold tracking-[0.3em] text-accent uppercase">Acerca de ADAMI</span>
              </div>
              <h1 className="font-display font-700 text-foreground leading-[0.92] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                Más de tres décadas
                <br />
                <span className="text-gradient">de excelencia industrial</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-[1.8] font-light max-w-3xl">
                Transformando desafíos productivos en soluciones tecnológicas de precisión. ADAMI es el motor industrial de Argentina.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section ref={containerRef} className="relative py-48 overflow-hidden">
          {/* Ambient glow */}
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/4 blur-[200px] -z-10"
            style={{ y }}
          />

          <motion.div className="container" style={{ opacity }}>
            {/* Main description */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-4xl mb-24"
            >
              <motion.p
                className="text-xl text-muted-foreground leading-[1.9] font-light mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                {empresa.quienesSomos}
              </motion.p>
            </motion.div>

            {/* Strategic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
              {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: i * 0.2, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ scale: 1.03 }}
                    className="group relative p-10 lg:p-12 rounded-2xl border border-accent/15 hover:border-accent/40 transition-all duration-700 overflow-hidden"
                  >
                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/15 to-accent/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10"
                    />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent/20 transition-all duration-500 border border-accent/20 group-hover:border-accent/40"
                      >
                        <Icon className="text-accent" size={28} strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="font-display text-2xl font-700 text-foreground mb-4 tracking-tight">{card.title}</h3>
                      <p className="text-base text-muted-foreground leading-[1.8] font-light">{card.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quality Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex items-center gap-4 mb-12">
                <motion.div
                  className="h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ width: "50px" }}
                />
                <h3 className="font-display text-sm font-700 text-accent uppercase tracking-[0.3em]">Pilares de Calidad</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {empresa.politicaCalidad.pilaresCalidad.map((pillar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ scale: 1.05, translateY: -4 }}
                    className="p-6 rounded-xl bg-accent/8 border border-accent/15 hover:border-accent/40 hover:bg-accent/12 transition-all duration-300 flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                    <span className="font-sans text-sm font-medium text-foreground leading-relaxed">{pillar}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-32 p-10 lg:p-14 rounded-2xl border border-accent/20 bg-accent/5"
            >
              <h3 className="font-display text-2xl font-700 text-foreground mb-8">Certificaciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {empresa.politicaCalidad.certificaciones.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-center gap-4 p-5 rounded-lg bg-accent/10 border border-accent/20"
                  >
                    <Award className="text-accent shrink-0" size={28} />
                    <div>
                      <div className="font-display font-600 text-foreground">{cert.nombre}</div>
                      <div className="text-sm text-muted-foreground">{cert.entidad}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
