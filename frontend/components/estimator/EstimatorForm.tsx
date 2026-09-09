"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

import { submitContact, submitEstimate } from "@/lib/api";
import type { ApiError, ContactInput, EstimateInput, EstimateResult } from "@/lib/types";
import {
  AI_REQUIREMENT_OPTIONS,
  DESIGN_LEVEL_OPTIONS,
  FEATURE_SCOPE_OPTIONS,
  INTEGRATION_OPTIONS,
  PLATFORM_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  SUPPORT_LEVEL_OPTIONS,
} from "@/lib/form-options";
import { isValidIndianMobile, sanitizePhoneDigits } from "@/lib/phone";
import { CheckboxGroupField, SelectField, TextField } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { EstimatorResultCard } from "./EstimatorResult";

const EMPTY_CONTACT = { name: "", phone: "", email: "" };

const EMPTY_FORM: EstimateInput = {
  projectType: "",
  platforms: [],
  featureScope: "",
  designLevel: "",
  integrations: [],
  aiRequirement: "",
  supportLevel: "",
};

// Captured as a real lead (via the same /api/contact pipeline the main
// contact form uses) the moment someone asks to start the estimator — not
// only on final submission — so there's a usable contact even if they
// abandon the questionnaire partway through.
const ESTIMATOR_LEAD_MESSAGE = "Requested a project estimate via the estimator tool.";

type Stage = "contact" | "questionnaire" | "success";
type Status = "idle" | "loading" | "success" | "error";

export function EstimatorForm() {
  const [stage, setStage] = useState<Stage>("contact");

  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [contactStatus, setContactStatus] = useState<Status>("idle");
  const [contactError, setContactError] = useState<ApiError | null>(null);

  const [form, setForm] = useState<EstimateInput>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ApiError | null>(null);
  const [result, setResult] = useState<EstimateResult | null>(null);

  function updateContact<K extends keyof typeof contact>(key: K, value: string) {
    setContact((current) => ({ ...current, [key]: value }));
  }

  function update<K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fields: Record<string, string> = {};
    if (!contact.name.trim()) fields.name = "Name is required.";
    if (!contact.phone.trim()) {
      fields.phone = "Phone number is required.";
    } else if (!isValidIndianMobile(contact.phone)) {
      fields.phone = "Enter a valid 10-digit mobile number.";
    }
    if (!contact.email.trim()) fields.email = "Email is required.";
    if (Object.keys(fields).length > 0) {
      setContactStatus("error");
      setContactError({ code: "VALIDATION_ERROR", message: "Please fill in all fields.", fields });
      return;
    }

    setContactStatus("loading");
    setContactError(null);

    const input: ContactInput = {
      ...contact,
      message: ESTIMATOR_LEAD_MESSAGE,
      source: "estimator",
    };
    const { error: apiError } = await submitContact(input);
    if (apiError) {
      setContactStatus("error");
      setContactError(apiError);
      return;
    }
    setContactStatus("success");
    setStage("questionnaire");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const { data, error: apiError } = await submitEstimate(form);
    if (apiError) {
      setStatus("error");
      setError(apiError);
      return;
    }
    setResult(data ?? null);
    setStatus("success");
    setStage("success");
  }

  function reset() {
    setForm(EMPTY_FORM);
    setResult(null);
    setStatus("idle");
    setError(null);
    setStage("questionnaire");
  }

  if (stage === "contact") {
    const fields = contactError?.fields ?? {};
    const hasGeneralError = contactStatus === "error" && Object.keys(fields).length === 0 && contactError;

    return (
      <form
        onSubmit={handleContactSubmit}
        noValidate
        className="space-y-5 rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6 sm:p-8"
      >
        {hasGeneralError ? (
          <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300" role="alert">
            {contactError!.message}
          </div>
        ) : null}

        <div>
          <h2 className="font-display text-lg font-semibold text-paper">Before we start</h2>
          <p className="mt-1 text-sm text-slate-400">
            A few details so we can send your estimate and follow up if you&apos;d like to talk it
            through.
          </p>
        </div>

        <TextField
          label="Full name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          value={contact.name}
          onChange={(event) => updateContact("name", event.target.value)}
          error={fields.name}
        />
        <TextField
          label="Phone number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="numeric"
          value={contact.phone}
          onChange={(event) => updateContact("phone", sanitizePhoneDigits(event.target.value))}
          error={fields.phone}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={contact.email}
          onChange={(event) => updateContact("email", event.target.value)}
          error={fields.email}
        />

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          loading={contactStatus === "loading"}
          className="w-full sm:w-auto"
        >
          Continue to questions
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
        <p className="text-xs text-slate-500">
          Independent demo project — submissions are stored for demonstration purposes only.
        </p>
      </form>
    );
  }

  if (stage === "success" && result) {
    return (
      <div className="space-y-6">
        <EstimatorResultCard result={result} />
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm font-medium text-paper transition-colors hover:text-accent-400"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Start over
        </button>
      </div>
    );
  }

  const fields = error?.fields ?? {};
  const hasGeneralError = status === "error" && Object.keys(fields).length === 0 && error;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6 sm:p-8"
    >
      {hasGeneralError ? (
        <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300" role="alert">
          {error!.message}
        </div>
      ) : null}

      <SelectField
        label="Project type"
        name="projectType"
        required
        placeholder="Select a project type"
        options={PROJECT_TYPE_OPTIONS}
        value={form.projectType}
        onChange={(event) => update("projectType", event.target.value as EstimateInput["projectType"])}
        error={fields.projectType}
      />

      <CheckboxGroupField
        label="Platforms"
        hint="Select all that apply"
        options={PLATFORM_OPTIONS}
        values={form.platforms}
        onChange={(values) => update("platforms", values as EstimateInput["platforms"])}
        error={fields.platforms}
      />

      <SelectField
        label="Feature scope"
        name="featureScope"
        required
        placeholder="Select feature scope"
        options={FEATURE_SCOPE_OPTIONS}
        value={form.featureScope}
        onChange={(event) => update("featureScope", event.target.value as EstimateInput["featureScope"])}
        error={fields.featureScope}
      />

      <SelectField
        label="Design requirement"
        name="designLevel"
        required
        placeholder="Select a design level"
        options={DESIGN_LEVEL_OPTIONS}
        value={form.designLevel}
        onChange={(event) => update("designLevel", event.target.value as EstimateInput["designLevel"])}
        error={fields.designLevel}
      />

      <CheckboxGroupField
        label="Integrations"
        hint="Select any systems you need to connect to"
        options={INTEGRATION_OPTIONS}
        values={form.integrations}
        onChange={(values) => update("integrations", values as EstimateInput["integrations"])}
        error={fields.integrations}
      />

      <SelectField
        label="AI requirement"
        name="aiRequirement"
        required
        placeholder="Select an AI requirement"
        options={AI_REQUIREMENT_OPTIONS}
        value={form.aiRequirement}
        onChange={(event) => update("aiRequirement", event.target.value as EstimateInput["aiRequirement"])}
        error={fields.aiRequirement}
      />

      <SelectField
        label="Ongoing support"
        name="supportLevel"
        required
        placeholder="Select a support level"
        options={SUPPORT_LEVEL_OPTIONS}
        value={form.supportLevel}
        onChange={(event) => update("supportLevel", event.target.value as EstimateInput["supportLevel"])}
        error={fields.supportLevel}
      />

      <Button type="submit" variant="secondary" size="lg" loading={status === "loading"} className="w-full sm:w-auto">
        Get my estimate
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
