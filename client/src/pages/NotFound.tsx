import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Tag line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-6 h-0.5 bg-red-500" />
          <span className="font-sans text-xs font-bold tracking-widest text-red-600 uppercase">
            Error 404
          </span>
          <div className="w-6 h-0.5 bg-red-500" />
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold text-foreground tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}>
          404
        </h1>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-6">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto mb-10">
          La página que busca no existe o fue movida. Puede volver al inicio o contactar a nuestro equipo.
        </p>

        {/* CTA */}
        <button
          onClick={() => setLocation("/")}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
