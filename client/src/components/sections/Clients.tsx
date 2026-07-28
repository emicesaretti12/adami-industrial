import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { clientes } from "@/lib/adami-data";

export default function Clients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

  return (
    <section id="clientes" className="relative py-36 lg:py-48 overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div className="container" style={{ opacity }}>
        {/* Header */}
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
            <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">04 / Clientes</span>
          </div>
          <h2 className="font-display font-700 text-foreground leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Empresas que
            <br />
            <span className="text-muted-foreground">confían en nosotros</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-[1.7] font-light max-w-2xl">
            Trabajamos junto a las principales empresas de la industria automotriz, aeronáutica, aeroespacial y más.
          </p>
        </motion.div>

        {/* Featured clients — large grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12"
        >
          {clientes.destacados.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              <span className="font-display text-sm font-500 text-muted-foreground hover:text-foreground transition-colors duration-300">
                {client}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee of other clients */}
        <div className="overflow-hidden py-10 border-t border-b border-white/5">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clientes.otros, ...clientes.otros].map((client, i) => (
              <span
                key={i}
                className="mx-8 font-sans text-xs font-medium text-muted-foreground/30 whitespace-nowrap"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Alliances */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-6 bg-white/20" />
            <h3 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-[0.25em]">
              Alianzas estratégicas
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {clientes.alianzasEstrategicas.map((alliance, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 font-display text-sm font-500 text-foreground hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                {alliance}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
