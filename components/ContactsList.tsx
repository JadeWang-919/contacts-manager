"use client";

import { useSearchStore } from "@/lib/store/searchStore";
import { useTagFilterStore } from "@/lib/store/tagFilterStore";
import { Contact } from "@prisma/client";
import ContactCard from "@/components/ContactCard";
import Link from "next/link";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ContactsList({ contacts }: { contacts: Contact[] }) {
  function handleExport() {
    const formatted = contacts.map(
      ({ name, email, phone, role, companySchool, notes, tags }) => ({
        Name: name,
        Email: email,
        Phone: phone,
        Role: role,
        "Company/School": companySchool,
        Notes: notes,
        Tags: tags?.join(", "),
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "contacts.xlsx");
  }

  const { query } = useSearchStore();

  const allTags = Array.from(
    new Set(contacts.flatMap((c) => c.tags || []))
  ).sort();

  const { selectedTags, toggleTag, clearTags } = useTagFilterStore();

  const filtered = contacts.filter((c) => {
    const text = `${c.name} ${c.role} ${c.companySchool} ${c.phone} ${
      c.email
    } ${c.notes || ""} ${c.tags?.join(" ")}`.toLowerCase();

    const matchesSearch = text.includes(query.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => c.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Contacts</h1>
        <div className="flex gap-2">
          <Link href="/contacts/new">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
              Add Contact
            </button>
          </Link>
          <button
            onClick={handleExport}
            className="border bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out"
          >
            Export
          </button>
        </div>
      </div>
      {/* Tag Filter UI */}
      {allTags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2 font-medium">
            Filter by tags:
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {allTags.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border-blue-300"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {selectedTags.length > 0 && (
              <button
                onClick={clearTags}
                className="ml-2 text-sm text-blue-500 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
