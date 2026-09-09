import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { ButtonLink } from "@/components/ui/Button";
import { WHY_CHOOSE_US, TECH_STACK } from "@/lib/constants";
import { CatalogIcon } from "@/lib/icon-map";

export const metadata: Metadata = {
  title: "About",
  description:
    "A digital product engineering and growth partner built around business-first engineering, transparent delivery, and long-term support.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-ink">
      <PageGlow />
      <Container className="py-20 sm:py-28">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
            About
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
            Technology partners who think like operators first.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            Search N Play is positioned here as a digital product engineering and growth partner —
            a team that designs and builds SaaS platforms, web and mobile applications, and the AI
            and growth work around them, treating each engagement as a product decision rather than
            just a build request.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            This site is an independent redesign concept created to demonstrate how that
            positioning could look and function end to end — from the interface down to the API
            and database behind it. See the footer for the full disclosure.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--border-1)] bg-[var(--surface-5)] sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.title} className="flex flex-col bg-ink p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/30 via-accent-500/15 to-transparent text-accent-400 shadow-[0_0_24px_4px_rgba(51,85,255,0.2)]">
                <CatalogIcon name={item.icon} className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-paper">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-paper">Technology we work with</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            A modern, production-proven stack chosen per project — not a one-size-fits-all template.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-2">
                  <CatalogIcon name={group.icon} className="size-4 text-accent-400" aria-hidden="true" />
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-400">
                    {group.category}
                  </h3>
                </div>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-slate-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-8 sm:p-12">
          <h2 className="font-display text-2xl font-semibold text-paper">
            How engagements are structured
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Every project — regardless of size — moves through the same six stages, from discovery
            through long-term support.
          </p>
          <div className="mt-6">
            <ButtonLink href="/process">See the process</ButtonLink>
          </div>
        </div>

        {/* A fixed dark "spotlight" card regardless of site theme — the
            background photo is atmosphere, not a real claim about this
            company's office, so it stays legible under one consistent dark
            scrim rather than adapting per theme (see FinalCta on the
            homepage for the same pattern). */}
        <div className="relative mt-16 flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-white/10 px-8 py-14 text-center sm:px-16">
          <Image
            src="/images/misc/cta-workspace.jpg"
            alt=""
            fill
            sizes="1200px"
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/85 to-[#0a0c10]/70" />
          <h2 className="relative font-display text-2xl font-semibold text-white sm:text-3xl">
            Want to see how it applies to your project?
          </h2>
          <ButtonLink href="/contact" variant="secondary" size="lg" className="relative">
            Start a Project
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
