import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json({ error: "companyId gerekli" }, { status: 400 });
    }

    const rules = await prisma.callRoutingRule.findMany({
      where: { companyId },
      orderBy: { priority: "desc" },
    });

    return NextResponse.json(rules);
  } catch (error) {
    console.error("Routing rules fetch error:", error);
    return NextResponse.json({ error: "Yönlendirme kuralları yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rule = await prisma.callRoutingRule.create({ data: body });
    return NextResponse.json(rule, { status: 201 });
  } catch (error) {
    console.error("Routing rule create error:", error);
    return NextResponse.json({ error: "Yönlendirme kuralı oluşturulamadı" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const rule = await prisma.callRoutingRule.update({ where: { id }, data });
    return NextResponse.json(rule);
  } catch (error) {
    console.error("Routing rule update error:", error);
    return NextResponse.json({ error: "Yönlendirme kuralı güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 });

    await prisma.callRoutingRule.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Routing rule delete error:", error);
    return NextResponse.json({ error: "Yönlendirme kuralı silinemedi" }, { status: 500 });
  }
}
