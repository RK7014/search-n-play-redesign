// Package validation provides small, dependency-free helpers for validating
// API input and accumulating field-level errors to return to the client.
package validation

import (
	"regexp"
	"strings"
)

// emailPattern is a pragmatic (not fully RFC 5322) email check, deliberately
// permissive on the local part and strict on requiring a dotted domain.
var emailPattern = regexp.MustCompile(`^[a-zA-Z0-9.!#$%&'*+/=?^_` + "`" + `{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$`)

// indianMobilePattern matches a bare 10-digit Indian mobile number — the
// TRAI numbering plan reserves 6-9 as the leading digit for mobile
// (as opposed to landline) numbers.
var indianMobilePattern = regexp.MustCompile(`^[6-9]\d{9}$`)

// Errors accumulates field -> message validation failures.
type Errors map[string]string

// Add records a validation failure for a field. The first message for a
// given field wins so callers can validate in priority order.
func (e Errors) Add(field, message string) {
	if _, exists := e[field]; !exists {
		e[field] = message
	}
}

// HasErrors reports whether any field has failed validation.
func (e Errors) HasErrors() bool {
	return len(e) > 0
}

// Required reports whether s has non-whitespace content.
func Required(s string) bool {
	return strings.TrimSpace(s) != ""
}

// MaxLen reports whether s is at most n runes long.
func MaxLen(s string, n int) bool {
	return len([]rune(s)) <= n
}

// MinLen reports whether s is at least n runes long (after trimming).
func MinLen(s string, n int) bool {
	return len([]rune(strings.TrimSpace(s))) >= n
}

// IsEmail reports whether s looks like a valid email address.
func IsEmail(s string) bool {
	s = strings.TrimSpace(s)
	return s != "" && len(s) <= 254 && emailPattern.MatchString(s)
}

// OneOf reports whether s (case-insensitive) is present in options. An empty
// options slice always returns true (no constraint configured).
func OneOf(s string, options []string) bool {
	s = strings.ToLower(strings.TrimSpace(s))
	for _, opt := range options {
		if strings.ToLower(opt) == s {
			return true
		}
	}
	return false
}

// AllOneOf reports whether every value in values is present in options.
// An empty values slice is considered valid (the field is optional).
func AllOneOf(values []string, options []string) bool {
	for _, v := range values {
		if !OneOf(v, options) {
			return false
		}
	}
	return true
}

// SanitizePhone strips characters that are never legitimate in a phone
// number, without asserting a specific national format.
func SanitizePhone(s string) string {
	s = strings.TrimSpace(s)
	var b strings.Builder
	for _, r := range s {
		switch {
		case r >= '0' && r <= '9', r == '+', r == ' ', r == '-', r == '(', r == ')':
			b.WriteRune(r)
		}
	}
	return b.String()
}

// phoneCharsPattern matches strings containing only digits and the
// formatting characters a real phone number legitimately uses. Anything
// else (letters, punctuation) means this isn't a phone number at all, so
// NormalizePhoneDigits rejects it outright rather than silently discarding
// the stray characters — quietly stripping letters would let something
// like "9876543210x" or "abc9876543210" pass as if it were clean.
var phoneCharsPattern = regexp.MustCompile(`^[0-9+\-() ]+$`)

// NormalizePhoneDigits strips legitimate phone formatting (+, spaces,
// dashes, parens) and drops a leading "91" country code if present, so
// "+91 98765 43210" and "9876543210" both normalize to the same bare
// 10-digit string before format validation. Returns "" if s contains any
// character that isn't a digit or phone-formatting punctuation.
func NormalizePhoneDigits(s string) string {
	s = strings.TrimSpace(s)
	if s == "" || !phoneCharsPattern.MatchString(s) {
		return ""
	}
	var b strings.Builder
	for _, r := range s {
		if r >= '0' && r <= '9' {
			b.WriteRune(r)
		}
	}
	digits := b.String()
	if len(digits) == 12 && strings.HasPrefix(digits, "91") {
		digits = digits[2:]
	}
	return digits
}

// IsIndianMobile reports whether s (after NormalizePhoneDigits) is a
// real-looking 10-digit Indian mobile number: the right length and leading
// digit, and not an obviously fake placeholder like "0000000000" or
// "1234567890".
func IsIndianMobile(s string) bool {
	digits := NormalizePhoneDigits(s)
	return indianMobilePattern.MatchString(digits) && !isRepeatedDigit(digits) && !isSequentialRun(digits)
}

func isRepeatedDigit(digits string) bool {
	for i := 1; i < len(digits); i++ {
		if digits[i] != digits[0] {
			return false
		}
	}
	return true
}

// isSequentialRun reports whether digits is a straight ascending or
// descending run, e.g. "1234567890" or "9876543210".
func isSequentialRun(digits string) bool {
	ascending, descending := true, true
	for i := 1; i < len(digits); i++ {
		// Cast to int before subtracting: digits[i] is an unsigned byte, and
		// a naive byte subtraction wraps around at boundaries like '0'-'9'
		// instead of going negative.
		diff := int(digits[i]) - int(digits[i-1])
		if diff != 1 {
			ascending = false
		}
		if diff != -1 {
			descending = false
		}
	}
	return ascending || descending
}
