import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Tag line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-accent" />
          <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-accent uppercase">
            Error 404
          </span>
          <div className="w-8 h-px bg-accent" />
        </div>

        {/* Heading */}
        <h1 className="font-display font-semibold text-foreground tracking-tight leading-[0.95]" style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}>
          404
        </h1>
        <h2 className="font-display text-2xl lg:text-3xl font-semibold text-foreground tracking-tight mt-4 mb-6">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground text-base leading-[1.7] max-w-md mx-auto mb-10">
          La página que busca no existe o fue movida. Puede volver al inicio o contactar a nuestro equipo.
        </p>

        {/* CTA */}
        <button
          onClick={() => setLocation("/")}
          className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-background font-sans text-sm font-medium hover:opacity-90 transition-opacity duration-200"
        >
          <ArrowLeft size={15} />
          Volver al inicio
          <ArrowLeft size={15} className="rotate-180 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
