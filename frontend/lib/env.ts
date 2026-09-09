// Server-only environment accessors. None of these are exposed to the
// browser bundle (no NEXT_PUBLIC_ prefix is needed): pages read them on the
// server and pass whatever the client actually needs down as props.

function trimTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/** Base URL of the Go backend, used for server-side (SSR) data fetching. */
export function apiBaseUrl(): string {
  return trimTrailingSlash(process.env.GO_API_URL || "http://localhost:8080");
}

/** Public site origin, used for canonical URLs, OG tags, and the sitemap. */
export function siteUrl(): string {
  return trimTrailingSlash(process.env.SITE_URL || "http://localhost:3000");
}

/** Optional external scheduling link for "Book a Discovery Call". */
export function schedulingUrl(): string | undefined {
  const url = process.env.SCHEDULING_URL;
  return url && url.trim() !== "" ? url : undefined;
}
