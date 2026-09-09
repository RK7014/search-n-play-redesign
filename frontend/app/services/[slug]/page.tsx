import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { ButtonLink } from "@/components/ui/Button";
import { CatalogIcon } from "@/lib/icon-map";
import { getServices } from "@/lib/api";
import { SOLUTIONS } from "@/lib/constants";

export async function generateStaticParams() {
  const { data: services } = await getServices();
  return (services ?? []).map((service) => ({ slug: service.slug }));
}

async function findService(slug: string) {
  const { data: services } = await getServices();
  return (services ?? []).find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await findService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await findService(slug);
  if (!service) notFound();

  const relatedSolutions = SOLUTIONS.filter((solution) =>
    solution.relatedServiceSlugs.includes(service.slug)
  );

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.category,
    provider: {
      "@type": "Organization",
      name: "Search N Play",
    },
  };

  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link href="/services" className="text-sm font-medium text-slate-400 hover:text-paper">
            ← All services
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400 shadow-[0_0_24px_4px_rgba(51,85,255,0.2)]">
              <CatalogIcon name={service.icon} className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
                {service.category}
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                {service.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-slate-400">{service.description}</p>

          <div className="mt-10 rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-7">
            <h2 className="font-display text-lg font-semibold text-paper">What this includes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          {relatedSolutions.length > 0 ? (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-paper">Common starting points</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedSolutions.map((solution) => (
                  <Link
                    key={solution.slug}
                    href="/solutions"
                    className="rounded-xl border border-[var(--border-1)] bg-[var(--surface-2)] p-5 transition-colors hover:border-accent-400/30"
                  >
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400">
                      <CatalogIcon name={solution.icon} className="size-3.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-2.5 text-sm font-semibold text-paper">{solution.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{solution.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={`/contact?service=${service.slug}`} variant="secondary" size="lg">
              Start a conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="lg">
              See related work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
