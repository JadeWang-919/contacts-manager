import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

// GET a contact
export async function GET(req: Request, context: { params: { id: string } }) {
  const { userId } = await auth();
  const { id } = context.params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contact = await prisma.contact.findUnique({ where: { id } });

  if (!contact || contact.userId !== userId) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json(contact);
}

// PATCH a contact
export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { id } = context.params;
  const data = {
    ...result.data,
    email: result.data.email?.trim() || null,
    phone: result.data.phone?.trim() || null,
  };

  const contact = await prisma.contact.findUnique({ where: { id } });

  if (!contact || contact.userId !== userId) {
    return NextResponse.json(
      { error: "Contact not found or unauthorized" },
      { status: 404 }
    );
  }

  if (data.email) {
    const existingEmail = await prisma.contact.findFirst({
      where: {
        userId,
        email: data.email,
        NOT: { id },
      },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "A contact with this email already exists." },
        { status: 400 }
      );
    }
  }

  if (data.phone) {
    const existingPhone = await prisma.contact.findFirst({
      where: {
        userId,
        phone: data.phone,
        NOT: { id },
      },
    });
    if (existingPhone) {
      return NextResponse.json(
        { error: "A contact with this phone number already exists." },
        { status: 400 }
      );
    }
  }

  const updated = await prisma.contact.update({
    where: { id },
    data,
  });

  return NextResponse.json({ contact: updated });
}

// DELETE a contact
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { userId } = await auth();
  const { id } = context.params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contact = await prisma.contact.findUnique({ where: { id } });

  if (!contact || contact.userId !== userId) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  await prisma.contact.delete({ where: { id } });

  return NextResponse.json({ message: "Contact deleted" });
}
