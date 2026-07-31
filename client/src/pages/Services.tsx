import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Lightbulb, 
  Factory, 
  Wrench, 
  CheckCircle, 
  Monitor,
  Settings,
  Shield,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    id: '01',
    title: 'Innovación Tecnológica',
    icon: Lightbulb,
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/30',
    glowClass: 'group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]',
    description: 'Soluciones de vanguardia en diseño, ingeniería y gestión de proyectos industriales.',
    items: [
      'Diseño industrial 3D y CAD-CAM',
      'Ingeniería de procesos',
      'Gestión de proyectos industriales',
      'Venta de Robots Industriales'
    ]
  },
  {
    id: '02',
    title: 'Desarrollos Metalúrgicos',
    icon: Factory,
    colorClass: 'text-red-500',
    bgClass: 'bg-red-500/10',
    borderClass: 'border-red-500/30',
    glowClass: 'group-hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.3)]',
    description: 'Fabricación especializada de equipos, dispositivos y soluciones metalúrgicas de alta complejidad.',
    items: [
      'Celdas de soldadura robotizadas',
      'Fabricación de máquinas equipos y dispositivos especiales',
      'Matricería y moldes especiales',
      'Transportadores y facilidades'
    ]
  },
  {
    id: '03',
    title: 'Servicios Industriales',
    icon: Wrench,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    glowClass: 'group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]',
    description: 'Servicios integrales de instalación, automatización y soporte técnico post-venta.',
    items: [
      'Instalaciones llave en mano',
      'Automatización Industrial',
      'Montaje de líneas y robots',
      'Servicio de medición inteligente',
      'Seguimiento post-venta'
    ]
  }
];

const equipment = [
  {
    title: 'Ingeniería y Diseño',
    icon: Monitor,
    items: [
      'Software de Diseño 3D y 2D',
      'Programación CAD-CAM',
      'Software de Simulación',
      'Software de medición PolyWorks'
    ]
  },
  {
    title: 'Mecanizado',
    icon: Settings,
    items: [
      'Centro de mecanizado HAAS VF-7',
      'Mesa rotativa 5 ejes HAAS TR310',
      'Centro 4 ejes HAAS HRT450',
      'Fresas CNC'
    ]
  },
  {
    title: 'Soldadura y Pintura',
    icon: Shield,
    items: [
      'Soldadura Mig-Mag',
      'Soldadura Tig para inoxidable y aluminio',
      'Equipamiento de pintura',
      'Prensa hidráulica'
    ]
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Services() {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 selection:bg-blue-500/30 flex flex-col font-sans overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 px-6 lg:px-12 max-w-7xl mx-auto">
          {/* Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
          
          <motion.div 
            className="flex flex-col items-center text-center space-y-6"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 border border-slate-800 bg-slate-900/50 backdrop-blur-sm rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-300 tracking-widest uppercase">Unidades de Negocio</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl"
            >
              Soluciones Industriales <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Integrales</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
            >
              Especialistas en ingeniería, desarrollos metalúrgicos y automatización. 
              Tres unidades de negocio trabajando en sinergia para optimizar su producción.
            </motion.p>
          </motion.div>
        </section>

        {/* BUSINESS UNITS */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-32">
          <div className="flex flex-col gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 lg:p-12 rounded-3xl border border-slate-800 bg-[#0a0f1c]/80 backdrop-blur-md overflow-hidden transition-all duration-500 ${service.glowClass}`}
              >
                {/* Background ambient light */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-opacity duration-500 group-hover:opacity-40 -z-10 ${service.bgClass.replace('/10', '')}`} />
                
                {/* Left Column: Info */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-mono text-slate-600 font-bold">{service.id}</span>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${service.borderClass} ${service.bgClass}`}>
                      <service.icon className={`w-7 h-7 ${service.colorClass}`} />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                      {service.title}
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Right Column: Items */}
                <div className="flex-[1.2] lg:border-l border-slate-800 lg:pl-12 flex items-center">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/30 transition-colors">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${service.bgClass.replace('/10', '')}`} />
                        <span className="text-slate-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EQUIPMENT & INFRASTRUCTURE */}
        <section className="relative py-32 bg-[#0a0f1c] border-y border-slate-800">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
          
          <div className="px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Equipamiento e Infraestructura</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Contamos con tecnología de punta y maquinaria especializada para garantizar la máxima precisión en cada etapa de producción.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {equipment.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-[#050810] border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                    <category.icon className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
                  <ul className="space-y-4">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-slate-400 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative rounded-3xl border border-blue-900/50 bg-gradient-to-br from-blue-900/20 to-[#0a0f1c] p-12 lg:p-20 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                ¿Necesita una solución a medida?
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl">
                Nuestro equipo de ingenieros está listo para analizar su proyecto y diseñar la estrategia más eficiente.
              </p>
              
              <Link href="/contacto">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-colors shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] cursor-pointer"
                >
                  Contactar un asesor
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
