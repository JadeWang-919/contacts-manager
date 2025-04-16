import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConfirmModal from "../ConfirmModal";

describe("ConfirmModal", () => {
  const title = "Delete Contact";
  const message = "Are you sure you want to delete this?";
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    onConfirm.mockClear();
    onCancel.mockClear();
  });

  it("renders title and message", () => {
    render(
      <ConfirmModal
        title={title}
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("calls onConfirm when Delete is clicked", () => {
    render(
      <ConfirmModal
        title={title}
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when Cancel is clicked", () => {
    render(
      <ConfirmModal
        title={title}
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when Escape key is pressed", () => {
    render(
      <ConfirmModal
        title={title}
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("has correct ARIA attributes", () => {
    render(
      <ConfirmModal
        title={title}
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  it("starts focus inside the modal", async () => {
    render(
      <ConfirmModal
        title="Delete Contact"
        message="Are you sure you want to delete this?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    const dialog = screen.getByRole("dialog");
    await waitFor(() => {
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    });
  });
});
