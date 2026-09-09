-- Core schema for the Search N Play redesign demo backend.
-- IDs are plain TEXT (application-generated UUID strings for user-submitted
-- rows, readable slugs for seeded content) rather than the native UUID type,
-- so no extra Postgres extension is required to run this locally.

CREATE TABLE IF NOT EXISTS contacts (
    id           TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    company      TEXT NOT NULL DEFAULT '',
    email        TEXT NOT NULL,
    phone        TEXT NOT NULL DEFAULT '',
    service      TEXT NOT NULL DEFAULT '',
    budget_range TEXT NOT NULL DEFAULT '',
    message      TEXT NOT NULL,
    source       TEXT NOT NULL DEFAULT '',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id         TEXT PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
    id           TEXT PRIMARY KEY,
    slug         TEXT NOT NULL UNIQUE,
    category     TEXT NOT NULL,
    name         TEXT NOT NULL,
    summary      TEXT NOT NULL,
    description  TEXT NOT NULL,
    capabilities TEXT[] NOT NULL DEFAULT '{}',
    icon         TEXT NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
    id           TEXT PRIMARY KEY,
    slug         TEXT NOT NULL UNIQUE,
    name         TEXT NOT NULL,
    category     TEXT NOT NULL,
    tagline      TEXT NOT NULL,
    summary      TEXT NOT NULL,
    challenge    TEXT NOT NULL,
    strategy     TEXT NOT NULL,
    design_notes TEXT NOT NULL,
    engineering  TEXT NOT NULL,
    outcome      TEXT NOT NULL,
    tech_stack   TEXT[] NOT NULL DEFAULT '{}',
    accent_color TEXT NOT NULL DEFAULT 'indigo',
    is_demo      BOOLEAN NOT NULL DEFAULT true,
    sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
    id         TEXT PRIMARY KEY,
    quote      TEXT NOT NULL,
    author     TEXT NOT NULL,
    role       TEXT NOT NULL,
    project_id TEXT REFERENCES projects (id) ON DELETE SET NULL,
    is_demo    BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0
);
