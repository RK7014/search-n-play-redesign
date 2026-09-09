package models

// Testimonial represents one quote shown in the testimonial carousel.
//
// IsDemo marks illustrative/demo content, as opposed to a verified quote from
// a named, real customer. See docs/PROJECT_OVERVIEW.md for why this showcase
// ships with IsDemo=true throughout.
type Testimonial struct {
	ID        string `json:"id"`
	Quote     string `json:"quote"`
	Author    string `json:"author"`
	Role      string `json:"role"`
	ProjectID string `json:"projectId,omitempty"`
	IsDemo    bool   `json:"isDemo"`
	SortOrder int    `json:"sortOrder"`
}
