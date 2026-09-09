export const SITE_NAME = "Search N Play";
export const SITE_TAGLINE = "Digital Product Engineering & Growth Partner";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Product Engineering", href: "/services/product-engineering" },
    { label: "Mobile Engineering", href: "/services/mobile-engineering" },
    { label: "Digital Experience", href: "/services/digital-experience" },
    { label: "AI & Automation", href: "/services/ai-automation" },
    { label: "Growth", href: "/services/growth" },
    { label: "Continuous Support", href: "/services/continuous-support" },
  ],
  resources: [
    { label: "Solutions by Outcome", href: "/solutions" },
    { label: "Project Estimator", href: "/estimate" },
    { label: "Insights", href: "/insights" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
} as const;

// General location only — not a working contact channel. See
// docs/PROJECT_OVERVIEW.md for why this independent demo doesn't reuse the
// real company's phone/email/WhatsApp details.
export const FOOTER_LOCATION = "Jaipur, Rajasthan, India";
export const FOOTER_EMAIL = "hello@searchnplay-demo.example";

export const PROCESS_STEPS = [
  {
    index: "01",
    title: "Discover",
    icon: "eye",
    description:
      "We study the business, the users, and the constraints — technical, budget, and timeline — before proposing a single feature.",
  },
  {
    index: "02",
    title: "Strategize",
    icon: "target",
    description:
      "We define the architecture, a delivery roadmap, and the metrics that will tell us the work is succeeding.",
  },
  {
    index: "03",
    title: "Design",
    icon: "palette",
    description:
      "We design the interface and experience your users will actually touch, validated with you before production engineering begins.",
  },
  {
    index: "04",
    title: "Engineer",
    icon: "code",
    description:
      "We build on a scalable, secure, and maintainable foundation — reviewed code, tests, and infrastructure, not a prototype dressed up as a product.",
  },
  {
    index: "05",
    title: "Launch",
    icon: "rocket",
    description:
      "We ship behind a proper release process, with monitoring, alerting, and rollback paths in place from day one.",
  },
  {
    index: "06",
    title: "Scale",
    icon: "trending-up",
    description:
      "We stay engaged after launch — monitoring, fixing, and extending the system as real usage tells us what matters next.",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Business-first engineering",
    description:
      "We start with what has to be true for the business, then choose the architecture that gets there — not the other way around.",
    icon: "target",
  },
  {
    title: "Transparent by default",
    description:
      "Regular visibility into progress, decisions, and blockers, in plain language — not status meetings that exist to produce a status.",
    icon: "eye",
  },
  {
    title: "Built to scale",
    description:
      "Systems designed for the load you'll have in a year, with the option to grow into it — not just the demo you need next week.",
    icon: "trending-up",
  },
  {
    title: "Security from the start",
    description:
      "Authentication, data handling, and infrastructure hardened as part of the build, not bolted on after something goes wrong.",
    icon: "shield-check",
  },
  {
    title: "Support that continues",
    description:
      "Launch is a milestone, not an exit. We stay on for monitoring, fixes, and iteration once real users show up.",
    icon: "life-buoy",
  },
  {
    title: "Outcomes over output",
    description:
      "Progress is measured by what changed for your users and your metrics — not by lines of code shipped.",
    icon: "check-circle-2",
  },
] as const;

export const TECH_STACK = [
  {
    category: "Frontend",
    icon: "code",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "server",
    items: ["Go", "Node.js", "Python"],
  },
  {
    category: "Mobile",
    icon: "smartphone",
    items: ["Flutter", "React Native"],
  },
  {
    category: "Database",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    category: "Cloud",
    icon: "cloud",
    items: ["AWS", "Azure", "Google Cloud"],
  },
  {
    category: "DevOps",
    icon: "git-branch",
    items: ["Docker", "CI/CD", "GitHub Actions"],
  },
  {
    category: "AI",
    icon: "sparkles",
    items: ["OpenAI APIs", "LLM Integrations", "RAG", "Automation"],
  },
] as const;

export const TRUST_STATEMENT =
  "We approach every engagement the way we'd want a technology partner to work with us: transparent scope, real architecture decisions, and code we're willing to stand behind after launch.";

export const TRUST_BADGES = [
  "Security-first delivery",
  "Cloud-native architecture",
  "Milestone-based delivery",
  "Direct engineering access",
] as const;

// Reproduced from the original searchnplays.com "Why Choose Us" section
// (used with the site owner's permission for this private, non-public
// practice build — see docs/PROJECT_OVERVIEW.md) with light copy-editing
// for grammar/clarity only; the three pillars, headline, and figures are
// unchanged from the source.
export const ORIGINAL_WHY_CHOOSE_US = [
  {
    icon: "gem",
    title: "Catalyzing Your Idea",
    description:
      "We help turn your idea into its strongest version — refining the requirements and drawing out the best possible approach before a single line of code is written.",
  },
  {
    icon: "heart-handshake",
    title: "Customer Satisfaction",
    description:
      "We believe long-term client relationships are built on trust, so quality service comes first — on every project, not just the first one.",
  },
  {
    icon: "trophy",
    title: "Awesome Results",
    description:
      "Our digital marketing work is built to compete. We help clients keep pace with the market today and grow their business over time.",
  },
] as const;

export const HOSTING_HEADLINE = "More than 1,200 websites trusted and hosted";

export const ORIGINAL_STATS = [
  { value: "767", label: "Projects" },
  { value: "3", label: "Awards Won" },
  { value: "300", label: "Hosting Clients" },
  { value: "600", label: "Satisfied Customers" },
] as const;

export interface Solution {
  slug: string;
  title: string;
  icon: string;
  description: string;
  relatedServiceSlugs: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "launch-a-saas-product",
    title: "Launch a SaaS Product",
    icon: "layers",
    description:
      "Go from idea to a working product a first cohort of users can actually try — scoped as a real MVP, not a stripped-down demo.",
    relatedServiceSlugs: ["product-engineering", "digital-experience"],
  },
  {
    slug: "modernize-a-legacy-system",
    title: "Modernize a Legacy System",
    icon: "server",
    description:
      "Replace a fragile, hard-to-change system with an architecture your team can extend confidently, migrated without stopping the business.",
    relatedServiceSlugs: ["product-engineering", "continuous-support"],
  },
  {
    slug: "build-a-mobile-app",
    title: "Build a Mobile App",
    icon: "smartphone",
    description:
      "Reach customers on iOS and Android from a single engineering effort, or go fully native where performance demands it.",
    relatedServiceSlugs: ["mobile-engineering"],
  },
  {
    slug: "sell-online",
    title: "Sell Online",
    icon: "shopping-bag",
    description:
      "A storefront built around checkout speed and mobile conversion, not just a product catalog with a cart bolted on.",
    relatedServiceSlugs: ["digital-experience", "growth"],
  },
  {
    slug: "add-ai-to-your-product",
    title: "Add AI to Your Product",
    icon: "sparkles",
    description:
      "Practical AI integration grounded in your real data and workflows — not a chatbot bolted onto the homepage.",
    relatedServiceSlugs: ["ai-automation"],
  },
  {
    slug: "get-found-and-convert",
    title: "Get Found and Convert",
    icon: "trending-up",
    description:
      "Technical SEO and growth work grounded in the same engineering rigor as the product itself.",
    relatedServiceSlugs: ["growth"],
  },
];

