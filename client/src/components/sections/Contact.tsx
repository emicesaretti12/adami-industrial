import { useState } from "react";
import { Phone, Mail, MapPin, Send, Building, Clock } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { empresa } from "@/lib/adami-data";

/**
 * Contact section — form, contact info, and Google Maps embed.
 */
export default function Contact() {
  const [formState, setFormState] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
    }, 3000);
  };

  const contactInfo = [
    { icon: MapPin, label: "Dirección", value: empresa.contacto.direccion },
    { icon: Phone, label: "Teléfono / Fax", value: empresa.contacto.telefonoFax },
    { icon: Mail, label: "Email", value: empresa.contacto.email },
    { icon: Building, label: "Código Postal", value: empresa.contacto.codigoPostal },
  ];

  return (
    <section id="contacto" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />

      <div className="container relative z-10">
        {/* Header */}
        <RevealSection className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              05 / Contacto
            </span>
          </div>
          <h2 className="font-display font-600 text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Construyamos su <span className="text-amber-gradient">próxima solución</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cuéntenos sobre su proyecto. Nuestro equipo de innovación tecnológica analizará su demanda y le propondrá la mejor solución.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <RevealSection>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.nombre}
                    onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-sm focus:border-primary focus:outline-none transition-colors"
                    placeholder="Su nombre"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formState.empresa}
                    onChange={(e) => setFormState({ ...formState, empresa: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-sm focus:border-primary focus:outline-none transition-colors"
                    placeholder="Su empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-sm focus:border-primary focus:outline-none transition-colors"
                    placeholder="email@empresa.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formState.telefono}
                    onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-sm focus:border-primary focus:outline-none transition-colors"
                    placeholder="+54 ..."
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.mensaje}
                  onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Describa su proyecto o consulta..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-sans font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] rounded-sm amber-glow disabled:opacity-50"
              >
                {submitted ? (
                  "Mensaje enviado ✓"
                ) : (
                  <>
                    <Send size={16} /> Enviar consulta
                  </>
                )}
              </button>
            </form>
          </RevealSection>

          {/* Contact info + map */}
          <RevealSection delay={100}>
            <div className="space-y-6">
              {/* Contact info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <div key={i} className="p-5 bg-card border border-border rounded-sm industrial-card">
                      <Icon className="text-primary mb-3" size={20} />
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                        {info.label}
                      </div>
                      <div className="text-sm text-foreground">{info.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Map */}
              <div className="relative h-80 bg-card border border-border rounded-sm overflow-hidden">
                <iframe
                  src={empresa.contacto.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación ADAMI"
                />
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3 p-4 bg-secondary/50 border border-border rounded-sm">
                <Clock className="text-primary" size={18} />
                <span className="text-sm text-muted-foreground">
                  Lun — Vie · 08:00 a 17:00 hs · {empresa.ciudad}, {empresa.pais}
                </span>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
