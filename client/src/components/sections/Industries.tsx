import { motion } from "framer-motion";
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
  return (
    <section id="industrias" className="py-24 lg:py-32 border-t border-border">
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
            <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Industrias</span>
          </div>
          <h2 className="font-display text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Sectores que{" "}
            <span className="text-muted-foreground">transformamos</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
            {industrias.descripcionGeneral}
          </p>
        </motion.div>

        {/* Industry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {industrias.sectores.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Atom;
            const isLarge = i === 0;
            return (
              <motion.div
                key={sector.nombre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`card-clean flex flex-col items-center justify-center text-center gap-3 ${
                  isLarge ? "md:col-span-2 md:row-span-2 p-10 lg:p-12" : "p-6 lg:p-8"
                }`}
              >
                <div className={`rounded bg-accent/10 flex items-center justify-center ${
                  isLarge ? "w-16 h-16 lg:w-20 lg:h-20" : "w-12 h-12"
                }`}>
                  <Icon className="text-accent" size={isLarge ? 28 : 20} strokeWidth={1.5} />
                </div>
                <h3 className={`font-display font-semibold text-foreground tracking-tight ${
                  isLarge ? "text-lg lg:text-xl" : "text-sm"
                }`}>
                  {sector.nombre}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
