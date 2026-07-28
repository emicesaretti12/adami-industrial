import RevealSection from "@/components/RevealSection";

/**
 * CTA Banner — a bold call-to-action band between sections.
 */
export default function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with parallax-like effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/manus-storage/aerospace-component_9e80b1c7.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-10 bg-background/85" />
      <div className="absolute inset-0 z-10 tech-grid opacity-10" />

      <div className="container relative z-20">
        <RevealSection className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary block mb-4">
            {`> Listos para iniciar`}
          </span>
          <h2 className="font-display font-700 text-foreground leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Su próximo proyecto industrial <br />
            <span className="text-amber-gradient">empieza aquí</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Desde el análisis inicial hasta la implementación llave en mano. Acompañamos cada etapa con precisión y compromiso.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-sans font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] rounded-sm amber-glow"
          >
            Iniciar consulta
          </a>
        </RevealSection>
      </div>
    </section>
  );
}
