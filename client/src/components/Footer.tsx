import { Phone, Mail, MapPin } from "lucide-react";
import { empresa } from "@/lib/adami-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663751686161/MKadoAWFfElgzipt.webp"
                alt="ADAMI"
                className="h-8 w-8"
              />
              <div>
                <span className="font-display text-lg font-semibold text-foreground block leading-none tracking-tight">
                  ADAMI
                </span>
                <span className="font-sans text-[9px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                  Grupo Adami
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {empresa.trayectoria}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-5">
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
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-5">
              Servicios
            </h4>
            <ul className="space-y-3">
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Innovación Tecnológica</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Desarrollos Metalúrgicos</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Servicios Industriales</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Metrología Dimensional</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground">{empresa.contacto.direccion}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-accent shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground">{empresa.contacto.telefonoFax}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-accent shrink-0" strokeWidth={1.5} />
                <a href={`mailto:${empresa.contacto.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {empresa.contacto.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/50">
            © {empresa.anioCopyright}—{year} {empresa.nombreCompleto}. Todos los derechos reservados.
          </p>
          <span className="font-sans text-xs text-muted-foreground/50">
            ISO 9001:2015 · Bureau Veritas Certification
          </span>
        </div>
      </div>
    </footer>
  );
}
