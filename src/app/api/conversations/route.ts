import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");
    const status = searchParams.get("status");
    const channel = searchParams.get("channel");

    const where: Record<string, unknown> = {};
    if (companyId) where.companyId = companyId;
    if (status) where.status = status;
    if (channel) where.channel = channel;

    const conversations = await prisma.conversation.findMany({
      where,
      orderBy: { lastActivity: "desc" },
      include: {
        contact: true,
        messages: { take: 1, orderBy: { timestamp: "desc" } },
        assignedTo: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Conversations fetch error:", error);
    return NextResponse.json({ error: "Görüşmeler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const conversation = await prisma.conversation.create({
      data: body,
      include: { contact: true },
    });
    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error("Conversation create error:", error);
    return NextResponse.json({ error: "Görüşme oluşturulamadı" }, { status: 500 });
  }
}
