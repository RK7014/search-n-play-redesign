package services

import (
	"context"
	"slices"

	"searchnplay/backend/internal/models"
	"searchnplay/backend/internal/validation"
)

// EstimateService turns a project questionnaire into an indicative
// complexity score, timeline range, and recommended stack. It is a pure,
// stateless computation — no repository is involved.
type EstimateService struct{}

func NewEstimateService() *EstimateService {
	return &EstimateService{}
}

const estimateDisclaimer = "This is an indicative, automatically generated estimate based on the details provided. " +
	"It is not a binding quotation — final scope, timeline, and pricing are confirmed after a discovery call."

// Estimate validates the input and, if valid, computes a result.
func (s *EstimateService) Estimate(_ context.Context, in models.EstimateInput) (*models.EstimateResult, validation.Errors, error) {
	errs := validation.Errors{}

	if !validation.Required(in.ProjectType) || !validation.OneOf(in.ProjectType, models.ValidProjectTypes) {
		errs.Add("projectType", "Select a valid project type.")
	}
	if !validation.AllOneOf(in.Platforms, models.ValidPlatforms) {
		errs.Add("platforms", "Select valid platforms.")
	}
	if !validation.Required(in.FeatureScope) || !validation.OneOf(in.FeatureScope, models.ValidFeatureScopes) {
		errs.Add("featureScope", "Select a valid feature scope.")
	}
	if !validation.Required(in.DesignLevel) || !validation.OneOf(in.DesignLevel, models.ValidDesignLevels) {
		errs.Add("designLevel", "Select a valid design level.")
	}
	if !validation.AllOneOf(in.Integrations, models.ValidIntegrations) {
		errs.Add("integrations", "Select valid integrations.")
	}
	if !validation.Required(in.AIRequirement) || !validation.OneOf(in.AIRequirement, models.ValidAIRequirements) {
		errs.Add("aiRequirement", "Select a valid AI requirement.")
	}
	if !validation.Required(in.SupportLevel) || !validation.OneOf(in.SupportLevel, models.ValidSupportLevels) {
		errs.Add("supportLevel", "Select a valid support level.")
	}

	if errs.HasErrors() {
		return nil, errs, nil
	}

	result := computeEstimate(in)
	return &result, nil, nil
}

func computeEstimate(in models.EstimateInput) models.EstimateResult {
	score := complexityScore(in)
	label, minWeeks, maxWeeks, minCost, maxCost := complexityBand(score)

	extraPlatforms := 0
	if len(in.Platforms) > 1 {
		extraPlatforms = len(in.Platforms) - 1
	}
	minWeeks += extraPlatforms
	maxWeeks += extraPlatforms * 2

	if in.AIRequirement == "advanced" {
		minWeeks += 1
		maxWeeks += 2
	}

	// Cost has no adders on top of the band (unlike timeline above): extra
	// platforms and advanced AI already push the complexity score toward a
	// higher band, which is what moves cost — stacking a second, separate
	// bump on top would risk exceeding the platform's stated ₹10,000-₹2,00,000
	// bounds instead of just reflecting the same complexity signal twice.

	return models.EstimateResult{
		ComplexityScore:     score,
		ComplexityLabel:     label,
		TimelineMinWeeks:    minWeeks,
		TimelineMaxWeeks:    maxWeeks,
		CostMinINR:          minCost,
		CostMaxINR:          maxCost,
		RecommendedApproach: recommendedApproach(in, label),
		RecommendedStack:    recommendedStack(in),
		TeamComposition:     teamComposition(label),
		Disclaimer:          estimateDisclaimer,
	}
}

func complexityScore(in models.EstimateInput) int {
	score := 0

	switch in.ProjectType {
	case "saas":
		score += 30
	case "custom":
		score += 35
	case "mobile", "ecommerce":
		score += 25
	case "web":
		score += 15
	}

	if extra := len(in.Platforms) - 1; extra > 0 {
		score += min(extra*8, 24)
	}

	switch in.FeatureScope {
	case "starter":
		score += 5
	case "growth":
		score += 15
	case "advanced":
		score += 30
	case "enterprise":
		score += 45
	}

	switch in.DesignLevel {
	case "custom":
		score += 10
	case "premium":
		score += 18
	}

	score += min(len(in.Integrations)*5, 30)

	switch in.AIRequirement {
	case "assistive":
		score += 10
	case "advanced":
		score += 22
	}

	switch in.SupportLevel {
	case "standard":
		score += 4
	case "premium":
		score += 8
	}

	return clamp(score, 5, 100)
}

