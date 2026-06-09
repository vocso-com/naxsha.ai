"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * 2px Terracotta progress rail pinned to the very top of the page.
 * Springs lightly so it feels alive rather than mechanical.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-50 origin-left"
      style={{
        height: 2,
        background: "var(--color-terracotta)",
        scaleX,
      }}
    />
  );
}
