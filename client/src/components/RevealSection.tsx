import { type ReactNode } from "react";
import { useInView } from "@/hooks/useScrollAnimation";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  id?: string;
}

/**
 * Animated section wrapper that reveals content on scroll.
 * Uses CSS transitions for smooth, interruptible animations.
 */
export default function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
}: RevealSectionProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  const directions: Record<string, string> = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    scale: "scale(0.95)",
  };

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0, 0) scale(1)" : directions[direction],
        transition: `opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
