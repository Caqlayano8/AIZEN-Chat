import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateLicense, validateLicense, type LicensePlan, type LicenseData } from "@/lib/license";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");
    const key = searchParams.get("key");

    if (key) {
      const license = await prisma.license.findUnique({ where: { key }, include: { company: true } });
      if (!license) {
        return NextResponse.json({ error: "Lisans bulunamadı" }, { status: 404 });
      }

      const licenseData: LicenseData = {
        companyId: license.companyId,
        companyName: license.company.name,
        plan: license.plan as LicensePlan,
        maxUsers: license.maxUsers,
        maxContacts: license.maxContacts,
        maxChannels: license.maxChannels,
        features: JSON.parse(license.features),
        issuedAt: license.issuedAt.toISOString(),
        expiresAt: license.expiresAt.toISOString(),
      };

      const validation = validateLicense(license.key, license.signature, licenseData);
      return NextResponse.json({ license, validation });
    }

    const where = companyId ? { companyId } : {};
    const licenses = await prisma.license.findMany({
      where,
      include: { company: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(licenses);
  } catch (error) {
    return NextResponse.json({ error: "Lisanslar alınamadı" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyId, plan, durationMonths } = body;

    if (!companyId || !plan) {
      return NextResponse.json({ error: "companyId ve plan gerekli" }, { status: 400 });
    }

    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      return NextResponse.json({ error: "Şirket bulunamadı" }, { status: 404 });
    }

    const licensePayload = generateLicense(companyId, company.name, plan as LicensePlan, durationMonths || 12);

    const license = await prisma.license.create({
      data: {
        key: licensePayload.key,
        companyId,
        plan: licensePayload.plan,
        maxUsers: licensePayload.maxUsers,
        maxContacts: licensePayload.maxContacts,
        maxChannels: licensePayload.maxChannels,
        features: JSON.stringify(licensePayload.features),
        signature: licensePayload.signature,
        isActive: true,
        expiresAt: new Date(licensePayload.expiresAt),
      },
      include: { company: { select: { name: true, email: true } } },
    });

    await prisma.company.update({
      where: { id: companyId },
      data: { plan },
    });

    return NextResponse.json(license, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Lisans oluşturulamadı" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Lisans ID gerekli" }, { status: 400 });
    }

    const license = await prisma.license.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(license);
  } catch (error) {
    return NextResponse.json({ error: "Lisans güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lisans ID gerekli" }, { status: 400 });
    }

    await prisma.license.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Lisans silinemedi" }, { status: 500 });
  }
}
