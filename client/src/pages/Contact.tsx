import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, Clock, ArrowRight } from "lucide-react";
import { empresa } from "@/lib/adami-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);

  const [formState, setFormState] = useState({
    nombre: "", empresa: "", email: "", telefono: "", mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24">
          {/* Animated background glow */}
          <motion.div
            className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[200px] -z-10"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[180px] -z-10"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ width: "60px" }}
                />
                <span className="font-mono text-xs font-semibold tracking-[0.3em] text-accent uppercase">Contacto</span>
              </div>
              <h1 className="font-display font-700 text-foreground leading-[0.92] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                Hablemos de su
                <br />
                <span className="text-gradient">próximo proyecto</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-[1.8] font-light max-w-3xl">
                Cuéntenos sobre su proyecto. Nuestro equipo de innovación tecnológica analizará su demanda y le propondrá la mejor solución.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={containerRef} className="relative py-48 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          {/* Animated background */}
          <motion.div
            className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-accent/4 blur-[200px] -z-10"
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div className="container" style={{ opacity }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,0.7fr] gap-16 lg:gap-24">
              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block font-mono text-xs font-semibold text-accent mb-5 tracking-[0.15em] uppercase">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.nombre}
                      onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-accent/20 text-foreground font-light text-base focus:border-accent focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/40"
                      placeholder="Su nombre"
                    />
                  </motion.div>
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block font-mono text-xs font-semibold text-accent mb-5 tracking-[0.15em] uppercase">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={formState.empresa}
                      onChange={(e) => setFormState({ ...formState, empresa: e.target.value })}
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-accent/20 text-foreground font-light text-base focus:border-accent focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/40"
                      placeholder="Su empresa"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block font-mono text-xs font-semibold text-accent mb-5 tracking-[0.15em] uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-accent/20 text-foreground font-light text-base focus:border-accent focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/40"
                      placeholder="email@empresa.com"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block font-mono text-xs font-semibold text-accent mb-5 tracking-[0.15em] uppercase">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formState.telefono}
                      onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-accent/20 text-foreground font-light text-base focus:border-accent focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/40"
                      placeholder="+54 ..."
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block font-mono text-xs font-semibold text-accent mb-5 tracking-[0.15em] uppercase">
                    Mensaje *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.mensaje}
                    onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-accent/20 text-foreground font-light text-base focus:border-accent focus:outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/40"
                    placeholder="Describa su proyecto o consulta..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={submitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 group inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-mono text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50"
                >
                  {submitted ? (
                    <>
                      <span>✓ Enviado</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar consulta
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-10"
              >
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                      className="flex items-start gap-5 p-6 rounded-xl bg-accent/8 border border-accent/15 hover:border-accent/40 hover:bg-accent/12 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 border border-accent/20">
                        <Icon className="text-accent" size={20} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-xs font-bold text-accent tracking-wider uppercase mb-2">{info.label}</div>
                        {info.label === "Email" ? (
                          <a href={`mailto:${info.value}`} className="text-sm text-foreground hover:text-accent transition-colors font-light break-all">
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative h-72 rounded-xl overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-300"
                >
                  <iframe
                    src={empresa.contacto.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.8)", borderRadius: "12px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación ADAMI"
                  />
                </motion.div>

                {/* Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="flex items-center gap-4 p-6 rounded-xl bg-accent/8 border border-accent/15"
                >
                  <Clock className="text-accent shrink-0" size={20} strokeWidth={1.5} />
                  <span className="text-sm text-foreground font-light">
                    Lun — Vie · 08:00 a 17:00 hs · {empresa.ciudad}, {empresa.pais}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
