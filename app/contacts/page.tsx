import { dummyContacts } from "@/lib/dummyData"; // Import your mock data
import Link from "next/link";
import ContractCard from "@/components/ContactCard"; // Import your ContactCard component

export default function ContactsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Contacts</h1>
        <Link href="/contacts/new">
          <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 ease-in-out">
            + Add Contact
          </button>
        </Link>
      </div>

      {/* Contact list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyContacts.map((contact) => (
          <ContractCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
