import { render, screen } from "@testing-library/react";
import ContactCard from "../ContactCard";
import { Contact } from "@prisma/client";

const mockContact: Contact = {
  id: "1",
  userId: "user1",
  name: "Jade",
  email: "jade@example.com",
  phone: "123456",
  role: "Designer",
  companySchool: "Netflix",
  notes: "Past teammate",
  tags: ["friend", "ui"],
};

describe("ContactCard", () => {
  it("renders contact name", () => {
    render(<ContactCard contact={mockContact} onDeleteRequest={() => {}} />);
    expect(screen.getByText("Jade")).toBeInTheDocument();
  });

  it("shows email and phone", () => {
    render(<ContactCard contact={mockContact} onDeleteRequest={() => {}} />);
    expect(screen.getByText("📞 123456")).toBeInTheDocument();
    expect(screen.getByText("✉️ jade@example.com")).toBeInTheDocument();
  });
});
