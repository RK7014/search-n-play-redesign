package middleware

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"net/http"
)

type contextKey string

const requestIDKey contextKey = "requestID"

const RequestIDHeader = "X-Request-ID"

// RequestID assigns a request ID (reusing an inbound X-Request-ID header if
// the caller already provided one), stores it on the request context, and
// echoes it back on the response so client and server logs can be joined.
func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := r.Header.Get(RequestIDHeader)
		if id == "" {
			id = newRequestID()
		}
		w.Header().Set(RequestIDHeader, id)
		ctx := context.WithValue(r.Context(), requestIDKey, id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// RequestIDFromContext returns the request ID stored by RequestID, or ""
// if none is present (e.g. in a unit test that skips the middleware chain).
func RequestIDFromContext(ctx context.Context) string {
	id, _ := ctx.Value(requestIDKey).(string)
	return id
}

func newRequestID() string {
	buf := make([]byte, 8)
	if _, err := rand.Read(buf); err != nil {
		return "unavailable"
	}
	return hex.EncodeToString(buf)
}
