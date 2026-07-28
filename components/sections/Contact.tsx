'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import RevealSection from '@/components/RevealSection'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Córdoba, Argentina',
    detail: 'Planta industrial de 630 m²',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+54 (351) 000-0000',
    detail: 'Lunes a Viernes, 8:00 - 18:00',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contacto@adami.com.ar',
    detail: 'Respuesta en menos de 24hs',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun - Vie: 8:00 - 18:00',
    detail: 'Sáb: 8:00 - 13:00',
  },
]

const services = [
  'Diseño Industrial 3D',
  'Desarrollos Metalúrgicos',
  'Automatización Industrial',
  'Metrología Dimensional',
  'Instalaciones Llave en Mano',
  'Otro',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = (field: string) => `
    w-full bg-transparent border-b border-[#2B6CB0]/20 py-3 px-0 text-white text-sm
    font-['Inter'] outline-none transition-all duration-300 placeholder-[#8B9AB0]/40
    ${focused === field ? 'border-[#2B6CB0]' : 'hover:border-[#2B6CB0]/40'}
  `

  return (
    <section id="contacto" className="relative py-32 lg:py-40 bg-[#0D1520] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/30 to-transparent" />

      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(43, 108, 176, 0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#2B6CB0]" />
            <span className="section-label">06 / Contacto</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h2
              className="font-['Barlow_Condensed'] font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Iniciemos su{' '}
              <span className="text-[#2B6CB0]">próximo proyecto</span>{' '}
              juntos
            </h2>
            <p className="text-[#8B9AB0] text-lg leading-relaxed">
              Cuéntenos sobre su desafío industrial. Nuestro equipo de especialistas
              analizará su caso y le presentará una propuesta personalizada.
            </p>
          </div>
        </RevealSection>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <RevealSection key={i} delay={i * 80} direction="left">
                  <motion.div
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 border border-[#2B6CB0]/30 flex items-center justify-center shrink-0 group-hover:border-[#2B6CB0]/60 group-hover:bg-[#2B6CB0]/10 transition-all duration-300">
                      <Icon size={16} className="text-[#2B6CB0]" />
                    </div>
                    <div>
                      <div className="section-label text-[#2B6CB0]/60 mb-1">{item.label}</div>
                      <div className="font-['Inter'] text-white text-sm font-medium">{item.value}</div>
                      <div className="font-['Inter'] text-[#8B9AB0] text-xs mt-0.5">{item.detail}</div>
                    </div>
                  </motion.div>
                </RevealSection>
              )
            })}

            {/* Decorative element */}
            <RevealSection delay={400}>
              <div className="mt-12 p-6 border border-[#2B6CB0]/15 bg-[#2B6CB0]/5">
                <div className="section-label mb-3">Respuesta garantizada</div>
                <p className="text-[#8B9AB0] text-sm leading-relaxed">
                  Nos comprometemos a responder su consulta en menos de 24 horas hábiles
                  con una propuesta técnica inicial.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-[#2B6CB0] rounded-full animate-pulse" />
                  <span className="text-[#2B6CB0] text-xs font-medium">Disponible para nuevos proyectos</span>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle size={64} className="text-[#2B6CB0] mb-6" />
                  </motion.div>
                  <h3 className="font-['Barlow_Condensed'] font-bold text-white text-3xl uppercase tracking-wide mb-3">
                    Mensaje Enviado
                  </h3>
                  <p className="text-[#8B9AB0] text-sm max-w-sm leading-relaxed">
                    Gracias por contactarnos. Nuestro equipo se comunicará con usted
                    en las próximas 24 horas hábiles.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <RevealSection direction="right">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <label className="section-label block mb-2">Nombre completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Juan García"
                          className={inputClass('name')}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <div>
                        <label className="section-label block mb-2">Empresa *</label>
                        <input
                          type="text"
                          required
                          placeholder="Empresa S.A."
                          className={inputClass('company')}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          onFocus={() => setFocused('company')}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    </div>
                  </RevealSection>

                  <RevealSection direction="right" delay={100}>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <label className="section-label block mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="juan@empresa.com"
                          className={inputClass('email')}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <div>
                        <label className="section-label block mb-2">Teléfono</label>
                        <input
                          type="tel"
                          placeholder="+54 351 000-0000"
                          className={inputClass('phone')}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    </div>
                  </RevealSection>

                  <RevealSection direction="right" delay={150}>
                    <div>
                      <label className="section-label block mb-3">Servicio de interés</label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((service) => (
                          <motion.button
                            key={service}
                            type="button"
                            onClick={() => setFormData({ ...formData, service })}
                            className={`px-4 py-2 text-xs font-medium border transition-all duration-200 ${
                              formData.service === service
                                ? 'border-[#2B6CB0] bg-[#2B6CB0]/15 text-[#2B6CB0]'
                                : 'border-[#2B6CB0]/20 text-[#8B9AB0] hover:border-[#2B6CB0]/40 hover:text-white'
                            }`}
                            whileTap={{ scale: 0.97 }}
                          >
                            {service}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </RevealSection>

                  <RevealSection direction="right" delay={200}>
                    <div>
                      <label className="section-label block mb-2">Descripción del proyecto *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describa brevemente su proyecto o necesidad industrial..."
                        className={`${inputClass('message')} resize-none`}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </RevealSection>

                  <RevealSection direction="right" delay={250}>
                    <motion.button
                      type="submit"
                      className="magnetic-btn w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#2B6CB0] text-white font-['Inter'] font-semibold text-sm tracking-wide hover:bg-[#3B82C4] transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={16} />
                      Enviar Consulta
                    </motion.button>
                  </RevealSection>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
