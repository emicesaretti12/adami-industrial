import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Plane, Car, Wheat, Rocket, Atom, UtensilsCrossed, ChevronRight, ArrowRight, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const industries = [
  {
    id: "aeronautica",
    title: "Aeronáutica",
    icon: Plane,
    description: "Herramentales para producción de piezas.",
    projects: [
      "Herramentales INVAR/Carbono/Aluminio/Acero",
      "Máscaras de perforado 11C",
      "Soporte guía para recortado",
      "30F soporte guía para CNC"
    ],
    bg: "bg-white"
  },
  {
    id: "automotriz",
    title: "Automotriz",
    icon: Car,
    description: "Dispositivos de soldadura y automatización de procesos.",
    projects: [
      "Dispositivos soldadura Fiat Palio (Comau)",
      "Sistema AGV Fiat Argentina",
      "Celda robotizada PABSA/VW",
      "Puesto control visión artificial VW",
      "Automatización líneas prensas Gestamp/Ford"
    ],
    bg: "bg-[#f5f7fa]"
  },
  {
    id: "agroindustria",
    title: "Agroindustria",
    icon: Wheat,
    description: "Soluciones de ingeniería para maquinaria agrícola.",
    projects: [
      "CNH palas retroexcavadora",
      "MULTIJACTO pulverizador",
      "CRUCIANELLI sembradora PLANTOR"
    ],
    bg: "bg-white"
  },
  {
    id: "aeroespacial",
    title: "Aeroespacial",
    icon: Rocket,
    description: "Componentes de precisión para el sector aeroespacial.",
    projects: [
      "Mecanizados especiales torno y fresa CNC - toberas"
    ],
    bg: "bg-[#f5f7fa]"
  },
  {
    id: "nuclear",
    title: "Nuclear",
    icon: Atom,
    description: "Equipamiento de alta complejidad para centrales nucleares.",
    projects: [
      "Mock up feeder - Central Nuclear Embalse (NA-SA)"
    ],
    bg: "bg-white"
  },
  {
    id: "alimenticia",
    title: "Alimenticia",
    icon: UtensilsCrossed,
    description: "Sistemas de transporte y automatización para la industria alimenticia.",
    projects: [
      "Líneas transporte galletas - Bagley (Grupo Arcor)"
    ],
    bg: "bg-[#f5f7fa]"
  }
];

// framer-motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Industries() {
  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans selection:bg-[#4e6e94] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tight text-[#1a2b3d]">
              Industrias que <span className="text-[#4e6e94]">Transformamos</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#5a6b7c] max-w-3xl mx-auto">
              Brindamos soluciones integrales de ingeniería y fabricación para los sectores más exigentes de la industria global.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#f5f7fa] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </section>

      {/* Industries Grid/Sections */}
      <div className="flex flex-col">
        {industries.map((ind, index) => (
          <section key={ind.id} className={`py-20 px-6 lg:px-12 ${ind.bg}`}>
            <div className="max-w-7xl mx-auto">
              <div className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Text Content */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className="w-full lg:w-1/2"
                >
                  <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-[#e2e8f0] mb-6 text-[#4e6e94]">
                    <ind.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d] mb-4">{ind.title}</h2>
                  <p className="text-lg text-[#5a6b7c] mb-8 leading-relaxed">
                    {ind.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-[#3a5a80] mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Proyectos Destacados
                  </h3>
                  <ul className="space-y-3">
                    {ind.projects.map((project, pIdx) => (
                      <motion.li 
                        key={pIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: pIdx * 0.1 }}
                        className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#e2e8f0]"
                      >
                        <ChevronRight className="w-5 h-5 text-[#4e6e94] shrink-0 mt-0.5" />
                        <span className="text-[#1a2b3d]">{project}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                {/* Visual / Decorative */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#f5f7fa] to-white border border-[#e2e8f0] shadow-lg overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-[#4e6e94] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    <ind.icon className="w-32 h-32 text-[#e2e8f0] group-hover:text-[#4e6e94] transition-colors duration-500 group-hover:scale-110 transform" strokeWidth={1} />
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#4e6e94] text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,100 C20,0 50,100 100,0 L100,100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-6">
              ¿Listo para optimizar su producción?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#f5f7fa] text-lg md:text-xl mb-10 opacity-90">
              Contáctenos para discutir cómo nuestras soluciones de ingeniería pueden impulsar la eficiencia de su empresa.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contacto">
                <a className="inline-flex items-center gap-2 bg-white text-[#4e6e94] px-8 py-4 rounded-full font-semibold hover:bg-[#f5f7fa] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                  Contactar a un asesor <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
