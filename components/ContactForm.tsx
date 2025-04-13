"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { contactSchema, ContactFormData } from "@/lib/contactSchema";
import { contactFieldDefs } from "@/lib/contactFields";
import TagInput from "./TagInput";
import toast from "react-hot-toast";

type ContactFormProps = {
  initialData?: ContactFormData;
  contactId?: string;
};

export default function ContactForm({
  initialData,
  contactId,
}: ContactFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ContactFormData>(
    initialData || {
      name: "",
      phone: "",
      email: "",
      role: "",
      companySchool: "",
      notes: "",
      tags: [],
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactFormData;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(
        contactId ? `/api/contacts/${contactId}` : "/api/contacts",
        {
          method: contactId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.error || "Something went wrong");
        setIsSubmitting(false);
        return;
      }

      toast.success(contactId ? "Contact updated!" : "Contact created!");
      router.push("/contacts");
    } catch (err) {
      console.error("Failed to submit:", err);
      toast.error("Unexpected error");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {contactFieldDefs.map((field) => {
        const fieldName = field.fieldName as keyof ContactFormData;
        const value = formData[fieldName]; // e.g., value=formData["email"], might be a string or null
        const error = errors[fieldName];

        return (
          <div
            key={field.fieldName}
            className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4 w-full"
          >
            <label
              htmlFor={field.fieldName}
              className="text-sm font-medium md:w-32 md:pt-2 w-full"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="flex-1 w-full">
              {field.type === "tags" ? (
                <TagInput
                  value={value as string[]}
                  onChange={(tags) =>
                    setFormData({ ...formData, [fieldName]: tags })
                  }
                />
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.fieldName}
                  value={value != null ? value : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [fieldName]: e.target.value,
                    })
                  }
                  className="w-full border border-gray-400 p-2 rounded"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  id={field.fieldName}
                  value={value != null ? value : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [fieldName]: e.target.value,
                    })
                  }
                  className="w-full border border-gray-400 p-2 rounded"
                />
              )}
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
          </div>
        );
      })}

      <div className="flex justify-end gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          {isSubmitting
            ? "Saving..."
            : contactId
            ? "Save Changes"
            : "Save Contact"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/contacts")}
          className="text-gray-600 underline"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
