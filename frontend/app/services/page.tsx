import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { PageGlow } from "@/components/ui/PageGlow";
import { CatalogIcon } from "@/lib/icon-map";
import { getServices } from "@/lib/api";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product engineering, mobile engineering, digital experience, AI & automation, growth, and continuous support — delivered by one engineering team.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const { data: services, error } = await getServices();
  const list = services ?? [];

  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Engineering capability across the full product lifecycle"
          description="Each discipline below can stand alone or combine into a single end-to-end engagement — so nothing gets lost in a handoff between vendors."
        />

        {list.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-red-400/20 bg-red-500/10 p-6 text-sm text-red-300">
            {error?.message ?? "We couldn't load the services catalog right now."} Please refresh,
            or <Link href="/contact" className="underline">get in touch</Link> directly.
          </div>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-400/30 hover:bg-[var(--surface-4)] hover:shadow-2xl hover:shadow-accent-500/10"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400 shadow-[0_0_24px_4px_rgba(51,85,255,0.2)]">
                  <CatalogIcon name={service.icon} className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-paper">{service.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-paper">
                  View capabilities
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <ButtonLink href="/estimate" variant="secondary" size="lg">
            Estimate a project
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
