package handlers

import (
	"net/http"
	"time"

	"searchnplay/backend/internal/httpx"
	"searchnplay/backend/internal/middleware"
)

type HealthHandler struct {
	startedAt time.Time
	version   string
	dbStatus  func() string
}

// NewHealthHandler builds a health handler. dbStatus is called on every
// request and should return "ok", "disabled" (no DATABASE_URL configured),
// or "unreachable" — it must not block.
func NewHealthHandler(version string, dbStatus func() string) *HealthHandler {
	return &HealthHandler{startedAt: time.Now(), version: version, dbStatus: dbStatus}
}

func (h *HealthHandler) Health(w http.ResponseWriter, r *http.Request) {
	requestID := middleware.RequestIDFromContext(r.Context())
	httpx.WriteJSON(w, http.StatusOK, requestID, map[string]any{
		"status":        "ok",
		"version":       h.version,
		"uptimeSeconds": int(time.Since(h.startedAt).Seconds()),
		"database":      h.dbStatus(),
		"time":          time.Now().UTC(),
	})
}
