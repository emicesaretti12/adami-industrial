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
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663751686161/MKadoAWFfElgzipt.webp"
          alt="ADAMI"
          className="h-10 w-10"
        />
        <motion.div
          className="h-px w-12 bg-accent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}
