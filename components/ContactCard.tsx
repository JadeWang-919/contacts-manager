"use client";

import Link from "next/link";
import { Contact } from "@prisma/client";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  contact: Contact;
}

export default function ContactCard({ contact }: Props) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Contact deleted");
      router.refresh();
    } catch (err) {
      console.error("Failed to delete contact:", err);
      toast.error("Failed to delete contact");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition duration-300 ease-in-out h-full flex flex-col justify-between">
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Link href={`/contacts/${contact.id}`}>
          <button className="text-blue-500 hover:text-blue-700" title="Edit">
            ✏️
          </button>
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          🗑️
        </button>
      </div>

      {/* Contact content */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{contact.name}</h2>

        {(contact.role || contact.companySchool) && (
          <p className="text-sm text-gray-500">
            {contact.role}
            {contact.role && contact.companySchool ? " at " : ""}
            {contact.companySchool}
          </p>
        )}

        {contact.phone && (
          <p className="text-sm text-gray-700">📞 {contact.phone}</p>
        )}
        {contact.email && (
          <p className="text-sm text-gray-700">✉️ {contact.email}</p>
        )}
        {contact.notes && (
          <p className="text-sm text-gray-600 mt-4">Notes: {contact.notes}</p>
        )}
      </div>

      {contact.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {contact.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Delete Contact"
          message="Are you sure you want to delete this contact?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
