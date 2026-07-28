'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Plane, Rocket, Atom, Wheat, Tractor, Fuel, ArrowRight } from 'lucide-react'
import RevealSection from '@/components/RevealSection'

const industries = [
  {
    id: 'automotriz',
    icon: Car,
    name: 'Automotriz',
    description: 'Componentes de alta precisión para las principales terminales automotrices del mundo. Piezas, dispositivos y líneas de producción.',
    clients: ['Renault', 'Volkswagen', 'General Motors', 'Ford', 'Fiat', 'Toyota'],
  },
  {
    id: 'aeronautica',
    icon: Plane,
    name: 'Aeronáutica',
    description: 'Fabricaciones especiales bajo los más estrictos estándares de calidad aeronáutica. Precisión milimétrica garantizada.',
    clients: ['FADEA', 'INVAP'],
  },
  {
    id: 'aeroespacial',
    icon: Rocket,
    name: 'Aeroespacial',
    description: 'Componentes para proyectos espaciales de alta complejidad. Colaboramos con organismos de investigación de primer nivel.',
    clients: ['CONAE', 'VENG S.A.'],
  },
  {
    id: 'nuclear',
    icon: Atom,
    name: 'Nuclear',
    description: 'Desarrollos para la industria nuclear con certificaciones especiales y trazabilidad completa de materiales y procesos.',
    clients: ['Nucleoeléctrica Argentina', 'INVAP'],
  },
  {
    id: 'alimenticia',
    icon: Wheat,
    name: 'Alimenticia',
    description: 'Equipamiento y maquinaria para la industria alimenticia con materiales aptos para contacto alimentario.',
    clients: ['Arcor', 'Coca-Cola'],
  },
  {
    id: 'agroindustrial',
    icon: Tractor,
    name: 'Agroindustrial',
    description: 'Soluciones para el sector agroindustrial con equipos robustos diseñados para condiciones de trabajo exigentes.',
    clients: ['CNH Industrial'],
  },
  {
    id: 'petrolero',
    icon: Fuel,
    name: 'Petrolero',
    description: 'Componentes y dispositivos para la industria petrolera con materiales resistentes a condiciones extremas.',
    clients: ['Weatherford International'],
  },
]

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)

  return (
    <section id="industrias" className="relative py-32 lg:py-40 bg-[#080C14] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#2B6CB0]" />
            <span className="section-label">03 / Industrias</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h2
              className="font-['Barlow_Condensed'] font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Presencia en los{' '}
              <span className="text-[#2B6CB0]">sectores</span>{' '}
              más exigentes
            </h2>
            <p className="text-[#8B9AB0] text-lg leading-relaxed">
              Nuestra experiencia abarca desde piezas simples hasta grandes dispositivos para la producción
              y complejos desarrollos tecnológicos industriales.
            </p>
          </div>
        </RevealSection>

        {/* Industry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {industries.map((industry, i) => {
            const Icon = industry.icon
            const isActive = activeIndustry === industry.id

            return (
              <RevealSection key={industry.id} delay={i * 60}>
                <motion.div
                  className="industrial-card p-6 cursor-pointer group relative overflow-hidden"
                  onClick={() => setActiveIndustry(isActive ? null : industry.id)}
                  whileHover={{ y: -4 }}
                  animate={{
                    borderColor: isActive ? 'rgba(43, 108, 176, 0.5)' : 'rgba(43, 108, 176, 0.15)',
                  }}
                >
                  {/* Background glow on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-[#2B6CB0]/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10">
                    <motion.div
                      className="w-10 h-10 border border-[#2B6CB0]/30 flex items-center justify-center mb-4"
                      animate={{
                        borderColor: isActive ? 'rgba(43, 108, 176, 0.6)' : 'rgba(43, 108, 176, 0.3)',
                        backgroundColor: isActive ? 'rgba(43, 108, 176, 0.15)' : 'transparent',
                      }}
                    >
                      <Icon size={18} className="text-[#2B6CB0]" />
                    </motion.div>

                    <h3 className="font-['Barlow_Condensed'] font-bold text-white text-lg uppercase tracking-wide mb-2">
                      {industry.name}
                    </h3>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#8B9AB0] text-xs leading-relaxed mb-3">
                            {industry.description}
                          </p>
                          {industry.clients.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {industry.clients.map((client, j) => (
                                <span
                                  key={j}
                                  className="px-2 py-0.5 bg-[#2B6CB0]/10 border border-[#2B6CB0]/20 text-[#2B6CB0] text-[10px] font-medium"
                                >
                                  {client}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isActive && (
                      <p className="text-[#8B9AB0] text-xs line-clamp-2 leading-relaxed">
                        {industry.description}
                      </p>
                    )}
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute bottom-3 right-3">
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={12} className="text-[#2B6CB0]/40" />
                    </motion.div>
                  </div>
                </motion.div>
              </RevealSection>
            )
          })}
        </div>

        {/* Bottom text */}
        <RevealSection>
          <div className="text-center">
            <p className="text-[#8B9AB0] text-sm max-w-2xl mx-auto leading-relaxed">
              Actualmente estamos a cargo de medianos y grandes desarrollos para empresas de los sectores
              mencionados, con una amplia experiencia en desarrollos de piezas simples, grandes dispositivos
              para la producción y complejos desarrollos tecnológicos industriales.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
