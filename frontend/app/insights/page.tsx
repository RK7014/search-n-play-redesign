import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSIGHT_ARTICLES } from "@/lib/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on product strategy, engineering practice, and delivery — written by the team behind this project.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="Notes on building and shipping software"
          description="Short, practical writing grounded in how these decisions actually play out."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {INSIGHT_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface-4)] hover:shadow-2xl hover:shadow-accent-500/10"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={`/images/insights/${article.slug}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-400">
                  {article.publishedLabel}
                </span>
                <h2 className="mt-3 font-display text-lg font-semibold text-paper">{article.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{article.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>{article.readingTime}</span>
                  <ArrowUpRight
                    className="size-4 text-paper transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
