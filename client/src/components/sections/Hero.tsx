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
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
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
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-8 h-px bg-accent" />
            <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">
              {empresa.lema}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-display font-semibold text-foreground leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Treinta años forjando el{" "}
            <span className="text-gradient">futuro industrial</span>
            <span className="text-accent">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-[1.7]"
          >
            {empresa.descripcionProcesos}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#servicios"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-background font-sans text-sm font-medium transition-all duration-200 hover:opacity-90"
            >
              Conozca nuestros servicios
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#empresa"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-muted-foreground font-sans text-sm hover:text-foreground hover:border-muted-foreground/30 transition-all duration-200"
            >
              Sobre ADAMI
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
