import { ExternalLink } from "lucide-react";

import { REAL_PORTFOLIO_COUNT, REAL_PORTFOLIO_REFERENCE } from "@/lib/constants";
import { FaviconImage } from "./FaviconImage";

/**
 * Cites the real, publicly listed portfolio from the original
 * searchnplays.com/portfolio page, for research accuracy — these are not
 * this redesign's own client work (see the demo case studies above). Each
 * linked entry shows that business's own favicon (fetched live from Google's
 * public favicon service, not downloaded or re-hosted by this project) as a
 * real, low-footprint brand mark rather than this project redistributing
 * anyone's actual image files. See docs/PROJECT_OVERVIEW.md for the full
 * rationale.
 */
export function RealPortfolioReference() {
  return (
    <div className="mt-20 rounded-3xl border border-[var(--border-1)] bg-[var(--surface-1)] p-8 sm:p-10">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
        Source material
      </span>
      <h2 className="mt-3 font-display text-xl font-semibold text-paper">
        Referenced from the real Search N Play portfolio
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
        The case studies above are original demonstration content (see each one&apos;s notice).
        For accuracy, here is the real, publicly listed portfolio this redesign is based
        on — {REAL_PORTFOLIO_COUNT} projects across web, mobile, and graphic design, as listed on
        the original site. Links go to those businesses&apos; own live sites, not anything hosted
        here.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {REAL_PORTFOLIO_REFERENCE.map((entry) =>
          entry.url ? (
            <li key={entry.name}>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                title={entry.type}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-1)] bg-[var(--surface-3)] py-1.5 pl-2 pr-3 text-xs font-medium text-slate-300 transition-colors hover:border-accent-400/30 hover:text-paper"
              >
                <FaviconImage url={entry.url} />
                {entry.name}
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            </li>
          ) : (
            <li key={entry.name}>
              <span
                title={entry.type}
                className="inline-flex items-center rounded-full border border-[var(--border-1)] bg-[var(--surface-3)] px-3 py-1.5 text-xs font-medium text-slate-400"
              >
                {entry.name}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
