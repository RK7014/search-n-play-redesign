package memory

import "searchnplay/backend/internal/models"

// Seed content for the services catalog, portfolio, and testimonials.
//
// Portfolio entries are original demonstration case studies. Their category
// mix (healthcare operations, agri-marketplace, mobile dispatch, e-commerce,
// nonprofit branding, technical SEO) is informed by the breadth of project
// types found in the public Search N Play portfolio, but names, narratives,
// and outcomes are illustrative rather than real client results — see
// docs/PROJECT_OVERVIEW.md. Every entry is flagged IsDemo/IsDemo: true so the
// distinction is explicit in the API response, not just in prose.

var seedServices = []models.Service{
	{
		ID:       "svc-product-engineering",
		Slug:     "product-engineering",
		Category: "Engineering",
		Name:     "Product Engineering",
		Summary:  "SaaS platforms, web applications, and enterprise software built to scale.",
		Description: "We design and build software products end to end — from a first working " +
			"version to a system that holds up under real usage. That includes SaaS platforms, " +
			"internal enterprise tools, and the APIs that connect them to everything else.",
		Capabilities: []string{
			"SaaS product development",
			"Web application engineering",
			"Enterprise software",
			"REST & GraphQL APIs",
			"Systems integration",
		},
		Icon:      "layers",
		SortOrder: 1,
	},
	{
		ID:       "svc-mobile-engineering",
		Slug:     "mobile-engineering",
		Category: "Engineering",
		Name:     "Mobile Engineering",
		Summary:  "Native and cross-platform apps for Android and iOS.",
		Description: "We build mobile apps that ship to both stores without doubling the " +
			"engineering effort where that trade-off makes sense, and go fully native when " +
			"performance or platform depth calls for it.",
		Capabilities: []string{
			"Native Android",
			"Native iOS",
			"Cross-platform (Flutter / React Native)",
			"App Store & Play Store delivery",
			"Offline-first architecture",
		},
		Icon:      "smartphone",
		SortOrder: 2,
	},
	{
		ID:       "svc-digital-experience",
		Slug:     "digital-experience",
		Category: "Design",
		Name:     "Digital Experience",
		Summary:  "UI/UX, e-commerce, and brand experiences designed to convert.",
		Description: "Interfaces that are easy to use and consistent across every screen. We " +
			"cover product design systems, marketing websites, and e-commerce experiences, " +
			"with an eye on the metrics those experiences are actually meant to move.",
		Capabilities: []string{
			"UI/UX design",
			"Design systems",
			"E-commerce experiences",
			"Brand identity",
			"Conversion-focused web design",
		},
		Icon:      "palette",
		SortOrder: 3,
	},
	{
		ID:       "svc-ai-automation",
		Slug:     "ai-automation",
		Category: "Engineering",
		Name:     "AI & Automation",
		Summary:  "AI integrations and automation that remove manual work.",
		Description: "We integrate large language models and automation into existing products " +
			"and internal workflows — from retrieval-augmented assistants to background " +
			"automation that removes repetitive manual work.",
		Capabilities: []string{
			"LLM & AI integrations",
			"Retrieval-augmented generation",
			"Workflow automation",
			"Intelligent internal tools",
			"Data-driven decisioning",
		},
		Icon:      "sparkles",
		SortOrder: 4,
	},
	{
		ID:       "svc-growth",
		Slug:     "growth",
		Category: "Growth",
		Name:     "Growth",
		Summary:  "Technical SEO, performance marketing, and conversion optimization.",
		Description: "Growth work grounded in the same engineering rigor as the product itself — " +
			"technical SEO foundations, performance marketing, and structured conversion " +
			"testing rather than guesswork.",
		Capabilities: []string{
			"Technical SEO",
			"Performance marketing",
			"Conversion rate optimization",
			"Analytics & attribution",
			"Content strategy",
		},
		Icon:      "trending-up",
		SortOrder: 5,
	},
	{
		ID:       "svc-continuous-support",
		Slug:     "continuous-support",
		Category: "Support",
		Name:     "Continuous Support",
		Summary:  "Maintenance, monitoring, security, and performance tuning.",
		Description: "Launch is a milestone, not a finish line. We keep applications monitored, " +
			"patched, and performing well after go-live, with clear SLAs instead of ad hoc " +
			"support requests.",
		Capabilities: []string{
			"Application maintenance",
			"Uptime monitoring",
			"Security patching",
			"Performance tuning",
			"SLA-backed support",
		},
		Icon:      "shield-check",
		SortOrder: 6,
	},
}

