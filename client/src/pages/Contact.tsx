import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Globe, Clock, CheckCircle } from 'lucide-react';
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

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({
        name: '', email: '', company: '', phone: '', subject: '', message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#050810] text-slate-300 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 mb-20 relative">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              CONTACTO
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Hablemos de su <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-600 to-red-400">próximo proyecto</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Nuestro equipo de ingenieros está listo para asesorarlo en la implementación de las mejores soluciones tecnológicas para su industria.
            </p>
          </motion.div>
        </section>

        {/* CONTACT GRID */}
        <section className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* LEFT COLUMN - FORM */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden"
            >
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050810]/90 backdrop-blur-md text-center p-8"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-500 w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
                  <p className="text-slate-400 max-w-md">
                    Gracias por contactarnos. Nuestro equipo comercial se comunicará con usted a la brevedad.
                  </p>
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono tracking-wider text-slate-400 uppercase">Nombre completo *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono tracking-wider text-slate-400 uppercase">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                      placeholder="juan@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-xs font-mono tracking-wider text-slate-400 uppercase">Empresa</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                      placeholder="Nombre de su empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-mono tracking-wider text-slate-400 uppercase">Teléfono</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                      placeholder="+54 9 351..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-mono tracking-wider text-slate-400 uppercase">Asunto *</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                    placeholder="¿En qué podemos ayudarle?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono tracking-wider text-slate-400 uppercase">Mensaje *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
                    placeholder="Describa su proyecto o consulta..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* RIGHT COLUMN - INFO */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-6"
            >
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Información de Contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-slate-400 mb-1">DIRECCIÓN</h4>
                      <p className="text-white text-sm">
                        Leopoldo Casavega 2949<br />
                        Villa Aspacia, Córdoba<br />
                        Argentina
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-slate-400 mb-1">TELÉFONO</h4>
                      <p className="text-white text-sm">
                        +54 351 4666050<br />
                        +54 351 4651511
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-slate-400 mb-1">EMAIL</h4>
                      <p className="text-white text-sm">info@adami.com.ar</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-slate-400 mb-1">WEB</h4>
                      <p className="text-white text-sm">www.adami.com.ar</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-slate-400 mb-1">HORARIO</h4>
                      <p className="text-white text-sm">Lunes a Viernes<br />8:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-lg font-bold text-white">Oficina Brasil</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Avenida Nove de Julho<br />
                  Edf. Apollo Center<br />
                  São José dos Campos
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="rounded-3xl overflow-hidden border border-white/5 h-48 bg-white/[0.02]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.093202951594!2d-64.2259608!3d-31.4391219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a26569145ea1%3A0x633513a9cd3fdf!2sLeopoldo%20Casavega%202949%2C%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1707000000000!5m2!1sen!2sar" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Adami Industrial"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </motion.div>
            </motion.div>
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
