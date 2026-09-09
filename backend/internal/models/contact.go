package models

import "time"

// Contact represents a lead submitted through the "Start a Project" / contact form.
type Contact struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Company     string    `json:"company,omitempty"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone,omitempty"`
	Service     string    `json:"service"`
	BudgetRange string    `json:"budgetRange,omitempty"`
	Message     string    `json:"message"`
	Source      string    `json:"source,omitempty"`
	CreatedAt   time.Time `json:"createdAt"`
}

// ContactInput is the payload accepted from POST /api/contact.
type ContactInput struct {
	Name        string `json:"name"`
	Company     string `json:"company"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Service     string `json:"service"`
	BudgetRange string `json:"budgetRange"`
	Message     string `json:"message"`
	Source      string `json:"source"`
}

// ValidServices lists the service options the contact form may submit.
var ValidServices = []string{
	"product-engineering",
	"mobile-engineering",
	"digital-experience",
	"ai-automation",
	"growth",
	"continuous-support",
	"not-sure",
}

// ValidBudgetRanges lists the budget bands offered in the lead form (INR).
var ValidBudgetRanges = []string{
	"under-25k-inr",
	"25k-75k-inr",
	"75k-2l-inr",
	"2l-5l-inr",
	"5l-plus-inr",
	"not-sure",
}
