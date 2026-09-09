import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { RealPortfolioReference } from "@/components/portfolio/RealPortfolioReference";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Demonstration case studies spanning SaaS, mobile, e-commerce, brand, and growth work.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const { data: projects, error } = await getProjects();
  const list = projects ?? [];

  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container>
        <SectionHeading
          eyebrow="Our work"
          title="Case studies from the kind of work we do"
          description="Demonstration case studies spanning the breadth of what this team builds — filter by category to explore."
        />
        {list.length === 0 ? (
          <p className="mt-10 text-sm text-red-400">
            {error?.message ?? "Portfolio is temporarily unavailable. Please refresh in a moment."}
          </p>
        ) : (
          <div className="mt-14">
            <PortfolioGrid projects={list} />
          </div>
        )}

        <RealPortfolioReference />
      </Container>
    </div>
  );
}
