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
    const duration = 2000;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), index * 150);
    return () => clearTimeout(timer);
  }, [isInView, value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-display text-5xl lg:text-7xl font-semibold tracking-tight text-foreground">
        <span>{count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 font-sans text-sm text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="border-t border-border">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
