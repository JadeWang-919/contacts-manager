import { ContactInfo } from "./validation/contactSchema";

export const dummyContacts: ContactInfo[] = [
  {
    id: 1,
    name: "Alice Smith",
    phone: "123-456-7890",
    email: "alice@example.com",
    role: "Software Engineer",
    companySchool: "Tech Corp",
    notes: "Met at the conference last year.",
  },
  {
    id: 2,
    name: "Bob Lee",
    phone: "234-567-8901",
    email: "bob@example.com",
    role: "Product Manager",
    companySchool: "Innovate Inc",
    notes: "Discussed potential collaboration on the project.",
    tags: ["collaboration", "project"],
  },
  {
    id: 3,
    name: "Bob Lee",
    phone: "234-567-8901",
    email: "bob@example.com",
    role: "Product Manager",
    companySchool: "Innovate Inc",
    notes: "Discussed potential collaboration on the project.",
  },
  {
    id: 4,
    name: "Bob Lee",
    phone: "234-567-8901",
    email: "bob@example.com",
    role: "Product Manager",
    companySchool: "Innovate Inc",
    notes: "Discussed potential collaboration on the project.",
  },
];
