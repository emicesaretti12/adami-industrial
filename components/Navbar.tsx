'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

const navLinks = [
  { label: 'Empresa', href: '#empresa' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Industrias', href: '#industrias' },
  { label: 'Infraestructura', href: '#infraestructura' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#2B6CB0] to-[#4A9FE8] z-[9999]"
        style={{ width: progressWidth }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
          scrolled
            ? 'bg-[#080C14]/95 backdrop-blur-xl border-b border-[#2B6CB0]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-[#2B6CB0] flex items-center justify-center">
                  <span className="text-white font-['Barlow_Condensed'] font-black text-xl tracking-wider">A</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-[#2B6CB0]"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ filter: 'blur(8px)', zIndex: -1 }}
                />
              </div>
              <div>
                <div className="font-['Barlow_Condensed'] font-black text-2xl tracking-[0.15em] text-white leading-none">
                  ADAMI
                </div>
                <div className="font-['JetBrains_Mono'] text-[9px] tracking-[0.25em] text-[#2B6CB0] uppercase leading-none mt-0.5">
                  Industrial
                </div>
              </div>
            </motion.a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative font-['Inter'] text-sm font-medium tracking-wide transition-colors duration-200 hover-underline ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#2B6CB0]'
                      : 'text-[#8B9AB0] hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#2B6CB0]"
                    />
                  )}
                </motion.button>
              ))}

              <motion.button
                onClick={() => handleNavClick('#contacto')}
                className="magnetic-btn px-5 py-2.5 bg-[#2B6CB0] text-white font-['Inter'] text-sm font-semibold tracking-wide hover:bg-[#3B82C4] transition-colors duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Solicitar Cotización
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden bg-[#0D1520]/98 backdrop-blur-xl border-t border-[#2B6CB0]/20 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center justify-between w-full py-3 text-left text-[#8B9AB0] hover:text-white font-['Inter'] text-base border-b border-[#2B6CB0]/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="text-[#2B6CB0]" />
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNavClick('#contacto')}
                  className="w-full mt-4 py-3 bg-[#2B6CB0] text-white font-semibold tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Solicitar Cotización
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
