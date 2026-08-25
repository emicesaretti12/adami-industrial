import { motion } from "framer-motion";
import { useEffect } from "react";
import { Car, Plane, Rocket, Atom, Wheat, Tractor, ArrowRight } from "lucide-react";
import { industrias } from "@/lib/adami-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import MagneticButton from "@/components/MagneticButton";

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
        {/* Hero — cinematic with real image */}
        <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-end overflow-hidden">
          <img
            src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.35_PM_v7otru.jpg"
            alt="Excelencia industrial ADAMI"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a29] via-[#0c1a29]/40 to-[#0c1a29]/20" />

          <div className="relative z-10 container pb-14 md:pb-20 pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-white/40" />
                <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-white/60 uppercase">Sectores Industriales</span>
              </div>
              <h1 className="font-display font-semibold text-white leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}>
                Sectores que transformamos
              </h1>
              <p className="mt-6 text-white/50 leading-[1.7] max-w-xl">
                Trabajamos con empresas líderes en diversos sectores industriales, aplicando soluciones tecnológicas adaptadas a cada realidad productiva.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Description band */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start"
            >
              <p className="text-muted-foreground leading-[1.8] lg:w-3/5 text-lg">
                {industrias.descripcionGeneral}
              </p>
              <div className="lg:w-2/5 grid grid-cols-3 gap-6">
                {[
                  { number: "+30", label: "Años" },
                  { number: "+60", label: "Clientes" },
                  { number: "6", label: "Sectores" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-3xl lg:text-4xl font-semibold text-accent tracking-tight">
                      {stat.number}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industries — featured layout instead of uniform grid */}
        <section className="py-20 lg:py-28">
          <div className="container">
            {/* Top row — 2 large featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {industrias.sectores.slice(0, 2).map((sector, i) => {
                const Icon = iconMap[sector.icon] || Atom;
                return (
                  <motion.div
                    key={sector.nombre}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 10" }}>
                      <img 
                        src={sector.image} 
                        alt={`Industria ${sector.nombre} - ADAMI`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="text-accent" size={18} strokeWidth={1.5} />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="font-display font-semibold text-white text-xl md:text-2xl tracking-tight">
                          {sector.nombre}
                        </h3>
                        <div className="w-10 h-[2px] bg-accent mt-3 rounded-full group-hover:w-20 transition-all duration-500" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom row — 4 smaller */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {industrias.sectores.slice(2).map((sector, i) => {
                const Icon = iconMap[sector.icon] || Atom;
                return (
                  <motion.div
                    key={sector.nombre}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "3 / 4" }}>
                      <img 
                        src={sector.image} 
                        alt={`Industria ${sector.nombre} - ADAMI`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="text-accent" size={16} strokeWidth={1.5} />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                        <h3 className="font-display font-semibold text-white text-sm md:text-base tracking-tight">
                          {sector.nombre}
                        </h3>
                        <div className="w-8 h-[2px] bg-accent mt-2 rounded-full group-hover:w-14 transition-all duration-500" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Social proof — work showcase strip */}
        <section className="border-t border-border">
          <div className="flex flex-col md:flex-row">
            {/* Left — content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:w-5/12 py-16 md:py-24 px-6 lg:px-16 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-accent" />
                <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Resultados</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
                Soluciones comprobadas en campo
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Cada proyecto refleja nuestro compromiso con la excelencia técnica y la satisfacción del cliente.
              </p>
              <MagneticButton>
                <Link href="/contacto" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-md text-sm hover:bg-accent/90 transition-colors w-fit">
                  Consultar por su proyecto
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Right — image mosaic */}
            <div className="md:w-7/12 grid grid-cols-2 min-h-[320px]">
              <div className="relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png"
                  alt="Celda robotizada"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png"
                  alt="Medición láser"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686354/WhatsApp_Image_2026-08-25_at_12.18.28_PM_dkoxnh.jpg"
                  alt="Control de procesos"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670625/6cfdf9c1-a1e5-4d02-bc6c-83dd4a4792da.png"
                  alt="Robot industrial"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
