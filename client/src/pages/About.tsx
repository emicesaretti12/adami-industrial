import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Target, Eye, CheckCircle, Shield, Award, Users, MapPin, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TextReveal from '@/components/TextReveal';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';

// framer-motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const qualityPillars = [
  "Laboratorio de Medición",
  "Métodos definidos de trabajo",
  "Control de procesos de fabricación",
  "Capacitación permanente del personal",
  "Auditorías internas",
  "Calibración y control de instrumentos",
  "Ensayos no destructivos",
  "Procedimientos certificados de soldadura"
];

const values = [
  { title: "Calidad", icon: Shield, desc: "Excelencia en cada proceso y producto." },
  { title: "Innovación", icon: Eye, desc: "Búsqueda constante de soluciones tecnológicas avanzadas." },
  { title: "Compromiso", icon: Target, desc: "Dedicación total hacia el éxito de nuestros clientes." },
  { title: "Trabajo en Equipo", icon: Users, desc: "Colaboración y sinergia en todas las áreas." }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans selection:bg-[#4e6e94] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <TextReveal as="h1" className="text-4xl md:text-6xl font-bold tracking-tight text-[#1a2b3d]">
              Sobre <span className="text-[#4e6e94]">Adami Industrial</span>
            </TextReveal>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#5a6b7c] max-w-3xl mx-auto">
              Más de dos décadas transformando la industria a través de ingeniería de precisión, tecnología avanzada y un compromiso inquebrantable con la calidad.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 lg:px-12 bg-[#f5f7fa] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
            >
              <TiltCard glare={true}>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#e2e8f0] h-full flex flex-col">
                  <div className="w-14 h-14 bg-[#f5f7fa] rounded-2xl flex items-center justify-center mb-6 text-[#4e6e94]">
                    <Target className="w-7 h-7" />
                  </div>
                  <TextReveal as="h2" className="text-3xl font-bold text-[#1a2b3d] mb-4">
                    Nuestra Misión
                  </TextReveal>
                  <p className="text-lg text-[#5a6b7c] leading-relaxed flex-grow">
                    Integrar tecnologías para la optimización de procesos industriales, brindando soluciones integrales que potencien la productividad y competitividad de nuestros clientes.
                  </p>
                </div>
              </TiltCard>
            </motion.div>
            
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.8, delay: 0.2 }}
            >
              <TiltCard glare={true}>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#e2e8f0] h-full flex flex-col">
                  <div className="w-14 h-14 bg-[#f5f7fa] rounded-2xl flex items-center justify-center mb-6 text-[#4e6e94]">
                    <Eye className="w-7 h-7" />
                  </div>
                  <TextReveal as="h2" className="text-3xl font-bold text-[#1a2b3d] mb-4">
                    Nuestra Visión
                  </TextReveal>
                  <p className="text-lg text-[#5a6b7c] leading-relaxed flex-grow">
                    Ser líderes reconocidos en el desarrollo de soluciones tecnológicas industriales, marcando el estándar de excelencia e innovación a nivel global.
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Pillars */}
      <section className="py-24 px-6 lg:px-12 bg-white perspective-1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <TextReveal as="h2" className="text-3xl md:text-5xl font-bold text-[#1a2b3d] mb-6">
              Pilares de Calidad
            </TextReveal>
            <motion.p 
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', bounce: 0.4 }}
              className="text-lg text-[#5a6b7c] max-w-2xl mx-auto"
            >
              Nuestro sistema de gestión garantiza resultados superiores a través de procesos rigurosamente controlados.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {qualityPillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.4, delay: idx * 0.1 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group p-6 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm hover:shadow-md hover:border-[#4e6e94]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#f5f7fa] p-3 rounded-full text-[#4e6e94] group-hover:bg-[#4e6e94] group-hover:text-white transition-colors">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[#1a2b3d]">{pillar}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <TextReveal as="h2" className="text-3xl md:text-5xl font-bold text-[#1a2b3d] mb-6">
              Valores Corporativos
            </TextReveal>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((val, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="h-full">
                <TiltCard>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#e2e8f0] text-center h-full">
                    <div className="w-16 h-16 bg-[#f5f7fa] rounded-full flex items-center justify-center mx-auto mb-6 text-[#4e6e94]">
                      <val.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a2b3d] mb-3">{val.title}</h3>
                    <p className="text-[#5a6b7c]">{val.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="py-24 px-6 lg:px-12 bg-white border-t border-[#e2e8f0] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
              className="lg:w-1/2"
            >
              <TextReveal as="h2" className="text-3xl md:text-5xl font-bold text-[#1a2b3d] mb-6">
                Presencia Regional
              </TextReveal>
              <p className="text-lg text-[#5a6b7c] mb-10 leading-relaxed">
                Con bases estratégicas en Sudamérica, brindamos soporte y soluciones ágiles a industrias clave en toda la región.
              </p>
              
              <div className="space-y-6">
                <TiltCard>
                  <div className="flex items-start gap-4 p-6 bg-[#f5f7fa] rounded-2xl">
                    <MapPin className="w-8 h-8 text-[#4e6e94] shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2b3d] mb-2">Argentina</h3>
                      <p className="text-[#5a6b7c]">Córdoba - Casa Matriz y Centro de Producción</p>
                    </div>
                  </div>
                </TiltCard>
                
                <TiltCard>
                  <div className="flex items-start gap-4 p-6 bg-[#f5f7fa] rounded-2xl">
                    <MapPin className="w-8 h-8 text-[#4e6e94] shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2b3d] mb-2">Brasil</h3>
                      <p className="text-[#5a6b7c]">São José dos Campos - Sede Comercial y Soporte</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <TiltCard>
                <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#f5f7fa] to-[#e2e8f0] border border-[#e2e8f0] shadow-inner flex items-center justify-center relative overflow-hidden">
                  <Award className="w-40 h-40 text-white opacity-50 absolute" strokeWidth={0.5} />
                  <div className="text-center z-10 p-8">
                    <span className="block text-5xl font-bold text-[#4e6e94] mb-2">+20</span>
                    <span className="block text-lg font-medium text-[#5a6b7c] uppercase tracking-wider">Años de Excelencia</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#4e6e94] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <TextReveal as="h2" className="text-3xl md:text-5xl font-bold mb-6">
              Construyamos el futuro de su industria
            </TextReveal>
            <motion.div variants={fadeInUp} className="mt-10">
              <Link href="/contacto">
                <MagneticButton>
                  <a className="inline-flex items-center gap-2 bg-white text-[#4e6e94] px-8 py-4 rounded-full font-semibold hover:bg-[#f5f7fa] transition-colors shadow-lg hover:shadow-xl transform duration-300">
                    Hablemos de su proyecto <ArrowRight className="w-5 h-5" />
                  </a>
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
