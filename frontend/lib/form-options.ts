// Option lists for the contact and estimator forms. Values must stay in
// sync with the enums validated by the Go backend (see
// backend/internal/models/contact.go and estimate.go).

export const SERVICE_OPTIONS = [
  { value: "product-engineering", label: "Product Engineering" },
  { value: "mobile-engineering", label: "Mobile Engineering" },
  { value: "digital-experience", label: "Digital Experience" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "growth", label: "Growth" },
  { value: "continuous-support", label: "Continuous Support" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-25k-inr", label: "Under ₹25,000" },
  { value: "25k-75k-inr", label: "₹25,000 – ₹75,000" },
  { value: "75k-2l-inr", label: "₹75,000 – ₹2,00,000" },
  { value: "2l-5l-inr", label: "₹2,00,000 – ₹5,00,000" },
  { value: "5l-plus-inr", label: "₹5,00,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const PROJECT_TYPE_OPTIONS = [
  { value: "saas", label: "SaaS platform" },
  { value: "web", label: "Website / web app" },
  { value: "mobile", label: "Mobile app" },
  { value: "ecommerce", label: "E-commerce store" },
  { value: "custom", label: "Custom software" },
] as const;

export const PLATFORM_OPTIONS = [
  { value: "web", label: "Web" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
  { value: "cross-platform", label: "Cross-platform (single codebase)" },
] as const;

export const FEATURE_SCOPE_OPTIONS = [
  { value: "starter", label: "Starter — a few core screens" },
  { value: "growth", label: "Growth — several connected modules" },
  { value: "advanced", label: "Advanced — complex workflows" },
  { value: "enterprise", label: "Enterprise — multi-role, high scale" },
] as const;

export const DESIGN_LEVEL_OPTIONS = [
  { value: "template", label: "Template-based" },
  { value: "custom", label: "Custom UI/UX" },
  { value: "premium", label: "Premium, fully bespoke design" },
] as const;

export const INTEGRATION_OPTIONS = [
  { value: "payments", label: "Payments" },
  { value: "crm", label: "CRM" },
  { value: "erp", label: "ERP" },
  { value: "auth", label: "Authentication / SSO" },
  { value: "analytics", label: "Analytics" },
  { value: "other", label: "Other systems" },
] as const;

export const AI_REQUIREMENT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "assistive", label: "Assistive — basic AI features" },
  { value: "advanced", label: "Advanced — RAG / complex AI workflows" },
] as const;

export const SUPPORT_LEVEL_OPTIONS = [
  { value: "none", label: "None" },
  { value: "standard", label: "Standard — business hours" },
  { value: "premium", label: "Premium — SLA-backed" },
] as const;
