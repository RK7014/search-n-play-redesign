"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PageGlow } from "@/components/ui/PageGlow";
import { HeroVisual } from "./HeroVisual";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <PageGlow className="h-full" />

      <Container className="grid gap-16 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-24">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-1)] bg-[var(--surface-3)] px-4 py-1.5 text-xs font-medium text-slate-300"
          >
            <Sparkles className="size-3.5 text-accent-400" aria-hidden="true" />
            Digital Product Engineering &amp; Growth Partner
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Build digital products that move your business forward.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            From SaaS platforms and mobile applications to automation, AI, and digital growth — we
            design and engineer technology that delivers measurable business outcomes.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Start a Project
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href="/work"
              variant="outline"
              size="lg"
              className="border-[var(--border-3)] text-paper hover:border-[var(--border-6)]"
            >
              Explore Our Work
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--border-1)] pt-8 text-sm"
          >
            <div>
              <dt className="text-slate-400">Engineering</dt>
              <dd className="mt-1 font-display text-base font-semibold">Product-grade</dd>
            </div>
            <div>
              <dt className="text-slate-400">Delivery</dt>
              <dd className="mt-1 font-display text-base font-semibold">Milestone-based</dd>
            </div>
            <div>
              <dt className="text-slate-400">Support</dt>
              <dd className="mt-1 font-display text-base font-semibold">Post-launch</dd>
            </div>
          </motion.dl>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
