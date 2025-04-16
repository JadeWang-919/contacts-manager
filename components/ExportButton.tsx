"use client";

import { Contact } from "@prisma/client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExportButtonProps {
  contacts: Contact[];
}

export default function ExportButton({ contacts }: ExportButtonProps) {
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

  return (
    <button
      onClick={handleExport}
      className="ring-2 ring-inset ring-amber-500 text-amber-500 px-4 py-2 rounded-md hover:bg-amber-50 hover:ring-amber-600 hover:text-amber-600 transition duration-300 ease-in-out"
    >
      Export
    </button>
  );
}
