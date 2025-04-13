"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ContactFormData } from "@/lib/contactSchema";
import ContactForm from "@/components/ContactForm";
import toast from "react-hot-toast";

export default function EditContactPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState<ContactFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch(`/api/contacts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch contact");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load contact");
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!formData)
    return <p className="text-center text-red-500 mt-10">Contact not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <ContactForm initialData={formData} contactId={id as string} />
    </div>
  );
}
