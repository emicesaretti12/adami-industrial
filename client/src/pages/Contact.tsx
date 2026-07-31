import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Globe, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Theme Colors:
// Brand Blue #4e6e94 (Tailwind: text-[#4e6e94], bg-[#4e6e94], border-[#4e6e94])
// Deep #3a5a80
// Surface #f5f7fa
// Text #1a2b3d
// Secondary #5a6b7c
// Borders #e2e8f0

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
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
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5f7fa] border border-[#e2e8f0] rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#4e6e94] animate-pulse"></span>
          <span className="text-xs font-semibold tracking-widest text-[#5a6b7c]">CONTACTO</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-[#1a2b3d] tracking-tight mb-6"
        >
          Contáctenos
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#5a6b7c] max-w-2xl text-lg"
        >
          Estamos listos para potenciar su industria. Comuníquese con nuestro equipo para soluciones de automatización de precisión y engranajes industriales.
        </motion.p>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT: Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full"
          >
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b3d] mb-2">Envíenos un mensaje</h2>
              <p className="text-[#5a6b7c]">Complete el formulario y le responderemos a la brevedad.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nombre */}
                <motion.div variants={itemVariants} className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#e2e8f0] py-3 text-[#1a2b3d] placeholder-transparent focus:outline-none focus:border-[#4e6e94] transition-colors peer"
                    placeholder="Nombre"
                  />
                  <label htmlFor="name" className="absolute left-0 top-3 text-[#5a6b7c] text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#4e6e94] peer-valid:-top-4 peer-valid:text-xs">
                    Nombre Completo *
                  </label>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#e2e8f0] py-3 text-[#1a2b3d] placeholder-transparent focus:outline-none focus:border-[#4e6e94] transition-colors peer"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 top-3 text-[#5a6b7c] text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#4e6e94] peer-valid:-top-4 peer-valid:text-xs">
                    Correo Electrónico *
                  </label>
                </motion.div>

                {/* Empresa */}
                <motion.div variants={itemVariants} className="relative group">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#e2e8f0] py-3 text-[#1a2b3d] placeholder-transparent focus:outline-none focus:border-[#4e6e94] transition-colors peer"
                    placeholder="Empresa"
                  />
                  <label htmlFor="company" className="absolute left-0 top-3 text-[#5a6b7c] text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#4e6e94] peer-valid:-top-4 peer-valid:text-xs">
                    Empresa
                  </label>
                </motion.div>

                {/* Teléfono */}
                <motion.div variants={itemVariants} className="relative group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#e2e8f0] py-3 text-[#1a2b3d] placeholder-transparent focus:outline-none focus:border-[#4e6e94] transition-colors peer"
                    placeholder="Teléfono"
                  />
                  <label htmlFor="phone" className="absolute left-0 top-3 text-[#5a6b7c] text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#4e6e94] peer-valid:-top-4 peer-valid:text-xs">
                    Teléfono
                  </label>
                </motion.div>
              </div>

              {/* Mensaje */}
              <motion.div variants={itemVariants} className="relative group mt-12">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#e2e8f0] py-3 text-[#1a2b3d] placeholder-transparent focus:outline-none focus:border-[#4e6e94] transition-colors peer resize-none"
                  placeholder="Mensaje"
                />
                <label htmlFor="message" className="absolute left-0 top-3 text-[#5a6b7c] text-base transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#4e6e94] peer-valid:-top-6 peer-valid:text-xs">
                  Mensaje *
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="relative overflow-hidden group bg-[#4e6e94] text-white px-8 py-4 flex items-center justify-center gap-3 w-full sm:w-auto min-w-[200px] hover:bg-[#3a5a80] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Mensaje Enviado</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 relative z-10"
                      >
                        <span>Enviar Mensaje</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* RIGHT: Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full flex flex-col gap-6"
          >
            {/* Argentina Office */}
            <motion.div variants={itemVariants} className="bg-[#f5f7fa] p-8 rounded-sm border-l-4 border-[#4e6e94] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1a2b3d] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#4e6e94]" />
                Sede Argentina
              </h3>
              <div className="space-y-3 text-[#5a6b7c] ml-7">
                <p>Leopoldo Casavega 2949, Villa Aspacia<br/>Córdoba, Argentina</p>
                <div className="flex items-center gap-2 pt-2">
                  <Phone className="w-4 h-4 text-[#4e6e94]" />
                  <a href="tel:+543514666050" className="hover:text-[#4e6e94] transition-colors">+54 351 4666050</a>
                </div>
              </div>
            </motion.div>

            {/* Brazil Office */}
            <motion.div variants={itemVariants} className="bg-[#f5f7fa] p-8 rounded-sm border-l-4 border-[#e2e8f0] hover:border-[#4e6e94] shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-[#1a2b3d] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#5a6b7c]" />
                Sede Brasil
              </h3>
              <div className="space-y-3 text-[#5a6b7c] ml-7">
                <p>Av. Nove de Julho, 765<br/>São José dos Campos - SP</p>
              </div>
            </motion.div>

            {/* Direct Contact */}
            <motion.div variants={itemVariants} className="bg-[#f5f7fa] p-8 rounded-sm shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 font-semibold text-[#1a2b3d]">
                  <Mail className="w-4 h-4 text-[#4e6e94]" />
                  Email
                </span>
                <a href="mailto:info@adami.com.ar" className="text-[#5a6b7c] hover:text-[#4e6e94] transition-colors ml-6">
                  info@adami.com.ar
                </a>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 font-semibold text-[#1a2b3d]">
                  <Globe className="w-4 h-4 text-[#4e6e94]" />
                  Sitio Web
                </span>
                <a href="https://www.adami.com.ar" target="_blank" rel="noopener noreferrer" className="text-[#5a6b7c] hover:text-[#4e6e94] transition-colors ml-6">
                  www.adami.com.ar
                </a>
              </div>
            </motion.div>

            {/* Map iframe */}
            <motion.div variants={itemVariants} className="mt-4 rounded-sm overflow-hidden border border-[#e2e8f0] h-[250px] relative">
              <div className="absolute inset-0 bg-[#e2e8f0]/50 animate-pulse -z-10"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.4230232537233!2d-64.21852262423166!3d-31.429994874255755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a2f8d8eb82f1%3A0xc3cfc3451121d51a!2sLeopoldo%20Casavega%202949%2C%20X5010%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1700000000000!5m2!1sen!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </motion.div>
          </motion.div>
          
        </div>
      </section>

      <Footer />
    </div>
  );
}
