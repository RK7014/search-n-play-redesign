package models

// Project represents one portfolio / case-study entry.
//
// IsDemo marks entries that are illustrative demonstration case studies rather
// than documented outcomes for a real, named client engagement. This project
// is an independent interview showcase, so every entry currently ships with
// IsDemo=true — see docs/PROJECT_OVERVIEW.md for the reasoning.
type Project struct {
	ID          string   `json:"id"`
	Slug        string   `json:"slug"`
	Name        string   `json:"name"`
	Category    string   `json:"category"`
	Tagline     string   `json:"tagline"`
	Summary     string   `json:"summary"`
	Challenge   string   `json:"challenge"`
	Strategy    string   `json:"strategy"`
	DesignNotes string   `json:"designNotes"`
	Engineering string   `json:"engineering"`
	Outcome     string   `json:"outcome"`
	TechStack   []string `json:"techStack"`
	AccentColor string   `json:"accentColor"`
	IsDemo      bool     `json:"isDemo"`
	SortOrder   int      `json:"sortOrder"`
}
