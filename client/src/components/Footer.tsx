import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ArrowUp } from "lucide-react";

const servicios = [
  { name: "Innovación Tecnológica", href: "/servicios" },
  { name: "Desarrollos Metalúrgicos", href: "/servicios" },
  { name: "Servicios Industriales", href: "/servicios" },
  { name: "Medición Inteligente", href: "/servicios" },
];

const industrias = [
  { name: "Aeronáutica", href: "/industrias" },
  { name: "Automotriz", href: "/industrias" },
  { name: "Agroindustria", href: "/industrias" },
  { name: "Aeroespacial", href: "/industrias" },
  { name: "Nuclear", href: "/industrias" },
  { name: "Alimenticia", href: "/industrias" },
];

const empresa = [
  { name: "Nosotros", href: "/empresa" },
  { name: "Calidad", href: "/empresa" },
  { name: "Contacto", href: "/contacto" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0f1c] relative overflow-hidden border-t border-white/5">
      {/* Top Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59, 130, 246, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            <Link href="/">
              <div className="flex flex-col cursor-pointer group inline-block">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-red-600 rounded-sm group-hover:h-8 transition-all duration-300" />
                  <span className="text-3xl font-bold tracking-tighter text-white font-display">
                    ADAMI
                  </span>
                </div>
                <span className="text-xs font-medium tracking-[0.3em] text-gray-500 uppercase pl-3.5 font-mono">
                  Industrial
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Más de 30 años de trayectoria al servicio de la creación,
              implementación y medición de soluciones tecnológicas de calidad
              para la industria argentina e internacional.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.adami.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/10 hover:border-transparent"
              >
                <Globe size={16} />
              </a>
            </div>
          </motion.div>

          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5"
          >
            <h3 className="text-white font-semibold tracking-wider uppercase text-xs font-mono">
              Servicios
            </h3>
            <ul className="space-y-3">
              {servicios.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-gray-400 hover:text-blue-400 text-sm transition-colors cursor-pointer block">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industrias */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5"
          >
            <h3 className="text-white font-semibold tracking-wider uppercase text-xs font-mono">
              Industrias
            </h3>
            <ul className="space-y-3">
              {industrias.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-gray-400 hover:text-blue-400 text-sm transition-colors cursor-pointer block">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5"
          >
            <h3 className="text-white font-semibold tracking-wider uppercase text-xs font-mono">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin
                  size={16}
                  className="text-red-500 shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-white/80 mb-0.5">Argentina</p>
                  <p>
                    Leopoldo Casavega 2949
                    <br />
                    Villa Aspacia, Córdoba
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin
                  size={16}
                  className="text-blue-500 shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-white/80 mb-0.5">Brasil</p>
                  <p>
                    Av. Nove de Julho, 765
                    <br />
                    São José dos Campos - SP
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                <Phone size={16} className="text-blue-500 shrink-0" />
                <a href="tel:+543514666050">+54 351 4666050</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                <Mail size={16} className="text-blue-500 shrink-0" />
                <a href="mailto:info@adami.com.ar">info@adami.com.ar</a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#050810]/50">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} ADAMI — Soluciones Industriales.
            Todos los derechos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-500 hover:text-white text-xs font-medium uppercase tracking-wider transition-colors group"
          >
            Volver arriba
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-transparent transition-all duration-300">
              <ArrowUp
                size={14}
                className="group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
