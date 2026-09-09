import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
}

describe("Navbar", () => {
  it("opens and closes the mobile menu", async () => {
    renderNavbar();

    const openButton = screen.getByRole("button", { name: /open menu/i });
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(openButton);
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(closeButton);
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("renders the primary navigation links", () => {
    renderNavbar();

    expect(screen.getAllByRole("link", { name: "Services" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Start a Project" }).length).toBeGreaterThan(0);
  });
});
