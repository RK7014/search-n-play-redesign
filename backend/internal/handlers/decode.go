package handlers

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"searchnplay/backend/internal/httpx"
	"searchnplay/backend/internal/middleware"
)

// bodyTooLarge reports whether err originates from http.MaxBytesReader
// rejecting an oversized request body (see middleware.BodyLimit).
func bodyTooLarge(err error) bool {
	var maxBytesErr *http.MaxBytesError
	return errors.As(err, &maxBytesErr)
}

// decodeJSON decodes the request body into dst and writes a 400 JSON error
// response (returning false) on malformed JSON, an empty body, or a body
// exceeding the configured size limit (see middleware.BodyLimit).
func decodeJSON(w http.ResponseWriter, r *http.Request, dst any) bool {
	requestID := middleware.RequestIDFromContext(r.Context())

	if r.Body == nil {
		httpx.WriteError(w, http.StatusBadRequest, requestID, "INVALID_JSON", "Request body is required.", nil)
		return false
	}

	err := json.NewDecoder(r.Body).Decode(dst)
	switch {
	case err == nil:
		return true
	case errors.Is(err, io.EOF):
		httpx.WriteError(w, http.StatusBadRequest, requestID, "INVALID_JSON", "Request body is required.", nil)
	case bodyTooLarge(err):
		httpx.WriteError(w, http.StatusRequestEntityTooLarge, requestID, "PAYLOAD_TOO_LARGE", "Request body is too large.", nil)
	default:
		httpx.WriteError(w, http.StatusBadRequest, requestID, "INVALID_JSON", "Request body must be valid JSON.", nil)
	}
	return false
}
