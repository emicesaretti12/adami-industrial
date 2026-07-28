'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealSection from '@/components/RevealSection'

const stats = [
  { value: 30, suffix: '+', label: 'Años de trayectoria', desc: 'Desde 1993 en el mercado industrial' },
  { value: 60, suffix: '+', label: 'Clientes industriales', desc: 'Empresas líderes en 7 sectores' },
  { value: 7, suffix: '', label: 'Sectores atendidos', desc: 'Automotriz, aeroespacial, nuclear y más' },
  { value: 630, suffix: 'm²', label: 'Planta industrial', desc: 'Instalaciones de última generación' },
]

function Counter({ value, suffix, delay = 0 }: { value: number; suffix: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      let start = 0
      const duration = 2000
      const step = value / (duration / 16)
      const interval = setInterval(() => {
        start += step
        if (start >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="stat-number leading-none" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}>
      {count}{suffix}
    </div>
  )
}

export default function Stats() {
  return (
    <section className="relative py-20 bg-[#0D1520] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/30 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <RevealSection key={i} delay={i * 100}>
              <motion.div
                className="group text-center lg:text-left"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Counter value={stat.value} suffix={stat.suffix} delay={i * 200} />
                <div className="font-['Barlow_Condensed'] font-bold text-white text-base uppercase tracking-wide mt-2 mb-1">
                  {stat.label}
                </div>
                <div className="text-[#8B9AB0] text-xs leading-relaxed hidden lg:block">
                  {stat.desc}
                </div>
                <motion.div
                  className="h-px bg-gradient-to-r from-[#2B6CB0] to-transparent mt-3 mx-auto lg:mx-0"
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
