'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#080C14] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          className="font-['Barlow_Condensed'] font-black text-white/[0.02] select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          ADAMI
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-px w-12 bg-[#2B6CB0]" />
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#2B6CB0] uppercase tracking-[0.3em]">
              Trabajemos juntos
            </span>
            <div className="h-px w-12 bg-[#2B6CB0]" />
          </motion.div>

          <motion.h2
            className="font-['Barlow_Condensed'] font-black text-white leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            ¿Tiene un proyecto{' '}
            <span className="text-[#2B6CB0]">industrial</span>{' '}
            en mente?
          </motion.h2>

          <motion.p
            className="text-[#8B9AB0] text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nuestro equipo de ingenieros y especialistas está listo para analizar
            su desafío y desarrollar la solución más eficiente y precisa.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="magnetic-btn group inline-flex items-center gap-3 px-10 py-4 bg-[#2B6CB0] text-white font-['Inter'] font-semibold text-sm tracking-wide hover:bg-[#3B82C4] transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Zap size={16} />
              Solicitar Cotización
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#servicios"
              onClick={(e) => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 text-[#8B9AB0] font-['Inter'] text-sm hover:text-white transition-colors hover-underline"
              whileHover={{ x: 4 }}
            >
              Ver todos los servicios
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
