import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, ArrowRight } from "lucide-react";
import { empresa } from "@/lib/adami-data";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

  const [formState, setFormState] = useState({
    nombre: "", empresa: "", email: "", telefono: "", mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
    }, 3000);
  };

  const contactInfo = [
    { icon: MapPin, label: "Dirección", value: empresa.contacto.direccion },
    { icon: Phone, label: "Teléfono", value: empresa.contacto.telefonoFax },
    { icon: Mail, label: "Email", value: empresa.contacto.email },
  ];

  return (
    <section id="contacto" className="relative py-36 lg:py-48 overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div className="container" style={{ opacity }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="h-px bg-primary"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: "50px" }}
            />
            <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">05 / Contacto</span>
          </div>
          <h2 className="font-display font-700 text-foreground leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Hablemos de su
            <br />
            <span className="text-gradient">próximo proyecto</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-[1.7] font-light max-w-2xl">
            Cuéntenos sobre su proyecto. Nuestro equipo de innovación tecnológica analizará su demanda y le propondrá la mejor solución.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-16 lg:gap-24">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group">
                <label className="block font-sans text-[11px] font-semibold text-muted-foreground mb-4 tracking-[0.1em] uppercase">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formState.nombre}
                  onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-foreground font-light text-base focus:border-primary focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/30"
                  placeholder="Su nombre"
                />
              </div>
              <div className="group">
                <label className="block font-sans text-[11px] font-semibold text-muted-foreground mb-4 tracking-[0.1em] uppercase">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formState.empresa}
                  onChange={(e) => setFormState({ ...formState, empresa: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-foreground font-light text-base focus:border-primary focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/30"
                  placeholder="Su empresa"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-[11px] font-semibold text-muted-foreground mb-4 tracking-[0.1em] uppercase">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-foreground font-light text-base focus:border-primary focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/30"
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <label className="block font-sans text-[11px] font-semibold text-muted-foreground mb-4 tracking-[0.1em] uppercase">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formState.telefono}
                  onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-foreground font-light text-base focus:border-primary focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/30"
                  placeholder="+54 ..."
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[11px] font-semibold text-muted-foreground mb-4 tracking-[0.1em] uppercase">
                Mensaje *
              </label>
              <textarea
                required
                rows={4}
                value={formState.mensaje}
                onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-foreground font-light text-base focus:border-primary focus:outline-none transition-colors duration-300 resize-none placeholder:text-muted-foreground/30"
                placeholder="Describa su proyecto o consulta..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitted}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 group inline-flex items-center gap-2 px-9 py-4 bg-foreground text-background font-sans text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300 disabled:opacity-50"
            >
              {submitted ? "Enviado ✓" : (
                <>
                  <Send size={16} /> Enviar consulta
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-10"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="text-primary" size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-sans text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">{info.label}</div>
                    {info.label === "Email" ? (
                      <a href={`mailto:${info.value}`} className="text-sm text-foreground hover:text-primary transition-colors font-light">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-sm text-foreground font-light">{info.value}</div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Map */}
            <div className="relative h-72 rounded-2xl overflow-hidden border border-white/5">
              <iframe
                src={empresa.contacto.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.8)", borderRadius: "16px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación ADAMI"
              />
            </div>

            {/* Hours */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <Clock className="text-primary" size={18} strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground font-light">
                Lun — Vie · 08:00 a 17:00 hs · {empresa.ciudad}, {empresa.pais}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
