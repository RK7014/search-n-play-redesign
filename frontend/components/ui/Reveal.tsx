"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Scroll-triggered fade/rise-in wrapper, used throughout the marketing pages for entrance motion. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  // The "hidden" state stays substantially visible (not opacity: 0) on
  // purpose: if the IntersectionObserver never fires — no JS, a crawler, a
  // print view, or a slow first paint — content still reads fine instead of
  // staying invisible. Only a subtle rise-and-fade is actually animated.
  const variants: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0.6, y: reduceMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{
        duration: reduceMotion ? 0.2 : 0.55,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
