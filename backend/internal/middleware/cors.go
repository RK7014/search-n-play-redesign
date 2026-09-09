package middleware

import (
	"net/http"
	"slices"
)

// CORS restricts cross-origin requests to an explicit allow-list (from
// ALLOWED_ORIGINS). It responds to preflight OPTIONS requests directly and
// otherwise sets the standard Access-Control-* headers before delegating to
// next.
func CORS(allowedOrigins []string) func(http.Handler) http.Handler {
	allowAll := slices.Contains(allowedOrigins, "*")

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")
			if origin != "" && (allowAll || slices.Contains(allowedOrigins, origin)) {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				w.Header().Set("Vary", "Origin")
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Request-ID")
				w.Header().Set("Access-Control-Max-Age", "600")
			}

			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
