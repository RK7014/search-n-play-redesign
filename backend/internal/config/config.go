// Package config loads runtime configuration from environment variables
// (optionally via a local .env file for development).
package config

import (
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Env         string // "development" | "production"
	Port        string
	DatabaseURL string

	AllowedOrigins []string

	RateLimitRPS   float64
	RateLimitBurst int

	MaxRequestBodyBytes int64
	ReadHeaderTimeout   time.Duration
	ShutdownTimeout     time.Duration
}

// Load reads configuration from the environment. It first attempts to load
// a .env file (ignored silently if absent — production deployments are
// expected to inject real environment variables instead).
func Load() Config {
	_ = godotenv.Load()

	return Config{
		Env:         getString("APP_ENV", "development"),
		Port:        getString("PORT", "8080"),
		DatabaseURL: getString("DATABASE_URL", ""),

		AllowedOrigins: getStringSlice("ALLOWED_ORIGINS", []string{
			"http://localhost:3000",
			"http://127.0.0.1:3000",
		}),

		RateLimitRPS:   getFloat("RATE_LIMIT_RPS", 2),
		RateLimitBurst: getInt("RATE_LIMIT_BURST", 10),

		MaxRequestBodyBytes: getInt64("MAX_REQUEST_BODY_BYTES", 1<<20), // 1 MiB
		ReadHeaderTimeout:   5 * time.Second,
		ShutdownTimeout:     10 * time.Second,
	}
}

func (c Config) IsProduction() bool {
	return strings.EqualFold(c.Env, "production")
}

func getString(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}

func getStringSlice(key string, fallback []string) []string {
	v, ok := os.LookupEnv(key)
	if !ok || strings.TrimSpace(v) == "" {
		return fallback
	}
	parts := strings.Split(v, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if trimmed := strings.TrimSpace(p); trimmed != "" {
			out = append(out, trimmed)
		}
	}
	if len(out) == 0 {
		return fallback
	}
	return out
}

func getInt(key string, fallback int) int {
	if v, ok := os.LookupEnv(key); ok {
		if n, err := strconv.Atoi(v); err == nil {
			return n
		}
	}
	return fallback
}

func getInt64(key string, fallback int64) int64 {
	if v, ok := os.LookupEnv(key); ok {
		if n, err := strconv.ParseInt(v, 10, 64); err == nil {
			return n
		}
	}
	return fallback
}

func getFloat(key string, fallback float64) float64 {
	if v, ok := os.LookupEnv(key); ok {
		if n, err := strconv.ParseFloat(v, 64); err == nil {
			return n
		}
	}
	return fallback
}
