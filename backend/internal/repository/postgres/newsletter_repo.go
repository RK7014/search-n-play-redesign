package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"

	"searchnplay/backend/internal/models"
)

type NewsletterRepo struct {
	pool *pgxpool.Pool
}

func NewNewsletterRepo(pool *pgxpool.Pool) *NewsletterRepo {
	return &NewsletterRepo{pool: pool}
}

func (r *NewsletterRepo) Create(ctx context.Context, n *models.NewsletterSubscriber) error {
	_, err := r.pool.Exec(ctx, `
		INSERT INTO newsletter_subscribers (id, email, created_at)
		VALUES ($1, $2, $3)
		ON CONFLICT (email) DO NOTHING
	`, n.ID, n.Email, n.CreatedAt)
	return err
}

func (r *NewsletterRepo) ExistsByEmail(ctx context.Context, email string) (bool, error) {
	var exists bool
	err := r.pool.QueryRow(ctx,
		`SELECT EXISTS(SELECT 1 FROM newsletter_subscribers WHERE email = $1)`, email,
	).Scan(&exists)
	return exists, err
}
