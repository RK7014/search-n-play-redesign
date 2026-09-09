package services

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"

	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/repository"
	"searchnplay/backend/internal/validation"
)

type NewsletterService struct {
	repo repository.NewsletterRepository
}

func NewNewsletterService(repo repository.NewsletterRepository) *NewsletterService {
	return &NewsletterService{repo: repo}
}

// Subscribe validates and records a newsletter sign-up. Subscribing an
// already-registered email is treated as an idempotent success rather than
// an error, so the endpoint can't be used to enumerate existing subscribers.
func (s *NewsletterService) Subscribe(ctx context.Context, in models.NewsletterInput) (*models.NewsletterSubscriber, validation.Errors, error) {
	errs := validation.Errors{}

	email := strings.TrimSpace(in.Email)
	switch {
	case !validation.Required(email):
		errs.Add("email", "Email is required.")
	case !validation.IsEmail(email):
		errs.Add("email", "Enter a valid email address.")
	}

	if errs.HasErrors() {
		return nil, errs, nil
	}
	email = strings.ToLower(email)

	exists, err := s.repo.ExistsByEmail(ctx, email)
	if err != nil {
		return nil, nil, fmt.Errorf("check existing subscriber: %w", err)
	}
	if exists {
		return &models.NewsletterSubscriber{Email: email}, nil, nil
	}

	sub := &models.NewsletterSubscriber{
		ID:        uuid.NewString(),
		Email:     email,
		CreatedAt: time.Now().UTC(),
	}
	if err := s.repo.Create(ctx, sub); err != nil {
		return nil, nil, fmt.Errorf("create subscriber: %w", err)
	}

	return sub, nil, nil
}
