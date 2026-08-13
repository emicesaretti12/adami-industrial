import { motion } from "framer-motion";
import { useEffect } from "react";
import { Car, Plane, Rocket, Atom, Wheat, Tractor } from "lucide-react";
import { industrias } from "@/lib/adami-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const iconMap: Record<string, React.ElementType> = {
  car: Car,
  plane: Plane,
  rocket: Rocket,
  atom: Atom,
  wheat: Wheat,
  tractor: Tractor,
};

export default function IndustriesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Sectores Industriales</span>
              </div>
              <h1 className="font-display font-semibold text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}>
                Sectores que{" "}
                <span className="text-gradient">transformamos</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
                Trabajamos con empresas líderes en diversos sectores industriales, aplicando soluciones tecnológicas adaptadas a cada realidad productiva.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industries grid */}
        <section className="py-20 lg:py-24 border-t border-border">
          <div className="container">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <p className="text-muted-foreground leading-[1.7]">
                {industrias.descripcionGeneral}
              </p>
            </motion.div>

            {/* Grid */}
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
                    className={`card-clean flex flex-col items-center justify-center text-center gap-4 ${
                      isLarge ? "md:col-span-2 md:row-span-2 p-10 lg:p-12" : "p-7 lg:p-8"
                    }`}
                  >
                    <div className={`rounded bg-accent/10 flex items-center justify-center ${
                      isLarge ? "w-18 h-18 lg:w-22 lg:h-22" : "w-14 h-14"
                    }`}>
                      <Icon className="text-accent" size={isLarge ? 32 : 22} strokeWidth={1.5} />
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

        {/* Stats */}
        <section className="py-20 lg:py-24 border-t border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { number: "+30", label: "Años de Experiencia" },
                { number: "+60", label: "Clientes Industriales" },
                { number: "6", label: "Sectores Atendidos" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-4xl lg:text-5xl font-semibold text-accent mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
