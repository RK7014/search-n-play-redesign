// Package postgres implements the repository interfaces against PostgreSQL
// using pgx's native (non-database/sql) pool interface.
package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"

	"searchnplay/backend/internal/models"
)

type ContactRepo struct {
	pool *pgxpool.Pool
}

func NewContactRepo(pool *pgxpool.Pool) *ContactRepo {
	return &ContactRepo{pool: pool}
}

func (r *ContactRepo) Create(ctx context.Context, c *models.Contact) error {
	_, err := r.pool.Exec(ctx, `
		INSERT INTO contacts (id, name, company, email, phone, service, budget_range, message, source, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	`, c.ID, c.Name, c.Company, c.Email, c.Phone, c.Service, c.BudgetRange, c.Message, c.Source, c.CreatedAt)
	return err
}
