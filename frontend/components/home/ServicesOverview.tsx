import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CatalogIcon } from "@/lib/icon-map";
import type { Service } from "@/lib/types";

export function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Engineering across the full product lifecycle"
          description="Six disciplines, one team — nothing gets lost in a handoff between vendors."
        />

        {services.length === 0 ? (
          <p className="mt-10 text-sm text-slate-400">
            Services are temporarily unavailable. Please refresh in a moment.
          </p>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={Math.min(index, 4) * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-400/30 hover:bg-[var(--surface-4)] hover:shadow-2xl hover:shadow-accent-500/10"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400 shadow-[0_0_24px_4px_rgba(51,85,255,0.2)]">
                    <CatalogIcon name={service.icon} className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-paper">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-paper">
                    Learn more
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
