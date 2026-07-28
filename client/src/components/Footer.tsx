import { Phone, Mail, MapPin } from "lucide-react";
import { empresa } from "@/lib/adami-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/manus-storage/adami-logo_11c9fab3.png"
                alt="ADAMI"
                className="h-10 w-10"
              />
              <div>
                <span className="font-display text-2xl font-700 text-foreground block leading-none">
                  ADAMI
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Grupo Adami
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {empresa.trayectoria}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary mb-4">
              Navegación
            </h4>
            <ul className="space-y-2">
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary mb-4">
              Servicios
            </h4>
            <ul className="space-y-2">
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-primary transition-colors">Innovación Tecnológica</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-primary transition-colors">Desarrollos Metalúrgicos</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-primary transition-colors">Servicios Industriales</a></li>
              <li><a href="/#servicios" className="text-sm text-muted-foreground hover:text-primary transition-colors">Metrología Dimensional</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{empresa.contacto.direccion}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{empresa.contacto.telefonoFax}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href={`mailto:${empresa.contacto.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {empresa.contacto.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {empresa.anioCopyright}—{year} {empresa.nombreCompleto}. Todos los derechos reservados.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            ISO 9001:2015 · Bureau Veritas Certification
          </p>
        </div>
      </div>
    </footer>
  );
}
