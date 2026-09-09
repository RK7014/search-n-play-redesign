// Package memory provides a zero-configuration, non-persistent
// implementation of every repository interface. It is used automatically
// when DATABASE_URL is not set, so the site is fully functional (contact
// form, estimator, catalog listings) without any database setup.
package memory

import (
	"context"
	"strings"
	"sync"

	"searchnplay/backend/internal/models"
)

// ContactStore is an in-memory, thread-safe ContactRepository.
type ContactStore struct {
	mu       sync.RWMutex
	contacts []models.Contact
}

func NewContactStore() *ContactStore {
	return &ContactStore{}
}

func (s *ContactStore) Create(_ context.Context, c *models.Contact) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.contacts = append(s.contacts, *c)
	return nil
}

// NewsletterStore is an in-memory, thread-safe NewsletterRepository.
type NewsletterStore struct {
	mu    sync.RWMutex
	byMail map[string]models.NewsletterSubscriber
}

func NewNewsletterStore() *NewsletterStore {
	return &NewsletterStore{byMail: make(map[string]models.NewsletterSubscriber)}
}

func (s *NewsletterStore) Create(_ context.Context, n *models.NewsletterSubscriber) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.byMail[strings.ToLower(n.Email)] = *n
	return nil
}

func (s *NewsletterStore) ExistsByEmail(_ context.Context, email string) (bool, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	_, ok := s.byMail[strings.ToLower(email)]
	return ok, nil
}

// ServiceStore, ProjectStore, and TestimonialStore serve the read-only
// catalogs from the seed data defined in seed.go. They are separate types
// (rather than one shared catalog type) because each repository interface
// declares its own List method with a distinct return type.

type ServiceStore struct{}

func NewServiceStore() *ServiceStore { return &ServiceStore{} }

func (s *ServiceStore) List(_ context.Context) ([]models.Service, error) {
	out := make([]models.Service, len(seedServices))
	copy(out, seedServices)
	return out, nil
}

type ProjectStore struct{}

func NewProjectStore() *ProjectStore { return &ProjectStore{} }

func (s *ProjectStore) List(_ context.Context) ([]models.Project, error) {
	out := make([]models.Project, len(seedProjects))
	copy(out, seedProjects)
	return out, nil
}

type TestimonialStore struct{}

func NewTestimonialStore() *TestimonialStore { return &TestimonialStore{} }

func (s *TestimonialStore) List(_ context.Context) ([]models.Testimonial, error) {
	out := make([]models.Testimonial, len(seedTestimonials))
	copy(out, seedTestimonials)
	return out, nil
}
