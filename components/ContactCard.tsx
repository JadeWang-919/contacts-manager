import Link from "next/link";
import React from "react";
import { contactFields } from "@/lib/contactFields";

interface Props {
  contact: Record<string, string | number | string[]>;
}

const ContactCard = ({ contact }: Props) => {
  return (
    <div className="relative bg-white p-6 rounded-md shadow-md border-2 border-solid border-gray-100 hover:border-gray-300 hover:shadow-gray-300 transition duration-300 ease-in-out h-full flex flex-col">
      {/* Icon buttons at top-right */}
      <div className="absolute top-3 right-3 flex gap-2">
        <Link href={`/contacts/${contact.id}`}>
          <button className="text-blue-500 hover:text-blue-700" title="Edit">
            ✏️
          </button>
        </Link>
        <button className="text-red-500 hover:text-red-700" title="Delete">
          🗑️
        </button>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-grow space-y-3">
        {contactFields.map((field) => {
          const value = contact[field.name];
          if (!value) return null;

          // Heading display
          if (field.displayAsHeading) {
            return (
              <h2 key={field.name} className="text-xl font-semibold">
                {value}
              </h2>
            );
          }

          // Role at companySchool
          if (field.name === "role") {
            const company = contact["companySchool"];
            if (!value && !company) return null;
            return (
              <p key="role-company" className="text-sm text-gray-500">
                {value}
                {value && company ? " at " : ""}
                {company}
              </p>
            );
          }

          if (field.name === "companySchool") {
            return null;
          }

          if (field.name === "tags") {
            return null;
          }

          return (
            <div key={field.name}>
              <p className="text-sm text-gray-700">
                {field.icon ? `${field.icon} ` : ""}
                {field.label}: {value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tags row */}
      {Array.isArray(contact.tags) && contact.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {contact.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactCard;
