import { useEffect, useRef, useState } from "react";

/**
 * Premium cursor glow effect that follows mouse movement.
 * Creates a soft radial gradient glow in the accent color.
 * Scales up when hovering interactive elements.
 */
export default function CursorEffect() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnterInteractive = () => setIsHovering(true);
    const handleMouseLeaveInteractive = () => setIsHovering(false);

    const animate = () => {
      // Smooth interpolation for main glow
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

      // Even smoother for trail
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.06;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.06;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x - 200}px, ${currentPos.current.y - 200}px)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 300}px, ${trailPos.current.y - 300}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Watch for interactive elements
    const observer = new MutationObserver(() => {
      const interactables = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button']"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial binding
    const interactables = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: isHovering
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.01) 40%, transparent 70%)",
          transition: "background 0.3s ease",
          willChange: "transform",
        }}
      />
      {/* Trail glow */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] hidden lg:block"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.02) 0%, transparent 60%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
