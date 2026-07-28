import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { stats } from "@/lib/adami-data";

function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const duration = 2500;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), index * 200);
    return () => clearTimeout(timer);
  }, [isInView, value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative text-center lg:text-left"
    >
      {/* Decorative line */}
      <div className="hidden lg:block absolute left-0 top-0 w-px h-full bg-gradient-to-b from-white/10 to-transparent" />
      
      <div className="lg:pl-8">
        <div className="font-display text-6xl lg:text-8xl font-700 tracking-tighter text-foreground">
          <span>{count}</span>
          <span className="text-primary">{suffix}</span>
        </div>
        <div className="mt-4 font-sans text-sm font-medium text-muted-foreground tracking-wide">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-28 lg:py-36">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
