# Search N Play — Redesign Concept

> **This is an independent interview/demo redesign concept inspired by publicly available
> information about Search N Play (searchnplays.com). It is not the official Search N Play
> website, is not affiliated with or endorsed by the company, and does not reproduce its
> source code or design assets.** See [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md)
> for the full audit, design rationale, and disclosures (including why portfolio and
> testimonial content is original demonstration content rather than real client data).

A full-stack concept redesign positioning Search N Play as a modern **digital product
engineering and growth partner** — SaaS, web, mobile, AI/automation, and growth work,
backed by a real Next.js + Go + PostgreSQL application (not a static mockup).

## Stack

| Layer      | Technology                                                        |
| ---------- | ------------------------------------------------------------------ |
| Frontend   | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion |
| Backend    | Go (stdlib `net/http`, no router dependency), layered handlers/services/repositories |
| Database   | PostgreSQL (optional — an in-memory store is used automatically if unconfigured) |
| Deployment | Docker + `docker-compose` for a one-command full-stack run          |

See [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md) for the audit of the original
site, the design system, and the reasoning behind these choices (including why Go, why
PostgreSQL is optional, and why the portfolio is original demo content).

## Project structure

```
/
├── frontend/          Next.js app (pages, components, API client)
├── backend/            Go API server
│   ├── cmd/server/     Entrypoint
│   ├── internal/       config, handlers, services, repository (memory + postgres), middleware, models
│   └── migrations/     SQL migrations, applied automatically on startup
├── docker-compose.yml  Postgres + backend + frontend, one command
└── docs/
    └── PROJECT_OVERVIEW.md   Audit, design system, architecture, and interview notes
```

## Prerequisites

- Node.js 20+ and npm
- Go 1.24+
- PostgreSQL 14+ (**optional** — see below)

## Quick start (no database required)

The backend runs with a built-in in-memory store when `DATABASE_URL` isn't set, so you can
run the full site with zero database setup.

**Terminal 1 — backend:**

```bash
cd backend
cp .env.example .env   # optional, defaults already work
go run ./cmd/server
# -> listening on :8080, using in-memory storage
```

**Terminal 2 — frontend:**

```bash
cd frontend
npm install
cp .env.example .env.local   # optional, defaults already work
npm run dev
# -> http://localhost:3000
```

Open http://localhost:3000. The contact form, project estimator, newsletter sign-up, and
the services/portfolio/testimonials sections are all live against the Go API.

## Running with PostgreSQL

```bash
createdb searchnplay   # or use docker-compose, below
```

Set `DATABASE_URL` in `backend/.env`:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/searchnplay?sslmode=disable
```

Migrations (schema + seed content) apply automatically on server startup — no separate
migration command to run. To roll back manually, the corresponding `*.down.sql` files are
in `backend/migrations/`.

## Running everything with Docker

```bash
docker compose up --build
```

This starts PostgreSQL, the Go API (migrated automatically), and the Next.js frontend
(production build) on `localhost:3000` / `localhost:8080`.

## Environment variables

See `backend/.env.example` and `frontend/.env.example` for the full, commented list.
Everything has a working default for local development — nothing is required to get the
site running.

| Variable (backend)       | Purpose                                              | Default                 |
| ------------------------- | ----------------------------------------------------- | ------------------------ |
| `DATABASE_URL`             | PostgreSQL connection string                          | unset → in-memory store |
| `PORT`                     | API listen port                                       | `8080`                  |
| `ALLOWED_ORIGINS`          | Comma-separated CORS allow-list                       | `http://localhost:3000` |
| `RATE_LIMIT_RPS` / `_BURST`| Per-IP rate limit on public write endpoints           | `2` / `10`               |

| Variable (frontend) | Purpose                                                     | Default                 |
| -------------------- | ------------------------------------------------------------ | ------------------------ |
| `GO_API_URL`          | Backend base URL (SSR fetches + `/api/*` rewrite proxy)      | `http://localhost:8080` |
| `SITE_URL`            | Public origin for metadata/OG/sitemap                        | `http://localhost:3000` |
| `SCHEDULING_URL`      | External link for "Book a Discovery Call" (optional)          | unset → in-page fallback |

## API reference

All responses are wrapped as `{ "data": ..., "requestId": "..." }` on success or
`{ "error": { "code", "message", "fields" }, "requestId": "..." }` on failure.

| Method | Path                | Description                                    |
| ------ | ------------------- | ----------------------------------------------- |
| GET    | `/api/health`        | Liveness + database status                      |
| GET    | `/api/services`      | Services catalog                                |
| GET    | `/api/projects`      | Portfolio / case studies                        |
| GET    | `/api/testimonials`  | Testimonials                                    |
| POST   | `/api/contact`       | Submit a lead (rate-limited)                    |
| POST   | `/api/estimate`      | Compute an indicative project estimate (rate-limited) |
| POST   | `/api/newsletter`    | Subscribe an email (rate-limited)               |

Example:

```bash
curl -X POST http://localhost:8080/api/estimate \
  -H "Content-Type: application/json" \
  -d '{"projectType":"saas","platforms":["web"],"featureScope":"growth","designLevel":"custom","integrations":["auth"],"aiRequirement":"assistive","supportLevel":"standard"}'
```

## Testing

```bash
# Backend — handler, validation, and estimator-logic tests
cd backend && go test ./...

# Frontend — component tests (Vitest + React Testing Library)
cd frontend && npm test
```

## Build commands

```bash
# Backend binary
cd backend && go build -o bin/server ./cmd/server

# Frontend production build
cd frontend && npm run build && npm start
```

## Production deployment notes

- The backend is a single static-ish Go binary (see `backend/Dockerfile`) — deployable to
  any container platform (Cloud Run, ECS, Fly.io, a plain VM) behind a process manager.
- The frontend builds via `output: "standalone"` (see `frontend/Dockerfile`) for a minimal
  container image.
- Point `GO_API_URL` (frontend) at the backend's public URL, and `ALLOWED_ORIGINS`
  (backend) at the frontend's public URL.
- Put a reverse proxy / load balancer in front of the backend in production for TLS
  termination; the app itself does not terminate TLS.
- Rate limiting here is in-memory and per-instance — a multi-instance deployment should
  move it to Redis (noted as a future improvement in `docs/PROJECT_OVERVIEW.md`).

## Disclosures

- Portfolio case studies and testimonials are **original demonstration content**, flagged
  `isDemo: true` in the API response — not documented outcomes for a real, named client.
  See `docs/PROJECT_OVERVIEW.md` for why.
- Contact details in the footer are illustrative (a placeholder `.example` email address
  and a general location), not a working channel to the real Search N Play business.
- No company statistics, awards, employee counts, or client names are fabricated anywhere
  in the copy or structured data.
