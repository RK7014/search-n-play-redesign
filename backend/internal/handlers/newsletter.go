package handlers

import (
	"log/slog"
	"net/http"

	"searchnplay/backend/internal/httpx"
	"searchnplay/backend/internal/middleware"
	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/services"
)

type NewsletterHandler struct {
	svc    *services.NewsletterService
	logger *slog.Logger
}

func NewNewsletterHandler(svc *services.NewsletterService, logger *slog.Logger) *NewsletterHandler {
	return &NewsletterHandler{svc: svc, logger: logger}
}

func (h *NewsletterHandler) Subscribe(w http.ResponseWriter, r *http.Request) {
	requestID := middleware.RequestIDFromContext(r.Context())

	var input models.NewsletterInput
	if !decodeJSON(w, r, &input) {
		return
	}

	sub, errs, err := h.svc.Subscribe(r.Context(), input)
	if err != nil {
		h.logger.Error("newsletter subscribe failed", "error", err, "request_id", requestID)
		httpx.WriteError(w, http.StatusInternalServerError, requestID, "INTERNAL_ERROR",
			"Could not subscribe right now. Please try again.", nil)
		return
	}
	if errs.HasErrors() {
		httpx.WriteError(w, http.StatusUnprocessableEntity, requestID, "VALIDATION_ERROR",
			"Please fix the highlighted fields.", errs)
		return
	}

	httpx.WriteJSON(w, http.StatusOK, requestID, sub)
}
