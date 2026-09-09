import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "./ContactForm";
import { submitContact } from "@/lib/api";

vi.mock("@/lib/api", () => ({
  submitContact: vi.fn(),
}));

const submitContactMock = vi.mocked(submitContact);

describe("ContactForm", () => {
  beforeEach(() => {
    submitContactMock.mockReset();
  });

  it("shows field-level validation errors returned by the API", async () => {
    submitContactMock.mockResolvedValue({
      error: {
        code: "VALIDATION_ERROR",
        message: "Please fix the highlighted fields.",
        fields: { email: "Enter a valid email address." },
      },
    });

    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/full name/i), "Jordan Rivera");
    await userEvent.type(screen.getByLabelText(/^email/i), "not-an-email");
    await userEvent.type(screen.getByLabelText(/phone/i), "9845123670");
    await userEvent.type(
      screen.getByLabelText(/tell us about the project/i),
      "We would like to build a new customer portal."
    );
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(submitContactMock).toHaveBeenCalledTimes(1);
  });

  it("shows a confirmation once the message is sent successfully", async () => {
    submitContactMock.mockResolvedValue({
      data: {
        id: "contact-1",
        name: "Jordan Rivera",
        email: "jordan@example.com",
        message: "We would like to build a new customer portal.",
        createdAt: new Date().toISOString(),
      },
    });

    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/full name/i), "Jordan Rivera");
    await userEvent.type(screen.getByLabelText(/^email/i), "jordan@example.com");
    await userEvent.type(screen.getByLabelText(/phone/i), "9845123670");
    await userEvent.type(
      screen.getByLabelText(/tell us about the project/i),
      "We would like to build a new customer portal."
    );
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/jordan@example.com/)).toBeInTheDocument();
  });
});
