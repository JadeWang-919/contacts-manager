"use client";

import { Contact } from "@prisma/client";
import ContactCard from "@/components/ContactCard";

interface ContactsListProps {
  contacts: Contact[];
  onDeleteRequest: (contact: Contact) => void;
}

export default function ContactsList({
  contacts,
  onDeleteRequest,
}: ContactsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDeleteRequest={() => onDeleteRequest(contact)}
        />
      ))}
    </div>
  );
}
