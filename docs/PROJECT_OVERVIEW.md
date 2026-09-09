# Project Overview

**This is an independent interview/demo redesign concept inspired by publicly available
information about Search N Play (searchnplays.com). It is not the official Search N Play
website, is not affiliated with or endorsed by the company, and does not copy its
proprietary source code or design assets.**

This document explains what I found when auditing the original site, the decisions I made
in redesigning it, and the engineering behind the result — written as the case for the
work, not a critique of the company.

---

## 1. What I observed about the original site

Search N Play (SNP Infotech, Jaipur) is a small web/app/marketing agency serving local
small-to-medium businesses. From the homepage, service pages, and portfolio:

- **Services**: web design & development, mobile app development (Android/iOS), digital
  marketing (SEO/SEM, social), graphics/logo design, support & maintenance, and camera &
  security system installation.
- **Positioning**: "combine tech expertise and business intelligence," price-competitive,
  process-driven, long-term support relationships.
- **Real portfolio breadth**: 24 listed projects across graphics, apps, and websites —
  spanning a nonprofit (Vivan Seva Sansthan), an agricultural marketplace (FarmingWave), an
  ambulance-booking service (GoAid, split into partner/user apps), retail (SgMegaStore),
  and utility apps (Sudoku, a currency/interest calculator).
- **Real testimonials**: five named local customers, generally positive but generic
  ("great service," "highly recommend") without specifics.
- **Technology**: no stack is disclosed anywhere on the site.

### Problems and opportunities

- The homepage's own stat counters (Projects, Awards, Clients, Customers) all render as
  **"0"**, directly beside a claim of "1200+ websites hosted" — an internal contradiction
  visible to any visitor.
- Several portfolio links point to `#` (dead), and copy contains typos ("andriod",
  "pening") and inconsistent branding ("Search N Play" vs. "SNP Infotech").
