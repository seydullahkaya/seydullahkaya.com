"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Sayfanın en üstünde, okundukça dolan ince ilerleme çubuğu. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
    />
  );
}
