import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FinalCta } from "@/components/home/FinalCta";
import { getProjects, getServices, getTestimonials } from "@/lib/api";

export const metadata: Metadata = {
  description:
    "SaaS platforms, web and mobile applications, AI integrations, and growth work — engineered as one team, from the first discovery call to long-term support.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [servicesResult, projectsResult, testimonialsResult] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesOverview services={servicesResult.data ?? []} />
      <PortfolioPreview projects={projectsResult.data ?? []} />
      <ArchitectureSection />
      <TestimonialsCarousel testimonials={testimonialsResult.data ?? []} />
      <FinalCta />
    </>
  );
}
