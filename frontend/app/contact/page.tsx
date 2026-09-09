import type { Metadata } from "next";
import { FileText, Mail, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { DiscoveryCallButton } from "@/components/contact/DiscoveryCallButton";
import { FOOTER_EMAIL, FOOTER_LOCATION } from "@/lib/constants";
import { schedulingUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with our product engineering team — share a few details and we'll follow up with next steps.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const rawService = params.service;
  const defaultService = typeof rawService === "string" ? rawService : undefined;
  const rawSource = params.source;
  const source = rawSource === "proposal_request" ? rawSource : "contact_page";

  return (
    <div className="relative overflow-hidden bg-ink">
      <PageGlow />
      <Container className="py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
              Get in touch
            </span>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
              Have an idea? Let&apos;s build it.
            </h1>
            <p className="mt-4 max-w-xl text-slate-400">
              Tell us what you&apos;re building, and we&apos;ll follow up with next steps — not a
              sales script.
            </p>

            <div
              id="contact-form"
              className="mt-10 scroll-mt-24 rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6 sm:p-8"
            >
              <ContactForm defaultService={defaultService} source={source} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6">
              <h2 className="font-display text-lg font-semibold text-paper">
                Prefer to talk it through?
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Book a discovery call, or request a written proposal — whichever fits how you make
                decisions.
              </p>
              <div className="mt-5 space-y-3">
                <DiscoveryCallButton schedulingUrl={schedulingUrl()} />
                <ButtonLink
                  href="/contact?source=proposal_request#contact-form"
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center"
                >
                  <FileText className="size-4" aria-hidden="true" />
                  Request a Proposal
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6">
              <h2 className="font-display text-lg font-semibold text-paper">What happens next</h2>
              <ol className="mt-4 space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-accent-400">01</span>
                  We review your message, usually within one business day.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-accent-400">02</span>
                  We schedule a short discovery call to understand scope.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-accent-400">03</span>
                  You receive a scoped proposal or a clear next step.
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-slate-500" aria-hidden="true" />
                {FOOTER_LOCATION}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Mail className="size-4 text-slate-500" aria-hidden="true" />
                {FOOTER_EMAIL}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
