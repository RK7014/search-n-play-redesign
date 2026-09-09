import type { NextConfig } from "next";

// The Go API is a separate service (see /backend). In development it runs on
// GO_API_URL (default http://localhost:8080); in production point this at
// the deployed API's origin. Rewriting /api/* to it means browser code can
// always call same-origin "/api/..." without touching CORS.
const GO_API_URL = process.env.GO_API_URL ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  // Produces a minimal .next/standalone server for the self-hosted Docker
  // image (see Dockerfile). Skip it on Vercel (which sets VERCEL=1 during
  // its own builds automatically) — Vercel's build pipeline produces its
  // own equivalent optimized output and this setting actively conflicts
  // with it, failing the build looking for a trace file that never gets
  // written in standalone mode.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${GO_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
