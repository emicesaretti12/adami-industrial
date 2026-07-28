import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Car, Plane, Rocket, Atom, Wheat, Tractor, Fuel } from "lucide-react";
import { industrias } from "@/lib/adami-data";

const iconMap: Record<string, React.ElementType> = {
  car: Car,
  plane: Plane,
  rocket: Rocket,
  atom: Atom,
  wheat: Wheat,
  tractor: Tractor,
  fuel: Fuel,
};

export default function Industries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

  return (
    <section id="industrias" className="relative py-36 lg:py-48 overflow-hidden" ref={containerRef}>
      {/* Subtle divider */}
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
            <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">03 / Industrias</span>
          </div>
          <h2 className="font-display font-700 text-foreground leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Sectores que
            <br />
            <span className="text-muted-foreground">transformamos</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-[1.7] font-light max-w-2xl">
            {industrias.descripcionGeneral}
          </p>
        </motion.div>

        {/* Industry grid — Apple-style bento */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {industrias.sectores.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Atom;
            const isLarge = i === 0;
            return (
              <motion.div
                key={sector.nombre}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className={`group relative rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500 cursor-default overflow-hidden ${
                  isLarge ? "md:col-span-2 md:row-span-2 p-8 lg:p-12" : "p-6 lg:p-8"
                }`}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center h-full justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    className={`rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500 ${
                      isLarge ? "w-20 h-20 lg:w-24 lg:h-24" : "w-14 h-14 lg:w-16 lg:h-16"
                    }`}
                  >
                    <Icon className="text-primary" size={isLarge ? 36 : 24} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className={`font-display font-600 text-foreground tracking-tight ${
                    isLarge ? "text-xl lg:text-2xl" : "text-sm lg:text-base"
                  }`}>
                    {sector.nombre}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
