import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);

    const interactables = document.querySelectorAll("a, button, input, textarea, select");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-5 h-5 pointer-events-none z-40 hidden lg:block"
      style={{
        transform: "translate(-50%, -50%)",
        transition: "all 0.05s ease-out",
      }}
    >
      <div
        className={`w-full h-full border-2 rounded-full transition-all duration-200 ${
          isHovering
            ? "border-accent scale-125"
            : "border-accent/50 scale-100"
        }`}
      />
    </div>
  );
}
