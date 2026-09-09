"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Animates a number counting up to `target` on mount/target-change; jumps instantly when the user prefers reduced motion. */
export function useCountUp(target: number, durationMs = 800): number {
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Reduced motion is handled entirely by the return statement below —
    // this effect has nothing to synchronize in that case, so it does
    // nothing rather than synchronously setting state.
    if (reduceMotion) {
      return;
    }

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, durationMs, reduceMotion]);

  return reduceMotion ? target : value;
}
