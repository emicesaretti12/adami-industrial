'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowDown, ChevronRight, Zap } from 'lucide-react'

// Particle system
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrameId: number
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number;
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    })

    for (let i = 0; i < 80; i++) {
      particles.push(createParticle())
    }

    // Connection lines between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12
            ctx.beginPath()
            ctx.strokeStyle = `rgba(43, 108, 176, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawConnections()

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        const lifeRatio = p.life / p.maxLife
        const alpha = lifeRatio < 0.2
          ? (lifeRatio / 0.2) * p.opacity
          : lifeRatio > 0.8
          ? ((1 - lifeRatio) / 0.2) * p.opacity
          : p.opacity

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(43, 108, 176, ${alpha})`
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(43, 108, 176, ${alpha * 0.1})`
        ctx.fill()

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle()
        }
      })

      animFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}

// Animated counter
function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          let start = 0
          const step = value / (duration * 60)
          const timer = setInterval(() => {
            start += step
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 1000 / 60)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration, started])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 30, suffix: '+', label: 'Años de trayectoria' },
  { value: 60, suffix: '+', label: 'Clientes industriales' },
  { value: 7, suffix: '', label: 'Sectores atendidos' },
  { value: 630, suffix: 'm²', label: 'Planta industrial' },
]

const words = ['Treinta', 'años', 'forjando', 'el', 'futuro', 'industrial.']

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080C14]"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(43, 108, 176, 0.12) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Blueprint corner decorations */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-[#2B6CB0]/30" />
      <div className="absolute top-24 right-8 w-16 h-16 border-r-2 border-t-2 border-[#2B6CB0]/30" />
      <div className="absolute bottom-16 left-8 w-16 h-16 border-l-2 border-b-2 border-[#2B6CB0]/30" />
      <div className="absolute bottom-16 right-8 w-16 h-16 border-r-2 border-b-2 border-[#2B6CB0]/30" />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/40 to-transparent pointer-events-none"
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-20"
        style={{ y, opacity }}
      >
        {/* Tag */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -30 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="w-2 h-2 bg-[#2B6CB0] rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="section-label">Soluciones industriales de precisión</span>
          <div className="h-px w-12 bg-[#2B6CB0]/50" />
        </motion.div>

        {/* Main heading */}
        <h1
          className="font-['Barlow_Condensed'] font-black leading-[0.9] tracking-tight mb-8"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.2em]"
              initial={{ opacity: 0, y: 80, rotateX: -40 }}
              animate={{
                opacity: mounted ? 1 : 0,
                y: mounted ? 0 : 80,
                rotateX: mounted ? 0 : -40,
              }}
              transition={{
                duration: 0.9,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.3 + i * 0.1,
              }}
            >
              {word === 'forjando' || word === 'industrial.' ? (
                <span className="text-[#2B6CB0]">{word}</span>
              ) : (
                <span className="text-white">{word}</span>
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-[#8B9AB0] text-lg lg:text-xl max-w-2xl leading-relaxed mb-10 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 1.0 }}
        >
          Diseño industrial, desarrollos metalúrgicos y servicios de automatización para los sectores
          más exigentes del mundo. Calidad certificada. Precisión garantizada.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 1.2 }}
        >
          <motion.a
            href="#servicios"
            onClick={(e) => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="magnetic-btn group inline-flex items-center gap-3 px-8 py-4 bg-[#2B6CB0] text-white font-['Inter'] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#3B82C4]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap size={16} />
            Explorar Servicios
            <motion.div
              className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300"
            >
              <ChevronRight size={16} />
            </motion.div>
          </motion.a>

          <motion.a
            href="#empresa"
            onClick={(e) => { e.preventDefault(); document.querySelector('#empresa')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#2B6CB0]/40 text-[#8B9AB0] font-['Inter'] font-medium text-sm tracking-wide transition-all duration-300 hover:border-[#2B6CB0] hover:text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sobre ADAMI
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#2B6CB0]/15"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 1.4 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="stat-number leading-none mb-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#8B9AB0] uppercase tracking-widest">
                {stat.label}
              </div>
              <motion.div
                className="h-px bg-[#2B6CB0] mt-3"
                initial={{ width: 0 }}
                whileInView={{ width: '40%' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="section-label text-[#8B9AB0]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[#2B6CB0]" />
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-px bg-[#2B6CB0]/30"
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
          />
        ))}
        <div className="w-2 h-2 border border-[#2B6CB0]/50 rotate-45" />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-px bg-[#2B6CB0]/30"
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            transition={{ delay: 1.8 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </div>
    </section>
  )
}
