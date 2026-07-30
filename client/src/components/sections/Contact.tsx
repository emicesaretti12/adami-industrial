import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
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
    <section id="contacto" className="py-20 lg:py-28 bg-white border-t border-gray-200" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-red-500" />
            <span className="font-sans text-xs font-bold tracking-widest text-red-600 uppercase">Contacto</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Hablemos de su próximo proyecto
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
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
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-xs font-bold text-muted-foreground mb-3 tracking-widest uppercase">
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
                <label className="block font-sans text-xs font-bold text-muted-foreground mb-3 tracking-widest uppercase">
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
                <label className="block font-sans text-xs font-bold text-muted-foreground mb-3 tracking-widest uppercase">
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
                <label className="block font-sans text-xs font-bold text-muted-foreground mb-3 tracking-widest uppercase">
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
              <label className="block font-sans text-xs font-bold text-muted-foreground mb-3 tracking-widest uppercase">
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
              className="btn-primary inline-flex items-center gap-2"
            >
              {submitted ? "Enviado ✓" : (
                <>
                  <Send size={16} /> Enviar consulta
                </>
              )}
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="text-accent" size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold text-muted-foreground tracking-wider uppercase mb-1">{info.label}</div>
                    {info.label === "Email" ? (
                      <a href={`mailto:${info.value}`} className="text-base text-foreground hover:text-accent transition-colors font-medium">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-base text-foreground font-medium">{info.value}</div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Map */}
            <div className="relative h-64 rounded overflow-hidden border border-gray-300">
              <iframe
                src={empresa.contacto.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación ADAMI"
              />
            </div>

            {/* Hours */}
            <div className="flex items-center gap-3 p-4 rounded border border-gray-300 bg-gray-50">
              <Clock className="text-accent shrink-0" size={20} strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground font-medium">
                Lun — Vie · 08:00 a 17:00 hs · {empresa.ciudad}, {empresa.pais}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
