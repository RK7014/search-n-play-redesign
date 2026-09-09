// Package repository defines the persistence interfaces used by the service
// layer. Two implementations exist: memory (zero-config, non-persistent —
// used automatically when DATABASE_URL is unset) and postgres. Handlers and
// services depend only on these interfaces, so the storage backend is a
// startup-time decision made in cmd/server/main.go.
package repository

import "context"

import "searchnplay/backend/internal/models"

// ContactRepository persists leads submitted through the contact form.
type ContactRepository interface {
	Create(ctx context.Context, c *models.Contact) error
}

// NewsletterRepository persists newsletter sign-ups.
type NewsletterRepository interface {
	Create(ctx context.Context, n *models.NewsletterSubscriber) error
	ExistsByEmail(ctx context.Context, email string) (bool, error)
}

// ServiceRepository reads the services catalog.
type ServiceRepository interface {
	List(ctx context.Context) ([]models.Service, error)
}

// ProjectRepository reads the portfolio catalog.
type ProjectRepository interface {
	List(ctx context.Context) ([]models.Project, error)
}

// TestimonialRepository reads testimonials.
type TestimonialRepository interface {
	List(ctx context.Context) ([]models.Testimonial, error)
}
