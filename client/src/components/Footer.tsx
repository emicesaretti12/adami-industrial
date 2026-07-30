import { Phone, Mail, MapPin } from "lucide-react";
import { empresa } from "@/lib/adami-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white border-t border-blue-900">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://www.adami.com.ar/wp-content/uploads/2016/05/adami-logo-header.png"
                alt="ADAMI"
                className="h-8 w-auto invert"
              />
              <div>
                <span className="font-display text-lg font-bold text-white block leading-none tracking-tight">
                  ADAMI
                </span>
                <span className="font-sans text-[9px] font-medium tracking-widest text-blue-100 uppercase">
                  Grupo Adami
                </span>
              </div>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              {empresa.trayectoria}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
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
                    className="text-sm text-blue-100 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-5">
              Servicios
            </h4>
            <ul className="space-y-3">
              <li><a href="/#servicios" className="text-sm text-blue-100 hover:text-white transition-colors duration-200 font-medium">Innovación Tecnológica</a></li>
              <li><a href="/#servicios" className="text-sm text-blue-100 hover:text-white transition-colors duration-200 font-medium">Desarrollos Metalúrgicos</a></li>
              <li><a href="/#servicios" className="text-sm text-blue-100 hover:text-white transition-colors duration-200 font-medium">Servicios Industriales</a></li>
              <li><a href="/#servicios" className="text-sm text-blue-100 hover:text-white transition-colors duration-200 font-medium">Metrología Dimensional</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-100 mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-blue-100 font-medium">{empresa.contacto.direccion}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-100 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-blue-100 font-medium">{empresa.contacto.telefonoFax}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-100 shrink-0" strokeWidth={1.5} />
                <a href={`mailto:${empresa.contacto.email}`} className="text-sm text-blue-100 hover:text-white transition-colors font-medium">
                  {empresa.contacto.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-blue-100">
            © {empresa.anioCopyright}—{year} {empresa.nombreCompleto}. Todos los derechos reservados.
          </p>
          <span className="font-sans text-xs text-blue-100">
            ISO 9001:2015 · Bureau Veritas Certification
          </span>
        </div>
      </div>
    </footer>
  );
}