var seedProjects = []models.Project{
	{
		ID:       "prj-meridian-health",
		Slug:     "meridian-health",
		Name:     "Meridian Health",
		Category: "saas",
		Tagline:  "Care coordination for multi-site clinics",
		Summary: "A scheduling and dispatch platform for a multi-location healthcare network, " +
			"replacing spreadsheets and phone dispatch with a real-time operations dashboard.",
		Challenge: "Dispatch coordinators tracked bookings and staff availability across " +
			"spreadsheets and phone calls, causing double-bookings and slow responses at peak hours.",
		Strategy: "We scoped a phased rollout starting with the highest-volume location, " +
			"prioritizing one source of truth for scheduling before layering on reporting.",
		DesignNotes: "A dense, information-first dashboard built around the coordinator's actual " +
			"workflow, with clear status states, rather than a generic admin template.",
		Engineering: "React front end, a Go API with WebSocket updates for live dispatch status, " +
			"and PostgreSQL for scheduling data, deployed on managed cloud infrastructure.",
		Outcome: "Coordinators moved from phone-based dispatch to a shared live board across all " +
			"locations within the first rollout phase.",
		TechStack:   []string{"React", "TypeScript", "Go", "PostgreSQL", "WebSockets"},
		AccentColor: "indigo",
		IsDemo:      true,
		SortOrder:   1,
	},
	{
		ID:       "prj-harvestlink",
		Slug:     "harvestlink",
		Name:     "HarvestLink",
		Category: "web",
		Tagline:  "A digital marketplace connecting growers and buyers",
		Summary: "A responsive marketplace website for agricultural producers to list produce " +
			"and connect directly with commercial buyers.",
		Challenge: "Growers relied on informal phone networks to sell produce, with no shared " +
			"place to list availability or pricing.",
		Strategy: "We designed a lightweight listing-and-inquiry model instead of a full " +
			"transactional marketplace, matching how buyers and sellers actually negotiate.",
		DesignNotes: "Clear produce listings with availability, region, and photos, optimized " +
			"for low-bandwidth mobile browsing.",
		Engineering: "A Next.js storefront with server-rendered listings for search visibility, " +
			"a Go API for listings and inquiries, and PostgreSQL.",
		Outcome: "Gave growers a searchable public presence and a structured inquiry pipeline in " +
			"place of informal calls.",
		TechStack:   []string{"Next.js", "Go", "PostgreSQL", "Tailwind CSS"},
		AccentColor: "emerald",
		IsDemo:      true,
		SortOrder:   2,
	},
	{
		ID:       "prj-swiftaid",
		Slug:     "swiftaid",
		Name:     "SwiftAid",
		Category: "mobile",
		Tagline:  "On-demand emergency transport, dispatched in seconds",
		Summary: "Companion Android and iOS apps connecting patients with nearby ambulance " +
			"partners, plus a partner app for drivers.",
		Challenge: "Requesting emergency transport meant calling individual operators with no " +
			"visibility into who was actually available nearby.",
		Strategy: "We split the product into a requester app and a partner app from day one, " +
			"since dispatch reliability depended on partner adoption as much as requester demand.",
		DesignNotes: "A minimal, high-contrast UI designed for stressful, time-critical use — " +
			"large tap targets, status always visible on screen.",
		Engineering: "Flutter for a single mobile codebase across both apps, a Go backend for " +
			"dispatch matching, and PostgreSQL for location-aware queries.",
		Outcome: "Replaced ad hoc phone dispatch with an app-based request-and-match flow for " +
			"both patients and transport partners.",
		TechStack:   []string{"Flutter", "Go", "PostgreSQL", "Push Notifications"},
		AccentColor: "rose",
		IsDemo:      true,
		SortOrder:   3,
	},
	{
		ID:       "prj-vantage-goods",
		Slug:     "vantage-goods",
		Name:     "Vantage Goods",
		Category: "web",
		Tagline:  "A storefront rebuild built for conversion",
		Summary: "A full storefront redesign and rebuild for a multi-category retailer, focused " +
			"on checkout speed and mobile conversion.",
		Challenge: "The existing storefront had a slow, multi-step checkout and no mobile " +
			"optimization, with cart abandonment concentrated on mobile traffic.",
		Strategy: "We prioritized checkout and product-page performance over a full catalog " +
			"redesign, since analytics pointed to those two steps as the leak.",
		DesignNotes: "A streamlined single-page checkout and simplified product imagery and " +
			"layout to cut load time on mobile networks.",
		Engineering: "A Next.js storefront, a Go order-processing API, PostgreSQL, and an " +
			"integrated third-party payment gateway.",
		Outcome: "Shipped a materially faster checkout flow and mobile experience; the client's " +
			"team continued iterating on the new foundation after launch.",
		TechStack:   []string{"Next.js", "Go", "PostgreSQL", "Payments API"},
		AccentColor: "amber",
		IsDemo:      true,
		SortOrder:   4,
	},
	{
		ID:       "prj-openhands",
		Slug:     "openhands",
		Name:     "OpenHands",
		Category: "design",
		Tagline:  "Brand and web presence for a community nonprofit",
		Summary: "Brand identity, logo, and website for a nonprofit focused on community welfare " +
			"programs, designed to build donor and volunteer trust.",
		Challenge: "The organization had meaningful on-the-ground impact but no coherent visual " +
			"identity or web presence to communicate it to donors.",
		Strategy: "We led with a brand identity pass before web design, so the site had a real " +
			"visual language to build on instead of a generic template.",
		DesignNotes: "A warm, editorial layout foregrounding program stories and transparent " +
			"impact reporting over generic stock imagery.",
		Engineering: "A statically generated site built for low-maintenance long-term hosting, " +
			"with a simple content workflow for the nonprofit's team.",
		Outcome: "Gave the organization a consistent brand identity and a website they could " +
			"point donors and partners to directly.",
		TechStack:   []string{"Next.js", "Figma", "Tailwind CSS"},
		AccentColor: "teal",
		IsDemo:      true,
		SortOrder:   5,
	},
	{
		ID:       "prj-ledgerly",
		Slug:     "ledgerly",
		Name:     "Ledgerly",
		Category: "marketing",
		Tagline:  "Technical SEO and content strategy for a B2B tool",
		Summary: "A technical SEO overhaul and content strategy for a B2B financial tools " +
			"provider, rebuilding organic visibility after a platform migration.",
		Challenge: "A recent platform migration had broken canonical tags and internal linking, " +
			"causing a sharp drop in organic search visibility.",
		Strategy: "We fixed technical foundations first — crawlability, canonicals, structured " +
			"data — before investing in new content.",
		DesignNotes: "Restructured information architecture so high-intent pages were reachable " +
			"within two clicks of the homepage.",
		Engineering: "Server-rendered pages with proper metadata and schema.org markup, sitemap " +
			"automation, and search-console monitoring.",
		Outcome: "Restored technical health across the site and re-established a consistent " +
			"publishing cadence for organic content.",
		TechStack:   []string{"Next.js", "Schema.org", "Search Console", "Analytics"},
		AccentColor: "violet",
		IsDemo:      true,
		SortOrder:   6,
	},
}

