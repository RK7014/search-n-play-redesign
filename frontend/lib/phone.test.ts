import { describe, expect, it } from "vitest";

import { isValidIndianMobile, sanitizePhoneDigits } from "./phone";

describe("sanitizePhoneDigits", () => {
  it("strips non-digit characters", () => {
    expect(sanitizePhoneDigits("+91 98451-23670")).toBe("9198451236");
  });

  it("caps at 10 characters", () => {
    expect(sanitizePhoneDigits("98451236709999")).toBe("9845123670");
  });

  it("rejects letters entirely rather than passing them through", () => {
    expect(sanitizePhoneDigits("abc9845123670")).toBe("9845123670");
  });
});

describe("isValidIndianMobile", () => {
  it("accepts a real-looking 10-digit number starting with 6-9", () => {
    expect(isValidIndianMobile("9845123670")).toBe(true);
    expect(isValidIndianMobile("6000000001")).toBe(true);
  });

  it("rejects numbers that don't start with 6-9", () => {
    expect(isValidIndianMobile("1234567890")).toBe(false);
    expect(isValidIndianMobile("5876543210")).toBe(false);
  });

  it("rejects an all-repeated-digit number", () => {
    expect(isValidIndianMobile("9999999999")).toBe(false);
  });

  it("rejects a sequential run even if it starts with a valid digit", () => {
    expect(isValidIndianMobile("9876543210")).toBe(false);
  });

  it("rejects the wrong length", () => {
    expect(isValidIndianMobile("98765432")).toBe(false);
    expect(isValidIndianMobile("98451236701")).toBe(false);
  });
});
