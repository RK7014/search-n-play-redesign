package validation

import "testing"

func TestIsEmail(t *testing.T) {
	cases := map[string]bool{
		"person@example.com":       true,
		"first.last+tag@sub.co":    true,
		"":                         false,
		"not-an-email":             false,
		"missing-domain@":          false,
		"@missing-local.com":       false,
		"spaces in@example.com":    false,
		"double@@example.com":      false,
		"person@example":           false,
		"person@-example.com":      false,
	}

	for input, want := range cases {
		if got := IsEmail(input); got != want {
			t.Errorf("IsEmail(%q) = %v, want %v", input, got, want)
		}
	}
}

func TestRequired(t *testing.T) {
	if Required("   ") {
		t.Error("Required(whitespace) should be false")
	}
	if !Required("hi") {
		t.Error("Required(non-empty) should be true")
	}
}

func TestOneOf(t *testing.T) {
	opts := []string{"web", "mobile", "saas"}
	if !OneOf("Mobile", opts) {
		t.Error("OneOf should be case-insensitive")
	}
	if OneOf("desktop", opts) {
		t.Error("OneOf should reject values outside the list")
	}
}

func TestErrorsAddKeepsFirstMessage(t *testing.T) {
	errs := Errors{}
	errs.Add("email", "first message")
	errs.Add("email", "second message")

	if errs["email"] != "first message" {
		t.Errorf("expected first message to win, got %q", errs["email"])
	}
	if !errs.HasErrors() {
		t.Error("expected HasErrors to be true")
	}
}

func TestSanitizePhone(t *testing.T) {
	got := SanitizePhone("+1 (555) 123-4567 ext.99")
	want := "+1 (555) 123-4567 99"
	if got != want {
		t.Errorf("SanitizePhone() = %q, want %q", got, want)
	}
}

func TestNormalizePhoneDigits(t *testing.T) {
	cases := map[string]string{
		"+91 98765 43210": "9876543210",
		"919876543210":    "9876543210",
		"9876543210":      "9876543210",
		"98765-43210":     "9876543210",
	}
	for input, want := range cases {
		if got := NormalizePhoneDigits(input); got != want {
			t.Errorf("NormalizePhoneDigits(%q) = %q, want %q", input, got, want)
		}
	}
}

func TestIsIndianMobile(t *testing.T) {
	cases := map[string]bool{
		"9845123670":      true,
		"+91 98451 23670": true,
		"6000000001":      true,
		"9876543210":      false, // a perfect descending run, not a real assigned number
		"1234567890":      false, // doesn't start 6-9, and an ascending run
		"0000000000":      false, // doesn't start 6-9, and repeated
		"9999999999":      false, // repeated digit
		"9845123670x":     false, // stray letter — must be rejected, not silently stripped
		"98765432":        false, // too short
		"98451236701":     false, // too long
		"6789012345":      true,  // starts 6-9, not a pure ascending/descending run once it wraps past 9
		"5876543210":      false, // starts with 5, not a valid mobile prefix
	}
	for input, want := range cases {
		if got := IsIndianMobile(input); got != want {
			t.Errorf("IsIndianMobile(%q) = %v, want %v", input, got, want)
		}
	}
}
