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

type ContactService struct {
	repo repository.ContactRepository
}

func NewContactService(repo repository.ContactRepository) *ContactService {
	return &ContactService{repo: repo}
}

// Submit validates a contact form submission and, if valid, persists it.
// A non-nil validation.Errors return means the input was rejected; check
// that before treating a nil *models.Contact as an unexpected error.
func (s *ContactService) Submit(ctx context.Context, in models.ContactInput) (*models.Contact, validation.Errors, error) {
	errs := validation.Errors{}

	name := strings.TrimSpace(in.Name)
	switch {
	case !validation.Required(name):
		errs.Add("name", "Name is required.")
	case !validation.MaxLen(name, 120):
		errs.Add("name", "Name must be 120 characters or fewer.")
	}

	email := strings.TrimSpace(in.Email)
	switch {
	case !validation.Required(email):
		errs.Add("email", "Email is required.")
	case !validation.IsEmail(email):
		errs.Add("email", "Enter a valid email address.")
	}

	message := strings.TrimSpace(in.Message)
	switch {
	case !validation.Required(message):
		errs.Add("message", "Tell us a little about the project.")
	case !validation.MinLen(message, 10):
		errs.Add("message", "Add a few more details (at least 10 characters).")
	case !validation.MaxLen(message, 4000):
		errs.Add("message", "Message must be 4000 characters or fewer.")
	}

	company := strings.TrimSpace(in.Company)
	if !validation.MaxLen(company, 160) {
		errs.Add("company", "Company must be 160 characters or fewer.")
	}

	service := strings.TrimSpace(in.Service)
	if service != "" && !validation.OneOf(service, models.ValidServices) {
		errs.Add("service", "Select a valid service.")
	}

	budget := strings.TrimSpace(in.BudgetRange)
	if budget != "" && !validation.OneOf(budget, models.ValidBudgetRanges) {
		errs.Add("budgetRange", "Select a valid budget range.")
	}

	phone := validation.NormalizePhoneDigits(in.Phone)
	switch {
	case !validation.Required(phone):
		errs.Add("phone", "Phone number is required.")
	case !validation.IsIndianMobile(phone):
		errs.Add("phone", "Enter a valid 10-digit mobile number.")
	}

	if errs.HasErrors() {
		return nil, errs, nil
	}

	contact := &models.Contact{
		ID:          uuid.NewString(),
		Name:        name,
		Company:     company,
		Email:       email,
		Phone:       phone,
		Service:     service,
		BudgetRange: budget,
		Message:     message,
		Source:      strings.TrimSpace(in.Source),
		CreatedAt:   time.Now().UTC(),
	}

	if err := s.repo.Create(ctx, contact); err != nil {
		return nil, nil, fmt.Errorf("create contact: %w", err)
	}

	return contact, nil, nil
}
