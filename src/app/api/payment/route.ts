import { NextResponse } from "next/server";
import { stripeService, iyzicoService } from "@/lib/payment";

export async function POST(req: Request) {
  try {
    const { planId, email, provider, buyer } = await req.json();

    if (!planId || !email) {
      return NextResponse.json({ error: "Plan ve e-posta gerekli" }, { status: 400 });
    }

    if (provider === "iyzico" && buyer) {
      const result = await iyzicoService.createPayment(planId, buyer);
      if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
      return NextResponse.json({ url: result.url, provider: "iyzico" });
    }

    // Default: Stripe
    const result = await stripeService.createCheckoutSession(planId, email);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ url: result.url, provider: "stripe" });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Ödeme işlemi başarısız" }, { status: 500 });
  }
}
