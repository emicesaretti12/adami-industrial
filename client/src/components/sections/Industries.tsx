import { motion } from "framer-motion";
import { Car, Plane, Rocket, Atom, Wheat, Tractor } from "lucide-react";
import { industrias } from "@/lib/adami-data";

const iconMap: Record<string, React.ElementType> = {
  car: Car,
  plane: Plane,
  rocket: Rocket,
  atom: Atom,
  wheat: Wheat,
  tractor: Tractor,
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {industrias.sectores.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Atom;
            return (
              <motion.div
                key={sector.nombre}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "220 / 260" }}>
                  {/* Image — full size, no cropping */}
                  <img 
                    src={sector.image} 
                    alt={`Industria ${sector.nombre} - ADAMI`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark gradient from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-65 transition-opacity duration-500" />
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1200ms] ease-in-out pointer-events-none" />
                  {/* Icon badge — top right */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="text-accent" size={18} strokeWidth={1.5} />
                  </div>
                  {/* Title block — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                    <h3 className="font-display font-bold text-white text-sm lg:text-base tracking-tight drop-shadow-md">
                      {sector.nombre}
                    </h3>
                    <div className="w-8 h-[2px] bg-accent mt-2 rounded-full group-hover:w-12 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
