export type FieldType = "text" | "textarea" | "tags";

export interface ContactField {
  fieldName: string;
  label: string;
  type: FieldType;
  required?: boolean;
  displayAsHeading?: boolean;
  icon?: string;
}

export const contactFieldDefs: ContactField[] = [
  {
    fieldName: "name",
    label: "Full Name",
    type: "text",
    required: true,
    displayAsHeading: true,
  },
  {
    fieldName: "role",
    label: "Role",
    type: "text",
  },
  {
    fieldName: "companySchool",
    label: "Company or School",
    type: "text",
  },
  {
    fieldName: "phone",
    label: "Phone Number",
    type: "text",
    icon: "📞",
  },
  {
    fieldName: "email",
    label: "Email Address",
    type: "text",
    icon: "✉️",
  },
  {
    fieldName: "notes",
    label: "Notes",
    type: "textarea",
  },
  {
    fieldName: "tags",
    label: "Tags",
    type: "tags",
  },
];
