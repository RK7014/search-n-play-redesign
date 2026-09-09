// Package httpx holds small, dependency-free HTTP response helpers shared by
// the middleware and handlers packages. It intentionally has no internal
// imports so both of those packages can depend on it without a cycle.
package httpx

import (
	"encoding/json"
	"net/http"
)

// ErrorBody is the machine-readable error payload returned to API clients.
type ErrorBody struct {
	Code    string            `json:"code"`
	Message string            `json:"message"`
	Fields  map[string]string `json:"fields,omitempty"`
}

type envelope struct {
	Data      any        `json:"data,omitempty"`
	Error     *ErrorBody `json:"error,omitempty"`
	RequestID string     `json:"requestId,omitempty"`
}

// WriteJSON writes a successful JSON response wrapped in the standard
// {"data": ..., "requestId": ...} envelope.
func WriteJSON(w http.ResponseWriter, status int, requestID string, data any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(envelope{Data: data, RequestID: requestID})
}

// WriteError writes an error JSON response wrapped in the standard
// {"error": {...}, "requestId": ...} envelope. fields may be nil.
func WriteError(w http.ResponseWriter, status int, requestID, code, message string, fields map[string]string) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(envelope{
		Error:     &ErrorBody{Code: code, Message: message, Fields: fields},
		RequestID: requestID,
	})
}
