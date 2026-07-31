import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function PageTransition() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    if (location !== prevLocation) {
      setIsTransitioning(true);
      setPrevLocation(location);
      window.scrollTo({ top: 0 });
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);

  const barCount = 4;

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
                duration: 0.5,
                times: [0, 0.3, 0.7, 1],
                delay: i * 0.03,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                left: `${(i / barCount) * 100}%`,
                width: `${100 / barCount + 0.5}%`,
                background: "#4e6e94",
                transformOrigin: i % 2 === 0 ? "top" : "bottom",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
