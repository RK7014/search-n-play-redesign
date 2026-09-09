// Mirrors the backend's phone rules (backend/internal/validation) so the
// form gives the same answer instantly that the server would after a round
// trip — TRAI reserves 6-9 as the leading digit for Indian mobile numbers,
// and a few obviously-fake placeholder patterns are rejected either way.

/** Strips everything but digits, for use in an input's onChange as a live mask. */
export function sanitizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10);
}

function isRepeatedDigit(digits: string): boolean {
  return digits.split("").every((d) => d === digits[0]);
}

function isSequentialRun(digits: string): boolean {
  let ascending = true;
  let descending = true;
  for (let i = 1; i < digits.length; i++) {
    const diff = digits.charCodeAt(i) - digits.charCodeAt(i - 1);
    if (diff !== 1) ascending = false;
    if (diff !== -1) descending = false;
  }
  return ascending || descending;
}

/** Validates an already-sanitized (digits-only) phone string. */
export function isValidIndianMobile(digits: string): boolean {
  return /^[6-9]\d{9}$/.test(digits) && !isRepeatedDigit(digits) && !isSequentialRun(digits);
}
