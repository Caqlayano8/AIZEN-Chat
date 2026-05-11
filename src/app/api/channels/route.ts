import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json({ error: "companyId gerekli" }, { status: 400 });
    }

    const channels = await prisma.connectedChannel.findMany({
      where: { companyId },
      orderBy: { connectedAt: "desc" },
    });

    return NextResponse.json(channels);
  } catch (error) {
    console.error("Channels fetch error:", error);
    return NextResponse.json({ error: "Kanallar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const channel = await prisma.connectedChannel.create({ data: body });
    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    console.error("Channel create error:", error);
    return NextResponse.json({ error: "Kanal oluşturulamadı" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const channel = await prisma.connectedChannel.update({ where: { id }, data });
    return NextResponse.json(channel);
  } catch (error) {
    console.error("Channel update error:", error);
    return NextResponse.json({ error: "Kanal güncellenemedi" }, { status: 500 });
  }
}