// Real projects publicly listed on the original searchnplays.com/portfolio
// page (verified by direct inspection), cited here for research accuracy —
// not reproduced as this redesign's own client work. Where the original
// listing named a live domain, it's linked as an external reference; entries
// without a public URL (mobile-only apps, logo-only graphics work) are
// listed as plain text. See docs/PROJECT_OVERVIEW.md for the full rationale.
export const REAL_PORTFOLIO_COUNT = 24; // total listed entries: 6 graphics + 10 apps + 8 websites

export interface RealPortfolioEntry {
  name: string;
  type: string;
  url?: string;
}

export const REAL_PORTFOLIO_REFERENCE: RealPortfolioEntry[] = [
  { name: "Vivan Seva Sansthan", type: "Nonprofit · logo & website", url: "https://vivansevasansthan.com" },
  { name: "FarmingWave", type: "Agriculture marketplace · logo & website", url: "https://farmingwave.com" },
  { name: "GoAid", type: "Emergency services · logo, website & apps", url: "https://goaid.in" },
  { name: "CodeBreeders", type: "Logo & website", url: "https://codebreeders.in" },
  { name: "Houzzworks", type: "Real estate · website", url: "https://houzzworks.co.in" },
  { name: "SgMegaStore", type: "Retail · website", url: "https://sgmegastore.com" },
  { name: "Ag-Electronics", type: "Logo & website", url: "https://ag-electronics.de" },
  { name: "Niche Webtech", type: "Website" },
  { name: "KanhaShantiVanam", type: "Website" },
  { name: "Lambhkarna", type: "Logo" },
  { name: "Sudoku", type: "Android app" },
  { name: "WhatScanner", type: "Android app" },
  { name: "Byaj Calculator", type: "Android app" },
  { name: "Color Picker", type: "Android app" },
  { name: "ePaper", type: "Android app" },
  { name: "Holi Wishes: Holi Shyari", type: "Android app" },
  { name: "Supreme Technocom", type: "Android app" },
  { name: "LIPO: MLM App", type: "Android app" },
];
