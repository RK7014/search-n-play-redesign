package handlers

import (
	"log/slog"
	"net/http"

	"searchnplay/backend/internal/httpx"
	"searchnplay/backend/internal/middleware"
	"searchnplay/backend/internal/services"
)

// CatalogHandler serves the read-only content endpoints: services,
// portfolio projects, and testimonials.
type CatalogHandler struct {
	svc    *services.CatalogService
	logger *slog.Logger
}

func NewCatalogHandler(svc *services.CatalogService, logger *slog.Logger) *CatalogHandler {
	return &CatalogHandler{svc: svc, logger: logger}
}

func (h *CatalogHandler) Services(w http.ResponseWriter, r *http.Request) {
	requestID := middleware.RequestIDFromContext(r.Context())
	list, err := h.svc.ListServices(r.Context())
	if err != nil {
		h.logger.Error("list services failed", "error", err, "request_id", requestID)
		httpx.WriteError(w, http.StatusInternalServerError, requestID, "INTERNAL_ERROR", "Could not load services.", nil)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, requestID, list)
}

func (h *CatalogHandler) Projects(w http.ResponseWriter, r *http.Request) {
	requestID := middleware.RequestIDFromContext(r.Context())
	list, err := h.svc.ListProjects(r.Context())
	if err != nil {
		h.logger.Error("list projects failed", "error", err, "request_id", requestID)
		httpx.WriteError(w, http.StatusInternalServerError, requestID, "INTERNAL_ERROR", "Could not load projects.", nil)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, requestID, list)
}

func (h *CatalogHandler) Testimonials(w http.ResponseWriter, r *http.Request) {
	requestID := middleware.RequestIDFromContext(r.Context())
	list, err := h.svc.ListTestimonials(r.Context())
	if err != nil {
		h.logger.Error("list testimonials failed", "error", err, "request_id", requestID)
		httpx.WriteError(w, http.StatusInternalServerError, requestID, "INTERNAL_ERROR", "Could not load testimonials.", nil)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, requestID, list)
}
