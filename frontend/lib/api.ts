import { apiBaseUrl } from "./env";
import type {
  ApiError,
  Contact,
  ContactInput,
  EstimateInput,
  EstimateResult,
  NewsletterInput,
  NewsletterSubscriber,
  Project,
  Service,
  Testimonial,
} from "./types";

export interface ApiResult<T> {
  data?: T;
  error?: ApiError;
}

interface Envelope<T> {
  data?: T;
  error?: ApiError;
  requestId?: string;
}

async function parseEnvelope<T>(res: Response): Promise<ApiResult<T>> {
  let body: Envelope<T> | undefined;
  try {
    body = (await res.json()) as Envelope<T>;
  } catch {
    // Non-JSON body (e.g. a proxy error page) — fall through to the
    // generic status-based error below.
  }

  if (!res.ok) {
    return {
      error: body?.error ?? {
        code: "UNKNOWN_ERROR",
        message: `The server responded with status ${res.status}.`,
      },
    };
  }

  return { data: body?.data };
}

function networkError(): ApiResult<never> {
  return {
    error: {
      code: "NETWORK_ERROR",
      message: "Could not reach the server. Check your connection and try again.",
    },
  };
}

// ---- Server-side reads (called from Server Components; hit the Go API directly) ----

export async function getServices(): Promise<ApiResult<Service[]>> {
  try {
    const res = await fetch(`${apiBaseUrl()}/api/services`);
    const result = await parseEnvelope<Service[]>(res);
    return { data: result.data ?? [], error: result.error };
  } catch {
    return { data: [], error: networkError().error };
  }
}

export async function getProjects(): Promise<ApiResult<Project[]>> {
  try {
    const res = await fetch(`${apiBaseUrl()}/api/projects`);
    const result = await parseEnvelope<Project[]>(res);
    return { data: result.data ?? [], error: result.error };
  } catch {
    return { data: [], error: networkError().error };
  }
}

export async function getTestimonials(): Promise<ApiResult<Testimonial[]>> {
  try {
    const res = await fetch(`${apiBaseUrl()}/api/testimonials`);
    const result = await parseEnvelope<Testimonial[]>(res);
    return { data: result.data ?? [], error: result.error };
  } catch {
    return { data: [], error: networkError().error };
  }
}

// ---- Client-side writes (called from Client Components via the same-origin /api rewrite) ----

export async function submitContact(input: ContactInput): Promise<ApiResult<Contact>> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return await parseEnvelope<Contact>(res);
  } catch {
    return networkError();
  }
}

export async function submitEstimate(input: EstimateInput): Promise<ApiResult<EstimateResult>> {
  try {
    const res = await fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return await parseEnvelope<EstimateResult>(res);
  } catch {
    return networkError();
  }
}

export async function subscribeNewsletter(
  input: NewsletterInput
): Promise<ApiResult<NewsletterSubscriber>> {
  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return await parseEnvelope<NewsletterSubscriber>(res);
  } catch {
    return networkError();
  }
}
