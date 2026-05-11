import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    const where: Record<string, unknown> = {};
    if (companyId) where.companyId = companyId;

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Notifications fetch error:", error);
    return NextResponse.json({ error: "Bildirimler yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, read } = body;

    if (id === "all") {
      const companyId = body.companyId;
      await prisma.notification.updateMany({
        where: { companyId, read: false },
        data: { read: true },
      });
      return NextResponse.json({ success: true });
    }

    const notification = await prisma.notification.update({
      where: { id },
      data: { read },
    });
    return NextResponse.json(notification);
  } catch (error) {
    console.error("Notification update error:", error);
    return NextResponse.json({ error: "Bildirim güncellenemedi" }, { status: 500 });
  }
}
