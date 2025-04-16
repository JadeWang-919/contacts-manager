"use client";

import Link from "next/link";
import { Contact } from "@prisma/client";

interface Props {
  contact: Contact;
  onDeleteRequest: () => void;
}

export default function ContactCard({ contact, onDeleteRequest }: Props) {
  return (
    <div className="relative bg-white dark:bg-zinc-800 p-4 rounded-md shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 hover:shadow-lg transition duration-300 ease-in-out h-full flex flex-col justify-between">
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Link href={`/contacts/${contact.id}`}>
          <button title="Edit">✏️</button>
        </Link>
        <button onClick={onDeleteRequest} title="Delete">
          🗑️
        </button>
      </div>

      {/* Top content */}
      <div className="space-y-1">
        <h2 className="text-xl text-gray-800 dark:text-white font-semibold">
          {contact.name}
        </h2>

        {(contact.role || contact.companySchool) && (
          <p className="text-sm text-gray-500 dark:text-zinc-400 pb-2">
            {contact.role}
            {contact.role && contact.companySchool ? " at " : ""}
            {contact.companySchool}
          </p>
        )}

        {contact.phone && (
          <p className="text-sm text-gray-700 dark:text-zinc-200">
            📞 {contact.phone}
          </p>
        )}
        {contact.email && (
          <p className="text-sm text-gray-700 dark:text-zinc-200">
            ✉️ {contact.email}
          </p>
        )}
      </div>

      {/* Bottom-aligned notes and tags */}
      {(contact.notes || contact.tags.length > 0) && (
        <div className="mt-auto pt-4 flex flex-col gap-2">
          {contact.notes && (
            <p className="text-sm text-gray-600 dark:text-zinc-300">
              Notes: {contact.notes}
            </p>
          )}

          {contact.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-emerald-100 text-teal-700 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
