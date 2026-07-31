import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { 
  Plane, 
  Car, 
  Wheat, 
  Rocket, 
  Atom, 
  UtensilsCrossed, 
  ChevronRight, 
  ArrowRight,
  Shield,
  Settings
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";

const industries = [
  {
    id: "aeronautica",
    title: "Industria Aeronáutica",
    icon: Plane,
    description: "Desarrollo y fabricación de herramentales de alta precisión para la producción de piezas en materiales compuestos, cumpliendo con los estándares más estrictos y tolerancias críticas del sector aeronáutico.",
    projects: [
      "Herramentales INVAR / Carbono / Aluminio / Acero",
      "Máscaras de perforado 11C",
      "Soporte guía para recortado",
      "30F soporte guía para CNC"
    ],
    color: "from-blue-500/20 to-transparent"
  },
  {
    id: "automotriz",
    title: "Industria Automotriz",
    icon: Car,
    description: "Soluciones integrales de automatización, desde dispositivos de soldadura hasta celdas robotizadas complejas para optimizar las líneas de producción de las principales terminales mundiales.",
    projects: [
      "Dispositivos soldadura Fiat Palio (Comau)",
      "Sistema AGV Fiat Argentina",
      "Celda robotizada PABSA/VW",
      "Puesto control visión artificial Volkswagen",
      "Automatización líneas prensas Gestamp/Ford"
    ],
    color: "from-red-500/20 to-transparent"
  },
  {
    id: "agroindustria",
    title: "Agroindustria",
    icon: Wheat,
    description: "Ingeniería y manufactura de componentes robustos para maquinaria agrícola, garantizando durabilidad, resistencia y eficiencia operativa en las condiciones más exigentes del campo.",
    projects: [
      "CNH palas retroexcavadora",
      "MULTIJACTO pulverizador",
      "CRUCIANELLI sembradora PLANTOR"
    ],
    color: "from-amber-500/20 to-transparent"
  },
  {
    id: "aeroespacial",
    title: "Industria Aeroespacial",
    icon: Rocket,
    description: "Mecanizados de ultraprecisión para componentes críticos. Nuestra tecnología CNC y personal calificado nos permiten trabajar con tolerancias micrométricas en materiales de aleación especial.",
    projects: [
      "Mecanizados especiales torno y fresa CNC - toberas"
    ],
    color: "from-indigo-500/20 to-transparent"
  },
  {
    id: "nuclear",
    title: "Industria Nuclear",
    icon: Atom,
    description: "Desarrollo de equipamiento especializado bajo severas normativas de seguridad internacionales, aportando capacidad técnica y fiabilidad a proyectos energéticos de gran escala.",
    projects: [
      "Mock up feeder - Central Nuclear Embalse (NA-SA)"
    ],
    color: "from-emerald-500/20 to-transparent"
  },
  {
    id: "alimenticia",
    title: "Industria Alimenticia",
    icon: UtensilsCrossed,
    description: "Sistemas de transporte y automatización diseñados específicamente bajo normativas sanitarias para garantizar la inocuidad, velocidad y eficiencia en las líneas de producción de alimentos.",
    projects: [
      "Líneas transporte galletas - Bagley (Grupo Arcor)"
    ],
    color: "from-orange-500/20 to-transparent"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Industries() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050810] to-[#050810] -z-10" />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <motion.div 
          style={{ y: y1, opacity }}
          className="container mx-auto px-6 lg:px-12 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-blue-500" />
              <span className="text-blue-400 font-medium tracking-widest text-sm uppercase">Sectores & Proyectos</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Industrias que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Transformamos
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Nuestra ingeniería de precisión y capacidad de manufactura nos permite tener presencia en los sectores más exigentes de la industria global.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Industries List Section */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-32">
            {industries.map((industry, index) => {
              const isEven = index % 2 === 0;
              const Icon = industry.icon;
              
              return (
                <motion.div 
                  key={industry.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
                >
                  {/* Industry Info */}
                  <div className="w-full lg:w-1/2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-blue-400 mb-8 backdrop-blur-sm">
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                      {industry.title}
                    </h2>
                    
                    <p className="text-lg text-slate-400 leading-relaxed mb-8">
                      {industry.description}
                    </p>
                    
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Settings className="w-4 h-4 text-blue-500" />
                        <span>Ingeniería Especializada</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span>Alta Precisión</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Projects Card */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative group">
                      <div className={`absolute -inset-0.5 bg-gradient-to-br ${industry.color} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200`} />
                      
                      <div className="relative p-8 md:p-10 bg-slate-900/80 backdrop-blur-xl border border-slate-800/60 rounded-3xl">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                          Proyectos Destacados
                        </h3>
                        
                        <ul className="space-y-4">
                          {industry.projects.map((project, pIndex) => (
                            <motion.li 
                              key={pIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: pIndex * 0.1 + 0.3 }}
                              className="flex items-start gap-3 group/item"
                            >
                              <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 group-hover/item:translate-x-1 transition-transform" />
                              <span className="text-slate-300 group-hover/item:text-white transition-colors">
                                {project}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              ¿Tiene un proyecto industrial?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Nuestro equipo de ingeniería está listo para analizar sus requerimientos y proponer la solución tecnológica óptima.
            </p>
            
            <Link href="/contacto">
              <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] group cursor-pointer">
                Contactar a Ingeniería
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
