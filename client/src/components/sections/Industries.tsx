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
    <section id="industrias" className="py-20 lg:py-28 bg-gray-50 border-t border-gray-200">
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
            <span className="font-sans text-xs font-bold tracking-widest text-red-600 uppercase">Industrias</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Sectores que transformamos
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {industrias.descripcionGeneral}
          </p>
        </motion.div>

        {/* Industry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {industrias.sectores.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Atom;
            const isLarge = i === 0;
            return (
              <motion.div
                key={sector.nombre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`card-clean flex flex-col items-center justify-center text-center gap-4 ${
                  isLarge ? "md:col-span-2 md:row-span-2 p-10 lg:p-12" : "p-6 lg:p-8"
                }`}
              >
                <div className={`rounded bg-blue-50 flex items-center justify-center ${
                  isLarge ? "w-16 h-16 lg:w-20 lg:h-20" : "w-12 h-12"
                }`}>
                  <Icon className="text-accent" size={isLarge ? 32 : 24} strokeWidth={1.5} />
                </div>
                <h3 className={`font-display font-bold text-foreground tracking-tight ${
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
