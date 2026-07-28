import { useInView, useCountUp } from "@/hooks/useScrollAnimation";
import { stats } from "@/lib/adami-data";

/**
 * Stats section with animated count-up numbers.
 * Numbers animate when the section enters the viewport.
 */
export default function Stats() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative py-20 bg-card border-y border-border overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 tech-grid opacity-10" />

      <div ref={ref} className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} start={inView} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  start,
  delay,
}: {
  stat: { value: number; suffix: string; label: string };
  start: boolean;
  delay: number;
}) {
  const count = useCountUp(stat.value, 2000, start);

  return (
    <div
      className="text-center lg:text-left lg:border-l lg:border-border lg:pl-6"
      style={{
        opacity: start ? 1 : 0,
        transform: start ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      }}
    >
      <div className="font-display font-700 text-primary leading-none"
           style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        {count}
        <span className="text-primary/70">{stat.suffix}</span>
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {stat.label}
      </div>
    </div>
  );
}
