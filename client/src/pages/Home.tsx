import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";

// Custom hook for numbers
function useCounter(endValue: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * endValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  return count;
}

const SparksEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * -1.5 - 0.5,
        opacity: Math.random() * 0.4 + 0.1
      };
    };

    for (let i = 0; i < 30; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(78, 110, 148, ${p.opacity})`; // #4e6e94 brand blue
        ctx.fill();

        if (p.y < -10) {
          particles[i] = createParticle();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-50"
    />
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const statsSectionY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const sectionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
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
              srcSet="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787669775/ChatGPT_Image_25_ago_2026_11_51_49_a.m._btlmfx.png" 
            />
            <img 
              src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787669771/ChatGPT_Image_25_ago_2026_11_50_24_a.m._qo8hvw.png" 
              alt="ADAMI Soluciones Industriales"
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
              <MagneticButton>
                <Link href="/servicios" className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1a2b3d] rounded-lg font-medium text-sm transition-all hover:bg-[#f5f7fa] hover:shadow-xl w-full sm:w-auto">
                  Explorar Soluciones
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contacto" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/30 rounded-lg font-medium text-sm transition-all hover:bg-white/20 hover:border-white/60 w-full sm:w-auto backdrop-blur-sm">
                  Contactar
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <MousePointer2 className="w-4 h-4 mb-1 animate-bounce text-white/75" />
          <span className="text-[10px] uppercase tracking-widest font-semibold">Descubrir</span>
        </motion.div>
      </section>

      {/* 2. STATS SECTION */}
      <motion.section 
        style={{ y: statsSectionY }}
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
                <TiltCard className="h-full bg-white border border-[#e2e8f0] rounded-xl p-8 hover:shadow-xl hover:border-[#dce4ed] transition-all duration-300 group card-glass">
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

      {/* 4. INDUSTRIES SECTION */}
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
              { icon: Zap, name: "Aeronáutica", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727559/adami-industria-aeronautica-galeria-1-220x260_fswnsi.jpg" },
              { icon: HardHat, name: "Automotriz", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727560/adami-industria-automotriz-galeria-1-220x260_ksphlp.jpg" },
              { icon: Droplets, name: "Agroindustria", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727929/agro_ddxrha.jpg" },
              { icon: Building2, name: "Aeroespacial", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727559/adami-industria-aeroespacial-galeria-1-220x260_trzjn4.jpg" },
              { icon: Truck, name: "Nuclear", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727560/adami-industria-nuclear-galeria-1-220x260_onmrc7.jpg" },
              { icon: Cpu, name: "Alimenticia", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727560/adami-industria-alimenticia-galeria-1-220x260_zyntht.jpg" }
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.08, 
                  duration: 0.4,
                  hover: { type: "spring", stiffness: 300 }
                }}
                className="group cursor-pointer"
              >
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
                    <div className="w-5 md:w-6 h-[2px] bg-[#4e6e94] mt-1 md:mt-1.5 rounded-full group-hover:w-10 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. QUALITY SECTION */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 bg-white border-t border-[#e2e8f0] relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <span className="text-sm font-bold text-[#4e6e94] tracking-widest uppercase mb-3 block">
                Calidad
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d] mb-6">
                Estándares Corporativos
              </h2>
              <p className="text-[#5a6b7c] leading-relaxed mb-8">
                Nuestro compromiso con la excelencia se refleja en cada proceso. Operamos bajo las normativas más estrictas de la industria para garantizar resultados superiores, seguros y sostenibles.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                "HYS (Higiene y Seguridad)"
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
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

      {/* 6. CTA SECTION */}
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
            <Link href="/contacto" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#4e6e94] rounded-lg font-bold transition-all hover:bg-[#f5f7fa] hover:shadow-xl hover:-translate-y-1">
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
