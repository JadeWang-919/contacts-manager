import { Contact } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ContactsPageClient from "@/components/ContactsPageClient";

async function getContacts(): Promise<Contact[]> {
  const { userId } = await auth();
  if (!userId) return [];

  return await prisma.contact.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  return <ContactsPageClient contacts={contacts} />;
}