// Timelines reflect an AI-assisted delivery pace (Claude Code-style tooling
// for scaffolding, tests, and boilerplate) rather than pre-AI-era estimates —
// calendar time compresses meaningfully, but cost doesn't compress at the
// same rate, since it still buys the same skilled people's judgment on
// design, integration, and review, just applied over a shorter timeline.
// Cost bands are INR-native — priced for this business's actual market
// (a Jaipur-based team) rather than a mechanical USD-to-INR conversion,
// which would overstate what's realistic and credible here — and bounded to
// a firm ₹10,000 floor and ₹2,00,000 ceiling across every tier, so no
// combination of answers can quote outside that range.
func complexityBand(score int) (label string, minWeeks, maxWeeks, minCostINR, maxCostINR int) {
	switch {
	case score < 30:
		return "Focused", 2, 4, 10_000, 30_000
	case score < 55:
		return "Standard", 4, 8, 30_000, 70_000
	case score < 80:
		return "Advanced", 8, 14, 70_000, 1_20_000
	default:
		return "Enterprise", 14, 22, 1_20_000, 2_00_000
	}
}

func recommendedApproach(in models.EstimateInput, label string) string {
	switch {
	case in.ProjectType == "saas" && (in.FeatureScope == "advanced" || in.FeatureScope == "enterprise"):
		return "Phased delivery: ship a focused MVP first, validate with real usage, then expand modules " +
			"based on what that usage tells us — rather than building the full surface area up front."
	case in.ProjectType == "mobile" && len(in.Platforms) > 1:
		return "A shared cross-platform codebase (Flutter or React Native) to cover both stores without " +
			"duplicating engineering effort, with platform-specific polish where it matters most."
	case in.ProjectType == "ecommerce":
		return "Start from a proven storefront foundation and focus custom engineering on checkout, " +
			"catalog, and the integrations specific to your operations."
	case in.AIRequirement == "advanced":
		return "Ship the core product first with a clean data layer, then layer in AI features against " +
			"real product data rather than designing the AI in isolation."
	case label == "Focused":
		return "A single, tightly scoped build — one working version, shipped fast, with room to extend " +
			"once it is in front of real users."
	default:
		return "An iterative build split into 2-3 week milestones, each ending in something reviewable " +
			"rather than one long delivery at the end."
	}
}

func recommendedStack(in models.EstimateInput) []string {
	stack := []string{}

	wantsWeb := in.ProjectType != "mobile" || slices.Contains(in.Platforms, "web")
	if wantsWeb {
		stack = append(stack, "Next.js + TypeScript")
	}

	hasIOS := slices.Contains(in.Platforms, "ios")
	hasAndroid := slices.Contains(in.Platforms, "android")
	hasCrossPlatform := slices.Contains(in.Platforms, "cross-platform")
	switch {
	case hasCrossPlatform || (hasIOS && hasAndroid):
		stack = append(stack, "Flutter (shared iOS + Android codebase)")
	case hasIOS:
		stack = append(stack, "Swift / SwiftUI (native iOS)")
	case hasAndroid:
		stack = append(stack, "Kotlin (native Android)")
	}

	stack = append(stack, "Go REST API")

	if in.FeatureScope == "advanced" || in.FeatureScope == "enterprise" || in.SupportLevel == "premium" {
		stack = append(stack, "PostgreSQL + Redis")
	} else {
		stack = append(stack, "PostgreSQL")
	}

	switch in.AIRequirement {
	case "assistive":
		stack = append(stack, "LLM API integration")
	case "advanced":
		stack = append(stack, "LLM API + retrieval-augmented generation (RAG)")
	}

	stack = append(stack, "Docker + CI/CD on AWS / Azure / GCP")

	return stack
}

func teamComposition(label string) []string {
	switch label {
	case "Focused":
		return []string{"1 full-stack engineer", "1 product designer (part-time)"}
	case "Standard":
		return []string{"1-2 full-stack engineers", "1 product designer", "1 project lead"}
	case "Advanced":
		return []string{"2-3 engineers (frontend/backend split)", "1 product designer", "1 QA engineer", "1 project lead"}
	default: // Enterprise
		return []string{
			"4+ engineers across frontend, backend, and mobile",
			"1-2 product designers",
			"1 QA engineer",
			"1 DevOps/cloud engineer",
			"1 project lead",
		}
	}
}

func clamp(v, lo, hi int) int {
	if v < lo {
		return lo
	}
	if v > hi {
		return hi
	}
	return v
}
