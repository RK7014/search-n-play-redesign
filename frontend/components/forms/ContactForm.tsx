"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { submitContact } from "@/lib/api";
import type { ApiError, ContactInput } from "@/lib/types";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/form-options";
import { isValidIndianMobile, sanitizePhoneDigits } from "@/lib/phone";
import { SelectField, TextAreaField, TextField } from "./fields";
import { Button } from "@/components/ui/Button";

function emptyForm(source: string, defaultService?: string): ContactInput {
  return {
    name: "",
    company: "",
    email: "",
    phone: "",
    service: defaultService ?? "",
    budgetRange: "",
    message: "",
    source,
  };
}

export function ContactForm({
  source = "contact_page",
  defaultService,
}: {
  source?: string;
  defaultService?: string;
}) {
  const [form, setForm] = useState<ContactInput>(() => emptyForm(source, defaultService));
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<ApiError | null>(null);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidIndianMobile(form.phone ?? "")) {
      setStatus("error");
      setError({
        code: "VALIDATION_ERROR",
        message: "Please fix the highlighted fields.",
        fields: { phone: "Enter a valid 10-digit mobile number." },
      });
      return;
    }

    setStatus("loading");
    setError(null);

    const { error: apiError } = await submitContact(form);
    if (apiError) {
      setStatus("error");
      setError(apiError);
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent-400/20 bg-accent-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-accent-400" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-paper">Message sent</h3>
        <p className="mt-2 text-sm text-slate-400">
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — we&apos;ll get back to you
          shortly at {form.email}.
        </p>
      </div>
    );
  }

  const fields = error?.fields ?? {};
  const hasGeneralError = status === "error" && Object.keys(fields).length === 0 && error;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {source === "proposal_request" ? (
        <p className="rounded-xl border border-accent-400/20 bg-accent-500/10 p-3 text-sm text-accent-400">
          Requesting a written proposal — the more detail below, the more useful the first draft.
        </p>
      ) : null}

      {hasGeneralError ? (
        <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300" role="alert">
          {error!.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          error={fields.name}
        />
        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          error={fields.company}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          error={fields.email}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="numeric"
          value={form.phone}
          onChange={(event) => update("phone", sanitizePhoneDigits(event.target.value))}
          error={fields.phone}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Service"
          name="service"
          placeholder="Select a service"
          options={SERVICE_OPTIONS}
          value={form.service}
          onChange={(event) => update("service", event.target.value)}
          error={fields.service}
        />
        <SelectField
          label="Budget range"
          name="budgetRange"
          placeholder="Select a range"
          options={BUDGET_OPTIONS}
          value={form.budgetRange}
          onChange={(event) => update("budgetRange", event.target.value)}
          error={fields.budgetRange}
        />
      </div>

      <TextAreaField
        label="Tell us about the project"
        name="message"
        required
        rows={5}
        minLength={10}
        maxLength={4000}
        placeholder="What are you building, and what does success look like?"
        value={form.message}
        onChange={(event) => update("message", event.target.value)}
        error={fields.message}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="secondary" size="lg" loading={status === "loading"} className="sm:w-auto">
          Send message
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
        <p className="text-xs text-slate-500">
          Independent demo project — submissions are stored for demonstration purposes only.
        </p>
      </div>
    </form>
  );
}
