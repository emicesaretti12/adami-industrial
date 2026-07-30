import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { empresa } from "@/lib/adami-data";

const HERO_BG = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-white">
      {/* Background image with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        {/* Overlay blanco muy suave */}
        <div className="absolute inset-0 bg-white/75" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-0.5 bg-red-500" />
            <span className="font-sans text-xs font-bold tracking-widest text-red-600 uppercase">
              {empresa.lema}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display font-bold text-foreground leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Treinta años de excelencia en{" "}
            <span className="text-accent">soluciones industriales</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            {empresa.descripcionProcesos}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#servicios"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Conocer Servicios
              <ArrowRight size={16} />
            </a>
            <a
              href="#empresa"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Sobre ADAMI
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
