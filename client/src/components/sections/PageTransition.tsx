import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (complete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="flex items-center gap-4"
      >
        <img
          src="/manus-storage/adami-logo_11c9fab3.png"
          alt="ADAMI"
          className="h-12 w-12"
        />
        <motion.div
          className="h-px w-16 bg-gradient-to-r from-primary to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}
