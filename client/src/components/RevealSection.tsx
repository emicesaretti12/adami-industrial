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

export default function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
  once = true,
}: RevealSectionProps) {
  const directionMap = {
    up: { y: 40, x: 0, scale: 1 },
    down: { y: -40, x: 0, scale: 1 },
    left: { y: 0, x: 50, scale: 1 },
    right: { y: 0, x: -50, scale: 1 },
    scale: { y: 20, x: 0, scale: 0.95 },
  };

  const initial = directionMap[direction];

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: initial.y, x: initial.x, scale: initial.scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
