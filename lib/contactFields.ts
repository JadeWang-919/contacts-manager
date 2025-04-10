export interface ContactField {
  name: string;
  label: string;
  type: "text" | "textarea" | "tags";
  required?: boolean;
  displayAsHeading?: boolean;
  icon?: string;
}

export const contactFields: ContactField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    displayAsHeading: true, // Show as card heading
  },
  {
    name: "role",
    label: "Role",
    type: "text",
  },
  {
    name: "companySchool",
    label: "Company or School",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    icon: "📞",
  },
  {
    name: "email",
    label: "Email Address",
    type: "text",
    icon: "✉️",
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
  },
  {
    name: "tags",
    label: "Tags",
    type: "tags",
  },
];
