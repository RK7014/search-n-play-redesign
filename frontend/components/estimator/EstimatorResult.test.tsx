import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { EstimatorResultCard } from "./EstimatorResult";
import type { EstimateResult } from "@/lib/types";

const sampleResult: EstimateResult = {
  complexityScore: 74,
  complexityLabel: "Advanced",
  timelineMinWeeks: 12,
  timelineMaxWeeks: 20,
  costMinInr: 1000000,
  costMaxInr: 2500000,
  recommendedApproach: "Ship an MVP first, then expand.",
  recommendedStack: ["Next.js + TypeScript", "Go REST API", "PostgreSQL"],
  teamComposition: ["2-3 engineers", "1 product designer"],
  disclaimer: "This is an indicative estimate, not a binding quotation.",
};

describe("EstimatorResultCard", () => {
  it("renders the computed estimate", () => {
    render(<EstimatorResultCard result={sampleResult} />);

    expect(screen.getByText("Advanced")).toBeInTheDocument();
    expect(screen.getByText("12–20 weeks")).toBeInTheDocument();
    expect(screen.getByText("₹10,00,000–₹25,00,000")).toBeInTheDocument();
    expect(screen.getByText(sampleResult.recommendedApproach)).toBeInTheDocument();
    expect(screen.getByText("Next.js + TypeScript")).toBeInTheDocument();
    expect(screen.getByText(sampleResult.disclaimer)).toBeInTheDocument();
    // The visible number animates in via requestAnimationFrame, but the
    // accessible status text renders the real value synchronously.
    expect(
      screen.getByText("Estimated complexity score 74 out of 100 — Advanced.")
    ).toBeInTheDocument();
  });
});
