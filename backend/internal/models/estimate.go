package models

// EstimateInput is the payload accepted from POST /api/estimate.
type EstimateInput struct {
	ProjectType   string   `json:"projectType"`   // saas | web | mobile | ecommerce | custom
	Platforms     []string `json:"platforms"`     // web | ios | android | cross-platform
	FeatureScope  string   `json:"featureScope"`  // starter | growth | advanced | enterprise
	DesignLevel   string   `json:"designLevel"`   // template | custom | premium
	Integrations  []string `json:"integrations"`  // payments | crm | erp | auth | analytics | other
	AIRequirement string   `json:"aiRequirement"` // none | assistive | advanced
	SupportLevel  string   `json:"supportLevel"`  // none | standard | premium
}

// EstimateResult is the computed, indicative output returned to the client.
// It is explicitly non-binding — see Disclaimer.
type EstimateResult struct {
	ComplexityScore     int      `json:"complexityScore"`
	ComplexityLabel     string   `json:"complexityLabel"`
	TimelineMinWeeks    int      `json:"timelineMinWeeks"`
	TimelineMaxWeeks    int      `json:"timelineMaxWeeks"`
	CostMinINR          int      `json:"costMinInr"`
	CostMaxINR          int      `json:"costMaxInr"`
	RecommendedApproach string   `json:"recommendedApproach"`
	RecommendedStack    []string `json:"recommendedStack"`
	TeamComposition     []string `json:"teamComposition"`
	Disclaimer          string   `json:"disclaimer"`
}

var (
	ValidProjectTypes   = []string{"saas", "web", "mobile", "ecommerce", "custom"}
	ValidPlatforms      = []string{"web", "ios", "android", "cross-platform"}
	ValidFeatureScopes  = []string{"starter", "growth", "advanced", "enterprise"}
	ValidDesignLevels   = []string{"template", "custom", "premium"}
	ValidIntegrations   = []string{"payments", "crm", "erp", "auth", "analytics", "other"}
	ValidAIRequirements = []string{"none", "assistive", "advanced"}
	ValidSupportLevels  = []string{"none", "standard", "premium"}
)
