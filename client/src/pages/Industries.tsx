import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Car, Plane, Rocket, Atom, Wheat, Tractor, Fuel } from "lucide-react";
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
  fuel: Fuel,
};

export default function IndustriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24">
          {/* Animated background glow */}
          <motion.div
            className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[200px] -z-10"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[180px] -z-10"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ width: "60px" }}
                />
                <span className="font-mono text-xs font-semibold tracking-[0.3em] text-accent uppercase">Sectores Industriales</span>
              </div>
              <h1 className="font-display font-700 text-foreground leading-[0.92] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                Sectores que
                <br />
                <span className="text-gradient">transformamos</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-[1.8] font-light max-w-3xl">
                Trabajamos con empresas líderes en diversos sectores industriales, aplicando soluciones tecnológicas adaptadas a cada realidad productiva.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industries Section */}
        <section ref={containerRef} className="relative py-48 overflow-hidden">
          {/* Subtle divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          {/* Animated background */}
          <motion.div
            className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-accent/4 blur-[200px] -z-10"
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div className="container" style={{ opacity }}>
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto mb-20 text-center"
            >
              <p className="text-lg text-muted-foreground leading-[1.8] font-light">
                {industrias.descripcionGeneral}
              </p>
            </motion.div>

            {/* Industry grid — Premium bento layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {industrias.sectores.map((sector, i) => {
                const Icon = iconMap[sector.icon] || Atom;
                const isLarge = i === 0;
                return (
                  <motion.div
                    key={sector.nombre}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ scale: 1.05 }}
                    className={`group relative rounded-2xl border border-accent/15 hover:border-accent/40 transition-all duration-700 cursor-default overflow-hidden ${
                      isLarge ? "md:col-span-2 md:row-span-2 p-10 lg:p-14" : "p-7 lg:p-10"
                    }`}
                  >
                    {/* Hover gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/15 to-accent/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10"
                    />

                    <div className="relative z-10 flex flex-col items-center text-center h-full justify-center gap-6">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 border border-accent/20 group-hover:border-accent/40 ${
                          isLarge ? "w-24 h-24 lg:w-28 lg:h-28" : "w-16 h-16 lg:w-20 lg:h-20"
                        }`}
                      >
                        <Icon className="text-accent" size={isLarge ? 40 : 28} strokeWidth={1.5} />
                      </motion.div>
                      <h3 className={`font-display font-700 text-foreground tracking-tight ${
                        isLarge ? "text-2xl lg:text-3xl" : "text-base lg:text-lg"
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

        {/* Stats Section */}
        <section className="relative py-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { number: "30+", label: "Años de Experiencia" },
                { number: "500+", label: "Proyectos Completados" },
                { number: "15+", label: "Sectores Atendidos" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="font-display text-4xl lg:text-5xl font-700 text-accent mb-3">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-light">{stat.label}</p>
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
