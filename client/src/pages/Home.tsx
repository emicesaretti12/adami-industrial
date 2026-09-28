import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Factory,
  Wrench,
  Cpu,
  MonitorPlay,
  Cog,
  HardHat,
  ShieldCheck,
  CheckCircle,
  Truck,
  Building2,
  Droplets,
  Zap,
  MousePointer2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";

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
  const sectionVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    }
  };

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

      {/* 2. STATS SECTION */}
      <motion.section 
        id="stats"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-[#f5f7fa] border-y border-[#e2e8f0] relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 30, prefix: "+", suffix: "", label: "Años de Experiencia" },
              { value: 3, prefix: "", suffix: "", label: "Unidades de Negocio" },
              { value: 100, prefix: "+", suffix: "", label: "Proyectos Exitosos" },
              { value: 1, prefix: "", suffix: "", label: "Planta Industrial" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#2c4a6e] mb-2 font-mono stat-number">
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-medium text-[#5a6b7c] uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. SERVICES SECTION */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 bg-white relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#4e6e94] tracking-widest uppercase mb-3 block">
              Servicios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d]">
              Unidades de Negocio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Innovación Tecnológica",
                desc: "Soluciones avanzadas en automatización, robótica y sistemas de control para la industria 4.0.",
                items: ["Automatización Industrial", "Sistemas SCADA", "Visión Artificial"]
              },
              {
                icon: Factory,
                title: "Desarrollos Metalúrgicos",
                desc: "Ingeniería, diseño y fabricación de componentes y estructuras mecánicas de alta precisión.",
                items: ["Mecanizado CNC", "Estructuras Pesadas", "Calderería"]
              },
              {
                icon: Wrench,
                title: "Servicios Industriales",
                desc: "Mantenimiento integral, montaje y soluciones para paradas de planta programadas.",
                items: ["Mantenimiento Preventivo", "Montajes Industriales", "Paradas de Planta", "Optimización"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="h-full"
              >
                <TiltCard className="h-full bg-white border border-[#e2e8f0] rounded-xl p-8 hover:shadow-xl hover:border-[#dce4ed] transition-[box-shadow,border-color] duration-300 group">
                  <div className="w-14 h-14 bg-[#f5f7fa] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4e6e94] transition-colors duration-300 icon-box-blue">
                    <service.icon className="w-7 h-7 text-[#4e6e94] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a2b3d] mb-4 group-hover:text-[#4e6e94] transition-colors">{service.title}</h3>
                  <p className="text-[#5a6b7c] mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="space-y-3">
                    {service.items.map((item, j) => (
                      <li key={j} className="flex items-start text-sm text-[#5a6b7c]">
                        <ChevronRight className="w-4 h-4 text-[#6b8db5] mr-2 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. PROJECT SHOWCASE — Editorial Bento Layout */}
      <section className="relative z-10 bg-[#0c1a29] overflow-hidden">
        {/* Full-width hero image band */}
        <div className="relative h-[40vh] md:h-[50vh]">
          <img
            src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787686345/WhatsApp_Image_2026-08-25_at_12.18.11_PM_xaxsdb.jpg"
            alt="Planta industrial ADAMI — estructura y capacidad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a29]/40 via-[#0c1a29]/20 to-[#0c1a29]" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-semibold text-[#6b8db5] tracking-[0.25em] uppercase">Proyectos Realizados</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 tracking-tight">
                Ingeniería en acción
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Bento grid — asymmetric, editorial */}
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
            {/* Large featured — Celda Robotizada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-6 md:col-span-7 row-span-2 relative rounded-lg overflow-hidden group"
            >
              <img
                src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png"
                alt="Celda de soldadura robotizada"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 md:p-6">
                <span className="text-[10px] font-semibold text-[#6b8db5] tracking-[0.2em] uppercase">Robótica</span>
                <h3 className="text-white font-semibold text-lg md:text-xl mt-1">Celda de Soldadura Robotizada</h3>
              </div>
            </motion.div>

            {/* Medición Láser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-3 md:col-span-5 row-span-1 relative rounded-lg overflow-hidden group"
            >
              <img
                src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png"
                alt="Medición láser de precisión"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-white/90 font-medium text-sm">Medición Láser</span>
              </div>
            </motion.div>

            {/* Robot Industrial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="col-span-3 md:col-span-5 row-span-1 relative rounded-lg overflow-hidden group"
            >
              <img
                src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787670625/6cfdf9c1-a1e5-4d02-bc6c-83dd4a4792da.png"
                alt="Robot industrial ADAMI"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-white/90 font-medium text-sm">Robot Industrial</span>
              </div>
            </motion.div>

            {/* Second row */}
            {/* Medición inteligente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-3 md:col-span-4 row-span-1 relative rounded-lg overflow-hidden group"
            >
              <img
                src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787670549/6cfdf6d7-b576-454e-9217-ee63a100ffd0.png"
                alt="Servicio de medición inteligente"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-white/90 font-medium text-sm">Medición Inteligente</span>
              </div>
            </motion.div>

            {/* Celda Robotizada 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="col-span-3 md:col-span-4 row-span-1 relative rounded-lg overflow-hidden group"
            >
              <img
                src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787670470/3a2c97e8-f291-4cd6-91e1-fb81cc012387.png"
                alt="Celda robotizada en operación"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-white/90 font-medium text-sm">Celda Robotizada</span>
              </div>
            </motion.div>

            {/* Proyecto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-6 md:col-span-4 row-span-1 relative rounded-lg overflow-hidden group"
            >
              <img
                src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787670957/71fcdcab-4994-41a1-a357-84bc06c4a0fa.png"
                alt="Proyecto industrial completado"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-white/90 font-medium text-sm">Proyecto Industrial</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES SECTION */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 bg-[#f5f7fa] relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d]">
              Industrias que Proveemos
            </h2>
            <p className="text-[#5a6b7c] mt-4 max-w-2xl mx-auto">
              Adaptamos nuestra experiencia tecnológica a los requerimientos específicos de los sectores más exigentes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Zap, name: "Aeronáutica", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1786727559/adami-industria-aeronautica-galeria-1-220x260_fswnsi.jpg" },
              { icon: HardHat, name: "Automotriz", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1786727560/adami-industria-automotriz-galeria-1-220x260_ksphlp.jpg" },
              { icon: Droplets, name: "Agroindustria", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1786727929/agro_ddxrha.jpg" },
              { icon: Building2, name: "Aeroespacial", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1786727559/adami-industria-aeroespacial-galeria-1-220x260_trzjn4.jpg" },
              { icon: Truck, name: "Nuclear", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1786727560/adami-industria-nuclear-galeria-1-220x260_onmrc7.jpg" },
              { icon: Cpu, name: "Alimenticia", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1786727560/adami-industria-alimenticia-galeria-1-220x260_zyntht.jpg" }
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link href="/industrias" className="press group block rounded-xl md:hover:-translate-y-1.5">
                <div className="relative overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-shadow duration-300 aspect-[3/4] md:aspect-[220/260]">
                  <img 
                    src={industry.image} 
                    alt={`Industria ${industry.name}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b3d]/80 via-[#1a2b3d]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  <industry.icon className="absolute top-2 right-2 w-4 h-4 md:w-5 md:h-5 text-white/70 drop-shadow-md" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                    <h4 className="font-semibold text-white text-[10px] md:text-xs drop-shadow-md leading-tight">{industry.name}</h4>
                    <div className="w-6 h-[2px] bg-[#4e6e94] mt-1 md:mt-1.5 rounded-full origin-left scale-x-[0.84] md:scale-x-100 group-hover:scale-x-[1.66] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. QUALITY + VISUAL — split layout */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 bg-white"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left — Image */}
          <div className="lg:w-5/12 relative min-h-[300px] lg:min-h-0">
            <img
              src="https://res.cloudinary.com/di9j6zwyz/image/upload/f_auto,q_auto/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.35_PM_v7otru.jpg"
              alt="Excelencia integral en procesos industriales ADAMI"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1a2b3d]/20" />
          </div>
          {/* Right — Content */}
          <div className="lg:w-7/12 py-16 lg:py-24 px-6 lg:px-16">
            <span className="text-sm font-bold text-[#4e6e94] tracking-widest uppercase mb-3 block">
              Calidad
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d] mb-6">
              Estándares Corporativos
            </h2>
            <p className="text-[#5a6b7c] leading-relaxed mb-10 max-w-xl">
              Nuestro compromiso con la excelencia se refleja en cada proceso. Operamos bajo las normativas más estrictas de la industria para garantizar resultados superiores, seguros y sostenibles.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {[
                "HYS (Higiene y Seguridad)"
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#4e6e94] flex-shrink-0" />
                  <span className="text-[#1a2b3d] font-medium">{pillar}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. CTA SECTION */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 bg-[#4e6e94] relative overflow-hidden z-10"
      >
        {/* Subtle background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[10px] border-white" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border-[10px] border-white" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Impulse el futuro de su industria
          </h2>
          <p className="text-[#e2e8f0] text-lg mb-10 max-w-2xl mx-auto">
            Hablemos sobre cómo nuestras soluciones integrales pueden optimizar sus operaciones y aumentar su competitividad.
          </p>
          <MagneticButton>
            <Link href="/contacto" className="press inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#4e6e94] rounded-lg font-bold hover:bg-[#f5f7fa] hover:shadow-xl">
              Iniciar Proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </MagneticButton>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
