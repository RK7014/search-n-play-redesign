import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for browsing and interacting with this demonstration project.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Terms of Use
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-400">
          <section>
            <h2 className="font-display text-lg font-semibold text-paper">Independent demo project</h2>
            <p className="mt-2">
              This website is an independent interview/demo redesign concept inspired by publicly
              available information about Search N Play. It is not affiliated with, endorsed by,
              or representing the official Search N Play website.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-paper">No binding offers</h2>
            <p className="mt-2">
              Nothing on this site — including the project estimator — constitutes a binding
              quotation, offer, or contract. Case studies marked as demonstration content are
              illustrative and do not represent verified outcomes for a real client engagement.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-paper">Use of this site</h2>
            <p className="mt-2">
              This project is intended for demonstration and evaluation purposes. Forms may be
              used to test functionality; please don&apos;t submit sensitive personal information.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
