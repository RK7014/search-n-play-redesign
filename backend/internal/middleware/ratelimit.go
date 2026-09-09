package middleware

import (
	"net"
	"net/http"
	"sync"
	"time"

	"golang.org/x/time/rate"

	"searchnplay/backend/internal/httpx"
)

// visitor tracks the token bucket for one client IP plus a last-seen
// timestamp so idle entries can be evicted.
type visitor struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

// IPRateLimiter is a simple per-IP token bucket limiter, suitable for
// protecting public write endpoints (contact, newsletter, estimate) on a
// single-instance deployment. A production multi-instance deployment would
// move this state to Redis; documented as a future improvement.
type IPRateLimiter struct {
	mu       sync.Mutex
	visitors map[string]*visitor
	rps      rate.Limit
	burst    int
}

// NewIPRateLimiter builds a limiter allowing rps requests/second per IP
// with the given burst, and starts a background goroutine that evicts
// visitors idle for more than 10 minutes.
func NewIPRateLimiter(rps float64, burst int) *IPRateLimiter {
	l := &IPRateLimiter{
		visitors: make(map[string]*visitor),
		rps:      rate.Limit(rps),
		burst:    burst,
	}
	go l.cleanupLoop()
	return l
}

func (l *IPRateLimiter) cleanupLoop() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()
	for range ticker.C {
		l.mu.Lock()
		for ip, v := range l.visitors {
			if time.Since(v.lastSeen) > 10*time.Minute {
				delete(l.visitors, ip)
			}
		}
		l.mu.Unlock()
	}
}

func (l *IPRateLimiter) allow(ip string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	v, ok := l.visitors[ip]
	if !ok {
		v = &visitor{limiter: rate.NewLimiter(l.rps, l.burst)}
		l.visitors[ip] = v
	}
	v.lastSeen = time.Now()
	return v.limiter.Allow()
}

// Limit returns middleware enforcing the limiter for every request it
// wraps. Apply it selectively to public write endpoints, not read-only or
// health-check routes.
func (l *IPRateLimiter) Limit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := requestIP(r)
		if !l.allow(ip) {
			httpx.WriteError(w, http.StatusTooManyRequests, RequestIDFromContext(r.Context()),
				"RATE_LIMITED", "Too many requests. Please try again in a moment.", nil)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func requestIP(r *http.Request) string {
	if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
		return fwd
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