- FAQ answers are Lorem-Ipsum-style placeholder text ("Far far away, behind the word
  mountains...") — a clear miss for a section meant to build trust.
- No technology stack, process, or engineering rationale is presented anywhere — a visitor
  evaluating the company for a serious product build has nothing to go on.
- The design reads as a generic, template-driven agency site: stock-photo styling, dense
  unstructured sections, no clear information hierarchy or conversion path.
- Camera/security installation sits in the same service list as SaaS-adjacent work,
  diluting the positioning rather than sharpening it.

### What to keep

- The *breadth* of real capability (web, mobile, design, marketing, support) is genuine
  and worth keeping — the redesign doesn't invent new competencies, it organizes and
  presents the existing ones more credibly, and adds product-engineering framing
  (SaaS, APIs, AI) as an explicit *capability*, not a false claim about the company's history.
- The long-term-support and transparent-process themes in the original copy are honest
  differentiators worth keeping and sharpening rather than discarding.

---

## 2. Design decisions

- **Visual identity**: dark by default — a near-black ink background (not pure black), a
  single confident cobalt accent, and a sparing warm amber for highlights. An earlier pass
  alternated light and dark sections; after reviewing a working build, that read as
  inconsistent rather than intentional, so the hero's dark, dashboard-style language was
  extended to every page instead — one visual system, not two competing ones.
- **Light/dark theme toggle**: every color in the design system is a CSS custom property
  (`--color-paper`, `--color-ink`, the slate text scale, `--surface-1..7`/`--border-1..6`
  "glass" tokens) rather than a literal value, so a `[data-theme="light"]` override in
  `globals.css` can redefine the whole palette — including reversing the slate ramp so a
  given step keeps the same *role* (e.g. "the standard muted-text gray") instead of
  becoming illegibly pale — with no per-component branching. The toggle in the navbar
  (`ThemeToggle`/`ThemeProvider`) flips a `data-theme` attribute on `<html>`, persists the
  choice to `localStorage`, and syncs across tabs. A blocking inline script runs before
  hydration to apply the stored preference immediately, avoiding a flash of the wrong
  theme; `ThemeProvider` still renders `DEFAULT_THEME` on its first pass to match the
  server, then self-corrects from the DOM in a layout effect right after mount. A few
  purely decorative elements — the hero's "product dashboard" mockup and its floating
  status badges — are deliberately exempt: they represent a fixed illustration/screenshot
  rather than page chrome, so their colors stay hardcoded dark literals and don't shift
  with the toggle, the same way a screenshot embedded in a light-mode doc wouldn't.
- **Typography**: Sora for display/headings (geometric, confident), Inter for body/UI
  (maximally legible), JetBrains Mono for the few technical/label moments.
- **Real data, and real brand marks by reference, not re-hosted photos**: the homepage's
  "Why Choose Us" cards and stat counters (767 Projects, 3 Awards Won, 300 Hosting
  Clients, 600 Satisfied Customers, "1,200+ websites hosted") are reproduced from the
  real searchnplays.com homepage, with the site owner's permission, for this non-public
  practice build — see the Disclosures section for the full context. The real-portfolio
  citation list on `/work` shows each named business's own favicon, fetched live from
  Google's public favicon service rather than downloaded and stored by this project —
  a real, verifiable brand mark shown by reference, not a redistributed copy of anyone's
  source image files.
- **Everything visual is coded, except real photos in three places**: the hero's
  "product dashboard" mockup, the floating status badges, and the architecture diagram
  are all CSS/SVG/Framer Motion, not fetched images — nothing there is ever a broken
  `<img>` link. The deliberate exceptions are the six demo case studies' cover art on
  `/work`, each Insights article's header image, and one atmospheric workspace photo
  behind the closing CTA banners (home and About) — real, freely-licensed photos,
  self-hosted in `public/images/work/`, `public/images/insights/`, and
  `public/images/misc/` rather than hotlinked. The case study and article photos are
  shown in natural color; the CTA banner photo sits behind a fixed dark scrim regardless
  of site theme, since it's mood/atmosphere rather than a subject in its own right, and
  it deliberately shows an empty, generic office with no people and no readable
  signage — never implying it's a photo of this company's real office. All of this was
  chosen deliberately over the About page's body content or testimonials: a case study
  is clearly labeled fictional, a generic editorial photo on a blog post makes no
  factual claim, and an empty generic office used purely as a mood backdrop makes no
  claim either — but a stock "team" photo on the About page (which describes the real
  company) or a fabricated face next to a fictional testimonial quote would misrepresent
  something as real that isn't. Every photo is licensed for free commercial reuse
  (Unsplash License, Pexels License, or public domain) with no attribution legally
  required; sources and photographers are credited below anyway, on principle.

  | Page | Photographer | Source | License |
  |---|---|---|---|
  | Work — Meridian Health | Vitaly Gariev | [Unsplash](https://unsplash.com/photos/egCFrNJ6Djw) | Unsplash License |
  | Work — HarvestLink | Erik (@erkx) | [Unsplash](https://unsplash.com/photos/oHSmhHK-BB0) | Unsplash License |
  | Work — SwiftAid | RDNE Stock project | [Pexels](https://www.pexels.com/photo/6520105/) | Pexels License |
  | Work — Vantage Goods | Centre for Ageing Better | [Unsplash](https://unsplash.com/photos/ZlOlRnWk8zU) | Public Domain / Unsplash License |
  | Work — OpenHands | RDNE Stock project | [Pexels](https://www.pexels.com/photo/6647026/) | Pexels License |
  | Work — Ledgerly | Lyubomyr Reverchuk | [Unsplash](https://unsplash.com/photos/rtD_lcsN6_U) | Unsplash License |
  | Insights — Lean MVP vs. Custom Build | Vitaly Gariev | [Unsplash](https://unsplash.com/photos/euNzbqwIIUI) | Unsplash License |
  | Insights — API Production-Ready | Abu Saeid | [Unsplash](https://unsplash.com/photos/fdGTi4IcaJc) | Unsplash License |
  | Insights — Estimating Software Projects | Jess Bailey | [Pexels](https://www.pexels.com/photo/1558691/) | Pexels License |
  | CTA banners — workspace backdrop | Bernd Dittrich | [Unsplash](https://unsplash.com/photos/pYlBAu3de0w) | Unsplash License |
- **3D depth via CSS transforms, not a 3D library**: the hero mockup and each portfolio
  cover tilt toward the cursor (Framer Motion `rotateX`/`rotateY` driven by pointer
  position, spring-smoothed), and the hero's floating badges counter-parallax at a
  smaller magnitude so they read as sitting above the card rather than glued to it. Both
  fall back to a static, untilted state under `prefers-reduced-motion`. No WebGL/Three.js
  — Framer Motion was already a dependency, so this added no new runtime weight.
- **Motion**: scroll-triggered reveals and a handful of hero micro-interactions, all built
  through two small primitives (`Reveal`, `useCountUp`) rather than animation sprinkled
  ad hoc, and all gated behind `prefers-reduced-motion`.

## 3. UX improvements

- A single, clear primary path — **Start a Project** — appears in the nav, hero, and every
  major section's closing CTA, instead of the original's scattered "Request a Quote"
  buried in navigation.
- The **information architecture** was restructured around how a buyer actually evaluates
  a technology partner: what you do (Services) → what outcome you need (Solutions) → proof
  (Work) → how it happens (Process) → who's doing it (About) → talk to us (Contact) —
  rather than the original's flat service-list-plus-blog structure. Process is a real,
  addressable page (`/process`), not a homepage anchor — an earlier version scrolled the
  homepage to a `#process` section, which read as "the same page" rather than a distinct
  stop in the nav.
- The **homepage itself is deliberately short** — seven sections (hero, stats, services,
  work, architecture, testimonials, closing CTA), not an eleven-section scroll. Process,
  the full "why choose us" grid, and the technology list all earn a real page (`/process`,
  `/about`) instead of padding the homepage; a first-time visitor should be able to
  understand the offer and act without an extended scroll.
- Every service links to a real detail page with concrete capabilities, not just a card;
  every portfolio entry opens a real case study (Challenge → Strategy → Design →
  Engineering → Outcome), not a lightbox image.
- Loading, empty, and error states are real, not theoretical: stop the Go backend and
  reload any content page (in `next dev`) to see the graceful degradation rather than a
  crash — see [Section 11](#11-performance-considerations) for why this isn't the default
  in a production build.

## 4. Business improvements

- Repositions the company as a **digital product engineering and growth partner** capable
  of SaaS/product work, not just "cheap local web development" — a materially different
  (and more defensible) market position, presented as a *capability*, not a fabricated
  history.
- Introduces a **project estimator** as a genuine lead-qualification tool: it gives a
  prospect something interactive to do on the first visit and gives the business
  structured intake data (scope, platforms, integrations, AI need, budget signal) before
  the first call. Its timeline bands (2-4 weeks up to 14-22 weeks, by complexity tier —
  `complexityBand` in `backend/internal/services/estimate_service.go`) assume an
  AI-assisted delivery pace rather than pre-AI-era estimates, since scaffolding,
  boilerplate, and tests are meaningfully faster to produce with current tooling. The
  paired cost range is priced in INR for this business's actual market — a Jaipur-based
  team — rather than a mechanical USD-to-INR conversion, and is bounded to a firm
  ₹10,000 floor and ₹2,00,000 ceiling across every tier (`complexityBand` in the same
  file), so no combination of answers can quote outside that range; cost intentionally
  does *not* compress at the same rate as the timeline, since it still pays for the same
  people's judgment on design, integration, and review, just applied over a shorter
  calendar span — cost and calendar time are related but not the same lever.
- The estimator captures **name, phone, and email before showing the questionnaire**,
  submitted immediately through the same `/api/contact` pipeline the main contact form
  uses (tagged `source: "estimator"` — no new endpoint or table needed). This means a
  real, usable lead exists even if someone abandons the questionnaire partway through,
  rather than the business only finding out about interest from a fully completed
  submission.
- **Phone is a required, validated 10-digit Indian mobile number everywhere it's
  collected** (the contact form and the estimator gate) — not just non-empty, but
  actually shaped like a real number: exactly 10 digits, starting 6-9 per the TRAI
  numbering plan, and rejecting obviously-fake placeholders like `0000000000` or
  `1234567890` (`IsIndianMobile` in `backend/internal/validation`, mirrored in
  `frontend/lib/phone.ts` so the UI gives the same answer instantly rather than waiting
  on a round trip — though the backend re-validates regardless, since client-side checks
  are bypassable). The input also actively strips non-digit keystrokes as you type, so
  it's not just that letters fail validation — they can't be typed into the field at all.
- Replaces vague service blurbs with specific, checkable capability lists, which shortens
  the sales conversation to the parts that actually need a human.

## 5. Technical architecture

```
Browser
  │
  ▼
Next.js (React Server Components + Client Components)
  │  server-side fetch (SSR)          │  client fetch via /api/* rewrite
  ▼                                    ▼
Go API (net/http, Go 1.22+ method-pattern routing)
  │  middleware chain: request ID → logging → recover → security headers → CORS → body limit
  ▼
Services layer (validation + business logic, e.g. the estimator's scoring)
  │
  ▼
Repository interfaces  ──┬── in-memory (default, zero config)
                          └── PostgreSQL (pgx/v5, when DATABASE_URL is set)
```

- **Frontend**: Next.js 16 App Router, React Server Components fetch content
  (services/portfolio/testimonials) directly from the Go API at render time; interactive
  pieces (contact form, estimator, newsletter, nav, carousels) are Client Components.
  `next.config.ts` rewrites `/api/*` to the Go API so browser code never deals with CORS.
- **Backend**: a layered Go service — `handlers` (HTTP concerns only) → `services`
  (validation + business logic) → `repository` (an interface, with in-memory and Postgres
  implementations). Handlers never touch SQL; services never touch `net/http`.
- **Why this split**: it's the smallest structure that keeps the storage backend a
  startup-time decision (see `cmd/server/main.go`) rather than something scattered through
  the codebase, and it makes the estimator's scoring logic (the most "business logic"-heavy
  part of the app) independently unit-testable with no HTTP or database involved at all.

## 6. Why Go for the backend

- **Fast, boring, and predictable** for a request/response JSON API — no framework magic
  to explain in an interview, which is itself a point in its favor.
- **Go 1.22+'s enhanced `net/http.ServeMux`** (method-specific patterns like
  `"POST /api/contact"`) made a third-party router unnecessary — one fewer dependency, and
  a deliberate signal of using the current standard library rather than defaulting to
  a framework out of habit.
- **A single static-ish binary** deploys trivially (see `backend/Dockerfile`) — no runtime,
  no dependency tree to ship.
- **Strong concurrency primitives** made the per-IP rate limiter (`golang.org/x/time/rate`
  behind a mutex-guarded map) straightforward to write correctly and cheaply.

## 7. API architecture

- A single JSON envelope for every response: `{"data": ...}` on success,
  `{"error": {"code","message","fields"}}` on failure, both carrying a `requestId` that's
  generated (or forwarded) by middleware and echoed in the `X-Request-ID` header — so a
  support conversation about "it didn't work" can be tied to one server log line.
- Field-level validation errors (`error.fields`) let the frontend highlight the exact
  input instead of showing one generic message.
- Read endpoints (`GET /api/services|projects|testimonials`) are separated from write
  endpoints (`POST /api/contact|estimate|newsletter`); only writes are rate-limited, since
  they're the ones a script could otherwise hammer or spam.
- `POST /api/estimate` is deliberately stateless — no persistence, no PII required — since
  its whole job is a pure computation over the submitted answers.

## 8. Database design

Five tables, created and seeded by two SQL migrations applied automatically on server
startup (a small hand-rolled runner tracks applied migrations in `schema_migrations` —
see `backend/internal/db/migrate.go` — so a fresh clone needs no separate CLI tool):

- `contacts`, `newsletter_subscribers` — user-submitted, append-only.
- `services`, `projects`, `testimonials` — content, read-only from the API's perspective,
  seeded via migration and structurally identical to the in-memory fallback's seed data.
- IDs are `TEXT` (application-generated UUID strings for submissions, readable slugs for
  seeded content) rather than the native `UUID` type, so no Postgres extension is required.
- `testimonials.project_id` is a nullable FK to `projects.id` (`ON DELETE SET NULL`) —
  a testimonial can reference a case study without the relationship being mandatory or
  fragile to deletion order.

**Why PostgreSQL is optional, not simulated**: rather than mocking a database in a demo
mode, the same repository *interface* has two real implementations (`internal/repository/memory`
and `internal/repository/postgres`), selected once at startup based on whether
`DATABASE_URL` is set. Nothing about the handlers or services changes based on which one is
active — which is also what makes it easy to reason about correctness of either.

## 9. Security considerations

- All public write endpoints are rate-limited per IP (token bucket, configurable via
  `RATE_LIMIT_RPS`/`RATE_LIMIT_BURST`).
- Request bodies are capped (`MAX_REQUEST_BODY_BYTES`, default 1 MiB) via
  `http.MaxBytesReader`.
- CORS is an explicit allow-list (`ALLOWED_ORIGINS`), not a wildcard.
- A baseline security header set is applied to every response (`X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, a strict `Content-Security-Policy` appropriate for
  a JSON-only API, `Cache-Control: no-store`).
- Panics are recovered centrally and logged server-side with a request ID; the client only
  ever sees a generic `INTERNAL_ERROR` — no stack traces or internal error strings leak out.
- All SQL is parameterized (`pgx` placeholders) — no string-built queries anywhere.
- No secrets are committed; both `.env.example` files document every variable without
  real values.

## 10. Performance considerations

- The frontend avoids all external image requests (see [Section 2](#2-design-decisions)),
  which removes a common source of layout shift and slow LCP on marketing sites.
- Content pages (home, services, portfolio) fetch from the Go API at render time but have
  **no runtime dependency on request-time state** (no cookies/headers/search params), so
  Next.js statically optimizes them at build time — the production build bakes in a
  snapshot of the catalog rather than hitting the API on every request. This is a
  deliberate trade-off: better Core Web Vitals and lower runtime load for content that
  changes infrequently, at the cost of needing a rebuild to reflect a catalog change.
  `next dev` (what this project is run with day to day) re-fetches on every request, so
  the resilience/error-state code paths are fully exercisable there.
- Fonts load via `next/font` (self-hosted, no render-blocking third-party font request).
- The estimator and contact form are Client Components; everything else on their pages
  stays server-rendered, keeping the client JS bundle scoped to where it's needed.

## 11. SEO strategy

- Per-page `Metadata` (title template, description, canonical URL) on every route,
  including generated detail pages (`generateMetadata` for services/projects/insights).
- A code-generated Open Graph image and favicon (`app/opengraph-image.tsx`, `app/icon.tsx`
  via `next/og`) — consistent branding with no external asset to go stale or 404.
- `app/sitemap.ts` enumerates every static route plus every service, project, and insight
  slug from live data; `app/robots.ts` points crawlers at it.
- JSON-LD structured data: `Organization` and `WebSite` site-wide, `Service` on each
  service detail page. **`LocalBusiness` is deliberately omitted** — that schema is only
  honest with a real, verifiable address and phone number, and this project intentionally
  doesn't reuse the real company's contact details (see disclosures below), so emitting
  fabricated `LocalBusiness` structured data would be worse than omitting it.
- Semantic HTML and a heading hierarchy throughout; a skip-to-content link for keyboard
  users, who are also part of the SEO/accessibility overlap story.

## 12. Scalability strategy

- The repository-interface pattern means moving from Postgres to a read replica, or adding
  a caching layer in front of the catalog reads, touches one file, not the handlers.
- The rate limiter is in-memory and per-instance by design for this demo's scale; a
  multi-instance production deployment would move it to Redis (see below) — the
  `IPRateLimiter` type is already isolated behind an interface-shaped `Limit` middleware,
  so that swap doesn't touch calling code.
- Stateless services (contact, estimate, newsletter) mean the Go API can scale
  horizontally behind a load balancer with no session affinity required.
- Static generation of content pages (see [Section 10](#10-performance-considerations))
  means most traffic never reaches the Go API at all in production.

## 13. Future improvements

- Redis-backed rate limiting and caching for a multi-instance deployment.
- An admin surface for editing the services/projects/testimonials catalog directly
  (the backend's layering was chosen specifically so this doesn't require restructuring —
  see [Section 5](#5-technical-architecture)).
- Authenticated access to submitted leads (currently write-only from the API's
  perspective — there's no `GET /api/contacts` endpoint by design).
- Real analytics/attribution on the estimator and contact funnel.
- E2E tests (Playwright) alongside the current unit-level Go and Vitest suites.

---

## Why this redesign is better

| | Original experience | Proposed experience |
|---|---|---|
| Positioning | Generic local web/app agency | Digital product engineering & growth partner |
| Homepage trust signals | Stat counters showing "0"; contradicted by copy | No fabricated statistics; trust built on specific, checkable claims |
| Technology | Never disclosed | Explicit "Technology We Work With" section, framed as capability |
| Portfolio | 24 items, several dead links, no outcomes described | 6 in-depth case studies (Challenge → Strategy → Design → Engineering → Outcome), clearly flagged as demonstration content |
| Lead capture | A single "Request a Quote" link | Contact form + interactive project estimator + discovery-call path |
| FAQ / content quality | Placeholder Lorem Ipsum answers | Three original, substantive articles grounded in the estimator's own logic |
| Engineering visibility | None | A dedicated "Engineering Behind the Experience" section, plus this document |
| Accessibility / performance | Not evaluated by design | Reduced-motion support, semantic HTML, no external images, static-optimized content pages |

## Disclosures

- **Portfolio and testimonials are original demonstration content.** Their category mix
  (healthcare operations, agri-marketplace, mobile dispatch, e-commerce, nonprofit
  branding, technical SEO) is informed by the real breadth found in Search N Play's public
  portfolio, but the names, narratives, and outcomes are illustrative — not documented
  results for a real, named client. Every entry is flagged `isDemo: true` in the API
  response, not just in prose. I made this call because I have no verified data on the
  real projects' actual outcomes, and inventing specific results for real third-party
  businesses would misrepresent them even if the SNP–client pairing is real.
- **Testimonials use a role/context attribution (e.g., "Operations Lead, Regional
  healthcare network") rather than an invented personal name**, and are explicitly marked
  as demonstration content in the UI — to avoid reusing a real person's name in an
  endorsement of an unofficial project, while still reading naturally.
- **Footer contact details are illustrative**, not the real company's phone, email, or
  WhatsApp — reusing those on an independent, unofficial project risked misdirecting real
  inquiries or confusing real customers. The general location (Jaipur, Rajasthan) is kept
  as accurate, harmless context.
- No employee names, company statistics, awards, or revenue figures are **fabricated**
  anywhere in this project.
- **The homepage "Why Choose Us" cards and the four headline stats (767 Projects, 3
  Awards Won, 300 Hosting Clients, 600 Satisfied Customers, "1,200+ websites hosted")
  are reproduced from the real searchnplays.com homepage**, with the site owner's
  permission for this non-public practice build, and with only light copy-editing for
  grammar. These are the original company's self-published figures — this project has
  not independently audited them — carried over here because they're the specific
  content this build is meant to reflect, not because they were computed or verified
  from scratch. If this project is ever deployed publicly rather than run privately,
  that context should travel with the numbers.
