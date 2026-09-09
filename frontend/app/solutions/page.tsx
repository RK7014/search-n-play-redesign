import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { SOLUTIONS } from "@/lib/constants";
import { SERVICE_OPTIONS } from "@/lib/form-options";
import { CatalogIcon } from "@/lib/icon-map";

const SERVICE_LABELS = new Map<string, string>(
  SERVICE_OPTIONS.map((option) => [option.value, option.label])
);

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Common outcomes we're brought in to deliver — from launching a SaaS product to modernizing a legacy system.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="Solutions, organized by outcome"
          description="Most engagements start with a business outcome, not a technology choice. Here's how that usually maps to the work."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution) => (
            <div
              key={solution.slug}
              className="flex flex-col rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-7"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400 shadow-[0_0_24px_4px_rgba(51,85,255,0.2)]">
                <CatalogIcon name={solution.icon} className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold text-paper">{solution.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                {solution.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {solution.relatedServiceSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="rounded-full bg-accent-500/15 px-3 py-1 text-xs font-medium text-accent-400 hover:bg-accent-500/25"
                  >
                    {SERVICE_LABELS.get(slug) ?? slug}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-slate-400">
            Not sure which of these fits? The estimator will point you in the right direction in
            about two minutes.
          </p>
          <ButtonLink href="/estimate" variant="secondary" size="lg">
            Estimate your project
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
