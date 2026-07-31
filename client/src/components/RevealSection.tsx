import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  id?: string;
  once?: boolean;
}

/**
 * Enhanced animated section wrapper with blur-to-focus effect.
 * Uses spring physics for organic, premium feel.
 */
export default function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
  once = true,
}: RevealSectionProps) {
  const directionMap = {
    up: { y: 80, x: 0, scale: 1, rotate: 0 },
    down: { y: -80, x: 0, scale: 1, rotate: 0 },
    left: { y: 0, x: 80, scale: 1, rotate: 0 },
    right: { y: 0, x: -80, scale: 1, rotate: 0 },
    scale: { y: 40, x: 0, scale: 0.92, rotate: -1 },
  };

  const initial = directionMap[direction];

  return (
    <motion.div
      id={id}
      className={className}
      initial={{
        opacity: 0,
        y: initial.y,
        x: initial.x,
        scale: initial.scale,
        rotate: initial.rotate,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: 0.9,
        delay: delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
