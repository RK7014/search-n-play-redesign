// Command server runs the Search N Play redesign demo API.
//
// With DATABASE_URL set, it connects to PostgreSQL and applies any pending
// migrations automatically on startup. Without it, the server falls back to
// an in-memory store so the site is fully functional with zero setup.
package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"searchnplay/backend/internal/config"
	"searchnplay/backend/internal/db"
	"searchnplay/backend/internal/handlers"
	"searchnplay/backend/internal/middleware"
	"searchnplay/backend/internal/repository"
	"searchnplay/backend/internal/repository/memory"
	"searchnplay/backend/internal/repository/postgres"
	"searchnplay/backend/internal/services"
	"searchnplay/backend/migrations"
)

const version = "1.0.0"

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	cfg := config.Load()

	pool := connectDatabase(cfg, logger)

	var (
		contactRepo     repository.ContactRepository
		newsletterRepo  repository.NewsletterRepository
		serviceRepo     repository.ServiceRepository
		projectRepo     repository.ProjectRepository
		testimonialRepo repository.TestimonialRepository
	)

	if pool != nil {
		contactRepo = postgres.NewContactRepo(pool)
		newsletterRepo = postgres.NewNewsletterRepo(pool)
		serviceRepo = postgres.NewServiceRepo(pool)
		projectRepo = postgres.NewProjectRepo(pool)
		testimonialRepo = postgres.NewTestimonialRepo(pool)
	} else {
		logger.Warn("using in-memory storage — submitted data will not persist across restarts; set DATABASE_URL to use PostgreSQL")
		contactRepo = memory.NewContactStore()
		newsletterRepo = memory.NewNewsletterStore()
		serviceRepo = memory.NewServiceStore()
		projectRepo = memory.NewProjectStore()
		testimonialRepo = memory.NewTestimonialStore()
	}

	contactHandler := handlers.NewContactHandler(services.NewContactService(contactRepo), logger)
	newsletterHandler := handlers.NewNewsletterHandler(services.NewNewsletterService(newsletterRepo), logger)
	estimateHandler := handlers.NewEstimateHandler(services.NewEstimateService(), logger)
	catalogHandler := handlers.NewCatalogHandler(services.NewCatalogService(serviceRepo, projectRepo, testimonialRepo), logger)
	healthHandler := handlers.NewHealthHandler(version, databaseStatusFunc(pool))

	limiter := middleware.NewIPRateLimiter(cfg.RateLimitRPS, cfg.RateLimitBurst)

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/health", healthHandler.Health)
	mux.HandleFunc("GET /api/services", catalogHandler.Services)
	mux.HandleFunc("GET /api/projects", catalogHandler.Projects)
	mux.HandleFunc("GET /api/testimonials", catalogHandler.Testimonials)
	mux.Handle("POST /api/contact", limiter.Limit(http.HandlerFunc(contactHandler.Create)))
	mux.Handle("POST /api/newsletter", limiter.Limit(http.HandlerFunc(newsletterHandler.Subscribe)))
	mux.Handle("POST /api/estimate", limiter.Limit(http.HandlerFunc(estimateHandler.Create)))

	handler := middleware.Chain(mux,
		middleware.RequestID,
		middleware.Logging(logger),
		middleware.Recover(logger),
		middleware.SecurityHeaders,
		middleware.CORS(cfg.AllowedOrigins),
		middleware.BodyLimit(cfg.MaxRequestBodyBytes),
	)

	server := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           handler,
		ReadHeaderTimeout: cfg.ReadHeaderTimeout,
	}

	go func() {
		logger.Info("server starting", "port", cfg.Port, "env", cfg.Env)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Error("server failed to start", "error", err)
			os.Exit(1)
		}
	}()

	waitForShutdownSignal()
	logger.Info("shutdown signal received")

	ctx, cancel := context.WithTimeout(context.Background(), cfg.ShutdownTimeout)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		logger.Error("graceful shutdown failed", "error", err)
	}
	if pool != nil {
		pool.Close()
	}
	logger.Info("shutdown complete")
}

// connectDatabase attempts to connect and migrate when DATABASE_URL is set.
// Any failure is logged and treated as "no database" rather than a fatal
// error, so a misconfigured Postgres instance never takes the whole site
// down in this demo.
func connectDatabase(cfg config.Config, logger *slog.Logger) *pgxpool.Pool {
	if cfg.DatabaseURL == "" {
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	pool, err := db.NewPool(ctx, cfg.DatabaseURL)
	cancel()
	if err != nil {
		logger.Error("could not connect to PostgreSQL, falling back to in-memory storage", "error", err)
		return nil
	}

	migrateCtx, migrateCancel := context.WithTimeout(context.Background(), 30*time.Second)
	err = db.Migrate(migrateCtx, pool, migrations.Files)
	migrateCancel()
	if err != nil {
		logger.Error("could not apply migrations, falling back to in-memory storage", "error", err)
		pool.Close()
		return nil
	}

	logger.Info("connected to PostgreSQL and applied migrations")
	return pool
}

func databaseStatusFunc(pool *pgxpool.Pool) func() string {
	return func() string {
		if pool == nil {
			return "disabled"
		}
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()
		if err := pool.Ping(ctx); err != nil {
			return "unreachable"
		}
		return "ok"
	}
}

func waitForShutdownSignal() {
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop
}
