import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCover } from "@/components/portfolio/ProjectCover";
import { getProjects, getTestimonials } from "@/lib/api";
import { CatalogIcon } from "@/lib/icon-map";
import type { Project } from "@/lib/types";

export async function generateStaticParams() {
  const { data: projects } = await getProjects();
  return (projects ?? []).map((project) => ({ slug: project.slug }));
}

async function findProject(slug: string) {
  const { data: projects } = await getProjects();
  return (projects ?? []).find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

function stages(project: Project) {
  return [
    { label: "Challenge", icon: "eye", value: project.challenge },
    { label: "Strategy", icon: "target", value: project.strategy },
    { label: "Design", icon: "palette", value: project.designNotes },
    { label: "Engineering", icon: "code", value: project.engineering },
    { label: "Outcome", icon: "trophy", value: project.outcome },
  ];
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const [project, testimonialsResult] = await Promise.all([findProject(slug), getTestimonials()]);
  if (!project) notFound();

  const testimonial = (testimonialsResult.data ?? []).find((item) => item.projectId === project.id);

  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container>
        <Link href="/work" className="text-sm font-medium text-slate-400 hover:text-paper">
          ← All work
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Badge tone="outline" className="capitalize">
                {project.category}
              </Badge>
              {project.isDemo ? <Badge tone="warm">Demo case study</Badge> : null}
            </div>
            <h1 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-2 text-lg text-slate-400">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--surface-3)] px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <ProjectCover slug={project.slug} className="aspect-[4/3] w-full" />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {stages(project).map((stage) => (
            <div key={stage.label} className="rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-7">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400">
                <CatalogIcon name={stage.icon} className="size-4" aria-hidden="true" />
              </span>
              <h2 className="mt-3 font-display text-base font-semibold text-accent-400">{stage.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{stage.value}</p>
            </div>
          ))}
        </div>

        {testimonial ? (
          <div className="mt-10 rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-8">
            <p className="text-balance font-display text-xl font-medium text-paper">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm text-slate-400">
              <span className="font-medium text-paper">{testimonial.author}</span> — {testimonial.role}
            </p>
          </div>
        ) : null}

        {project.isDemo ? (
          <p className="mt-10 text-xs text-slate-500">
            This is an original demonstration case study created for this project, not a
            documented outcome for a real, named client engagement.
          </p>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Start a similar project
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/work" variant="outline" size="lg">
            Explore more work
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
