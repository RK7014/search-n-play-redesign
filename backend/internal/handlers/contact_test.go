package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/repository/memory"
	"searchnplay/backend/internal/services"
)

func TestContactHandler_Create_Success(t *testing.T) {
	repo := memory.NewContactStore()
	h := NewContactHandler(services.NewContactService(repo), testLogger())

	body := models.ContactInput{
		Name:    "Jordan Rivera",
		Email:   "jordan@example.com",
		Phone:   "9845123670",
		Message: "We would like to discuss a new product build.",
		Service: "product-engineering",
	}
	buf, _ := json.Marshal(body)

	req := httptest.NewRequest(http.MethodPost, "/api/contact", bytes.NewReader(buf))
	rec := httptest.NewRecorder()

	h.Create(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", rec.Code, rec.Body.String())
	}

	var resp struct {
		Data models.Contact `json:"data"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatalf("could not decode response: %v", err)
	}
	if resp.Data.Email != "jordan@example.com" {
		t.Errorf("expected echoed email, got %q", resp.Data.Email)
	}
	if resp.Data.ID == "" {
		t.Error("expected a generated ID")
	}
}

func TestContactHandler_Create_ValidationError(t *testing.T) {
	repo := memory.NewContactStore()
	h := NewContactHandler(services.NewContactService(repo), testLogger())

	body := models.ContactInput{Name: "", Email: "not-an-email", Message: "short"}
	buf, _ := json.Marshal(body)

	req := httptest.NewRequest(http.MethodPost, "/api/contact", bytes.NewReader(buf))
	rec := httptest.NewRecorder()

	h.Create(rec, req)

	if rec.Code != http.StatusUnprocessableEntity {
		t.Fatalf("expected 422, got %d: %s", rec.Code, rec.Body.String())
	}

	var resp struct {
		Error struct {
			Fields map[string]string `json:"fields"`
		} `json:"error"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatalf("could not decode response: %v", err)
	}
	for _, field := range []string{"name", "email", "message", "phone"} {
		if resp.Error.Fields[field] == "" {
			t.Errorf("expected a validation message for field %q", field)
		}
	}
}

func TestContactHandler_Create_MalformedJSON(t *testing.T) {
	repo := memory.NewContactStore()
	h := NewContactHandler(services.NewContactService(repo), testLogger())

	req := httptest.NewRequest(http.MethodPost, "/api/contact", bytes.NewReader([]byte("{not json")))
	rec := httptest.NewRecorder()

	h.Create(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d: %s", rec.Code, rec.Body.String())
	}
}
