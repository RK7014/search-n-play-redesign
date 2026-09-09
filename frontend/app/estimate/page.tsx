import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { EstimatorForm } from "@/components/estimator/EstimatorForm";

export const metadata: Metadata = {
  title: "Estimate Your Project",
  description:
    "Get an indicative complexity score, timeline range, and recommended technology stack for your project in under two minutes.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <div className="relative overflow-hidden bg-ink">
      <PageGlow />
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
            Project estimator
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
            Estimate your project
          </h1>
          <p className="mt-4 text-slate-400">
            Answer a few questions about scope, platforms, and integrations to get an indicative
            complexity score, timeline range, and recommended technology stack.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <EstimatorForm />
          <p className="mt-6 text-center text-xs text-slate-500">
            This tool produces an automated, indicative estimate — not a binding quotation. For a
            precise scope and price, <a href="/contact" className="underline hover:text-paper">talk to us directly</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
