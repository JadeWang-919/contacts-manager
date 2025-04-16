"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Contact } from "@prisma/client";
import { useSearchStore } from "@/lib/store/searchStore";
import { useTagFilterStore } from "@/lib/store/tagFilterStore";
import ContactsList from "./ContactsList";
import ExportButton from "./ExportButton";
import TagFilter from "./TagFilter";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  contacts: Contact[];
}

export default function ContactsPageClient({ contacts }: Props) {
  const { query } = useSearchStore();
  const { selectedTags } = useTagFilterStore();
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const router = useRouter();

  const allTags = Array.from(
    new Set(contacts.flatMap((c) => c.tags || []))
  ).sort();

  const filtered = contacts.filter((c) => {
    const text = `${c.name} ${c.role} ${c.companySchool} ${c.phone} ${
      c.email
    } ${c.notes || ""} ${c.tags?.join(" ")}`.toLowerCase();

    const matchesSearch = text.includes(query.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => c.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleDelete = async () => {
    if (!contactToDelete) return;

    try {
      const res = await fetch(`/api/contacts/${contactToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Contact deleted");
      router.refresh();
    } catch (err) {
      console.error("Failed to delete contact:", err);
      toast.error("Failed to delete contact");
    } finally {
      setContactToDelete(null);
    }
  };

  return (
    <>
      <div className="w-full" aria-hidden={!!contactToDelete}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Contacts</h1>
          <div className="flex gap-2">
            <Link href="/contacts/new">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 hover:shadow-md transition duration-300 ease-in-out">
                Add Contact
              </button>
            </Link>
            <ExportButton contacts={contacts} />
          </div>
        </div>

        {/* Empty state */}
        {contacts.length === 0 && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex justify-center items-center flex-col gap-4">
              <Image
                src="/discuss.svg"
                alt="My Icon"
                width={400}
                height={320}
              />
              <p className="text-center text-gray-500">
                Start by adding your first contact!
              </p>
            </div>
          </div>
        )}

        {/* Tag filter */}
        <TagFilter allTags={allTags} />

        {/* Contact cards */}
        <ContactsList
          contacts={filtered}
          onDeleteRequest={setContactToDelete}
        />
      </div>

      {/* Modal */}
      {contactToDelete && (
        <ConfirmModal
          title="Delete Contact"
          message={`Are you sure you want to delete ${contactToDelete.name}?`}
          onCancel={() => setContactToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
