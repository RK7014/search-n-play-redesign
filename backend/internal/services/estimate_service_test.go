package services

import (
	"context"
	"testing"

	"searchnplay/backend/internal/models"
)

func validEstimateInput() models.EstimateInput {
	return models.EstimateInput{
		ProjectType:   "web",
		Platforms:     []string{"web"},
		FeatureScope:  "starter",
		DesignLevel:   "template",
		Integrations:  nil,
		AIRequirement: "none",
		SupportLevel:  "none",
	}
}

func TestEstimate_RejectsInvalidEnum(t *testing.T) {
	svc := NewEstimateService()
	in := validEstimateInput()
	in.ProjectType = "not-a-real-type"

	result, errs, err := svc.Estimate(context.Background(), in)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if result != nil {
		t.Fatalf("expected nil result on validation failure, got %+v", result)
	}
	if !errs.HasErrors() || errs["projectType"] == "" {
		t.Fatalf("expected a projectType validation error, got %+v", errs)
	}
}

func TestEstimate_SimpleInputProducesLowComplexity(t *testing.T) {
	svc := NewEstimateService()
	result, errs, err := svc.Estimate(context.Background(), validEstimateInput())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if errs.HasErrors() {
		t.Fatalf("unexpected validation errors: %+v", errs)
	}
	if result.ComplexityLabel != "Focused" {
		t.Errorf("expected Focused complexity for a minimal starter site, got %s (score %d)",
			result.ComplexityLabel, result.ComplexityScore)
	}
	if result.TimelineMinWeeks <= 0 || result.TimelineMaxWeeks < result.TimelineMinWeeks {
		t.Errorf("invalid timeline range: %d-%d weeks", result.TimelineMinWeeks, result.TimelineMaxWeeks)
	}
	if result.CostMinINR <= 0 || result.CostMaxINR < result.CostMinINR {
		t.Errorf("invalid cost range: ₹%d-₹%d", result.CostMinINR, result.CostMaxINR)
	}
	if result.Disclaimer == "" {
		t.Error("expected a non-empty disclaimer")
	}
}

func TestEstimate_ComplexInputProducesEnterpriseComplexity(t *testing.T) {
	svc := NewEstimateService()
	in := models.EstimateInput{
		ProjectType:   "saas",
		Platforms:     []string{"web", "ios", "android"},
		FeatureScope:  "enterprise",
		DesignLevel:   "premium",
		Integrations:  []string{"payments", "crm", "erp", "auth", "analytics", "other"},
		AIRequirement: "advanced",
		SupportLevel:  "premium",
	}

	result, errs, err := svc.Estimate(context.Background(), in)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if errs.HasErrors() {
		t.Fatalf("unexpected validation errors: %+v", errs)
	}
	if result.ComplexityLabel != "Enterprise" {
		t.Errorf("expected Enterprise complexity for a fully-loaded SaaS build, got %s (score %d)",
			result.ComplexityLabel, result.ComplexityScore)
	}
	if result.ComplexityScore != 100 {
		t.Errorf("expected the maximal input combination to clamp at 100, got %d", result.ComplexityScore)
	}

	foundRAG := false
	for _, s := range result.RecommendedStack {
		if s == "LLM API + retrieval-augmented generation (RAG)" {
			foundRAG = true
		}
	}
	if !foundRAG {
		t.Errorf("expected RAG recommendation in stack for advanced AI requirement, got %+v", result.RecommendedStack)
	}
}

func TestEstimate_MultiPlatformExtendsTimeline(t *testing.T) {
	svc := NewEstimateService()

	single := validEstimateInput()
	single.ProjectType = "mobile"
	single.Platforms = []string{"android"}

	multi := validEstimateInput()
	multi.ProjectType = "mobile"
	multi.Platforms = []string{"android", "ios"}

	singleResult, _, _ := svc.Estimate(context.Background(), single)
	multiResult, _, _ := svc.Estimate(context.Background(), multi)

	if multiResult.TimelineMaxWeeks <= singleResult.TimelineMaxWeeks {
		t.Errorf("expected multi-platform timeline (%d) to exceed single-platform timeline (%d)",
			multiResult.TimelineMaxWeeks, singleResult.TimelineMaxWeeks)
	}
}

func TestEstimate_HigherComplexityCostsMore(t *testing.T) {
	svc := NewEstimateService()

	simple, _, _ := svc.Estimate(context.Background(), validEstimateInput())

	complex := models.EstimateInput{
		ProjectType:   "saas",
		Platforms:     []string{"web", "ios", "android"},
		FeatureScope:  "enterprise",
		DesignLevel:   "premium",
		Integrations:  []string{"payments", "crm", "erp", "auth", "analytics", "other"},
		AIRequirement: "advanced",
		SupportLevel:  "premium",
	}
	complexResult, _, _ := svc.Estimate(context.Background(), complex)

	if complexResult.CostMinINR <= simple.CostMinINR || complexResult.CostMaxINR <= simple.CostMaxINR {
		t.Errorf("expected the fully-loaded build (₹%d-₹%d) to cost more than the minimal one (₹%d-₹%d)",
			complexResult.CostMinINR, complexResult.CostMaxINR, simple.CostMinINR, simple.CostMaxINR)
	}
}
