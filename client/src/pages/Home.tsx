import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ChevronDown, 
  Lightbulb, 
  Factory, 
  Wrench,
  Plane,
  Car,
  Wheat,
  Rocket,
  Atom,
  UtensilsCrossed,
  CheckCircle,
  ArrowRight,
  Cpu
} from 'lucide-react';

// --- Sparks Effect Component ---
const SparksEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      life: number;
      maxLife: number;
    }[] = [];
    
    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const colors = ['#3b82f6', '#f59e0b', '#60a5fa', '#fbbf24'];

    const createParticle = () => {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 100,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 1,
        vy: -Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 100 + 100
      };
    };

    for (let i = 0; i < 70; i++) {
      particles.push(createParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        
        // Add subtle horizontal drift
        p.vx += (Math.random() - 0.5) * 0.05;
        
        let opacity = 1 - (p.life / p.maxLife);
        opacity = Math.max(0, Math.min(1, opacity));
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Convert hex to rgba for reliable opacity
        let r = 0, g = 0, b = 0;
        if (p.color === '#3b82f6') { r=59; g=130; b=246; }
        else if (p.color === '#f59e0b') { r=245; g=158; b=11; }
        else if (p.color === '#60a5fa') { r=96; g=165; b=250; }
        else if (p.color === '#fbbf24') { r=251; g=191; b=36; }
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < 0) {
          particles[index] = createParticle();
          // Reset y to bottom when recycling
          particles[index].y = height + Math.random() * 50; 
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// --- Animated Counter ---
const AnimatedCounter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{from}</span>;
};

// --- Main Page Component ---
export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 overflow-x-hidden selection:bg-blue-500/30">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradients & Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#0a1020] to-[#050810] z-0" />
        <div className="absolute inset-0 grid-overlay opacity-30 z-0" />
        <SparksEffect />
        
        {/* Floating Orbs */}
        <motion.div 
          animate={{ 
            y: [0, -40, 0], 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] z-0 pointer-events-none"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0], 
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-600/10 rounded-full blur-[150px] z-0 pointer-events-none"
        />

        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 container mx-auto px-6 max-w-6xl flex flex-col items-center text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-[0.2em] mb-6 backdrop-blur-md">
              <Cpu size={14} />
              SOLUCIONES INDUSTRIALES
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
          >
            Ingeniería que <br/>
            <span className="text-gradient from-blue-400 via-blue-500 to-amber-500 bg-clip-text text-transparent bg-gradient-to-r">
              transforma
            </span> industrias
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 font-light leading-relaxed"
          >
            Más de 30 años integrando tecnología de vanguardia para optimizar procesos productivos en Argentina y el mundo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/servicios">
              <span className="btn-primary group relative overflow-hidden px-8 py-4 rounded-md bg-blue-600 text-white font-semibold cursor-pointer inline-flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)]">
                <span className="relative z-10">Explorar Soluciones</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/contacto">
              <span className="btn-outline px-8 py-4 rounded-md border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white font-semibold cursor-pointer inline-flex items-center justify-center backdrop-blur-sm transition-all hover:border-slate-500">
                Contactar
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 z-10"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative py-20 border-t border-slate-800/50 bg-[#070b16] z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
            {[
              { num: 30, suffix: '+', label: 'Años de experiencia' },
              { num: 6, suffix: '', label: 'Sectores industriales' },
              { num: 100, suffix: '+', label: 'Proyectos realizados' },
              { num: 2, suffix: '', label: 'Países con presencia' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center py-8 md:py-4 px-4 group"
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="stat-number text-5xl md:text-6xl font-black bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                    <AnimatedCounter to={stat.num} duration={2 + i*0.2} />
                  </span>
                  <span className="text-4xl font-bold text-blue-500">{stat.suffix}</span>
                </div>
                <span className="text-sm md:text-base text-slate-400 font-medium tracking-wide uppercase text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-32 relative bg-[#050810] z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl"
            >
              <span className="section-label text-blue-500 text-sm font-bold tracking-[0.2em] mb-4 block">SERVICIOS</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Unidades de Negocio</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link href="/servicios">
                <span className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium cursor-pointer transition-colors group">
                  Ver todos los servicios
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Innovación Tecnológica",
                desc: "Soluciones I+D para desafíos industriales complejos.",
                items: ["Ingeniería Inversa", "Prototipado Rápido", "I+D Metalmecánico", "Sustitución de Importaciones"],
                color: "blue"
              },
              {
                icon: Factory,
                title: "Desarrollos Metalúrgicos",
                desc: "Diseño y fabricación de componentes críticos.",
                items: ["Mecanizado CNC", "Soldadura Especial", "Calderería Pesada", "Tratamientos Térmicos"],
                color: "amber"
              },
              {
                icon: Wrench,
                title: "Servicios Industriales",
                desc: "Mantenimiento y optimización de planta.",
                items: ["Mantenimiento Preventivo", "Montajes Industriales", "Paradas de Planta", "Reacondicionamiento"],
                color: "red"
              }
            ].map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="card-glass rounded-2xl p-8 border border-slate-800 bg-slate-900/40 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${srv.color}-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700`} />
                
                <div className="icon-box w-14 h-14 rounded-xl bg-slate-800/80 flex items-center justify-center mb-6 border border-slate-700/50 relative z-10 group-hover:border-blue-500/50 transition-colors">
                  <srv.icon size={26} className={`text-${srv.color}-400`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-slate-100">{srv.title}</h3>
                <p className="text-slate-400 mb-8 h-12 leading-relaxed">{srv.desc}</p>
                
                <ul className="space-y-3 relative z-10">
                  {srv.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${srv.color}-500`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIES SECTION */}
      <section className="py-32 relative bg-[#070b16] z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="section-label text-blue-500 text-sm font-bold tracking-[0.2em] mb-4 block">SECTORES</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">Industrias que Servimos</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Adaptamos nuestra ingeniería a las exigencias específicas de cada sector productivo, cumpliendo con las normativas más estrictas.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { icon: Plane, label: "Aeronáutica" },
              { icon: Car, label: "Automotriz" },
              { icon: Wheat, label: "Agroindustria" },
              { icon: Rocket, label: "Aeroespacial" },
              { icon: Atom, label: "Nuclear" },
              { icon: UtensilsCrossed, label: "Alimenticia" }
            ].map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -8, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                className="flex flex-col items-center justify-center p-8 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer transition-all hover:bg-slate-800/80 group"
              >
                <ind.icon size={36} strokeWidth={1.5} className="text-slate-400 group-hover:text-blue-400 mb-4 transition-colors duration-300 group-hover:scale-110 transform" />
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{ind.label}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
             <Link href="/industrias">
                <span className="btn-outline inline-flex items-center justify-center px-6 py-3 rounded-md border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-medium cursor-pointer transition-all">
                  Conocer más sobre sectores
                </span>
              </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. QUALITY SECTION */}
      <section className="py-32 relative bg-[#050810] z-10 overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <span className="section-label text-amber-500 text-sm font-bold tracking-[0.2em] mb-4 block">CALIDAD</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Pilares de Calidad</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Certificación ISO 9001",
              "Trazabilidad Total",
              "Control Dimensional 3D",
              "Ensayos No Destructivos",
              "Laboratorio Metalográfico",
              "Soldadores Calificados",
              "Gestión Ambiental",
              "Mejora Continua"
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-glass flex items-center gap-4 p-5 rounded-lg bg-slate-900/40 border border-slate-800/80 hover:bg-slate-800/60 transition-colors"
              >
                <CheckCircle className="text-amber-500 shrink-0" size={20} />
                <span className="text-slate-200 font-medium text-sm">{pillar}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden border border-blue-500/20 bg-slate-900/80 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900/90 z-0" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] z-0" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">¿Listo para optimizar sus procesos?</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">Contacte a nuestro equipo de ingenieros para analizar sus desafíos y desarrollar una solución a medida.</p>
              
              <Link href="/contacto">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-md bg-blue-600 text-white font-bold text-lg cursor-pointer shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.8)] transition-all"
                >
                  Solicitar Asesoría
                  <ArrowRight size={20} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
