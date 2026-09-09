import clsx from "clsx";
import type { ReactNode } from "react";

const tones = {
  neutral: "bg-[var(--surface-5)] text-paper",
  accent: "bg-accent-500/15 text-accent-400",
  warm: "bg-warm-500/15 text-warm-500",
  outline: "border border-[var(--border-2)] text-paper/70",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
