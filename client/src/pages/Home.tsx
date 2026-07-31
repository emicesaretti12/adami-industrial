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
  const { scrollYProgress, scrollY } = useScroll();
  const heroDeco1Y = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroDeco2Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const statsSectionY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const sectionVariants = {
    hidden: { y: 80, opacity: 0, filter: "blur(8px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans selection:bg-[#4e6e94] selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-gradient-to-b from-[#f5f7fa] to-white">
        <SparksEffect />
        
        {/* Geometric decorations with parallax */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div style={{ y: heroDeco1Y }} className="absolute top-1/4 right-[-5%] w-[40vw] h-[40vw] rounded-full border border-[#e2e8f0] opacity-30" />
          <motion.div style={{ y: heroDeco2Y }} className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full border border-[#dce4ed] opacity-40" />
          
          <motion.svg style={{ y: heroDeco1Y }} className="absolute top-1/3 left-10 w-24 h-24 text-[#6b8db5] opacity-20" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </motion.svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-sm font-semibold text-[#4e6e94] tracking-wider mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#4e6e94] animate-pulse"></span>
              SOLUCIONES INDUSTRIALES
            </motion.div>

            <TextReveal 
              as="h1" 
              staggerSpeed={0.05} 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#1a2b3d] leading-tight"
            >
              Ingeniería que transforma industrias
            </TextReveal>

            <TextReveal 
              as="p" 
              delay={0.4} 
              className="text-lg md:text-xl text-[#5a6b7c] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Más de 30 años de experiencia impulsando la productividad mediante soluciones tecnológicas, metalúrgicas y de servicios industriales de nivel corporativo.
            </TextReveal>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticButton>
                <Link href="/servicios" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4e6e94] text-white rounded-lg font-medium transition-all hover:bg-[#3a5a80] hover:shadow-lg w-full sm:w-auto">
                  Explorar Soluciones
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contacto" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1a2b3d] border border-[#dce4ed] rounded-lg font-medium transition-all hover:border-[#4e6e94] hover:text-[#4e6e94] hover:bg-[#f5f7fa] w-full sm:w-auto">
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
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#8a9bac]"
        >
          <MousePointer2 className="w-5 h-5 mb-2 animate-bounce text-[#6b8db5]" />
          <span className="text-xs uppercase tracking-widest font-semibold">Descubrir</span>
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
              { value: 30, suffix: "+", label: "Años de Experiencia" },
              { value: 6, suffix: "", label: "Unidades de Negocio" },
              { value: 100, suffix: "+", label: "Proyectos Exitosos" },
              { value: 2, suffix: "", label: "Plantas Industriales" }
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
                  {stat.value}{stat.suffix}
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
                items: ["Automatización Industrial", "Robótica Aplicada", "Sistemas SCADA", "Visión Artificial"]
              },
              {
                icon: Factory,
                title: "Desarrollos Metalúrgicos",
                desc: "Ingeniería, diseño y fabricación de componentes y estructuras mecánicas de alta precisión.",
                items: ["Mecanizado CNC", "Estructuras Pesadas", "Calderería", "Corte por Plasma"]
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
              Industrias que Servimos
            </h2>
            <p className="text-[#5a6b7c] mt-4 max-w-2xl mx-auto">
              Adaptamos nuestra experiencia tecnológica a los requerimientos específicos de los sectores más exigentes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Zap, name: "Energía" },
              { icon: HardHat, name: "Minería" },
              { icon: Droplets, name: "Oil & Gas" },
              { icon: Building2, name: "Siderurgia" },
              { icon: Truck, name: "Logística" },
              { icon: Cpu, name: "Manufactura" }
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 0.4,
                  hover: { type: "spring", stiffness: 300 }
                }}
                className="bg-white p-6 rounded-xl border border-[#e2e8f0] text-center hover:border-[#4e6e94] transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <industry.icon className="w-10 h-10 mx-auto text-[#6b8db5] mb-4 group-hover:text-[#4e6e94] transition-colors" />
                <h4 className="font-semibold text-[#1a2b3d] text-sm">{industry.name}</h4>
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
                "Certificación ISO 9001:2015",
                "Trazabilidad completa",
                "Control dimensional 3D",
                "Ensayos no destructivos (END)",
                "Normativas de seguridad HSE",
                "Gestión ambiental",
                "Auditorías periódicas",
                "Capacitación continua"
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
