package db

import (
	"context"
	"fmt"
	"io/fs"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Migrate applies every "*.up.sql" file found in migrationFiles that is not
// yet recorded in the schema_migrations table, in filename order, each in
// its own transaction. Files are expected to be named so lexical order
// matches intended application order (e.g. "0001_init.up.sql").
//
// This is a deliberately small, hand-rolled runner (rather than pulling in
// golang-migrate) so a fresh clone can migrate automatically on server
// startup with zero extra tooling.
func Migrate(ctx context.Context, pool *pgxpool.Pool, migrationFiles fs.FS) error {
	if _, err := pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS schema_migrations (
			id         TEXT PRIMARY KEY,
			applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
		)
	`); err != nil {
		return fmt.Errorf("ensure schema_migrations table: %w", err)
	}

	entries, err := fs.ReadDir(migrationFiles, ".")
	if err != nil {
		return fmt.Errorf("read migrations directory: %w", err)
	}

	var names []string
	for _, entry := range entries {
		if !entry.IsDir() && strings.HasSuffix(entry.Name(), ".up.sql") {
			names = append(names, entry.Name())
		}
	}
	sort.Strings(names)

	for _, name := range names {
		id := strings.TrimSuffix(name, ".up.sql")

		var alreadyApplied bool
		if err := pool.QueryRow(ctx,
			`SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE id = $1)`, id,
		).Scan(&alreadyApplied); err != nil {
			return fmt.Errorf("check migration %s: %w", id, err)
		}
		if alreadyApplied {
			continue
		}

		sqlBytes, err := fs.ReadFile(migrationFiles, name)
		if err != nil {
			return fmt.Errorf("read migration %s: %w", name, err)
		}

		if err := applyMigration(ctx, pool, id, string(sqlBytes)); err != nil {
			return err
		}
	}

	return nil
}

func applyMigration(ctx context.Context, pool *pgxpool.Pool, id, sql string) error {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("begin transaction for migration %s: %w", id, err)
	}
	defer tx.Rollback(ctx) // no-op once committed

	if _, err := tx.Exec(ctx, sql); err != nil {
		return fmt.Errorf("apply migration %s: %w", id, err)
	}
	if _, err := tx.Exec(ctx, `INSERT INTO schema_migrations (id) VALUES ($1)`, id); err != nil {
		return fmt.Errorf("record migration %s: %w", id, err)
	}
	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit migration %s: %w", id, err)
	}
	return nil
}
