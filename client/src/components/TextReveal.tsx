import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  staggerSpeed?: number;
}

/**
 * Premium word-by-word text reveal animation.
 * Each word animates in with translateY + opacity + subtle blur.
 * Triggers on scroll into view.
 */
export default function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
  staggerSpeed = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerSpeed,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 40,
      opacity: 0,
      filter: "blur(4px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref as any}
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Tag className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
