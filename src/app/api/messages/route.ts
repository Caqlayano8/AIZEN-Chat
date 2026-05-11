import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json({ error: "conversationId gerekli" }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: "asc" },
      include: { senderUser: { select: { id: true, name: true, avatar: true } } },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json({ error: "Mesajlar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { conversationId, content, type, sender, senderId, channel } = body;

    const message = await prisma.message.create({
      data: { conversationId, content, type: type || "text", sender: sender || "agent", senderId, channel: channel || "webchat" },
    });

    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastActivity: new Date() },
    });

    // Generate AI suggestion for incoming messages
    let aiSuggestion = null;
    if (sender === "contact") {
      aiSuggestion = generateAISuggestion(content);
      if (aiSuggestion) {
        await prisma.message.update({
          where: { id: message.id },
          data: { aiSuggestion },
        });
      }
    }

    return NextResponse.json({ ...message, aiSuggestion }, { status: 201 });
  } catch (error) {
    console.error("Message create error:", error);
    return NextResponse.json({ error: "Mesaj gönderilemedi" }, { status: 500 });
  }
}

function generateAISuggestion(content: string): string | null {
  const lower = content.toLowerCase();
  if (lower.includes("fiyat") || lower.includes("ücret")) {
    return "Fiyat bilgisi için size detaylı bir teklif hazırlayabilirim. Hangi ürün/hizmet hakkında bilgi almak istersiniz?";
  }
  if (lower.includes("kargo") || lower.includes("teslimat")) {
    return "Siparişinizin kargo durumunu hemen kontrol ediyorum. Sipariş numaranızı paylaşır mısınız?";
  }
  if (lower.includes("iade") || lower.includes("değişim")) {
    return "İade/değişim talebinizi en kısa sürede işleme alacağız. Sipariş numaranız ve iade nedeninizi belirtir misiniz?";
  }
  if (lower.includes("merhaba") || lower.includes("selam")) {
    return "Merhaba! AIZEN Chat'e hoş geldiniz. Size nasıl yardımcı olabilirim?";
  }
  if (lower.includes("randevu") || lower.includes("görüşme")) {
    return "Sizin için uygun bir randevu oluşturabilirim. Hangi tarih ve saat sizin için uygun olur?";
  }
  if (lower.includes("teşekkür")) {
    return "Rica ederim! Başka bir konuda yardımcı olabilir miyim?";
  }
  return "Mesajınız için teşekkür ederiz. En kısa sürede size yardımcı olacağız.";
}
