import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/constants";
import { CatalogIcon } from "@/lib/icon-map";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How an engagement runs, from discovery to long-term support — the same six stages every time.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
            How we work
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
            A disciplined process, start to finish
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Every engagement follows the same six stages. It keeps scope honest and gives you a
            clear checkpoint to evaluate progress at each one.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-[var(--surface-5)] sm:block"
            aria-hidden="true"
          />
          <ol className="space-y-10 sm:space-y-12">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.index} delay={index * 0.05}>
                <li className="relative flex gap-6 sm:gap-8">
                  <CatalogIcon
                    name={step.icon}
                    className="pointer-events-none absolute -right-4 top-1/2 hidden size-40 -translate-y-1/2 text-accent-400 opacity-[0.06] lg:block"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-[var(--border-1)] bg-[var(--surface-2)] font-display text-lg font-semibold text-accent-400">
                    {step.index}
                  </span>
                  <div className="pt-2.5">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400">
                      <CatalogIcon name={step.icon} className="size-4" aria-hidden="true" />
                    </span>
                    <h2 className="mt-3 font-display text-xl font-semibold text-paper">{step.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Start a Project
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/work" variant="outline" size="lg">
            See the work
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
