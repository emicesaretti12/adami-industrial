import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEffect() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const attachListeners = useCallback(() => {
    const interactables = document.querySelectorAll('a, button, [data-hover]');
    const handleStart = () => setIsHovering(true);
    const handleEnd = () => setIsHovering(false);
    
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleStart);
      el.addEventListener('mouseleave', handleEnd);
    });
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    attachListeners();

    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, [cursorX, cursorY, attachListeners]);

  return (
    <>
      {/* Main cursor dot — refined and subtle */}
      <motion.div
        className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full bg-accent pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 1 : 0.8,
        }}
      />
    </>
  );
}
