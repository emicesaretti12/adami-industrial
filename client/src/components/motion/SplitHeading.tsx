import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";

interface SplitHeadingProps {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** retraso en segundos */
  delay?: number;
}

/**
 * Titular que entra palabra por palabra desde una máscara por línea (GSAP SplitText).
 * - autoSplit re-divide si cambia el ancho o cargan las fuentes; la animación vive en onSplit.
 * - Se dispara una sola vez al entrar en pantalla.
 * - Reduced motion: solo fundido, sin desplazamiento.
 * - aria: SplitText deja el texto completo como aria-label para lectores de pantalla.
 */
export default function SplitHeading({ lines, as: Tag = "h2", className = "", delay = 0 }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            return gsap.from(self.words, {
              yPercent: 115,
              rotate: 4,
              transformOrigin: "0% 100%",
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.06,
              delay,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });

      mm.add(REDUCED, () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`invisible ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          {l}
        </span>
      ))}
    </Tag>
  );
}
