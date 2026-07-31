import { useEffect, useRef, useState } from "react";

/**
 * Subtle cursor glow effect for light theme.
 * Soft brand-blue radial gradient follows the cursor.
 */
export default function CursorEffect() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x - 200}px, ${currentPos.current.y - 200}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
      style={{
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(78, 110, 148, 0.04) 0%, rgba(78, 110, 148, 0.01) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
