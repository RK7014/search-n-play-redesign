import type { MetadataRoute } from "next";

import { getProjects, getServices } from "@/lib/api";
import { INSIGHT_ARTICLES } from "@/lib/content/insights";
import { siteUrl } from "@/lib/env";

const STATIC_PATHS = [
  "",
  "/services",
  "/solutions",
  "/work",
  "/process",
  "/about",
  "/insights",
  "/contact",
  "/estimate",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const [{ data: services }, { data: projects }] = await Promise.all([getServices(), getProjects()]);

  const staticRoutes = STATIC_PATHS.map((path) => ({ url: `${base}${path}`, lastModified: now }));
  const serviceRoutes = (services ?? []).map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
  }));
  const projectRoutes = (projects ?? []).map((project) => ({
    url: `${base}/work/${project.slug}`,
    lastModified: now,
  }));
  const insightRoutes = INSIGHT_ARTICLES.map((article) => ({
    url: `${base}/insights/${article.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...insightRoutes];
}
