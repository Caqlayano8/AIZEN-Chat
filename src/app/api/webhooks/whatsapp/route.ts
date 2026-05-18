import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// WhatsApp webhook verification
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "aizen_whatsapp_verify_token";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Doğrulama başarısız" }, { status: 403 });
}

// WhatsApp incoming message webhook
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages?.length) {
      return NextResponse.json({ status: "no messages" });
    }

    for (const msg of messages) {
      const from = msg.from;
      const text = msg.text?.body || "";
      const msgType = msg.type || "text";

      // Find or create contact
      let contact = await prisma.contact.findFirst({
        where: { phone: { contains: from.slice(-10) } },
      });

      if (!contact) {
        const defaultCompany = await prisma.company.findFirst();
        if (!defaultCompany) continue;

        contact = await prisma.contact.create({
          data: {
            name: `WhatsApp ${from}`,
            phone: from,
            source: "whatsapp",
            companyId: defaultCompany.id,
          },
        });
      }

      // Find or create conversation
      let conversation = await prisma.conversation.findFirst({
        where: { contactId: contact.id, channel: "whatsapp", status: { not: "resolved" } },
      });

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            contactId: contact.id,
            channel: "whatsapp",
            companyId: contact.companyId,
            status: "open",
            priority: "medium",
          },
        });
      }

      // Save message
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          content: text,
          type: msgType,
          sender: "contact",
          channel: "whatsapp",
          status: "delivered",
        },
      });

      // Update conversation last activity
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { lastActivity: new Date() },
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Webhook işlenemedi" }, { status: 500 });
  }
}
