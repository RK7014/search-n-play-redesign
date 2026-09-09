package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/repository/memory"
	"searchnplay/backend/internal/services"
)

func newTestCatalogHandler() *CatalogHandler {
	svc := services.NewCatalogService(memory.NewServiceStore(), memory.NewProjectStore(), memory.NewTestimonialStore())
	return NewCatalogHandler(svc, testLogger())
}

func TestCatalogHandler_Services(t *testing.T) {
	h := newTestCatalogHandler()

	req := httptest.NewRequest(http.MethodGet, "/api/services", nil)
	rec := httptest.NewRecorder()
	h.Services(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}

	var resp struct {
		Data []models.Service `json:"data"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatalf("could not decode response: %v", err)
	}
	if len(resp.Data) == 0 {
		t.Error("expected at least one service in the catalog")
	}
}

func TestCatalogHandler_Projects(t *testing.T) {
	h := newTestCatalogHandler()

	req := httptest.NewRequest(http.MethodGet, "/api/projects", nil)
	rec := httptest.NewRecorder()
	h.Projects(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}

	var resp struct {
		Data []models.Project `json:"data"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatalf("could not decode response: %v", err)
	}
	for _, p := range resp.Data {
		if !p.IsDemo {
			t.Errorf("project %q should be flagged IsDemo", p.Slug)
		}
	}
}

func TestCatalogHandler_Testimonials(t *testing.T) {
	h := newTestCatalogHandler()

	req := httptest.NewRequest(http.MethodGet, "/api/testimonials", nil)
	rec := httptest.NewRecorder()
	h.Testimonials(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}
}
