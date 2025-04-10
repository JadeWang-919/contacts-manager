"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { contactFields } from "@/lib/contactFields";
import { contactSchema, ContactFormData } from "@/lib/validation/contactSchema";
import TagInput from "@/components/TagInput";
import toast from "react-hot-toast";

export default function NewContactPage() {
  const router = useRouter();

  const initialFormState: ContactFormData = {
    name: "",
    phone: "",
    email: "",
    role: "",
    companySchool: "",
    notes: "",
    tags: [],
  };

  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
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

    console.log("Valid form data:", result.data);
    // TODO: send to backend or store it
    toast.success("Contact saved!");
    router.push("/contacts");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {contactFields.map((field) => (
          <div
            key={field.name}
            className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4 w-full"
          >
            <label
              htmlFor={field.name}
              className="text-sm font-medium md:w-32 md:pt-2 w-full"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "tags" ? (
              <div className="flex-1 w-full">
                <TagInput
                  value={formData.tags || []}
                  onChange={(tags) => setFormData({ ...formData, tags })}
                />
              </div>
            ) : field.type === "textarea" ? (
              <div className="flex-1 w-full">
                <textarea
                  name={field.name}
                  id={field.name}
                  value={
                    formData[field.name as keyof ContactFormData] as string
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name as keyof ContactFormData]: e.target.value,
                    })
                  }
                  className="w-full border border-gray-400 p-2 rounded"
                  rows={4}
                />
                {errors[field.name as keyof ContactFormData] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field.name as keyof ContactFormData]}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex-1 w-full">
                <input
                  type="text"
                  name={field.name}
                  id={field.name}
                  value={
                    formData[field.name as keyof ContactFormData] as string
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name as keyof ContactFormData]: e.target.value,
                    })
                  }
                  className="w-full border border-gray-400 p-2 rounded"
                  required={field.required}
                />
                {errors[field.name as keyof ContactFormData] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field.name as keyof ContactFormData]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 ease-in-out"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/contacts")}
            className="text-gray-600 underline w-fit"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
