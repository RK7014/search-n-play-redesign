package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"

	"searchnplay/backend/internal/models"
)

type ProjectRepo struct {
	pool *pgxpool.Pool
}

func NewProjectRepo(pool *pgxpool.Pool) *ProjectRepo {
	return &ProjectRepo{pool: pool}
}

func (r *ProjectRepo) List(ctx context.Context) ([]models.Project, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT id, slug, name, category, tagline, summary, challenge, strategy,
		       design_notes, engineering, outcome, tech_stack, accent_color, is_demo, sort_order
		FROM projects
		ORDER BY sort_order ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []models.Project
	for rows.Next() {
		var p models.Project
		if err := rows.Scan(&p.ID, &p.Slug, &p.Name, &p.Category, &p.Tagline, &p.Summary, &p.Challenge,
			&p.Strategy, &p.DesignNotes, &p.Engineering, &p.Outcome, &p.TechStack, &p.AccentColor,
			&p.IsDemo, &p.SortOrder); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}
