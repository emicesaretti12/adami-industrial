import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { empresa } from "@/lib/adami-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5">
      <div className="container py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663751686161/MKadoAWFfElgzipt.webp"
                alt="ADAMI"
                className="h-9 w-9"
              />
              <div>
                <span className="font-display text-xl font-700 text-foreground block leading-none tracking-tight">
                  ADAMI
                </span>
                <span className="font-sans text-[10px] font-medium tracking-wider text-muted-foreground">
                  Grupo Adami
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-[1.7] font-light">
              {empresa.trayectoria}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
              Navegación
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Inicio", href: "/" },
                { label: "Empresa", href: "/#empresa" },
                { label: "Servicios", href: "/#servicios" },
                { label: "Industrias", href: "/#industrias" },
                { label: "Clientes", href: "/#clientes" },
                { label: "Contacto", href: "/#contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
              Servicios
            </h4>
            <ul className="space-y-4">
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">Innovación Tecnológica</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">Desarrollos Metalúrgicos</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">Servicios Industriales</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">Metrología Dimensional</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
              Contacto
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground font-light">{empresa.contacto.direccion}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-primary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground font-light">{empresa.contacto.telefonoFax}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-primary shrink-0" strokeWidth={1.5} />
                <a href={`mailto:${empresa.contacto.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  {empresa.contacto.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/40 font-light">
            © {empresa.anioCopyright}—{year} {empresa.nombreCompleto}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-sans text-xs text-muted-foreground/40 font-light">
              ISO 9001:2015 · Bureau Veritas Certification
            </span>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -2 }}
              className="p-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              aria-label="Volver arriba"
            >
              <ArrowUp size={14} className="text-muted-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
