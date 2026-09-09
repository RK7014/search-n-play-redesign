import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <Reveal>
          {/* A fixed dark "spotlight" card regardless of site theme — the
              background photo is atmosphere, not a real claim about this
              company's office, so it stays legible under one consistent
              dark scrim rather than adapting per theme. */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-16 text-center sm:px-16">
            <Image
              src="/images/misc/cta-workspace.jpg"
              alt=""
              fill
              sizes="1200px"
              className="object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/85 to-[#0a0c10]/70" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent-500/20 blur-3xl"
            />
            <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-white/10">
              <Calculator className="size-6 text-accent-400" aria-hidden="true" />
            </span>
            <h2 className="relative mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Have an idea? Let&apos;s build it.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/60">
              Tell us what you&apos;re building, or get an indicative estimate in two minutes
              first — either way, you&apos;ll hear back with next steps, not a sales script.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Start a Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              {/* Not the shared outline ButtonLink: that variant uses
                  theme-reactive text-paper/border tokens, which would go
                  dark-on-dark here since this card stays dark in both
                  themes. Literal white-based classes instead. */}
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:border-white/40"
              >
                Estimate a Project
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
