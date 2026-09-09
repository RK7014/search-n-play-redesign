import { Fragment } from "react";
import { ArrowRight, Cloud, Cpu, Database, Globe, Server } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const LAYERS = [
  {
    icon: Globe,
    title: "Frontend",
    description: "Next.js + TypeScript, server-rendered for speed and SEO, hydrated for interaction.",
  },
  {
    icon: Cpu,
    title: "API Contract",
    description: "A JSON REST contract with consistent error shapes, validation, and request IDs.",
  },
  {
    icon: Server,
    title: "Go Services",
    description: "A stdlib-first Go backend: handlers, services, and repositories kept in separate layers.",
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description: "Structured relational storage with migrations applied automatically on startup.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Containerized with Docker, deployable behind CI/CD to any major cloud provider.",
  },
];

export function ArchitectureSection() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Engineering behind the experience"
          title="A real architecture, not just a landing page"
          description="This site is a working full-stack application. Here is how a request actually flows through it."
        />

        {/* A single CSS grid row holds every card and connector together, so
            they stretch and center against one shared row height — rather
            than each card+arrow pair being sized independently, which could
            drift out of alignment when description lengths differ. */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
          {LAYERS.map((layer, index) => (
            <Fragment key={layer.title}>
              <Reveal delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6">
                  <layer.icon className="size-6 text-accent-400" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-base font-semibold">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{layer.description}</p>
                </div>
              </Reveal>
              {index < LAYERS.length - 1 ? (
                <div className="flex items-center justify-center">
                  <ArrowRight
                    className="size-5 shrink-0 rotate-90 text-slate-500 lg:rotate-0"
                    aria-hidden="true"
                  />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
