import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProjectCover } from "@/components/portfolio/ProjectCover";
import type { Project } from "@/lib/types";

export function PortfolioPreview({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3);

  return (
    <section className="bg-ink-soft py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Case studies from the kind of work we do"
            description="Six demonstration case studies spanning SaaS, mobile, e-commerce, brand, and growth."
            className="mb-0"
          />
          <ButtonLink href="/work" variant="outline">
            View all work
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        {featured.length === 0 ? (
          <p className="mt-10 text-sm text-slate-400">
            Portfolio is temporarily unavailable. Please refresh in a moment.
          </p>
        ) : (
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <ProjectCover slug={project.slug} className="aspect-[4/3]" />
                  <div className="mt-4 flex items-center gap-2">
                    <Badge tone="outline" className="capitalize">
                      {project.category}
                    </Badge>
                    {project.isDemo ? <Badge tone="warm">Demo case study</Badge> : null}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-paper transition-colors group-hover:text-accent-400">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400">{project.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
