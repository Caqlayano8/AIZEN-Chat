import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json({ error: "companyId gerekli" }, { status: 400 });
    }

    let settings = await prisma.aIVoiceSettings.findUnique({ where: { companyId } });

    if (!settings) {
      settings = await prisma.aIVoiceSettings.create({ data: { companyId } });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("AI voice settings fetch error:", error);
    return NextResponse.json({ error: "AI ses ayarları yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { companyId, ...data } = body;

    const settings = await prisma.aIVoiceSettings.upsert({
      where: { companyId },
      update: data,
      create: { companyId, ...data },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("AI voice settings update error:", error);
    return NextResponse.json({ error: "AI ses ayarları güncellenemedi" }, { status: 500 });
  }
}
