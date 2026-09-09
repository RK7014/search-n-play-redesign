package handlers

import (
	"log/slog"
	"net/http"

	"searchnplay/backend/internal/httpx"
	"searchnplay/backend/internal/middleware"
	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/services"
)

type ContactHandler struct {
	svc    *services.ContactService
	logger *slog.Logger
}

func NewContactHandler(svc *services.ContactService, logger *slog.Logger) *ContactHandler {
	return &ContactHandler{svc: svc, logger: logger}
}

func (h *ContactHandler) Create(w http.ResponseWriter, r *http.Request) {
	requestID := middleware.RequestIDFromContext(r.Context())

	var input models.ContactInput
	if !decodeJSON(w, r, &input) {
		return
	}

	contact, errs, err := h.svc.Submit(r.Context(), input)
	if err != nil {
		h.logger.Error("contact submit failed", "error", err, "request_id", requestID)
		httpx.WriteError(w, http.StatusInternalServerError, requestID, "INTERNAL_ERROR",
			"Could not save your message right now. Please try again.", nil)
		return
	}
	if errs.HasErrors() {
		httpx.WriteError(w, http.StatusUnprocessableEntity, requestID, "VALIDATION_ERROR",
			"Please fix the highlighted fields.", errs)
		return
	}

	httpx.WriteJSON(w, http.StatusCreated, requestID, contact)
}
