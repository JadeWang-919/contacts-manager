import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contacts = await prisma.contact.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
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

  const data = {
    ...result.data,
    email: result.data.email || null,
    phone: result.data.phone || null,
  };

  if (data.email) {
    const existingEmail = await prisma.contact.findFirst({
      where: { userId, email: data.email },
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
      where: { userId, phone: data.phone },
    });
    if (existingPhone) {
      return NextResponse.json(
        { error: "A contact with this phone number already exists." },
        { status: 400 }
      );
    }
  }

  const contact = await prisma.contact.create({
    data: { ...data, userId, name: result.data.name },
  });

  return NextResponse.json({ contact });
}
