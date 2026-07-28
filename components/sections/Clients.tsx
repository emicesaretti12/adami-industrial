'use client'

import { motion } from 'framer-motion'
import RevealSection from '@/components/RevealSection'

const featuredClients = [
  'Renault', 'Volkswagen', 'General Motors', 'Ford', 'Fiat',
  'PSA Peugeot Citroën', 'Iveco', 'CNH Industrial', 'ABB', 'Comau Argentina',
  'Toyota', 'Denso', 'Gestamp', 'Magna', 'NASA / Nucleoeléctrica',
  'INVAP', 'VENG S.A.', 'CONAE', 'FADEA', 'Arcor', 'Coca-Cola',
]

const allClients = [
  ...featuredClients,
  'ASCANELLI S.A.', 'AUTONEUM ARGENTINA', 'BARRAX ARGENTINA', 'CEAM SRL',
  'CIBIE ARGENTINA', 'CONVERFLEX', 'CORLOVE SRL', 'CORRUGADORA CENTRO',
  'IRB SOLUTIONS', 'L EQUIPE MONTEUR', 'MAGNETI MARELLI', 'MAGNETTO AUTOMOTIVE',
  'NUCLEOELECTRICA ARGENTINA', 'PABSA S.A.', 'POLIMETAL', 'TOYOTA', 'VALEO',
  'WEATHERFORD INTERNATIONAL',
]

const partners = ['ASTI', 'CYDAK', 'Ixibot Robótica']

// Duplicate for seamless marquee
const marqueeItems = [...allClients, ...allClients]

export default function Clients() {
  return (
    <section id="clientes" className="relative py-32 lg:py-40 bg-[#080C14] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#2B6CB0]" />
            <span className="section-label">05 / Clientes</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h2
              className="font-['Barlow_Condensed'] font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Confianza de las{' '}
              <span className="text-[#2B6CB0]">marcas líderes</span>{' '}
              del mundo
            </h2>
            <p className="text-[#8B9AB0] text-lg leading-relaxed">
              Más de 60 empresas de los sectores más exigentes confían en ADAMI para sus proyectos
              industriales más críticos.
            </p>
          </div>
        </RevealSection>

        {/* Featured clients grid */}
        <RevealSection className="mb-16">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {featuredClients.map((client, i) => (
              <motion.div
                key={i}
                className="industrial-card px-3 py-4 flex items-center justify-center text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(43, 108, 176, 0.5)' }}
              >
                <span className="font-['Inter'] text-[#8B9AB0] text-xs font-medium text-center leading-tight group-hover:text-white transition-colors">
                  {client}
                </span>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden py-6 mb-16">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080C14] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080C14] to-transparent z-10" />

        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {marqueeItems.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-6 shrink-0"
            >
              <span className="font-['Barlow_Condensed'] font-bold text-[#8B9AB0]/40 text-lg uppercase tracking-widest">
                {client}
              </span>
              <div className="w-1 h-1 bg-[#2B6CB0]/30 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Partners */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <RevealSection>
          <div className="border border-[#2B6CB0]/15 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="section-label mb-3">Alianzas Estratégicas</div>
                <h3 className="font-['Barlow_Condensed'] font-bold text-white text-2xl uppercase tracking-wide mb-3">
                  Socios tecnológicos de confianza
                </h3>
                <p className="text-[#8B9AB0] text-sm leading-relaxed">
                  Trabajamos en alianza con empresas líderes en tecnología industrial para ofrecer
                  soluciones integrales de mayor valor agregado.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {partners.map((partner, i) => (
                  <motion.div
                    key={i}
                    className="px-6 py-3 border border-[#2B6CB0]/30 bg-[#2B6CB0]/5"
                    whileHover={{ borderColor: 'rgba(43, 108, 176, 0.6)', scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="font-['Barlow_Condensed'] font-bold text-white text-lg uppercase tracking-wide">
                      {partner}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
