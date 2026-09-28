import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/useFinePointer";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
}

/**
 * Inclinación 3D sutil que sigue al cursor.
 * Motion values en lugar de useState: no re-renderiza la card en cada mousemove.
 * En touch o con reduced-motion renderiza un div normal.
 * Importante: no combinar con `transition-all`/`transition-transform`,
 * porque la transición CSS pelea con el transform que maneja Framer.
 */
export default function TiltCard({
  children,
  className = "",
  tiltStrength = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useFinePointer();
  const spring = { stiffness: 400, damping: 25 };
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const py = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rotateX.set(-py * tiltStrength);
    rotateY.set(px * tiltStrength);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (!enabled) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
