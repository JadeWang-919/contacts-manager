import { z } from "zod";
import { contactFieldDefs, FieldType } from "./contactFields";

const zodFieldMap: Record<FieldType, z.ZodTypeAny> = {
  text: z.string(),
  textarea: z.string(),
  tags: z.array(z.string()).max(5, "You can add up to 5 tags"),
};

const baseSchema = Object.fromEntries(
  contactFieldDefs.map((field) => {
    let schema = zodFieldMap[field.type] ?? z.string();

    if (field.fieldName === "email") {
      schema = z
        .union([z.string().email("Invalid email"), z.literal(""), z.null()])
        .optional();
    } else if (field.fieldName === "phone") {
      schema = z
        .union([
          z.string().regex(/^[+]?[\d\s\-().]{7,20}$/, "Invalid phone number"),
          z.literal(""),
          z.null(),
        ])
        .optional();
    } else {
      schema = field.required
        ? (schema as z.ZodString).min(1, `${field.label} is required`)
        : schema.optional();
    }

    return [field.fieldName, schema];
  })
);

export const contactSchema = z.object(baseSchema);
export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactInfo = ContactFormData & { id: string | number };
