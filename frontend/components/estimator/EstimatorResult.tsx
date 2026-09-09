"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, IndianRupee, Layers, Sparkles, Users } from "lucide-react";

import type { EstimateResult } from "@/lib/types";
import { useCountUp } from "@/lib/hooks/useCountUp";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function EstimatorResultCard({ result }: { result: EstimateResult }) {
  const reduceMotion = useReducedMotion();
  const animatedScore = useCountUp(result.complexityScore);

  return (
    <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
            Complexity
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-paper">
            {result.complexityLabel}
          </p>
        </div>
        <p className="font-sans text-3xl font-semibold text-paper" aria-hidden="true">
          {animatedScore}
          <span className="text-base font-medium text-slate-500">/100</span>
        </p>
      </div>
      <div className="sr-only" role="status">
        Estimated complexity score {result.complexityScore} out of 100 — {result.complexityLabel}.
      </div>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[var(--surface-5)]">
        <motion.div
          className="h-full rounded-full bg-accent-500"
          initial={{ width: 0 }}
          animate={{ width: `${result.complexityScore}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border-1)] bg-[var(--surface-1)] p-5">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wide">Timeline</span>
          </div>
          <p className="mt-2 font-sans text-xl font-semibold text-paper">
            {result.timelineMinWeeks}–{result.timelineMaxWeeks} weeks
          </p>
          <p className="mt-1 text-xs text-slate-500">AI-assisted delivery pace</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-1)] bg-[var(--surface-1)] p-5">
          <div className="flex items-center gap-2 text-slate-400">
            <IndianRupee className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wide">Estimated cost</span>
          </div>
          <p className="mt-2 font-sans text-xl font-semibold text-paper">
            {currency.format(result.costMinInr)}–{currency.format(result.costMaxInr)}
          </p>
          <p className="mt-1 text-xs text-slate-500">Build cost only</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--border-1)] bg-[var(--surface-1)] p-5">
        <div className="flex items-center gap-2 text-slate-400">
          <Users className="size-4" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-wide">Suggested team</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper">
          {result.teamComposition.join(" · ")}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border-1)] bg-[var(--surface-1)] p-5">
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="size-4" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-wide">Recommended approach</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper">{result.recommendedApproach}</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Layers className="size-4" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-wide">Recommended stack</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {result.recommendedStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent-500/15 px-3 py-1.5 text-xs font-medium text-accent-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-8 border-t border-[var(--border-1)] pt-5 text-xs leading-relaxed text-slate-500">
        {result.disclaimer}
      </p>
    </div>
  );
}
