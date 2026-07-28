'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Shield, Award, Target, Cpu } from 'lucide-react'
import RevealSection from '@/components/RevealSection'

const pillars = [
  {
    icon: Shield,
    title: 'Calidad Certificada',
    description: 'Procesos bajo estrictos estándares de calidad con seguimiento exhaustivo desde el inicio hasta la entrega final.',
  },
  {
    icon: Target,
    title: 'Precisión Absoluta',
    description: 'Tecnología de última generación para garantizar tolerancias dimensionales de primer orden en cada proyecto.',
  },
  {
    icon: Cpu,
    title: 'Innovación Constante',
    description: 'Inversión permanente en equipamiento y capacitación para mantenernos a la vanguardia industrial.',
  },
  {
    icon: Award,
    title: 'Compromiso Total',
    description: 'Servicio de post-venta y seguimiento continuo que garantiza la satisfacción del cliente a largo plazo.',
  },
]

const timeline = [
  { year: '1993', event: 'Fundación de ADAMI Industrial en Córdoba, Argentina' },
  { year: '2000', event: 'Incorporación de tecnología CNC de alta precisión' },
  { year: '2008', event: 'Expansión de planta a 630 m² con área de soldadura y pintura' },
  { year: '2015', event: 'Adquisición de Brazo FARO y Laser Tracker para metrología dimensional' },
  { year: '2020', event: 'Certificación de proyectos para sector aeroespacial y nuclear' },
  { year: '2024', event: 'Más de 60 clientes industriales en 7 sectores estratégicos' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="empresa" ref={sectionRef} className="relative py-32 lg:py-40 bg-[#080C14] overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#2B6CB0]/5 hidden lg:block" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#2B6CB0]" />
            <span className="section-label">01 / Empresa</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h2
              className="font-['Barlow_Condensed'] font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Tres décadas de{' '}
              <span className="text-[#2B6CB0]">excelencia</span>{' '}
              industrial
            </h2>
            <p className="text-[#8B9AB0] text-lg leading-relaxed">
              ADAMI Industrial nació en Córdoba, Argentina, con la visión de convertirse en un referente
              de la industria nacional. Hoy, con más de 30 años de trayectoria, somos el socio estratégico
              de las empresas más exigentes del mundo.
            </p>
          </div>
        </RevealSection>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Left: text + pillars */}
          <div className="space-y-8">
            <RevealSection>
              <p className="text-[#C5D0E0] leading-relaxed text-base">
                Desde nuestras instalaciones de <strong className="text-white">630 m²</strong> en Córdoba,
                desarrollamos soluciones llave en mano para los sectores automotriz, aeronáutico, aeroespacial,
                nuclear, alimenticio, agroindustrial y petrolero. Nuestra propuesta integra diseño industrial 3D,
                mecanizado de alta precisión, soldadura, pintura y metrología dimensional.
              </p>
            </RevealSection>

            <RevealSection delay={100}>
              <p className="text-[#8B9AB0] leading-relaxed text-base">
                Contamos con equipos de medición de última generación —<strong className="text-[#2B6CB0]">Brazo FARO Platinum</strong> y{' '}
                <strong className="text-[#2B6CB0]">Laser Tracker FARO</strong>— junto con el software PolyWorks,
                lo que nos permite brindar un servicio de metrología dimensional de primer orden.
              </p>
            </RevealSection>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <RevealSection key={i} delay={i * 100}>
                    <motion.div
                      className="industrial-card p-5 group cursor-default"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="w-8 h-8 bg-[#2B6CB0]/10 border border-[#2B6CB0]/30 flex items-center justify-center mb-3"
                        whileHover={{ backgroundColor: 'rgba(43, 108, 176, 0.2)' }}
                      >
                        <Icon size={16} className="text-[#2B6CB0]" />
                      </motion.div>
                      <h4 className="font-['Barlow_Condensed'] font-bold text-white text-base uppercase tracking-wide mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-[#8B9AB0] text-xs leading-relaxed">
                        {pillar.description}
                      </p>
                    </motion.div>
                  </RevealSection>
                )
              })}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="relative">
            <RevealSection>
              <h3 className="font-['Barlow_Condensed'] font-bold text-white text-2xl uppercase tracking-wide mb-8">
                Nuestra Trayectoria
              </h3>
            </RevealSection>

            <div className="relative pl-8">
              {/* Animated vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#2B6CB0]/15">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[#2B6CB0]"
                  style={{ height: lineHeight }}
                />
              </div>

              {timeline.map((item, i) => (
                <RevealSection key={i} delay={i * 80}>
                  <motion.div
                    className="relative mb-8 group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Dot */}
                    <motion.div
                      className="absolute -left-[2.25rem] top-1 w-3 h-3 border-2 border-[#2B6CB0] bg-[#080C14]"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    />

                    <div className="section-label text-[#2B6CB0] mb-1">{item.year}</div>
                    <p className="text-[#C5D0E0] text-sm leading-relaxed group-hover:text-white transition-colors">
                      {item.event}
                    </p>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <RevealSection>
          <motion.div
            className="relative overflow-hidden border border-[#2B6CB0]/20 p-10 lg:p-16"
            whileInView={{
              borderColor: 'rgba(43, 108, 176, 0.4)',
            }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B6CB0]/5 to-transparent" />
            <div className="scan-line" />
            <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3
                  className="font-['Barlow_Condensed'] font-black text-white leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
                >
                  Somos el socio estratégico que su empresa necesita
                </h3>
                <p className="text-[#8B9AB0] leading-relaxed">
                  Desde el diseño hasta la entrega, nos involucramos en cada etapa del proyecto
                  para garantizar resultados que superan las expectativas.
                </p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <motion.a
                  href="#contacto"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="magnetic-btn inline-flex items-center gap-2 px-8 py-4 bg-[#2B6CB0] text-white font-semibold text-sm tracking-wide hover:bg-[#3B82C4] transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Iniciar Proyecto
                </motion.a>
              </div>
            </div>
          </motion.div>
        </RevealSection>
      </div>
    </section>
  )
}
