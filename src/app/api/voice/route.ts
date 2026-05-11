import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (companyId) where.companyId = companyId;
    if (status) where.status = status;

    const calls = await prisma.voiceCall.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        contact: { select: { id: true, name: true, phone: true, avatar: true } },
        agent: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json(calls);
  } catch (error) {
    console.error("Voice calls fetch error:", error);
    return NextResponse.json({ error: "Aramalar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contactId, companyId, direction, agentId } = body;

    // Check routing rules
    const routingRules = await prisma.callRoutingRule.findMany({
      where: { companyId, isActive: true },
      orderBy: { priority: "desc" },
    });

    let callStatus = "ringing";
    let aiHandled = false;
    let forwardedTo = null;

    for (const rule of routingRules) {
      if (rule.action === "ai_assistant") {
        const aiSettings = await prisma.aIVoiceSettings.findUnique({ where: { companyId } });
        if (aiSettings?.isEnabled) {
          callStatus = "ai_handled";
          aiHandled = true;
          break;
        }
      } else if (rule.action === "forward_number" && rule.targetNumber) {
        callStatus = "forwarded";
        forwardedTo = rule.targetNumber;
        break;
      }
    }

    const call = await prisma.voiceCall.create({
      data: {
        contactId,
        companyId,
        direction: direction || "inbound",
        agentId,
        status: callStatus,
        aiHandled,
        forwardedTo,
      },
      include: { contact: true, agent: true },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        title: aiHandled ? "AI Sesli Destek Aktif" : "Gelen Arama",
        message: `${call.contact.name} ${aiHandled ? "yapay zeka ile görüşüyor" : "arıyor"}`,
        type: "voice_call",
        companyId,
      },
    });

    return NextResponse.json(call, { status: 201 });
  } catch (error) {
    console.error("Voice call create error:", error);
    return NextResponse.json({ error: "Arama oluşturulamadı" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, duration, transcription, aiTranscript } = body;

    const data: Record<string, unknown> = {};
    if (status) data.status = status;
    if (duration !== undefined) data.duration = duration;
    if (transcription) data.transcription = transcription;
    if (aiTranscript) data.aiTranscript = aiTranscript;
    if (status === "completed" || status === "missed" || status === "failed") {
      data.endedAt = new Date();
    }

    const call = await prisma.voiceCall.update({ where: { id }, data });
    return NextResponse.json(call);
  } catch (error) {
    console.error("Voice call update error:", error);
    return NextResponse.json({ error: "Arama güncellenemedi" }, { status: 500 });
  }
}
