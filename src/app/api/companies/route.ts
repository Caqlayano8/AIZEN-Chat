import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const company = await prisma.company.findUnique({
        where: { id },
        include: {
          users: { select: { id: true, name: true, email: true, role: true, avatar: true, phone: true } },
          connectedChannels: true,
          aiVoiceSettings: true,
          _count: { select: { contacts: true, conversations: true, campaigns: true, orders: true, voiceCalls: true } },
        },
      });
      return NextResponse.json(company);
    }

    const companies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { users: true, contacts: true, conversations: true } },
      },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Companies fetch error:", error);
    return NextResponse.json({ error: "Şirketler yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const company = await prisma.company.update({ where: { id }, data });
    return NextResponse.json(company);
  } catch (error) {
    console.error("Company update error:", error);
    return NextResponse.json({ error: "Şirket güncellenemedi" }, { status: 500 });
  }
}
