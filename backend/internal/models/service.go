package models

// Service represents one entry in the "Services" catalog (product content, not user-submitted).
type Service struct {
	ID           string   `json:"id"`
	Slug         string   `json:"slug"`
	Category     string   `json:"category"`
	Name         string   `json:"name"`
	Summary      string   `json:"summary"`
	Description  string   `json:"description"`
	Capabilities []string `json:"capabilities"`
	Icon         string   `json:"icon"`
	SortOrder    int      `json:"sortOrder"`
}
