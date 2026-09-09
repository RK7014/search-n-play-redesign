import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { ButtonLink } from "@/components/ui/Button";
import { getInsightBySlug, INSIGHT_ARTICLES } from "@/lib/content/insights";

export function generateStaticParams() {
  return INSIGHT_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
  };
}

export default async function InsightArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();

  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container className="max-w-3xl">
        <Link href="/insights" className="text-sm font-medium text-slate-400 hover:text-paper">
          ← All insights
        </Link>
        <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
          {article.publishedLabel} · {article.readingTime}
        </span>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          {article.title}
        </h1>
        <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={`/images/insights/${article.slug}.jpg`}
            alt=""
            fill
            sizes="768px"
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-8 space-y-5">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-8 text-center">
          <p className="text-slate-300">Want to talk through how this applies to your project?</p>
          <div className="mt-4">
            <ButtonLink href="/contact" variant="secondary">
              Start a Project
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
