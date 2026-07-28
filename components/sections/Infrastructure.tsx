'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import RevealSection from '@/components/RevealSection'

const areas = [
  {
    name: 'Mecanizado y Armado',
    surface: '330',
    unit: 'm²',
    description: 'Layout de asistencia directa desde las máquinas hacia la línea de ensamble. Equipos CNC de última generación.',
    features: ['Tornos CNC', 'Fresadoras CNC', 'Centros de mecanizado', 'Mesas rotativas 4/5 ejes'],
    percentage: 52,
  },
  {
    name: 'Soldadura',
    surface: '100',
    unit: 'm²',
    description: 'Área especializada con equipos de soldadura MIG, TIG y por arco para todo tipo de materiales y espesores.',
    features: ['Soldadura MIG/MAG', 'Soldadura TIG', 'Soldadura por arco', 'Control de calidad'],
    percentage: 16,
  },
  {
    name: 'Pintura y Acabado',
    surface: '200',
    unit: 'm²',
    description: 'Capacidad para grandes proyectos con horno de secado que permite cumplir tiempos de entrega independientemente de condiciones climáticas.',
    features: ['Horno de secado', 'Cabina de pintura', 'Tratamiento superficial', 'Control de calidad'],
    percentage: 32,
  },
]

const equipment = [
  { name: 'Brazo FARO Platinum', category: 'Metrología', desc: 'Medición dimensional de alta precisión' },
  { name: 'Laser Tracker FARO', category: 'Metrología', desc: 'Seguimiento láser para grandes piezas' },
  { name: 'Software PolyWorks', category: 'Software', desc: 'Análisis y reportes dimensionales' },
  { name: 'Centros CNC 4/5 ejes', category: 'Mecanizado', desc: 'Mecanizado de alta complejidad' },
  { name: 'Tornos CNC', category: 'Mecanizado', desc: 'Torneado de precisión' },
  { name: 'Fresadoras CNC', category: 'Mecanizado', desc: 'Fresado de alta velocidad' },
]

function ProgressBar({ percentage, delay = 0 }: { percentage: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="h-1 bg-[#2B6CB0]/10 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-[#2B6CB0] to-[#4A9FE8]"
        initial={{ width: 0 }}
        animate={{ width: isInView ? `${percentage}%` : 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay }}
      />
    </div>
  )
}

export default function Infrastructure() {
  return (
    <section id="infraestructura" className="relative py-32 lg:py-40 bg-[#0D1520] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/30 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#2B6CB0]" />
            <span className="section-label">04 / Infraestructura</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h2
              className="font-['Barlow_Condensed'] font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Planta industrial de{' '}
              <span className="text-[#2B6CB0]">630 m²</span>
            </h2>
            <p className="text-[#8B9AB0] text-lg leading-relaxed">
              Instalaciones de última generación diseñadas para maximizar la eficiencia y garantizar
              la calidad en cada etapa del proceso productivo.
            </p>
          </div>
        </RevealSection>

        {/* Areas grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {areas.map((area, i) => (
            <RevealSection key={i} delay={i * 100}>
              <motion.div
                className="industrial-card p-8 h-full"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {/* Surface */}
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className="stat-number leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
                  >
                    {area.surface}
                  </span>
                  <span className="text-[#2B6CB0] font-['Barlow_Condensed'] font-bold text-2xl mb-1">
                    {area.unit}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <ProgressBar percentage={area.percentage} delay={i * 0.2} />
                </div>

                <h3 className="font-['Barlow_Condensed'] font-bold text-white text-xl uppercase tracking-wide mb-3">
                  {area.name}
                </h3>

                <p className="text-[#8B9AB0] text-sm leading-relaxed mb-5">
                  {area.description}
                </p>

                <div className="space-y-2">
                  {area.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05 }}
                    >
                      <div className="w-1 h-1 bg-[#2B6CB0] rounded-full shrink-0" />
                      <span className="text-[#C5D0E0] text-xs">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>

        {/* Equipment section */}
        <RevealSection className="mb-12">
          <h3 className="font-['Barlow_Condensed'] font-bold text-white text-2xl uppercase tracking-wide mb-2">
            Equipamiento Tecnológico
          </h3>
          <p className="text-[#8B9AB0] text-sm">
            Inversión constante en tecnología de vanguardia para mantener los más altos estándares de calidad.
          </p>
        </RevealSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((eq, i) => (
            <RevealSection key={i} delay={i * 60}>
              <motion.div
                className="flex items-start gap-4 p-5 border border-[#2B6CB0]/15 group"
                whileHover={{
                  borderColor: 'rgba(43, 108, 176, 0.4)',
                  backgroundColor: 'rgba(43, 108, 176, 0.04)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-2 h-2 bg-[#2B6CB0] rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="section-label text-[#2B6CB0]/60 mb-1">{eq.category}</div>
                  <h4 className="font-['Barlow_Condensed'] font-bold text-white text-base uppercase tracking-wide mb-1">
                    {eq.name}
                  </h4>
                  <p className="text-[#8B9AB0] text-xs">{eq.desc}</p>
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
