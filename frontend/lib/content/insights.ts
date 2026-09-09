export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  publishedLabel: string;
  body: string[];
}

// Original articles written for this project — not reproduced from any
// third-party source. Kept short and practical rather than padded for
// length.
export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    slug: "saas-mvp-vs-custom-build",
    title: "Choosing Between a Lean MVP and a Custom Build",
    excerpt:
      "The right starting scope depends on which kind of risk you're carrying: whether people want this, or whether it can be built well enough to matter.",
    readingTime: "5 min read",
    publishedLabel: "Product strategy",
    body: [
      "Most early-stage product decisions get framed as a budget question — how much can we spend before we know if this works? That framing is useful but incomplete. The more reliable question is which kind of risk dominates the project: validation risk or execution risk.",
      "Validation risk means you're not yet sure people want what you're planning to build. If that's the dominant risk, the right move is a narrow, fast, deliberately incomplete build — a lean MVP focused on the one workflow that tests the core assumption. Everything else, including polish, edge cases, and secondary features, can wait. Spending six months on infrastructure before anyone has used the product is the classic failure mode here.",
      "Execution risk means the demand is already reasonably well understood — you have paying customers, a clear operational problem, or a contractual requirement — and the open question is whether the system can be built reliably at the scope and quality the situation demands. In that case, under-investing in architecture is the expensive mistake, not the safe one. A rushed foundation under real operational load tends to cost more in year two than it saved in month one.",
      "In practice, most projects are a mix, and the mix changes over time. A common, sensible pattern: start narrow to resolve validation risk, but make the small number of architecture decisions that are expensive to reverse later — data model shape, authentication approach, how services will eventually separate — deliberately, even while the rest of the build stays intentionally minimal.",
      "The estimator on this site reflects that split: feature scope and design depth drive most of the near-term cost, while integrations, platform count, and AI requirements are the choices that most often turn a lean build into a longer one. Worth checking before committing to either extreme.",
    ],
  },
  {
    slug: "what-makes-an-api-production-ready",
    title: "What Makes an API Production-Ready",
    excerpt:
      "A working endpoint and a production-ready one differ in what happens when a client sends something unexpected, or when the service is under load.",
    readingTime: "6 min read",
    publishedLabel: "Engineering",
    body: [
      "It's straightforward to make an endpoint that returns the right JSON for the happy path. Production readiness is mostly about everything adjacent to that: what happens on bad input, on partial failure, under load, and six months later when the contract needs to change.",
      "Input validation belongs at the boundary, not scattered through business logic. Every field a client can send should be checked for presence, shape, and allowed values before it touches a service or a database, with error responses specific enough that a client can actually fix the request — a generic 400 with no detail just moves the debugging burden onto whoever integrates with you.",
      "Error responses need a consistent shape across the entire API: a machine-readable code a client can branch on, a human-readable message, and — for validation failures — a field-level breakdown. Mixing plain strings, stack traces, and structured errors across different endpoints turns every new integration into a one-off investigation.",
      "Rate limiting on public write endpoints isn't optional once real traffic arrives, and it needs to fail with a clear, retryable status rather than a generic server error. The same goes for request size limits — an API that will decode an arbitrarily large body is one slow client away from an incident.",
      "Observability has to exist before the incident, not get added during it. A request ID that's generated at the edge, threaded through every log line, and echoed back to the client turns a support ticket that says 'it didn't work' into a specific, searchable trace.",
      "Finally, backward compatibility is a design constraint, not an afterthought: additive changes are cheap, but removing or renaming a field a client depends on is a breaking change no matter how it's documented. Versioning the contract, even informally, is far cheaper than coordinating a synchronized deploy with every consumer.",
    ],
  },
  {
    slug: "estimating-software-projects",
    title: "A Practical Framework for Estimating Software Projects",
    excerpt:
      "Most estimates fail for the same handful of reasons. Naming the actual complexity drivers up front produces a far more honest range than padding a guess.",
    readingTime: "5 min read",
    publishedLabel: "Delivery",
    body: [
      "Software estimates have a bad reputation because most of them are really just a hopeful guess with a professional-looking range attached. The fix isn't a more sophisticated formula — it's being explicit about which factors actually drive effort, so the estimate can be reasoned about instead of just trusted or distrusted wholesale.",
      "In our experience, six factors explain most of the variance: the base shape of the project (a marketing site and a multi-role SaaS platform are different problems before a single feature is discussed), how many platforms it needs to run on, the depth of the feature set, how custom the design needs to be, how many external systems it has to integrate with, and whether AI capability is involved. Support level matters too, but mostly for ongoing cost rather than initial timeline.",
      "Each of those factors interacts with the others rather than simply adding up. Two platforms with a shared cross-platform codebase cost far less than two fully native builds. A single, well-chosen integration is routine; four or five, each with their own auth model and failure modes, tend to dominate the schedule regardless of how simple the rest of the product is.",
      "This is exactly the model behind the estimator on this site: each answer maps to a complexity weight, the weights combine into a score, and the score maps to a timeline band and a suggested team shape. It's deliberately simple enough to reason about — you can see why a given answer moved the number — which matters more for a first estimate than false precision.",
      "The honest caveat, repeated because it's easy to skip past: any estimate produced without a conversation is a starting point for scoping, not a quotation. Its real value is turning 'how long will this take' into a structured discussion about which specific choices are driving the number, so the trade-offs are visible before they're made instead of after.",
    ],
  },
];

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return INSIGHT_ARTICLES.find((article) => article.slug === slug);
}
