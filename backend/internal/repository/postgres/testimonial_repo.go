package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"

	"searchnplay/backend/internal/models"
)

type TestimonialRepo struct {
	pool *pgxpool.Pool
}

func NewTestimonialRepo(pool *pgxpool.Pool) *TestimonialRepo {
	return &TestimonialRepo{pool: pool}
}

func (r *TestimonialRepo) List(ctx context.Context) ([]models.Testimonial, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT id, quote, author, role, project_id, is_demo, sort_order
		FROM testimonials
		ORDER BY sort_order ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []models.Testimonial
	for rows.Next() {
		var t models.Testimonial
		var projectID *string
		if err := rows.Scan(&t.ID, &t.Quote, &t.Author, &t.Role, &projectID, &t.IsDemo, &t.SortOrder); err != nil {
			return nil, err
		}
		if projectID != nil {
			t.ProjectID = *projectID
		}
		out = append(out, t)
	}
	return out, rows.Err()
}
