package models

import "time"

// NewsletterSubscriber represents an email captured from the footer/newsletter form.
type NewsletterSubscriber struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
}

// NewsletterInput is the payload accepted from POST /api/newsletter.
type NewsletterInput struct {
	Email string `json:"email"`
}
