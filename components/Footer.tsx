'use client'

import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Empresa', href: '#empresa' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Industrias', href: '#industrias' },
  { label: 'Infraestructura', href: '#infraestructura' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contacto', href: '#contacto' },
]

const services = [
  'Diseño Industrial 3D',
  'Desarrollos Metalúrgicos',
  'Automatización Industrial',
  'Metrología Dimensional',
  'Instalaciones Llave en Mano',
]

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#080C14] border-t border-[#2B6CB0]/15 overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2B6CB0] flex items-center justify-center">
                <span className="text-white font-['Barlow_Condensed'] font-black text-xl tracking-wider">A</span>
              </div>
              <div>
                <div className="font-['Barlow_Condensed'] font-black text-2xl tracking-[0.15em] text-white leading-none">
                  ADAMI
                </div>
                <div className="font-['JetBrains_Mono'] text-[9px] tracking-[0.25em] text-[#2B6CB0] uppercase leading-none mt-0.5">
                  Industrial
                </div>
              </div>
            </div>
            <p className="text-[#8B9AB0] text-sm leading-relaxed mb-6">
              Más de 30 años forjando el futuro industrial. Soluciones de precisión para los sectores más exigentes del mundo.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#2B6CB0] rounded-full animate-pulse" />
              <span className="text-[#2B6CB0] text-xs font-medium font-['JetBrains_Mono']">
                Córdoba, Argentina
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-['Barlow_Condensed'] font-bold text-white text-sm uppercase tracking-[0.2em] mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="text-[#8B9AB0] text-sm hover:text-white transition-colors hover-underline font-['Inter']"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Barlow_Condensed'] font-bold text-white text-sm uppercase tracking-[0.2em] mb-6">
              Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleClick('#servicios')}
                    className="text-[#8B9AB0] text-sm hover:text-white transition-colors hover-underline font-['Inter'] text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Barlow_Condensed'] font-bold text-white text-sm uppercase tracking-[0.2em] mb-6">
              Contacto
            </h4>
            <div className="space-y-4">
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#2B6CB0] uppercase tracking-widest mb-1">Email</div>
                <a href="mailto:contacto@adami.com.ar" className="text-[#8B9AB0] text-sm hover:text-white transition-colors font-['Inter']">
                  contacto@adami.com.ar
                </a>
              </div>
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#2B6CB0] uppercase tracking-widest mb-1">Teléfono</div>
                <a href="tel:+543510000000" className="text-[#8B9AB0] text-sm hover:text-white transition-colors font-['Inter']">
                  +54 (351) 000-0000
                </a>
              </div>
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#2B6CB0] uppercase tracking-widest mb-1">Horario</div>
                <p className="text-[#8B9AB0] text-sm font-['Inter']">
                  Lun - Vie: 8:00 - 18:00<br />
                  Sáb: 8:00 - 13:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2B6CB0]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8B9AB0]/60 text-xs font-['JetBrains_Mono']">
            © {new Date().getFullYear()} ADAMI Industrial. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#8B9AB0]/40 text-xs font-['JetBrains_Mono']">
              Córdoba, Argentina
            </span>
            <div className="w-1 h-1 bg-[#2B6CB0]/30 rounded-full" />
            <span className="text-[#8B9AB0]/40 text-xs font-['JetBrains_Mono']">
              ISO 9001
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
