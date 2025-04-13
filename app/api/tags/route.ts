// app/api/tags/route.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await prisma.contact.findMany({
      where: { userId },
      select: { tags: true },
    });

    const allTags = Array.from(new Set(contacts.flatMap((c) => c.tags || [])));

    return NextResponse.json(allTags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
