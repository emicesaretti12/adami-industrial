import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

/**
 * Premium page transition with multi-bar wipe effect.
 * Creates a cinematic transition between pages.
 */
export default function PageTransition() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    if (location !== prevLocation) {
      setIsTransitioning(true);
      setPrevLocation(location);
      window.scrollTo({ top: 0 });
      const timer = setTimeout(() => setIsTransitioning(false), 800);
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);

  const barCount = 5;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="page-transition-overlay">
          {Array.from({ length: barCount }).map((_, i) => (
            <motion.div
              key={i}
              className="bar"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 1, 0] }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.8,
                times: [0, 0.35, 0.65, 1],
                delay: i * 0.04,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                left: `${(i / barCount) * 100}%`,
                width: `${100 / barCount + 0.5}%`,
                background: `linear-gradient(180deg, #0f1428 0%, #0a0f1c 100%)`,
                transformOrigin: i % 2 === 0 ? "top" : "bottom",
              }}
            />
          ))}
          {/* Progress line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px z-10"
            style={{
              background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 0.8,
              times: [0, 0.4, 0.6, 1],
              delay: 0.1,
              ease: [0.23, 1, 0.32, 1],
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
