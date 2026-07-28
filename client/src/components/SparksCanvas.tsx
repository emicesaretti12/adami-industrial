import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

/**
 * Canvas-based animated sparks effect for the hero section.
 * Simulates welding/industrial sparks floating upward.
 */
export default function SparksCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let animationId: number;
    let sparks: Spark[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const createSpark = (): Spark => {
      const x = Math.random() * width;
      const y = height + 10;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
      const speed = 1 + Math.random() * 3;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 80,
        size: 1 + Math.random() * 2,
      };
    };

    // Initialize sparks
    for (let i = 0; i < 40; i++) {
      const spark = createSpark();
      spark.life = Math.random() * spark.maxLife;
      sparks.push(spark);
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      sparks = sparks.filter((s) => s.life < s.maxLife);

      // Add new sparks
      while (sparks.length < 50) {
        sparks.push(createSpark());
      }

      sparks.forEach((spark) => {
        spark.life++;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.02; // slight gravity
        spark.vx *= 0.99;

        const alpha = 1 - spark.life / spark.maxLife;
        const hue = 35 + Math.random() * 15; // amber range

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 90%, 60%, ${alpha * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${hue}, 90%, 50%, ${alpha})`;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
