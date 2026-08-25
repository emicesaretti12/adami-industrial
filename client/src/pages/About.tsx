import { motion } from "framer-motion";
import { useEffect } from "react";
import { empresa } from "@/lib/adami-data";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a2b3d] font-sans selection:bg-[#4e6e94] selection:text-white">
      <Navbar />
      <main>
        {/* Hero — cinematic, full-bleed */}
        <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-end overflow-hidden">
          <img
            src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.12_PM_wztmub.jpg"
            alt="Equipo profesional ADAMI en planta"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a29] via-[#0c1a29]/40 to-[#0c1a29]/20" />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-14 md:pb-20 pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-[11px] font-semibold text-white/60 tracking-[0.25em] uppercase">Acerca de ADAMI</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[0.95]">
                Más de tres décadas de excelencia industrial
              </h1>
              <p className="mt-6 text-white/50 leading-[1.7] max-w-xl">
                Transformando desafíos productivos en soluciones tecnológicas de precisión. ADAMI es el motor industrial de Argentina.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quiénes somos — text + image side by side, no cards */}
        <section className="py-20 md:py-28 border-b border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-3/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-[#4e6e94]" />
                  <span className="text-[11px] font-semibold text-[#4e6e94] tracking-[0.25em] uppercase">Quiénes Somos</span>
                </div>
                <p className="text-[#5a6b7c] leading-[1.9] text-lg mb-10">
                  {empresa.quienesSomos}
                </p>

                {/* Stats inline — not a separate section */}
                <div className="flex gap-10 md:gap-16 pt-8 border-t border-[#e2e8f0]">
                  {[
                    { value: "+30", label: "Años" },
                    { value: "+100", label: "Proyectos" },
                    { value: "ISO 9001", label: "Certificados" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-2xl md:text-3xl font-bold text-[#2c4a6e] tracking-tight">{stat.value}</div>
                      <div className="text-xs text-[#8a9bb0] mt-1 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Image composition */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:w-2/5"
              >
                <div className="relative">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686345/WhatsApp_Image_2026-08-25_at_12.18.11_PM_xaxsdb.jpg"
                      alt="Planta industrial ADAMI — estructura y capacidad"
                      className="w-full aspect-[4/5] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-3/5 rounded-lg overflow-hidden shadow-xl -mt-20 -ml-8 relative z-10 border-4 border-white">
                    <img
                      src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686342/WhatsApp_Image_2026-08-25_at_12.18.10_PM_wbo9z6.jpg"
                      alt="Proyecto industrial realizado"
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Visión, Misión, Calidad — NOT cards, editorial layout */}
        <section className="py-20 md:py-28 bg-[#fafbfc] border-b border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Visión + Misión side by side */}
            <div className="flex flex-col md:flex-row gap-16 md:gap-24 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2"
              >
                <span className="text-[11px] font-semibold text-[#4e6e94] tracking-[0.25em] uppercase">Visión</span>
                <div className="w-10 h-[2px] bg-[#4e6e94] mt-3 mb-5 rounded-full" />
                <p className="text-[#1a2b3d] text-xl md:text-2xl leading-[1.5] font-medium tracking-tight">
                  {empresa.vision}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:w-1/2"
              >
                <span className="text-[11px] font-semibold text-[#4e6e94] tracking-[0.25em] uppercase">Misión</span>
                <div className="w-10 h-[2px] bg-[#4e6e94] mt-3 mb-5 rounded-full" />
                <p className="text-[#1a2b3d] text-xl md:text-2xl leading-[1.5] font-medium tracking-tight">
                  {empresa.mision}
                </p>
              </motion.div>
            </div>

            {/* Calidad commitment — large quote style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="border-l-4 border-[#4e6e94] pl-8 md:pl-12 py-2"
            >
              <span className="text-[11px] font-semibold text-[#4e6e94] tracking-[0.25em] uppercase">Compromiso de Calidad</span>
              <p className="text-[#1a2b3d] text-2xl md:text-3xl leading-[1.4] font-semibold tracking-tight mt-4 max-w-3xl">
                &ldquo;{empresa.politicaCalidad.compromiso}&rdquo;
              </p>
            </motion.div>
          </div>
        </section>

        {/* Full-bleed image band — break up the text */}
        <section className="relative h-[35vh] md:h-[45vh] overflow-hidden">
          <img
            src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686363/WhatsApp_Image_2026-08-25_at_12.18.35_PM_v7otru.jpg"
            alt="Excelencia integral en procesos industriales"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0c1a29]/30" />
        </section>

        {/* Certificaciones + Estándares — clean, no nested borders */}
        <section className="py-20 md:py-28 border-b border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Left — certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-6 h-px bg-[#4e6e94]" />
                  <span className="text-[11px] font-semibold text-[#4e6e94] tracking-[0.25em] uppercase">Certificaciones</span>
                </div>

                {empresa.politicaCalidad.certificaciones.map((cert, i) => (
                  <div key={i} className="flex items-center gap-5 py-6 border-b border-[#e2e8f0] last:border-0">
                    <div className="w-14 h-14 rounded-lg bg-[#4e6e94]/8 flex items-center justify-center flex-shrink-0">
                      <Award className="text-[#4e6e94]" size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1a2b3d] text-lg">{cert.nombre}</div>
                      <div className="text-sm text-[#8a9bb0]">{cert.entidad}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Right — quality pillars */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:w-1/2"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-6 h-px bg-[#4e6e94]" />
                  <span className="text-[11px] font-semibold text-[#4e6e94] tracking-[0.25em] uppercase">Estándares Corporativos</span>
                </div>

                <div className="space-y-4">
                  {empresa.politicaCalidad.pilaresCalidad.map((pillar, i) => (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <CheckCircle2 className="text-[#4e6e94] flex-shrink-0" size={18} strokeWidth={1.5} />
                      <span className="text-[#1a2b3d] font-medium">{pillar}</span>
                    </div>
                  ))}
                </div>

                {/* Policy description */}
                <div className="mt-10 p-6 bg-[#fafbfc] rounded-lg">
                  <p className="text-sm text-[#5a6b7c] leading-[1.8]">
                    {empresa.politicaCalidad.descripcion}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Capacidades — horizontal image strip with content overlay */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686364/WhatsApp_Image_2026-08-25_at_12.18.35_PM_1_asrkgp.jpg"
              alt="Maquinaria ADAMI"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0c1a29]/85" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  Preparados para su próximo desafío
                </h2>
                <p className="text-white/50 leading-relaxed mb-8">
                  Con infraestructura propia, equipamiento de última generación y un equipo multidisciplinario, convertimos cada requerimiento en una solución concreta.
                </p>
                <MagneticButton>
                  <Link href="/contacto" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a2b3d] font-semibold rounded-md text-sm hover:bg-white/90 transition-colors">
                    Iniciar una conversación
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
              </motion.div>

              {/* Proof images */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:w-1/2 flex gap-3"
              >
                {[
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787670454/b6231ce4-2dc6-4afd-92a6-8ca61478e0cc.png", alt: "Celda robotizada" },
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686354/WhatsApp_Image_2026-08-25_at_12.18.28_PM_dkoxnh.jpg", alt: "Control de procesos" },
                  { src: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1787686344/WhatsApp_Image_2026-08-25_at_12.18.11_PM_1_uehk0n.jpg", alt: "Modelado 3D" },
                ].map((img, i) => (
                  <div key={i} className="flex-1 rounded-lg overflow-hidden border border-white/10">
                    <img src={img.src} alt={img.alt} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
