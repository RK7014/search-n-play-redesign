"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { subscribeNewsletter } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const { error } = await subscribeNewsletter({ email });

    if (error) {
      setStatus("error");
      setMessage(error.fields?.email ?? error.message);
      return;
    }

    setStatus("success");
    setMessage("You're subscribed — thanks for following along.");
    setEmail("");
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm text-paper/90">
        <CheckCircle2 className="size-4 text-accent-400" aria-hidden="true" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          // Password managers and disposable-email extensions (e.g. Temp Mail)
          // commonly inject attributes/styles into email inputs after the
          // server-rendered HTML loads, which React otherwise flags as a
          // hydration mismatch — see https://react.dev/link/hydration-mismatch.
          suppressHydrationWarning
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-full border border-[var(--border-2)] bg-[var(--surface-3)] px-4 py-2.5 text-sm text-paper placeholder:text-slate-400 focus:border-accent-400 sm:max-w-64"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-600 disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Subscribe
        </button>
      </div>
      {status === "error" && message ? (
        <p className="text-xs text-red-300" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
