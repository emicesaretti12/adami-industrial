import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { empresa } from "@/lib/adami-data";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, 50]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const titleWords = ["Treinta", "años", "forjando", "el", "futuro", "industrial."];

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Cinematic background with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity, scale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/manus-storage/hero-industrial_debcfda4.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        {/* Multi-layer gradient overlays for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </motion.div>

      {/* Ambient light effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-24">
        <motion.div className="max-w-5xl" style={{ y: textY }}>
          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.div
              className="h-px bg-gradient-to-r from-primary to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={mounted ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: "40px" }}
            />
            <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
              {empresa.lema}
            </span>
          </motion.div>

          {/* Main heading with staggered word reveal */}
          <h1 className="font-display font-700 text-foreground leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}>
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.15em]"
                initial={{ opacity: 0, y: 100, rotateX: -20, filter: "blur(8px)" }}
                animate={mounted ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 1,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.5 + i * 0.1,
                }}
              >
                {word === "forjando" || word === "industrial." ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 1.3 }}
            className="mt-10 text-lg md:text-xl text-white/70 max-w-2xl leading-[1.7] font-light"
          >
            {empresa.descripcionProcesos}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 1.5 }}
            className="mt-14 flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#servicios"
              className="group inline-flex items-center justify-center gap-2 px-9 py-4 bg-foreground text-background font-sans text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Conozca nuestros servicios
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#empresa"
              className="inline-flex items-center justify-center px-9 py-4 border border-white/20 text-white/90 font-sans text-sm font-semibold hover:bg-white/5 hover:border-white/30 transition-all duration-300 rounded-full active:scale-[0.97]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Sobre ADAMI
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <a href="#stats" className="flex flex-col items-center gap-3 group">
          <span className="font-sans text-[10px] tracking-[0.2em] text-white/30 uppercase group-hover:text-white/60 transition-colors">
            Descubrir
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2 group-hover:border-primary/50 transition-colors"
          >
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-white/50"
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
