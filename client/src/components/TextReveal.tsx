import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  staggerSpeed?: number;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
  staggerSpeed = 0.03,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const extractText = (node: ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node && typeof node === "object" && "props" in node) {
      return extractText((node as any).props.children);
    }
    return "";
  };

  const text = extractText(children).trim();
  const words = text.split(/\s+/).filter(Boolean);

  if (words.length === 0) return null;

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Tag className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}>
        {words.map((word, i) => (
          <motion.span key={`${word}-${i}`} variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
