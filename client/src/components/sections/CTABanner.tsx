import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.92, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

  return (
    <section className="relative py-36 lg:py-48" ref={ref}>
      <motion.div
        className="container"
        style={{ scale, opacity }}
      >
        <div className="relative rounded-[2rem] overflow-hidden group">
          {/* Background */}
          <div
            className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
            style={{
              backgroundImage: `url(/manus-storage/metrology-faro_0e318265.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
          
          {/* Content */}
          <div className="relative z-10 py-20 lg:py-28 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="font-display font-700 text-foreground leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              ¿Listo para optimizar
              <br />
              <span className="text-gradient">su producción?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 text-muted-foreground max-w-xl mx-auto font-light text-lg leading-relaxed"
            >
              Nuestro equipo de innovación tecnológica analizará su demanda y le propondrá la mejor solución.
            </motion.p>
            <motion.a
              href="#contacto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="mt-12 group/btn inline-flex items-center gap-2 px-9 py-4 bg-foreground text-background font-sans text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Iniciar un proyecto
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
