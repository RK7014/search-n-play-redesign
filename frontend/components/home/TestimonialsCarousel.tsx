"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import clsx from "clsx";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[index];

  function go(delta: number) {
    setIndex((value) => (value + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="From the case studies"
          title="What the work sounds like from the other side"
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto size-8 text-white/10" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-center"
            >
              <p className="text-balance font-display text-xl font-medium leading-snug text-paper sm:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-slate-400">
                <span className="font-medium text-paper">{current.author}</span> — {current.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="rounded-full border border-[var(--border-1)] p-2 text-paper transition-colors hover:bg-[var(--surface-3)]"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((testimonial, i) => (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={clsx(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-6 bg-paper" : "w-2 bg-[var(--surface-7)]"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="rounded-full border border-[var(--border-1)] p-2 text-paper transition-colors hover:bg-[var(--surface-3)]"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          Demonstration content illustrating the client experience this process is designed to
          deliver — see individual case studies for context.
        </p>
      </Container>
    </section>
  );
}
