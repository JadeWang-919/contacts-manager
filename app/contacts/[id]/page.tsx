"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ContactFormData } from "@/lib/contactSchema";
import ContactForm from "@/components/ContactForm";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";

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

  if (loading)
    return (
      <div className="w-full flex items-center justify-center">
        <BarLoader color="##5cdfa3" loading={loading} />
      </div>
    );
  if (!formData)
    return <p className="text-center text-red-500 mt-10">Contact not found.</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <ContactForm initialData={formData} contactId={id as string} />
    </div>
  );
}
