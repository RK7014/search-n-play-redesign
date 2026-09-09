"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import { Badge } from "@/components/ui/Badge";
import { ProjectCover } from "./ProjectCover";
import type { Project, ProjectCategory } from "@/lib/types";

const FILTERS: Array<{ label: string; value: ProjectCategory | "all" }> = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "SaaS", value: "saas" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
];

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category === filter)),
    [projects, filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={filter === item.value}
            onClick={() => setFilter(item.value)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === item.value
                ? "bg-paper text-ink"
                : "bg-[var(--surface-3)] text-slate-300 hover:bg-[var(--surface-5)]"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-sm text-slate-400">No projects in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link key={project.id} href={`/work/${project.slug}`} className="group block">
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
              <p className="mt-2 text-xs text-slate-500">{project.techStack.slice(0, 3).join(" · ")}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
