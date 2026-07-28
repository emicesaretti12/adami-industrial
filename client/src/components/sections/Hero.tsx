import { useEffect, useState } from "react";
import { ArrowDown, Cog } from "lucide-react";
import SparksCanvas from "@/components/SparksCanvas";
import { empresa } from "@/lib/adami-data";

/**
 * Hero section — full-screen with animated sparks canvas,
 * staggered text reveal, and parallax background image.
 */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = ["Treinta", "años", "forjando", "el", "futuro", "industrial."];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/manus-storage/hero-industrial_debcfda4.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
        }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/80 to-background/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-background/60" />

      {/* Sparks canvas */}
      <SparksCanvas className="absolute inset-0 z-20 pointer-events-none" />

      {/* Tech grid overlay */}
      <div className="absolute inset-0 z-10 tech-grid opacity-20" />

      {/* Content */}
      <div className="container relative z-30 pt-20">
        <div className="max-w-4xl">
          {/* Tag line */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <Cog className="text-primary animate-spin-slow" size={20} style={{ animation: "spin 8s linear infinite" }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              {empresa.lema}
            </span>
          </div>

          {/* Main heading with staggered word reveal */}
          <h1 className="font-display font-700 text-foreground leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.25em]"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(60px)",
                  transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${0.3 + i * 0.12}s`,
                }}
              >
                {word === "forjando" || word === "industrial." ? (
                  <span className="text-amber-gradient">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.2s",
            }}
          >
            {empresa.descripcionProcesos}
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.5s",
            }}
          >
            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] rounded-sm amber-glow"
            >
              Conozca nuestros servicios
            </a>
            <a
              href="#empresa"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-sans font-semibold hover:border-primary hover:text-primary transition-all duration-200 active:scale-[0.97] rounded-sm"
            >
              Sobre ADAMI
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s ease 2s",
        }}
      >
        <a href="#empresa" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
