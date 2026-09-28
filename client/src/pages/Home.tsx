import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MousePointer2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import StatsBand from "@/components/home/StatsBand";
import Manifesto from "@/components/home/Manifesto";
import ProcessStack from "@/components/home/ProcessStack";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import IndustriesList from "@/components/home/IndustriesList";
import PrecisionSection from "@/components/home/PrecisionSection";
import ClosingCTA from "@/components/ClosingCTA";

/**
 * Partículas sutiles en el hero.
 * - Se cancela el requestAnimationFrame al desmontar (antes quedaba corriendo
 *   para siempre y se acumulaba un loop nuevo cada vez que se volvía a la home).
 * - Se pausa cuando el hero sale de pantalla o la pestaña está oculta.
 * - No corre con prefers-reduced-motion.
 * - Canvas del tamaño del hero (no de la ventana) y nítido en pantallas retina.
 */
const SparksEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const createParticle = (startAnywhere = false) => ({
      x: Math.random() * width,
      y: startAnywhere ? Math.random() * height : height + 10,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * -1.5 - 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    });

    const particles = Array.from({ length: 30 }, () => createParticle(true));

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(78, 110, 148, ${p.opacity})`; // #4e6e94 brand blue
        ctx.fill();
        if (p.y < -10) particles[i] = createParticle();
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!rafId && visible && !document.hidden) rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    observer.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50"
    />
  );
};

export default function Home() {
  const scrollToContent = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("stats")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans selection:bg-[#4e6e94] selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100svh] bg-[#0c1a29] flex flex-col justify-end items-center pb-8 md:pb-12 pt-24 md:pt-28 overflow-hidden">
        {/* Background image - responsive for mobile and desktop */}
        <div className="absolute inset-0 z-0 bg-[#0c1a29] flex items-center justify-center">
          <picture className="w-full h-full">
            <source 
              media="(max-width: 768px)" 
              srcSet="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787669775/ChatGPT_Image_25_ago_2026_11_51_49_a.m._btlmfx.png" 
            />
            <img 
              src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787669771/ChatGPT_Image_25_ago_2026_11_50_24_a.m._qo8hvw.png" 
              alt="ADAMI Soluciones Industriales"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-[center_28%] md:object-[center_30%]"
            />
          </picture>
          {/* Seamless gradient overlay: blends top and bottom on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a29]/70 via-transparent to-[#0c1a29]/95 pointer-events-none" />
        </div>

        <SparksEffect />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
            >
              <MagneticButton className="w-full sm:w-auto">
                <Link href="/servicios" className="press group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1a2b3d] rounded-lg font-medium text-sm hover:bg-[#f5f7fa] hover:shadow-xl w-full sm:w-auto">
                  Explorar Soluciones
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <Link href="/contacto" className="press inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/30 rounded-lg font-medium text-sm hover:bg-white/20 hover:border-white/60 w-full sm:w-auto backdrop-blur-sm">
                  Contactar
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <motion.button
          type="button"
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center p-2 text-white/60 hover:text-white transition-colors"
        >
          <MousePointer2 className="w-4 h-4 mb-1 animate-bounce text-white/75" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-widest font-semibold">Descubrir</span>
        </motion.button>
      </section>

      <StatsBand />
      <Manifesto />
      <ProcessStack />
      <ProjectsShowcase />
      <IndustriesList />
      <PrecisionSection />
      <ClosingCTA />

      <Footer />
    </div>
  );
}
