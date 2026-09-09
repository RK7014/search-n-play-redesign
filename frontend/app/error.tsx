"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logged client-side only — no stack traces are ever shown to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center bg-ink">
      <Container className="text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-red-400">
          Something went wrong
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          An unexpected error occurred.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          Please try again. If the problem continues, reach out through the contact page.
        </p>
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </Container>
    </div>
  );
}
