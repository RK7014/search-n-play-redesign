import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CatalogIcon } from "@/lib/icon-map";
import { AnimatedStatValue } from "./AnimatedStatValue";
import {
  HOSTING_HEADLINE,
  ORIGINAL_STATS,
  ORIGINAL_WHY_CHOOSE_US,
  TRUST_BADGES,
  TRUST_STATEMENT,
} from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="border-y border-[var(--border-1)] bg-ink-soft py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="mx-auto max-w-3xl text-balance text-center font-display text-xl font-medium text-paper sm:text-2xl">
            {TRUST_STATEMENT}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 border-t border-[var(--border-1)] pt-14 sm:grid-cols-3">
          {ORIGINAL_WHY_CHOOSE_US.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-[var(--border-1)] bg-[var(--surface-1)] p-6 text-center">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400 shadow-[0_0_24px_4px_rgba(51,85,255,0.2)]">
                  <CatalogIcon name={item.icon} className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 text-center text-sm font-medium text-slate-400">{HOSTING_HEADLINE}</p>
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {ORIGINAL_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-sans text-3xl font-semibold text-paper sm:text-4xl">
                  <AnimatedStatValue value={stat.value} />
                </dd>
                <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[var(--border-1)] bg-[var(--surface-3)] px-4 py-2 text-sm font-medium text-slate-300"
              >
                {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
