"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  as?: "div" | "section" | "li" | "header" | "footer";
};

export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
