// Mirrors the JSON shapes returned by the Go backend
// (see backend/internal/models). Kept as a single source of truth so every
// component and API helper shares the same contract.

export interface Service {
  id: string;
  slug: string;
  category: string;
  name: string;
  summary: string;
  description: string;
  capabilities: string[];
  icon: string;
  sortOrder: number;
}

export type ProjectCategory = "saas" | "web" | "mobile" | "design" | "marketing";

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  summary: string;
  challenge: string;
  strategy: string;
  designNotes: string;
  engineering: string;
  outcome: string;
  techStack: string[];
  accentColor: string;
  isDemo: boolean;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  projectId?: string;
  isDemo: boolean;
  sortOrder: number;
}

export interface ContactInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  budgetRange?: string;
  message: string;
  source?: string;
}

export interface Contact extends ContactInput {
  id: string;
  createdAt: string;
}

export interface NewsletterInput {
  email: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  createdAt?: string;
}

export type ProjectType = "saas" | "web" | "mobile" | "ecommerce" | "custom";
export type Platform = "web" | "ios" | "android" | "cross-platform";
export type FeatureScope = "starter" | "growth" | "advanced" | "enterprise";
export type DesignLevel = "template" | "custom" | "premium";
export type Integration = "payments" | "crm" | "erp" | "auth" | "analytics" | "other";
export type AIRequirement = "none" | "assistive" | "advanced";
export type SupportLevel = "none" | "standard" | "premium";

export interface EstimateInput {
  projectType: ProjectType | "";
  platforms: Platform[];
  featureScope: FeatureScope | "";
  designLevel: DesignLevel | "";
  integrations: Integration[];
  aiRequirement: AIRequirement | "";
  supportLevel: SupportLevel | "";
}

export interface EstimateResult {
  complexityScore: number;
  complexityLabel: string;
  timelineMinWeeks: number;
  timelineMaxWeeks: number;
  costMinInr: number;
  costMaxInr: number;
  recommendedApproach: string;
  recommendedStack: string[];
  teamComposition: string[];
  disclaimer: string;
}

export interface ApiError {
  code: string;
  message: string;
  fields?: Record<string, string>;
}