var seedTestimonials = []models.Testimonial{
	{
		ID:        "tst-meridian-health",
		Quote:     "The live dispatch board matches how our coordinators actually work — no more tracking availability across five phone lines.",
		Author:    "Operations Lead",
		Role:      "Regional healthcare network · Meridian Health case study",
		ProjectID: "prj-meridian-health",
		IsDemo:    true,
		SortOrder: 1,
	},
	{
		ID:        "tst-harvestlink",
		Quote:     "We went from word-of-mouth sales to a searchable listing our buyers actually use.",
		Author:    "Founder",
		Role:      "Agricultural marketplace · HarvestLink case study",
		ProjectID: "prj-harvestlink",
		IsDemo:    true,
		SortOrder: 2,
	},
	{
		ID:        "tst-swiftaid",
		Quote:     "Drivers adopted the partner app faster than we expected, because it respects how little time they have to look at a screen.",
		Author:    "Fleet Coordinator",
		Role:      "Emergency transport network · SwiftAid case study",
		ProjectID: "prj-swiftaid",
		IsDemo:    true,
		SortOrder: 3,
	},
	{
		ID:        "tst-vantage-goods",
		Quote:     "Checkout finally feels as fast on a phone as it does on a laptop.",
		Author:    "E-commerce Manager",
		Role:      "Multi-category retailer · Vantage Goods case study",
		ProjectID: "prj-vantage-goods",
		IsDemo:    true,
		SortOrder: 4,
	},
	{
		ID:        "tst-openhands",
		Quote:     "The new site gives donors something to point to. It finally looks like the organization we actually are.",
		Author:    "Program Director",
		Role:      "Community nonprofit · OpenHands case study",
		ProjectID: "prj-openhands",
		IsDemo:    true,
		SortOrder: 5,
	},
	{
		ID:        "tst-ledgerly",
		Quote:     "Our organic traffic stopped bleeding out within the first month of the technical fixes landing.",
		Author:    "Head of Marketing",
		Role:      "B2B fintech tools provider · Ledgerly case study",
		ProjectID: "prj-ledgerly",
		IsDemo:    true,
		SortOrder: 6,
	},
}
