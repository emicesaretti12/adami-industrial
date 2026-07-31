import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-[#4e6e94] text-white pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand - Takes 2 columns on large screens */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <div>
              <Link href="/">
                <span className="text-3xl font-bold tracking-tight cursor-pointer">ADAMI</span>
              </Link>
              <p className="text-lg font-medium text-white/90 mt-1">Soluciones Industriales</p>
            </div>
            <p className="text-white/70 max-w-sm leading-relaxed">
              Más de 30 años de experiencia brindando soluciones integrales e innovadoras para la industria a nivel regional y global.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Servicios */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-semibold border-b border-white/20 pb-2 inline-block">Servicios</h3>
            <ul className="space-y-3">
              {[
                { name: "Innovación Tecnológica", path: "/servicios" },
                { name: "Desarrollos Metalúrgicos", path: "/servicios" },
                { name: "Servicios Industriales", path: "/servicios" },
                { name: "Medición Inteligente", path: "/servicios" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.path}>
                    <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-medium">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industrias */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-semibold border-b border-white/20 pb-2 inline-block">Industrias</h3>
            <ul className="space-y-3">
              {[
                { name: "Aeronáutica", path: "/industrias" },
                { name: "Automotriz", path: "/industrias" },
                { name: "Agroindustria", path: "/industrias" },
                { name: "Aeroespacial", path: "/industrias" },
                { name: "Nuclear", path: "/industrias" },
                { name: "Alimenticia", path: "/industrias" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.path}>
                    <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-medium">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-semibold border-b border-white/20 pb-2 inline-block">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-white/70">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-white/90" />
                <span className="text-sm">Leopoldo Casavega 2949,<br/>Villa Aspacia, Córdoba (Argentina)</span>
              </li>
              <li className="flex items-start space-x-3 text-white/70">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-white/90" />
                <span className="text-sm">Av. Nove de Julho, 765,<br/>São José dos Campos - SP (Brasil)</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone className="w-5 h-5 shrink-0 text-white/90" />
                <span className="text-sm">+54 351 4666050</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Mail className="w-5 h-5 shrink-0 text-white/90" />
                <a href="mailto:info@adami.com.ar" className="text-sm hover:text-white transition-colors">
                  info@adami.com.ar
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#3a5a80] py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} ADAMI Soluciones Industriales. Todos los derechos reservados.
            </p>
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors text-sm font-medium group cursor-pointer"
            >
              <span>Volver arriba</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:-translate-y-1 transition-all">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
