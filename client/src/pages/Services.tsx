import { motion } from 'framer-motion';
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
import MagneticButton from '@/components/MagneticButton';

const Services = () => {
  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans selection:bg-[#4e6e94] selection:text-white">
      <Navbar />
      
      <main>
        {/* HERO — full-bleed image with overlaid text */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <img
            src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686345/WhatsApp_Image_2026-08-25_at_12.18.11_PM_xaxsdb.jpg"
            alt="Planta industrial ADAMI — capacidad instalada"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a29] via-[#0c1a29]/50 to-transparent" />
          
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-16 md:pb-20 pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#6b8db5]" />
                <span className="text-[11px] font-semibold text-[#6b8db5] tracking-[0.25em] uppercase">Unidades de Negocio</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[0.95] mb-6">
                Soluciones Industriales Integrales
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                Tres unidades especializadas que cubren el ciclo completo: desde la ingeniería conceptual hasta la puesta en marcha y el seguimiento post-venta.
              </p>
            </motion.div>
          </div>
        </section>

        {/* UNIT 1 — Innovación Tecnológica */}
        <section className="py-20 md:py-28 border-b border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 lg:sticky lg:top-32"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-[#4e6e94]/8 flex items-center justify-center">
                    <Lightbulb className="w-7 h-7 text-[#4e6e94]" />
                  </div>
                  <span className="text-6xl font-bold text-[#e2e8f0] leading-none select-none">01</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d] mb-6 tracking-tight">
                  Innovación Tecnológica
                </h2>
                <p className="text-[#5a6b7c] text-lg mb-10 leading-relaxed">
                  Desarrollamos conceptos y soluciones de ingeniería avanzada para resolver los desafíos más complejos, apoyándonos en las últimas herramientas de diseño y simulación.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Diseño industrial 3D y CAD-CAM",
                    "Ingeniería de procesos",
                    "Gestión de proyectos industriales",
                    "Venta de Robots Industriales"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[#1a2b3d] font-medium">
                      <ArrowRight className="w-4 h-4 mr-3 text-[#4e6e94] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Images — editorial asymmetric */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  {/* Main image */}
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686344/WhatsApp_Image_2026-08-25_at_12.18.11_PM_1_uehk0n.jpg"
                      alt="Modelado 3D y diseño CAD"
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Secondary — offset, overlapping */}
                  <div className="w-3/5 rounded-lg overflow-hidden shadow-xl -mt-16 ml-auto mr-4 relative z-10 border-4 border-white">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670625/6cfdf9c1-a1e5-4d02-bc6c-83dd4a4792da.png"
                      alt="Robot industrial"
                      className="w-full aspect-[3/2] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* UNIT 2 — Desarrollos Metalúrgicos — reversed */}
        <section className="py-20 md:py-28 border-b border-[#e2e8f0] bg-[#fafbfc]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-start">
              {/* Images — left on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png"
                      alt="Celda de soldadura robotizada"
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Two smaller overlapping images */}
                  <div className="flex gap-3 -mt-12 px-4 relative z-10">
                    <div className="w-1/2 rounded-lg overflow-hidden shadow-xl border-4 border-white">
                      <img
                        src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670470/3a2c97e8-f291-4cd6-91e1-fb81cc012387.png"
                        alt="Celda robotizada en operación"
                        className="w-full aspect-[3/2] object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-1/2 rounded-lg overflow-hidden shadow-xl border-4 border-white">
                      <img
                        src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670536/2f074e0b-29f2-46e7-ae3a-8f63f05294dc.png"
                        alt="Celda robotizada"
                        className="w-full aspect-[3/2] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 lg:sticky lg:top-32"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-[#3a5a80]/8 flex items-center justify-center">
                    <Factory className="w-7 h-7 text-[#3a5a80]" />
                  </div>
                  <span className="text-6xl font-bold text-[#e2e8f0] leading-none select-none">02</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d] mb-6 tracking-tight">
                  Desarrollos Metalúrgicos
                </h2>
                <p className="text-[#5a6b7c] text-lg mb-10 leading-relaxed">
                  Materializamos proyectos con la más alta precisión. Contamos con capacidad instalada para fabricar equipos y estructuras robustas que soportan las exigencias de la industria pesada.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Celdas de soldadura robotizadas",
                    "Fabricación de máquinas y dispositivos especiales",
                    "Matricería y moldes especiales",
                    "Transportadores y facilidades"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[#1a2b3d] font-medium">
                      <ArrowRight className="w-4 h-4 mr-3 text-[#3a5a80] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* UNIT 3 — Servicios Industriales */}
        <section className="py-20 md:py-28 border-b border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 lg:sticky lg:top-32"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-[#6b8db5]/8 flex items-center justify-center">
                    <Wrench className="w-7 h-7 text-[#6b8db5]" />
                  </div>
                  <span className="text-6xl font-bold text-[#e2e8f0] leading-none select-none">03</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3d] mb-6 tracking-tight">
                  Servicios Industriales
                </h2>
                <p className="text-[#5a6b7c] text-lg mb-10 leading-relaxed">
                  Brindamos soporte integral en planta. Desde el montaje y la puesta en marcha hasta el mantenimiento y seguimiento, asegurando el óptimo rendimiento de sus instalaciones.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Instalaciones llave en mano",
                    "Automatización Industrial",
                    "Montaje de líneas y robots",
                    "Servicio de medición inteligente",
                    "Seguimiento post-venta"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[#1a2b3d] font-medium">
                      <ArrowRight className="w-4 h-4 mr-3 text-[#6b8db5] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Images */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:w-1/2"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg overflow-hidden col-span-2">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670476/b6ff62bf-25a2-40c5-9136-f406165c8499.png"
                      alt="Medición láser de precisión"
                      className="w-full aspect-[16/9] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670549/6cfdf6d7-b576-454e-9217-ee63a100ffd0.png"
                      alt="Medición inteligente"
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670564/226d354a-bd1f-4678-a3f3-01c711623963.png"
                      alt="Servicio de medición"
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EQUIPMENT — dark section with real content */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.12_PM_wztmub.jpg"
              alt="Equipo profesional ADAMI"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0c1a29]/90" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              {/* Left — title + description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-2/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#6b8db5]" />
                  <span className="text-[11px] font-semibold text-[#6b8db5] tracking-[0.25em] uppercase">Infraestructura</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  Capacidad Instalada
                </h2>
                <p className="text-white/50 leading-relaxed">
                  Infraestructura y equipamiento de última generación para dar respuesta a los requerimientos más exigentes de la industria.
                </p>
              </motion.div>

              {/* Right — two columns */}
              <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="border border-white/10 rounded-lg p-7"
                >
                  <Monitor className="w-6 h-6 text-[#6b8db5] mb-5" />
                  <h3 className="text-lg font-semibold text-white mb-5">Ingeniería y Diseño</h3>
                  <ul className="space-y-3">
                    {[
                      "Estaciones de alto rendimiento",
                      "Software CAD/CAM avanzado",
                      "Simulación robótica",
                      "Laboratorio de medición 3D"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#6b8db5] mr-2.5 mt-0.5 flex-shrink-0" />
                        <span className="text-white/60 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="border border-white/10 rounded-lg p-7"
                >
                  <Settings className="w-6 h-6 text-[#6b8db5] mb-5" />
                  <h3 className="text-lg font-semibold text-white mb-5">Mecanizado</h3>
                  <ul className="space-y-3">
                    {[
                      "Centros de mecanizado CNC",
                      "Tornos CNC de alta precisión",
                      "Corte por láser y plasma"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#6b8db5] mr-2.5 mt-0.5 flex-shrink-0" />
                        <span className="text-white/60 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Proof images — inline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-16 flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide"
            >
              {[
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686364/WhatsApp_Image_2026-08-25_at_12.18.35_PM_1_asrkgp.jpg", alt: "Maquinaria" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686354/WhatsApp_Image_2026-08-25_at_12.18.28_PM_dkoxnh.jpg", alt: "Control de procesos" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670957/71fcdcab-4994-41a1-a357-84bc06c4a0fa.png", alt: "Proyecto" },
                { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686342/WhatsApp_Image_2026-08-25_at_12.18.10_PM_wbo9z6.jpg", alt: "Trabajo realizado" },
              ].map((img, i) => (
                <div key={i} className="flex-shrink-0 w-52 h-36 md:w-64 md:h-44 rounded-lg overflow-hidden border border-white/10">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA — clean */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3d] mb-6 tracking-tight">
                ¿Listo para transformar su proceso productivo?
              </h2>
              <p className="text-[#5a6b7c] text-lg mb-10 max-w-xl mx-auto">
                Nuestro equipo de expertos está preparado para analizar sus necesidades y desarrollar una solución a medida.
              </p>
              <MagneticButton>
                <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 bg-[#4e6e94] text-white font-semibold rounded-lg text-lg hover:bg-[#3a5a80] transition-colors">
                  Contactar con un Especialista
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
