package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"

	"searchnplay/backend/internal/models"
)

type ServiceRepo struct {
	pool *pgxpool.Pool
}

func NewServiceRepo(pool *pgxpool.Pool) *ServiceRepo {
	return &ServiceRepo{pool: pool}
}

func (r *ServiceRepo) List(ctx context.Context) ([]models.Service, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT id, slug, category, name, summary, description, capabilities, icon, sort_order
		FROM services
		ORDER BY sort_order ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []models.Service
	for rows.Next() {
		var s models.Service
		if err := rows.Scan(&s.ID, &s.Slug, &s.Category, &s.Name, &s.Summary, &s.Description,
			&s.Capabilities, &s.Icon, &s.SortOrder); err != nil {
			return nil, err
		}
		out = append(out, s)
	}
	return out, rows.Err()
}
