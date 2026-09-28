import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Número que cuenta hasta su valor la primera vez que se ve.
 * Escribe textContent directo (sin re-render por frame) y usa cifras tabulares
 * para que el ancho no salte mientras cuenta.
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, prefix, suffix, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className={`tabular ${className}`}>
        {`${prefix}0${suffix}`}
      </span>
      <span className="sr-only">{`${prefix}${to}${suffix}`}</span>
    </>
  );
}
