import CountUp from "@/components/motion/CountUp";
import { useReveal } from "@/hooks/useReveal";

const STATS = [
  { to: 30, prefix: "+", label: "años de trayectoria en la industria" },
  { to: 3, prefix: "", label: "unidades de negocio integradas" },
  { to: 100, prefix: "+", label: "proyectos realizados" },
  { to: 6, prefix: "", label: "industrias exigentes" },
];

export default function StatsBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="stats" ref={ref} className="relative z-10 bg-white border-b border-[#e2e8f0]">
      <div className="container mx-auto px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={[
                "rv-up flex flex-col py-10 md:py-14 pr-4 border-[#e2e8f0]",
                i % 2 === 1 ? "pl-5 md:pl-8 border-l" : "",
                i === 2 ? "lg:pl-8 lg:border-l" : "",
                i >= 2 ? "border-t lg:border-t-0" : "",
              ].join(" ")}
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              <dt className="order-2 mt-3 text-sm md:text-[15px] leading-snug text-[#5a6b7c] max-w-[16ch]">
                {s.label}
              </dt>
              <dd className="order-1 type-display text-[#1a2b3d] text-[clamp(2.75rem,7vw,5rem)]">
                <CountUp to={s.to} prefix={s.prefix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
