import { motion } from "framer-motion";
import { empresa } from "@/lib/adami-data";
import { Eye, Target, Award } from "lucide-react";

const cards = [
  { icon: Eye, title: "Visión", description: empresa.vision },
  { icon: Target, title: "Misión", description: empresa.mision },
  { icon: Award, title: "Calidad", description: empresa.politicaCalidad.compromiso },
];

export default function About() {
  return (
    <section id="empresa" className="py-20 lg:py-28 bg-gray-50 border-t border-gray-200">
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
            <span className="font-sans text-xs font-bold tracking-widest text-red-600 uppercase">Empresa</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Más de tres décadas de excelencia industrial
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {empresa.quienesSomos}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-clean p-8"
              >
                <div className="w-12 h-12 rounded bg-blue-50 flex items-center justify-center mb-6">
                  <Icon className="text-accent" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quality pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-0.5 bg-red-500" />
            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">Estándares Corporativos</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {empresa.politicaCalidad.pilaresCalidad.map((pillar, i) => (
              <div
                key={i}
                className="p-4 card-clean text-center"
              >
                <span className="font-sans text-xs text-muted-foreground leading-relaxed font-medium">{pillar}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
