import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .or(z.literal("")) // ✅ allow empty string
    .optional(),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-().]{7,20}$/, "Invalid phone number")
    .or(z.literal("")) // ✅ allow empty string
    .optional(),
  role: z.string().optional(),
  companySchool: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).max(5, "You can add up to 5 tags").optional(),
});

// Export type directly from the schema
export type ContactFormData = z.infer<typeof contactSchema>;

// Add full contact type
export type ContactInfo = ContactFormData & {
  id: string | number;
};
