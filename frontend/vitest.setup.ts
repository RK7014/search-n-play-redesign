import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// The /vitest entry point both extends `expect` at runtime and augments
// Vitest's `Assertion` type, so `toBeInTheDocument()` etc. type-check too.
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

// jsdom doesn't implement matchMedia; framer-motion's useReducedMotion (used
// throughout the marketing components) calls it on every render.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
