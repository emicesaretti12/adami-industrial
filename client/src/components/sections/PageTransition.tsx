import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setComplete(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (complete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4"
      >
        <img
          src="https://www.adami.com.ar/wp-content/uploads/2016/05/adami-logo-header.png"
          alt="ADAMI"
          className="h-10 w-auto"
        />
        <motion.div
          className="h-px w-12 bg-accent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}
