'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Wrench, Ruler, Check, Plus, ArrowRight } from 'lucide-react'
import RevealSection from '@/components/RevealSection'

const services = [
  {
    id: 'innovacion',
    number: '01',
    icon: Settings,
    title: 'Diseño e Innovación Industrial',
    shortDesc: 'Proyectamos y modelamos soluciones industriales con tecnología 3D CAD-CAM de última generación.',
    longDesc: 'A partir de las necesidades del cliente, proyectamos y modelamos propuestas para solucionar o bien optimizar los procesos industriales. Durante el desarrollo, aportamos previsualizaciones del diseño, su funcionamiento y potenciales fallas, garantizando así el resultado deseado.',
    details: [
      'Diseño Industrial 3D y CAD-CAM',
      'Ingeniería de procesos',
      'Gestión de proyectos industriales',
      'Software de medición PolyWorks',
      'Simulación de procesos',
      'Análisis de elementos finitos',
    ],
    color: '#2B6CB0',
  },
  {
    id: 'metalurgicos',
    number: '02',
    icon: Wrench,
    title: 'Desarrollos Metalúrgicos',
    shortDesc: 'Fabricaciones especiales a medida con equipos de mecanizado de última tecnología y control exhaustivo.',
    longDesc: 'Poseemos una amplia cantidad de equipos de mecanizado y precisión de última tecnología, y realizamos un seguimiento exhaustivo del proyecto desde su inicio hasta el fin de su producción, garantizando nuestro compromiso a través de nuestro servicio de post-venta.',
    details: [
      'Fabricaciones especiales a medida',
      'Máquinas, equipos y dispositivos',
      'Coquillas, cajas de noyos y modelos',
      'Matricería y moldes especiales',
      'Mesas Rotativas de 4 y 5 ejes',
      'Soldadura especializada',
    ],
    infrastructure: [
      { area: 'Mecanizado y armado', surface: '330 m² cubiertos' },
      { area: 'Soldadura', surface: '100 m² cubiertos' },
      { area: 'Pintura con horno', surface: '200 m² cubiertos' },
    ],
    color: '#2B6CB0',
  },
  {
    id: 'industriales',
    number: '03',
    icon: Ruler,
    title: 'Servicios Industriales',
    shortDesc: 'Instalaciones llave en mano, automatización y medición inteligente con tecnología FARO.',
    longDesc: 'Nuestro equipo asume el desafío de garantizar los resultados en el tiempo, realizando mediciones inteligentes, ajustes clave y comprometiéndose con la calidad final de las soluciones entregadas llave en mano.',
    details: [
      'Instalaciones llave en mano',
      'Automatización Industrial',
      'Montaje de líneas y robots',
      'Servicio de medición inteligente',
      'Seguimiento post-venta',
      'Software PolyWorks',
    ],
    metrology: {
      desc: 'Brazo FARO Platinum y Laser Tracker FARO para metrología dimensional de primer orden.',
      equipment: ['Brazo FARO Platinum', 'Laser Tracker FARO'],
    },
    color: '#2B6CB0',
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section id="servicios" className="relative py-32 lg:py-40 bg-[#0D1520] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/30 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#2B6CB0]" />
            <span className="section-label">02 / Servicios</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h2
              className="font-['Barlow_Condensed'] font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Soluciones{' '}
              <span className="text-[#2B6CB0]">llave en mano</span>{' '}
              para la industria
            </h2>
            <p className="text-[#8B9AB0] text-lg leading-relaxed">
              Desde el concepto hasta la entrega, ofrecemos un ecosistema completo de servicios industriales
              diseñado para los proyectos más complejos y exigentes.
            </p>
          </div>
        </RevealSection>

        {/* Services */}
        <div className="space-y-4">
          {services.map((service, i) => {
            const Icon = service.icon
            const isActive = activeService === service.id
            const isHovered = hoveredService === service.id

            return (
              <RevealSection key={service.id} delay={i * 100}>
                <motion.div
                  className="border border-[#2B6CB0]/15 overflow-hidden cursor-pointer"
                  onHoverStart={() => setHoveredService(service.id)}
                  onHoverEnd={() => setHoveredService(null)}
                  animate={{
                    borderColor: isActive
                      ? 'rgba(43, 108, 176, 0.5)'
                      : isHovered
                      ? 'rgba(43, 108, 176, 0.3)'
                      : 'rgba(43, 108, 176, 0.15)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header row */}
                  <motion.div
                    className="flex items-center gap-6 p-6 lg:p-8"
                    onClick={() => setActiveService(isActive ? null : service.id)}
                    animate={{
                      backgroundColor: isActive
                        ? 'rgba(43, 108, 176, 0.08)'
                        : isHovered
                        ? 'rgba(43, 108, 176, 0.04)'
                        : 'rgba(13, 21, 32, 0)',
                    }}
                  >
                    {/* Number */}
                    <span className="font-['JetBrains_Mono'] text-[#2B6CB0]/40 text-sm hidden sm:block">
                      {service.number}
                    </span>

                    {/* Icon */}
                    <motion.div
                      className="w-12 h-12 border border-[#2B6CB0]/30 flex items-center justify-center shrink-0"
                      animate={{
                        backgroundColor: isActive ? 'rgba(43, 108, 176, 0.15)' : 'transparent',
                        borderColor: isActive ? 'rgba(43, 108, 176, 0.6)' : 'rgba(43, 108, 176, 0.3)',
                      }}
                    >
                      <Icon size={20} className="text-[#2B6CB0]" />
                    </motion.div>

                    {/* Title & desc */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Barlow_Condensed'] font-bold text-white text-xl lg:text-2xl uppercase tracking-wide">
                        {service.title}
                      </h3>
                      <p className="text-[#8B9AB0] text-sm mt-1 leading-relaxed hidden sm:block">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Toggle */}
                    <motion.div
                      className="w-8 h-8 border border-[#2B6CB0]/30 flex items-center justify-center shrink-0"
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Plus size={16} className="text-[#2B6CB0]" />
                    </motion.div>
                  </motion.div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-8 border-t border-[#2B6CB0]/15 pt-6">
                          <div className="grid lg:grid-cols-3 gap-8">
                            {/* Description */}
                            <div className="lg:col-span-1">
                              <p className="text-[#C5D0E0] text-sm leading-relaxed mb-6">
                                {service.longDesc}
                              </p>
                              {service.metrology && (
                                <div className="p-4 border border-[#2B6CB0]/20 bg-[#2B6CB0]/5">
                                  <div className="section-label mb-2">Metrología</div>
                                  <p className="text-[#8B9AB0] text-xs leading-relaxed mb-3">
                                    {service.metrology.desc}
                                  </p>
                                  <div className="space-y-1">
                                    {service.metrology.equipment.map((eq, j) => (
                                      <div key={j} className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-[#2B6CB0] rounded-full" />
                                        <span className="text-[#2B6CB0] text-xs font-medium">{eq}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {service.infrastructure && (
                                <div className="space-y-2">
                                  <div className="section-label mb-3">Infraestructura</div>
                                  {service.infrastructure.map((inf, j) => (
                                    <div key={j} className="flex justify-between items-center py-2 border-b border-[#2B6CB0]/10">
                                      <span className="text-[#8B9AB0] text-xs">{inf.area}</span>
                                      <span className="text-[#2B6CB0] text-xs font-medium">{inf.surface}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Details list */}
                            <div className="lg:col-span-2">
                              <div className="section-label mb-4">Detalle de servicios</div>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {service.details.map((detail, j) => (
                                  <motion.div
                                    key={j}
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.05 }}
                                  >
                                    <Check size={14} className="text-[#2B6CB0] shrink-0 mt-0.5" />
                                    <span className="text-[#C5D0E0] text-sm">{detail}</span>
                                  </motion.div>
                                ))}
                              </div>

                              <motion.a
                                href="#contacto"
                                onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
                                className="inline-flex items-center gap-2 mt-8 text-[#2B6CB0] text-sm font-medium hover-underline group"
                                whileHover={{ x: 4 }}
                              >
                                Consultar sobre este servicio
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </RevealSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
