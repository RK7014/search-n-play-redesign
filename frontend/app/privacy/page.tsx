import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageGlow } from "@/components/ui/PageGlow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How information submitted on this demonstration project is handled.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <PageGlow />
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          This page describes how this independent demo project handles information — read the
          notice below before treating it as a real company&apos;s policy.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-400">
          <section>
            <h2 className="font-display text-lg font-semibold text-paper">What this project is</h2>
            <p className="mt-2">
              This website is an independent interview/demo redesign concept inspired by publicly
              available information about Search N Play. It is not the official Search N Play
              website, and this policy applies only to this demo.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-paper">What is collected</h2>
            <p className="mt-2">
              The contact form, project estimator, and newsletter sign-up collect only the fields
              you submit — name, company, email, phone, service, budget range, project
              description, or email address. This data is stored to demonstrate a working
              full-stack contact and lead-capture flow.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-paper">How it is used</h2>
            <p className="mt-2">
              Submitted data is used solely to demonstrate the functionality of this project. It
              is not sold, shared with third parties, or used for advertising. Depending on how
              this demo is deployed, data may be periodically cleared.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-paper">Contact</h2>
            <p className="mt-2">
              Questions about this demo project can be sent through the{" "}
              <a href="/contact" className="underline hover:text-paper">
                contact form
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
