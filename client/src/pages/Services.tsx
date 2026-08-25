import { motion, useScroll } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Lightbulb, 
  Factory, 
  Wrench, 
  CheckCircle, 
  Monitor, 
  Settings, 
  ArrowRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRef } from 'react';
import TextReveal from '@/components/TextReveal';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const springTransition = { type: 'spring', stiffness: 100, damping: 20 };

  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans selection:bg-[#4e6e94] selection:text-white">
      <Navbar />
      
      <main ref={containerRef} className="pt-24 pb-16">
        {/* HERO SECTION */}
        <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, ...springTransition }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#4e6e94]/30 bg-[#4e6e94]/5 text-[#4e6e94] font-semibold text-sm tracking-widest uppercase"
            >
              UNIDADES DE NEGOCIO
            </motion.div>
            
            <TextReveal as="h1" className="text-4xl md:text-6xl font-bold mb-6 text-[#1a2b3d] tracking-tight">
              Soluciones Industriales Integrales
            </TextReveal>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...springTransition }}
              className="text-lg md:text-xl text-[#5a6b7c] max-w-2xl mx-auto leading-relaxed"
            >
              Impulsamos la evolución de la industria con tecnología de vanguardia, ingeniería de precisión y servicios especializados diseñados para optimizar cada etapa de producción.
            </motion.p>
          </motion.div>
        </section>

        {/* BUSINESS UNITS */}
        <section className="px-6 py-16 max-w-7xl mx-auto space-y-24">
          
          {/* Unit 1 — Innovación Tecnológica */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.1 }}
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-stretch">
              {/* Content card */}
              <TiltCard className="group relative bg-white rounded-3xl lg:rounded-r-none border border-[#e2e8f0] p-8 md:p-12 overflow-hidden hover:shadow-xl hover:shadow-[#4e6e94]/5 transition-all duration-500 block lg:w-7/12">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                  <Lightbulb size={200} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#4e6e94]/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-8 h-8 text-[#4e6e94]" />
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-[#e2e8f0] leading-none">01</div>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a2b3d]">Innovación Tecnológica</h2>
                  <p className="text-[#5a6b7c] text-lg mb-8 max-w-2xl leading-relaxed">
                    Desarrollamos conceptos y soluciones de ingeniería avanzada para resolver los desafíos más complejos, apoyándonos en las últimas herramientas de diseño y simulación.
                  </p>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Diseño industrial 3D y CAD-CAM",
                      "Ingeniería de procesos",
                      "Gestión de proyectos industriales",
                      "Venta de Robots Industriales"
                    ].map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3, ...springTransition }}
                        className="flex items-center text-[#1a2b3d] font-medium"
                      >
                        <ArrowRight className="w-4 h-4 mr-3 text-[#4e6e94]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>

              {/* Image side — stacked */}
              <div className="lg:w-5/12 flex flex-col gap-3 lg:gap-0">
                <div className="relative overflow-hidden rounded-xl lg:rounded-l-none lg:rounded-tr-3xl h-1/2 min-h-[180px]">
                  <img
                    src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686344/WhatsApp_Image_2026-08-25_at_12.18.11_PM_1_uehk0n.jpg"
                    alt="Modelado 3D y diseño CAD"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl lg:rounded-l-none lg:rounded-br-3xl h-1/2 min-h-[180px]">
                  <img
                    src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670625/6cfdf9c1-a1e5-4d02-bc6c-83dd4a4792da.png"
                    alt="Robot industrial ADAMI"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Unit 2 — Desarrollos Metalúrgicos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.2 }}
          >
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-0 items-stretch">
              {/* Image side — left on desktop */}
              <div className="lg:w-5/12 relative overflow-hidden rounded-xl lg:rounded-r-none lg:rounded-l-3xl min-h-[320px]">
                <img
                  src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png"
                  alt="Celda robotizada de soldadura"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Small overlay thumbnails */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <div className="w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden border-2 border-white/40 shadow-lg">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670470/3a2c97e8-f291-4cd6-91e1-fb81cc012387.png"
                      alt="Celda robotizada"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden border-2 border-white/40 shadow-lg">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670536/2f074e0b-29f2-46e7-ae3a-8f63f05294dc.png"
                      alt="Celda robotizada"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Content card */}
              <TiltCard className="group relative bg-white rounded-3xl lg:rounded-l-none border border-[#e2e8f0] p-8 md:p-12 overflow-hidden hover:shadow-xl hover:shadow-[#3a5a80]/5 transition-all duration-500 block lg:w-7/12">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                  <Factory size={200} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#3a5a80]/10 flex items-center justify-center flex-shrink-0">
                      <Factory className="w-8 h-8 text-[#3a5a80]" />
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-[#e2e8f0] leading-none">02</div>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a2b3d]">Desarrollos Metalúrgicos</h2>
                  <p className="text-[#5a6b7c] text-lg mb-8 max-w-2xl leading-relaxed">
                    Materializamos proyectos con la más alta precisión. Contamos con capacidad instalada para fabricar equipos y estructuras robustas que soportan las exigencias de la industria pesada.
                  </p>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Celdas de soldadura robotizadas",
                      "Fabricación de máquinas equipos y dispositivos especiales",
                      "Matricería y moldes especiales",
                      "Transportadores y facilidades"
                    ].map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3, ...springTransition }}
                        className="flex items-center text-[#1a2b3d] font-medium"
                      >
                        <ArrowRight className="w-4 h-4 mr-3 text-[#3a5a80]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          </motion.div>

          {/* Unit 3 — Servicios Industriales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springTransition, delay: 0.3 }}
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-stretch">
              {/* Content card */}
              <TiltCard className="group relative bg-white rounded-3xl lg:rounded-r-none border border-[#e2e8f0] p-8 md:p-12 overflow-hidden hover:shadow-xl hover:shadow-[#6b8db5]/5 transition-all duration-500 block lg:w-7/12">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                  <Wrench size={200} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#6b8db5]/10 flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-8 h-8 text-[#6b8db5]" />
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-[#e2e8f0] leading-none">03</div>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a2b3d]">Servicios Industriales</h2>
                  <p className="text-[#5a6b7c] text-lg mb-8 max-w-2xl leading-relaxed">
                    Brindamos soporte integral en planta. Desde el montaje y la puesta en marcha hasta el mantenimiento y seguimiento, asegurando el óptimo rendimiento de sus instalaciones.
                  </p>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Instalaciones llave en mano",
                      "Automatización Industrial",
                      "Montaje de líneas y robots",
                      "Servicio de medición inteligente",
                      "Seguimiento post-venta"
                    ].map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3, ...springTransition }}
                        className="flex items-center text-[#1a2b3d] font-medium"
                      >
                        <ArrowRight className="w-4 h-4 mr-3 text-[#6b8db5]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>

              {/* Image side — measurement services */}
              <div className="lg:w-5/12 flex flex-col gap-3 lg:gap-0">
                <div className="relative overflow-hidden rounded-xl lg:rounded-l-none lg:rounded-tr-3xl h-1/2 min-h-[180px]">
                  <img
                    src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png"
                    alt="Medición láser de precisión"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl lg:rounded-l-none lg:rounded-br-3xl h-1/2 min-h-[180px]">
                  <img
                    src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670564/226d354a-bd1f-4678-a3f3-01c711623963.png"
                    alt="Servicio de medición inteligente"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </section>

        {/* EQUIPMENT SECTION — full-bleed image + overlay content */}
        <section className="relative mt-12">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686345/WhatsApp_Image_2026-08-25_at_12.18.11_PM_xaxsdb.jpg"
              alt="Planta industrial ADAMI"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0c1a29]/85 backdrop-blur-[2px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springTransition }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Capacidad Instalada</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Infraestructura y equipamiento de última generación para dar respuesta a los requerimientos más exigentes de la industria.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Column 1 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, ...springTransition }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10"
              >
                <Monitor className="w-8 h-8 text-white/80 mb-6" />
                <h3 className="text-xl font-bold text-white mb-6">Ingeniería y Diseño</h3>
                <ul className="space-y-4">
                  {[
                    "Estaciones de trabajo de alto rendimiento",
                    "Software CAD/CAM avanzado",
                    "Simulación de procesos robóticos",
                    "Laboratorio de medición 3D"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#6b8db5] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 2 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, ...springTransition }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10"
              >
                <Settings className="w-8 h-8 text-white/80 mb-6" />
                <h3 className="text-xl font-bold text-white mb-6">Mecanizado</h3>
                <ul className="space-y-4">
                  {[
                    "Centros de mecanizado CNC",
                    "Tornos CNC de alta precisión",
                    "Corte por láser y plasma"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#6b8db5] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Inline proof strip — small curated images */}
            <div className="mt-12 flex justify-center gap-3">
              {[
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686364/WhatsApp_Image_2026-08-25_at_12.18.35_PM_1_asrkgp.jpg", alt: "Maquinaria CNC" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686354/WhatsApp_Image_2026-08-25_at_12.18.28_PM_dkoxnh.jpg", alt: "Control de procesos" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.12_PM_wztmub.jpg", alt: "Equipo profesional" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="w-28 h-20 md:w-40 md:h-28 rounded-lg overflow-hidden border-2 border-white/15"
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition }}
            className="bg-[#4e6e94] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-white/10 rounded-full" 
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-white/10 rounded-full" 
              />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para transformar su proceso productivo?
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10">
                Nuestro equipo de expertos está preparado para analizar sus necesidades y desarrollar una solución a medida que potencie su rentabilidad.
              </p>
              <Link href="/contacto">
                <MagneticButton>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#4e6e94] font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    Contactar con un Especialista
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.a>
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
