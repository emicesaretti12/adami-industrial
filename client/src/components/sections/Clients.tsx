import { motion } from "framer-motion";
import { clientes } from "@/lib/adami-data";

export default function Clients() {
  return (
    <section id="clientes" className="py-20 lg:py-28 bg-gray-50 border-t border-gray-200">
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
            <span className="font-sans text-xs font-bold tracking-widest text-red-600 uppercase">Clientes</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Empresas que confían en nosotros
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Trabajamos junto a las principales empresas de la industria automotriz, aeronáutica, aeroespacial y más.
          </p>
        </motion.div>

        {/* Featured clients grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12"
        >
          {clientes.destacados.map((client) => (
            <div
              key={client}
              className="p-4 card-clean text-center flex items-center justify-center min-h-20"
            >
              <span className="font-sans text-xs font-medium text-muted-foreground text-center">
                {client}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Marquee of other clients */}
        <div className="overflow-hidden py-8 border-y border-gray-300">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clientes.otros, ...clientes.otros].map((client, i) => (
              <span
                key={i}
                className="mx-6 font-sans text-xs text-muted-foreground/60 whitespace-nowrap"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Alliances */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-red-500" />
            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
              Alianzas Estratégicas
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {clientes.alianzasEstrategicas.map((alliance) => (
              <span
                key={alliance}
                className="px-4 py-2 rounded border border-gray-300 font-sans text-sm text-foreground bg-white"
              >
                {alliance}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
