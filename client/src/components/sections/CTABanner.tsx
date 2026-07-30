import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA_BG = "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1920&q=80";

export default function CTABanner() {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <div className="relative rounded overflow-hidden border border-gray-300">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${CTA_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-white/80" />
          
          {/* Content */}
          <div className="relative py-16 lg:py-24 text-center">
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              ¿Listo para optimizar{" "}
              <span className="text-accent">su producción?</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
              Nuestro equipo de innovación tecnológica analizará su demanda y le propondrá la mejor solución.
            </p>
            <a
              href="#contacto"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-sans text-sm font-medium hover:bg-blue-900 transition-all duration-200"
            >
              Iniciar un proyecto
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
