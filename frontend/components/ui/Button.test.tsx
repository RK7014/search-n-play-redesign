import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button, ButtonLink } from "./Button";

describe("Button", () => {
  it("renders children and responds to clicks", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send message</Button>);

    const button = screen.getByRole("button", { name: "Send message" });
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button and shows a spinner while loading", () => {
    render(<Button loading>Send message</Button>);

    const button = screen.getByRole("button", { name: /send message/i });
    expect(button).toBeDisabled();
  });
});

describe("ButtonLink", () => {
  it("renders an anchor pointing at the given href", () => {
    render(<ButtonLink href="/contact">Start a Project</ButtonLink>);

    const link = screen.getByRole("link", { name: "Start a Project" });
    expect(link).toHaveAttribute("href", "/contact");
  });
});
