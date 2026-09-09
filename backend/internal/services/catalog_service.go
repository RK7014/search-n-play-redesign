package services

import (
	"context"

	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/repository"
)

// CatalogService fronts the read-only content repositories (services,
// portfolio, testimonials). It exists as its own layer — rather than
// letting handlers call the repositories directly — so caching or
// filtering can be added later without touching the HTTP layer.
type CatalogService struct {
	services     repository.ServiceRepository
	projects     repository.ProjectRepository
	testimonials repository.TestimonialRepository
}

func NewCatalogService(s repository.ServiceRepository, p repository.ProjectRepository, t repository.TestimonialRepository) *CatalogService {
	return &CatalogService{services: s, projects: p, testimonials: t}
}

func (c *CatalogService) ListServices(ctx context.Context) ([]models.Service, error) {
	return c.services.List(ctx)
}

func (c *CatalogService) ListProjects(ctx context.Context) ([]models.Project, error) {
	return c.projects.List(ctx)
}

func (c *CatalogService) ListTestimonials(ctx context.Context) ([]models.Testimonial, error) {
	return c.testimonials.List(ctx)
}
