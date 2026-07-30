import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, ArrowRight } from "lucide-react";
import { empresa } from "@/lib/adami-data";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="contacto" className="py-24 lg:py-32 border-t border-border" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent" />
            <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Contacto</span>
          </div>
          <h2 className="font-display text-foreground leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Hablemos de su{" "}
            <span className="text-gradient">próximo proyecto</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-[1.7] max-w-2xl">
            Cuéntenos sobre su proyecto. Nuestro equipo de innovación tecnológica analizará su demanda y le propondrá la mejor solución.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-20">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-[10px] font-semibold text-muted-foreground mb-3 tracking-[0.15em] uppercase">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formState.nombre}
                  onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                  className="input-industrial w-full"
                  placeholder="Su nombre"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-semibold text-muted-foreground mb-3 tracking-[0.15em] uppercase">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formState.empresa}
                  onChange={(e) => setFormState({ ...formState, empresa: e.target.value })}
                  className="input-industrial w-full"
                  placeholder="Su empresa"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-[10px] font-semibold text-muted-foreground mb-3 tracking-[0.15em] uppercase">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="input-industrial w-full"
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-semibold text-muted-foreground mb-3 tracking-[0.15em] uppercase">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formState.telefono}
                  onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
                  className="input-industrial w-full"
                  placeholder="+54 ..."
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] font-semibold text-muted-foreground mb-3 tracking-[0.15em] uppercase">
                Mensaje *
              </label>
              <textarea
                required
                rows={4}
                value={formState.mensaje}
                onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
                className="input-industrial w-full resize-none"
                placeholder="Describa su proyecto o consulta..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-background font-sans text-sm font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {submitted ? "Enviado ✓" : (
                <>
                  <Send size={15} /> Enviar consulta
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="text-accent" size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-sans text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">{info.label}</div>
                    {info.label === "Email" ? (
                      <a href={`mailto:${info.value}`} className="text-sm text-foreground hover:text-accent transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-sm text-foreground">{info.value}</div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Map */}
            <div className="relative h-64 rounded-sm overflow-hidden border border-border">
              <iframe
                src={empresa.contacto.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación ADAMI"
              />
            </div>

            {/* Hours */}
            <div className="flex items-center gap-3 p-4 rounded-sm border border-border bg-background/50">
              <Clock className="text-accent shrink-0" size={16} strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">
                Lun — Vie · 08:00 a 17:00 hs · {empresa.ciudad}, {empresa.pais}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
