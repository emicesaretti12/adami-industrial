import { motion } from "framer-motion";
import { empresa } from "@/lib/adami-data";
import { Award, Eye, Target } from "lucide-react";

const cards = [
  { icon: Eye, title: "Visión", description: empresa.vision },
  { icon: Target, title: "Misión", description: empresa.mision },
  { icon: Award, title: "Calidad", description: empresa.politicaCalidad.compromiso },
];

export default function About() {
  return (
    <section id="empresa" className="py-24 lg:py-32 border-t border-border">
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
            <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Empresa</span>
          </div>
          <h2 className="font-display text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Más de tres décadas de{" "}
            <span className="text-gradient">excelencia industrial</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
            {empresa.quienesSomos}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-clean p-7"
              >
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center mb-5">
                  <Icon className="text-accent" size={18} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 tracking-tight">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.7]">{card.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quality pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-muted-foreground/30" />
            <h3 className="font-display text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">Pilares de calidad</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {empresa.politicaCalidad.pilaresCalidad.map((pillar, i) => (
              <div
                key={i}
                className="p-4 card-clean text-center"
              >
                <span className="font-sans text-xs text-muted-foreground leading-relaxed">{pillar}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
