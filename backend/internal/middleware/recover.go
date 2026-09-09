package middleware

import (
	"log/slog"
	"net/http"

	"searchnplay/backend/internal/httpx"
)

// Recover catches panics from downstream handlers, logs them server-side
// (including a stack trace), and returns a generic 500 JSON error without
// leaking implementation details to the client.
func Recover(logger *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if rec := recover(); rec != nil {
					logger.Error("panic recovered",
						"error", rec,
						"path", r.URL.Path,
						"request_id", RequestIDFromContext(r.Context()),
					)
					httpx.WriteError(w, http.StatusInternalServerError, RequestIDFromContext(r.Context()),
						"INTERNAL_ERROR", "Something went wrong. Please try again.", nil)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}
