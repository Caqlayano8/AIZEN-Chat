import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json({ error: "companyId gerekli" }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalConversations,
      activeConversations,
      resolvedToday,
      totalContacts,
      newContactsToday,
      pendingAppointments,
      activeCampaigns,
      totalOrders,
      totalVoiceCalls,
      aiHandledCalls,
    ] = await Promise.all([
      prisma.conversation.count({ where: { companyId } }),
      prisma.conversation.count({ where: { companyId, status: "open" } }),
      prisma.conversation.count({ where: { companyId, status: "resolved", updatedAt: { gte: today } } }),
      prisma.contact.count({ where: { companyId } }),
      prisma.contact.count({ where: { companyId, createdAt: { gte: today } } }),
      prisma.appointment.count({ where: { companyId, status: "scheduled" } }),
      prisma.campaign.count({ where: { companyId, status: "active" } }),
      prisma.order.count({ where: { companyId } }),
      prisma.voiceCall.count({ where: { companyId } }),
      prisma.voiceCall.count({ where: { companyId, aiHandled: true } }),
    ]);

    const orders = await prisma.order.findMany({
      where: { companyId },
      select: { totalAmount: true },
    });
    const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    return NextResponse.json({
      totalConversations,
      activeConversations,
      resolvedToday,
      avgResponseTime: "2dk 30sn",
      totalContacts,
      newContactsToday,
      pendingAppointments,
      activeCampaigns,
      totalOrders,
      revenue,
      aiResponseRate: totalConversations > 0 ? Math.round((resolvedToday / Math.max(totalConversations, 1)) * 100) : 0,
      customerSatisfaction: 94,
      totalVoiceCalls,
      aiHandledCalls,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json({ error: "Dashboard verileri yüklenemedi" }, { status: 500 });
  }
}
