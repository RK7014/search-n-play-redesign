package handlers

import (
	"log/slog"
	"net/http"

	"searchnplay/backend/internal/httpx"
	"searchnplay/backend/internal/middleware"
	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/services"
)

type EstimateHandler struct {
	svc    *services.EstimateService
	logger *slog.Logger
}

func NewEstimateHandler(svc *services.EstimateService, logger *slog.Logger) *EstimateHandler {
	return &EstimateHandler{svc: svc, logger: logger}
}

func (h *EstimateHandler) Create(w http.ResponseWriter, r *http.Request) {
	requestID := middleware.RequestIDFromContext(r.Context())

	var input models.EstimateInput
	if !decodeJSON(w, r, &input) {
		return
	}

	result, errs, err := h.svc.Estimate(r.Context(), input)
	if err != nil {
		h.logger.Error("estimate failed", "error", err, "request_id", requestID)
		httpx.WriteError(w, http.StatusInternalServerError, requestID, "INTERNAL_ERROR",
			"Could not compute an estimate right now. Please try again.", nil)
		return
	}
	if errs.HasErrors() {
		httpx.WriteError(w, http.StatusUnprocessableEntity, requestID, "VALIDATION_ERROR",
			"Please review the highlighted fields.", errs)
		return
	}

	httpx.WriteJSON(w, http.StatusOK, requestID, result)
}
