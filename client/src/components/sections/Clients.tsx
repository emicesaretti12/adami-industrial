import { motion } from "framer-motion";
import { clientes } from "@/lib/adami-data";

export default function Clients() {
  return (
    <section id="clientes" className="py-24 lg:py-32 border-t border-border">
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
            <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Clientes</span>
          </div>
          <h2 className="font-display text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Empresas que{" "}
            <span className="text-muted-foreground">confían en nosotros</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
            Trabajamos junto a las principales empresas de la industria automotriz, aeronáutica, aeroespacial y más.
          </p>
        </motion.div>

        {/* Featured clients grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-10"
        >
          {clientes.destacados.map((client, i) => (
            <div
              key={client}
              className="p-4 card-clean text-center flex items-center justify-center"
            >
              <span className="font-sans text-xs font-medium text-muted-foreground">
                {client}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Marquee of other clients */}
        <div className="overflow-hidden py-8 border-y border-border">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clientes.otros, ...clientes.otros].map((client, i) => (
              <span
                key={i}
                className="mx-6 font-sans text-xs text-muted-foreground/40 whitespace-nowrap"
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
            <div className="w-6 h-px bg-muted-foreground/30" />
            <h3 className="font-display text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
              Alianzas estratégicas
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {clientes.alianzasEstrategicas.map((alliance, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded border border-border font-sans text-sm text-foreground"
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
