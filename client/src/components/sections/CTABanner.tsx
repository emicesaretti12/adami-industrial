import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA_BG = "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1920&q=80";

export default function CTABanner() {
  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="container"
      >
        <div className="relative rounded-sm overflow-hidden border border-border">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${CTA_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-background/90" />
          
          {/* Content */}
          <div className="relative py-16 lg:py-20 text-center">
            <h2 className="font-display text-foreground leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              ¿Listo para optimizar{" "}
              <span className="text-gradient">su producción?</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Nuestro equipo de innovación tecnológica analizará su demanda y le propondrá la mejor solución.
            </p>
            <a
              href="#contacto"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-background font-sans text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Iniciar un proyecto
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
