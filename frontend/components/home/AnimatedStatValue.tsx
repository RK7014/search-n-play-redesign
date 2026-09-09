"use client";

import { useCountUp } from "@/lib/hooks/useCountUp";

/** Parses a stat's leading number and animates it counting up on mount. */
export function AnimatedStatValue({ value }: { value: string }) {
  const numeric = parseInt(value, 10);
  const animated = useCountUp(Number.isFinite(numeric) ? numeric : 0);
  const suffix = value.replace(/^-?\d+/, "");
  return (
    <>
      {animated}
      {suffix}
    </>
  );
}
