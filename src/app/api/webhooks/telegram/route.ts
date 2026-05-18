import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message;
    if (!message) return NextResponse.json({ status: "no message" });

    const chatId = message.chat.id.toString();
    const text = message.text || "";
    const fromUser = message.from;
    const contactName = `${fromUser.first_name || ""} ${fromUser.last_name || ""}`.trim() || `Telegram ${chatId}`;

    let contact = await prisma.contact.findFirst({
      where: { notes: { contains: `tg:${chatId}` } },
    });

    if (!contact) {
      const defaultCompany = await prisma.company.findFirst();
      if (!defaultCompany) return NextResponse.json({ status: "no company" });

      contact = await prisma.contact.create({
        data: {
          name: contactName,
          source: "telegram",
          notes: `tg:${chatId}`,
          companyId: defaultCompany.id,
        },
      });
    }

    let conversation = await prisma.conversation.findFirst({
      where: { contactId: contact.id, channel: "telegram", status: { not: "resolved" } },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          contactId: contact.id,
          channel: "telegram",
          companyId: contact.companyId,
          status: "open",
        },
      });
    }

    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        content: text,
        sender: "contact",
        channel: "telegram",
        status: "delivered",
      },
    });

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastActivity: new Date() },
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ error: "Webhook işlenemedi" }, { status: 500 });
  }
}
