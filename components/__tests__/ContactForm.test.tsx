import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../ContactForm";

// ✅ Mock useRouter from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save contact/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: /save contact/i }));

    expect(
      await screen.findByText("Full Name is required")
    ).toBeInTheDocument();
  });

  it("shows error for invalid email format", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "abc@" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save contact/i }));

    expect(
      await screen.findByText("Please enter a valid email address")
    ).toBeInTheDocument();
  });

  it("submits valid form data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jane@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save contact/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
