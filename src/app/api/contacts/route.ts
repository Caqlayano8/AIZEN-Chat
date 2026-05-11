import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");
    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (companyId) where.companyId = companyId;
    if (status) where.status = status;
    if (source) where.source = source;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { conversations: { take: 1, orderBy: { lastActivity: "desc" } } },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Contacts fetch error:", error);
    return NextResponse.json({ error: "Kişiler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const contact = await prisma.contact.create({ data: body });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Contact create error:", error);
    return NextResponse.json({ error: "Kişi oluşturulamadı" }, { status: 500 });
  }
}
