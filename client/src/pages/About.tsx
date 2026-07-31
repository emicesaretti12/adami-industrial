import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle, Shield, Award, Users, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const pillars = [
  "Laboratorio de Medición",
  "Métodos definidos de trabajo",
  "Control de procesos de fabricación",
  "Capacitación permanente del personal",
  "Máquinas equipos y dispositivos especiales",
  "Ingeniería de procesos",
  "Medios de control para asegurar la calidad",
  "Control dimensional con sistema FARO"
];

const values = [
  {
    icon: Shield,
    title: "Compromiso",
    desc: "Asumimos un compromiso total con los objetivos de nuestros clientes, garantizando entregas en tiempo y forma con los más altos estándares."
  },
  {
    icon: Award,
    title: "Excelencia",
    desc: "Buscamos la mejora continua en cada proceso, implementando metodologías ágiles y controles rigurosos de calidad."
  },
  {
    icon: Users,
    title: "Equipo",
    desc: "Fomentamos el desarrollo personal y profesional de nuestro equipo humano, el pilar fundamental de nuestra organización."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-300 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 mb-32 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              NUESTRA EMPRESA
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Más de 30 años de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400">excelencia</span> industrial
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Somos una organización argentina enfocada en la integración tecnológica, dedicada a brindar soluciones integrales para la industria moderna.
            </p>
          </motion.div>
        </section>

        {/* MISSION & VISION */}
        <section className="container mx-auto px-6 mb-32">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md h-full transition-colors group-hover:border-blue-500/20 group-hover:bg-white/[0.03]">
                <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 text-blue-400">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Misión</h3>
                <p className="text-slate-400 leading-relaxed">
                  Optimizar procesos industriales productivos, implementando soluciones tecnológicas que favorecen el incremento de la rentabilidad y mejoran la calidad final de los productos de sus clientes.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md h-full transition-colors group-hover:border-blue-500/20 group-hover:bg-white/[0.03]">
                <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 text-blue-400">
                  <Eye size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Visión</h3>
                <p className="text-slate-400 leading-relaxed">
                  Ser referentes internacionales en integración e innovación tecnológica aplicada a procesos productivos.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* QUALITY PILLARS */}
        <section className="container mx-auto px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-sm font-mono text-blue-400 tracking-widest uppercase mb-4">CALIDAD</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Nuestros Pilares</h3>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {pillars.map((pillar, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-start gap-4 hover:bg-white/[0.04] hover:border-blue-500/20 transition-all"
                >
                  <CheckCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                  <span className="text-sm font-medium text-slate-300 leading-snug">{pillar}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VALUES */}
        <section className="container mx-auto px-6 mb-32">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {values.map((val, idx) => (
              <motion.div key={idx} variants={itemVariants} className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-white/5 transform group-hover:scale-110 transition-transform duration-500">
                  <val.icon size={120} />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 text-blue-400">
                    <val.icon size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{val.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PRESENCE */}
        <section className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white tracking-tight">Presencia Regional</h2>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="flex gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Argentina (Sede Central)</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Leopoldo Casavega 2949<br />
                  Villa Aspacia, Córdoba<br />
                  Argentina
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Brasil</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Avenida Nove de Julho<br />
                  Edf. Apollo Center<br />
                  São José dos Campos
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
