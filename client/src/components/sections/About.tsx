import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { empresa } from "@/lib/adami-data";
import { Award, Eye, Target } from "lucide-react";

const cards = [
  { icon: Eye, title: "Visión", description: empresa.vision, color: "from-blue-500/10 to-cyan-500/10" },
  { icon: Target, title: "Misión", description: empresa.mision, color: "from-purple-500/10 to-pink-500/10" },
  { icon: Award, title: "Calidad", description: empresa.politicaCalidad.compromiso, color: "from-amber-500/10 to-orange-500/10" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

  return (
    <section id="empresa" className="relative py-36 lg:py-48 overflow-hidden" ref={containerRef}>
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/3 blur-[180px] -z-10"
        style={{ y }}
      />

      <motion.div className="container" style={{ opacity }}>
        {/* Header with reveal */}
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
            <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">01 / Empresa</span>
          </div>
          <h2 className="font-display font-700 text-foreground leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Más de tres décadas
            <br />
            <span className="text-muted-foreground">de excelencia industrial</span>
          </h2>
          <motion.p
            className="mt-10 text-lg text-muted-foreground leading-[1.8] font-light max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {empresa.quienesSomos}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="group relative p-8 lg:p-10 rounded-3xl border border-white/5 hover:border-white/15 transition-all duration-700 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors duration-500"
                  >
                    <Icon className="text-primary" size={24} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-display text-xl font-600 text-foreground mb-4 tracking-tight">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7] font-light">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality pillars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-28"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-6 bg-white/20" />
            <h3 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-[0.25em]">Pilares de calidad</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {empresa.politicaCalidad.pilaresCalidad.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center hover:bg-white/[0.05] hover:border-white/15 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-sans text-xs font-medium text-muted-foreground leading-relaxed block">{pillar}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
